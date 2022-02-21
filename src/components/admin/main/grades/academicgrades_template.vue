<template>
  <div class="page-layout">
    <div class="row">
      <div class="col-lg-6">
        <div class="page-heading"><span v-html="$t('academicgrades')" /></div>
      </div>
      <div class="col-lg-6 text-right">
        <button
          class="common-button"
          v-on:click="DialoguePopUp('academicgradePopup', open)"
        >
          New Academic Grade
        </button>
      </div>
      <br /><br />
      <div>
        <label
          class="col-sm-1 control-label"
          style="width: 15.3%; margin-top: 6px"
          >AcademicYear :</label
        >
        <select
          v-model="searchAcademicId"
          v-show="isactive == 1"
          class="form-control gradeFilter"
        >
          <option
            v-for="academic in academicsandboards"
            :value="academic.id"
            v-if="academic.active == 1 && isactive == 1"
          >
            {{ academic.passingyear }} - {{ academic.syllabustype }}
          </option>
        </select>
        <select
          v-model="searchAcademicId"
          v-show="isactive == 0"
          class="form-control gradeFilter"
        >
          <option
            v-for="academic in academicsandboards"
            :value="academic.id"
            v-if="academic.active == 0"
          >
            {{ academic.passingyear }} - {{ academic.syllabustype }}
          </option>
        </select>
        <label
          class="col-sm-1 control-label"
          style="width: 10.3%; margin-top: 6px"
          >Grade :</label
        >
        <select
          class="form-control gradeFilter"
          v-model="searchGradeId"
          @change="pageNumber = 0"
        >
          <option value="0">All</option>
          <option v-if="searchAcademicId == grade.academicid" v-for="grade in academicgrades" v-bind:value="grade.gradeid">
            {{ grade.academicgradename }}
          </option>
        </select>
        <div style="float: left; margin-left: 50px">
          <label
            ><input
              type="radio"
              name="status"
              value="1"
              @click="changeStatus()"
              v-model="isactive"
            />Active</label
          >
          <label
            ><input
              type="radio"
              name="status"
              value="0"
              @click="changeStatus()"
              v-model="isactive"
            />Archived</label
          >
        </div>
      </div>
    </div>
    <hr />
    <div class="gradestable">
      <div class="divTable">
        <div class="divTableBody">
          <div class="divTableRow">
            <div class="divTableCell">Academic Year & Syllabus</div>
            <div class="divTableCell">Grade Number</div>
            <div class="divTableCell">Grade Name</div>
            <div class="divTableCell">Subjects</div>
            <div class="divTableCell">Edit</div>
          </div>
          <div class="divTableRowdata" v-for="(grade, index) in paginatedData">
            <div class="divTableCelldata">
              {{ grade.passingyear }} - {{ grade.syllabustype }}
            </div>
            <div class="divTableCelldata">{{ grade.gradenumber }}</div>
            <div class="divTableCelldata">{{ grade.academicgradename }}</div>
            <div class="divTableCelldata">
              <p v-for="subject in grade.subjects">{{ subject }}</p>
            </div>
            <div class="divTableCelldata">
              <a data-toggle="modal" @click="editAcademicGrades(grade)"
                ><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <button
        class="btn previousbutton"
        :disabled="pageNumber === 0"
        @click="prevPage"
      >
        Previous
      </button>
      <button
        class="btn nextbutton"
        :disabled="pageNumber >= pageCount - 1"
        @click="nextPage"
      >
        Next
      </button>
    </div>

    <!-- New Academic Grade pop up start-->
    <div
      class="modal fade"
      data-keyboard="false"
      data-backdrop="static"
      id="academicgradePopup"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h4>Add New Academic Grade</h4>
            </div>
          </div>
          <div
            v-if="showAlert"
            :class="['showAlertDiv', 'alert', alertClass]"
            role="alert"
          >
            {{ alertMessage }}
          </div>
          <div class="modal-body" style="height: 350px">
            <label class="col-md-4"> Select Academic Year :</label>
            <select
              v-model="academicyeargrades.academicid"
              class="form-control popUpEle"
            >
              <option
                v-for="academic in academicsandboards"
                :value="academic.id"
                v-if="academic.active"
              >
                {{ academic.passingyear }} - {{ academic.syllabustype }}
              </option>
            </select>
            <br /><br />
            <label class="col-md-4"> Select Grade :</label>
            <select
              v-model="academicyeargrades.gradeid"
              class="form-control popUpEle"
            >
              <option v-for="grade in grades" :value="grade.id">
                {{ grade.gradename }}
              </option>
            </select>
            <br />
            <div>
              <label class="col-md-4">
                Create Your Own GradeName :
                <p>(optional)</p></label
              >
              <input
                class="form-control popUpEle"
                type="text"
                v-model="academicgradename"
              />
            </div>
            <br /><br />
            <div class="row">
              <div style="float: left; margin-left:-170px; margin-top:20px">
                <label >Select Subjects :</label>
              </div>
              <div class="col-md-6">
                <multiselect
                  v-model="academicyeargrades.subjects"
                  :options="subjects"
                  :multiple="true"
                ></multiselect>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-info"
              @click="saveAcademicYearGrades"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- New Academic Grade pop up end-->

    <!-- Edit Academic Grade pop up start-->
    <div
      class="modal fade"
      data-keyboard="false"
      data-backdrop="static"
      id="editacademicgradePopup"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div>
              <h4>Edit Academic Grade</h4>
            </div>
          </div>
          <div
            v-if="showAlert"
            :class="['showAlertDiv', 'alert', alertClass]"
            role="alert"
          >
            {{ alertMessage }}
          </div>
          <div class="modal-body" style="height: 350px">
            <label class="col-md-4"> Select Academic Year :</label>
            <select class="form-control popUpEle" disabled>
              <option
                :value="academicid"
                v-for="academic in academicsandboards"
                v-if="academicid == academic.id"
              >
                {{ academic.passingyear }} - {{ academic.syllabustype }}
              </option>
            </select>
            <br /><br />
            <label class="col-md-4"> Select Grade :</label>
            <select class="form-control popUpEle" disabled>
              <option
                :value="gradeid"
                v-for="grade in grades"
                v-if="gradeid == grade.id"
              >
                {{ grade.gradename }}
              </option>
            </select>
            <br/>
            <div>
              <label class="col-md-4">
                Your Own GradeName :
                </label>
              <input disabled
                class="form-control popUpEle"
                type="text"
                v-model="academicgradename"
              />
            </div>
            <br /><br />
            <div class="row">
              <div class="col-md-4">
                <label>Select Subjects :</label>
              </div>
              <div class="col-md-6">
                <multiselect
                  v-model="subjectsList"
                  :options="subjects"
                  :multiple="true"
                ></multiselect>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-info"
              @click="updateAcademicGrades()"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Edit Academic Grade pop up end-->
  </div>
</template>
<script>
import UserService from "../../../../services/userService.js";
import EventBus from "../../../../event-bus.js";
import Multiselect from "vue-multiselect";
export default {
  props: ["school", "userdetails", "acdemicyearandboard"],
  components: { Multiselect },
  data() {
    return {
      grades: [],
      syllabustype: this.acdemicyearandboard.syllabustype,
      tenantId: this.$cookie.get("id"),
      academicgrades: [],
      academicsandboards: [],
      subjects: [],
      academicyeargrades: {},
      open: "show",
      close: "hide",
      showAlert: false,
      academicid: 0,
      gradeid: 0,
      academicgradeid: 0,
      subjectsList: [],
      gradesubjects: [],
      searchAcademicId: null,
      pageNumber: 0,
      size: 10,
      searchGradeId: 0,
      isactive: 1,
      academicgradename: "",
    };
  },
  created() {
    UserService.AllGrades(this.tenantId).then((response) => {
      this.grades = response.data;
    });

    this.getAcademicGrades();
    this.getAcademicYears();
    this.getSubjects();
  },

  methods: {
    DialoguePopUp: function (id, action) {
      this.academicyeargrades = {};
      if(id == "academicgradePopup"){
          this.academicgradename = "";
      }
      console.log("#" + id);
      $("#" + id).modal(action);
    },
    saveAcademicYearGrades: function () {
      if (
        this.academicyeargrades.academicid == undefined ||
        this.academicyeargrades.academicid == null
      ) {
        alert("Please select Academic Year");
        return;
      } else if (
        this.academicyeargrades.gradeid == undefined ||
        this.academicyeargrades.gradeid == null
      ) {
        alert("Please select Grade");
        return;
      } else if (
        this.academicyeargrades.subjects == undefined ||
        this.academicyeargrades.subjects == null ||
        this.academicyeargrades.subjects.length <= 0
      ) {
        alert("Please Select Atleast One Subject");
        return;
      }
      if(this.academicgradename == "" || this.academicgradename == null){
          this.grades.forEach(grade => {
              if(this.academicyeargrades.gradeid == grade.id){
                  this.academicyeargrades.academicgradename = grade.gradename;
              }
          });
      }else{
          this.academicyeargrades.academicgradename = this.academicgradename;
      }
      this.academicyeargrades.status = 1;
      UserService.saveAcademicGrades(this.tenantId, this.academicyeargrades)
        .then((response) => {
          this.alertMessage = "Successfully Added .....";
          this.alertClass = "alert-success";
          this.setAlertMessage("success");
          this.getAcademicGrades();
        })
        .catch((err) => {
          if (err.message === "Request failed with status code 400") {
            this.alertMessage = "Academic Year and Syllabus Already Exists";
          } else {
            this.alertMessage = err.message;
          }
          this.alertClass = "alert-danger";
          this.setAlertMessage("fail");
        });
    },
    getAcademicGrades: function () {
      UserService.academicgrades(this.tenantId).then((response) => {
        this.academicgrades = response.data;
      });
    },
    getAcademicYears: function () {
      UserService.AcademicYears(this.tenantId).then((response) => {
        this.academicsandboards = response.data.academics;
      });
    },
    changeStatus : function(){
      this.searchAcademicId = null
    },
    getSubjects: function () {
      UserService.Subjects(this.tenantId).then((response) => {
        this.subjects = response.data;
        this.gradesubjects = response.data;
        for (var i = 0; i < response.data.length; i++) {
          this.subjects[i] = response.data[i].subjectname;
        }
      });
    },
    setAlertMessage: function (type) {
      this.showAlert = true;
      let thisVue = this;
      setTimeout(function () {
        thisVue.alertMessage = "";
        thisVue.alertClass = "";
        thisVue.showAlert = false;
        if (type == "success") {
          thisVue.DialoguePopUp("academicgradePopup", thisVue.close);
          thisVue.DialoguePopUp("editacademicgradePopup", thisVue.close);
        }
      }, 1500);
    },
    editAcademicGrades: function (academicgrade) {
      console.log(academicgrade);
      this.academicgradeid = academicgrade.id;
      this.academicid = academicgrade.academicid;
      this.gradeid = academicgrade.gradeid;
      this.subjectsList = academicgrade.subjects;
      this.academicgradename = academicgrade.academicgradename;
      // for(let i = 0; i<grade.subjectsList.length; i++){
      //     this.subjectsList[i] = academicgrade.subjectsList[i].subjectname;
      // }
      this.DialoguePopUp("editacademicgradePopup", this.open);
    },
    updateAcademicGrades: function () {
      this.academicyeargrades.id = this.academicgradeid;
      this.academicyeargrades.academicid = this.academicid;
      this.academicyeargrades.gradeid = this.gradeid;
      this.academicyeargrades.subjects = this.subjectsList;
      if (
        this.academicyeargrades.subjects === undefined ||
        this.academicyeargrades.subjects === null ||
        this.academicyeargrades.subjects.length <= 0
      ) {
        alert("Select Atleast One Subject");
        return;
      }
      console.log(JSON.stringify(this.academicyeargrades));
      UserService.UpdateAcademicGrades(this.tenantId, this.academicyeargrades)
        .then((response) => {
          this.alertMessage = "Successfully Updated .....";
          this.alertClass = "alert-success";
          this.setAlertMessage("success");
          this.getAcademicGrades();
        })
        .catch((err) => {
          this.alertMessage = "You must enter all data.....";
          this.alertClass = "alert-danger";
          this.setAlertMessage("fail");
        });
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  },
  computed: {
    pageCount() {
      let l = this.filterAcademicGrades.length,
        s = this.size;
      return Math.ceil(l / s);
    },

    filterAcademicGrades: function () {
      var self = this;
      return this.academicgrades.filter(function (academicgrade) {
        let filterAcademicYear;
        let filterGrades;
        if (self.searchAcademicId == 0) {
          filterAcademicYear = true;
        } else {
          if (academicgrade.academicid == self.searchAcademicId) {
            filterAcademicYear = true;
          } else {
            filterAcademicYear = false;
          }
        }
        if (self.searchGradeId == 0) {
          filterGrades = true;
        } else {
          if (academicgrade.gradeid == self.searchGradeId) {
            filterGrades = true;
          } else {
            filterGrades = false;
          }
        }
        return filterAcademicYear && filterGrades;
      });
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.filterAcademicGrades.slice(start, end);
    },
  },
};
</script>
<style>
.gradestable {
  width: 100%;
}
<style scoped > .reset-padding {
  padding: 0;
}
.reset-margin {
  margin: 0;
}
.popUpEle {
  width: 250px !important;
}
.gradeFilter {
  float: left;
  width: 15%;
}
.previousbutton,
.nextbutton,
.previousbutton:hover,
.nextbutton:hover {
  display: inline-block;
  padding: 5px 14px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 15px;
  color: black;
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>