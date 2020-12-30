<template>
  <div class="container">
    <h1>Please login to see the secret content</h1>
    <div v-if="!access_token">
      <p v-if="formError" class="error">
        {{ formError }}
      </p>
      <p><i>To login, use <br>username：18766381667 <br>and <br>password：222222</i></p>

      <van-form ref="loginForm" @failed="onFailed" @submit="onSubmit" :show-error-message="false">
        <van-field v-model="formData.mobile" icon-prefix="ion" left-icon="phone" name="mobile" label="" placeholder="请输入手机号码" maxlength="11" :rules="[{ required: true, message: '请输入手机号码',validator:checkMobile }]"></van-field>
        <van-field v-model="formData.password" icon-prefix="ion" left-icon="password" type="password" name="password" label="" placeholder="请输入密码" :rules="[{ required: true, message: '请输入密码' }]" class="password"></van-field>
        <div class="loginBtn">
          <van-button round block type="info" native-type="submit" class="com_btn">登录</van-button>
        </div>
      </van-form>
      <van-button round block class="com_btn" @click="resetValidate">重置</van-button>
    </div>
    <div v-else>
      Hello!
      <pre>I am the secret content, I am shown only when the user is connected.</pre>
      <p><i>You can also refresh this page, you'll still be connected!</i></p>
      <button @click="logout">
        Logout
      </button>
    </div>
    <p>
      <NuxtLink to="/secret">
        Super secret page
      </NuxtLink>
    </p>

    <van-circle
      v-model="currentRate"
      :rate="30"
      :speed="100"
      :text="text"
    />

    <div class="pcbg"></div>
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
const md5 = require('js-md5');
// import { setInteractionMode } from "vee-validate/dist/vee-validate.full";
// setInteractionMode('Lazy');

// import { extend } from "vee-validate/dist/vee-validate.full";
// extend('asyncRule', {
//   validate(value) {
//     return false
//   },
//   message: () => `请输入正确的手机号码`,
// });

export default {
  data () {
    return {
      formError: null,
      formData:{
        mobile:'',
        password:''
      },
      formUsername: '',
      formPassword: '',
      currentRate:0
    }
  },
  computed: {
    ...mapState([
        'access_token'
    ]),
    text() {
      return this.currentRate.toFixed(0) + '%'
    }
  },
  methods: {
    checkMobile(val){
      if(val.length === 11){
        return true
      }else{
        return false
      }
    },
    onSubmit(values) {
      let password = this.formData.password ? md5(this.formData.password) : '';
      let loginParams = {
        mobile:this.formData.mobile,
        password:password
      }
      this.$store.dispatch('login', loginParams).then((res) => {
        this.$toast.success(res.statusCode);
        this.formData.mobile = ''
        this.formData.password = ''
        this.formError = null

        if(res.data.access_token){
          this.common.setCookie('access_token',res.data.access_token)
          this.$store.commit('SET_TOKEN', res.data.access_token)
        }
        
      })
    },
    onFailed(errorInfo) {
      console.log('failed', errorInfo);
    },
    resetValidate(){
      this.formData.mobile = ''
      this.formData.password = ''
      this.$refs.loginForm.resetValidation(['mobile','password']);
    },
    logout () {
      this.common.delCookie();
      this.$store.state.access_token = null
    }
  }
}
</script>

<style lang="postcss" scoped>
.container {
  padding: 100px;
  color:var(--red);
  h1 {
    color:green;
  }
}
.error {
  color: red;
}
::placeholder {
  color: #ff1234;
}
.pcbg { width:100px; height:100px; background:resolve('dog.jpg') 0 0 / 100% 100% no-repeat;}
</style>