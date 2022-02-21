<template>
<div class="container">
    <div class="row reset-padding reset-margin">
        <!-- <div class="col-lg-12 text-left">
             <div class="page-heading"><span v-html="$t('worksheets')"/></div>
             <div class="col-md-2 reset-padding reset-margin newstudentbutton">
            <button class='btn newWorksheet pull-right' style="width: 177px;" v-on:click="popUp('worksheetPopUp',open);createWorksheetObj(workSheetIndex)">New Worksheet</button>
        </div>
            <hr>
        </div> -->
        <div class="row">
            <div class="col-lg-6">
		        <div class="page-heading"><span v-html="$t('assigned_worksheets')"/></div>
            </div>
        </div>
		<hr/>
    </div>
    <div class="row reset-padding reset-margin">
        <div id="custom-search-input" class="col-md-10 reset-padding reset-margin" style="width:25%">
            <div class="input-group searchbar">
                <input v-model='search' type="text" class="search-query form-control" placeholder="Search worksheet name">
                <span class="input-group-btn">
                        <button class="btn search-btn" type="button">
                            <span class=" glyphicon glyphicon-search"></span>
                </button>
                </span>
            </div>
        </div>
        <div>
            <label class="col-sm-1 control-label" style="width:8.3%;margin-top: 6px;">Grade :</label>
            <select class="form-control gradeFilter" v-model="searchGradeId">
               <option value=0> All </option>
               <option v-for="grade in listOfGrades" v-bind:value="grade.id">{{grade.gradename}}</option>
            </select>
         </div>
         <div>
            <label class="col-sm-1 control-label" style="width:8.3%;margin-top: 6px;">Subject :</label>
            <select class="form-control gradeFilter" v-model="searchSubjectId">
               <option value=0> All </option>
               <option v-for="subject in listOfSubjects" v-bind:value="subject.id">{{subject.subjectname}}</option>
            </select>
         </div>
         <div>
            <label class="col-sm-1 control-label" style="width:9.3%;margin-top: 6px;">Difficulty :</label>
            <select class="form-control gradeFilter" v-model="searchDifficaulty">
               <option value=0> All </option>
               <option v-for="subject in degreeOfDifficultyList" v-bind:value="subject.id">{{subject.degreeofdifficulty}}</option>
            </select>
         </div>
        
    </div>
    <div class="row studentstable reset-padding reset-margin ">
        <br>
        <div class="divTable">
            <div class="divTableBody">
                <div class="divTableRow">
                    <div class="divTableCell">ID</div>
                    <div class="divTableCell">Worksheet Name</div>
                    <div class="divTableCell">Classroom</div>
                    <div class="divTableCell">Subject</div>
                    <div class="divTableCell">Assigned date</div>
                    <div class="divTableCell">Start date</div>
                    <div class="divTableCell">End date</div>
                    <div class="divTableCell">Assigned by</div>
                </div>

                <div class="divTableRowdata" v-for="(worksheet,index) in paginatedData"> 
                    <div class="divTableCelldata">{{worksheet.id}}</div>
                    <div class="divTableCelldata">
                        <!-- <button class="btnAsLink" @click="eachworksheet(worksheet)">{{worksheet.worksheet_name}}</button> -->
                        <button class="btnAsLink">{{worksheet.worksheet_name}}</button>
                    </div>
                    <div class="divTableCelldata">{{worksheet.gradename}} - {{worksheet.sectionname}}</div>
                    <div class="divTableCelldata">{{worksheet.subjectname}}</div>
                   <div class="divTableCelldata">{{getEntryDate(worksheet.assigneddate)}}</div>
                    <div class="divTableCelldata">{{worksheet.startdate}}</div>
                   <div class="divTableCelldata">{{worksheet.enddate}}</div>
                    <div class="divTableCelldata">{{worksheet.assignedby}}</div>
                </div>

            </div>
        </div>
    </div>
    <br>
    <div>
        <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
        <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
    </div>
    <!-- worksheet pop up start-->
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="worksheetPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h4>Worksheet details</h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
                </div>
                <div class="modal-body">

                    <div class="worksheetDetails">
                        <input type="text" class="form-control popUpEle" placeholder="Enter worksheet name" v-model="worksheetObj.worksheetName" name="">
                        <br>
                        <select v-model="worksheetObj.gradeVal" class="form-control popUpEle">
                            <option value="">-- Select Grade --</option>
                            <option v-for="grade in listOfGrades" v-bind:value="grade.id">{{grade.gradename}}</option>
                        </select>
                        <br>
                        <select v-model="worksheetObj.subjectVal" class="form-control popUpEle">
                            <option value="">-- Select subject --</option>
                            <option v-for="subject in listOfSubjects" v-bind:value="subject.id">{{subject.subjectname}}</option>
                        </select>
                        <br>
                        <select v-model="worksheetObj.degreeofdifficultyid" class="form-control popUpEle">
                            <option value="">-- Select degree of difficulty --</option>
                            <option v-for="subject in degreeOfDifficultyList" v-bind:value="subject.id">{{subject.degreeofdifficulty}}</option>
                        </select>
                        <br>
                        <select v-model="worksheetObj.statusVal" class="form-control popUpEle">
                            <option value="">-- Select status --</option>
                            <option v-for="status in listOfStatus" v-bind:value="status.id">{{status.description}}</option>
                        </select>
                        <br>    
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" id="submit" @click="saveWorkSheetDetails(workSheetIndex,worksheetObj.id)" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- worksheet pop up end-->
    <!-- worksheet pop up start-->
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="worksheetAssignPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h4>Worksheet details</h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
                </div>
                <div class="modal-body">
                    <div class="worksheetDetails">
                       
                        <select v-model="worksheetObj.gradeVal" class="form-control popUpEle">
                            <option value="">-- Select Grade --</option>
                            <option v-for="grade in listOfGrades" v-bind:value="grade.id">{{grade.gradename}}</option>
                        </select>
                        <br>
                        <select v-model="worksheetObj.subjectVal" class="form-control popUpEle">
                            <option value="">-- Select section --</option>
                            <option v-for="subject in listOfSubjects" v-bind:value="subject.id">{{subject.subjectname}}</option>
                        </select>
                        <br>
                        <select v-model="worksheetObj.subjectVal" class="form-control popUpEle">
                            <option value="">-- Select subject --</option>
                            <option v-for="subject in listOfSubjects" v-bind:value="subject.id">{{subject.subjectname}}</option>
                        </select>
                        <br>
                         <date-picker placeholder="Select start Date"
                      :format="DatePickerFormat" :disabledDates="disabledDates" style="width:200px"  class="vdp-datepicker" lang="en"></date-picker>
                        <br>   
                         <date-picker placeholder="Select end Date"
                      :format="DatePickerFormat" :disabledDates="disabledDates" class="vdp-datepicker" lang="en"></date-picker>
                        <br>  
                         <input type="text" class="form-control popUpEle" placeholder="Enter maximum marks" v-model="worksheetObj.worksheetName" name="">
                        <br> 
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" id="submit" @click="saveWorkSheetDetails(workSheetIndex,worksheetObj.id)" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- worksheet pop up end-->

</div>





</template>
<style scoped>
.reset-padding {
  padding: 0;
}

.reset-margin {
  margin: 0;
}

.studentstable {
  width: 100%;
  padding-top: 1%;
}

.newWorksheet {
  background-color: #039be5;
  background-image: none;
  border-color: #039be5;
  color: white;
  padding: 5px 30px;
  margin-top: -2px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0px
}

.newstudent:hover {
  color: white;
}

.search-btn {
  background-color: #039be5;
}

.btn {
  border-radius: 0px;
  color: #fff
}

.gradeFilter{
  float:left;
  width:15%
}

.btn:hover,
.btn:focus {
  color: #fff;
  text-decoration: none;
}

.previousbutton,
.nextbutton,
.previousbutton:hover,
.nextbutton:hover {
  display: inline-block;
  padding: 5px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
  color: black
}

.popUpEle {
  width: 250px;
}

.btnAsLink {
  background: none;
  border: none;
  color: blue;
}

.worksheetDetails {
  margin: auto;
  width: 250px;
}

.showAlertDiv {
  margin-top: -42px;
  height: 42px;
  margin-left: 152px;
  width: 276px;
}

.assign-button {
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

.vdp-datepicker {
    position: relative;
    text-align: left;
    width: 180px;
    
}

.calendar-class{
     width: 500px;
}

</style>


<script>
import EventBus from '../../../event-bus.js'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import UserService from '../../../services/userService.js';
import store from '../../../store.js'
import DatePicker from 'vuejs-datepicker';
import moment from 'moment'

export default {
     components: { DatePicker},
    data() {
        return {
            open: 'show',
            close: 'hide',
            worksheetName: '',
            showAlert: false,
            gradeVal: '',
            sectionVal: '',
            subjectVal: '',
            alertClass: "",
            listOfGrades: [{
                text: '1st class',
                value: 1
            }, {
                text: '2nd class',
                value: 2
            }],
            listOfSections: [{
                text: 'Section - A',
                value: 1
            }, {
                text: 'Section - B',
                value: 2
            }],
            listOfStatus: [{
                text: 'Active',
                id: 1
            }, {
                text: 'In active',
                id: 0
            }],
            degreeOfDifficultyList: [{
                text: 'Easy',
                value: 1
            }, {
                text: 'Medium',
                value: 2
            }, {
                text: 'Hard',
                value: 3
            }],
            listOfSubjects: [],
            QuestionTypeValue: "",
            listOfWorksheets: [],
            worksheetObj: {},
            workSheetIndex: '',
            id: 0,
            pageNumber: 0,
            size: 10,
            search: '',
            tenantId: this.$cookie.get('id'),
            subjectType:'subject',
            gradeType:'grade',
            statusType:'status',
            academicYearObj :this.$store.state.acdemicyearandboard,
            academicDetails: {},
            searchDifficaulty:0,
            searchDifficaultytext: "",
            searchSubjectId:0,
            searchGradeId:0,
            userDetails:this.$store.state.userDetails,
            userRole: this.$cookie.get('userrole'),
             model: {
          date: ''
        }, 
        DatePickerFormat: 'dd/MM/yyyy',
        disabledDates: {
          to: new Date(Date.now() - 8640000)
        },
        }
    },
    created() {
         this.academicDetails= {
                academicyearid : this.academicYearObj.academicyearid,
                syllabustype : this.academicYearObj.syllabustype
            }
        this.getOnloadEntitiesData();
        UserService.ClassroomGrades(this.academicDetails.syllabustype, this.tenantId).then((response) => {
            this.listOfGrades = response.data;
            console.log(JSON.stringify(response.data))
        })
        UserService.getDegreeOfDifficulties(this.tenantId).then((response)=>{
           this.degreeOfDifficultyList=response.data.resultsMap.degreeOfDifficulties; 
           console.log(JSON.stringify(response.data))
        })
        UserService.getWorksheetStatuses(this.tenantId).then((response)=>{
           this.listOfStatus=response.data.resultsMap.wsStatuses; 
           console.log(JSON.stringify(response.data))
        })
    },
    methods: {
        ...mapMutations([
            'SET_SELETECTED_WORKSHEET'
        ]),

        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        getEntryDate:function(date){
            return moment(date).format('DD/MM/YYYY');
        },
        getNameFromVal: function(id, list,type) {
            let length = list && list.length;
            if (length > 0) {
                for (let i = 0; i < length; i++) {
                    
                      if(type ==this.subjectType){
                            if (id == list[i].id) {
                            return list[i].subjectname;
                        }
                      }else if(type ==this.gradeType ){
                            if (id == list[i].id) {
                            return list[i].gradename;
                        }
                      }else if(type ==this.statusType){
                          if (id == list[i].id) {
                        return list[i].description;
                          }
                      }
                    
                }
            }
            return '';
        },
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },

        eachworksheet: function(worksheet) {
            console.log(worksheet);
            this.worksheet = worksheet;
            this.SET_SELETECTED_WORKSHEET(worksheet);
            this.$router.push({
                path: 'ws-assigned-status'
            })
        },
        createWSAssignObj: function(){

        },

        createWorksheetObj: function() {
            this.worksheetObj = {
                worksheetName: '',
                gradeVal: '',
                sectionVal: '',
                subjectVal: '',
                grade: '',
                subject: '',
                status: '',
                statusVal: '',
                degreeofdifficultyid:''
            };

        },
        editWorksheetDetails: function(worksheet, index) {
            this.workSheetIndex = index;
            this.worksheetObj = {};
            this.worksheetObj = JSON.parse(JSON.stringify(worksheet));


            this.popUp('worksheetPopUp', this.open);
        },

        getOnloadEntitiesData:function(){
          UserService.Subjects(this.tenantId).then((response) =>{
            console.log(JSON.stringify(response.data))
            this.listOfSubjects =response.data;
            this.getListOfWorksheets();
          }).catch(error =>{
            console.log(JSON.stringify(response.data))
          })
          
        },
        getListOfWorksheets: function() {
            UserService.getListOfAssignedWorksheets(this.tenantId).then((response) => {
                this.listOfWorksheets = response.data.results;
                let length = response.data.results.length;
                //for (let i = 0; i < length; i++) {
                   /*  let worksheetObject = {
                        id: response.data[i].w_id,
                        worksheetName: response.data[i].worksheet_name,
                        gradeVal: response.data[i].gradeid,
                        subjectVal: response.data[i].subjectid,
                        statusVal: response.data[i].status_id,
                        worksheet_path: 'temp',
                        createdby: "Harish",
                        degreeofdifficultyid:response.data[i].degreeofdifficultyid,
                        grade: this.getNameFromVal(response.data[i].gradeid, this.listOfGrades,this.gradeType),
                        subject: this.getNameFromVal(response.data[i].subjectid, this.listOfSubjects,this.subjectType),
                        status: this.getNameFromVal(response.data[i].status_id, this.listOfStatus,this.statusType)
                    } */
                   // this.listOfWorksheets.push(response.data[i]);
               // }
                console.log(JSON.stringify(response.data.results))
            })
        },

        saveWorkSheetDetails: function(index, id) {

            if (this.validateFields()) {
                let worksheetObject = {
                    w_id:this.worksheetObj.id,
                    worksheet_name: this.worksheetObj.worksheetName,
                    gradeid: this.worksheetObj.gradeVal,
                    subjectid: this.worksheetObj.subjectVal,
                    status_id: this.worksheetObj.statusVal,
                    worksheet_path: 'temp',
                    createdby: this.userDetails.username,
                    degreeofdifficultyid:this.worksheetObj.degreeofdifficultyid
                }
                //this.listOfWorksheets.push(worksheetObject);
                if (!this.worksheetObj.id) {
                    UserService.newWorksheet(this.tenantId, worksheetObject).then((response) => {
                        this.getListOfWorksheets();
                        this.setAlertMessage('success', 'added');
                    }).catch(error=>{
                     console.log("Error response "+JSON.stringify(error.response))
                      this.setAlertMessage('fail', '');
                  })
                } else {
                    UserService.updateWorksheet(this.tenantId, worksheetObject).then((response) => {
                        this.getListOfWorksheets();
                        console.log(response.data)
                        this.setAlertMessage('success', 'updated');
                    }).catch(error=>{
                     console.log("Error response "+JSON.stringify(error.response))
                      this.setAlertMessage('fail', '');
                  })
                }
            } else {
                this.setAlertMessage('fail', '');
            }
        },
        validateFields: function() {
            if(this.checkEmptyVal(this.worksheetObj.worksheetName)) {
                return false;
            }else if (this.checkEmptyVal(this.worksheetObj.gradeVal)) {
                return false;
            }else if (this.checkEmptyVal(this.worksheetObj.subjectVal)) {
                return false;
            }else if (this.worksheetObj.statusVal != 0 && (this.worksheetObj.statusVal == '' || this.worksheetObj.statusVal == undefined)) {
                return false;
            }
            return true;
        },
        checkEmptyVal: function(val) {
            if (val == '' || val == null) {
                return true;
            }
            return false;
        },
        //Shows the alert message on homepage 
        setAlertMessage: function(type, addOrUpdate) {
            if (type == 'fail') {
                this.alertMessage = "You must enter all the data .....";
                this.alertClass = 'alert-danger';
            } else if (type == 'success') {
                this.alertMessage = "Successfully " + addOrUpdate + " worksheet .....";
                this.alertClass = 'alert-success';

            }
            this.showAlert = true;
            let thisVue = this;
            setTimeout(function() {
                thisVue.alertMessage = '';
                thisVue.alertClass = '';
                thisVue.showAlert = false;
                if (type == 'success') {
                    thisVue.popUp('worksheetPopUp', thisVue.close);
                }
            }, 1500);
        },


    },
    computed: {
        pageCount() {
            let l = this.listOfWorksheets.length,
                s = this.size;
            return Math.ceil(l / s);
        },

        filterWorksheets: function() {
            var self = this;
            return this.listOfWorksheets.filter(function(worksheet) {
                let filterWsName;
                let filterGrade;
                let filterSubject;
                let filterDifficulty;

                if(!self.search){
                    filterWsName = true;
                }else{
                    filterWsName = worksheet.worksheet_name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
                }
                if(self.searchGradeId ==0){
                    filterGrade = true;
                }else{
                    filterGrade = worksheet.gradeid.toString().indexOf(self.searchGradeId.toString()) >= 0;
                }
                if(self.searchSubjectId == 0){
                    filterSubject = true;
                }else{
                    filterSubject = worksheet.subjectid.toString().indexOf(self.searchSubjectId.toString()) >= 0;
                }
                if(self.searchDifficaulty == 0){
                    filterDifficulty = true;
                }else{
                    if(self.searchDifficaulty == 1){
                        self.searchDifficaultytext = "EASY";
                    }
                    else if(self.searchDifficaulty == 2){
                        self.searchDifficaultytext = "INTERMEDIATE";
                    }
                    else{
                        self.searchDifficaultytext = "ADVANCED";
                    }
                    filterDifficulty = worksheet.degreeofdifficulty.toString().indexOf(self.searchDifficaultytext.toString()) >= 0;
                }

                return filterWsName && filterGrade && filterSubject && filterDifficulty;
            });
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filterWorksheets.slice(start, end);
        },
    }


}



</script>