<template>
    <div class="particulars">
        <div class="info" v-if="isEmpty">
            <div class="item">
                <p class="title">
                    超大面积全景天窗开启迷人全新视野，吸纳更多阳光，
                    营造宽敞明亮的时尚车内空间。如果光线过亮，可使用电动卷轴阳帘遮蔽。
                    高厚度钢化玻璃，不仅提升车顶安全性，更会挡住噪音，保证车内静谧高雅的氛围。
                </p>
                <img class="img_info" src="http://vw.faw-vw.com/models/tayron/img/exterior-bottom-img.jpg">
                <p class="title">
                    全系后排座椅可前后移动18CM，靠背角度在25.75度范围内实现无极调节，
                    灵活营造车内宽大舒适空间。后排座椅还支持4/2/4分折叠放倒，根据行李大小，
                    自由拓展车内空间，使您的旅程畅然惬意。
                </p>
            </div>
        </div>
        <div class="noInfo" v-if="!isEmpty">
            <div class="item">
                <p class="title">汽车信息</p>
                <div class="img-container">
                    <img  src="./img/noCarInfo@2x.png"  alt="没有相关信息">
                </div>
                <p class="desc">这里很干净，什么信息也没有~</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
      pContent: {
          type: Object,
          default: () =>{
              return {}
          }
      }  
    },
    data(){
        return {
            isEmpty: false
        }
    },
    created() {
        if(!this.pContent.carLocation && !this.pContent.carInfo && !this.pContent.introduction){
            this.isEmpty = true;
        }else{
            this.isEmpty = false;
        }
    },
    methods:{
        loadImage(){
            this.$emit('loadImage')
        }
    },
    watch:{
        pContent(newVal){
            if(!newVal.carLocation && !newVal.carInfo  && !newVal.introduction){
                this.isEmpty = true;
            }else{
                this.isEmpty = false;
            }
        }
    }

}
</script>

<style lang="scss" scoped>
.particulars{
    // flex-shrink: 0;
    // width: 100vw;
    box-sizing: border-box;
    padding: px2rem(28) px2rem(28) px2rem(28);
    .item{
        margin-bottom: px2rem(60);
        text-align: left;
        @include font-dpr(28px);
        .title{
            color: #666666;
            margin-bottom: px2rem(20);
            font-weight: 200;
        }
        .img_info{
            width: 100%;
            height: px2rem(360);
        }
    }
    .noInfo{
        .img-container{
            width: px2rem(260);
            height: px2rem(190);
            margin: 0 auto;
        }
        .desc{
             @include font-dpr(28px);
             color: #999999;
             text-align: center;
        }
    }
}
</style>
