<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head">Add Student</h3>
            <hr>
        </div>
        <div class="panel panel-info  createclasspanel col-lg-6 col-lg-offset-3" >
            <div class="panel-body">
                <form name="newrouteform" >
                    <div class="row">
                        <div class="col-md-4">
                            <label for="class">Route Name</label>
                        </div>
                        <div class="col-md-8 ">
                            <select class="form-control form-input" v-model="student.routeid" v-on:change="getPickPoint(student.routeid)">
                                <option value="" disabled selected>Select your option</option>
                                <option v-for="route in activeBusDeatils" v-bind:value="route.routeid">{{route.routename}}</option>
                            </select>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-4" style="width:120px">
                            <label>Pick Point</label>
                        </div>
                        <div class="col-md-8" style="width:150px">
                            <select class="form-control form-input" v-model="student.pickpoint" v-on:change="getDropPoint(student.pickpoint)">
                                <option value="" disabled selected>Select your option</option>
                                <option v-for="pick in pickingStops" v-bind:value="pick">{{pick}}</option>
                            </select>
                        </div>

                        <div class="col-md-4" style="width:120px">
                            <label>Drop Point</label>
                        </div>
                        <div class="col-md-8" style="width:150px">
                            <select class="form-control form-input" v-model="student.droppoint" v-on:change="getBusDetails()">
                                <option value="" disabled selected>Select your option</option>
                                <option v-for="drop in dropingStops" v-bind:value="drop">{{drop}}</option>
                            </select>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-4">
                            <label for="class">Bus</label>
                        </div>
                        <div class="col-md-8 ">
                            <select class="form-control form-input" v-model="student.busid" v-on:change="selectAcadamicYear()">
                                <option value="" disabled selected>Select your option</option>
                                <option v-for="bus in newBusList" v-bind:value="bus.id">{{bus.busname}}-{{bus.busnumber}}</option>
                            </select>
                        </div>
                    </div>
                    <br>
                    <div class="row" v-if="userRole == 'ADMIN'">
                        <div class="col-md-4" style="width:120px">
                            <label>AC Year</label>
                        </div>
                        <div class="col-md-8" style="width:150px">
                           <select class="form-control form-input"  v-model="academicDetails" v-on:change="getGradesAndSections()">
                               <option value="" disabled selected>Select your option</option>
                                <option v-for="academic in academicYearsData.academics" v-bind:value="{passingyear: academic.passingyear,academicyearid: academic.id,syllabustype:academic.syllabustype,syllabusid:academic.syllabusid}">{{academic.passingyear}} - {{academic.syllabustype}} 
                                <div v-if="academic.active === 1"> - Active </div></option>
                            </select>
                        </div>
                        <div class="col-md-4" style="width:120px">
                            <label>Class</label>
                        </div>
                        <div class="col-md-8" style="width:150px">
                             <select class="form-control form-input"  v-model="gradesDetails" v-on:change="getClassroomStudents()">
                                 <option value="">All</option>
                                 <option v-for="grade in gradesAndSubjects" v-bind:value="{gradename:grade.gradename,sectionname:grade.sectionname,gradeid:grade.gradeid,classroomid:grade.id}">{{grade.gradename}}-{{grade.sectionname}}</option>
                            </select>
                        </div>
                    </div>
                    <br>
                    <div class="row" v-if="userRole == 'ADMIN' || userrole == 'TEACHER'">
                        <div class="col-md-4">
                            <label for="class">Students</label>
                        </div>
                        <div class="col-md-8 ">
                            <multiselect v-model="studentDetails"
                            :options="studentsName"
                            :multiple="true"
                            ></multiselect>
                        </div>
                    </div>
                    <br>
                    <div class="row" v-if="userRole == 'PARENT'|| userRole == 'STUDENT'">
                        <div class="col-md-4">
                            <label for="class">Students Name :      {{myChild.name}}</label>
                        </div>
                    </div>
                    <br>
                     <div class="row" v-if="userRole == 'ADMIN'|| userRole == 'TEACHER'">
                        <div class="col-md-4">
                            <label>Teacher Name</label>
                        </div>
                            <div class="col-md-8">
                                <multiselect v-model="teacherDetails"
                                :options="teacherName"
                                :multiple="true"
                                ></multiselect>
                            </div>
                    </div>
                    <div class="row"><br>
                        <div class="col-lg-6 col-lg-offset-3 text-center">
                            <!-- <button id="btn-reset" type="reset" class="btn resetbutton" v-on:click.prevent="resetAll"> Reset</button> -->
                            <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="addStudentsToBus" class="btn submitbutton">Submit</button>
                        </div>
                   </div>
                </form>
            </div>
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
                            <button type="button" class="btn btn-primary" data-dismiss="modal" >OK</button>
                        </div>                     
                    </div>
                </div>
            </div>
        <!-- confirmation pop up end  -->
         <!-- confirmation  pop up for success message start -->
            <div class="modal fade" id="successmsg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top:80px">
                <div class="modal-dialog" style="width:472px">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4>{{alertType}}</h4>
                        </div> 
                        <div class="modal-body" style="height:75px;">
                        {{alertMessage}}
                        </div>     
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click.prevent="gotoNextPage()" >OK</button>
                        </div>                     
                    </div>
                </div>
            </div>
        <!-- confirmation pop up for success message end  -->
    </div>
</template>
<script>
import Multiselect from "vue-multiselect";
import UserService from '../../../../services/userService.js';
export default{
    components: { Multiselect },
    data(){
        return{
            student:{},
            id:this.$cookie.get('id'),
            buses:[],
            stopnames:[],
            routesList:[],
            staffList:[],
            routesWithStops:[],
            bussummery:[],
            pickingStops:[],
            dropingStops:[],
            newBusList:[],
            routeId:0,
            academicYearsData:[],
            academicDetails:{},
            gradesAndSubjects:[],
            studentsList:[],
            gradesDetails:{},
            studentDetails:[],
            teacherDetails:[],
            studentsName:[],
            teacherName:[],
            userRole: this.$cookie.get('userrole'),
            myChild:{},
            alertMessage: "",
            alertType:"",
            open: 'show',
            close: 'hide',
            teachersList:[],
            activeBusDeatils:[]
        }
    },
    created(){
        this.myChild = this.$store.state.myChild;
        UserService.getAllTransportDetails(this.id).then((response)=>{
            this.buses=response.data.buses;
            // this.routesList=response.data.routes;
            this.staffList=response.data.staff;
            this.routesWithStops=response.data.RoutesWithStops;
            this.bussummery=response.data.BusSummery;
        })
        UserService.getActiveBusDetails(this.id).then((response)=>{
            this.activeBusDeatils=response.data
        })
    },
    methods:{
        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
       getPickPoint:function(routeid){
           this.routeId=routeid;
           for(let i=0;i<this.routesWithStops.length;i++){
               if(routeid==this.routesWithStops[i].id){
                for(let j=0;j<this.routesWithStops[i].stopsList.length;j++){
                    this.pickingStops[j]= this.routesWithStops[i].stopsList[j];
                }
                break;
              }
           }
       },
       getDropPoint:function(pickPoint){
           let pickpointValue = false;
           this.dropingStops=[];
           let dataSize=0;
           for(let i=0;i<this.pickingStops.length;i++){
               if(pickPoint===this.pickingStops[i]){
                   pickpointValue=true;
               }
               if(pickpointValue==true && pickPoint!==this.pickingStops[i]){
                   this.dropingStops[dataSize]=this.pickingStops[i];
                   dataSize++;
               }
           }
           if(this.dropingStops.length==0){
                this.alertType = 'No Drop Point';
                this.alertMessage = "Please select Proper Pick point";
                this.popUp('alertPopUp',this.open);
                this.student={};
           }
       },
       getBusDetails:function(){
           for(let i=0;i<this.bussummery.length;i++){
               if(this.bussummery[i].routeid==this.routeId){
                   let dataSize=0;
                   for(let j=0;j<this.buses.length;j++){
                     if(this.bussummery[i].busid==this.buses[j].id){
                        this.newBusList[dataSize]=this.buses[j];
                        dataSize++;
                     }
                   }
               }
           }
       },
        selectAcadamicYear:function(){
            if(this.userRole == 'ADMIN'){
                  UserService.AcademicYears(this.id).then((response)=>{
                    this.academicYearsData = response.data;
                }).catch(error =>{
                    console.log(JSON.stringify(error.data))
                })
             }  
            },
        getGradesAndSections:function(){
                UserService.getGradesAndSections(this.id,this.academicDetails.passingyear,this.academicDetails.syllabustype).then((response)=>{
                   this.gradesAndSubjects=response.data.gradesAndSectionsList; 
                 })

                UserService.getTeacherDetails(this.id,this.academicDetails.passingyear,this.academicDetails.syllabustype).then((response)=>{
                    this.teachersList=response.data;
                    for(let i=0;i<this.teachersList.length;i++){
                        let str = this.teachersList[i].teacherid+"-"+this.teachersList[i].teachername
                        this.teacherName.push(str);
                    }
                })
            }, 
        getClassroomStudents : function(){
            let obj = {
                classroomid:this.gradesDetails.classroomid,
                gradeid:this.gradesDetails.gradeid
            }
            UserService.SectionDetails(obj,this.id).then((response)=>{
                this.studentsList=response.data.studentsOfClassRoom;
                for(let i=0;i<this.studentsList.length;i++){
                    let str = this.studentsList[i].id+"-"+this.studentsList[i].name
                    this.studentsName.push(str);
                }
            })
        },
        addStudentsToBus:function(){
            let studentsIdsList=[];
            let teachersIdsList=[];
            if(this.userRole == 'ADMIN' || this.userRole=='TEACHER'){
                for(let i=0;i<this.studentDetails.length;i++){
                    let ids = this.studentDetails[i].split("-");
                    studentsIdsList.push(ids[0])
                }
                // if(this.teacherDetails.length>0){
                for(let j=0;j<this.teacherDetails.length;j++){
                    let ids = this.teacherDetails[j].split("-");
                    teachersIdsList.push(ids[0]);
                }
            }else{
                studentsIdsList.push(this.myChild.id)
            }   
            let occupiedSeats = studentsIdsList.length +teachersIdsList.length;
            this.student.studentsIdList=studentsIdsList;
            this.student.teachersIdList=teachersIdsList;
            if(this.student.routeid==undefined){
                this.alertType = 'Fill All Details';
                this.alertMessage = "Select Route";
                this.popUp('alertPopUp',this.open);
            }else if(this.student.pickpoint==undefined){
                this.alertType = 'Fill All Details';
                this.alertMessage = "Select PickPoint";
                this.popUp('alertPopUp',this.open);
            }else if(this.student.droppoint==undefined){
                this.alertType = 'Fill All Details';
                this.alertMessage = "Select Drop Point";
                this.popUp('alertPopUp',this.open);
            }else if(this.student.busid==undefined){
                this.alertType = 'Fill All Details';
                this.alertMessage = "Select Bus";
                this.popUp('alertPopUp',this.open);
            }else if(studentsIdsList.length==0 ){
                this.alertType = 'Fill All Details';
                this.alertMessage = "Select Student";
                this.popUp('alertPopUp',this.open);
             }else if(occupiedSeats>this.newBusList[0].availability_seats){
                this.alertType = "Seats are Not Available";
                this.alertMessage = "Seats are Not Available";
                this.popUp('alertPopUp',this.open);
                this.student={};
                this.resetAll();
             }else{
                UserService.addStudentsToBus(this.id,this.student).then((response)=>{
                    if(response.status==200){
                        this.alertType = response.data.message;
                        this.alertMessage = response.data.description;
                        this.popUp('successmsg',this.open);
                    }else{
                        this.alertType = response.data.message;
                        this.alertMessage = response.data.description;
                        this.popUp('alertPopUp',this.open);
                    }
                })
            }
        },
        gotoNextPage:function(){
           this.$router.push('/transport/getAssignedStudnetsFromBus');
        },
        resetAll:function(){
            this.student={};
            this.academicDetails={};
            this.gradesDetails={};
            this.academicYearsData=[];
            this.gradesAndSubjects=[];
            this.studentsName=[];
            this.studentDetails=[];
        }
    }
}
</script>
<style>
 .resetbutton,.resetbutton:hover{
    background-color: #039be5;
    background-image: none;
    border-color: #039be5;
    border-radius:0px;
    color:white;
    }
.submitbutton,.submitbutton:hover{
    background-color: #039be5;
    background-image: none;
    border-color: #039be5;
    border-radius:0px;
    color:white;
    }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>