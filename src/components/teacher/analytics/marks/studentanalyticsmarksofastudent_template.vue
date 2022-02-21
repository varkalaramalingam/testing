<template>

   <div>
   <br><br>
    <div>
        <select class="form-control groupFilter"  v-model="academicDetails" v-on:change="getGradesAndSections()">
            <option v-for="academic in academicYearsData.academics" v-bind:value="{passingyear: academic.passingyear,academicyearid: academic.id,syllabustype:academic.syllabustype,syllabusid:academic.syllabusid}" >{{academic.passingyear}} - {{academic.syllabustype}} 
                <div v-if="academic.active === 1"> - Active </div></option>
        </select>
        <select class="form-control groupFilter"  v-model="gradesDetails"  v-on:change="getClassroomStudents()">
            <option v-for="grades in gradesAndSubjects" v-bind:value="{gradename:grades.gradename,sectionname:grades.sectionname,gradeid:grades.gradeid,classroomid:grades.id}">{{grades.gradename}} - {{grades.sectionname}}</option>
        </select>
        <select class="form-control groupFilter" v-model="studentid" v-on:change="getStudentMarksBySubject()">
            <option v-for="student in studentsList" v-bind:value="student.id">{{student.name}}</option>
        </select>
        </div> <br><br><hr>

    <div style="width:100%">
        <button  :class="['status-btn',testWise]" @click="getStudentMarksInBoxPlot(statusDetails.testWise)">Test Wide</button>
        <button  :class="['status-btn',subjectWise]"  @click="getStudentMarksInBoxPlot(statusDetails.subjectWise)">Subject Wide</button>
    </div>
    <hr>
  
    <div v-if="dataAvailability==true">
     <div v-if="selectedStatus==2">
        <select class="form-control groupFilter" @change="selectTest()" v-model="testId">
            <option v-for="(test,index) in listOfTest"  v-bind:value="index">{{test}}</option>
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
</div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import loadStock from 'highcharts/modules/stock';
import loadHighchartsMore from 'highcharts/highcharts-more';
loadMap(Highcharts);
loadStock(Highcharts);
loadHighchartsMore(Highcharts);
export default{
    props:['classes'],
    data(){
        return{
            tenantId:this.$cookie.get('id'),
            componentKey:0,
            statusDetails:{testWise:1,subjectWise:2},
            testWise:'status-btn-click',
            subjectWise:'',
            selectedStatus:0,
            testId:0,
            academicDetails:'',
            gradesDetails:'',
            studentid:'',
            studentsList:[],
            dataAvailability:false,
            academicYearsData:[],
            gradesAndSubjects:[],
            studentAcademicDetails:this.$store.state.studentAcademicDetails,
            options:{
            chart: {
             type: 'boxplot'
            },
            title: {
                text: ''
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
                },{
                    value: 65,
                    color: 'red',
                    width: 1,
                    label: {
                        text:"",
                        align: 'right',
                        style: {
                            color: 'grey'
                        }
                    }
                }]
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
            },{
                name: '',
                color: Highcharts.getOptions().colors[0],
                type: 'scatter',
                data: [],
                marker: {
                fillColor: 'red',
                lineWidth: 1,
                lineColor: Highcharts.getOptions().colors[0]
                },
                tooltip: {
                pointFormat:''
                }
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
             this.makeBoxplotIsEmpty();
             this.dataAvailability=false;
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
             let obj = {
                 classroomid:this.gradesDetails.classroomid,
                 gradeid:this.gradesDetails.gradeid
               }
               this.dataAvailability=false;
               this.makeBoxplotIsEmpty();
             UserService.SectionDetails(obj,this.tenantId).then((response)=>{
              
                   this.studentsList=response.data.studentsOfClassRoom;
                     if(this.studentsList.length>0){
                         this.studentid=this.studentsList[0].id;
                         this.getStudentMarksBySubject();
                     }else{
                         this.studentsList=[];
                     }
                   this.forceRerender();
               })
           },
           makeBoxplotIsEmpty:function(){
             this.options.xAxis.categories =[];
                this.options.series[0].data=[];
                this.options.series[1].data=[];
                this.options.series[2].data=[];
                this.options.yAxis.plotLines[0].value='';
                this.options.yAxis.plotLines[1].value='';
                this.options.yAxis.plotLines[0].label.text ='';
                this.options.yAxis.plotLines[1].label.text ='';
           },
          getStudentMarksBySubject:function(){
               this.dataAvailability=false;
               this.makeBoxplotIsEmpty();
                UserService.getStudentMarksBySubject(this.tenantId, this.academicDetails.academicyearid,this.gradesDetails.classroomid,this.studentid).then((response)=>{
                    this.listOfStudentMarks = response.data.resultsMap.analytics;
                    if(Object.keys(this.listOfStudentMarks).length >0){
                         this.dataAvailability=true;
                         this.listOfTest = Object.values(Object.keys(this.listOfStudentMarks));
                         this.getStudentMarksInBoxPlot(1);
                    }
                  this.forceRerender();
                })
            },
             getStudentMarksInBoxPlot: function(status){
             this.makeBoxplotIsEmpty();
             this.selectedStatus = status;
             if(status == 1){
                this.testWise = 'status-btn-click';
                this.subjectWise ='';
                if(Object.keys(this.listOfStudentMarks).length >0){
                    this.studentsMarksInBoxPlot();
                }
            }else if(status == 2){
                this.testWise = '';
                this.subjectWise ='status-btn-click';
                if(Object.keys(this.listOfStudentMarks).length >0){
                    this.selectTest();
                }
            }    
        },
        studentsMarksInBoxPlot:function(){
             let dataSize=0;
            this.options.xAxis.categories = this.listOfTest;
              for(let i=0;i<this.listOfTest.length;i++){
                 let maxMarks = Object.values(this.listOfStudentMarks)[i].TestData.maxmarks;
                 let minMarks = Object.values(this.listOfStudentMarks)[i].TestData.minmarks;
                 let lowerQuartile = Object.values(this.listOfStudentMarks)[i].TestData.lowerQuartile;
                 let midianQuartile = Object.values(this.listOfStudentMarks)[i].TestData.mediumQuartile;
                 let upperQuartile = Object.values(this.listOfStudentMarks)[i].TestData.upperQuartile;
                 this.options.series[0].data[dataSize]=[minMarks,lowerQuartile,midianQuartile,upperQuartile,maxMarks];
                 this.options.series[1].data[dataSize]=[i, Object.values(this.listOfStudentMarks)[i].TestData.singleStudentTestMean];
                 this.options.series[2].data[dataSize]=[i, Object.values(this.listOfStudentMarks)[i].TestData.allStudentsTestMean];
                 dataSize++;
               }
               this.options.series[1].tooltip= { pointFormat:" TestMean: {point.y}"}
               this.options.series[2].tooltip= { pointFormat:" TestMean: {point.y}"}
               this.options.series[1].name= Object.values(this.listOfStudentMarks)[0].TestData.name;
               this.options.series[2].name ="All Students";
               this.options.yAxis.plotLines[0].value = Object.values(this.listOfStudentMarks)[dataSize-1].TestData.singleStudentAllTestsMean;
               this.options.yAxis.plotLines[0].label.text = Object.values(this.listOfStudentMarks)[0].TestData.name+"'s Mean of all tests "+Object.values(this.listOfStudentMarks)[dataSize-1].TestData.singleStudentAllTestsMean;
               this.options.yAxis.plotLines[1].label.text ="All Students All Tests Mean "+Object.values(this.listOfStudentMarks)[dataSize-1].TestData.allStudentsAllTestsMean;
               this.options.yAxis.plotLines[1].value = Object.values(this.listOfStudentMarks)[dataSize-1].TestData.allStudentsAllTestsMean;
               this.options.xAxis.title= {text: 'Tests'};
               this.options.title.text="Averages Of A Student In Box Plot";
        },
        selectTest:function(){
            this.options.xAxis.categories =[];
            this.options.series[0].data=[];
            this.options.series[1].data=[];
            this.options.series[2].data=[];
            this.options.yAxis.plotLines[0].value='';
            this.options.yAxis.plotLines[1].value='';
            this.options.yAxis.plotLines[0].label.text ='';
            this.options.yAxis.plotLines[1].label.text ='';
            this.getSubjectMarksInBoxPlot(this.testId);
        },
        getSubjectMarksInBoxPlot: function(testId){
           let dataSize1=0;
           let listOfSubjects =  Object.keys(Object.values(Object.values(this.listOfStudentMarks))[testId]);
           let listOfSubjectsData = Object.values(Object.values(this.listOfStudentMarks))[testId];
           let studentSubjectMarks=[];
            for(let i=0;i<listOfSubjects.length;i++){
                 if(listOfSubjects[i]!="TestData"){
                     studentSubjectMarks[dataSize1] = Object.values(listOfSubjectsData)[i];
                     dataSize1++;
              }
            }
            for(let i=0;i<studentSubjectMarks.length;i++){
                this.options.series[0].data[i]=[studentSubjectMarks[i].minmarks, studentSubjectMarks[i].lowerQuartile, studentSubjectMarks[i].mediumQuartile, studentSubjectMarks[i].upperQuartile,studentSubjectMarks[i].maxmarks];
                this.options.xAxis.categories[i]= studentSubjectMarks[i].subjectname;
                this.options.series[1].data[i]=[i,studentSubjectMarks[i].marks];
                this.options.series[2].data[i]=[i,studentSubjectMarks[i].allStudentsSingleSubjectMean];
            }   
             this.options.series[1].name= Object.values(listOfSubjectsData)[0].name;
             this.options.series[1].tooltip= { pointFormat:" Marks: {point.y}"};
             this.options.series[2].name= "All Students";
             this.options.series[2].tooltip= { pointFormat:" Mean : {point.y}"}
             this.options.xAxis.title= {text: 'Subjects'};
             this.options.yAxis.plotLines[0].label.text=Object.values(this.listOfStudentMarks)[testId].TestData.singleStudentTestMean+" is "+Object.values(this.listOfStudentMarks)[testId].TestData.name+" mean";
             this.options.yAxis.plotLines[1].label.text=Object.values(this.listOfStudentMarks)[testId].TestData.allStudentsTestMean+" is all students mean";
             this.options.yAxis.plotLines[0].value=Object.values(this.listOfStudentMarks)[testId].TestData.singleStudentTestMean;
             this.options.yAxis.plotLines[1].value=Object.values(this.listOfStudentMarks)[testId].TestData.allStudentsTestMean;
             this.options.title.text="Marks Of A Student In Box Plot";
             this.forceRerender();
        },
        forceRerender() {
          this.componentKey += 1;
        },
    }

}
</script>
<style>
.forminput{
      width:150px;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.classlabel{
    margin-right: -21px;
    margin-top: 4px;
}
.studentlabel{
    margin-left:-318px;
}
.studentslabelone{
    margin-left: -212px;
}
.status-btn{
  background-color: white; 
  color: black; 
  padding: 6px 7px;
  border: 2px solid #008CBA;
}
.status-btn-click{
  background-color: #008CBA;
  color:
   white;
}
.groupFilter{
  float:left;
  width:25%
}
</style>