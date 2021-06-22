<template>
  <app-loader v-if="loading"></app-loader>
  <app-page back title="Заявка" v-else-if="request">
    <p><strong>Имя владельца: </strong> {{ request.fio }}</p>
    <p><strong>Номер телефона: </strong> {{ request.phone }}</p>
    <p><strong>Сумма: </strong> {{ currencyFormatter(request.amount) }}</p>
    <p><strong>Статус: </strong> <AppStatus :type="request.status"></AppStatus></p>

    <div class="form-control">
      <label for="status">Изменить статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>

    <button class="btn danger" @click="remove">Удалить</button>
    <button class="btn" @click="update" v-if="hasChanges">Обновить</button>
  </app-page>
  <h3 v-else class="text-center text-white">Заявки с id = {{ $route.params.id }} нет</h3>
</template>

<script>
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import {ref, onMounted, computed} from 'vue'
import AppPage from '../components/ui/AppPage'
import AppLoader from '../components/ui/AppLoader'
import AppStatus from '../components/ui/AppStatus'
import {currencyFormatter} from '../utils/currency-formatter'

export default {
  setup () {
    const route = useRoute()
    const store = useStore()
    const router = useRouter()
    const request = ref({})
    const loading = ref(true)
    const status = ref()
    const hasChanges = computed(() => request.value.status !== status.value)
    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadOne', route.params.id)
      loading.value = false
      status.value = request.value?.status
    })
    const update = async () => {
      const data = {...request.value, status: status.value, id: route.params.id}
      await store.dispatch('request/update', data)
      request.value.status = status.value
    }
    const remove = async () => {
      await store.dispatch('request/remove', route.params.id)
      await router.push('/')
    }
    return {
      loading,
      request,
      currencyFormatter,
      update,remove, status,
      hasChanges
    }
  },
  components: {
    AppPage, AppLoader, AppStatus
  }
}
</script>

<style scoped>

</style>