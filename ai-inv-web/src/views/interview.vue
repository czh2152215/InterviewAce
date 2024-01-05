
<template>
  <div class="interviewContainer">
    <div class="btns-row">
      <el-switch
        v-model="showInterviewerVedio"
        class="mb-2"
        active-text="Turn on Interviewer Camera"
        style="--el-switch-on-color: #d0f0e5; --el-switch-off-color: #d8d0f0"
        inactive-text="Close"
      />
      <div style="width: 5rem"></div>
      <el-switch
        v-model="showChatList"
        class="mb-2"
        active-text="Turn on the microphone."
        style="--el-switch-on-color: #d0f0e5; --el-switch-off-color: #d8d0f0"
        inactive-text="Turn off"
      />
      <div style="width: 5rem"></div>
      <el-switch
        v-model="showMeVedio"
        class="mb-2"
        active-text="Start Interview"
        style="--el-switch-on-color: #d0f0e5; --el-switch-off-color: #d8d0f0"
        inactive-text="End Interview"
      />
    </div>
    <div class="bottom">
      <div class="bottomleft">
        <div class="interviewervedio">
          <video
            ref="videoInterviewer"
            width="100%"
            height="100%"
            autoplay
          ></video>
        </div>
        <div class="mevedio">
          <video ref="videome" width="100%" height="100%" autoplay></video>
        </div>
      </div>
      <div class="bottomright">
        <div class="history" ref="historyRef">
          <div v-for="(item, index) in historyArray" :key="index">
            <div v-if="item.speaker == 'interviewer'" style="display: flex">
              <img :src="talker" width="50" height="50" />
              <div
                style="
                  border-radius: 10px;
                  margin-top: 15px;
                  padding: 5px;
                  background-color: rgb(220, 255, 243);
                "
              >
                <span
                  style="
                    height: auto;
                    line-height: 16px;
                    font-size: 14px;
                    padding: 5px;
                  "
                >
                  {{ item.text }}
                </span>
              </div>
              <div style="width: 50px; flex-shrink: 0"></div>
            </div>
            <div
              v-if="item.speaker == 'interviewee'"
              style="display: flex; flex-direction: row-reverse"
            >
              <img :src="talker" width="50" />
              <div
                style="
                  border-radius: 10px;
                  margin-top: 15px;
                  padding: 5px;
                  background-color: rgb(253, 255, 220);
                "
              >
                <span
                  style="
                    height: auto;
                    line-height: 16px;
                    font-size: 14px;
                    padding: 5px;
                  "
                >
                  {{ item.text }}
                </span>
              </div>
              <div style="width: 50px; flex-shrink: 0"></div>
            </div>
          </div>
          <div
            v-if="
              !isMeSpeaking && whoISSpeaking == 'interviewer' && answer !== ''
            "
            style="display: flex; flex-direction: row"
          >
            <img :src="talker" width="50" />
            <div
              style="
                border-radius: 10px;
                margin-top: 15px;
                padding: 5px;
                background-color: rgb(220, 255, 243);
              "
            >
              <span
                style="
                  height: auto;
                  line-height: 16px;
                  font-size: 14px;
                  padding: 5px;
                "
              >
                {{ answer }}
              </span>
            </div>
            <div style="width: 50px; flex-shrink: 0"></div>
          </div>
          <div
            v-if="
              isMeSpeaking && whoISSpeaking == 'interviewee' && message !== ''
            "
            style="display: flex; flex-direction: row-reverse"
          >
            <img :src="talker" width="50" />
            <div
              style="
                border-radius: 10px;
                margin-top: 15px;
                padding: 5px;
                background-color: rgb(253, 255, 220);
              "
            >
              <span
                style="
                  height: auto;
                  line-height: 16px;
                  font-size: 14px;
                  padding: 5px;
                "
              >
                {{ message + tempMessage }}
              </span>
            </div>
            <div style="width: 50px; flex-shrink: 0"></div>
          </div>
        </div>
        <div
          class="speakdiv"
          :class="{ rotate: isMeSpeaking }"
          @click="isMeSpeaking ? endSpeak() : startSpeak()"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { start, end } from "../asr/useAsr";
import talker from "../assets/talker.png";
import {
  connectDid,
  streamChatByText,
  destroyConnection,
} from "../api/streaming-client-api";
import { streamChat } from "../api/index";
import { useStore } from 'vuex';

const store = useStore();

const router = useRouter();

const showInterviewerVedio = ref(false);
const showChatList = ref(true);
const showMeVedio = ref(false);
const isMeSpeaking = ref(false);

const message = ref("");
const tempMessage = ref("");
const answer = ref("");

const videome = ref(null);
const videoInterviewer = ref(null);
const tempmp4url = ref("or_idle.mp4");

const historyRef = ref();
const historyArray = ref([{ speaker: "interviewer", text: "Hi" }]);
const historyStr = ref(`{speaker: "interviwer", text: "Hi"},
  {
    speaker: "interviewee",
    text: "Hi, I'm Jason Cui, from Columbia University",
  }`);
const whoISSpeaking = ref("interviewee");
const historyDivScrollToBottom = () => {
  // 将滚动条滚动到最底部
  historyRef.value.scrollTop =
    historyRef.value.scrollHeight - historyRef.value.clientHeight;
};
const startVedioMe = () => {
  // 检查浏览器是否支持摄像头和麦克风访问
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // 使用getUserMedia方法打开摄像头和麦克风
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then(function (stream) {
        // 将摄像头和麦克风的音视频流赋值给video元素的srcObject属性
        videome.value.srcObject = stream;

        // // 创建 PeerConnection 对象
        // const peerConnection = new RTCPeerConnection();

        // // 将音视频流添加到 PeerConnection 中
        // stream.getTracks().forEach((track) => {
        //   console.log(track);
        //   peerConnection.addTrack(track, stream);
        // });

        // ... 其他 PeerConnection 相关操作，如创建 Offer、处理 Answer 等
      })
      .catch(function (error) {
        console.error("访问摄像头和麦克风失败：", error);
      });
  } else {
    console.error("浏览器不支持摄像头和麦克风访问");
  }
};
const stopVideoMe = () => {
  const theVideo = videome.value; // 获取video元素
  const stream = theVideo.srcObject; // 获取视频流
  const tracks = stream.getTracks(); // 获取视频轨道

  // 停止视频轨道
  tracks.forEach((track) => {
    track.stop();
  });

  // 清空video元素的srcObject属性
  // theVideo.srcObject = null;
};
const startVedioInterviewer = async () => {
  videoInterviewer.value.srcObject = undefined;
  videoInterviewer.value.src = "src/assets/or_idle.mp4";
  videoInterviewer.value.loop = true;
  await connectDid(videoInterviewer.value);
};
const stopVideoInterviewer = () => {
  if (videoInterviewer.value.srcObject) {
    videoInterviewer.value.srcObject
      .getTracks()
      .forEach((track) => track.stop());
    videoInterviewer.value.srcObject = null;
    destroyConnection(videoInterviewer.value);
  }
};

const startSpeak = () => {
  if (!isMeSpeaking.value) {
    // 处理空格键按下事件的逻辑
    isMeSpeaking.value = true;
    start(
      (text) => {
        tempMessage.value = text;
        historyDivScrollToBottom();
      },
      (text) => {
        message.value += text;
        tempMessage.value = "";
      }
    );
    // startVedioMe();
  }
};
const endSpeak = () => {
  // 我已经说完了
  isMeSpeaking.value = false;
  whoISSpeaking.value = "interviewer";
  historyArray.value.push({ speaker: "interviewee", text: message.value });
  historyStr.value += `,{speaker: interviewee,text: ${message.value}}`;
  message.value = "";
  end();
  answer.value = "";
  streamChat(
    `As an interviewer for Tencent, you will be leading an interview next.
    The interview is set to be 20 minutes long, and now that the interview has started 0 minutes ago, you need to control the questions asked according to the time and finish the interview at the expected time.
    You need to control the questions asked and finish the interview at the expected time. Next is the applicant's resume information: Name: Gou Peixuan. Graduated from Harbin Institute of Technology, Department of Computer Science. The position he wants to get is front-end developer intern.
    He wants to get the position of front-end developer intern, according to the setting, the difficulty of the interview is 100 at the maximum and 0 at the minimum, now the intensity is set to 20, and the topic of the interview is: normal.
    The topic of the interview is: normal. Next, please start the interview based on the chat history ${historyStr.value} and output the next sentence you need to say as an interviewer:(不需要返回json格式，返回text部分即可)`,
    (re) => {
      answer.value += re;
      historyDivScrollToBottom();
      // 如果需要 llm 的 stream 每返回几个单词就实时转视频，打开这个，最好都不要打开，api 的额度很贵。
      // streamChatByText(re);
    },
    () => {
      whoISSpeaking.value = "interviewee";
      historyArray.value.push({ speaker: "interviewer", text: answer.value });
      historyStr.value += `,{speaker: interviewer,text: ${answer.value}}`;
      store.dispatch('updateInterviewHistory', historyArray.value);
      // 如果需要在 llm 完整给出一段话以后使用did的接口做视频，打开下面的注释
      // streamChatByText(answer.value);
    }
  );
};

watch(showMeVedio, (newValue, oldValue) => {
  // 处理变化的逻辑
  if (newValue) {
    startVedioMe();
  } else {
    stopVideoMe();
    router.push({ 
      path: '/transcript'
    });

    
  }
});
watch(showInterviewerVedio, (newValue, oldValue) => {
  if (newValue) {
    startVedioInterviewer();
  } else {
    stopVideoInterviewer();
  }
});
</script>
<style lang="less" scoped>
:deep(.el-switch__label.is-active) {
  color: whitesmoke;
}
:deep(.el-switch__label) {
  color: whitesmoke;
}
:deep(.el-switch__core .el-switch__action) {
  background-color: #422dc8;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
    // transform: translateX(-50%);
  }
  to {
    transform: rotate(360deg);
    // transform: translateX(-50%);
  }
}
.rotate {
  animation-name: spin;
  animation-duration: 3s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.interviewContainer {
  display: flex;
  flex-direction: column;
  justify-content: start;
  // border: 1px solid red;
  height: 87vh;

  .btns-row {
    height: 8%;
    width: 100vw;
    display: flex;
    padding: 0.5rem 1rem 0;
  }
  .bottom {
    height: 90%;
    display: flex;
    justify-content: space-between;
    .bottomleft {
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .interviewervedio {
        width: 100%;
        height: 49%;
        border: 8px solid whitesmoke;
        border-radius: 8px;
        background-image: url(../assets/vedioback.jpeg);
      }
      .mevedio {
        width: 100%;
        height: 49%;
        border: 8px solid whitesmoke;
        border-radius: 8px;
        background-image: url(../assets/vedioback.jpeg);
      }
    }
    .bottomright {
      background-color: #f2e4fa;
      width: 59.5%;
      border: 2px solid rgb(0, 0, 0);
      border-radius: 8px;
      position: relative;
      .history {
        height: calc(100% - 45px);
        background-color: #422dc82c;
        overflow-y: scroll;
        padding-bottom: 20px;
      }
      .speakdiv {
        width: 45px;
        height: 45px;
        position: absolute;
        background-image: url(../assets/speakbtn.png);
        bottom: 0%;
        left: 50%;
        // transform: translateX(-50%);

        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
