<template>
    <div class="container form_details">
        <Header v-if="this.reRender"></Header>
        <br>
        <div class="row">
            <div class="col-sm-6" v-if="Product.item.image[0] != undefined">
                <div>
                    <ZoomImg style="cursor: zoom-in;" width="520" height="500"
                        :imageUrl="`${host}/${Product.item.image[0]}`"></ZoomImg>
                    <!-- <img  :src="`${host}/${Product.item.image[0]}`" alt=""> -->
                </div>
                <div v-if="this.Product.Model3D != undefined || this.Product.Mode3D != null" class="text-center">
                    <button type="button" class="model3d_viewer mt-3" data-toggle="modal"
                        data-target=".bd-example-modal-lg">Mô
                        hình 3D của sản phẩm
                    </button>
                    <div style="margin-top: -25px;" class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
                        aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <Render3D :Product="this.Product"></Render3D>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="text-center">
                    <div class="mt-5">
                        <h4>Mô tả</h4>
                    </div>

                    <div class="text-left" v-html="Product.description"></div>
                    <div class="mt-2">
                        <h4>Hình ảnh minh họa</h4>
                    </div>
                    <div v-for="(item, index) in Product.item.image" :key="index">
                        <img class="mt-2" width="520" height="500" :src="`${this.host}/${Product.item.image[index]}`"
                            alt="Ảnh minh họa ">
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div id="scrollFixed">
                    <form @submit.prevent="addToCart()">
                        <div class="title_name">
                            <h1>
                                {{ Product.name }}
                            </h1>
                        </div>
                        <div class="title_price">
                            <p class="price">
                                <del>
                                    <span class="woocommerce-Price-amount amount">
                                        {{ formattedPrice(Product.price) }}
                                    </span>
                                </del>
                                <span class="woocommerce-Price-amount amount discount ml-2">
                                    {{ formattedPrice(Product.moneyDeals) }}
                                </span>
                            </p>
                        </div>
                        <table>
                            <tbody>
                                <tr>
                                    <td class="label">
                                        <span>Màu sắc</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td :style="{ color: Product.color }">
                                        <i class="fa-solid fa-circle"></i>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="label">
                                        <span>Kích cỡ &ensp;
                                            <span class="pull-right sizeGuide">
                                                <router-link to="/huong-dan-cach-chon-size-giay/">
                                                    Mô hình 3D của sản phẩm
                                                    <i class="fa fa-external-link ml-1"></i>
                                                </router-link>
                                            </span>

                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <td class="value">
                                        <div class="attribute-swatch">
                                            <div class="swatchinput" v-for="(item, index) in Product.item.sizes"
                                                :key="index">
                                                <input :disabled="item.quantity == 0" class="ip_radio"
                                                    :class="{ 'none_box': item.quantity == 0 }" :value="item"
                                                    type="radio" name="size" :id="index + 'size'" v-model="this.Size" />
                                                <label :title="item.quantity === 0 ? 'Hết hàng' : ''"
                                                    :class="{ 'none_box': item.quantity == 0 }" :for="index + 'size'"
                                                    class="wcvasquare">
                                                    {{ item.size }}
                                                </label>
                                            </div>
                                        </div>
                                        <div class="mt-2 mb-2" v-if="this.Size.size != undefined">
                                            <i>Số lượng sản phẩm còn: <b>{{ this.Size.quantity }}</b></i>
                                        </div>
                                    </td>
                                </tr>
                                <tr class="mb-5">
                                    <td>
                                        <input style="display: none;" type="radio" name="size" id="none_check"
                                            :value="{}" v-model="this.Size">
                                        <label for="none_check"
                                            style="visibility: visible; display: inline; cursor: pointer;">
                                            Bỏ chọn
                                        </label>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div>
                            <button class="btn_buy">
                                <span class="btn_buyNow">MUA NGAY</span> <br>
                                <small class="btn_ship">GIAO TẬN NHÀ-ĐỔI TRẢ DỄ DÀNG</small>
                            </button>
                        </div>
                    </form>
                    <br>
                    <div>
                        <PC></PC>
                    </div>
                </div>
            </div>
            <div class="mb-2" v-if="Comments.length > 0">
                <div>
                    <div>
                        <div class="text-left mt-3">
                            <h4>ĐÁNH GIÁ SẢN PHẨM</h4>
                        </div>
                        <div>
                            <span v-for="(item, index) in rating" :key="index">
                                <i class="fa-solid fa-star mr-1 ml-1"></i>
                            </span>
                            <span>{{ rating }}/5</span> ({{ Comments.length }} đánh giá)
                        </div>
                    </div>
                </div>
                <hr>
                <div>

                </div>
                <div class="mt-4 item_comments" v-for="(item, index) in Comments" :key="index">
                    <span class="mr-1">
                        <span class="avatar"><i class="fa-solid fa-user"></i></span>
                    </span>
                    <span>
                        <div>{{ item.user_id.fullName }}</div>
                        <span class="ml-1" v-for="(item, i) in parseInt((item.rating)) " :key="i">
                            <i class="fa-solid fa-star ml-1"></i>
                        </span>
                        <div>
                            {{ item.comment }}
                        </div>
                    </span>
                    <hr>
                </div>

            </div>
            <div v-else>
                <h4>
                    Chưa có đánh giá
                </h4>
            </div>
        </div>
    </div>
</template>

<script>
import Render3D from '../../components/Render3D/Render3D.vue'
import PC from '../../components//PolicyConservation/PolicyConservation.vue'
import Header from '../../components/Header/Header.vue'
import CommentsSevice from '../../service/Comments'
import Product from '../../service/Product'
import formatPrice from '../../utils/Format.utils'
import notification from '../../utils/notification.utils'
import Cart from '../../service/Cart'
import ZoomImg from '../../components/ZoomImage/ZoomImage.vue'
import { nextTick } from 'vue'
export default {
    components: {
        Header, PC, ZoomImg, Render3D
    },
    data() {
        return {
            Comments: [],
            reRender: true,
            Product: {
                item: {
                    image: []
                }
            },
            rating: 0,
            Size: {},
            SL: null,
            id: this.$route.params.id,
            host: import.meta.env.VITE_PORT,
            Item: {
                id: '',
                name: '',
                image: '',
                color: '',
                moneyDeals: null,
                quantity: null,
                size: null
            }
        }
    },


    async created() {
        let res = await Product.getOneProduct(this.id)
        this.Product = res.data
        let comments = this.Product.comments_id
        for (let index = 0; index < comments.length; index++) {
            let comment = await CommentsSevice.getOneComments(comments[index])
            this.Comments.push(comment.data)
        }
        this.rating = parseInt(this.sumReviewsProduct(this.Comments))

        // this.rating = await sumReviewsProduct(this.Comments)
    },
    mounted() {
        window.addEventListener('scroll', this.handleWindowScroll)
    },
    unmounted() {
        window.removeEventListener('scroll', this.handleWindowScroll)
    },
    methods: {
        handleWindowScroll(e) {
            if (window.scrollY > 110) {
                let scrollElement = document.getElementById("scrollFixed")
                scrollElement.classList.add("fixedTopZero");
            }
            if (window.scrollY < 150) {
                let scrollElement = document.getElementById("scrollFixed")
                scrollElement.classList.remove("fixedTopZero");
            }
        },
        copyQuantity(sl) {
            this.SL = sl
        },

        format(price) {
            return formatPrice.priceFormat(price);
        },

        formattedPrice(price) {
            return this.format(price);
        },

        sumReviewsProduct(comments_id) {
            if (comments_id.length < 0) {
                return 0;
            }
            let sum = 0
            let k = 0
            for (let index = 0; index < comments_id.length; index++) {
                sum = sum + comments_id[index].rating
                k++
            }
            return (sum / k).toFixed(0)
        },

        async addToCart() {
            try {
                this.id = await JSON.parse(localStorage.getItem('cart'))
                if (this.id == '' || this.id == undefined) {
                    notification.warn('Bạn cần đăng nhập trước khi mua hàng', this)
                }
                else if (this.Size.size == '' || this.Size.size == undefined) {
                    notification.warn('Vui lòng chọn kích cỡ', this)
                }
                else {
                    this.Item.name = this.Product.name
                    this.Item.id = this.Product._id
                    this.Item.image = this.Product.item.image[0]
                    this.Item.moneyDeals = this.Product.moneyDeals
                    this.Item.quantity = this.Size.quantity
                    this.Item.color = this.Product.color
                    this.Item.size = this.Size.size
                    Cart.addCart(this.Item, this.id)
                    notification.success('Đã thêm vào giỏ hàng', this)
                    this.reRender = false
                    await nextTick();
                    this.reRender = true

                }
            }
            catch (err) {
                console.log(err);
                notification.error('Lỗi', this)
            }

        }
    }
}
</script>

<style scoped>
@import url('./Details.css');

#scrollFixed {
    position: fixed;
    top: 170px;
    transition: top 0.5s;
    height: 90vh;
    overflow-y: scroll;

    /* width */
    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #888;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: #555;
    }
}

.model3d_viewer {
    padding: 10px;
    background-color: coral;
    border: 1px solid green;
    border-radius: 5px;
}


.fixedTopZero {
    transition: top 1s;
    top: 0px !important;
}

.item_comments {
    display: flex;
}

.avatar {
    padding: 5px;
    border-radius: 100%;
    background-color: #ccc;
}

.fa-star {
    color: #ee4d2d;
}

.wcvasquare {
    display: inline-block;
    padding: 10px;
    border: 1px solid #ddd;
    cursor: pointer;
}

.ip_radio:checked+.wcvasquare {
    background-color: black;
    color: white;
}

.ip_radio {
    display: none;
}

.title_name {
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, Arial, sans-serif;
    margin-bottom: 25px;
    color: #1e1e23;
}

.title_price {
    font-size: 14px;
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, Arial, sans-serif;
}

del+span.woocommerce-Price-amount.amount {
    color: #1e1e23;
    font-size: 26px;
}

span.woocommerce-Price-amount.amount.discount {
    color: red;
    font-size: 26px;
}

.form_details {
    color: #1e1e23;
    font-family: -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, Arial, sans-serif;
}

.fa-circle {
    max-width: 200px;
}

.attribute-swatch {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 7px;
    padding: 1px;
}

.swatchinput {
    position: relative;
    line-height: 1rem;
    margin: 0;
    padding: 0;
}

.value {
    width: 50%;
}

.wcvasquare {
    width: 100%;
    border-radius: 4px;
    padding: 16px 16px;
    font-size: 1.2rem;
    line-height: 1.6rem;
    text-align: center;
    background: #FFF;
    -webkit-box-align: center;
    border: 1px solid #e5e5e5 !important;
    outline: 0 !important;
    color: #111;
    /* -webkit-align-items: center; */
    -webkit-box-pack: center;
    /* -webkit-justify-content: center; */
    min-width: auto !important;
    cursor: pointer;
    min-width: 69px;
}

.btn_buy {
    min-width: auto;
    width: 100%;
    font-size: 1.1em;
    /* line-height: 20px; */
    height: 60px;
    background-color: #1e1e23;
}

.btn_buyNow {
    color: #fff;
    margin-top: 5px;
}

.btn_ship {
    display: block;
    color: #FFF;
    font-weight: 400;
    font-size: 0.6rem;
}

.none_box {
    background-color: #ccc;
    color: #eceaea;
    cursor: no-drop;

}
</style>