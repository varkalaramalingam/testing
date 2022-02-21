<template>
    <div class="page-layout">
        <div class="row">
            <div class="col-lg-6">
		        <div class="page-heading"><span v-html="$t('academics')"/></div>
            </div>
            <div class="col-lg-6 text-right">
                <router-link to="/admin/newacademic" tag="button" class="common-button">New Academic</router-link>
            </div>
        </div>
		<hr/>
	    <div class="syllabustables">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Academic ID</div>
                        <div class="divTableCell">Passing Year</div>
                        <div class="divTableCell">Syllabus Type</div>
                        <div class="divTableCell">Academic Year Starting</div>
                        <div class="divTableCell">Academic Year Ending</div>
                        <div class="divTableCell">status</div>
                        <div class="divTableCell">Edit</div>
                    </div>
                    <div class="divTableRowdata" v-for="acd in academics">
                        <div class="divTableCelldata">{{acd.id}}</div>
                        <div class="divTableCelldata">{{acd.passingyear}}</div>
                        <div class="divTableCelldata">{{acd.syllabustype}}</div>
                        <div class="divTableCelldata">{{getAcademicyearStartdate(acd.academicyearstarting)}}</div>
                        <div class="divTableCelldata">{{getAcademicyearEnddate(acd.academicyearending)}}</div>
                        <div class="divTableCelldata">{{acd.active}}</div>
                         <div class="divTableCelldata"><a data-toggle="modal" href="#editacademic" v-on:click="setacademicyear(acd)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                    </div>
                </div>
            </div>
        </div>
    <div class="modal fade" id="editacademic" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Edit Academic</h4>
                </div>
                <div class="modal-body">
         	        <form class="form-horizantal" name="addacademicform">
            	        <div class="row">
                            <div class="col-md-3">
                                <label>Passing Year</label>
                            </div>
                            <div class="col-md-9">
                                <input type="text" class="form-control" name="passingyear" placeholder="passingyear*" v-model="setacdeimyeardetailsforupdating.passingyear" ng-pattern="" required>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-3">
                                <label>Syllabus Type</label>
                            </div>
                            <div class="col-md-9">
                                <h4>{{setacdeimyeardetailsforupdating.syllabustype}}</h4>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-3">
                                <label>Academic Year start</label>
                            </div>
                            <div class="col-md-9">
                                <date-picker lang="en"  v-model="setAcademicyearstartingforUpdate"></date-picker>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-3">
                                <label>Academic Year Ending</label>
                            </div>
                            <div class="col-md-9">
                                <date-picker lang="en"  v-model="setAcademicyearendingforUpdate"></date-picker>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-3">
                                <label>Status</label>
                            </div>
                            <div class="col-md-9">
                                <!-- <input type="text" class="form-control" name="status" placeholder="status*" v-model="setacdeimyeardetailsforupdating.active" ng-pattern="" required> -->
                                <select class="form-control" v-model="setacdeimyeardetailsforupdating.active"  required>
                              <option value="1">Active</option>
                              <option value="0">InActive</option>
                           </select>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-lg-6 col-lg-offset-3 text-center">
                                <button id="btn-reset" data-dismiss="modal" class="btn button">Cancel</button>
                                <button id="btn-Register" type="submit" name="submit"  v-on:click.prevent="updateacademicyear()" class="btn button" ng-disabled="creategradeform.$invalid">Submit</button>
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
var count=0;
export default{
    components: { DatePicker },
    props:['school','userdetails'],
    data(){
        return{
            academics:[],
            setacdeimyeardetailsforupdating:{},
            setAcademicyearstartingforUpdate:'',
            setAcademicyearendingforUpdate:'',
            id:this.$cookie.get('id')
        }
    },
    created(){
        this.getAcademicears();
},
    methods:{
        getAcademicears: function(){
            UserService.AcademicYears(this.id).then((response)=>{
        this.academics=response.data.academics;
        console.log(this.academics);
    })
        },
        setacademicyear:function(acd){
            this.setacdeimyeardetailsforupdating=acd;
            this.setAcademicyearstartingforUpdate=new Date();
            this.setAcademicyearstartingforUpdate.setTime(acd.academicyearstarting);
            this.setAcademicyearendingforUpdate=new Date();
            this.setAcademicyearendingforUpdate.setTime(acd.academicyearending);
        },
        updateacademicyear:function(){
           var acdemicyeardetailsforUpdate={
               "id":this.setacdeimyeardetailsforupdating.id,
               "passingyear":this.setacdeimyeardetailsforupdating.passingyear,
               "active":this.setacdeimyeardetailsforupdating.active,
               "academicyearstartdt":this.setAcademicyearstartingforUpdate.getTime(),
               "academicyearenddt":this.setAcademicyearendingforUpdate.getTime(),
               "syllabusid":this.setacdeimyeardetailsforupdating.syllabusid
           }
           if(this.setAcademicyearstartingforUpdate > this.setAcademicyearendingforUpdate){
              alert("Academic end date should be greater than start date.")
              return;
           }else if(isNaN(acdemicyeardetailsforUpdate.passingyear) || (acdemicyeardetailsforUpdate.passingyear.toString().length != 4)){
                 alert("Please Enter Year as 4 digit number ")
                 return;
           }
          UserService.UpdateAcademiYear(acdemicyeardetailsforUpdate,this.id).then((response)=>{
              $('#editacademic').modal('hide');
              this.$alert('Academic Year' + response.data.message,'Success','success');
              this.getAcademicears();
          }).catch((error)=>{
              console.log(error.response.data)
              this.$alert('Academic Year' + error.response.data.message,'warning','warning');
          })

        },
        getAcademicyearStartdate:function(date){
            return moment(date).format('DD/MM/YYYY');
        },
        getAcademicyearEnddate:function(date){
            return moment(date).format('DD/MM/YYYY')
        }
    }
    }
</script>
<style scoped>
.reset-padding
{
padding: 0;
} 
.reset-margin{
 margin: 0;
}
.syllabustables{
width:100%;
}


</style>
