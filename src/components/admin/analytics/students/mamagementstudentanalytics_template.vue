<template>
    <div class="container-fluid">
        <h2><span v-html="$t('no_students_grade')"/></h2>
        <hr>
        <select class="form-control gradeFilter"  style="width:21%;margin-right:7px"  v-model="academicDetails" v-on:change="NumberOfStudentByGrades()">
            <option v-for="academic in academicYearsData.academics" v-bind:value="{passingyear: academic.passingyear,academicyearid: academic.id,syllabustype:academic.syllabustype,syllabusid:academic.syllabusid}" >{{academic.passingyear}} - {{academic.syllabustype}} 
                <div v-if="academic.active === 1">( Active )</div></option>
            </select>
        <br><br><br>
        <column-chart download="data" :data="studentsData" style="height: 380px; width:1000px" :messages="{empty: 'No data'}"></column-chart>
    </div>
</template>
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
                academicDetails:''
            }
       },

created(){
    this.selectAcadamicYear();
  },
 methods:{
     selectAcadamicYear:function(){  
        UserService.AcademicYears(this.tenantId).then((response)=>{
        this.academicYearsData = response.data;
        this.academicDetails={
                    passingyear: this.academicYearsData.academics[0].passingyear,
                    academicyearid: this.academicYearsData.academics[0].id,
                    syllabustype:this.academicYearsData.academics[0].syllabustype,
                    syllabusid:this.academicYearsData.academics[0].syllabusid
                }  
        this.NumberOfStudentByGrades();
    }).catch(error =>{
        console.log(JSON.stringify(error.data))
    }) 
   },
    NumberOfStudentByGrades:function(){
         UserService.NumberOfStudentByGrades(this.tenantId,this.academicDetails.passingyear,this.academicDetails.syllabustype).then((response)=>{
          let studentsCountByGrade = response.data.resultsMap.analytics;
          let studentCount=[];
          for(let i=0;i<studentsCountByGrade.length;i++){
             studentCount[i]=[studentsCountByGrade[i].gradename,studentsCountByGrade[i].numberofstudents];
           }
        this.studentsData=studentCount;
        })
    }
 },
  mounted(){
  }
}
</script>
