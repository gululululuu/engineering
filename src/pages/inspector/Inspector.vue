<template>
  <div>
    <Navigation></Navigation>
    <Backgroud></Backgroud>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Backgroud from '../../components/Backgroud.vue'
export default {
  name: 'Inspector',
  components: {
    Backgroud,
    Navigation
  }
}
</script>

<style>
</style>
