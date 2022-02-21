<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head"><span v-html="$t('routes')"/></h3>
            <hr>
        </div>
        <div class="col-lg-12">
            <router-link to="/transport/routes/newroute" tag="button" class="btn newroutebutton pull-right ">New Route</router-link>
        </div>
        <div class="col-lg-12">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Route Name</div>
                        <!-- <div class="divTableCell">Bus Number</div> -->
                        <div class="divTableCell">Distance</div>
                        <div class="divTableCell">Bus Name</div>
                        <div class="divTableCell">Bus Number</div>
                        <div class="divTableCell">Number Of Stops</div>
                        <div class="divTableCell">Stops</div>
                         <div class="divTableCell">Assign Stops</div>
                        <div class="divTableCell">Edit</div>
                        <div class="divTableCell">Delete</div>
                    </div>
                    <div class="divTableRowdata" v-for="route in paginatedData">
                        <div class="divTableCelldata">{{route.routename}}</div>
                        <!-- <div class="divTableCelldata">{{route.busnumber}}</div> -->
                        <div class="divTableCelldata">{{route.distance}}</div>
                        <div class="divTableCelldata">{{route.busname}}</div>
                        <div class="divTableCelldata">{{route.busnumber}}</div>
                        <div class="divTableCelldata">{{route.numberofstops}}</div>
                        <div class="divTableCelldata">{{getStopsList(route.stopsList)}}</div>
                        <div class="divTableCelldata"><a data-toggle="modal" href="#myModal"><i class="fa fa-plus" aria-hidden="true"  v-on:click="getRouteDetails(route)"></i></a></div>
                        <div class="divTableCelldata"><a data-toggle="modal" href="#editroutes" v-on:click="editroute(route)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                        <div class="divTableCelldata"><a data-toggle="modal" v-on:click.prevent="deleteroute(route)"><i class="fa fa-trash fa-1x" aria-hidden="true"></i></a></div>    
                    </div>
                </div>
            </div><br>
            <div>
                <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
                <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
            </div>
        </div>
        <div class="modal fade" id="editroutes" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Edit Routes</h4>
                    </div>
                    <div class="modal-body">
                        <form name="newstopform">
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Bus Number</label>
                                </div>
                                <div class="col-md-8 ">
                                    <select class="form-control form-input" v-model="route.busid">
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
                                <div class="col-md-8">
                                    <input type="text" class="form-control form-input" name="routename" placeholder="" v-model="route.routename" ng-pattern="" required>
                                </div>
                            </div>
                            <br>
                            <!-- <div class="row">
                                <div class="col-md-4">
                                    <label>Stops</label>
                                </div>
                                <div class="col-md-8 ">
                                    <multiselect v-model="route.stops"  track-by="stopname" :options="stops" :multiple="true" :value="stops.id"   />
                                </div>
                            </div>
                            <br> -->
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Distance</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control form-input" name="distance" placeholder="" v-model="route.distance" ng-pattern="" required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" type="reset" class="ebtn button"> Reset</button>
                                    <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="updateroute" class="ebtn button" >Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="myModal" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Assign Stops</h4>
                    </div>
                    <div class="modal-body">
                        <form id="multi">
                                <div class="row">
                                    <div class="col-md-5">
                                        <select name="selectfrom" id="select-from" multiple="multiple"  class="form-control">
                                            <option v-for="stop in stops" v-bind:value="stop.id">{{stop.stopname}}</option>
                                        </select>
                                        <a href="javascript:void(0);" id="btn-up-source"><i class="fa fa-arrow-up fa-2x" aria-hidden="true"></i></a>
                                        <a href="javascript:void(0);" id="btn-down-source"><i class="fa fa-arrow-down fa-2x" aria-hidden="true"></i></a>
                                    </div>
                                    <div class="col-md-2 text-center">
                                        <a href="javascript:void(0);" id="btn-add" name="btn-add">
                                            <i class="fa fa-angle-right fa-3x" aria-hidden="true"></i>
                                        </a>
                                        <br/>
                                        <a href="javascript:void(0);" id="btn-remove" name="btn-remove" >
                                            <i class="fa fa-angle-left fa-3x" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                    <div class="col-md-5">
                                        <select name="selectto" id="select-to" multiple="multiple" class="form-control">
                                        </select>
                                        <a href="javascript:void(0);" id="btn-up"><i class="fa fa-arrow-up fa-2x" aria-hidden="true"></i></a>
                                        <a href="javascript:void(0);" id="btn-down"><i class="fa fa-arrow-down fa-2x" aria-hidden="true"></i></a>
                                    </div>
                                </div>
                                <br/><br/>
                                <div class="row">
                                    <div class="col-lg-6 col-lg-offset-3 text-center">
                                         <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="addStops" class="btn submitbutton" >Submit</button>
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
import Multiselect from 'vue-multiselect';
import $ from 'jquery'
export default{
    components: {'multiselect':Multiselect},
    data(){
        return{
             id:this.$cookie.get('id'),
             routes:[],
             route:{},
             buses:[],
             stops:[],
             assignstops:[],
             routeid:0,
             pageNumber: 0,
             size: 10,
             alertMessage: "",
            alertType:"",
            open: 'show',
            close: 'hide'
        }
    },
    created(){
        UserService.TransportRoutes(this.id).then((response)=>{
            console.log(response.data);
            this.routes=response.data;
        }).
        catch((error)=>{
            console.log(error.response.data)
        }),
        UserService.TransportBuses(this.id).then((response)=>{
            console.log(response.data);
            this.buses=response.data;
        }),
        UserService.TransportStops(this.id).then((response)=>{
            console.log(response.data);
            this.stops=response.data;
        }),
        $(document).ready(function(){
                $('#btn-add').click(function(){
                    $('#select-from option:selected').each( function() {
                        $('#select-to').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
                        $(this).remove();
                    });
                });
                $('#btn-remove').click(function(){
                    $('#select-to option:selected').each( function() {
                        $('#select-from').append("<option value='"+$(this).val()+"'>"+$(this).text()+"</option>");
                         $(this).remove();
                    });
                });
                $('#btn-up').bind('click', function() {
                    $('#select-to option:selected').each( function() {
                        var newPos = $('#select-to option').index(this) - 1;
                        if (newPos > -1) {
                            $('#select-to option').eq(newPos).before("<option value='"+$(this).val()+"' selected='selected'>"+$(this).text()+"</option>");
                            $(this).remove();
                        }
                    });
                });
                $('#btn-down').bind('click', function() {
                    var countOptions = $('#select-to option').length;
                    $('#select-to option:selected').each( function() {
                        var newPos = $('#select-to option').index(this) + 1;
                        if (newPos < countOptions){
                            $('#select-to option').eq(newPos).after("<option value='"+$(this).val()+"' selected='selected'>"+$(this).text()+"</option>");
                            $(this).remove();
                        }
                    });
                });
                $('#btn-up-source').bind('click', function() {
                $('#select-from option:selected').each( function() {
                    var newPos = $('#select-from option').index(this) - 1;
                    if (newPos > -1) {
                        $('#select-from option').eq(newPos).before("<option value='"+$(this).val()+"' selected='selected'>"+$(this).text()+"</option>");
                        $(this).remove();
                    }
                });
            });
            $('#btn-down-source').bind('click', function() {
                var countOptions = $('#select-from option').length;
                $('#select-from option:selected').each( function() {
                    var newPos = $('#select-from option').index(this) + 1;
                    if (newPos < countOptions) {
                        $('#select-from option').eq(newPos).after("<option value='"+$(this).val()+"' selected='selected'>"+$(this).text()+"</option>");
                        $(this).remove();
                    }
                });
             });
    });
       
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
        deleteroute:function(route){
            console.log(route)
            var routeid={
                "id":route.id
            }
            UserService.TransportDeleteRoute(this.id,routeid).then((response)=>{   
                UserService.TransportRoutes(this.id).then((response)=>{
                    console.log(response.data);
                    this.routes=response.data;
                }).
                catch((error)=>{
                    console.log(error.response.data)
                })
            })
        },
        editroute:function(route){
            console.log(route)
            this.route=route
        },
        updateroute:function(){
            UserService.TransportNewRoute(this.id,this.route).then((response)=>{
                $("[data-dismiss=modal]").trigger({ type: "click" });
                UserService.TransportRoutes(this.id).then((response)=>{
                    console.log(response.data);
                    this.routes=response.data;
                }).
                catch((error)=>{
                    console.log(error.response.data)
                })
            })
        },
        getRouteDetails:function(route){
            this.routeid=route.id;
        },
        addStops(){
            this.assignstops=[];
            for(var i=0;i<$('#select-to option').attr('selected','selected').length;i++){
                var stopname=$('#select-to option').attr('selected','selected')[i].text;
                let stopNameDetails={
                    stops:stopname
                }
                this.assignstops.push(stopNameDetails);
            }
            console.log("##$$##",this.assignstops.length)
           UserService.assignStopsToRoutes(this.id,this.routeid,this.assignstops).then((response)=>{  
                if(response.data.status==200){
                     $("[data-dismiss=modal]").trigger({ type: "click" });
                     UserService.TransportRoutes(this.id).then((response)=>{
                        console.log(response.data);
                        this.routes=response.data;

                    })
                }
           })
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
            return this.routes.filter(function(staff) {
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
    .newroutebutton{
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
    .newroutebutton:hover{
        color:white;
    }
    .button{
    background-color:#0b366f;
    }
    .ebtn{
        border-radius:0px;
        color:#fff
    }
    .button:hover{
        background-color:#6495ED;
    }
    .ebtn:hover{
        border-radius:0px;
        color:#fff
    }
   
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>