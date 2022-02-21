<template>
<div class="container" style="min-height: 100%;">
   <div id="signupbox" style="margin-top:9.8%;margin-bottom:25%;" class="mainbox  col-md-10 col-md-offset-1">
     <p>*Please provide the following details below</p>
      <div class="panel registerpanel" >
         <div class="panel-heading">
              <h4 style="padding-left:1.6%"><u>School information</u></h4>
         </div>
         <div class="panel-body" >
            <form id="form" class="form-horizontal" role="form" name="registrationform" method="POST">
           
               <div class="col-md-6 register-middleBorder">
                  <div class="left-side-form" >
                     <div class="row">
                        <div class="col-md-4" control-label>
                           <label for="Name of the School" >*School Name</label>
                        </div>
                        <div class="col-md-8 ">
                           <input type="text" class="form-control" id="" 
                           v-validate="'required|'" :class="{'input': true, 'is-danger': errors.has('schoolname') }" 
                           name="schoolname" 
                              placeholder="Name of the School" v-model="user.schoolname"
                              ng-pattern="/[aA-zZ\s]$/" required>
                               <span v-show="errors.has('schoolname')" class=" is-danger">{{ errors.first('schoolname') }}</span>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4" control-label>
                           <label for="Name of Person" >Contact Name</label>
                        </div>
                        <div class="col-md-8 ">
                           <input type="text" class="form-control" 
                           name="personname" 
                              placeholder="Name of the Contact Person" v-model="user.contactname" ng-pattern="/[aA-zZ\s]$/" required>
                        </div>
                     </div>
                     <br>
                      <div class="row">
                        <div class="col-md-4" control-label>
                           <label for="Number of the Person" >*Contact Number</label>
                        </div>
                        <div class="col-md-8 ">
                           <input type="text" class="form-control" 
                            v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('contact') }" 
                           name="contact" 
                              placeholder="Contact Number" v-model="user.contactnumber" ng-pattern="/^[0-9]{10,10}$/" required>
                           <span v-show="errors.has('contact')" class=" is-danger">{{ errors.first('contact') }}</span>
                        </div>
                     </div>
                     <br><br><br>
                  </div>
               </div>
               <div class="col-md-6">
                  <div class="right-side-form" >
                     <div class="row">
                        <div class="col-md-4" control-label>
                           <label for="Name of the Street" >*Street </label>
                        </div>
                        <div class="col-md-8 ">
                           <input type="text" class="form-control" 
                           <input type="text" class="form-control" name="street"  
                              placeholder="Enter the Name of the Street" v-model="user.street" ng-pattern="/[aA0-zZ9\.\-\_\s]$/" required>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4" control-label>
                           <label for="Name of the City" >City </label>
                        </div>
                        <div class="col-md-8 ">
                           <input type="text" class="form-control" 
                             v-validate="'required|'" :class="{'input': true, 'is-danger': errors.has('city') }" 
                           name="city" 
                              placeholder="Enter the Name of the City" v-model="user.city" ng-pattern="/[aA0-zZ9\.\-\_\s]$/" required>
                                  <span v-show="errors.has('city')" class=" is-danger">{{ errors.first('city') }}</span>
                         
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4" control-label>
                           <label for="Year of Establishment" >Year of Establishment</label>
                        </div>
                        <div class="col-md-8 ">
                           <input type="date" class="form-control" name="YOE" placeholder="DD/MM/YYYY" ng-pattern="" v-model="user.dateofestablishment">
                         
                        </div>
                     </div>
                     <br>
                      <hr class="logintopline"/>
                  </div>
               </div>
               
               <div class="panel-heading logininfohead">
          <h4><u>Login details</u></h4>
          </div>
                <div class="col-md-6">
                  <div class="left-side-form" >
                         <div class="row">
                        <div class="col-md-4 " control-label >
                           <label for="EmailId" >*E-mail Id</label>
                        </div>
                        <div class="col-md-8">
                           <input type="email" class="form-control" 
                           v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" 
                           name="email" placeholder="Enter Email Id" v-model="user.emailid"  required>
                             <span v-show="errors.has('email')" class=" is-danger">{{ errors.first('email') }}</span>
                        </div>
                     </div>
                     <br>
                         <div class="row">
                        <div class="col-md-4 " control-label >
                           <label for="PassWord" >*Password</label>
                        </div>
                        <div class="col-md-8">
                           <input type="password" class="form-control" 
                            v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('password') }" 
                           name="password"
                              placeholder="Password" v-model="user.password" required>
                              <span v-show="errors.has('password')" class=" is-danger">{{ errors.first('password') }}</span>
                        </div>
                     </div>
                     <br>
                        <div class="row">
                        <div class="col-md-4 " control-label >
                           <label for="Confirm" >*Confirm Password</label>
                        </div>
                        <div class="col-md-8">
                           <input type="password" class="form-control" 
                             v-validate="'required|min:6'" :class="{'input': true, 'is-danger': errors.has('confirmpassword') }" 
                           name="confirmpassword" 
                              placeholder="Confirm Password" v-model="user.confirmpassword" required>
                               <span v-show="errors.has('confirmpassword')" class="is-danger">{{ errors.first('confirmpassword') }}</span>
                        </div>
                     </div>
                     </div>
                    
                     </div>
                            <div class="row">
                        <div class="text-center">
                              <div class="col-md-4 col-md-offset-4">
                                     <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="newuser" class="btn button btn-block" ng-disabled="registrationform.$invalid"> 
                                    Register</button>
                              </div>
                              
                        </div>
                  </div>
            </form>
         </div>
    <br/>
                  </div>
               </div>
      </div>
   </div>
</div>
</div>
</template>
<script>
import UserService from '../../services/userService.js';
export default{
    name:'register',
      data(){
        return{
            user:{},
        }
    },
    methods:{
       newuser:function(){
        console.log(this.user);
            var user={
                "schoolname":this.user.schoolname,
                "contactname":this.user.contactname,
                "password":this.user.password,
                "confirmpassword":this.user.confirmpassword,
                "emailid": this.user.emailid,
                "schoolcode": this.user.schoolcode,
                "contactnumber":this.user.contactnumber,
                "street": this.user.street,
                "city":this.user.city,
                "dateofestablishment":this.user.dateofestablishment
            }
            console.log(user);
                 UserService.NewUser(user).then((response)=>{
                console.log(response);
                if(response.status==202){
                    this.$router.push('/successfullyregistred');
                }
            })
       }
    }
}
</script>

<style scoped>
.registerpanel .panel-heading{
    color:#f3674c;

}
.registerpanel{
    color: #000;
     -webkit-box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2),0 3px 10px 0 rgba(0,0,0,0.3);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.2),0 3px 10px 0 rgba(0,0,0,0.3);
    
}
 .panel-title {
        font-size: 24px;
    }
.register-middleBorder{
  border-right: 1px solid silver;
  height:150px;
}
.registerpanel .panel-heading {
    color: #0f3674c;
}
.button {
    background-color: #f3674c;
    background-image: none;
    border-color: #f3674c;
    color: white;
}
.is-danger{
    color:coral;
}
.logininfo{
    text-align:right;
}
.logininfohead{
    margin-top:-3%;
}
.logintopline{
    width:76%;
    margin-left:-38%;
        border-top: 2px solid #eee;
        margin-top:0px;
}
</style>
