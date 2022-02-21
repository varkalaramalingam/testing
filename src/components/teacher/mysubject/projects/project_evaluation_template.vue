<template>
    <div id="container" class="container-fluid">
        <div class="col-lg-12">
         <div class="col-lg-6 text-left">
             <h3 class="student-head">{{this.project.name}}</h3>
             <h4>Max Marks : {{this.submittedStudent.max_marks}}</h4>
         </div>
        <button class="assign-button" @click="startEvaluation()" v-show="hideBtn">Start Evaluation</button>
        </div>
         <br>
         <br><br>
         <div class="row">
            <div class="column" v-for="image in urlData">
                <div class="card-page">
                <button class="btnAsLink" @click="eachReport(image.report_url)">
                    <img :src="image.report_url" width="200" height="200">
                    </button>
                </div>
            </div>
         </div>
         <hr/>
         <p hidden>{{totalScore}}</p>
         <div class="evaluation" v-show="show">
         <div class="col-lg-12">
             <div v-for="group in skills">
                 <div>
                     <h2>{{group[0].skillgroupname}}</h2>
                     <br>
                     <div v-for="skill in group">
                         <div class="row mb-15">
                         <div class="col-md-2"><p>{{skill.skillname}}</p></div>
                         <div class="col-md-15"><input type="text" class="form-control popUpEle" v-model = "skill.score"  placeholder="Enter Score"></div>
                         </div>
                     </div>
                 </div>
            </div>
            <br>
            <br>
            <div class="row mb-15">
               <div class="col-md-2"> <label>Overall Score</label></div>
               <div class="col-md-20"><input type="text" class="form-control popUpEle" placeholder="Overall Score" v-model="totalScoreOfProject"></div>
            </div>
             <div class="row mb-15">
               <div class="col-lg-12"><label>Summary of the feedback</label></div>
               <div class="summary">
                <textarea type="text" class="form-control" v-model="feedback"
                placeholder="Give feedback about your evaluation.."></textarea>
               </div>
            </div>
            <div class="row mb-15">
                 <div class="col-md-4"><button class="btn btn-info" @click="cancel()">Cancel</button></div>
                 <div class="text-right"><button type="button" class="common-button" @click="submitProjectSkillScores()">Save</button></div>
            </div>
            <br>
          </div>
            
         </div>

    </div>
</template>
<script>
import { mapMutations } from "vuex";
import UserService from "../../../../services/userService";
import store from "../../../../store";

export default {
  data() {
    return {
      tenantId: this.$cookie.get("id"),
      project: this.$store.state.projectDetails,
      submittedStudent: this.$store.state.submittedStudentProj,
      studentid: 0,
      project_id: "",
      skillGroups: [],
      skills: [],
      urlData: [],
      skillScore: {},
      feedback: "",
      show: false,
      count: 0,
      hideBtn:true,
      totalScoreOfProject: 0
    };
  },

  created() {
   
    this.studentid = this.submittedStudent.studentid;
    this.project_id = this.project.project_id;

    console.log(this.studentid);
    
    console.log(this.submittedStudent);

    this.getSkills();
    this.getProjectScoreById();
    this.GetListOfUrls();
  },
  methods: {
    
    ...mapMutations(["SET_PROJECT_REPORT_DETAILS"]),

    getSkills() {
      UserService.getSkills(this.tenantId).then(response => {
        console.log(response);
        let skills1 = response.data;

        UserService.getProjectScoresById(this.tenantId, this.studentid, this.submittedStudent.id).then(response => {
          for (let obj in skills1) {
            let items = Object.values(skills1[obj]);
            for (let item of items) {
              for (let score in response.data) {
                // console.log(score +" "+response.data[score])
                if (score == item.id) item.score = response.data[score];
              }
              //console.log(item)
            }
          }
          
          this.skills = skills1;
         
        });
      });
    },

    getProjectScoreById() {
      console.log(this.studentid);
       console.log(this.submittedStudent);
      console.log(this.submittedStudent.id);
      UserService.getProjectScoresById(this.tenantId,this.studentid,this.submittedStudent.id).then(response => {});
    },

    submitProjectSkillScores() {
      this.skillScore.name = this.project.name;
      this.skillScore.studentid = this.studentid;
      this.skillScore.project_id = this.project_id;
      this.skillScore.project_assign_id = this.submittedStudent.id;
      this.skillScore.skill_score = [];

      for (let skill in this.skills) {
        let items = Object.values(this.skills[skill]);
        for (let item of items) {
          //if(item.score != undefined){
          let score = {
            skillid: Number(item.id),
            score: Number(item.score) || 0
          };
          this.skillScore.skill_score.push(score);
          // }
          //console.log(this.skillScore.length);
        }
      }

      let updateProjectScore = {
        status: "Evaluated",
        secured_marks: this.totalScoreOfProject,
        feedback: this.feedback
      };

      if ((this.totalScoreOfProject <= this.submittedStudent.max_marks) && (this.totalScoreOfProject > 0)) {
      
        //if(this.skillScore.skill_score.length){
        if (this.submittedStudent.status === "submitted") {
          UserService.ProjectSkillScores(this.tenantId, this.skillScore).then(response => {
              UserService.updateProjectScore(this.tenantId,this.studentid,this.submittedStudent.id, updateProjectScore).then(response => {
                this.feedback = "";
                this.$alert("Successfully completed evaluation", "Evaluation Completed", "success" );
                this.submittedStudent.status = "Evaluated";
                this.SET_PROJECT_REPORT_DETAILS(this.submittedStudent);
                this.$router.push({ path:`ps-assigned-status`});
              });
            })
            .catch(error => {
              this.$alert("Failed to evaluate", "Failed", "error");
            });
        } else {
          
          // Execute update functionality
          if (this.submittedStudent.status === "Evaluated") {
            UserService.updateProjectSkillScore(this.tenantId,this.studentid,this.submittedStudent.id,this.skillScore).then(response => {
              UserService.updateProjectScore(this.tenantId,this.studentid,this.submittedStudent.id,updateProjectScore).then((response)=>{
                this.$alert("Sucessfully updated", "Done", "success");
                this.$router.push({ path:`ps-assigned-status`});
              });
              
            });
          }
        }
      } else if (this.skillScore.skill_score.length <= 0) {
        this.$alert("Please fill aleast one field", "Empty Score", "warning");
      } else {
        this.$alert("Please enter the score below than maximum score", "Check Your Score", "warning"  );

      }
    },

    cancel() {
      for (let skill in this.skills) {
        let items = Object.values(this.skills[skill]);
        for (let item of items) {
          if (item.score != undefined) {
            delete item["score"];
          }
        }
      }

      this.feedback = "";
      this.totalScoreOfProject = 0;
    },

    GetListOfUrls() {
      UserService.GetDocUrls(this.tenantId, this.studentid,this.project_id,this.submittedStudent.id).then(response => {
        this.urlData = response.data;
      });
    },

    startEvaluation() {
      this.count++;
      this.show = true;
      this.hideBtn = false;
    },

    eachReport(url) {
      this.SET_PROJECT_REPORT_DETAILS(url);
      this.$router.push({
        path: `view-report`
      });
    }
  },

  computed: {
    totalScore: function() {
      this.totalScoreOfProject = 0;

      for (let skill in this.skills) {
        let items = Object.values(this.skills[skill]);
        for (let item of items) {
          if (item.score != undefined) {
            this.totalScoreOfProject += Number(item.score);
          }
        }
      }
      return this.totalScoreOfProject;
    }
  }
};
</script>
<style scoped>
.assign-button {
  background-color: #0b366f;
  background-image: none;
  border-color: #0b366f;
  color: white;
  padding: 5px 30px;
  margin-top: 0px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 3px;
  float: right;
  margin-top: 20px;
}

input {
  margin-bottom: 15px;
  max-width: 215px;
  margin-left: 15px;
  color: black;
}

textarea {
  margin-bottom: 15px;
  max-width: 480px;
  margin-left: 15px;
  color: black;
}

.col-md-2 {
  margin-left: 80px;
}

.card-page {
  border-radius: 5px;
  padding: 7px;
  text-align: center;
}
.column {
  float: left;
  padding: 0 10px;
  margin: 15px auto;
}

.btnAsLink {
  outline: none;
  background: none;
  border: none;
  color: blue;
}
</style>
