<template>

<div class="container-fluid">
    <div class="row reset-padding reset-margin">
        <!-- <div class="col-lg-12 text-left">
             <div class="page-heading">Worksheets</div>
             <div class="col-md-2 reset-padding reset-margin newstudentbutton">
            <button class='btn newWorksheet pull-right' style="width: 177px;" v-on:click="popUp('worksheetPopUp',open);createWorksheetObj(workSheetIndex)">New Worksheet</button>
        </div>
            <hr>
        </div> -->
        <div class="row">
            <div class="col-lg-6">
		        <div class="page-heading"><span v-html="$t('projects_library')"/></div>
            </div>
            <div class="col-lg-6 text-right">
               <!-- <button class='common-button'
                 v-on:click="popUp('worksheetPopUp',open);createWorksheetObj(workSheetIndex)">New Project</button>-->
                <router-link to="/projects/createProject"  tag="button" class="common-button" style="marginTop:15px">New Project</router-link>
            </div>
        </div>
		<hr/>
    </div>
    <div class="row reset-padding reset-margin">
        <div id="custom-search-input" class="col-md-10 reset-padding reset-margin" style="width:25%">
            <div class="input-group searchbar">
                <input v-model='search' @input="pageNumber=0" type="text" class="search-query form-control" placeholder="Search project name">
                <span class="input-group-btn">
                        <button class="btn search-btn" type="button">
                            <span class=" glyphicon glyphicon-search"></span>
                </button>
                </span>
            </div>
        </div>
        <div>
            <label class="col-sm-1 control-label" style="width:8.3%;margin-top: 6px;">Status :</label>
            <select class="form-control gradeFilter" v-model="searchStatusId" @change="pageNumber=0">
               <option value=0> All </option>
               <option v-for="status in listOfStatus" v-bind:value="status.status">{{status.status}}</option>
            </select>
         </div>
        <div>
            <label class="col-sm-1 control-label" style="width:8.3%;margin-top: 6px;">Grade :</label>
            <select class="form-control gradeFilter" v-model="searchGradeId" @change="pageNumber=0">
               <option value=0> All </option>
               <option v-for="grade in listOfGrades" v-bind:value="grade.gradenumber">{{grade.gradename}}</option>
            </select>
         </div>
         <div>
            <label class="col-sm-1 control-label" style="width:8.3%;margin-top: 6px;">Subject :</label>
            <select class="form-control gradeFilter" v-model="searchSubjectId" @change="pageNumber=0">
               <option value=0> All </option> 
               <option v-for="subject in listOfSubjects" v-bind:value="subject.subjectname">{{subject.subjectname}}</option>
            </select>
         </div>
         <div>
            <label class="col-sm-1 control-label" style="width:9.3%;margin-top: 6px;">Difficulty :</label>
            <select class="form-control gradeFilter" v-model="searchDifficaulty" @change="pageNumber=0">
               <option value=0> All </option>
               <option v-for="subject in degreeOfDifficultyList" v-bind:value="subject.degreeofdifficulty">{{subject.degreeofdifficulty}}</option>
            </select>
         </div>
    </div>
    <div class="row studentstable reset-padding reset-margin ">
        <br>
        <div class="divTable">
            <div class="divTableBody">
                <div class="divTableRow">
                    <!--<div class="divTableCell" id="eachCell">ID</div> -->
                    <div class="divTableCell">Images</div>
                    <div class="divTableCell">Project Title</div>
                    <div class="divTableCell">Subject</div>
                    <div class="divTableCell">Grade</div>
                    <div class="divTableCell">Status</div>
                    <div class="divTableCell" v-if='userRole === "ADMIN"'>Safety</div>
                    <div class="divTableCell">Difficulty Level</div>
                    <div class="divTableCell">Edit</div>
                    <div class="divTableCell" v-if='userRole != "ADMIN"'></div>
                </div>
                <div class="divTableRowdata" v-for="(worksheet,index) in paginatedData">
                    <!-- <div class="divTableCelldata">{{worksheet._id}}</div> -->
                    <div class="divTableCelldata">
                      <img :src="worksheet.image[0]" v-if="worksheet.image[0] != null" style="width:60px;height:64px" @error="$event.target.src='https://ischool-project.s3.ap-south-1.amazonaws.com/images/image-not-found.png'"></div>
                    <div class="divTableCelldata">
                        <button class="btnAsLink" @click="eachworksheet(worksheet._id)">{{worksheet.title}}</button>
                    </div>
                    <div class="divTableCelldata">{{worksheet.subject}}</div>
                    <div class="divTableCelldata" v-if="worksheet.grade>3">{{worksheet.grade}}th Class</div>
                    <div class="divTableCelldata" v-else-if="worksheet.grade == 3">{{worksheet.grade}}rd Class</div>
                    <div class="divTableCelldata" v-else-if="worksheet.grade == 2">{{worksheet.grade}}nd Class</div>
                    <div class="divTableCelldata" v-else>{{worksheet.grade}}st Class</div>
                    <div class="divTableCelldata">{{worksheet.status}}</div>
                     <div class ="divTableCelldata" v-if='userRole === "ADMIN"'>{{worksheet.safety}}</div>
                    <div class ="divTableCelldata" v-bind:style="{color:submitDifficultyColor(worksheet.difficulty)}">{{worksheet.difficulty}}</div>
                    <div v-if="worksheet.status === 'DRAFT'" class="divTableCelldata"><a data-toggle="modal" href="#editstudent" @click="editWorksheetDetails(worksheet,index,worksheet._id);"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                    <div v-else-if="worksheet.status === 'ACTIVE'" class="divTableCelldata"><a  data-toggle="modal" href="#editstudent" @click="dialoguePopUp('projectStatusPopUp',open,worksheet._id,worksheet.status)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                    <div v-else-if="worksheet.status === 'INACTIVE'" class ="divTableCelldata" ><a data-toggle="modal" href="#editstudent" @click="dialoguePopUp('projectStatusPopUp',open,worksheet._id,worksheet.status)" ><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                    <div class="divTableCelldata" v-if='userRole != "ADMIN"'><button v-if="worksheet.status === 'ACTIVE'" class='assign-button' 
                 v-on:click="popUp('worksheetAssignPopUp',open);createWSAssignObj(worksheet)">Assign</button></div>
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
                        <h4>Edit Project</h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
                </div>
                <div class="modal-body">

                    <div class="worksheetDetails">
                        <input type="text" class="form-control popUpEle" placeholder="Enter project name" v-model="worksheetObj.title" name="">
                        <br>
                        <select v-model="worksheetObj.grade" class="form-control popUpEle">
                            <option value="">-- Select Grade --</option>
                            <option v-for="grade in listOfGrades" v-bind:value="grade.gradenumber">{{grade.gradename}}</option>
                        </select>
                        <br>
                        <select v-model="worksheetObj.subject" class="form-control popUpEle">
                            <option value="">-- Select subject --</option>
                            <option v-for="subject in listOfSubjects" v-bind:value="subject.subjectname">{{subject.subjectname}}</option>
                        </select>
                        <br>
                        <select v-model="worksheetObj.difficulty" class="form-control popUpEle">
                            <option value="">-- Select degree of difficulty --</option>
                            <option v-for="subject in degreeOfDifficultyList" v-bind:value="subject.degreeofdifficulty">{{subject.degreeofdifficulty}}</option>
                        </select>
                        <br>
                        <select v-model="worksheetObj.status" class="form-control popUpEle">
                            <option value="">-- Select status --</option>
                            <option v-for="status in listOfStatus" v-bind:value="status.status">{{status.status}}</option>
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
    <!-- worksheet assign pop up start-->
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="worksheetAssignPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h4>Project details</h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
                </div>
                <div class="modal-body">

                    <div class="projectDetails">

                      <select v-model="mysubjectdetails" class="form-control popUpEle" @change="assignsubjectdetails();">
                            <option value="">-- Select MySubject --</option>
                            <option v-for="mysubject in mysubjects" v-bind:value="mysubject" >{{mysubject.gradename+'-'+mysubject.sectionname+'-'+mysubject.subjectname+'-'+mysubject.syllabustype}}</option>
                        </select>
                        <!--<select v-model="assignedWorksheet.gradeVal" class="form-control popUpEle" @change="selectGrade(assignedWorksheet.gradeVal);">
                            <option value="">-- Select Grade --</option>
                            <option v-for="grade in listOfGrades" v-bind:value="grade.id">{{grade.gradename}}</option>
                        </select>
                        <select v-model="assignedWorksheet.classroomid" class="form-control popUpEle">
                            <option value="">-- Select section --</option>
                            <option v-for="section in sectionsList"  v-bind:value="section.id">Section - {{section.sectionname}}</option>
                        </select>-->
                        <br>
                        <!--<select v-model="assignedWorksheet.subjectid" class="form-control popUpEle">
                            <option value="">-- Select subject --</option>
                            <option v-for="subject in listOfSubjects" v-bind:value="subject.id">{{subject.subjectname}}</option>
                        </select>-->
                         <date-picker v-model="assignedWorksheet.start_date" placeholder="Select start Date"
                      :format="DatePickerFormat" :disabledDates="disabledDates" style="width:200px"  class="vdp-datepicker" lang="en"></date-picker>
                        <br>   
                         <date-picker placeholder="Select end Date"
                      :format="DatePickerFormat" v-model="assignedWorksheet.end_date" :disabledDates="disabledDates" class="vdp-datepicker" lang="en"></date-picker>
                        <br>  
                         <input type="text" class="form-control popUpEle" placeholder="Enter maximum marks" v-model="assignedWorksheet.max_marks" name="">
                        <br> 
                        <input type="radio" value="1" style="float:left;" v-model="studentselection" @click="getStudentsOfGrade()"/><label> Select All Students</label><br>
                        <input type="radio" value="2" v-model="studentselection" @click="getStudentsOfGrade()"/><label>Select List Of Students </label><br><br><br>
                        <div v-if="studentselection == 2" class="col-md-8 ">
                            <multiselect v-model="checkedStudents" :options="studentnames" :multiple="true"></multiselect>
                           <!-- <option v-for="student in classroomStudents" v-bind:value="student.id">{{student.name}}</option>-->
                           </div>
                        
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" id="submit" @click="assignWorkSheet()" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- worksheet pop up end-->
    <!--confirmation pop up start -->
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="projectStatusPopUp"  tabindex="-1"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" style="height:100px;width:500px;!important;">
          <div class="modal-content">
            <div class="modal-header">
               <div>
                <h4>Confirm</h4>
              </div>
            </div>
            <div class="confirmPopUp">
            <div class="modal-body">
              
               <h5>Are you sure want to change status to {{status === 'INACTIVE'? 'ACTIVE' : 'INACTIVE'}}</h5>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-info" data-dismiss="modal">Abort</button>
              <button  type="button" class="btn btn-primary" data-dismiss="modal" @click="editProjectStatus">Yes</button>
            </div>
          </div>
        </div>
    </div>
    <!-- confirmation pop up end -->

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
  border-radius: 0px;
}

.newstudent:hover {
  color: white;
}

.search-btn {
  background-color: #039be5;
}

.btn {
  border-radius: 0px;
  color: #fff;
}

.gradeFilter {
  float: left;
  width: 10%;
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
  color: black;
}

.popUpEle {
  width: 250px;
  margin-left: 0px;
}

.btnAsLink {
  background: none;
  border: none;
  color: blue;
}

.projectDetails {
  margin: auto;
  width: 500px;
  height: 500px !important;
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
  border-radius: 3px;
}

.confirmPopUp{
  height: 100px;
}

 @media screen and (max-device-width: 768px){
   .container-fluid {
      width: 100%;
    }

 }
</style>


<script>
import Multiselect from "vue-multiselect";
import EventBus from "../../../event-bus.js";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import UserService from "../../../services/userService.js";
import store from "../../../store.js";
import _ from 'lodash';
import DatePicker from "vuejs-datepicker";
import ProjectService from "../../../services/projectService.js";
import projectService from "../../../services/projectService.js";

export default {
  components: { DatePicker, Multiselect },
  data() {
    return {
      dummyWorksheetList: [],
      open: "show",
      close: "hide",
      title: "",
      showAlert: false,
      gradeVal: "",
      sectionVal: "",
      subjectVal: "",
      alertClass: "",
      checkedStudents:[],
      listOfGrades: [],
      listOfStatus: [],
      classroomStudents:[],
      degreeOfDifficultyList: [],
      listOfSubjects: [],
      listOfWorksheets: [],
      worksheetObj: {},
      workSheetIndex: "",
      id: 0,
      pageNumber: 0,
      studentselection:0,
      size: 10,
      search: "",
      projectId: "",
      tenantId: this.$cookie.get("id"),
      subjectType: "subject",
      gradeType: "grade",
      statusType: "status",
      academicYearObj: this.$store.state.acdemicyearandboard,
      academicDetails: {},
      searchDifficaulty: 0,
      searchSubjectId: 0,
      searchGradeId: 0,
      searchStatusId:0,
      userDetails: this.$store.state.userDetails,
      studentDetails: this.$store.state.singleStudent,
      sectionsListCopy: [],
      sectionsList: [],
      difficultyColor: "",
      alertMessage: "",
      userRole: this.$cookie.get("userrole"),
      assignedWorksheet: {},
      model: {
        date: ""
      },
      DatePickerFormat: "dd/MM/yyyy",
      disabledDates: {
        to: new Date(Date.now() - 8640000)
      },
      mysubjects:[],
      userId:{
            id:this.$cookie.get('userid')
        },
      mysubjectdetails:{},
      status:null
    }
  },
  created() {
   console.log(this.userDetails)

    this.reload();
    this.getListOfProjects();
    this.submitDifficultyColor();

    UserService.getDegreeOfDifficulties(this.tenantId).then(response => {
      this.degreeOfDifficultyList =
        response.data.resultsMap.degreeOfDifficulties;
    });

    this.academicDetails = {
      academicyearid: this.academicYearObj.academicyearid,
      syllabustype: this.academicYearObj.syllabustype
    };

    UserService.ClassroomGrades(
      this.academicDetails.syllabustype,
      this.tenantId
    ).then(response => {
      //console.log(JSON.stringify(response.data))
      this.listOfGrades = response.data;
    });

    UserService.getWorksheetStatuses(this.tenantId).then(response => {
      this.listOfStatus = response.data.resultsMap.wsStatuses;
    });
    
     UserService.MySubjects(this.userId,this.tenantId).then((response)=>{
          this.mysubjects=response.data
        })

     this.getOnloadEntitiesData();
  },
  methods: {
    reload() {
      this.$forceUpdate();
    },

    ...mapMutations(["SET_SELETECTED_WORKSHEET"]),

    popUp: function(id, action) {
      $("#" + id).modal(action);
    },

    dialoguePopUp:function(id,action,project_id,status){
      this.projectId = project_id;
      this.status = status;
      console.log(this.projectId,this.status);
      setTimeout(() => {
        $("#" + id).modal(action);
      }, 1000);

    },
    getNameFromVal: function(id, list, type) {
      let length = list && list.length;
      if (length > 0) {
        for (let i = 0; i < length; i++) {
          if (type == this.subjectType) {
            if (id == list[i].id) {
              return list[i].subjectname;
            }
          } else if (type == this.gradeType) {
            if (id == list[i].id) {
              return list[i].gradename;
            }
          } else if (type == this.statusType) {
            if (id == list[i].id) {
              return list[i].status;
            }
          }
        }
      }
      return "";
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },

    eachworksheet: function(id) {
      this.$router.push({
        path: `view-project/${id}`
      });
    },

    editProjectStatus: function(){
      if(this.status ==='INACTIVE'){
        this.status = 'ACTIVE';
      }else{
        this.status = 'INACTIVE';
      }
      console.log(this.projectId);
      console.log(this.status);
      ProjectService.updateStatus(this.projectId,this.status).then((response)=>{
        alert("Status updated successfully");
        this.getOnloadEntitiesData();
       
      })
    },

    createWorksheetObj: function() {
      this.worksheetObj = {
        title: "",
        subject: "",
        grade: "",
        status: "",
        difficulty: ""
      };
    },

     assignsubjectdetails:function(){
             this.assignedWorksheet.gradeVal = this.mysubjectdetails.gradeid;
             this.assignedWorksheet.classroomid = this.mysubjectdetails.id;
             this.assignedWorksheet.subjectid = this.mysubjectdetails.subjectid;

             this.getStudentsOfGrade();           
        },

    assignWorkSheet: function() {
      //this.assignedWorksheet.statusid = 1;
      this.assignedWorksheet.status ="not submitted";
      this.assignedWorksheet.gradeid = this.assignedWorksheet.gradeVal;
      this.assignedWorksheet.assignedby = this.userDetails.username;
      this.assignedWorksheet.teacherid = this.userDetails.userid;
      this.assignedWorksheet.assigned_date = new Date();
      this.assignedWorksheet.studentid = [];
      //this.assignedWorksheet.studentid  = 10
      if(this.studentselection == 2){
        for(let i=0; i<this.checkedStudents.length; i++){
                for(let j=0; j<this.classroomStudents.length; j++){
                    if(this.checkedStudents[i] == this.classroomStudents[j].name){
                        this.assignedWorksheet.studentid.push(this.classroomStudents[j].id);
                    }
                }
            }
            }else if(this.studentselection == 1){
              this.assignedWorksheet.studentid = _.map(this.classroomStudents,function(student){
                   return student.id;
               }) 
         }else{
            this.alertMessage ='Please Select Atleast One Student';
            this.alertClass = "alert-warning";
            this.setAlertMessage("warn");
            return;
       }

      console.log(this.studentselection)

      this.getStudentsOfGrade();

      if(_.isEmpty(this.assignedWorksheet.studentid)){
       this.alertMessage ='Please Select Atleast One Student';
       this.alertClass = "alert-warning";
       this.setAlertMessage("warn");
       return;
      }

      if(this.validateFields()){

         UserService.AssignProject(this.tenantId,this.assignedWorksheet)
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.sectionsList = [];
          this.sectionsListCopy = response.data;
          this.assignedWorksheet={};
          this.mysubjectdetails={};
          this.checkedStudents=[];
          this.alertMessage = "Project assigned successfully .....";
          this.alertClass = "alert-success";
          this.setAlertMessage("success");
        })
        .catch(error => {
          console.log(JSON.stringify(error.data));
          this.alertMessage = "You must enter all data.....";
          this.alertClass = "alert-danger";
          this.setAlertMessage("fail");
        });
        console.log(true);

      }else{
        this.alertMessage = "You must enter all the data .....";
        this.alertClass = "alert-danger";
        this.setAlertMessage("fail");
        console.log(false);
      }

    },

    getSectionsList: function() {
        UserService.Sections(this.academicYearObj, this.tenantId)
        .then(response => {
          console.log(JSON.stringify(response.data));
          this.sectionsList = [];
          this.sectionsListCopy = response.data;
        })
        .catch(error => {
          console.log(JSON.stringify(error.data));
        });
    },

    selectGrade: function(gradeId) {
      this.sectionsList = [];
      let length = this.sectionsListCopy.length;
      for (let i = 0; i < length; i++) {
        if (gradeId == this.sectionsListCopy[i].gradeid) {
          this.sectionsList.push(this.sectionsListCopy[i]);
        }
      }
    },

    getStudentsOfGrade : function(){
       console.log(JSON.stringify(this.assignedWorksheet))
        let obj = {
          classroomid:this.assignedWorksheet.classroomid,
          gradeid:this.assignedWorksheet.gradeVal
        }
        console.log(obj)
        if(obj){
         UserService.SectionDetails(obj,this.tenantId).then((response)=>{
          console.log(response)
          this.classroomStudents= response.data.studentsOfClassRoom;
          this.studentnames = _.map(this.classroomStudents, function(data){ return data.name})
          console.log(this.studentnames)
        })
      }else{
       alert("Select Grade and Section")
         return;
       }
    },


    editWorksheetDetails: function(worksheet, index, id) {
      this.$router.push({
        path: `edit-project/${id}`
      });

      this.workSheetIndex = index;
      this.worksheetObj = {};
      this.worksheetObj = JSON.parse(JSON.stringify(worksheet));

      /*this.popUp("worksheetPopUp", this.open);*/
    },

    createWSAssignObj: function(worksheet) {
      this.assignedWorksheet.project_id = worksheet._id;
      this.assignedWorksheet.name = worksheet.title

    },

    getOnloadEntitiesData: function() {
      UserService.Subjects(this.tenantId)
        .then(response => {
          //console.log(JSON.stringify(response.data))
          this.listOfSubjects = response.data;
          this.getListOfProjects();
        })
        .catch(error => {
          console.log(JSON.stringify(error.response));
        });
    },
    getListOfProjects: function() {
      ProjectService.GetProjects().then(response => {
        console.log(response);
        this.listOfWorksheets = [];
        let length = response.data.length;
        for (let project in response.data) {
          let worksheetObject = {
            _id: response.data[project]._id,
            title: response.data[project].title,
            grade: response.data[project].grade,
            subject: response.data[project].subject,
            status: response.data[project].status,
            safety: response.data[project].safety,
            difficulty: response.data[project].difficulty,
            image: response.data[project].image
          };

          //console.log("Object testing"+" "+worksheetObject.title)
          this.listOfWorksheets.push(worksheetObject);
        }
      });
    },

    saveWorkSheetDetails: function(index, id) {
      if (this.validateFields()) {
        let worksheetObject = {
          // w_id:this.worksheetObj.id,
          title: this.worksheetObj.title,
          grade: this.worksheetObj.grade,
          subject: this.worksheetObj.subject,
          status: this.worksheetObj.status,
          difficulty: this.worksheetObj.difficulty
        
        };
        console.log(worksheetObject);
        //this.listOfWorksheets.push(worksheetObject);
        ProjectService.updateProject(this.projectId, worksheetObject)
          .then(response => {
            this.getListOfProjects();
            console.log(response.data);
            this.alertMessage = "Successfully updated project .....";
            this.alertClass = "alert-success";
            this.setAlertMessage("success");
          })
          .catch(error => {
            console.log("Error response " + JSON.stringify(error.response));
            this.alertMessage = "You must enter all the data .....";
            this.alertClass = "alert-danger";
            this.setAlertMessage("fail");
          });
        /*}*/
      } else {
        this.alertMessage = "You must enter all the data .....";
        this.alertClass = "alert-danger";
        this.setAlertMessage("fail");
      }
    },
    validateFields: function() {
      if (this.checkEmptyVal(this.assignedWorksheet.max_marks)) {
        return false;
      } else if (this.checkEmptyVal(this.assignedWorksheet.end_date)) {
        return false;
      } else if (this.checkEmptyVal(this.assignedWorksheet.start_date)) {
        return false;
      } else if (
        this.assignedWorksheet.statusVal != 0 &&
        (this.assignedWorksheet.status == "" ||
          this.assignedWorksheet.status == undefined)
      ) {
        return false;
      }
      return true;
    },
    checkEmptyVal: function(val) {
      if (val == "" || val == null) {
        return true;
      }
      return false;
    },

    submitDifficultyColor: function(level) {
      const levelsMap = {
        EASY: "darkgreen",
        INTERMEDIATE: "orange",
        ADVANCED: "red"
      };

      for (let levels in levelsMap) {
        if (level == levels) {
          return levelsMap[levels];
        }
      }
    },
    //Shows the alert message on homepage
    setAlertMessage: function(type) {
      this.showAlert = true;
      let thisVue = this;
      setTimeout(function() {
        thisVue.alertMessage = "";
        thisVue.alertClass = "";
        thisVue.showAlert = false;
        if (type == "success") {
          thisVue.popUp("worksheetPopUp", thisVue.close);
          thisVue.popUp("worksheetAssignPopUp", thisVue.close);
        }
      }, 1500);
    }
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
        let filterStatus;

        if (!self.search) {
          filterWsName = true;
        } else {
          filterWsName =
            worksheet.title.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
           
        }
        if (self.searchGradeId == 0) {
          filterGrade = true;
        } else {
          filterGrade =
            worksheet.grade.toString().indexOf(self.searchGradeId.toString()) >=0;
            
        }
        if (self.searchSubjectId == 0) {
          filterSubject = true;
        } else {
          filterSubject =
            worksheet.subject.toString().indexOf(self.searchSubjectId.toString()) >= 0;
        }
        if (self.searchDifficaulty == 0) {
          filterDifficulty = true;
        } else {
          filterDifficulty =
            worksheet.difficulty.toLowerCase().indexOf(self.searchDifficaulty.toLowerCase()) >= 0; 
        }
        if(self.searchStatusId == 0){
          filterStatus = true;
        }else{
          
          //filterStatus = worksheet.status.toLowerCase().indexOf(self.searchStatusId.toLowerCase()) >= 0;
          if(worksheet.status === self.searchStatusId){
            filterStatus = true;

          }else{
            filterStatus = false;
          }
        }

        return filterWsName && filterGrade && filterSubject && filterDifficulty&&filterStatus;
      });
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.filterWorksheets.slice(start, end);
    }
  }
};
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
