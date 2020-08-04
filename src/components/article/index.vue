<template>
  <div>
    <van-nav-bar
      :title="isEdit ? '编辑中...' : article.title"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <van-switch v-model="isEdit" slot="right" size="24" />
    </van-nav-bar>
    <mavon-editor
      class="md"
      :value="article.info"
      :subfield="isEdit"
      :defaultOpen="'preview'"
      :toolbarsFlag="isEdit"
      :editable="true"
      :scrollStyle="true"
      :ishljs="true"
      @change="onArticleChange"
      @save="onSaveArticle"
    ></mavon-editor>
  </div>
</template>

<script>
import api from "../../utils/Contant";
import { debounce } from 'lodash'
export default {
  props: ["id"],
  data() {
    return {
      article: {},
      isEdit: false
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      let id = this.id;
      const {
        data: {
          data: { article }
        }
      } = await this.axios.get(api.articleInfo.format({ id }));
      this.article = article;
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      console.log(this.article.info);
    },
    onArticleChange: debounce(function(value){
      this.article.info = value;
      this.onSaveArticle('自动保存成功!')
    }, 1500),
    async onSaveArticle(msg) {
      const {
        data: { message, status }
      } = await this.axios.put(api.article.edit.format({ id: this.id }), {
        content: this.article.info
      });
      if (status === 200) {
        this.$notify({ type: "success", message: msg ? msg : message });
        this.init();
      }
    }
  }
};
</script>

<style lang="less">
.md {
  ul {
    list-style: disc !important;
  }
  ol {
    list-style: decimal !important;
  }
}
.van-nav-bar__right {
  top: 10px;
}
</style>
