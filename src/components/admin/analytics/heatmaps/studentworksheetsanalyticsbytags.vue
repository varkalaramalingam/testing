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
                <option v-for="teacher in teacherDetails" v-bind:value="teacher.teacherid">{{teacher.teachername}}</option>
            </select>
     </div>
     <div style="margin-top:-30px;margin-left:940px;width:200px">
            <label class="col-sm-1 control-label" style="width: 20px; margin-left: -160px;">Grades-Subjects:</label>
              <select class="form-control gradeFilter" v-model="classroomDetails" v-on:change="getClassroomWorksheets()">
                <option value="" disabled> All </option>
                <option v-for="grades in gradesAndSubjectsList" v-bind:value="{classroomid:grades.id,subjectid:grades.subjectid}">{{grades.gradename}}/{{grades.sectionname}}/{{grades.subjectname}}</option>
            </select>
       </div><br><br><br>
       <div style="margin-top:-30px;margin-left:140px;width:300px">
            <label class="col-sm-1 control-label" style="width: 20px; margin-left: -120px;">Worksheet</label>
              <select class="form-control gradeFilter" v-model="worksheet_id"  v-on:change="worksheetAnalytics()">
                <!-- <option value=""> All </option> -->
                <option v-for="worksheet in worksheetslist" v-bind:value="worksheet.w_id">{{worksheet.worksheet_name}}</option>
            </select>
       </div><hr>
        <div style="margin-left:80px">
            <h4 style="font-size:1.75em;">Worksheet Analytics Table</h4>
        </div>
       <div class="col-lg-12 worksheetstable reset-padding reset-margin">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Test ID</div>
                        <div class="divTableCell">student ID</div>
                        <div class="divTableCell">student Name</div>
                        <!-- <div class="divTableCell">Assigned date</div> -->
                        <!-- <div class="divTableCell">Submitted date</div> -->
                        <div class="divTableCell" v-for="dod in dodanalysisdata" :key="dod.degreeofdifficulty" v-show="dodanalysisdata.length!=0">{{dod.degreeofdifficulty}}</div>
                        <div class="divTableCell" v-for="tag in tagsanalysisdata" :key="tag.id" v-show="tagsanalysisdata.length!=0" >
                            <div v-if="tag.tagname!=null" :key="tag.tagname">{{tag.tagname}}</div>
                            <div v-else-if="tag.tagname==null" :key="tag.tagname">General</div>
                        </div>
                        <div class="divTableCell">Secured Marks</div>
                    </div>
                    <div class="divTableRowdata" v-for="studentdata in analysisdatavalues" :key="studentdata[0].ws_testid" v-show="analysisdatavalues.length>0"> 
                        <div class="divTableCelldata">{{studentdata[0].ws_testid}}</div>
                        <div class="divTableCelldata">{{studentdata[0].id}}</div>
                        <div class="divTableCelldata">{{studentdata[0].name}}</div>
                        <!-- <div class="divTableCelldata">{{getEntryDate(studentdata[0].assigneddate)}}</div> -->
                        <!-- <div class="divTableCelldata">{{getEntryDate(studentdata[0].submitteddate)}}</div> -->
                        <div class="divTableCelldata" 
                            v-for="(dod,index) in studentdata[0].degreeLevelQuestions" 
                            :key="dod.degreeofdifficulty"
                            v-show="dodanalysisdata.length!=0"
                        >{{dod.correct}}/{{dodanalysisdata[index].total}}</div>
                        <div class="divTableCelldata" 
                            v-for="(tag,index) in studentdata[0].questionsTags" 
                            :key="tag.tagname"
                            v-show="tagsanalysisdata.length!=0"
                        >{{tag.correct}}/{{tagsanalysisdata[index].total}}
                        </div>
                        <div class="divTableCelldata">{{studentdata[0].securedmarks}}/{{studentdata[0].max_marks}}</div>
                    </div>
                </div>
            </div>
        </div>
    
        <hr>
        <br>
        <div class="col-lg-4">
        </div>
        <div class="col-lg-4" style="padding-left:100px;padding-top:20px;padding-bottom:20px">
            <button type="button" class="btn btn-info" v-on:click.prevent="showheat=false,showstackedbar=true">Stacked Bar</button>
            <button type="button" class="btn btn-info" v-on:click.prevent="showstackedbar=false;showheat=true">Heatmap</button>
        </div>
        <div class="col-lg-12 worksheetstable reset-padding reset-margin" v-show="showstackedbar">
            <highcharts
            :stacked="true"
            :options="baranalysisdata"
            ref="barChart"
            v-if="baranalysisdata.series.length!=0&&showstackedbar1"
            :key="componentKey"
            ></highcharts>
            <div class="col-lg-8 text-right" v-else style="padding-right:130px;color:red" ><h4>No Data To Display</h4></div>
        </div>
        <div class="col-lg-12 worksheetstable reset-padding reset-margin" v-show="showheat">
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
            analysisdataworksheet:[],
            worksheetanalysisdata:{},
            dodanalysisdata:[{total:0}],
            tagsanalysisdata:[{total:0}],
            baranalysisdata: {
                chart: {
                    type: "bar",
                },
                title: {
                    text: "Tag Analysis for Students of a Classroom",
                },
                subtitle: {},
                xAxis: {
                    categories: [],
                    title: {
                    text: null,
                    },
                },
                yAxis: {
                    min: 0,
                    title: {
                    text: "No of Questions",
                    align: "high",
                    },
                    labels: {
                    overflow: "justify",
                    },
                },
                tooltip: {
                },
                plotOptions: {
                    bar: {
                    dataLabels: {
                        enabled: true,
                    },
                    },
                    series: {
                    stacking: "normal",
                    },
                },
                legend: {
                    reversed: true,
                    // layout: "vertical",
                    // layout: "proximate",
                    layout: "horizontal",
                    // align: "right",
                    verticalAlign: "top",
                    // x: -40,
                    // y: 80,
                    // floating: true,
                    borderWidth: 1,
                    backgroundColor:
                    (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || "#FFFFFF",
                    shadow: true,
                },
                credits: {
                    enabled: false,
                },
                series: [],
            },
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

                // accessibility: {
                //     point: {
                //     descriptionFormatter: function (point) {
                //         var ix = point.index + 1,
                //         xName = getPointCategoryName(point, 'x'),
                //         yName = getPointCategoryName(point, 'y'),
                //         val = point.value;
                //         return ix + '. ' + xName + ' sales ' + yName + ', ' + val + '.';
                //     }
                //     }
                // },

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
                
                // tooltip: {
                //     formatter: function () {
                //     return '<b>' + this.getPointCategoryName(this.point, 'x') + '</b> sold <br><b>' +
                //         this.point.value + '</b> items on <br><b>' + this.getPointCategoryName(this.point, 'y') + '</b>';
                //     }
                // },

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

                // getPointCategoryName: function(point, dimension) {
                //     var series = point.series,
                //     isY = dimension === 'y',
                //     axis = series[isY ? 'yAxis' : 'xAxis'];
                //     return axis.categories[point[isY ? 'y' : 'x']];
                // },

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
                         this.getClassroomWorksheets();
                       }
                    })
                },
                getClassroomWorksheets:function(){
                     this.makeDataEmpty();
                     this.worksheetslist=[];
                    UserService.getClassroomWorksheets(this.tenantId,this.classroomDetails.classroomid,this.classroomDetails.subjectid).then((response)=>{
                       this.worksheetslist = response.data.results;
                       if(this.worksheetslist.length>0){
                          this.worksheet_id= this.worksheetslist[0].w_id;
                           this.worksheetAnalytics();
                       }
                    })
                },
                makeDataEmpty:function(){
                    // this.teacherDetails=[];
                   // this.gradesAndSubjectsList=[];
                   // this.worksheetslist=[];

                    // this.dodanalysisdata=[];
                    // this.tagsanalysisdata=[];
                    this.analysisdatavalues=[];
                    this.baranalysisdata.series=[];
                    this.heatanalysisdata.xAxis.categories=[];

                    this.analysisdatakeys=[];
                    this.analysisdata=[];

                    this.analysisdataworksheet=[];
                    this.baranalysisdata.xAxis.categories=[];
                    this.heatanalysisdata.yAxis.categories=[];
                    this.heatanalysisdata.series[0].data = [];

                },
                worksheetAnalytics:function(){
                    this.makeDataEmpty();
                    UserService.getWorksheetDesignAnalyse(this.worksheet_id, this.id).then((response)=>{
                    this.worksheetanalysisdata = response.data.resultsMap.WorksheetAnalyse; 
                    this.dodanalysisdata = response.data.resultsMap.WorksheetAnalyse[0].degreeLevelQuestions; 
                    this.tagsanalysisdata = response.data.resultsMap.WorksheetAnalyse[0].questionsTags;
                    if(this.dodanalysisdata.length == 0){
                        this.dodanalysisdata = [{total:0}];
                    }
                    if(this.tagsanalysisdata.length == 0){
                        this.tagsanalysisdata = [{total:0}];
                    }
                    let length = this.tagsanalysisdata.length
                    console.log(length,"!!!!1",this.tagsanalysisdata)
                    if(length>0){
                        for(let i =0; i<length;i++){
                        this.baranalysisdata.series[i] = {name: "", data: []} 
                        if(this.tagsanalysisdata[i].tagname!=null){
                            this.baranalysisdata.series[i].name = this.tagsanalysisdata[i].tagname;
                            this.heatanalysisdata.xAxis.categories.push(this.tagsanalysisdata[i].tagname);
                            // change X-axis and Y-axis names then you will get the reverse
                            } else {
                        this.baranalysisdata.series[i].name = "General";
                        this.heatanalysisdata.xAxis.categories.push("General");
                    }
                  }
                 }        
                })
                UserService.getClassroomWorksheetsAnalyse(this.id,this.worksheet_id,this.classroomDetails.classroomid).then((response)=>{
                    this.analysisdata=response.data.resultsMap.Analyse;
                    this.analyseWorksheet();
                    this.forceRerender();
                })
            },
            getPointCategoryName: function(point, dimension) {
            var series = point.series,
            isY = dimension === 'y',
            axis = series[isY ? 'yAxis' : 'xAxis'];
            return axis.categories[point[isY ? 'y' : 'x']];
        },
        forceRerender() {
          this.componentKey += 1;
          this.componentKey1 += 1;
        },
        analyseWorksheet: function(){
            this.analysisdatakeys = Object.keys(this.analysisdata)
            this.analysisdatavalues = [];
           
            for(var prop in this.analysisdata){
                if(prop =="worksheet"){
                    this.analysisdataworksheet=this.analysisdata[prop];
                    delete this.analysisdata[prop];
                } 
                else {
                    if(this.analysisdata[prop][0].securedmarks!=null){
                        this.analysisdatavalues.push(this.analysisdata[prop])
                    }
                }
            }
            let length = this.analysisdatavalues.length;
            var self = this;
            var k = 0;
            this.heatanalysisdata.series[0].data = [];
            if(length==0){
                this.baranalysisdata.xAxis.categories=[];
                this.baranalysisdata.series=[];
            }
            else{
                 this.showstackedbar1 = true;
                for(let i =0; i<length;i++){
                if(this.analysisdatavalues[i] != undefined){
                    this.baranalysisdata.xAxis.categories.push(this.analysisdatavalues[i][0].name + " " + this.getEntryDate(self.analysisdatavalues[i][0].assigneddate));
                    this.heatanalysisdata.yAxis.categories.push(this.analysisdatavalues[i][0].name + " " + this.getEntryDate(self.analysisdatavalues[i][0].assigneddate));
                    let serieslength = this.analysisdatavalues[i][0].questionsTags.length;
                    let barlength = this.baranalysisdata.series.length;
                    for(let j =0; j<serieslength && j<barlength;j++){
                        this.heatanalysisdata.series[0].data[k] = [];
                        if(this.analysisdatavalues[i][0].questionsTags[j].correct!=null){
                            this.baranalysisdata.series[j].data.push(this.analysisdatavalues[i][0].questionsTags[j].correct);
                            this.heatanalysisdata.series[0].data[k].push(j);
                            this.heatanalysisdata.series[0].data[k].push(i);
                            this.heatanalysisdata.series[0].data[k].push(this.analysisdatavalues[i][0].questionsTags[j].correct);
                        } else {
                           this.baranalysisdata.series[j].data.push(0);
                           this.heatanalysisdata.series[0].data[k].push(j);
                           this.heatanalysisdata.series[0].data[k].push(i); 
                           this.heatanalysisdata.series[0].data[k].push(0);
                        }
                        k += 1;
                    }
                }
             }
            }
            this.forceRerender();
        },
        getEntryDate:function(date){
            return moment(date).format('DD/MM/YYYY');
        }
       }
    }
</script>
<style>
.groupFilter{
    float:left;
    width:25%;
}
</style>