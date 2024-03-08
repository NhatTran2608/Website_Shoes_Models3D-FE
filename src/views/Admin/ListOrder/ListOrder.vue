<template>
    <div>
        <div class="Header container">
            <Header></Header>
        </div>
        <div class="main_order">
            <div class="text-center">
                <h2>
                    DANH SÁCH ĐẶT HÀNG
                </h2>
            </div>

            <div class="container ">
                <div class="text-center mt-4" v-if="this.Order.length < 1">
                    <h3>
                        Chưa có đơn hàng nào !!!!
                    </h3>

                </div>
                <form v-else @submit.prevent="shipping()">
                    <table id="example" class="table table-bordered " style="width:95%">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th class="w-25">Khách hàng</th>
                                <th class="w-25">Sản phẩm</th>
                                <th>Kích cỡ</th>
                                <th>Giá</th>
                                <th>SL</th>
                                <th>Số tiền</th>
                                <th>Tổng</th>
                                <th>Địa chỉ giao hàng</th>
                                <th>Thời gian đặt</th>
                                <th>Số điện thoại</th>
                                <th>Bàn giao vận chuyển</th>
                            </tr>
                        </thead>

                        <tbody>
                            <template v-for="(item, index) in this.Order" :key="index">
                                <template v-for="(product, i) in item.cart_items.product" :key="i">
                                    <tr v-if="i === 0">
                                        <td class="ship_product" :rowspan="item.cart_items.product.length">
                                            {{ index + 1 }}
                                        </td>
                                        <td class="ship_product" :rowspan="item.cart_items.product.length">
                                            {{ item.user_id.fullName }}</td>
                                        <td class="ship_product">{{ product.product_id.name }}</td>
                                        <td class="ship_product">{{ product.size }}</td>
                                        <td class="ship_product">
                                            {{ formattedPrice(product.product_id.moneyDeals) }}
                                        </td>
                                        <td class="ship_product">{{ product.quantity }}</td>
                                        <td class="ship_product">
                                            <b>
                                                {{ formattedPrice(product.product_id.moneyDeals * product.quantity) }}
                                            </b>
                                        </td>
                                        <td class="ship_product" :rowspan="item.cart_items.product.length">
                                            <b>
                                                {{ formattedPrice(item.cart_items.total) }}
                                            </b>
                                        </td>
                                        <td class="ship_product" :rowspan="item.cart_items.product.length">
                                            <i>{{ item.cart_items.address }}</i>
                                        </td>
                                        <td class="ship_product" :rowspan="item.cart_items.product.length">
                                            {{ timeCreate(item.createdAt) }}
                                        </td>
                                        <td class="ship_product" :rowspan="item.cart_items.product.length">
                                            {{ '0' + item.cart_items.phoneNumber }}
                                        </td>
                                        <td :rowspan="item.cart_items.product.length" class="text-center ship_product">
                                            <button type="button" @click="copyID(item._id)" title="Bàn giao vận chuyển"
                                                class="btn" data-toggle="modal" data-target="#exampleModal">
                                                <img width="50" src="../../../../public/fast-delivery.png" alt="shipping">
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-if="i > 0">
                                        <td>{{ product.product_id.name }}</td>
                                        <td>{{ product.size }}</td>
                                        <td>
                                            {{ formattedPrice(product.product_id.moneyDeals) }}
                                        </td>
                                        <td>{{ product.quantity }}</td>
                                        <td>
                                            <b>
                                                {{ formattedPrice(product.product_id.moneyDeals * product.quantity) }}
                                            </b>
                                        </td>
                                    </tr>
                                </template>
                            </template>
                        </tbody>
                        <!-- <tfoot>
                            <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Office</th>
                                <th>Age</th>
                                <th>Start date</th>
                                <th>Salary</th>
                            </tr>
                        </tfoot> -->
                        <!-- Modal -->
                        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                            aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">
                                            BÀN GIAO VẬN CHUYỂN
                                        </h5>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div class="modal-body">
                                        Bàn giao đơn hàng này cho đơn vị vận chuyển?
                                    </div>
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
                                        <button class="btn btn-primary">Đồng ý</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </table>
                </form>
            </div>
        </div>

    </div>
</template>
<script>
import Header from '../../../components/HeaderAdmin/Header.vue'
import formatPrice from '../../../utils/Format.utils'
import OrderService from '../../../service/Order'
import notification from '../../../utils/notification.utils'
export default {
    components: {
        Header
    },
    data() {
        return {
            Order: [],
            id: ''
        }
    },
    async created() {
        try {
            let res = await OrderService.getAllOrder()
            for (let index = 0; index < res.data.length; index++) {
                if (res.data[index].cart_items.status === 'Đặt hàng thành công') {
                    this.Order.push(res.data[index])
                }
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
        timeCreate(time) {
            var dateTimeString = time;
            var dateTimeObject = new Date(dateTimeString);
            var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
            var vietnameseDate = dateTimeObject.toLocaleDateString('vi-VN', options);
            return vietnameseDate
        },
        copyID(id) {
            this.id = id
            console.log(this.id);
        },

        async shipping() {
            try {
                const status = 'Đã bàn giao cho đơn vị vận chuyển'
                await OrderService.updateOrder(this.id, status)
                window.location.reload()
                setTimeout(3000)
                notification.success('Đã bàn giao cho đơn vị vận chuyển', this)

            }
            catch (err) {
                console.log(err);
            }
        }
    }
}
</script>
<style scoped>
.main_order {
    margin-left: 270px;
}

td {
    word-break: break;

}

.ship_product {
    margin: auto;
    vertical-align: middle;
}
</style>