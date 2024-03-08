import axios from "axios";
let port = import.meta.env.VITE_PORT
const Product = {

    //add product
    addProduct(product) {
        const dataItem = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                product: product
            },
        }
        return axios.post(`${port}/v1/product/post/addProduct`, dataItem)
    },

    // get product
    getOneProduct(id) {
        return axios.get(`${port}/v1/product/getOne/${id}`)
    },

    // get All Product
    getAllProduct() {
        return axios.get(`${port}/v1/product/getAll`)
    },

    //edit product
    editProduct(product, id) {
        const dataItem = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                product: product
            },
        }
        return axios.put(`${port}/v1/product/put/editProduct/${id}`, dataItem)
    },

    //delete Product
    deleteProduct(id) {
        return axios.delete(`${port}/v1/product/delete/${id}`, {
            data: {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                }
            }

        })
    }

};
export default Product;