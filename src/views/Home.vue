<template>
  <AppLoader v-if="loading"></AppLoader>
  <AppPage title="Список заявок" v-else>
    <template #header >
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>
    <RequestFilter v-model="filter"></RequestFilter>
    <RequestTable :requests="requests"></RequestTable>
    <teleport to="body">
      <app-modal title="Создать заявку" @close="close" v-if="modal">
        <request-modal @created="close"></request-modal>
      </app-modal>
    </teleport>
  </AppPage>
</template>

<script>
import {ref, computed, onMounted} from 'vue'
import {useStore} from 'vuex'
import AppPage from '../components/ui/AppPage'
import RequestTable from '../components/request/RequestTable'
import AppModal from '../components/ui/AppModal'
import RequestModal from '../components/request/RequestModal'
import AppLoader from '../components/ui/AppLoader'
import RequestFilter from '../components/request/RequestFilter'

export default {
  setup () {
    const store =useStore()
    const modal = ref(false)
    const loading = ref(false)
    const filter = ref({})
    const requests = computed(() => store.getters['request/requests']
        .filter(request => {
          if(filter.value.name){
            return request.fio.includes(filter.value.name)
          }
          return request
        })
        .filter(request => {
          if(filter.value.status) {
            return filter.value.status === request.status
          }
          return  request
        })
    )
    onMounted(async () => {
      loading.value = true
      await store.dispatch('request/load')
      loading.value = false
    })
    return {
      modal,
      close: () => modal.value = false,
      requests,
      loading,
      filter
    }
  },
  components: {
    AppPage, RequestTable, AppModal, RequestModal, AppLoader, RequestFilter
  }
}
</script>
