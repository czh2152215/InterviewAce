<template>
  <div class="transcriptContainer">
    <!-- 整体成绩单-几个大字 -->
    <div class="columnName">OverAll Transcript</div>
    <div class="chartContainer">
      <div class="textContainer">
        <!-- 在这里添加您想显示的文字 -->
        <h2 >Six-Criteria Evaluation</h2>
        <p>1. Problem Solving: 3.6/5</p>
        <p>2. Culture Fit: 3/5</p>
        <p>3. Relevance to JD: 5/5</p>
        <p>4. Technology Skill: 2/5</p>
        <p>5. Communication Skill: 1.2/5</p>
        <p>6. PLeaderShip: 2.4/5</p>
      </div>
      <div class="echartsArea" ref="echartsRef"></div>
    </div>

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

            </div>
          </div>
        </template>

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
            <div class="goodTextContainer">{{ talk.ai }}</div>
            <div class="badTextContainer">
              <img src="../assets/speakbtn.png" alt="Speak Icon" class="speakbtn"/> <!-- 图标图片 -->
            </div>
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
import * as echarts from 'echarts';
const store = useStore();
const interviewHistory = computed(() => store.state.interviewHistory);
const echartsRef = ref(null); // 创建一个 ref 用于 ECharts 容器
let myChart = null; // 用于存储 ECharts 实例的变量

// 初始化 ECharts 图表的方法
function initECharts() {
  if (echartsRef.value) {
    myChart = echarts.init(echartsRef.value);
    // 设置图表配置项
    const option = {
      polar: {
        radius: [30, '80%']
      },
      radiusAxis: {
        max: 5
      },
      angleAxis: {
        type: 'category',
        data: [' Cultural Fit','Relevance to JD','Technology Skill', 'Communication Skill', 'Leadership', 'Problem-Solving'],
        startAngle: 75
      },
      tooltip: {},
      series: {
        type: 'bar',
        data: [3, 5, 2, 1.2, 2.4, 3.6],
        coordinateSystem: 'polar',
        // label: {
        //   show: true,
        //   position: 'middle', // or 'start', 'insideStart', 'end', 'insideEnd'
        //   formatter: '{b}: {c}'
        // }
      },
      animation: false
    };
    myChart.setOption(option);
  }
}

// 在组件挂载时初始化图表
onMounted(() => {
  initECharts();
});

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
// const lookType = ref("aiRecommend");
// const activeIndex = ref();
// const fakeTalksList = computed(() => {
//   const talks = [];
//   const history = interviewHistory.value;

//   for (let i = 0; i < history.length; i += 2) {
//     const aiTalk = history[i] ? history[i].text : "";
//     const meTalk = history[i + 1] ? history[i + 1].text : "";

//     talks.push({
//       ai: aiTalk,
//       me: meTalk,
//       aiCommentData: {
//         good: "", // 需要填充或从其他地方获取
//         bad: "",  // 同上
//       },
//       aiRecommendData: {
//         text: "", // 同上
//         text2: "", // 同上
//         data: [], // 同上
//       },
//     });
//   }

//   return talks;
// });


const lookType = ref("aiRecommend");
const activeIndex = ref();
const fakeTalksList = ref([
  {
    ai: "Welcome to our company's interview. Please start by briefly introducing yourself。",
    me: "Thank you very much, I am thrilled to have the opportunity to participate in this interview. My name is Jason, and I am currently enrolled in the MSCS program at Columbia University. Throughout my university career, I have been actively involved in front-end development, primarily focusing on coding and development testing. I am passionate about this industry and hope to develop and contribute my professional knowledge and skills at your esteemed company.",
    aiCommentData: {
      good: "",
      bad: "",
    },
    aiRecommendData: {
      text: "",
      text2: "",
      data: [],
    },
  },
  {
    ai: "Very good. What challenges have you encountered in your past work, and how did you resolve them",
    me: "In my previous role, I faced a challenging situation with an urgent project deadline. With time being of the essence and the workload being substantial, I realized that measures were needed to enhance efficiency. My first step was to communicate with team members, clarifying each person's tasks and timeline, and establishing a clear project plan. I also assessed task priorities, delegating key tasks to the most experienced members, and ensured regular progress tracking and communication. Ultimately, we successfully delivered the project on time.",
    aiCommentData: {
      good: "",
      bad: "",
    },
    aiRecommendData: {
      text: "",
      text2: "",
      data: [],
    },
  },
  {
    ai: "Understood. Could you please share some of your experiences with front-end projects that you have worked on?",
    me: "Sure, I have been involved in several front-end development projects, but the one that stands out most to me was a news publishing management platform system I worked on during my junior year of undergraduate studies. The primary goal of this project was to design a Souyuan news publishing platform based on the Vue framework, aimed at solving the inconvenience and lack of informatization in campus news publishing. The system utilized a MySQL database, and I used the Vue framework in JavaScript for front-end development, and Node.js for server-side functionalities. The project was successfully completed with software testing. In terms of development methodology, we mainly adopted an agile approach, continuously iterating and refining the system's features and interface design based on feedback",
    aiCommentData: {
      good: "",
      bad: "",
    },
    aiRecommendData: {
      text: "",
      text2: "",
      data: [],
    },
  },
]);

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
  
  .chartContainer {
    display: flex; /* 设置为 Flexbox 布局 */
    justify-content: space-between; /* 子元素间隔开 */
    align-items: center; /* 居中对齐子元素 */
    width: 100%;
    height: 400px;
    background-color: #f2e4fa;
    position: relative;
      border: 1px solid red;
      overflow: visible;
      border-radius: 5px;
      border: 2px solid rgb(0, 0, 0);
      font-size: 1.2rem;
      line-height: 1.25;
      text-align: left;
  }

  .textContainer {
    height: 100%;
    padding: 1rem;
    width: 49%;
    background-color: #dae3f5;
    
    border-radius: 5px;
    margin-bottom: 3px;
  }

  .echartsArea {
    height: 100%;
    padding: 1rem;
    width: 49%;
    background-color: #fce6d5;
    border-radius: 5px;
    margin-bottom: 3px;
  }
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
      display:flex;
      justify-content: space-around;
      .goodTextContainer {
        padding: 1rem;
        width: 49%;
        background-color: #dae3f5;
        border-radius: 20px;
        margin-bottom: 3px;
      }
      .badTextContainer {
        position: relative;
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

  .badTextContainer .speakbtn {
    position: absolute;
    right: 20px; /* 根据需要调整这个值 */
    bottom: 10px; /* 根据需要调整这个值 */
    width: 40px; /* 根据图标的尺寸调整 */
    height: auto; /* 根据图标的尺寸调整 */
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
