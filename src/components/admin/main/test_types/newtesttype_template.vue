<template>
    <div>
        <div class="modal fade" data-keyboard="false" data-backdrop="static" id="PeriodPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="page-heading">
                          <button class="close" data-dismiss="modal" >&times;</button>
                        <h4>New TestType</h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
             </div>
                <div class="modal-body">
                     <div class="row">
                        <div class="col-md-4">
                            <label>Test Type</label>
                        </div>
                        <div class="col-md-5">
                            <input type="text" class="form-control " name="testtype" placeholder="Enter Test Name*" v-model="testtype.testtype"required>
                        </div>
                    </div>
                    <br>
                    
                    </div>
                    <div class="modal-footer">
                        <div class="text-center">
                            <button id="btn-Register" type="reset" name="reset"  class="btn button" data-dismiss="modal">reset</button>
                            <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="newtesttype()" class="btn  button" data-dismiss="modal">Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';
export default{
    props:['school','userdetails'],
    data(){
        return{
            testtype:{},
            id:this.$cookie.get('id')
     
        }
    },
    methods:{
        newtesttype:function(){
            var testtype={
                "testtype":this.testtype.testtype
            }
            UserService.NewTestType(testtype,this.id).then((response)=>{
                this.$router.push('/admin/testtypes');
            }).catch((error)=>{
                console.log(error.response.data);
            })
        }
    }
}
</script>
<style>
button{
background-color:#0b366f;
}
.btn{
    border-radius:0px;
    color:#fff
}
.btn:hover, .btn:focus {
    color: #fff;
    text-decoration: none;
}
</style>
