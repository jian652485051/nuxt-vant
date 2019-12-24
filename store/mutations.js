export default {
  SET_USER (state, user) {
    state.authUser = user
  },
  SET_TOKEN (state, token) {
    state.access_token = token
  },
  ARTICLE(state, data) {
    state.articleList = data
  },
}