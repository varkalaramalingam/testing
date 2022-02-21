<template>
    <div class="container-fluid">
        <h2><span v-html="$t('no_students_board')"/></h2>
        <hr>
         <select class="form-control gradeFilter"  style="width:21%;margin-right:7px"  v-model="academicYear" v-on:change="NumberOfStudentByBoards()">
            <option v-for="academic in academicYearsData" v-bind:value="academic.passingyear" >{{academic.passingyear}}
                 <div v-if="academic.active === 1"> - Active </div>
                </option>
            </select>
        <br><br><br>
        <br>
        <pie-chart width="800px" height="500px"  download="data"  :data="studentsData" style="height: 380px; width:700px" :messages="{empty: 'No data'}"></pie-chart>
    </div>
</template>
//:donut="true"
<script>
import UserService from '../../../../services/userService.js';
import moment from 'moment'
 export default{
      props:['school','userdetails','acdemicyearandboard','academicsandboards'],
       data(){
            return{
                tenantId:this.$cookie.get('id'),
                studentsData:[],
                academicYearsData:'',
                academicDetails:'',
                academicYear:0
            }
       },

created(){
    this.getAcademicYearsOnly()
  },
 methods:{
     getAcademicYearsOnly:function(){
         UserService.getAcademicYearsOnly(this.tenantId).then((response)=>{   
             this.academicYearsData = response.data;
             this.academicYear = this.academicYearsData[0].passingyear;
             this.NumberOfStudentByBoards();
         })
     },
    NumberOfStudentByBoards:function(){
         UserService.NumberOfStudentByBoards(this.tenantId,this.academicYear).then((response)=>{
         let studentsCountByBoards = response.data.resultsMap.analytics;
         let studentCount=[];
          for(let i=0;i<studentsCountByBoards.length;i++){
             studentCount[i]=[studentsCountByBoards[i].syllabustype, studentsCountByBoards[i].numberofstudents];
           }
        this.studentsData=studentCount;
        })
    }
 },
  mounted(){
  }
}
</script>
