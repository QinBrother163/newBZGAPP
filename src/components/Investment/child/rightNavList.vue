<template>
  <div class="navbody">
    <div class="navList" @touchstart="start" @touchmove="move">
      <div :class="navClass (item)" :data-name="item" @click="setIndex(item)" @click.stop.prevent="clickNav(item)"  v-for="item in navList" :key="item">
        {{item}}
      </div>
    </div>
  </div>
</template>

<script>
import { handleDomData, getIndex } from "./dom";
export default {
  name: "NavList",
  props: {
    navList: Array,
    flagText: String
  },
  data() {
    return {
      touch: {
        start: 0,
        startIndex: "",
        end: 0,
        endIndex: ""
      },
      i_index: "A"
    };
  },
  created() {
    this._index = this.flagText;
  },
  methods: {
    // 根据不同的状况赋值不同的样式
    navClass(item) {
      return this.i_index === item ? "flagItem" : "navItem";
    },
    setIndex(e) {
      this.i_index = e;
    },
    // 向上触发scroll滚动事件
    scrollToElement(item) {
      this.$emit("toElement", item);
    },
    // 点击
    clickNav(item) {
      this.scrollToElement(item);
    },
    // 触摸开始，并向上触发滚动事件
    start(e) {
      let item = handleDomData(e.target, "data-name");
      this.touch.start = e.touches[0].pageY;
      this.touch.startIndex = getIndex(this.navList, item);
    },
    // 触摸过程中，根据距离变化应计算滚动到的位置
    move(e) {
      this.touch.end = e.touches[0].pageY;
      let distance = this.touch.end - this.touch.start;
      this.touch.endIndex = Math.min(
        Math.max(this.touch.startIndex + Math.floor((distance + 10) / 20), 0),
        22
      );
      this.scrollToElement(this.navList[this.touch.endIndex]);
    }
  }
};
</script>

<style lang="scss" scoped>
.navbody {
  width: px2rem(40);
  border-radius: px2rem(10);
  height: px2rem(150);
  position: absolute;
  top: px2rem(-20);
  right: 2%;
  z-index: 95;
  box-sizing: border-box;
  padding: px2rem(20) 0;
  .navItem {
    width: px2rem(40);
    height: px2rem(40);
    text-align: center;
    line-height: px2rem(40);
    font-size: px2rem(20);
    color: #777;
    user-select: none;
  }
  .flagItem {
    width: px2rem(40);
    height: px2rem(40);
    text-align: center;
    line-height: px2rem(40);
    font-size: px2rem(20);
    color: #fff;
    background: #4395ff;
    border-radius: px2rem(20);
    user-select: none;
  }
}
</style>
