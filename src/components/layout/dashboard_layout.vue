<template>
    <div class="container-scroller">
        <!-- <top_navbar></top_navbar> -->

        <div class="container-fluid page-body-wrapper">
            
            <sidebar></sidebar>

            <div class="main-panel">
                <div class="content-wrapper">
                    <!-- <top_line_row></top_line_row> -->
                <router-view></router-view>

                <footer_nav></footer_nav>
                </div>
            </div>
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
    <!-- container-scroller -->
</template>
<!--  -->

<script>
    import { sidebar, footer_nav,  } from '@/components/index'

    export default {
        components: {
            sidebar, footer_nav
        }
    }
</script>


<style>

</style>