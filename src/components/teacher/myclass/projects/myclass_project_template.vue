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
                        <!-- Table data -->
                        <div class="divTableRowdata" v-for=" project in classroomProjects">
                            <div class="divTableCelldata">{{project.id}}</div>
                             <div class="divTableCelldata">
                                 <button class="btnAsLink" @click="eachProject(project.project_id)">{{project.name}}</button>
                                 </div>
                             <div class="divTableCelldata">{{project.gradename}}-{{project.sectionname}}</div>
                             <div class="divTableCelldata">{{project.subjectname}}</div>
                             <div class="divTableCelldata">{{project.assigned_date}}</div>
                             <div class="divTableCelldata">{{project.start_date}}</div>
                             <div class="divTableCelldata" v-bind:style="{color:submitDueDateColor(project.end_date)}">{{project.end_date}}</div>
                             <div class="divTableCelldata">{{project.assignedby}}</div>

                        </div>
                     </div>
                 </div>
             </div>
     </div>
</div>
</template>
<script>
import userService from '../../../../services/userService';
export default {
    data(){
        return{

            myClass:{},
            classroomProjects:[],
            tenantId:this.$cookie.get("id"),
            classroomid:0




        }
    },

    created(){

        this.myClass = this.$store.state.myClass;
        this.classroomid = this.$store.state.myClass.id;

        this.GetClassroomProjects();

    },

    methods:{

        GetClassroomProjects(){

            userService.getClassroomProjects(this.tenantId,this.classroomid).then((response)=>{
                this.classroomProjects = response.data;
                console.log(response);

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
           
        },

        eachProject(id){
            this.$router.push({
                 path:`view-project/${id}`
            })
            
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