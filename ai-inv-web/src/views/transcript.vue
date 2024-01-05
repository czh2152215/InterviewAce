<template>
  <div class="transcriptContainer">
    <!-- 整体成绩单-几个大字 -->
    <div class="columnName">OverAll Transcript</div>

    <el-collapse v-model="activeIndex" accordion>
      <el-collapse-item
        v-for="(talk, index) in fakeTalksList"
        ref="refList"
        :name="index"
        :key="index"
      >
        <template #title>
          <div class="talkItem">
            <div class="frame">
              <div class="aitalk">
                <img :src="Talker" alt="" width="50" style="flex-shrink: 0" />
                <div style="flex-grow: 2">
                  <p>{{ talk.ai }}</p>
                </div>
                <div style="width: 50px; flex-shrink: 0"></div>
              </div>
              <div class="metalk">
                <div style="width: 50px; flex-shrink: 0"></div>
                <div style="flex-grow: 2">
                  <p>{{ talk.me }}</p>
                </div>
                <img :src="Talker" alt="" width="50" style="flex-shrink: 0" />
              </div>
            </div></div
        ></template>

        <div class="content2">
          <div v-show="lookType == 'aiComment'" class="innerContent">
            <div class="goodTextContainer">{{ talk.aiCommentData.good }}</div>
            <div class="badTextContainer">{{ talk.aiCommentData.bad }}</div>
          </div>
          <div v-show="lookType == 'aiRecommend'" class="innerContent">
            <div class="recommendPicContainer">
              <MindMap
                :externalData="talk.aiRecommendData.data"
                v-if="
                  index == activeIndex && talk.aiRecommendData.data.length !== 0
                "
              ></MindMap>
              <div v-else>Analyzing...</div>
            </div>
            <div class="recommendTextContainer">
              {{ talk.aiRecommendData.text }}
            </div>
          </div>
          <div v-show="lookType == 'tryAgain'" class="innerContent">
            tryAgain{{ activeIndex }}
          </div>
        </div>
        <div class="tabbar">
          <div
            class="basicBtn"
            :class="{ activedBtn: lookType == 'aiComment' }"
            @click="lookType = 'aiComment'"
          >
            AI Review
          </div>
          <div
            class="basicBtn"
            :class="{ activedBtn: lookType == 'aiRecommend' }"
            @click="lookType = 'aiRecommend'"
          >
            AI Recommended Answers
          </div>
          <div
            class="basicBtn"
            :class="{ activedBtn: lookType == 'tryAgain' }"
            @click="lookType = 'tryAgain'"
          >
            Try Again
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import Talker from "../assets/talker.png";
import { streamChat } from "../api/index";
import { ref, watch, onMounted } from "vue";
import MindMap from "../components/mindmap.vue";
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const interviewHistory = computed(() => store.state.interviewHistory);

const data = [
  {
    name: "面试",
    children: [
      {
        name: "面试官问题",
        children: [
          { name: "欢迎来到我们公司的面试。", children: [] },
          { name: "请先简单介绍一下你自己。", children: [] },
        ],
      },
      {
        name: "面试者回答",
        children: [
          { name: "非常感谢，我很高兴能有机会参加面试。", children: [] },
          { name: "我是XXX，拥有X年的工作经验。", children: [] },
          {
            name: "我在过去的X年里一直从事XXX领域的工作，主要负责XXX。",
            children: [],
          },
          {
            name: "我对这个行业很热爱，希望能够在贵公司发展并贡献我的专业知识和技能。",
            children: [],
          },
        ],
      },
    ],
  },
  {
    name: "思维导图",
    children: [
      {
        name: "如何学习D3",
        children: [
          {
            name: "预备知识",
            children: [
              { name: "HTML & CSS", children: [] },
              {
                name: "JavaScript",
                children: [
                  { name: "HTML & CSS", children: [] },
                  { name: "JavaScript", children: [] },
                ],
              },
            ],
          },
          {
            name: "安装",
            collapse: true,
            children: [{ name: "折叠节点", children: [] }],
          },
          { name: "进阶", left: true, children: [] },
        ],
      },
    ],
  },
];

const lookType = ref("aiRecommend");
const activeIndex = ref();
const fakeTalksList = computed(() => {
  const talks = [];
  const history = interviewHistory.value;

  for (let i = 0; i < history.length; i += 2) {
    const aiTalk = history[i] ? history[i].text : "";
    const meTalk = history[i + 1] ? history[i + 1].text : "";

    talks.push({
      ai: aiTalk,
      me: meTalk,
      aiCommentData: {
        good: "", // 需要填充或从其他地方获取
        bad: "",  // 同上
      },
      aiRecommendData: {
        text: "", // 同上
        text2: "", // 同上
        data: [], // 同上
      },
    });
  }

  return talks;
});

watch(lookType, (newValue, oldValue) => {
  if (newValue == "aiComment") {
    console.log("aiComment:" + activeIndex.value);
    if (fakeTalksList.value[activeIndex.value].aiCommentData.good == "") {
      const index = activeIndex.value;
      // 获取 good 和 bad
      // 获取 good 和 bad
      streamChat(
        `This is the quesion from interviewer${fakeTalksList.value[activeIndex.value].ai},
        this is the answer from the interviewee：${fakeTalksList.value[activeIndex.value].me}。
        Please comment on the good part of the ansers：`,
        (re) => {
          fakeTalksList.value[index].aiCommentData.good += re;
        },
        () => {}
      );
      // 获取 good 和 bad
      streamChat(
        `This is the quesion from interviewer：${fakeTalksList.value[activeIndex.value].ai},
        this is the answer from the interviewee：${fakeTalksList.value[activeIndex.value].me}。
        Please comment on the bad part of the ansers：`,
        (re) => {
          fakeTalksList.value[index].aiCommentData.bad += re;
        },
        () => {}
      );
    }
  } else if (newValue == "aiRecommend") {
    console.log("aiRecommend:" + activeIndex.value);
    if (fakeTalksList.value[activeIndex.value].aiRecommendData.text == "") {
      const index = activeIndex.value;
      // 获取 aiRecommendData
      streamChat(
        `This is the quesion from interviewer：${fakeTalksList.value[activeIndex.value].ai},
        this is the answer from the interviewee：${fakeTalksList.value[activeIndex.value].me}。
        Please give your recommended answer：`,
        (re) => {
          fakeTalksList.value[index].aiRecommendData.text += re;
        },
        () => {}
      );
      streamChat(
      `This is the quesion from interviewer：${fakeTalksList.value[activeIndex.value].ai},
      this is the answer from the interviewee：${
      fakeTalksList.value[activeIndex.value].me
    }。Please prepare a mind map with the following example json format (an array), just refer to the format, not the content, please replace the value XXX of name with a reasonable one: 
    [
"name": "",
"children": [
{
"name": "",
"children": [
{ "name": "" },
{
"name": "",
"children": [{ "name": "" }, { "name": "" }]
}
]
},
{
"name": "",
"collapse": true,
"children": [{ "name": "" }]
},
{ "name": "", "left": true }
]
}
],输出：`,
        (re) => {
          fakeTalksList.value[index].aiRecommendData.text2 += re;
        },
        () => {
          console.log(fakeTalksList.value[index].aiRecommendData.text2);
          fakeTalksList.value[index].aiRecommendData.data.splice(
            0,
            JSON.parse(fakeTalksList.value[index].aiRecommendData.text2).length,
            ...JSON.parse(fakeTalksList.value[index].aiRecommendData.text2)
          );
        }
      );
    }
  } else if (newValue == "tryAgain") {
    console.log("tryAgain:" + activeIndex.value);
  }
});
watch(activeIndex, (newValue, oldValue) => {
  if (
    activeIndex.value !== "" &&
    lookType.value == "aiComment" &&
    fakeTalksList.value[activeIndex.value].aiCommentData.good == ""
  ) {
    // 获取 good 和 bad
    streamChat(
      `This is the quesion from interviewer${fakeTalksList.value[activeIndex.value].ai},
        this is the answer from the interviewee：${fakeTalksList.value[activeIndex.value].me}。
        Please comment on the good part of the ansers：`,
      (re) => {
        fakeTalksList.value[newValue].aiCommentData.good += re;
      },
      () => {}
    );
    // 获取 good 和 bad
    streamChat(
      `This is the quesion from interviewer：${fakeTalksList.value[activeIndex.value].ai},
      this is the answer from the interviewee：${fakeTalksList.value[activeIndex.value].me}。
      Please comment on the bad part of the ansers：`,
      (re) => {
        fakeTalksList.value[newValue].aiCommentData.bad += re;
      },
      () => {}
    );
  } else if (
    activeIndex.value !== "" &&
    lookType.value == "aiRecommend" &&
    fakeTalksList.value[activeIndex.value].aiRecommendData.text == ""
  ) {
    streamChat(
      `This is the quesion from interviewer：${fakeTalksList.value[activeIndex.value].ai},
        this is the answer from the interviewee：${fakeTalksList.value[activeIndex.value].me}。
        Please give your recommended answer：`,
      (re) => {
        fakeTalksList.value[newValue].aiRecommendData.text += re;
      },
      () => {}
    );

    streamChat(
      `This is the quesion from interviewer：${fakeTalksList.value[activeIndex.value].ai},
      this is the answer from the interviewee：${
      fakeTalksList.value[activeIndex.value].me
    }。Please prepare a mind map with the following example json format (an array), just refer to the format, not the content, please replace the value XXX of name with a reasonable one: 
    [
{
"name": "",
"children": [
{
"name": "",
"children": [
{ "name": "" },
{
"name": "",
"children": [{ "name": "" }, { "name": "" }]
}
]
},
{
"name": "XXX",
"collapse": true,
"children": [{ "name": "XXX" }]
},
{ "name": "XXX", "left": true }
]
}
],输出：`,
      (re) => {
        fakeTalksList.value[newValue].aiRecommendData.text2 += re;
      },
      () => {
        console.log(fakeTalksList.value[newValue].aiRecommendData.text2);
        fakeTalksList.value[newValue].aiRecommendData.data.splice(
          0,
          JSON.parse(fakeTalksList.value[newValue].aiRecommendData.text2)
            .length,
          ...JSON.parse(fakeTalksList.value[newValue].aiRecommendData.text2)
        );
      }
    );
  }
});
</script>
<style lang="less" scoped>
:deep(.el-collapse) {
  border: none;
  overflow: hidden;
}
:deep(.el-collapse-item) {
  height: auto;
}
:deep(.el-collapse-item__wrap) {
  background-color: #d9d9d9;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  margin-bottom: 10px;
  padding: 0.5rem 1rem;
}
:deep(.el-collapse-item__content) {
  padding-bottom: 0;
}
:deep(.el-collapse-item__header) {
  height: auto;

  background-color: transparent;

  border-bottom: none;
}
:deep(.el-collapse-item__arrow) {
  display: none;
}
.transcriptContainer {
  width: 100%;
  //   border: 1px solid red;
  display: flex;
  flex-direction: column;
  align-items: center;
  .columnName {
    font-size: 1.5rem;
    color: whitesmoke;
    margin: 5rem 0;
  }
  .talkItem {
    width: 100%;
    .frame {
      min-height: 10rem;
      background-color: #f2e4fa;
      &:hover {
        background-color: #d9d9d9;
      }
      position: relative;
      border: 1px solid red;
      overflow: visible;
      border-radius: 5px;
      border: 2px solid rgb(0, 0, 0);
      font-size: 1.2rem;
      line-height: 1.25;
      text-align: left;

      &:before {
        content: "";
        position: absolute;
        left: -30px; /* 调整这个值来控制小正方形的位置 */
        top: 20px;
        width: 20px;
        height: 20px;
        background-color: whitesmoke; /* 调整这个值来改变小正方形的颜色 */
      }
      .aitalk {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // overflow: hidden;
      }
      .metalk {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  .content2 {
    .innerContent {
      min-height: 15rem;
      width: 100%;
      display: flex;
      justify-content: space-around;
      .goodTextContainer {
        padding: 1rem;
        width: 49%;
        background-color: #dae3f5;
        border-radius: 20px;
        margin-bottom: 3px;
      }
      .badTextContainer {
        padding: 1rem;
        width: 49%;
        background-color: #fce6d5;
        border-radius: 20px;
        margin-bottom: 3px;
      }
      .recommendPicContainer {
        position: relative;
        padding: 1rem;
        width: 59%;
        background-color: #dae3f5;
        border-radius: 20px;
        margin-bottom: 3px;
      }
      .recommendTextContainer {
        padding: 1rem;
        width: 39%;
        background-color: #fce6d5;
        border-radius: 20px;
        margin-bottom: 3px;
      }
    }
  }
  .tabbar {
    // height: ;
    display: flex;
    align-items: top;
    justify-content: space-around;

    .basicBtn {
      width: 20rem;
      height: 2.5rem;
      line-height: 2.5rem;
      color: whitesmoke;
      font-size: 1.4rem;
      background-color: #a6a6a6;
      border-bottom-left-radius: 30px;
      border-bottom-right-radius: 30px;
      text-align: center;
      cursor: pointer;
      transition: background-color 0.5s ease;
    }
    .activedBtn {
      background-color: #413adc;
    }
  }
}
</style>
