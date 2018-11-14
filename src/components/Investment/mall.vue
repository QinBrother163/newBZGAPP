<template>
    <div id="mall">
        <nav class="nav">
            <div class="first-nav">
                <p @click.stop="firstSort(index)" :class="{active: first_nav_index === index}" v-for="(item,index) in firstNavData" :key="index">{{item}}</p>
            </div>
            <div class="second-nav">
                <p @click.stop="secondSort(index)" :class="{secondFocus: two_nav_index === index}" v-for="(item,index) in secondNavData" :key="index"><span>{{item}}</span></p>
            </div>
        </nav>

        <div class="filters-container" v-show="three_show_idx != 99" style="z-index: 9999;">
            <comprehensiveFilter v-show="three_show_idx === 0" v-on:closeShow="_closeShow" v-on:getThreeNavIndex="_getThreeNavIndex" :threeNavIndex='three_nav_index'></comprehensiveFilter>
            <price-filter v-show="three_show_idx === 1" v-on:closeShow="_closeShow" v-on:getThreeNavIndex="_getThreeNavIndex" :threeNavIndex='three_nav_index'></price-filter>
            
            <car-type v-show="three_show_idx === 3" v-on:closeShow="_closeShow" v-on:getThreeNavIndex="_getThreeNavIndex" :threeNavIndex='three_nav_index'></car-type>

            <Scroll v-if="three_show_idx === 2" class="" style="overflow:auto;height:100%"
            ref="suggest"
            :listenScroll="true"
            @pullingDown="pullingDown"
            @pullingUp="pullingUp"
            :probeType="3" 
            >

              <car-brand :elementIndex="elementIndex" @singleLetter="singleLetter" v-on:getThreeNavIndex="_getThreeNavIndex" :carBrandList='arr'></car-brand>
              <right-nav-list :flagText="flagText" :navList="cityIndexList" @toElement="toElement" ></right-nav-list>

            </Scroll>
        </div>
        
  
         
          <Scroll class="mall_content" style="height:100%"
            ref="mallContent"
            :listenScroll="true"
            @pullingDownMC="pullingDownMC"
            @pullingUpMC="pullingUpMC"
            :probeType="3" 
            >
              <div class="recommendLists">
                <div v-cloak class="item" v-for="(item,index) in recommendLists" :key="index">
                    <div class="img-container">
                        <img :src="item.imgUrl">
                    </div>
                    <p class="describe">{{toEllipsis(item.title, 20)}}</p>
                    <div class="item-info">
                        <span class="percent">￥{{item.price  | toPrecent}}</span>
                        <!-- <span class="lock-day">锁定期{{item.inversCycle}}天</span> -->
                    </div>
                </div>
                <p class="underline" v-show="isLastPage">已经到底了...</p>
              </div>
            
          </Scroll>
        
        <div class="footer-container" ref="footer">
            <common-footer></common-footer>
            <router-link tag="div" class="smallBell" to="/systemMsg">
                <!-- <span class="tips"  v-if="newsNum > 0">{{newsNum > 99 ? 99+'+' : newsNum}}</span> -->
            </router-link>
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
import Loading from "src/base/loading/loading";
import commonFooter from "src/base/commonFooter/commonFooter";
export default {
  data() {
    return {
      first_nav_index: 0,
      two_nav_index: null,
      three_nav_index: 0,

      recommendLists: [],

      isLastPage: false,
      showLoading: false,

      arr: [],
      cityIndexList: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "J",
        "K",
        "L",
        "M",
        "N",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "W",
        "X",
        "Y",
        "Z"
      ],
      elementIndex: "",
      flagText: "A",

      firstNavData: ["新车", "二手车", "汽车配件"],
      secondNavData: ["综合排序", "价格", "品牌", "车型"],

      three_show_idx: 99
    };
  },
  created() {
    this.getRecommendListsData();
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
    pullingDownMC(e) {
      this.showLoading = false;
      this.$refs.mallContent.finishPullDown();
    },

    pullingUpMC() {
      if (this.isLastPage) {
        return;
      }
      this.$refs.mallContent.finishPullUp();
    },
    // 一级导航焦点
    firstSort(index) {
      this.first_nav_index = index;

      this.getSecondNavTitleData(index);
    },
    // 二级导航焦点
    secondSort(index) {
      this.two_nav_index = index;

      this.setThreeNavShow(index);
    },
    // 获取二级导航标题内容
    getSecondNavTitleData(idx) {
      let arr1 = ["综合排序", "价格", "品牌", "车型"];
      let arr2 = ["综合排序", "价格", "品牌", "颜色"];
      let arr3 = ["综合排序", "价格", "类别"];

      switch (idx) {
        case 0:
          this.secondNavData = arr1;
          break;
        case 1:
          this.secondNavData = arr2;
          break;
        case 2:
          this.secondNavData = arr3;
          break;
        default:
          break;
      }
    },
    // 设置三级导航内容
    setThreeNavShow(idx) {
      this.three_show_idx = idx;
    },
    //   获取三级导航引索
    _getThreeNavIndex(e) {
      console.log(e);
    },

    // 点击右边nav，向citylist组件传值
    toElement(text) {
      if (text === "A") {
        this.$refs.suggest.scrollToElement(
          this.$refs.positionBox,
          200,
          false,
          0
        );
      }
      this.elementIndex = text;
    },
    // 滚动到相应的dom节点
    singleLetter(dom) {
      this.$refs.suggest.scrollToElement(dom, 200, false, 0);
    },
    // 获取数据recommendLists
    getRecommendListsData() {
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
      this.isLastPage = true;
    },
    // 关闭回调
    _closeShow() {
      console.log("点击了关闭层");
      this.three_show_idx = 99;
      this.two_nav_index = null;
    },
    toEllipsis(text, num) {
      if (typeof text !== "string") {
        return;
      }
      return text.length > num ? text.substr(0, num) + "..." : text;
    }
  },
  components: {
    Scroll,
    comprehensiveFilter,
    priceFilter,
    carType,
    carBrand,
    rightNavList,
    Loading,
    commonFooter
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
      > p {
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
      > p {
        width: px2rem(130);
        background-color: #eee;
        text-align: center;
        padding: px2rem(6) px2rem(5);
        border-radius: px2rem(20);
      }
      .secondFocus {
        background-color: blue;
        color: #fff;
      }
    }
  }
  .filters-container {
    position: absolute;
    left: 0;
    right: 0;
    top: px2rem(150);
    bottom: 0;
    // background-color: rgba(0, 0, 0, 0.1);
    // background-color: #fff;

    overflow: hidden;
  }
  .mall_content {
    position: absolute;
    top: px2rem(150);
    overflow: hidden;

    .recommendLists {
      display: flex;
      flex: 1;
      flex-wrap: wrap;
      justify-content: space-between;
      width: 100%;
      padding-bottom: px2rem(250);

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
        }
      }
      .underline {
        width: 100%;
        text-align: center;
        color: #666;
      }
    }
  }
  .footer-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    .smallBell {
      width: px2rem(136);
      height: px2rem(136);
      border-radius: 50%;
      // background: url(./img/little_bell@2x.png) center no-repeat;
      background-size: contain;
      position: absolute;
      top: px2rem(-150);
      right: px2rem(30);
      background-color: transparent;
      
      .tips {
        background: #f00;
        color: #fff;
        padding: px2rem(5) px2rem(10);
        border-radius: px2rem(30);
        position: absolute;
        right: px2rem(15);
        top: px2rem(20);
      }
    }
  }
}
</style>

