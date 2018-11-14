<template>
    <div class="my-reward">
        <div class="nav">
            <router-link tag="div" class="nav-item" @click.native="changeTabs(0)" replace :to="{path: '/myRewards/ableUseRewards'}">未使用<span v-show="curIndex === 0">({{1}})</span></router-link>
            <router-link tag="div" class="nav-item" @click.native="changeTabs(1)" replace :to="{path: '/myRewards/usedRewards'}">使用记录<span v-show="curIndex === 1">({{2}})</span></router-link>
            <router-link tag="div" class="nav-item" @click.native="changeTabs(2)" replace :to="{path: '/myRewards/overtimeRewards'}">已失效<span v-show="curIndex === 2">({{3}})</span></router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
  beforeRouteEnter: (to, from, next) => {
    document.title = "我的奖励券";
    next();
  },
  name: 'myRewards',
  data() {
    return {
      curIndex: 0
    };
  },
  mounted() {},
  methods: {
    changeTabs(index) {
      this.curIndex = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.my-reward {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .nav {
    height: px2rem(89);
    display: flex;
    .nav-item {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      @include font-dpr(28px);
      color: #666666;
      &.router-link-active {
        color: #5e93fc;
      }
    }
  }
}
</style>

