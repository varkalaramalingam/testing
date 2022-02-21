<template>
   <div class="container-fluid">
   <div class="row">
      <div class="page-layout">
         <div class="row">
            <div class="col-md-3">
               <div class="page-heading"><span v-html="$t('classroom_students')"/></div>
            </div>
            <div class="col-md-9">
               <div class="pull-right">
                  <button class='common-button pull-right' v-on:click="popUp('addstudent',open);getStudentsOfGrade()">New Student</button>
               </div>
               <div id="custom-search-input" class="pull-right">
                  <div class="input-group searchbar">
                     <input v-model='search' type="text" class="search-query form-control" placeholder="Search Student Name ....">
                     <span class="input-group-btn">
                     <button class="btn search-btn" type="button">
                     <span class=" glyphicon glyphicon-search"></span>
                     </button>
                     </span>
                  </div>
               </div>
            </div>
         </div>
         <hr>
         <div class="col-lg-12 reset-padding reset-margin">
            <div class="text-left col-md-6" >
               <h4>Class Teacher: <b>{{classTeacherName}}</b></h4>
            </div>
            <div class="text-right col-md-6" >
                <button class='common-button pull-right' v-on:click="popUp('generaterollnumber',open);getBeforeUpdatedDetails()">Generate Rollnumbers</button>
            </div>
            <br>
         </div>
         <!-- <div>
            <label class="col-sm-1 control-label" style="width:8.3%">Grade :</label>
            <select class="form-control gradeFilter" @change="selectGrade()" v-model="grade">
               <option v-for="grade in gradesList" v-bind:value="grade.id">{{grade.gradename}}</option>
            </select>
         </div>
         <div style="float:left;width:25%">
            <label class="col-sm-1 control-label" style="width:35%">Section :</label>
            <select class="form-control gradeFilter" @change="selectSection()" style="width:51%;margin-right:7px" v-model="section" :disabled="grade == 0">
               <option v-for="section in sectionsList" v-bind:value="section.id">Section - {{section.sectionname}}</option>
            </select>
            <br>
         </div> -->
         
         <div class="subjectteachertable ">
            <div class="divTable">
               <br>
               <div class="divTableBody">
                  <div class="divTableRow">
                     <div class="divTableCell">Roll number</div>
                     <div class="divTableCell">Student Name</div>
                     <div class="divTableCell">Admission number</div>
                  </div>
                  <div class="divTableRowdata"  v-for="student in paginatedData" >
                      <div class="divTableCelldata">{{student.rollnumber}}</div>
                     <div class="divTableCelldata">{{student.name}}</div>
                     <div class="divTableCelldata">{{student.admissionnumber}}</div>
                  </div>
               </div>
            </div>
            <div>
                <br>
               <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
               <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
            </div>
         </div>
         <div class="col-lg-12">
            <a v-if="classroomStudents.length !=0" data-toggle="modal" href="#promotestudents" class="pull-right">Do you want to promote them to next class? Click Here</a>
        </div>


        <!--  generate rollnumber pop up start -->
        <div class="modal fade" id="generaterollnumber" role="dialog" name="generaterollnumberforaclass">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Generate Rollnumber</h4>
                    </div>
                    <div class="modal-body">
                        <form id="form" class="form-horizontal" role="form" name="generaterollnumber" >
                        <div class="row">
                            <p style="text-align: center; color: red; padding:10px" v-if="beforeupdateddetails.updatedon>0">
                                Before you generated Rollnumbers on 
                                <b>{{getEventDate(beforeupdateddetails.updatedon)}}</b> using 
                                <b>{{beforeupdateddetails.rollsortbystring}}</b> method
                            </p>
                            <p style="text-align: center; color: green; padding:10px" v-if="beforeupdateddetails.updatedon==0">
                                You didn't generate Roll Numbers for this class
                            </p>
                        </div>
                        <br>   
                        <div class="row">
                            <div class="col-lg-10">
                                <div class="row">
                                    <div class="col-md-4">
                                        <label>Sort By</label>
                                    </div>
                                    <div class="col-md-8">
                                        <select class="form-control form-input" v-model="sortby" required>
                                            <option value=0 disabled> -- Select Method -- </option>
                                            <option v-for="sort in listofsortmethods" v-bind:value=sort.id>{{sort.name}}</option>
                                        </select>
                                    </div>
                                    <br>
                                    <br>
                                    <div class="col-md-4">
                                    <label>Override</label>
                                    </div>
                                    <div class="col-md-8">
                                        <label><input type="radio" value=1 v-model="override">Yes</label>
                                        <label><input type="radio"  value=0 v-model="override">No</label>
                                    </div>
                                    
                                </div>
                                <br>
                                <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" type="reset" class="btn btn-info resetbutton"> Reset</button>
                                    <button id="btn-reset" type="reset" @click="updateRollNumbers" class="btn btn-info resetbutton">Update</button>
                                   <!--  <button id="btn-Register" type="submit" name="submit" @click="newstudenttosection" class="btn button">Add</button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
    <!-- generate rollnumber pop up end  -->


       <!--  add new student pop up start -->
        <div class="modal fade" id="addstudent" role="dialog" name="addstudentmodal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add Student</h4>
                    </div>
                    <div class="modal-body">
                        <form id="form" class="form-horizontal" role="form" name="studentregistrationform" >
                        <div class="row">
                            <div class="col-lg-10">
                                <div class="row">
                                    <div class="col-md-4">
                                        <label></label>
                                    </div>
                                    <div class="col-md-8">
                                        <select class="form-control form-input" v-model="addingstudenttosection.admissionnumber" required>
                                            <option value=""> -- Select student -- </option>
                                            <option v-for="student in studentsofgrade" v-bind:value=student.admissionnumber>{{student.name}}</option>
                                        </select>
                                    </div>
                                    <!-- <div class="col-md-4">
                                         <br>
                                        <label></label>
                                    </div>
                                    <div class="col-md-8">
                                        <br>
                                        <select class="form-control form-input" v-model="addingstudenttosection.admissionnumber" required>
                                            <option value=""> -- Select grade -- </option>
                                            <option v-for="student in studentsofgrade" v-bind:value=student.admissionnumber>{{student.name}}</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <br>
                                        <label></label>
                                    </div>
                                    <div class="col-md-8">
                                         <br>
                                        <select class="form-control form-input" v-model="addingstudenttosection.admissionnumber" required>
                                            <option value=""> -- Select section -- </option>
                                            <option v-for="student in studentsofgrade" v-bind:value=student.admissionnumber>{{student.name}}</option>
                                        </select>
                                    </div> -->
                                    
                                </div>
                                <br>
                                <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" type="reset" class="btn btn-info resetbutton"> Reset</button>
                                    <button id="btn-reset" type="reset" @click="newstudenttosection" class="btn btn-info resetbutton"> Add</button>
                                   <!--  <button id="btn-Register" type="submit" name="submit" @click="newstudenttosection" class="btn button">Add</button> -->
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
    <!-- add new student pop up end  -->

    <!-- promote pop up start  -->
    <div class="modal fade" id="promotestudents" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button  class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Promote Students</h4>
                </div>
                <div class="modal-body">
                    <h4>Class:<b>{{myClassDetails.gradenumber}}{{myClassDetails.sectionname}}</b></h4>
                    <div class="divTable">
                        <div class="divTableBody">
                            <div class="divTableRow">
                                <div class="divTableCell">&nbsp;</div>
                                <div class="divTableCell">Student Name</div>
                                <div class="divTableCell">Admission number</div>
                            </div>
                            <div class="divTableRowdata" v-for="student in classroomStudents" >
                                <div class="divTableCelldata"><input type="checkbox" v-model="studentsids" :value="student.id" /></div>
                                <div class="divTableCelldata">{{student.name}}</div>
                                <div class="divTableCelldata">{{student.admissionnumber}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="padding-top: 10px;">
                        <div class="col-lg-3">
                            <label>Academic Year:</label>
                        </div>
                        <div class="col-lg-4">
                            <select  class="form-control" v-model="promote.academicyear" v-on:change="changingacademicyear()" >
                                <option v-bind:value="{academicyearid: 0,syllabustype:''}">-- Select Academic year --</option>
                                <option v-for="academic in academicsandboards" 
                                    v-bind:value="{academicyearid: academic.id,syllabustype:academic.syllabustype}" 
                                    :key='academic.id+academic.syllabustype'
                                    v-show="academic.active && currentpassingyear <= academic.passingyear"
                                >{{academic.passingyear}}-{{academic.syllabustype}}</option>
                            </select>
                        </div>
                        <div class="col-lg-2">
                            <label>Grade :</label>
                        </div>
                        <div class="col-lg-3">
                            <select class="form-control" @change.prevent="selectGrade()" v-model="promote.gradeid">
                                <option v-bind:value="0">-- Select Grade --</option>
                                <option v-show="currentgradenumber <= grade.gradenumber" v-for="grade in promoteGradesList" v-bind:value="grade.id" :key="grade.id">{{grade.gradename}}</option>
                            </select>
                        </div>
                    </div>
                    <div class="row" style="padding-top: 10px;">
                        <div class="col-lg-3">
                            <label>Section :</label>
                        </div>
                        <div class="col-lg-4">
                            <select class="form-control" v-model="promote.section" >
                                 <option v-bind:value="{classid:0,sectionname:''}">-- Create Class --</option>
                                <option v-show="filter.classroomid != section.id" v-for="section in promoteSectionsList" v-bind:value="{classid:section.id,sectionname:section.sectionname}" :key="section.id">Section - {{section.sectionname}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                                <button type="button" id="submit" class="btn btn-primary" v-on:click="promoteStudents()">Promote</button>
                </div>
            </div>
        </div>
    </div>
   <!--  promote student pop up end -->
      </div>
      
   </div>
</div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import store from '../../../../store.js';
import moment from "moment";

    export default{
        props: ["filter"],
        data(){
            return{
                classroomStudents:[],
                studentsofgrade:[],
                addingstudenttosection:{admissionnumber:''},
                tenantId:this.$cookie.get('id'),
                myClassDetails:this.$store.state.myClass,
                selectedSection: this.$store.state.selectedSection,
                // acdemicyearandboard:this.$store.state.acdemicyearandboard,
                academicDetails:{},
                // gradesList:[],
                // sectionsList:[],
                sections:[],
                grade:13,
                section:14,
                // grade:this.$store.state.selectedClassRoomObj.gradeId,
                // section:this.$store.state.selectedClassRoomObj.sectionId,
                sectionsListCopy:[],
                // gradeListCopy :[],
                school:{},
                userdetails : {},
                pageNumber: 0,
                size: 10,
                search: '',
                classTeacherName:'',
                open: 'show',
                close: 'hide',
                setSectionId:false,
                beforeupdateddetails: {
                    updatedon:-1
                },
                sortby: 0,
                override: 0,
                classroomStudents:[],
                academicsandboards:[],
                studentsids:[],
                promote:{},
                promoteGradesList:[],
                promoteGradesListCopy:[],
                promoteSectionsList:[],
                promoteSectionsListCopy:[],
                sectiondetails:{},
                currentpassingyear:0,
                currentgradenumber:0,
                listofsortmethods:[
                    {
                        id: 1,
                        name: "First Name"
                    },
                    {
                        id: 2,
                        name: "Admission Number"
                    },
                    {
                        id: 3,
                        name: "Date of Joining"
                    }
                ],
            }
        },
        created(){
            this.tenantId = this.$cookie.get('id');
            this.school =  this.$store.state.school;
            this.userdetails = this.$store.state.userDetails;
            //  this.academicDetails= {
            //     academicyearid : this.acdemicyearandboard.academicyearid,
            //     syllabustype : this.acdemicyearandboard.syllabustype
            // }
            this.academicDetails= {
                academicyearid : this.filter.academicyearid,
                syllabustype : this.filter.syllabustype
            }
            UserService.AcademicYears(this.tenantId).then((response)=>{
                this.academicsandboards=response.data.academics;
                for(let i=0;i<this.academicsandboards.length;i++){
                    if(this.academicsandboards[i].id == this.academicDetails.academicyearid){
                        this.currentpassingyear = this.academicsandboards[i].passingyear;
                        break;
                    }
                }
            })
            this.section = this.filter.classroomid;
            this.grade = this.filter.gradeid
            console.log(this.academicDetails)
            console.log(this.filter)
            this.classTeacherName = this.filter.classteachername;
            // this.getGradeList();
            // this.getSelectedGradeSection();
            this.getClassroomStudents();
            // this.getStudentsOfGrade();
            // this.getClassTeacherName();
            
        },
        methods:{
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        
        getEventDate: function(date) {
            return moment(date).format("LL");
        },

            getClassroomStudents : function(){
                let obj = {
                    classroomid:this.section,
                    gradeid:this.grade
                }
                UserService.SectionDetails(obj,this.tenantId).then((response)=>{
                    console.log(response);
                    this.classroomStudents=response.data.studentsOfClassRoom;
                })
            },

            getStudentsOfGrade : function(){
                let obj ={
                    id:this.section
                }
                if(this.section){
                UserService.StudentsOfGrade(obj,this.tenantId).then((response)=>{
                    this.studentsofgrade=response.data;
                    console.log(JSON.stringify(this.StudentsOfGrade))
                })
              }
            },

        getBeforeUpdatedDetails: function(){
            let obj = {
                classroomid:this.section,
            }
            UserService.GenerateRollnumbers(obj,this.tenantId).then((response)=>{
                this.beforeupdateddetails=response.data;
                this.sortby = this.beforeupdateddetails.rollsortby;
                console.log(JSON.stringify(this.StudentsOfGrade))
            })
        },

        updateRollNumbers:function(){
            if(this.sortby!=0){
                let obj = {
                    classroomid:this.section,
                    rollsortby:this.sortby,
                    override:this.override
                }
                console.log(obj);
                UserService.UpdateRollnumbers(obj, this.tenantId).then((response)=>{
                    console.log(response.data);
                    this.popUp('generaterollnumber',this.close);
                    if(response.status==200){
                        this.getBeforeUpdatedDetails();
                        this.$alert("Rollnumbers Updated successfully","Success","success");
                        this.getClassroomStudents();
                    }
                })
            }
            else{
                this.$alert("You need to enter the method for sorting","Warning","warning")
            }
        },

        getSelectedGradeSection:function(){
            let selectedClassRoomObj = this.$store.state.selectedClassRoomObj;
            console.log(selectedClassRoomObj)
            if(selectedClassRoomObj && selectedClassRoomObj.gradeId && selectedClassRoomObj.sectionId){
                this.grade = selectedClassRoomObj.gradeId;
                this.section = selectedClassRoomObj.sectionId;
            }else{
                if(this.gradeListCopy && this.gradeListCopy.length > 0){
                    this.grade = this.gradeListCopy[0].id;
                }
                if(this.sectionsListCopy && this.sectionsListCopy.length  > 0){
                    this.section = this.sectionsListCopy[0].id;
                }
            }
        }, 
        getClassTeacherName : function(){
            UserService.Sections(this.academicDetails,this.tenantId).then((response)=>{
                console.log(JSON.stringify(response.data))
                this.sectionsListCopy = response.data;
                console.log(this.section)
                console.log(this.sectionsListCopy)
                let length = this.sectionsListCopy.length;
                console.log(length)
                for (let i = 0; i < length; i++) {
                    console.log(this.sectionsListCopy[i].id)
                    if (this.section == this.sectionsListCopy[i].id) {
                        this.classTeacherName = this.sectionsListCopy[i].teachername;
                        break;
                    }
                }
                console.log(this.classTeacherName)
            })
        },
            newstudenttosection:function(){
                console.log(this.addingstudenttosection);
                var studentid={
                    'id':this.section,
                    'admissionnumber':this.addingstudenttosection.admissionnumber
                }
                console.log(studentid)
                UserService.NewStudentToSection(studentid,this.tenantId).then((response)=>{
                    console.log(JSON.stringify(response.data))
                    this.getClassroomStudents();
                    this.popUp('addstudent',this.close);
                })

            },
        changingacademicyear: function(){
            this.promoteSectionsList=[];
            this.promoteGradesList=[];
            if(this.promote.academicyear.academicyearid == 0){
            }else{
                if(this.promoteGradesList.length == 0){
                    this.getGradeList();
                }
                this.selectGrade();
            }
        },
        getGradeList : function(){
            UserService.Grades(this.promote.academicyear.syllabustype, this.tenantId).then((response) => {
                this.promoteGradesList = response.data;
                if(this.currentgradenumber == 0){
                    for(let i=0;i<this.promoteGradesList.length;i++){
                        if(this.promoteGradesList[i].id == this.filter.gradeid){
                            this.currentgradenumber = this.promoteGradesList[i].gradenumber;
                            break;
                        }
                    }
                }
            })
        },
        selectGrade: function(){
            if(this.promote.gradeid == 0){
                this.promote.section.classid = 0;
            }
            else{
                UserService.Sections(this.promote.academicyear,this.tenantId).then((response)=>{
                    this.promoteSectionsList=[];
                    this.promoteSectionsListCopy = response.data;
                let length = this.promoteSectionsListCopy.length;
                for (let i = 0; i < length; i++) {
                    if (this.promote.gradeid == this.promoteSectionsListCopy[i].gradeid) {
                    this.promoteSectionsList.push(this.promoteSectionsListCopy[i]);
                    }
                }
                })
            }
        },
        promoteStudents: function(){
            let promoteDetails = {
                studentids : this.studentsids,
                fromclassroomid: this.section,
                toclassroomid: this.promote.section.classid,
                togradeid: this.promote.gradeid,
                toacademicid: this.promote.academicyear.academicyearid,
            }
            UserService.promoteStudents(promoteDetails, this.tenantId).then((response) => {
                if(response.status==200){
                     this.getClassroomStudents();
                     $("#promotestudents").modal("hide");
                    this.$alert("Student(s) Promoted Success","Success","success");
                }else{
                    this.$alert('Student(s) Promotion Failed','Fail','fail');
                }
                
            })
        },
        },
        computed: {
        pageCount() {
            let l = this.classroomStudents.length,
                s = this.size;
            return Math.ceil(l / s);
        },

        filteStudents: function() {
            var self = this;
            return this.classroomStudents.filter(function(student) {
                return student.name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ;
            });
        },
        paginatedData() {
            if(!this.classroomStudents || this.classroomStudents.length == 0){
                return;
            }
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filteStudents.slice(start, end);
        },
    }
    }
</script>
<style scoped>
@import url('../../../../assets/css/classrooms_styles.css');
</style>