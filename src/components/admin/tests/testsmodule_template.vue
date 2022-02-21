<template>
  <div> 
    <br>  
    <div class="col-lg-3" v-show="isactive==1" >
        <label class="col-sm-1 control-label" style="width:50% !important">Academic Year:</label>
        <select  class="form-control gradeFilter" v-model="activeacademicDetails" v-on:change="changingacademicyear()" style="width:50%" >
            <option value="" disabled>-- Select Academic year --</option>
            <option v-for="academic in activeacademicsandboards" 
                v-bind:value="{academicyearid: academic.id,syllabustype:academic.syllabustype}" 
                :key='academic.id+academic.syllabustype'
                v-show="academic.active"
            >{{academic.passingyear}}-{{academic.syllabustype}}</option>
        </select>
    </div>
    <div class="col-lg-3" v-show="isactive==0">
        <label class="col-sm-1 control-label" style="width:50% !important">Archived Years:</label>
        <select  class="form-control gradeFilter" v-model="archivedacademicDetails" v-on:change="changingacademicyear()" style="width:50%" >
            <option value="" disabled>-- Select Academic year --</option>
            <option v-for="academic in archivedacademicsandboards" 
                v-bind:value="{academicyearid: academic.id,syllabustype:academic.syllabustype}" 
                :key='academic.id+academic.syllabustype'
                v-show="!academic.active"
            >{{academic.passingyear}}-{{academic.syllabustype}}</option>
        </select>
    </div> 
    <div  style="float:left;width:25%" class="col-lg-3" >
        <label class="col-sm-1 control-label" style="width:25% !important">Grade :</label>
        <select class="form-control gradeFilter" @change="selectGrade()" v-model="grade" style="width:51%;margin-right:7px">
            <option  v-for="grade in gradesList" v-bind:value="grade.id" :key="grade.id" v-if="(isactive==1 && grade.academicid === activeacademicDetails.academicyearid) || (isactive==0 && grade.academicid === archivedacademicDetails.academicyearid)" >{{grade.gradename}}</option>
        </select>
    </div>   
    <div style="float:right;" class="col-lg-2" @change="changestatus">
        <label><input type="radio"  name="status" value=1 v-model="isactive">Active</label>
        <label><input type="radio"  name="status" value=0 v-model="isactive">Archived</label>
    </div>
    <br>
    <hr />
    <div class="col-lg-2 adminreset-padding adminreset-margin">
        <sidebar></sidebar>
    </div>
    <div class="col-lg-10">
        <router-view v-bind:school="school" v-bind:userdetails="userdetails" v-bind:acdemicyearandboard="acdemicyearandboard" v-bind:listoftests="listoftests"></router-view>
    </div>
</div>

</template>
<script>
import sidebar from './testssidebar_template.vue';
import UserService from '../../../services/userService.js';
import store from '../../../store.js'
export default{
    props:['school','userdetails','acdemicyearandboard'],
    components:{
        'sidebar':sidebar
    },
    data(){
        return{
            grade:1,
            gradesList:[],
            gradeid:{},
            listoftests:[],
            tenantId: this.$cookie.get('id'),
            academicYearObj :this.$store.state.acdemicyearandboard,
            academicDetails: {},
            activeacademicDetails:{},
            archivedacademicDetails:{},
            activeacademicsandboards:[],
            archivedacademicsandboards:[],
            academicsandboards:{},
            isactive:1,
        }
    },
    created() {
        // this.academicDetails= {
        //         academicyearid : this.academicYearObj.academicyearid,
        //         syllabustype : this.academicYearObj.syllabustype
        //     }
        console.log("In tests module school data : "+JSON.stringify(this.school))
        store.commit('SCHOOL',this.school);
        store.commit('USER_DETAILS',this.userdetails);
        UserService.AcademicYears(this.tenantId).then((response)=>{
            this.academicsandboards=response.data.academics;
            console.log(this.academicsandboards);
            for(let i=0;i<this.academicsandboards.length;i++){
                if(this.academicsandboards[i].active){
                this.activeacademicsandboards.push(this.academicsandboards[i]);
                } else {
                this.archivedacademicsandboards.push(this.academicsandboards[i]);
                }
            }
            console.log(this.activeacademicsandboards);
            if(this.activeacademicsandboards.length>0){
                this.activeacademicDetails= {
                    academicyearid : this.activeacademicsandboards[0].id,
                    syllabustype : this.activeacademicsandboards[0].syllabustype
                }
            }
            if(this.archivedacademicsandboards.length>0){
                this.archivedacademicDetails= {
                    academicyearid : this.archivedacademicsandboards[0].id,
                    syllabustype : this.archivedacademicsandboards[0].syllabustype
                }
            }
            this.academicDetails = this.activeacademicDetails;
            this.getGradeList();
        })
        // this.getGradeList();
    }, 
    methods:{
        changingacademicyear: function(){
            if(this.isactive == 1){
                this.academicDetails = this.activeacademicDetails
            } else {
                this.academicDetails = this.archivedacademicDetails
            }
            this.getGradeList();
        },
        changestatus: function(){
            if(this.isactive == 1){
                this.academicDetails = this.activeacademicDetails
            } else {
                this.academicDetails = this.archivedacademicDetails
            }
            this.getGradeList();
        },
        getGradeList: function() {
            UserService.Grades(this.academicDetails.syllabustype, this.tenantId).then((response) => {
                this.gradesList = response.data; 
                if(this.gradesList.length > 0){
                    this.grade = this.gradesList[0].id;
                }
                console.log(JSON.stringify(response.data))
                this.selectGrade();
            })
        },
        selectGrade: function() {
           this.gradeid={
             id:this.grade,
            //  academicyear:this.$store.state.acdemicyearandboard.academicyearid 
             academicyear:this.academicDetails.academicyearid 

          }
          this.$store.commit('gradeid',this.gradeid);
        //   window.location.reload()
        //   this.$router.push("/tests/list");
          this.getGradeTests();
        },
        getGradeTests : function(){
             UserService.ListOfTests(this.gradeid,this.tenantId).then((response)=>{
                console.log(response);
                this.listoftests=response.data;
            })
        },
    }

}
</script>

<style>
.adminreset-padding{
    padding:0;
}
.adminreset-margin{
    margin:0
}
</style>
