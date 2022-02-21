<template>
    <div>
         <!-- section pop up start-->
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="SectionPopup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div class="page-heading">
                          <button class="close" data-dismiss="modal" >&times;</button>
                        <h4>New Section</h4>
                    </div>
                    <!-- <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div> -->
             </div>
                <div class="modal-body">
                <div class="row">
                  <div class="col-md-4">
                     <label>Academic Year</label>
                  </div>
                  <div class="col-md-5">
                     <select class="form-control form-input" v-model="sectionforacademicandboard" paceholder="Select" v-on:change="selectGradebasedonAcademic">
                        <option value="" disabled selected>Select your option</option>
                        <option v-for="academic in academicsandboards.academics" v-show="academic.active==1" v-bind:value="{academicid:academic.id, syllabustype:academic.syllabustype}" :key="academic.id" >{{academic.passingyear}} - {{academic.syllabustype}}</option>
                     </select>
                  </div>
               </div>
               <br>
               <div class="row">
                  <div class="col-md-4">
                     <!-- <label>Grade</label> -->
                     <label> Academic Grade : </label>
                  </div>
                  <div class="col-md-5">
                     <!-- <select class="form-control form-input" v-model="section.gradename">
                        <option value="" disabled selected>Select your option</option>
                        <option v-for="grade in gradesbasedonboard">{{grade.gradename}}</option>
                     </select> -->
                     <select class="form-control form-input" v-model="section.academicgradeid">
                        <option value="" disabled selected>Select your option</option>
                        <option v-for="grade in academicgrades" :value="grade.id" v-if="sectionforacademicandboard.academicid == grade.academicid">{{grade.academicgradename}}</option>
                     </select>
                  </div>
               </div>
               <br>
               <div class="row">
                  <div class="col-md-4">
                     <label for="class">Section</label>
                  </div>
                  <div class="col-md-5">
                    <select class="form-control form-input" v-model="section.sectionname">
                        <option value="" disabled selected>Select Section</option>
                        <option v-for="classSection in classroomSections">{{classSection}}</option>
                    </select>
                  </div>
               </div>
               <br>
               <div class="row">
                  <div class="col-md-4">
                     <label>Teacher</label>
                  </div>
                  <div class="col-md-5">
                    <select class="form-control form-input" v-model="section.teachername">
                        <option value="" disabled selected>Select your option</option>
                        <option v-for="teacher in teachers" v-show="teacher.statusid==1">{{teacher.teachername}}</option>
                    </select>
                  </div>
               </div>
               <br>
               <div class="row">
                    <div class="col-md-4">
                        <label>Periodtype</label>
                   </div>
                    <div class="col-md-5">
                        <select class="form-control form-input" paceholder="Select" v-model="section.period_type_id">
                            <option value="" disabled selected>Select your option</option>
                            <option v-for="period in periodtypes" v-bind:value="period.id">{{period.name}}</option>

                         </select>
                    </div>
                </div>
               <br>
               <div class="row">
                    <div class="col-md-4">
                        <label>Attendance Type</label>
                   </div>
                    <div class="col-md-5">
                        <label><input type="radio" v-bind:value=0 v-model="section.attendance_type">ONE_TIME</label>
                        <label><input type="radio" v-bind:value=1 v-model="section.attendance_type">PER_SUBJECT</label>
                    </div>
                </div>
               <br>
            </div>
                <div class="modal-footer">
                    <button id="btn-reset" type="reset" class="btn button" data-dismiss="modal"> Reset</button>
                    <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="newsection" class="btn button" ng-disabled="CreateClassForm.$invalid" data-dismiss="modal">Submit</button>

                </div>
            </div>
        </div>
    </div>
    <!-- section pop up end-->


    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';

export default{
    props:['school','userdetails','academicsandboards','teachers'],
    data(){
        return{
            boards:[],
            grades:[],
            // teachers:[],
            periodtypes:[],
            section:{
                attendance_type:0
            },
            gradesbasedonboard:[],
            id:this.$cookie.get('id'),
            showAlert:false,
            sectionforacademicandboard:{},
            academicgrades:[],
            classroomSections:["A","B","C","D","E","F","G"]
        }
    },
    created(){
            // UserService.BoardOfEducation(this.id).then((response)=>{
            //     this.boards=response.data;
            // }),
    
            // UserService.Teachers(this.id).then((response)=>{
            //     this.teachers=response.data;
            // }),
            UserService.academicgrades(this.id).then((response) => {
                this.academicgrades = response.data;
            });
            UserService.Getperiodtypes(this.id).then((response)=>{
            this.periodtypes=response.data;
            
        })
    },
    methods:{
        selectGradebasedonBoard:function(){
            var boardforgrade={
                "syllabustype":this.section.syllabustype
            }
            UserService.GradesForStudentBasedOnBoard(boardforgrade,this.id).then((response)=>{
                this.gradesbasedonboard=response.data;
            })
        },
        selectGradebasedonAcademic:function(){
            var academicId={
                "academicid":this.sectionforacademicandboard.academicid
            }
            this.section.syllabustype = this.sectionforacademicandboard.syllabustype;
            UserService.GradesForStudentBasedOnAcademic(academicId,this.id).then((response)=>{
                this.gradesbasedonboard=response.data;
            })
        },
        newsection:function(){
            this.section.academicid = this.sectionforacademicandboard.academicid;
            this.section.syllabustype = this.sectionforacademicandboard.syllabustype;
            console.log(this.section)
            UserService.NewSection(this.section,this.id).then((response)=>{
                if(response.status==201){
                    this.$router.push('/admin/sections'); 
                    this.$alert('Classroom added successfully','Suceess','success');
                    this.$emit("classroomcreated")
                }
            }).catch((error)=>{
                console.log(error.response.data)
                this.$alert(error.response.data.message,'Info','info');
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


</style>
