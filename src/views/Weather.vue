<template>
    <section>
      <Weather></Weather>
    </section>
</template>

<script>
  import Weather from '@/components/Weather.vue'

  export default {
    name: 'home',
    components: {
      Weather
    }
  }
</script>