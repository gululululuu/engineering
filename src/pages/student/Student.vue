<template>
  <div class="student">
    <Navifation></Navifation>
    <Backgroud></Backgroud>
  </div>
</template>

<script>
import Navifation from './components/Navigation.vue'
import Backgroud from '../../components/Backgroud.vue'
export default {
  name: 'Student',
  components: {
    Navifation,
    Backgroud
  }
}
</script>

<style lang="stylus" scoped>
  .student
    margin : 0
    padding : 0
    height : 550px
</style>
