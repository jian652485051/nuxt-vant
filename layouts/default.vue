<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  methods: {
    initInfo(){
      let token = this.common.getCookie('access_token') || null;
      if(token){
        this.$store.commit('SET_TOKEN', token);
      }
    }
  },
  created() {
    this.initInfo();
  },
}
</script>

<style lang="postcss">
@import "assets/css/root.css";
</style>
