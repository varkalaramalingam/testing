<template>
  <div class="container-fluid">
   <div class="row">
      <div class="page-layout">
         <div class="row">
            <div class="col-md-3">
               <div class="page-heading">Subjects & Teachers</div>
            </div>
         </div>
         <hr>
        
         
         <div class="subjectteachertable ">
            <div class="divTable">
               <br>
               <div class="divTableBody">
                  <div class="divTableRow">
                     <div class="divTableCell">Subject </div>
                     <div class="divTableCell">Subject Teacher</div>
                  </div>
                  <div class="divTableRowdata"  v-for="subject in subjectTeachers" >
                     <div class="divTableCelldata">{{subject.subjectname}}</div>
                     <div class="divTableCelldata">{{subject.teachername}}</div>
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
export default {
    data() {
        return {
            subjectTeachers: [],
            tenantId: this.$cookie.get('id'),
            grade: this.$store.state.myChild.gradeid,
            section: this.$store.state.myChild.classid,
            academicgradeid: this.$store.state.myChild.academicgradeid
            // userdetails: this.$store.state.userDetails
        }
    },
    created() {
       console.log(JSON.stringify(this.academicgradeid))
        this.tenantId = this.$cookie.get('id');
        this.getClassroomTeachers();
    },
    methods: {
        getClassroomTeachers: function() {
            let obj = {
                classroomid: this.section,
                academicgradeid: this.academicgradeid
            }
            UserService.SectionDetails(obj, this.tenantId).then((response) => {
                console.log(response);
                this.subjectTeachers = response.data.subjectteachers;
            })
        },

    },
}
</script>
<style scoped>
@import '../../../../assets/css/classrooms_styles.css';
</style>
