<template>
<div class="container-fluid">
    <div class="row">
                    <div class="col-md-3">
                        <div class="page-heading"><span v-html="$t('tests')"/></div>
                    </div>
                    <div class="col-md-9" style="margin-top: 10px;">
                       
                        <div class="pull-right">
                            <button class='common-button pull-right' v-on:click="popUp('worksheetPopUp',open);">New Test</button>
                        </div>
                        <div id="custom-search-input" class="pull-right">
                            <div class="input-group searchbar">
                                <input v-model='search' type="text" class="search-query form-control" placeholder="Search Test name">
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
    <div class="row studentstable reset-padding reset-margin ">
        <br><br>
        <div class="divTable">
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
                        <!-- <button class="btnAsLink" @click="eachTest(test)">{{test.testtype}}</button> -->
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
    </div>
    <br>
    <div>
        <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
        <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
    </div>
    <!-- new Test pop up start-->
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="worksheetPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h4>Test details</h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
                </div>
                <div class="modal-body" style="height:479px">
                    <new-test ref='newTestComponent'/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" id="submit" @click="saveNewTest" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- new Test pop up end-->

</div>





</template>
<style scoped>
.reset-padding {
  padding: 0;
}

.reset-margin {
  margin: 0;
}

.studentstable {
  width: 100%;
  padding-top: 1%;
}

.newWorksheet {
  background-color: #039be5;
  background-image: none;
  border-color: #039be5;
  color: white;
  padding: 5px 30px;
  margin-top: -2px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0px
}

.newstudent:hover {
  color: white;
}

.search-btn {
  background-color: #039be5;
}

.btn {
  border-radius: 0px;
  color: #fff
}

.gradeFilter{
  float:left;
  width:15%
}

.btn:hover,
.btn:focus {
  color: #fff;
  text-decoration: none;
}

.previousbutton,
.nextbutton,
.previousbutton:hover,
.nextbutton:hover {
  display: inline-block;
  padding: 5px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
  color: black
}

.popUpEle {
  width: 250px;
}

.btnAsLink {
  background: none;
  border: none;
  color: blue;
}

.worksheetDetails {
  margin: auto;
  width: 250px;
}

.showAlertDiv {
  margin-top: -42px;
  height: 42px;
  margin-left: 152px;
  width: 276px;
}

</style>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import UserService from '../../../services/userService.js';
import store from '../../../store.js'
import moment from 'moment'
import DatePicker from 'vue2-datepicker';
import NewTest from './newtest_template.vue'


export default {
    /* watch:{
        '$route'(to,from){
            this.school = this.$store.state.school;
            this.userdetails = this.$store.state.userDetails;
            this.listoftests = this.$store.state.listoftests;
            this.gradeid = this.$store.state.gradeid;
            this.testsubjectdetails = this.$store.state.testsubjectdetails;
            UserService.ListOfTests(this.gradeid,this.tenantId).then((response)=>{
                console.log(response);
                this.listoftests=response.data;
            })
        }
    }, */
    components:{
        NewTest
    },
    props:["listoftests"],
    data() {
        return {
            requestheaders:{
            headers:{
            }
        },
        testsubjectdetailsedit:{
                edit:false
        },
        subjectdetails:{},
        testsubjectdate:'',
        geteachtestdetail:{},
        selectedTest : false,
        // listoftests:[],
            open: 'show',
            close: 'hide',
            worksheetName: '',
            showAlert: false,
            gradeVal: '',
            sectionVal: '',
            subjectVal: '',
            alertClass: "",
            id: 0,
            pageNumber: 0,
            size: 10,
            search: '',
            tenantId: this.$cookie.get('id'),
            academicYearObj :this.$store.state.acdemicyearandboard,
            academicDetails: {},
            searchDifficaulty:0,
            searchSubjectId:0,
            searchGradeId:0,
            userDetails:this.$store.state.userDetails,
            gradesList:[],
            grade:'',
            newtest:{}
        }
    },
    created() {
        this.id = 2;
        this.school = this.$store.state.school;
        this.userdetails = this.$store.state.userDetails;
        // this.listoftests = this.$store.state.listoftests;
        // this.gradeid = this.$store.state.gradeid;
        this.testsubjectdetails = this.$store.state.testsubjectdetails;
        this.academicDetails= {
                academicyearid : this.academicYearObj.academicyearid,
                syllabustype : this.academicYearObj.syllabustype
            }
        // this.getGradeList();
        // this.getGradeTests();
    },
    methods: {
        getGradeTests : function(){
            this.gradeid = this.$store.state.gradeid;
            console.log(this.gradeid)
             UserService.ListOfTests(this.gradeid,this.tenantId).then((response)=>{
                console.log(response);
                this.listoftests=response.data;
            })
        },
        getstartdate:function(date){
            return moment(date).format('DD/MM/YYYY');
        },
        getenddate:function(date){
            return moment(date).format('DD/MM/YYYY')
        },
        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        saveNewTest:function(){
            this.newtest = this.$refs.newTestComponent.newtest
            var createtest = {
                id: this.newtest.gradeId,
                testtype: this.newtest.testtype,
                testmode: this.newtest.testmode,
                startdt: this.newtest.startdate.getTime(),
                enddt: this.newtest.enddate.getTime(),
                status: this.newtest.teststatus,
                academicyear: this.newtest.presentyear,
                maxmarks: this.newtest.maxmarks
            };
            console.log(createtest);
            let thisVue = this;
            UserService.NewTest(createtest, this.tenantId).then(response => {
                console.log(response);
                if(response.status == 200){
                    this.getGradeTests();
                }
            });
            this.popUp('worksheetPopUp',this.close);
        },

        eachTest: function(selectedTest) {
            console.log(selectedTest);
            this.selectedTest = selectedTest;
            this.$store.commit('SELECTED_TEST',selectedTest);
            this.$router.push({
                path: '/tests/test'
            })
        },
         
        
        validateFields: function() {
            if(this.checkEmptyVal(this.worksheetObj.worksheetName)) {
                return false;
            }else if (this.checkEmptyVal(this.worksheetObj.gradeVal)) {
                return false;
            }else if (this.checkEmptyVal(this.worksheetObj.subjectVal)) {
                return false;
            }else if (this.worksheetObj.statusVal != 0 && (this.worksheetObj.statusVal == '' || this.worksheetObj.statusVal == undefined)) {
                return false;
            }
            return true;
        },
        checkEmptyVal: function(val) {
            if (val == '' || val == null) {
                return true;
            }
            return false;
        },
        //Shows the alert message on homepage 
        setAlertMessage: function(type, addOrUpdate) {
            if (type == 'fail') {
                this.alertMessage = "You must enter all the data .....";
                this.alertClass = 'alert-danger';
            } else if (type == 'success') {
                this.alertMessage = "Successfully " + addOrUpdate + " worksheet .....";
                this.alertClass = 'alert-success';

            }
            this.showAlert = true;
            let thisVue = this;
            setTimeout(function() {
                thisVue.alertMessage = '';
                thisVue.alertClass = '';
                thisVue.showAlert = false;
                if (type == 'success') {
                    thisVue.popUp('worksheetPopUp', thisVue.close);
                }
            }, 1500);
        },


    },
    // updated(){
    //     // this.getGradeTests();
    // },
    computed: {
        pageCount() {
            let l = this.listoftests.length,
                s = this.size;
            return Math.ceil(l / s);
        },

        filterTests: function() {
            var self = this;
            return this.listoftests.filter(function(test) {
                let filterTestName;

                if(!self.search){
                    filterTestName = true;
                }else{
                    filterTestName = test.testtype.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
                }
                return filterTestName;
            });
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filterTests.slice(start, end);
        },
    }


}



</script>