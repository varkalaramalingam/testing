<template>
   <div>
   <div class="row reset-padding reset-margin">
      <div class="col-lg-12 text-left">
         <h3 class="student-head">New Teacher</h3>
         <hr>
      </div>
   </div>
   <div class="row reset-padding reset-margin">
      <div class="col-md-12">
         <div class="panel  addteacherpanel">
            <div class="panel-body teacherpanel">
               <form class="form-horizantal" name="addteacherform">
                  <h4><u><b>Teacher Details</b></u></h4>
                  <div class="row">
                     <div class="col-md-6">
                        <div class="leftside-form">
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">First Name</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="firstteachername" placeholder="Teacher FirstName*" v-model="teacher.teachername" ng-pattern="/[aA-zZ\s]$/" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Middle Name</label>
                              </div>
                              <div class="col-md-8 ">
                                 <input type="text" class="form-control form-input"  name="middlename" placeholder="Teacher Middlename" v-model="teacher.middlename" ng-pattern="/[aA-zZ\s]$/">
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">Last Name</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="lastname" placeholder="Teacher LastName*" v-model="teacher.lname" ng-pattern="/[aA-zZ\s]$/" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Gender</label>
                              </div>
                              <div class="col-md-8">
                                 <label><input type="radio" value="female" name="gender" v-model="teacher.gender">Female</label>
                                 <label><input type="radio" value="male" name="gender" v-model="teacher.gender">Male</label>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Marital Status</label>
                              </div>
                              <div class="col-md-8">
                                 <label><input type="radio" value="married" name="maritalstatus" v-model="teacher.maritalstatus">  Married</label>
                                 <label><input type="radio" value="unmarried" name="maritalstatus" v-model="teacher.maritalstatus">  Unmarried</label>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">Contact Number</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="contactnumber" placeholder="Contact Number*" v-model="teacher.contactnumber" ng-pattern="/^[0-9]{10,10}$/" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">E-mail Id</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="emailid" placeholder="example@gmail.com*" v-model="teacher.emailid" ng-pattern="" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">Qualification</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="qualification" placeholder="Ex:Ph.d,MBA,M.Tech*" v-model="teacher.qualification" ng-pattern="" required>
                              </div>
                           </div>
                           <br>
                        </div>
                     </div>
                     <div class="col-md-6">
                        <div class="right-side-form">
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">Tags</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="subjectscanteach" placeholder="subjects he/she can teach" v-model="teacher.subjects" ng-pattern="/[aA-zZ\s]$/" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Date Of Birth</label>
                              </div>
                                <div class="col-md-8 ">
                                    <date-picker lang="en" v-model="teacher.dateofbirth"></date-picker>
                                </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Date of Joining</label>
                              </div>
                                <div class="col-md-8 ">
                                    <date-picker lang="en" v-model="teacher.dateofjoining"></date-picker>
                                </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">Blood Group</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="bloodgroup" placeholder="O+,O-,B+,B-,A+,A- *" v-model="teacher.bloodgroup" ng-pattern="" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">About Teacher</label>
                              </div>
                              <div class="col-md-8">
                                 <textarea name="about" class="form-control" rows="4" cols="50" placeholder="Some Text About You......*"  v-model="teacher.about" required></textarea>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">Address</label>
                              </div>
                              <div class="col-md-8">
                                 <textarea name="address" class="form-control" rows="4" cols="50" placeholder="Type Your Address Here... *"  v-model="teacher.address" required></textarea>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <br>
                  <hr>
                  <h4><u><b>Login Details</b></u></h4>
                  <div class="row">
                     <div class="col-md-6 col-md-offset-3">
                        <div class="left-side-form">
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Roles</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" name="Syllabustype" placeholder="Select RoleType" list="role" class="form-control form-input" v-model='teacher.role'>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>E-mail</label>
                              </div>
                              <div class="col-md-8 ">
                                 <input type="email" class="form-control form-input"   placeholder="xxxxxxxxx@yyyy.com*" v-model="teacher.emailid" ng-pattern="" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Password</label>
                              </div>
                              <div class="col-md-8 ">
                                 <input type="password" class="form-control form-input"  placeholder="password*" v-model="teacher.password" ng-pattern="" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Confirm Password</label>
                              </div>
                              <div class="col-md-8 ">
                                 <input type="password" name="confirm_password" class="form-control form-input"  placeholder="confirmpassword*" v-model="teacher.confirmpassword" ng-pattern="" required password-match="vm.teacher.password">
                                
                                
                              </div>
                           </div>
                           <br>
                        </div>
                     </div>
                    </div>
                     <div class="row">
                        <div class="col-lg-6 col-lg-offset-3 text-center">
                           <button id="btn-reset" type="reset" class="btn  button"> Reset</button>
                           <button id="btn-Register" type="submit" name="submit"  class="btn button" v-on:click.prevent="newteacher" ng-disabled="addteacherform.$invalid"> 
                           Submit</button>
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
import DatePicker from "vue2-datepicker";
import UserService from "../../../services/userService.js";
export default {
  components: { DatePicker },
  //props:['userdetails','school'],
  data() {
    return {
      userdetails: this.$store.state.userDetails,
      school: this.$store.state.school,
      teacher: {},
      id: this.$cookie.get("id")
    };
  },
  created() {
    this.userdetails = this.$store.state.userDetails;
    this.school = this.$store.state.school;
  },
  methods: {
    newteacher: function() {
      var teacher = {
        teachername: this.teacher.teachername,
        middlename: this.teacher.middlename,
        lname: this.teacher.lname,
        gender: this.teacher.gender,
        maritalstatus: this.teacher.maritalstatus,
        contactnumber: this.teacher.contactnumber,
        emailid: this.teacher.emailid,
        qualification: this.teacher.qualification,
        subjects: this.teacher.subjects,
        dateofbirth: this.teacher.dateofbirth.getTime(),
        dateofjoining: this.teacher.dateofjoining.getTime(),
        bloodgroup: this.teacher.bloodgroup,
        about: this.teacher.about,
        address: this.teacher.address,
        role: this.teacher.role,
        emailid: this.teacher.emailid,
        password: this.teacher.password,
        confirmpassword: this.teacher.confirmpassword
      };
      UserService.NewTeacher(teacher, this.id).then(response => {
        if (response.status == 200) {
          this.$router.push("/teachersModule/teachers");
          this.$alert('Teacher Registered successfully','Success','success');
        }
        //this.$parent.getTeachersList();
      });
    }
  }
};
</script>
