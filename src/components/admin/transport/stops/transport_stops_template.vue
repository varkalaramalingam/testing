<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head"><span v-html="$t('stops')"/></h3>
            <hr>
        </div>
        <div class="col-lg-12 ">
            <router-link to="/transport/stops/newstop" tag="button" class="btn newstopbutton pull-right ">New Stop</router-link>
        </div>
        <div class="col-lg-12">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Stop Name</div>
                        <div class="divTableCell">Landmark</div>
                        <div class="divTableCell">Latitude</div>
                        <div class="divTableCell">Longitude</div>
                        <div class="divTableCell">Edit</div>
                        <div class="divTableCell">Delete</div>
                    </div>
                    <div class="divTableRowdata" v-for="stop in paginatedData">
                        <div class="divTableCelldata">{{stop.stopname}}</div>
                        <div class="divTableCelldata">{{stop.landmark}}</div>
                        <div class="divTableCelldata">{{stop.lattitude}}</div>
                        <div class="divTableCelldata">{{stop.longitude}}</div>
                        <div class="divTableCelldata"><a data-toggle="modal" href="#editstops" v-on:click.prevent="editstop(stop)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                        <div class="divTableCelldata"><a data-toggle="modal" v-on:click.prevent="deletestop(stop)"><i class="fa fa-trash fa-1x" aria-hidden="true"></i></a></div>    
                    </div>
                </div>
            </div> <br>
            <div>
                <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
                <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
            </div>
         </div>
         <div class="modal fade" id="editstops" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit Stops</h4>
                    </div>
                    <div class="modal-body">
                        <form name="newstopform">
                            <div class="row">
                                <div class=col-lg-12>
                                    <div class="left-side-form">
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Stop Name</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" id="" name="stopname" placeholder="Stop Name*" v-model="stop.stopname" ng-pattern=""  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Land Mark</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" id="" name="landmark" placeholder="Land Mark*" v-model="stop.landmark" ng-pattern=""  required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Lattitude</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" id="" name="latitude" placeholder="Latitude*" v-model="stop.lattitude"  ng-pattern="" value="" required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <label>Longitude</label>
                                            </div>
                                            <div class="col-md-8 ">
                                                <input type="text" class="form-control form-input" id="" name="longitude" placeholder="Longitude*" v-model="stop.longitude" ng-value="vm.coOrdinates.coords.longitude" ng-pattern="" required>
                                            </div>
                                        </div>
                                        <br>
                                        <div class="row">
                                            <div class="col-lg-6 col-lg-offset-3 text-center">
                                                <button id="btn-reset" type="reset" class="btn resetbutton"> Reset</button>
                                                <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="updatestop" class="btn submitbutton" >Update</button>
                                            </div>
                                        </div>
                                    </div>
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
export default{
    data(){
        return{
            id:this.$cookie.get('id'),
            stops:[],
            stop:{},
            pageNumber: 0,
            size: 10,
            alertMessage: "",
            alertType:"",
            open: 'show',
            close: 'hide'
        }
    },
    created(){
        UserService.TransportStops(this.id).then((response)=>{
            console.log(response.data);
            this.stops=response.data;
        }).
        catch((error)=>{
            console.log(error.response.data)
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
        deletestop:function(stop){
            UserService.TransportDeleteStop(this.id,stop).then((response)=>{
                this.alertType = response.data.message;
                this.alertMessage = response.data.description;
                this.popUp('alertPopUp',this.open);
                UserService.TransportStops(this.id).then((response)=>{
                    console.log(response.data);
                    this.stops=response.data;
                }).
                catch((error)=>{
                     console.log(error.response.data)
                })
            })
        },
        editstop:function(stop){
            this.stop=stop
        },
        updatestop:function(){
            console.log(this.stop)
            UserService.TransportNewStop(this.stop,this.id).then((response)=>{
                console.log(response.data);
                 this.alertType = response.data.message;
                this.alertMessage = response.data.description;
                this.popUp('alertPopUp',this.open);
                $('#editstops').modal('hide');
                UserService.TransportStops(this.id).then((response)=>{
                    console.log(response.data);
                    this.stops=response.data;
                }).
                catch((error)=>{
                    console.log(error.response.data)
                })
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
            return this.stops.filter(function(staff) {
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
    .newstopbutton{
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
    .newstopbutton:hover{
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