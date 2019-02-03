<template>
  <section class="container">
    <Chat></Chat>
  </section>
</template>

<script>
// @ is an alias to /src
import Chat from '@/components/Chat.vue'

export default {
  name: 'chat',
  components: {
    Chat
  }
}
</script>
