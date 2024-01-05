<template>
  <div class="appcontainer">
    <div class="top">
      <div class="topleft">
        <img :src="logo" alt="" srcset="" />
        <span class="toptext">
          InterviewAce! Empower Your Interview Skills with Your Personal AI Coach!</span
        >
      </div>
      <el-dropdown style="padding: 10px">
        <el-avatar :size="50" :src="avatar" style="cursor: pointer" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>My Resume</el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item>Action 4</el-dropdown-item>
            <el-dropdown-item>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <router-view style="padding: 0 2rem"></router-view>
    <div class="footer"></div>
  </div>
</template>
<script setup>
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.jpg";
</script>
<style lang="less" scoped>
.appcontainer {
  width: 100vw;
  min-height: 100vh;
  overflow-y: scroll;
  background: linear-gradient(
    135deg,
    #880472,
    #3437dd,
    #7043db,
    #8d49da,
    #ea5bd7
  );
  display: flex;
  flex-direction: column;
  justify-content: start;

  .top {
    display: flex;
    background: linear-gradient(90deg, #d2d2d222, transparent);
    border-bottom: 1px solid rgba(128, 128, 128, 0.373);
    justify-content: space-between;
    margin-bottom: 10px;
    .topleft {
      display: flex;
      align-items: end;
      height: 8%;
      img {
        //   width: 120%;
        height: 100%;
      }
      .toptext {
        color: whitesmoke;
        font-size: 1.4rem;
        margin-bottom: 0.15rem;
      }
    }
  }
}
.footer {
  height: 50px;
}
</style>
