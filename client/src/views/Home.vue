<template>
  <section class="home container">
    <Todo msg="Todo Vue.js - Victor Santaella Torres"/>
  </section>
</template>

<script>
// @ is an alias to /src
import Todo from '@/components/Todo.vue'

export default {
  name: 'home',
  components: {
    Todo
  }
}
</script>
