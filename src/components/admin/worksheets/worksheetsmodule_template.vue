<template>
  <div>    
   
    <div class="col-lg-2 adminreset-padding adminreset-margin">
        <worksheets-side-bar></worksheets-side-bar>
    </div>
    <div class="col-lg-10">
        <router-view></router-view>
    </div>
</div>

</template>
<script>
import WorksheetsSideBar from './worksheetssidebar_template.vue'; 
export default{
    components:{
        WorksheetsSideBar
    }

}
</script>
