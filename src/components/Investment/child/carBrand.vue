<template>
    <div class="carBrand">
        <div class="item" v-for="brand in list" :key="brand[0]" :dataNum="brand[1].length"
            >
            <p class="barnd_title" :ref="brand[0]">{{brand[0]}}</p>
            <p @click.stop="sort(car.name)" v-for="(car) in brand[1]" :key="car.id" class="barnd_name">{{car.name}}</p>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    carBrandList: Array,
    elementIndex:String
  },

  data() {
    return {
      list: []
    };
  },
  mounted() {
    this._getCarBrandData();
  },
  watch: {
    elementIndex (val) {
      this.$emit('singleLetter', this.$refs[val][0]);
    }
  },
  methods: {
    sort(e) {
      this.$emit("getThreeNavIndex", e);
    },

    _getCarBrandData() {
      const arr = [
        [
          "A",
          [
            {
              id: 0,
              name: "奥迪1",
              firstChar: "A"
            },
            {
              id: 1,
              name: "奥迪2",
              firstChar: "A"
            },
            {
              id: 2,
              name: "奥迪21",
              firstChar: "A"
            },
            {
              id: 3,
              name: "奥迪22",
              firstChar: "A"
            },
            {
              id: 4,
              name: "奥迪23",
              firstChar: "A"
            },
            {
              id: 5,
              name: "奥迪24",
              firstChar: "A"
            },
            {
              id: 6,
              name: "奥迪27",
              firstChar: "A"
            },
            {
              id: 7,
              name: "奥迪52",
              firstChar: "A"
            },
            {
              id: 8,
              name: "奥迪24",
              firstChar: "A"
            }
          ]
        ],
        [
          "B",
          [
            {
              id: 9,
              name: "本田1",
              firstChar: "B"
            },
            {
              id: 10,
              name: "本田72",
              firstChar: "B"
            },
            {
              id: 11,
              name: "本田2",
              firstChar: "B"
            },
            {
              id: 12,
              name: "本田25",
              firstChar: "B"
            },
            {
              id: 13,
              name: "本田42",
              firstChar: "B"
            },
            {
              id: 14,
              name: "本田24",
              firstChar: "B"
            },
            {
              id: 15,
              name: "本田42",
              firstChar: "B"
            },
            {
              id: 16,
              name: "本田22",
              firstChar: "B"
            },
            {
              id: 17,
              name: "本田32",
              firstChar: "B"
            },
            {
              id: 18,
              name: "本田28",
              firstChar: "B"
            },
            {
              id: 19,
              name: "本田72",
              firstChar: "B"
            }
          ]
        ],
        [
          "C",
          [
            {
              id: 20,
              name: "本田5",
              firstChar: "C"
            },
            {
              id: 21,
              name: "本田6",
              firstChar: "C"
            },
            {
              id: 22,
              name: "本田7",
              firstChar: "C"
            },
            {
              id: 23,
              name: "本田64",
              firstChar: "C"
            },
            {
              id: 24,
              name: "本田17",
              firstChar: "C"
            },
            {
              id: 25,
              name: "本田64",
              firstChar: "C"
            },
            {
              id:26,
              name: "本田71",
              firstChar: "C"
            },
            {
              id: 27,
              name: "本田63",
              firstChar: "C"
            },
            {
              id: 28,
              name: "本田47",
              firstChar: "C"
            }
          ]
        ],
        [
          "D",
          [
            {
              id: 200,
              name: "本田5",
              firstChar: "D"
            },
            {
              id: 201,
              name: "本田6",
              firstChar: "D"
            },
            {
              id: 202,
              name: "本田7",
              firstChar: "D"
            },
            {
              id: 203,
              name: "本田64",
              firstChar: "D"
            },
            {
              id: 204,
              name: "本田17",
              firstChar: "D"
            },
            {
              id: 205,
              name: "本田64",
              firstChar: "D"
            },
            {
              id:206,
              name: "本田71",
              firstChar: "D"
            },
            {
              id: 207,
              name: "本田63",
              firstChar: "D"
            },
            {
              id: 208,
              name: "本田47",
              firstChar: "D"
            }
          ]
        ],
        [
          "E",
          [
            {
              id: 2110,
              name: "本田5",
              firstChar: "E"
            },
            {
              id: 211,
              name: "本田6",
              firstChar: "E"
            },
            {
              id: 212,
              name: "本田7",
              firstChar: "E"
            },
            {
              id: 213,
              name: "本田64",
              firstChar: "E"
            },
            {
              id: 214,
              name: "本田17",
              firstChar: "E"
            },
            {
              id: 215,
              name: "本田64",
              firstChar: "E"
            },
            {
              id:216,
              name: "本田71",
              firstChar: "E"
            },
            {
              id: 127,
              name: "本田63",
              firstChar: "E"
            },
            {
              id: 128,
              name: "本田47",
              firstChar: "E"
            }
          ]
        ]
      ];

      this.list = arr;
    }
  }
};
</script>

<style lang="scss" scoped>
.carBrand {
  width: 100%;
  background-color: #fff;
  .item {
    .barnd_title {
      height: px2rem(40);
      background: #f0efed;
      line-height: px2rem(40);
      box-sizing: border-box;
      padding: 0 px2rem(20);
    }
    .barnd_name {
      padding: 0 px2rem(40);
      height: px2rem(50);
      line-height: px2rem(50);
      border: 1px solid #eee;
    }
    .barnd_name：last-child {
      border: none;
    }
  }
}
</style>

