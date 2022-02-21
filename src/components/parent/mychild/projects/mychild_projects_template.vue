<template>
    <div class="container-fluid">
       <div class="row">
         <div class="page-layout">
               <div class="row">
                   <div class="col-md-3">
                      <div class="page-heading"><span v-html="$t('projects')"/></div>
                     </div>
                </div>
                <hr/>
                <div class="col-lg-12 reset-padding reset-margin"></div>
              
              <div class="subjectteachertable">
                  <div class="divTable">
                      <div class="divTableBody">
                          <br/>
                          <div class="divTableRow">
                              <div class="divTableCell">Project Name</div>
                              <div class="divTableCell">Subject</div>
                              <div class="divTableCell">Start date</div>
                              <div class="divTableCell">End date</div>
                              <div class="divTableCell">Total marks</div>
                              <div class="divTableCell">Secured marks</div>
                              <div class="divTableCell">Status</div>
                              <div class="divTableCell">Actions</div>
                            </div>
                           <div class="divTableRowdata" v-for="project in projects">
                             <div class="divTableCelldata">
                              <button class="btnAsLink" @click="eachworksheet(project.project_id)">{{project.name}}</button>
                               </div>
                             <div class="divTableCelldata">{{project.subjectname}}</div>
                             <div class="divTableCelldata">{{project.start_date}}</div>
                             <div class="divTableCelldata" v-bind:style="{color:submitDueDateColor(project.end_date)}">{{project.end_date}}</div>
                             <div class="divTableCelldata">{{project.max_marks}}</div>
                             <div class="divTableCelldata">{{project.secured_marks}}</div>
                             <div class="divTableCelldata">{{project.status}}</div>
                             <div class="divTableCelldata">
                                 <button class="assign-button" v-on:click="openSubmitPage(project)">Reports</button>
                                  <button class="button-scores" v-on:click="openEvaluation(project)">Scores</button>
                                 </div>
                            </div>

                          </div>
                      </div>
                  </div>
             </div>
         </div>
    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import store from '../../../../store.js';
import moment from "moment";
import { mapMutations } from 'vuex';

export default {
 data(){
     return{
       tenantId: this.$cookie.get("id"),
       projects:[],
       academicDetails: {},
       school: {},
       userdetails: {},
       userid: this.$cookie.get("userid"),
       childrens: [],
       myChild: {},
       myChildId:0,
       pageNumber:0,
       size: 10,
       isEducationSchool: this.$store.state.isEducationSchool

     };
 },
 created(){

     this.tenantId = this.$cookie.get("id");
     this.school = this.$store.state.school;
     this.userdetails = this.$store.state.userDetails;
     this.myChild = this.$store.state.myChild;
     this.myChildId = this.myChild && this.myChild.studentid;
     /*if (this.$store.state.userDetails.userrole == "PARENT") {
      //children
      const parentid = {
        id: this.userid
      };

      UserService.myChild(this.tenantId,parentid).then(response =>{
         console.log(JSON.stringify(response.data));
         this.childrens = response.data;
         if (this.childrens.length > 0) {
          if (!this.myChild || !this.myChild.studentid) {
            this.myChild = this.childrens[0];
            this.myChildId = this.myChild.studentid;
          }
          this.$store.commit("SET_MY_CHILD", this.myChild);
          this.getChildProjects();
        }

      });
      } else if (this.$store.state.userDetails.userrole == "STUDENT") {
          this.getChildProjects();
    }*/
    this.getChildProjects();

 },
 methods:{
       
       ...mapMutations([
         'SET_PROJECT_DETAILS'

       ]),

   getChildProjects: function(){
     let classroomid = this.myChild.classid;
     let studentid   = this.myChild.studentid;
     
     UserService.ChildProjects(this.tenantId,classroomid,studentid).then(response =>{
       console.log(response.data);
       this.projects = response.data;
     })
   },

   openSubmitPage: function(project){

     this.SET_PROJECT_DETAILS(project);

     this.$router.push(`submit-report`);

   },

   eachworksheet: function(id) {
      console.log(id);
      this.$router.push({
        path: `view-project/${id}`
      });
    },

    openEvaluation:function(project){

      this.SET_PROJECT_DETAILS(project);

      this.$router.push(`view-project-evaluation`);
    
    },

   submitDueDateColor(dueDate){

           let cmpDate = new Date().toISOString().slice(0,10);
           const levelsMap = {INDUE: "#0F9D58", OVERDUE: "red" }

          if(dueDate >= cmpDate){
              return levelsMap.INDUE
          }else{
            return levelsMap.OVERDUE
          }
    }

 },
 computed:{
    pageCount() {
            let l = this.projects.length,
                s = this.size;
            return Math.ceil(l / s);
        },

    paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filterWorksheets.slice(start, end);
        },

 }   
}
</script>
<style>

.divTable {
  display: table;
  width: 100%;
  text-align: center;
}
.divTableRow {
  display: table-row;
  background-color: #5c779e;
  color: white;
  height: 30px;
}
.divTableRowdata {
  display: table-row;
  background-color: #f2f2f2;
  color: #000;
  height: 30px;
}

.divTableBody .divTableRowdata:nth-child(odd) {
  background-color: #fff;
}
.divTableHeading {
  background-color: #ffffff;
  display: table-header-group;
}
.divTableCell,
.divTableHead {
  border: 0px solid #eee;
  display: table-cell;
  padding: 9px 10px;
  font-weight: bold;
}
.divTableCelldata {
  border: 0px solid #eee;
  display: table-cell;
  padding: 5px 10px;
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

.btn {
  border-radius: 0px;
  color: #fff;
}
button {
  background-color: #039be5;
}
.btn:hover,
.btn:focus {
  color: #fff;
  text-decoration: none;
}
.assign-button {
  background-color: #fff;
  color: #5c779e;
  padding: 5px 25px;
  margin-top: 0px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 3px;
  border: 1px solid #5c779e;
}

.button-scores {
  background-color: #fff;
  color:#4285F4;
  padding: 5px 25px;
  margin-top: 0px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 3px;
  border: 1px solid #4285F4;
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

.btnAsLink {
  background: none;
  border: none;
  color: blue;
}

</style>