<template>
<div class="container">
     <div class="row reset-padding reset-margin">
        <div class="row">
            <div class="col-lg-6">
		        <div class="page-heading"><span v-html="$t('skill_groups')"/></div>
            </div>
            <div class="col-lg-6 text-right">
                <button class='common-button' v-on:click="popUp('worksheetPopUp',open)">+ New Group</button>
            </div>
         </div>
       </div>
       <div class="row reset-padding reset-margin">
           <br>
           <hr>
           <br>
       </div>
       <!-- Add Table -->
       <div class="row studentstable reset-padding reset-margin">
           <div class="divTable">
                <div class="divTableBody">
                     <div class="divTableRow">
                          <div class="divTableCell">ID</div>
                           <div class="divTableCell">Group Name</div>
                           <div class="divTableCell">Enabled</div>
                           <div class="divTableCell">Edit</div>
                    </div>
                    <div  class="divTableRowdata" v-for="(group,index) in paginatedData">
                     <div class="divTableCelldata">{{group.id}}</div>
                     <div class="divTableCelldata">{{group.skillgroupname}}</div>
                     <div class="divTableCelldata">{{group.status}}</div>
                     <div class="divTableCelldata">
                         <a data-toggle="modal" @click="popUp('worksheetStatusPopUp',open);createStatusObj(group)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a>
                         </div>
                    </div>
                </div>
           </div>
       </div>
        <br>
        <div>
            <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage">Previous</button>
            <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
        </div>
    <!-- worksheet pop up starts-->
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="worksheetPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h4>Add Skill Group</h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
                </div>
                <div class="modal-body">

                    <div class="projectDetails">
                        <input type="text" class="form-control popUpEle" placeholder="Enter skill group" v-model="newSkillGroup.skillgroupname">
                        <br>
                        <select v-model="newSkillGroup.status" class="form-control popUpEle">
                            <option value="">-- Select Status --</option>
                            <option v-for="(status,key) in groupStatus" v-bind:value="key">{{status}}</option>
                        </select>
                        <!--<input type="text" class="form-control popUpEle" placeholder="Enabled" v-model="newSkillGroup.status">-->
                        <br> 
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" id="submit"  class="btn btn-primary" v-on:click="saveSkillGroup">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- worksheet pop up end-->
    <!-- worksheet status pop up start-->
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="worksheetStatusPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h4>Edit Status</h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
                </div>
                <div class="modal-body">

                    <div class="projectDetails">
                    <!-- content-->
                    <br>
                     <select v-model="editSkillGroup.status" class="form-control popUpEle">
                          <option value=-1>-- Select Status --</option>
                          <option v-for="(status,key) in groupStatus" v-bind:value="key">{{status}}</option>
                     </select>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" id="submit" class="btn btn-primary" v-on:click="editGroupStatus">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!--worksheet status ends -->
</div>
</template>
<script>
import UserService from '../../../services/userService.js';


export default {
    data(){
        return{
            tenantId:this.$cookie.get('id'),
             open: 'show',
             close: "hide",
             showAlert: false,
             alertMessage: "",
             alertClass: "",
             size: 10,
             pageNumber:0,
             skillGroups:[],
             newSkillGroup:{},
             editSkillGroup:{},
             groupStatus:{0:'Disable', 1:'Enable'}

        }
    },

    created(){

        //console.log(this.tenantId);

        this.GetSkillGroups();

    },

    methods:{

         popUp: function(id, action) {
            $('#' + id).modal(action);
        },

         nextPage() {
         this.pageNumber++;
        },

         prevPage() {
         this.pageNumber--;
        },

        createStatusObj: function(editObj){
            this.editSkillGroup = {
                
                id:editObj.id,
                status:editObj.status

            }

        },

        GetSkillGroups(){
            UserService.GetSkillGroups(this.tenantId).then((response)=>{
                this.skillGroups = response.data;
            })
        },

        saveSkillGroup(){
            
            if(this.validateFields()){
                let groupObj = {

                    skillgroupname:this.newSkillGroup.skillgroupname,
                    status: Number(this.newSkillGroup.status)
                }

                if(this.skillGroups.some(group => group.skillgroupname.toLowerCase() === groupObj.skillgroupname.trim().replace(/\s/g, "").toLowerCase())){
                         this.alertMessage = " Skill group already exists .....";
                         this.alertClass = 'alert-warning';
                         this.setAlertMessage('warn');
                         
                 }else{

                        UserService.AddSkillGroups(this.tenantId,groupObj).then((response)=>{
                        this.GetSkillGroups();
                        this.newSkillGroup={};
                        this.alertMessage = "Successfully added group .....";
                        this.alertClass = 'alert-success';
                        this.setAlertMessage('success');

                }).catch((error)=>{
                    console.log("Error response "+JSON.stringify(error.response));

                })
                   
             }     

            }else{

                 this.alertMessage = "You must enter all the data .....";
                 this.alertClass = 'alert-danger';
                 this.setAlertMessage('fail');
            }

        },

        editGroupStatus(){
                 
                 if(this.editSkillGroup.status == null){
                     this.alertMessage="You must enter all the data .....";
                     this.alertClass = 'alert-danger';
                     this.setAlertMessage('fail');
                   
                 }else if(this.editSkillGroup.status < 0){
                     this.alertMessage="Please select alteast one option .....";
                     this.alertClass = 'alert-danger';
                     this.setAlertMessage('fail');
                     
                 }else{

                      let modifiedObj = {
                         status: Number(this.editSkillGroup.status)
                      }
                      
                      UserService.UpdateSkillGroups(this.tenantId,this.editSkillGroup.id,modifiedObj).then((response)=>{
                          this.GetSkillGroups();
                          this.alertMessage = "Status updated successfully .....";
                          this.alertClass = 'alert-success';
                          this.setAlertMessage('success');

                      }).catch((err)=>{
                          console.log("Error response "+JSON.stringify(err.response));
                      })
                     
                 }        

        },

        validateFields: function() {
            if(this.checkEmptyVal(this.newSkillGroup.skillgroupname)) {
                return false;
            }else if (this.checkEmptyVal(this.newSkillGroup.status)) {
                return false;
            }
            return true;
        },

        checkEmptyVal: function(val) {
            if (val == '' || val == null) {
                return true;
            }
            return false;
        },

        //Shows the alert message on homepage 
        setAlertMessage: function(type) {
            this.showAlert = true;
            let thisVue = this;
            setTimeout(function() {
                thisVue.alertMessage = '';
                thisVue.alertClass = '';
                thisVue.showAlert = false;
                if (type == 'success') {
                    thisVue.popUp('worksheetPopUp', thisVue.close);
                    thisVue.popUp('worksheetStatusPopUp', thisVue.close);
                }
            }, 1500);
        }
    },

    computed:{
         pageCount() {
         let l = this.skillGroups.length,
         s = this.size;
         return Math.ceil(l / s);
        },

         paginatedData() {
            const start = this.pageNumber * this.size,
            end = start + this.size;
            return this.skillGroups.slice(start, end);
         }



    }
    
}
</script>
<style scoped>
.reset-padding {
  padding: 0;
}

.reset-margin {
  margin: 0;
}

.popUpEle {
  width: 250px;
  margin-left:0px;
}

.showAlertDiv {
  margin-top: -42px;
  height: 42px;
  margin-left: 152px;
  width: 276px;
}

.previousbutton,
.nextbutton,
.previousbutton:hover,
.nextbutton:hover {
  display: inline-block !important;  
  padding: 5px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
  color: black;
}

.modal-body{
    height: 120px;
}

</style>