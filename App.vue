<template>
  <div id="app">
    <UsePage />
    <!-- <div
      v-for="(userFormData, userFormId) in userformData"
      :key="userFormId">
      <use-test
        :controlId="userFormId"
        :userFormId="userFormId"
      />
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import UsePage from '@/FormDesigner/components/pages/FDPage/index.vue'
import UseTest from '@/FormDesigner/components/atoms/UseTest/index.vue'

@Component({
  name: 'FdApp',
  components: {
    UsePage,
    UseTest
  }
})
export default class FdApp extends Vue {
  @State(state => state.fd.userformData) userformData!: userformData
}
</script>

<style >
*{
  -webkit-user-select: none; /* Safari */
  -ms-user-select: none; /* IE 10+ and Edge */
  user-select: none; /* Standard syntax */
}
</style>
