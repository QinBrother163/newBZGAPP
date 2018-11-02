<template>
    <div class="price-filter">
        <div class="item" v-for="(item,index) in list" :key="index" @click.stop="sort(item,index)"   >
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
          title: "不限",
          filter: [0, Infinity]
        },
        {
          title: "8万以下",
          filter: [0, 80000]
        },
        {
          title: "8-10万",
          filter: [80000, 100000]
        },
        {
          title: "10-15万",
          filter: [100000, 150000]
        },
        {
          title: "15-20万",
          filter: [150000, 200000]
        },
        {
          title: "20-30万",
          filter: [300000, 500000]
        },
        {
          title: "50万以上",
          filter: [500000, Infinity]
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
.price-filter {
  background-color: #fff;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: px2rem(50) px2rem(50);
  grid-gap: px2rem(10) px2rem(10);
  grid-auto-flow: row;
  padding: px2rem(20);
  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #555;
  }
}
</style>


