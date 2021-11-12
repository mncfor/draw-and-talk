<template>
    <div class="modal modal-invite" :class="{ active: visible }" @click="$emit('close')">
        <div class="modal__overlay">
            <div class="modal__body" @click.stop>
                <h2 class="modal-invite__heading">
                    Просто поделитесь этой ссылкой с другом
                </h2>
                <div class="modal-invite__link-wrap">
                    <div class="modal-invite__link" ref="link">
                        {{ 'https://drawandtalk-vue.herokuapp.com' + $route.fullPath }}
                    </div>
                    <button class="modal-invite__copy" ref="copy" @click="copyLink">
                        <i class="far fa-copy"></i>
                    </button>
                </div>
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
    methods: {
        copyLink(){
            navigator.clipboard.writeText(this.$refs.link.innerText);
            this.$refs.copy.classList.add('copied');
            setTimeout(() => {
                this.$refs.copy.classList.remove('copied');
            }, 2000)
        }
    },
    emits: {
        close: null
    }
}
</script>

<style>

</style>