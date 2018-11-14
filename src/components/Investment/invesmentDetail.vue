<template>
    <div class="invesmentDetail">
         <scroll 
            ref="scroll" 
            class="scroll-container"
            @pullingDown="pullingDown"
        >  
            <div>
                <div class="swiper-container"  ref="sliderWrapper">
                    <slider :showDot="product.photo.length > 1" :autoPlay="product.photo.length > 1" :loop="product.photo.length > 1" v-if="product.photo.length">
                        <div v-for="(item,index) in product.photo" :key="index">
                            <a :href="item.link">
                                <img class="needsclick"  :src="product.photoIp+item.src">
                            </a>
                        </div>
                    </slider>
                </div>
                <div class="product_title">
                    <p class="p1">丰田 BT720(海外购)2018款 2.7L 南极版</p>
                    <p class="p2">产品规模 20万</p>
                </div>
                <div class="product_parameter">
                    <div class="list_item">
                        <div class="left">
                            <span class="price">价格</span>
                            <span class="priceNum">￥39.98536,25</span>
                        </div>
                        <div class="right">
                            <span class="consult" @click="toConsultProduct(0)">询价</span>
                        </div>
                    </div>
                    <div class="list_item" @click="showCarCoupon = true">
                        <div class="left">
                            <span class="price">领劵</span>
                            <span class="coupons">￥1000</span>
                            <span class="coupons">￥1000</span>
                            <span class="coupons">￥1000</span>
                        </div>
                        <div class="right">
                            <span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>
                    </div>
                </div>
                <div class="product_parameter">
                    <div class="list_item">
                        <div class="left">
                          <span class="price">已选</span>
                          <span class="priceNum">2018款 2.7L (进口) 高配</span>
                        </div>
                        <div class="right">
                            <span class="dot"></span>
                            <span class="dot"></span>
                            <span class="dot"></span>
                        </div>
                    </div>
                </div>
                <div class="productDetail-container">
                    <div class="nav" @click="refreshScroll">
                        <div class="left" :class="{active:curIndex === 0 }" @click="changeTab(0)">
                            <span>商品介绍</span>
                        </div>
                        <div class="left" :class="{active:curIndex === 1 }" @click="changeTab(1)">
                            <span>参数配置</span>
                        </div>
                    </div>
                    <div class="swiper2-container" >
                        <transition name="fade">
                            <Particulars :pContent="product.pContent" v-if="!showDetail"></Particulars>
                            <Detail :productItem="product.productItem" :photoIp="product.photoIp" v-if="showDetail" @loadImage='loadImage'></Detail>
                        </transition>
                    </div>
                </div>
                <div class="recommend">
                  <div class="title-container">
                      <p class="title">最新推荐</p>
                  </div>
                  <div class="product_recommend">
                      <div class="item" v-for="(item,index) in recommendLists" :key="index" @click="toProductDetail(item.price)">
                          <div class="img-container">
                              <img :src="item.imgUrl">
                          </div>
                          <p class="describe">{{toEllipsis(item.title, 20)}}</p>
                          <div class="item-info">
                              <span class="percent">￥{{item.price  | toPrecent}}</span>
                          </div>
                      </div>
                      <p class="underline" v-show="isLastPage">已经到底了...</p>
                  </div>
                </div>
            </div>
         </scroll>
        <div class="loading-container" v-show="showLoading">
            <loading></loading>
        </div>
        <div class="fixed-footer">
            <div class="servers">
                <span class="icon"></span>
                <span class="kefu">收藏</span>
            </div>
            <div class="control-btn">
                <span class="history-btn">加入购物车</span>
                <span @click="toConsultProduct(1)" class="fast-btn">支付定金￥99.00</span>
            </div>
        </div>
        <!-- 客服弹出层 -->
        <div class="servers-mock">
            <div class="servers">
                <div class="wx"></div>
                <div class="phone"></div>
            </div>
        </div>
        <!-- 优惠卷 -->
        <transition name="fade">
            <car-coupon v-if="showCarCoupon" @closeShow="closeCarCoupon" @use="sueCarCoupon" @cancel="cancelCarCoupon"></car-coupon>
        </transition>
    </div>
</template>
<script>
import Slider from "src/base/slider/slider";
import Scroll from "src/base/scroll/scroll";
import Loading from "src/base/loading/loading";
import Particulars from "./child/particulars";
import Detail from "./child/detail";
import SliderOld from "src/base/slider/slider.old";
import carCoupon from "src/components/Investment/child/carCoupon";
import { mapMutations, mapGetters } from "vuex";
export default {
  beforeRouteEnter(to, from, next) {
    if (!to.query.pId) {
      next(from.fullPath);
    }
    document.title = "投资详情";
    next();
  },
  data() {
    return {
      //轮播图数据
      lists: [
        {
          src: require("./img/banner@2x.jpg"),
          link: ""
        },
        {
          src: require("./img/banner@2x.jpg"),
          link: ""
        }
      ],
      defalutUserImg: require("./img/userDefault.png"),
      //投资人数据
      investors: [1, 2, 3, 4, 4, 5],
      //产品数据
      product: {
        pContent: {},
        photo: [],
        productItem: {},
        inverstorImages: []
      },
      //产品id
      id: "",
      //是否显示loading
      showLoading: false,
      //当前导航的index
      curIndex: 0,
      showDetail: false,
      //推荐的列表
      recommendLists: [],
      isLastPage: false,
      showCarCoupon: false
    };
  },
  created() {
    this.id = this.$route.query.pId;
    this._getProductById(this.id);
    this.getRecommendLists(1);
  },
  mounted() {
    setTimeout(() => {
      //设置左右滑动时，父级的宽度为两倍的子元素
      this.$refs.scroll.refresh();
    }, 20);
  },
  computed: {},
  methods: {
    pullingDown(e) {
      this.$refs.scroll.finishPullDown();
    },
    refreshScroll() {
      setTimeout(() => {
        this.$refs.scroll.refresh();
      }, 500);
    },
    scroll(pos) {
      this.scrollX = pos.x;
    },
    loadImage() {
      this.$refs.scroll.refresh();
    },
    changeTab(index) {
      this.curIndex = index;
      if (index === 0) {
        this.showDetail = false;
      } else {
        this.showDetail = true;
      }
      setTimeout(() => {
        this.$refs.scroll.refresh();
      }, 20);
    },
    //获取产品详情
    _getProductById(id) {
      this.showLoading = true;
      let me = this;
      this.product.photo = this.lists;
      this.showLoading = false;
    },
    getRecommendLists(pageIndex) {
      this.showLoading = true;
      let arr = [
        {
          title: "奥迪 雅阁 进口 2018新款 超级定制版",
          imgUrl:
            "http://yuanying.zsbzg.net/carImage/2018-07-05/ddabcfb1a1b74e079071a69eeee44aff.png",
          price: "43000000"
        },
        {
          title: "奥迪 雅阁 进口 2018新款 超级定制版",
          imgUrl:
            "http://yuanying.zsbzg.net/carImage/2018-07-05/ddabcfb1a1b74e079071a69eeee44aff.png",
          price: "43000000"
        },
        {
          title: "奥迪 雅阁 进口 2018新款 超级定制版",
          imgUrl:
            "http://yuanying.zsbzg.net/carImage/2018-07-05/ddabcfb1a1b74e079071a69eeee44aff.png",
          price: "43000000"
        }
      ];

      this.recommendLists = arr;
      this.showLoading = false;
      this.isLastPage = true;
    },
    toProductDetail(id) {
      this.$router.push({ path: `/home/invesmentDetail`, query: { pId: id } });
    },
    toEllipsis(text, num) {
      if (typeof text !== "string") {
        return;
      }
      return text.length > num ? text.substr(0, num) + "..." : text;
    },
    // 关闭优惠卷弹框
    closeCarCoupon(e) {
      this.showCarCoupon = false;
    },
    cancelCarCoupon() {
      this.showCarCoupon = false;
    },
    sueCarCoupon(e) {
      console.log(e);
    },
    toConsultProduct(e) {
      this.$router.push({ path: `/consultProduct`, query: { Boole: e } });
    }
  },
  components: {
    Slider,
    Scroll,
    Loading,
    Particulars,
    Detail,
    SliderOld,
    carCoupon
  }
};
</script>
<style lang="scss" scoped>
.invesmentDetail {
  background-color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  .scroll-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: px2rem(88);
    overflow: hidden;
  }
  .loading-container {
    position: absolute;
    bottom: 20%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .swiper-container {
    height: px2rem(374);
    width: 100%;
    text-align: bottom;
  }
  .product_title {
    padding: px2rem(50) px2rem(30);
    .p1 {
      font-size: $f-s30;
      font-weight: bold;
    }
    border-bottom: px2rem(15) solid $c-f55;
  }
  .product_parameter {
    padding: 0 px2rem(30);
    border-bottom: px2rem(15) solid $c-f55;

    .list_item + .list_item {
      border-top: px2rem(1) solid #eee;
    }
    .list_item {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding: px2rem(35) 0;
      .left {
        font-size: $f-s28;
        .price {
          margin-right: px2rem(25);
          color: $c-999;
        }
        .priceNum {
          color: $c-333;
        }
        .coupons + .coupons {
          margin-left: px2rem(10);
        }
        .coupons {
          padding: px2rem(10) px2rem(20);
          background-color: $c-f98;
          color: $c-fff;
        }
      }
      .right {
        .consult {
          padding: px2rem(10) px2rem(30);
          color: $c-f57;
          border: px2rem(1) solid $c-f57;
          border-radius: px2rem(30);
        }
        .dot {
          display: inline-block;
          width: px2rem(10);
          height: px2rem(10);
          border-radius: 50%;
          background-color: $c-eee;
        }
        .dot:first-child {
          background-color: $c-999;
        }
        .dot:last-child {
          background-color: $c-999;
        }
      }
    }
  }
  .investor-container {
    height: px2rem(88);
    padding: 0 px2rem(30);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: px2rem(20) solid #f5f5f5;
    .investor-img {
      height: 100%;
      display: flex;
      align-items: center;
      img {
        height: px2rem(50);
        width: px2rem(50);
        border-radius: 50%;
        margin-left: px2rem(-10);
        &:first-child {
          margin-left: 0;
        }
      }
    }
    .investors {
      @include font-dpr(24px);

      .investor-count {
        color: #5e93fc;
      }
      .iconfont {
        @include font-dpr(24px);
      }
    }
  }
  .productDetail-container {
    .nav {
      height: px2rem(90);
      box-sizing: border-box;
      border-bottom: 1px solid #ededed;
      display: flex;
      > div {
        flex: 1;
        display: flex;
        justify-content: center;
        span {
          height: 100%;
          display: flex;
          align-items: center;
          box-sizing: border-box;
        }
        &.active {
          span {
            border-bottom: px2rem(4) solid #5e93fc;
            color: #5e93fc;
          }
        }
      }
    }
    .hScroll {
      width: 100%;
      // overflow-x: hidden;
      height: auto;
      .swiper-container {
        display: flex;
        height: auto;
        width: 100vw;
      }
    }
  }
  .recommend {
    display: flex;
    flex-direction: column;
    .title-container {
      height: px2rem(44);
      box-sizing: border-box;
      padding: px2rem(8) px2rem(28);
      .title {
        border-left: px2rem(4) solid #5e93fc;
        padding-left: px2rem(16);
        line-height: 1;
        @include font-dpr(26px);
      }
    }
  }
  .product_recommend {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    .item {
      height: px2rem(396);
      width: 49%;
      padding-top: px2rem(12);
      margin-bottom: px2rem(12);

      .img-container {
        box-sizing: border-box;
        background-color: #f0f0f0;
        width: 100%;
        height: px2rem(240);
        margin-bottom: px2rem(20);
        padding: 0 px2rem(36);
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 100%;
          max-height: 100%;
        }
      }
      .describe {
        padding: 0 px2rem(44) 0 px2rem(30);
        @include font-dpr(26px);
        // @include ml-ellipsis(2);
        height: 2.8em;
        overflow: hidden;
        white-space: wrap;
      }
      .item-info {
        display: flex;
        justify-content: space-between;
        padding-left: px2rem(30);
        padding-right: px2rem(20);
        margin-top: px2rem(22);
        .percent {
          @include font-dpr(26px);
          color: #f57f3f;
        }
        .lock-day {
          @include font-dpr(22px);
          color: #999;
        }
      }
    }
    .underline {
      @include hintLine();
    }
  }
  .fixed-footer {
    position: fixed;
    bottom: 0;
    height: px2rem(88);
    left: 0;
    right: 0;
    padding: px2rem(16) px2rem(28);
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    @include font-dpr(28px);

    .servers {
      color: #666666;
      height: 100%;
      display: flex;
      flex: 1;
      margin-right: px2rem(48);
      border-right: 1px solid #e4e4e4;
      align-items: center;
      .icon {
        background-image: url("./img/serversPhone@2x.png");
        background-repeat: no-repeat;
        background-size: contain;
        width: px2rem(30);
        height: px2rem(35);
        padding-right: px2rem(20);
      }
    }
    .control-btn {
      display: flex;
      width: px2rem(480);
      height: 100%;
      border-radius: px2rem(28);
      overflow: hidden;
      span {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        &.history-btn {
          background-color: #5e93fc;
        }
        &.fast-btn {
          background-color: #f57f3f;
        }
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    transform: translate3d(0, 100%, 0);
  }
}
</style>


