<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head">New Stop</h3>
            <hr>
        </div>
        <div class="panel panel-info  createclasspanel col-lg-6 col-lg-offset-3" >
            <div class="panel-body">
                <form name="newstopform" >
                    <div class="row">
                        <div class="col-md-4">
                            <label>Lattitude</label>
                        </div>
                        <div class="col-md-8 ">
                            <input type="text" class="form-control form-input" id="" name="lattitude" placeholder="Lattitude*" v-model="stop.lattitude" value="" required>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Longitude</label>
                        </div>
                        <div class="col-md-8 ">
                            <input type="text" class="form-control form-input" id="" name="longitude" placeholder="Longitude*" v-model="stop.longitude"  value="" required>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Stop Name</label>
                        </div>
                        <div class="col-md-8 ">
                            <input type="text" class="form-control form-input" id="" name="stopname" placeholder="Stop Name*" v-model="stop.stopname"   required>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-md-4">
                            <label>Land Mark</label>
                        </div>
                        <div class="col-md-8 ">
                            <input type="text" class="form-control form-input" id="" name="landmark" placeholder="Land Mark*" v-model="stop.landmark"   required>
                        </div>
                    </div>
                    <br>
                    <div class="row">
                        <div class="col-lg-6 col-lg-offset-3 text-center">
                            <button id="btn-reset" type="reset" class="btn resetbutton"> Reset</button>
                            <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="newstop()" class="btn submitbutton" >Submit</button>
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
import UserService from '../../../../services/userService.js';
export default{
    data(){
        return{
            id:this.$cookie.get('id'),
            stop:{},
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
        newstop:function(){
            UserService.TransportNewStop(this.stop,this.id).then((response)=>{
                console.log(response.data);
                if(response.data.status==200){
                    this.alertType = response.data.message;
                    this.alertMessage = response.data.description;
                    this.popUp('successmsg',this.open);
                    // this.$router.push('/transport/stops');
                }else{
                    this.alertType = response.data.message;
                    this.alertMessage = response.data.description;
                    this.popUp('alertPopUp',this.open);
                }
            }).catch((error)=>{
                console.log(error.response.data)
            })
        },
        gotoNextPage:function(){
            this.$router.push('/transport/stops');
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