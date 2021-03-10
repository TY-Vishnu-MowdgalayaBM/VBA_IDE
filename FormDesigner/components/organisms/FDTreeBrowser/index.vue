<template >
  <div class="tree" style="min-height:'50px';marginLeft:'20px'">
    <div v-bind:key="userFormId" v-for="(userForm,userFormId) in usrFrmData">
      <span style="margin-left:20px" @click="dispalyUserform(userFormId)">
        <UserFormLogo />
        {{userForm.properties.Name}}
      </span>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IupdateUserform } from '@/storeModules/fd/actions'
import UserFormLogo from '../../../../assets/user-from.svg'
import { State, Action } from 'vuex-class'

@Component({
  name: 'TreeBrowser',
  components: { UserFormLogo }
})
export default class TreeBrowser extends Vue {}
</script>

<style scoped>
.tree {
position: absolute;
  height: calc(100% - 69px);
  width: -webkit-fill-available;
  overflow-y: auto;
  z-index: 1;
  top: 30;
  left: 0
}
.node {
  text-align: left;
}
ul {
  display: block;
  list-style-type: disc;
  margin-block-start: 7px;
  margin-block-end: 1px;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px;
  cursor: pointer;
}
</style>
