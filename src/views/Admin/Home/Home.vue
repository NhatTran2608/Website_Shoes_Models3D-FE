<template>
    <div class="Header container">
        <Header></Header>
    </div>
    <div class="title_Warehouse">
        <nav class="navbar navbar-dark sticky-top flex-md-nowrap p-0">
            <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
            <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a @click="logOut()" class="nav-link" href="#">Sign out</a>
                </li>
            </ul>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <main role="main" class="col-md-9 main col-lg-10 my-3">
                    <div class="card-list">
                        <div class="row">
                            <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                                <div class="card blue">
                                    <div class="title">all projects</div>
                                    <i class="zmdi zmdi-upload"></i>
                                    <div class="value">89</div>
                                    <div class="stat"><b>13</b>% increase</div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                                <div class="card green">
                                    <div class="title">team members</div>
                                    <i class="zmdi zmdi-upload"></i>
                                    <div class="value">5,990</div>
                                    <div class="stat"><b>4</b>% increase</div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                                <div class="card orange">
                                    <div class="title">total budget</div>
                                    <i class="zmdi zmdi-download"></i>
                                    <div class="value">$80,990</div>
                                    <div class="stat"><b>13</b>% decrease</div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                                <div class="card red">
                                    <div class="title">new customers</div>
                                    <i class="zmdi zmdi-download"></i>
                                    <div class="value">3</div>
                                    <div class="stat"><b>13</b>% decrease</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="projects mb-4">
                        <div class="projects-inner">
                            <header class="projects-header">
                                <div class="title">Danh sánh kho</div>
                                <div class="count">| {{ this.Product.length }} sản phẩm</div>
                                <router-link to="/admin/addproduct">
                                    <div title="Thêm sản phẩm" class="add_product">
                                        <i class="fa-solid fa-plus"></i>
                                    </div>
                                </router-link>
                                <div class="mt-2">
                                    Số lượng hiển thị:
                                    <select name="" id="" v-model="this.itemsPerPage">
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option :value="this.Product.length">Tất cả</option>
                                    </select>
                                </div>

                            </header>
                            <table class="projects-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Thương hiệu</th>
                                        <th>Hình ảnh</th>
                                        <th>Màu sắc</th>
                                        <th>Giá</th>
                                        <th>Kích cỡ</th>
                                        <th>Chỉnh sửa</th>
                                        <th>Xóa</th>
                                    </tr>
                                </thead>
                                <tr v-for="(item, index) in  paginatedProduct " :key="index">
                                    <td>
                                        {{ index + 1 }}
                                    </td>
                                    <td>
                                        {{ item.name }}

                                    </td>
                                    <td>
                                        {{ item.brandID.name }}
                                    </td>
                                    <td class="member" v-if="item.item.image[0] != undefined">
                                        <figure class="img_item">
                                            <img :src="hostImage(item.item.image[0])" alt="">
                                        </figure>
                                    </td>
                                    <td :style="{ color: item.color }"><i class="fa-solid fa-circle"></i></td>
                                    <td>
                                        <p>{{ formattedPrice(item.price) }}</p>
                                        <p>Giảm: {{ item.disCount + '%' }}</p>
                                        <p class="text-danger"><b>{{ formattedPrice(item.moneyDeals) }}</b></p>
                                    </td>
                                    <td>
                                        <form class="form">
                                            <select class="action-box">
                                                <option v-for="(item, index) in item.item.sizes" :key="index">
                                                    Size: {{ item.size }}
                                                    SL: {{ item.quantity }}

                                                </option>

                                            </select>
                                        </form>
                                    </td>
                                    <td class="status">
                                        <router-link :to="`/admin/editProduct/${item._id}`"><i
                                                class="fa-solid fa-pen-to-square"></i></router-link>

                                    </td>
                                    <td class="status">
                                        <i @click="copyId(item._id)" type="button" data-toggle="modal"
                                            data-target="#exampleModal" class="fa-solid fa-trash-can"></i>
                                    </td>
                                </tr>

                            </table>
                            <div class="pagination">
                                <button @click="prevPage" :disabled="currentPage === 1">Trang sau</button>
                                <ul class="pagination_ul">
                                    <li class="pagination_li" v-for="page in totalPages" :key="page"
                                        :class="{ active: page === currentPage }">
                                        <a @click="changePage(page)">{{ page }}</a>
                                    </li>
                                </ul>
                                <button @click="nextPage" :disabled="currentPage === totalPages">Trang tiếp</button>
                            </div>

                            <!-- Modal -->
                            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
                                aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" role="document">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Xóa sản phẩm</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            Bạn chắc chắn xóa sản phẩm này?
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-secondary"
                                                data-dismiss="modal">Close</button>
                                            <button type="button" @click="deleteProduct()"
                                                class="btn btn-danger">Xóa</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>
<script>
import Header from '../../../components/HeaderAdmin/Header.vue';
import ProductService from '../../../service/Product'
import formatPrice from '../../../utils/Format.utils'
import notification from '../../../utils/notification.utils'
export default {
    components: {
        Header
    },
    data() {
        return {
            host: import.meta.env.VITE_PORT,
            Product: [
                {
                    name: '',
                    price: null,
                    brandID: '',
                    item: {
                        image: [],
                    }
                }

            ],
            id: '',
            currentPage: 1,
            itemsPerPage: 5
        }
    },
    async created() {
        let res = await ProductService.getAllProduct()
        this.Product = res.data
    },

    methods: {
        format(price) {
            return formatPrice.priceFormat(price);
        },
        formattedPrice(price) {
            return this.format(price);
        },
        hostImage(link) {
            return this.host + '/' + link
        },
        copyId(id) {
            this.id = id
        },
        async deleteProduct() {
            await ProductService.deleteProduct(this.id)
            window.location.reload()
            await notification.success('Xóa sản phẩm thành công', this)
        },
        changePage(page) {
            this.currentPage = page;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage += 1;
            }
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage -= 1;
            }
        },
        logOut() {
            localStorage.clear()
            this.$router.replace({ path: '/home' });
        }
    },
    computed: {
        paginatedProduct() {
            const startIndex = (this.currentPage - 1) * this.itemsPerPage;
            const endIndex = startIndex + this.itemsPerPage;
            return this.Product.slice(startIndex, endIndex);
        },
        totalPages() {
            return Math.ceil(this.Product.length / this.itemsPerPage);
        }
    },
}
</script>
<style scoped>
@import url('./Home.scss');
</style>