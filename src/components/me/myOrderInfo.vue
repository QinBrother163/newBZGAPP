<template>
    <div class="myOrderInfo">
        <div class="head">
            <div class="headWrap">
                <div @click.stop="setFocus(index)" v-for="(item,index) in navLists" :key="index" class="list_item" :class="focus_idx === index ?'focus':''">
                    <span class="">{{item}}</span>
                </div>
            </div>
        </div>
        <scroll 
            ref="scroll" 
            class="scroll-container"
            :listenScroll="true"
            @pullingDown="pullingDown"
            @pullingUp="pullingUp"
        >   
        <div>
            <div class="listWrap">
                <div v-for="(item,index) in lists" :key="index" class="list_item">
                    <div class="titleWrap">
                        <p class="p1"><span class="icon iconfont icon-jingxiaoshangguanli">&nbsp;汽车配件</span></p>
                        <p class="p2"><span>卖家已发货</span></p>
                    </div>
                    <div class="contentWrap">
                        <div class="content">
                            <div class="imgWrap">
                                <img :src="item.url">
                            </div>
                            <div class="infoWrap">
                                <p class="title">{{item.title}}</p>
                                <p class="name">{{item.deploy}}</p>
                                <p class="price">￥{{item.price}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="statusWrap">
                        <p></p>
                        <p class="p2" v-if="item.status === 1">
                            <span>预约中</span><span>确认完成</span>
                        </p>
                        <p class="p2" v-else-if="item.status === 2">
                            <span>查看物流</span>
                        </p>
                        <p class="p2" v-else-if="item.status === 3">
                            <span>查看物流</span><span>确认收获</span>
                        </p>
                        <p class="p2" v-else-if="item.status === 4">
                            <span>查看物流</span><span>已完成</span>
                        </p>
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
  data() {
    return {
      navLists: ["全部", "预约中", "待发货", "待收货", "已完成"],
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
          status: 1
        },
        {
          price: "99",
          deploy: "2018版高配",
          url:
            "https://static.youshuge.com/book_img/I1m7mgptCle48kF1PML8fHUWmiyrVB3LnOLbV4JU.jpeg",
          title:
            "奥迪 A4 进口 2018款2.7L 中东30周年特别版奥迪 A4 进口 2018款2.7L 中东30周年特别版",
          status: 2
        },
        {
          price: "99",
          deploy: "2018版高配",
          url:
            "https://static.youshuge.com/book_img/I1m7mgptCle48kF1PML8fHUWmiyrVB3LnOLbV4JU.jpeg",
          title:
            "奥迪 A4 进口 2018款2.7L 中东30周年特别版奥迪 A4 进口 2018款2.7L 中东30周年特别版",
          status: 3
        },
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
    },
  },
  components: {
    Scroll
  }
};
</script>

<style lang="scss" scoped>
.myOrderInfo {
  background-color: $c-eee;
  height: 100vh;

  .head {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    background-color: $c-fff;
    padding: px2rem(20) 0;

    .headWrap {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;

      .list_item {
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -ms-flex-direction: column;
        flex-direction: column;
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        font-size: $f-s26;
        color: $c-666;
      }
      .focus {
        color: $c-5f9;
      }
    }
  }
  .scroll-container {
    position: absolute;
    left: 0;
    right: 0;
    top: px2rem(70);
    bottom: px2rem(90);
    overflow: hidden;

    .titleWrap {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;

      .p1 {
        span {
          font-size: $f-s28;
          color: $c-333;
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
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -ms-flex-pack: justify;
      justify-content: space-between;
      border-top: 1px solid #eee;
      padding: px2rem(30) 0 px2rem(10);

      .p2 {
        span {
          padding: px2rem(10) px2rem(20);
          border-radius: px2rem(30);
        }
        span:first-child {
          border: 1px solid $c-999;
          color: #999;
        }
        span:last-child {
          border: 1px solid $c-f57;
          color: $c-f57;
          margin-left: px2rem(20);
        }
      }
    }
    .listWrap {
      padding: px2rem(20) px2rem(30);

      .underline {
        @include hintLine();
      }
      .list_item + .list_item {
        margin-top: px2rem(40);
      }
      .list_item {
        background-color: $c-fff;
        padding: px2rem(20);
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
          padding: px2rem(40) 0 px2rem(20) 0;

          .content {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;

            .imgWrap {
              background-color: $c-eee;
              padding: px2rem(20);
              box-sizing: border-box;
              border-radius: px2rem(6);
              margin-right: px2rem(20);
              img {
                width: px2rem(160);
                height: px2rem(100);
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
                max-width: px2rem(460);
                height: px2rem(60);
                line-height: px2rem(30);
                max-height: 100%;
                font-size: $f-s26;
                color: $c-333;
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
          }
        }
      }
    }
  }
}
</style>

