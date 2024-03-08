<template>
    <div class="Header container">
        <Header></Header>
        <div>
            <nav class="main_nav">
                <div class="container">
                    <div class="row main_brand">
                        <div class="col">
                            <div class="main_nav_content d-flex flex-row">
                                <div class="main_nav_menu">
                                    <ul class="standard_dropdown main_nav_dropdown">
                                        <li class="Brand__name" v-for="(item, index) in this.Brand" :key="index">
                                            <button type="button" @click="renderProduct(item._id)"
                                                class="btn__brand Brand__name">
                                                {{ item.name }}
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div>
                <br>
                <div class="grid-container form_product_item">
                    <div v-for="(item, index) in this.Product" :key="index"
                        class="grid-x grid-margin-x small-up-1 medium-up-2 large-up-4">
                        <div class="product-box">
                            <div class="product-item">
                                <div class="link_item" @click="link(item._id)">
                                    <div class="product-item-image">
                                        <img :src="`${host}/${item.item.image[0]}`" alt="Stadium Full Exterior">
                                        <div class="product-item-image-hover">
                                        </div>
                                    </div>
                                    <div class="product-item-content">
                                        <div class="product-item-category">
                                            {{ item.name }}
                                        </div>

                                        <div class="product-item-price">
                                            <del v-if="item.disCount > 0" class="price_item">{{
                                            formattedPrice(item.price) }}</del> &ensp;
                                            <span class="moneyDeals_item">{{ formattedPrice(item.moneyDeals) }}</span>
                                        </div>
                                        <div class="button-pill">
                                            <span>Shop Now</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-if="item.disCount > 0" class="product-item-title">
                                    {{ item.disCount + '%' }}
                                </div>


                                <div>
                                    <span class="favourite"><i class="fa-regular fa-heart"></i></span>
                                    <span class="star" v-if="item.comments_id.length > 0">
                                        <i class="fa-solid fa-star"></i>

                                        {{ sumReviewsProduct(item.comments_id) }}
                                        <span class="solid mr-1 ml-1">|</span>
                                        <span class="number_by">
                                            {{ item.quantity_buy }} đã bán
                                        </span>
                                    </span>
                                    <div style="float: left;" v-else>
                                        <span>Chưa có đánh giá</span>
                                        <span class="solid mr-1 ml-1">|</span>
                                        <span class="number_by">
                                            {{ item.quantity_buy }} đã bán
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div class="grid-container">
                    <div class="grid-x grid-margin-x small-up-1 medium-up-1 large-up-1 grid-x-wrapper">
                        <div class="product-box column" style="text-align: center;  margin: 50px 0 50px;">
                            <Chat title="Chat bot"></Chat>
                        </div>
                    </div>
                </div>
                <br><br>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../../components/Header/Header.vue';
import BrandService from '../../service/Brand'
import ProductService from '../../service/Product'
import formatPrice from '../../utils/Format.utils'
import Chat from '../../components/Chatbot/Chatbot.vue'
export default {
    components: {
        Header, Chat
    },
    data() {
        return {
            Brand: [],
            Product: [],
            id: '',
            host: import.meta.env.VITE_PORT,

        }
    },
    async created() {

        let product = await ProductService.getAllProduct()
        this.Product = product.data

        let brand = await BrandService.getAll()
        this.Brand = brand.data
        // setTimeout(function () {
        //     document.getElementById("loading").classList.add("none");
        // }, 0);


    },
    methods: {
        format(price) {
            return formatPrice.priceFormat(price);
        },
        formattedPrice(price) {
            return this.format(price);
        },

        sumReviewsProduct(comments_id) {
            let sum = 0
            let k = 0
            for (let index = 0; index < comments_id.length; index++) {
                sum = sum + comments_id[index].rating
                k++
            }
            return (sum / k).toFixed(1)
        },
        link(id) {
            this.$router.push({ path: `/product/${id}` });
        },

        async renderProduct(id) {
            const pre_product = []
            let brand_item = await BrandService.getOne(id)
            let Product_item = await brand_item.data.productsID
            for (let index = 0; index < Product_item.length; index++) {
                let product = await ProductService.getOneProduct(Product_item[index])
                pre_product.push(product.data)
            }
            this.Product = pre_product
        }

    }
}
</script>

<style scoped>
@import url('../Home/Home.css');

.product-item .product-item-title {
    color: #fff;
}

.product-item-title {
    position: absolute;
    top: 0;
    left: 0px;
    padding: 1px;
    width: 80px;
    height: 31px;
    /* background-color: red; */
    background: url(../../../public/sale.png) center center no-repeat;
    background-size: contain;
    color: #fff;
    z-index: 100;
    background-color: unset !important;
}

.link_item {
    cursor: pointer;
}

.number_by {
    color: #808080;
    font-size: 14px;
}

.solid {
    color: #ccc;
}

.fa-star {
    color: #eda500;

}

.star {
    float: left;

}

.favourite {
    cursor: pointer;
    float: right;
}

.product-item-category {
    text-transform: uppercase;
}

.grid-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.product-box {
    margin: -7px;
    height: 400px;
    width: 320px;
    box-sizing: border-box;
}

.product-item {
    position: relative;
    text-decoration: none;
    color: #333;
    border-radius: 5px;
    overflow: hidden;
}

.product-item-image {
    position: relative;
    height: 55%;
}

.product-item-image img {
    width: 100%;
    height: 80%;
    /* object-fit: cover; */
}

.product-item:hover .product-item-image-hover {
    opacity: 1;
}

.product-item-content {
    padding: 10px;
    height: 40%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.price_item {
    text-decoration: line-through;
}

.moneyDeals_item {
    font-size: 1rem;
    font-weight: 600;
    color: red;

}

.button-pill {
    margin: auto;
    padding: 5px;
    background-color: #ee4d2d;
    border-radius: 20px;
    width: 45%;
}
</style>