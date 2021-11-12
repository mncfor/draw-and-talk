export default {
    namespaced: true,
    state: {
        users: [],
        messages: []
    },
    getters: {

    },
    mutations: {
        SET_USERS: (state, users) => state.users = users,
        ADD_MESSAGE: (state, message) => state.messages.push(message),
        CLEAR_MESSAGES: (state) => state.messages = []
    },
    actions: {
        getMessage({commit}, data){
            if(data.method === 'connection' || data.method === 'disconnect'){
                data.users ? commit('SET_USERS', data.users) : commit('SET_USERS', []);
                commit('ADD_MESSAGE', data);
            }else{
                commit('ADD_MESSAGE', data);
            }
        },
        sendMessage({state, rootState}, message){
            rootState.socket.send(JSON.stringify({
                method: 'message',
                session: rootState.session,
                uname: rootState.user.name,
                uid: rootState.user.id,
                message: message
            }));
        }
    }
  }
  