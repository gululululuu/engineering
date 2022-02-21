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
  name: 'Teacher',
  components: {
    Navigation,
    Backgroud
  },
  created () {
    this.initCoefficients()
    this.initWeight()
  },
  methods: {
    initCoefficients () {
      let coefficients = [
        ['0.100', '0.100', '0.100', '0.100'],
        ['0.100', '0.200', '0.300', '0.200'],
        ['0.100', '0.200', '0.000', '0.200'],
        ['0.700', '0.500', '0.600', '0.500']
      ]
      localStorage.setItem('coefficients', JSON.stringify(coefficients))
      console.log(JSON.parse(localStorage.getItem('coefficients')))
    },
    initWeight () {
      let weight = ['0.6', '0.2', '0.2']
      localStorage.setItem('weight', JSON.stringify(weight))
      console.log(JSON.parse(localStorage.getItem('weight')))
    }
  }
}
</script>

<style>
</style>
