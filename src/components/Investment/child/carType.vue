<template>
    <div class="carType">
        <div class="item" v-for="(item,index) in list" :key="index" @click.stop="sort(item,index)">
            {{item.title}}
        </div>
    </div>
</template>
<script>
export default {
  props: {
    threeNavIndex: Number,
    required: true
  },
  data() {
    return {
      list: [
        {
          title: "全部",
          filter: 0
        },
        {
          title: "微型车",
          filter: 0
        },
        {
          title: "小型车",
          filter: 0
        },
        {
          title: "紧凑型车",
          filter: 0
        },
        {
          title: "中型车",
          filter: 0
        },
        {
          title: "中大型车",
          filter: 0
        },
        {
          title: "大型车",
          filter: 0
        },
        {
          title: "跑车",
          filter: 0
        },
        {
          title: "MPV",
          filter: 0
        },
        {
          title: "SUV",
          filter: 0
        },
        {
          title: "微面",
          filter: 0
        },
        {
          title: "微卡",
          filter: 0
        },
        {
          title: "轻客",
          filter: 0
        },
        {
          title: "低端皮卡",
          filter: 0
        },
        {
          title: "高端皮卡",
          filter: 0
        }
      ],
      curIndex: 0
    };
  },
  mounted() {
    this.curIndex = this.threeNavIndex;
  },
  methods: {
    sort(item, index) {
      this.curIndex = index;
      this.$emit("getThreeNavIndex", index);
    }
  }
};
</script>
<style lang="scss" scoped>
.carType {
  width: 100%;
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
  background-color: #fff;
  padding: px2rem(20);
  box-sizing: border-box;

  .item {
    width: 23%;
    box-sizing: border-box;
    // justify-content: center;
    // align-items: center;
    border: 1px solid #555;
    text-align: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding: px2rem(20) 0;
    margin-right: px2rem(18);
    margin-bottom: px2rem(20);
  }

  .item:nth-child(4n) {
    margin-right: 0 !important;
  }
}
</style>


