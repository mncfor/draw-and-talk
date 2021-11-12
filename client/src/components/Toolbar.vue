<template>
    <div class="toolbar">
        <div class="toolbar__tools">
            <ButtonSpecialOnlyIcon 
                v-for="tool in tools"
                :key="tool.name"
                :icon="tool.icon"
                @click="setTool(tool.name)"
                :class="{ active: currentTool == tool.name}"
            >
                {{ tool.label }}
            </ButtonSpecialOnlyIcon>

            <div class="toolbar__linewidth">
                <i class="icon">
                    <img :src="require('@/assets/img/icons/line-width.svg')" alt="">
                </i>
                <label for="lineWidth">Толщина линии</label>
                <input @change="setLineWidth" v-model="lineWidth" id="lineWidth" type="number" min="1" max="30">
            </div>
            <div class="toolbar__setcolor">
                <div class="color">
                    <label for="colorFill">Основной цвет</label>
                    <input type="color" id="colorFill" @change="setFillColor" v-model="fillColor">  
                </div>
                <div class="color">
                    <label for="colorStroke">Цвет обводки</label>
                    <input type="color" id="colorStroke" @change="setStrokeColor" v-model="strokeColor">  
                </div>
            </div>
        </div>
        <div class="toolbar__moves">
            <ButtonSpecialOnlyIcon 
                icon="fas fa-undo"
                @click="undo"
                title="Отменить (Ctrl + Z)"
            >
                Назад
            </ButtonSpecialOnlyIcon>
            <ButtonSpecialOnlyIcon 
                icon="fas fa-redo"
                @click="redo"
                title="Вернуть (Ctrl + Y)"
            >
                Вперед
            </ButtonSpecialOnlyIcon>
            <button 
                style="margin-left: 2em"
                class="nav__invite button-special"
                @click="clearCanvas"
            >
                <span>Очистить холст</span>
            </button>
        </div>
        <div class="toolbar__load">
            <button class="nav__invite button-special button-icon">
                <span>Открыть</span>
                <i class="fas fa-upload"></i>
            </button>
            <button class="nav__invite button-special button-icon" @click="download">
                <span>Сохранить</span>
                <i class="fas fa-download"></i>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            currentTool: 'brush',
            lineWidth: 1,
            fillColor: '',
            strokeColor: '',
            tools: [
                {
                    name: 'brush',
                    icon: 'fas fa-paint-brush',
                    label: 'Кисть'
                },
                {
                    name: 'rect',
                    icon: 'fas fa-square-full',
                    label: 'Прямоугольник'
                },
                {
                    name: 'circle',
                    icon: 'fas fa-circle',
                    label: 'Круг'
                },
                {
                    name: 'line',
                    icon: 'fas fa-slash',
                    label: 'Линия'
                },
                {
                    name: 'eraser',
                    icon: 'fas fa-eraser',
                    label: 'Ластик'
                },
            ]
        }
    },
    mounted(){
        document.addEventListener('keydown', this.handleKeyUndoRedo);
    },
    methods: {
        setTool(tool){
            this.currentTool = tool;
            this.$store.dispatch(`tool/${tool}`);
        },
        clearCanvas(){
            this.$store.dispatch('canvas/socketClear');
        },
        undo(){
            this.$store.dispatch('canvas/socketUndo');
        },
        redo(){
            this.$store.dispatch('canvas/socketRedo');
        },
        handleKeyUndoRedo(e){
            if (e.ctrlKey && e.key === 'z') {
                this.undo();
            }
            if (e.ctrlKey && e.key === 'y') {
                this.redo();
            }
        },
        setLineWidth(){
            this.$store.commit('tool/SET_LINE_WIDTH', this.lineWidth)
        },
        setFillColor(){
            this.$store.commit('tool/SET_FILL_COLOR', this.fillColor);
        },
        setStrokeColor(){
            this.$store.commit('tool/SET_STROKE_COLOR', this.strokeColor);
        },
        download(){
            const snapshot = this.$store.state.canvas.canvas.toDataURL();
            const session = this.$store.state.session;
            const a = document.createElement('a');
            a.href = snapshot;
            a.download = session + '.jpg';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    },
    unmounted(){
        document.removeEventListener('keydown', this.handleKeyUndoRedo);
        this.$store.commit('tool/SET_TOOL', null);
    },
}
</script>

<style>

</style>