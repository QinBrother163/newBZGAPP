<template>
    <div class="comprehensiveFilter">
        <div class="cover_bg" @click="closeShow"></div>
        <div class="cover_content">
        <p class="item" 
            :class="curIndex === index ? 'active': ''"
            v-for="(item,index) in list"
            :key="index"
            @click.stop="sort(item,index)"    
            >
            <!-- <span class="icon iconfont "></span> -->
            <span class="icon iconfont" :class="curIndex === index ? 'icon-xuanze-h': 'icon-xuanzekefuweidianji'"></span>
            <span>{{item.title}}</span>
        </p>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    threeNavIndex: Number,
    required: true
  },

  data() {
    return {
      list: [
        {
          title: "综合排序",
          filter: 0
        },
        {
          title: "价格由高到低",
          filter: 0
        },
        {
          title: "价格由低到高",
          filter: 0
        },
        {
          title: "关注度由高到低",
          filter: 0
        }
      ],
      curIndex: 0
    };
  },
  mounted() {
    this.curIndex = this.threeNavIndex;
  },
  methods: {
    sort(item, index) {
      this.curIndex = index;
      this.$emit("getThreeNavIndex", index);
    },
    // 关闭元素
    closeShow(){
      this.$emit("closeShow");
    }
  }
};
</script>

<style lang="scss" scoped>
.comprehensiveFilter {
  position: fixed;
  top: px2rem(150);
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;

  .cover_bg {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .cover_content{
    position: absolute;
    left: 0;
    right: 0;
    bottom: px2rem(850);
    top: 0;
    background-color: #fff;
  }

  .item {
    height: px2rem(50);
    padding: 0 px2rem(40);
    display: flex;
    align-items: center;
    &.active {
      background-color: #eee;
      .iconfont {
        color: blue;
      }
    }
    .iconfont {
      @include font-dpr(28px);
      margin-right: px2rem(10);
    }
  }
}
</style>

