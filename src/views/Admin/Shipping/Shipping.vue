<template>
    <div>
        <div class="Header container">
            <Header></Header>
        </div>
        <div class="main_order">
            <div class="text-center">
                <h2>
                    DANH SÁCH HÀNG ĐANG VẬN CHUYỂN
                </h2>
            </div>

            <div class="container">
                <form @submit.prevent="shipping()">
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
                                            {{ timeCreate(item.updatedAt) }}
                                        </td>
                                        <td class="ship_product" :rowspan="item.cart_items.product.length">
                                            {{ '0' + item.cart_items.phoneNumber }}
                                        </td>
                                        <td :rowspan="item.cart_items.product.length" class="text-center ship_product">
                                            <div class="shipping_title">
                                                Đang vận chuyển
                                            </div>
                                        </td>
                                    </tr>
                                    
                                    <tr v-if="i > 0">
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
                                    </tr>
                                </template>
                            </template>
                        </tbody>
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
                if (res.data[index].cart_items.status === 'Đã bàn giao cho đơn vị vận chuyển') {
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

.shipping_title {
    color: green;
    font-weight: 600;
}
</style>