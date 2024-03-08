import axios from "axios";
let port = import.meta.env.VITE_PORT
const Model3D = {
    // add Model3D
    addModel3D(formData) {
        return axios.post(`${port}/v1/Upload3D/upload3D`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
        )
    },

    //delete Model3D
    removeModel3D(id) {
        return axios.delete(`${port}/v1/Upload3D/delete3D/${id}`)
    },

    //create 3D

    create3D(model3D) {
        const dataItem = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                model3D: model3D
            },
        }
        return axios.post(`${port}/v1/Upload3D/post/Model3D`, dataItem)

    }


}

export default Model3D;