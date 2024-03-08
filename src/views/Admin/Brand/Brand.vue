<template>
    <div class="title_Warehouse">
        <div>
            <Menu></Menu>
        </div>
        <div>
            <div>
                <h2>
                    KHO HÀNG
                </h2>
                <hr>
            </div>
            <div class="container">
                <h2>Thêm thương hiệu</h2>
                <form @submit.prevent="createBrand">
                    <div class="form-group">
                        <label for="nameBrand">Tên thương hiệu</label>
                        <input type="text" class="form-control name-brand" id="nameBrand" placeholder="Nhập tên thương hiệu"
                            name="nameBrand" required v-model="Brand.name">
                    </div>
                    <button type="submit" class="btn btn-primary">Thêm thương hiệu</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import Menu from '../../../components/HeaderAdmin/Header.vue';
import brandService from '../../../service/Brand'
import notification from '../../../utils/notification.utils'
export default {
    components: {
        Menu
    },
    data() {
        return {
            Brand: {
                name: ''
            }
        }
    },
    methods: {
        async createBrand() {
            brandService.addBrand(this.Brand)
                .then(() => {
                    this.Brand.name = ''
                    notification.success('Thêm thương hiệu thành công', this)
                })
                .catch(err => {
                    notification.error(err.response.data.mes, this)
                })
        }
    }

}
</script>
<style scoped>
@import url('../Brand/Brand.css');
</style>