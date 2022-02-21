<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head">New Bus</h3>
            <hr>
        </div>
        <div class="">
            <div class="col-md-12">
                <div class="panel panel-info addteacherpanel">
                    <div class="panel-body teacherpanel">
                        <form id="form" class="form-horizontal" role="form" name="newbusform" >
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="left-side-form">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Bus Number</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" id="" name="busnumber" placeholder="Busnumber*" v-model="bus.busnumber" ng-pattern=""  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Bus Name</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" id="" name="busname" placeholder="Busname*" v-model="bus.busname" ng-pattern="/[aA-zZ\s]$/"  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Model Number</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" id="" name="modelnumber" placeholder="Modelnumber*" v-model="bus.modelnumber" ng-pattern=""  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="class">Registration No.</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control" name="registrationnumber" placeholder="Registration Number*" v-model="bus.registrationnumber" ng-pattern="" required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                        <div class="col-md-4">
                                            <label for="class">Color</label>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" class="form-control form-input" name="bloodgroup" placeholder="Bus color" v-model="bus.color" ng-pattern="" required>
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
                                                <label><input type="radio" name="bustype" value="ac" v-model="bus.bustype">AC</label>
                                                <label><input type="radio" name="bustype" value="nonac" v-model="bus.bustype">Non AC</label>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Manufacturing Date</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <date-picker lang="en" v-model="bus.manufacturingdate" ></date-picker>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="class">Join Date</label>
                                            </div>
                                            <div class="col-md-8">
                                                 <date-picker lang="en" v-model="bus.joiningdate"></date-picker>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="class">Company Name</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control form-input" name="companyname" placeholder="" v-model="bus.companyname" ng-pattern="" required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label for="class">No.Of Seats</label>
                                            </div>
                                            <div class="col-md-8">
                                                <input type="text" class="form-control form-input" name="noofseats" placeholder="" v-model="bus.noofseats"  ng-pattern="" required>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" type="reset" class="btn resetbutton"> Reset</button>
                                    <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="newbus()" class="btn submitbutton">Submit</button>
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
export default{
    components: { DatePicker },
    data(){
        return{
            id:this.$cookie.get('id'),
            bus:{},
            alertMessage: "",
            alertType:"",
            open: 'show',
            close: 'hide'
        }
    },
    methods:{
         popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        newbus:function(){
            if(this.bus.busnumber==null){
                this.alertType = "Enter bus number";
                this.alertMessage = "Enter bus number";
                this.popUp('alertPopUp',this.open);
            }else if(this.bus.busname==null){
                this.alertType = "enter bus name";
                this.alertMessage = "enter bus name";
                this.popUp('alertPopUp',this.open);
            }else if(this.bus.modelnumber==null){
                this.alertType = "enter model number";
                this.alertMessage = "enter model number";
                this.popUp('alertPopUp',this.open);
            }else if(this.bus.manufacturingdate==undefined){
                this.alertType = "enter bus manufacture date";
                this.alertMessage = "enter bus manufacture date";
                this.popUp('alertPopUp',this.open);
            }else if(this.bus.joiningdate==undefined){
                this.alertType = "enter join date";
                this.alertMessage = "enter join date";
                this.popUp('alertPopUp',this.open);
            }else if(this.bus.registrationnumber==null){
                this.alertType = "enter registration number";
                this.alertMessage = "enter registration number";
                this.popUp('alertPopUp',this.open);
            }else if(this.bus.noofseats==null){
                this.alertType = "enter number of bus seats";
                this.alertMessage = "enter number of bus seats";
                this.popUp('alertPopUp',this.open);
            }else if(this.bus.companyname==null){
                this.alertType = "enter company name";
                this.alertMessage = "enter company name";
                this.popUp('alertPopUp',this.open);
            }else if(this.bus.color==null){
                this.alertType = "enter bus color";
                this.alertMessage = "enter bus color";
                this.popUp('alertPopUp',this.open);
            }else if(this.bus.bustype==null){
                this.alertType = "select bus type";
                this.alertMessage = "select bus type";
                this.popUp('alertPopUp',this.open);
            }
            else{
                 var bus={
                "busnumber":this.bus.busnumber,
                "busname":this.bus.busname,
                "modelnumber":this.bus.modelnumber,
                "manufacturingdate":this.bus.manufacturingdate.getTime(),
                "joindate":this.bus.joiningdate.getTime(),
                "registrationnumber":this.bus.registrationnumber,
                "noofseats":this.bus.noofseats,
                "companyname":this.bus.companyname,
                "color":this.bus.color,
                "bustype":this.bus.bustype
               }
               UserService.TransportNewBus(bus,this.id).then((response)=>{
                console.log(response.data);
                if(response.status==200){
                     this.alertType = response.data.message;
                    this.alertMessage = response.data.description;
                    this.popUp('successmsg',this.open);
                     
                }else{
                    this.alertType = response.data.message;
                    this.alertMessage = response.data.description;
                    this.popUp('alertPopUp',this.open);
                }
               }).catch((error)=>{
                    console.log(error.response.data)
               })
            }
        },
         gotoNextPage:function(){
            this.$router.push('/transport/buses');
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