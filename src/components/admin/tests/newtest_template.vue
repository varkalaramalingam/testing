<template>
    <div>
        
        <div class="panel   createclasspanel col-lg-6 col-lg-offset-3" >
            <div class="panel-body">
   		        <form  class="form-horizontal" role="form" name="createtestform" >
                    <div class="col-md-12">
                        <div class="leftside-form">
                            <div class="row">
                                
                                <div class="col-md-12">
                                    <select class="form-control form-input" v-model="newtest.testtype">
                                        <option value=0> -- Select test type -- </option>
                                        <option v-for="testtype in testtypes">{{testtype.testtype}}</option>
                                    </select>
                                </div> 
                            </div><br>
                            <div class="row">
                                
                                <div class="col-md-12">
                                    <select class="form-control form-input" v-model="newtest.testmode">
                                        <option value=0> -- Select test mode -- </option>
                                        <option v-for="testmode in testmodes">{{testmode.testmode}}</option>
                                    </select>
                                </div>
                            </div><br>
                            <div class="row">
                                
                                <div class="col-md-12">
                                    <select v-model="newtest.presentyear" class="form-control form-input">
                                        <option value=0> -- Select academic year -- </option>
                                        <option v-for="academicyear in academicyears" 
                                          v-bind:value='academicyear.id' 
                                          :key='academicyear.id'
                                          v-show="academicyear.active"
                                        >
                                          {{academicyear.passingyear}}-{{academicyear.syllabustype}}
                                        </option>
                                    </select>
                                </div>
                            </div><br>
                            <div class="row">
                                
                                <div class="col-md-12">
                                    <select class="form-control form-input"  v-model="newtest.gradeId">
                                        <option value=0> -- Select grade -- </option>
                                        <option v-for="grade in gradesList" v-bind:value="grade.id" :key="grade.id" v-if="newtest.presentyear == grade.academicid">{{grade.gradename}}</option>
                                    </select>
                                </div>
                            </div><br>
                           <div class="row">
                                
                                <div class="col-md-12">
                                    <select v-model="newtest.teststatus" class="form-control form-input">
                                        <option value=0> -- Select status -- </option>
                                        <option v-for="status in status">{{status.status}}</option>
                                    </select>
                                </div>
                            </div><br>
                            <div class="row">
                                <div class="col-md-12">
                                    <date-picker placeholder="Please enter test start date" lang="en" v-model="newtest.startdate"></date-picker>
                                </div>
                            </div><br>
                            <div class="row">
                                <div class="col-md-12">
                                    <date-picker placeholder="Please enter test end date" lang="en" v-model="newtest.enddate"></date-picker>
                                </div>
                            </div><br>
                            <div class="row">
                               
                                <div class="col-md-12">
                                    <input type="text" class="form-control form-input" name="maximummarks" placeholder="maximum marks*" v-model="newtest.maxmarks" required>
                                </div>
                            </div><br>
                        </div>
                    </div>
                </form>
	        </div>
        </div>
    </div>
</template>
<script>
import DatePicker from "vue2-datepicker";
import UserService from "../../../services/userService.js";
export default {
  components: { DatePicker },
  props: ["school"],
  data() {
    return {
      tenantId: this.$cookie.get("id"),
      testtypes: [],
      testmodes: [],
      status: [],
      academicyears: [],
      newtest: {
        testtype: 0,
        testmode: 0,
        startdt: "",
        enddt: "",
        status: 0,
        academicyear: 0,
        maxmarks: "",
        presentyear: 0,
        teststatus: 0,
        gradeId: 0
      },
      userdetails: {},
      gradeid: {},
      academicYearObj: this.$store.state.acdemicyearandboard,
      academicDetails: {},
      gradesList: []
    };
  },
  created() {
    this.tenantId = this.$cookie.get("id");
    this.userdetails = this.$store.state.userDetails;
    this.gradeid = this.$store.state.gradeid;
    (this.academicDetails = {
      academicyearid: this.academicYearObj.academicyearid,
      syllabustype: this.academicYearObj.syllabustype
    }),
      this.getGradeList();
    UserService.TestTypes(this.tenantId).then(response => {
      console.log(response);
      this.testtypes = response.data;
    }),
      UserService.AcademicYears(this.tenantId).then(response => {
        this.academicyears = response.data.academics;
        console.log(response);
      }),
      UserService.Testmodes(this.tenantId).then(response => {
        console.log(response);
        this.testmodes = response.data;
      }),
      UserService.StatusOfTests(this.tenantId).then(response => {
        console.log(response);
        this.status = response.data;
      });
  },
  methods: {
    // newtests: function() {
    //   var createtest = {
    //     id: this.newtest.gradeId,
    //     testtype: this.newtest.testtype,
    //     testmode: this.newtest.testmode,
    //     startdt: this.newtest.startdate.getTime(),
    //     enddt: this.newtest.enddate.getTime(),
    //     status: this.newtest.teststatus,
    //     academicyear: this.newtest.presentyear,
    //     maxmarks: this.newtest.maxmarks
    //   };
    //   console.log(createtest);
    //   let thisVue = this;
    //   UserService.NewTest(createtest, this.tenantId).then(response => {
    //     console.log(response);
    //   });
    // },
    getGradeList: function() {
      UserService.Grades(
        this.academicDetails.syllabustype,
        this.tenantId
      ).then(response => {
        this.gradesList = response.data;
        if (this.gradesList.length > 0) {
          this.grade = this.gradesList[0].id;
        }
        console.log(JSON.stringify(response.data));
      });
    }
  }
};
</script>
