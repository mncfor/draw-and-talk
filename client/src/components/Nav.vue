<template>
    <div class="nav">
        <div class="nav__name">{{ user?.name || '-' }}</div>
        <button class="nav__invite button-special button-icon" @click="modalInviteIsVisible = !modalInviteIsVisible">
            <span>Пригласить</span>
            <i class="fas fa-user-plus"></i>
        </button>
        <button class="nav__help" @click="modalHelpIsVisible = !modalHelpIsVisible"> ? </button>

        <div class="nav__logo">
            <img :src="require('@/assets/img/logo_line.jpg')" alt="">
        </div>

        <button class="nav__exit" @click="signOut">Выйти</button>

        <ModalHelp 
            @close="modalHelpIsVisible = false"
            :visible="modalHelpIsVisible"
        />
        <ModalInvite 
            @close="modalInviteIsVisible = false"
            :visible="modalInviteIsVisible"
        />
        <ModalName 
            @signIn="signIn"
            :visible="!isSetUser"
        />
    </div>
</template>

<script>
import ModalHelp from './ModalHelp.vue'
import ModalInvite from './ModalInvite.vue'
import ModalName from './ModalName.vue'
export default {
    props: {
        user: {
            type: [Object, null],
            required: false,
            default: false
        }
    },
    components: {
        ModalHelp,
        ModalInvite,
        ModalName
    },
    data(){
        return{
            modalInviteIsVisible: false,
            modalHelpIsVisible: false
        }
    },
    computed: {
        isSetUser(){
            return Boolean(this.user);
        }
    },
    methods: {
        signIn(name){
            this.$emit('signIn', name);
        },
        signOut(){
            this.$emit('signOut')
        }
    },
    emits: {
        signIn: payload => {
            if(typeof payload === 'string'){
                return true
            }else{
                return false
            }
        },
        signOut: null
    }
}
</script>

<style>

</style>