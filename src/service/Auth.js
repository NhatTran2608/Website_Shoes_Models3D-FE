import axios from "axios";
let port = import.meta.env.VITE_PORT
const Auth = {

  SignUp(user) {
    return axios.post(`${port}/v1/shop/SignUp`, user);
  },

  SignIn(user) {
    return axios.post(`${port}/v1/shop/SignIn`, user);
  },

  getOneUser(id) {
    const dataItem = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('Token')}`,
      },
      id: id
    }
    return axios.get(`${port}/v1/shop/getUser`, dataItem)
  },
  getOneUserOfAdmin(id) {
    const dataItem = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('Token')}`,
        id: id
      },
      
    }
    return axios.get(`${port}/v1/shop/getUserOfAdmin`, dataItem)
  },
  getAllUser() {
    const dataItem = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('Token')}`,
      },
    }
    return axios.get(`${port}/v1/shop/getAllUser`, dataItem)
  }


};
export default Auth;