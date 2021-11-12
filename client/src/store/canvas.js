export default {
    namespaced: true,
    state: {
        canvas: null,
        undoList: [],
        redoList: []
    },
    getters: {

    },
    mutations: {
        SET_CANVAS: (state, canvas) => state.canvas = canvas,
        CLEAR_CANVAS: (state) => {
            state.canvas.getContext('2d').clearRect(0, 0, state.canvas.width, state.canvas.height);
            state.undoList = [];
            state.redoList = [];
        },
        PUSH_TO_UNDO: (state, snapshot) => state.undoList.push(state.canvas.toDataURL()),
        PUSH_TO_REDO: (state, snapshot) => state.redoList.push(state.canvas.toDataURL()),
        BACK_TO: (state, img) => {
            state.canvas.getContext('2d').clearRect(0, 0, state.canvas.width, state.canvas.height);
            state.canvas.getContext('2d').drawImage(img, 0, 0, state.canvas.width, state.canvas.height);
        }
    },
    actions: {
        pushToUndo({rootState}){
            rootState.socket.send(JSON.stringify({
                method: 'pushToUndo',
                session: rootState.session
            }))
        },
        socketUndo({rootState}){
            rootState.socket.send(JSON.stringify({
                method: 'undo',
                session: rootState.session
            }))
        },
        socketRedo({rootState}){
            rootState.socket.send(JSON.stringify({
                method: 'redo',
                session: rootState.session
            }))
        },
        socketClear({rootState}){
            rootState.socket.send(JSON.stringify({
                method: 'clear',
                session: rootState.session
            }))
        },
        undo({ state, commit }){
            if(state.undoList.length > 0){
                let dataUrl = state.undoList.pop();
                commit('PUSH_TO_REDO', dataUrl);
                let img = new Image();
                img.src = dataUrl;
                img.onload = () => {
                    commit('BACK_TO', img)
                }
            }
        },
        redo({ state, commit }){
            if(state.redoList.length > 0){
                let dataUrl = state.redoList.pop();
                commit('PUSH_TO_UNDO', dataUrl);
                let img = new Image();
                img.src = dataUrl;
                img.onload = () => {
                    commit('BACK_TO', img)
                }
            }
        }
    }
  }
  