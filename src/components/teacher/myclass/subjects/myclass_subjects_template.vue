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
            grade: this.$store.state.myClass.id,
            section: this.$store.state.myClass.gradeid,
            // userdetails: this.$store.state.myClass
        }
    },
    created() {
        this.tenantId = this.$cookie.get('id');
        console.log("My Class: "+JSON.stringify(this.$store.state.myClass))
        this.getClassroomTeachers();
    },
    methods: {
        getClassroomTeachers: function() {
            let obj = {
                classroomid: this.grade,
                academicgradeid: this.$store.state.myClass.academicgradeid
            }
            UserService.SectionDetails(obj, this.tenantId).then((response) => {
                console.log(response);
                this.subjectTeachers = response.data.subjectteachers;
            })
        },

    },
    computed: {
        
    }
}
</script>
<style scoped>
@import '../../../../assets/css/classrooms_styles.css';
</style>
