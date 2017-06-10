const DATA = 'DATA'

const state = {
  data: [],
  name: '',
  avatar: ''
}

const actions = {
  initData (context, data) {
    context.commit('DATA', data)
  }
}

const mutations = {
  [DATA] (state, payload) {
    state.data = payload.data
    state.name = payload.name
    state.avatar = payload.avatar
  }
}

export default {
  state,
  mutations,
  actions
}
