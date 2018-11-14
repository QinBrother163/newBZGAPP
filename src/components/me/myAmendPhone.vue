<template>
    <div class="myAmendPhone">
        <div class="input-group">
            <label for="userPhone" class="input_label">手机号</label>
            <input type="text" id="userPhone" class="input" placeholder="请输入11位手机号" v-model="phone" autocomplete="off"> 
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
      phone: ""
    };
  },
  created() {},
  mounted() {},
  computed: {
    phoneFeedBackType: function() {
      let reg = /^1\d{10}$/g;
      return reg.test(this.phone)
        ? RegFeedBackType.showSuccess
        : RegFeedBackType.showError;
    },
    isReady: function() {
      return this.phoneFeedBackType === RegFeedBackType.showSuccess;
    },
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
      if (this.phoneFeedBackType !== RegFeedBackType.showSuccess) {
        this.toast("手机号码格式不正确！");
        return;
      }
      setTimeout(() => {
        this.$router.push({ path: '/myVerifyPhone' });
      }, 500);
    },
  },
  components: {
    Toast,
  }
};
</script>
<style lang="scss" scoped>
.myAmendPhone {
  background: #f5f5f5;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

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
