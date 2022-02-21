<template>
<div>
  <div class="row reset-padding reset-margin">
            <div class="col-lg-12 text-left">
                <h3 class="student-head">New Period</h3>
                <hr>
            </div>
        </div>
        <div class="panel createholidaypanel col-lg-6 col-lg-offset-3" >
           <div class="panel-body">
                <form class="form-horizantal" name="newholidayform">
                    <div class="col-md-12">
                        <div class="leftside-form">
                           <div class="row">
                           <div class="col-md-4">
                              <label>PeriodtypeId</label>
                           </div>
                           <div class="col-md-8">
                              <select class="form-control form-input" v-model="periods.id" paceholder="Select">
                                 <option value="" disabled selected>Select your option</option>
                                 <option v-for="period in periodtypes" v-bind:value="period.id">{{period.name}}</option>

                              </select>
                           </div>
                        </div>
                        <br>
                          <div class="row">
                                <div class="col-md-4">
                                    <label>Period Number</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="periodnumber" placeholder="period number*" v-model="periods.periodnumber" required>
                                </div>
                          </div>
                          <br>
                             <div class="row">
                                <div class="col-md-4">
                                    <label>Period From</label>
                                </div>
                                <div class="col-md-8">
                                <vue-timepicker format="hh:mm a" v-model="fromtime"></vue-timepicker>
                                </div>
                          </div>
                          <br>
                           <div class="row">
                                <div class="col-md-4">
                                    <label>Period To</label>
                                </div>
                                <div class="col-md-8">
                                <vue-timepicker format="hh:mm a" v-model="totime"></vue-timepicker>
                                </div>
                          </div>
                        
                        <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                     <router-link to="/admin/periods"> <button id="btn-reset" type="reset" class="btn button">Cancel</button> </router-link>
                                    <button id="btn-post" type="post" name="post" v-on:click.prevent="newperiod" class="btn button" >Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
</div>        
</template>
<script>
import VueTimepicker from 'vue2-timepicker';
import UserService from '../../../../services/userService.js';

export default{
    components: { VueTimepicker },
    props:['school','userdetails'],
    data(){
        return{
            fromtime: {
                hh: "",
                mm: "",
                a: ''
            },
            totime:{
                hh: "",
                mm: "",
                a: '' 
            },
            periods:[],
            periodtypes:[],
            id:this.$cookie.get('id')
        }
    },
    created(){
        UserService.Getperiodtypes(this.id).then((response)=>{
            this.periodtypes=response.data;
            
        })
    },
    methods:{
        newperiod:function(){
            var periods={
                "period_type_id":this.periods.id,
                "period_number":this.periods.periodnumber,
                "periodfrom":this.fromtime,
                "periodto":this.totime
            }
              console.log(periods);
            UserService.NewPeriod(periods,this.id).then((response)=>{
                if(response.status==200){
                      this.$router.push('/admin/periods');
                }
            })

        }
    }
}
</script>
<style scoped>
</style>
