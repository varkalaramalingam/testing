<template>
  <div class="container-fluid">
   <div class="row">
      <div class="page-layout">
         <div class="row">
            <div class="col-md-3">
               <div class="page-heading"><span v-html="$t('tests')"/></div>
            </div>
         </div>
         <hr>
         <div class="col-lg-12 reset-padding reset-margin">
         </div>
         <!-- <div>
            <label class="col-sm-1 control-label" style="width:8.3%">Child :</label>
            <select class="form-control gradeFilter" v-model="myChildId" @change="selectChild(myChild)" >
               <option v-for="child in childrens" v-bind:value="child.studentid">{{child.name}}</option>
            </select>
            <label class="col-sm-1 control-label" style="width:18% ; padding-left: 10px;">Grade : <span style="color:blue;padding-left: 10px">{{this.myChild.gradename}}</span></label>
            <label class="col-sm-1 control-label" style="width:15% ;">Section : <span style="color:blue;padding-left: 10px">{{this.myChild.sectionname}}</span></label>
            <label class="col-sm-1 control-label" style="width:20%">Class Teacher : <span style="color:blue;padding-left: 10px">{{this.myChild.teachername}}</span> </label>
            <label class="col-sm-1 control-label" style="width:20%">Board : <span style="color:blue;padding-left: 10px">{{this.myChild.syllabustype}}</span> </label>
         </div> -->
        
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
                    <a style="cursor:pointer" tag="button" @click="selectTest(test)">{{test.testtype}}</a>
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
      </div>
   </div>
</div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import store from '../../../../store.js';
import moment from 'moment'
export default {
    data() {
        return {
            subjectTeachers: [],
            studentsofgrade: [],
            addingstudenttosection: {
                admissionnumber: ''
            },
            tenantId: this.$cookie.get('id'),
            myClassDetails: this.$store.state.myClass,
            //children details
            acdemicyearandboard: this.$store.state.acdemicyearandboard,
            academicDetails: {},
            school: {},
            userdetails: {},
            pageNumber: 0,
            size: 10,
            search: '',
            listoftests: [],
            userid: this.$cookie.get('userid'),
            childrens: [],
            myChild: {},
            //children details end  
            testdetails: [],
            myChildId: 0


        }
    },
    created() {
        this.tenantId = this.$cookie.get('id');
        this.school = this.$store.state.school;
        this.userdetails = this.$store.state.userDetails;
        this.gradeid = {
            id: this.grade,
            academicyear: this.$store.state.acdemicyearandboard.academicyearid
        }
        this.academicDetails = {
            academicyearid: this.acdemicyearandboard.academicyearid,
            syllabustype: this.acdemicyearandboard.syllabustype
        }
        this.myChild = this.$store.state.myChild;
        console.log(this.myChild)
        this.myChildId = this.myChild && this.myChild.studentid;
        console.log(this.$store.state.userDetails.userrole)
        if(this.$store.state.userDetails.userrole == "PARENT"){
        //children
        const parentid = {
            "id": this.userid
        }
        UserService.MyChild(this.tenantId, parentid).then((response) => {
            console.log(JSON.stringify(response.data));
            this.childrens = response.data;
            if (this.childrens.length > 0) {
                if (!this.myChild|| !this.myChild.studentid) {
                    this.myChild = this.childrens[0];
                    this.myChildId = this.myChild.studentid;
                }
                this.$store.commit('SET_MY_CHILD', this.myChild);
                this.getMyChildTests();
            }
        });
        }
        else if(this.$store.state.userDetails.userrole == "STUDENT"){
            console.log(this.myChild)
            if (!this.myChild|| !this.myChild.studentid) {
                var studentid = {
                    "id": this.$cookie.get('userid')
                }
                UserService.MyChildforstudentlogin(this.tenantId, studentid).then((response) => {
                    console.log(JSON.stringify(response.data));
                    this.myChild = response.data;
                    this.$store.commit('SET_MY_CHILD', this.myChild);
                    if(response.status == 200){
                        this.getMyChildTests();
                    }
                })
            }
            else{
                this.getMyChildTests();
            }
        }
        //children end
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

        getstartdate: function(date) {
            return moment(date).format('DD/MM/YYYY');
        },
        getenddate: function(date) {
            return moment(date).format('DD/MM/YYYY')
        },

        // This method will be called when the child is selected
        // selectChild: function(myChild) {
        //     let length = this.childrens.length;
        //     for(let i=0;i<length;i++){
        //         if(this.myChildId == this.childrens[i].studentid){
        //             this.myChild = this.childrens[i];
        //             break;
        //         }
        //     }
        //     this.$store.commit('SET_MY_CHILD', this.myChild);
        //     this.getMyChildTests();
        // },
        //End

        getMyChildTests: function() {
            var studentid = {
                "id": this.myChild.gradeid,
                "classid": this.myChild.classid
            }
            console.log(this.$store.state.myChild)
            UserService.ChildTests(this.tenantId, studentid).then((response) => {
                console.log(response);
                this.testdetails = response.data
                this.myChild['testCreateId'] = this.testdetails[0] && this.testdetails[0].id;
            })
        },
        selectTest: function(selectedTest) {
            console.log(selectedTest);
            this.selectedTest = selectedTest;
            this.$store.commit('SELECTED_CLASSROOM_TEST', selectedTest);
            this.$store.commit('SET_MY_CHILD', this.myChild);
            this.$router.push({
                path: '/my-children/test'
            })
        }
    },
    computed: {
        pageCount() {
            let l = this.testdetails.length,
                s = this.size;
            return Math.ceil(l / s);
        },

        filteTests: function() {
            var self = this;
            return this.testdetails.filter(function(student) {
                return true;
            });
        },
        paginatedData() {
            if (!this.testdetails || this.testdetails.length == 0) {
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