<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head"><span v-html="$t('bus_routes')"/></h3>
            <hr>
        </div>
        <div class="col-lg-12" v-if="userRole == 'ADMIN'">
            <router-link to="/transport/busnewroutestransport" tag="button" class="btn addstafftobuses pull-right ">Add Staff To Bus</router-link>
        </div>
        <div class="col-lg-12">
            <div class="divTable" style="overflow:auto;width:100%;display: flex;">
                <div class="divTableBody" >
                    <div class="divTableRow">
                        <div class="divTableCell">First Name</div>
                        <div class="divTableCell">Role</div>
                        <div class="divTableCell">Phone Number</div>
                        <!-- <div class="divTableCell">Email</div> -->
                        <div class="divTableCell">Experience</div>
                        <div class="divTableCell">Bus Name</div>
                        <div class="divTableCell">Bus Number</div>
                        <div class="divTableCell">Company Name</div>
                        <div class="divTableCell">NoOfSeats</div>
                        <div class="divTableCell">Color</div>
                        <div class="divTableCell">Bustype</div>
                        <div class="divTableCell">Route Name</div>
                        <div class="divTableCell">Stops</div>
                        <div class="divTableCell">Distance</div>
                        <div class="divTableCell">NumberOfStops</div>
                        <div class="divTableCell">Edit</div>
                        <div class="divTableCell">Delete</div>
                    </div>
                    <div class="divTableRowdata" v-for="busMaintainer in paginatedData">
                        <div class="divTableCelldata">{{busMaintainer.firstname}}</div>
                        <div class="divTableCelldata">{{busMaintainer.role}}</div>
                        <div class="divTableCelldata">{{busMaintainer.contactnumber}}</div>
                        <!-- <div class="divTableCelldata">{{busMaintainer.mailid}}</div> -->
                        <div class="divTableCelldata">{{busMaintainer.experience}}</div>
                        <div class="divTableCelldata">{{busMaintainer.busname}}</div>
                        <div class="divTableCelldata">{{busMaintainer.busnumber}}</div>
                        <div class="divTableCelldata">{{busMaintainer.companyname}}</div>
                        <div class="divTableCelldata">{{busMaintainer.noofseats}}</div>
                        <div class="divTableCelldata">{{busMaintainer.color}}</div>
                        <div class="divTableCelldata">{{busMaintainer.bustype}}</div>
                        <div class="divTableCelldata">{{busMaintainer.routename}}</div>
                        <div class="divTableCelldata">{{getStopsList(busMaintainer.stopsList)}}</div>
                        <div class="divTableCelldata">{{busMaintainer.distance}}</div>
                        <div class="divTableCelldata">{{busMaintainer.numberofstops}}</div>
                        <div class="divTableCelldata"><a data-toggle="modal" href="#editbusMaintainers" v-on:click="editBusRoutes(busMaintainer)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                        <div class="divTableCelldata"><a data-toggle="modal" v-on:click.prevent="deleteBusRoute(busMaintainer)"><i class="fa fa-trash fa-1x" aria-hidden="true"></i></a></div>    
                  </div>
                </div>
            </div><br>
             <div>
                <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
                <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
            </div>
        </div>
        <!--  -->
        <div class="modal fade" id="editbusMaintainers" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit Bus Staff</h4>
                    </div>
                    <div class="modal-body">
                    <form id="multi">
                       <div class="row">
                        <div class="col-md-4">
                            <label>Bus name</label>
                        </div>
                        <div class="col-md-8 ">
                            <!-- <select class="form-control form-input" v-model="editBusRoute.busid" v-on:change="getRoutes(editBusRoute.busid)">
                                <option value="" disabled selected>Select your option</option>
                                <option v-for="bus in buses" v-bind:value="bus.id">{{bus.busname}}</option>
                            </select> -->
                            {{updateBus.busname}}
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-4">
                            <label for="class">Route Name</label>
                        </div>
                        <div class="col-md-8 ">
                            <select class="form-control form-input" v-model="editBusRoute.routeid">
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
                            <label><input type="radio" name="staffType" value="DRIVER" v-model="editBusRoute.staffType" v-on:click="getStaffDataByStaffType('DRIVER')" >Driver</label>
                            <label><input type="radio" name="staffType" value="ATTENDER" v-model="editBusRoute.staffType" v-on:click="getStaffDataByStaffType('ATTENDER')">Attender</label>
                        </div>
                    </div><br>
                    <div class="row">
                        <div class="col-md-4">
                            <label for="class">Staff Name</label>
                        </div>
                        <div class="col-md-8 ">
                            <select class="form-control form-input" v-model="editBusRoute.staffid">
                                <option value="" disabled selected>Select your option</option>
                                <option v-for="staff in roleBasedStaffList" v-bind:value="staff.id">{{staff.firstname}}</option>
                            </select>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-lg-6 col-lg-offset-3 text-center">
                            <button id="btn-reset" type="reset" class="btn resetbutton"> Reset</button>
                            <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="updateBusMainters" class="btn submitbutton">Update</button>
                        </div>
                   </div>
                     </form>
                </div>
                </div>
            </div>
        </div>
        <!--  -->
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
    </div>
</template>
<script>
import UserService from '../../../../services/userService';
export default{
    data(){
        return{
            busMaintainersList:[],
            id:this.$cookie.get('id'),
            userRole: this.$cookie.get('userrole'),
            pageNumber: 0,
            size: 10,
            editBusRoute:[],
            busSummery:[],
            buses:[],
            routesList:[],
            routesListByBusd:[],
            staffList:[],
            roleBasedStaffList:[],
            updateBus:[],
            alertMessage: "",
            alertType:"",
            open: 'show',
            close: 'hide'
        }
    },
    created(){
        UserService.busMaintainerDetails(this.id).then((response)=>{
            this.busMaintainersList=response.data.busMaintainer
        })
    },
    methods:{
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
         getStopsList:function(stop){
            let listOfStops;
            for(let i=0;i<stop.length;i++){
                if(i==0){
                    listOfStops=stop[i];  
                }else{
                    listOfStops=listOfStops+", "+stop[i];
                }  
            }
            return listOfStops;
        },
        editBusRoutes:function(busmaintainer){
            this.updateBus=busmaintainer;
            this.editBusRoute.id=busmaintainer.id;
             let busid=0;
             UserService.getAllTransportDetails(this.id).then((response)=>{
                this.buses=response.data.buses;
                this.busSummery=response.data.BusSummery;
                this.routesList=response.data.routes;
                this.staffList=response.data.staff;

                for(let i=0;i<this.buses.length;i++){
                    if(this.buses[i].busnumber==busmaintainer.busnumber){
                        busid=this.buses[i].id;
                    }
                }
                this.editBusRoute.busid=busid;
                this.getRoutes(busid);
            })
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
        updateBusMainters:function(){
            if(this.editBusRoute.staffid==null){
                this.alertType = "select staff";
                this.alertMessage = "select staff";
                this.popUp('alertPopUp',this.open);
            }else if(this.editBusRoute.routeid==null){
                this.alertType = "select route";
                this.alertMessage = "select route";
                this.popUp('alertPopUp',this.open);
            }
            else{
                let addStaff={
                staffid:this.editBusRoute.staffid,
                busid:this.editBusRoute.busid,
                routeid:this.editBusRoute.routeid,
                id:this.editBusRoute.id
            }
            UserService.updateStaffInBus(this.id,addStaff).then((response)=>{
                $("[data-dismiss=modal]").trigger({ type: "click" });
                this.alertType = response.data.message;
                this.alertMessage = response.data.description;
                this.popUp('alertPopUp',this.open);
                if(response.data.status==200){
                    UserService.busMaintainerDetails(this.id).then((response)=>{
                        this.busMaintainersList=response.data.busMaintainer
                    })
                }
            })
            }
        },
        deleteBusRoute:function(busmaintainer){
            UserService.deleteBusRoute(this.id,busmaintainer).then((response)=>{
                this.alertType = response.data.message;
                this.alertMessage = response.data.description;
                this.popUp('alertPopUp',this.open);
                if(response.data.status==200){
                    UserService.busMaintainerDetails(this.id).then((response)=>{
                        this.busMaintainersList=response.data.busMaintainer
                    })
                }
            })
        }
    },
    computed: {
         pageCount() {
            let l = this.filterBooks.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        filterBooks: function() {
            // var self = this;
            return this.busMaintainersList.filter(function(busMaintainer) {
                return true;
            });
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filterBooks.slice(start, end);
        }
    }
}
</script>
<style scoped>
    .addstafftobuses{
        background-color: #039be5;
        background-image: none;
        border-color: #039be5;
        color:white;
        padding: 5px 30px;
        margin-top:10px;
        margin-bottom:5px;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        text-decoration:none;
        border-radius:0px
    }
    .addstafftobuses:hover{
        color:white;
    }
    .submitbutton,.submitbutton:hover{
    background-color: #039be5;
    background-image: none;
    border-color: #039be5;
    border-radius:0px;
    color:white;
    }
    .resetbutton,.resetbutton:hover{
    background-color: #039be5;
    background-image: none;
    border-color: #039be5;
    border-radius:0px;
    color:white;
    }
</style>