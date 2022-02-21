<template>
    <div>
    <div class="col-lg-12">
        <div class="col-lg-10 text-left">
            <!-- <h3 class="student-head"><span v-html="$t('worksheets')"/></h3> -->
        </div>
        </div>
        <!-- {{mysubject}} -->
        <div class="row">
            <div class="col-sm-12" v-if="analysisdataworksheet.length!=0">
                <!-- <h3 class="student-head" style="text-align:center;color:green">{{analysisdataworksheet[0].w_id}}</h3> -->
                <h3 class="student-head" style="text-align:center;color:green">{{analysisdataworksheet[0].worksheet_name}}</h3>
                <!-- <h3 class="student-head" style="text-align:center;color:green">{{analysisdata}}</h3> -->
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-6" style="text-align:right;">Grade :
            </div>
            <div class="col-sm-6">{{mysubject.gradename}}</div>
        </div>
        <div class="row">
            <div class="col-sm-6" style="text-align:right;">Created By :
            </div>
            <div class="col-sm-6" v-if="analysisdataworksheet.length!=0">{{analysisdataworksheet[0].createdby}}</div>
        </div>
        <div class="row">
            <div class="col-sm-6" style="text-align:right;">Degree Of Difficultty :
            </div>
            <div class="col-sm-6" v-if="analysisdataworksheet.length!=0">{{analysisdataworksheet[0].degreeofdifficulty}}</div>
        </div>
        <hr>
        <!-- <div class="row">
            <div class="col-sm-6" style="text-align:right;">Test Mode :
            </div>
            <div class="col-sm-6">{{selectedTestObj.testmode}}</div>
        </div>
        <div class="row">
            <div class="col-sm-6" style="text-align:right;">Max. marks :
            </div>
            <div class="col-sm-6">{{selectedTestObj.maxmarks}}</div>
        </div> -->
        <div class="col-lg-12 worksheetstable reset-padding reset-margin">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <!-- <div class="divTableCell">Worksheet ID</div> -->
                        <!-- <div class="divTableCell">Worksheet Name</div> -->
                        <div class="divTableCell">Test ID</div>
                        <div class="divTableCell">student ID</div>
                        <div class="divTableCell">student Name</div>
                        <div class="divTableCell">Assigned date</div>
                        <div class="divTableCell">Submitted date</div>
                        <!-- {{analysisdatavalues[0][0]}} -->
                        <!-- <div class="divTableCell" 
                            v-show="analysisdatavalues.length!=0" 
                            v-for="dod in analysisdatavalues[0][0].degreeLevelQuestions" 
                            :key="dod.degreeofdifficulty"
                        >{{dod.degreeofdifficulty}}</div>
                        <div class="divTableCell"
                            v-show="analysisdatavalues.length!=0" 
                            v-for="tag in analysisdatavalues[0][0].questionsTags" 
                            :key="tag.tagname"
                        >{{tag.tagname}}</div> -->
                        <div class="divTableCell" v-for="dod in dodanalysisdata" :key="dod.degreeofdifficulty" v-show="dodanalysisdata.length!=0">{{dod.degreeofdifficulty}}</div>
                        <!-- <div class="divTableCell" v-for="tag in tagsanalysisdata" v-if="tag.tagname!=null" :key="tag.tagname">{{tag.tagname}}</div>
                        <div class="divTableCell" v-for="tag in tagsanalysisdata" v-else :key="tag.tagname">General</div> -->
                        <div class="divTableCell" v-for="tag in tagsanalysisdata" :key="tag.id" v-show="tagsanalysisdata.length!=0" >
                            <div v-if="tag.tagname!=null" :key="tag.tagname">{{tag.tagname}}</div>
                            <div v-else-if="tag.tagname==null" :key="tag.tagname">General</div>
                        </div>
                        <!-- <div class="divTableCell">Start date</div>
                        <div class="divTableCell">End date</div>
                        <div class="divTableCell">Assigned by</div> -->
                        <div class="divTableCell">Secured Marks</div>
                    </div>
                    <div class="divTableRowdata" v-for="studentdata in analysisdatavalues" :key="studentdata[0].ws_testid" v-show="analysisdatavalues.length!=0"> 
                        <!-- <div class="divTableCelldata">{{studentdata[0]}}</div> -->
                        <div class="divTableCelldata">{{studentdata[0].ws_testid}}</div>
                        <div class="divTableCelldata">{{studentdata[0].id}}</div>
                        <div class="divTableCelldata">{{studentdata[0].name}}</div>
                        <div class="divTableCelldata">{{getEntryDate(studentdata[0].assigneddate)}}</div>
                        <div class="divTableCelldata">{{getEntryDate(studentdata[0].submitteddate)}}</div>
                        <div class="divTableCelldata" 
                            v-for="(dod,index) in studentdata[0].degreeLevelQuestions" 
                            :key="dod.degreeofdifficulty"
                            v-show="dodanalysisdata.length!=0"
                        >{{dod.correct}}/<span v-if="dodanalysisdata.length!=0&&index<dodanalysisdata.length">{{dodanalysisdata[index].total}}</span></div>
                        <div class="divTableCelldata" 
                            v-for="(tag,index) in studentdata[0].questionsTags" 
                            :key="tag.tagname"
                            v-show="tagsanalysisdata.length!=0"
                        >{{tag.correct}}/<span v-if="tagsanalysisdata.length!=0&&index<tagsanalysisdata.length">{{tagsanalysisdata[index].total}}</span>
                        </div>
                        <div class="divTableCelldata">{{studentdata[0].securedmarks}}/{{studentdata[0].max_marks}}</div>
                    </div>

                <!-- <div class="divTableRowdata" v-for="classroomSubjectWorksheet in classroomSubjectWorksheets"> 
                    <div class="divTableCelldata">{{classroomSubjectWorksheet.id}}</div>
                    <div class="divTableCelldata">
                        <button class="btnAsLink" @click="eachworksheet(classroomSubjectWorksheet)">{{classroomSubjectWorksheet.worksheet_name}}</button>
                    </div>
                    <div class="divTableCelldata">{{classroomSubjectWorksheet.gradename}} - {{classroomSubjectWorksheet.sectionname}}</div>
                    <div class="divTableCelldata">{{classroomSubjectWorksheet.subjectname}}</div>
                   <div class="divTableCelldata">{{getEntryDate(classroomSubjectWorksheet.assigneddate)}}</div>
                    <div class="divTableCelldata">{{classroomSubjectWorksheet.startdate}}</div>
                   <div class="divTableCelldata">{{classroomSubjectWorksheet.enddate}}</div>
                    <div class="divTableCelldata">{{classroomSubjectWorksheet.assignedby}}</div>
                    <div class="divTableCelldata"><button class="analyse-button" @click="analyseWorksheet(classroomSubjectWorksheet.id,classroomSubjectWorksheet.classroomid)">Analyse</button></div>
                </div> -->
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
            <!-- class="col-lg-12 worksheetstable reset-padding reset-margin" -->
            <!-- <vue-highcharts
            :stacked="true"
            :options="baranalysisdata"
            ref="barChart"
            v-if="baranalysisdata.series.length!=0&&showstackedbar1"
            :key="componentKey"
            ></vue-highcharts> -->
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
        <div class="col-lg-4">
        </div>
        <div class="col-lg-4" style="padding-left:100px;padding-top:20px;padding-bottom:20px">
            <button type="button" class="btn btn-info" :disabled="disablestripes" v-on:click.prevent="disablesquare=false,disablestripes=true,changealgo()">Stripes</button>
            <button type="button" class="btn btn-info" :disabled="disablesquare" v-on:click.prevent="disablesquare=true,disablestripes=false,changealgo()">Squarified</button>
        </div>
        <div class="col-lg-12 worksheetstable reset-padding reset-margin">
            <highcharts
                :options="treeanalysisdataforsecuredmarks"
                v-if="treeanalysisdataforsecuredmarks.series[0].data.length!=0"
            ></highcharts>
            <div class="col-lg-8 text-right" v-else style="padding-right:60px;color:red" ><h4>No Data To Display For Treemap</h4></div>
        </div>
        <br>
        <div class="col-lg-4" style="padding-top:20px;">
        </div>
        <!-- <div class="modal fade" id="worksheet" role="dialog" name="newworksheet">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">New Worksheet</h4>
                    </div>
                    <div class="modal-body">
                         <form class="form-horizantal" name="newworksheet">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Tags</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="Tags" placeholder="Tags*"  required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Worksheet Name</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="assignmentname" placeholder="Name Of Assignment*"   required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Date Of Worksheet</label>
                                </div>
                                <div class="col-md-8">
                                    <date-picker lang="en"  ></date-picker>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Due Date</label>
                                </div>
                                <div class="col-md-8">
                                    <date-picker lang="en" ></date-picker>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <router-link :to="{path:'/mysubjects/'+mysubject.gradenumber+mysubject.sectionname+'-'+mysubject.subjectname+'-'+mysubject.syllabustype+'/assignments'}" tag="button" class="btn button">Cancel</router-link>
                                    <button id="btn-post" type="submit" name="submit"  class="btn button" v-on:click.prevent="newassignment" >Save</button>
                                </div>
                            </div>
                         </form>
                      
                    </div>
                    
                </div>

            </div>
        </div> -->
            <router-view v-bind:mysubject="mysubject" v-bind:school="school" v-bind:userdetails="userdetails" v-bind:acdemicyearandboard="acdemicyearandboard"></router-view>

    </div>
</template>
<script>
import UserService from '../../../../services/userService';
import DatePicker from 'vue2-datepicker';
import moment from 'moment';
import store from "../../../../store.js";
import VueHighcharts from "vue2-highcharts";
import VueHighcharts1 from 'vue-highcharts';
import Highcharts from "highcharts";
// import loadMap from 'highcharts/modules/map';
// import loadStock from 'highcharts/modules/stock';
// loadMap(Highcharts);
// loadStock(Highcharts);

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
            disablesquare:true,
            disablestripes:false,
            analysisdata:{},
            analysisdatakeys:[],
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
                subtitle: {
                    // text: "Stacked Bar",
                    // 'Source: <a href="https://en.wikipedia.org/wiki/World_population">Wikipedia.org</a>',
                },
                xAxis: {
                    categories: [
                        // "Africa", "America", "Asia", "Europe", "Oceania"
                    ],
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
                    // valueSuffix: " millions",
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
                series: [
                    // {
                    // name: "Year 1800",
                    // data: [107, 31, 635, 203, 2],
                    // },
                    // {
                    // name: "Year 1900",
                    // data: [133, 156, 947, 408, 6],
                    // },
                    // {
                    // name: "Year 2012",
                    // data: [1052, 954, 4250, 740, 38],
                    // },
                    // {
                    // name: "",
                    // data: [],
                    // }
                ],
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
            treeanalysisdataforsecuredmarks: {
                series: [{
                    type: 'treemap',
                    layoutAlgorithm: 'squarified',
                    data: [
                    ]
                }],
                title: {
                    text: 'Treemap Tag Analysis'
                }
            },
         }
    },
    created(){
        console.log(this.mysubject,toString())
        this.wid = this.$store.state.worksheet.w_id;
        this.classroomid = this.mysubject.id;
        this.subjectid = this.mysubject.subjectid;
        console.log("Classsroom Id is:"+this.classroomid + "SubjectId is :" + this.subjectid)
        console.log("Worksheet Id is:"+this.wid)
        UserService.getWorksheetDesignAnalyse(this.wid, this.id).then((response)=>{
            console.log(response.data);
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
            console.log(this.baranalysisdata.series)
        })
        UserService.getClassroomWorksheetsAnalyse(this.id,this.wid,this.classroomid).then((response)=>{
            this.analysisdata=response.data.resultsMap.Analyse;
            console.log(response.data)
            console.log(this.analysisdata)
            this.analyseWorksheet();
        })
    },
    methods: {
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
        getRandomColor: function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        changealgo: function(){
            if(this.treeanalysisdataforsecuredmarks.series[0].layoutAlgorithm == "squarified"){
                this.treeanalysisdataforsecuredmarks.series[0].layoutAlgorithm = "stripes";
            } else {
                this.treeanalysisdataforsecuredmarks.series[0].layoutAlgorithm = "squarified";
                // this.treetaganalysisdata.series[0].layoutAlgorithm = "sliceAndDice";
            }
            console.log(this.treeanalysisdataforsecuredmarks.series[0].layoutAlgorithm);
        },
        analyseWorksheet: function(){
            this.analysisdatakeys = Object.keys(this.analysisdata)
            console.log(this.analysisdatakeys);
            this.analysisdatavalues = [];
            this.treeanalysisdataforsecuredmarks.series[0].data = [];
            for(var prop in this.analysisdata){
                if(prop =="worksheet"){
                    this.analysisdataworksheet=this.analysisdata[prop];
                    delete this.analysisdata[prop];
                } 
                else {
                    // console.log(prop);
                    if(this.analysisdata[prop][0].securedmarks!=null){
                        this.analysisdatavalues.push(this.analysisdata[prop])
                    }
                }
            }
            // this.analysisdatavalues = Object.values(this.analysisdata)
            let length = this.analysisdatavalues.length
            if(length!=0){
                this.showstackedbar1 = true;
            }
            var self = this;
            console.log(this.analysisdatavalues);
            var k = 0;
            this.heatanalysisdata.series[0].data = [];
            for(let i =0; i<length;i++){
                // console.log(this.analysisdatavalues[i][0].securedmarks,this.analysisdatavalues[i][0].assignedby)
                if(this.analysisdatavalues[i] != undefined){
                    // && this.analysisdatavalues[i][0].securedmarks != null
                    this.baranalysisdata.xAxis.categories.push(this.analysisdatavalues[i][0].name + " " + this.getEntryDate(self.analysisdatavalues[i][0].assigneddate));
                    this.heatanalysisdata.yAxis.categories.push(this.analysisdatavalues[i][0].name + " " + this.getEntryDate(self.analysisdatavalues[i][0].assigneddate));
                    this.treeanalysisdataforsecuredmarks.series[0].data[i] = {};
                    this.treeanalysisdataforsecuredmarks.series[0].data[i].name = this.analysisdatavalues[i][0].name + " " + this.getEntryDate(self.analysisdatavalues[i][0].assigneddate);
                    this.treeanalysisdataforsecuredmarks.series[0].data[i].value = this.analysisdatavalues[i][0].securedmarks;
                    this.treeanalysisdataforsecuredmarks.series[0].data[i].color = this.getRandomColor();
                    let serieslength = this.analysisdatavalues[i][0].questionsTags.length;
                    let barlength = this.baranalysisdata.series.length;
                    for(let j =0; j<serieslength && j<barlength;j++){
                        // console.log(i,j);
                        this.heatanalysisdata.series[0].data[k] = [];
                        if(this.analysisdatavalues[i][0].questionsTags[j].correct!=null){
                            this.baranalysisdata.series[j].data.push(this.analysisdatavalues[i][0].questionsTags[j].correct);
                            // console.log(this.analysisdatavalues[i][0].questionsTags[j].correct);
                            this.heatanalysisdata.series[0].data[k].push(j);
                            this.heatanalysisdata.series[0].data[k].push(i);
                            // change i to j when changing X-axis and Y-axis
                            this.heatanalysisdata.series[0].data[k].push(this.analysisdatavalues[i][0].questionsTags[j].correct);
                            // console.log(this.heatanalysisdata.series[0].data[k]);
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
            this.forceRerender();
            console.log(this.heatanalysisdata)
            console.log(this.baranalysisdata.xAxis.categories)
            console.log(this.baranalysisdata.series)
            console.log(this.analysisdatavalues);
            console.log(this.analysisdataworksheet);
            console.log(this.analysisdatakeys);
        },
        getEntryDate:function(date){
            return moment(date).format('DD/MM/YYYY');
        },
    }
}
</script>
<style>
.analyse-button {
    background-color: #0b366f;
    background-image: none;
    border-color: #0b366f;
    color: white;
    padding: 5px 30px;
    margin-top: 0px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 3px
}

.worksheetstable{
    width:100%;
}
.divTable{
    display: table;
    width: 100%;
    text-align: center;
}
.divTableRow {
    display: table-row;
    background-color: dimgray;
    color: white;
    height: 30px;
}
.divTableRowdata {
    display: table-row;
    background-color: #fff;
    color: #000;
    height: 30px;
}
.divTableHeading {
    background-color: #ffffff;
    display: table-header-group;
}
.divTableCell, .divTableHead {
    border: 1px solid #eee;
    display: table-cell;
    padding: 3px 10px;
}
.divTableCelldata{
    border: 1px solid #eee;
    display: table-cell;
    padding: 3px 10px;
}
.divTableHeading {
    background-color: #ffffff;
    display: table-header-group;
    font-weight: bold;
}
.divTableFoot {
    background-color: #ffffff;
    display: table-footer-group;
    font-weight: bold;
}
.divTableBody {
    display: table-row-group;
}
.newworksheetbutton{
    background-color: #039be5;
    background-image: none;
    border-color: #039be5;
    color:white;
    padding: 5px 30px;
    margin-top: 12%;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration:none;
    border-radius:0px
}
.newworksheetbutton:hover{
    color:white;
}
button{
    background-color:#039be5;
}
.btn{
    border-radius:0px;
    color:#fff
}
.btn:hover, .btn:focus {
    color: #fff;
    text-decoration: none;
}
.btnAsLink {
  background: none;
  border: none;
  color: blue;
}
</style>