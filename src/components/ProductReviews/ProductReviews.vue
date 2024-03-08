<template>
    <div class="text-center item_history_form">
        <div class="m-2 w-75 item_history text-left mr-auto ml-auto " v-for="(item, index) in History" :key="index">
            <div class="history_card m-2">
                <div class="">
                    <div class="text-center">
                        <h4>
                            Đánh giá sản phẩm
                        </h4>
                    </div>
                    <div>
                        Trạng thái đơn hàng: <span class="color_status">{{ item.cart_items.status }}</span>
                    </div>
                    <div>
                        Thành tiền: {{ formattedPrice(item.cart_items.total) }}
                    </div>
                    <div>
                        Sản phẩm đã mua: {{ item.cart_items.product.length }} sản phẩm
                    </div>
                </div>
                <div class="m-2" v-for="(product, i) in item.cart_items.product" :key="i">
                    <div>
                        <span>
                            Sản phẩm {{ i + 1 }}: {{ product.product_id.name }}
                            <!-- {{ product.evaluate }} -->

                        </span>
                        <button @click="editComments(product.comments_id, item._id, product._id, product.evaluate)"
                            data-toggle="modal" data-target="#exampleModal_1" v-if="product.evaluate == true"
                            class="reviews btn">
                            Đã đánh giá
                        </button>
                        <button v-else data-toggle="modal" data-target="#exampleModal_1" type="button"
                            @click="copyId(product.product_id._id, item._id, product.evaluate, product._id)"
                            class="reviews btn">
                            Đánh giá
                        </button>
                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal_1" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModal_1Label" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModal_1Label">Đánh giá sản phẩm</h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <form @submit.prevent="productReviews()">
                                        <div class="modal-body">
                                            <span class="mr-2">Chất lượng sản phẩm:</span>

                                            <div class="star_number">
                                                <label v-for="(i, index) in 5" :key="index" :for="'star_' + index">
                                                    <span>
                                                        <i v-if="index < Contents.Star"
                                                            class="fa-solid star mr-1 fa-star"></i>
                                                        <i v-else class="fa-regular mr-1 fa-star"></i>
                                                    </span>
                                                    <input class="star_input" type="radio" name="star"
                                                        :id="'star_' + index" :value="index + 1"
                                                        v-model="Contents.Star">
                                                </label>
                                            </div>
                                            <span class="contents_star">
                                                <b>{{ contents_text[Contents.Star - 1] }}</b>
                                            </span>
                                            <br>
                                            <hr>
                                            <span>
                                                <label class="mb-2" for="describe"> Mô tả chất lượng sản phẩm :</label>
                                                <textarea placeholder="Mô tả chất lượng sản phẩm..." name=""
                                                    id="describe" cols="50" rows="3"
                                                    v-model="Contents.comment"></textarea>
                                            </span>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-dismiss="modal">Đóng</button>
                                            <button class="btn btn-primary">Lưu</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import Auth from '../../service/Auth'
import HistoryService from '../../service/History';
import formatPrice from '../../utils/Format.utils'
import CommentSevice from '../../service/Comments'
export default {
    data() {
        return {
            product_item_id: '',
            Contents: {
                Star: 0,
                comment: '',
            },
            history_id: '',
            comments: {},
            check: true,
            idUser: '',
            History: [],
            idProduct: '',
            comment_contents: '',
            contents_text: ['Rất tệ', 'Tệ', 'Bình thường', 'Hài lòng', 'Tuyệt vời'],
        }
    },
    async created() {
        this.idUser = JSON.parse(localStorage.getItem('idUser'))
        let resUser = await Auth.getOneUser(this.idUser)
        let lengthHistory = await resUser.data.history
        for (let index = 0; index < lengthHistory.length; index++) {
            const productHistory = await HistoryService.getOneHistory(lengthHistory[index])
            this.History.push(productHistory.data)
        }
    },
    methods: {
        format(price) {
            return formatPrice.priceFormat(price);
        },

        formattedPrice(price) {
            return this.format(price);
        },

        copyId(idProduct, history_id, check, product_item_id) {
            this.idProduct = idProduct
            this.history_id = history_id
            this.check = check
            this.product_item_id = product_item_id
            this.Contents.Star = 0
            this.Contents.comment = ''
        },

        async productReviews() {
            try {
                this.comments = {
                    product_item_id: this.product_item_id,
                    idProduct: this.idProduct,
                    idUser: this.idUser,
                    rating: this.Contents.Star,
                    history_id: this.history_id,
                    comment_contents: this.Contents.comment
                }
                await CommentSevice.createComments(this.comments)
            }
            catch (err) {
                console.log(err);
            }


        },

        async editComments(id, history_id, product_item_id, check) {
            try {
                this.history_id = history_id
                this.product_item_id = product_item_id
                let comment = await CommentSevice.getOneComments(id)
                this.Contents.Star = comment.data.rating
                this.Contents.comment = comment.data.comment


            }
            catch (err) {
                console.log(err);
            }
        }

    },

}

</script>

<style scoped>
.contents_star {
    margin-left: 10px
}

.star {
    color: rgb(220, 220, 0);
}

.star_input {
    display: none;
}

.star_number {
    display: inline-block;
}

.color_status {
    color: green;
}

.item_history {

    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 20px;
}

.reviews {
    float: right;
    background-color: #ee4d2d;
    padding: 0px 15px;
    cursor: pointer;
    border-radius: 2px;

}
</style>