<template>
    <div class="container">
        <div class="row reset-padding reset-margin">
          <div class="row">
             <div class="col-lg-6">
		        <div class="page-heading">Project Status</div>
             </div>
           </div>
		  <hr/>
       </div>
      <div class="col-lg-12 text-center">
         <h3 class="student-head">{{this.project.name}}</h3>
      </div>
      <div class="row">
         <div class="col-sm-6" style="text-align:right;">Classroom :
         </div>
         <div class="col-sm-6">{{this.project.gradename}} - {{this.project.sectionname}}</div>
      </div>
      <div class="row">
         <div class="col-sm-6" style="text-align:right;">Subject :
         </div>
         <div class="col-sm-6">{{this.project.subjectname}}</div>
      </div>
      <!-- <div class="row">
         <div class="col-sm-6" style="text-align:right;">Max marks :
         </div>
         <div class="col-sm-6">{{this.project.max_marks}}</div>
      </div>-->
      <br>
       <div class="row reset-padding reset-margin">
        <div id="custom-search-input" class="col-md-10 reset-padding reset-margin" style="width:25%">
            <div class="input-group searchbar">
                <input v-model='search' type="text" class="search-query form-control" placeholder="Search student name">
                <span class="input-group-btn">
                        <button class="btn search-btn" type="button">
                            <span class=" glyphicon glyphicon-search"></span>
                </button>
                </span>
            </div>
        </div>
    </div>

    <div class="row studentstable reset-padding reset-margin ">
        <br>
        <div class="divTable">
            <div class="divTableBody">
                <div class="divTableRow">
                    <div class="divTableCell">Project ID</div>
                    <div class="divTableCell">Student Name</div>
                    <div class="divTableCell">Start date</div>
                    <div class="divTableCell">End date</div>
                    <div class="divTableCell">Submitted date</div>
                    <div class="divTableCell">Marks secured</div>
                    <div class="divTableCell">Assigned by</div>
                    <div class="divTableCell">Status</div>
                    <div class="divTableCell"></div>
                </div>
                <div class="divTableRowdata" v-for="(submittedStudent,index) in paginatedData">
                    <div class="divTableCelldata">{{submittedStudent.id}}</div>
                    <div class="divTableCelldata">
                      <!--<button class="btnAsLink" @click="eachStudentEvaluation(project,submittedStudent)">{{submittedStudent.name}}</button>-->
                      <button class="btnAsLink">{{submittedStudent.name}}</button>
                     </div>
                    <div class="divTableCelldata">{{submittedStudent.start_date}}</div>
                    <div class="divTableCelldata" v-bind:style="{color:submitDueDateColor(submittedStudent.end_date)}">{{submittedStudent.end_date}}</div>
                    <div class="divTableCelldata">{{submittedStudent.submission_date}}</div>
                    <div class="divTableCelldata">{{submittedStudent.secured_marks}}</div>
                    <div class="divTableCelldata">{{submittedStudent.assignedby}}</div>
                    <div class="divTableCelldata">{{submittedStudent.status}}</div>
                    <div class="divTableCelldata"> <button v-if="submittedStudent.status !== 'not submitted'" class='assign-button' 
                         @click="goToEvaluation(project,submittedStudent)">Evaluate</button></div>
                </div>

            </div>
        </div>
    </div>

    <!-- Table -->
    <br>
    <div>
        <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
        <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
    </div>

 </div>
</template>
<script>
import {mapMutations} from 'vuex';
import store from '../../../../store';
import UserService from '../../../../services/userService';

export default {
    props:['mysubject','school','userdetails','acdemicyearandboard'],
    data(){
        return{
            tenantId: this.$cookie.get('id'),
            project: this.$store.state.projectDetails,
            submittedStudents:[],
            pageNumber: 0,
            search:'',
            size: 10,

        }
    },
    created(){

        this.classroomid = this.mysubject.id;
        this.subjectid = this.mysubject.subjectid;

        console.log("Project Id:"+" "+this.project.project_id)
        console.log("classroom id:"+" "+this.project.classroomid)

        this.getStudentSubmittedProjects();

    },
    methods:{
        
         ...mapMutations([
             'SET_PROJECT_DETAILS','SET_SUBMITTED_STUDENT_PROJECT'

         ]),

        getStudentSubmittedProjects(){

            UserService.getStudentSubmittedProjects(this.tenantId,this.project.classroomid,this.project.project_id).then((response)=>{

                console.log(response)
                
                for(let project in response.data){
                    let obj = {

                        id: response.data[project].id,
                        name: response.data[project].name,
                        start_date: response.data[project].start_date,
                        end_date: response.data[project].end_date,
                        status: response.data[project].status,
                        assignedby: response.data[project].assignedby,
                        studentid: response.data[project].studentid,
                        max_marks: response.data[project].max_marks,
                        secured_marks: response.data[project].secured_marks,
                        submission_date: response.data[project].submission_date,

                    }

                   this.submittedStudents.push(obj);
        

                }
                console.log(this.submittedStudents);
            })
        },

        goToEvaluation(project,submittedStudent){
            this.SET_PROJECT_DETAILS(project);
            this.SET_SUBMITTED_STUDENT_PROJECT(submittedStudent);
            this.$router.push({
                path:'/mysubjects/'+this.mysubject.gradenumber+this.mysubject.sectionname+'-'+this.mysubject.subjectname+'-'+this.mysubject.syllabustype+'/project-evaluation'

            })
        },

        eachStudentEvaluation(project,submittedStudent){
            this.SET_SUBMITTED_STUDENT_PROJECT(submittedStudent);
            this.$router.push({
                path:'/mysubjects/'+this.mysubject.gradenumber+this.mysubject.sectionname+'-'+this.mysubject.subjectname+'-'+this.mysubject.syllabustype+'/project-evaluation'
            });
        },

        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
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
         let l = this.submittedStudents.length,
         s = this.size;
         return Math.ceil(l / s);
       },
        filterProjects:function(){
            var self = this;
            return this.submittedStudents.filter(function(project){

            let filterPsName;

            if (!self.search) {
                filterPsName = true;
            } else {
                filterPsName = project.name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
             }

        return filterPsName;

            })
        },

        paginatedData() {
         const start = this.pageNumber * this.size,
         end = start + this.size;
         return this.filterProjects.slice(start, end);
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

.studentstable {
  width: 100%;
  padding-top: 1%;
}

.assign-button {
    background-color: #0b366f;
    background-image: none;
    border-color: #0b366f;
    color: white;
    padding: 5px 30px;
    margin-top: 0px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 3px
}
.btnAsLink {
  background: none;
  border: none;
  color: blue;
}

</style>