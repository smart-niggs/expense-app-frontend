<template>
    <!-- <div>   -->
      <!-- partial:partials/_sidebar.html -->    
      
      <nav class="sidebar sidebar-offcanvas sidebar-dark" id="sidebar">
        <ul class="nav">
          <li class="nav-item nav-profile">
            <!-- <img :src="(currentUser && currentUser.imageUrl) ? currentUser.imageUrl : '@/assets/images/faces/face12.jpg'" alt="profile image"> -->
            <!-- <img v-if="currentUser.imageUrl" :src="currentUser.imageUrl" alt="profile image">
            <img v-else src="@/assets/images/faces/face12.jpg" alt="profile image"> -->
            <!-- <p class="text-center font-weight-medium">{{ currentUser.email }}</p> -->
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)">
              <i class="menu-icon icon-layers"></i>
              <span class="menu-title"><router-link :to="'/dashboard'">Expenses</router-link></span>
              <!-- <div class="badge badge-success">3</div> -->
            </a>
          </li>
          
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" @click="logout">
              <i class="menu-icon icon-logout"></i>
              <span class="menu-title">Logout</span>
            </a>
          </li>
        </ul>
      </nav>
      <!-- partial -->
    <!-- </div> -->
</template>


<script>
  import { toast } from '@/scripts/functions/'
  export default {

    data() {
      return {
        
      }
    },

    computed: {
      // currentUser(){
        
      //   return this.$store.state.currentUser;
      // },    
      
      // userId() { 
      //   return this.currentUser.id;
      //   // return this.$store.state.userId 
      // },
      
  },

  methods: {			
    logout() {
      this.$store.dispatch('auth/logout');
      toast(this, 'User has Logged Out!!')
    }
  }
}
</script>

<style>

</style>
