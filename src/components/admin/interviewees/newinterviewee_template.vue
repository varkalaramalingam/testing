<template>
    <div class="container">
        <div class="row reset-padding reset-margin">
            <div class="col-lg-12 text-left">
                 <div class="page-heading">New Interviewee</div>
                <hr>
            </div>
        </div>
        <div class="row reset-padding reset-margin">
            <div class="col-md-12">
                <div class="panel  addteacherpanel">
                    <div class="panel-body teacherpanel">
                        <form id="form" class="form-horizontal" role="form" name="registrationform" >
                            <h4><u><b>Interviewee Details</b></u></h4>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="left-side-form">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>First Name</label>
                                                </div>
                                                 <div class="col-md-8 ">
                                                    <input type="text" class="form-control form-input" placeholder="Firstname*" v-model="student.name" required>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Middle Name</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="text" class="form-control form-input"  placeholder="Middlename" v-model="student.middlename">
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Last Name</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="text" class="form-control form-input"  placeholder="Lastname*" v-model="student.lastname" required>
                                                </div>
                                            </div>
                                            <br>
                                            
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="right-side-form">
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
                                                    <label>Contact Number</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="text" class="form-control form-input" id="" name="contactnumber*" 
                                                        placeholder="Contact Number*" v-model="student.contactnumber"
                                                        required>
                                                </div>
                                            </div>
                                            <br>

                                    </div>
                                </div>
                                <br>        
                            </div>
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
                                                    <select class="form-control form-input" v-model="student.role">
                                                        <option v-bind:value="student.role" selected >INTERVIEWEE</option>
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
                                            <!-- <div class="row" v-show="alertshow">
                                                <p>{{alertmsg}}</p>
                                            </div> -->
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
                                    <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="newinterviewee" class="btn button"  >Submit</button>
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
                role: "INTERVIEWEE"
            },
            id:this.$cookie.get('id'),
            userdetails:this.$store.state.userDetails,
            school:this.$store.state.school,
            alertmsg:'',
            alertshow: false
        }
    },
    methods:{
        newinterviewee:function(){
            console.log(this.student);
            if (this.student.password == this.student.confirmpassword){
                var interviewee={
                    "name":this.student.name,
                    "middlename":this.student.middlename,
                    "lastname":this.student.lastname,
                    "gender":this.student.gender,
                    "contactnumber":this.student.contactnumber,
                    "role":this.student.role,
                    "emailid":this.student.emailid,
                    "password":this.student.password,
                    "confirmpassword":this.student.confirmpassword,
                }
                console.log(interviewee)
                UserService.NewInterviewee(interviewee,this.id).then((response)=>{
                console.log(response);
                if(response.status==200){
                    this.$router.push('/intervieweesModule/interviewees');
                    this.$alert('Interviewee Registered successfully','Success','success');
                    
                }
            })
            }
            else{
                // this.alertshow = true;
                // setInterval(this.alertmsg = "Passwords do not match", 2000)
                // this.alertshow = false;
            }
        }
    },
    created(){
    }
}
</script>
