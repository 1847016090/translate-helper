<template>
  <div>
    <TabBar>
      <van-swipe-cell>
  <van-card
    num="2"
    price="2.00"
    desc="描述信息"
    title="商品标题"
    class="goods-card"
  />
  <van-button
    slot="right"
    square
    text="删除"
    type="danger"
    class="delete-button"
  />
</van-swipe-cell>
    </TabBar>
  </div>
</template>
<script>
import TabBar from "@/components/common/tab-bar";
import { Toast } from "vant";
export default {
  data() {
    return {
      count: 0,
      isLoading: true
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        this.count++;
      }, 1000);
    }
  },
  components: {
    TabBar
  }
};
</script>

<style></style>
