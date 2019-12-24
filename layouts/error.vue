<template>
  <section class="error">
    <van-icon name="warning-o" />
    <h2 class="error-info" v-if="error.statusCode == '404'">页面不存在</h2>
    <h2 class="error-info" v-else>{{ error.message }}</h2>
  </section>
</template>
<script>
export default {
  props: ['error'],
  mounted() {
    //console.log(this.$route.params);
    if(this.error.statusCode == '401'){
      this.common.delCookie();
      this.$store.state.access_token = '';
      this.common.storage('user','');
      setTimeout(() => {
          window.location.href='/'
      }, 1000);
    }
  }
}
</script>

<style lang="postcss" scoped>
.error {
  text-align: center;
  padding:70px 0;
  .van-icon {
    font-size:40px;
    margin-bottom:10px;
  }
  .error-info {
    font-size:30px;
  }
}
</style>