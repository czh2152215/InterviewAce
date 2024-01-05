<template>
  <div class="homeContainer" style="position: relative">
    <div
      class="igetready"
      @click="beforeStartInterview"
      style="
        cursor: pointer;
        position: absolute;
        right: 5%;
        background-color: #d2cbed;
        border: 5px gold dotted;
        padding: 2px 10px;
        border-top-right-radius: 30px;
        border-bottom-left-radius: 30px;
      "
    >
      I'm Ready, Start the Interview!
    </div>
    <div class="hand">
      <img :src="hand" />
    </div>
    <div class="tip">Navigating Job Interviews, No Longer a Lone Journey through the Thickets!</div>
    <div style="display: flex; align-items: center">
      <div style="color: whitesmoke"></div>
      <el-input v-model="position" placeholder="Please enter the target position"> </el-input>
    </div>
    <div>
      <el-button
        :class="{ choosedBtnClass: position == 'Test Engineer' }"
        @click="position = 'Test Engineer'"
      >
      Test Engineer
      </el-button>
      <el-button
        :class="{ choosedBtnClass: position == 'Data Analyst' }"
        @click="position = 'Data Analyst'"
      >
      Data Analyst
      </el-button>
      <el-button
        :class="{ choosedBtnClass: position == 'Front-end Development Engineer' }"
        @click="position = 'Front-end Development Engineer'"
      >
      Front-end Development Engineer
      </el-button>
      <el-button
        :class="{ choosedBtnClass: position == 'Algorithm Engineer' }"
        @click="position = 'Algorithm Engineer'"
      >
      Algorithm Engineer
      </el-button>
      <el-button
        :class="{ choosedBtnClass: position == 'Back-end Development Engineer' }"
        @click="position = 'Back-end Development Engineer'"
      >
      Back-end Development Engineer
      </el-button>
    </div>
    <div class="companiesContainer">
      <div
        style="display: flex; align-items: center; width: 100%; height: 50px"
      >
        <div style="color: black; margin-right: 10px; line-height: 50px">
          Search Target Company
        </div>
        <el-input
          v-model="company"
          placeholder="Enter Company Name"
          style="width: 90%"
        >
        </el-input>
      </div>
      <div v-for="(item, index) in 20" class="companyItem">
        <div><img :src="tencentLogo" width="50%" /></div>
        <div style="font-size: 14px; width: 80%">Update by 01/03/2024</div>
        <div style="padding: 10px">
          <div
            class="iwantBtn"
            @click="choosedCompanyIndex = index"
            :class="{ choosedBtnClass: choosedCompanyIndex == index }"
            style="
              background-color: #f2e4fa;
              border: 2px solid rgb(0, 0, 0);
              width: auto;
              padding: 10px 15px;
              border-radius: 20px;
              text-align: center;
            "
          >
            Select
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="Double Check Before the Interview Start^_^"
      width="45%"
      style="
        border-radius: 20px;
        background-color: #d2cbed;
        height: 400px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      "
      :before-close="handleClose"
    >
      <div>
        <span
          >You are about to enter the mock interview room for
          <span style="font-weight: 600">Tencent</span>
          , where you will participate in the interview for the
          <span style="font-weight: 600">{{ position }}</span>
          position!</span
        >
        <!-- 选择时长，难度，主题 -->
        <div
          style="
            display: flex;
            justify-content: start;
            align-items: center;
            margin-top: 50px;
          "
        >
          <span style="font-size: 16px; width: 80px">Time</span>
          <el-slider v-model="span" size="large" style="width: 70%" />
          <span style="font-size: 16px; margin-left: 10px">
            {{ span }} minutes</span
          >
        </div>
        <div style="display: flex; justify-content: start; align-items: center">
          <span style="font-size: 16px; width: 80px">Difficulty</span>
          <el-slider v-model="level" size="large" style="width: 70%" />
          <span style="font-size: 16px; margin-left: 10px"> {{ level }} %</span>
        </div>
        <div style="display: flex; justify-content: start; align-items: center">
          <span style="font-size: 16px; width: 80px">Topic</span>
          <span style="font-size: 16px; margin-left: 10px">
            {{ "Topic 1" }}
          </span>
          <!-- <el-select
            v-model="value"
            placeholder="Select"
            size="small"
            style="
              width: 70px;
              padding-right: 10px;
              background-color: aqua;
              overflow: visible;
            "
          >
            <el-option label="主题一" value="主题一" />

            <el-option label="主题二" value="主题二" />

            <el-option label="主题三" value="主题三" />
          </el-select> -->
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">我在想想</el-button>
          <el-button @click="gotoInterviewRoom"> 出发 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import tencentLogo from "../assets/tecent.jpg";
import hand from "../assets/hand.png";
import { useRouter } from "vue-router";
const router = useRouter();
const position = ref("");
const company = ref("");
const choosedCompanyIndex = ref(-1);
const dialogVisible = ref(false);

const span = ref(0);
const level = ref(0);

const beforeStartInterview = () => {
  dialogVisible.value = true;
};
const gotoInterviewRoom = () => {
  dialogVisible.value = false;
  router.push("/interview");
};
</script>

<style lang="less" scoped>
:deep(.el-input) {
  width: 600px;
  border-radius: 50px;
  background-color: #d2cbed;
  margin: 10px 0 0px;
  border: 2px solid rgb(0, 0, 0);
}
:deep(.el-button) {
  margin: 10px 8px;
  border-radius: 50px;
  border: 2px solid rgb(0, 0, 0);
  background-color: #f2e4faea;
  transition: all 1s ease;
  --el-button-hover-text-color: black;
  &:hover {
    transform: translate(-5px, -2px);
    color: whitesmoke;
    background: linear-gradient(
      135deg,
      #880472,
      #3437dd,
      #7043db,
      #8d49da,
      #ea5bd7
    );
  }
}
:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 5px rgb(255, 102, 102);
}
:deep(.el-input__wrapper) {
  padding: 0 13;
  background-color: #d2cbed;
}
@keyframes jumpAndDown {
  from {
    transform: translateY(0);
    // transform: translateX(-50%);
  }
  to {
    transform: translateY(-20px);
    // transform: translateX(-50%);
  }
}
@keyframes swellAndshrink {
  from {
    transform: scale(1.05);
    // transform: translateX(-50%);
  }
  to {
    transform: scale(1);
    // transform: translateX(-50%);
  }
}
.igetready {
  animation-name: swellAndshrink;
  animation-duration: 0.5s;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
.hand {
  position: absolute;
  width: 50px;
  height: 50px;
  right: 8%;
  top: 9%;
  animation-name: jumpAndDown;
  animation-duration: 0.5s;
  animation-direction: alternate;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  img {
    width: 100%;
    height: 100%;
  }
}
.choosedBtnClass {
  color: whitesmoke;

  background: linear-gradient(
    135deg,
    #880472,
    #3437dd,
    #7043db,
    #8d49da,
    #ea5bd7
  );
}
.homeContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  .tip {
    color: whitesmoke;
  }
  .companiesContainer {
    margin-top: 10px;
    border-radius: 50px;
    width: 100%;
    height: auto;
    flex-wrap: wrap;
    display: flex;
    padding: 20px;
    padding-top: 10px;
    background-color: #f2e4fa;
    border: 2px solid rgb(0, 0, 0);
    justify-content: space-around;

    .companyItem {
      border-radius: 15px;
      margin: 10px 0;
      width: 150px;
      height: 200px;
      background: linear-gradient(45deg, #7e47ed, #e6d8fb);
      border: 2px solid rgb(0, 0, 0);
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .iwantBtn {
        position: relative;
        transition: all 1s ease;
        &:hover {
          transform: translate(-5px, -2px);
          color: whitesmoke;
          transition: all 0.8s ease;
          cursor: pointer;
          background: linear-gradient(
            135deg,
            #880472,
            #3437dd,
            #7043db,
            #8d49da,
            #ea5bd7
          );
        }
      }
    }
  }
}
</style>
