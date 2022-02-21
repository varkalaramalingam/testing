<template>
    <div class="container-fluid">
      <div class="row reset-padding reset-margin">
            <div class="col-lg-12 text-left">
                <h3 class="student-head"><span v-html="$t('tests')"/></h3>
                 <hr>
            </div>
        </div>
        
            <!-- <div class="col-lg-4 reset-margin">
                <div class="" v-for="test in testdetails" >
                    <div class="col-lg-8 col-lg-offset-2 testdetails" v-on:click.prevent="geteachtestdetails(test)">
                        <div class="row testtype text-center">
                            <h5><b>{{test.testtype}}</b></h5>
                        </div>


                        <h5><b>Start Date:</b>{{getstartdate(test.startdate)}}</h5>
                        <h5><b>End Date:</b>{{getenddate(test.enddate)}}</h5>
                        <h5><b>Total Marks:</b>{{test.maxmarks}}</h5>

                    </div>
                </div>
            </div> -->
        <div class="col-lg-12 teststable reset-padding reset-margin ">
          <div class="divTable">
            <div class="divTableBody">
                <div class="divTableRow">
                    <div class="divTableCell">Test ID</div>
                    <div class="divTableCell">Test Name</div>
                    <div class="divTableCell">Start Date</div>
                    <div class="divTableCell">End Date</div>
                    <div class="divTableCell">Test Mode</div>
                    <div class="divTableCell">Status</div>
                    <div class="divTableCell">Total Marks</div>
                </div>
                <div class="divTableRowdata" v-for="test in testdetails" :key="test.id">
                  <div class="divTableCelldata">{{test.id}}</div>
                    <div class="divTableCelldata" >
                      <router-link :to="{path:'/myclass/'+myclass.passingyear+'-'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/viewtestdetails'}" 
                      v-on:click.native="geteachtestdetails(test)">{{test.testtype}}</router-link> 
                     </div>
                    <div class="divTableCelldata">{{getstartdate(test.startdate)}}</div>
                    <div class="divTableCelldata">{{getenddate(test.enddate)}}</div>
                    <div class="divTableCelldata">{{test.testmode}}</div>
                    <div class="divTableCelldata">{{test.status}}</div>
                    <div class="divTableCelldata">{{test.maxmarks}}</div>
                </div>
            </div>
          </div>
        </div>


            <!-- <div class="col-lg-8" v-if="viewresult==false">
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
                                <p><pre>{{subject.syllabus}}</pre></p>
                            </div>
                    </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-8" v-if="viewresultsdetails != 0 && viewresult==true">
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
            </div> -->
        
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
</style>
<script>
import UserService from "../../../../services/userService.js";
import moment from "moment";
import store from "../../../../store.js";

export default {
  props: ["school", "userdetails"],
  data() {
    return {
      acdemicyearandboard: {},
      myclass: {},
      gradeandacademicyearid: {},
      id: this.$cookie.get("id"),
      testdetails: [],
      // testsubjectdetails: [],
      // gettestdetails: {},
      // viewresultsdetails: [],
      // viewresult: false
    };
  },
  created() {
    this.acdemicyearandboard = this.$store.state.acdemicyearandboard;
    this.myclass = this.$store.state.myClass;
    this.gradeandacademicyearid = {
      id: this.myclass.gradeid,
      // academicyear: this.acdemicyearandboard.academicyearid
      academicyear: this.myclass.academicid
    };
    UserService.TestDetailsOfSection(this.gradeandacademicyearid, this.id).then(
      response => {
        console.log(response);
        this.testdetails = response.data;
      }
    );
  },
  methods: {
    // getsubjectdate: function(date) {
    //   return moment(date).format("DD/MM/YYYY");
    // },
    getstartdate: function(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    getenddate: function(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    geteachtestdetails: function(test) {
      this.$store.commit('SELECTED_TEST',test);
      // this.viewresult = false;
      // this.gettestdetails = test;
      console.log(test);
      // var id = {
      //   id: test.id
      // };
      // UserService.SubjectDetailsOfATest(id, this.id).then(response => {
      //   console.log(response);
      //   this.testsubjectdetails = response.data;
      // });
    },
    // viewresults: function() {
    //   var classroomdetails = {
    //     id: this.myclass.id,
    //     testtype: this.gettestdetails.testtype
    //   };
    //   this.viewresult = true;
    //   console.log(classroomdetails);
    //   UserService.ViewResults(this.id, classroomdetails).then(response => {
    //     this.viewresultsdetails = response.data;
    //     console.log(this.viewresultsdetails);
    //   });
    // }
  }
};
</script>
