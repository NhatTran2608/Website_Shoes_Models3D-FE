import axios from "axios";
let port = import.meta.env.VITE_PORT
const Order = {
    getOrder(id) {
        const dataItem = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                id: id
            },
        }
        return axios.get(`${port}/v1/order/getOne/item`, dataItem)
    },

    getAllOrder() {
        const dataItem = {

            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
            },

        }
        return axios.get(`${port}/v1/order/getAll/list_order`, dataItem)

    },

    updateOrder(id, product) {
        const dataItem = {

            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
            },
            id: id,
            product: product
        }
        return axios.put(`${port}/v1/order/put/order`, dataItem)

    }





};
export default Order;