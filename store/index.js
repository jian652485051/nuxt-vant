import v_getters from './getters'
import v_mutations from './mutations'
import v_actions from './actions'

export const strict = false

export const state = () => ({
  access_token:null,
  articleList:{}
})

export const getters = v_getters
export const mutations = v_mutations
export const actions = v_actions