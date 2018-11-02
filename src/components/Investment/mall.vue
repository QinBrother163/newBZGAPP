<template>
    <div id="mall">
        <nav class="nav">
            <ul class="first-nav">
                <li :class="{active: first_nav_index === 0}">新车</li>
                <li >二手车</li>
                <li >汽车配件</li>
            </ul>
            <ul class="second-nav">
                <li><span>综合排序</span></li>
                <li><span>价格</span></li>
                <li><span>品牌</span></li>
                <li><span>车型</span></li>
            </ul>
        </nav>
        <Scroll class="filters-container"
            ref="suggest"
            :listenScroll="true"
            @pullingDown="pullingDown"
            @pullingUp="pullingUp"
            :probeType="3" 
        >
            <!-- <comprehensiveFilter v-on:getThreeNavIndex="_getThreeNavIndex" :threeNavIndex='three_nav_index'></comprehensiveFilter> -->
            <!-- <price-filter v-on:getThreeNavIndex="_getThreeNavIndex" :threeNavIndex='three_nav_index'></price-filter> -->
            <!-- <car-type v-on:getThreeNavIndex="_getThreeNavIndex" :threeNavIndex='three_nav_index'></car-type> -->
            <!-- <car-brand :elementIndex="elementIndex" @singleLetter="singleLetter" v-on:getThreeNavIndex="_getThreeNavIndex" :carBrandList='arr'></car-brand> -->
            <!-- <right-nav-list :flagText="flagText" :navList="cityIndexList" @toElement="toElement" ></right-nav-list> -->
        

        </Scroll>
        <div class="mall_content">
            jjj
        </div>
    </div>
</template>
<script>
import Scroll from "src/base/scroll/scroll";
import navData from "./navData.js";
import comprehensiveFilter from "./child/comprehensiveFilter";
import priceFilter from "./child/priceFilter";
import carType from "./child/carType";
import carBrand from "./child/carBrand";
import rightNavList from "./child/rightNavList";
export default {
  data() {
    return {
      first_nav_index: 0,
      two_nav_index: 0,
      three_nav_index: 0,

      arr:[],
      cityIndexList:['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','W','X','Y','Z'],
      elementIndex:'',
      flagText:'A',
    };
  },
  methods: {
      pullingDown(e) {
      this.showLoading = false;
      this.$refs.suggest.finishPullDown();
    },

    pullingUp() {
      if (this.isLastPage) {
        return;
      }
      this.$refs.suggest.finishPullUp();
    },
    //   获取三级导航引索
    _getThreeNavIndex: function(e) {
      console.log(e);
    },
    // 点击右边nav，向citylist组件传值
    toElement (text) {
      if (text === 'A') {
        this.$refs.suggest.scrollToElement(this.$refs.positionBox, 200, false, 0);
      }
      this.elementIndex = text;
    },
    // 滚动到相应的dom节点
    singleLetter (dom) {
      this.$refs.suggest.scrollToElement(dom, 200, false, 0);
    },
  },
  components: {
    Scroll,
    comprehensiveFilter,
    priceFilter,
    carType,
    carBrand,
    rightNavList,
  }
};
</script>
<style lang="scss" scoped>
#mall {
  @include page();
  .nav {
    height: px2rem(150);
    padding: 0 px2rem(24);
    display: flex;
    flex-direction: column;
    .first-nav {
      height: px2rem(77);
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      flex-shrink: 0;
      > li {
        flex: 1;
        height: 100%;
        line-height: px2rem(77);
        text-align: center;
        position: relative;
        &.active::after {
          content: "";
          width: 60%;
          height: 2px;
          background-color: blue;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    .second-nav {
      flex: 1;
      display: flex;
      border-bottom: 1px solid #eee;
      justify-content: space-around;
      align-items: center;
      margin-top: px2rem(20);
      padding-bottom: px2rem(20);
      > li {
        width: px2rem(130);
        background-color: #eee;
        text-align: center;
        padding: px2rem(6) px2rem(5);
        border-radius: px2rem(20);
      }
    }
  }
  .filters-container {
    position: absolute;
    left: 0;
    right: 0;
    top: px2rem(150);
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }
}
</style>

