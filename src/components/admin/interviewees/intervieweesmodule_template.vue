<template>
  <div>    
   
    <div class="col-lg-2 adminreset-padding adminreset-margin">
        <sidebar></sidebar>
    </div>
    <div class="col-lg-10">
        <router-view v-bind:school="school" v-bind:userdetails="userdetails" v-bind:acdemicyearandboard="acdemicyearandboard"></router-view>
    </div>
</div>

</template>
<script>
import sidebar from './intervieweessidebar_template.vue';
export default{
    props:['school','userdetails','acdemicyearandboard'],
    components:{
        'sidebar':sidebar
    }

}
</script>
<style>
.adminreset-padding{
    padding:0;
}
.adminreset-margin{
    margin:0
}
</style>
