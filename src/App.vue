<template>
  <div id="app">
 <v-header :seller="seller"></v-header>
  <div class="tab">
   <div class="tab-item">
    <router-link to="/goods">商品</router-link></div>
   <div class="tab-item">
     <router-link to="/ratings">评论</router-link></div>
   <div class="tab-item">
    <router-link to="/seller">商家</router-link>
     </div>
  </div>
    <router-view  :seller="seller"></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue';
export default{
  data () {
   return {
   seller: {}
   };
},
created () {
let _this = this;
this.$http
.get('../../static/data.json')
 .then(function (res) {
_this.seller = res.data.seller;
console.log(_this.seller);
 })
 .catch(error => {
   console.log(error);
 });
},
// created () {
// this.$http.get('../../static/data.json')
// .then(function (res) {
//   console.log(res);
// })
//   .catch(error => {
//    console.log(error);
//  });
// },
   components: {
      'v-header': header
    }
};
</script>

<style>

 .tab{
  display:flex;
  width:100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid  rgba(7,17,27,0.1)
 }
  .tab .tab-item{
   flex: 1;
   text-align: center
 }
  .tab .tab-item>a{
   display: block;
   font-size: 14px;
   color:rgb(77,85,93)
 }
 .tab .tab-item>.active{
   color: rgb(240,20,20);
 }
</style>
