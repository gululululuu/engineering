<template>
  <div class="backgroud">
    <p class="texts">欢迎使用<br />&emsp;&emsp;&emsp;本系统!</p>
    <img class="bgImg" src="../assets/img/backgroundImage.jpg"/>
  </div>
</template>

<script>
export default {
  name: 'Backgroud'
}
</script>

<style lang="stylus" scoped>
  .backgroud
    margin : 0
    padding : 0
    height : 550px
    .texts
      font-family : '宋体'
      font-size : 50px
      color : #546E7A
      position : absolute
      right : 200px
      top: 200px
    .bgImg
      width : 100%
      overflow : hidden
      z-index : -1
</style>
