import { api } from '../config'

export default {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  async nuxtServerInit ({ commit }, { req }) {

    let cookieToJson = cookie => {
      let cookieArr = cookie.split(";");
      let obj = {} 
      cookieArr.forEach((i) => {
        let arr = i.split("=");
        obj[arr[0]] =arr[1];
      });
      return obj
    }
    let cookies = req.headers.cookie;
    let token ;
    if (cookies) {
      cookies = cookies.replace(/\s*/g,"");
      token = cookieToJson(cookies).access_token || null
      if(token){
        commit('SET_TOKEN', token)
      }
    }
    
  },

  async login({ commit }, params) {
    const data = await this.$axios.$post(`${api}/index.php/web/public/login`,params)
    commit('SET_USER', data)
    return data
  },

  async ARTICLE({ commit }, params) {
    const data = await this.$axios.$get(`${api}/index.php/web/public/article`,{params:params})
    if(data.data){
        commit('ARTICLE', data)
    }
    return data
  },

}
