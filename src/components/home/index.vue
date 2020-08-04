<template>
  <div class="homeContainer">
    <TabBar>
      <van-tabs
        background="#4fc08d"
        color="white"
        border="false"
        @change="moduleClick"
        v-model="activeName"
      >
        <van-tab
          v-for="item in myModules"
          :title="item.title"
          :key="item.key"
          :name="item.key"
          style="min-height:100vh"
          title-style="color: white"
        >
          <van-pull-refresh
            v-model="isLoading"
            @refresh="onRefresh"
            style="min-height:80vh"
            success-text="刷新成功"
          >
            <van-swipe-cell v-for="article in moduleArticle" :key="article.id">
              <van-card
                :price="article.addDate | dateformat('YYYY-MM-DD HH:mm:ss')"
                currency=""
                :name="article.key"
                :desc="article.detail"
                :title="article.title"
                class="goods-card"
                @click="articleClick(article.id)"
              />
              <van-button
                slot="right"
                square
                text="删除"
                @click="deleteArticle(article.id)"
                type="danger"
                class="delete-button"
              />
              <van-button
                class="move-botton"
                slot="right"
                square
                @click="moveArticle(article.id)"
                type="primary"
                text="移动"
              />
            </van-swipe-cell>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>
    </TabBar>
    <van-popup
      v-model="moveArticlePop"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <van-picker
        show-toolbar
        value-key="text"
        :columns="pickerColumns"
        @cancel="moveArticlePop === true"
        @confirm="confirmMove"
      />
    </van-popup>
  </div>
</template>

<script>
import TabBar from "@/components/common/tab-bar";
import api from "../../utils/Contant";
import { Toast } from "vant";
export default {
  data() {
    return {
      myModules: [],
      moduleArticle: [],
      isLoading: false,
      activeName: null,
      articleId: null,
      moveArticlePop: false,
      pickerColumns: []
    };
  },

  created() {
    this.initModules();
  },
  methods: {
    async initModules() {
      const {
        data: {
          data: { myModules }
        }
      } = await this.axios.get(api.modules);
      this.myModules = myModules;
      const [{ key }] = myModules;
      this.activeName = key;
      const {
        data: {
          data: { moduleArticle }
        }
      } = await this.axios.get(
        api.moduleArticle.format({ moduleKey: Number(key) })
      );
      this.moduleArticle = moduleArticle;
      this.pickerColumns = await myModules.map(item => ({
        text: item.title,
        defaultIndex: item.key
      }));
    },
    async moduleClick(key, callback) {
      const {
        data: {
          status,
          data: { moduleArticle }
        }
      } = await this.axios.get(
        api.moduleArticle.format({ moduleKey: Number(this.activeName) })
      );
      this.moduleArticle = moduleArticle;
      if (status === 200 && callback()) {
        callback();
      }
    },
    articleClick(id) {
      this.$router.push({ path: "/article/" + id });
    },
    onRefresh() {
      this.moduleClick(this.activeName, () => {
        Toast("刷新成功");
        this.isLoading = false;
      });
    },
    async deleteArticle(id) {
      const {
        data: { message, status }
      } = await this.axios.delete(api.article.delete.format({ id }));
      if (status === 200) {
        this.$notify({ type: "success", message });
        this.moduleClick(this.activeName);
      }
    },
    moveArticle(id) {
      this.articleId = id;
      this.moveArticlePop = true;
    },
    async confirmMove({ defaultIndex }) {
      const {
        data: { status, message }
      } = await this.axios.put(api.article.move, {
        id: this.articleId,
        moduleKey: defaultIndex
      });
      if (status === 200) {
        this.$notify({ type: "success", message });
        this.moduleClick(this.activeName);
        this.moveArticlePop = false;
      }
    }
  },
  components: {
    TabBar
  }
};
</script>

<style lang="less">
.homeContainer {
  .van-swipe-cell {
    .van-swipe-cell__wrapper {
      border-top: 1px solid rgb(240, 240, 240);
      border-bottom: 8px solid rgb(249, 249, 249);
    }
    .van-card__content {
      min-height: 76px;
    }
    .van-card {
      background: white;
      border-bottom: 1px solid rgb(240, 240, 240);
    }
    .van-card__title {
      font-size: 14px;
      margin-bottom: 8px;
      margin-top: 4px;
    }
    .van-card__price {
      font-weight: normal;
      font-size: 6px;
      color: #969799;
    }
    .van-card__price-integer {
      font-family: none;
      font-size: 10px;
    }
    .van-card__desc {
      max-height: none;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      white-space: normal;
    }
    .delete-button,
    .move-botton {
      height: 100%;
    }
    .van-card__bottom {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
    }
  }
}
</style>
