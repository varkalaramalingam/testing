<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head">Bus Routes</h3>
            <hr>
        </div>
        <div class="panel panel-info  createclasspanel col-lg-6 col-lg-offset-3" >
            <div class="panel-body">
                <form name="newrouteform" >
                    <div class="row">
                        <div class="col-md-4">
                            <label>Bus Name</label>
                        </div>
                        <div class="col-md-8 ">
                            <select class="form-control form-input" v-model="staff.busid" v-on:change="getRoutes(staff.busid)">
                                <option value="" disabled selected>Select your option</option>
                                <option v-for="bus in buses" v-bind:value="bus.id">{{bus.busname}}</option>
                            </select>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-4">
                            <label for="class">Route Name</label>
                        </div>
                        <div class="col-md-8 ">
                            <select class="form-control form-input" v-model="staff.routeid">
                                <option value="" disabled selected>Select your option</option>
                                <option v-for="route in routesListByBusd" v-bind:value="route.id">{{route.routename}}</option>
                            </select>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Staff Type</label>
                        </div>
                        <div class="col-md-8">
                            <label><input type="radio" name="staffType" value="DRIVER" v-model="staff.staffType" v-on:click="getStaffDataByStaffType('DRIVER')" >Driver</label>
                            <label><input type="radio" name="staffType" value="ATTENDER" v-model="staff.staffType" v-on:click="getStaffDataByStaffType('ATTENDER')">Attender</label>
                        </div>
                    </div><br>
                    <div class="row">
                        <div class="col-md-4">
                            <label for="class">Staff Name</label>
                        </div>
                        <div class="col-md-8 ">
                            <select class="form-control form-input" v-model="staff.staffid">
                                <option value="" disabled selected>Select your option</option>
                                <option v-for="staff in roleBasedStaffList" v-bind:value="staff.id">{{staff.firstname}}</option>
                            </select>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-lg-6 col-lg-offset-3 text-center">
                            <button id="btn-reset" type="reset" class="btn resetbutton"> Reset</button>
                            <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="addStaffToBus" class="btn submitbutton">Submit</button>
                        </div>
                   </div>
                </form>
            </div>
        </div>
         <!-- confirmation pop up start  -->
        <div class="modal fade" id="alertPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top:80px">
                <div class="modal-dialog" style="width:472px">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4>{{alertType}}</h4>
                        </div> 
                        <div class="modal-body" style="height:75px;">
                        {{alertMessage}}
                        </div>     
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal" >OK</button>
                        </div>                     
                    </div>
                </div>
            </div>
        <!-- confirmation pop up end  -->
         <!-- confirmation  pop up for success message start -->
            <div class="modal fade" id="successmsg" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="padding-top:80px">
                <div class="modal-dialog" style="width:472px">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4>{{alertType}}</h4>
                        </div> 
                        <div class="modal-body" style="height:75px;">
                        {{alertMessage}}
                        </div>     
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" data-dismiss="modal" v-on:click.prevent="gotoNextPage()" >OK</button>
                        </div>                     
                    </div>
                </div>
            </div>
        <!-- confirmation pop up for success message end  -->
    </div>
</template>
<script>
import Multiselect from 'vue-multiselect';
import UserService from '../../../../services/userService.js';
export default{
    components: {'multiselect':Multiselect},
    data(){
        return{
            staff:{},
            id:this.$cookie.get('id'),
            buses:[],
            stopnames:[],
            routesList:[],
            routesListByBusd:[],
            staffList:[],
            roleBasedStaffList:[],
            busSummery:[],
            alertMessage: "",
            alertType:"",
            open: 'show',
            close: 'hide'

        }
    },
    created(){
        UserService.getAllTransportDetails(this.id).then((response)=>{
            this.buses=response.data.buses;
            this.busSummery=response.data.BusSummery;
            this.routesList=response.data.routes;
            this.staffList=response.data.staff;
        })
    
    },
    methods:{
        customLabel (option) {
            return `${option.stopname}`
        },
        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        getRoutes:function(busid){
            this.routesListByBusd=[];
            let routeid=[];
            let datasize=0;
            for(let i=0;i<this.busSummery.length;i++){
                if(this.busSummery[i].busid==busid){
                    routeid[datasize]=this.busSummery[i].routeid;
                    datasize++;
                }
            }
            let routeidSize=0;
            for(let j=0;j<routeid.length;j++){
                for(let k=0;k<this.routesList.length;k++){
                    if(routeid[j]==this.routesList[k].id){
                        this.routesListByBusd[routeidSize]=this.routesList[k];
                        routeidSize++;
                    }
                }
            }
        },
        getStaffDataByStaffType:function(staffType){
            let dataSize=0;
            for(let i=0;i<this.staffList.length;i++){
                if(staffType===this.staffList[i].role){ 
                    this.roleBasedStaffList[dataSize]=this.staffList[i];
                    dataSize++;
                }
            }
        },
        addStaffToBus:function(){
            if(this.staff.staffid==null){
                this.alertType = "select staff";
                this.alertMessage = "select staff";
                this.popUp('alertPopUp',this.open);
            }else if(this.staff.busid==null){
                this.alertType = "select bus";
                this.alertMessage = "select bus";
                this.popUp('alertPopUp',this.open);
            }else if(this.staff.routeid==null){
                this.alertType = "select route";
                this.alertMessage = "select route";
                this.popUp('alertPopUp',this.open);
            }else{
                let addStaff={
                    staffid:this.staff.staffid,
                    busid:this.staff.busid,
                    routeid:this.staff.routeid
                }
             UserService.addStaffToBus(this.id,addStaff).then((response)=>{
                console.log(response.data);
                if(response.data.status==200){
                    this.alertType = response.data.message;
                    this.alertMessage = response.data.description;
                    this.popUp('successmsg',this.open);    
                }else{
                    this.alertType = response.data.message;
                    this.alertMessage = response.data.description;
                    this.popUp('alertPopUp',this.open);
                }
            })
            }
        },
        gotoNextPage:function(){
            this.$router.push('/transport/busroutestransport');
        }
    }
}
</script>
<style>
 .resetbutton,.resetbutton:hover{
    background-color: #039be5;
    background-image: none;
    border-color: #039be5;
    border-radius:0px;
    color:white;
    }
.submitbutton,.submitbutton:hover{
    background-color: #039be5;
    background-image: none;
    border-color: #039be5;
    border-radius:0px;
    color:white;
    }
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>