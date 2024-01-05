<template>
  <div class="rectangle-box3">
    <el-form>
      <el-form-item label="" prop="imageUrl">
        <el-upload
          action="#"
          ref="upload"
          v-model:file-list="fileList"
          list-type="picture-card"
          :auto-upload="false"
          clearable
          :on-remove="handleRemove"
        >
          <el-icon><Plus /></el-icon>

          <template #file="{ file }">
            <div>
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              />
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <el-icon><zoom-in /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleDownload(file)"
                >
                  <el-icon><Download /></el-icon>
                </span>
                <span
                  v-if="!disabled"
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file, null)"
                >
                  <el-icon><Delete /></el-icon>
                </span>
              </span>
            </div>
          </template>
        </el-upload>

        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </el-form-item>
    </el-form>

    <el-row class="mb-4">
      <el-button>确定炼制</el-button>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Delete, Download, Plus, ZoomIn } from "@element-plus/icons-vue";

import type { UploadProps, UploadFile, UploadUserFile } from "element-plus";

const dialogImageUrl = ref("");
const dialogVisible = ref(false);
const disabled = ref(false);

const fileList = ref([]);

const handleRemove = (file, fileList) => {
  // 找到对应文件的索引
  const index = fileList.indexOf(file);

  if (index !== -1) {
    // 从文件列表中移除文件
    fileList.splice(index, 1);

    // 如果当前图片正在预览，关闭预览
    if (dialogImageUrl.value === file.url) {
      dialogVisible.value = false;
    }

    //   const uploadInstance = this.$refs.upload as any;
    //   uploadInstance.clearFiles();
  }
};

const handlePictureCardPreview = (file) => {
  console.log(file);
  console.log(fileList);
  fileList.value = [];

  dialogImageUrl.value = file.url!;
  dialogVisible.value = true;
};

const handleDownload = (file) => {
  if (!file.url) {
    return;
  }
  const link = document.createElement("a");
  link.href = file.url;
  link.download = "downloaded-image.jpg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
</script>

<style lang="less">
.rectangle-box3 {
  //   position: absolute;
  //   top: 73.5%;
  //   left: 27%;
  width: 700px;
  height: 350px;
  //   transform: translate(-50%, -50%);
  background-color: #fef2b1;
  border-radius: 15px; /* 圆润的四个角，根据需要调整圆角半径 */
  border: 2px solid #000000;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  overflow: auto;
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
