<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head">Add Routes</h3>
            <hr>
        </div>
        <div class="panel panel-info  createclasspanel col-lg-6 col-lg-offset-3" >
            <div class="panel-body">
                <form name="newrouteform" >
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
                            <button id="btn-reset" type="reset" class="btn resetbutton"> Reset</button>
                            <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="newroute" class="btn submitbutton">Submit</button>
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
            route:{},
            id:this.$cookie.get('id'),
            buses:[],
            stopnames:[],
            alertMessage: "",
            alertType:"",
            open: 'show',
            close: 'hide'
        }
    },
    created(){
        UserService.TransportBuses(this.id).then((response)=>{
            console.log(response.data);
            this.buses=response.data;

        })
    
    },
    methods:{
        customLabel (option) {
            return `${option.stopname}`
        },
         popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        newroute:function(){
            if(this.route.busid==null){
                this.alertType = "select bus ";
                this.alertMessage = "select bus";
                this.popUp('alertPopUp',this.open);
            }else if(this.route.routename==null){
                this.alertType = "enter route name";
                this.alertMessage = "enter route name";
                this.popUp('alertPopUp',this.open);
            }else if(this.route.distance==null){
                this.alertType = "enter distance";
                this.alertMessage = "enter distance";
                this.popUp('alertPopUp',this.open);
            }else if(this.route.distance.match(/^-?\d+$/)==null){
                this.alertType = "enter distance as number only";
                this.alertMessage = "enter distance as number only";
                this.popUp('alertPopUp',this.open);
            }
            else{
                var route={
                "busid":this.route.busid,
                "routename":this.route.routename,
                "stops":this.stopnames,
                "distance":this.route.distance
            }
            UserService.TransportNewRoute(this.id,route).then((response)=>{
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
            this.$router.push('/transport/routes');
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