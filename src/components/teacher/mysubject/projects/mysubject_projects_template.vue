<template>
<div>
   <div class="col-lg-12">
      <div class="col-lg-10 text-left">
            <h3 class="student-head"><span v-html="$t('projects')"/></h3>
        </div> 
            <div class="col-lg-12 worksheetstable reset-padding reset-margin">
                <div class="divTable">
                 <div class="divTableBody">
                     <div class="divTableRow">
                         <div class="divTableCell">ID</div>
                         <div class="divTableCell">Project Name</div>
                         <div class="divTableCell">Classroom</div>
                         <div class="divTableCell">Subject</div>
                         <div class="divTableCell">Assigned date</div>
                         <div class="divTableCell">Start date</div>
                         <div class="divTableCell">End date</div>
                         <div class="divTableCell">Assigned by</div>
                         </div>
                        <div class="divTableRowdata" v-for="(project,index) in paginatedData"> 
                        <div class="divTableCelldata">{{project.id}}</div>
                        <div class="divTableCelldata">
                        <button class="btnAsLink" @click="eachproject(project)">{{project.name}}</button>
                         </div>
                        <div class="divTableCelldata">{{project.gradename}} - {{project.sectionname}}</div>
                        <div class="divTableCelldata">{{project.subjectname}}</div>
                         <div class="divTableCelldata">{{project.assigned_date}}</div>
                         <div class="divTableCelldata">{{project.start_date}}</div>
                         <div class="divTableCelldata" v-bind:style="{color:submitDueDateColor(project.end_date)}">{{project.end_date}}</div>
                         <div class="divTableCelldata">{{project.assignedby}}</div>
                </div>
             </div>
             </div>
             <br>
             <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage">Previous</button>
             <button class="btn nextbutton" :disabled="pageNumber >= pageCount-1" @click="nextPage">Next</button>
         </div>
     </div>
 </div>  
</template>
<script>
import {mapMutations} from 'vuex';
import UserService from '../../../../services/userService';


export default {
    props:['mysubject','school','userdetails','acdemicyearandboard'],
    data(){
        return{
            classroomProjects:[],
            id:this.$cookie.get('id'),
            myClass :{},
            subjectid :0,
            classroomid:0,
            pageNumber:0,
            size:10

        }
    },
    created(){

        console.log(this.id);
        this.classroomid = this.mysubject.id;
        this.subjectid = this.mysubject.subjectid;

        this.GetClassroomProjects();

    },
    methods:{

        ...mapMutations([
            'SET_PROJECT_DETAILS'

        ]),

        nextPage(){
          this.pageNumber++;
        },

        prevPage(){
            this.pageNumber--;
        },

        eachproject(project){

            this.project=project;
            this.SET_PROJECT_DETAILS(project);
            this.$router.push({
                path:'/mysubjects/'+this.mysubject.gradenumber+this.mysubject.sectionname+'-'+this.mysubject.subjectname+'-'+this.mysubject.syllabustype+'/ps-assigned-status'
            })
        },

        GetClassroomProjects(){
            UserService.getClassroomProjects(this.id,this.classroomid,this.subjectid).then((response)=>{
                for(let project in response.data){
                    let obj = {
                        id:response.data[project].id,
                        name:response.data[project].name,
                        gradename: response.data[project].gradename,
                        sectionname: response.data[project].sectionname,
                        subjectname: response.data[project].subjectname,
                        assigned_date:response.data[project].assigned_date,
                        start_date:response.data[project].start_date,
                        end_date:response.data[project].end_date,
                        max_marks:response.data[project].max_marks,
                        assignedby:response.data[project].assignedby,
                        project_id:response.data[project].project_id,
                        classroomid:response.data[project].classroomid
                    }

                    this.classroomProjects.push(obj);
                }

            })
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
            let l = this.classroomProjects.length,
            s  = this.size;
            return Math.ceil(l / s);
        },

        paginatedData() {
            const start = this.pageNumber * this.size,
            end = start + this.size;
            return this.classroomProjects.slice(start, end);
        }
    }
    
}
</script>
<style scoped>
.worksheetstable{
    width:100%;
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
.btnAsLink {
  background: none;
  border: none;
  color: blue;
}
</style>