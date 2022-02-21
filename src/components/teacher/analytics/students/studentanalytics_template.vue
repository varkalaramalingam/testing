<template>
    <div>
        <div class="col-lg-2 adminreset-padding adminreset-margin">
            <sidebar></sidebar>
        </div>
        <div class="col-lg-10">
            <router-view v-bind:classes="classes"></router-view>
        </div>
    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import studentanalyticssidebar from './studentanalyticssidebar_template.vue';
export default{
      props:['school','userdetails','acdemicyearandboard','userid'],
      components:{
        'sidebar':studentanalyticssidebar
    },
    data(){
        return{
            classes:[],
            userId:{
                    id:this.userid
                },
            id:this.$cookie.get('id')
        }
    },
    created(){
        UserService.MyClass(this.userId,this.id).then((response)=>{
            console.log(response);
            this.classes=response.data
        })
    },
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