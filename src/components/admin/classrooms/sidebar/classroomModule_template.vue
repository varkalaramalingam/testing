<template>
<div>    
    <br>
    <!-- <div class="col-lg-3">
        <label class="col-sm-1 control-label" style="width:50%">Academic Year:</label>
        <select  class="form-control gradeFilter" v-model="academicDetails.academicyearid" v-on:change="changingacademicyear()" style="width:50%" >
            <option value="" disabled>-- Select Academic year --</option>
            <option v-for="academic in academicsandboards.academics" v-bind:value="academic.id" :key='academic.id'>{{academic.passingyear}}</option>
        </select>
    </div>
    <div class="col-lg-3">
        <label class="col-sm-1 control-label" style="width:50%">Syllabustype:</label>
        <select  class="form-control gradeFilter" v-model="academicDetails.syllabustype" v-on:change="changingboard()" style="width:50%" >
            <option value="" disabled>-- Select Board of education --</option>
            <option v-for="board in academicsandboards.boards" >{{board.syllabustype}}</option>
        </select>
    </div> -->
    <!-- <div class="col-lg-4">
            <label class="col-sm-1 control-label" style="width:50% !important">Academic Year:</label>
            <select  class="form-control gradeFilter" v-model="academicDetails" v-on:change="changingacademicyear()" style="width:50%" >
                  <option disabled>-- Select Academic year --</option>
                  <option v-for="academic in activeacademicsandboards" 
                     v-bind:value="{academicyearid: academic.id,syllabustype:academic.syllabustype}" 
                     :key='academic.id'
                     v-show="academic.active"
                  >{{academic.passingyear}}-{{academic.syllabustype}}</option>
            </select>
    </div> -->
    <div class="col-lg-4" v-show="isactive==1">
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
    <div class="col-lg-4" v-show="isactive==0">
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
    <div style="float:left;width:25%" class="col-lg-4" >
        <label class="col-sm-1 control-label" style="width:35%">Grade :</label>
        <select class="form-control gradeFilter" @change.prevent="selectGrade()" style="width:51%;margin-right:7px" v-model="grade">
            <option value="" disabled>-- Select Academic Grade --</option>
            <option v-for="grade in gradesList" v-bind:value="grade.id">{{grade.gradename}}</option>
        </select>
    </div>
    <div style="float:left;width:25%" class="col-lg-3" >
        <label class="col-sm-1 control-label" style="width:35%">Section :</label>
        <select class="form-control gradeFilter" @change.prevent="selectSection()" style="width:51%;margin-right:7px" v-model="section" :disabled="grade == 0">
            <option v-for="section in sectionsList" v-bind:value="section.id">Section - {{section.sectionname}}</option>
        </select>
    </div>
    <div style="float:left;" class="col-lg-2" @change="changestatus">
        <label><input type="radio"  name="status" value=1 v-model="isactive">Active</label>
        <label><input type="radio"  name="status" value=0 v-model="isactive">Archived</label>
    </div>
    <br>
    <hr />
    <!-- {{academicDetails}} -->
    <div class="col-lg-2 adminreset-padding adminreset-margin">
        <classrooms-side-bar v-bind:filter="filter" />
    </div>
    <div class="col-lg-10">
        <router-view v-bind:filter="filter"></router-view>
    </div>
</div>

</template>
<script>
import UserService from '../../../../services/userService.js';
import store from '../../../../store.js';
import ClassroomsSideBar from './classroomSideBar_template.vue'; 
export default{
    components:{
        ClassroomsSideBar
    },
    props: ["acdemicyearandboard"],
    data(){
        return{
            addingstudenttosection:{admissionnumber:''},
            tenantId:this.$cookie.get('id'),
            myClassDetails:this.$store.state.myClass,
            selectedSection: this.$store.state.selectedSection,
            // acdemicyearandboard:this.$store.state.acdemicyearandboard,
            academicDetails:{},
            gradesList:[],
            sectionsList:[],
            sections:[],
            grade:0,
            section:0,
            sectionsListCopy:[],
            gradeListCopy :[],
            school:{},
            userdetails : {},
            setSectionId:true,
            academicsandboards:{},
            filter:{},
            activeacademicDetails:{},
            archivedacademicDetails:{},
            activeacademicsandboards:[],
            archivedacademicsandboards:[],
            isactive:1
        }
    },
    created(){
        this.tenantId = this.$cookie.get('id');
        this.school =  this.$store.state.school;
        this.userdetails = this.$store.state.userDetails;
        // this.academicDetails= {
        //     academicyearid : this.acdemicyearandboard.academicyearid,
        //     syllabustype : this.acdemicyearandboard.syllabustype
        // }
        // this.filter = this.academicDetails
        // this.academicDetails = this.$store.state.acdemicyearandboard;
        UserService.AcademicYears(this.tenantId).then((response)=>{
            this.academicsandboards=response.data.academics;
            for(let i=0;i<this.academicsandboards.length;i++){
                if(this.academicsandboards[i].active){
                    this.activeacademicsandboards.push(this.academicsandboards[i]);
                } else {
                    this.archivedacademicsandboards.push(this.academicsandboards[i]);
                }
            }
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

            this.filter.academicyearid = this.academicDetails.academicyearid;
            this.filter.syllabustype = this.academicDetails.syllabustype;
            this.getGradeList();
        })
        // console.log(this.myClassDetails)
        // this.getGradeList();            
    },
    methods:{
        changingacademicyear: function(){
            if(this.isactive == 1){
                this.academicDetails = this.activeacademicDetails
            } else {
                this.academicDetails = this.archivedacademicDetails
            }
            this.filter.academicyearid = this.academicDetails.academicyearid;
            this.filter.syllabustype = this.academicDetails.syllabustype;
            this.getGradeList();
            this.$router.push("/crm");
        },
        changestatus: function(){
            if(this.isactive == 1){
                this.academicDetails = this.activeacademicDetails
            } else {
                this.academicDetails = this.archivedacademicDetails
            }
            this.getGradeList();
            this.$router.push("/crm");
        },
        selectGrade: function() {
            console.log("Grade: "+ this.grade)
            //this.section = '0';
            this.sectionsList = [];
            let length = this.sectionsListCopy.length;
            for (let i = 0; i < length; i++) {
                if (this.grade == this.sectionsListCopy[i].gradeid) {
                    this.sectionsList.push(this.sectionsListCopy[i]);
                }
            }
            if(this.sectionsList.length > 0 && this.setSectionId){
                this.section = this.sectionsList[0].id;
            }
            this.setSectionId = true;
            this.filter.gradeid = this.grade;
            this.filter.classroomid = this.section;
            this.filter.classteachername = this.sectionsList[0].teachername;
            for(let i=0; i < this.sectionsListCopy.length; i++){
                if(this.grade === this.sectionsListCopy[i].gradeid){
                    this.filter.academicgradeid = this.sectionsListCopy[i].academicgradeid;
                }
            }
            this.$router.push("/crm");
            // this.setSelectedGradeSection();
            // window.location.reload()
            
        },
        selectSection : function(){
            this.filter.classroomid = this.section;
            let sectionsLength = this.sectionsList.length;
            for(let i = 0; i < sectionsLength; i++){
                if(this.section == this.sectionsList[i].id){
                    this.filter.classteachername = this.sectionsList[i].teachername;
                    break;
                }
            }
            // this.setSelectedGradeSection();
            this.$router.push("/crm");
            // window.location.reload()
        },
        getGradeList : function(){
            UserService.Grades(this.academicDetails.syllabustype, this.tenantId).then((response) => {
                this.gradeListCopy = response.data;
                //this.grade = this.gradeListCopy[0].id;
                this.getSectionsList();
            })
        },
        getSectionsList : function(){
            UserService.Sections(this.academicDetails,this.tenantId).then((response)=>{
                this.gradesList = [];
                this.sectionsList=[];
                this.sectionsListCopy = response.data;
                //this.section = this.sectionsListCopy[0].id;
                // this.getSelectedGradeSection();
                // console.log(this.grade, this.section)
                let length = this.gradeListCopy.length;
                let sectionsLength = this.sectionsListCopy.length;
                let temp = [];
                for(let i=0;i<length;i++){
                    for(let j=0;j<sectionsLength;j++){
                        if(this.gradeListCopy[i].id == this.sectionsListCopy[j].gradeid && 
                            temp.indexOf(this.gradeListCopy[i].id) == -1){
                            this.gradesList.push(this.gradeListCopy[i]);
                            temp.push(this.gradeListCopy[i].id);
                            break;
                        }
                    }
                }
                this.filter.gradeid = this.gradesList[0].id;
                this.grade = this.gradesList[0].id;
                for (let i = 0; i < sectionsLength; i++) {
                    if (this.grade == this.sectionsListCopy[i].gradeid) {
                        this.sectionsList.push(this.sectionsListCopy[i]);
                    }
                }
                if(this.sectionsList.length > 0 && this.setSectionId){
                    this.section = this.sectionsList[0].id;
                    this.filter.academicgradeid = this.sectionsList[0].academicgradeid;
                }
                this.filter.classroomid = this.section;
                this.filter.classteachername = this.sectionsList[0].teachername;
                this.setSectionId = true;
                // this.selectGrade();
            })
        },
        setSelectedGradeSection:function(){
            let selectedClassRoomObj = {
                gradeId :this.grade,
                sectionId : this.section
            }
            this.$store.commit('SET_SELECTED_CLASSOBJ',selectedClassRoomObj);
        },
        getSelectedGradeSection:function(){
            let selectedClassRoomObj = this.$store.state.selectedClassRoomObj;
            if(selectedClassRoomObj && selectedClassRoomObj.gradeId && selectedClassRoomObj.sectionId){
                this.grade = selectedClassRoomObj.gradeId;
                this.section = selectedClassRoomObj.sectionId;
            }else{
                if(this.gradeListCopy && this.gradeListCopy.length > 0){
                    this.grade = this.gradeListCopy[0].id;
                }
                let sectionsLength = this.sectionsListCopy.length;
                for(let i = 0; i < sectionsLength; i++){
                    if(this.grade == this.sectionsListCopy[i].gradeid){
                        this.section = this.sectionsListCopy[i].id;
                        break;
                    }
                }
                // if(this.sectionsListCopy && this.sectionsListCopy.length  > 0){
                //     this.section = this.sectionsListCopy[0].id;
                // }
            }
            this.setSelectedGradeSection();
        },
    }

}
</script>

