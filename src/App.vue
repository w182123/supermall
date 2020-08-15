<template>
  <div id="app">
  <keep-alive exclude="Details">
    <router-view></router-view>
  </keep-alive>
  <main-tabbar></main-tabbar>
  </div>
</template>

<script>
import MainTabbar from 'components/content/mainTabbar/maintabbar'
export default {
  name: 'App',
  components: {
    MainTabbar
  }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
