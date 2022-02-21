<template>
<div class="page-layout">
            <div class="row">
            <div class="col-lg-6">
                <div class="page-heading"><span v-html="$t('periods')"/></div>
            </div>
         <div class="col-lg-6 text-right">
            <router-link to="/admin/newperiods" tag="button" class="common-button">New Timings</router-link>
        </div>
        </div>
        <hr/>
            <div class="periodtable">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Period Number</div>
                        <div class="divTableCell">Period From</div>
                        <div class="divTableCell">Period To</div>
                        <div class="divTableCell">PeriodtypeId</div>
                        <div class="divTableCell">Edit</div>
                        <div class="divTableCell">Delete</div>
                    </div>
                    <div class="divTableRowdata" v-for="periodslist in periods">
                        <div class="divTableCelldata">{{periodslist.period_number}}</div>
                        <div class="divTableCelldata">{{GetFromTime(periodslist.periodfrom)}}</div>
                        <div class="divTableCelldata">{{GetFromTime(periodslist.periodto)}}</div>
                         <div class="divTableCelldata">{{periodslist.period_type_id}}</div>
                        <div class="divTableCelldata"><a data-toggle="modal" href="#editholidays"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                        <div class="divTableCelldata"><a data-toggle="modal"><i class="fa fa-trash fa-1x" aria-hidden="true"></i></a></div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>
<script>
import UserService from '../../../../services/userService.js';
export default{
 props:['school','userdetails'],
 data(){
     return{
         periods:[],
         id:this.$cookie.get('id')
    }
 },
    created(){
        UserService.GetperiodsList(this.id).then((response)=>{
            this.periods=response.data;
            console.log(response);
        })
    },
      methods:{
        GetFromTime:function(time){
            if(time>720){
                var temp = time-720;
            return (temp-(temp%60))/60+":"+(temp%60)+" PM";
            }
            else{
            return (time-(time%60))/60+":"+(time%60)+" AM"; 
            }
        },
    }
}


</script>
<style>
.periodtable{
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

