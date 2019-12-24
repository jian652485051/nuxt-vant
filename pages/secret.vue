<template>
  <div>
    <h1>新闻列表</h1>
    <ul>
      <li v-for="(e,i) in articleList.data" :key="i">
        {{e.title}}
      </li>
    </ul>
    <NuxtLink to="/">
      返回首页
    </NuxtLink>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  middleware: 'auth',
  async asyncData({ store, route, error }) {
    let queryParam = {
      pagesize:5,
      p:1
    }
    await store.dispatch('ARTICLE',queryParam).catch((e) => {
      error({ statusCode:e.data.status, message:e.data.statusCode })
    })
    return {
      queryParam:queryParam
    }
  },
  computed: {
    ...mapState([
      'articleList'
    ])
  },
  mounted() {
    console.log(this.articleList,'articleList');
  }
}
</script>