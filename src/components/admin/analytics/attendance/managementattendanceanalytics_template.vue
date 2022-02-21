<template>
    <div class="container-fluid"> 
        <div>
            <h1><span v-html="$t('att_classroom_month')"/></h1>

            <hr>
            <br>
            <div class="col-lg-4" v-show="isactive==1">
            <label class="col-sm-1 control-label" style="width:50% !important">Academic Year:</label>
            <select  class="form-control gradeFilter" v-model="activeacademicDetails" v-on:change="changingacademicyear()" style="width:50%" >
                  <option value="" disabled>-- Select Academic year --</option>
                  <option v-for="academic in activeacademicsandboards" 
                     v-bind:value="{passingyear: academic.passingyear,academicyearid: academic.id,syllabustype:academic.syllabustype,syllabusid:academic.syllabusid}" 
                     :key='academic.id+academic.syllabustype'
                     v-show="academic.active"
                  >{{academic.passingyear}}-{{academic.syllabustype}}</option>
            </select>
         </div>
         <div class="col-lg-4" v-show="isactive==0">
            <label class="col-sm-1 control-label" style="width:40% !important">Archived Years:</label>
            <select  class="form-control gradeFilter" v-model="archivedacademicDetails" v-on:change="changingacademicyear()" style="width:50%" >
                  <option value="" disabled>-- Select Academic year --</option>
                  <option v-for="academic in archivedacademicsandboards" 
                     v-bind:value="{academicyearid: academic.id,syllabustype:academic.syllabustype}" 
                     :key='academic.id+academic.syllabustype'
                     v-show="!academic.active"
                  >{{academic.passingyear}}-{{academic.syllabustype}}</option>
            </select>
         </div>
         <div style="float:left;width:25%" class="col-lg-4">
            <label class="col-sm-1 control-label" style="width:35%">Grade :</label>
            <select class="form-control gradeFilter" @change.prevent="selectGrade()" style="width:51%;margin-right:7px" v-model="grade" v-on:change="updateData()">
            <option v-for="grade in gradesList" v-bind:value="grade.id">{{grade.gradename}}</option>
        </select>
         </div>
         <div style="float:left;width:25%" class="col-lg-3">
            <label class="col-sm-1 control-label" style="width:35%">Section:</label>
            <select class="form-control gradeFilter" style="width:51%;margin-right:7px" v-model="section" :disabled="grade == 0" v-on:change="updateData()" >
            <option v-for="section in sectionsList" v-bind:value="section.sectionname">Section - {{section.sectionname}}</option>
        </select>
         </div>
         <div style="float:left;" class="col-lg-2" @change="changestatus">
            <label><input type="radio"  name="status" value=1 v-model="isactive">Active</label>
            <label><input type="radio"  name="status" value=0 v-model="isactive">Archived</label>
         </div>
         <br>
         <hr/>
         <div v-if="noOfPoints === 0"><p style="color:red"> Data is not available</p></div>
         <div v-if="noOfPoints === -1"><p style="color:blue"> Please select above details</p></div>
            <highcharts :options="options1"></highcharts>
            <!--column-chart download="data" :stacked="true" xtitle="Grade" ytitle="%" :data="booksdata"  :messages="{empty: 'No data'}" :min="0" :max="100"></column-chart-->
        
        </div>
         <div>
            <h1><span v-html="$t('att_grade_month')"/></h1>
            <hr>
            <br>
            <column-chart download="data"  xtitle="Grade" ytitle="Absentees" :data="[['Kinder-Garten', 2],['Grade-1', 5], ['Grade-2',1],['Grade-3', 2],['Grade-4',4],['Grade-5',0],['Grade-6',2],['Grade-7',8],['Grade-8',1],['Grade-9',3],['Grade-10',0]]"></column-chart>

        </div>
    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';
    export default{
        created() {
            this.selectAcadamicYear();
        },
        data(){
            return{
                 tenantId: this.$cookie.get('id'),
                 activeacademicsandboards:[],
                 archivedacademicsandboards:[],
                 academicsandboards:{},
                 isactive:1,
                 noOfPoints:-1,
                 grade:13,
                 gradesList:[],
                 section:14,
                 sectionsList:[],
                 sectionsListCopy:[],
                 academicYearsData:'',
                 academicDetails:'',
                 options1:{
                      chart: {
                        type: 'heatmap',
                        marginTop: 40,
                        marginBottom: 80,
                        plotBorderWidth: 0
                        },
                        title: {
                         text: 'Attendance'
                        },
                        legend: {
                            enabled: true
                            },
                        xAxis: {
                            categories:['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                        },

                        yAxis: {
                            categories:  ['Mohan', 'Gayatri', 'Yamini', 'Rohith', 'Mounika', 'Surya', 'Ravinder', 'Tanmai', 'Nikitha', 'Vinitha'],
                            title: "students"
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.yAxis.categories[this.point.y]+ '</b> Present for <br><b>' +
                                this.point.value+' days '+ '</b> in <b>' +this.series.xAxis.categories[this.point.x] + '</b>';
                            }
                        },
                        colorAxis: {
                            min: 0,
                            max:30,
                            minColor: '#D1C4E9',
                            maxColor: '#673AB7'
                        },


                        series: [{
                            name: 'Attendance per Student',
                            
                            borderWidth: 0.5,
                            data: '',
                            /*[[0, 0, 25], [0, 1, 18], [0, 2, 8], [0, 3, 20], [0, 4, 22],[0,5,25],[0,6,30],[0, 7, 10], [0, 8, 17], [0, 9, 31], 
                                    [1, 0, 30], [1, 1, 20], [1, 2, 25], [1, 3,30], [1, 4, 25],[1,5,17],[1,6,18],[1, 7, 20], [1, 8, 25], [1, 9, 28], 
                                    [2, 0, 31], [2, 1, 26], [2, 2, 21], [2, 3, 30], [2, 4, 30],[2,5,30],[2,6,27],[2, 7, 26], [2, 8, 25], [2, 9, 18],
                                    [3, 0, 30], [3, 1, 20], [3, 2, 28], [3, 3, 30], [3, 4, 25],[3,5,27],[3,6,30],[3, 7, 31], [3, 8, 22], [3, 9, 30], 
                                    [4, 0, 30], [4, 1, 25], [4, 2, 28], [4, 3, 19], [4, 4, 28],[4,5,30],[4,6,14],[4, 7, 11], [4, 8, 29], [4, 9, 28],
                                    [5, 0, 27], [5, 1, 28], [5, 2, 12], [5, 3, 20], [5, 4, 29],[5,5,31],[5,6,18],[5, 7, 20], [5, 8, 29], [5, 9, 30],
                                    [6, 0, 28], [6, 1, 26], [6, 2, 14], [6, 3, 19], [6, 4, 22],[6,5,26],[6,6,30],[6, 7, 26], [6, 8, 25], [6, 9, 30],
                                    [7, 0, 31], [7, 1, 21], [7, 2, 22], [7, 3, 15], [7, 4, 30],[7,5,28],[7,6,24],[7, 7, 10], [7, 8, 29], [7, 9, 31],
                                    [8, 0, 25], [8, 1, 27], [8, 2, 12], [8, 3, 19], [8, 4, 28],[8,5,29],[8,6,14],[8, 7, 10], [8, 8, 19], [8, 9, 23],
                                    [9, 0, 27], [9, 1, 11], [9, 2, 31], [9, 3, 30], [9, 4, 29],[9,5,29],[9,6,14],[9, 7, 11], [9, 8, 29], [9, 9, 24],
                                    [10, 0, 10], [10, 1, 29], [10, 2, 28], [10, 3, 17], [10, 4, 26],[10,5,26],[10,6,24],[10, 7, 13], [10, 8, 19], [10, 9, 15],
                                    [11, 0, 22], [11, 1, 18], [11, 2, 28], [11, 3, 28], [11, 4, 28],[11,5,18],[11,6,15],[11, 7, 15], [11, 8, 13], [11, 9, 12],
                                  ],*/
                            dataLabels: {
                                enabled: false,
                            }
                        }]
                    },
                booksdata : [
                    {
                        name: "High", 
                        data: [["Kinder-Garten", 10],["Grade-1", 7],["Grade-2", 5], ["Grade-3", 4], ["Grade-4", 5],["Grade-5", 10],["Grade-6", 6],["Grade-7", 7],["Grade-8", 8],["Grade-9", 10],["Grade-10", 0]]
                    },
                    {
                        name: "Average", 
                        data: [["Kinder-Garten", 9],["Grade-1", 5],["Grade-2", 3], ["Grade-3", 4], ["Grade-4", 4],["Grade-5", 5],["Grade-6", 5],["Grade-7", 5],["Grade-8", 6],["Grade-9", 1],["Grade-10", 0]]
                    },
                    {
                        name: "Low", 
                        data: [["Kinder-Garten", 8],["Grade-1", 4],["Grade-2", 1], ["Grade-3", 0], ["Grade-4", 1],["Grade-5", 2],["Grade-6", 3],["Grade-7", 1],["Grade-8", 4],["Grade-9", 2],["Grade-10", 0]]
                        
                    
                    }
                ]
            }
        },
        methods:
        {
            selectAcadamicYear:function(){
                
                 UserService.AcademicYears(this.tenantId).then((response)=>{
                    this.academicYearsData = response.data;
                    this.academicsandboards=response.data.academics;
                    console.log(this.academicsandboards);
                    // this.activeacademicsandboards=_.map(this.academicsandboards,function(academics){if(academics.active){return academics;}});
                    for(let i=0;i<this.academicsandboards.length;i++){
                        if(this.academicsandboards[i].active){
                        this.activeacademicsandboards.push(this.academicsandboards[i]);
                        } else {
                        this.archivedacademicsandboards.push(this.academicsandboards[i]);
                        }
                    }
                    console.log(this.activeacademicsandboards);
                    this.activeacademicDetails= {
                        academicyearid : this.activeacademicsandboards[0].id,
                        syllabustype : this.activeacademicsandboards[0].syllabustype
                    }
                    this.archivedacademicDetails= {
                        academicyearid : this.archivedacademicsandboards[0].id,
                        syllabustype : this.archivedacademicsandboards[0].syllabustype
                    }
                    this.academicDetails = this.activeacademicDetails;
                    //this.getGradeList();
                }).catch(error =>{
                    console.log(JSON.stringify(error.data))
                })

            },
            changestatus: function(){
                if(this.isactive == 1){
                    this.academicDetails = this.activeacademicDetails
                } else {
                    this.academicDetails = this.archivedacademicDetails
                }
                this.getGradeList();
            },
            updateData:function(){
                
                UserService.getHMDataForAcademicAttendanceByMonth(this.tenantId,this.academicDetails.passingyear,this.grade,this.section,this.academicDetails.syllabusid).then((response)=>{
                    this.attendanceData = response.data;
                    console.log(response.data);
                    this.options1.xAxis.categories=response.data.xAxis;
                    this.options1.yAxis.categories=response.data.yAxis;
                    this.options1.series[0].data=response.data.points;
                    this.noOfPoints=response.data.points.length;
                }).catch(error =>{
                    console.log(JSON.stringify(error.data))
                });
                
            },

            changingacademicyear: function(){
                if(this.isactive == 1){
                    this.academicDetails = this.activeacademicDetails
                } else {
                    this.academicDetails = this.archivedacademicDetails
                }
                this.getGradeList();
                this.updateData();
            
            },
            selectGrade: function() {
                this.sectionsList = [];
                let length = this.sectionsListCopy.length;
                for (let i = 0; i < length; i++) {
                    if (this.grade == this.sectionsListCopy[i].gradeid) {
                        this.sectionsList.push(this.sectionsListCopy[i]);
                    }
                }
                if(this.sectionsList.length > 0 && this.setSectionId){
                    this.section = this.sectionsList[0].id;
                }
                this.setSectionId = true;
                this.updateData();

            },
            getGradeList : function(){
                UserService.Grades(this.academicDetails.syllabustype, this.tenantId).then((response) => {
                    this.gradeListCopy = response.data;
                    console.log(JSON.stringify(response.data))
                    //this.grade = this.gradeListCopy[0].id;
                    this.getSectionsList();
                })
            },
            getSectionsList : function(){
                UserService.Sections(this.academicDetails,this.tenantId).then((response)=>{
                    console.log(JSON.stringify(response.data))
                    this.gradesList = [];
                    this.sectionsList=[];
                    this.sectionsListCopy = response.data;
                    let length = this.gradeListCopy.length;
                    let sectionsLength = this.sectionsListCopy.length;
                    let temp = [];
                    for(let i=0;i<length;i++){
                        for(let j=0;j<sectionsLength;j++){
                            if(this.gradeListCopy[i].id == this.sectionsListCopy[j].gradeid && 
                                temp.indexOf(this.gradeListCopy[i].id) == -1){
                                console.log(this.gradeListCopy[i]);
                                this.gradesList.push(this.gradeListCopy[i]);
                                temp.push(this.gradeListCopy[i].id);
                                break;
                            }
                        }
                    }
                    //console.log(this.gradesList)
                    
                    this.grade = this.gradesList[0].id;
                    for (let i = 0; i < sectionsLength; i++) {
                        if (this.grade == this.sectionsListCopy[i].gradeid) {
                            this.sectionsList.push(this.sectionsListCopy[i]);
                        }
                    }console.log(this.sectionsList);
                    if(this.sectionsList.length > 0 && this.setSectionId){
                        this.section = this.sectionsList[0].id;
                    }
                    
                    this.setSectionId = true;
                })
            }

        }
    }
</script>
