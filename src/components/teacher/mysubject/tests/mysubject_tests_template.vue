<template>
      <div>
          <div class="row reset-padding reset-margin">
                <div class="col-lg-12 text-left">
                    <h3 class="student-head">Tests</h3>
                    <hr>
                </div>
            </div>
            <!-- <div class="col-lg-4">
            <div class="" v-for="test in testdetails" >
                <div class="col-lg-8 col-lg-offset-2 testdetails" v-on:click.prevent="geteachtestdetails(test)">
                    <div class="row testtype text-center">
                        <h5><b>{{test.testtype}}</b></h5>
                    </div>


                    <h5><b>Start Date:</b>{{getsubjectdate(test.startdate)}}</h5>
                    <h5><b>End Date:</b>{{getsubjectdate(test.enddate)}}</h5>
                    <h5><b>Total Marks:</b>{{test.maxmarks}}</h5>
                    <h5><b>Current Status:</b>{{test.status}}</h5>

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
                        <div class="divTableRowdata" v-for="test in testdetails" :key="test.id" >
                            <div class="divTableCelldata">{{test.id}}</div>
                            <div class="divTableCelldata" >
                            <router-link :to="{path:'/mysubjects/'+mysubject.gradenumber+mysubject.sectionname+'-'+mysubject.subjectname+'-'+mysubject.syllabustype+'/mysubjectviewtestdetails'}" 
                            v-on:click.native="geteachtestdetails(test)">{{test.testtype}}</router-link> 
                            </div>
                            <!-- <div class="col-lg-8 col-lg-offset-2 testdetails" v-on:click.prevent="geteachtestdetails(test)">
                                <div class="row testtype text-center">
                                    <h5><b>{{test.testtype}}</b></h5>
                                </div>
                                <h5><b>Start Date:</b>{{getsubjectdate(test.startdate)}}</h5>
                                <h5><b>End Date:</b>{{getsubjectdate(test.enddate)}}</h5>
                                <h5><b>Total Marks:</b>{{test.maxmarks}}</h5>
                                <h5><b>Current Status:</b>{{test.status}}</h5>
                            </div> -->
                            <div class="divTableCelldata">{{getsubjectdate(test.startdate)}}</div>
                            <div class="divTableCelldata">{{getsubjectdate(test.enddate)}}</div>
                            <div class="divTableCelldata">{{test.testmode}}</div>
                            <div class="divTableCelldata">{{test.status}}</div>
                            <div class="divTableCelldata">{{test.maxmarks}}</div>
                        </div>
                    </div>
                </div>
            </div>

        <!-- <div class="col-lg-12 teststable reset-padding reset-margin ">
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
                      <router-link :to="{path:'/myclass/'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/viewtestdetails'}" 
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
        </div> -->

        <!-- <div class="col-lg-8" v-if="subjectanddate==true">
        <h1 v-if="subjectanddate==false">No Details</h1>
     
              <div class="row">
                <div class="col-lg-12">
                    <div class="col-lg-4">
                          <h5><b>{{subjectdetails.testtype}}</b></h5>
                    </div>
                    <div class="col-lg-4" v-if="subjectdetails.status=='DRAFT' || subjectdetails.status=='ACTIVE' || subjectdetails.status=='DONE'">
                       <button class="btn btn-info marksbutton pull-right" v-on:click.prevent="testdetailsforaddmarks(subjectdetails)">Add Marks</button>
                    </div>
                    <div class="col-lg-4" v-if="subjectdetails.status=='DRAFT' || subjectdetails.status=='ACTIVE'">
                        <button class="btn btn-info syllabusbutton"  v-on:click.prevent="editsyllabusandmaxmarks(subjectdetails)">Edit Syllabus</button>
                    </div>
                </div>
            </div>
            <br>
            <div class="testsubjectdetails" >
                <div class="col-lg-12 testdetails">
                          <div class="col-lg-4 testsubjectdetailscolumn text-center">
                            <b>{{mysubject.subjectname}}</b>
                        </div>
                        <div class="col-lg-4 testsubjectdetailscolumn text-center">
                            <b>{{getsubjectdate(subjectdetails.subjecttestdate)}}</b>
                        </div>
                        <div class="col-lg-4">
                        <b>{{subjectdetails.maxmarks}}</b>
                        </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <p><pre>{{subjectdetails.syllabus}}</pre></p>
                        </div>
                        <div v-if='testsubjectdetailsedit.testtype==subjectdetails.testtype && testsubjectdetailsedit.edit==true'>
                            <div class="col-lg-12">
                                <form name="addtestsubjectdetailmodal">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <label> MaxMarks</label>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" class="form-control form-input" name="maxmarksforsubject" placeholder="maximum marks*" v-model="subjectdetails.maxmarks"   required>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <label>Syllabus</label>
                                        </div>
                                        <div class="col-md-8">
                                            <textarea name="description" class="form-control" rows="7" cols="50" placeholder="description......*" id="message" v-model="subjectdetails.syllabus" required></textarea>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-lg-6 col-lg-offset-3 text-center">
                                            <button id="btn-Register"   class="btn btn-info button" v-on:click.prevent="cancelsubjecttest">Cancel</button>
                                        
                                            <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="subjecttest" class="btn btn-info button">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-lg-12" v-if="addmarks==true">
                            <div class="divTable">
                                <div class="divTableBody">
                                    <div class="divTableRow">
                                        <div class="divTableCell">Student Id </div>
                                        <div class="divTableCell">Student Name</div>
                                        <div class="divTableCell">Maximum Marks</div>
                                        <div class="divTableCell">Obtained Marks</div>
                                    </div>
                                    <div class="divTableRowdata" v-for="student in studentandmarksdata">
                                        <div class="divTableCelldata">{{student.studentid}}</div>
                                        <div class="divTableCelldata">{{student.name}}</div>
                                        <div class="divTableCelldata">{{student.maxmarks}}</div>
                                        <div class="divTableCelldata"><input type="text" v-model="student.marks" /></div>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" type="reset" class="btn button"> Reset</button>
                                    <button id="btn-submit" type="submit" name="submit" v-on:click.prevent="submitmarks" class="btn button" ng-disabled="creategradeform.$invalid">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div> -->
         <!-- confirmation pop up start  -->
        <!-- <div class="modal fade" id="alertPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top:80px">
            <div class="modal-dialog" style="width:472px">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4>{{alertType}}</h4>
                    </div>
                    <div class="modal-body" style="height:75px;">
                        {{alertMessage}}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
                    </div>
                </div>
            </div>
        </div> -->
        <!-- confirmation pop up end  -->
    </div>
</template>
<style>
/* .testtype{
    background:#eee
}
.testdetails{
    border:1px solid #eee;
    margin-bottom: 10px;
}
.testsubjectdetails{
    background:#eee;
    height:30px;
}
.testsubjectdetailscolumn{
    border-right:1px solid #fff;
    height:30px
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
    background-color:transparent; 
     border: none;
     border-radius:0px;
} */
.divTable{
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
.divTableCell, .divTableHead {
border: 1px solid #eee;
display: table-cell;
padding: 3px 10px;
}
.divTableCelldata{
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
/* .marksbutton,.syllabusbutton{
    border-radius: 0px;
    height: 30px;
    width: 100px;
    text-align: center;
} */


</style>
    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import moment from 'moment'
import DatePicker from 'vue2-datepicker';
export default{
    components: { DatePicker },
    props:['mysubject','school','userdetails','acdemicyearandboard'],
    data(){
        return{
            testdetails:[],
            // testsubjectdetails:{},
            // testsubjectdetailsedit:{
            //     edit:false
            // },
            // subjectdetails:{},
            // subjectanddate:false,
            // addmarks:false,
            // setsubjectdate:'',
            // alertMessage: "",
            // alertType:"",
            // open: 'show',
            // close: 'hide',
            // testdetailstoaddmarks:{},
            // studentandmarksdata:{},
            id:this.$cookie.get('id')
        }
    },
    created(){
        UserService.SubjectTests(this.mysubject,this.id).then((response)=>{
            console.log(response);
            this.testdetails=response.data
            // this.testsubjectdetailsedit.edit==false
        })
    },
    methods:{
        // popUp: function(id, action) {
        //     $('#' + id).modal(action);
        // },
        getsubjectdate:function(date){
            return moment(date).format('DD/MM/YYYY');
        },
        // editsyllabusandmaxmarks:function(subjectdetails){
        //     console.log(subjectdetails)
        //       this.testsubjectdetailsedit={
        //         edit:true,
        //         testtype:subjectdetails.testtype
        //     }
        //     this.addmarks=false
        //     var testid={
        //         id:subjectdetails.id
        //     }
        //     this.setsubjectdate=new Date();
        //     this.setsubjectdate.setTime(subjectdetails.subjecttestdate);
        // },
        geteachtestdetails:function(test){
            this.$store.commit('SELECTED_TEST',test);
            console.log(JSON.stringify(test));
        //    this.subjectanddate=true
        //     this.subjectdetails=test
        //     this.testsubjectdetailsedit.edit=false
        //     this.addmarks=false
        //     var testdetails={
        //         "id":this.mysubject.id,
        //         "testtype":test.testtype,
        //         "subjectname":this.mysubject.subjectname
        //     }
        //     console.log(testdetails);
        //     UserService.EnterMarks(testdetails,this.id).then((response)=>{
        //         console.log(response);
        //         this.studentandmarksdata=response.data
        //     }).catch((response)=>{
        //         console.log(response.response.data);
        //     })
      
        },
        // subjecttest(){
        //     var subjectdetailstoedit={
        //         "id":this.subjectdetails.id,
        //         "subjectid":this.subjectdetails.subjectid,
        //         "maxmarks":this.subjectdetails.maxmarks,
        //         "syllabus":this.subjectdetails.syllabus,
        //         "subjecttestdt":this.setsubjectdate.getTime(),
        //         "testid":this.subjectdetails.testid
        //     }
        //     console.log(subjectdetailstoedit)
        //     UserService.SubjectTestEdit(subjectdetailstoedit,this.id).then((response)=>{
        //         console.log(response);
        //         if(response.status==200){
        //             this.testsubjectdetailsedit.edit=false
        //         }
        //     })
        // },
        // cancelsubjecttest:function(){
        //     this.testsubjectdetailsedit.edit=false
        // },
        // testdetailsforaddmarks:function(test){
        //     this.addmarks=true
        //      this.testsubjectdetailsedit.edit=false

        // },
        // submitmarks:function(){
        //     console.log(this.studentandmarksdata);
        //      let statusValue = 1;
        //     for(let i=0;i<this.studentandmarksdata.length;i++){
        //          if(this.studentandmarksdata[i].maxmarks<this.studentandmarksdata[i].marks){
        //             this.alertMessage = "Your total marks are greater than maximum marks, please check once";
        //             this.alertType = 'Failed';
        //             statusValue = 0;
        //             this.popUp('alertPopUp',this.open);
        //         }
        //     }
        //      if(statusValue == 1){
        //       UserService.AddMarks(this.studentandmarksdata,this.id).then((response)=>{
        //             if(response.status==201){
        //                 this.addmarks=false
        //             }
        //         })
        //      }
        // }
  
      

    }
}
</script>
