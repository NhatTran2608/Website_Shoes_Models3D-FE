<template>
    <div>
        <div>
            <form @submit.prevent="postData">
                <div class="form-group text-center mt-2">
                    <h1>THÊM MÔ HÌNH 3D</h1>
                    <div style="margin: auto;" class="col-sm-3 text-center">
                        <label class="control-label small" for="image">Dạng file (GLB/GLTF):</label>
                        <input required type="file" multiple class="form-control  text-center" id="image" ref="imageInput"
                            @change="handleFileChange">
                    </div>
                    <button class="btn btn-primary mt-1">Upload</button>
                </div>

                <div class="text-center">
                    <div type="button" class="btn btn-info" data-toggle="modal" data-target=".bd-example-modal-lg">
                        Thêm sản phẩm cho mô hình
                    </div>

                    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
                        aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <Product :id="id" :nameP="name" :brandP="brand" @updateValues="handleUpdateValues">
                                </Product>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="mt-3" v-if="this.name != ''">
                    <ul>
                        <li>Tên sản phẩm: <b>{{ this.name }}</b> </li>
                        <li>Thương hiệu: <b>{{ this.brand }}</b> </li>
                    </ul>
                </div>

                <div class="flex-container">
                    <label for="image" class="text-center model3d m-2 " style="height: 450px; width: 900px;"
                        v-if="checkFormat == false && model3d_name == undefined">
                        <h1 class="mt-5">CHƯA TẢI MÔ HÌNH</h1>
                    </label>
                    <div class="checkFormat" v-if="checkFormat == true">
                        <h2>Lỗi định dạnh file</h2>
                    </div>
                    <div class="m-2" v-if="checkFormat == false && model3d_name != undefined">
                        <model-viewer class="model3d" ref="modelViewer" style="height: 450px; width: 900px;"
                            id="hotspot-demo" ar ar-modes="webxr" camera-controls touch-action="pan-y" disable-tap
                            :src="model3d_name" skybox-image="../../../public/sky.jpg" shadow-intensity="1"
                            alt="A 3D model of an astronaut." @dblclick="addHotspot">
                        </model-viewer>
                    </div>
                    <div>
                        <label class="color mr-2" for="color">Chọn màu cho điểm: </label>
                        <select class="color" name="" id="color" v-model="this.color">
                            <option value="red">Màu Đỏ</option>
                            <option value="blue">Màu Xanh</option>
                            <option value="black">Màu Đen</option>
                        </select>
                        <br>
                        <br>
                        <div class="scroll-title">
                            <div class="detail3D" v-for="(item, index) in this.model3d.render3D" :key="index">
                                <div class="detail3D_TD">
                                    Điểm {{ index + 1 }}
                                    <span @click="removeHotspot(index)" class="remove-title">
                                        <i class="fa-solid fa-trash-can"></i>
                                    </span>
                                    <br>
                                    <!-- Tọa độ X: {{ item.position.x.toFixed(2) }} <br>
                                    Tọa độ Y: {{ item.position.y.toFixed(2) }} <br>
                                    Tọa độ Z: {{ item.position.z.toFixed(2) }}<br> -->
                                    <textarea v-model="item.title" name="" id="" cols="28" rows="3"
                                        placeholder="Nhập mô tả..." required="true">
                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>

import Upload3D from '../../service/Upload3D'
import notification from '../../utils/notification.utils'
import Product from '../../components/ListProducts.vue/ListProducts.vue'

export default {
    components: {
        Product,
    },
    data() {
        return {
            checkFormat: false,
            name: '',
            brand: '',
            id: '',
            model3d_name: undefined,
            color: 'red',
            cnt: 0,
            model3d: {
                product: undefined,
                nameModel: undefined,
                nameProduct: '',
                render3D: [],
            }
        }
    },
    methods: {
        handleUpdateValues(id, name, brand) {
            this.id = id;
            this.name = name;
            this.brand = brand;
            this.model3d.nameProduct = this.id
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
                    const response = await Upload3D.addModel3D(formData)
                    if (response.data && response.data.files) {
                        return response.data.files.map(file => file.filename);
                    }
                } catch (error) {
                    notification.error('Lỗi định dạng mô hình', this)
                    console.error('Error uploading images locally:', error);
                    throw error;
                }
            }
        },

        async postData() {
            try {
                if (this.model3d.nameProduct == '') {
                    notification.warn('Vui lòng chọn sản phẩm cho mô hình', this)
                    return;
                }
                const imageUrl = await this.upLoadFiles();
                this.model3d.nameModel = imageUrl
                await Upload3D.create3D(this.model3d);
                notification.success('Thêm mô hình thành công', this);
            }
            catch (err) {
                console.log(err);
            }
        },

        handleFileChange(event) {
            const files = event.target.files;
            let nameFile = files[0].name
            let formatFileGLB = nameFile.slice(-3);
            let formatFileGLTF = nameFile.slice(-4);
            if (files.length > 0) {
                if (formatFileGLB != 'glb' && formatFileGLTF != 'gltf') {
                    this.checkFormat = true;
                    notification.warn('Lỗi định dạnh file', this)
                    return;
                }
                this.checkFormat = false
                const file = files[0];
                this.model3d_name = URL.createObjectURL(file);
            }
        },
        async addHotspot(event) {
            const modelViewer = this.$refs.modelViewer;
            const count = modelViewer.querySelectorAll('.Hotspot').length + 1;
            this.cnt = modelViewer.querySelectorAll('.Hotspot').length + 1;
            const positionXYZ = modelViewer.positionAndNormalFromPoint(event.clientX, event.clientY);
            const normal = positionXYZ.normal;
            const position = positionXYZ.position;
            // Tạo thẻ button
            const button = document.createElement('button');
            button.setAttribute('class', 'Hotspot');
            button.setAttribute('slot', `hotspot-${count}`);
            button.setAttribute('data-position', `${(position.x).toFixed(2)}m ${(position.y).toFixed(2)}m ${(position.z).toFixed(2)}m`);
            button.setAttribute('data-normal', `${(normal.x).toFixed(2)}m ${(normal.y).toFixed(2)}m ${(normal.z).toFixed(2)}m`);
            button.setAttribute('data-visibility-attribute', 'visible');
            button.setAttribute('style', `width: 20px; height: 20px; border: none; border-radius: 100%; background-color: ${this.color}; `);
            // Tạo thẻ div
            const div = document.createElement('div');
            div.textContent = this.model3d.render3D.length + 1
            div.setAttribute('style', 'margin-bottom: 5px; margin-top: -3px; color: white;')
            button.appendChild(div);

            modelViewer.appendChild(button);
            let newObj = {
                position: position,
                normal: normal,
                title: ''
            };
            this.model3d.render3D.push(newObj);
        },

        async removeHotspot(index) {
            const modelViewer = await this.$refs.modelViewer;
            let buttonElement = document.querySelector(`.Hotspot[slot=hotspot-${index + 1}]`)
            modelViewer.removeChild(buttonElement)
            this.model3d.render3D.splice(index, 1)
            console.log(buttonElement)
        }
    }
}
</script>
<style scoped>
#modelViewer {
    width: 90vw;
    height: 90vh;
}

.flex-container {
    display: flex;
}

.flex-container>div {
    margin-left: 15px;
}


.model3d {
    border: 3px solid #ccc;
}

.detail3D {
    border: 1px solid black;
    border-radius: 5px;
    margin-bottom: 10px;

}

.scroll-title {
    width: 260px;
    height: 400px;
    overflow: scroll;
}

.detail3D_TD {
    padding: 5px;

}

.remove-title {
    float: right;
    color: red;
    cursor: pointer;
}

.checkFormat {
    border: 3px solid red;
    /* margin-top: 100px; */
    text-align: center;
    height: 450px;
    width: 900px;
    color: red;
}
</style>