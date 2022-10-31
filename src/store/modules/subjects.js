
import { list } from '@/api/hmmm/subjects'

const state = {
  subList: []
}

const mutations = {
  muSubGetList (state, payload) {
    state.subList = payload
  }
}

const actions = {
  async subGetList (context, data) {
    const res = await list(data)
    console.log(res.data.items)
    context.commit('muSubGetList', res.data.items)
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
