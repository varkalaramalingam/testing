<template>
   <div class="page-layout">
        <div class="row">
            <div class="col-lg-6">
                <div class="page-heading"><span v-html="$t('holidays')"/></div>
            </div>
            <div class="col-lg-6 text-right">
            <router-link to="/admin/newholiday" tag="button" class="common-button">New Holiday</router-link>
        </div>
        </div>
        <hr/>
        <div class="holidaytable">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">From Date</div>
                        <div class="divTableCell">To Date</div>
                        <div class="divTableCell">Occassion</div>
                        <div class="divTableCell">Edit</div>
                        <div class="divTableCell">Delete</div>
                    </div>
                    <div class="divTableRowdata" v-for="holiday in holidays">
                        <div class="divTableCelldata">{{getFromDate(holiday.fromdate)}}</div>
                        <div class="divTableCelldata">{{getToDate(holiday.todate)}}</div>
                        <div class="divTableCelldata">{{holiday.occassion}}</div>
                        <div class="divTableCelldata"><a data-toggle="modal" href="#editholidays" v-on:click="setHoliday(holiday)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                        <div class="divTableCelldata"><a data-toggle="modal" v-on:click.prevent="deleteholiday(holiday)"><i class="fa fa-trash fa-1x" aria-hidden="true"></i></a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editholidays" role="dialog" name="editholidaysmodal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit Holiday</h4>
                    </div>
                <div class="modal-body">
                    <form class="form-horizantal" name="editholidaysmodal">
                        <div class="leftside-form">
                            <div class="row">
                                <div class="col-md-4">
                                <label>From Date</label>
                            </div>
                            <div class="col-md-8 ">
                                <date-picker lang="en" v-model="setfromdate"></date-picker>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-4">
                                <label>To Date</label>
                            </div>
                            <div class="col-md-8 ">
                                <date-picker lang="en" v-model="settodate"></date-picker>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="class">Occassion</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" name="occassion" placeholder="occassion*" v-model="holiday.occassion" required>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-lg-6 col-lg-offset-3 text-center">
                                <button id="btn-reset" data-dismiss="modal" class="btn button">Cancel</button>
                                <button id="btn-post" type="post" name="post" v-on:click.prevent="editholiday" class="btn button">Update</button>
                            </div>
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
import DatePicker from 'vue2-datepicker';
import UserService from '../../../../services/userService.js';
import moment from 'moment'
export default{
    components: { DatePicker },
    props:['school','userdetails'],
    data(){
        return{
            holiday:{},
            holidays:[],
            setfromdate:'',
            settodate:'',
            id:this.$cookie.get('id')
        }
    },
    created(){
        UserService.Holidays(this.id).then((response)=>{
            this.holidays=response.data;
        }).catch((error)=>{
            console.log(error.response.data)
        })
    },
    methods:{
        deleteholiday:function(holiday){
            var holidayid={
                "id":holiday.id
            }
            UserService.DeleteHoliday(holidayid,this.id).then((response)=>{
                if(response.status==200){
                    UserService.Holidays(this.id).then((response)=>{
                        this.holidays=response.data;
                    })
                }
            }).catch((error)=>{
                console.log(error.response.data);
            })
        },
        setHoliday:function(holiday){
            this.holiday=holiday;
            this.setfromdate=new Date();
            this.setfromdate.setTime(holiday.fromdate);
            this.settodate=new Date();
            this.settodate.setTime(holiday.todate);
        },
        editholiday:function(){
            var editholiday={
                "id":this.holiday.id,
                "fromdate":this.setfromdate.getTime(),
                "todate":this.settodate.getTime(),
                "occassion":this.holiday.occassion
            }
            UserService.EditHoliday(editholiday,this.id).then((response)=>{
                $('#editholidays').modal('hide');
            }).catch((error)=>{
                console.log(error.response.data)
            })
        },
         getFromDate:function(date){
            return moment(date).format('DD/MM/YYYY');
        },
        getToDate:function(date){
            return moment(date).format('DD/MM/YYYY')
        }
    }

}
</script>
<style>
.holidaytable{
width:100%;
}

<style scoped>
.reset-padding
{
padding: 0;
} 
.reset-margin{
 margin: 0;
}

</style>
