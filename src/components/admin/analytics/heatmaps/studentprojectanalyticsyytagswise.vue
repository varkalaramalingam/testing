<template>
<div>
    <br><br>
     <div> 
        <br><br><br>
      <label class="col-sm-1 control-label" style="width:140px; margin-left: 0px;">Academic Year :</label>
      <select  class="form-control popUpEle selectSubject" style="width: 20%; margin-left: 30px;" v-model="academicYearDetails" v-on:change="getTeacherDetails()">
        <option value="" disabled>-- Select Academic year --</option>
        <option v-for="academic in academicsandboards" 
            v-bind:value="{academicyearid: academic.id,syllabustype:academic.syllabustype, passingyear:academic.passingyear}" 
            :key='academic.id+academic.syllabustype'
        >{{academic.passingyear}}-{{academic.syllabustype}}    <div v-if="academic.active === 1"> - Active </div> </option>
       </select>
    </div>
     <div style="margin-top:-30px;margin-left:540px">
            <label class="col-sm-1 control-label" style="width: 20px; margin-left: -140px;">TeacherName:</label>
              <select class="form-control groupFilter" v-model="teacherId" v-on:change="getSubjectsAndGrades()">
                <option value="" disabled> All </option>
                <option v-for="teacher in teacherDetails" v-bind:value="teacher.teacherid">{{teacher.teachername}}</option>
            </select>

            <label class="col-sm-1 control-label" style="width: 20px; margin-left: 15px;">Grades-Subjects:</label>
              <select class="form-control groupFilter" style=" margin-left: 90px;" v-model="subjectid" v-on:change="getProjectAnalytics()">
                <option value="" disabled> All </option>
                <option v-for="grades in gradesAndSubjectsList" v-bind:value="grades.subjectid">{{grades.gradename}}/{{grades.sectionname}}/{{grades.subjectname}}</option>
            </select>
       </div><br><br>
        <hr> 
    <br>
        <div v-if="dataAvailability==true">
          <div class="col-lg-4" style="margin-left:350px">
          <button type="button" class="btn btn-info" v-on:click.prevent="Marks">Heatmap</button>
          <button type="button" class="btn btn-info" v-on:click.prevent="marksbytable">Table</button>     
       </div><br><br><br>
        <div class="col-lg-7 col-md-6" v-if="marks==true">
            <div>
                <h4 style="margin-left:80px">Skill wise analytics</h4><br>
                 <highcharts :options="options" :key="componentKey" style="width:850px"></highcharts><br><br>
            </div>
            <div>
                <h4 style="margin-left:100px">Skill Group wise analytics</h4><br>
                <highcharts :options="options1" :key="componentKey" style="width:850px"></highcharts>
            </div>
        </div>
        <div class="col-lg-7 col-md-6" v-if="marksintable==true">
            <div class="divTable" >
                <h4 style="margin-left:100px">Skill wise analytics</h4><br>
               <div class="divTableBody">
                    <div class="divTableRow"  v-for="(testTypeKey,testTypeResult, index) in studentSkillAnalytics" v-if="index<1">
                        <div class="divTableCell">Skill Scores </div>
                        <div class="divTableCell" v-for="(marks,subject) in testTypeKey" > {{subject}}</div>
                        <div class="divTableCell" > Total Skill Score </div>
                    </div>
                    <div class="divTableRowdata"  v-for="(testTypeKey,value) in studentSkillAnalytics" >
                        <div class="divTableCelldata" >{{value}}</div>
                        <div class="divTableCelldata" v-for="(marks,subject) in testTypeKey" v-if="marks != -1"> {{marks.score}}</div>
                        <div class="divTableCelldata" v-else > -- </div> 
                        <div class="divTableCelldata"> {{getSkillMarksTotal(testTypeKey)}}</div>
                    </div>
                 </div>
             </div>
             <br><br>
            <div class="divTable">
                <h4 style="margin-left:100px">Skill Group wise analytics</h4><br>
                <div class="divTableBody">
                    <div class="divTableRow"  v-for="(testTypeKey,testTypeResult, index) in studentSkillGroupAnalytics" v-if="index<1">
                        <div class="divTableCell">SkillGroup Scores </div>
                        <div class="divTableCell" v-for="(marks,subject) in testTypeKey" > {{subject}}</div>
                        <div class="divTableCell" > Total Skill Group Score </div>
                    </div>
                    <div class="divTableRowdata"  v-for="(testTypeKey,value) in studentSkillGroupAnalytics" >
                        <div class="divTableCelldata" >{{value}}</div>
                        <div class="divTableCelldata" v-for="(marks,subject) in testTypeKey" v-if="marks != -1"> {{marks.score}}</div>
                        <div class="divTableCelldata" v-else > -- </div> 
                        <div class="divTableCelldata"> {{getSkillGroupMarksTotal(testTypeKey)}}</div>
                    </div>
                 </div>
             </div><br><br>
        </div>
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
loadMap(Highcharts);
loadStock(Highcharts);
    export default{
        props:['classes'],
        data(){
            return{
                tenantId:this.$cookie.get('id'),
                componentKey:0,
                componentKey1:0,
                marks:false,
                marksintable:false,
                studentSkillAnalytics:[],
                studentSkillGroupAnalytics:[],
                academicDetails:'',
                gradesDetails:'',
                studentName:'',
                studentsList:[],
                academicYearsData:[],
                gradesAndSubjects:[],
                academicYearDetails:{},
                academicsandboards:[],
                teacherDetails:[],
                teacherId:0,
                subjectid:0,
                gradesAndSubjectsList:[],
                worksheetslist:[],
                worksheet_id:0,
                dataAvailability:false,
                userId:{
                    id:0
                },
                options:{
                      chart: {
                        type: 'heatmap',
                        marginTop: 40,
                        marginBottom: 80,
                        plotBorderWidth: 0.5
                        },
                        title: {
                         text: 'Skill wise Scores '
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
                            max:5,
                            minColor: '#FFFFFF',
                            maxColor: '#0000FF'
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
                    },
                    options1:{
                      chart: {
                        type: 'heatmap',
                        marginTop: 40,
                        marginBottom: 80,
                        plotBorderWidth: 0.5
                        },
                        title: {
                         text: 'SkillGroups wise Scores '
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
                            max:5,
                            minColor: '#FFFFFF',
                            maxColor: '#0000FF'
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
                 this.academicYears();
                  
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
               academicYears:function(){
                    UserService.AcademicYears(this.tenantId).then((response)=>{
                    this.academicsandboards=response.data.academics;
                    if(this.academicsandboards.length>0){
                        this.academicYearDetails={
                        academicyearid: this.academicsandboards[0].id,
                        syllabustype:this.academicsandboards[0].syllabustype, 
                        passingyear:this.academicsandboards[0].passingyear
                        }
                        this.getTeacherDetails();
                    }
                    })    
                },
                getTeacherDetails:function(){
                    UserService.getTeacherDetails(this.tenantId,this.academicYearDetails.passingyear,this.academicYearDetails.syllabustype).then((response)=>{
                    this.teacherDetails=response.data; 
                    this.gradesAndSubjectsList=[];
                    this.makeAnalytivsDataEmpty();
                    if(this.teacherDetails.length>0){
                         this.teacherId = this.teacherDetails[0].teacherid;
                         this.getSubjectsAndGrades();
                    }
                    })
                },
                 getSubjectsAndGrades:function(){
                     this.userId.id=this.teacherId;
                     UserService.MySubjects(this.userId,this.tenantId).then((response)=>{
                       this.gradesAndSubjectsList = response.data;
                       this.makeAnalytivsDataEmpty();
                       if(this.gradesAndSubjectsList.length>0){
                        this.subjectid = this.gradesAndSubjectsList[0].subjectid;
                         this.getProjectAnalytics();
                       }
                    })
                },
                makeAnalytivsDataEmpty:function(){
                    this.options.yAxis.categories=[];
                    this.options.xAxis.categories=[];
                    this.options.series[0].data=[];
                    this.options1.yAxis.categories=[];
                    this.options1.xAxis.categories=[];
                    this.options1.series[0].data=[];
                    this.dataAvailability=false;
                    this.studentSkillAnalytics=[];
                    this.studentSkillGroupAnalytics=[];
                 },
                getProjectAnalytics:function(){
                this.makeAnalytivsDataEmpty();
                UserService.getProjectAnalytics(this.tenantId,this.teacherId,this.subjectid).then((response) =>{
                    this.studentSkillAnalytics=response.data.resultsMap.analytics.skills;
                    this.studentSkillGroupAnalytics=response.data.resultsMap.analytics.skillsGroup;
                    
                    if(Object.keys(this.studentSkillAnalytics).length >0){
                        this.dataAvailability=true;
                        this.Marks();
                        this.getSkillsAnalytics();
                        this.getSkillGroupAnalytics();
                    }   
                })
            },
            getSkillsAnalytics:function(){
                let skills = Object.keys(this.studentSkillAnalytics).length;    
                let studentsLength = Object.keys(Object.values(this.studentSkillAnalytics)[0]).length;
                let dataSize=0;
                let maxScore = 0;
                for(let i=0;i<skills;i++){
                    this.options.yAxis.categories[i] = Object.keys(this.studentSkillAnalytics)[i];
                }
                for(let j=0;j<=studentsLength;j++){
                    if(j==studentsLength){
                        this.options.xAxis.categories[j] = 'Total';
                    }
                    else{
                        this.options.xAxis.categories[j]= Object.keys(Object.values(this.studentSkillAnalytics)[0])[j];
                    }       
                }
                for(let k=0;k<skills;k++){
                    for(let l=0;l<=studentsLength;l++){
                        if(Object.values(Object.values(this.studentSkillAnalytics)[k])[l] == -1){
                            this.options.series[0].data[dataSize]=[l,k,0];
                        }else if(l==studentsLength){
                            let totalMarks = this.getSkillMarksTotal(Object.values(Object.values(this.studentSkillAnalytics)[k]));
                            if(maxScore<totalMarks){
                               maxScore = totalMarks;
                            }
                            this.options.series[0].data[dataSize]=[l,k,totalMarks];
                        }else{
                                this.options.series[0].data[dataSize]=[l,k,(Object.values(Object.values(this.studentSkillAnalytics)[k])[l].score)];
                        }
                        dataSize++;
                    }
                }
                this.options.colorAxis.max = 10-(maxScore%10)+maxScore
                this.forceRerender();
            },
            getSkillGroupAnalytics:function(){
                let skills = Object.keys(this.studentSkillGroupAnalytics).length;    
                let studentsLength = Object.keys(Object.values(this.studentSkillGroupAnalytics)[0]).length;
                let dataSize=0;
                let maxScore=0;
                for(let i=0;i<skills;i++){
                    this.options1.yAxis.categories[i] = Object.keys(this.studentSkillGroupAnalytics)[i];
                }
                for(let j=0;j<=studentsLength;j++){
                    if(j==studentsLength){
                        this.options1.xAxis.categories[j] = 'Total';
                    }
                    else{
                        this.options1.xAxis.categories[j]= Object.keys(Object.values(this.studentSkillGroupAnalytics)[0])[j];
                    }       
                }
                for(let k=0;k<skills;k++){
                    for(let l=0;l<=studentsLength;l++){
                        if(Object.values(Object.values(this.studentSkillGroupAnalytics)[k])[l] == -1){
                            this.options1.series[0].data[dataSize]=[l,k,0];
                            
                        }else if(l==studentsLength){
                            let totalMarks = this.getSkillGroupMarksTotal(Object.values(Object.values(this.studentSkillGroupAnalytics)[k]));
                            if(maxScore<totalMarks){
                               maxScore = totalMarks;
                            }
                            this.options1.series[0].data[dataSize]=[l,k,totalMarks];
                        }else{
                                this.options1.series[0].data[dataSize]=[l,k,(Object.values(Object.values(this.studentSkillGroupAnalytics)[k])[l].score)];
                        }
                        dataSize++;
                    }
                }
                this.options1.colorAxis.max = 10-(maxScore%10)+maxScore
                this.forceRerender();
            },
             getSkillMarksTotal: function(marksBasedOnTestType){
                let length = Object.keys(marksBasedOnTestType).length;
                let totalMarks = 0;
                for(let i = 0;i< length;i++){
                    if(Object.values(marksBasedOnTestType)[i] != -1){
                        totalMarks = totalMarks + Object.values(marksBasedOnTestType)[i].score;
                    }
                }
                return totalMarks;
            },
             getSkillGroupMarksTotal: function(marksBasedOnTestType){
                let length = Object.keys(marksBasedOnTestType).length;
                let totalMarks = 0;
                for(let i = 0;i< length;i++){
                    if(Object.values(marksBasedOnTestType)[i] != -1){
                        totalMarks = totalMarks + Object.values(marksBasedOnTestType)[i].score;
                    }
                }
                return totalMarks;
            },
            forceRerender() {
                this.componentKey += 1;
                this.componentKey1 += 1;
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
</style>