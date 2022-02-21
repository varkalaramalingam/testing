<template>
    <div>
        <div class="col-lg-2 adminreset-padding adminreset-margin">
            <sidebar></sidebar>
        </div>
        <div class="col-lg-10">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import managementanalyticssidebar from '../sidebar/managementanalyticssidebar_template';
export default{
      components:{
        'sidebar':managementanalyticssidebar
    }
}
</script>
