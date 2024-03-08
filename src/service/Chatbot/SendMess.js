import axios from "axios";
let portChat = import.meta.env.VITE_CHAT

const Chat = {

    send(mess) {
        return axios.post(`${portChat}/webhooks/rest/webhook`, mess)
    }

};
export default Chat