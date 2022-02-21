<template>
<div class="page-layout">
     
<div class="row">
            <div class="col-lg-6">
                 <div class="page-heading"><span v-html="$t('period_types')"/></div>
            </div>
         <div class="col-lg-6 text-right">
            <!--<router-link to="/admin/newperiodtype" tag="button" class="common-button">New Timing</router-link>-->
            <button class="common-button pull-right" style="width: 180px;" v-on:click="popup('PeriodPopup',open);">New PeriodType</button>
        </div>
        </div>
        <hr/>
        <div>
            <periods-new> </periods-new>
        </div>
            <div class="periodtable">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">From Time</div>
                        <div class="divTableCell">To Time</div>
                        <div class="divTableCell">Name</div>
                        <div class="divTableCell">Number Of Periods</div>
                        <div class="divTableCell">Edit</div>
                        <div class="divTableCell">Delete</div>
                    </div>
                    <div class="divTableRowdata" v-for="periodtype in periods">
                        <div class="divTableCelldata">{{GetFromTime(periodtype.fromtime)}}</div>
                        <div class="divTableCelldata">{{GetFromTime(periodtype.totime)}}</div>
                        <div class="divTableCelldata">{{periodtype.name}}</div>
                         <div class="divTableCelldata">{{periodtype.numberofperiods}}</div>
                        <div class="divTableCelldata"><a data-toggle="modal" href="#editholidays" ><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                        <div class="divTableCelldata"><a data-toggle="modal" ><i class="fa fa-trash fa-1x" aria-hidden="true"></i></a></div>
                    </div>
                </div>
            </div>
        </div>
</div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import moment from 'moment'
import PeriodsNew from './newperiodtype_template.vue';
export default{
    components:{
        PeriodsNew
    },
 props:['school','userdetails'],
 data(){
     return{
         periods:[],
         id:this.$cookie.get('id')
    }
 },
    created(){
        UserService.Getperiodtypes(this.id).then((response)=>{
            this.periods=response.data;
        }).catch((error)=>{
            console.log(error.response.data)
        })
    },
    methods:{
         popup:function (PeriodPopup,action) {
            $('#' + PeriodPopup).modal(action);
        },
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

<style scoped>
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

