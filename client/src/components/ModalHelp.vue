<template>
    <div class="modal modal-help" :class="{ active: visible }" @click="$emit('close')">
        <div class="modal__overlay">
            <div class="modal__body" @click.stop>
                <h1 class="modal-help__heading">
                    Draw&Talk
                </h1>
                <div class="modal-help__text">
                    <p>В Draw&Talk Вы можете общаться и рисовать вместе с Вашими собеседниками в режиме реального времени.</p>
                    <p>Созданный Вами холст доступен для всех участников чата.</p>
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
    emits: {
        close: null
    }
}
</script>

<style>

</style>