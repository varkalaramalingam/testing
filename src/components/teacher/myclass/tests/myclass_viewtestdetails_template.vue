<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12" >
                <h3 class="student-head" style="text-align:center;color:green">{{selectedTestObj.testtype}}</h3>
                <h3 class="student-head" style="text-align:center;color:red">{{selectedTestObj.status}}</h3>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-6" style="text-align:right;">Grade :
            </div>
            <div class="col-sm-6">{{myclass.gradename}}</div>
        </div>
        <div class="row">
            <div class="col-sm-6" style="text-align:right;">Start date :
            </div>
            <div class="col-sm-6">{{getsubjectdate(selectedTestObj.startdate)}}</div>
        </div>
        <div class="row">
            <div class="col-sm-6" style="text-align:right;">End date :
            </div>
            <div class="col-sm-6">{{getsubjectdate(selectedTestObj.enddate)}}</div>
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
        <div class="col-lg-12" v-if="viewresult==false">
                <h1 v-if="testsubjectdetails.length==0">No details</h1>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="col-lg-6">
                            <h5><b>{{gettestdetails.testtype}}</b></h5>
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
                                 <div class="col-lg-10">
                                  <div class="text-right">
                                    <button class="btnAsLink" v-if="subject.worksheet1 != null" @click="gotoWorksheets(subject.worksheet1)">{{subject.worksheet1.worksheet_name}}</button>
                                    </div>
                                    </div>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12" v-if="viewresultsdetails != 0 && viewresult==true">
                <button type="button" class="btn btn-info pull-right"><b @click="viewtest">Back To Test</b></button>
                <h4>Results of a classroom in <b> {{gettestdetails.testtype}} </b></h4>
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
                            <div class="divTableCelldata" v-for="studentmarks in student.studentsubjectmarks">{{studentmarks.marks}}</div>
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
<style>
.reset-padding {
  padding: 0;
}
.reset-margin {
  margin: 0px;
}
.teststable {
  width: 100%;
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
import UserService from "../../../../services/userService.js";
import moment from "moment";
import {mapMutations} from 'vuex';
import store from "../../../../store.js";

export default {
  props: ["school", "userdetails"],
  data() {
    return {
      myclass: {},
      id: this.$cookie.get("id"),
      testdetails: [],
      testsubjectdetails: [],
      gettestdetails: {},
      viewresultsdetails: [],
      viewresult: false,
      selectedTestObj: this.$store.state.selectedTestObj,
      academicYearObj: this.$store.state.acdemicyearandboard,
      academicDetails: {},
      listOfGrades:[],
      listOfSubjects:[],
      gradeType:'grade',
      subjectType:'subject',

    };
  },
  created() {
    this.myclass = this.$store.state.myClass;
    this.geteachtestdetails();

     UserService.ClassroomGrades(this.academicDetails.syllabustype, this.id).then((response) => {
            this.listOfGrades = response.data;
        });

         UserService.Subjects(this.id).then((response) =>{
            this.listOfSubjects =response.data;
        });

  },
  methods: {
         
     ...mapMutations([
          'SET_SELETECTED_WORKSHEET'
         ]),

    getsubjectdate: function(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    viewtest: function(){
        this.viewresult = false;
    },
    geteachtestdetails: function() {
      this.viewresult = false;
      this.gettestdetails = this.selectedTestObj;
      console.log(this.selectedTestObj);
      var id = {
        id: this.selectedTestObj.id,
        classid: this.myclass.id
      };
      UserService.SubjectDetailsOfATest(id, this.id).then(response => {
        console.log(response);
        this.testsubjectdetails = response.data;
      });
    },
    viewresults: function() {
      var classroomdetails = {
        id: this.myclass.id,
        testtype: this.gettestdetails.testtype
      };
      this.viewresult = true;
      console.log(classroomdetails);
      UserService.ViewResults(this.id, classroomdetails).then(response => {
        this.viewresultsdetails = response.data;
        console.log(this.viewresultsdetails);
      });
    },

    gotoWorksheets(worksheet){
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
  }
};
</script>