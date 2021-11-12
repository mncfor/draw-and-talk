<template>
    <div class="modal modal-name" :class="{ active: visible }">
        <div class="modal__overlay">
            <div class="modal__body">
                <h2 class="modal-name__heading">
                    Ваше имя
                </h2>
                <form class="modal-name__form" @submit.prevent>
                    <input type="text" v-model="name" :class="{ invalid: nameError }" autofocus>
                    <button class="button button-main" @click="signIn">Войти</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    data(){
        return{
            name: '',
            nameError: false
        }
    },
    methods: {
        signIn(){
            if(!this.name){
                this.nameError = true
                return
            }
            this.$emit('signIn', this.name);
            this.name = '';
        }
    },
    emits: {
        signIn: payload => {
            if(typeof payload === 'string'){
                return true
            }else{
                return false
            }
        }
    }

}
</script>

<style>

</style>