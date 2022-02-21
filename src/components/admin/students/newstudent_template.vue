<template>
    <div class="container">
        <div class="row reset-padding reset-margin">
            <div class="col-lg-12 text-left">
                 <div class="page-heading">New student</div>
                <hr>
            </div>
        </div>
        <!-- <div class="row" v-if="showAlertforsuccess || showAlertforfailure" >
            <div class="col-sm-12">
                <div class="['showPopUpAlertDiv','alert','alert-success',popUpAlertClass]" role="alert" style="color:red; align:center; padding-left:30%">
                    <h4>{{alertMessage}}</h4>
                    <br>
                </div>
            </div>
        </div>  -->
        <div class="row reset-padding reset-margin">
            <div class="col-md-12">
                <div class="panel  addteacherpanel">
                    <div class="panel-body teacherpanel">
                        <form id="form" class="form-horizontal" role="form" name="studentregistrationform" >
                            <h4><u><b>Student Details</b></u></h4>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="left-side-form">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Admission No</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="text" class="form-control form-input"  placeholder="Admission Number*" v-model="student.admissionnumber" required>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>First Name</label>
                                                </div>
                                                 <div class="col-md-8 ">
                                                    <input type="text" class="form-control form-input" placeholder="Student Firstname*" v-model="student.name" required>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Middle Name</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="text" class="form-control form-input"  placeholder="Student Middlename" v-model="student.middlename">
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Last Name</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="text" class="form-control form-input"  placeholder="Student Lastname*" v-model="student.lastname" required>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Gender</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <label><input type="radio"  value="female" v-model="student.gender">Female</label>
                                                    <label><input type="radio" value="male" v-model="student.gender">Male</label>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Height/Weight</label>
                                                </div>
                                                <div class="col-md-4 ">
                                                    <input type="text" class="form-control form-input" placeholder="Student Height*" v-model="student.height"   required>
                                                </div>
                                                <div class="col-md-4 ">
                                                    <input type="text" class="form-control form-input"  placeholder="Student Weight*" v-model="student.weight" required>
                                                </div>
                                            </div>
                                            <br>
                                            <!-- <div class="row">
                                                <div class="col-md-4">
                                                    <label>E-mail</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="email" class="form-control form-input"  placeholder="xxxxxxxxx@yyyy.com*" v-model="student.emailid" required>
                                                </div>
                                            </div>
                                            <br> -->
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label for="class">Blood Group</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <input type="text" class="form-control form-input"  placeholder="O+,O-,B+,B-,A+,A- *" v-model="student.bloodgroup" required>
                                                </div>
                                            </div>
                                            <br>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="right-side-form">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Board Of Edu</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <select class="form-control form-input" v-model="student.syllabustype" paceholder="Select" v-on:change="selectGradebasedonBoard">
                                                        <option value="" disabled selected>Select your option</option>
                                                        <option v-for="board in boardofeducation" v-bind:value="board.syllabustype">{{board.syllabustype}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Grade</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <select class="form-control form-input" v-model="student.gradename" paceholder="Select Grade">
                                                        <option value="" disabled selected>Select your option</option>
                                                        <option v-for="grade in gradesbasedonboard">{{grade.gradename}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Date Of Birth</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <date-picker lang="en" v-model="student.dateofbirth"></date-picker>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Date of Joining</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <date-picker lang="en" v-model="student.dateofjoining"></date-picker>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>House Name</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                     <select class="form-control form-input" v-model="student.housename">
                                                        <option value="" disabled selected>Select your option</option>
                                                        <option v-for="house in houses">{{house.housename}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Address</label>
                                            </div>
                                            <div class="col-md-8">
                                                <textarea rows="4" cols="40"  class="form-control form-input" v-model="student.address" required></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br>
                
                            </div>
                            <hr>
                            <!-- <h4><u><b>Parent Details :</b></u></h4> -->
                            <!-- <div class="col-md-6 col-md-offset-3" style="margin-top: -2%;margin-left: 18%;">
                                <label for="chkPassport">
                                    <input type="checkbox" id="chkPassport"  v-model="student.anotherchild" v-on:change="showHide()" />
                                    Another Child
                                </label>
                                <div v-show="isVisible" style="margin-left: 34%; margin-top: -5%;">
                                    <div class="row">
                                        <div class="col-md-3 ">
                                            <label>Emailid:</label>
                                        </div>
                                        <div class="col-md-9 ">
                                            <input type="email" class="form-control form-input" placeholder="xxxxxxxxx@gmail.com" id="txtPassportNumber" name="parentemailid" v-model="student.parentemailid"/>
                                            <label>(Please enter registred emailid)</label><br>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <br> -->
                                <!-- <div v-show="!isVisible"> -->
                                <!-- <div class="row">
                                    <div class="col-md-6">
                                        <div class="left-side-form">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Father Name</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="text" class="form-control form-input"  placeholder="Father Name*" v-model="student.fathername"  required>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Mother Name</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="text" class="form-control form-input"  placeholder="Mother Name*" v-model="student.mothername"  required>
                                                </div>
                                            </div>
                                            <br>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="right-side-form">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Contact Number</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="text" class="form-control form-input"   placeholder="Contact Number*" v-model="student.contactnumber" required>
                                                </div>
                                            </div>
                                            <br> 
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Address</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <textarea rows="4" cols="40" class="form-control form-input" v-model="student.parentaddress" required></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr> -->
                                <h4><u><b>Login Details</b></u></h4>
                                <div class="row">
                                    <div class="col-md-6 col-md-offset-3">
                                        <div class="left-side-form">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Roles</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <select class="form-control form-input" >
                                                        <!-- <option value="" disabled >Select your option</option> -->
                                                        <option value="" selected >STUDENT</option>
                                                        <!-- <option value="" disabled selected>Select your option</option>
                                                        <option v-for="role in roles">{{role.role}}</option> -->
                                                    </select>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>e-mail</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="email" class="form-control form-input"  placeholder="xxxxxxxxx@yyyy.com*" v-model="student.emailid"  required>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Password</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <input type="password" class="form-control form-input"   placeholder="password*" v-model="student.password" required>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Confirm Password</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <input type="password" class="form-control form-input"   placeholder="confirmpassword*" v-model="student.confirmpassword"  required>                             
                                                </div>
                                            </div>
                                            <br>
                                        </div>
                                    </div>
                                </div>
                            <!-- </div> -->
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" type="reset" class="btn button"> Reset</button>
                                    <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="newstudent" class="btn button"  >Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UserService from '../../../services/userService.js';
import DatePicker from 'vue2-datepicker';
import store from '../../../store.js'
export default{
    components: { DatePicker },
   // props:['userdetails','school','boardofeducation','houses'],
    data(){
        return{
            // isVisible:false,
            student:{
                role: "STUDENT"
            },
            gradesbasedonboard:[],
            roles:[],
            boardforgrade:{},
            oardofeducation: [],
            houses: [],
            id:this.$cookie.get('id'),
            userdetails:this.$store.state.userDetails,
            school:this.$store.state.school,
            showAlertforsuccess:false,
            showAlertforfailure:false,
            alertMessage:"",
            popUpAlertClass:""
            // boardofeducation:this.$store.state.boardofeducation,
            // houses:this.$store.state.houses
        }
    },
    methods:{
        // showHide:function(){
        //     this.isVisible=this.student.anotherchild
        // },
        selectGradebasedonBoard:function(){
            var boardforgrade={
                "syllabustype":this.student.syllabustype
            }
            UserService.ClassroomGrades(boardforgrade,this.id).then((response)=>{
                this.gradesbasedonboard=response.data;
            })
        },
        newstudent:function(){
        console.log(this.student);
            var student={
                "admissionnumber":this.student.admissionnumber,
                "name":this.student.name,
                "middlename":this.student.middlename,
                "lastname":this.student.lastname,
                "gender":this.student.gender,
                "height":this.student.height,
                "weight":this.student.weight,
                // "emailid":this.student.emailid,
                "bloodgroup":this.student.bloodgroup,
                "syllabustype":this.student.syllabustype,
                "gradename":this.student.gradename,
                "doj":this.student.dateofjoining.getTime(),
                "dob":this.student.dateofbirth.getTime(),
                "housename":this.student.housename,
                "address":this.student.address,
                // "parentemailid":this.student.parentemailid,
                // "fathername":this.student.fathername,
                // "mothername":this.student.mothername,
                // "contactnumber":this.student.contactnumber,
                // "parentaddress":this.student.parentaddress,
                "role":this.student.role,
                "emailid":this.student.emailid,
                "password":this.student.password,
                "confirmpassword":this.student.confirmpassword,
                // "anotherchild":this.isVisible
            }
            console.log(student)
            UserService.NewStudent(student,this.id).then((response)=>{
                console.log(response);
                if(response.status==200){
                    this.$alert('Student Registered successfully','Success','success')
                    // this.showAlertforsuccess = true;
                    // this.alertMessage = "Password reseted successfully";
                    // this.popUpAlertClass = "alert-success"
                    // let thisVue = this;
                    // setTimeout(function() {
                    //     thisVue.showAlertforsuccess = false;
                    //     thisVue.alertMessage = ""
                    // }, 1500);
                    this.$router.push('/studentsModule/yettoadmitstudents');
                    
                }
                //this.$parent.getStudentsList();
            }).catch((error) => {
                console.log("Error Response" + JSON.stringify(error.response))
                console.log(error.response)
                if(error.response.data.message == "invalid admissionnumber" || error.response.data.message == "provided emailid is already registered"){
                    this.$alert(error.response.data.message,'Failure','warning');
                    // this.showAlertforfailure = true;
                    // this.alertMessage = error.response.data.message;
                    // this.popUpAlertClass = "alert-success"
                    // let thisVue = this;
                    // setTimeout(function() {
                    //     thisVue.showAlertforfailure = false;
                    //     thisVue.alertMessage = ""
                    // }, 1500);
                }
            })
        }
    },
    created(){
        this.boardofeducation = this.$store.state.boardofeducation;
        console.log(this.boardofeducation)
        if(this.boardofeducation.length == 0){
            UserService.BoardOfEducation(this.id).then(response => {
                this.boardofeducation = response.data;
                console.log(this.boardofeducation)
                this.$store.commit("SET_BOARDOF_EDUCATION", this.boardofeducation);
            })
        }
        this.houses = this.$store.state.houses;
        console.log(this.houses)
        if(this.houses.length == 0){
            UserService.Houses(this.id).then(response => {
                this.houses = response.data;
                this.$store.commit("HOUSES", this.houses);
            })
        }
        // UserService.Roles(this.id).then((response)=>{
        //     this.roles=response.data;
        // })
    }
}
</script>
