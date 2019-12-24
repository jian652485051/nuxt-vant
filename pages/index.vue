<template>
  <div class="container">
    <h1>Please login to see the secret content</h1>
    <div v-if="!access_token">
      <p v-if="formError" class="error">
        {{ formError }}
      </p>
      <p><i>To login, use <br>username：18766381667 <br>and <br>password：222222</i></p>

      <van-cell-group>
        <no-ssr>
          <ValidationObserver ref="observer" tag="form" v-slot="observer">
            <form @submit.prevent="login()">
              <ValidationProvider rules="required|mobile" v-slot="provider">
                <van-field v-model="formUsername" clearable label="联系人电话" right-icon="question-o" placeholder="请输入手机号码" required :error-message="provider.errors[0]" @click-right-icon="$toast('question')" />
              </ValidationProvider>
              <ValidationProvider rules="required|max:8|min:2" v-slot="provider">
                <van-field v-model="formPassword" type="password" label="密码" placeholder="请输入密码" required :error-message="provider.errors[0]" />
              </ValidationProvider>
              <button type="submit">Login</button>
            </form>
          </ValidationObserver>
        </no-ssr>
      </van-cell-group>

      <button @click="resetValidate">
        resetValidate
      </button>
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
    async login () {
      const isValid = await this.$refs.observer.validate();
      if (isValid) {
        let password = this.formPassword ? md5(this.formPassword) : '';
        this.$store.dispatch('login', { mobile: this.formUsername, password: password }).then((res) => {
          this.$toast.success(res.statusCode);
          this.formUsername = ''
          this.formPassword = ''
          this.formError = null

          if(res.data.access_token){
            this.common.setCookie('access_token',res.data.access_token)
            this.$store.state.access_token = res.data.access_token;
          }
          
        })
      }
    },
    resetValidate(){
      this.$refs.observer.reset();
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