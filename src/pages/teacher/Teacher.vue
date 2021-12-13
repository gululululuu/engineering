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
  },
  methods: {
    getMyExcelData (data) {
      // data 为读取的excel数据，在这里进行处理该数据
      console.log(data)
    }
  }
}
</script>

<style>
</style>
