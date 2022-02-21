<template>
<div class="container">
    <div class="row reset-padding reset-margin">
        <div class="row">
            <div class="col-lg-6">
		        <div class="page-heading">Worksheet status</div>
            </div>
        </div>
		<hr/>
    </div>
    <div class="col-lg-12 text-left">
         <h3 class="student-head">{{this.worksheet.worksheet_name}}</h3>
      </div>
      <div class="row">
         <div class="col-sm-6" style="text-align:right;">Classroom :
         </div>
         <div class="col-sm-6">{{this.mysubject.gradename}} - {{this.mysubject.sectionname}}</div>
      </div>
      <div class="row">
         <div class="col-sm-6" style="text-align:right;">Subject :
         </div>
         <div class="col-sm-6">{{this.mysubject.subjectname}}</div>
      </div>
       <div class="row">
         <div class="col-sm-6" style="text-align:right;">Max marks :
         </div>
         <div class="col-sm-6">{{this.worksheet.max_marks}}</div>
      </div>
      <br>
    <div class="row reset-padding reset-margin">
        <div id="custom-search-input" class="col-md-10 reset-padding reset-margin" style="width:25%">
            <div class="input-group searchbar">
                <input v-model='search' type="text" class="search-query form-control" placeholder="Search student name">
                <span class="input-group-btn">
                        <button class="btn search-btn" type="button">
                            <span class=" glyphicon glyphicon-search"></span>
                </button>
                </span>
            </div>
        </div>
        <div id="custom-search-input" class="col-md-10 reset-padding reset-margin" style="width:25%">
            <div class="input-group searchbar">
                <input v-model='searchbasedonmarks' type="text" class="search-query form-control" placeholder="Enter Marks">
                <span class="input-group-btn">
                        <button class="btn search-btn" type="button">
                            <span class=" glyphicon glyphicon-search"></span>
                </button>
                </span>
            </div>
        </div>
      <!--   <div>
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
         </div> -->
      <div >
        <button class="previousbutton" style="float : right; margin-right: 100px;" @click="autocorrect()" >Auto Evaluate</button>
    </div>  
    </div>
    <div class="row studentstable reset-padding reset-margin ">
        <br>
        <div class="divTable">
            <div class="divTableBody">
                <div class="divTableRow">
                    <div class="divTableCell">
                        <input type="checkbox" v-model="allselected" @change="selectAllStudents()" />
                        Worksheet ID
                    </div>
                    <div class="divTableCell">Student Name</div>
                    <div class="divTableCell">Start date</div>
                    <div class="divTableCell">End date</div>
                    <div class="divTableCell">Submitted date</div>
                    <div class="divTableCell">Marks secured</div>
                    <div class="divTableCell">Assigned by</div>
                    <div class="divTableCell">Status</div>
                    <div class="divTableCell"></div>
                </div>
                <div class="divTableRowdata" v-for="submittedStudent in paginatedData">
                    <div class="divTableCelldata">
                        <input type="checkbox" :disabled="submittedStudent.statusid == 2" :value="submittedStudent.id" v-model="selectedStudents" />
                        {{submittedStudent.w_id}}
                    </div>
                    <div class="divTableCelldata">  {{submittedStudent.name}}  </div>
                    <div class="divTableCelldata">{{ getEntryDate(submittedStudent.startdate)}}</div>
                    <div class="divTableCelldata">{{getEntryDate(submittedStudent.enddate)}}</div>
                    <div class="divTableCelldata">{{getEntryDate(submittedStudent.submitteddate)}}</div>
                    <div class="divTableCelldata">{{submittedStudent.securedmarks}}</div>
                    <div class="divTableCelldata">{{submittedStudent.assignedby}}</div>
                    <div class="divTableCelldata" v-if="submittedStudent.statusid == 1">submitted</div>
                    <div class="divTableCelldata" v-else-if="submittedStudent.statusid == 2">not submitted</div>
                    <div class="divTableCelldata" v-else-if="submittedStudent.statusid == 3">Evaluated</div>
                    <div class="divTableCelldata" v-else-if="submittedStudent.statusid == 4 || submittedStudent.statusid == 5">Auto Evaluated</div>
                    <div class="divTableCelldata"> <button v-if="submittedStudent.statusid !=2" class='assign-button' 
                 v-on:click="getSubmittedAnswersOfStudent(worksheet,submittedStudent)">Evaluate</button></div>
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
    
     <!--Library questions pop up start -->
   <div class="modal fade" data-keyboard="false" data-backdrop="static" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true" id="libraryQuestionsPopUp" role="dialog">
      <div style="overflow-y: scroll; width:85%;" class="modal-dialog modal-dialog-scrollable modal-xl">
         <div class="modal-content">
            <div class="modal-header">
               <div class="popUpHeader">
                  <h4 class="modal-title">{{QuestionTypeValue}} Submitted Q&A</h4>
                  <div v-if="showPopUpAlert" :class="['showPopUpAlertDiv','alert',popUpAlertClass]" role="alert">
                     {{popUpAlertMessage}}
                     </div>
               </div>
            </div>
            <div class="modal-body" >
               <div id="custom-search-input" class="col-md-10 reset-padding reset-margin" style="width:25%">
                  <div class="input-group searchbar">
                     <input v-model='searchQuestionDesc' type="text" class="search-query form-control" placeholder="Search question">
                     <span class="input-group-btn">
                     <button class="btn search-btn" type="button">
                     <span class=" glyphicon glyphicon-search"></span>
                     </button>
                     </span>
                  </div>
               </div>
               <!-- <div>
                  <div  v-for="(question,index) in paginatedDataQues">
                      
                     <div class="questionDataDiv">
                         <br>
                       
                <table class="table table-borderless table-hover">
                           <tbody>
                              <tr :v-if="!listOfQueIdsOfWs.includes(question.questionid)">
                             <td style="width:10px">     
                          <input type="checkbox" :v-if="!listOfQueIdsOfWs.includes(question.questionid)" :value="question.questionid" v-model="selectedQuestionsIdsList" :change="selectedQuesList()"> </td>      
                        <td style="width:26px">{{question.questionid}}.</td>
                        <td ><vue-mathjax style="float:left;margin-left:10px;" 
                          :formula="question.questionDetails"></vue-mathjax></td> 
                              </tr>
                           </tbody>
                        </table>
                            
                        <table class="table table-borderless table-hover" v-if='question.questiontype_id == 1'>
                           <tbody>
                              <tr>
                                 <td class="align-middle" style="width:100px !important;" v-for="options in question.optionsData">
                                    <p style="float:left;width:14px;margin: 24px 0 10px;">{{options.optionVal}}.</p>
                                    <p  style="float:left;width:84%;margin-top:24px;margin-left:1px"  v-if="options.selectAnsType == 1">{{options.textVal}}</p>
                                    <vue-mathjax style="float:left;margin-left:10px;margin-top: 22px;"  v-if="options.selectAnsType == 2"  :formula="options.formulaHtml"></vue-mathjax>
                                    <img v-if="options.selectAnsType == 3" :src="options.imageVal" style="float:left;width:150px;height:100px;">
                                 </td>
                              </tr>
                               <tr><td><strong>Correct Answer :</strong> {{getOptionValViceVersa(question.correctAnswer)}}</td>
                              </tr>
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div> -->
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-primary" v-on:click.prevent="saveLibraryQuesToWS()">Save</button>
               <button type="button" class="btn btn-danger" v-on:click.prevent="confirmationPopUpOpen(confirmationPopUpKeys.libraryQuesDiscard,'','',open);">Cancel</button>
            </div>
         </div>
      </div>
   </div>
   <!--Library questions pop up end -->
   <!-- confirmation pop up start  -->
   <div class="modal fade" id="confirmationPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-dialog" style="width:472px">
         <div class="modal-content">
            <div class="modal-header">
               <h4>Confirm Cancel</h4>
            </div>
            <div class="modal-body" style="height:75px;">
               {{confirmMsg}}
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
               <button type="button" v-on:click.prevent="confirmationPopUpClose('',close);" id="submit" class="btn btn-primary">OK</button>
            </div>
         </div>
      </div>
   </div>
   <!-- confirmation pop up end  -->

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
<style>
@import url('../../../../assets/css/worksheet_styles.css');
</style>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import UserService from '../../../../services/userService';
import store from '../../../../store'
import DatePicker from 'vuejs-datepicker';
import moment from 'moment';

export default {
    props:['mysubject','school','userdetails','acdemicyearandboard'],
     components: { DatePicker},
    data() {
        return {
            open: 'show',
            close: 'hide',
            worksheetName: '',
            showAlert: false,
            gradeVal: '',
             showAlert: false,
            showPopUpAlert: false,
            popUpAlertMessage: "",
            popUpAlertClass: "",
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
            search:'',
            searchbasedonmarks:"",
            worksheetQuestions:[],
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
            searchQuestionDesc:'',
            confirmMsg:'',
            alertMsgs: {
                successMsg: 'Successfully',
                emptyMsg: ' can not be empty',
                alertDanger: 'alert-danger',
                alertSuccess: 'alert-success',
                popUpAlertMsg: '',
                alertMsg: '',
                showPopUpAlert: false,
                showAlert: false,
                selectQuestionTypeAlert: 'selectQuestionTypeAlert',
                questionDataAlert: 'questionDataAlert',
                libraryQuesAlert:'libraryQuesAlert'

            },
            confirmationPopUpKeys: {
                questionDel: 'questionDel',
                questionEditCancel: 'questionEditCancel',
                worksheetReset: 'worksheetReset',
                libraryQuesDiscard:'libraryQuesDiscard',
                
            },
            confirmationPopUpId: 'confirmationPopUp',
            confirmKey: '',
            fail: 'fail',
            success: 'success',
            worksheet : this.$store.state.worksheet,
            submittedStudents : [],
            submittedStudent : {},
            submittedAnswers :[],
            selectedStudents:[],
            allselected:false,
        }
    },
    created() {
        this.$forceUpdate();
        //  this.academicDetails= {
        //         academicyearid : this.academicYearObj.academicyearid,
        //         syllabustype : this.academicYearObj.syllabustype
        //     }
        // this.getOnloadEntitiesData();
        // UserService.ClassroomGrades(this.academicDetails.syllabustype, this.tenantId).then((response) => {
        //     this.listOfGrades = response.data;
        //     console.log(JSON.stringify(response.data))
        // })
        // UserService.getDegreeOfDifficulties(this.tenantId).then((response)=>{
        //    this.degreeOfDifficultyList=response.data.resultsMap.degreeOfDifficulties; 
        //    console.log(JSON.stringify(response.data))
        // })
        // UserService.getWorksheetStatuses(this.tenantId).then((response)=>{
        //    this.listOfStatus=response.data.resultsMap.wsStatuses; 
        //    console.log(JSON.stringify(response.data))
        // })
        this.submittedWorksheets();
        console.log(JSON.stringify(this.worksheet))
        
    },
    methods: {
        ...mapMutations([
            'SET_SELETECTED_WORKSHEET','SET_MY_CHILD'
        ]),
        getEntryDate:function(date){
            return moment(date).format('DD/MM/YYYY');
        },
        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        submittedWorksheets: function(){
            UserService.getSubmittedWorksheets(this.tenantId , this.worksheet.w_id,this.worksheet.classroomid).then((response) => {
            this.submittedStudents = response.data.results;
            console.log(response.data.results);
        })
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
        autocorrect:function(){
            if(this.selectedStudents.length <= 0){
                alert("Please select atleast one student for auto correction")
                return ;
            }
            UserService.autocorrect(this.tenantId,this.selectedStudents).then((response) => {
                alert("Succesfully Evaluated");
                this.selectedStudents=[];
                this.submittedWorksheets();
            }).catch(err => console.log(err))
        },
        selectAllStudents: function(){
            if(this.allselected){
                this.selectedStudents = [];
                this.selectedStudents = this.submittedStudents.filter(function(element){
                    if(element.statusid !== 2){
                        return element;
                    }
                }).map(data => data.id);
            }else{
                this.selectedStudents = [];
            }
            console.log(this.selectedStudents)
        },
        eachworksheet: function(worksheet) {
            console.log(worksheet);
            this.worksheet = worksheet;
            this.SET_SELETECTED_WORKSHEET(worksheet);
            this.$router.push({
                path: 'ws-assigned-status'
            })
        },
        getSubmittedAnswersOfStudent: function(worksheet,submittedStudent){
        // UserService.getStudentAnswers(this.tenantId , this.worksheet.id, submittedStudent.studentid)
        // .then((response) => {
        //     this.submittedAnswers = response.data.resultsMap.questions;
        // })
            this.worksheet = worksheet;
            this.SET_MY_CHILD(submittedStudent);
            this.SET_SELETECTED_WORKSHEET(worksheet);
            this.$router.push({
                path: '/mysubjects/'+this.mysubject.gradenumber+this.mysubject.sectionname+'-'+this.mysubject.subjectname+'-'+this.mysubject.syllabustype+'/ws-submitted-answers'
            })

        },
        resetLibraryQuestions : function(){
            this.popUp('libraryQuestionsPopUp', this.close);
        },
        
        
        confirmationPopUpOpen: function(key, index, popUpId, action) {
            this.confirmKey = key;

            if (key == this.confirmationPopUpKeys.questionDel) {
                this.deleteIndex = index;
                this.confirmMsg = "Are you sure you want to delete the Question ?"
            } else if (this.confirmKey == this.confirmationPopUpKeys.worksheetReset) {
                this.confirmMsg = "Are you sure you want to discard all changes ?"
            } else if (this.confirmKey == this.confirmationPopUpKeys.questionEditCancel) {
                this.toBeEdited = false;
                this.editIndex = '';
                this.confirmMsg = "Are you sure you want to discard all changes ?"
            } else if (this.confirmKey == this.confirmationPopUpKeys.libraryQuesDiscard) {
                this.confirmMsg = "Are you sure you want to discard all changes ?"
            } 

            this.popUp(this.confirmationPopUpId, action);
        },

        confirmationPopUpClose: function(popUpId, action) {
            if (this.confirmKey == this.confirmationPopUpKeys.questionDel) {
                this.deleteQuestion(this.deleteIndex);
            } else if (this.confirmKey == this.confirmationPopUpKeys.worksheetReset) {
                this.resetWorksheet();
            }else if (this.confirmKey == this.confirmationPopUpKeys.libraryQuesDiscard) {
                this.resetLibraryQuestions();
            }

            this.popUp(this.confirmationPopUpId, action);

            if (this.confirmKey == this.confirmationPopUpKeys.questionEditCancel) {
                this.popUp('myModal', action);
            }

            this.confirmKey = '';
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
                degreeofdifficultyid:'',
                worksheet_type:'',
                purpose:'',
                description:''
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
            UserService.getListOfWorksheets(this.tenantId).then((response) => {
                this.listOfWorksheets = [];
                let length = response.data.length;
                for (let i = 0; i < length; i++) {
                    let worksheetObject = {
                        id: response.data[i].w_id,
                        worksheetName: response.data[i].worksheet_name,
                        gradeVal: response.data[i].gradeid,
                        subjectVal: response.data[i].subjectid,
                        statusVal: response.data[i].status_id,
                        worksheet_type: response.data[i].worksheet_type,
                        purpose: response.data[i].purpose,
                        description: response.data[i].description,
                        securedmarks: response.data[i].securedmarks,
                        worksheet_path: 'temp',
                        createdby: "Harish",
                        degreeofdifficultyid:response.data[i].degreeofdifficultyid,
                        grade: this.getNameFromVal(response.data[i].gradeid, this.listOfGrades,this.gradeType),
                        subject: this.getNameFromVal(response.data[i].subjectid, this.listOfSubjects,this.subjectType),
                        status: this.getNameFromVal(response.data[i].status_id, this.listOfStatus,this.statusType)
                    }
                    this.listOfWorksheets.push(worksheetObject);
                }
                console.log(response.data)
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

        getTheTexCode : function(ckData){
            let arr = ckData.split('alt=');

            if (arr.length > 0) {
                if(arr[1].indexOf('f(x)') != -1){
                    return ' \\('+[arr[1].split('" ')[0].replace(/"/g, '')]+'\\)';
                }else{
                    return ' \('+[arr[1].split('" ')[0].replace(/"/g, '')]+'\)';
                }
            }
        },
        getCkFinalData:function(data){
            console.log(JSON.stringify(data));
            let finalStrings = [];
            let questionDesc = '';
            let data1 = data.split('<p>');
            let ckData = data1[1];
            if(ckData.indexOf('<img') == -1){
                let endInd = data1[1].indexOf('</p>');
                questionDesc = data1[1].slice(0,endInd);
            }else{

            while(ckData.indexOf('<img') != -1){
            let imgInd = ckData.indexOf('<img');
            if(imgInd == -1){
                questionDesc = questionDesc + ckData.slice(0,imgInd);
                ckData = ckData.slice(imgInd,ckData.length-1);
            }else{
                if(imgInd != 0){
                    questionDesc = questionDesc +''+ ckData.slice(0,imgInd);
                    ckData = ckData.slice(imgInd,ckData.length-1);
                }
                if(questionDesc){
                    questionDesc = questionDesc+'' + this.getTheTexCode(ckData);
                }else{
                    questionDesc = this.getTheTexCode(ckData);
                }
                let endInd = ckData.search('/>');
                let tempArr = ckData.split("/>");
                ckData ='';
                for(let i=1;i<tempArr.length ;i++){
                   ckData =  ckData+''+tempArr[i];
                }
                ckData = ckData.trim();
                if(ckData.indexOf('<img') == -1){
                    questionDesc = questionDesc+'' + ckData;
                }
            }
            }
        }
            let temp = questionDesc;
            if(questionDesc.indexOf('&nbsp;') != -1){
                questionDesc ='';
            }
            while(temp.indexOf('&nbsp;') != -1){
                let ind = temp.indexOf('&nbsp;');
                temp = temp.slice(0,ind) +' '+temp.slice(ind+6,temp.length);
            }
            if(temp.indexOf('</p>') != -1){
                temp = temp.slice(0,temp.indexOf('</p>'));
            }
            questionDesc = temp;
            return questionDesc;
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
            let l = this.filterLibraryQuestions.length,
                s = this.size;
            return Math.ceil(l / s);
        },

        filterLibraryQuestions: function() {
            var self = this;
            return this.submittedStudents.filter(function(student) {
                let filterQuestionDesc;
                let marks;

                if(!self.search){
                    filterQuestionDesc = true;
                }else{
                    // remove it later written because of wrong data
                    if(student.name == null || student.name == undefined){
                        filterQuestionDesc = false;
                    } else {
                        filterQuestionDesc = student.name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
                    }
                }
                if(!self.searchbasedonmarks){
                    marks = true;
                }else{
                    if(student.securedmarks == null || student.securedmarks == undefined){
                        marks = false;
                    } else {
                        marks = student.securedmarks >= self.searchbasedonmarks;
                    }
                }
                return filterQuestionDesc && marks;
            });
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
                if(!this.submittedStudents || this.submittedStudents.length == 0){
                    return;
                }
            return this.filterLibraryQuestions.slice(start, end);
        },
    }


}



</script>
