<template>
<div>
    <div class="row">
            <div class="col-lg-6">
		          <div class="page-heading">View Your report</div>
            </div>
            <div class="col-lg-6 text-right">
              <button style="marginTop:15px;outline:none"  type="button" class="btn btn-info back" @click="back"> Back</button>
            </div>
        </div>
    <!--<p>{{this.myUrl}}</p>-->
    <br><br>
     <div>
         <div  v-if="this.myUrl.split('.').pop().toLowerCase() == 'pdf'">
         <pdf :src="this.myUrl" style="display:inline-block; width:100%"></pdf>
         </div>
         <div class="text-center" v-else>
             <img :src = "this.myUrl" width="30%">
         </div>

     </div>
     <br>
     <br>
      <div class="text-center">
          <i class="bi bi-download"></i>
      <a :href="this.myUrl" defer target="_blank"><strong>Download Report</strong></a>
      </div>
      <br>
      <br>
</div>

</template>
<script>
import EventBus from '../../../../event-bus';
import pdf from "vue-pdf";

export default {

    components:{
        pdf
    },

    data(){
        return{
          myUrl:this.$store.state.reportDetails


        }
    },

    mounted(){
        
         EventBus.$on('getLink', (payLoad) => {
            console.log(payload)
            this.myUrl = payload
});
    },

    created(){

        

    
    },

    methods:{
        back(){
            //this.$router.push(`submit-report`);
           // window.history.back();
           // location.reload();
            this.$router.back();
        }
    }
    
}
</script>
<style scoped>

</style>