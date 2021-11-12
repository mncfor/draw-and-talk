<template>
    <div class="modal modal-users" :class="{ active: visible }" @click="$emit('close')">
        <div class="modal__overlay">
            <div class="modal__body" @click.stop>
                <h2 class="modal-users__heading">
                    Участники чата
                </h2>
                <ul class="modal-users__list">
                    <li
                        v-for="user in users"
                        :key="user.uid"
                    >
                        <i class="fas fa-user"></i>
                        {{ user.uname }}
                    </li>
                </ul>
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
        },
        users: {
            type: Array,
            required: true
        }
    },
    emits: {
        close: null
    }
}
</script>

<style>

</style>