import axios from "axios";
let port = import.meta.env.VITE_PORT

const Cart = {

    getCart(id) {
        const dataItem = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
            },
        }
        return axios.get(`${port}/v1/cart/getOne/${id}`, dataItem)
    },

    addCart(product, id) {
        const dataItem = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
            },
            product: product
        }
        return axios.put(`${port}/v1/cart/put/${id}`, dataItem)
    },

    updateCart(product, id) {
        const dataItem = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
            },
            product: product
        }
        return axios.put(`${port}/v1/cart/putQuantity/${id}`, dataItem)
    },

    Pay(product, order_id, cart_id) {
        const dataItem = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
            },
            product: product = {
                product: product,
                Order_id: order_id,
                Cart_id: cart_id,
            }

        }
        return axios.post(`${port}/v1/cart/post/pay_product`, dataItem)
    }




};
export default Cart;