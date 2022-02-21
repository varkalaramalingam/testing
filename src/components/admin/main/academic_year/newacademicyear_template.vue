<template>
   <div>
      <div class="">
         <div class="row reset-padding reset-margin">
            <div class="col-lg-12 text-left">
               <h3 class="student-head">New Academic</h3>
               <hr>
            </div>
         </div>
         <div class="panel col-lg-6 col-lg-offset-3" >
            <div class="panel-body">
               <form class="form-horizantal" name="addacademicform">
                  <div class="col-lg-12">
                     <div class="row">
                        <div class="col-md-3">
                           <label>Passing Year</label>
                        </div>
                        <div class="col-md-9">
                           <input type="text" class="form-control" name="passingyear" placeholder="YYYY*" v-model="academic.passingyear"  required>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-3">
                           <label>Syllabus</label>
                        </div>
                        <div class="col-md-9">
                           <!-- <input type="text" class="form-control form-input"   placeholder="syllabustype*" v-model="syllabus.syllabustype" required> -->
                           <select class="form-control form-input" v-model="academic.syllabusid" paceholder="Select">
                              <option value="" disabled selected>Select your option</option>
                              <option v-for="board in boards" v-bind:value="board.id" :key="board.id">{{board.syllabustype}}</option>
                           </select>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-3">
                           <label>Academic Year start</label>
                        </div>
                        <div class="col-md-9">
                            <date-picker lang="en"  v-model="academic.acdemicyearstarting"></date-picker>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-3">
                           <label>Academic Year Ending</label>
                        </div>
                        <div class="col-md-9">
                            <date-picker lang="en"  v-model="academic.academicyearending"></date-picker>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-3">
                           <label>Status</label>
                        </div>
                        <div class="col-md-9">
                           <!-- <input type="text" class="form-control" name="status" placeholder="status*" v-model="academic.active"  required> -->
                           <select class="form-control" v-model="academic.active"  required>
                              <option value="1">Active</option>
                              <option value="0">InActive</option>
                           </select>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-lg-6 col-lg-offset-3 text-center">
                           <button id="btn-reset" type="reset" class="btn button"> Reset</button>
                           <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="newacademicyear()"  class="btn button"> 
                           Submit</button>
                        </div>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   </div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import UserService from '../../../../services/userService.js';
export default {
components: { DatePicker },
props:['school','userdetails'],
  data() {
    return {
        academic:{
            passingyear:'',
            acdemicyearstarting:'',
            academicyearending:'',
            active:'',
            syllabusid:''
            },
            id:this.$cookie.get('id'),
            boards:[]
        }
    },
    created(){
       UserService.AcademicYears(this.id).then((response)=>{
        this.boards=response.data.boards;
        console.log(this.boards);
      })
    },
    methods:{
        newacademicyear:function(){
            var academicstart=this.academic.acdemicyearstarting.getTime();
            var academicend=this.academic.academicyearending.getTime();
            
            var addacademicyear={
                "passingyear":this.academic.passingyear,
                "academicyearstartdt":academicstart,
                "academicyearenddt":academicend,
                "active":this.academic.active,
                "syllabusid":this.academic.syllabusid
            }
            if(this.academic.acdemicyearstarting > this.academic.academicyearending){
              alert("Academic end date should be greater than start date.")
              return;
           }else if(isNaN(addacademicyear.passingyear) || (addacademicyear.passingyear.toString().length != 4)){
                 alert("Please Enter Year as 4 digit number ")
                 return;
           }
            UserService.AddAcademicyear(addacademicyear,this.id).then((response)=>{
               if(response.status==200){
               this.$router.push('/admin/academics');
               this.$alert('Academic Year Added successfully','Success','success')                
               }
            }).catch((error)=>{
              console.log(error.response.data)
              this.$alert('Academic Year' + error.response.data.message,'warning','warning');
            })
        },
    }
}
</script>
<style>
.mx-datepicker{
    min-width:505px
}
button{
background-color:#039be5;
}
.btn{
    border-radius:0px;
    color:#fff
}
.btn:hover, .btn:focus {
    color: #fff;
    text-decoration: none;
}
</style>