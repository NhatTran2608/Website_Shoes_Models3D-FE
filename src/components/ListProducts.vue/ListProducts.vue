<template>
    <div>

        <div class="m-2">
            <label class="mr-2" for="search">Tìm kiếm: </label>
            <input class="search" id="search" type="text" v-model="searchKeyword" placeholder="Tìm kiếm sản phẩm...">
        </div>
        <div>
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">TT</th>
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Thương hiệu</th>
                        <th scope="col">Chọn</th>
                    </tr>
                </thead>

                <tbody class="list">
                    <tr v-for="(item, index) in filteredList" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td class="text-left">{{ item.name }}</td>
                        <td>{{ item.brandID.name }}</td>
                        <td>
                            <i @click="copyValues(item._id, item.name, item.brandID.name)" class="fa-solid fa-plus">
                            </i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ListProduct from '../../service/Product'

export default {
    props: {
        id: String,
        nameP: String,
        brandP: String
    },
    data() {
        return {
            listProduct: [],
            searchKeyword: ''
        }
    },
    async created() {
        try {
            let res = await ListProduct.getAllProduct()
            for (let index = 0; index < res.data.length; index++) {
                if (res.data[index].Model3D == '' || res.data[index].Model3D == undefined) {
                    this.listProduct.push(res.data[index])
                   
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    },

    computed: {
        filteredList() {
            return this.listProduct.filter(item => {
                return item.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
                    item.brandID.name.toLowerCase().includes(this.searchKeyword.toLowerCase());
            });
        }
    },

    methods: {
        copyValues(id, name, brand) {
            this.$emit('updateValues', id, name, brand);
        }
    }
}
</script>

<style scoped>
.fa-plus {
    padding: 10px;
    color: blue;
    border-radius: 2px;
    cursor: pointer;
}

.fa-plus:hover {
    color: red;
    background-color: #ccc;
}

.search {
    padding: 5px;

}

.list {
    overflow: scroll;
    height: 100px;
}
</style>
