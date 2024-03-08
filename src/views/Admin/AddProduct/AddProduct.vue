<template>
    <div>
        <Header></Header>
    </div>
    <div class="title_Warehouse">
        <div>
            <h2>
                KHO HÀNG
            </h2>
            <hr>
        </div>
        <div>
            <div class="container">

                <section class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">Thêm sản phẩm</h3>
                    </div>
                    <div class="panel-body">

                        <form class="form-horizontal" role="form" @submit.prevent="addProducts">
                            <div class="form-group">
                                <label for="name" class="col-sm-3 control-label">Tên sản phẩm</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control" name="name" id="name" required
                                        placeholder="Nhập tên sản phẩm" v-model="this.Product.name">
                                </div>
                            </div> <!-- form-group // -->
                            <div class="form-group">
                                <label for="price" class="col-sm-3 control-label">Giá tiền</label>
                                <div class="col-sm-9">
                                    <input type="number" class="form-control" name="name" id="price" required
                                        placeholder="Nhập giá tiền" step="1000" v-model="this.Product.price"
                                        @input="format(Product.price)">
                                    <div class="mt-1">
                                        <span> <b><i>Giá bán: {{ formattedPrice }}</i></b> </span>
                                    </div>
                                </div>
                            </div> <!-- form-group // -->
                            <div class="form-group">
                                <label for="tech" class="col-sm-3 control-label">Thương hiệu</label>
                                <div class="col-sm-3">
                                    <select class="form-control" @change="handleBrandChange">
                                        <option selected value="">---Chọn thương hiệu---</option>
                                        <option v-for="(item, index) in Brand" :key="index" :value="item._id">
                                            {{ item.name }}
                                        </option>
                                    </select>

                                </div>
                            </div> <!-- form-group // -->



                            <div class="form-group">
                                <label for="about" class="col-sm-3 control-label">Mô tả</label>
                                <div class="col-sm-9">
                                    <!-- Sử dụng div để chứa Quill editor -->
                                    <ckeditor :editor="editor" v-model="Product.description" id="about">
                                    </ckeditor>
                                </div>
                            </div> <!-- form-group // -->


                            <div class="product_item">
                                <div class="form-group">
                                    <label for="color" class="col-sm-3 control-label">Màu sắc</label>
                                    <div class="col-sm-3">
                                        <input type="color" class="form-control" name="color" id="color" placeholder="0"
                                            v-model="this.Product.color">
                                    </div>
                                </div>
                                <!-- Thêm  -->

                                <div v-for="(sizes, index) in this.Product.item.sizes" :key="index">
                                    <div class="form-group" style="display: inline-block;">
                                        <label for="size" class="col-sm-3 control-label" style="max-width: 75%;">Kích
                                            cỡ</label>
                                        <div class="col-sm-3" style="max-width: 75%;">
                                            <input type="number" @change="(e) => this.setSize(e, index)" min="0"
                                                class="form-control" name="size" id="size" placeholder="0">
                                        </div>
                                    </div>
                                    <div class="form-group" style="display: inline-block;">
                                        <label for="qty" class="col-sm-3 control-label" style="max-width: 75%;">Số
                                            lượng</label>
                                        <div class="col-sm-3" style="max-width: 75%;">
                                            <input type="number" min="0" @change="(e) => this.setQuantity(e, index)"
                                                class="form-control" name="qty" id="qty" placeholder="0">
                                        </div>
                                    </div>
                                    <button class="btn btn-danger" type="button" @click="pop(index)"><i
                                            class="fas fa-minus"></i></button>
                                </div>

                                <div class="form-group col-sm-3">
                                    <button class="btn btn-info" type="button" @click="Push()">Thêm kích cỡ</button>
                                </div>

                                <div class="form-group">
                                    <label for="dateDiscount" class="col-sm-3 control-label">Khuyến mãi</label>
                                    <div class="col-sm-3">
                                        <input type="number" min="0" max="100" class="form-control disConut"
                                            name="dateDiscount" id="dateDiscount" placeholder=""
                                            v-model="this.Product.disCount">
                                        <div class="mt-1">
                                            <span><i>Đơn vị: %</i> </span>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="after_promotion" class="col-sm-3 control-label">
                                        Số tiền sau khi khuyến mãi
                                    </label>
                                    <div class="col-sm-3">
                                        <div class="mt-1">
                                            <div class="mt-1">
                                                <span><i><b>Giá bán: {{ formattedDiscount }}</b></i></span>
                                                <div class="disCount_money">
                                                    {{ Product.moneyDeals = moneyDeals(Product.price, Product.disCount) }}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!-- form-group // -->
                                <div class="form-group">
                                    <label for="image" class="col-sm-3 control-label">Thêm hình ảnh</label>
                                    <div class="col-sm-3">
                                        <label class="control-label small" for="file_img">Dạng ảnh (jpg/png):</label>
                                        <input type="file" multiple class="form-control" id="image" ref="imageInput"
                                            required="true">
                                    </div>
                                </div> <!-- form-group // -->
                            </div>

                            <hr>
                            <div class="form-group">
                                <div class="col-sm-offset-3 col-sm-9">
                                    <button type="submit" class="btn btn-primary">Thêm sản phẩm</button>
                                </div>
                            </div> <!-- form-group // -->
                        </form>
                    </div><!-- panel-body // -->
                </section><!-- panel// -->
            </div> <!-- container// -->
        </div>
    </div>
</template>
<script>
import Header from '../../../components/HeaderAdmin/Header.vue';
import ProductService from '../../../service/Product';
import notification from '../../../utils/notification.utils';
import formatPrice from '../../../utils/Format.utils'
import Brand from '../../../service/Brand';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';
import upLoadFiles from '../../../service/UploadImage'
export default {
    components: {
        Header,
        ckeditor: CKEditor.component,
    },
    data() {
        return {
            editor: ClassicEditor,
            Brand: [],
            a: null,
            Product: {
                name: '',
                description: '',
                price: null,
                color: '#000000',
                disCount: null,
                moneyDeals: null,
                item: {
                    image: [

                    ],
                    sizes: [
                        {
                            size: '',
                            quantity: 0
                        },
                    ]
                }
            },
        }
    },
    async created() {
        try {
            let brand = await Brand.getAll()
            this.Brand = brand.data
        }
        catch (err) {
            console.log(err);
        }
    },

    methods: {
        moneyDeals(money, discount) {
            if (discount == null) {
                return money
            }
            const dC = money * discount * 0.01
            return (money - dC).toFixed(0)
        },
        format(price) {
            return formatPrice.priceFormat(price);
        },
        updateFormattedPrice() {
            this.formattedPrice = this.format(this.Product.price);
        },

        updateFormattedDiscount() {
            this.formattedPrice = this.format(this.Product.moneyDeals);
        },

        async upLoadFiles() {
            const fileInput = document.getElementById('image');
            const files = fileInput.files;

            if (files) {
                try {
                    const formData = new FormData();

                    for (let file of files) {
                        formData.append("files", file);
                    }

                    const response = await upLoadFiles.addImage(formData)

                    if (response.data && response.data.files) {
                        return response.data.files.map(file => file.filename);
                    }
                } catch (error) {
                    console.error('Error uploading images locally:', error);
                    throw error;
                }
            }
        },

        async addProducts() {
            try {

                const imageUrl = await this.upLoadFiles();
                if (!Array.isArray(this.Product.image)) {
                    this.Product.item.image = [];
                }
                this.Product.item.image = imageUrl;
                await ProductService.addProduct(this.Product);
                this.Product = {
                    name: '',
                    description: '',
                    price: null,
                    color: '#000000',
                    disCount: null,
                    brandID: '',
                    moneyDeals: null,
                    item: {
                        image: [],
                        sizes: [
                            {
                                size: '',
                                quantity: 0
                            },
                        ]
                    }
                };

                notification.success('Thêm sản phẩm thành công', this);
            } catch (err) {
                console.error(err);
            }
        },

        setSize(e, index) {
            this.Product.item.sizes[index].size = e.target.value
        },
        setQuantity(e, index) {
            this.Product.item.sizes[index].quantity = e.target.value
        },
        handleBrandChange(event) {
            this.Product.brandID = event.target.value;
        },

        Push() {
            this.Product.item.sizes = [
                ...this.Product.item.sizes,
                {
                    size: '',
                    quantity: 0
                }
            ]
        },
        pop(index) {
            if (this.Product.item.sizes.length === 1) return
            let value = [...this.Product.item.sizes]
            value.splice(index, 1)
            this.Product.item.sizes = value
        }
    },
    computed: {
        formattedPrice() {
            return this.format(this.Product.price);
        },
        formattedDiscount() {
            return this.format(this.Product.moneyDeals);
        },

    },
}
</script>
<style scoped>
@import url('../../Admin/AddProduct/AddProduct.css');
</style>