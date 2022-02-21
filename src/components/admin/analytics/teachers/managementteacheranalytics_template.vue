<template>
    <div class="container-fluid">
        <h2><span v-html="$t('teachers_analytics')"/></h2>
        <hr>
        <br> 

        <div>
        <select class="form-control groupFilter"  v-model="academicDetails" v-on:change="getTeacherDetails()">
            <option v-for="academic in academicYearsData.academics" v-bind:value="{passingyear: academic.passingyear,academicyearid: academic.id,syllabustype:academic.syllabustype,syllabusid:academic.syllabusid}" >{{academic.passingyear}} - {{academic.syllabustype}} 
                <div v-if="academic.active === 1"> - Active </div></option>
        </select>
        <select class="form-control groupFilter" v-model="teacherId" v-on:change="getTeachersPerformanceBasedOnTheClassMarks()">
                <option value="" disabled> All </option>
                <option v-for="teacher in teacherDetails" v-bind:value="teacher.teacherid">{{teacher.teachername}}</option>
        </select>
        </div> <br><br><hr>

        <div v-if="dataAvailability==true">
        <div style="width:100%">
            <button  :class="['status-btn',ClassWide]" @click="getClassroomMarksInBoxPlot(statusDetails.ClassWide)">Class Wide</button>
            <button  :class="['status-btn',testWide]"  @click="getClassroomMarksInBoxPlot(statusDetails.testWide)">Test Wide</button>
        </div><hr>
        <div v-if="selectedStatus==2">
            <select class="form-control groupFilter" @change="selectClassroom()" v-model="classroomId">
                <option v-for="(classroom,index) in listOfClassrooms"  v-bind:value="index">{{classroom}}</option>
            </select>
        <br> <br><hr style="float:left;width:200px">
        </div> 
         <highcharts :options="options" :key="componentKey" style="height: 500px; width:700px" ></highcharts>     
         <br><hr>
         <h4>Points</h4>
        <span>1.Online Box Plot
        <a href="https://www.desmos.com/calculator/h9icuu58wn" target="_blank"> IDE </a> for calculate the Quartiles  </span><br><br>
        <pre v-if="selectedStatus==1">2.Test Wide:<br>    1.Green Dot: A Single student with single test mean value
        <br>    2.Red Dot: All Students with single test mean value
        <br>    3.Green Line: A Single student with all tests mean values
        <br>    4.Red Line: All students with all tests mean values
        </pre>
        <pre v-if="selectedStatus==2">2.Subject Wide:<br>    1.Green Dot: A Single student Marks
        <br>    2.Red Dot: All Students with single subject mean value
        <br>    3.Green Line: A Single student with all subjects mean values in the single test only
        <br>    4.Red Line: All students with all subjects mean values in the single test only
      </pre>
    </div>    
    <div v-else>
      <h4> No data Avaliable</h4>
    </div>   
        <br><br>
        <div class="dendogram">
            <tree  :zoomable="zoomable" :data="treeData" :node-text="nodeText"  type="tree" layout-type="euclidean" class="tree_style" />
        </div>
       

    </div>
</template>
<script>
import {tree} from 'vued3tree';
import Highcharts from 'highcharts';
import loadStock from 'highcharts/modules/stock';
import loadSunBurst from 'highcharts/modules/sunburst';
import loadExporting from 'highcharts/modules/exporting';
import UserService from '../../../../services/userService.js';
loadStock(Highcharts);
loadSunBurst(Highcharts);
loadExporting(Highcharts);
export default{
    components:{
        tree
    },
    data(){
        return{
        tenantId:this.$cookie.get('id'),
        componentKey:0,
        statusDetails:{ClassWide:1,testWide:2},
        ClassWide:'status-btn-click',
        testWide:'',
        selectedStatus:0,
        classroomId:0,
        academicDetails:'',
        gradesDetails:'',
        studentid:'',
        studentsList:[],
        teacherDetails:[],
        teacherId:0,
        dataAvailability:false,
        academicYearsData:[],
        gradesAndSubjects:[],
        listOfClassroomMarks:[],
        listOfClassrooms:[],
         userId:{
            id:0
        },
        studentAcademicDetails:this.$store.state.studentAcademicDetails,
        type: 'tree',
        layoutType: 'euclidean',
        nodeText: 'name',
        zoomable: true,
        treeData:  {
        name: 'Teachers',
            children: [
                {
                name: 'Pushpa',
                children:[{
                    name: '1A-STATE',
                        children:[
                            {name:'Maths'},
                            {name:'Physics'}
                        ]},
                    {
                    name: '1B-CBSE',
                        children:[
                            {name:'Maths'},
                            {name:'Physics'}
                        ]}
                    ]
                },
                {
                name: 'Mamatha',
                children: [{
                name: '3A-STATE',
                children:[
                    {name:'Telugu'},
                    {name:'Hindi'}
                ]},
                {
                name: '4A-ICSE', 
                    children:[
                        {name:'Telugu'},
                        {name:'Hindi'}
                    ]}
            ]
         }
      ]
      },
      options:{
            chart: {
             type: 'boxplot'
            },
            title: {
                text: 'Teacher Classroom Marks Analytics'
            },
            legend: {
                enabled: false
            },
            xAxis: {
                categories: [],
                title: {}
            },
            yAxis: {
                title: {
                    text: 'Marks'
                },
                plotLines: [{
                    value: 48,
                    color: 'green',
                    width: 1,
                    label: {
                        text:"",
                        align: 'left',
                        style: {
                            color: 'grey'
                        }
                    }
                }
                // ,{
                //     value: 65,
                //     color: 'red',
                //     width: 1,
                //     label: {
                //         text:"",
                //         align: 'right',
                //         style: {
                //             color: 'grey'
                //         }
                //     }
                // }
                ]
            },
            series: [{
                    name: 'Observations',
                    data: [],
                    tooltip: {
                        headerFormat: '<em> {point.key}</em><br/>'
                    }
                },{
                name: '',
                color: Highcharts.getOptions().colors[0],
                type: 'scatter',
                data: [],
                marker: {
                fillColor: 'green',
                lineWidth: 1,
                lineColor: Highcharts.getOptions().colors[0]
                },
                tooltip: {
                pointFormat: ''
                }
            }
            // ,{
            //     name: '',
            //     color: Highcharts.getOptions().colors[0],
            //     type: 'scatter',
            //     data: [],
            //     marker: {
            //     fillColor: 'red',
            //     lineWidth: 1,
            //     lineColor: Highcharts.getOptions().colors[0]
            //     },
            //     tooltip: {
            //     pointFormat:''
            //     }
            // }
            ]
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
                       this.getTeacherDetails();
                   }
                }).catch(error =>{
                    console.log(JSON.stringify(error.data))
                })
            },
             getTeacherDetails:function(){
                this.makeBoxplotIsEmpty();
                this.makeDataEmpty();
                UserService.getTeacherDetails(this.tenantId,this.academicDetails.passingyear,this.academicDetails.syllabustype).then((response)=>{
                this.teacherDetails=response.data; 
                if(this.teacherDetails.length>0){
                   this.teacherId = this.teacherDetails[0].teacherid;
                   this.getTeachersPerformanceBasedOnTheClassMarks();
                   this.forceRerender();
                 }else{
                     this.teacherId=0;
                     this.teacherDetails=[];
                 }
                })
            },
             makeBoxplotIsEmpty:function(){
               this.options.series[0].data=[];
               this.options.series[1].data=[];
               this.options.xAxis.categories =[];
               this.options.series[1].tooltip= { pointFormat:""}
               this.options.series[1].name= "";
               this.options.yAxis.plotLines[0].label.text ="";
               this.options.yAxis.plotLines[0].value = 0;
               this.options.xAxis.title= {text: ''};
           },
           makeDataEmpty:function(){
                this.listOfClassrooms=[];
                this.listOfClassroomMarks=[];
                this.dataAvailability=false;
           },
            getTeachersPerformanceBasedOnTheClassMarks:function(){
                this.makeBoxplotIsEmpty();
                this.makeDataEmpty();
                if(this.teacherId!=0){
                   UserService.getTeachersPerformanceBasedOnTheClassMarks(this.tenantId,this.teacherId,this.academicDetails.passingyear,this.academicDetails.syllabustype).then((response)=>{
                   this.listOfClassroomMarks = response.data.resultsMap.analytics;
                    if(Object.keys(this.listOfClassroomMarks).length >0){
                         this.dataAvailability=true;
                         this.listOfClassrooms = Object.values(Object.keys(this.listOfClassroomMarks));
                         this.getClassroomMarksInBoxPlot(1);
                    }
                  this.forceRerender();   
                 })
                }
            },
             getClassroomMarksInBoxPlot: function(status){
             this.selectedStatus = status;
             if(status == 1){
                this.ClassWide = 'status-btn-click';
                this.testWide ='';
                if(Object.keys(this.listOfClassroomMarks).length >0){
                    this.classroomMarksInBoxPlot();
                }
            }else if(status == 2){
                this.ClassWide = '';
                this.testWide ='status-btn-click';
                if(Object.keys(this.listOfClassroomMarks).length >0){
                    this.selectClassroom();
                }
            }    
        },
         classroomMarksInBoxPlot:function(){
            this.makeBoxplotIsEmpty();
            let dataSize=0;
            let allTestSInAllClassroomsMean;
            this.options.xAxis.categories = this.listOfClassrooms;
              for(let i=0;i<this.listOfClassrooms.length;i++){
                 let maxMarks = Object.values(this.listOfClassroomMarks)[i].TestData.maxmarks;
                 let minMarks = Object.values(this.listOfClassroomMarks)[i].TestData.minmarks;
                 let lowerQuartile = Object.values(this.listOfClassroomMarks)[i].TestData.lowerQuartile;
                 let midianQuartile = Object.values(this.listOfClassroomMarks)[i].TestData.mediumQuartile;
                 let upperQuartile = Object.values(this.listOfClassroomMarks)[i].TestData.upperQuartile;
                 this.options.series[0].data[dataSize]=[minMarks,lowerQuartile,midianQuartile,upperQuartile,maxMarks];
                 this.options.series[1].data[dataSize]=[i, Object.values(this.listOfClassroomMarks)[i].TestData.allTestInsingleClassroomMean];
                 if(Object.values(this.listOfClassroomMarks)[i].TestData.alltestInAllClassroomMean != null){
                      allTestSInAllClassroomsMean=Object.values(this.listOfClassroomMarks)[i].TestData.alltestInAllClassroomMean;
                 }
                 dataSize++;
            }
            this.options.series[1].tooltip= { pointFormat:" ClassroomMean: {point.y}"}
            this.options.series[1].name= "ClassroomDetails";
            this.options.yAxis.plotLines[0].label.text =allTestSInAllClassroomsMean+" is all Classroom Tests Mean";
            this.options.yAxis.plotLines[0].value = allTestSInAllClassroomsMean;
            this.options.xAxis.title= {text: 'Classrooms'};
            
        },
          selectClassroom:function(){
            this.makeBoxplotIsEmpty();
            this.getClassroomwiseMarksInBoxPlot(this.classroomId);
        },
        getClassroomwiseMarksInBoxPlot: function(classroomId){
           let dataSize1=0;
           let listOfTests =  Object.keys(Object.values(Object.values(this.listOfClassroomMarks))[classroomId]);
           let listOfTestsData = Object.values(Object.values(this.listOfClassroomMarks))[classroomId];
           let singleClassroomMarks=[];
            for(let i=0;i<listOfTests.length;i++){
                 if(listOfTests[i]!="TestData"){
                     singleClassroomMarks[dataSize1] = Object.values(listOfTestsData)[i];
                     dataSize1++;
              }
            }
            for(let i=0;i<singleClassroomMarks.length;i++){
                this.options.series[0].data[i]=[singleClassroomMarks[i].minmarks, singleClassroomMarks[i].lowerQuartile, singleClassroomMarks[i].mediumQuartile, singleClassroomMarks[i].upperQuartile,singleClassroomMarks[i].maxmarks];
                this.options.xAxis.categories[i]= singleClassroomMarks[i].testtype;
                this.options.series[1].data[i]=[i,singleClassroomMarks[i].singleTestMean];
            }   
            this.options.series[1].name= "TestMean";
            this.options.series[1].tooltip= { pointFormat:" Average: {point.y}"};
            this.options.xAxis.title= {text: 'Tests'};
            this.options.yAxis.plotLines[0].label.text=Object.values(this.listOfClassroomMarks)[classroomId].TestData.allTestInsingleClassroomMean+" is classroom Mean";
            this.options.yAxis.plotLines[0].value=Object.values(this.listOfClassroomMarks)[classroomId].TestData.allTestInsingleClassroomMean;
            this.forceRerender();
        },
        forceRerender() {
          this.componentKey += 1;
        },
    }
}
</script>
<style>
.svg-line-container {
    display: inline-block;
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    vertical-align: top;
    overflow: visible;
}
.svg-content {
    display: inline-block;
    position: absolute;
    overflow: visible !important;
    top: 0;
    left: 0;
}
.tree_style {
 		height: 600px;
 		width: 100%;
 	}
.dendogram{
      margin-top:300px
  }
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
.groupFilter{
  float:left;
  width:25%
}
</style>