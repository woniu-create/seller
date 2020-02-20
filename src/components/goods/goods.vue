<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item,index) in goods "  class="menu-item" :class="{'current':currentIndex===index}" @click="selectMenu(index, $event)">
          <span class="text">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in goods" :key="item.id" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li  @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span>月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol  :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
   </div>
    <shopcart ref="shopcart" :selectFoods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minprice"></shopcart>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
import shopcart from '../shopcart/shopcart.vue';
import cartcontrol from '../cartcontrol/cartcontrol.vue';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    };
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[1];
        let height2 = this.listHeight[i + 1];
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i;
        }
      }
      return 0;
    },
       selectFoods () {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          });
        });
        return foods;
      }
    },
  created () {
    this.classMap = ["decrease", "discount", "special", "invoice", "guarantee"];
    let _this = this;
    this.$http
      .get("../../static/data.json")
      .then(function(res) {
        _this.goods = res.data.goods;
        _this.$nextTick(() => {
          _this._initScroll();
          _this._calculateHeight();
        });
        // _this._initScroll();
        // console.log(_this.goods);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    selectMenu (index, $event) {
      if (!event._constructed) {
        //浏览器直接return掉,去掉自带click事件的点击
        return;
      }
      let foodList = this.$refs.foodsWrapper.getElementsByClassName( "food-list-hook" );
      let ref = foodList[index]; //取到index对应的DOM
      this.foodsScroll.scrollToElement(ref, 300); //滚动到DOM所在位置
      //console.log(index);
    },
        selectFood (food, event) {
        if (!event._constructed) {
          return;
        }
        this.selectedFood = food;
        // this.$refs.food.show();
      },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3
      });
      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y));
      });
    },
    _calculateHeight () {
      let foodList = this.$refs.foodsWrapper.getElementsByClassName( "food-list-hook");
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i];
        height += item.clientHeight;
        this.listHeight.push(height);
      }
    }
  },
  components: {
     shopcart,
     cartcontrol
  }
};
</script>

<style>
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  overflow: hidden;
}
.goods .menu-wrapper {
  flex: 0 0 80px;
  width: 80px;
  background: #f3f5f7;
}
.goods .menu-wrapper .menu-item {
  display: table;
  height: 54px;
  width: 56px;
  padding: 0 12px;
  line-height: 14px;
}
.menu-wrapper .current {
   position: relative;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
          z-index: 10;
}
.goods .menu-wrapper .icon {
  display: inline-block;
  vertical-align: top;
  width: 12px;
  height: 12px;
  margin-right: 2px;
  background-size: 12px 12px;
  background-repeat: no-repeat;
}
.menu-wrapper .icon .decrease {
  background-image: url("../header/decrease_1@2x.png");
}

.menu-wrapper .icon .discount {
  background-image: url("../header/discount_1@2x.png");
}

.menu-wrapper .icon .special {
  background-image: url("../header/special_1@2x.png");
}

.menu-wrapper .icon .invoice {
  background-image: url("../header/invoice_1@2x.png");
}

.menu-wrapper .icon .guarantee {
  background: url("../header/guarantee_3@2x.png") no-repeat;
}
.menu-wrapper .text {
  display: table-cell;
  vertical-align: middle;
  font-size: 12px;
  width: 56px;
}
.foods-wrapper {
  flex: 1;
}
.foods-wrapper .title {
  padding-left: 14px;
  height: 26px;
  line-height: 26px;
  border-left: 2px solid #d9dde1;
  font-size: 12px;
  color: rgb(147, 153, 159);
  background: #f3f5f7;
}
.foods-wrapper .food-item {
  display: flex;
  margin: 18px;
  padding-bottom: 18px;
  /* border: 1px solid rgba(7,17,27,0.1) */
}
.foods-wrapper .food-item .icon {
  flex: 0 0 57px;
  margin-right: 10px;
  /* margin: 0px 30px 0px 14px; */
}
.foods-wrapper .content {
  flex: 1;
}
.foods-wrapper .name {
  margin: 2px 0 8px 0;
  height: 14px;
  line-height: 14px;
  font-size: 14px;
  color: rgb(7, 17, 27);
}
.foods-wrapper .desc {
  margin-bottom: 8px;
  line-height: 12px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.foods-wrapper .extra {
  line-height: 10px;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.foods-wrapper .extra .count {
  margin-right: 12px;
}
.foods-wrapper .price {
  font-weight: 200;
  line-height: 24px;
}
.foods-wrapper .price .now {
  margin-right: 8px;
  font-size: 14px;
  color: rgb(240, 20, 20);
}
.foods-wrapper .price .old {
  text-decoration: line-through;
  font-size: 10px;
  color: rgb(147, 153, 159);
}
.cartcontrol-wrapper{
  position: absolute;
  right: 0;
  /* bottom: 6px; */
  margin-right: 15px;
  margin-top: -35px;
}
</style>