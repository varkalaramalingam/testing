<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head"><span v-html="$t('buses')"/></h3>
            <hr>
        </div>
        <div class="col-lg-12" v-if="userRole == 'ADMIN'">
            <router-link to="/transport/buses/newbus" tag="button" class="btn newbusbutton pull-right ">New Bus</router-link>
        </div>
        <div class="col-lg-12">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Bus Number</div>
                        <div class="divTableCell">Bus Name</div>
                        <div class="divTableCell">Model</div>
                        <div class="divTableCell">Manufacture Date</div>
                        <div class="divTableCell">Registration Number</div>
                        <div class="divTableCell">No of Seats</div>
                        <div class="divTableCell">Ac/Non-Ac</div>
                        <div class="divTableCell">Color</div>
                        <div class="divTableCell">Entry-Date</div>
                        <div class="divTableCell">Company Name</div>
                        <div class="divTableCell">Active</div>
                        <div class="divTableCell" v-if="userRole == 'ADMIN'">Edit</div>
                        <div class="divTableCell" v-if="userRole == 'ADMIN'">Delete</div>
                        <!-- <div class="divTableCell">Add</div> -->
                    </div>
                    <div class="divTableRowdata" v-for="bus in paginatedData">
                        <div class="divTableCelldata">{{bus.busnumber}}</div>
                        <div class="divTableCelldata">{{bus.busname}}</div>
                        <div class="divTableCelldata">{{bus.modelnumber}}</div>
                        <div class="divTableCelldata">{{Dateformate(bus.manufacturingdate)}}</div>
                        <div class="divTableCelldata">{{bus.registrationnumber}}</div>
                        <div class="divTableCelldata">{{bus.noofseats}}</div>
                        <div class="divTableCelldata">{{bus.bustype}}</div>
                        <div class="divTableCelldata">{{bus.color}}</div>
                        <div class="divTableCelldata">{{Dateformate(bus.joindate)}}</div>
                        <div class="divTableCelldata">{{bus.companyname}}</div>
                        <div class="divTableCelldata">{{bus.active}}</div>
                        <div class="divTableCelldata" v-if="userRole == 'ADMIN'"><a data-toggle="modal" href="#editbuses" v-on:click.prevent="editBus(bus)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                        <div class="divTableCelldata" v-if="userRole == 'ADMIN'"><a data-toggle="modal" v-on:click.prevent="deletebus(bus)" ><i class="fa fa-trash fa-1x" aria-hidden="true"></i></a></div>    
                        <!-- <div class="divTableCelldata"><a data-toggle="modal" href="#addmoredetails" v-on:click.prevent="setbus(bus)"><i class="fa fa-plus" aria-hidden="true"></i></a></div> -->
                    </div>
                </div>
            </div><br>
            <div>
                <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
                <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
            </div>
        </div>
        <div class="modal fade" id="addmoredetails" role="dialog">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add details</h4>
                    </div>
                    <div class="modal-body">
                        <form name="editbusesmodal" >
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Driver Name</label>
                                </div>
                                <div class="col-md-8 ">
                                    <select class="form-control form-input" v-model="busdetails.driver">
                                        <option v-for="driver in drivers" v-bind:value="driver.id">{{driver.firstname}}</option>
                                    </select>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Attender Name</label>
                                </div>
                                <div class="col-md-8 ">
                                    <select class="form-control form-input" v-model="busdetails.attender">
                                        <option v-for="attender in  attenders" v-bind:value="attender.id">{{attender.firstname}}</option>
                                    </select>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Teacher Name</label>
                                </div>
                                <div class="col-md-8 ">
                                    <select class="form-control form-input" v-model="busdetails.teachername">
                                        <option v-for="teacher in  teachers" v-bind:value="teacher.id">{{teacher.teachername}}</option>
                                    </select>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" type="reset" class="btn button"> Reset</button>
                                    <button id="btn-Register" type="submit" name="submit"  v-on:click.prevent="adddriverdetailstobus" class="btn button">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editbuses" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit Buses</h4>
                    </div>
                    <div class="modal-body">
                        <form name="editbusesmodal">
                            <div class="row">
                                <div class=col-lg-6>
                                    <div class="left-side-form">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Bus Number</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" id="" name="busnumber" placeholder="busnumber*" v-model="editbus.busnumber" ng-pattern=""  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Bus Name</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" id="" name="busname" placeholder="busname*" v-model="editbus.busname" ng-pattern="/[aA-zZ\s]$/"  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Model Number</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" id="" name="modelnumber" placeholder="modelnumber*" v-model="editbus.modelnumber" ng-pattern=""  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="class">Registration No.</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control" name="registrationnumber" placeholder="Registration Number*" v-model="editbus.registrationnumber" ng-pattern="" required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="class">Color</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control form-input" name="bloodgroup" placeholder="Bus color" v-model="editbus.color" ng-pattern="" required>
                                            </div>
                                        </div>
                                        <br>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="right-side-form">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Bus Type</label>
                                            </div>
                                            <div class="col-md-8">
                                                <label><input type="radio" name="bustype" value="ac" v-model="editbus.bustype">AC</label>
                                                <label><input type="radio" name="bustype" value="nonac" v-model="editbus.bustype">Non AC</label>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label >Active</label>
                                            </div>
                                            <div clas="col-md-8">
                                                <label><input type="radio" name="active" value="true" v-model="editbus.active" >Active</label>
                                                <label><input type="radio" name="active" value="false" v-model="editbus.active" >In Active</label>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Manufacturing Date</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <date-picker lang="en" v-model="setmanufacturingdate"></date-picker>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="class">Join Date</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <date-picker lang="en" v-model="setjoiningdate"></date-picker>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="class">Company Name</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control form-input" name="companyname" placeholder="" v-model="editbus.companyname" ng-pattern="" required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="class">No.Of Seats</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control form-input" name="noofseats " placeholder="" v-model="editbus.noofseats " ng-pattern="" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" type="reset" class="btn resetbutton"> Reset</button>
                                    <button id="btn-Register" type="submit" name="submit"  v-on:click.prevent="updatebus" class="btn submitbutton">Update</button>
                                </div>
                            </div>
                        </form>
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
    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import DatePicker from 'vue2-datepicker';
import moment from 'moment'
export default{
    components: { DatePicker },
    data(){
        return{
        id:this.$cookie.get('id'),
        buses:[],
        drivers:[],
        attenders:[],
        teachers:[],
        busdetails:{},
        bus:{},
        editbus:{},
        setmanufacturingdate:'',
        setjoiningdate:'',
        userRole: this.$cookie.get('userrole'),
        pageNumber: 0,
        size: 10,
        alertMessage: "",
        alertType:"",
        open: 'show',
        close: 'hide'
        }
    },
    created(){
        UserService.TransportBuses(this.id).then((response)=>{
            console.log(response.data);
            this.buses=response.data
        }).
        catch((error)=>{
            console.log(error.response.data)
        })
   /*     It needs when we adding the bus maintainers details 
     UserService.TransportBusDrivers(this.id).then((response)=>{
            console.log(response.data);
            this.drivers=response.data;
        }),
        UserService.TransportBusAttenders(this.id).then((response)=>{
            console.log(response.data);
            this.attenders=response.data;
        }),
        UserService.TransportBusTeachers(this.id).then((response)=>{
            console.log(response.data);
            this.teachers=response.data;
        })  */
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
        setbus:function(bus){
            console.log(bus);
            this.bus=bus
         
        },
        adddriverdetailstobus:function(){
               var moredetailstobus={
                "busid":this.bus.id,
                "driverid":this.busdetails.driver,
                "attenderid":this.busdetails.attender,
                "teacherid":this.busdetails.teachername
            }
            console.log(moredetailstobus);
            UserService.TransportMoreBusDetails(this.id,moredetailstobus).then((response)=>{
                console.log(response.data);
                $('#addmoredetails').modal('hide');
            })
        },
        deletebus:function(bus){
            UserService.TransportDeleteBus(this.id,bus).then((response)=>{
                this.alertType = response.data.message;
                this.alertMessage = response.data.description;
                this.popUp('alertPopUp',this.open);
                UserService.TransportBuses(this.id).then((response)=>{
                    console.log(response.data);
                    this.buses=response.data
                    }).
                    catch((error)=>{
                    console.log(error.response.data)
                    })
                })
        },
        editBus:function(bus){
            this.editbus=bus;
            this.setmanufacturingdate=new Date();
            this.setmanufacturingdate.setTime(bus.manufacturingdate);
            this.setjoiningdate=new Date();
            this.setjoiningdate.setTime(bus.joindate);
        },
        updatebus:function(){
            var editbus={
                "active":this.editbus.active,
                "busname":this.editbus.busname,
                "busnumber":this.editbus.busnumber,
                "bustype":this.editbus.bustype,
                "color":this.editbus.color,
                "companyname":this.editbus.companyname,
                "id":this.editbus.id,
                "joindate":this.setjoiningdate.getTime(),
                "manufacturingdate":this.setmanufacturingdate.getTime(),
                "modelnumber":this.editbus.modelnumber,
                "noofseats":this.editbus.noofseats,
                "registrationnumber":this.editbus.registrationnumber
            }
            console.log(editbus);
            UserService.TransportNewBus(editbus,this.id).then((response)=>{
                this.alertType = response.data.message;
                this.alertMessage = response.data.description;
                this.popUp('alertPopUp',this.open);
                 $('#editbuses').modal('hide');
                UserService.TransportBuses(this.id).then((response)=>{
                    console.log(response.data);
                    this.buses=response.data
                }).
                catch((error)=>{
                    console.log(error.response.data)
                })
            })
        },
        Dateformate:function(date){
            return moment(date).format('DD/MM/YYYY')
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
            return this.buses.filter(function(staff) {
                return true;
            });
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filterBooks.slice(start, end);
        },
    }
}
</script>
<style scoped>
    .reset-padding{
        padding:0;
    }
    .reset-margin{
        padding:0;
    }
    .divTable{
        display: table;
        width: 100%;
        text-align: center;
    }
    .divTableRow {
        display: table-row;
        background-color: dimgray;
        color: white;
        height: 30px;
    }
    .divTableRowdata {
        display: table-row;
        background-color: #fff;
        color: #000;
        height: 30px;
    }
    .divTableHeading {
        background-color: #ffffff;
        display: table-header-group;
    }
    .divTableCell, .divTableHead {
        border: 1px solid #eee;
        display: table-cell;
        padding: 3px 10px;
    }
    .divTableCelldata{
        border: 1px solid #eee;
        display: table-cell;
        padding: 3px 10px;
    }
    .divTableHeading {
        background-color: #ffffff;
        display: table-header-group;
        font-weight: bold;
    }
    .divTableFoot {
        background-color: #ffffff;
        display: table-footer-group;
        font-weight: bold;
    }
    .divTableBody {
        display: table-row-group;
    }
    .newbusbutton{
        background-color: #039be5;
        background-image: none;
        border-color: #039be5;
        color:white;
        padding: 5px 30px;
        margin-top:10px;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        text-decoration:none;
        border-radius:0px
    }
    .newbusbutton:hover{
        color:white;
    }
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