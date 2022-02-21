<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head">Activate Bus</h3>
            <hr>
        </div>
        <div class="">
            <div class="col-md-12">
                <div class="panel panel-info addteacherpanel">
                    <div class="panel-body teacherpanel">
                         <div>
                             <div class="row">
                                <div class="col-md-2">
                                    <label>Bus Name *</label>
                                </div>
                                <div class="col-md-2">
                                    <select class="form-control form-input" v-model="activateBus.busnumber" v-on:change="getRouteList(activateBus.busnumber)" >
                                        <option value="" disabled selected>Select your option</option>
                                        <option v-for="bus in buses" v-bind:value="bus.busnumber">{{bus.busname}}</option>
                                    </select>
                                </div>
                                <!--  -->
                                <div class="col-md-2">
                                    <label>Route Name *</label>
                                </div>
                                <div class="col-md-2">
                                    <select class="form-control form-input" v-model="activateBus.routeDetails" v-on:change="getStaffList()">
                                        <option value="" disabled selected>Select your option</option>
                                        <option v-for="route in busRoutes" v-bind:value="route" >{{route.routename}}</option>
                                    </select>
                                </div><br><br><br><hr>  
                                <!--  -->
                                <div class="col-md-2">
                                    <label>Bus Driver *</label>
                                </div>
                                <div class="col-md-2 ">
                                    <select class="form-control form-input" v-model="activateBus.drivername" >
                                        <option value="" disabled selected>Select your option</option>
                                        <option v-for="driver in driversList" v-bind:value="driver.firstname">{{driver.firstname}}</option>
                                    </select>                               
                                 </div>
                                <!--  -->
                                <div class="col-md-2">
                                    <label>Bus Attender *</label>
                                </div>
                                <div class="col-md-2 ">
                                    <select class="form-control form-input" v-model="activateBus.attendername" v-on:change="getStopsList()">
                                        <option value="" disabled selected>Select your option</option>
                                        <option v-for="attender in attendersList" v-bind:value="attender.firstname">{{attender.firstname}}</option>
                                    </select>                               
                                 </div>
                            </div>
                         </div>
                         <hr>
                        <!--  -->
                        <div>
                            <div>
                                <div class="col-md-2">
                                    <label>Start TIme</label>
                                </div>
                                <div class="col-md-2">
                                    <vue-timepicker format="hh:mm a" v-model="starttime"></vue-timepicker>
                                </div>
                                <div class="col-md-2">
                                    <label>End TIme</label>
                                </div> 
                                <div class="col-md-2" >
                                    <vue-timepicker format="hh:mm a" v-model="endtime"></vue-timepicker>
                                </div>
                            </div><br><br>
                            <div class="row"> 
                                <div class="col-md-3" v-for="(stop,index) in stopsList">
                                    <hr>
                                    <div>Travel Time of {{stop}} </div><br>
                                    <input type="text" class="form-control form-input" id="traveltime" name="travelTime" placeholder="Time in mins*" v-model="stopTravelTime[index]" ng-pattern=""  required>
                                    <br>
                                </div>
                             </div>
                        </div>
                         <hr>
                        <div class="row">
                            <div class="col-lg-6 col-lg-offset-3 text-center">
                                <!-- <button id="btn-reset" type="reset" class="btn resetbutton"> Reset</button> -->
                                <button id="btn-Register" type="submit" name="submit"  v-on:click.prevent="activateTheBus" class="btn submitbutton">Activate</button>
                            </div>
                        </div>
                    </div>
                </div>
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
import UserService from '../../../../services/userService.js';
import DatePicker from 'vue2-datepicker';
import VueTimepicker from 'vue2-timepicker';
export default{
    components: { DatePicker,VueTimepicker },
    data(){
        return{
             id:this.$cookie.get('id'),
             activateBus:{},
             busMaintainersList:[],
             buses:[],
             routesList:[],
             staffList:[],
            //  routesWithStops:[],
             bussummery:[],
             driversList:[],
             attendersList:[],
             stopsList:[],
             stopTravelTime:[],
             busnumber:0,
              starttime: {
                hh: "",
                mm: "",
                a: ''
            },
            endtime: {
                hh: "",
                mm: "",
                a: ''
            },
            busRoutes:[],
            alertMessage: "",
            alertType:"",
            open: 'show',
            close: 'hide'
        }
    },
    created(){
        //  UserService.getAllTransportDetails(this.id).then((response)=>{
        //     this.buses=response.data.buses;
        //      this.routesList=response.data.routes;
        //      this.staffList=response.data.staff;
        //      this.routesWithStops=response.data.RoutesWithStops;
        //      this.bussummery=response.data.BusSummery;
        // })
        UserService.busMaintainerDetails(this.id).then((response)=>{
            this.busMaintainersList=response.data.busMaintainer;
            this.buses = response.data.busList
            // let datasize=0;
            // let busnumber=[];
            // for(let i=0;i<this.busMaintainersList.length;i++){
            //     busnumber[i]=this.busMaintainersList[i].busnumber;
            // }
            // let uniqueNumber = [];
            // $.each(busnumber, function(i, el){
            //     if($.inArray(el, uniqueNumber) === -1) uniqueNumber.push(el);
            // });
            // for(let j=0;j<uniqueNumber.length;j++){
            //     for(let i=0;i<this.busMaintainersList.length;i++){
            //         if(this.busMaintainersList[i].busnumber==uniqueNumber[j]){
            //             this.buses[datasize]=this.busMaintainersList[i];
            //             datasize++;
            //             break;
            //         }
            //     }
            // }
        })
        
    },
    methods:{
        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        getStaffList:function(){
            this.driversList=[];
            this.attendersList=[];
            let driverSize=0;
            let attenderSize=0;
            for(let i=0;i<this.busMaintainersList.length;i++){
                if(this.busMaintainersList[i].busnumber==this.busnumber){
                    if( this.busMaintainersList[i].role=="DRIVER"){
                        this.driversList[driverSize]=this.busMaintainersList[i];
                        driverSize++;
                    }else if(this.busMaintainersList[i].role=="ATTENDER"){
                        this.attendersList[attenderSize]=this.busMaintainersList[i];
                        attenderSize++;
                    }
                }
            }
        },
        getRouteList:function(busnumber){
            this.busnumber=busnumber;
            let datasize=0;
            this.busRoutes=[];
            let busRoutesList=[];
            let routeidList=[];
             for(let i=0;i<this.busMaintainersList.length;i++){
                  if(this.busMaintainersList[i].busnumber==busnumber){
                      busRoutesList[datasize]=this.busMaintainersList[i];
                 //  this.busRoutes[datasize]=this.busMaintainersList[i];
                      routeidList[datasize]=this.busMaintainersList[i].routeid
                      datasize++;
                  }
             }  
             let uniqueIds = [...new Set(routeidList)];
             let routeSize=0;
             for(let k=0;k<uniqueIds.length;k++){
                 for(let m=0;m<busRoutesList.length;m++){
                     if(uniqueIds[k]==busRoutesList[m].routeid){
                         this.busRoutes[routeSize]=busRoutesList[m];
                          routeSize++;
                     }
                      break;
                 }
             }
        },
        getStopsList:function(){
            this.stopsList=this.activateBus.routeDetails.stopsList;
        },
        activateTheBus:function(){
             let busActivate ={
                busnumber:this.activateBus.busnumber,
                drivername:this.activateBus.drivername,
                attendername:this.activateBus.attendername,
                stopTravelTime:this.stopTravelTime,
                starttime:this.starttime,
                endtime:this.endtime
            }
            if(busActivate.busnumber==""){
                this.alertType = 'Bus number is not empty';
                this.alertMessage = "Bus number is not empty";
                this.popUp('alertPopUp',this.open);
            }else if(busActivate.drivername==""){
                this.alertType = 'select driver';
                this.alertMessage = "select driver";
                this.popUp('alertPopUp',this.open);
            }else if(busActivate.attendername==""){
                this.alertType = 'select attender';
                this.alertMessage = "seelct attender";
                this.popUp('alertPopUp',this.open);
            }else if(this.activateBus.routeDetails==undefined){
                this.alertType = 'select route';
                this.alertMessage = "select route";
                this.popUp('alertPopUp',this.open);
            }else if(busActivate.starttime.a==""){
                this.alertType = 'select AM/PM';
                this.alertMessage = "select AM/PM";
                this.popUp('alertPopUp',this.open);
            }else if(busActivate.starttime.hh==""){
                this.alertType = 'select Hours';
                this.alertMessage = 'select Hours';
                this.popUp('alertPopUp',this.open);
            }else if(busActivate.starttime.mm==""){
                this.alertType = 'select minites';
                this.alertMessage = "select minites";
                this.popUp('alertPopUp',this.open);
            }else if(busActivate.endtime.a==""){
                this.alertType = 'select AM/PM';
                this.alertMessage = "select AM/PM";
                this.popUp('alertPopUp',this.open);
            }else if(busActivate.endtime.hh==""){
                this.alertType = 'select Hours';
                this.alertMessage = "select Hours";
                this.popUp('alertPopUp',this.open);
            }else if(busActivate.endtime.mm==""){
                this.alertType = 'select minites';
                this.alertMessage = "select minites";
                this.popUp('alertPopUp',this.open);
            }else{
                busActivate.routeid=this.activateBus.routeDetails.routeid;
                UserService.activateTheBus(this.id,busActivate).then((response)=>{
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
            this.$router.push('/transport/getActiveBusDetails');
        }
    }

}
</script>
<style>
 /* .resetbutton,.resetbutton:hover{
    background-color: #039be5;
    background-image: none;
    border-color: #039be5;
    border-radius:0px;
    color:white;
    } */
.submitbutton,.submitbutton:hover{
    background-color: #039be5;
    background-image: none;
    border-color: #039be5;
    border-radius:0px;
    color:white;
    }
</style>