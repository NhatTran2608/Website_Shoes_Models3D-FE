import axios from "axios";
let port = import.meta.env.VITE_PORT
const History = {
    createHistory(product) {
        const dataItem = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                product: product
            },
        }
        return axios.post(`${port}/v1/history/post/history`, dataItem)
    },

    getAllHistory() {
        const dataItem = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
            },
        }
        return axios.get(`${port}/v1/history/get/allHistory`, dataItem)
    },
    
    getOneHistory(id) {
        const dataItem = {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('Token')}`,
                id: id
            },
        }
        return axios.get(`${port}/v1/history/getOne/history`, dataItem)
    },




};
export default History;