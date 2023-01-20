<template>
  <div id="app">
    <Home></Home>
  </div>
</template>
<script>
import Home from "@/views/Home";
export default {
  name: "App",
  components: {
    Home
  }
}
</script>
<style lang="scss">

#app {
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #f1f1f1;
}
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
</style>
