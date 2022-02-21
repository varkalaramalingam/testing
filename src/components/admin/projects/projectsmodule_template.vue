<template>
  <div>    
   
    <div class="col-lg-2 adminreset-padding adminreset-margin">
        <projects-side-bar></projects-side-bar>
    </div>
    <div class="col-lg-10">
        <router-view></router-view>
    </div>
</div>

</template>
<script>
import ProjectsSideBar from './projectssidebar_template.vue'; 
export default{
    components:{
        ProjectsSideBar
    }

}
</script>
