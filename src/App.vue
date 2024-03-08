<template>
  <div id="app">
    <div>
      <router-view></router-view>
      <notifications id="notifications" />
    </div>
  </div>
</template>
<script>


</script>
<style scoped>
#id {
  font-family: -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, Arial, sans-serif;
  color: #1e1e23;
}

#notifications {
  z-index: 3000;
}
</style>