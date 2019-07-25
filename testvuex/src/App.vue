<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import style from '../static/css/common.css'
export default {
  name: 'App',
  data:() => ({
    style,
  })
}
</script>

<style>
</style>
