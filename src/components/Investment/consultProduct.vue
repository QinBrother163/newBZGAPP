<template>
    <div class="consultProduct">
        <div class="content">
            <div class="iten_list">
                <p>
                    <span class="name">意向车型</span>
                    <span>2018版 2.7L 海外进口 特别款</span>
                </p>
            </div>
            <div class="iten_list">
                <p>
                    <span class="name">备注型号</span>
                    <input type="text" v-model="remarksVal" placeholder="请输入意向型号/配置/颜色/排量" class="iptVal" autocomplete="off">
                </p>
            </div>
            <div class="iten_list">
                <p>
                    <span class="name">你的名字</span>
                    <input type="text" v-model="userName" placeholder="请输入姓名" class="iptVal" autocomplete="off">
                </p>
            </div>
            <div class="iten_list">
                <p>
                    <span class="name">手机号码</span>
                    <input type="text" v-model="userPhone" placeholder="请输入手机号码" class="iptVal" autocomplete="off">
                </p>
            </div>
        </div>
        <div v-if="showCoupon" class="cityWrap" @click="showCarCoupon = true">
            <span class="name">选择优惠卷</span>
            <span class="icon iconfont icon-jiantou"></span>
        </div>
        <div class="cityWrap" @click="showChooseCity = true">
            <span class="name">所在城市</span>
            <span class="city">广东省广州市</span>
        </div>
        <div class="cityWrap">
            <p>
                <span class="icon iconfont " :class="showFocusReckon === true?'icon-xuanzhong':'icon-weixuan'" @click="setFocusReckon"></span>
                <span class="name">旧车估值</span>
            </p>
        </div>
        <div class="content">
            <div class="iten_list">
                <p>
                    <span class="name">现有车型</span>
                    <input type="text" v-model="carModel" placeholder="请输入现有的车型" class="iptVal" autocomplete="off">
                </p>
            </div>
            <div class="iten_list">
                <p>
                    <span class="name">行驶里程</span>
                    <input type="text" v-model="mileage" placeholder="请输入行驶里程" class="iptVal" autocomplete="off">
                </p>
            </div>
            <div class="iten_list">
                <p>
                    <span class="name">上牌日期</span>
                    <input type="text" v-model="carLicense" placeholder="请输入首次上牌日期" class="iptVal" autocomplete="off">
                </p>
            </div>
        </div>
        <div class="cityWrap">
            <p>
                <span class="icon iconfont " :class="showStatement  === true?'icon-xuanzhong':'icon-weixuan'" @click="setStatement"></span>
                <span class="name">我同意 《个人信息保护声明》</span>
            </p>
        </div>
        <transition name="fade">
            <choose-city v-if="showChooseCity"  @close="closeChooseCity"  key="chooseCity" :curCity="lists" :isShow="showChooseCity"></choose-city>
        </transition>
        <transition name="fade">
            <car-coupon v-if="showCarCoupon" @closeShow="closeCarCoupon" @use="sueCarCoupon" @cancel="cancelCarCoupon"></car-coupon>
        </transition>
        <div class="footer">
            <span>提交</span>
        </div>
    </div>
</template>
<script>
import ChooseCity from "src/components/me/child/chooseCity";
import carCoupon from "src/components/Investment/child/carCoupon";
export default {
  beforeRouteEnter(to, from, next) {
    if (!to.query.pId) {
      next(from.fullPath);
    }
    document.title = "填写信息";
    next();
  },
  data() {
    return {
      remarksVal: "",
      userName: "",
      userPhone: "",
      carModel: "",
      mileage: "",
      carLicense: "",

      showChooseCity: false,
      showCarCoupon: false,
      chooseCity: "",
      lists: [],
      showLoading: false,
      showFocusReckon: true,
      showStatement: true,
      showCoupon: false
    };
  },
  created() {
    

    this.setShowCoupon(this.$route.query.Boole);

    this._getCarsList();
  },
  mounted() {},
  computed: {},
  methods: {
    _getCarsList(page) {
      this.showLoading = true;
      let element = [
        [
          {
            name: "北京",
            id: 0,
            open: false
          },
          [
            {
              name: "北京0",
              id: 0
            },
            {
              name: "北京1",
              id: 1
            },
            {
              name: "北京2",
              id: 2
            }
          ]
        ],
        [
          {
            name: "天津",
            id: 1,
            open: false
          },
          [
            {
              name: "天津0",
              id: 4
            },
            {
              name: "天津1",
              id: 5
            },
            {
              name: "天津2",
              id: 6
            }
          ]
        ],
        [
          {
            name: "河北",
            id: 2,
            open: false
          },
          [
            {
              name: "河北0",
              id: 7
            },
            {
              name: "河北1",
              id: 8
            },
            {
              name: "河北2",
              id: 9
            }
          ]
        ],
        [
          {
            name: "广西",
            id: 3,
            open: false
          },
          [
            {
              name: "广西0",
              id: 10
            },
            {
              name: "广西1",
              id: 11
            },
            {
              name: "广西2",
              id: 12
            }
          ]
        ],
        [
          {
            name: "上海",
            id: 4,
            open: false
          },
          [
            {
              name: "上海0",
              id: 13
            },
            {
              name: "上海1",
              id: 14
            },
            {
              name: "上海2",
              id: 15
            }
          ]
        ],
        [
          {
            name: "云南",
            id: 5,
            open: false
          },
          [
            {
              name: "云南0",
              id: 16
            },
            {
              name: "云南1",
              id: 17
            },
            {
              name: "云南2",
              id: 18
            }
          ]
        ]
      ];

      this.lists = element;
      this.showLoading = false;
    },
    closeChooseCity(city) {
      this.showChooseCity = false;
      this.lists = [];
      this._getCarsList(1);
    },
    setFocusReckon() {
      this.showFocusReckon = !this.showFocusReckon;
    },
    setStatement() {
      this.showStatement = !this.showStatement;
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
    setShowCoupon(Boole){
      console.log(Boole)
      this.showCoupon = Boole;
    }
  },
  components: {
    ChooseCity,
    carCoupon
  }
};
</script>
<style lang="scss" scoped>
.consultProduct {
  background-color: $c-f55;
  width: 100%;
  height: 100vh;
  .content {
    padding: 0 px2rem(30);
    background-color: #fff;

    .iten_list + .iten_list {
      border-top: px2rem(1) solid#eee;
    }
    .iten_list {
      padding: px2rem(30) 0;

      .name {
        margin-right: px2rem(30);
        font-size: $f-s26;
      }
      .iptVal {
        width: px2rem(400);
        border: none;
        font-size: $f-s24;
        color: #666;
      }
    }
  }
  .cityWrap + .cityWrap {
    border-bottom: px2rem(15) solid $c-f55;
  }
  .cityWrap {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-top: none;
    padding: px2rem(30) px2rem(30);
    border-top: px2rem(15) solid $c-f55;

    background-color: #fff;
    .name {
      font-size: $f-s26;
    }
    .city {
      font-size: $f-s24;
      color: #666;
    }
    .icon-weixuan,
    .icon-xuanzhong {
      font-size: $f-s28;
      margin-right: px2rem(15);
    }
    .icon-xuanzhong {
      color: $c-5f9;
    }
    .icon-jiantou {
      font-size: $f-s28;
      color: $c-666;
    }
  }
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: px2rem(25) 0;
    text-align: center;
    background-color: $c-f98;
    span {
      font-size: $f-s28;
      color: #fff;
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
