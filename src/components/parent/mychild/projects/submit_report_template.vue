<template>
<div>
    <div class="row reset-padding reset-margin">
        <div class="row">
            <div class="col-lg-6">
		          <div class="page-heading">Submit Your Report</div>
            </div>
        </div>
    </div>
    <div class="container home-page">
      <form v-on:submit.prevent="submitStudentReport">
      <div class="text-left"><h3>{{this.project.name}}</h3></div> 
      <br>  
     <label>Upload Reports</label>
     <input type="file" class="custom-file-input" :value="null" @change="addFiles" multiple/>
     <br>
     <div v-for="file in selectedFiles">
     <a @click="removeFiles(file)"><span class="glyphicon glyphicon-remove " >{{file.name}}</span></a>
     </div>
     <br>
     <br>
     <button type="submit" class="btn btn-primary" v-bind:disabled="!formIsValid">Submit</button>
     </form>
   </div>
   <div class="row reset-padding reset-margin">
        <div class="row">
            <div class="col-lg-6">
		          <div class="page-heading">Your Reports({{urlData.length}})</div>
            </div>
       </div>
       <!--<p></p>-->
       <div class="row">
          <div class="column" v-for="item in urlData" v-if="urlData.length >0">
              <div class="card-page">
                    <!--<img :src="item.report_url"  width="230" height="200">-->
                     <button class="btnAsLink" @click="eachReport(item.report_url)" style="outline:none;">
                         <img :src="item.report_url" v-if="item.report_url.split('.').pop().toLowerCase() == 'pdf'"  width="230" height="200" @error="$event.target.src='https://ischool-project.s3.ap-south-1.amazonaws.com/4/ProjectReport/pdf-image.png'">
                         <img :src="item.report_url" width="230" height="200" @error="$event.target.src='https://ischool-project.s3.ap-south-1.amazonaws.com/images/image-not-found.png'" v-else>
                         </button>
                     <br><br>
                    <div class="text-left">
                     <div class="card-title">
                        <p><strong>{{extractName(item.report_url)}}</strong>
                          <br><span class="card-text">by {{item.name}}</span>
                        </p>
                        
                      </div>
                    <button class="btn btn-primary btn-block" @click="deleteReport(item.report_url,item.id)">Delete</button>
                    </div>
                   </div>

                 </div>
          </div>
       </div>

       <div id="snackbar">{{this.msg}}</div>
       
    </div>
</div>
</template>
<script>
import UserService from "../../../../services/userService";
import store from "../../../../store";
import EventBus from "../../../../event-bus";
import pdf from "vue-pdf";
import _ from "lodash";
import { mapMutations } from "vuex";

export default {
  components: {
    pdf
  },
  data() {
    return {
      tenantId: this.$cookie.get("id"),
      assignedProject: {},
      project: this.$store.state.projectDetails,
      school: {},
      myChild: {},
      userdetails: {},
      msg: "",
      project_id: "",
      extension: "pedf",
      urlData: [],
      selectedImages: [],
      selectedFiles: [],
      optionImages: [],
      fd: {},
      flag: true
    };
  },
  created() {
    console.log(this.project.id);

    console.log(this.project.project_id);

    this.school = this.$store.state.school;
    this.userdetails = this.$store.state.userDetails;
    this.myChild = this.$store.state.myChild;
    this.project_id = this.project.project_id;

    const classid = {
      id: this.myChild.classid
    };

    let studentid = this.myChild.studentid;

    this.GetListOfUrls();
  },

  methods: {
    ...mapMutations(["SET_PROJECT_REPORT_DETAILS"]),

    eachReport(url) {
      this.SET_PROJECT_REPORT_DETAILS(url);

      this.$router.push({
        path: `view-report`
      });
    },

    addFiles(event) {
      console.log(event.target.files);
      for (let key in Object.keys(event.target.files))
        this.selectedFiles.push(event.target.files[key]);
    },

    removeFiles(file) {
      let index = this.selectedFiles.indexOf(file);
      this.selectedFiles.splice(index, 1);
      console.log(this.selectedFiles);
    },

    submitStudentReport() {
      this.fd = new FormData();

      let studentid = this.myChild.studentid;

      for (let items in this.selectedFiles) {
        console.log(this.selectedFiles[items].name);
        if (this.checkReport(this.selectedFiles[items].name)) {
          alert("Please select the unique report");
          this.flag = false;
        } else {
          this.fd.append(
            "file",
            this.selectedFiles[items],
            this.selectedFiles[items].name
          );
          this.flag = true;
        }
      }

      this.assignedProject = {
        project_id: this.project_id,
        assignid: this.project.id,
        studentid: studentid,
        report_url: []
      };

      let updateStatus = {
        status: "submitted",
        submission_date: new Date().toISOString().slice(0, 10)
      };

      if (this.flag) {
        if (this.validateFields()) {
          UserService.SubmitProjectImageUrls(this.tenantId, this.fd).then(
            response => {
              console.log(response.data.urls);

              //console.log(response.data.urls[img])
              for (let img in Object.keys(response.data.urls))
                this.assignedProject.report_url.push(response.data.urls[img]);
              console.log(this.assignedProject.report_url);

              UserService.SubmitProjectReport(
                this.tenantId,
                this.assignedProject
              ).then(response => {
                this.selectedFiles = [];

                UserService.updateProjectStatus(
                  this.tenantId,
                  this.project.id,
                  studentid,
                  this.project_id,
                  updateStatus
                )
                  .then(response => {
                    this.GetListOfUrls();
                    this.$alert(
                      "Report Submitted Successfully",
                      "success",
                      "success"
                    );
                  })
                  .catch(err => {
                    this.$alert("Failed to Submit Report", "Failed", "error");
                    console.log("Error" + err);
                  });
              });
            }
          );
        } else {
          this.$alert(
            "Please select unique reports",
            "Duplicate Reports",
            "warning"
          );
        }
      }
    },

    GetListOfUrls() {
      let studentid = this.myChild.studentid;
      console.log(studentid);

      this.urlData = [];

      UserService.GetDocUrls(
        this.tenantId,
        studentid,
        this.project_id,
        this.project.id
      ).then(response => {
        for (let obj in response.data) {
          let urlObj = {
            id: response.data[obj].id,
            studentid: response.data[obj].studentid,
            report_url: response.data[obj].report_url,
            name: response.data[obj].name
          };

          this.urlData.push(urlObj);
        }

        console.log(this.urlData);
      });
    },

    deleteReport(url, id) {
      this.$confirm(
        "Are you sure that you want to delete report?",
        "Delete Report",
        "question"
      )
        .then(() => {
          UserService.DeleteDocUrl(this.tenantId, url).then(response => {
            UserService.DeleteProjectReport(this.tenantId, id).then(
              response => {
                this.GetListOfUrls();
                this.myFunction();
              }
            );
          });
        })
        .catch(err => {
          this.$alert("Failed to Delete", "Failed", "error");
        });
    },

    validateFields: function() {
      let alreadySeen = new Set();

      this.selectedFiles.forEach(element => {
        alreadySeen.add(element.name);
      });

      if (alreadySeen.size !== this.selectedFiles.length) {
        return false;
      }
      return true;
    },

    myFunction() {
      let x = document.getElementById("snackbar");
      this.msg = "Deleted Report Successfully";
      x.className = "show";
      setTimeout(function() {
        x.className = x.className.replace("show", "");
      }, 3000);
    },

    extractName(report_url) {
      let index = report_url.indexOf("t/");
      let extension = report_url.slice(index + 2).replace(/[+%0-9]/g, "");
      return extension;
    },

    getName(report_url) {
      let index = report_url.indexOf("t/");
      let extension2 = report_url.slice(index + 2).replace(/[+]/g, "");
      //let extension1 = extension2.replace("%28",'(');
      //let extension = extension1.replace("%29",')');
      let final = extension2.replaceAll("%20", " ");
      if (extension2.includes("%28")) {
        //let strIndex = extension2.indexOf("%28");
        let extension1 = extension2.replace("%28", "(");
        let extension = extension1.replace("%29", ")");
        let final = extension.replace("%20", " ");

        //extension2.replace("%28",'(');
        // extension2.replace("%29",')');
        return final;
        //let value = extension2.substring(strIndex+3);
        //let extractInteger = value.slice(0,2);
        //
        //if(extension2.substring(0,strIndex-3).length <=2){
        /* let value = extension2.substring(strIndex+3);
               let extractInteger = value.slice(0,1);
               return extension2.substring(0,strIndex-3)+"("+extractInteger+")"+extension2.substring(extension2.length-4);*/
        // }else{
        /* if(extension2.includes("%28"+extractInteger+"%29")){
              let value = extension2.substring(strIndex+3);
              let extractInteger = value.slice(0,2);
              return extension2.substring(0,strIndex-3)+"("+extractInteger+")"+extension2.substring(extension2.length-4);
           }
           }*/
      } else {
        extension2.replace("%20", " ");
        //let extension = report_url.slice(index+2).replace(/[+%]/g,'');
        return final;
        //return extension;
      }
    },

    checkReport(imageName) {
      //let compareImgName = imageName.replace(/\s+/g, '');
      console.log(imageName);
      let data = this.urlData.find(element => this.getName(element.report_url) === imageName);
      return Boolean(data);
    }
  },
  computed: {
    formIsValid() {
      return this.selectedFiles.length > 0;
    }
  }
};
</script>
<style>
.home-page {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin: 15px auto;
  background: #fff;
}

.card-page {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2); /* this adds the "card" effect */
  border-radius: 5px;
  padding: 7px;
  text-align: center;
  background-color: #fff;
}

.row {
  margin: 0 -5px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

.column {
  float: left;
  padding: 0 10px;
  margin: 15px auto;
}

#snackbar {
  visibility: hidden;
  min-width: 250px;
  margin-left: -125px;
  background-color: #333;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  padding: 16px;
  position: fixed;
  z-index: 1;
  left: 9%;
  bottom: 30px;
}

#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
</style>
