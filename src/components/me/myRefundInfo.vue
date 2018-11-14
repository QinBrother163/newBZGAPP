<template>
    <div class="myOrderInfo">
        <scroll 
            ref="scroll" 
            class="scroll-container"
            :listenScroll="true"
            @pullingDown="pullingDown"
            @pullingUp="pullingUp"
        >   
        <div>
            <div class="head">
                <div class="headWrap">
                    <p>请等待商家处理</p>
                    <p>还剩4天23时46分</p>
                </div>
            </div>
            <div class="amendWrap">
                <div class="explain">
                    <p class="p1">您已成功发起退款申请, 请耐心等待商家处理。</p>
                    <p class="p2">商家同意后, 请按照给出的退款地址退货, 并记录退货运单号。</p>
                </div>
                <div class="dispose">
                    <span>取消申请</span>
                    <span>修改申请</span>
                </div>
            </div>
            <div class="listWrap">
                <div v-for="(item,index) in lists" :key="index" class="list_item">
                    <div class="titleWrap">
                        <p class="p1"><span>退款信息</span></p>
                    </div>
                    <div class="contentWrap">
                        <div class="content">
                            <div class="imgWrap">
                                <img :src="item.url">
                            </div>
                            <div class="infoWrap">
                                <p class="title">{{item.title}}</p>
                                <p class="name">{{item.deploy}}</p>
                            </div>
                            <div class="priceWrap">
                                <p class="price">￥{{item.price}}</p>
                                <p class="num">x 1</p>
                            </div>
                        </div>
                    </div>
                    <div class="statusWrap">
                        <p>退款原因：其他</p>
                        <p>退款金额：￥99.00</p>
                        <p>申请件数：1</p>
                        <p>申请时间：2018-10-23 16:18</p>
                        <p>申请编号：123546789</p>
                    </div>
                </div>
                <p class="underline" v-show="isLastPage">已经到底了...</p>
            </div>          
        </div>
        </scroll>
    </div>
</template>
<script>
import Scroll from "src/base/scroll/scroll";

export default {
  beforeRouteEnter: (to, from, next) => {
    document.title = "退款详情";
    next();
  },
  data() {
    return {
      lists: [],

      isLastPage: false,
      focus_idx: 0,

      statusBtn: []
    };
  },
  created() {
    this.getListsData();
  },
  mounted() {},
  methods: {
    pullingDown(e) {
      this.$refs.scroll.finishPullDown();
    },
    pullingUp() {
      this.$refs.scroll.finishPullUp();
    },
    getListsData() {
      let arr = [
        {
          price: "99",
          deploy: "2018版高配",
          url:
            "https://static.youshuge.com/book_img/I1m7mgptCle48kF1PML8fHUWmiyrVB3LnOLbV4JU.jpeg",
          title:
            "奥迪 A4 进口 2018款2.7L 中东30周年特别版奥迪 A4 进口 2018款2.7L 中东30周年特别版",
          status: 4
        }
      ];
      this.lists = arr;
      this.isLastPage = true;
    },
    setFocus(idx) {
      this.focus_idx = idx;
    }
  },
  components: {
    Scroll
  }
};
</script>

<style lang="scss" scoped>
.myOrderInfo {
  .scroll-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: px2rem(10);
    overflow: hidden;

    .titleWrap {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      padding: px2rem(20);
      .p1 {
        span {
          font-size: $f-s28;
          color: $c-333;
          font-weight: bold;
        }
      }
      .p2 {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        span {
          font-size: $f-s22;
          color: $c-333;
        }
      }
    }
    .statusWrap {
      padding: px2rem(20);
      font-size: $f-s26;
      color: $c-333;

      p + p {
        margin-top: px2rem(6);
      }
    }
    .head {
      width: 100%;
      height: 100%;
      background-color: $c-f98;

      .headWrap {
        padding: px2rem(80) px2rem(30);
        font-size: $f-s28;
        color: $c-fff;
      }
    }
    .amendWrap {
      padding: px2rem(60) px2rem(30) px2rem(20);

      .explain {
        .p1 {
          font-size: $f-s26;
          color: $c-333;
        }
        .p2 {
          font-size: $f-s20;
          color: $c-999;
        }
      }
      .dispose {
        text-align: right;
        margin-top: px2rem(40);

        span {
          padding: px2rem(10) px2rem(20);
          font-size: $f-s26;
          color: $c-333;
          border: 1px solid #eee;
          border-radius: px2rem(10);
        }
        span:first-child {
          margin-right: px2rem(20);
        }
      }
    }
    .listWrap {
      .underline {
        @include hintLine();
      }
      .list_item + .list_item {
        margin-top: px2rem(40);
      }
      .list_item {
        background-color: $c-fff;
        border-radius: px2rem(10);

        .contentWrap {
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
          -webkit-box-align: start;
          -ms-flex-align: start;
          align-items: flex-start;
          padding: px2rem(40) px2rem(20) px2rem(20);

          .content {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            width: 100%;

            .imgWrap {
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              align-items: center;
              background-color: $c-eee;
              padding: px2rem(20);
              box-sizing: border-box;
              border-radius: px2rem(6);
              margin-right: px2rem(20);
              img {
                width: px2rem(120);
                height: px2rem(80);
              }
            }

            .infoWrap {
              .title {
                -ms-box-orient: vertical;
                -webkit-box-orient: vertical;
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                max-width: px2rem(360);
                height: px2rem(60);
                line-height: px2rem(30);
                max-height: 100%;
                font-size: $f-s24;
                color: $c-333;
                margin-top: px2rem(10);
              }
              .name {
                font-size: $f-s20;
                color: $c-999;
                margin-top: px2rem(6);
              }
              .price {
                font-size: $f-s28;
                color: $c-f57;
                margin-top: px2rem(6);
              }
            }
            .priceWrap {
              width: px2rem(100);
              max-width: px2rem(100);
              text-align: right;
              font-size: $f-s24;
              color: $c-666;
              margin-top: px2rem(10);
            }
          }
        }
      }
    }
  }
}
</style>

