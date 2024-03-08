<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div v-if="itemOrder.length == 0" class="text-center">
                    <h3>
                        Bạn chưa có đơn hàng nào !!!
                    </h3>
                </div>
                <form v-else @submit.prevent="">
                    <table class="table table-image">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Sản phẩm</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Số lượng</th>
                                <th scope="col">Tổng tiền</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Xác nhận</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in itemOrder" :key="index">
                            <tr>
                                <th scope="row">{{ index + 1 }}</th>
                                <td @click="e => { getOrder(item._id) }" data-toggle="modal"
                                    data-target=".bd-example-modal-lg" class="w-25">
                                    <img class="image_item" :src="`${host}/${item.cart_items.product[0].image}`">
                                </td>
                                <td class="text-left">{{ item.cart_items.address }}</td>
                                <td>{{ '0' + item.cart_items.phoneNumber }}</td>
                                <td>
                                    {{
                                        item.cart_items.product.reduce((total, product) => total + product.quantity, 0)
                                    }}
                                </td>
                                <td>{{ formattedPrice(item.cart_items.total) }}</td>
                                <td class="statusOrder">
                                    {{ item.cart_items.status }}
                                </td>
                                <td>
                                    <button data-toggle="modal" data-target="#exampleModal" class="btn btn-primary"
                                        :disabled="item.cart_items.status == 'Đặt hàng thành công'">
                                        Đã nhận hàng
                                    </button>
                                </td>
                            </tr>
                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Xác nhận nhận hàng</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            Bạn đã nhận được sản phẩm?
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-dismiss="modal">Đóng</button>
                                            <button type="submit" @click="createHistory(item)" class="btn btn-primary">
                                                Đồng ý
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            <!-- Large modal -->
                            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
                                aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <h3 class="mt-2">
                                            CHI TIẾT ĐƠN HÀNG
                                        </h3>
                                        <div class="container">
                                            <div class="row">
                                                <div class="col-12">
                                                    <table class="table table-image">
                                                        <thead>
                                                            <tr>
                                                                <th scope="col">STT</th>
                                                                <th scope="col">Ảnh minh họa</th>
                                                                <th scope="col">Tên sản phẩm</th>
                                                                <th scope="col">Kích cỡ</th>
                                                                <th scope="col">SL</th>
                                                                <th scope="col">Giá tiền</th>
                                                                <th scope="col">Giảm giá</th>
                                                                <th scope="col">Tổng cộng</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr v-for="(item, index) in this.oneOrder.cart_items.product"
                                                                :key="index">
                                                                <th scope="row">{{ index + 1 }}</th>
                                                                <td class="w-25">
                                                                    <img :src="`${host}/${item.image}`"
                                                                        class="img-fluid img-thumbnail" alt="Sheep">
                                                                </td>
                                                                <td class="text-left">{{ item.product_id.name }}</td>
                                                                <td>{{ item.size }}</td>
                                                                <td>{{ item.quantity }}</td>
                                                                <td>
                                                                    <del>
                                                                        {{ formattedPrice(item.product_id.price) }}
                                                                    </del>
                                                                    {{ formattedPrice(item.product_id.moneyDeals) }}
                                                                </td>
                                                                <td class="disCount">
                                                                    {{ item.product_id.disCount + '%' }}
                                                                </td>
                                                                <td>
                                                                    {{ formattedPrice(item.quantity *
                                                                        item.product_id.moneyDeals) }}
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td colspan="8">
                                                                    Trạng thái đơn hàng:
                                                                    <span class="status_order">
                                                                        {{ this.oneOrder.cart_items.status }}
                                                                    </span>

                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Auth from '../../service/Auth'
import OrderService from '../../service/Order'
import formatPrice from '../../utils/Format.utils'
import History from '../../service/History'
export default {
    data() {
        return {
            itemOrder: [],
            oneOrder: {
                cart_items: {
                    product: []
                }
            },
            idUser: '',
            id: '',
            host: import.meta.env.VITE_PORT,
        }
    },
    async created() {

        try {
            this.idUser = JSON.parse(localStorage.getItem('idUser'))
            let resUser = await Auth.getOneUser(this.idUser)
            let lengthOrder = await resUser.data.order_id
            for (let index = 0; index < lengthOrder.length; index++) {
                const item = await OrderService.getOrder(lengthOrder[index])
                this.itemOrder.push(item.data)
            }
        }
        catch (err) {
            console.log(err);
        }


    },
    methods: {
        format(price) {
            return formatPrice.priceFormat(price);
        },

        formattedPrice(price) {
            return this.format(price);
        },

        async createHistory(item) {
            try {
                await History.createHistory(item)
                window.location.reload()
            }
            catch (err) {
                console.log(err);
            }
        },

        async getOrder(id) {
            try {
                let res = await OrderService.getOrder(id)
                this.oneOrder = res.data
                console.log(this.oneOrder);
            }
            catch (err) {
                console.log(err);
            }
        }


    }

}
</script>
<style scoped>
.disCount {
    color: red;
}

.container {
    padding: 2rem 0rem;
}

h4 {
    margin: 2rem 0rem 1rem;
}

.table-image {
    cursor: pointer;

    td,
    th {
        vertical-align: middle;
    }
}

.statusOrder {
    text-align: justify;
    color: green;
    font-style: italic;
}

.image_item {
    width: 80%;
}

.status_order {
    color: blue;
}
</style>