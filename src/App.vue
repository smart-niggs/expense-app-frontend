<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import { toast } from '@/scripts/functions/'

export default {
  name: 'app',
  
  components: {
    // HelloWorld
  },

  created() {
			(this.$store.dispatch('auth/autoLogin')) ? '' : toast(this, 'Token Expired!!' , 'danger')
		},
}
</script>

<style>
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */

.dropdown-item {
  color: black !important
}
.deactivate {
  color: red !important
}
</style>
