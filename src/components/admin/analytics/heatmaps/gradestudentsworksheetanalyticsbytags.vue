<template>
<div>
    <div> 
        <br><br><br>
        <label class="col-sm-1 control-label" style="width:140px; margin-left: 0px;">Academic Year :</label>
        <select  class="form-control popUpEle selectSubject" style="width: 20%; margin-left: 30px;" v-model="academicYearDetails" v-on:change="getAcademicGrades()">
        <option value="" disabled>-- Select Academic year --</option>
        <option v-for="academic in academicsandboards" 
            v-bind:value="{academicyearid: academic.id,syllabustype:academic.syllabustype, passingyear:academic.passingyear}" 
            :key='academic.id+academic.syllabustype'
        >{{academic.passingyear}}-{{academic.syllabustype}}    <div v-if="academic.active === 1"> - Active </div> </option>
        </select>
    </div>
    <div style="margin-top:-30px;margin-left:540px;width:200px">
            <label class="col-sm-1 control-label" style="width: 20px; margin-left: -160px;">Grades:</label>
              <select class="form-control gradeFilter" v-model="academicgradeid" v-on:change="getSubjects()">
                <option value="" disabled> All </option>
                <option v-for="academicgrade in academicgrades" v-bind:value="academicgrade.id" :key="academicgrade.id">{{academicgrade.academicgradename}}</option>
            </select>
     </div>
     <div style="margin-top:-30px;margin-left:940px;width:200px">
        <label class="col-sm-1 control-label" style="width: 20px; margin-left: -160px;">Grades-Subjects:</label>
            <select class="form-control gradeFilter" v-model="subjectid" v-on:change="getGradeWorksheetsAnalytics()">
            <option value="" disabled> All </option>
            <option v-for="subject in subjects" v-bind:value="subject.id" :key="subject.id">{{subject.subjectname}}</option>
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
                    <div class="divTableCell">Section Name</div>
                    <div class="divTableCell">Claa Teacher</div>
                    <div class="divTableCell" v-for="dod in dodnames" :key="dod.degreeofdifficulty" v-show="dodnames.length!=0">{{dod.degreeofdifficulty}}</div>
                    <div class="divTableCell" v-for="tag in tagnames" :key="tag.id" v-show="tagnames.length!=0" >
                        <div :key="tag.tagname">{{tag.tagname}}</div>
                    </div>
                </div>
                <div class="divTableRowdata" v-for="studentdata in displaydatavalues" :key="studentdata.studentid" v-show="displaydatavalues.length>0"> 
                    <div class="divTableCelldata">{{studentdata.studentid}}</div>
                    <div class="divTableCelldata">{{studentdata.name}}</div>
                    <div class="divTableCelldata">{{studentdata.sectionname}}</div>
                    <div class="divTableCelldata">{{studentdata.classteacher}}</div>
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
        <h3><u>Heatmaps</u></h3>
    </div>
    <div class="col-lg-12 reset-padding reset-margin" v-for="(heatdata,index) in heatanalyses" :key="heatdata.id">
        <highcharts
            :options="heatdata"
            style="min-height: 400px; min-width:1200px "
            v-if="heatdata.series[0].data.length!=0"
        ></highcharts>
        <div v-else style="text-align:center;color:red" ><h4>No Data To Display For Section {{classdetails[index].sectionname}}, Teacher: {{classdetails[index].teachername}}</h4></div>
        <br>
    </div>
</div>
</template>

<script>
import UserService from '../../../../services/userService.js';
import VueHighcharts from "vue2-highcharts";
import Highcharts from "highcharts";
export default {
    data(){
        return{
            tenantId:this.$cookie.get('id'),
            academicYearDetails:{},
            academicsandboards:[],
            academicgrades:[],
            academicgradeid:0,
            subjects:[],
            subjectid:0,
            gradeAnalysisData:[],
            analysisdatavalues:[],
            displaydatavalues:[],
            dodnames:[],
            tagnames:[],
            heatanalyses:[],
            classdetails:[],
            heatanalysisdata1:{
            },
            minColors:[],
            maxColors:[],
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
                    name: 'Tag analysis for Students of a classroom',
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
                    console.log(this.academicYearDetails)
                    this.getAcademicGrades();
                }
            })    
        },
        getAcademicGrades: function(){
            UserService.academicGradesBasedOnAcademic(this.academicYearDetails.academicyearid, this.tenantId).then((response)=>{
                this.academicgrades = response.data;
                if(this.academicgrades.length>0){
                    this.academicgradeid = this.academicgrades[0].id;
                }
                this.getSubjects();
            })
        },
        getSubjects: function(){
            UserService.subjectsBasedOnacademicGrade(this.academicgradeid, this.tenantId).then((response)=>{
                this.subjects = response.data;
                if(this.subjects.length>0){
                    this.subjectid = this.subjects[0].id;
                }
                this.getGradeWorksheetsAnalytics();
            })
        },
        getRandomColor: function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        getGradeWorksheetsAnalytics:function(){
            UserService.getAnalysedDataOfStudentsForAGrade(this.tenantId, this.academicgradeid, this.subjectid).then((response)=>{
                console.log(response.data.resultsMap.OverallGradeAnalyse);
                this.gradeAnalysisData = response.data.resultsMap.OverallGradeAnalyse;
                let values = Object.values(this.gradeAnalysisData);
                let keys = Object.keys(this.gradeAnalysisData);
                console.log(values);
                this.analysisdatavalues = [];
                this.displaydatavalues = [];
                this.dodnames = [];
                this.tagnames = [];
                this.classdetails = [];
                // for getting all student data
                for(let i=0;i<values.length;i++){
                    for(var studentdata in values[i].analyseclass){
                        this.analysisdatavalues.push(values[i].analyseclass[studentdata]);
                    }
                }
                console.log(this.analysisdatavalues, keys);
                for(let i=0;i<this.analysisdatavalues.length;i++){
                    // for getting all degree of difficulties
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
                    // for getting all tags
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
                console.log(this.dodnames, this.tagnames);
                this.heatanalyses = [];
                let b =0;
                // for getting overall heatmap data
                for(let a=0;a<values.length;a++){
                    let heatdatavalues = [];
                    let classdetails = [];
                    for(var studentdata in values[a].analyseclass){
                        heatdatavalues.push(values[a].analyseclass[studentdata]);
                    }
                    classdetails = values[a].classdetails;
                    this.classdetails.push(classdetails);
                    var k = 0;
                    // this.heatanalysisdata1 = {...this.heatanalysisdata};
                    this.heatanalysisdata1 = JSON.parse(JSON.stringify(this.heatanalysisdata));
                    this.heatanalysisdata1.id = keys[a];
                    console.log(this.heatanalysisdata1);
                    // for getting overall student data and storing in displaydatavalues, for independent heatmap data
                    for(let i=0;i<heatdatavalues.length;i++){
                        this.displaydatavalues[b] = {studentid:0,name:"",sectionname:"",classteacher:"",degreeLevelQuestions:[],questionsTags:[]};
                        this.displaydatavalues[b].studentid = heatdatavalues[i].id;
                        this.displaydatavalues[b].name = heatdatavalues[i].name;
                        this.displaydatavalues[b].sectionname = classdetails.sectionname;
                        this.displaydatavalues[b].classteacher = classdetails.teachername;
                        this.heatanalysisdata1.yAxis.categories.push(heatdatavalues[i].name);
                        this.heatanalysisdata1.colorAxis.minColor = this.getRandomColor();
                        this.heatanalysisdata1.colorAxis.maxColor = this.getRandomColor();
                        this.heatanalysisdata1.title.text = 'Tag analysis for section ' + classdetails.sectionname + ' under ' + classdetails.teachername;
                        for(var dod in this.dodnames){
                            this.displaydatavalues[b].degreeLevelQuestions[dod] = {};
                            this.displaydatavalues[b].degreeLevelQuestions[dod].id = this.dodnames[dod].id;
                            this.displaydatavalues[b].degreeLevelQuestions[dod].degreeofdifficulty = this.dodnames[dod].degreeofdifficulty;
                            let contained = false;
                            for(var dodkey in heatdatavalues[i].degreeLevelQuestions){
                                let dodmain = heatdatavalues[i].degreeLevelQuestions[dodkey];
                                if(this.dodnames[dod].id == dodmain.id){
                                    this.displaydatavalues[b].degreeLevelQuestions[dod].correct = dodmain.correct;
                                    this.displaydatavalues[b].degreeLevelQuestions[dod].tdis = dodmain.correct;
                                    contained = true;
                                    break;
                                }
                            }
                            for(var dodkey in heatdatavalues[i].degreeLevelQuestionsTotal){
                                let dodmain = heatdatavalues[i].degreeLevelQuestionsTotal[dodkey];
                                if(this.dodnames[dod].id == dodmain.id){
                                    this.displaydatavalues[b].degreeLevelQuestions[dod].total = dodmain.total;
                                    break;
                                }
                            }
                            if(contained == false){
                                this.displaydatavalues[b].degreeLevelQuestions[dod].tdis = "NONE";
                                this.displaydatavalues[b].degreeLevelQuestions[dod].correct = 0;
                            }
                        }
                        for(var tag in this.tagnames){
                            this.displaydatavalues[b].questionsTags[tag] = {};
                            this.displaydatavalues[b].questionsTags[tag].id = this.tagnames[tag].id;
                            this.displaydatavalues[b].questionsTags[tag].tagname = this.tagnames[tag].tagname;
                            this.heatanalysisdata1.series[0].data[k] = [];
                            let contained = false;
                            for(var tagkey in heatdatavalues[i].questionsTags){
                                let tagmain = heatdatavalues[i].questionsTags[tagkey];
                                if(this.tagnames[tag].id == tagmain.id){
                                    this.displaydatavalues[b].questionsTags[tag].correct = tagmain.correct;
                                    this.displaydatavalues[b].questionsTags[tag].tdis = tagmain.correct;
                                    contained = true;
                                    break;
                                }
                            }
                            for(var tagkey in heatdatavalues[i].questionsTagsTotal){
                                let tagmain = heatdatavalues[i].questionsTagsTotal[tagkey];
                                if(tagmain.tagname == null){
                                    tagmain.tagname = "GENERAL";
                                    tagmain.id = 0;
                                }
                                if(this.tagnames[tag].id == tagmain.id){
                                    this.displaydatavalues[b].questionsTags[tag].total = tagmain.total;
                                    break;
                                }
                            }
                            if(contained == false){
                                this.displaydatavalues[b].questionsTags[tag].tdis = "NONE"
                                this.displaydatavalues[b].questionsTags[tag].correct = 0;
                            }
                            console.log(typeof(tag));
                            this.heatanalysisdata1.series[0].data[k].push(Number(tag));
                            this.heatanalysisdata1.series[0].data[k].push(i);
                            // change i to j when changing X-axis and Y-axis
                            // this.heatanalysisdata.series[0].data[k].push(this.displaydatavalues[b].questionsTags[tag].correct);
                            if(this.displaydatavalues[b].questionsTags[tag].tdis != "NONE"){
                            this.heatanalysisdata1.series[0].data[k].push(this.displaydatavalues[b].questionsTags[tag].tdis);
                            } else {
                            this.heatanalysisdata1.series[0].data[k].push("X"); 
                            }
                            k++;
                        }
                        b++;
                    }
                    this.heatanalyses.push(JSON.parse(JSON.stringify(this.heatanalysisdata1)));
                }
                console.log(this.displaydatavalues)
                for(let j=0;j<this.heatanalyses.length;j++){
                    for(var tag in this.tagnames){
                        this.heatanalyses[j].xAxis.categories.push(this.tagnames[tag].tagname);
                    }
                }
                console.log(this.heatanalyses);
            })
        }
    }
}
</script>

<style>

</style>