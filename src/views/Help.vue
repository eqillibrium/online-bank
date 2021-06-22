<template>
  <AppPage back title="Помощь">
    <question-item
        v-for="q in questions"
        :key="q.id"
        :question="q"
    ></question-item>
  </AppPage>
</template>

<script>
import {ref} from 'vue'
import AppPage from '../components/ui/AppPage'
import QuestionItem from '../components/question/QuestionItem'
export default {
  components: {AppPage, QuestionItem},
  setup () {
    const questions = ref([
      {
        id: 1,
        title: 'Lorem ipsum dolor sit amet.',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, numquam.'
      },
      {
        id: 2,
        title: 'Lorem ipsum dolor sit amet.',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, numquam.'
      }
    ])
    return {questions}
  }
}
</script>
