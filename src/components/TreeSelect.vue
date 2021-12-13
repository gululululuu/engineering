<template>
  <div>
      <tree-select
        :options="options"
        :searchable="true"
        :open-on-click="true"
        :clearable="false"
        placeholder=" "
        v-model="value"
      />
    </div>
</template>

<script>
// import { mapActions } from 'vuex'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'CustomTreeSelect',
  components: { TreeSelect },
  data () {
    return {
      value: null,
      options: [{
        id: '1',
        label: '2021-2022-2'
      //   children: [{
      //     id: 'aa',
      //     label: 'aa'
      //   }, {
      //     id: 'ab',
      //     label: 'ab'
      //   }]
      }, {
        id: '2',
        label: '2021-2022-1'
      }, {
        id: '3',
        label: '2020-2021-2'
      }, {
        id: '4',
        label: '2020-2021-1'
      }, {
        id: '5',
        label: '2019-2020-2'
      }, {
        id: '6',
        label: '2019-2020-1'
      }, {
        id: '7',
        label: '2018-2019-2'
      }, {
        id: '8',
        label: '2018-2019-1'
      }]
    }
  }
}
</script>

<style>
</style>
