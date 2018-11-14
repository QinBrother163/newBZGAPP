<template>
    <div class="carCoupon">
        <div class="cover_bg" @click="closeShow"></div>
        <scroll 
            ref="listScroll"
            class="scroll-wrapper"
            @pullingDown="pullingDown"
            @pullingUp="pullingUp"
        >
            <div class="content">
                <p class="title">优惠卷</p>
                <div class="card">
                    <div class="card-left" :class="{disable: cardType !== 0}">
                        <p><span class="ratio">￥500</span></p>
                        <p>满5000使用</p>
                    </div>
                    <div class="card-right">
                        <div class="head">
                            <p class="cardType">新手体验券</p>
                            <p class="useCard">
                                <span class="desc">仅限本产品款式使用</span>
                                <span class="use" @click="toUse">立即使用</span>
                            </p>
                        </div>
                        <p class="validityTime">有效期：2018.10.14 - 2018-12-12</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-left" :class="{disable: cardType !== 0}">
                        <p><span class="ratio">￥500</span></p>
                        <p>满5000使用</p>
                    </div>
                    <div class="card-right">
                        <div class="head">
                            <p class="cardType">新手体验券</p>
                            <p class="useCard">
                                <span class="desc">仅限本产品款式使用</span>
                                <span class="use" @click="toUse">立即使用</span>
                            </p>
                        </div>
                        <p class="validityTime">有效期：2018.10.14 - 2018-12-12</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-left" :class="{disable: cardType !== 0}">
                        <p><span class="ratio">￥500</span></p>
                        <p>满5000使用</p>
                    </div>
                    <div class="card-right">
                        <div class="head">
                            <p class="cardType">新手体验券</p>
                            <p class="useCard">
                                <span class="desc">仅限本产品款式使用</span>
                                <span class="use" @click="toUse">立即使用</span>
                            </p>
                        </div>
                        <p class="validityTime">有效期：2018.10.14 - 2018-12-12</p>
                    </div>
                </div>
                <div class="card">
                    <div class="card-left" :class="{disable: cardType !== 0}">
                        <p><span class="ratio">￥500</span></p>
                        <p>满5000使用</p>
                    </div>
                    <div class="card-right">
                        <div class="head">
                            <p class="cardType">新手体验券</p>
                            <p class="useCard">
                                <span class="desc">仅限本产品款式使用</span>
                                <span class="use" @click="toUse">立即使用</span>
                            </p>
                        </div>
                        <p class="validityTime">有效期：2018.10.14 - 2018-12-12</p>
                    </div>
                </div>
            </div>
            <div class="footer" @click="cancel">
                <span>取消</span>
            </div>

        </scroll>
    </div>
</template>
<script>
import Scroll from "src/base/scroll/scroll";
export default {
  props: {},
  data() {
    return {
      cardType: 1
    };
  },
  created() {},
  mounted() {},
  methods: {
    pullingUp() {
      this.$refs.listScroll.finishPullUp();
    },
    pullingDown(e) {
      this.$refs.listScroll.finishPullDown();
    },
    closeShow() {
      this.$emit("closeShow");
    },
    toUse() {
      this.$emit("use", 1);
    },
    cancel() {
      this.$emit("cancel");
    }
  },
  components: {
    Scroll
  }
};
</script>

<style lang="scss" scoped>
.carCoupon {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;

  .cover_bg {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .scroll-wrapper {
    position: absolute;
    top: px2rem(600);
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    overflow: hidden;

    .content {
      padding: 0 px2rem(30) px2rem(120);
      .title {
        padding: px2rem(40) 0;
        color: $c-666;
        font-size: $f-s30;
        font-weight: bold;
      }
      .card + .card {
        margin-top: px2rem(30);
      }
      .card {
        width: 100%;
        display: flex;
        height: px2rem(164);
        .card-left {
          width: px2rem(240);
          background: url(./img/reward_blue_bg.png);
          background-repeat: no-repeat;
          background-size: contain;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          color: #fff;
          @include font-dpr(22px);
          .ratio {
            @include font-dpr(48px);
            font-weight: 700;
          }
        }
        .card-right {
          flex: 1;
          background-color: #fff;
          padding: 0 px2rem(26);
          display: flex;
          flex-direction: column;
          position: relative;
          @include font-dpr(22px);
          border: 1px solid #ccc;

          .head {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            .cardType {
              @include font-dpr(28px);
              font-weight: 700;
              color: #333333;
            }
            .useCard {
              margin-top: px2rem(8);
              height: px2rem(36);
              display: flex;
              justify-content: space-between;
              align-items: center;
              .desc {
                color: #666666;
              }
              .use {
                color: #5e93fc;
                width: px2rem(130);
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                border: 1px solid #5e93fc;
                border-radius: px2rem(18);
              }
            }
            .used-bandge {
              position: absolute;
              right: px2rem(36);
              top: px2rem(20);
              width: px2rem(110);
              height: px2rem(75);
            }
          }

          .validityTime {
            height: px2rem(52);
            line-height: px2rem(52);
            box-sizing: border-box;
            border-top: 1px dashed #cccccc;
            color: #999;
          }
        }
      }
    }
  }
  .footer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    padding: px2rem(30) 0;
    background-color: #fff;
    color: #666;
    font-size: $f-s28;
    border-top: 1px solid #ccc;
  }
}
</style>

