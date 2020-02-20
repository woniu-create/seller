import Vue from 'vue';
import VueRouter from 'vue-router';
import goods from '../components/goods/goods';
import seller from '../components/seller/seller';
import ratings from '../components/ratings/rating';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: '/',
            component: goods

        },
        {
            path: '/goods',
            name: 'goods',
            component: goods
        },
    {
     path: '/seller',
     name: 'seller',
     component: seller
    },
    {
        path: '/ratings',
        name: 'ratings',
        component: ratings
    } 
],
linkActiveClass: 'active'
})