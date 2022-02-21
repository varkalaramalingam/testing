<template>
   <div>
      <div class="col-lg-12 reset-padding reset-margin">
        <div class="text-left">
           <h3 class="student-head"><span v-html="$t('assigned_books')"/> : {{myclassDetails.gradename}} - {{myclassDetails.sectionname}}</h3>
        </div>
        <hr>
        <div style="width:100%">
          <button  :class="['status-btn',notReturnedClass]" @click="getAssignedBooksListByStatus(statusDetails.notReturned)">Not returned</button>
          <button  :class="['status-btn',returnedClass]"  @click="getAssignedBooksListByStatus(statusDetails.returned)">Returned</button>
        </div>
        <br>
      </div>
         <div v-if="selectedStatus==1" >
            <NotReturnedBooks></NotReturnedBooks>
        </div>
        <div v-if="selectedStatus==2">
            <ReturnedBooks></ReturnedBooks>
        </div>
   </div>
</template>
<script>
import ReturnedBooks from '../books/returnedbooks.vue';
import NotReturnedBooks from '../books/not_returnedbooks.vue';

export default{
    components: { NotReturnedBooks,ReturnedBooks},
    data(){
        return{  
            myclassDetails:{},
            statusDetails:{notReturned:1,returned:2},
            notReturnedClass:'status-btn-click',
            returnedClass :'',
            selectedStatus:1
        }
    },
    created(){
        this.myclassDetails= this.$store.state.myClass;
    },
    methods:{
         getAssignedBooksListByStatus : function(status){
             this.selectedStatus = status;
             if(status == 1){
                this.notReturnedClass = 'status-btn-click';
                this.returnedClass ='';
            }else if(status == 2){
                 this.notReturnedClass = '';
                this.returnedClass ='status-btn-click';
            }
         }
    }
}
</script>

<style scoped>
.status-btn{
  background-color: white; 
  color: black; 
  padding: 6px 7px;
  border: 2px solid #008CBA;
}
.status-btn-click{
  background-color: #008CBA;
  color: white;
}
</style>