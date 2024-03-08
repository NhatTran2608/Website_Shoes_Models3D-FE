<template>
    <div class="container">
        <Header v-if="this.reRender"></Header>
        <div class="header_cart mt-4">
            <div class="nav_cart">
                <nav>
                    <div class="nav nav-tabs" id="nav-tab" role="tablist">
                        <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab"
                            aria-controls="nav-home" aria-selected="true">Giỏ hàng</a>
                        <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab"
                            aria-controls="nav-profile" aria-selected="false">Theo dõi đơn hàng</a>
                        <a class="nav-item nav-link" id="nav-profile-tab_1" data-toggle="tab" href="#nav-profile_1"
                            role="tab" aria-controls="nav-profile" aria-selected="false">Đánh giá</a>
                    </div>
                </nav>

            </div>

            <div class="tab-content mt-4 container" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div class="mt-5" v-if="this.Cart.items.length <= 0">
                        <h3> Giỏ hàng rỗng</h3>
                    </div>
                    <form v-else class="woocommerce-cart-form" @submit.prevent="Pay()"
                        @click="e => { updateQuantity(), SUM() }">
                        <table class="shop_table shop_table_responsive cart woocommerce-cart-form__contents">
                            <thead>
                                <tr>
                                    <th class="product-thumbnail" colspan="2">Sản phẩm</th>
                                    <th class="product-size">Kích cỡ</th>
                                    <th class="product-price">Giá</th>
                                    <th class="product-quantity">Số lượng</th>
                                    <th class="product-subtotal">Tổng</th>
                                    <th class="product-remove">&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in this.Cart.items" :key="index"
                                    class="woocommerce-cart-form__cart-item cart_item">
                                    <td class="product-thumbnail" v-if="item.image != undefined">
                                        <img class="mr-3" style="width: 140px;" :src="`${host}/${item.image}`">
                                    </td>

                                    <td class="product-name text-left">
                                        {{ item.product_id.name }}
                                    </td>

                                    <td class="product-size text-left">
                                        {{ item.size }}
                                    </td>

                                    <td class="product-price text-left">
                                        <span class="moneyDeals_price mr-2">
                                            {{ formattedPrice(item.product_id.moneyDeals) }}</span>
                                        <del><span>{{ formattedPrice(item.product_id.price) }}</span></del>
                                    </td>

                                    <td class="product-quantity">
                                        <input class="text-center" type="number" @input="updateQuantity"
                                            v-model="item.quantity" :max="item.product_id.item.sizes[0].quantity" :min="1">
                                    </td>

                                    <td class="product-subtotal text-left">
                                        {{ formattedPrice(sumPrice(item.product_id.moneyDeals, item.quantity)) }}
                                    </td>

                                    <td class="product-remove">
                                        <i @click="copy_index(item._id)" class="fa-solid fa-xmark"></i>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div>
                            <div class="cart_totals">
                                <h2 class="title-sumCart">Cộng giỏ hàng</h2>
                                <table class="table_sum shop_table_responsive">
                                    <tbody>
                                        <tr class="cart-subtotal ">
                                            <th class="text-left">Tạm tính</th>
                                            <td class="sumPrice text-right"><span class="woocommerce-Price-amount amount">{{
                                                formattedPrice(this.Sum)
                                            }}</span></td>
                                            <div style="display: none;">
                                                {{ this.Cart.total = this.Sum }}
                                            </div>
                                        </tr>
                                        <tr class="woocommerce-shipping-totals shipping">
                                            <th class="text-left">Phí Ship</th>
                                            <td class="sumPrice text-right">
                                                <input type="hidden" id="shipping_method_0_devvn_district_zone_shipping_2"
                                                    class="shipping_method"><label
                                                    for="shipping_method_0_devvn_district_zone_shipping_2">
                                                    <span class="woocommerce-Price-amount amount">30.000<span
                                                            class="woocommerce-Price-currencySymbol">
                                                            ₫
                                                        </span>
                                                    </span>
                                                </label>
                                                <p class="woocommerce-shipping-destination">
                                                </p>
                                            </td>
                                        </tr>
                                        <tr class="order-total">
                                            <th class="text-left">Tổng</th>
                                            <td class="sumPrice text-right"><strong><span
                                                        class="woocommerce-Price-amount amount">{{
                                                            formattedPrice(this.ShipSum)
                                                        }}</span></strong>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        </div>
                        <hr>
                        <div class="text-left">
                            <div>
                                <h3>Địa chỉ giao hàng</h3>
                            </div>
                            <div>
                                <label class="mr-2 mt-2" for="numberPhone">Số điện thoại: </label>
                                <input type="tel" required placeholder="Nhập số điện thoại" id="numberPhone"
                                    v-model="this.Cart.phoneNumber">
                            </div>
                            <label class="mr-2 mt-2">Đường/Số nhà:</label>
                            <input type="text" required placeholder="Nhập tên đường, số nhà,..." v-model="this.address">
                            <br>
                            <label class="mr-2 mt-2">Tỉnh/Thành phố:</label>
                            <select required class="addess" v-model="selectedCity" @change="loadDistricts">
                                <option value="" disabled selected>Chọn tỉnh/thành phố</option>
                                <option v-for="city in cities" :value="city">{{ city.Name }}</option>
                            </select>
                            <br>

                            <label class="mr-2 mt-2">Quận/Huyện:</label>
                            <select required class="addess" v-model="selectedDistrict" @change="loadWards">
                                <option value="" disabled selected>Chọn quận/huyện</option>
                                <option v-for="district in districts" :value="district">{{ district.Name }}</option>
                            </select>
                            <br>

                            <label class="mr-2 mt-2">Phường/Xã:</label>
                            <select required class="addess" v-model="selectedWard">
                                <option value="" disabled selected>Chọn phường/xã</option>
                                <option v-for="ward in wards" :value="ward">{{ ward.Name }}</option>
                            </select>
                            <div>
                                <p
                                    v-if="this.address != undefined && selectedCity.Name != undefined && selectedDistrict.Name != undefined && selectedWard.Name != undefined">
                                    Địa chỉ: Đường, số nhà {{ this.address + ',' }} {{ selectedWard.Name + ',' }} {{
                                        selectedDistrict.Name + ',' }} {{ selectedCity.Name }}
                                </p>

                                <div style="display: none;">
                                    {{ this.Cart.address = (this.address + ',' + selectedWard.Name + ',' +
                                        selectedDistrict.Name + ',' + selectedCity.Name) }}
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div class="cart_coupon actions clearfix">
                            <button type="submit" class="button btn btn-info update_cart">
                                TIẾN HÀNH THANH TOÁN
                            </button>
                        </div>
                    </form>

                </div>
                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div>
                        <OrderTracking />
                    </div>
                </div>
                <div class="tab-pane fade" id="nav-profile_1" role="tabpanel" aria-labelledby="nav-profile-tab_1">
                    <div>
                        <ProductReviews></ProductReviews>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import Header from '../../components/Header/Header.vue'
import CartService from '../../service/Cart'
import formatPrice from '../../utils/Format.utils'
import notification from '../../utils/notification.utils'
import OrderTracking from '../../components/OrderTracking/OrderTracking.vue'
import ProductReviews from '../../components/ProductReviews/ProductReviews.vue'
import { nextTick } from 'vue'
export default {
    components: {
        Header,
        OrderTracking,
        ProductReviews
    },
    data() {
        return {
            reRender: true,
            Cart: {
                address: '',
                items: [

                ]
            },

            id: this.$route.params.id,
            host: import.meta.env.VITE_PORT,
            Sum: null,
            ShipSum: null,
            order_id: null,


            //address
            address_ship: undefined,
            address: '',
            cities: [],
            districts: [],
            wards: [],
            selectedCity: '',
            selectedDistrict: '',
            selectedWard: '',
            apiUrl: 'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json',
            // apiUrl: import('../../../public/Address.json')
        }
    },

    async created() {
        try {
            let res = await CartService.getCart(this.id)
            this.Cart = await res.data
        }
        catch (err) {
            console.log(err);
        }
        this.SUM()

    },
    methods: {
        async SUM() {
            try {
                const lengthCart = this.Cart
                let price = 0;
                for (let index = 0; index < lengthCart.items.length; index++) {
                    price = price + (lengthCart.items[index].quantity * lengthCart.items[index].product_id.moneyDeals)
                }
                this.Sum = price
                this.ShipSum = price + 30000
            }
            catch (err) {
                console.log(err);
            }
        },

        async Pay() {
            this.order_id = JSON.parse(localStorage.getItem('order'))
            await CartService.Pay(this.Cart, this.order_id, this.id)
            notification.success('Đặt hàng thành công', this)
            window.location.reload()
        },

        async updateQuantity() {
            try {
                await CartService.updateCart(this.Cart, this.id)
            }
            catch (err) {
                console.log(err);
            }
        },

        async copy_index(ob) {
            console.log(ob);
            const index = this.Cart.items.findIndex(item => item._id === ob);
            if (index !== -1) {
                this.Cart.items.splice(index, 1);
                await CartService.updateCart(this.Cart, this.id);
                this.reRender = false
                await nextTick()
                this.reRender = true
            }
        },

        sumPrice(price, quantity) {
            return price * quantity
        },
        format(price) {
            return formatPrice.priceFormat(price);
        },

        formattedPrice(price) {
            return this.format(price);
        },

        loadCities() {
            axios.get(this.apiUrl)
                .then(response => {
                    this.cities = response.data;
                })
                .catch(error => {
                    console.error('Error loading cities:', error);
                });
        },
        loadDistricts() {
            // Lấy mã thành phố được chọn
            const selectedCityId = this.selectedCity.Id;

            // Lọc danh sách quận/huyện tương ứng với thành phố được chọn
            const selectedCity = this.cities.find(city => city.Id === selectedCityId);
            this.districts = selectedCity.Id ? selectedCity.Districts : [];

            // Đặt lại giá trị quận/huyện và phường/xã được chọn
            this.selectedDistrict = '';
            this.selectedWard = '';
        },
        loadWards() {
            // Lấy mã quận/huyện được chọn
            const selectedDistrictId = this.selectedDistrict.Id;

            // Lọc danh sách phường/xã tương ứng với quận/huyện được chọn
            const selectedDistrict = this.districts.find(district => district.Id === selectedDistrictId);
            this.wards = selectedDistrict.Id ? selectedDistrict.Wards : [];

            // Đặt lại giá trị phường/xã được chọn
            this.selectedWard = '';
        },
    },
    mounted() {
        this.loadCities();
    },

}
</script>
<style scoped>
@import url('../Cart/Cart.css');
</style>