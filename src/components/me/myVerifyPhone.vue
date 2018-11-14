<template>
    <div class="myVerifyPhone">
        <div class="head">
            <p class="p1">我们已经发送了校验码到你的手机：</p>
            <p class="p2">150 **** 7520</p>
        </div>
        <div class="input-group">
            <label for="verificationCode" class="input_label">验证码</label>
            <input type="text" id="verificationCode" class="input" placeholder="请输入短信验证码" v-model="code" autocomplete="off">
            <div class="verificationCode-container">
                <getPhoneCode  @getCode="getCode" @toast="toast" :isOk="phoneFeedBackType === 1" :isError="isError"></getPhoneCode>
            </div>
        </div>
        <div class="confirm-container">
            <div class="confirm-btn" :class="{active: isReady}" @click="tologin">下一步</div>
        </div>
        <div class="toast-container" v-if="showToast">
            <toast :descText="descText" @close="closeToast" :delay="3000"></toast>
        </div>
    </div>
</template>
<script>
import Toast from "src/base/toast/toast_login";
import { RegFeedBackType } from "src/assets/js/config";
import GetPhoneCode from "src/base/getPhoneCode/getPhoneCode";
import Md5 from "md5";

export default {
  beforeRouteEnter: (to, from, next) => {
    document.title = "修改手机号码";
    next();
  },
  // mixins:[ToastMixin],
  data() {
    return {
      //是否显示弹出
      showToast: false,
      //弹出的描述文本
      descText: "",
      code: "",
      //获取验证码的次数
      getCodeTimes: 0,
      isError: false
    };
  },
  created() {},
  mounted() {},
  computed: {
    phoneFeedBackType: function() {
      let reg = /^1\d{10}$/;
      return reg.test(this.phone)
        ? RegFeedBackType.showSuccess
        : RegFeedBackType.showError;
    },
    codeFeedBackType: function() {
      let reg = /^\d{6}$/;
      return reg.test(this.code)
        ? RegFeedBackType.showSuccess
        : RegFeedBackType.showError;
    },
    isReady: function() {
      return this.codeFeedBackType === RegFeedBackType.showSuccess;
    }
  },
  methods: {
    closeToast() {
      //关闭toast
      this.showToast = false;
    },
    toast(descText) {
      this.descText = descText;
      this.showToast = true;
    },
    tologin() {
      if (!/^\d{6}$/.test(this.code)) {
        this.toast("验证码格式不正确");
        return;
      }
      this.isError = true;
    },
    getCode() {
    //   this.isError = true;

    //   this.$axios
    //     .get("/app/sendSmsPwd", {
    //       params: {
    //         phone: this.phone,
    //         identity: "register"
    //       }
    //     })
    //     .then(res => {
    //       if (res.status === 200) {
    //         if (res.data.code > 0) {
    //           this.toast("发送成功！");
    //         } else {
    //           this.$alert(res.data.message)
    //             .then(msg => {
    //               this.isError = true;
    //             })
    //             .catch(err => {
    //               console.log(err);
    //             });
    //           return;
    //         }
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    }
  },
  components: {
    Toast,
    GetPhoneCode
  }
};
</script>
<style lang="scss" scoped>
.myVerifyPhone {
  background: #f5f5f5;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  .head {
    text-align: center;
    padding: px2rem(80) px2rem(30);

    .p1 {
      font-size: $f-s22;
      color: $c-999;
    }
    .p2 {
      font-size: px2rem(50);
      color: $c-333;
      font-weight: bold;
    }
  }
  .input-group {
    background: #fff;
    box-sizing: border-box;
    display: flex;
    height: px2rem(96);
    margin-bottom: px2rem(20);
    overflow: hidden;
    padding: px2rem(18) px2rem(30);
    position: relative;
    .input_label {
      width: px2rem(126);
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #666;
      flex-shrink: 0;
      @include font-dpr(28px);
    }
    .input {
      flex: 1;
      @include font-dpr(32px);
    }
    .feedback-container {
      position: absolute;
      right: px2rem(28);
      top: 50%;
      transform: translate3d(0, -50%, 0);
    }
    .verificationCode-container {
      position: absolute;
      right: px2rem(30);
      top: 50%;
      transform: translate3d(0, -50%, 0);
      .feedback-container {
        right: 110%;
      }
    }
  }
  .confirm-container {
    padding: 0 px2rem(49);
    height: px2rem(96);
    overflow: hidden;
    margin-top: px2rem(18);
    .confirm-btn {
      width: 100%;
      color: #fff;
      background-color: #d6d6d6;
      text-align: center;
      line-height: px2rem(96);
      border-radius: px2rem(48);
      @include font-dpr(36px);
      &.active {
        background-color: #5e93fc;
      }
    }
  }
  .toast-container {
    position: absolute;
    left: 50%;
    // bottom: px2rem(287);
    bottom: 50%;
    transform: translate3d(-50%, 0, 0);
  }
}
</style>
