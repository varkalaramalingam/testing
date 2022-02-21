<template>
    <div>    
        <div class="col-lg-2 transportreset-padding transportreset-margin">
            <sidebar></sidebar>
        </div>
        <div class="col-lg-10">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import sidebar from '../sidebar/transportsidebar_template.vue';
export default{
    components:{
        'sidebar':sidebar
    }

}
</script>
<style>
.transportreset-padding{
    padding:0;
}
.transportreset-margin{
    margin:0
}
</style>
