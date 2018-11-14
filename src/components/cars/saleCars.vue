<template>
    <div id="invesment">
        <div class="head">
           <div class="head_content">
                <p @click.stop="setWidgetShow(index)"  :class="{active: first_head_index === index}" v-for="(item,index) in headContent" :key="index" class="item_head">{{item}}</p>
           </div>
           <div class="head_title">
                <span>购物车</span>
                <span>管理</span>
           </div>
        </div>
        <scroll ref="listScroll" 
            class="scroll-container" 
            :probeType="2" 
            :listenScroll="true"
            @pullingUp="pullingUp"
            @pullingDown="pullingDown"
        >
            <div>
                <buy-car v-show="buy_idx === 0"></buy-car>  
                <buy-car-parts v-show="buy_idx === 1"></buy-car-parts>
            </div>
        </scroll>

        <div class="tidy_buy">
          <div class="wrap">
              <div class="wrap_left">
                <span v-show="buy_idx === 1" class="icon iconfont icon-xuanzekefuweidianji">&nbsp;全选</span>
              </div>
              <div class="wrap_right">
                  合计：<span class="p1">￥99.00</span>
                  <span class="p2">结算&nbsp;(1)</span>
              </div>
          </div>
        </div>

        <div class="footer-container" ref="footer">
            <common-footer></common-footer>
        </div>
    </div>
    
</template>
<script>
import commonFooter from "src/base/commonFooter/commonFooter";
import buyCar from "./widget/buyCar";
import buyCarParts from "./widget/buyCarParts";
import Scroll from "src/base/scroll/scroll";

import Loading from "src/base/loading/loading";
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      //列表数据
      lists: [],
      headContent: ["汽车", "汽车配件"],

      topAd: require("./img/car_banner.jpg"),
      showChooseCity: false,
      showLoading: false,
      isLastPage: false,

      first_head_index: 0,
      buy_idx: 0,
    };
  },
  created() {
    //获取首部广告
    //    this._getBannerAds();
  },
  mounted() {},
  computed: {},
  methods: {
    pullingDown(e) {
      this.showLoading = false;
      this.$refs.listScroll.finishPullDown();
    },

    pullingUp() {
      if (this.isLastPage) {
        return;
      }
      this.$refs.listScroll.finishPullUp();
    },
    setWidgetShow(idx){
      this.first_head_index = idx;
      this.buy_idx = idx;
    },
    ...mapMutations({
      setCurSaleCity: "SET_CURSALECITY"
    })
  },
  components: {
    commonFooter,
    Scroll,
    Loading,
    buyCar,
    buyCarParts,
  }
};
</script>
<style lang="scss" scoped>
#invesment {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background-color: #eee;

  .head {
    width: 100%;
    background-color: rgba(0, 153, 255, 0.8);
    padding: 0 px2rem(30);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    .head_content {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -ms-flex-negative: 0;
      flex-shrink: 0;

      .item_head {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        height: 100%;
        line-height: px2rem(90);
        text-align: center;
        position: relative;
        color: #fff;

        &.active::after {
          content: "";
          width: 60%;
          height: 2px;
          background-color: #fff;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
    .head_title {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: start;
      -ms-flex-align: start;
      align-items: flex-start;
      color: #fff;
      padding: px2rem(20) 0 px2rem(80) 0;
      font-size: px2rem(30);
    }
  }
  .scroll-container {
    position: absolute;
    top: px2rem(170);
    bottom: px2rem(180);
    left: 0;
    right: 0;
    overflow: hidden;
  }
  .tidy_buy {
    position: fixed;
    left: 0;
    bottom: px2rem(94);
    width: 100%;
    border: 1px solid #eee;
    background-color: #fff;

    .wrap {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: horizontal;
      -webkit-box-direction: normal;
      -ms-flex-direction: row;
      flex-direction: row;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: start;
      -ms-flex-align: start;
      align-items: flex-start;
      padding: px2rem(20) px2rem(30);

      .wrap_left {
        span {
          font-size: $f-s28;
        }
      }

      .wrap_right {
        font-size: $f-s26;

        .p1 {
          color: $c-f57;
        }
        .p2 {
          background-color: $c-f57;
          color: $c-fff;
          padding: px2rem(10) px2rem(30);
          border-radius: px2rem(24);
          margin-left: px2rem(18);
        }
      }
    }
  }
  .footer-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>

