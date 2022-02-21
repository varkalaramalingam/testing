<template>
   <div>
   <div class="row reset-padding reset-margin">
      <div class="col-lg-12 text-left">
         <h3 class="student-head">New Staff</h3>
         <hr>
      </div>
   </div>
   <div class="row reset-padding reset-margin">
      <div class="col-md-12">
         <div class="panel  addteacherpanel">
            <div class="panel-body teacherpanel">
               <form class="form-horizantal" name="addteacherform">
                  <h4><u><b>Staff Details</b></u></h4>
                  <div class="row">
                     <div class="col-md-6">
                        <div class="leftside-form">
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">First Name</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="firstteachername" placeholder="FirstName*" v-model="user.firstname" ng-pattern="/[aA-zZ\s]$/" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Middle Name</label>
                              </div>
                              <div class="col-md-8 ">
                                 <input type="text" class="form-control form-input"  name="middlename" placeholder="Middlename" v-model="user.middlename" ng-pattern="/[aA-zZ\s]$/">
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">Last Name</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="lastname" placeholder="LastName*" v-model="user.lastname" ng-pattern="/[aA-zZ\s]$/" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Gender</label>
                              </div>
                              <div class="col-md-8">
                                 <label><input type="radio" value="female" name="gender" v-model="user.gender">Female</label>
                                 <label><input type="radio" value="male" name="gender" v-model="user.gender">Male</label>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Marital Status</label>
                              </div>
                              <div class="col-md-8">
                                 <label><input type="radio" value="married" name="maritalstatus" v-model="user.maritalstatus">  Married</label>
                                 <label><input type="radio" value="unmarried" name="maritalstatus" v-model="user.maritalstatus">  Unmarried</label>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">Contact Number</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="contactnumber" placeholder="Contact Number*" v-model="user.contactnumber" ng-pattern="/^[0-9]{10,10}$/" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">E-mail Id</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="emailid" placeholder="example@gmail.com*" v-model="user.emailid" ng-pattern="" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">Qualification</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="qualification" placeholder="Ex:Ph.d,MBA,M.Tech*" v-model="user.qualification" ng-pattern="" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">Experience</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="experience" placeholder="Experience in years" v-model="user.experience" ng-pattern="" required>
                              </div>
                           </div>
                           <br>
                        </div>
                     </div>
                     <div class="col-md-6">
                        <div class="right-side-form">
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Date Of Birth</label>
                              </div>
                                <div class="col-md-8 ">
                                    <date-picker lang="en" v-model="user.dateofbirth"></date-picker>
                                </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Date of Joining</label>
                              </div>
                                <div class="col-md-8 ">
                                    <date-picker lang="en" v-model="user.dateofjoining"></date-picker>
                                </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">Blood Group</label>
                              </div>
                              <div class="col-md-8">
                                 <input type="text" class="form-control" name="bloodgroup" placeholder="O+,O-,B+,B-,A+,A- *" v-model="user.bloodgroup" ng-pattern="" required>
                              </div>
                           </div>
                           <br>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label for="class">Address</label>
                              </div>
                              <div class="col-md-8">
                                 <textarea name="address" class="form-control" rows="4" cols="50" placeholder="Type Your Address Here... *"  v-model="user.address" required></textarea>
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
                                 <select class="form-control" v-model="user.userrole">
                                    <option v-for="role in roles" v-if="role.id == 2 || role.id==6 || role.id==7 || role.id==9 " :value="role.role">{{role.role}}</option>
                                 </select>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>E-mail</label>
                              </div>
                              <div class="col-md-8 ">
                                 <input type="email" class="form-control form-input"   placeholder="xxxxxxxxx@yyyy.com*" v-model="user.emailid" ng-pattern="" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Password</label>
                              </div>
                              <div class="col-md-8 ">
                                 <input type="password" class="form-control form-input"  placeholder="password*" v-model="user.password" ng-pattern="" required>
                              </div>
                           </div>
                           <br>
                           <div class="row">
                              <div class="col-md-4">
                                 <label>Confirm Password</label>
                              </div>
                              <div class="col-md-8 ">
                                 <input type="password" name="confirm_password" class="form-control form-input"  placeholder="confirmpassword*" v-model="user.confirmpassword" ng-pattern="" required password-match="vm.user.password">
                                
                                
                              </div>
                           </div>
                           <br>
                        </div>
                     </div>
                    </div>
                     <div class="row">
                        <div class="col-lg-6 col-lg-offset-3 text-center">
                           <button id="btn-reset" type="reset" class="btn  button"> Reset</button>
                           <button id="btn-Register" type="button" name="submit"  class="btn button" v-on:click.prevent="newuser()" > 
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
import UserService from "../../../../services/userService";
export default {
  components: { DatePicker },
  //props:['userdetails','school'],
  data() {
    return {
      userdetails: this.$store.state.userDetails,
      school: this.$store.state.school,
      user: {},
      id: this.$cookie.get("id"),
      roles:[]
    };
  },
  created() {
    this.userdetails = this.$store.state.userDetails;
    this.school = this.$store.state.school;
    this.getRoles();
  },
  methods: {
     getRoles: function() {
        UserService.getRoles(this.id).then((response) => {
           this.roles = response.data
        })
     },
    newuser: function() {
      let user = {
        firstname: this.user.firstname,
        middlename: this.user.middlename,
        lastname: this.user.lastname,
        gender: this.user.gender,
        maritalstatus: this.user.maritalstatus,
        contactnumber: this.user.contactnumber,
        emailid: this.user.emailid,
        qualification: this.user.qualification,
        experience:this.user.experience,
        dateofbirth: this.user.dateofbirth.getTime(),
        dateofjoining: this.user.dateofjoining.getTime(),
        bloodgroup: this.user.bloodgroup,
        address: this.user.address,
        role: this.user.userrole,
        emailid: this.user.emailid,
        password: this.user.password,
        confirmpassword: this.user.confirmpassword
      };
      if(user.password !== user.confirmpassword){
         alert("Password Doesn't Match")
         return 
      } else if(user.role == null || user.role == undefined){
         alert("Role Should not be Empty")
         return
      } else if(user.emailid == null || user.emailid == undefined){
         alert("Emailid Should not be Empty")
         return
      }
      UserService.newUser(user, this.id).then(response => {
        if (response.status == 200) {
          this.$router.push("/admin/staff");
          this.$alert('User Registered successfully','Success','success');
        } else if(response.status == 400){
           alert("User Already Exists With this EmailId")
        }
        //this.$parent.getTeachersList();
      });
    }
  }
};
</script>