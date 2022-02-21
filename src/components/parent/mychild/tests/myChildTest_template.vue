<template>
    <div>
   <div class="row">
      <div class="col-sm-12" >
         <h3 class="student-head" style="text-align:center;">{{selectedTestObj.testtype}}</h3>
      </div>
   </div>
   <hr>
   <div class="row">
      <div class="col-sm-6" style="text-align:right;">Grade :
      </div>
      <div class="col-sm-6">{{selectedTestObj.gradeid}}</div>
   </div>
   <div class="row">
      <div class="col-sm-6" style="text-align:right;">Start date :
      </div>
      <div class="col-sm-6">{{getstartdate(selectedTestObj.startdate)}}</div>
   </div>
   <div class="row">
      <div class="col-sm-6" style="text-align:right;">End date :
      </div>
      <div class="col-sm-6">{{getenddate(selectedTestObj.enddate)}}</div>
   </div>
   <div class="row">
      <div class="col-sm-6" style="text-align:right;">Test Mode :
      </div>
      <div class="col-sm-6">{{selectedTestObj.testmode}}</div>
   </div>
   <div class="row">
      <div class="col-sm-6" style="text-align:right;">Max. marks :
      </div>
      <div class="col-sm-6">{{selectedTestObj.maxmarks}}</div>
   </div>
   <div class="container">
      <br>
      <div class="col-lg-12 text-left">
      </div>
   </div>
   <hr>
   <div class="col-lg-8" v-if="viewresult==false">
      <h1 v-if="testsubjectdetails.length==0">No details</h1>
      <div class="row">
         <div class="col-lg-12">
            <div class="col-lg-6">
               <h5><b>{{selectedTestObj.testtype}}</b></h5>
            </div>
            <div class="col-lg-6">
               <button type="button" v-if="testsubjectdetails.length!=0" class="btn btn-info resultsbutton pull-right" v-on:click.prevent="viewresults">ViewMarks</button>
            </div>
         </div>
      </div>
      <div  v-for="subject in testsubjectdetails">
         <div class="testdetails">
            <div class="col-lg-12  testsubjectdetails">
               <div class="col-lg-4 testsubjectdetailscolumn text-center">
                  <b>{{subject.subjectname}}</b>
               </div>
               <div class="col-lg-4 testsubjectdetailscolumn text-center">
                  <b>{{getsubjectdate(subject.subjecttestdate)}}</b>
               </div>
               <div class="col-lg-4">
                  <b>{{subject.maxmarks}}</b>
               </div>
            </div>
            <div class="row">
               <div class="col-lg-12">
                  <p>
                  <pre>{{subject.syllabus}}</pre>
                  </p>
               </div>
            </div>
            <div class="row">
              <div class="col-lg-11 text-right">
              <button class="btnAsLink" v-if="subject.worksheet1 != null&&subject.worksheet1['publish'] == 1" @click="gotoWorksheets(subject.worksheet1)">{{subject.worksheet1.worksheet_name}}</button>
              <button class="btn btn-primary" v-if="subject.worksheet1 != null&&subject.worksheet1['publish'] == 1" @click="startTest(subject.worksheet1)">Start Test</button>
              </div>
            </div>
         </div>
      </div>
   </div>
   <div class="col-lg-8" v-if="viewresultsdetails != 0 && viewresult==true">
      <h4>Results of a classroom in <b> {{selectedTestObj.testtype}} </b></h4>
      <br>
      <div class="divTable">
         <div class="divTableBody">
            <div class="divTableRow">
               <div class="divTableCell">Roll Number</div>
               <div class="divTableCell">Student Name</div>
               <div class="divTableCell" v-for="subject in viewresultsdetails.subjects">{{subject.subjectname}}</div>
               <div class="divTableCell">Results</div>
            </div>
            <div class="divTableRowdata" v-for="student in viewresultsdetails.resulttransfer">
               <div class="divTableCelldata">{{student.studentid}}</div>
               <div class="divTableCelldata">{{student.name}}</div>
               <div class="divTableCelldata" v-for="subject in viewresultsdetails.subjects">{{subject.marks}}</div>
               <div class="divTableCelldata">{{student.results}}</div>
            </div>
            <div class="divTableRowdata" v-if="viewresultsdetails.resulttransfer.length==0">
               <h3>Results Not Available yet!</h3>
            </div>
         </div>
      </div>
   </div>
</div>
</template>
<style scoped>
@import url("/assets/css/worksheet_styles.css");
</style>
<style>
.reset-padding {
  padding: 0;
}
.reset-margin {
  margin: 0;
}
.testdetails {
  border: 1px solid #eee;
  margin-bottom: 10px;
}
.newtestbutton {
  background-color: #039be5;
  background-image: none;
  border-color: #039be5;
  color: white;
  padding: 5px 30px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0px;
}
.newtestbutton:hover {
  color: white;
}
button {
  background-color: #039be5;
}
.btn {
  border-radius: 0px;
  color: #fff;
}
.btn:hover,
.btn:focus {
  color: #fff;
  text-decoration: none;
}

.testtype {
  background: #eee;
}
.testdetails {
  border: 1px solid #eee;
  margin-bottom: 10px;
}
.testsubjectdetails {
  background: #eee;
  height: 30px;
}
.testsubjectdetailscolumn {
  border-right: 1px solid #fff;
  height: 30px;
}
pre {
  display: block;
  padding: 9.5px;
  margin: 0 0 10px;
  font-size: 16px;
  line-height: 1.42857143;
  color: #333;
  word-break: break-all;
  word-wrap: break-word;
  background-color: transparent;
  border: none;
  border-radius: 0px;
}
.statusbutton {
  margin-bottom: 4px;
  border-radius: 3px;
}
</style>
<style scoped>
.divTable {
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
.divTableCell,
.divTableHead {
  border: 1px solid #eee;
  display: table-cell;
  padding: 3px 10px;
}
.divTableCelldata {
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
.resultsbutton {
  border-radius: 0px;
  height: 30px;
  width: 100px;
  text-align: center;
}
.btnAsLink {
  background: none;
  border: none;
  color: blue;
}
</style>


<script>
import moment from "moment";
import DatePicker from "vue2-datepicker";
import {mapMutations} from 'vuex';
import UserService from "../../../../services/userService.js";
import store from "../../../../store.js";
export default {
  components: { DatePicker },
  data() {
    return {
      testsubjectdetails: {},
      selectedTestObj: {},
      testsubjectdetailsedit: {
        edit: false
      },
      tenantId: this.$cookie.get("id"),
      academicYearObj: this.$store.state.acdemicyearandboard,
      requestheaders: {
        headers: {}
      },
      testdetails: [],
      testsubjectdetails: [],
      viewresultsdetails: [],
      viewresult: false,
      myChild: {},
      gradeType:'grade',
      subjectType:'subject',
      listOfGrades: [],
      listOfSubjects: [],
      academicDetails: {},
      userRole: this.$cookie.get('userrole'),
    };
  },
  created() {

      UserService.ClassroomGrades(this.academicDetails.syllabustype, this.tenantId).then((response) => {
            this.listOfGrades = response.data;
        });

      UserService.Subjects(this.tenantId).then((response) =>{
            this.listOfSubjects =response.data;
        });

        this.academicDetails = {
          academicyearid: this.academicYearObj.academicyearid,
          syllabustype: this.academicYearObj.syllabustype
        };

    this.userdetails = this.$store.state.userDetails;
    this.selectedTestObj = this.$store.state.selectedClassRoomTest;
    this.myChild = this.$store.state.myChild;
    this.geteachtestdetails();

    console.log(JSON.stringify(this.myChild));
  },
  methods: {

     ...mapMutations([
            'SET_SELETECTED_WORKSHEET'
        ]),

    getstartdate: function(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    getenddate: function(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    geteachtestdetails: function() {
      this.testsubjectdetailsedit.edit = false;
      var id = {
        id: this.selectedTestObj.id,
        studentid: this.myChild.id,
        classid: this.myChild.classid
      };
      UserService.SubjectDetailsOfATest(id, this.tenantId).then(response => {
        this.testsubjectdetails = response.data;
      });
    },
    getsubjectdate: function(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    adddatetosubject: function(subject) {
      this.testsubjectdetailsedit = {
        edit: true,
        subjectname: subject.subjectname
      };
      this.subjectdetails = subject;
     
      this.testsubjectdate = new Date();
      this.testsubjectdate.setTime(subject.subjecttestdate);
    },
    subjecttestdatereset: function() {
      this.testsubjectdetailsedit.edit = false;
    },
    subjecttestdate: function() {
      var subjectdetails = {
        id: this.subjectdetails.id,
        testid: this.subjectdetails.testid,
        subjectid: this.subjectdetails.subjectid,
        subjecttestdt: this.testsubjectdate.getTime()
      };
     
      UserService.SubjectTestEdit(subjectdetails, this.tenantId).then(
        response => {
          if (response.status == 200) {
            this.testsubjectdetailsedit.edit = false;
            var id = {
              id: this.selectedTestObj.id
            };
            UserService.SubjectDetailsOfATest(id, this.tenantId).then(
              response => {
                this.testsubjectdetails = response.data;
              }
            );
          }
        }
      );
    },
    setSelectedGradeSection: function() {
      let selectedClassRoomObj = {
        gradeId: this.grade,
        sectionId: this.section
      };
      this.$store.commit("SET_SELECTED_CLASSOBJ", selectedClassRoomObj);
    },
    getSelectedGradeSection: function() {
      let selectedClassRoomObj = this.$store.state.selectedClassRoomObj;
      if (selectedClassRoomObj != {}) {
        this.grade = selectedClassRoomObj.gradeId;
        this.grade = selectedClassRoomObj.gradeId;
      }
    },
    changestatusoftest: function(selectedTestObj) {
      var testidforstatus = {
        testid: selectedTestObj.id,
        id: selectedTestObj.gradeid
      };
     
      UserService.ChangeTestStatus(this.tenantId, testidforstatus).then(
        response => {
          this.geteachtestdetails(selectedTestObj);
        }
      );
    },
    viewresults: function() {
      var childClassDetails = {
        id: this.selectedTestObj.id,
        gradeid: this.myChild.gradeid,
        studentid: this.myChild.studentid,
        classid: this.myChild.classid,
        academicgradeid: this.myChild.academicgradeid
      };
      this.viewresult = true;
      UserService.ChildViewResults(this.tenantId, childClassDetails).then(
        response => {
          this.viewresultsdetails = response.data;
        }
      );
    },

    gotoWorksheets(worksheet){
  
    let worksheet1 = {
        id: worksheet.w_id,
        worksheetName: worksheet.worksheet_name,
        status: worksheet.statusid,
        worksheet_type:worksheet.worksheet_type,
        purpose:worksheet.purpose,
        description: worksheet.description,
        worksheet_path: 'temp',
        createdby:worksheet.createdby,
        publish:worksheet.publish,
        grade: this.getNameFromVal(worksheet.gradeid, this.listOfGrades,this.gradeType),
        subject: this.getNameFromVal(worksheet.subjectid, this.listOfSubjects,this.subjectType),
    }
     this.SET_SELETECTED_WORKSHEET(worksheet1);
    
     this.$router.push({
      path:'add-questions'
    })
    },

    startTest(worksheet){
      this.$store.commit("SET_PARENT_SEL_WORKSHEET",worksheet);
      console.log(JSON.stringify(worksheet));
      this.$router.push({
        path:`ws-test`
      });
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
                        return list[i].status;
                          }
                      } else if(type ==this.degreeType){
                        if (id == list[i].id) {
                          return list[i].degreeofdifficulty;
                        }
                      }
                }
            }
            return '';
        }
  },
};
</script>
