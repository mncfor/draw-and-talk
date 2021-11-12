import { createStore } from 'vuex'
import canvas from '@/store/canvas'
import tool from '@/store/tool'
import chat from '@/store/chat'

export default createStore({
  state: {
    user: null,
    session: null,
    socket: null,
    preloader: true
  },
  mutations: {
    SET_SESSION: (state, session) => state.session = session,
    SET_USER: (state, name) => {
        state.user = {
            name: name,
            id: Date.now()
        }
    },
    REMOVE_USER: state => state.user = null,
    SET_SOCKET: (state, socket) => state.socket = socket,
    CLOSE_SOCKET: async state => {
        await state.socket.close();
        state.socket = null;
    },
    SET_PRELOADER: (state, bool) => state.preloader = bool
  },
  actions: {
    async signIn({ commit, dispatch }, name){
        commit('SET_USER', name);
        await dispatch('setConnection');
        dispatch('tool/brush');
    },
    signOut({ commit, dispatch }){
        dispatch('closeConnection');
        commit('SET_SESSION', null);
        commit('chat/CLEAR_MESSAGES', null, { root: true })
        commit('REMOVE_USER');
    },
    setConnection({state, commit, dispatch}){
        commit('SET_SOCKET', new WebSocket(process.env.VUE_APP_API_WS_URL));
        state.socket.onopen = () => {

            state.socket.send(JSON.stringify({
                method: 'connection',
                session: state.session,
                uname: state.user.name,
                uid: state.user.id
            }));

            state.socket.onmessage = (e) => {
                const data = JSON.parse(e.data);
                switch(data.method){
                    case 'message':
                    case 'connection':
                    case 'disconnect':
                        dispatch('chat/getMessage', data)
                        break
                    case 'draw':
                        dispatch('tool/socketDraw', data)
                        break
                    case 'pushToUndo':
                        commit('canvas/PUSH_TO_UNDO')
                        break
                    case 'undo':
                        dispatch('canvas/undo')
                        break
                    case 'redo':
                        dispatch('canvas/redo')
                        break
                    case 'clear':
                        commit('canvas/CLEAR_CANVAS')
                        break
                }
            }
        }
        state.socket.onerror = (e) => {
            console.log(e)
        }
    },
    closeConnection({commit}){
        commit('CLOSE_SOCKET');
    }
  },
  modules: {
    canvas,
    tool,
    chat
  }
})
