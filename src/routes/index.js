import { createWebHistory, createRouter } from "vue-router";
import Login from '../views/Login/Login.vue'
import homeUser from '../views/Home/Home.vue'
import DetalsProduct from '../views/DetailsProduct/Details.vue'
import Cart from '../views/Cart/Cart.vue'
import ListOrder from '../views/Admin/ListOrder/ListOrder.vue'

// Admin

import addProduct from '../views/Admin/AddProduct/AddProduct.vue'
import brandAdmin from '../views/Admin/Brand/Brand.vue'
import editProduct from '../views/Admin/EditProduct/EditProduct.vue'
import HomeAdmin from '../views/Admin/Home/Home.vue'
import Shipping from '../views/Admin/Shipping/Shipping.vue'
import Revenue from '../views/Admin/Revenue/Revenue.vue'
import Upload3D from '../views/Add3D/Add3D.vue'
import ListUser from '../views/Admin/ListUser/ListUser.vue'

const routes = [
    {
        path: '/cart/:id',
        component: Cart
    },

    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: homeUser
    },
    {
        path: '/product/:id',
        component: DetalsProduct
    },
    {
        path: '/add-model3D',
        component: Upload3D
    },


    // Admin
    {
        path: '/admin/list-user',
        component: ListUser
    },

    {
        path: '/admin/home',
        component: HomeAdmin
    },
    {
        path: '/admin/addproduct',
        component: addProduct
    },
    {
        path: '/admin/addBrand',
        component: brandAdmin
    },
    {
        path: '/admin/editProduct/:id',
        component: editProduct
    },
    {
        path: '/admin/list/order',
        component: ListOrder
    },
    {
        path: '/admin/list/shipping',
        component: Shipping
    },
    {
        path: '/admin/revenue',
        component: Revenue
    },

    //default

    {
        path: '/:pathMatch(.*)*',
        redirect: '/home'
    },

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router; 
