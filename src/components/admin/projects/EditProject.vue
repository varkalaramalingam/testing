<template>
  <div id="container" class="container-fluid">
    <div class="row reset-padding reset-margin">
        <div class="row">
            <div class="col-lg-6">
		          <div class="page-heading">Edit Project</div>
            </div>
            <div class="col-lg-6 text-right">
              <button style="marginTop:15px;outline:none"  type="button" class="btn btn-info back" @click="back">Back to Projects</button>
            </div>
        </div>
      </div>
       <hr/>
       
       <div class="video data-set">
          <h4>Video Information</h4>
          <div class="row mb-15">
              <div class="col-md-2"><label>Video url</label></div>
              <div class="col-md-15"><input type="text" class="form-control popUpEle" placeholder="Video Url*" v-bind:style="[invalidVideoStyles]" v-model="worksheetObj.videoUrl"></div>
            </div>
            <div class="row mb-15">
              <div class="col-md-2"><label>Duration</label></div>
              <div class="col-md-15"><input type="text" class="form-control popUpEle" placeholder="Duration" v-model="worksheetObj.duration"></div>
            </div>
            <div class="row mb-15">
              <div class="col-md-2"><label>Owner</label></div>
              <div class="col-md-15"><input type="text" class="form-control popUpEle" placeholder="Owner" v-model="worksheetObj.owner" readonly></div>
            </div>
          </div>

           <div class="basic_details data-set">
            <h4>Basic Details</h4>
            <div class="row mb-15">
              <div class="col-md-2"><label>Project Title</label></div>
              <div class="col-md-15"><input type="text" class="form-control popUpEle" placeholder="Project Title*" v-model="worksheetObj.title"></div>
            </div>
            <div class="row mb-15">
              <div class="col-md-2"><label>Subject</label></div>
              <div class="col-md-15"><select v-model="worksheetObj.subject" class="form-control popUpEle">
              <option value="">-- Select subject --</option>
              <option v-for="subject in listOfSubjects" v-bind:value="subject.subjectname">{{subject.subjectname}}</option>
              </select>
              </div>
            </div>
            <div class="row mb-15">
                <div class="col-md-2"><label>Concepts</label></div>
                <div class="col-md-15"><input type ="text" class="form-control popUpEle" placeholder="Concepts*" v-model="worksheetObj.concepts"></div>
             </div>
             <div class="row mb-15">
                <div class="col-md-2"><label>Short Description</label></div>
                <div class="col-md-15"><textarea class="form-control popUpEle" placeholder="Short Description*" id="txtArea" v-model="worksheetObj.shortDescription"></textarea>
                </div> 
             </div>
             <div class="row mb-15">
                <div class="col-md-2"><label>Tags</label></div>
                <div class="col-md-15"><input type="text" class="form-control popUpEle" placeholder="Tags" v-model="worksheetObj.tags"></div>
            </div>
         </div>

         <div class="additional_info data-set">
           <h4>Additional Information</h4>
            <div class="row mb-15">
              <div class="col-md-2"><label>Difficulty Level</label></div>
              <div class="col-md-15">
                  <select class="form-control gradeFilter" v-model="worksheetObj.difficulty" v-bind:style="[submitDifficultyColor(worksheetObj.difficulty)]">
                      <option value="" disabled selected>Difficulty Level</option>
                      <option>EASY</option>
                      <option>INTERMEDIATE</option>
                      <option>ADVANCED</option>
                   </select>
                </div>
            </div>
            <div class="row mb-15">
                <div class="col-md-2"><label>Grade</label></div>
                <div class="col-md-15">
                  <select v-model="worksheetObj.grade" class="form-control popUpEle">
                    <option value="">-- Select Grade --</option>
                    <option v-for="grade in listOfGrades" v-bind:value="grade.gradenumber">{{grade.gradename}}</option>
                  </select>
                </div>
              </div>
               <div class="row mb-15">
                  <div class="col-md-2"><label>Safety</label></div>
                  <div class="col-md-15"><input type="text" class="form-control popUpEle" placeholder="Safety Level" v-model="worksheetObj.safety"></div>
                </div>
         </div>

         <div class="description data-set">
              <h4>Project Description</h4>
              <CkEditor height="100" class="editor" v-model="worksheetObj.procedure.steps"></CkEditor>
              <div style="clear:both"></div>
         </div>

             <div class="materials_info data-set">
                    <h4>Material Information</h4>
                    <div class="row mb-15">
                      <div class="col-md-2"><label>Category</label></div>
                      <div class="col-md-15"><input type="text" class="form-control popUpEle" placeholder="Category" id="category" v-model="worksheetObj.category"></div>
                    </div>
                    <div class="row mb-15">
                      <div class="col-md-2"><label>Cost of Materials</label></div>
                      <div class="col-md-15"><input type="number" class="form-control popUpEle" placeholder="cost of materials"  min="100" v-model="worksheetObj.costOfMaterials"></div>
                    </div>
                    <div class="row mb-15">
                      <div class="col-md-2"><label>Precautions</label></div>
                      <div class="col-md-15">
                        <textarea class="form-control popUpEle" placeholder="Precautions" v-model="worksheetObj.precautions"></textarea>
                        </div>
                    </div> 
                      <div class="row mb-15">
                        <button type="button" @click="isOpen = !isOpen;" style="margin-left:200px" class="btn btn-primary">Edit Materials</button> 
                      </div>
                  </div>
                  <div class = "extra_info data-set">
               <h4>Extras</h4>
               <div class="row mb-15">
                  <div class="col-md-2"><label>Status</label></div>
                      <div class="col-md-15">
                         <select v-model="worksheetObj.status" class="form-control popUpEle">
                            <option value="">-- Select status --</option>
                            <option v-for="status in listOfStatus" v-bind:value="status.status">{{status.status}}</option>
                          </select>
                      </div>
                </div>
                <div class="row mb-15">
               <div class="col-md-2"><label>Additional Grades</label></div>
                <div class="col-md-15">
                    <select  class="form-control popUpEle" v-model="worksheetObj.additionalGrades[0]">
                     <option value="">--Select--</option>
                    <option v-for="grades in options" :value="grades" :key="grades">{{grades}}</option>
                   </select>
                 </div>
                 </div>
                 <div class="row mb-15">
                 <div class="col-md-2"><label></label></div>
                 <div class="col-md-15">
                     <select  class="form-control popUpEle" v-model="worksheetObj.additionalGrades[1]">
                      <option value="">--Select--</option>
                      <option v-for="grades in options" :value="grades" :key="grades">{{grades}}</option>
                    </select></div>
                 </div>
                 <div class="row mb-15">
                  <div class="col-md-2"><label></label></div>
                  <div class="col-md-15">
                     <select  class="form-control popUpEle" v-model="worksheetObj.additionalGrades[2]">
                        <option value="">--Select--</option>
                        <option v-for="grades in options" :value="grades" :key="grades">{{grades}}</option>
                      </select></div>
                 </div>
              </div>
               <transition name="modal">
             <div v-if="isOpen">
              <div class="overlay" @click.self="isOpen = false;">
                <div class="modalLayout">
                  <h4>Edit Materials</h4>
                   <hr>
                   <div class="row mb-15" v-for="(input,k) in worksheetObj.materialsRequired">
                      <div class="col-md-4">
                         <input type ="text" class="form-control popUpEle matDetails" placeholder="name" v-model="input.name">
                      </div>
                      <div class="col-md-4">
                         <input type = "number" class="form-control popUpEle matDetails" placeholder="quantity" v-model="input.quantity">
                      </div>
                      <div class="col-md-4">
                        <input type ="text" class="form-control popUpEle matDetails" placeholder="description" v-model="input.description"><br>
                      </div>
                        <span>
                           <!--<i class="fa fa-minus-circle"  style="color:red" v-show="k || ( !k && worksheetObj.materialsRequired.length > 1)"></i>-->
                           <i class="fa fa-plus-circle"  style="color:green;visibility:hidden" v-show="k == worksheetObj.materialsRequired.length-1"></i>
                            </span> 
                       </div>
                   <div class="btn-set">
                    <button type="button" class="btn btn-info" @click="cancel">Cancel</button>  
                   <button type="button"  id="addBtn"  class="btn btn-primary" @click="updateMaterialDetails">Save</button>
                   </div>
               </div>
             </div>
             </div>
            </transition>
              <div class="btn-set">
             <button type="button" class="btn btn-info" id="cancel" @click="back">Cancel</button>        
             <button type="submit" id="myBtn" class="btn btn-success" @click="saveProjectDetails(worksheetObj._id);">Update</button>
            </div>
  </div>
    
</template>
<script>
import ProjectService from "../../../services/projectService";
import CkEditor from "../worksheets/ckeditormathequations_template";
import UserService from "../../../services/userService";

export default {
  name: "edit-project",
  components: {
    CkEditor
  },

  data() {
    return {
      id: this.$route.params.id,
      isOpen:false,
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      listOfSubjects: [],
      listOfGrades: [],
      listOfStatus: [],
      tenantId: this.$cookie.get("id"),
      academicYearObj: this.$store.state.acdemicyearandboard,
      academicDetails: {},
      worksheetObj: {},
    }
  },

  created() {
    //this.getID();

     ProjectService.GetSingleProject(this.id).then(response => {
      this.worksheetObj = response.data;
      console.log(this.worksheetObj);
    });

    UserService.Subjects(this.tenantId).then(response => {
        this.listOfSubjects = response.data;
        //this.getListOfWorksheets();
      })
      .catch(error => {
        console.log(JSON.stringify(error.data));
      });

      UserService.getWorksheetStatuses(this.tenantId).then(response => {
      this.listOfStatus = response.data.resultsMap.wsStatuses;
      });

    this.academicDetails = {
      academicyearid: this.academicYearObj.academicyearid,
      syllabustype: this.academicYearObj.syllabustype
    };

    UserService.ClassroomGrades(this.academicDetails.syllabustype, this.tenantId).then(response => {
      this.listOfGrades = response.data;
    });

   
  },
  computed:{
        
     videoIsValid: function() {
         return this.worksheetObj.videoUrl.includes('https://');
    },

    invalidVideoStyles: function() {
      if (this.worksheetObj.videoUrl && !this.videoIsValid) {
        return {
          'border-color': '#da5252'
        }
      }
      if(this.worksheetObj.videoUrl && this.videoIsValid){
        return{
          'border-color': '#0F9D58'
        }
      }
    }

  },

  methods: {

    createWorksheetObj: function() {
      this.worksheetObj = {
        title: "",
        subject: "",
        shortDescription:"",
        duration:"",
        grade: "",
        videoUrl:"",
        status: "",
        safety:"",
        precautions:"",
        difficulty: "",
        category:"",
        owner:[],
        tags:[],
        concepts:[]
  
      }
    },
  
   updateMaterialDetails: function(){
     
     this.isOpen=false
   },

    saveProjectDetails: function(id){
      if (this.validateFields()) {
       let worksheetObject = {

          title:this.worksheetObj.title,
          grade:this.worksheetObj.grade,
          subject:this.worksheetObj.subject,
          status:this.worksheetObj.status,
          safety:this.worksheetObj.safety,
          videoUrl:this.worksheetObj.videoUrl,
          duration:this.worksheetObj.duration,
          category:this.worksheetObj.category,
          precautions:this.worksheetObj.precautions,
          costOfMaterials:this.worksheetObj.costOfMaterials,
          shortDescription:this.worksheetObj.shortDescription,
          difficulty: this.worksheetObj.difficulty,
          owner:this.worksheetObj.owner,
          tags:this.worksheetObj.tags,
          concepts:this.worksheetObj.concepts,
          additionalGrades:this.worksheetObj.additionalGrades,
          materialsRequired:this.worksheetObj.materialsRequired,
          procedure:{
                steps:this.worksheetObj.procedure.steps
              }              
        };

         console.log(worksheetObject);
        //this.listOfWorksheets.push(worksheetObject);
        ProjectService.updateProject(id, worksheetObject)
          .then(response => {
            this.$alert('Successfully updated','Done','success')
            this.back();
          })
          .catch(error => {
            console.log("Error response " + JSON.stringify(error.response));
            this.$alert('Failed to update','Failed','error')
          });
        /*}*/
      } else {
        this.$alert('Enter correct data','Invalid Data','warning')
      }
    },

    validateFields: function() {
      if (this.checkEmptyVal(this.worksheetObj.title)) {
        return false;
      } else if (this.checkEmptyVal(this.worksheetObj.grade)) {
        return false;
      } else if (this.checkEmptyVal(this.worksheetObj.subject)) {
        return false;
      } else if ((this.worksheetObj.status == "" || this.worksheetObj.status == undefined)){
        return false;
      }
      return true;
    },

    checkEmptyVal: function(val) {
      if (val == "" || val == null) {
        return true;
      }
      return false;
    },

    submitDifficultyColor:function(level){
      const levelsMap = { EASY: "darkgreen",INTERMEDIATE: "orange",ADVANCED: "red" };

      for (let levels in levelsMap) {
        if (level == levels) {
          return{'border-color':levelsMap[levels]}
        }
      }
    },

    back() {
      this.$router.push("/projects/list");
    },


    cancel(){
      this.isOpen=false
    }
  }
}
</script>
<style scoped>
.data-set {
  margin-bottom: 30px;
}

.data-set h4 {
  font-weight: bold;
  font-size: 16px;
  margin-left: 190px;
  color: black;
}

.data-set input,.data-set select,.data-set textarea {
  margin-bottom: 15px;
  max-width: 450px;
  margin-left: 15px;
  color: black;
}

.btn-set {
  margin: 15px 0;
  text-align: right;
}

.extra_info label {
  margin-left: 15px;
}

.editor{
  margin-left:190px;
}

.modalLayout {
  width:800px;
  margin: 0px auto;
  padding: 20px;
  padding-bottom:4px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}
.fadeIn-enter {
  opacity: 0;
}
.fadeIn-leave-active {
  opacity: 0;
  transition: all 0.2s step-end;
}
.fadeIn-enter .modal,
.fadeIn-leave-active.modal {
  transform: scale(1.1);
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #00000094;
  z-index: 999;
  transition: opacity 0.2s ease;
}

.matDetails{
  display: inline;
  max-width:250px;
}

.mb-15{
  margin-bottom: 15px;
}
</style>
