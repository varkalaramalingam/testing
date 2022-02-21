<template>
  <div>
    <button style="margin-top:20px" class="btn btn-info" @click="goBack()">Back </button>
    <div class="row">
      <div class="col-lg-6">
        <div class="page-heading"><span>List Of Passage Questions </span></div>
      </div>
      <div class="col-lg-6 text-right">
        <button v-if="question.status_id === 2" class="common-button" v-on:click="addNewQuestion()">
          Add Child Question
        </button>
      </div>
    </div>
    <hr />
    <div v-if="listOfQuestions.length < 1"><h4>NO Child Questions</h4></div>
    <div class="row studentstable reset-padding reset-margin">
      <div class="divTable">
        <div class="divTableBody">
          <div class="divTableRow">
            <div class="divTableCell">Question ID</div>
            <div class="divTableCell" style="width: 50%">Question</div>
            <div class="divTableCell">Grade</div>
            <div class="divTableCell">Subject</div>
            <div class="divTableCell">Tags</div>
            <div class="divTableCell">Status</div>
            <div class="divTableCell">Difficulty Level</div>
            <div class="divTableCell">Edit</div>
            <div class="divTableCell">View</div>
          </div>
          <div
            v-for="(question1, index) in listOfQuestions"
            class="divTableRowdata"
            :key="index"
          >
            <div class="divTableCelldata">{{ question1.questionid }}</div>
            <div class="divTableCelldata" style="width: 50%">
              <p v-html="question1.questionDescription"></p>
            </div>
            <div class="divTableCelldata">{{ question1.gradename }}</div>
            <div class="divTableCelldata">{{ question1.subjectname }}</div>
            <div class="divTableCelldata">
              <ul v-for="tag in question1.tags" :key="tag.id">
                {{
                  tag.tagname
                }}
              </ul>
            </div>
            <div class="divTableCelldata">
              {{ getNameFromVal(question1.status_id, listOfStatus, "status") }}
            </div>
            <div class="divTableCelldata">
              {{ question1.degreeofdifficulty }}
            </div>
            <div class="divTableCelldata">
              <a
                v-if="question1.status_id == 2 && question.status_id == 2"
                data-toggle="modal"
                @click="editQuestion(question1, index)"
                ><i
                  class="fa fa-pencil-square-o fa-1x"
                  aria-hidden="true"
                  style="width: 52px"
                ></i
              ></a>
            </div>
            <div class="divTableCelldata">
              <a data-toggle="modal" @click="eachQuestion(question1, index)"
                ><i class="fa fa-eye" aria-hidden="true" style="width: 52px"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add question start -->
    <div
      class="modal fade"
      data-keyboard="false"
      data-backdrop="static"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      id="myModal"
      role="dialog"
    >
      <div
        style="overflow-y: scroll; max-height: 95%; width: 80%"
        class="modal-dialog modal-lg"
      >
        <div class="modal-content">
          <div class="modal-header">
            <div class="popUpHeader">
              <h4 class="modal-title">{{ QuestionTypeValue }} questions</h4>
              <div
                v-if="showPopUpAlert"
                :class="['showPopUpAlertDiv', 'alert', popUpAlertClass]"
                role="alert"
              >
                {{ popUpAlertMessage }}
              </div>
            </div>
          </div>
          <div class="modal-body">
            <div>
              <div
                :class="['addQtn', question.divHeightClassName]"
                v-for="(question, index) in dataOfQuestions"
              >
                <div>
                  <label
                    class="col-sm-1 control-label"
                    style="
                      width: 16.3% !important;
                      margin-top: 6px;
                      padding-left: 0px;
                    "
                    >Question type :</label
                  >
                  <select
                    class="form-control gradeFilter"
                    style="width: 27% !important"
                    v-model="question.questionType"
                    @change="selectQuestionType()"
                  >
                    <option value="0">-- Select question type --</option>
                    <option
                      v-for="questionType in typeOfQuestions"
                      v-bind:value="questionType.qtype_id"
                      v-if="questionType.qtype_id !== 3"
                    >
                      {{ questionType.qtype }}
                    </option>
                  </select>
                </div>
                <div>
                  <label
                    class="col-sm-1 control-label"
                    style="width: 20.3% !important; margin-top: 6px"
                    >Difficulty type :</label
                  >
                  <select
                    class="form-control gradeFilter"
                    style="width: 30% !important"
                    v-model="question.difficultyId"
                  >
                    <option value="0">-- Select degree of difficulty --</option>
                    <option
                      v-for="subject in degreeOfDifficultyList"
                      v-bind:value="subject.id"
                    >
                      {{ subject.degreeofdifficulty }}
                    </option>
                  </select>
                  <br /><br /><br />
                  <!-- <div>
                    <label
                      class="col-sm-1 control-label"
                      style="width: 16.3% !important; margin-top: 6px"
                      >Grade :</label
                    >
                    <select
                      class="form-control gradeFilter"
                      style="width: 27% !important"
                      v-model="question.gradeVal"
                    >
                      <option value="0">-- Select Grade --</option>
                      <option
                        v-for="grade in listOfGrades"
                        v-bind:value="grade.id"
                      >
                        {{ grade.gradename }}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label
                      class="col-sm-1 control-label"
                      style="width: 20.3% !important; margin-top: 6px"
                      >Subject :</label
                    >
                    <select
                      class="form-control gradeFilter"
                      style="width: 27% !important"
                      v-model="question.subjectVal"
                    >
                      <option value="0">-- Select subject --</option>
                      <option
                        v-for="subject in listOfSubjects"
                        v-bind:value="subject.id"
                      >
                        {{ subject.subjectname }}
                      </option>
                    </select>
                    <br /><br /><br />
                  </div> -->
                  <div>
                    <label
                      class="col-sm-1 control-label"
                      style="width: 16.3% !important; margin-top: 6px"
                      >Status :</label
                    >
                    <select
                      class="form-control gradeFilter"
                      style="width: 27% !important"
                      v-model="question.status_id"
                    >
                      <option
                        v-for="status in listOfStatus"
                        v-bind:value="status.id"
                        v-if="status.id !== 0"
                      >
                        {{ status.status }}
                      </option>
                    </select>
                    <br /><br /><br />
                  </div>
                </div>
                <br />
                <ckeditor-math-equation
                  placeholder="Enter question"
                  v-model="question.question"
                ></ckeditor-math-equation>

                <br />
                <div
                  style="
                    float: right;
                    margin-right: -200px;
                    margin-top: -200px;
                    width: 300px;
                  "
                >
                  <input
                    type="file"
                    style="color: transparent"
                    :value="null"
                    @change="uploadImage($event, false)"
                    multiple
                  /><br />
                  <a
                    @click="removeFromSelectedFile(selectedfile, index, false)"
                    v-for="(selectedfile, index) in questionimages"
                    ><span class="glyphicon glyphicon-remove">{{
                      selectedfile.name
                    }}</span
                    ><br
                  /></a>
                  <p v-for="url in question.imageurls">
                    <a @click="removeUrlFromQuestion(url)"
                      ><span class="glyphicon glyphicon-remove"></span></a
                    >{{ url }}
                  </p>
                </div>
                <div
                  v-if="question.questionType == 2"
                  v-for="(
                    correctAns, correctAnsIndex
                  ) in selectedCorrectAnsData"
                >
                  <br />
                  <label
                    class="col-sm-1 control-label"
                    style="
                      float: left;
                      width: 20%;
                      margin-top: 76px;
                      padding-left: 0px;
                    "
                    >Answer explantion:
                  </label>
                  <ckeditor-math-equation
                    style="margin-left: 145px"
                    v:bind="questionExp"
                    v-bind:id="'id' + correctAnsIndex"
                    v-model="correctAns.questionanswer"
                  ></ckeditor-math-equation>
                  <br /><br /><br />
                </div>

                <div v-if="question.questionType == 1">
                  <div
                    :class="[option.addOptnClss]"
                    v-for="(option, optionIndex) in question.optionsData"
                  >
                    <div>
                      <input
                        type="checkbox"
                        v-model="selectedCorrectAns"
                        :value="option.optionVal"
                        style="float: left"
                        @change="selectCorrctAns"
                      />
                      <p style="margin-left: 21px">{{ option.optionVal }}.</p>
                      <select
                        class="form-control selectAnsType"
                        v-model="option.selectAnsType"
                        @change="
                          addOptionClass(option.selectAnsType, optionIndex)
                        "
                      >
                        <option value="">-- select answer type --</option>
                        <option
                          v-for="answrType in answerTypeList"
                          v-bind:value="answrType.id"
                        >
                          {{ answrType.answertype }}
                        </option>
                      </select>
                    </div>
                    <div>
                      <div class="ansField" v-if="option.selectAnsType == 1">
                        <input
                          type="text"
                          v-model="option.textVal"
                          class="form-control"
                        />
                      </div>
                      <div class="ansField" v-if="option.selectAnsType == 2">
                        <ckeditor-math-equation
                          v-bind:id="'id' + optionIndex"
                          v-model="option.formulaVal"
                        ></ckeditor-math-equation>
                      </div>
                      <div
                        id="imageDiv"
                        class="ansField"
                        v-if="option.selectAnsType == 3"
                      >
                        <div>
                          <input
                            type="file"
                            style="color: transparent"
                            :value="null"
                            @change="optionImages($event, optionIndex)"
                            multiple
                          /><br />
                          <div v-for="(optionimage, index) in optionimages">
                            <div v-if="optionimage.index == optionIndex">
                              <a
                                @click="removeFromOptionFile(image, index)"
                                v-for="image in optionimage.imageVal"
                                ><span class="glyphicon glyphicon-remove">{{
                                  image.name
                                }}</span
                                ><br
                              /></a>
                            </div>
                          </div>
                          <p
                            style="width: 800px"
                            v-for="url in option.imageVal"
                          >
                            <a @click="removeUrlFromOptions(optionIndex, url)"
                              ><span
                                class="glyphicon glyphicon-remove"
                              ></span></a
                            >{{ url }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div style="margin-left:100px;">
                      <i
                        class="fa fa-minus-circle"
                        style="
                          color: red;
                          padding-top: 9px;
                          padding-right: 10px;
                        "
                        @click="removeOption(optionIndex, options[optionIndex])"
                        v-show="(optionIndex === options.length - 1) && optionIndex > 0"
                      ></i>
                      <i
                        class="fa fa-plus-circle"
                        style="
                          color: green;
                          padding-top: 9px;
                          padding-right: 10px;
                        "
                        @click="addOption(options[optionIndex])"
                        v-show="optionIndex === options.length - 1"
                      ></i>
                    </div>
                    <br />
                  </div>
                  <div>
                    <br />
                    <p>
                      <strong>Please enter Answer explantion below : </strong>
                    </p>
                    Selected correct options : {{ selectedCorrectAns }}
                    <div
                      v-if="selectedCorrectAnsData.length > 0"
                      v-for="(
                        correctAns, correctAnsIndex
                      ) in selectedCorrectAnsData"
                    >
                      <br />
                      <p style="float: left">{{ correctAns.option }}.</p>
                      <ckeditor-math-equation
                        style="margin-left: 15px"
                        v-bind:id="'id' + correctAnsIndex + 'option'"
                        v-model="correctAns.questionanswer"
                      ></ckeditor-math-equation>
                      <br />
                    </div>
                  </div>
                </div>
              </div>
              <div style="clear: both"></div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              v-on:click.prevent="saveQuestion()"
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-danger"
              v-on:click.prevent="
                confirmationPopUpOpen(
                  confirmationPopUpKeys.questionEditCancel,
                  '',
                  '',
                  open
                )
              "
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Add question end -->

    <!-- view question pop up start -->
    <div
      class="modal fade"
      data-keyboard="false"
      data-backdrop="static"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      id="viewquestion"
      role="dialog"
    >
      <div
        style="overflow-y: scroll; max-height: 85%"
        class="modal-dialog modal-lg"
      >
        <div class="modal-content">
          <div class="col-lg-12 worksheetstable reset-padding reset-margin">
            <div
              class="well table-responsive"
              style="overflow: scroll; height: 425px"
            >
              <table class="table table-hover">
                <tbody>
                  <tr>
                    <td style="width: 15px">{{ eachquestion.questionid }}.</td>
                    <td>
                      <p v-html="eachquestion.questionDescription"></p>
                      <br />
                      <div v-for="url in eachquestion.imageurls">
                        <img
                          v-if="url != null"
                          :src="url"
                          width="300"
                          height="250"
                          style="float: left; margin-left: 20px"
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <table
                class="table table-hover"
                v-if="eachquestion.questionType == 1"
              >
                <tbody>
                  <tr v-for="options in eachquestion.optionsData">
                    <td
                      class="align-middle borderless-table"
                      style="width: 100px !important"
                    >
                      <p style="float: left; width: 10px; margin: 0px 0 10px">
                        {{ options.optionVal }}.
                      </p>
                      <p
                        style="float: left; width: 94%; padding-left: 9px"
                        v-if="options.selectAnsType == 1"
                      >
                        {{ options.textVal }}
                      </p>
                      <vue-mathjax
                        style="float: left; margin-left: 10px; margin-top: 0px"
                        v-if="options.selectAnsType == 2"
                        :formula="options.formulaHtml"
                      ></vue-mathjax>
                      <div v-if="options.selectAnsType == 3">
                        <div v-for="imageurl in options.imageVal">
                          <img
                            :src="imageurl"
                            style="
                              float: left;
                              width: 250px;
                              height: 200px;
                              margin-left: 20px;
                            "
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <br />
              <button type="button" class="btn btn-info" data-dismiss="modal">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- view question pop up end -->

    <!-- confirmation pop up start  -->
    <div
      class="modal fade"
      id="confirmationPopUp"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" style="width: 472px">
        <div class="modal-content">
          <div class="modal-header">
            <h4>{{ popUpHeading }}</h4>
          </div>
          <div class="modal-body" style="height: 75px">
            {{ confirmMsg }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-info" data-dismiss="modal">
              Cancel
            </button>
            <button
              type="button"
              v-on:click.prevent="confirmationPopUpClose('', close)"
              id="submit"
              class="btn btn-primary"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- confirmation pop up end  -->
  </div>
</template>

<script>
import Vue from "vue";
import EventBus from "../../../event-bus.js";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import UserService from "../../../services/userService.js";
import CkeditorMathEquation from "./ckeditormathequations_template";
import _ from "lodash";

export default {
  components: {
    //ImageUploader,
    CkeditorMathEquation,
  },
  data() {
    return {
      dataforautocomplete: [],
      entKey: 0,
      searchtagname: "",
      listoftags: {},
      typevalue: -1,
      emitvalue: "datafromautotocom",
      emitvaluedynamic: "datafromautotocomdynamic",
      placeholderforauto: "Enter Tagname",
      open: "show",
      close: "hide",
      worksheetName: "",
      showAlert: false,
      gradeVal: "",
      sectionVal: "",
      subjectVal: "",
      alertClass: "",
      listOfSubjects: [],
      QuestionTypeValue: "",
      listOfWorksheets: [],
      worksheetObj: {},
      workSheetIndex: "",
      questionId: 0,
      id: 0,
      pageNumber: 0,
      search: "",
      tenantId: this.$cookie.get("id"),
      subjectType: "subject",
      gradeType: "grade",
      statusType: "status",
      degreeType: "degreeofdifficulty",
      academicYearObj: this.$store.state.acdemicyearandboard,
      searchQuestionDesc: "",
      searchGradeId: 0,
      searchSubjectId: 0,
      searchDifficultyId: 0,
      searchStatusId: -1,
      libraryQuestions: [],
      selectedQuestionsIdsList: [],
      confirmationPopUpKeys: {
        questionDel: "questionDel",
        questionEditCancel: "questionEditCancel",
        worksheetReset: "worksheetReset",
        libraryQuesDiscard: "libraryQuesDiscard",
        questionMakeInActive: "questionMakeInActive",
        questionMakeActive: "questionMakeActive",
      },
      confirmationPopUpId: "confirmationPopUp",
      confirmKey: "",
      fail: "fail",
      success: "success",
      confirmMsg: "",
      popUpHeading: "",
      QuestionTypeValue: "",
      answerTypeList: [
        {
          text: "Text",
          value: 1,
        },
        {
          text: "Image",
          value: 2,
        },
        {
          text: "Formula",
          value: 3,
        },
      ],
      selectedQuestionTypeVal: "",
      alertMessage: "",
      alertClass: "",
      addOptnClss: false,
      divHeightClassName: "",
      deleteIndex: "",
      toBeEdited: false,
      editIndex: "",
      tenantId: this.$cookie.get("id"),
      libraryQuestions: [],
      selectedQuestionsIdsList: [],
      searchQuestionDesc: "",
      searchGradeId: 0,
      searchSubjectId: 0,
      searchDifficultyId: 0,
      academicYearObj: this.$store.state.acdemicyearandboard,
      academicDetails: {},
      listOfSubjects: [],
      listOfGrades: [],
      listOfStatus: [],
      id: 0,
      listOfQuestions: [],

      alertMsgs: {
        successMsg: "Successfully",
        emptyMsg: " can not be empty",
        alertDanger: "alert-danger",
        alertSuccess: "alert-success",
        popUpAlertMsg: "",
        alertMsg: "",
        showPopUpAlert: false,
        showAlert: false,
        selectQuestionTypeAlert: "selectQuestionTypeAlert",
        questionDataAlert: "questionDataAlert",
        libraryQuesAlert: "libraryQuesAlert",
        questionStatus: "questionStatus",
      },
      tags: [
        {
          tagname: "",
        },
      ],
      showAlert: false,
      showPopUpAlert: false,
      popUpAlertMessage: "",
      popUpAlertClass: "",
      open: "show",
      close: "hide",
      worksheet: this.$store.state.worksheet,
      dataOfQuestions: [],
      selectedCorrectAns: [],
      selectedCorrectAnsData: [],
      eachquestion: {},
      eachindex: 0,
      questionimages: [],
      uploadMsg: false,
      urls: [],
      optionimages: [],
      status_id: null,
      question: this.$store.state.selectedQuestion,
      options: ["A", "B", "C", "D"],
    };
  },
  created() {
    console.log(JSON.stringify(this.question));
    this.getOnloadEntitiesData();
    UserService.getMCQAnsTypes(this.tenantId).then((response) => {
      this.answerTypeList = response.data.resultsMap.ansTypes;
    });
    UserService.getQuestionTypes(this.tenantId).then((response) => {
      this.typeOfQuestions = response.data.resultsMap.questionTypes;
    });
    UserService.getDegreeOfDifficulties(this.tenantId).then((response) => {
      this.degreeOfDifficultyList =
        response.data.resultsMap.degreeOfDifficulties;
    });
    UserService.getWorksheetStatuses(this.tenantId).then((response) => {
      this.listOfStatus = response.data.resultsMap.wsStatuses;
    });

    this.academicDetails = {
      academicyearid: this.academicYearObj.academicyearid,
      syllabustype: this.academicYearObj.syllabustype,
    };
    UserService.ClassroomGrades(
      this.academicDetails.syllabustype,
      this.tenantId
    ).then((response) => {
      this.listOfGrades = response.data;
    });
    UserService.getTagsList(this.tenantId).then((response) => {
      console.log(response.data);
      this.listoftags = response.data;
      this.dataforautocomplete = _.map(this.listoftags, function (tag) {
        return tag.tagname;
      });
      console.log(this.dataforautocomplete);
    });
    this.getPassageQuestionsList();
  },

  methods: {
    getOnloadEntitiesData: function () {
      UserService.Subjects(this.tenantId)
        .then((response) => {
          this.listOfSubjects = response.data;
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
    },
    popUp: function (id, action) {
      $("#" + id).modal(action);
    },
    forceRerender() {
      this.componentKey += 1;
    },
    goBack(){
      this.$router.go(-1);
    },
    addOption: function (c) {
      this.options.push(String.fromCharCode(c.charCodeAt(0) + 1));
      console.log(this.options);
      this.dataOfQuestions[0].optionsData.push(
        this.addOptions(this.options.length - 1)
      );
    },
    removeOption: function (index, c) {
      this.options.pop(String.fromCharCode(c.charCodeAt(0) - 1));
      this.dataOfQuestions[0].optionsData.pop();
    },
    addNewQuestion: function () {
      this.dataOfQuestions = [];
      this.selectedCorrectAns = [];
      this.tags = [{ tagname: "" }];
      this.forceRerender();
      console.log(this.tags);
      this.popUp("myModal", this.open);
      this.dataOfQuestions.push(this.createQuestionObj());
      this.selectedCorrectAnsData = [];
    },
    editQuestion: function (question, index) {
      this.dataOfQuestions = [];
      let obj = JSON.parse(JSON.stringify(question));
      obj.difficultyId = obj.degreeofdifficultyid;
      obj.gradeVal = obj.gradeid;
      obj.subjectVal = obj.subjectid;
      this.dataOfQuestions.push(obj);
      this.editIndex = index;
      this.toBeEdited = true;
      this.selectedCorrectAns = [];
      if(!_.isUndefined(obj.correctAnswer) && !_.isNull(obj.correctAnswer)){
        this.selectedCorrectAns.push(obj.correctAnswer);
      }
      console.log("Object Correct Answer is ; " + obj.correctAnswer)
      if (question.tags != null) {
        this.tags = question.tags;
        this.forceRerender();
      } else {
        this.tags = [{ tagname: "" }];
        this.forceRerender();
      }
        this.popUp("myModal", this.open);
    },
    createQuestionObj: function () {
      let obj = {};
      obj = {
        question: "",
        divHeightClassName: "",
        questionType: 1,
        difficultyId: 0,
        subjectVal: 0,
        gradeVal: 0,
      };
      obj.optionsData = [];
      for (let i = 0; i < this.options.length; i++) {
        obj.optionsData.push(this.addOptions(i));
      }
      return obj;
    },
    addOptions: function (index) {
      let option = this.createOptionObj();
      if (this.options[index] == "A") {
        option["previewOptionClass"] = "optionA";
      } else {
        option["previewOptionClass"] = "optionB";
      }
      option["optionVal"] = this.options[index];
      console.log(JSON.stringify(option));

      return option;
    },
    selectQuestionType: function () {
      //this.dataOfQuestions = [];
      let questionType = this.dataOfQuestions[0].questionType;
      if (this.dataOfQuestions[0].questionType == 2) {
        this.dataOfQuestions[0].optionsData = [];
        this.selectedCorrectAns.push("");
        this.selectedCorrectAnsData.push({ questionanswer: "" });
      } else {
        this.createOptions();
      }
    },
    createOptions: function () {
      let options = ["A", "B", "C", "D"];

      this.dataOfQuestions[0].optionsData = [];
      let length = options.length;
      for (let i = 0; i < length; i++) {
        let option = this.createOptionObj();
        if (options[i] == "A") {
          option["previewOptionClass"] = "optionA";
        } else {
          option["previewOptionClass"] = "optionB";
        }
        option["optionVal"] = options[i];
        this.dataOfQuestions[0].optionsData.push(option);
      }
    },
    selectCorrctAns: function () {
      let temp = JSON.parse(JSON.stringify(this.selectedCorrectAnsData));
      this.selectedCorrectAnsData = [];
      let optionsLength = this.selectedCorrectAns.length;
      let dataLength = temp.length;
      for (let i = 0; i < optionsLength; i++) {
        let exist = false;
        for (let j = 0; j < dataLength; j++) {
          if (temp[j].option == this.selectedCorrectAns[i]) {
            exist = true;
            temp[j].mcqcorrectanswer = 1; //this.getMCQid(this.selectedCorrectAns[i]);
            temp[j].option = this.selectedCorrectAns[i];
            this.selectedCorrectAnsData.push(temp[j]);
            break;
          }
        }
        if (!exist) {
          let obj = {
            mcqcorrectanswer: this.getMCQid(this.selectedCorrectAns[i]),
            questionanswer: "",
            option: this.selectedCorrectAns[i],
          };
          this.selectedCorrectAnsData.push(obj);
        }
      }
    },
    getMCQid: function (optionVal) {
      let length = this.dataOfQuestions[0].optionsData.length;
      for (let i = 0; i < length; i++) {
        let obj = this.dataOfQuestions[0].optionsData[i];
        if (obj.optionVal == optionVal) {
          return obj.mcq_id;
        }
      }
    },
    createOptionObj: function () {
      let option = {
        optionVal: "",
        selectAnsType: "",
        textVal: "",
        formulaVal: "",
        fileVal: "",
        imageVal: [],
        addOptnClss: "optionDivText",
        previewOptionClass: "",
      };
      return JSON.parse(JSON.stringify(option));
    },
    getPassageQuestionsList: function () {
      UserService.getPassageQuestionsList(
        this.tenantId,
        this.question.questionid
      ).then((response) => {
          this.listOfQuestions = [];
        let length = response.data.resultsMap.questions.length;
        let questionsList = response.data.resultsMap.questions;
        if (length > 0) {
          for (let i = 0; i < length; i++) {
            this.listOfQuestions.push(
              this.prepareQuestionObj(questionsList[i])
            );
          }
        }
      });
    },
    getNameFromVal: function (id, list, type) {
      let length = list.length;

      if (length > 0) {
        for (let i = 0; i < length; i++) {
          if (type == this.subjectType) {
            if (id == list[i].id) {
              return list[i].subjectname;
            }
          } else if (type == this.gradeType) {
            if (id == list[i].id) {
              return list[i].gradename;
            }
          } else if (type == this.statusType) {
            if (id == list[i].id) {
              return list[i].status;
            }
          } else if (type == this.degreeType) {
            if (id == list[i].id) {
              return list[i].degreeofdifficulty;
            }
          }
        }
      }
      return "";
    },
    uploadImage(event, passageType) {
      for (const file of event.target.files) {
        let filename = file.name;
        let filetype = filename.substring(filename.lastIndexOf(".") + 1);
        if (
          filetype.toLowerCase() == "png" ||
          filetype.toLowerCase() == "jpg" ||
          filetype.toLowerCase() == "jpeg"
        ) {
          if (passageType == true) {
            this.passagequestionimages.push(file);
          } else {
            this.questionimages.push(file);
          }
        } else {
          alert("Selected File Type Is Not An Image");
          return;
        }
      }
    },
    removeUrlFromQuestion(url) {
      console.log(JSON.stringify(this.dataOfQuestions[0]));
      this.dataOfQuestions[0].imageurls.splice(url, 1);
    },
    removeUrlFromOptions(index, url) {
      this.dataOfQuestions[0].optionsData[index].imageVal.splice(url, 1);
      console.log(JSON.stringify(this.dataOfQuestions[0].optionsData[index]));
      console.log(JSON.stringify(this.dataOfQuestions[0].optionsData));
    },
    optionImages(event, index) {
      let obj = {};
      obj.index = index;
      obj.imageVal = [];
      for (const file of event.target.files) {
        let filename = file.name;
        let filetype = filename.substring(filename.lastIndexOf(".") + 1);
        if (
          filetype.toLowerCase() == "png" ||
          filetype.toLowerCase() == "jpg" ||
          filetype.toLowerCase() == "jpeg"
        ) {
          obj.imageVal.push(file);
          console.log(obj);
        } else {
          alert("Selected File Type Is Not An Image");
          return;
        }
      }
      let isDuplicate = false;
      for (let i = 0; i < this.optionimages.length; i++) {
        if (index == this.optionimages[i].index) {
          this.optionimages[i].imageVal.push(...obj.imageVal);
          isDuplicate = true;
        }
      }
      if (!isDuplicate) {
        this.optionimages.push(obj);
      }
      console.log("Option images is : " + JSON.stringify(this.optionimages));
    },
    removeFromOptionFile(file, index) {
      _.filter(this.optionimages, function (data) {
        if (data.index == index) {
          data.imageVal.splice(file, 1);
        }
      });
    },
    removeFromSelectedFile(file, index, passageType) {
      if(passageType == true){
        this.passagequestionimages.splice(index, 1);
      }else{
        this.questionimages.splice(index, 1);
      }
    },
    confirmationPopUpOpen: function (key, index, popUpId, action) {
      this.confirmKey = key;
      this.popUpHeading = "Confirm Cancel";
      if (key == this.confirmationPopUpKeys.questionDel) {
        this.deleteIndex = index;
        this.confirmMsg = "Are you sure you want to delete the Question ?";
      } else if (this.confirmKey == this.confirmationPopUpKeys.worksheetReset) {
        this.confirmMsg = "Are you sure you want to discard all changes ?";
      } else if (
        this.confirmKey == this.confirmationPopUpKeys.questionEditCancel
      ) {
        this.toBeEdited = false;
        this.editIndex = "";
        this.confirmMsg = "Are you sure you want to discard all changes ?";
      } else if (
        this.confirmKey == this.confirmationPopUpKeys.libraryQuesDiscard
      ) {
        this.confirmMsg = "Are you sure you want to discard all changes ?";
      } else if (
        this.confirmKey == this.confirmationPopUpKeys.questionMakeActive
      ) {
        this.confirmMsg =
          "Are you sure you want to make this question status as Active ?\n(Q.No: " +
          index +
          ") ";
        this.popUpHeading = "Make Question Status as Active ?";
        this.questionId = index;
      } else if (
        this.confirmKey == this.confirmationPopUpKeys.questionMakeInActive
      ) {
        this.confirmMsg =
          "Are you sure you want to make this question status as InActive ? \n (Q.No: " +
          index +
          ") ";
        this.popUpHeading = "Make Question Status as InActive ?";
        this.questionId = index;
      }

      this.popUp(this.confirmationPopUpId, action);
    },
    confirmationPopUpClose: function (popUpId, action) {
      if (this.confirmKey == this.confirmationPopUpKeys.questionDel) {
        this.deleteQuestion(this.deleteIndex);
      } else if (this.confirmKey == this.confirmationPopUpKeys.worksheetReset) {
        this.resetWorksheet();
      } else if (
        this.confirmKey == this.confirmationPopUpKeys.libraryQuesDiscard
      ) {
        this.resetLibraryQuestions();
      } else if (
        this.confirmKey == this.confirmationPopUpKeys.questionMakeActive
      ) {
        this.libraryQuestions[this.questionId].status_id = 1;
        console.log;
        UserService.updateQuestionStatus(this.tenantId, this.questionId, 1)
          .then((response) => {
            this.showAlerts(this.success, this.alertMsgs.questionStatus);
            if (response.status == 200) {
              this.getLibraryQuestions();
            }
          })
          .catch((error) => {
            console.log("Error response " + JSON.stringify(error.response));
            this.showAlerts(this.fail, this.alertMsgs.questionStatus);
          });
      } else if (
        this.confirmKey == this.confirmationPopUpKeys.questionMakeInActive
      ) {
        console.log(" in confirmationpopupclose");
        this.libraryQuestions[this.questionId].status_id = 0;
        UserService.updateQuestionStatus(this.tenantId, this.questionId, 0)
          .then((response) => {
            this.showAlerts(this.success, this.alertMsgs.questionStatus);
            if (response.status == 200) {
              this.getLibraryQuestions();
            }
          })
          .catch((error) => {
            console.log("Error response " + JSON.stringify(error.response));
            this.showAlerts(this.fail, this.alertMsgs.questionDataAlert);
          });
      }

      this.popUp(this.confirmationPopUpId, action);

      if (this.confirmKey == this.confirmationPopUpKeys.questionEditCancel) {
        this.popUp("myModal", action);
      }

      this.confirmKey = "";
    },
    checkIsEmptyVal: function (val) {
      if (!val) {
        return true;
      }
      return false;
    },
    saveQuestion: function () {
      var self = this;
      let obj = {};
      let questionData = new FormData();
      let formdata = new FormData();
      for (const file of this.questionimages) {
        formdata.append("images", file);
      }
      if (this.validateQuestion()) {
        this.showAlerts(this.success, this.alertMsgs.questionDataAlert);
        let questionObject = {
          questionDescription: this.dataOfQuestions[0].question,
          questiontype_id: this.dataOfQuestions[0].questionType,
          subjectid: this.question.subjectid,
          gradeid: this.question.gradeid,
          context: "context data", // need to change
          status_id: this.dataOfQuestions[0].status_id,
          degreeofdifficultyid: this.dataOfQuestions[0].difficultyId,
          questionid: this.dataOfQuestions[0].questionid,
          imageurls: this.dataOfQuestions[0].imageurls,
          parent_question_id: this.question.questionid,
          correctAnswer: "",
          options: [],
          multipleChoiceDTO: [],
          tags: _.map(this.question.tags, function (tag) {
            let tagname = tag.tagname;
            if (tagname != "") {
              return { tagname };
            }
          }),
        };
        let correctOptionsCount = this.selectedCorrectAnsData.length;
        for (let i = 0; i < correctOptionsCount; i++) {
          this.selectedCorrectAnsData[
            i
          ].questionid = this.dataOfQuestions[0].questionid;
        }
        questionObject.questionAnswer = this.selectedCorrectAnsData;
        if (this.dataOfQuestions[0].questionType == 1) {
          let length = this.dataOfQuestions[0].optionsData.length;
          let optionObj;
          let stringArr = [];
          for (let i = 0; i < length; i++) {
            let option = this.dataOfQuestions[0].optionsData[i];
            optionObj = {};
            optionObj.mcq_order = option.optionVal;
            optionObj.mcq_id = option.mcq_id;
            optionObj.optionimages = [];
            if (option.selectAnsType == 1) {
              optionObj.mcq_description = option.textVal;
            } else if (option.selectAnsType == 2) {
              optionObj.mcq_description = option.formulaVal;
            } else if (option.selectAnsType == 3) {
              optionObj.mcq_description = ""; //need to change it to image value
              optionObj.urls = option.imageVal;
              let imageFiles = this.optionimages.filter(function (data) {
                if (data.index == i) {
                  for (const file of data.imageVal) {
                    questionData.append(data.index, file);
                  }
                }
              });
            }
            optionObj.answertypeid = option.selectAnsType;
            questionObject.options.push(optionObj);
            questionObject.multipleChoiceDTO.push(optionObj);
          }
        }
        if (this.tags.length == 0) {
          this.tags = [{ tagname: "" }];
        }
        if (!this.dataOfQuestions[0].questionid) {
          questionData.append("questionData", JSON.stringify(questionObject));
          console.log(...questionData);
          UserService.saveQuestionToLibrary(questionData, this.tenantId)
            .then((response) => {
              console.log(response.data.resultsMap.question.questionid);
              let questionid = response.data.resultsMap.question.questionid;
              let formdata = new FormData();
              if (!_.isEmpty(this.questionimages)) {
                for (const file of this.questionimages) {
                  formdata.append("images", file);
                }
                formdata.append("questionid", questionid);
                formdata.append("tenant",this.$cookie.get('tenant'));
                UserService.saveQuestionImages(formdata, this.tenantId)
                  .then((response) => {
                    this.getPassageQuestionsList();
                    this.optionimages = [];
                    this.questionimages = [];
                    this.showAlerts(
                      this.success,
                      this.alertMsgs.questionDataAlert
                    );
                  })
                  .catch((err) => {
                    console.log(err);
                    this.showAlerts(
                      this.fail,
                      this.alertMsgs.questionDataAlert
                    );
                  });
              } else {
                this.getPassageQuestionsList();
                this.optionimages = [];
                this.questionimages = [];
                this.showAlerts(this.success, this.alertMsgs.questionDataAlert);
              }
            })
            .catch((error) => {
              console.log("Error response " + JSON.stringify(error.response));
              this.showAlerts(this.fail, this.alertMsgs.questionDataAlert);
            });
        } else {
          questionData.append("questionData", JSON.stringify(questionObject));
          console.log(...questionData);
          let questionid = this.dataOfQuestions[0].questionid;
          UserService.updateQuestionToLibrary(
            questionData,
            questionid,
            this.tenantId
          ).then((response) => {
            let formdata = new FormData();
            if (!_.isEmpty(this.questionimages)) {
              for (const file of this.questionimages) {
                formdata.append("images", file);
              }
              formdata.append("questionid", questionid);
              UserService.saveQuestionImages(formdata, this.tenantId)
                .then((response) => {
                  this.getPassageQuestionsList();
                  this.optionimages = [];
                  this.questionimages = [];
                  this.showAlerts(
                    this.success,
                    this.alertMsgs.questionDataAlert
                  );
                })
                .catch((err) => {
                  console.log(err);
                  this.showAlerts(this.fail, this.alertMsgs.questionDataAlert);
                });
            } else {
              this.getPassageQuestionsList();
              this.optionimages = [];
              this.questionimages = [];
              this.showAlerts(this.success, this.alertMsgs.questionDataAlert);
            }
          });
        }
      } else {
        this.showAlerts(this.fail, this.alertMsgs.questionDataAlert);
      }
    },
    showAlerts: function (type, alertPlace) {
      if (alertPlace == this.alertMsgs.selectQuestionTypeAlert) {
        if (type == this.fail) {
          this.alertMessage = "You must select question type .....";
          this.alertClass = this.alertMsgs.alertDanger;
        } else if (type == this.success) {
          this.alertMessage = "Successfully saved worksheet .....";
          this.alertClass = this.alertMsgs.alertSuccess;
        }
        this.showAlert = true;
      } else if (alertPlace == this.alertMsgs.questionDataAlert) {
        if (type == this.fail) {
          this.popUpAlertMessage = "You must enter all the data .....";
          this.popUpAlertClass = this.alertMsgs.alertDanger;
        } else if (type == this.success) {
          this.popUpAlertMessage = "Successfully added question .....";
          this.popUpAlertClass = this.alertMsgs.alertSuccess;
        }
        this.showPopUpAlert = true;
      } else if (alertPlace == this.alertMsgs.questionStatus) {
        if (type == this.fail) {
          this.popUpAlertMessage = "Failed to update the status .....";
          this.popUpAlertClass = this.alertMsgs.alertDanger;
        } else if (type == this.success) {
          this.popUpAlertMessage = "Successfully updated the status .....";
          this.popUpAlertClass = this.alertMsgs.alertSuccess;
        }
        this.showPopUpAlert = true;
      } else if (alertPlace == this.alertMsgs.libraryQuesAlert) {
        if (type == this.fail) {
          this.popUpAlertMessage = "You must enter all the data .....";
          this.popUpAlertClass = this.alertMsgs.alertDanger;
        } else if (type == this.success) {
          let length = this.selectedQuestionsIdsList.length;
          if (length == 1) {
            this.popUpAlertMessage = "Successfully added question .....";
          } else {
            this.popUpAlertMessage =
              "Successfully added " + length + " questions ...";
          }
          this.popUpAlertClass = this.alertMsgs.alertSuccess;
        }
        this.showPopUpAlert = true;
      }

      let thisVue = this;
      let alert = alertPlace;
      setTimeout(function () {
        thisVue.alertMessage = "";
        thisVue.alertClass = "";
        thisVue.showAlert = false;
        thisVue.showPopUpAlert = false;
        if (
          alertPlace == thisVue.alertMsgs.questionDataAlert &&
          type == thisVue.success
        ) {
          thisVue.popUp("myModal", thisVue.close);
          thisVue.dataOfQuestions = [];
        } else if (
          alertPlace == thisVue.alertMsgs.libraryQuesAlert &&
          type == thisVue.success
        ) {
          thisVue.popUp("libraryQuestionsPopUp", thisVue.close);
          thisVue.selectedQuestionsIdsList = [];
        }
      }, 2000);
    },
    validateQuestion: function () {
      let questionObject = this.dataOfQuestions[0];
      if (this.checkIsEmptyVal(questionObject.question)) {
        return false;
      }
      if (this.checkIsEmptyVal(questionObject.difficultyId)) {
        return false;
      }
      if (this.checkIsEmptyVal(questionObject.status_id)) {
        return false;
      } else if (
        questionObject.questionType == 1 &&
        questionObject.optionsData.length > 0
      ) {
        if (!this.selectedCorrectAns || this.selectedCorrectAns.length == 0) {
          return false;
        }
        let length = questionObject.optionsData.length;
        for (let i = 0; i < length; i++) {
          let obj = questionObject.optionsData[i];
          if (obj && obj.selectAnsType) {
            if (obj.selectAnsType == 1 && this.checkIsEmptyVal(obj.textVal)) {
              return false;
            } else if (obj.selectAnsType == 2) {
              if (this.checkIsEmptyVal(obj.formulaVal)) {
                return false;
              } else {
                // this.dataOfQuestions[0].optionsData[i][
                //   "formulaHtml"
                // ] = this.getCkFinalData(obj.formulaVal);
              }
            } else if (
              obj.selectAnsType == 3 &&
              this.checkIsEmptyVal(obj.imageVal)
            ) {
              //   return false;
            }
          } else {
            return false;
          }
        }
      }
      return true;
    },
    checkIsEmptyVal: function (val) {
      if (!val) {
        return true;
      }
      return false;
    },
    setOptionClass: function (className, optionIndex) {
      this.dataOfQuestions[0].optionsData[optionIndex].addOptnClss = className;
    },
    eachQuestion: function (selectedQuestion, selectedIndex) {
      this.eachquestion = selectedQuestion;
      this.eachindex = selectedIndex;
      this.popUp("viewquestion", this.open);
    },
    addOptionClass: function (val, optionIndex) {
      if (val == 1) {
        this.setOptionClass("optionDivText", optionIndex);
      } else if (val == 2) {
        this.setOptionClass("optionDivCkeditor", optionIndex);
      } else if (val == 3) {
        this.setOptionClass("optionDivFileUpload", optionIndex);
      }
    },
    prepareQuestionObj: function (questionsData) {
      let obj = JSON.parse(JSON.stringify(questionsData));
      obj.context = questionsData.context;
      obj.question = questionsData.questionDescription;
      obj.parent_question_id = questionsData.parent_question_id;
      obj.questionDetails = questionsData.questionDescription;
      obj.questionType = questionsData.questiontype_id;
      obj.questionNumber = questionsData.questionNumber;
      if (questionsData.questionAnswer != null) {
        let correctOptionsLength = questionsData.questionAnswer.length;
        obj.correctAnswer = "";
        for (let i = 0; i < correctOptionsLength; i++) {
          if (!obj.correctAnswer) {
            obj.correctAnswer = this.getOptionVal(
              questionsData.multipleChoiceDTO,
              questionsData.questionAnswer[i].mcqcorrectanswer
            );
          } else {
            obj.correctAnswer =
              obj.correctAnswer +
              "," +
              this.getOptionVal(
                questionsData.multipleChoiceDTO,
                questionsData.questionAnswer[i].mcqcorrectanswer
              );
          }
        }
      }
      obj.optionsData = [];
      if (
        questionsData.questiontype_id == 1 &&
        questionsData.multipleChoiceDTO != null
      ) {
        let length = questionsData.multipleChoiceDTO.length;
        let option;
        for (let j = 0; j < length; j++) {
          option = {};
          option.selectAnsType =
            questionsData.multipleChoiceDTO[j].answertypeid;
          option.optionVal = questionsData.multipleChoiceDTO[j].mcq_order;
          option.mcq_id = questionsData.multipleChoiceDTO[j].mcq_id;
          option.textVal = questionsData.multipleChoiceDTO[j].mcq_description;
          option.imageVal = questionsData.multipleChoiceDTO[j].urls;
          console.log(option.imageVal);
          if (option.selectAnsType == 2) {
            // option.formulaHtml = this.getCkFinalData(
            //   questionsData.multipleChoiceDTO[j].mcq_description
            // );
          }
          option.formulaVal =
            questionsData.multipleChoiceDTO[j].mcq_description;
          obj.optionsData.push(option);
        }
      }
      return obj;
    },
    getOptionVal: function (options, val) {
      let length = options.length;
      for (let i = 0; i < length; i++) {
        if (val == options[i].mcq_id) {
          return options[i].mcq_order;
        }
      }
    },
  },
};
</script>


<style scoped>
.reset-padding {
  padding: 0;
}

.reset-margin {
  margin: 0;
}

.col-sm-1 {
  max-width: 100%;
}

.studentstable {
  width: 100%;
  padding-top: 1%;
}
.table-borderless td,
.table-borderless th {
  border: 0px !important;
}

.newWorksheet {
  background-color: #039be5;
  background-image: none;
  border-color: #039be5;
  color: white;
  padding: 5px 30px;
  margin-top: -2px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0px;
}

* .newstudent:hover {
  color: white;
}
/* 
button {
  background-color: #039be5;
} */

.btn {
  border-radius: 0px;
  color: #fff;
}

.btn:hover,
.btn:focus {
  color: #fff;
  text-decoration: none;
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

.popUpEle {
  width: 250px;
}

.btnAsLink {
  background: none;
  border: none;
  color: blue;
}

.worksheetDetails {
  margin: auto;
  width: 250px;
}

.showAlertDiv {
  margin-top: -42px;
  height: 42px;
  margin-left: 152px;
  width: 276px;
}
.search-btn {
  background-color: #039be5;
}
.gradeFilter {
  float: left;
  width: 15%;
}
.arrow {
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
}
.left {
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
</style>
<style scoped>
@import url("../../../assets/css/worksheet_styles.css");
.gradeFilter {
  position: relative;
}
</style>


