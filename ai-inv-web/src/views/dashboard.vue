<template>
  <div class="dashboardContainer">
    <!-- 制定你的面试联系计划 -->
    <div class="columnName">Develop your Own interview plan!</div>
    <div class="planContainer">
      <!-- <WSchedule 
        :planList="timePeriodList"
        :isFirstDayOfMondayOrSunday="7"
        @handleDetail="handleDetail"
        @handleCardDetail="handleCardDetail"
        @changeWeek="changeWeek"
      >
        <template v-slot:thing="{ row }">
          <span>上课日期：{{ row.date }}</span>
          <span>上课时间：{{ row.timePeriod }}</span>
          <span>上课老师：{{ row.watchman }}</span>
          <span>上课地点：{{ row.place }}</span>
        </template>
      </WSchedule> -->
    </div>
    <!-- 整体面试趋势 -->
    <div class="columnName">Overall interview trends</div>
    <div class="trendContainer">
      <div class="topContainer">
        <div class="searchContainer"><span>filter box</span></div>
      </div>
      <div class="bottomContainer"><span>Line graphs</span></div>
    </div>
    <!-- 面试历史 -->
    <div class="columnName">Interview History</div>
    <div class="historyContainer">
      <div v-for="(item, index) in 3" class="companyItem">
        <div><img :src="tencentLogo" width="50%" /></div>
        <div style="font-size: 14px; width: 80%">Updated 01/04/2024</div>
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
            Check Details
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import tencentLogo from "../assets/tecent.jpg";
</script>
<style lang="less" scoped>
.dashboardContainer {
  width: 100%;
  //   background-color: aqua;
  height: auto;
  .columnName {
    color: whitesmoke;
    margin: 10px 0;
    margin-top: 30px;
    padding-left: 20px;
  }
  .planContainer {
    padding: 1rem;
    border: 2px solid rgb(0, 0, 0);
    height: 500px;
    border-radius: 50px;
    background-color: #f2e4fa;
  }
  .trendContainer {
    padding: 1rem 2rem;
    border: 2px solid rgb(0, 0, 0);
    border: 2px solid rgb(0, 0, 0);
    border-radius: 50px;
    background-color: #f2e4fa;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: auto;
    .topContainer {
      //   background-color: violet;
      width: 100%;
      height: 40px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .searchContainer {
        border: 2px #2e54a1 solid;
        align-items: center;
        display: flex;
        justify-content: center;
        width: 35%;
        height: 80%;
        background-color: #f2f2f2;
      }
    }
    .bottomContainer {
      width: 100%;
      margin-top: 15px;
      background-color: #dae3f5;
      border: 2px solid #b4c1e9;
      border-radius: 60px;
      height: 320px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .historyContainer {
    padding: 1rem;
    border: 2px solid rgb(0, 0, 0);
    border: 2px solid rgb(0, 0, 0);
    border-radius: 50px;
    background-color: #f2e4fa;
    height: 300px;
    flex-wrap: wrap;
    display: flex;
    justify-content: start;
    .companyItem {
      border-radius: 15px;
      margin: 10px 20px;
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
