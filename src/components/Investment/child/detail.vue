
<template>
    <div class="detail">
        <div class="alreadyLog" v-if="!curCount">
            <p class="invoice-title">基本参数</p>
            <p class="invoice-date">
                <span>参考价</span>
                <span>22.53万起</span>
            </p>
            <p class="invoice-date">
                <span>厂商</span>
                <span>一汽丰田</span>
            </p>
            <p class="invoice-date">
                <span>级别</span>
                <span>中级SUV</span>
            </p>
            <p class="invoice-date">
                <span>能源类型</span>
                <span>汽油</span>
            </p>
            <div class="vehicle-certificate-container">
                <p class="title">车身{{remnant}}</p>
                <textarea  class="iptContent" v-model="iptVal" @input="descInput" maxlength="200">
                </textarea>
            </div>
        </div>
        
        <div class="notLog" v-if="curCount">
            <p class="title">发票信息</p>
            <img class="nologin"  src="./img/nologin@2x.png" alt="未登录" @click="toLogin">

        </div>
    </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: {
    productItem: {
      type: Object,
      default: () => {
        return {};
      }
    },
    photoIp: {
      type: String
    }
  },
  // created(){
  // },
  data() {
    return {
      iptVal: "",
      remnant: 200
    };
  },
  computed: {
    ...mapGetters(["curCount"])
  },
  methods: {
    toLogin() {
      this.$router.push({ path: "/login" });
    },
    loadImage() {
      this.$emit("loadImage");
    },
    descInput() {
      let txtVal = this.iptVal.length;
      this.remnant = 200 - txtVal;
    }
  }
};
</script>


<style lang="scss" scoped>
.detail {
  flex-shrink: 0;
  width: 100vw;
  box-sizing: border-box;

  .carNum {
    box-sizing: border-box;
    height: px2rem(96);
    border-bottom: 1px solid #ededed;
    display: flex;
    align-items: center;
    @include font-dpr(28px);
    color: #333333;
  }
  .alreadyLog {
    padding: 0 px2rem(30) px2rem(60);
    > p {
      height: px2rem(90);
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include font-dpr(28px);
      color: #333333;
      &.invoice-date {
        border-bottom: 1px solid #ededed;
      }
    }
    .invoice-title {
      @include font-dpr(28px);
      font-weight: bold;
      color: #333333;
    }
    .vehicle-certificate-container {
      .title {
        @include font-dpr(28px);
        color: #333333;
        font-weight: bold;
        padding: px2rem(30) 0 px2rem(20);
      }
      .iptContent {
        resize: none;
        border: px2rem(1) solid $c-f55;
        width: 100%;
        height:  px2rem(120);
        @include font-dpr(28px);
        color: #333333;
      }
    }
  }
  .notLog {
    .title {
      color: #333333;
      font-weight: 700;
      @include font-dpr(28px);
      margin: px2rem(30) 0 px2rem(16);
    }
    .nologin {
      display: block;
      width: 100%;
    }
  }
}
</style>

