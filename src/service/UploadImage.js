import axios from "axios";
let port = import.meta.env.VITE_PORT
const Image = {
    // add Image
    addImage(formData) {
        return axios.post(`${port}/v1/Upload/upload`, formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        )
    },
    //delete image
    removeImage(id) {
        return axios.delete(`${port}/v1/Upload/deleteImage/${id}`)
    }
}

export default Image;