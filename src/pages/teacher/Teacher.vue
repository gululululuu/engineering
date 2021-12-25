<template>
  <div>
    <Navigation></Navigation>
    <Backgroud></Backgroud>
    <Upload @getResult="getMyExcelData"></Upload>
  </div>
</template>

<script>
import Navigation from './components/Navigation.vue'
import Upload from '../../components/Upload.vue'
import Backgroud from '../../components/Backgroud.vue'
export default {
  name: 'Teacher',
  components: {
    Upload,
    Navigation,
    Backgroud
  }
}
</script>

<style>
</style>
