<template>
    <div class="chooseCity">
        <span class="icon iconfont icon--" @click="close"></span>
        <div class="content">
            <div class="title-container">
                <h2 class="title">城市选择</h2>
                <p class="detail">定制所在城市的内容</p>
            </div>
            <scroll ref="listScroll"
                :data="citys"
                class="scroll-wrapper"

            >
                <div class="all-city-container">
                    <div class="curCity-container">
                        <p class="title">当前城市</p>
                        <div class="curCity">
                            <span class="city" :data-city="lcationCity" :class="{active: lcationCity.name == finalCity.name,elClass: lcationCity.name == finalCity.name}">{{lcationCity.name}}</span>
                            <div class="getCity" @click="relocation"><span class="icon iconfont icon-htmal5icon14"></span>重新定位</div>
                        </div>
                    </div>
                    <div class="otherCity-container" v-for="(item) in citys" :key="item[0].id" v-cloak ref="otherCity">
                        <div class="title" @click="toggleCity(item[0])">
                            <span>{{item[0].name}}</span>
                            <div>
                                <span class="icon iconfont " :class="item[0].open === false?'icon-down':'icon-shang' "></span>
                            </div>
                        </div>
                        <ul v-if="!item[0].open">
                            <li class="city border-1px" v-for="(city) in item[1]" :key="city.id" @click="selectCity(city)" :class="{active: city.name == finalCity.name,elClass: city.name == finalCity.name}">{{city.name}}</li>
                        </ul>
                    </div>
                </div>
            </scroll>
        </div>
    </div>
</template>
<script>
import Scroll from "src/base/scroll/scroll";
export default {
  props: {
    //从父级传入的当前城市
    curCity: {
      type: Array
    },
    //当前地图的显示状态
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      //当前定位城市
      lcationCity: { name: "广东省广州" },
      //当前选择城市
      finalCity: {},
      //所有城市列表
      citys: []
    };
  },
  created() {
    //先定位
    this.location();
  },
  mounted() {
    //获取所有城市
    this._getAllCitys();
  },
  methods: {
    pullingUp() {
      this.$refs.listScroll.finishPullUp();
    },
    pullingDown(e) {
      this.$refs.listScroll.finishPullDown();
    },
    close() {
      this.$emit("close", null);
    },
    toggleCity(item) {
      //默认展开，没有open属性
      console.log(item);
      if (typeof item.open === "false") {
        this.$set(item, "open", true);
      } else {
        item.open = !item.open;
      }
      //重新计算元素高度
      this.$refs.listScroll.refresh();
    },
    selectCity(city) {
      if (!city) {
        return;
      }
      this.finalCity = city;
      this.$emit("close", this.finalCity);
    },
    //定位
    location() {
      // let me = this;
      // return new Promise((resolve,reject) => {
      //      let citylocation = new qq.maps.CityService({
      //         complete : function(result){
      //             console.log(result)
      //             // debugger;
      //             me.lcationCity = result.detail;
      //             me.finalCity =  me.lcationCity ;
      //             if(result.detail.name){
      //                 resolve();
      //             }else{
      //                 reject();
      //             }
      //         }
      //     });
      //     //调用searchLocalCity();方法    根据用户IP查询城市信息。
      //     citylocation.searchLocalCity();
      // })
    },
    relocation() {
      // this.location().then(() => {
      //     this.$emit('close',this.finalCity);
      // }).catch((err) => {
      //     console.log(err)
      // })
    },
    //获取所有城市数据
    _getAllCitys() {
      this.citys = this.curCity;
      console.log(this.citys);
    }
  },
  watch: {
    //当地图显示状态发生变化时，滚动到相应位置
    // isShow(newVal){
    //     // console.log(newVal)
    //     if(newVal){
    //         this.$refs.listScroll.refresh();
    //         if(!this.curCity.name){return};
    //         this.finalCity = this.curCity;
    //         let activeCity = document.querySelector('.elClass');
    //         if(!activeCity){return}
    //         this.$refs.listScroll.scrollToElement(activeCity,0,true,true)
    //     }
    // }
  },
  components: {
    Scroll
  }
};
</script>

<style lang="scss" scoped>

.chooseCity {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  z-index: 100;
  .icon-- {
    position: absolute;
    left: px2rem(36);
    top: px2rem(29);
    @include font-dpr(30px);
  }
  .content {
    position: absolute;
    top: px2rem(65);
    bottom: 0;
    left: 0;
    right: 0;
    .title-container {
      height: px2rem(170);
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding-left: px2rem(36);
      .title {
        @include font-dpr(36px);
        margin-bottom: px2rem(16);
      }
      .detail {
        @include font-dpr(22px);
        color: #6c7179;
      }
    }
    .scroll-wrapper {
      position: absolute;
      top: px2rem(170);
      bottom: 0;
      left: 0;
      right: 0;
      overflow: hidden;
    }
    .all-city-container {
      .curCity-container {
        .title {
          height: px2rem(48);
          line-height: px2rem(48);
          padding-left: px2rem(36);
          background-color: #ededed;
          @include font-dpr(22px);
        }
        .curCity {
          height: px2rem(96);
          padding: 0 px2rem(36);
          display: flex;
          justify-content: space-between;
          align-items: center;
          .city {
            @include font-dpr(32px);
            color: #3c3d41;
          }
          .getCity {
            @include font-dpr(22px);
            color: #42bd55;
            .icon-htmal5icon14 {
              @include font-dpr(22px);
            }
          }
        }
      }
      .mainCity-container {
        .title {
          height: px2rem(48);
          line-height: px2rem(48);
          padding-left: px2rem(36);
          background-color: #ededed;
          @include font-dpr(22px);
        }
        .city {
          height: px2rem(96);
          line-height: px2rem(96);
          padding: 0 px2rem(36);
          @include font-dpr(32px);
          color: #6c7179;
          @include border-1px(#e4e4e4);
        }
      }
      .otherCity-container {
        .title {
          height: px2rem(96);
          padding: 0 px2rem(36);
          background-color: #ededed;
          @include font-dpr(32px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          .iconfont {
            padding: px2rem(20);
            @include font-dpr(24px);
          }
        }
        .city {
          height: px2rem(96);
          line-height: px2rem(96);
          padding: 0 px2rem(64);
          @include font-dpr(32px);
          color: #6c7179;
          @include border-1px(#e4e4e4);
        }
      }
      .active {
        color: #42bd55 !important;
      }
    }
  }
}
</style>

