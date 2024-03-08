<template>
    <div>
        <div>
            <Menu></Menu>
        </div>
        <div class="container main_list">
            <div class="text-center">
                <h1>
                    DANH SÁCH KHÁCH HÀNG
                </h1>
            </div>
            <div class="search-container text-center">
                <label class="mr-2" for="search">Tìm kiếm: </label>
                <input type="text" class="search_user" id="search" v-model="searchTerm" @input="searchUsers"
                    placeholder="Tìm kiếm theo tên hoặc email...">
            </div>
            <hr>
            <br>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">TT</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Thời gian đăng ký</th>
                        <th scope="col">Giao dịch</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in filteredUsers" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td>{{ item.fullName }}</td>
                        <td>{{ item.email }}</td>
                        <td>{{ timeCreate(item.createdAt) }}</td>
                        <td class="text-center">
                            <i @click="transactionStatistics(item._id)" data-toggle="modal" data-target="#exampleModal"
                                class="fa-solid fa-list"></i>
                        </td>
                    </tr>
                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                        aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">Thống kê giao dịch</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div>
                                        <span>Khách hàng: <b>{{ this.user.fullName }}</b> </span>
                                        <br>
                                        <hr>
                                        <span>Mua tổng cộng: <b>{{ sumQuantity }}</b> sản phẩm</span>
                                        <hr>
                                        <span>Tổng số tiền: <b>{{ formattedPrice(sumTotal) }}</b> </span><br>
                                        <span>Bằng chữ: <b><i class="sumTotal">{{ convertMoneyToWords(sumTotal) }}</i></b>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </tbody>
            </table>
            <hr>
            <div>
                Tổng số: <b>{{ filteredUsers.length }}</b> khách hàng
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from '../../../service/Auth'
import Menu from '../../../components/HeaderAdmin/Header.vue'
import formatPrice from '../../../utils/Format.utils'
export default {
    components: {
        Menu
    },
    data() {
        return {
            listUser: [],
            searchTerm: '',
            user: {},
            sumQuantity: 0,
            sumTotal: 0,
            units: ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'],
            numbers: ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'],
            tens: ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'],
            hundreds: ['', 'một trăm', 'hai trăm', 'ba trăm', 'bốn trăm', 'năm trăm', 'sáu trăm', 'bảy trăm', 'tám trăm', 'chín trăm'],
            decimals: ['mươi', 'mươi mốt', 'mươi hai', 'mươi ba', 'mươi bốn', 'mươi năm', 'mươi sáu', 'mươi bảy', 'mươi tám', 'mươi chín']
        }
    },
    async created() {
        try {
            let res = await AuthService.getAllUser()
            for (let index = 0; index < res.data.length; index++) {
                if (res.data[index].role == 'user') {
                    this.listUser.push(res.data[index])
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    },
    computed: {
        filteredUsers() {
            return this.listUser.filter(user => {
                return user.fullName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
            });
        }
    },
    methods: {
        timeCreate(time) {
            var dateTimeString = time;
            var dateTimeObject = new Date(dateTimeString);
            var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
            var vietnameseDate = dateTimeObject.toLocaleDateString('vi-VN', options);
            return vietnameseDate
        },
        format(price) {
            return formatPrice.priceFormat(price);
        },

        formattedPrice(price) {
            return this.format(price);
        },
        async searchUsers() {
        },
        async transactionStatistics(id) {
            try {
                this.sumQuantity = 0
                this.sumTotal = 0
                let res = await AuthService.getOneUserOfAdmin(id);
                this.user = res.data;
                for (let index = 0; index < this.user.history.length; index++) {
                    console.log(this.user.history[index]);
                    let totalQuantity = 0;
                    const transaction = this.user.history[index];
                    for (let i = 0; i < transaction.cart_items.product.length; i++) {
                        totalQuantity += transaction.cart_items.product[i].quantity;
                    }
                    this.sumQuantity = this.sumQuantity + totalQuantity
                    this.sumTotal = this.sumTotal + this.user.history[index].cart_items.total
                }
            } catch (err) {
                console.log(err);
            }
        },
        convertMoneyToWords(money) {
            const n = money.toString();
            let moneyString = '';
            let integerPart = parseInt(n, 10);
            let i = 0;
            while (integerPart > 0) {
                let group = integerPart % 1000;
                if (group > 0) {
                    moneyString = (this.convertGroup(group) + ' ' + this.units[i] + ' ' + moneyString).trim();
                }
                integerPart = Math.floor(integerPart / 1000);
                i++;
            }

            return moneyString;
        },
        convertGroup(group) {
            let result = '';
            const hundreds = Math.floor(group / 100);
            const tensUnits = group % 100;

            if (hundreds > 0) {
                result += this.hundreds[hundreds] + ' ';
            }

            if (tensUnits > 0) {
                if (tensUnits < 10) {
                    result += this.numbers[tensUnits] + ' ';
                } else if (tensUnits < 20) {
                    result += this.decimals[tensUnits - 10] + ' ';
                } else {
                    const tens = Math.floor(tensUnits / 10);
                    const units = tensUnits % 10;
                    result += this.tens[tens] + ' ';
                    if (units > 0) {
                        result += this.numbers[units] + ' ';
                    }
                }
            }

            return result.trim();
        }


    }

}
</script>

<style scoped>
.sumTotal {
    text-transform: capitalize;
}

.main_list {
    margin-left: 270px;
    width: 78%;
}

.search-container {
    margin-bottom: 20px;
}

.search_user {
    padding: 5px;
    width: 400px;
}

.fa-list {
    color: blue;
    padding: 10px;
    border-radius: 2px;
    background-color: aliceblue;
    cursor: pointer;

}
</style>
