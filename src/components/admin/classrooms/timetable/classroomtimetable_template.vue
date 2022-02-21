<template>
  <div class="container-fluid">
   <div class="row">
      <div class="page-layout">
         <div class="row">
            <div class="col-md-3">
               <div class="page-heading"><span v-html="$t('time_table')"/></div>
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
                       <div class="divTableCell">No.of periods</div>
                     <div class="divTableCell" v-for="timings in timetable.periods">{{timings.period_number}}</div>
                     </div>
                    <div class="divTableRow">
                    <div class="divTableCell">Timings/Days</div>
                    <div class="divTableCell" v-for="timings in timetable.periods">{{GetFromTime(timings.periodfrom)}} To {{GetFromTime(timings.periodto)}}</div>
                    </div>
                    <div class="divTableRowdata" v-for="weekdays in timetable.timeTableView">
                    <div class="divTableCell">{{weekdays.day}}</div>
                    <div class="divTableCell" v-for="timings in weekdays.timeTableDataTransferObject">{{timings.subjectname}}
                    <a data-toggle="modal" href="#addsubjects" v-on:click.prevent="setSubjects(timings,weekdays)">
                     <i class="fa fa-pencil  pull-right" aria-hidden="true"></i></a></div>
                    </div>
                </div>
            </div>
         </div>
         <!-- change time period teacher pop up start  -->
         <div class="modal fade" id="addsubjects" role="dialog" name="addstudentmodal">
   <div class="modal-dialog">
      <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Add Teacher</h4>
         </div>
         <div class="modal-body">

            <form name="addteachermodal">
               <div class="row">
                  <div class="col-md-3">
                     <label style="margin-left: 15px">Subject Name</label>
                  </div>
                  <div class="col-md-8 ">
                     <select class="form-control form-input" v-model="periodsubjects">
                        <option value="" disabled selected>Select your option</option>
                         <option v-for="subject in sectiondetails.subjects" v-bind:value="subject.id">{{subject.subjectname}}</option>
                     </select>
                  </div>
               </div>
               <br>
               <div class="row">
                  <div class="col-lg-6 col-lg-offset-3 text-center">
                     <button id="btn-Register" type="reset" name="reset"  class="btn btn-info button"  data-dismiss="modal">Cancel</button>
                     <button id="btn-Register" type="submit" name="submit" class="btn btn-info button" v-on:click.prevent="addsubjectstotimetable">Add</button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
    </div>
         <!--  change time period teacher pop up end -->
      </div>
   </div>
</div>
</template>
<script>
import UserService from "../../../../services/userService.js";
import store from "../../../../store.js";
export default {
  props: ["filter"],
  data() {
    return {
      subjectTeachers: [],
      studentsofgrade: [],
      addingstudenttosection: {
        admissionnumber: ""
      },
      tenantId: this.$cookie.get("id"),
      myClassDetails: this.$store.state.myClass,
      selectedSection: this.$store.state.selectedSection,
      acdemicyearandboard: this.$store.state.acdemicyearandboard,
      academicDetails: {},
      gradesList: [],
      sectionsList: [],
      sections: [],
      grade: 0,
      section: 0,
      sectionsListCopy: [],
      gradeListCopy: [],
      school: {},
      userdetails: {},
      pageNumber: 0,
      size: 10,
      search: "",
      classTeacherName: "",
      open: "show",
      close: "hide",
      teachers: [],
      sectionsubjects: {
        teachername: ""
      },
      subject: {},
      timetable: [],
      periodsubjects: {},
      sectiondetails: {},
      setSectionId: false
    };
  },
  created() {
    this.tenantId = this.$cookie.get("id");
    this.school = this.$store.state.school;
    this.userdetails = this.$store.state.userDetails;
    // this.academicDetails = {
    //   academicyearid: this.acdemicyearandboard.academicyearid,
    //   syllabustype: this.acdemicyearandboard.syllabustype
    // };
    this.academicDetails= {
            academicyearid : this.filter.academicyearid,
            syllabustype : this.filter.syllabustype
        }
    this.section = this.filter.classroomid;
    this.grade = this.filter.gradeid
    this.classTeacherName = this.filter.classteachername;
    // this.getGradeList();
    // this.getSelectedGradeSection();
    // this.getTeachers();git
    this.getClassroomTimeTable();
    this.getSectionDetails();
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
      $("#" + id).modal(action);
    },
    setSubjects: function(timings, weekdays) {
      this.timings = timings;
      this.weekdays = weekdays;
    },
    getSelectedGradeSection: function() {
      let selectedClassRoomObj = this.$store.state.selectedClassRoomObj;
      if (
        selectedClassRoomObj &&
        selectedClassRoomObj.gradeId &&
        selectedClassRoomObj.sectionId
      ) {
        this.grade = selectedClassRoomObj.gradeId;
        this.section = selectedClassRoomObj.sectionId;
      } else {
        this.grade = this.gradeListCopy[0].id;
        this.section = this.sectionsListCopy[0].id;
      }
    },

    getClassroomTimeTable: function() {
      let obj = {
        id: this.section
      };
      UserService.GetTimingsforsection(obj, this.tenantId).then(response => {
        this.timetable = response.data;
      });
    },

    getSectionDetails: function() {
      let obj = {
        classroomid: this.section,
        academicgradeid: this.filter.academicgradeid
      };
      console.log(JSON.stringify(obj));
      UserService.SectionDetails(obj, this.tenantId).then(response => {
        this.sectiondetails = response.data;
      });
    },
    addsubjectstotimetable: function() {
      var addingsubjects = {
        weekdayid: this.weekdays.id,
        periodid: this.timings.id,
        subjectid: this.periodsubjects,
        classroomid: this.section
      };
      UserService.AddingsubjectToPeriod(addingsubjects, this.tenantId).then(
        response => {
          this.getClassroomTimeTable();
          this.getSectionDetails();
          this.popUp("addsubjects", this.close);
        }
      );
    },
    getClassTeacherName: function() {
      UserService.Sections(this.academicDetails,this.tenantId).then((response)=>{
          this.sectionsListCopy = response.data;
          let length = this.sectionsListCopy.length;
          for (let i = 0; i < length; i++) {
              if (this.section == this.sectionsListCopy[i].id) {
                  this.classTeacherName = this.sectionsListCopy[i].teachername;
                  break;
              }
          }
      })
    },
    GetFromTime: function(time) {
      if (time > 720) {
        var temp = time - 720;
        return (temp - (temp % 60)) / 60 + ":" + (temp % 60) + " PM";
      } else {
        return (time - (time % 60)) / 60 + ":" + (time % 60) + " AM";
      }
    }
  },
  computed: {
    pageCount() {
      let l = this.subjectTeachers.length,
        s = this.size;
      return Math.ceil(l / s);
    },

    filteStudents: function() {
      var self = this;
      return this.subjectTeachers.filter(function(student) {
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
    }
  }
};
</script>
<style scoped>
@import url("../../../../assets/css/classrooms_styles.css");
</style>
