<template>
    <div class="canvas">
        <canvas
            ref="canvas"
            @mousedown="pushToUndo"
        >
        </canvas>
    </div>
</template>

<script>
export default {
    mounted(){
        this.initCanvas();
    },
    methods: {
        initCanvas(){
            const canvas = this.$refs.canvas;
            canvas.height = canvas.getBoundingClientRect().height;
            canvas.width = canvas.getBoundingClientRect().width;
            this.$store.commit('canvas/SET_CANVAS', canvas);
        },
        pushToUndo(){
            this.$store.dispatch('canvas/pushToUndo');
        }
    },
    unmounted(){
        this.$store.commit('canvas/SET_CANVAS', null);
    }
}
</script>

<style>

</style>