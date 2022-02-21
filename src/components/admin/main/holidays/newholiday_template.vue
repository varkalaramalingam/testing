<template>
    <div>
        <div class="row reset-padding reset-margin">
            <div class="col-lg-12 text-left">
                <h3 class="student-head">New Holiday</h3>
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
                                    <label>From Date</label>
                                </div>
                                <div class="col-md-8">
                                    <date-picker lang="en" v-model="holiday.fromdate"></date-picker>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>To Date</label>
                                </div>
                                <div class="col-md-8">
                                    <date-picker lang="en" v-model="holiday.todate"></date-picker>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Occassion</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="occassion" placeholder="Occassion*" v-model="holiday.occassion" required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" type="reset" class="btn button"> Reset</button>
                                    <button id="btn-post" type="post" name="post" v-on:click.prevent="newholiday" class="btn button" >Post</button>
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
import DatePicker from 'vue2-datepicker';
import UserService from '../../../../services/userService.js';
export default{
    components: { DatePicker },
    props:['school','userdetails'],
    data(){
        return{
            holiday:{},
            id:this.$cookie.get('id')
        }
    },
    methods:{
        newholiday:function(){
            var holiday={
                "fromdate":this.holiday.fromdate.getTime(),
                "todate":this.holiday.todate.getTime(),
                "occassion":this.holiday.occassion
            }
            UserService.NewHoliday(holiday,this.id).then((response)=>{
                if(response.status==200){
                    this.$router.push('/admin/holidays');
                }
            })

        }
    }
}
</script>