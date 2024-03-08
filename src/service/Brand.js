import axios from "axios";
let port = import.meta.env.VITE_PORT
const Brand = {

    addBrand(brand) {
        const dataItem = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                brand: brand
            },
        }
        return axios.post(`${port}/v1/brand/post/createBrand`, dataItem)
    },

    getAll() {
        return axios.get(`${port}/v1/brand/getAll/brand`)
    },
    getOne(id) {
        return axios.get(`${port}/v1/brand/getOne/${id}`)
    }
};
export default Brand;