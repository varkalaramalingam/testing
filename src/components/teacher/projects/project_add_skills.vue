<template>
    <div class="container">
        <div class="row reset-padding reset-margin">
             <div class="row">
                <div class="col-lg-6">
		          <div class="page-heading">Project Skills</div>
                </div>
                <div class="col-lg-6 text-right">
                    <button class='common-button' v-on:click="popUp('worksheetPopUp',open)">+ New Skill</button>
                </div>
            </div>
        </div>
        <!--Add Table -->
        <div class="row reset-padding reset-margin">
           <br>
           <hr>
           <br>
       </div>
        <div class="row studentstable reset-padding reset-margin">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">ID</div>
                        <div class="divTableCell">Skill Name</div>
                        <div class="divTableCell">Skill Group Id</div>
                        <div class="divTableCell">Skill Group Name</div>
                        <div class="divTableCell">Enabled</div>
                        <div class="divTableCell">Edit</div>
                    </div>
                    <div class="divTableRowdata" v-for="(skill,index) in paginatedData">
                        <div class="divTableCelldata">{{skill.id}}</div>
                        <div class="divTableCelldata">{{skill.skillname}}</div>
                        <div class="divTableCelldata">{{skill.groupid}}</div>
                        <div class="divTableCelldata">{{skill.skillgroupname}}</div>
                        <div class="divTableCelldata">{{skill.status}}</div>
                        <div class="divTableCelldata">
                            <a data-toggle="modal" @click="popUp('worksheetEditPopUp',open);createEditSkillObj(skill)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a>
                            </div>
                    </div>

                </div>
            </div>
        </div>
        <br>
        <div>
            <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
            <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
        </div>
        <!--worksheet pop up -->
        <!-- worksheet pop up starts-->
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="worksheetPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h4>Add Project Skill</h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
                </div>
                <div class="modal-body">

                    <div class="projectDetails">
                        <input type="text" class="form-control popUpEle" placeholder="Enter skill name" v-model="skillObj.skillname">
                         <br>
                        <select v-model="skillObj.groupid" class="form-control popUpEle">
                             <option value="">-- Select Skill Group --</option>
                             <option v-for="group in listOfGroups" v-bind:value="group.id">{{group.skillgroupname}}</option>
                        </select>
                         <br>
                        <select v-model="skillObj.status" class="form-control popUpEle">
                            <option value="">-- Select Status --</option>
                            <option v-for="(status,key) in skillStatus" v-bind:value="key">{{status}}</option>
                        </select> 
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" id="submit"  class="btn btn-primary" v-on:click="saveProjectSkill">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- worksheet pop up end-->
     <!-- worksheet edit start-->
     <div class="modal fade" data-keyboard="false" data-backdrop="static" id="worksheetEditPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h4>Edit Project Skill</h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
                </div>
                <div class="modal-body">

                    <div class="projectDetails">
                    <!-- content-->
                    <input type="text" class="form-control popUpEle" placeholder="Enter skill name" v-model="editSkillObj.skillname">
                     <br>
                     <select v-model="editSkillObj.status" class="form-control popUpEle">
                          <option value=-1>-- Select Status --</option>
                          <option v-for="(status,key) in skillStatus" v-bind:value="key">{{status}}</option>
                     </select>
                     <br>
                     <select v-model="editSkillObj.groupid" class="form-control popUpEle">
                         <option value=-1>-- Select Skill Group --</option>
                         <option v-for="group in listOfGroups" v-bind:value="group.id">{{group.skillgroupname}}</option>
                     </select>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" id="submit" class="btn btn-primary" v-on:click="editProjectSkill">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- worksheet edit end -->


    </div>
</template>
<script>
import UserService from "../../../services/userService.js";

export default {
    data(){
        return{
            tenantId:this.$cookie.get("id"),
            open: 'show',
            close: "hide",
            alertMessage: "",
            alertClass: "",
            showAlert: false,
            pageNumber:0,
            size: 10,
            projectSkills:[],
            listOfGroups:[],
            skillObj:{},
            editSkillObj:{},
            skillStatus:{0:'Disable', 1:'Enable'}
        
        }
    },

    created(){

        this.GetProjectSkills();

        UserService.GetSkillGroups(this.tenantId).then((response)=>{
            this.listOfGroups = response.data.filter(skillGroup=> skillGroup.status == 1);
        })

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

        createEditSkillObj:function(editObj){
            this.editSkillObj = {
                id:editObj.id,
                skillname:editObj.skillname,
                status:editObj.status,
                groupid:editObj.groupid
            }

        },

        GetProjectSkills(){
            UserService.GetProjectSkills(this.tenantId).then((response)=>{
                this.projectSkills = response.data;

            })
        },
       
        saveProjectSkill(){
        
            if(this.validateFields()){
                let newObj = {
                    skillname:this.skillObj.skillname,
                    groupid:this.skillObj.groupid,
                    status:Number(this.skillObj.status)
                }
 
                 if(this.projectSkills.some(skill => skill.skillname.toUpperCase() === newObj.skillname.trim().replace(/\s/g, "").toUpperCase())){
                        this.alertMessage = "Skill already exists .....";
                        this.alertClass = 'alert-warning';
                        this.setAlertMessage('warn');
                        
                 }else{
                     UserService.AddProjectSkills(this.tenantId,newObj).then((response)=>{
                        this.GetProjectSkills();
                        newObj = {};
                        this.skillObj={};
                        this.alertMessage = "Successfully added skill .....";
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

        editProjectSkill(){

            if(this.editSkillObj.skillname == '' || this.editSkillObj.status == null ){
                 this.alertMessage = "You must enter all the data .....";
                 this.alertClass = 'alert-danger';
                 this.setAlertMessage('fail');
                
            }else if(this.editSkillObj.status < 0 || this.editSkillObj.groupid < 0){
                 this.alertMessage = "Please select atleast one option .....";
                 this.alertClass = 'alert-danger';
                 this.setAlertMessage('fail');
               
            }else{

                 let updatedObj = {

                    skillname:this.editSkillObj.skillname,
                    status:Number(this.editSkillObj.status),
                    groupid:this.editSkillObj.groupid

                }

                UserService.UpdateProjectSkills(this.tenantId,this.editSkillObj.id,updatedObj).then((response)=>{
                    this.GetProjectSkills();
                    this.alertMessage = "Successfully updated skill .....";
                    this.alertClass = 'alert-success';
                    this.setAlertMessage('success');
                    
                }).catch((err)=>{
                    console.log("Error response "+JSON.stringify(err.response))
                })
            }

        },

        validateFields: function() {
            if(this.checkEmptyVal(this.skillObj.skillname)) {
                return false;
            }else if (this.checkEmptyVal(this.skillObj.groupid)) {
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
                    thisVue.popUp('worksheetEditPopUp', thisVue.close);
                }
            }, 1500);
        }


    },
    computed:{
         pageCount() {
             let l = this.projectSkills.length,
             s = this.size;
             return Math.ceil(l / s);
         },

         paginatedData() {
            const start = this.pageNumber * this.size,
            end = start + this.size;
            return this.projectSkills.slice(start, end);
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
  display: inline-block;
  padding: 5px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
  color: black;
}

.modal-body{
    height: 180px;
}

</style>