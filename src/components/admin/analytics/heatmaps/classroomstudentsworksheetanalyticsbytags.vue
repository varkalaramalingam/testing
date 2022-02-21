<template>
<div>
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
    <div style="margin-top:-30px;margin-left:540px;width:200px">
            <label class="col-sm-1 control-label" style="width: 20px; margin-left: -160px;">TeacherName:</label>
              <select class="form-control gradeFilter" v-model="teacherId" v-on:change="getSubjectsAndGrades()">
                <option value="" disabled> All </option>
                <option v-for="teacher in teacherDetails" v-bind:value="teacher.teacherid" :key="teacher.teacherid">{{teacher.teachername}}</option>
            </select>
     </div>
    <div style="margin-top:-30px;margin-left:940px;width:200px">
        <label class="col-sm-1 control-label" style="width: 20px; margin-left: -160px;">Grades-Subjects:</label>
            <select class="form-control gradeFilter" v-model="classroomDetails" v-on:change="getClassroomWorksheetsAnalytics()">
            <option value="" disabled> All </option>
            <option v-for="grades in gradesAndSubjectsList" v-bind:value="{classroomid:grades.id,subjectid:grades.subjectid}">{{grades.gradename}}/{{grades.sectionname}}/{{grades.subjectname}}</option>
        </select>
    </div><br><br>
    <div style="margin-left:20px">
        <h4 style="font-size:1.75em;">Classroom Worksheet Analytics Table</h4>
    </div>
    <div class="col-lg-12 reset-padding reset-margin">
        <div class="divTable">
            <div class="divTableBody">
                <div class="divTableRow">
                    <div class="divTableCell">student ID</div>
                    <div class="divTableCell">student Name</div>
                    <div class="divTableCell" v-for="dod in dodnames" :key="dod.degreeofdifficulty" v-show="dodnames.length!=0">{{dod.degreeofdifficulty}}</div>
                    <div class="divTableCell" v-for="tag in tagnames" :key="tag.id" v-show="tagnames.length!=0" >
                        <div :key="tag.tagname">{{tag.tagname}}</div>
                    </div>
                </div>
                <div class="divTableRowdata" v-for="studentdata in displaydatavalues" :key="studentdata.studentid" v-show="displaydatavalues.length>0"> 
                    <!-- <div class="divTableCelldata">{{studentdata}}</div> -->
                    <div class="divTableCelldata">{{studentdata.studentid}}</div>
                    <div class="divTableCelldata">{{studentdata.name}}</div>
                    <div class="divTableCelldata" 
                        v-for="dod in studentdata.degreeLevelQuestions" 
                        :key="dod.degreeofdifficulty"
                    >{{dod.correct}}<span v-if="dod.tdis!='NONE'">/{{dod.total}}</span>
                    </div>
                    <div class="divTableCelldata" 
                        v-for="tag in studentdata.questionsTags" 
                        :key="tag.id"
                    >{{tag.tdis}}<span v-if="tag.tdis!='NONE'">/{{tag.total}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="clearfix"></div>
    <br>
    <div class="col-lg-12" style="text-align: center;">
        <h3><u>Heatmap</u></h3>
    </div>
    <div class="col-lg-12 reset-padding reset-margin">
        <highcharts
            :options="heatanalysisdata"
            style="min-height: 400px; min-width:1200px "
            v-if="heatanalysisdata.series[0].data.length!=0"
            :key="componentKey1"
        ></highcharts>
        <div class="col-lg-8 text-right" v-else style="padding-right:60px;color:red" ><h4>No Data To Display For Heatmap</h4></div>
    </div>
    <br>
    <div class="col-lg-4" style="padding-top:20px;">
    </div>
    <router-view v-bind:mysubject="mysubject" v-bind:school="school" v-bind:userdetails="userdetails" v-bind:acdemicyearandboard="acdemicyearandboard"></router-view>
</div>
</template>
<style>
</style>
<script>
import UserService from '../../../../services/userService.js';
import DatePicker from 'vue2-datepicker';
import moment from 'moment';
import VueHighcharts from "vue2-highcharts";
import Highcharts from "highcharts";
export default{
    components: { DatePicker,
    VueHighcharts,
    },
    props:['mysubject','school','userdetails','acdemicyearandboard'],
    data(){
        return{
        classroomSubjectWorksheets:[],
        myClass :{},
        id:this.$cookie.get('id'),
        gradeid : 0,
        subjectid :0,
        classroomid:0,
        wid:0,
        componentKey: 0,
        componentKey1: 10,
        showheat:false,
        showstackedbar:true,
        showstackedbar1:false,
        analysisdata:{},
        worksheet_id:0,
        analysisdatakeys:[],
        classroomDetails:{},
        analysisdatavalues:[
            [
                {
                    "degreeLevelQuestions": 
                    [ 
                        { "degreeofdifficulty": "EASY"}, 
                    ], 
                    "questionsTags": 
                    [ 
                        { "tagname": null}
                    ]
                }
            ]
        ],
        displaydatavalues:[],
        analysisdataworksheet:[],
        worksheetanalysisdata:{},
        dodanalysisdata:[],
        tagsanalysisdata:[],
        dodnames:[],
        tagnames:[],
        heatanalysisdata:{
            chart: {
                type: 'heatmap',
                marginTop: 40,
                marginBottom: 80,
                plotBorderWidth: 1
            },


            title: {
                text: 'Tag analysis for Students of a classroom using Heatmap'
            },

            xAxis: {
                categories: [
                    // 'Alexander', 'Marie', 'Maximilian', 'Sophia', 'Lukas', 'Maria', 'Leon', 'Anna', 'Tim', 'Laura'
                ]
            },

            yAxis: {
                categories: [
                    // 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
                ],
                title: null,
                reversed: true
            },

            colorAxis: {
                min: 0,
                minColor: '#FFFFFF',
                maxColor: Highcharts.getOptions().colors[0]
            },

            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                verticalAlign: 'top',
                y: 25,
                symbolHeight: 280
            },
            
            tooltip: {
                        formatter: function () {
                            return '<b>' + this.series.yAxis.categories[this.point.y] + '</b> scored <br><b>' +
                            this.point.value + '</b> questions correct in <br><b>' + this.series.xAxis.categories[this.point.x] + '</b>';
                        }
                    },

            series: [{
                name: 'Sales per employee',
                borderWidth: 1,
                data: [
                    // [0, 0, 10], [0, 1, 19], [0, 2, 8], [0, 3, 24], [0, 4, 67], [1, 0, 92], [1, 1, 58], [1, 2, 78], [1, 3, 117], [1, 4, 48], [2, 0, 35], [2, 1, 15], [2, 2, 123], [2, 3, 64], [2, 4, 52], [3, 0, 72], [3, 1, 132], [3, 2, 114], [3, 3, 19], [3, 4, 16], [4, 0, 38], [4, 1, 5], [4, 2, 8], [4, 3, 117], [4, 4, 115], [5, 0, 88], [5, 1, 32], [5, 2, 12], [5, 3, 6], [5, 4, 120], [6, 0, 13], [6, 1, 44], [6, 2, 88], [6, 3, 98], [6, 4, 96], [7, 0, 31], [7, 1, 1], [7, 2, 82], [7, 3, 32], [7, 4, 30], [8, 0, 85], [8, 1, 97], [8, 2, 123], [8, 3, 64], [8, 4, 84], [9, 0, 47], [9, 1, 114], [9, 2, 31], [9, 3, 48], [9, 4, 91]
                ],
                dataLabels: {
                enabled: true,
                color: '#000000'
                }
            }],
            responsive: {
                rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    yAxis: {
                    labels: {
                        formatter: function () {
                        return this.value.charAt(0);
                        }
                    }
                    }
                }
                }]
            }
            },
            tenantId:this.$cookie.get('id'),
            academicYearDetails:{},
            academicsandboards:[],
            teacherDetails:[],
            teacherId:0,
            gradesAndSubjectsList:[],
            worksheetslist:[],
            userId:{
                id:0
            }
            }
        },
    created(){
        this.academicYears();
    },
    methods:{
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
            this.makeDataEmpty();
            this.teacherDetails=[];
            this.gradesAndSubjectsList=[];
            this.worksheetslist=[];
            UserService.getTeacherDetails(this.tenantId,this.academicYearDetails.passingyear,this.academicYearDetails.syllabustype).then((response)=>{
            this.teacherDetails=response.data;
            if(this.teacherDetails.length>0){
                    this.teacherId = this.teacherDetails[0].teacherid;
                    this.getSubjectsAndGrades();
            }else{
                this.teacherId='';
            }
            })
        },
        getSubjectsAndGrades:function(){
            this.makeDataEmpty();
            this.gradesAndSubjectsList=[];
            this.worksheetslist=[];
                this.userId.id=this.teacherId;
                UserService.MySubjects(this.userId,this.tenantId).then((response)=>{
                this.gradesAndSubjectsList = response.data;
                if(this.gradesAndSubjectsList.length>0){
                    this.classroomDetails={
                        classroomid:this.gradesAndSubjectsList[0].id,
                        subjectid:this.gradesAndSubjectsList[0].subjectid
                        }
                    this.getClassroomWorksheetsAnalytics();
                }
            })
        },
        // getClassroomWorksheets:function(){
        //      this.makeDataEmpty();
        //     UserService.getClassroomWorksheets(this.tenantId,this.classroomDetails.classroomid,this.classroomDetails.subjectid).then((response)=>{
        //        this.worksheetslist = response.data.results;
        //        if(this.worksheetslist.length>0){
        //           this.worksheet_id= this.worksheetslist[0].w_id;
        //            this.worksheetAnalytics();
        //        }
        //     })
        // },
        makeDataEmpty:function(){
            this.analysisdatavalues=[];
            this.analysisdatakeys=[];
            this.analysisdata=[];
            this.analysisdataworksheet=[];

            this.heatanalysisdata.xAxis.categories=[];
            this.heatanalysisdata.yAxis.categories=[];
            this.heatanalysisdata.series[0].data = [];

        },
        getClassroomWorksheetsAnalytics:function(){
            this.makeDataEmpty();
            UserService.getAnalysedStudentForAClassroom(this.id, this.classroomDetails.classroomid, this.classroomDetails.subjectid).then((response)=>{
                console.log(response.data);
            this.worksheetanalysisdata = response.data.resultsMap.OverallClassAnalyse; 
            this.analysisdatakeys = Object.keys(this.worksheetanalysisdata)
            this.analysisdatavalues = [];
            this.displaydatavalues = [];
            this.dodnames = [];
            this.tagnames = [];
            
            for(var studentdata in this.worksheetanalysisdata){
                this.analysisdatavalues.push(this.worksheetanalysisdata[studentdata])
            }
            console.log(this.analysisdatakeys, this.analysisdatavalues);
            for(let i=0;i<this.analysisdatavalues.length;i++){
                for(var dodkey in this.analysisdatavalues[i].degreeLevelQuestions){
                    let dodmain = this.analysisdatavalues[i].degreeLevelQuestions[dodkey];
                    // console.log(dodmain);
                    if(this.dodnames.length == 0){
                        this.dodnames.push(dodmain);
                    } else {
                        let contained = false;
                        for(var dod in this.dodnames){
                            // console.log(dod);
                            if(this.dodnames[dod].id == dodmain.id){
                                contained = true;
                                break;
                            }
                        }
                        if(contained == false){
                            this.dodnames.push(dodmain);
                        }
                    }
                }
                for(var tagkey in this.analysisdatavalues[i].questionsTags){
                    let tagmain = this.analysisdatavalues[i].questionsTags[tagkey];
                    if(this.tagnames.length == 0){
                        if(tagmain.tagname == null){
                            tagmain.tagname = "GENERAL";
                            tagmain.id = 0;
                        }
                        // remove below else 
                        // else {
                            this.tagnames.push(tagmain);
                        // }
                    } else {
                        let tagcontained = false;
                        if(tagmain.tagname == null){
                            tagmain.tagname = "GENERAL";
                            tagmain.id = 0;
                        }
                        // remove below else
                        // else{
                        for(var tag in this.tagnames){
                            if(this.tagnames[tag].id == tagmain.id){
                                tagcontained = true;
                                break;
                            }
                        }
                        if(tagcontained == false){
                            this.tagnames.push(tagmain);
                        }
                        // }
                    }
                }
            }
            console.log(this.dodnames, this.tagnames)
            var k = 0;
            this.heatanalysisdata.series[0].data = [];
            for(let i=0;i<this.analysisdatavalues.length;i++){
                this.displaydatavalues[i] = {studentid:0,name:"",degreeLevelQuestions:[],questionsTags:[]};
                this.displaydatavalues[i].studentid = this.analysisdatavalues[i].id;
                this.displaydatavalues[i].name = this.analysisdatavalues[i].name;
                for(var dod in this.dodnames){
                    this.displaydatavalues[i].degreeLevelQuestions[dod] = {};
                    this.displaydatavalues[i].degreeLevelQuestions[dod].id = this.dodnames[dod].id;
                    this.displaydatavalues[i].degreeLevelQuestions[dod].degreeofdifficulty = this.dodnames[dod].degreeofdifficulty;
                    let contained = false;
                    for(var dodkey in this.analysisdatavalues[i].degreeLevelQuestions){
                        let dodmain = this.analysisdatavalues[i].degreeLevelQuestions[dodkey];
                        if(this.dodnames[dod].id == dodmain.id){
                            this.displaydatavalues[i].degreeLevelQuestions[dod].correct = dodmain.correct;
                            this.displaydatavalues[i].degreeLevelQuestions[dod].tdis = dodmain.correct;
                            contained = true;
                            break;
                        }
                    }
                    for(var dodkey in this.analysisdatavalues[i].degreeLevelQuestionsTotal){
                        let dodmain = this.analysisdatavalues[i].degreeLevelQuestionsTotal[dodkey];
                        // console.log(dodmain);
                        if(this.dodnames[dod].id == dodmain.id){
                            this.displaydatavalues[i].degreeLevelQuestions[dod].total = dodmain.total;
                            break;
                        }
                    }
                    if(contained == false){
                        this.displaydatavalues[i].degreeLevelQuestions[dod].tdis = "NONE";
                        this.displaydatavalues[i].degreeLevelQuestions[dod].correct = 0;
                    }
                }
                for(var tag in this.tagnames){
                    this.displaydatavalues[i].questionsTags[tag] = {};
                    this.displaydatavalues[i].questionsTags[tag].id = this.tagnames[tag].id;
                    this.displaydatavalues[i].questionsTags[tag].tagname = this.tagnames[tag].tagname;
                    this.heatanalysisdata.series[0].data[k] = [];
                    // console.log(this.tagnames[tag].tagname);
                    let contained = false;
                    for(var tagkey in this.analysisdatavalues[i].questionsTags){
                        let tagmain = this.analysisdatavalues[i].questionsTags[tagkey];
                        if(this.tagnames[tag].id == tagmain.id){
                            this.displaydatavalues[i].questionsTags[tag].correct = tagmain.correct;
                            this.displaydatavalues[i].questionsTags[tag].tdis = tagmain.correct;
                            // console.log(tagmain.correct)
                            contained = true;
                            break;
                        }
                    }
                    for(var tagkey in this.analysisdatavalues[i].questionsTagsTotal){
                        let tagmain = this.analysisdatavalues[i].questionsTagsTotal[tagkey];
                        // console.log(dodmain);
                        if(tagmain.tagname == null){
                            tagmain.tagname = "GENERAL";
                            tagmain.id = 0;
                        }
                        if(this.tagnames[tag].id == tagmain.id){
                            this.displaydatavalues[i].questionsTags[tag].total = tagmain.total;
                            // console.log(tagmain.total)
                            break;
                        }
                    }
                    // console.log(contained);
                    if(contained == false){
                        this.displaydatavalues[i].questionsTags[tag].tdis = "NONE"
                        this.displaydatavalues[i].questionsTags[tag].correct = 0;
                    }
                    this.heatanalysisdata.series[0].data[k].push(Number(tag));
                    this.heatanalysisdata.series[0].data[k].push(i);
                    // change i to j when changing X-axis and Y-axis
                    // this.heatanalysisdata.series[0].data[k].push(this.displaydatavalues[i].questionsTags[tag].correct);
                    if(this.displaydatavalues[i].questionsTags[tag].tdis != "NONE"){
                    this.heatanalysisdata.series[0].data[k].push(this.displaydatavalues[i].questionsTags[tag].tdis);
                    } else {
                       this.heatanalysisdata.series[0].data[k].push("X"); 
                    }
                    k++;
                    console.log(k);
                    // console.log(this.displaydatavalues[i].questionsTags[tag].tdis);
                }
            }
            for(var tag in this.tagnames){
                this.heatanalysisdata.xAxis.categories.push(this.tagnames[tag].tagname);
                console.log(this.tagnames[tag].tagname);
            }
            for(let i=0;i<this.displaydatavalues.length;i++){
                this.heatanalysisdata.yAxis.categories.push(this.displaydatavalues[i].name);
            }
            console.log(this.displaydatavalues)
            console.log(this.heatanalysisdata.series[0].data)
            console.log(this.heatanalysisdata.xAxis)
            console.log(this.heatanalysisdata.yAxis)
            // this.dodanalysisdata = response.data.resultsMap.WorksheetAnalyse[0].degreeLevelQuestions; 
            // this.tagsanalysisdata = response.data.resultsMap.WorksheetAnalyse[0].questionsTags;
            // if(this.dodanalysisdata.length == 0){
            //     this.dodanalysisdata = [{total:0}];
            // }
            // if(this.tagsanalysisdata.length == 0){
            //     this.tagsanalysisdata = [{total:0}];
            // }
            // let length = this.tagsanalysisdata.length
            // console.log(length,"!!!!1",this.tagsanalysisdata)
            // if(length>0){
            //     for(let i =0; i<length;i++){
            //     this.baranalysisdata.series[i] = {name: "", data: []} 
            //     if(this.tagsanalysisdata[i].tagname!=null){
            //         this.baranalysisdata.series[i].name = this.tagsanalysisdata[i].tagname;
            //         this.heatanalysisdata.xAxis.categories.push(this.tagsanalysisdata[i].tagname);
            //         // change X-axis and Y-axis names then you will get the reverse
            //         } else {
            //     this.baranalysisdata.series[i].name = "General";
            //     this.heatanalysisdata.xAxis.categories.push("General");
            // }
            // }
            // }        
        })
        // UserService.getClassroomWorksheetsAnalyse(this.id,this.worksheet_id,this.classroomDetails.classroomid).then((response)=>{
        //     this.analysisdata=response.data.resultsMap.Analyse;
        //     this.analyseWorksheet();
        //     this.forceRerender();
        // })
    },
    forceRerender() {
        this.componentKey += 1;
        this.componentKey1 += 1;
    },
    }
}
</script>