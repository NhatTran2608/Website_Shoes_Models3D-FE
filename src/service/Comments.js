import axios from "axios";
let port = import.meta.env.VITE_PORT

const Cart = {
    createComments(content) {
        const dataItem = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
            },
            content: content
        }
        return axios.post(`${port}/v1/comment/post/comment`, dataItem)
    },
    getOneComments(id) {
        return axios.get(`${port}/v1/comment/get/comments/${id}`)
    }


};
export default Cart;