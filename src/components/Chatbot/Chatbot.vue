<template>
    <div>
        <div class="chat-toggle" @click="toggleChat">
            <img src="../../../public/robot.png" alt="Chat Icon" class="chat-icon">
        </div>
        <div v-if="showChat" class="chat-container">
            <div ref="chatBox" class="chat-box" id="chat-box">
                <div class="chat-message message_null" v-if="chatContent.length < 1">
                    <h5 class="m-2">Xin chào! Tôi là chatbot. Có thể giúp gì cho bạn?</h5>
                </div>
                <div class="chat-message" v-for="(message, index) in chatContent" :key="index">
                    <p :class="getMessageClass(message.sender)">
                        <span v-html="message.content"></span>
                        <!-- {{  }} -->
                    </p>
                </div>
            </div>
            <input class="user-input" type="text" v-model="userMessage" placeholder="Nhập tin nhắn của bạn..."
                @keypress.enter="sendChat">
            <button class="send-btn" @click="sendChat">Gửi</button>
        </div>
    </div>
</template>
  
  
<script>
import ChatService from '../../service/Chatbot/SendMess'
import notification from '../../utils/notification.utils'

export default {
    data() {
        return {
            showChat: false,
            chatContent: [],
            userMessage: ''
        };
    },
    methods: {
        toggleChat() {
            this.showChat = !this.showChat;
        },
        addToTextArea(text) {
            this.chatContent.push({ content: text, sender: "user" }); // Tin nhắn từ người dùng
            this.scrollToBottom();
        },
        scrollToBottom() {
            this.$nextTick(() => {
                const chatBox = this.$refs.chatBox;
                chatBox.scrollTop = chatBox.scrollHeight;
            });
        },
        async sendChat() {
            const userMessage = this.userMessage.trim();
            if (!userMessage) {
                notification.warn('Vui lòng nhập tin nhắn', this);
                return;
            }
            this.addToTextArea("[BẠN]: " + userMessage);

            try {
                const response = await ChatService.send({
                    sender: 'test',
                    message: userMessage
                });

                // Thêm tin nhắn từ bot vào chatContent
                this.chatContent.push({ content: "🤖: " + response.data[0].text, sender: "bot" });
                this.scrollToBottom();
            } catch (error) {
                console.error('Error sending message:', error);
            }

            this.userMessage = '';
        },
        getMessageClass(sender) {
            return sender === "user" ? "user-message" : "bot-message";
        }
    }
}
</script>

  
<style scoped>
.chat-toggle {
    position: relative;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;
    cursor: pointer;
}

.chat-toggle {
    background-color: #c6c4c4;
    padding: 10px;
    border-radius: 100%;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    animation: shake 1s ease infinite;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    50% {
        transform: translateX(-5px);
    }
}

.chat-icon {
    width: 50px;
    height: 50px;
}

.chat-container {
    position: fixed;
    bottom: 0;
    right: 0;
    max-width: 400px;
    margin: 0 20px 20px 0;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: block;
    z-index: 999999;
}

.chat-box {
    min-width: 400px;
    height: 300px;
    overflow-y: scroll;
    padding: 10px;
    scroll-behavior: smooth;
    /* Tạo hiệu ứng cuộn mượt */
}


.chat-message {
    margin-bottom: 20px;

}

.bot-message {
    background-color: #f1f0f0;
    padding: 10px 15px;
    border-radius: 20px;
    display: inline-block;
    max-width: 80%;
}

.user-input {
    width: calc(100% - 80px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px 0 0 5px;
    border-right: none;
    outline: none;
}

.send-btn {
    width: 80px;
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 0 5px 5px 0;
    cursor: pointer;
}

.send-btn:hover {
    background-color: #0056b3;
}

.chat-message {
    display: flex;
    justify-content: flex-end;
    /* Tin nhắn từ người dùng sẽ được căn lề phải */
}

.user-message {
    background-color: #007bff;
    color: white;
    border-radius: 10px;
    padding: 10px;
    margin: 5px;
    text-align: left;
}

.bot-message {
    text-align: left;
    background-color: #f1f0f0;
    color: #000;
    border-radius: 10px;
    padding: 10px;
    margin: 5px;
}

.message_null {
    background-color: #e3e1e1;
    border-radius: 5px;

}
</style>
