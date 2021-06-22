<template>
 <form class="card" @submit.prevent="onSubmit">
   <h1> Войти в систему </h1>
   <div :class="['form-control', {invalid: eError}]">
     <label for="email"> Email</label>
     <input type="text" id="email" v-model="email" @blur="eBlur">
     <small v-if="eError">{{ eError }}</small>
   </div>
   <div :class="['form-control', {invalid: pError}]">
     <label for="password"> Пароль </label>
     <input type="text" id="password" v-model="password" @blur="pBlur">
     <small v-if="pError">{{ pError }}</small>
   </div>
   <button class="btn primary" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
   <span class="text-danger" v-if="isTooManyAttempts"> Слишком много неверных попыток.</span>
 </form>
</template>

<script>
import { useLoginForm } from '../use/login-form'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import {defineComponent} from 'vue'
import Error from '../utils/Error'

export default defineComponent( {
  setup () {
    const store = useStore()
    const route = useRoute()
    if(route.query.message) {
      store.dispatch('setMessage', {
        value: new Error(route.query.message).getErrorStatus(),
        type: 'warning'
      })
    }
    return {...useLoginForm()}
  }
})
</script>

<style scoped>

</style>