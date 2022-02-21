<template>
<div>
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="PeriodPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="page-heading">
                          <button class="close" data-dismiss="modal" >&times;</button>
                        <h4><span v-html="$t('period_types')"/></h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
             </div>
                <div class="modal-body">
                    <div class="row">
                                <div class="col-md-4">
                                    <label>Name</label>
                                </div>
                                <div class="col-md-4">
                             <input type="text" class="form-control" name="name" placeholder="name*" v-model="periodtype.name" required>
                                </div>
                            </div>
                            <br/>
                             <div class="row">
                                <div class="col-md-4">
                                    <label>No.Of periods</label>
                                </div>
                                <div class="col-md-4">
                             <input type="text" class="form-control" name="noofperiods" placeholder="number of periods*" v-model="periodtype.numberofperiods" required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>From Date</label>
                                </div>
                                <div class="col-md-8">
                                <vue-timepicker format="hh:mm a" v-model="fromtime"></vue-timepicker>
                                </div>
                            </div>
                            <br/>
                              <div class="row">
                                <div class="col-md-4">
                                    <label>To Date</label>
                                </div>
                                <div class="col-md-8">
                                <vue-timepicker format="hh:mm a" v-model="totime"></vue-timepicker>
                               
                                </div>
                            </div>
                            <br/>

                          

                </div>
           <!-- <div class="panel createholidaypanel col-lg-10 col-lg-offset-" >
           <div class="panel-body">
                <form class="form-horizantal" name="newholidayform">
                    <div class="col-md-12">
                        <div class="leftside-form">
                          <div class="row">
                                <div class="col-md-4">
                                    <label>Name</label>
                                </div>
                                <div class="col-md-8">
                             <input type="text" class="form-control" name="name" placeholder="name*" v-model="periodtype.name" required>
                                </div>
                            </div>
                            <br/>
                             <div class="row">
                                <div class="col-md-4">
                                    <label>No.Of periods</label>
                                </div>
                                <div class="col-md-8">
                             <input type="text" class="form-control" name="noofperiods" placeholder="number of periods*" v-model="periodtype.numberofperiods" required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>From Date</label>
                                </div>
                                <div class="col-md-8">
                                <vue-timepicker format="hh:mm a" v-model="fromtime"></vue-timepicker>
                                </div>
                            </div>
                            <br/>
                              <div class="row">
                                <div class="col-md-4">
                                    <label>To Date</label>
                                </div>
                                <div class="col-md-8">
                                <vue-timepicker format="hh:mm a" v-model="totime"></vue-timepicker>
                               
                                </div>
                            </div>
                            <br/>-->

                            <div class="modal-footer">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <router-link to="/admin/periodtypes" ><button id="btn-reset" type="reset"  data-dismiss="modal" class="btn button" >Cancel</button> </router-link>
                                    <button id="btn-post" type="post" name="post" v-on:click.prevent="newperiodtype" class="btn button" data-dismiss="modal" >Save</button>
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
            periodtype:{},
            id:this.$cookie.get('id')  
        }
    },
    methods:{
        newperiodtype:function(){
            var periodtype={
                "fromtime":this.fromtime,
                "totime":this.totime,
                "name":this.periodtype.name,
                "numberofperiods":this.periodtype.numberofperiods
            }
            console.log(periodtype);
           UserService.NewPeriodType(periodtype,this.id).then((response)=>{
                if(response.status==200){
                      this.$router.push('/admin/periodtypes');
                }
            }).catch((error)=>{
                console.log((error.response.data));
            })

        }
 }
}
</script>
<style>
.button{
background-color:#0b366f;
}
.btn{
    border-radius:0px;
    color:#fff
}
label{
    float:right;
}
.form-control{
    width: 83%;
    
}

</style>
