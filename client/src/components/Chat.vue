<template>
    <div class="chat" ref="chat">
        <div class="chat__head">
            <div @click="lol">
                <i class="far fa-comment-dots"></i>
            </div>
            <p @click="modalUsersIsVisible = true">
                <i class="fas fa-users"></i>
                Участников: <span>{{ users.length }}</span>
            </p>
        </div>

        <ModalUsers
            :users="users"
            :visible="modalUsersIsVisible"
            @close="modalUsersIsVisible = false"
        />

        <div class="chat__body" ref="chatBody">

            <div
                ref="message"
                v-for="m in messages"
                :key="m.time"
                :class="{
                    'chat__user-move': m.method === 'connection' || m.method === 'disconnect',
                    'chat__msg chat-msg': m.method === 'message',
                    'me': m.method === 'message' && m.uid === currentUser.id,
                    'interlocutor': m.method === 'message' && m.uid !== currentUser.id,
                }"
            >
                <template v-if="m.method === 'connection'">
                    <p v-if="m.uid !== currentUser.id">
                        Пользователь {{ m.uname }} присоединился
                    </p>
                    <p v-else>
                        Добро пожаловать в Draw&Talk
                    </p>
                </template>

                <template v-if="m.method === 'disconnect'">
                    <p>
                        Пользователь {{ m.disconnected[0].uname }} покинул чат
                    </p>
                </template>
                
                <template v-if="m.method === 'message'">
                    <div class="chat-msg__name" v-if="m.uid !== currentUser.id"> {{ m.uname }}</div>
                    <div class="chat-msg__text"> {{ m.message }}</div>
                    <div class="chat-msg__time">{{ formatTime(m.time) }}</div>
                </template>
            </div>
            
        </div>
        <div class="chat__submit">
            <input 
                type="text"
                v-model="message"
                :class="{ invalid: messageError }"
                @input="messageError = false"
                autofocus
                @keydown.enter="sendMessage"
            >
            <button @click="sendMessage">
                <i class="fas fa-paper-plane"></i>
            </button>
        </div>
    </div>
</template>

<script>
import ModalUsers from '@/components/ModalUsers'
export default {
    components: {
        ModalUsers
    },
    data(){
        return{
            message: '',
            messageError: false,
            modalUsersIsVisible: false
        }
    },
    computed: {
        currentUser(){
            return this.$store.state.user;
        },
        messages(){
            return this.$store.state.chat.messages
        },
        users(){
            return this.$store.state.chat.users
        }
    },
    mounted(){
        const chat = this.$refs.chat;
        const chatHeight = chat.getBoundingClientRect().height;
        chat.style.height = chatHeight + 'px';
    },
    methods: {
        async sendMessage(){
            if(!this.message){
                this.messageError = true
                return
            }
            await this.$store.dispatch('chat/sendMessage', this.message);
            this.message = '';
        },
        formatTime(rawTime){
            let time = new Date(rawTime);
            let hours = time.getHours();
            let minutes = time.getMinutes();

            if(hours < 10){
                hours = '0' + hours
            }

            if(minutes < 10){
                minutes = '0' + minutes
            }

            return `${hours} : ${minutes}`
        }
    },
    watch: {
        messages: {
            handler() {
                const chat = this.$refs.chatBody;
                if(chat.scrollHeight - chat.scrollTop === chat.clientHeight){
                    this.$nextTick(() => {
                        chat.scrollTop = chat.scrollHeight;
                    })
                }
            },
            deep: true
        },
    }
}
</script>

<style>

</style>