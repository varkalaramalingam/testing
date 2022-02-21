<template>
   <div>
      <div class="col-lg-12 reset-padding reset-margin">
         <div class="text-left">
            <div class="page-heading"><span v-html="$t('recommend_groups')"/></div>
         </div>
         <hr>
      </div>

      <div  class="row reset-padding reset-margin"  style="float:left;width:90%;margin-left:0%">
          <div id="custom-search-input" class="col-md-10 reset-padding reset-margin" style="width:44%">
            <div class="input-group searchbar">
                <input v-model='groupName' type="text" class="search-query form-control" placeholder="Add Recommend Group Name">                
            </div> 
        </div>
         <div>
            <label class="col-sm-1 control-label" style="width:10%;margin-left:-100px">Start :</label>
            <select class="form-control groupFilter" v-model="startYear">
               <option value=0> All </option>
               <option v-for="group in listOfYears" v-bind:value="group.grade">{{group.name}}</option>
            </select>
         </div>
         <div style="float:left;width:25%">
            <label class="col-sm-1 control-label" style="width:37%">End :</label>
            <select class="form-control groupFilter" style="width:51%;margin-right:7px" v-model="endYear" :disabled="startYear == 0 || startYear ==13">
               <option value=0> All </option>
               <option v-for="group in listOfYears" v-bind:value="group.grade">{{group.name}}</option>
            </select>
         </div>
        
      </div>
       <div style="margin-right:10px">
            <button  class="btn btn-newstudent" style="margin-left:-50px;width:90px" v-on:click="addRecGroup()">Add</button>
        </div>
        <br><hr>
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
                                <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </div>
                </div>
             <!-- confirmation pop up end  -->
      <div class="col-lg-12 subjectteachertable reset-padding reset-margin">
        <br>
         <div class="divTable">
            <div class="divTableBody">
               <div class="divTableRow">
                   <div class="divTableCell">S.No</div>
                   <div class="divTableCell">Group Number</div>
                   <div class="divTableCell">Group Name</div>
                   <div class="divTableCell">Start Grade</div>
                   <div class="divTableCell">End Grade</div>
               </div>
               <div class="divTableRowdata"  v-for="(group,index) in paginatedData">
                  <div class="divTableCelldata">{{pageNumber*size+index+1}}</div>
                  <div class="divTableCelldata">{{group.groupnumber}}</div>
                  <div class="divTableCelldata">{{group.groupname}}</div>
                  <div class="divTableCelldata">{{group.start_year}}</div>
                  <div class="divTableCelldata">{{group.end_year}}</div>
               </div>
            </div>
         </div>
         <br>
         <div style="float:left">
            <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
            <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
         </div>
      </div>
   </div>
</template>
<style>
.subjectteachertable{
width:100%;
}
button{
background-color:#039be5;
}
.btn{
    border-radius:0px;
    color:#fff
}
.btn:hover, .btn:focus {
    color: #fff;
    text-decoration: none;
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
  color: black
}
.groupFilter{
  float:left;
  width:15%
}
</style>
<script>
import UserService from '../../../services/userService.js';
import { mapGetters } from 'vuex';
export default ({
 data() {
        return {
            alertMessage: "",
            alertType:"",
            grade: 0,
            open: 'show',
            close: 'hide',
            showAlert: false,
            tenantId: this.$cookie.get('id'),
            listOfGroups:[],
            pageNumber: 0,
            size: 10,
            groupName:'',
            startYear:0,
            endYear:0,
            listOfYears:[
        /*    {
                name:'4 years',
                grade:-2
            },{
                name:'5 years',
                grade:-1
            }, */
            {
                name:'6 years',
                grade:1
            },{
                name:'7 years',
                grade:2
            },{
                name:'8 years',
                grade:3
            },{
                name:'9 years',
                grade:4
            },{
                name:'10 years',
                grade:5
            },{
                name:'11 years',
                grade:6
            },{
                name:'12 years',
                grade:7
            },{
                name:'13 years',
                grade:8
            },{
                name:'14 years',
                grade:9
            },{
                name:'15 years',
                grade:10
            },{
                name:'16 years',
                grade:11
            },{
                name:'17 years',
                grade:12
            },{
                name:'18+ years',
                grade:13
            }]
        }
    },
    created() {
        this.getGroupList();
    },
    methods: {
         popUp: function(id, action) {
            $('#' + id).modal(action);
        },  
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        
        validate:function(){
            if (this.checkEmptyVal(this.groupName)) {
                return true;
            }
           return false;
        },
        checkEmptyVal: function(val) {
            if (!val) {
                return true;
            }
            return false;
        },

        addRecGroup:function(){
            if (this.validate()) {
              this.alertMessage = "Please enter a Recommend Group Name";
              this.alertType = 'Failed';
              this.popUp('alertPopUp',this.open);
            }else if(this.startYear == '' || this.startYear == 0){
                this.alertMessage = "Please enter starting year";
                this.alertType = 'Failed';
                this.popUp('alertPopUp',this.open);
            }
            else if(this.endYear == '' || this.endYear == 0){
                this.alertMessage = "Please enter ending year";
                this.alertType = 'Failed';
                this.popUp('alertPopUp',this.open);
            }else if(this.startYear > this.endYear ){
                this.alertMessage = "Please enter correct startng and ending years";
                this.alertType = 'Failed';
                this.popUp('alertPopUp',this.open);
            }else{
                let obj = {
                     groupname: this.groupName,
                     startyear: this.startYear,
                     endyear:this.endYear
                };
                UserService.addRecommendGroup(this.tenantId,obj).then((response) => {
                    if(response.data.status==200){
                        this.alertType = 'Success';
                        this.alertMessage = response.data.message;
                    }else if(response.data.status==202){
                        this.alertType = 'Not Created';
                        this.alertMessage = response.data.message; 
                    }
                  this.getGroupList();
                  this.popUp('alertPopUp',this.open);
              
               }).catch((error) =>{
                    this.alertType = 'Failed';
                   this.alertMessage = error.response.data.message;
                    this.popUp('alertPopUp',this.open);
              })
            }
            this.groupName='',
            this.startYear=0;
            this.endYear=0;
        },
        getGroupList: function() {
            UserService.getListOfGroups(this.tenantId).then((response) => {
            this.listOfGroups = response.data && response.data.results;
           // console.log(JSON.stringify(response.data.results));
            })
        },
    }, 
    computed: {
        pageCount() {
            let l = this.listOfGroups.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.listOfGroups.slice(start, end);
        },
    }
})
</script>

