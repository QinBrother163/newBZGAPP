<template>
    <div class="myInfo">
        <div class="head base">
            <img class="user-img" :src="!perseonInfo.image.src ? defalutUserImg : perseonInfo.photoIp+perseonInfo.image.src"  alt="">
            <label  class="input-container" @click="showCopper=true">
                <span class="edit">设置头像</span>
                <span class="icon iconfont icon-jiantou"></span>
                <!-- <input id="uploadImg" type="file" accept="image/*" ref="uploadImg"/> -->
            </label>
        </div>
        <div class="list-container">
            <div class="base">
                <p class="title">用户名</p>
                <p>张三</p>
            </div>
        </div>
        <div class="list-container">
            <router-link tag="div" class="base" :to="{path: '/myAmendPhone'}">
                <p class="title">手机号码</p>
                <p>132456798<span class="icon iconfont icon-jiantou"></span></p>
            </router-link>
            <div @click="showChooseCity = true" class="base">
                <p class="title">所在城市</p>
                <p>广东省广州<span class="icon iconfont icon-jiantou"></span></p>
            </div>
            <div @click="showCarBrand = true" class="base">
                <p class="title">现用车型</p>
                <p><span class="icon iconfont icon-jiantou"></span></p>
            </div>
            <router-link tag="div" class="base" :to="{path: '/clearAddress'}">
                <p class="title">地址管理</p>
                <p><span class="icon iconfont icon-jiantou"></span></p>
            </router-link>
        </div>
        <router-view></router-view>
        <div class="editNickName" v-if="showEditNick">
            <input type="text" class="editIpt" ref="editIpt" v-model="nickName" autofocus>
            <span class="confirmBtn" @click="confirmEdit">确定</span>
        </div>
        <div class="loading-container" v-show="showLoading">
            <loading desc="正在上传..."></loading>
        </div>
        <ImageCopper v-show="showCopper" @closeCopper="closeCopper"></ImageCopper>
        <transition name="fade">
            <choose-city v-if="showChooseCity"  @close="closeChooseCity"  key="chooseCity" :curCity="lists" :isShow="showChooseCity"></choose-city>
        </transition>
          <Scroll  v-if="showCarBrand" class="scroll-wrapper"
            ref="suggest"
            :listenScroll="true"
            @pullingDown="pullingDown"
            @pullingUp="pullingUp"
            :probeType="3" 
            >
            <car-brand :elementIndex="elementIndex" @singleLetter="singleLetter" v-on:getThreeNavIndex="_getThreeNavIndex" :carBrandList='lists'></car-brand>
            <right-nav-list :flagText="flagText" :navList="cityIndexList" @toElement="toElement" ></right-nav-list>
          </Scroll>
    </div>
</template>
<script>
// import {ToastMixin} from 'src/assets/js/mixin';
// import Toast from 'src/base/toast/toast_login';
import Scroll from "src/base/scroll/scroll";
import Qs from "qs";
import { mapGetters, mapMutations } from "vuex";
import Loading from "src/base/loading/loading";
// import Lrz from 'lrz';
import ImageCopper from "src/base/copperImage/copperImage";
import ChooseCity from "src/components/me/child/chooseCity";
import carBrand from "src/components/Investment/child/carBrand";
import rightNavList from "src/components/Investment/child/rightNavList";
export default {
  beforeRouteEnter: (to, from, next) => {
    document.title = "个人信息";
    next();
  },
  // mixins:[ToastMixin],
  computed: {},
  data() {
    return {
      //默认用户图片
      defalutUserImg: require("./img/userDefault.png"),
      //是否显示编辑昵称
      showEditNick: false,
      //个人信息
      perseonInfo: {
        image: {}
      },
      //昵称
      nickName: "",
      showLoading: false,
      showCopper: false,
      //是否显示loading
      showLoading: false,
      showChooseCity: false,
      showCarBrand: false,
      elementIndex: "",
      flagText: "A",
      isLastPage: false,
      lists: [],
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
      ]
    };
  },
  created() {
    let me = this;

    me._getCarsList(1);

    //获取用户信息
    this._getUserInfo();
  },
  mounted() {
    //初始化上传用户头像
    // this._initUploadImg();
  },
  methods: {
    ...mapMutations({
      setCurSaleCity: "SET_CURSALECITY"
    }),
    pullingDown() {
      this.$refs.suggest.finishPullDown();
    },
    pullingUp() {
      if (this.isLastPage) {
        return;
      }
      this.$refs.suggest.finishPullUp();
    },
    _getThreeNavIndex(e) {
      console.log(e);
      this.showCarBrand = !this.showCarBrand;
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
    editNickName() {
      this.showEditNick = !this.showEditNick;
      if (this.showEditNick) {
        setTimeout(() => {
          this.$refs.editIpt.focus();
        }, 20);
      }
    },
    confirmEdit() {
      let reg = /^[\u4e00-\u9fa5_a-zA-Z0-9]{1,10}$/;
      if (!reg.test(this.nickName)) {
        this.$toast("昵称长度1到10位,只能包括汉字，数字，字母和下划线");
        return;
      }
      this.showEditNick = false;
      let params = Qs.stringify({
        nickName: this.nickName
      });
      this.$axios
        .post("/app/updateNickeName", params)
        .then(res => {
          if (res.status === 200) {
            if (res.data.code > 0) {
              this.perseonInfo.nickName = this.nickName;
              this.$toast("修改成功！");
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
      // this.curSaleCity = city;
      if (!city) {
        return;
      }
      this.setCurSaleCity(city);

      this.lists = [];
      this._getCarsList(1);
    },
    closeCopper(image) {
      this.showCopper = false;
      if (image) {
        this.uploadImg(image);
      }
    },
    ...mapMutations({
      setTpass: "SET_TRANSITIONPASS"
    }),
    uploadImg(image) {
      this.showLoading = true;
      let me = this,
        formData = new FormData();
      //先执行图片压缩
      // Lrz(file)
      // .then(function (rst) {
      // 处理成功会执行
      formData.append("file", image);

      me.$axios
        .post("/app/imgUpload", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function(response) {
          // debugger
          me.showLoading = false;
          if (response.data.code > 0) {
            me
              ._getUserInfo()
              .then(() => {
                me.$toast("上传成功！");
              })
              .catch(err => {
                console.log(err);
              });
          } else {
            me
              .$alert(response.data.message)
              .then(msg => {})
              .catch(err => {
                console.log(err);
              });
            // me.$toast(response.data.message);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      // })
    },
    operateTransitionPass(operateType) {
      let params = Qs.stringify({
        returnUrl: window.location.href,
        serviceName: operateType
      });
      this.$axios
        .post("/app/tradePwd", params)
        .then(res => {
          if (res.status === 200) {
            if (res.data.code > 0) {
              let redirect_url = res.data.data.redirect_url;
              if (redirect_url) {
                window.location.href = redirect_url;
              }
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
    // _initUploadImg(){
    //     let me = this;
    //     this.$refs.uploadImg.onchange = function(){
    //         me.showLoading = true;
    //         let file = this.files[0],
    //             formData = new FormData();
    //         //先执行图片压缩
    //         Lrz(file)
    //         .then(function (rst) {
    //             // 处理成功会执行
    //             formData.append('file' , rst.file);
    //             me.$axios.post('/app/imgUpload', formData,{
    //                 headers:{
    //                     'Content-Type':'multipart/form-data'
    //                 }
    //             }).then(function (response) {
    //                 // debugger
    //                 me.showLoading = false;
    //                 if(response.data.code > 0){
    //                     me._getUserInfo().then(()=>{
    //                             me.$toast('上传成功！');
    //                     }).catch((err)=>{
    //                             console.log(err)
    //                     })
    //                 }else{
    //                     me.$toast(response.data.message);
    //                 }
    //             }).catch(function (error) {
    //                 console.log(error)
    //             });
    //         })
    //         .catch(function (err) {
    //             // 处理失败会执行
    //             console.log(err)
    //         })

    //     }

    // },
    _getUserInfo() {
      return new Promise((resolve, reject) => {
        this.$axios
          .get("/app/getUserBaseInfo")
          .then(res => {
            if (res.status === 200) {
              if (res.data.code > 0) {
                console.log({
                  data: res.data.data
                });
                this.perseonInfo = res.data.data;
                this.setTpass(this.perseonInfo.isTransactionPwd);
                resolve();
              } else {
                this.$toast(res.data.message);
                reject();
                return;
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  },
  toElement(text) {
    if (text === "A") {
      this.$refs.suggest.scrollToElement(this.$refs.positionBox, 200, false, 0);
    }
    this.elementIndex = text;
  },
  computed: {
    ...mapGetters(["isSetTransitionPass"])
  },
  watch: {
    isSetTransitionPass(newVal) {
      if (newVal) {
        this._getUserInfo();
      }
    }
  },
  components: {
    Scroll,
    Loading,
    ImageCopper,
    ChooseCity,
    carBrand,
    rightNavList
  }
};
</script>

<style lang="scss" scoped>
.myInfo {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f5f5f5;
  color: #999999;
  @include font-dpr(24px);
  .base + .base {
    border-top: 1px solid #eee;
  }

  .scroll-wrapper {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .base {
    height: px2rem(96);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 px2rem(36) 0 px2rem(31);
    .iconfont {
      @include font-dpr(24px);
      margin-left: px2rem(18);
    }
    .title {
      color: #666666;
      @include font-dpr(28px);
    }
  }
  .head {
    background-color: #fff;
    margin-top: px2rem(21);
    height: px2rem(120);

    .user-img {
      height: px2rem(90);
      width: px2rem(90);
    }
    .input-container {
      position: relative;
      #uploadImg {
        position: absolute;
        opacity: 0;
      }
    }
  }

  .list-container {
    overflow: hidden;
    margin-top: px2rem(21);
    background-color: #fff;
    .edit {
      color: #5e93fc;
      margin-left: px2rem(20);
    }
  }
  .editNickName {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: px2rem(126);
    border-radius: px2rem(10) px2rem(10) 0 0;
    background-color: #fff;
    padding: 0 px2rem(36);
    display: flex;
    align-items: center;
    .editIpt {
      flex: 1;
      height: px2rem(66);
      background-color: #f5f5f5;
      border-radius: px2rem(10);
      margin-right: px2rem(20);
    }
    .confirmBtn {
      flex-shrink: 0;
      height: px2rem(66);
      width: px2rem(120);
      background-color: #42bd55;
      color: #fff;
      text-align: center;
      line-height: px2rem(66);
      border-radius: px2rem(10);
      @include font-dpr(26px);
    }
  }
  .toast-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .showLoading {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
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

