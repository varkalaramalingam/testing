<template>
<div>
    <br><br>
    <div>
        <select class="form-control groupFilter"  v-model="academicDetails" v-on:change="getGradesAndSections()">
            <option v-for="academic in academicYearsData.academics" v-bind:value="{passingyear: academic.passingyear,academicyearid: academic.id,syllabustype:academic.syllabustype,syllabusid:academic.syllabusid}" >{{academic.passingyear}} - {{academic.syllabustype}} 
            <div v-if="academic.active === 1"> - Active </div></option>
        </select>
        <select class="form-control groupFilter"  v-model="classroomid"  v-on:change="getBoysAndGirlsAverageMarks()">
            <option v-for="grades in gradesAndSubjects" v-bind:value="grades.id">{{grades.gradename}} - {{grades.sectionname}} - {{grades.teachername}}</option>
        </select>
        <select class="form-control groupFilter" @change="getAverageOfStudentResults()" v-model="testId">
                <option v-for="(test,index) in studentsTestsList" v-bind:value="index">{{test}}</option>
        </select>
    </div><br><br><br>
     <div v-if="dataAvailability==true">
        <!-- <highcharts :options="options"  style="height: 400px; min-width: 310px; max-width: 800px; "></highcharts> -->
         <highcharts :options="options" style="height: 400px; min-width: 310px; max-width: 800px; "></highcharts>
    </div>
    <div v-else>
         <h4> No data Avaliable</h4>
     </div>  
</div>
</template>
<script>

import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import loadStock from 'highcharts/modules/stock';
import UserService from '../../../../services/userService.js';
loadMap(Highcharts);
loadStock(Highcharts);
    export default{
        data(){
            return{
                dataAvailability:false,
                tenantId:this.$cookie.get('id'),
                componentKey:0,
                academicDetails:'',
                classroomid:0,
                academicYearsData:[],
                gradesAndSubjects:[],
                studentsTestsList:[],
                tooltipStatus:'',
                girslAndBoysMarksAverages:[],
                testId:0,
                options:{
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Boys And Girls Averages'
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
                                color:"green",
                                name: 'Boys Average',
                                data: []
                            }, {
                                color:"#ff3333",
                                name: 'Girls Average',
                                data: []
                            }]

                }
          }
        },
         created(){
                this.selectAcadamicYear();
        }, methods:{
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
                this.makeBarChartIsEmpty();
                UserService.getGradesAndSections(this.tenantId,this.academicDetails.passingyear,this.academicDetails.syllabustype).then((response)=>{
                    this.gradesAndSubjects=response.data.gradesAndSectionsList;
                    if(this.gradesAndSubjects.length>0){
                      this.classroomid = this.gradesAndSubjects[0].id;
                      this.getBoysAndGirlsAverageMarks();
                    }else{
                        this.classroomid='';
                    }
                     this.forceRerender();
                 })
            }, 
             makeBarChartIsEmpty:function(){
                this.dataAvailability=false;
                this.girslAndBoysMarksAverages=[];
                this.studentsTestsList=[];
                this.options.xAxis.categories=[];   
                this.options.series[0].data=[];   
                this.options.series[1].data=[]; 
           },
           getBoysAndGirlsAverageMarks:function(){
               this.makeBarChartIsEmpty();
                UserService.getBoysAndGirlsAverageMarks(this.tenantId,this.academicDetails.academicyearid,this.classroomid).then((response)=>{
                    this.girslAndBoysMarksAverages = response.data.resultsMap.analytics;
                     if(Object.keys(this.girslAndBoysMarksAverages).length>0){
                         this.dataAvailability=true;
                        this.studentsTestsList = Object.values(Object.keys(this.girslAndBoysMarksAverages));
                        this.getAverageOfStudentResults();
                    }
                 })
           },
           getAverageOfStudentResults:function(){
               this.options.xAxis.categories=[];
               this.options.series[0].data=[]; 
               this.options.series[1].data=[];
            let listOfSubjects = Object.keys(Object.values(Object.values(this.girslAndBoysMarksAverages)[this.testId])[0]);
            for(let k=0;k<listOfSubjects.length;k++){
                 this.options.xAxis.categories[k]=listOfSubjects[k];
            }
            let listOfSubjectsData = Object.values(Object.values(Object.values(this.girslAndBoysMarksAverages))[this.testId]);          
            let boysAverageMarks = Object.values(listOfSubjectsData[0]);
            let girslAverageMarks = Object.values(listOfSubjectsData[1]);
            for(let i=0;i<boysAverageMarks.length;i++){
                 this.options.series[0].data[i]= [boysAverageMarks[i].boysAverage];
                 this.options.series[1].data[i]= [girslAverageMarks[i].girlsAverage];               
            }
            this.forceRerender(); 
           },
            forceRerender() {
                this.componentKey += 1;
             }
        }
    }
</script>
<style>
.highcharts-credits{
        display:none
    }
    .groupFilter{
        float:left;
        width:25%;
    }
#container {
    height: 400px; 
}

.highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 800px;
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #EBEBEB;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}

</style>