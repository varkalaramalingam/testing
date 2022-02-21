<template>
<div class="container-fluid">
   <div class="row">
    <div class="page-layout">
        <div class="row">
            <div class="col-lg-6">
                <div class="page-heading"><span v-html="$t('students')"/></div>
                
            </div>
            <div class="col-md-6 text-right">
<!-- <router-link to="/newstudent" data-target="#worksheetPopUp" tag="button" class="common-button pull-right">New Student</router-link> -->
                <div id="custom-search-input"  class="input-group searchbar pull-right">
                    <input type="text" class="search-query form-control" placeholder="Search" v-model="search">
                    <span class="input-group-btn">
                        <button class="btn search-btn" type="button">
                            <span class=" glyphicon glyphicon-search"></span>
                        </button>
                    </span>
                </div>

           
            <!-- <button class='common-button pull-right' style="width: 177px;" v-on:click="popUp('worksheetPopUp',open);">New Student</button>-->
            </div>
        </div>
        <hr/>
         <div class="col-lg-4" v-show="isactive==1">
            <label class="col-sm-1 control-label" style="width:50% !important">Academic Year:</label>
            <select  class="form-control gradeFilter" v-model="activeacademicDetails" v-on:change="changingacademicyear()" style="width:50%" >
                  <option value="" disabled>-- Select Academic year --</option>
                  <option v-for="academic in activeacademicsandboards" 
                     v-bind:value="{academicyearid: academic.id,syllabustype:academic.syllabustype}" 
                     :key='academic.id+academic.syllabustype'
                     v-show="academic.active"
                  >{{academic.passingyear}}-{{academic.syllabustype}}</option>
            </select>
         </div>
         <div class="col-lg-4" v-show="isactive==0">
            <label class="col-sm-1 control-label" style="width:50% !important">Archived Years:</label>
            <select  class="form-control gradeFilter" v-model="archivedacademicDetails" v-on:change="changingacademicyear()" style="width:50%" >
                  <option value="" disabled>-- Select Academic year --</option>
                  <option v-for="academic in archivedacademicsandboards" 
                     v-bind:value="{academicyearid: academic.id,syllabustype:academic.syllabustype}" 
                     :key='academic.id+academic.syllabustype'
                     v-show="!academic.active"
                  >{{academic.passingyear}}-{{academic.syllabustype}}</option>
            </select>
         </div>
         <!-- <div class="col-lg-3">
            <label class="col-sm-1 control-label" style="width:50%">Syllabustype:</label>
            <select  class="form-control gradeFilter" v-model="academicDetails.syllabustype" v-on:change="changingboard()" style="width:50%" >
                  <option value="" disabled>-- Select Board of education --</option>
                  <option v-for="board in academicsandboards" >{{board.syllabustype}}</option>
            </select>
         </div> -->
         <div style="float:left;width:25%" class="col-lg-4">
            <label class="col-sm-1 control-label" style="width:35% !important">Grade :</label>
            <select class="form-control gradeFilter" @change="selectGrade()" style="width:51%;margin-right:7px" v-model="classdetails.gradeid">
                  <option v-bind:value=0>All</option>
                  <option v-for="grade in gradesList" v-bind:value="grade.id" :key="grade.id">{{grade.gradename}}</option>
            </select>
         </div>
         <div style="float:left;width:25%" class="col-lg-3">
            <label class="col-sm-1 control-label" style="width:35% !important">Section :</label>
            <select class="form-control gradeFilter" @change.prevent="selectSection()" style="width:51%;margin-right:7px" v-model="sectiondetails" >
               <!-- :disabled="classdetails.gradeid == 0" -->
                  <option v-bind:value={classid:0,sectionname:emptystring}>All</option>
                  <option v-for="section in sectionsList" v-bind:value="{classid:section.id,sectionname:section.sectionname}" :key="section.id">Section - {{section.sectionname}}</option>
            </select>
         </div>
         <div style="float:left;" class="col-lg-2" @change="changestatus">
            <label><input type="radio"  name="status" value=1 v-model="isactive">Active</label>
            <label><input type="radio"  name="status" value=0 v-model="isactive">Archived</label>
         </div>
         <br>
         <hr/>
      
        <div class="row studentstable reset-padding reset-margin " >
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">ID</div>
                        <div class="divTableCell">Name</div>
                        <div class="divTableCell">Grade</div>
                        <div class="divTableCell">Section Name</div>
                        <div class="divTableCell">Parent/Gardian Name</div>
                        <div class="divTableCell">Contact Number</div>
                        <div class="divTableCell">Blood Group</div>
                        <div class="divTableCell">House Name</div>
                        <div class="divTableCell">Board Of Edu</div>
                        <div class="divTableCell">Inactive</div>
                        <div class="divTableCell">Edit</div>
                    </div>
                    
                    <div class="divTableRowdata" v-for="student in paginatedData" :key="student.id">
                       <div class="divTableCelldata">{{student.id}}</div>
                        <div class="divTableCelldata"> <router-link to="/student" v-on:click.native="eachstudent(student)">{{student.name}}</router-link></div>
                        <div class="divTableCelldata">{{student.gradename}}</div>
                        <div class="divTableCelldata">{{student.sectionname}}</div>
                        <div class="divTableCelldata">{{student.fathername}}</div>
                        <div class="divTableCelldata">{{student.contactnumber}}</div>
                        <div class="divTableCelldata">{{student.bloodgroup}}</div>
                        <div class="divTableCelldata">{{student.housename}}</div>
                        <div class="divTableCelldata">{{student.syllabustype}}</div>
                        <div class="divTableCelldata" v-if="student.statusid==1">ACTIVE</div>
                        <div class="divTableCelldata" v-else-if="student.statusid==2">INACTIVE</div>
                        <div class="divTableCelldata"><a data-toggle="modal" href="#editstudent" v-on:click="setStudent(student);"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                    </div>
                    
                </div>
            </div>
        </div>
        <br>
        <div>
            <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
            <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
        </div>
        <div class="modal fade" id="editstudent" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Edit Student</h4>
         </div>
         <div class="modal-body">
            <form name="editstudentmodal">
               <h4><u><b>Student Details</b></u></h4>
               <div class="row">
                  <div class=col-lg-6>
                     <div class="row">
                        <div class="col-md-4">
                           <label>Admission No</label>
                        </div>
                        <div class="col-md-8 ">
                           <input type="text" class="form-control form-input" name="admissionno" placeholder="admission number*" v-model="student.admissionnumber">
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label>First Name</label>
                        </div>
                        <div class="col-md-8">
                           <input type="text" class="form-control form-input" name="studentname" v-model="student.name"  placeholder="studentname*">
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label>Middle Name</label>
                        </div>
                        <div class="col-md-8 ">
                           <input type="text" class="form-control form-input" name="middlename" placeholder="Student Middlename" v-model="student.middlename" >
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label>Last Name</label>
                        </div>
                        <div class="col-md-8 ">
                           <input type="text" class="form-control form-input" name="lastname" placeholder="Student Lastname*" v-model="student.lastname" required>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label>Gender</label>
                        </div>
                        <div class="col-md-8">
                           <label><input type="radio"  name="gender" value="female" v-model="student.gender">Female</label>
                           <label><input type="radio"  name="gender" value="male" v-model="student.gender">Male</label>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label>Height-Weight</label>
                        </div>
                        <div class="col-md-4 ">
                           <input type="text" class="form-control form-input" name="height" placeholder="Student Height*" v-model="student.height"  required>
                        </div>
                        <div class="col-md-4 ">
                           <input type="text" class="form-control form-input" name="weight" placeholder="Student Weight*" v-model="student.weight"  required>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label>e-mail </label>
                        </div>
                        <div class="col-md-8">
                           <input type="text" class="form-control form-input" name="emailid" v-model="student.emailid" placeholder="xxxxxxxxx@yyy.com">
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label for="class">Blood Group</label>
                        </div>
                        <div class="col-md-8">
                           <input type="text" class="form-control form-input" name="bloodgroup" placeholder="O+,O-,B+,B-,A+,A- *" v-model="student.bloodgroup"  required>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-12">
                           <label><input type="radio"  value=2 v-model="student.statusid">Inactive</label>
                           <label><input type="radio" value=1 v-model="student.statusid">Active</label>
                        </div>
                     </div>
                     <br>
                  </div>
                  <div class="col-lg-6">
                    <div class="row">
                            <div class="col-md-4">
                                <label style="margin-top: 10px;">Board Of Edu</label>
                            </div>
                            <div class="col-md-8">
                                <select class="form-control form-input" v-model="student.syllabustype" paceholder="Select" v-on:change="selectGradebasedonBoard" v-if="student.sectionname==null" >
                                    <option value="" disabled selected>Select your option</option>
                                    <option v-for="board in boardofeducation" v-bind:value="board.syllabustype" :key="board.id">{{board.syllabustype}}</option>
                                </select>
                                <h4 style="margin-top: 10px;color:blue" v-else-if="student.sectionname!=null" >{{student.syllabustype}}</h4>
                            </div>
                        </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label style="margin-top: 5px;">Grade</label>
                        </div>
                        <div class="col-md-8">
                           <select class="form-control form-input" v-model="student.gradename" paceholder="Select" v-if="student.sectionname==null" >
                              <option value="" disabled selected>Select your option</option>
                              <option v-for="grade in gradesbasedonboard" v-bind:value="grade.gradename" :key="grade.gradename">{{grade.gradename}}</option>
                           </select>
                           <h4 style="margin-top: 5px;color:blue" v-else-if="student.sectionname!=null" >{{student.gradename}}</h4>
                           <!-- {{gradesbasedonboard}} -->
                            <!-- <input type="text" name="Syllabustype" placeholder="Select/Search" list="grades" class="form-control form-input" v-model="student.gradename" required>
                            <datalist id="grades">
                              <select style="display: none;" id="_select" name="_select">
                                 <option v-for="grade in gradesbasedonboard" >{{grade.gradename}}</option>
                              </select>
                           </datalist> -->
                        </div>
                     </div>
                     <br>
                     <div class="row" v-if="student.sectionname!=null">
                            <div class="col-md-4">
                                <label style="margin-top: 10px;">Section Name</label>
                            </div>
                            <div class="col-md-8">
                                <h4 style="margin-top: 10px;color:blue" >{{student.sectionname}}</h4>
                            </div>
                        </div>
                     <br v-if="student.sectionname!=null">
                     <div class="row">
                        <div class="col-md-4">
                           <label>Date of Birth</label>
                        </div>
                        <div class="col-md-8 ">
                            <date-picker lang="en" v-model="setdateofbirth"></date-picker>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label>Date of joining</label>
                        </div>
                        <div class="col-md-8 ">
                            <date-picker lang="en" v-model="setdateofjoining"></date-picker>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label>House Name</label>
                        </div>
                        <div class="col-md-8 ">
                           <select class="form-control form-input" v-model="student.housename">
                                <option value="" disabled selected>Select your option</option>
                                <option v-for="house in houses" :key="house.id">{{house.housename}}</option>
                           </select>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label>Address</label>
                        </div>
                        <div class="col-md-8">
                           <textarea rows="4" cols="40" class="form-control form-input" name="address" v-model="student.address" ></textarea>
                        </div>
                     </div>
                     <br>
                  </div>
               </div>
               <!-- <h4><u><b>Parent Details</b></u></h4>
              
       
               <div ng-hide="IsVisible">
                  <div class="row">
                     <div class="col-md-6">
                        <div class="left-side-form">
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Father Name</label>
                              </div>
                              <div class="col-md-8 ">
                                 <input type="text" class="form-control form-input" id="" name="fathername"  placeholder="Father Name*" v-model="student.fathername" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Mother Name</label>
                              </div>
                              <div class="col-md-8 ">
                                 <input type="text" class="form-control form-input" id="" name="mothername" placeholder="Mother Name*" v-model="student.mothername"  required>
                              </div>
                           </div>
                           <br>
                        </div>
                     </div>
                     <div class="col-md-6">
                        <div class="right-side-form">
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Contact Number</label>
                              </div>
                              <div class="col-md-8 ">
                                 <input type="text" class="form-control form-input" id="" name="contactnumber" 
                                    placeholder="Contact Number*" v-model="student.contactnumber"
                                    required>
                              </div>
                           </div>
                           <br> 
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Address</label>
                              </div>
                              <div class="col-md-8">
                                 <textarea rows="4" cols="40" name="parentaddress" class="form-control form-input" v-model="student.parentaddress" required></textarea>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div> -->
               <br>
               <div class="row">
                  <div class="col-lg-6 col-lg-offset-3 text-center">
                     <button id="btn-reset"  data-dismiss="modal" class="btn btn-info button"> Cancel</button>
                     <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="editstudent()" class="btn btn-info button">Update</button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
</div>
<!-- <router-view v-bind:userdetails="userdetails" v-bind:school="school" v-bind:boardofeducation="boardofeducation" v-bind:houses="houses"></router-view> -->
</div>
</div>
</div>
</template>




<script>
import UserService from "../../../services/userService.js";
import DatePicker from "vue2-datepicker";
import EventBus from "../../../event-bus.js";
import _ from 'lodash';
import store from "../../../store.js";
export default {
  components: { DatePicker },
  props: ["school", "userdetails", 
//   "acdemicyearandboard"
  ],
  data() {
    return {
      search: "",
      student: {},
      singlestudent: {},
      students: [],
      boardofeducation: [],
      gradesbasedonboard: [],
      houses: [],
      id: this.$cookie.get("id"),
      setdateofbirth: "",
      setdateofjoining: "",
      pageNumber: 0,
      size: 10,
      open: "show",
      close: "open",
      parentdetails:{},
      classdetails:{},
      gradesList:[],
      gradeListCopy:[],
      sectionsList:[],
      sectionsListCopy:[],
      acdemicyearandboard:this.$store.state.acdemicyearandboard,
      academicDetails:{},
      activeacademicDetails:{},
      archivedacademicDetails:{},
      emptystring:"",
      activeacademicsandboards:[],
      archivedacademicsandboards:[],
      academicsandboards:{},
      isactive:1,
      sectiondetails:{}
    };
  },
  created() { 
      UserService.AcademicYears(this.id).then((response)=>{
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
         if(this.activeacademicsandboards.length>0){
            this.activeacademicDetails= {
               academicyearid : this.activeacademicsandboards[0].id,
               syllabustype : this.activeacademicsandboards[0].syllabustype
            }
         }
         if(this.archivedacademicsandboards.length>0){
            this.archivedacademicDetails= {
               academicyearid : this.archivedacademicsandboards[0].id,
               syllabustype : this.archivedacademicsandboards[0].syllabustype
            }
         }
         this.academicDetails = this.activeacademicDetails;
         this.getGradeList();
      })
   // this.academicDetails= {
   //          academicyearid : this.acdemicyearandboard.academicyearid,
   //          syllabustype : this.acdemicyearandboard.syllabustype
   // }
   // this.classdetails.sectionname = "A"
   // console.log(this.academicDetails);
   //  this.getGradeList();
   //  this.getStudentsList();
   //  UserService.BoardOfEducation(this.id).then(response => {
   //    this.boardofeducation = response.data;
   //    this.$store.commit("SET_BOARDOF_EDUCATION", this.boardofeducation);
   //  }),
   //    UserService.Houses(this.id).then(response => {
   //      this.houses = response.data;
   //      this.$store.commit("HOUSES", this.houses);
   //    });
  },

  methods: {
    changingacademicyear: function(){
      if(this.isactive == 1){
         this.academicDetails = this.activeacademicDetails
      } else {
         this.academicDetails = this.archivedacademicDetails
      }
       this.getGradeList();
     },
    changestatus: function(){
      if(this.isactive == 1){
         this.academicDetails = this.activeacademicDetails
      } else {
         this.academicDetails = this.archivedacademicDetails
      }
      this.getGradeList();
    },
    getStudentsList: function() {
      this.classdetails.academicyearid = this.academicDetails.academicyearid;
      // this.classdetails.syllabustype = this.academicDetails.syllabustype;
      UserService.Students(this.id, this.classdetails).then((response) => {
         console.log(response.data);
        this.students = response.data;
        //   this.$store.commit('SET_STUDENTS', this.students);
      });
    },
    getGradeList : function(){
      UserService.Grades(this.academicDetails.syllabustype, this.id).then((response) => {
         this.gradeListCopy = response.data;
         console.log(JSON.stringify(response.data))
         //  this.classdetails.gradeid = this.gradesList[0].id;
         this.getSectionsList();
         // if(response.status==200){
         //    this.getStudentsList();
         // }
      })
   },
   getSectionsList: function(){
    
      UserService.Sections(this.academicDetails,this.id).then((response)=>{
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
         // this.classdetails.gradeid = this.gradesList[0].id;
         this.classdetails.gradeid = 0;
         for (let i = 0; i < sectionsLength; i++) {
            if (this.classdetails.gradeid == this.sectionsListCopy[i].gradeid) {
               this.sectionsList.push(this.sectionsListCopy[i]);
            }
         }
         //  if(this.sectionsList.length > 0){
         //      this.section = this.sectionsList[0].id;
         //  }
         // this.classdetails.sectionname = this.sectionsList[0].sectionname;
         this.classdetails.sectionname = "";
         this.classdetails.classid = 0;
         this.sectiondetails.sectionname = "";
         this.sectiondetails.classid = 0;
         if(response.status==200){
            this.getStudentsList();
         }
      })
   },
   selectGrade: function(){
      if(this.classdetails.gradeid == 0){
         // this.sectiondetails.sectionname = this.emptystring;
         // this.sectiondetails.classid = 0;
         // this.sectionsList = [];
         this.classdetails.classid = 0;
      }
      else{
         this.sectionsList = [];
         let length = this.sectionsListCopy.length;
         for (let i = 0; i < length; i++) {
            if (this.classdetails.gradeid == this.sectionsListCopy[i].gradeid) {
               this.sectionsList.push(this.sectionsListCopy[i]);
            }
         }
         this.classdetails.sectionname = this.sectionsList[0].sectionname;
         this.classdetails.classid = this.sectionsList[0].id;
         this.sectiondetails.sectionname = this.sectionsList[0].sectionname;
         this.sectiondetails.classid = this.sectionsList[0].id;
      }
      this.getStudentsList();
   },
   selectSection: function(){
      if(this.classdetails.gradeid != 0 && this.sectiondetails.sectionname != this.emptystring){
         this.classdetails.classid = this.sectiondetails.classid;
         this.classdetails.sectionname = this.sectiondetails.sectionname;
      } else if(this.classdetails.gradeid == 0){
         this.classdetails.classid = 0;
         this.classdetails.sectionname = this.sectiondetails.sectionname;
      } else if(this.sectiondetails.sectionname == this.emptystring){
         this.classdetails.classid = 0;
         this.classdetails.sectionname = this.sectiondetails.sectionname;
      }
      console.log(this.classdetails)
      this.getStudentsList();
   },
    setStudent: function(student) {
      this.boardofeducation = this.$store.state.boardofeducation;
      console.log(this.boardofeducation);
      if (this.boardofeducation.length == 0) {
        UserService.BoardOfEducation(this.id).then(response => {
          this.boardofeducation = response.data;
          console.log(this.boardofeducation);
          this.$store.commit("SET_BOARDOF_EDUCATION", this.boardofeducation);
        });
      }
      this.houses = this.$store.state.houses;
      console.log(this.houses);
      if (this.houses.length == 0) {
        UserService.Houses(this.id).then(response => {
          this.houses = response.data;
          this.$store.commit("HOUSES", this.houses);
        });
      }
      console.log(student);
      this.student = student;
      this.selectGradebasedonBoard();
      this.setdateofbirth = new Date();
      this.setdateofbirth.setTime(student.dateofbirth);
      this.setdateofjoining = new Date();
      this.setdateofjoining.setTime(student.dateofjoining);
    },
    selectGradebasedonBoard: function() {
      var boardforgrade = {
        syllabustype: this.student.syllabustype
      };
      console.log(boardforgrade);
      // this.student.gradename = "";
      UserService.GradesForStudentBasedOnBoard(boardforgrade, this.id).then(
        response => {
          console.log(response);
          this.gradesbasedonboard = response.data;
        }
      );
    },
    editstudent: function() {
      var studentdetailsforedit = {
        id: this.student.id,
        admissionnumber: this.student.admissionnumber,
        name: this.student.name,
        middlename: this.student.middlename,
        lastname: this.student.lastname,
        gender: this.student.gender,
        height: this.student.height,
        weight: this.student.weight,
        emailid: this.student.emailid,
        bloodgroup: this.student.bloodgroup,
        syllabustype: this.student.syllabustype,
        gradename: this.student.gradename,
        dob: this.setdateofbirth.getTime(),
        doj: this.setdateofjoining.getTime(),
        housename: this.student.housename,
        address: this.student.address,
        parentemailid: this.student.parentemailid,
        statusid: this.student.statusid
        //   fathername: this.student.fathername,
        //   mothername: this.student.mothername,
        //   contactnumber: this.student.contactnumber,
        //   parentaddress: this.student.parentaddress,
        //   parentid: this.student.parentid
      };
      UserService.UpdateStudent(studentdetailsforedit, this.id).then(
        response => {
          if (response.status == 200) {
            $("#editstudent").modal("hide");
            this.$alert('Updated Student successfully','Success','success');
          }
          this.getStudentsList();
        }
      ).catch((error)=>{
            console.log(error.response.data);
            if(error.response.data.message == "provided emailid is already registered"){
               this.$alert(error.response.data.message,'Failure','warning');
            }
      })
    },
    eachstudent(student) {
      console.log(student);
      // UserService.Studentdetails(this.id,student).then((response)=>{
      //    console.log(response)
      //    this.singlestudent=response.data
      //    this.$store.commit("SET_SINGLE_STUDENT", this.singlestudent);
      // })
      // this.$emit("student", student);
      this.$store.commit("SET_SINGLE_STUDENT", student);
      var studentid = {
        studentid: student.id
      };
      console.log(studentid);
      UserService.GetParents(studentid, this.id).then(response => {
        console.log(response);
        this.parentdetails = response.data;
        this.$store.commit("SET_PARENT_DETAILS", this.parentdetails);
      });
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    }
  },
  computed: {
    pageCount() {
      let l = this.students.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    filterstudents: function() {
      var self = this;
      return this.students.filter(function(student) {
        return (
          student.name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
          student.gradename.toLowerCase().indexOf(self.search.toLowerCase()) >=
            0 ||
          student.syllabustype
            .toLowerCase()
            .indexOf(self.search.toLowerCase()) >= 0
          //  || student.fathername.toLowerCase().indexOf(self.search.toLowerCase()) >=0
        );
      });
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.filterstudents.slice(start, end);
    }
  }
};
</script>
<style scoped>
.reset-padding {
  padding: 0;
}
.reset-margin {
  margin: 0;
}
.studentstable {
  width: 100%;
}
</style>
