<template>
    <div>
        <h3><span v-html="$t('marks_student_subject')"/></h3>
        <hr>
        <br>
        <div>
             <select class="form-control groupFilter"  v-model="academicDetails" v-on:change="getGradesAndSections()">
                  <option v-for="academic in academicYearsData.academics" v-bind:value="{passingyear: academic.passingyear,academicyearid: academic.id,syllabustype:academic.syllabustype,syllabusid:academic.syllabusid}" >{{academic.passingyear}} - {{academic.syllabustype}} 
                      <div v-if="academic.active === 1"> - Active </div></option>
            </select>
            <select class="form-control groupFilter"  v-model="gradesDetails"  v-on:change="getClassroomStudents()">
                <option v-for="grades in gradesAndSubjects" v-bind:value="{gradename:grades.gradename,sectionname:grades.sectionname,gradeid:grades.gradeid,classroomid:grades.id}">{{grades.gradename}} - {{grades.sectionname}}</option>
            </select>
            <select class="form-control groupFilter" v-model="studentid" v-on:change="getStudentMarksInClusteredBar()">
                <option v-for="student in studentsList" v-bind:value="student.id">{{student.name}}</option>
            </select>
            <select class="form-control groupFilter" @change="selectClusterbar()" v-model="clusteredId">
                <option v-for="(test,index) in testsInClusteredBarMap" v-bind:value="index">{{test}}</option>
            </select>
        </div>
        <br>
        <br><hr>
        <div v-if="dataAvailability==true"> 
            <!-- <column-chart download="data" xtitle="Subjects" ytitle="Marks" :data="booksdata" :key="componentKey" :messages="{empty: 'No data'}" :min="0" :max="maxNumber"  style="height: 350px; width:900px"></column-chart> -->
            <highcharts :options="options" style="height: 400px; min-width: 310px; max-width: 800px; "></highcharts>

        </div>
       <div v-else>
            <h4 style="margin-top:30px;margin-left;200px"><b>Data was not avaliable</b></h4>
        </div>
    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';
    export default{
        props:['classes'],
        data(){
            return{
                tenantId:this.$cookie.get('id'),
                clusteredId:0,
                componentKey:0,
                testsInClusteredBarMap:[],
                marksInClusteredBarMap:[],
                // maxNumber:100,
                academicDetails:'',
                gradesDetails:'',
                studentid:'',
                studentsList:[],
                academicYearsData:[],
                gradesAndSubjects:[],
                dataAvailability:false,
              /*   userId:{
                    id:this.$cookie.get('userid')
                },*/
                options:{
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Student Marks'
                    },
                     xAxis: {
                        categories: [],
                        crosshair: true
                    },
                     yAxis: {
                        min: 0,
                        title: {
                            text: 'Average Marks'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px;border-collapse: collapse">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                     plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: "High Score", 
                        data: []
                    },
                    {
                        name: "Low Score", 
                        data: []
                    },
                    {
                        name: "Your Score", 
                        data: []
                    }]
                }
            }
        },
        created(){
           this.selectAcadamicYear();
        },
         methods:{
              selectAcadamicYear:function(){
                 UserService.AcademicYears(this.tenantId).then((response)=>{
                    this.academicYearsData = response.data;
                    if(this.academicYearsData.academics.length>0){
                      this.academicDetails={
                        passingyear: this.academicYearsData.academics[0].passingyear,
                        academicyearid: this.academicYearsData.academics[0].id,
                        syllabustype:this.academicYearsData.academics[0].syllabustype,
                        syllabusid:this.academicYearsData.academics[0].syllabusid
                      }
                       this.getGradesAndSections();
                   }
                }).catch(error =>{
                    console.log(JSON.stringify(error.data))
                })
            },
            getGradesAndSections:function(){
                this.makeClusterBarIsEmpty();
                this.studentsList=[];
                UserService.getGradesAndSections(this.tenantId,this.academicDetails.passingyear,this.academicDetails.syllabustype).then((response)=>{
                    this.gradesAndSubjects=response.data.gradesAndSectionsList
                    if(this.gradesAndSubjects.length>0){
                        this.gradesDetails={
                            gradename:this.gradesAndSubjects[0].gradename,
                            sectionname:this.gradesAndSubjects[0].sectionname,
                            gradeid:this.gradesAndSubjects[0].gradeid,
                            classroomid:this.gradesAndSubjects[0].id
                        }
                      this.getClassroomStudents();
                    }else{                       
                       this.gradesAndSubjects=[];
                    }
                    this.forceRerender();
                 })
            }, 
            getClassroomStudents : function(){
                this.makeClusterBarIsEmpty();
             let obj = {
                 classroomid:this.gradesDetails.classroomid,
                 gradeid:this.gradesDetails.gradeid
               }
             UserService.SectionDetails(obj,this.tenantId).then((response)=>{
                this.studentsList=response.data.studentsOfClassRoom;
                    if(this.studentsList.length>0){
                        this.studentid=this.studentsList[0].id;
                        this.getStudentMarksInClusteredBar();
                    }
                    else{
                        this.studentsList=[];
                    }
                  this.forceRerender();
               })
           },
           makeClusterBarIsEmpty:function(){
               this.options.xAxis.categories=[]; 
                this.options.series[0].data=[];
                this.options.series[1].data=[];
                this.options.series[2].data=[];
                this.testsInClusteredBarMap=[];
                this.marksInClusteredBarMap=[];
                this.dataAvailability=false;
           },
         getStudentMarksInClusteredBar: function(){
            this.makeClusterBarIsEmpty();
            UserService.getStudentMarksInClusteredBar(this.tenantId, this.academicDetails.academicyearid,this.gradesDetails.classroomid,this.studentid).then((response)=>{
                    this.marksInClusteredBarMap = response.data.resultsMap.analytics;
                    if(Object.keys(this.marksInClusteredBarMap).length>0){
                         this.testsInClusteredBarMap = Object.values(Object.keys(this.marksInClusteredBarMap));
                        this.selectClusterbar();
                        this.dataAvailability=true;
                    }
                })
                 this.forceRerender();
        },
        selectClusterbar:function(){
            this.options.xAxis.categories=[]; 
            this.options.series[0].data=[];
            this.options.series[1].data=[];
            this.options.series[2].data=[];

            let listOfSubjects = Object.keys(Object.values(Object.values(this.marksInClusteredBarMap)[this.clusteredId])[0]);
            for(let k=0;k<listOfSubjects.length;k++){
                 this.options.xAxis.categories[k]=listOfSubjects[k];
            }
            let listOfSubjectsData = Object.values(Object.values(Object.values(this.marksInClusteredBarMap))[this.clusteredId]);          
            let subjectMaxMarks = Object.values(listOfSubjectsData[0]);
            let studentMarks = Object.values(listOfSubjectsData[1]);
            let subjectMinMarks = Object.values(listOfSubjectsData[2]);
            for(let u=0;u<subjectMaxMarks.length;u++){
                this.options.series[0].data[u]= [subjectMaxMarks[u].maxmarks];
                this.options.series[1].data[u]= [subjectMinMarks[u].minmarks];
                this.options.series[2].data[u]= [studentMarks[u].marks];   
                
            } 
            this.forceRerender(); 
        },
        forceRerender() {
          this.componentKey += 1;
         }
      }
    }
</script>
<style scoped>
.groupFilter{
  float:left;
  width:25%
}
</style>