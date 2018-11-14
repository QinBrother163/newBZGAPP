<template>
    <div class="me">
        <scroll 
            ref="scroll" 
            class="scroll-container"
            :listenScroll="true"
            @pullingDown="pullingDown"
            @pullingUp="pullingUp"
        >   
        <div>
            <div class="user-info">
                <div class="head">
                    <img class="user-img" :src="!user.image.src ? defalutUserImg : user.photoIp+user.image.src" alt="">
                    <div class="user-container">
                        <p class="userName">{{user.nickName}}</p>
                        <p class="userPhone">{{user.phone}}</p>
                    </div>
                    <span class="logout" @click="logout"></span>
                </div>
                <div class="foot">
                    <router-link tag="div" class="myInverse" :to="{path: '/myHistory'}">
                        <span class="icon iconfont icon-liulanjilu"></span>
                        <span class="desc">浏览记录</span>
                    </router-link>
                    <router-link tag="div" class="myCard" :to="{path: '/myInfoCenter'}">
                         <span class="icon iconfont icon-information"></span>
                        <span class="desc">个人信息</span>
                    </router-link>
                    <router-link tag="div" class="myInfo" :to="{path: '/myRewards/ableUseRewards'}">
                        <span class="icon iconfont icon-daifahuo"></span>
                        <span class="desc">优惠卷</span>
                    </router-link>
                </div>
            </div>
            <div class="maxLine"></div>
            <router-link tag="div" class="orderWrap" :to="{path: '/myOrderInfo'}">
                <span>我的订单</span>
                <p><span>查看全部</span><span class="icon iconfont icon-jiantou"></span></p>
            </router-link>
            <div class="orderStatus">
                <div class="orderStatusWrap">
                    <div class="order_item">
                        <span class="icon iconfont icon--"></span>
                        <p>预约中</p>
                    </div>
                    <div class="order_item">
                        <span class="icon iconfont icon-daifahuo1"></span>
                        <p>待发货</p>
                    </div>
                    <div class="order_item">
                        <span class="icon iconfont icon-daishouhuo"></span>
                        <p>待收货</p>
                    </div>
                    <div class="order_item">
                        <span class="icon iconfont icon-daifahuo1"></span>
                        <p>已完成</p>
                    </div>
                    <router-link tag="div" class="order_item" :to="{path: '/myAfterSaleService'}">
                        <span class="icon iconfont icon-daipingjia1"></span>
                        <p>售后</p>
                    </router-link>
                </div>
            </div>
            <div class="maxLine"></div>
            <div class="list-vontainer">
                <div class="commonRow">
                    <span>联系客服</span>
                    <span class="icon iconfont icon-jiantou"></span>
                </div>
            </div>
            <div class="maxLine"></div>
            <div class="list-vontainer">
                <div class="commonRow">
                    <span>购车攻略</span>
                    <span class="icon iconfont icon-jiantou"></span>
                </div>
                <div class="commonRow">
                    <span>关于车盈在线</span>
                    <span class="icon iconfont icon-jiantou"></span>
                </div>
            </div>
        </div>
        </scroll>
        <div class="toast-container" v-if="showToast">
            <toast :descText="descText" @close="closeToast" :delay="2000"></toast>
        </div>
        <div class="footer-container" ref="footer">
            <common-footer></common-footer>
        </div>
    </div>
</template>
<script>
import commonFooter from "src/base/commonFooter/commonFooter";
import Scroll from "src/base/scroll/scroll";
import { mapActions } from "vuex";
import { ToastMixin } from "src/assets/js/mixin";
import Toast from "src/base/toast/toast_login";
// import {Alert}  from  'src/assets/js/common'

export default {
  beforeRouteEnter: (to, from, next) => {
    document.title = "我";
    next();
  },
  mixins: [ToastMixin],
  data() {
    return {
      defalutUserImg: require("./img/userDefault.png"),
      showMoney: false,
      user: {
        image: {}
      }
    };
  },
  created() {
    this._getUserInfo();
  },
  mounted() {},
  methods: {
    pullingDown(e) {
      this.$refs.scroll.finishPullDown();
    },
    pullingUp() {
      this.$refs.scroll.finishPullUp();
    },
    logout() {
      this.$axios
        .get("/app/logOut")
        .then(res => {
          if (res.status === 200) {
            if (res.data.code > 0) {
              this.toast("成功退出！");
              setTimeout(() => {
                this.LOGOUT();
                this.$router.replace({ path: "/home" });
              }, 500);
            } else {
              this.$alert(res.data.message)
                .then(msg => {})
                .catch(err => {
                  console.log(err);
                });
              return;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    _getUserInfo() {
      this.$axios
        .get("/app/getUserBaseInfo")
        .then(res => {
          if (res.status === 200) {
            if (res.data.code > 0) {
              this.user = res.data.data;
            } else {
              this.$alert(res.data.message)
                .then(msg => {})
                .catch(err => {
                  console.log(err);
                });
              return;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    ...mapActions(["LOGOUT"])
  },
  components: {
    commonFooter,
    Scroll,
    Toast
  },
  filters: {
    hidePhone(val) {
      return `${val.substr(0, 3)}****${val.substr(-4, 4)}`;
    }
  }
};
</script>

<style lang="scss" scoped>
.me {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .scroll-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: px2rem(90);
    overflow: hidden;
  }
  .maxLine {
    @include maxLine();
  }
  .orderWrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    padding: px2rem(20) px2rem(30);
    border-bottom: 1px solid #e4e4e4;
    span {
      color: $c-666;
      @include font-dpr(28px);
    }
  }
  .orderStatus {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;

    .orderStatusWrap {
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding: px2rem(30) px2rem(30);
      color: $c-666;

      .order_item {
        width: px2rem(120);
        text-align: center;

        span {
          @include font-dpr(45px);
        }
      }
    }
  }
  .user-info {
    height: px2rem(321);
    box-sizing: border-box;
    padding: px2rem(30);
    display: flex;
    flex-direction: column;
    .head {
      height: px2rem(130);
      width: 100%;
      position: relative;
      display: flex;
      align-items: center;
      .user-img {
        width: px2rem(130);
        height: px2rem(130);
        border-radius: px2rem(65);
        margin-right: px2rem(28);
      }
      .user-container {
        .userName {
          @include font-dpr(32px);
          color: #3c3d41;
          margin-bottom: px2rem(20);
        }
      }
      .logout {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: px2rem(34);
        height: px2rem(38);
        background: url(./img/logout@2x.png) no-repeat;
        background-size: contain;
      }
    }
    .foot {
      flex: 1;
      display: flex;
      color: $c-666;

      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        position: relative;

        span:first-child {
          @include font-dpr(45px);
          margin-bottom: px2rem(6);
        }
      }
      .myInverse:after,
      .myCard:after {
        content: "";
        width: 1px;
        height: px2rem(68);
        background-color: #f4f4f4;
        // background-color: #000;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
      }
      .title {
        color: #333333;
        @include font-dpr(48px);
        font-weight: 700;
        margin-bottom: px2rem(14);
      }
      .desc {
        color: #666;
        @include font-dpr(22px);
      }
    }
  }
  .commonRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include font-dpr(28px);
    color: #3c3d41;
    padding: px2rem(30);

    .iconfont {
      color: #999999;
      @include font-dpr(28px);
    }
  }
  .commonRow + .commonRow {
    border-top: 1px solid #e4e4e4;
  }

  .list-vontainer {
    .more-border {
      border-bottom: px2rem(20) solid #f5f5f5;
    }
    .opinions {
      border-bottom: px2rem(36) solid #f5f5f5;
    }
  }
  .toast-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .footer-container {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }
}
</style>

