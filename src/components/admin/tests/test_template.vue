<template>
    <div>
       <div class="row">
         <div class="col-sm-6" >
              <h3 class="student-head" style="text-align:right;">{{selectedTestObj.testtype}}</h3>
         </div>
         <div class="col-sm-6" >
             <button style="text-align:left;margin-top: 15px;" :disabled="testsubjectdetails[0].status === 'CLOSED'" v-if="testsubjectdetails.length!=0" v-on:click.prevent="changestatusoftest(selectedTestObj)" class="btn btn-info statusbutton">{{testsubjectdetails[0].status}}</button></div>
      </div>
      <hr>
      <div class="row">
         <div class="col-sm-6" style="text-align:right;">Grade :
         </div>
         <div class="col-sm-6">{{ gradename }}</div>
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
      </div></div>
      <hr>
      <div class="col-lg-12">
                <h1 v-if="testsubjectdetails.length==0">No details</h1>
                <div class="" v-for="test in testsubjectdetails" :key="test.id">
                    <div class="col-lg-12 testdetails">
                        <div class="row testsubjectdetails">
                            
                            <div class="col-lg-4 testsubjectdetailscolumn text-center">
                                <b>{{test.subjectname}}</b>
                            </div>
                            <div class="col-lg-4 testsubjectdetailscolumn text-center">
                                <b>{{getsubjectdate(test.subjecttestdate)}}</b>
                            </div>
                            <div class="col-lg-4">
                            <b>{{test.maxmarks}}</b>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <p><pre>{{test.syllabus}}</pre></p>
                            </div>
                            <div class="col-lg-6 col-lg-offset-3 dateform" v-if='testsubjectdetailsedit.subjectname==test.subjectname && testsubjectdetailsedit.edit==true'>
                                <div class="col-lg-12">
                                    <form name="addtestsubjectdetailmodal">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Subject Date</label>
                                            </div>
                                            <div class="col-md-8">
                                                <date-picker lang="en" class="vdp-datepicker" :disabledDates="disabledDates" v-model="testsubjectdate"></date-picker>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-lg-6 col-lg-offset-3 text-center">
                                                <button id="btn-Register"  name="reset"  class="btn btn-info button" v-on:click.prevent="subjecttestdatereset"  >Reset</button>
                                                <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="subjecttestdate" class="btn btn-info button">Add</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div  v-if="test.sectionname != null">
                          <span class="col-lg-2 testsubjectdetailscolumn text-left">{{gradename}}-{{test.sectionname}}</span>
                          <span class="col-lg-2 testsubjectdetailscolumn pull-left">{{test.subjectname}}</span>
                          <span class="col-lg-2 testsubjectdetailscolumn pull-left">{{test.syllabus}}</span>
                          <span>{{getsubjectdate(test.subjecttestdate)}}</span>
                        </div>
                        <div class="col-lg-12">
                            <div class="col-lg-2 pull-right">
                                <i v-if="test.status =='DRAFT' || test.status =='ACTIVE'" class="fa fa-pencil-square-o fa-1x pull-left" aria-hidden="true"  v-on:click.prevent="adddatetosubject(test)"></i>
                               <!--{{test.publish}}-->
                                <div class="row">
                                   <div class="col">
                                    <button type="button" class="btn btn-info" v-if="test.publish==0" @click="publishWorksheet(test,test.worksheet1)">publish</button>
                                    <span v-else><b>{{getStatus(test.publish)}}</b></span>
                                    <button class="btnAsLink" v-if="test.worksheet1 != null" @click="gotoWorksheets(test.worksheet1)">{{test.worksheet1["worksheet_name"]}}</button>
                                  </div>
                                </div>
                                  <!--<div class="row">
                                   <div class="col-sm-6"><button class="btnAsLink" @click="gotoWorksheets(test.worksheet1)">Link</button></div>
                                  </div>-->
                            </div>
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

.btnAsLink {
  background: none;
  border: none;
  color: blue;
}

</style>


<script>
import moment from "moment";
import DatePicker from "vuejs-datepicker";
import {mapMutations} from 'vuex';
import UserService from "../../../services/userService.js";
import _ from 'lodash';
import store from "../../../store.js";
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
      userName:this.$cookie.get('username'),
      academicYearObj: this.$store.state.acdemicyearandboard,
      academicDetails: {},
      gradeType:'grade',
      subjectType:'subject',
      listOfGrades: [],
      listOfSubjects: [],
      gradesList: [],
      classroomStudents:[],
      gradename: "",
      assignedWorksheet:{},
      disabledDates: {
          to: new Date(Date.now() - 8640000)
        },
    };
  },
  created() {
    // this.testsubjectdetails =
      UserService.ClassroomGrades(this.academicDetails.syllabustype, this.tenantId).then((response) => {
            this.listOfGrades = response.data;
        });

        UserService.Subjects(this.tenantId).then((response) =>{
            this.listOfSubjects =response.data;
        });

    this.userdetails = this.$store.state.userDetails;
    this.selectedTestObj = this.$store.state.selectedTestObj;
    this.academicDetails = {
      academicyearid: this.academicYearObj.academicyearid,
      syllabustype: this.academicYearObj.syllabustype
    };
  
    this.geteachtestdetails();
    this.getGradeList();
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
      console.log(JSON.stringify(this.selectedTestObj));
      this.testsubjectdetailsedit.edit = false;
      var id = {
        id: this.selectedTestObj.id
      };
      let testsubjectdetails1 = [];
      this.testsubjectdetails = [];
      UserService.SubjectDetailsOfATest(id, this.tenantId).then(response => {
        console.log(JSON.stringify(response.data));
        testsubjectdetails1 = response.data;
        for(let obj of testsubjectdetails1){
             if(obj.online_exam_id == null){
               obj.publish = -1;
               this.testsubjectdetails.push(obj);
             }else{
             UserService.getPublishStatus(this.tenantId,obj.online_exam_id).then(response=>{
               obj.publish = response.data;
               this.testsubjectdetails.push(obj);
              })
             }
        }
       

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
      console.log(subject);
      // this.testsubjectdate=new Date();
      if (subject.subjecttestdate != null) {
        this.testsubjectdate = moment(subject.subjecttestdate);
      } else {
        this.testsubjectdate = new Date();
      }
    },
    subjecttestdatereset: function() {
      this.testsubjectdetailsedit.edit = false;
    },
    subjecttestdate: function() {
      var subjectdetails = {
       // id: this.subjectdetails.id,
        id: null,
        testid: this.subjectdetails.testid,
        subjectid: this.subjectdetails.subjectid,
        subjecttestdt: this.testsubjectdate.getTime()
      };
      console.log(subjectdetails);
      UserService.SubjectTestEdit(subjectdetails, this.tenantId).then(
        response => {
          console.log(response);
          if (response.status == 200) {
            this.testsubjectdetailsedit.edit = false;
            var id = {
              id: this.selectedTestObj.id
            };
            UserService.SubjectDetailsOfATest(id, this.tenantId).then(
              response => {
                console.log(response);
                this.testsubjectdetails = response.data;
              }
            );
          }
        }
      );
    },
    changestatusoftest: function(selectedTestObj) {
      var testidforstatus = {
        testid: selectedTestObj.id,
        id: selectedTestObj.gradeid
      };
      console.log(testidforstatus);
      UserService.ChangeTestStatus(this.tenantId, testidforstatus).then(
        response => {
          console.log(response.data);
          this.geteachtestdetails(selectedTestObj);
        }
      );
    },
    getGradeList: function() {
      UserService.ClassroomGrades(
        this.academicDetails.syllabustype,
        this.tenantId
      ).then(response => {
        this.gradesList = response.data;
        // if(this.gradesList.length > 0){
        //     this.grade = this.gradesList[0].id;
        // }
        for (var i = 0; i < this.gradesList.length; i++) {
          console.log(this.gradesList.length);
          console.log(
            this.gradesList[i].gradenumber,
            this.selectedTestObj.gradeid
          );
          if (this.gradesList[i].id == this.selectedTestObj.gradeid) {
            this.gradename = this.gradesList[i].gradename;
            break;
          }
        }
        console.log(JSON.stringify(response.data));
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
        },

    publishWorksheet: function(test,worksheet){
      let publish = 1;
      let obj = {}
      obj.testid = test.testid;
      obj.online_exam_id = test.online_exam_id;
      obj.subjectid = test.subjectid;

      if(this.assignedWorksheet !== null){
      this.$confirm("Are you sure want to publish the worksheet?",'Publish','question').then(()=>{
        UserService.publishExam(obj, this.tenantId).then((response) => {
            UserService.updatePublishStatus(this.tenantId,test.online_exam_id,publish).then((response)=>{
                this.geteachtestdetails();
                alert("Successfully published...");
              })
          })
      })
      }else{
         alert("Worksheet id is null");
      }
    },

    getStatus: function(publish){
      if(publish == -1){
        return "Not Associated"
      }else{
        if(publish == 1)
        return "Published";
      }
    },

    gotoWorksheets: function(worksheet) {
      let worksheet1 = {
        id: worksheet.w_id,
        worksheetName: worksheet.worksheet_name,
        status: worksheet.status_id,
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

    getStudentsOfGrade: function(classroomid,gradeid){
      let obj = {
        classroomid :classroomid,
        gradeid : gradeid
      }
      UserService.SectionDetails(obj,this.tenantId).then((response)=>{
       this.classroomStudents= response.data.studentsOfClassRoom;
      })
    },

  }
};
</script>
