<template>
<div>
    <br><br>
     <div>
        <select class="form-control groupFilter"  v-model="academicDetails" v-on:change="getGradesAndSections()">
            <option v-for="academic in academicYearsData.academics" v-bind:value="{passingyear: academic.passingyear,academicyearid: academic.id,syllabustype:academic.syllabustype,syllabusid:academic.syllabusid}" >{{academic.passingyear}} - {{academic.syllabustype}} 
                <div v-if="academic.active === 1"> - Active </div></option>
        </select>
        <select class="form-control groupFilter"  v-model="uniqueGradeId" v-on:change="selectSection()" v-if="uniqueGradesList.length>0">
            <option v-for="grades in uniqueGradesList" v-bind:value="grades.gradeid">{{grades.gradename}}</option>
        </select>
        <select class="form-control groupFilter"  v-model="gradesDetails" v-on:change="selectOption()"  v-if="uniqueGradesList.length>0">
            <option value="">All</option>
            <option v-for="section in sectionsList" v-bind:value="{gradename:section.gradename,sectionname:section.sectionname,gradeid:section.gradeid,classroomid:section.id}">{{section.sectionname}} - {{section.teachername}}</option>
        </select>

        <select class="form-control groupFilter" v-model="selectionId"  v-on:change="selectTeacherChoice()" v-if="uniqueGradesList.length>0">
            <option v-for="selection in selectionList" v-bind:value="selection.id" >{{selection.name}}</option>
        </select>
        <br><br><br>
        <select class="form-control groupFilter" v-model="studentid" v-on:change="getMarksOfAStudent()" v-if="selectionId<=1 && studentsList.length>0">
            <option v-if="studentsList.length>0" value=0>All </option>
            <option v-for="student in studentsList" v-bind:value="student.id">{{student.name}}</option>
        </select>
        </div>
    <br><br><br>
    <div v-if="dataAvailability==true">
        <div class="col-lg-4">
          <button type="button" class="btn btn-info" v-on:click.prevent="Marks">Heatmap</button>
          <button type="button" class="btn btn-info" v-on:click.prevent="marksbytable">Table</button>     
       </div><br><br><br>
        <div class="col-lg-7 col-md-6" v-if="marks==true">
            <highcharts :options="options" :key="componentKey" :class="maxWidth()"></highcharts>
        </div>
        <div class="col-lg-7 col-md-6" v-if="marksintable==true">
             <h4 style="margin-left:75px">{{getTitleOfTable()}}</h4><br>
            <div class="divTable"  :class="xAxisScroll()">
               <div class="divTableBody">
                    <div class="divTableRow"  v-for="(testTypeKey,testTypeResult, index) in studentMarksAnalytics" v-if="index<1">
                        <div class="divTableCell">Subject/Test </div>
                        <div class="divTableCell" v-for="(marks,subject) in testTypeKey" > {{subject}}</div>
                        <div class="divTableCell" > Total Average</div>
                    </div>
                    <div class="divTableRowdata"  v-for="(testTypeKey,value) in studentMarksAnalytics" >
                        <div class="divTableCelldata" >{{value}}</div>
                        <div class="divTableCelldata" v-for="(marks,subject) in testTypeKey" v-if="marks.marks != -1"> {{marks.marks}}</div>
                        <div class="divTableCelldata" v-else > -- </div> 
                        <div class="divTableCelldata"> {{getTotalMarks(testTypeKey)}}</div>
                    </div>
                 </div>
             </div>
        </div>
    </div>
     <div v-else>
            <h4 style="margin-top:30px;margin-left;200px"><b>Data was not avaliable</b></h4>
    </div>
</div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import loadStock from 'highcharts/modules/stock';
loadMap(Highcharts);
loadStock(Highcharts);
    export default{
        props:['classes'],
        data(){
            return{
                tenantId:this.$cookie.get('id'),
                componentKey:0,
                marks:false,
                marksintable:false,
                studentMarksAnalytics:[],
                academicDetails:'',
                gradesDetails:'',
                studentid:0,
                studentsList:[],
                academicYearsData:[],
                gradesAndSubjects:[],
                uniqueGradesList:[],
                sectionsList:[],
                totalMean:[],
                uniqueGradeId:0,
                dataAvailability:false,
                selectionId:1,
                testWiseStatus:false,
                objDetails:{},
                allTestsmean:[],
                allSubjectsMean:[],
                maximumStundets:0,
                selectionList:[
                    {
                        id:1,
                        name:"All Students"
                    },{
                        id:2,
                        name:"Test Wise"
                    },{
                        id:3,
                        name:"Subject Wise"
                    }
                ],
                titleOfTable:"",
                getTestWiseAverages:[],
                getSubjectWiseAverages:[],
                testAndSubjectAvgInHeatmap:[],
                options:{
                      chart: {
                        type: 'heatmap',
                        marginTop: 40,
                        marginBottom: 80,
                        plotBorderWidth: 0.5
                        },
                        title: {
                         text: ''
                        },

                        xAxis: {
                            categories: []
                        },

                        yAxis: {
                            categories: [],
                            title: null
                        },
                        legend: {
                            enabled: true
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br><b>' +
                                this.point.value + '</b> marks in <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                            }
                        },
                        colorAxis: {
                            min: 0,
                            max:50,
                            minColor: '#FFFFFD',
                            maxColor: '#FF9800'
                        },

    
                        // legend: {
                        //     align: 'right',
                        //     layout: 'vertical',
                        //     margin: 0,
                        //     verticalAlign: 'top',
                        //     y: 25,
                        //     symbolHeight: 300
                        // },

                        series: [{
                            name: 'Marks per Student',
                            borderWidth: 0,
                            data: [],
                            dataLabels: {
                                enabled: false,
                            }
                        }]
                    }
                }
            },
            created(){
                this.selectAcadamicYear();
            },
            methods:{
                Marks:function(){
                this.marks=true;
                this.marksintable=false;
                },
               marksbytable:function(){
                this.marksintable=true;
                this.marks=false;
               },
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
                this.makeHeatMapIsEmpty();
                this.dataAvailability=false;
                this.testWiseStatus=false;
                this.studentsList=[];
                UserService.getGradesAndSections(this.tenantId,this.academicDetails.passingyear,this.academicDetails.syllabustype).then((response)=>{
                   this.uniqueGradesList=response.data.uniqueGradesList;
                   this.gradesAndSubjects=response.data.gradesAndSectionsList;  
                    if(this.uniqueGradesList.length>0){
                        this.uniqueGradeId=this.uniqueGradesList[0].gradeid;
                        this.selectSection();
                    }else{
                        this.gradesAndSubjects=[];
                        this.uniqueGradesList=[];
                        this.sectionsList=[];
                    }
                    this.forceRerender();
                 })
            }, 
            selectSection:function(){
                this.gradesDetails="";
                let dataSize=0;
                for(let i=0;i<this.gradesAndSubjects.length;i++){
                    if(this.uniqueGradeId==this.gradesAndSubjects[i].gradeid){
                        this.sectionsList[dataSize]=this.gradesAndSubjects[i];
                        dataSize++;
                    }
                }
                this.selectOption();
                this.forceRerender();
            },
            selectOption:function(){
                this.testWiseStatus=false;
                this.selectTeacherChoice();
            },
            selectTeacherChoice:function(){
                if(this.selectionId==1){
                    this.studentid=0;
                    this.testWiseStatus=false;
                     this.getClassroomStudents();
                }if(this.selectionId==2 || this.selectionId==3){
                    if(this.testWiseStatus==false){
                         if(this.gradesDetails!=""){
                            if(this.selectionId==2){
                                this.options.title.text="Classroom TestWise Averages"
                                this.titleOfTable="Classroom TestWise Averages";
                            }else{
                                this.titleOfTable="Classroom SubjectWise Averages";
                                this.options.title.text="Classroom SubjectWise Averages";
                            }
                            this.objDetails={
                                classroomid:this.gradesDetails.classroomid,
                                gradeid:0,
                                academicyearid:this.academicDetails.academicyearid
                            }
                         }else{
                              if(this.selectionId==2){
                                this.titleOfTable="GradeWise Tests Averages";
                                this.options.title.text="GradeWise Tests Averages";
                              }else{
                                this.titleOfTable="GradeWise Subjects Averages";
                                this.options.title.text="GradeWise Subjects Averages";
                              }
                              this.objDetails={
                                    classroomid:0,
                                    gradeid:this.uniqueGradeId,
                                    academicyearid:this.academicDetails.academicyearid
                                }
                         }
                         this.getTestAndSubjectWiseAnalytics(); 
                    }else{
                        if(Object.keys(this.getTestWiseAverages).length>0){
                             if(this.selectionId==2){
                                if(this.gradesDetails!=""){
                                    this.titleOfTable="Classroom TestWise Averages";
                                    this.options.title.text="Classroom TestWise Averages";
                                }else{
                                    this.titleOfTable="GradeWise Tests Averages";
                                    this.options.title.text="GradeWise Tests Averages";
                                }
                            this.testAndSubjectAvgInHeatmap = this.getTestWiseAverages;
                            this.totalMean=this.allTestsmean;
                            this.getTestWiseAnalytics();
                            }
                            if(this.selectionId==3){
                                if(this.gradesDetails!=""){
                                    this.titleOfTable="Classroom SubjectWise Averages";
                                    this.options.title.text="Classroom SubjectWise Averages";
                                }else{
                                    this.titleOfTable="GradeWise Subject Averages";
                                    this.options.title.text="GradeWise Subject Averages";
                                }
                                this.totalMean=this.allSubjectsMean;
                                this.testAndSubjectAvgInHeatmap = this.getSubjectWiseAverages;
                                this.getTestWiseAnalytics();
                            }
                        }  
                   }
                }
            },
            getClassroomStudents : function(){
                this.makeHeatMapIsEmpty()
                this.dataAvailability=false;
                this.testWiseStatus=false;
                this.options.title.text="";
                this.titleOfTable="";
             if(this.gradesDetails!=""){
                 let obj = {
                    classroomid:this.gradesDetails.classroomid,
                    gradeid:this.gradesDetails.gradeid
                }
                 UserService.SectionDetails(obj,this.tenantId).then((response)=>{
                   this.studentsList=response.data.studentsOfClassRoom;
                     if(this.studentsList.length>0){
                        //  this.studentid=this.studentsList[0].id;
                         this.objDetails={
                            classroomid:this.gradesDetails.classroomid,
                            gradeid:0,
                            academicyearid:this.academicDetails.academicyearid
                        }
                         this.Marks();
                         this.getMarksOfAStudent();
                         this.forceRerender();
                     }
                     else{
                         this.studentsList=[];
                     }
                       this.forceRerender();
               })
             }else{
                 this.objDetails={
                     classroomid:0,
                     gradeid:this.uniqueGradeId,
                     academicyearid:this.academicDetails.academicyearid
                 }
                UserService.studentListByGrade(this.tenantId,this.academicDetails.academicyearid,this.uniqueGradeId).then((response)=>{
                   this.studentsList=response.data;
                     if(this.studentsList.length>0){
                         this.Marks();
                         this.getMarksOfAStudent();
                         this.forceRerender();
                     }
                     else{
                         this.studentsList=[];
                     }
                       this.forceRerender();
               })
             }
           },  
           makeHeatMapIsEmpty:function(){
               this.options.xAxis.categories=[];
               this.options.yAxis.categories=[];
               this.options.series[0].data=[];              
           },
            getMarksOfAStudent:function(){
             this.makeHeatMapIsEmpty();
             this.dataAvailability=false;
             UserService.getMarksOfAStudent(this.tenantId,this.academicDetails.passingyear,this.academicDetails.syllabustype,this.studentid,this.objDetails).then((response) =>{
                    this.studentMarksAnalytics=response.data.resultsMap.analytics;
                    if(Object.keys(this.studentMarksAnalytics).length>0){
                        if(this.studentid==0){
                            this.titleOfTable="All Students Averages";
                            this.options.title.text="All Students Averages";
                        }else{
                            this.titleOfTable="Marks Of A student";
                            this.options.title.text="Single Student Averages";
                        }
                        this.getStudentMarksInHeatMap();
                        this.dataAvailability=true;
                    }else{
                        this.dataAvailability = false;
                    }
                })
                this.forceRerender();
            },
            getStudentMarksInHeatMap:function(){
                let testsLength = Object.keys(this.studentMarksAnalytics).length;
                let subjectsLength = Object.keys(Object.values(this.studentMarksAnalytics)[0]).length;
                this.maximumStundets=testsLength;
                let dataSize=0;
                for(let i=0;i<testsLength;i++){
                    this.options.yAxis.categories[i] = Object.keys(this.studentMarksAnalytics)[i];
                }
                for(let j=0;j<=subjectsLength;j++){
                    if(j==subjectsLength){
                        this.options.xAxis.categories[j] = 'Total';
                    }
                    else{
                        this.options.xAxis.categories[j]= Object.keys(Object.values(this.studentMarksAnalytics)[0])[j];
                    }       
                }
                let maxMarks=0;
                for(let k=0;k<testsLength;k++){
                    let l=0;
                    for(l=0;l<subjectsLength;l++){
                        if(Object.values(Object.values(this.studentMarksAnalytics)[k])[l].avgmarks == -1){
                            this.options.series[0].data[dataSize]=[l,k,0];
                        }else{
                                this.options.series[0].data[dataSize]=[l,k,(Object.values(Object.values(this.studentMarksAnalytics)[k])[l].avgmarks)];
                        }
                        dataSize++;
                    }
                    let totalMarks = this.getTotalMarksForHeatmap(Object.values(Object.values(this.studentMarksAnalytics)[k]));
                    if(maxMarks<totalMarks){
                            maxMarks=totalMarks;
                    }
                    this.options.series[0].data[dataSize]=[l,k,totalMarks];
                    dataSize++;
                }
                let maxValue = 10-(maxMarks%10)+maxMarks;
                if(maxValue>100){
                        this.options.colorAxis.max = 100;
                }else{
                    this.options.colorAxis.max = maxValue;
                }
                 this.forceRerender();
            },
            getTotalMarksForHeatmap: function(marksBasedOnTestType){
                let length = Object.keys(marksBasedOnTestType).length;
                let totalMarks = 0;
                let totalLength=0;
                for(let i = 0;i< length;i++){
                    if(Object.values(marksBasedOnTestType)[i].avgmarks != -1){
                        totalMarks = totalMarks + Object.values(marksBasedOnTestType)[i].avgmarks;
                        totalLength++;
                    }
                }
                return totalMarks/totalLength;
            },

             getTotalMarks: function(marksBasedOnTestType){
                let length = Object.keys(marksBasedOnTestType).length;
                let totalMarks = 0;
                let count=0;
                for(let i = 0;i< length;i++){
                    if(Object.values(marksBasedOnTestType)[i].marks != -1){
                        totalMarks = totalMarks + Object.values(marksBasedOnTestType)[i].marks;
                        count++;
                    }
                }
              return totalMarks=Number.parseFloat(totalMarks/count).toFixed(2); 
            },
            forceRerender() {
                this.componentKey += 1;
                },

            getTestAndSubjectWiseAnalytics:function(){
                this.makeHeatMapIsEmpty();
                this.dataAvailability=false;
                this.testWiseStatus=true;
                this.testAndSubjectAvgInHeatmap=[];
                this.totalMean=[];
                UserService.getTestAndSubjectWiseAnalytics(this.tenantId,this.academicDetails.passingyear,this.academicDetails.syllabustype,this.objDetails).then((response) =>{
                    this.getTestWiseAverages=response.data.resultsMap.analytics.TestWise;
                    this.getSubjectWiseAverages=response.data.resultsMap.analytics.SubjectWise;
                    this.allTestsmean=response.data.resultsMap.analytics.TotalTestSum;
                     this.allSubjectsMean=response.data.resultsMap.analytics.TotalSubjectsSum;
                    if(Object.keys(this.getTestWiseAverages).length>0){
                         this.dataAvailability=true;
                        if(this.selectionId==2){
                            this.totalMean= this.allTestsmean;
                            this.testAndSubjectAvgInHeatmap = this.getTestWiseAverages;
                            this.getTestWiseAnalytics();
                        }
                        else if(this.selectionId==3){
                            this.totalMean=this.allSubjectsMean;
                            this.testAndSubjectAvgInHeatmap = this.getSubjectWiseAverages;
                            this.getTestWiseAnalytics();
                      }
                    }else{
                        this.totalMean=[];
                        this.getTestWiseAverages=[];
                        this.getSubjectWiseAverages=[];
                        this.testAndSubjectAvgInHeatmap=[];
                    }
                    this.forceRerender();
               })
            },
            getTestWiseAnalytics:function(){
                this.makeHeatMapIsEmpty();
                let studentsLength = Object.keys(Object.values(this.testAndSubjectAvgInHeatmap)[0]).length;
                let xAxixDatalength = Object.keys(this.testAndSubjectAvgInHeatmap).length;
                let dataSize1=0;
                this.maximumStundets=studentsLength;
                 if(this.selectionId==2){
                     this.options.yAxis.categories[0]="Test Mean";
                 }else{
                     this.options.yAxis.categories[0]="Subject Mean";
                 }
                let allTestMeanLength= Object.keys(this.totalMean).length;
                let sumOfAllTestOrSUbjectsAvg=0;
                for(let len=0;len<allTestMeanLength;len++){
                    if(Object.values(Object.values(this.totalMean)[len])[0].avgmarks == -1){
                        this.options.series[0].data[dataSize1]=[len,0,0];
                    }else{
                        sumOfAllTestOrSUbjectsAvg = sumOfAllTestOrSUbjectsAvg + Object.values(Object.values(this.totalMean)[len])[0].avgmarks;
                        this.options.series[0].data[dataSize1]=[len,0,(Object.values(Object.values(this.totalMean)[len])[0].avgmarks)];
                    }
                  dataSize1++;
                }
                this.options.series[0].data[dataSize1]=[allTestMeanLength,0,(Number.parseFloat(sumOfAllTestOrSUbjectsAvg/allTestMeanLength).toFixed(2))];
                dataSize1++;
                let yAxisLength=1;
                for(let i=0;i<studentsLength;i++){
                    this.options.yAxis.categories[yAxisLength] = Object.keys(Object.values(this.testAndSubjectAvgInHeatmap)[0])[i];
                    yAxisLength++;
                }
                for(let j=0;j<=xAxixDatalength;j++){
                    if(j==xAxixDatalength){
                        this.options.xAxis.categories[j] = 'Total Student Average';
                    }
                    else{
                        this.options.xAxis.categories[j]= Object.keys(this.testAndSubjectAvgInHeatmap)[j];
                    }       
                }
                let maxMarks=0;
                let yAxisLen=1;
                for(let k=0;k<studentsLength;k++){
                    let xAxisLen=0;
                    let l=0;
                    let totalMarks=0;
                    let count=0;
                    for(l=0;l<xAxixDatalength;l++){
                        if(Object.values(Object.values(this.testAndSubjectAvgInHeatmap)[l])[k].avgmarks == -1){
                            this.options.series[0].data[dataSize1]=[l,yAxisLen,0];
                        }else{
                            totalMarks = totalMarks + (Object.values(Object.values(this.testAndSubjectAvgInHeatmap)[l])[k].avgmarks);
                            count++;
                            this.options.series[0].data[dataSize1]=[l,yAxisLen,(Object.values(Object.values(this.testAndSubjectAvgInHeatmap)[l])[k].avgmarks)];
                        }
                        dataSize1++;
                        xAxisLen++;
                    }
                    totalMarks =(totalMarks/count);
                    if(maxMarks<totalMarks){
                            maxMarks=totalMarks;
                    }
                    this.options.series[0].data[dataSize1]=[xAxisLen,yAxisLen,Number.parseFloat(totalMarks).toFixed(2)];
                    dataSize1++;
                    yAxisLen++;
                }
                let maxValue = 10-(maxMarks%10)+maxMarks;
                if(maxValue>100){
                        this.options.colorAxis.max = 100;
                }else{
                    this.options.colorAxis.max = maxValue;
                }
                 this.studentMarksAnalytics=this.testAndSubjectAvgInHeatmap;
                 this.forceRerender();
            },
            maxWidth:function(){
                let maximumWidth;
                if(this.maximumStundets<25){
                    maximumWidth="firstHalf";
                }else{
                    maximumWidth="secondHalf";
                }
                return maximumWidth;
            },
            getTitleOfTable:function(){
                let result=this.titleOfTable;
                return result;
            },
             xAxisScroll:function(){
                let maximumWidth;
                if(this.maximumStundets<25){
                    maximumWidth="xAxis";
                }else{
                    maximumWidth="scroll";
                }
                return maximumWidth;
            },
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
    .firstHalf{
        width:800px;
        height:550px
    }
    .secondHalf{
        width:950px;
        height:700px
    }
    .xAxis{
        width:1000px;
    }
    .scroll{
        overflow:auto;
        width:1000px;
        display: flex;
    }
</style>