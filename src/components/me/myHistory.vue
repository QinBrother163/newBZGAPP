<template>
    <div class="myHistory">
        <scroll 
            ref="scroll" 
            class="scroll-container"
            :listenScroll="true"
            @pullingDown="pullingDown"
            @pullingUp="pullingUp"
        >   
        <div>
            <div class="listWrap">
              <div v-for="(item,index) in lists" :key="index" class="list_item">
                  <div class="imgWrap">
                    <img :src="item.url">
                  </div>
                  <div class="infoWrap">
                      <p class="title">{{item.title}}</p>
                      <p class="name">{{item.deploy}}</p>
                      <p class="price">￥{{item.price}}</p>
                  </div>
              </div>
                <p class="underline" v-show="isLastPage">已经到底了...</p>
            </div>          
        </div>
        </scroll>
    </div>
</template>
<script>
import Scroll from "src/base/scroll/scroll";

export default {
  data() {
    return {
      lists: [],

      isLastPage: false
    };
  },
  created() {
    this.getListsData();
  },
  mounted() {},
  methods: {
    pullingDown(e) {
      this.$refs.scroll.finishPullDown();
    },
    pullingUp() {
      this.$refs.scroll.finishPullUp();
    },
    getListsData() {
      let arr = [
        {
          price: "99",
          deploy: "2018版高配",
          url:
            "https://static.youshuge.com/book_img/I1m7mgptCle48kF1PML8fHUWmiyrVB3LnOLbV4JU.jpeg",
          title:
            "奥迪 A4 进口 2018款2.7L 中东30周年特别版奥迪 A4 进口 2018款2.7L 中东30周年特别版"
        },
        {
          price: "99",
          deploy: "2018版高配",
          url:
            "https://static.youshuge.com/book_img/I1m7mgptCle48kF1PML8fHUWmiyrVB3LnOLbV4JU.jpeg",
          title:
            "奥迪 A4 进口 2018款2.7L 中东30周年特别版奥迪 A4 进口 2018款2.7L 中东30周年特别版"
        },
        {
          price: "99",
          deploy: "2018版高配",
          url:
            "https://static.youshuge.com/book_img/I1m7mgptCle48kF1PML8fHUWmiyrVB3LnOLbV4JU.jpeg",
          title:
            "奥迪 A4 进口 2018款2.7L 中东30周年特别版奥迪 A4 进口 2018款2.7L 中东30周年特别版"
        },
        {
          price: "99",
          deploy: "2018版高配",
          url:
            "https://static.youshuge.com/book_img/I1m7mgptCle48kF1PML8fHUWmiyrVB3LnOLbV4JU.jpeg",
          title:
            "奥迪 A4 进口 2018款2.7L 中东30周年特别版奥迪 A4 进口 2018款2.7L 中东30周年特别版"
        }
      ];
      this.lists = arr;
      this.isLastPage = true;
    }
  },
  components: {
    Scroll
  }
};
</script>

<style lang="scss" scoped>
.myHistory {
  background-color: #fff;

  .scroll-container {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: px2rem(90);
    overflow: hidden;

    .listWrap {
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
      padding: px2rem(20) px2rem(30);

      .underline {
        @include hintLine();
      }
      .list_item + .list_item {
        margin-top: px2rem(40);
      }
      .list_item {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;

        .imgWrap {
          background-color: $c-eee;
          padding: px2rem(20);
          box-sizing: border-box;
          border-radius: px2rem(6);
          margin-right: px2rem(20);
          img {
            width: px2rem(160);
            height: px2rem(100);
          }
        }
        .infoWrap {
          .title {
            -ms-box-orient: vertical;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-line-clamp: 2;
            max-width: px2rem(460);
            height: px2rem(60);
            line-height: px2rem(30);
            max-height: 100%;
            font-size: $f-s26;
            color: $c-333;
          }
          .name {
            font-size: $f-s20;
            color: $c-999;
            margin-top: px2rem(6);
          }
          .price {
            font-size: $f-s28;
            color: $c-f57;
            margin-top: px2rem(6);
          }
        }
      }
    }
  }
}
</style>

