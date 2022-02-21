<template>
  <div class="container-fluid">
   <div class="row">
      <div class="page-layout">
         <div class="row">
            <div class="col-md-3">
               <div class="page-heading"><span v-html="$t('classroom_tests')"/></div>
            </div>
         </div>
         <hr>
         <div class="col-lg-12 reset-padding reset-margin">
            <div class="text-left">
               <h4>Class Teacher: <b>{{classTeacherName}}</b></h4>
            </div>
            <br>
         </div>
         <div class="subjectteachertable ">
            <div class="divTable">
               <br>
               <div class="divTableBody">
                <div class="divTableRow">
                    <div class="divTableCell">ID</div>
                    <div class="divTableCell">Test type</div>
                    <div class="divTableCell">Start Date</div>
                    <div class="divTableCell">End Date</div>
                    <div class="divTableCell">Total Marks</div>
                    <div class="divTableCell">Test mode</div>
                    <div class="divTableCell">Current Status</div>
                </div>

                <div class="divTableRowdata" v-for="(test,index) in paginatedData">
                    <div class="divTableCelldata">{{test.id}}</div>
                    <div class="divTableCelldata">
                    <a style="cursor:pointer" tag="button" @click="eachTest(test)" >{{test.testtype}}</a>
                    </div>
                     <div class="divTableCelldata">{{getstartdate(test.startdate)}}</div>
                    <div class="divTableCelldata">{{getenddate(test.enddate)}}</div>
                    <div class="divTableCelldata">{{test.maxmarks}}</div>
                    <div class="divTableCelldata">{{test.testmode}}</div>
                    <div class="divTableCelldata">{{test.status}}</div>
                </div>

            </div>
            </div>
            <div>
                <br>
               <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
               <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
            </div>
         </div>
         <!-- add teacher pop up start  -->
         <div class="modal fade" id="addteacher" role="dialog" name="addstudentmodal">
            <div class="modal-dialog">
               <div class="modal-content">
                  <div class="modal-header">
                     <button type="button" class="close" data-dismiss="modal">&times;</button>
                     <h4 class="modal-title">Add Teacher</h4>
                  </div>
                  <div class="modal-body">
                     <br>
                     <div class="row">
                        <div class="col-md-3">
                           <label style="margin-left: 15px">Teacher Name:</label>
                        </div>
                        <div class="col-md-8 ">
                           <select class="form-control form-input" v-model="sectionsubjects.teachername">
                              <option value=""> -- Select teacher -- </option>
                              <option v-for="teacher in teachers">{{teacher.teachername}}</option>
                           </select>
                        </div>
                     </div>
                     <br>
                  </div>
                  <div class="modal-footer">
                     <button id="btn-Register" type="reset" name="reset"  class="btn btn-danger button"  data-dismiss="modal">Cancel</button>
                     <button id="btn-Register" @click="addteachertosubject" class="btn btn-primary button">Add</button>
                  </div>
               </div>
            </div>
         </div>
         <!--  add teacher pop up end -->
      </div>
   </div>
</div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import store from '../../../../store.js';
import moment from 'moment'
export default {
    props: ["filter"],
    data() {
        return {
            subjectTeachers: [],
            studentsofgrade: [],
            addingstudenttosection: {
                admissionnumber: ''
            },
            tenantId: this.$cookie.get('id'),
            myClassDetails: this.$store.state.myClass,
            selectedSection: this.$store.state.selectedSection,
            acdemicyearandboard: this.$store.state.acdemicyearandboard,
            academicDetails: {},
            sections: [],
            grade: 0,
            section: 0,
            sectionsListCopy: [],
            school: {},
            userdetails: {},
            pageNumber: 0,
            size: 10,
            search: '',
            classTeacherName: '',
            open: 'show',
            close: 'hide',
            teachers: [],
            sectionsubjects: {
                teachername: ''
            },
            subject: {},
            listoftests:[],
            gradeid:{},
            setSectionId:false,

        }
    },
    created() {
        this.tenantId = this.$cookie.get('id');
        this.school = this.$store.state.school;
        this.userdetails = this.$store.state.userDetails;
        // this.gradeid={
        //      id:this.grade,
        //      academicyear:this.$store.state.acdemicyearandboard.academicyearid 
        //   }
        // this.academicDetails = {
        //     academicyearid: this.acdemicyearandboard.academicyearid,
        //     syllabustype: this.acdemicyearandboard.syllabustype
        // }
        this.academicDetails= {
            academicyearid : this.filter.academicyearid,
            syllabustype : this.filter.syllabustype
        }
        this.section = this.filter.classroomid;
        this.grade = this.filter.gradeid;
        console.log(this.myClassDetails)
        this.gradeid={
             id:this.grade,
             academicyear:this.filter.academicyearid 
          }
        this.classTeacherName = this.filter.classteachername;
        // this.getGradeList();
        // this.getSelectedGradeSection();
        // this.getStudentsOfGrade();
        // this.getTeachers();
        this.getListOfTests();
        // this.getClassTeacherName();

    },
    methods: {
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        getTeachers: function() {
            UserService.Teachers(this.tenantId).then((response) => {
                console.log(response.data);
                this.teachers = response.data;
            })
        },
        getstartdate:function(date){
            return moment(date).format('DD/MM/YYYY');
        },
        getenddate:function(date){
            return moment(date).format('DD/MM/YYYY')
        },
        getListOfTests : function(){
            this.gradeid={
             id:this.grade,
             academicyear:this.filter.academicyearid 
          }
            UserService.ListOfTests(this.gradeid,this.tenantId).then((response)=>{
                console.log(response);
                this.listoftests=response.data;
            })
        },
        eachTest: function(selectedTest) {
            console.log(selectedTest);
            this.selectedTest = selectedTest;
            this.$store.commit('SELECTED_CLASSROOM_TEST',selectedTest);
            this.$router.push({
                path: '/crm/classroom-test'
            })
        },
        getSelectedGradeSection:function(){
            let selectedClassRoomObj = this.$store.state.selectedClassRoomObj;
            if(selectedClassRoomObj && selectedClassRoomObj.gradeId && selectedClassRoomObj.sectionId){
                this.grade = selectedClassRoomObj.gradeId;
                this.section = selectedClassRoomObj.sectionId;
            }else{
                this.grade = this.gradeListCopy[0].id;
                this.section = this.sectionsListCopy[0].id;;
            }
        }, 
        setSubjects: function(subject) {
            console.log(subject);
            this.subject = subject
        },
        addteachertosubject: function() {
            var addteachertosubjectid = {
                'id': this.section,
                'subjectname': this.subject.subjectname,
                'teachername': this.sectionsubjects.teachername
            }
            console.log(addteachertosubjectid);
            UserService.AssigningTeacherToSubject(addteachertosubjectid, this.tenantId).then((response) => {
                console.log(response);
                this.sectionsubjects.teachername = '';
                this.getClassroomTeachers();
                this.popUp('addteacher', this.close);
            })
        },

        getClassroomTeachers: function() {
            let obj = {
                id: this.section,
                gradeid: this.grade
            }
            UserService.SectionDetails(obj, this.tenantId).then((response) => {
                console.log(response);
                this.subjectTeachers = response.data.subjectteachers;
            })
        },

        getStudentsOfGrade: function() {
            let obj = {
                id: this.section
            }
            if (this.section) {
                UserService.StudentsOfGrade(obj, this.tenantId).then((response) => {
                    this.studentsofgrade = response.data;
                    console.log(JSON.stringify(this.StudentsOfGrade))
                })
            }
        },
        getClassTeacherName: function() {
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

    },
    computed: {
        pageCount() {
            let l = this.listoftests.length,
                s = this.size;
            return Math.ceil(l / s);
        },

        filteTests: function() {
            var self = this;
            return this.listoftests.filter(function(student) {
                return true;
            });
        },
        paginatedData() {
            if (!this.listoftests || this.listoftests.length == 0) {
                return;
            }
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filteTests.slice(start, end);
        },
    }
}
</script>
<style scoped>
@import url('../../../../assets/css/classrooms_styles.css');
</style>