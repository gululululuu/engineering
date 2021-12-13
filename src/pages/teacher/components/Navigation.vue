<template>
  <div class="Header">
    <ul class="nav">
      <router-link custom v-slot="{ navigate }" to="/">
        <li @click="navigate" @keypress.enter="navigate" role="link">
          <p>主页</p>
        </li>
      </router-link>
      <router-link custom v-slot="{ navigate }" to="/score">
        <li @click="navigate" @keypress.enter="navigate" role="link">
          <p>成绩管理</p>
        </li>
      </router-link>
      <router-link custom v-slot="{ navigate }" to="/curriculum">
        <li @click="navigate" @keypress.enter="navigate" role="link">
          <p>课程管理</p>
        </li>
      </router-link>
      <router-link custom v-slot="{ navigate }" to="/investigation">
        <li @click="navigate" @keypress.enter="navigate" role="link">
          <p>问卷调查</p>
        </li>
      </router-link>
      <router-link custom v-slot="{ navigate }" to="/personalCenter">
        <li @click="navigate" @keypress.enter="navigate" role="link" class="personalCenter">
          <p>个人中心</p>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Navigation'
}
</script>

<style lang="stylus" scoped>
  .Header
    margin : 0
    .nav
      list-style-type: none
      margin: 0
      padding: 0
      overflow: hidden
      background-color: skyblue
      li
        float : left
        :hover
          background-color: #555
        p
          margin : 0
          width : 80px
          height: 50px
          line-height: 50px
          font-size: 16px
          font-family: '宋体'
          text-align: center
          color : white
          cursor:pointer
        a
          display: block
          text-align: center
          padding: 14px 32px
          text-decoration: none
      .personalCenter
        float : right
        background-color : #546E7A
</style>
