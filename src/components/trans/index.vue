<template>
  <div>
    <fieldset class="upload-excel">
      <legend>上传</legend>
      <el-upload class="upload-demo" drag action="http://112.74.181.151:3000/upload/files" :on-success="uploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </el-upload>
    </fieldset>
    <fieldset class="upload-excel" v-show="transArr.length > 0">
      <legend>翻译</legend>
      <el-select v-model="value" placeholder="请选择" :change="tarnsLanChange">
        <el-option
          v-for="item in transArr"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" @click="transClick">点击翻译</el-button>
    </fieldset>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      transArr: [],
      fileId: ''
    }
  },
  methods: {
    uploadSuccess(response, file, fileList) {
      this.transArr = response.data.data;
      this.fileId = response.data.fileId;
    },
    tarnsLanChange(value){
      this.value = value
    },
    async transClick(){
      const response = await this.axios.post('http://112.74.181.151:3000/upload/translate', { transKey: this.value, fileId: this.fileId });
      if (response.data.downloadId) {
        const iframeDom = document.getElementById('translate-download-iframe');
        if (iframeDom) {
          document.body.removeChild(iframeDom);
        }
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = `http://112.74.181.151:3000/upload/excel/${response.data.downloadId}`;
        iframe.id = 'translate-download-iframe';
        document.body.appendChild(iframe);
        }
    }
  }
};
</script>

<style scoped>
.upload-excel {
  margin: 16px !important;
  padding: 16px;
}
</style>