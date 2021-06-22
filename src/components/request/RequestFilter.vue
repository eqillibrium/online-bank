<template>
  <div class="filter">
    <div class="form-control">
      <input type="text" placeholder="Начните вводить имя" v-model="name">
    </div>
    <div class="form-control">
      <select v-model="status">
        <option disabled selected>Выберите статус заявки</option>
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполнятся</option>
      </select>
    </div>
    <button class="btn danger" v-if="active" @click="reset">Сбросить фильтр</button>
  </div>
</template>

<script>
import {ref, watch, computed} from 'vue'
export default {
  emits: ['update:modelValue'],
  props: ['modelValue'],
  setup (_, {emit}) {
    const name = ref()
    const status = ref()
    const active = computed(() => name.value || status.value)

    watch([name, status], values => {
      emit('update:modelValue', {
        name: values[0],
        status: values[1]
      })
    })

    return {
      name,
      status,
      active,
      reset: () => {
        name.value = ''
        status.value = null
      }
    }
  }
}
</script>

<style scoped>

</style>