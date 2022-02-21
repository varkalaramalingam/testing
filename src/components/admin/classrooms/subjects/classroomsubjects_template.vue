<template>
  <div class="container-fluid">
   <div class="row">
      <div class="page-layout">
         <div class="row">
            <div class="col-md-3">
               <div class="page-heading"><span v-html="$t('subjects_teachers')"/></div>
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
                     <div class="divTableCell">Subject </div>
                     <div class="divTableCell">Subject Teacher</div>
                     <!-- <div class="divTableCell">Assign-Teacher</div> -->
                     <div class="divTableCell">Assign-Teachers</div>
                  </div>
                  <div class="divTableRowdata"  v-for="subject in subjectTeachers" >
                     <div class="divTableCelldata">{{subject.subjectname}}</div>
                     <!-- <div class="divTableCelldata">{{subject.teachernames}}</div> -->
                     <div class="divTableCelldata" v-if="subject.teachernames!=[]">
                        <span v-for="teacher in subject.teachernames" v-bind:key="teacher">
                            <ul>{{teacher}}</ul>
                        </span>
                     </div>
                     <!-- {{subject.teachernames.length}} -->
                     <div class="divTableCelldata" v-if="subject.teachernames==[]">{{subject.teachername}}</div>
                     <!-- <div class="divTableCelldata"><a data-toggle="modal" href="#addteacher" @click="setSubjects(subject)"><i class="fa fa-plus-square fa-1x" aria-hidden="true"></i></a></div> -->
                     <div class="divTableCelldata">
                         <div class="divTableCelldata"><a data-toggle="modal" href="#addteachers" @click="setSubjects(subject)"><i class="fa fa-plus-square fa-1x" aria-hidden="true"></i></a></div>
                     </div>
                  </div>
               </div>
            </div>
            <div>
                <br>
               <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
               <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
            </div>
         </div>
         <!-- {{teachernames}} -->
         <!-- {{teacherNamesForASub}}  -->
         <!-- {{subjectTeachers1}} -->

         <!-- add teachers pop up start  -->
         <div class="modal fade" id="addteachers" role="dialog" name="addstudentmodal">
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
                            <multiselect v-model="teacherNamesForASub" :options="teachernames" :multiple="true" ></multiselect>
                           <!-- <select class="form-control form-input" v-model="sectionsubjects.teachername">
                              <option value=""> -- Select teacher -- </option>
                              <option v-for="teacher in teachers">{{teacher.teachername}}</option>
                           </select> -->
                        </div>
                     </div>
                     <br>
                  </div>
                  <div class="modal-footer">
                     <button id="btn-Register" type="reset" name="reset"  class="btn btn-danger button"  data-dismiss="modal">Cancel</button>
                     <button id="btn-Register" @click="addteacherstosubject" class="btn btn-primary button">Add</button>
                  </div>
               </div>
            </div>
         </div>
         <!--  add teachers pop up end -->
      </div>
   </div>
</div>
</template>
<script>
import Multiselect from 'vue-multiselect';
import _ from "lodash";
import UserService from '../../../../services/userService.js';
import store from '../../../../store.js';
export default {
    props: ["filter"],
    components: {Multiselect},
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
            // acdemicyearandboard: this.$store.state.acdemicyearandboard,
            academicDetails: {},
            sections: [],
            grade: 0,
            section: 0,
            sectionsListCopy: [],    // for teachername
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
            setSectionId:false,
            teachernames:[],
            teacherNamesForASub:[]
        }
    },
    created() {
        this.tenantId = this.$cookie.get('id');
        this.school = this.$store.state.school;
        this.userdetails = this.$store.state.userDetails;
        // this.academicDetails = {
        //     academicyearid: this.acdemicyearandboard.academicyearid,
        //     syllabustype: this.acdemicyearandboard.syllabustype
        // }
        this.academicDetails= {
            academicyearid : this.filter.academicyearid,
            syllabustype : this.filter.syllabustype
        }
        this.section = this.filter.classroomid;
        this.grade = this.filter.gradeid
        console.log(JSON.stringify(this.filter));
        this.classTeacherName = this.filter.classteachername;
        // this.getSelectedGradeSection();
        this.getTeachers();
        this.getClassroomTeachers();
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
                this.teachernames = _.map(this.teachers, function(data){
                    if(data.statusid == 1){
                        return data.teachername
                    }else{
                        return data.teachername + ' - inactive'
                    }
                });
                console.log(this.teachernames);
            })
        },
        setSubjects: function(subject) {
            console.log(subject);
            this.subject = subject
            this.teacherNamesForASub = this.subject.teachernames;
        },
        addteacherstosubject: function() {
            if(this.teacherNamesForASub.length != 0){
                var addteachertosubjectid = {
                    'id': this.section,
                    'subjectname': this.subject.subjectname,
                    'teachernames': this.teacherNamesForASub
                }
                console.log(addteachertosubjectid);
                UserService.AssigningTeacherToSubject(addteachertosubjectid, this.tenantId).then((response) => {
                    console.log(response);
                    // this.sectionsubjects.teachername = '';
                    this.getClassroomTeachers();
                    this.popUp('addteachers', this.close);
                    this.$alert("Teachers added successfully for the subject","Success","success");
                })
            } else{
                this.$alert("You need to enter atleast one teacher","Warning","warning");
            }
        },

        getClassroomTeachers: function() {
            let obj = {
                classroomid: this.section,
                academicgradeid: this.filter.academicgradeid
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
            let l = this.subjectTeachers.length,
                s = this.size;
            return Math.ceil(l / s);
        },

        filteStudents: function() {
            var self = this;
            return self.subjectTeachers.filter(function(student) {
                return true;
            });
        },
        paginatedData() {
            if (!this.subjectTeachers || this.subjectTeachers.length == 0) {
                return;
            }
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filteStudents.slice(start, end);
        },
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
@import '../../../../assets/css/classrooms_styles.css';
</style>