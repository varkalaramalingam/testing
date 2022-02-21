<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12" >
                <h4 class="student-head" style="text-align:center;color:green">{{selectedTestObj.testtype}}</h4>
                <h4 class="student-head" style="text-align:center;color:Red">{{selectedTestObj.status}}</h4>
            </div>
        </div>
        <hr>
        <div class="row">
            <div class="col-sm-6" style="text-align:right;">Grade :
            </div>
            <div class="col-sm-6">{{mysubject.gradename}}</div>
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
            <div class="col-sm-6">{{unittestMaxmarks}}</div>
        </div>
        <div class="container">
            <br>
            <div class="col-lg-12 text-left">
            </div>
        </div>
        <hr>
        <div class="col-lg-8" v-if="subjectanddate==true">
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
                        <b>{{subjectmarks}}</b>
                        <button type="button" class="btn btn-primary btn-sm" v-if="selectedTestObj.worksheet1 == null&&(selectedTestObj.status=='DRAFT'||selectedTestObj.status=='ACTIVE')" style="margin-left:30px;" @click="popUp('worksheetAsscPopUp',open)">Associate</button>
                        <!--<button class="btnAsLink" style="margin-left:60px;" v-if="selectedTestObj.worksheet1 != null" @click="gotoWorksheets(selectedTestObj.worksheet1)">{{selectedTestObj.worksheet1.worksheet_name}}</button>
                        <span v-else>Not Assigned</span>-->
                        </div>
                        <div class="pull-right">
                            <button class="btnAsLink" style="margin-left:60px;" v-if="selectedTestObj.worksheet1 != null" @click="gotoWorksheets(selectedTestObj.worksheet1)">{{selectedTestObj.worksheet1.worksheet_name}}</button>
                            <span v-else>Not Assigned</span>
                            <span v-if="selectedTestObj.worksheet1 != null">{{selectedTestObj.worksheet1.createdby}}</span>
                           <!--<button class="btnAsLink" @click="gotoWorksheets(selectedTestObj.worksheet1)">Link</button>-->
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
                                        <input type="checkbox" id="editSection" v-model="uncheck" @click="onEditChecked(false)"/><label for="editSection"> Is it same for all sections</label><br>
                                        <input type="checkbox" id="onEdit" v-model="editChecked" @click="onEditChecked(true)"><label for="onEdit">Is it not same</label>
                                        <div v-show="editChecked">
                                            <select v-model="editClassroom">
                                                <option>--Select classroom--</option>
                                                <option v-for="classroom in classrooms" v-bind:value="classroom">{{classroom.gradename+"-"+classroom.sectionname}}</option>
                                            </select>
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
                                    <button id="btn-reset" type="reset" class="btn btn-info"> Reset</button>
                                    <button id="btn-submit" type="submit" name="submit" v-on:click.prevent="submitmarks" class="btn btn-info" ng-disabled="creategradeform.$invalid">Submit</button>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            <!--Table start here -->
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                          <div class="divTableCell">ID</div>
                          <div class="divTableCell">Worksheet Name</div>
                          <div class="divTableCell">Action</div>
                    </div>
                    <div class="divTableRowdata" v-for="testWorksheet in listOfTestWorksheets">
                        <!-- data here -->
                       <div class="divTableCelldata">{{testWorksheet.w_id}}</div>
                       <div class="divTableCelldata">{{testWorksheet.worksheet_name}}</div>
                       <div class="divTableCelldata">
                           <button class="btn btn-success btn-sm" @click="gotoEvaluation(testWorksheet)">Evaluate</button>
                       </div>
                    </div>
                </div>
            </div>
            <!--Table ends here-->
        </div>
         <!-- confirmation pop up start  -->
        <div class="modal fade" id="alertPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top:80px">
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
        </div>
        <!-- confirmation pop up end  -->
        <!-- Associate worksheet pop up start -->
        <div class="modal fade" data-keyboard="false" data-backdrop="static" id="worksheetAsscPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
             <div class="modal-dialog">
                 <div class="modal-content">
                     <div class="modal-header">
                    <div>
                        <h4>Associate</h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
                </div>
                 <div class="modal-body">
                     <div class= "associateDetails">
                          <input type="checkbox" id="section" v-model="checked" @click="onClick(false)"/><label for="section"> Is it same for all sections</label><br>
                          <!--<input type="checkbox" id="no" v-model="checked" @click="onClick(true)"><label for="no">Is it not same</label>-->
                         <div v-show="!checked">
                             <select v-model="associateWorksheet.classroom" class="form-control popUpEle" @change="GradeWorksheets()">
                             <option value=0>--Select classroom--</option>
                             <option v-for="classroom in classrooms" v-bind:value="classroom">{{classroom.gradename+"-"+classroom.sectionname}}</option>
                             </select>
                        </div>
                        <br>
                        <select v-model="associateWorksheet.w_id" class="form-control popUpEle">
                         <option value=0>--Select worksheet--</option>
                         <option v-for="worksheet in worksheets" v-bind:value="worksheet.w_id">{{worksheet.worksheet_name}}</option>
                         </select>
                         <br>
                     </div>
                      <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" v-on:click="updateTestSyllabus()">Save</button>
                </div>
                 </div>
                 </div>
             </div>
        </div>
        <!-- Associate worksheet pop up end -->
    </div>
</template>
<style>
.testtype{
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
}
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
.marksbutton,.syllabusbutton{
    border-radius: 0px;
    height: 30px;
    width: 100px;
    text-align: center;
}
.popUpEle {
  width: 250px;
}

.showAlertDiv {
  margin-top: -42px;
  height: 42px;
  margin-left: 152px;
  width: 276px;
}
.associateDetails{
  width: 200px;
  height:150px;
}
.btnAsLink {
  background: none;
  border: none;
  color: blue;
}
</style>
    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import moment from 'moment'
import _ from 'lodash';
import {mapMutations} from 'vuex';
import DatePicker from 'vue2-datepicker';
export default{
    components: { DatePicker },
    props:['mysubject','school','userdetails','acdemicyearandboard'],
    data(){
        return{
            // testdetails:[],
            testsubjectdetails:{},
            testsubjectdetailsedit:{
                edit:false
            },
            subjectdetails:{},
            subjectanddate:false,
            addmarks:false,
            setsubjectdate:'',
            alertClass: "",
            alertMessage: "",
            alertType:"",
            gradeType:'grade',
            subjectType:'subject',
            open: 'show',
            close: 'hide',
            checked:false,
            editChecked:false,
            academicDetails: {},
            editClassroom:{},
            testdetailstoaddmarks:{},
            studentandmarksdata:{},
            associateWorksheet:{},
            id:this.$cookie.get('id'),
            uncheck:false,
            showAlert: false,
            userName:this.$cookie.get('username'),
            academicYearObj: this.$store.state.acdemicyearandboard,
            selectedTestObj: this.$store.state.selectedTestObj,
            classrooms:[],
            listOfGrades: [],
            listOfSubjects: [],
            listOfTestWorksheets:[],
            worksheets:[],
            userId: {
             id: this.$cookie.get("userid"),
            },
            subjectmarks: null,
            unittestMaxmarks:null,
        }
    },
    created(){
        this.unittestMaxmarks = this.selectedTestObj.maxmarks
        // UserService.SubjectTests(this.mysubject,this.id).then((response)=>{
        //     console.log(response);
        //     this.testdetails=response.data
        //     this.testsubjectdetailsedit.edit==false
        // })
         UserService.ListOfTestWorksheets(this.id,this.selectedTestObj.testid,this.mysubject.subjectid).then(response=>{
             this.listOfTestWorksheets = response.data;
             console.log(response.data);
         });

        UserService.ClassroomGrades(this.academicDetails.syllabustype, this.id).then((response) => {
            this.listOfGrades = response.data;
        });

         UserService.Subjects(this.id).then((response) =>{
            this.listOfSubjects =response.data;
        });

        UserService.MySubjects(this.userId,this.id).then(response=>{
            //gradeid + subjectid
             this.classrooms = _.uniqBy(response.data,'id');
             console.log(this.classrooms.pop());
         });

        this.academicDetails = {
          academicyearid: this.academicYearObj.academicyearid,
          syllabustype: this.academicYearObj.syllabustype
      };

        console.log(this.mysubject);
        this.getOnloadEntitiesData();
        //console.log(this.getOnloadEntitiesData());

        console.log("classroomid"+this.mysubject.id)
        console.log("subjectid"+this.mysubject.subjectid);
        console.log(JSON.stringify(this.selectedTestObj));
        console.log("test_id"+this.selectedTestObj.id);
    },
    methods:{

            ...mapMutations([
            'SET_SELETECTED_WORKSHEET','SELECTED_TEST'
        ]),

        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        getsubjectdate:function(date){
            return moment(date).format('DD/MM/YYYY');
        },
        editsyllabusandmaxmarks:function(subjectdetails){
            console.log(subjectdetails)
              this.testsubjectdetailsedit={
                edit:true,
                testtype:subjectdetails.testtype
            }
            this.addmarks=false
            var testid={
                id:subjectdetails.id
            }
            this.setsubjectdate=new Date();
            // this.setsubjectdate.setTime(subjectdetails.subjecttestdate);
        },
        geteachtestdetails:function(test){
           this.subjectanddate=true
            this.subjectdetails=test
            this.testsubjectdetailsedit.edit=false
            this.addmarks=false
            var testdetails={
                "id":this.mysubject.id,
                "testtype":test.testtype,
                "subjectname":this.mysubject.subjectname
            }
            console.log(testdetails);
            UserService.EnterMarks(testdetails,this.id).then((response)=>{
                console.log(response);
                this.studentandmarksdata=response.data
                if(this.studentandmarksdata.length > 0){
                    this.subjectmarks = this.studentandmarksdata[0].maxmarks;
                }
            }).catch((response)=>{
                console.log(response.response.data);
            })
      
        },
        onEditChecked(flag){
            if(flag == true){
                this.editChecked=true;
                this.uncheck=false;

            }else{
                this.editChecked=false;
            }
        },

        subjecttest(){
            console.log(this.editChecked);
            console.log(this.editClassroom.id);
            if(this.editChecked == true){
               // single row 
                var subjectdetailstoedit={
                //"id":this.subjectdetails.id,
                "id":this.editClassroom.id,
                "subjectid":this.subjectdetails.subjectid,
                "maxmarks":this.subjectdetails.maxmarks,
                "syllabus":this.subjectdetails.syllabus,
                "subjecttestdt":this.setsubjectdate.getTime(),
                "testid":this.subjectdetails.testid,
                "sameForall":0
            }
            console.log(subjectdetailstoedit)
            UserService.SubjectTestEdit(subjectdetailstoedit,this.id).then((response)=>{
                this.$alert("Successfully saved","Success",'success');
                console.log(response);
                if(response.status==200){
                    this.testsubjectdetailsedit.edit=false
                    this.geteachtestdetails(this.selectedTestObj);
                }
            });
               console.log(this.editChecked);
            }else{
                //same for all sections
                
                var subjectdetailstoedit={
                //"id":this.subjectdetails.id,
                "id":null,
                "subjectid":this.subjectdetails.subjectid,
                "maxmarks":this.subjectdetails.maxmarks,
                "syllabus":this.subjectdetails.syllabus,
                "subjecttestdt":this.setsubjectdate.getTime(),
                "testid":this.subjectdetails.testid,
                "sameForall":1
            }
            console.log(subjectdetailstoedit)
            UserService.SubjectTestEdit(subjectdetailstoedit,this.id).then((response)=>{
                this.$alert("Successfully saved","Success",'success');
                console.log(response);
                if(response.status==200){
                    this.testsubjectdetailsedit.edit=false
                }
            });
            }


        },

        onClick(flag){
            this.associateWorksheet.classroomid = [];
            if(flag == true){
               this.checked = true;
            }else{
                this.checked == false;
                console.log("checked");
                console.log("not selected");
                 UserService.TestWorksheetCreatedby(this.id,this.userName,this.mysubject.gradeid,this.mysubject.subjectid).then(response=>{
                     this.worksheets = response.data;
                 })
                for (const iterator of this.classrooms) {
                    this.associateWorksheet.classroomid.push(iterator.id);
                }  
            
            }
        },
        cancelsubjecttest:function(){
            this.testsubjectdetailsedit.edit=false
        },
        testdetailsforaddmarks:function(test){
            this.addmarks=true
             this.testsubjectdetailsedit.edit=false

        },
        submitmarks:function(){
            //console.log(this.studentandmarksdata);
             let statusValue = 1;
            for(let i=0;i<this.studentandmarksdata.length;i++){
                 if(this.studentandmarksdata[i].maxmarks<this.studentandmarksdata[i].marks){
                    this.alertMessage = "Your total marks are greater than maximum marks, please check once";
                    this.alertType = 'Failed';
                    statusValue = 0;
                    this.popUp('alertPopUp',this.open);
                }
            }
             if(statusValue == 1){
              UserService.AddMarks(this.studentandmarksdata,this.id).then((response)=>{
                    if(response.status==201){
                        this.addmarks=false
                    }
                })
             }
        },

        GradeWorksheets(){
        let gradeid = this.associateWorksheet.classroom["gradeid"];
        //let subjectid = this.associateWorksheet.classroom["subjectid"];
        let subjectid = this.mysubject.subjectid;
        UserService.TestGradeWorsksheets(this.id,gradeid,subjectid,this.userName).then(response=>{
            this.worksheets = response.data;
        })
        },

         updateTestSyllabus(){
            //let classroomid = this.associateWorksheet.classroom["id"];
            console.log(this.subjectdetails.testid);
            console.log(this.checked);
            let obj = {
                testid : this.subjectdetails.testid,
                subjectid: this.subjectdetails.subjectid,
                online_exam_id:this.associateWorksheet.w_id,
                classroomid:null,
            }
           
            if(this.checked == false){
                  // update only single row..
                 if(obj.online_exam_id !== undefined){
                obj.classroomid = this.associateWorksheet.classroom.id;
                UserService.updateTestSyllabus(this.id,obj).then(response=>{
                    obj = {};
                    this.alertMessage ='Successfully associated worksheet..';
                    this.alertClass = "alert-success";
                    this.setAlertMessage("success");
                    this.getOnloadEntitiesData();
                    console.log("not same");
                }).catch((err) => {
                    alert("Cannot Be Associated, Syllabus is same for all sections");
               })
                 }else{
                    this.alertMessage ='You must enter all data.....';
                    this.alertClass = "alert-danger";
                    this.setAlertMessage("fail");
                 }
            }else{
                // same for all sections
               if(obj.online_exam_id !== undefined){
                   UserService.updateTestSyllabus(this.id,obj).then(response=>{
                        obj = {};
                        this.alertMessage ='Successfully associated worksheet..';
                        this.alertClass = "alert-success";
                        this.setAlertMessage("success");
                        console.log(response.data);
               }).catch((err) => {
                    alert("Cannot Be Associated, Syllabus is same for all sections");
               })
               }else{
                        this.alertMessage ='You must enter all data.....';
                        this.alertClass = "alert-danger";
                        this.setAlertMessage("fail");
               }
            }
        
        },

        setAlertMessage: function(type) {
        this.showAlert = true;
        let thisVue = this;
      setTimeout(function() {
        thisVue.alertMessage = "";
        thisVue.alertClass = "";
        thisVue.showAlert = false;
        if (type == "success") {
          thisVue.popUp("worksheetAsscPopUp", thisVue.close);
        }
      }, 1500);
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

        gotoEvaluation(worksheet){
            this.SET_SELETECTED_WORKSHEET(worksheet);
            console.log( "Worksheet1"+worksheet);
            this.$router.push({
                path:'/mysubjects/'+this.mysubject.gradenumber+this.mysubject.sectionname+'-'+this.mysubject.subjectname+'-'+this.mysubject.syllabustype+'/ws-assigned-status'
            })
        },

         getOnloadEntitiesData: function(){
             console.log(" Selected TEst Obj : " + JSON.stringify(this.selectedTestObj))
             UserService.SubjectSyllabus(this.mysubject,this.id,this.selectedTestObj.testid).then(response=>{
                     this.selectedTestObj = response.data[0];

                     this.geteachtestdetails(this.selectedTestObj);
             });          
           },

           getUnique(array){
               _.uniqBy(array,'id')&&_.uniqBy(array,'gradeid')

           }

    }
}
</script>