<template>
    <div class="widgets_cover">
    <div v-for="(item,index) in list" :key="index" class="wrap_item">
        <div class="head">
            <span class="icon iconfont icon-xuanzekefuweidianji p1"></span>
            <span class="icon iconfont icon-jingxiaoshangguanli p2">&nbsp;{{item.name}}</span>
        </div>
        <div class="content">
            <div class="info">
                <div class="iconWrap">
                    <span class="icon iconfont icon-xuanzekefuweidianji p1"></span>
                </div>
                <div class="imgWrap">
                    <img src="https://static.youshuge.com/book_img/I1m7mgptCle48kF1PML8fHUWmiyrVB3LnOLbV4JU.jpeg">
                </div>
                <div class="infoWrap">
                    <p class="p1">{{item.title}}</p>
                    <p class="p2">{{item.deploy}}</p>
                    
                    <div class="control">
                        <p class="p3">￥{{item.price}}</p>
                        <p class="p4">
                            <span>-</span>
                            <input class="p_info" value="1" type="text" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
                            <span>+</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p class="underline" v-show="isLastPage">已经到底了...</p>
    </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      list: [],
      isLastPage: false,
      curIndex: 0
    };
  },
  mounted() {
    this.getListsData();
  },
  methods: {
    sort(item, index) {
      this.curIndex = index;
      this.$emit("getThreeNavIndex", index);
    },
    // 获取数据
    getListsData() {
      let arr = [
        {
          name: "经销商",
          price: "99",
          deploy: "2018版高配",
          title:
            "奥迪 A4 进口 2018款2.7L 中东30周年特别版奥迪 A4 进口 2018款2.7L 中东30周年特别版"
        },
        {
          name: "经销商",
          price: "99",
          deploy: "2018版高配",
          title:
            "奥迪 A4 进口 2018款2.7L 中东30周年特别版奥迪 A4 进口 2018款2.7L 中东30周年特别版"
        },
        {
          name: "经销商",
          price: "99",
          deploy: "2018版高配",
          title:
            "奥迪 A4 进口 2018款2.7L 中东30周年特别版奥迪 A4 进口 2018款2.7L 中东30周年特别版"
        },
        {
          name: "经销商",
          price: "99",
          deploy: "2018版高配",
          title:
            "奥迪 A4 进口 2018款2.7L 中东30周年特别版奥迪 A4 进口 2018款2.7L 中东30周年特别版"
        },
        {
          name: "经销商",
          price: "99",
          deploy: "2018版高配",
          title:
            "奥迪 A4 进口 2018款2.7L 中东30周年特别版奥迪 A4 进口 2018款2.7L 中东30周年特别版"
        }
      ];
      this.list = arr;
      this.isLastPage = true;
    }
  }
};
</script>
<style lang="scss" scoped>
.widgets_cover {
  padding: 0 px2rem(30);

  .underline {
    width: 100%;
    text-align: center;
    font-size: $f-s22;
    color: $c-999;
  }
  .wrap_item {
    box-sizing: border-box;
    padding: px2rem(20);
    border-radius: px2rem(10);
    background-color: #fff;
    margin-bottom: px2rem(20);

    .head {
      padding-bottom: px2rem(30);
      .p1 {
        font-size: $f-s28;
      }
      .p2 {
        font-size: $f-s28;
      }
    }

    .content {
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

      .info {
        width: 100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;

        .iconWrap {
          display: -webkit-box;
          display: -ms-flexbox;
          display: flex;
          margin-right: px2rem(15);
          align-items: center;
          justify-content: center;

          .p1 {
            font-size: $f-s28;
          }
        }

        .imgWrap {
          margin-right: px2rem(15);
          background-color: #eee;
          box-sizing: border-box;
          padding: px2rem(20) px2rem(20);
          border-radius: px2rem(10);

          img {
            width: px2rem(140);
            height: px2rem(100);
          }
        }
        .infoWrap {
          .p1 {
            -ms-box-orient: vertical;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            max-width: px2rem(406);
            height: px2rem(60);
            line-height: px2rem(30);
            max-height: 100%;
            font-size: $f-s26;
          }
          .p2 {
            margin-top: px2rem(10);
            font-size: $f-s20;
            color: $c-999;
          }
          .p3 {
            margin-top: px2rem(6);
            font-size: $f-s28;
            color: $c-f57;
          }

          .control {
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;

            .p4 {
              display: -webkit-box;
              display: -ms-flexbox;
              display: -webkit-flex;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid $c-666;
              border-radius: px2rem(24);
              padding: 0 px2rem(10);

              span {
                padding: px2rem(10) px2rem(20);
              }
              .p_info{
                text-align: center;
                max-width: px2rem(60);
              }
              span:first-child {
                border-right: 1px solid $c-666;
                padding: px2rem(10) px2rem(14);
              }
              span:last-child {
                border-left: 1px solid $c-666;
                padding: px2rem(10) px2rem(14);
              }
              span:first-child, span:last-child{
                font-weight: bold;
              }
            }
          }
        }
      }
    }
  }
}
</style>


