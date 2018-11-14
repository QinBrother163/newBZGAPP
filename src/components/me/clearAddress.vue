<template>
    <div class="clearAddress">
        <scroll class="scroll-wrapper"
        ref="suggest"
        :listenScroll="true"
        @pullingDown="pullingDown"
        @pullingUp="pullingUp"
        :probeType="3"
        >

            <div class="wrap">
                <div class="list">
                    <div class="content">
                        <div v-for="(item,index) in lists" :key="index" class="info">
                            <div class="left">
                                <p>
                                    <span class="p1">{{item.name}}</span>
                                    <span class="p2">{{item.phone}}</span>
                                </p>
                                <p>
                                    <span class="icon iconfont icon-dingweiweizhi"></span>
                                    <span class="address">{{item.address}}</span>
                                </p>
                            </div>
                            <div class="right">
                                <span class="icon iconfont icon-pen"></span>
                            </div>    
                        </div>
                        
                    </div>
                </div>
            </div>
        </scroll>
        <div class="footer">
            <span class="icon iconfont icon-pen">&nbsp;&nbsp;新增地址</span>
        </div>
    </div>
</template>
<script>
import Scroll from "src/base/scroll/scroll";
export default {
  data() {
    return {
      isLastPage: false,
      lists: []
    };
  },
  created() {},
  mounted() {
    this._getListData();
  },
  methods: {
    pullingDown() {
      this.$refs.suggest.finishPullDown();
    },
    pullingUp() {
      if (this.isLastPage) {
        return;
      }
      this.$refs.suggest.finishPullUp();
    },
    _getListData() {
      let arr = [
        {
          name: "张三小四0",
          phone: "17017507723",
          address: "广东省中山市东区博爱六路110号"
        },
        {
          name: "张三小四1",
          phone: "17017507723",
          address: "广东省中山市东区博爱六路110号"
        },
        {
          name: "张三小四2",
          phone: "17017507723",
          address: "广东省中山市东区博爱六路110号"
        },
      ];
      this.lists = arr;
    }
  },
  components: {
    Scroll
  }
};
</script>
<style lang="scss" scoped>
.clearAddress {
  width: 100%;
  height: 100vh;
  background-color: $c-f55;

  .footer {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    padding: px2rem(30) 0;
    border-top: 1px solid #eee;
    background-color: #fff;
    text-align: center;

    .icon-pen {
      font-size: $f-s30;
      color: $c-fff;
      background-color: $c-5f9;
      padding: px2rem(15) px2rem(120);
      border-radius: px2rem(40);
    }
  }
  .scroll-wrapper {
    position: absolute;
    top: 0;
    bottom: px2rem(110);
    left: 0;
    right: 0;
    overflow: hidden;

    .wrap {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;

      .list {
        width: 100%;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        background-color: $c-fff;

        .content {
          width: 100%;
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
          box-sizing: border-box;
          color: $c-333;
          .info + .info {
            border-top: 1px solid $c-eee;
          }
          .info {
            width: 100%;
            -webkit-box-flex: 1;
            -ms-flex: 1;
            flex: 1;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            padding: px2rem(50) px2rem(30) px2rem(50);
          }

          .left {
            -webkit-box-flex: 2;
            -ms-flex: 2;
            flex: 2;
            font-size: $f-s28;
            .p2 {
              margin-left: px2rem(30);
            }
            p:nth-child(2) {
              margin-top: px2rem(15);
            }
            .icon-dingweiweizhi {
              font-size: $f-s30;
              color: $c-5f9;
            }
          }
          .right {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            justify-content: center;
            align-items: center;
            .icon-pen {
              font-size: $f-s30;
              color: $c-5f9;
            }
          }
        }
      }
    }
  }
}
</style>