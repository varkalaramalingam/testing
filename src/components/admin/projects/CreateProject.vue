<template>
   <div id="container" class="container-fluid">
      <div class="row reset-padding reset-margin">
        <div class="row">
            <div class="col-lg-6">
		          <div class="page-heading">Add New Project</div>
            </div>
            <div class="col-lg-6 text-right">
              <button style="marginTop:15px;outline:none"  type="button" class="btn btn-info back" @click="back">Back to Projects</button>
            </div>
        </div>
		  <hr/>
      <form v-on:submit.prevent="sendData">
          <div class="video data-set">
          <h4>Video Information</h4>
            <input type="text" class="form-control popUpEle" placeholder="Video Url*" v-bind:style="[invalidVideoStyles]" v-model="project.videoUrl" required>
            <input type = "text" class="form-control popUpEle" placeholder="Duration*" v-bind:style="[invalidDurationStyles]" v-model="project.duration">
            <input type="text" class="form-control popUpEle" placeholder="Owner" v-model="project.owner" readonly>
          </div>

          <div class="basic_details data-set">
            <h4>Basic Details</h4>
            <input type="text" class="form-control popUpEle" placeholder="Project Title*" v-model="project.title" required>
            <select class="form-control gradeFilter subject" id="subject" v-model="project.subject" required>
             <option value="" disabled selected>Select Subject*</option>
             <option v-for="subject in listOfSubjects">{{subject.subjectname}}</option>
             </select>
             <input type ="text" class="form-control popUpEle" placeholder="Concepts" v-model="project.concepts">
             <textarea class="form-control popUpEle" placeholder="Short Description*" v-model="project.shortDescription" required></textarea> 
            <input type="text" class="form-control popUpEle" placeholder="Tags" v-model="project.tags"> 
         </div>

         <div class="additional_info data-set">
           <h4>Additional Information</h4>
           <select class="form-control gradeFilter" v-model="project.difficulty" required>
            <option value="" disabled selected>Difficulty Level*</option>
            <option>EASY</option>
            <option>INTERMEDIATE</option>
            <option>ADVANCED</option>
           </select>
           <select class="form-control gradeFilter" v-model="project.grade" required>
            <option value="" disabled selected>Grade Level*</option>
            <option v-for="grade in listOfGrades" v-bind:value="grade.gradenumber">{{grade.gradename}}</option>
           </select>
           <input type="text" class="form-control popUpEle" placeholder="Safety Level" v-model="project.safety">
         </div>

         <div class="gallery data-set gallery-set">
           <h4>Gallery</h4>
           <label>Add Images*</label>
           <input type ="file" @change="addImage" required multiple/>
           <label>Add Banner Image*</label>
           <input type ="file" @change="addBannerImage" required>
           <label>Add Document</label>
           <input type ="file"  @change="addDocument">
           </div>
           
           <div class="description data-set">
             <h4>Project Description</h4>
             <CkEditor v-model="project.procedure.steps" height="100" class="editor"></CkEditor>
             <div style="clear:both"></div>
             </div>
                  <div class="materials_info data-set">
                    <h4>Material Information</h4>
                    <input type="text" class="form-control popUpEle" placeholder="Category*" id="category" v-model="project.category" required>
                    <input type="number" class="form-control popUpEle" placeholder="cost of materials" v-model="project.costOfMaterials" min="100">
                    <textarea class="form-control popUpEle" placeholder="Precautions" v-model="project.precautions"></textarea>
                    <button type="button" @click="isOpen = !isOpen;" style="margin-left:15px" class="btn btn-primary">Add Materials</button> 
                  </div>
                  <div class = "extra_info data-set">
               <h4>Extras</h4>
               <label>Additional Grades</label>
                <div>
                  <select  class="form-control popUpEle"  v-model="project.additionalGrades[0]">
                   <option value="">--Select--</option>
                   <option v-for="grades in options" :value="grades" :key="grades">{{grades}}</option>
                 </select>
                 <select  class="form-control popUpEle" v-model="project.additionalGrades[1]">
                    <option value="">--Select--</option>
                    <option v-for="grades in options" :value="grades" :key="grades">{{grades}}</option>
                 </select>
                 <select  class="form-control popUpEle" v-model="project.additionalGrades[2]">
                   <option value="">--Select--</option>
                   <option v-for="grades in options" :value="grades" :key="grades">{{grades}}</option>
                 </select>
                </div>
              </div>
           <transition name="modal">
             <div v-if="isOpen">
              <div class="overlay" @click.self="isOpen = false;">
                <div class="modalLayout">
                  <h4>Add Materials</h4>
                   <hr>
                   <div class="form-group" v-for="(input,k) in project.materialsRequired" :key="k">
                      <div class="row mb-15">
                        <div class="col-md-4">
                           <input type ="text" class="form-control popUpEle matDetails" placeholder="name" v-model="input.name">
                         </div>
                         <div class="col-md-4">
                           <input type = "number" class="form-control popUpEle matDetails" placeholder="quantity" v-model="input.quantity">
                          </div>
                           <div class="col-md-4">
                               <input type ="text" class="form-control popUpEle matDetails" placeholder="description" v-model="input.description">
                               <span style="float:right">
                                <i class="fa fa-minus-circle" @click="remove(k)" style="color:red" v-show="k || ( !k && project.materialsRequired.length > 1)"></i>
                                <i class="fa fa-plus-circle" @click="add(k)" style="color:green" v-show="k == project.materialsRequired.length-1"></i>
                              </span> 
                          </div>
                      </div>
                   </div>
                   <hr>
                    <div class="btn-set">
                    <button type="button" class="btn btn-info" @click="closeModal">Cancel</button>  
                   <button type="button"  id="addBtn"  class="btn btn-success" @click="setValues">Save</button>
                   </div>
               </div>
             </div>
             </div>
            </transition>
            <div class="btn-set">
             <button type="button" class="btn btn-info" id="cancel" @click="cancel">Cancel</button>        
             <button type="submit" id="myBtn" class="btn btn-primary" v-bind:disabled="!formIsValid">Create</button>
            </div>
      </form>
           </div>
           </div>
</template>
<script>
import ProjectService from '../../../services/projectService'
import CkEditor from '../worksheets/ckeditormathequations_template'
import UserService from  '../../../services/userService'

export default {
  name:'createProject',
  components:{
    CkEditor

  },
  data(){
      return{
          project:{
            title:'',
            subject:'',
            shortDescription:'',
            safety:'',
            difficulty:'',
            procedure:{
              steps:''
            },
            grade:'',
            image:[],
            doc:'',
            bannerImage:'',
            precautions:'',
            duration:'',
            videoUrl:'',
            category:'',
            tags:[],
            concepts:[],
            additionalGrades:[],
            owner:this.$cookie.get("tenant"),
            costOfMaterials:'',
            listOfProjects:[],
           // materialsRequired:[
                // name:'',
                // quantity:null,
                // description:''
            //],
            materials:{
              material1:{
                // name:'',
                // quantity:null,
                // description:''

              },
              material2:{
                // name:'',
                // quantity:null,
                // description:''

              },
              material3:{
                // name:'',
                // quantity:null,
                // description:''

              }
              
            },

            materialsRequired:[
                 {
               //name:'',
               //quantity:null,
               //description:''
                 }
            ],

        },
        isOpen:false,
        options:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        listOfSubjects:[],
        listOfGrades: [],
        tenantId: this.$cookie.get("id"),
        academicYearObj :this.$store.state.acdemicyearandboard,
        academicDetails: {},
        selectedFile:[],
        selectedDoc:null,
        selectedBannerImage:null,
        fd:{},
        docData:{},
        bd:{}

      }
  },
  created(){
  
    UserService.Subjects(this.tenantId).then((response) => {
                this.listOfSubjects = response.data;
                this.getListOfWorksheets();
            }).catch(error => {
                console.log(JSON.stringify(error.data))
            })

             this.academicDetails= {
                academicyearid : this.academicYearObj.academicyearid,
                syllabustype : this.academicYearObj.syllabustype
            }

            UserService.ClassroomGrades(this.academicDetails.syllabustype, this.tenantId).then((response) => {
            this.listOfGrades = response.data;
        })

        ProjectService.GetProjects().then((response)=>{
           this.listOfProjects = response.data;
        })

  },
  computed:{
    formIsValid: function(){
      return this.project.grade&&this.project.difficulty;
    },

    videoIsValid: function() {
      return this.project.videoUrl.includes('https://');
    },

    invalidVideoStyles: function() {
      if (this.project.videoUrl && !this.videoIsValid) {
        return {
          'background-color': '#ffeded',
          'border-color': '#da5252'
        }
      }
      if(this.project.videoUrl && this.videoIsValid){
        return{
          'background-color': '#def0e3',
          'border-color': '#0F9D58'

        }
      }

    },

    durationIsValid: function() {
      return this.project.duration.includes(':');
    },

    invalidDurationStyles: function() {
      if (this.project.duration && !this.durationIsValid) {
        return {
          'background-color': '#ffeded',
          'border-color': '#da5252'
        }
      }
      if(this.project.duration && this.durationIsValid){
        return{
          'border-color':'#0F9D58'
        }
      }
    }

  },

  methods:{

    setValues(){

       for(let material in this.project.materials){
         let obj = {
           name: this.project.materials[material].name,
           quantity: this.project.materials[material].quantity,
           description: this.project.materials[material].description
         }
          //this.project.materialsRequired.push(obj)
          console.log(this.project.materialsRequired)
       }

      this.isOpen =false;
  
    },

    closeModal(){
      this.isOpen= false
    },

    add(index) {
      let obj = {
        name:'',
        quantity:0,
        description:''
      }
      this.project.materialsRequired.push(obj);

    },

    remove(index) {
      this.project.materialsRequired.splice(index, 1);
    },

      addImage(event){
      for(let key in Object.keys(event.target.files))
        this.selectedFile.push(event.target.files[key])
      //this.selectedFile = event.target.files[0]
      this.fd= new FormData()
      for(let items in this.selectedFile){
         //console.log(typeof(this.selectedFile[items]))
         console.log(this.selectedFile[items].name)
        this.fd.append('image',this.selectedFile[items], this.selectedFile[items].name)
      }
    },

    addDocument(event){
      this.selectedDoc = event.target.files[0]
      this.docData = new FormData()
      this.docData.append('doc',this.selectedDoc,this.selectedDoc.name)
      console.log(this.selectedDoc)

    },

    addBannerImage(event){
      this.selectedBannerImage = event.target.files[0]
      this.bd = new FormData()
      this.bd.append('bannerImage',this.selectedBannerImage,this.selectedBannerImage.name)
      console.log(this.selectedBannerImage)

    },
    
       sendData(){

         if(this.selectedDoc == null){

           if(this.validateFields()){

             if(this.listOfProjects.some(item=>item.title.toUpperCase() === this.project.title.trim().toUpperCase())){
               this.$alert('Please give a different title','Already Exists','warning');
               console.log(true);
             }else{

                 ProjectService.uploadImage(this.fd).then((response)=>{
                  for(let img in Object.keys(response.data.data))
                     this.project.image.push(response.data.data[img].url)
                  //console.log(response.data.data[img].url)

                 ProjectService.uploadBannerImage(this.bd).then((response)=>{
                  this.project.bannerImage = response.data.url;

                 ProjectService.createNewProject(this.project).then((response)=>{
                 this.project = {};  
                 this.$alert('Project Created','success','success');
                 this.$router.push('/projects/list');
         
               }).catch((err)=>{
                console.log("Error" + JSON.stringify(err.response));
              })
      
           })
         })
               console.log(false);
        }

           }else{
             this.$alert('Please fill all required fields','Empty Fields','warning');
           }

         }else{

           if(this.validateFields()){

            if(this.listOfProjects.some(item => item.title.toUpperCase() === this.project.title.toUpperCase())){
              this.$alert('Please give a different title','Already Exists','warning');
              console.log(true)

            }else{

             ProjectService.uploadImage(this.fd).then((response)=>{
               for(let img in Object.keys(response.data.data))
                this.project.image.push(response.data.data[img].url)
                //console.log(response.data.data[img].url)
    
             ProjectService.uploadBannerImage(this.bd).then((response)=>{
              this.project.bannerImage = response.data.url

             ProjectService.uploadDoc(this.docData).then((response)=>{
              this.project.doc = response.data.url
    
             ProjectService.createNewProject(this.project).then((response)=>{
              this.project = {}; 
              this.$alert('Project Created','success','success');
              this.$router.push('/projects/list');
         
            }).catch((err)=>{
              console.log(JSON.stringify(err.response));
            })

        })
       
       })

       });
              console.log(false);
       }

      }else{
        this.$alert('Please fill all required fields','Empty Fields','warning');

      }
    }

   },


   validateFields: function() {
      if (this.checkEmptyVal(this.project.title)) {
        return false;
      } else if (this.checkEmptyVal(this.project.subject)) {
        return false;
      } else if (this.checkEmptyVal(this.project.category)) {
        return false;
      } else if (this.checkEmptyVal(this.project.shortDescription)) {
        return false;
      } else if (this.checkEmptyVal(this.project.procedure.steps)) {
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
      
      back(){
        this.$router.push('/projects/list')
      },

      cancel(){
          window.location.reload();
      }

    }
}

</script>
<style scoped>
.data-set{
  margin-bottom: 30px;
}
.data-set h4{
  font-weight: bold;
  font-size: 16px;
  margin-left:15px;
  color:black;
  
}

.data-set input, .data-set select, .data-set textarea {
  margin-bottom: 15px;
  max-width: 450px;
  margin-left:15px;
}

.btn-set{
  margin: 15px 0;
  text-align: right;
}

.gallery-set input{
  /*border: 1px solid #ccc;*/
  border: 2px solid white;
  padding: 7px;
  border-radius: 5px;
}

.video, .gallery, .description, .extra_info, .additional_info, .basic_details, .materials_info{
  width:100%;
  padding:10px;
  border-radius:8px;
  background-color:#F2F3F5;
}

.gallery-set label{
  margin-left:15px;
}

.extra_info label{
  margin-left:15px;
}

::-webkit-file-upload-button{
  background-color:#1877F2;
  border-radius: 4px;
  outline:none;
  color:white;
  padding:6px;
  border: none;
}

.editor{
  margin-left:15px;
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
