<template>
  <div>
    <div class="container home-page">
      <div v-show="byeMsg" style="text-align: center">
        <h4><b style="color: green">Thank You For Attempting Test</b></h4>
      </div>
      <div class="col-lg-12 text-left">
        <h3 v-show="!byeMsg" class="student-head">
          {{ this.selectedWorksheet.worksheet_name }}
        </h3>
        <div
          v-if="
            this.selectedQuestionIndex == this.worksheetQuestions.length - 1 &&
            this.worksheetQuestions.length != 1
          "
        >
          <h4>
            <b style="color: red"
              >You Reached End of the Test, Please Review Your Answers and
              Submit</b
            >
          </h4>
        </div>
      </div>
      <!-- <div class="col-lg-3 text-left">
            <button class='assign-button' 
                 v-on:click="startTest()">Start fresh Test</button>
        </div>
         <div class="col-lg-3 text-left">
            <button class='assign-button' 
                 v-on:click="startTest()">Start where you left</button>
        </div> -->
      <div v-if="emptyCondition == false">
        <h4><b style="color: red"> Questions Are Empty </b></h4>
      </div>
      <div v-if="isAttempted">
        <h1><b style="color: red"> Submitted </b></h1>
      </div>
      <div v-if="isAttempted && !isEvaluated">
        <br /><br />
        <h3><b style="color: green"> Evaluation in progress ..... </b></h3>
      </div>
      <div v-if="isAttempted && isEvaluated">
        <h3 style="color: blue">
          Total Marks = {{ this.selectedWorksheet.max_marks }}<br /><br />
          Secured Marks = {{ this.selectedWorksheet.securedmarks }}
        </h3>
        <br /><br />
        <a v-on:click="viewEvaluation()" style="color: red">
          Click Here to view Evaluation</a
        >
      </div>
      <div v-show="!isAttempted" class="col-lg-12 text-right">
        <button
          class="assign-button float-right"
          v-on:click="DialoguePopUp('startTestPopUp', open)"
          v-show="show"
        >
          Start test
        </button>
      </div>

      <div v-if="testQuestion.length > 0" class="col-lg-3 text-left">
        <!--  <p><strong>Time left :</strong></p> -->
        <count-down-timer
          v-if="selectedWorksheet.timebased == 1"
          :date="countDownTime"
        />
      </div>
      <!-- worksheet pop up start-->
      <div
        class="modal fade"
        data-keyboard="false"
        data-backdrop="static"
        id="startTestPopUp"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div>
                <h4>Confirm</h4>
              </div>
            </div>
            <div class="modal-body">
              <div>
                <h5>Are you sure you want to start test?</h5>
                <h5>This action cannot be reversed.</h5>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-info" data-dismiss="modal">
                Abort
              </button>
              <button
                type="button"
                class="btn btn-info"
                data-dismiss="modal"
                @click="startTest()"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- worksheet pop up end-->
      <div class="col-lg-12 worksheetstable reset-padding reset-margin">
        <div class="text-left row">
          <div
            v-if="
              !show && selectedWorksheet.worksheet_type == 2 && !isAttempted
            "
          >
            <div v-if="docUrl != null && docUrl != undefined">
              <div v-if="docUrl.split('.').pop().toLowerCase() == 'pdf'">
                <pdf
                  :src="docUrl"
                  style="display: inline-block; width: 100%"
                ></pdf
                ><br /><br />
              </div>
              <div
                v-else-if="
                  docUrl.split('.').pop().toLowerCase() == 'jpg' ||
                  docUrl.split('.').pop().toLowerCase() == 'jpeg' ||
                  docUrl.split('.').pop().toLowerCase() == 'png'
                "
              >
                <img :src="docUrl" height="1200px" width="947px" /><br />
              </div>
              DownloadLink
              <a :href="docUrl" target="_blank">{{ docUrl }}</a>
            </div>
            <br /><br />
            <strong style="color: red"> Answer: </strong>
            <ckeditor-math-equation
              v-model="documentAnswer"
              placeholder="Enter question"
            ></ckeditor-math-equation
            ><br />
            <strong style="color: green">OR </strong>
            <div>
              <input
                type="file"
                style="color: transparent"
                :value="null"
                @change="selectedDocuments($event)"
                multiple
              /><br />
              <p v-for="(url, index) in documents">
                <a @click="removeUrlFromDocuments(url, index)"
                  ><span class="glyphicon glyphicon-remove"></span></a
                >{{ url.name }}
              </p>
              <input
                class="assign-button"
                type="button"
                @click="uploadDocuments()"
                value="Submit"
                :disabled="disableUploadButton"
              /><br />
              <strong v-show="uploadMsg == true" style="color: green"
                >Succesfully Uploaded</strong
              >
            </div>
          </div>
          <div v-else-if="!show && selectedWorksheet.worksheet_type == 1">
            <div v-if="testQuestion.length < 0">Questions Are Empty</div>
            <div v-for="(question, index) in testQuestion">
              <div class="table-responsive">
                <table class="table table-hover">
                  <tbody>
                    <tr>
                      <td
                        style="
                          width: 15px;
                          color: #fb6750;
                          font-weight: bold;
                          font-size: 18px;
                        "
                      >
                        {{ question.questionNumber }}.
                      </td>
                      <td>
                        <!-- <vue-mathjax
                      style="float: left; font-weight:bold; color:#fb6750; font-size:18px;white-space:pre;"
                      :formula="question.questionDetails"
                    ></vue-mathjax> -->
                        <p v-html="question.questionDescription"></p>
                        <br />
                        <p style="float: right; margin-right: 50px">
                          Marks: {{ question.max_marks }}
                        </p>
                        <br /><br />
                        <div v-for="url in question.imageurls">
                          <img
                            v-if="url != null"
                            :src="url"
                            style="
                              width: 300px;
                              height: 250px;
                              margin-left: 10px;
                              float: left;
                            "
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div v-if="question.questionType == 2">
                  <ckeditor-math-equation
                    v-model="enteredDescAns"
                    :key="editorComponentKey"
                    placeholder="Enter question"
                  ></ckeditor-math-equation
                  ><br />
                  OR
                  <div>
                    <input type="file" @change="selectedFile($event)" /><br />
                    <input
                      type="button"
                      @click="uploadFile()"
                      value="Upload"
                      :disabled="disableUploadButton"
                    /><br />
                    <div>{{ documenturl }}</div>
                    <strong v-show="uploadMsg == true" style="color: green"
                      >Succesfully Uploaded</strong
                    >
                  </div>
                </div>
                <table
                  class="table table-hover"
                  v-if="question.questionType == 1"
                >
                  <tbody>
                    <tr v-for="options in question.optionsData">
                      <td
                        class="align-middle borderless-table"
                        style="width: 100px !important"
                      >
                        <input
                          type="checkbox"
                          style="float: left; width: 25px"
                          :value="options.optionVal"
                          v-model="selectedAnswers"
                        />
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
                          style="
                            float: left;
                            margin-left: 10px;
                            margin-top: 0px;
                          "
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
                                height: 150px;
                                margin-left: 10px;
                              "
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Selected Answers :</strong>
                        {{ selectedAnswers.toString() }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- <div class="col-lg-3 text-left" style="width: 25%;float:right"> -->
                <br />
                <div
                  style="
                    border: 2px solid blue;
                    overflow: scroll;
                    border: 4px outset;
                    margin-right: 30px;
                  "
                  v-if="question.questionType == 3"
                >
                  <div v-for="(passagequestion, index) in passageQuestion">
                    <div class="table-responsive">
                      <table class="table table-hover">
                        <tbody>
                          <tr>
                            <td
                              style="
                                width: 15px;
                                color: #fb6750;
                                font-weight: bold;
                                font-size: 18px;
                              "
                            >
                              {{ passageQuestionIndex + 1 }}.
                            </td>
                            <td>
                              <!-- <vue-mathjax
                      style="float: left; font-weight:bold; color:#fb6750; font-size:18px;white-space:pre;"
                      :formula="question.questionDetails"
                    ></vue-mathjax> -->
                              <p
                                v-html="passagequestion.questionDescription"
                              ></p>
                              <br /><br />
                              <div v-for="url in passagequestion.imageurls">
                                <img
                                  v-if="url != null"
                                  :src="url"
                                  style="
                                    width: 300px;
                                    height: 250px;
                                    margin-left: 10px;
                                    float: left;
                                  "
                                />
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div v-if="passagequestion.questionType == 2">
                        <ckeditor-math-equation
                          v-model="descAns"
                          :key="editorComponentKey"
                          placeholder="Enter question"
                        ></ckeditor-math-equation
                        ><br />
                        OR
                        <div>
                          <input
                            type="file"
                            :value="inputFile"
                            @change="selectedFile($event)"
                          /><br />
                          <input
                            type="button"
                            @click="uploadFile()"
                            value="Upload"
                            :disabled="disableUploadButton"
                          /><br />
                          <div>{{ documenturl }}</div>
                          <strong
                            v-show="uploadMsg == true"
                            style="color: green"
                            >Succesfully Uploaded</strong
                          >
                        </div>
                      </div>
                      <table
                        class="table table-hover"
                        v-if="passagequestion.questionType == 1"
                      >
                        <tbody>
                          <tr v-for="options in passagequestion.optionsData">
                            <td
                              class="align-middle borderless-table"
                              style="width: 100px !important"
                            >
                              <input
                                type="checkbox"
                                style="float: left; width: 25px"
                                :value="options.optionVal"
                                v-model="selectedAnswers"
                              />
                              <p
                                style="
                                  float: left;
                                  width: 10px;
                                  margin: 0px 0 10px;
                                "
                              >
                                {{ options.optionVal }}.
                              </p>
                              <p
                                style="
                                  float: left;
                                  width: 94%;
                                  padding-left: 9px;
                                "
                                v-if="options.selectAnsType == 1"
                              >
                                {{ options.textVal }}
                              </p>
                              <vue-mathjax
                                style="
                                  float: left;
                                  margin-left: 10px;
                                  margin-top: 0px;
                                "
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
                                      height: 150px;
                                      margin-left: 10px;
                                    "
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <strong>Selected Answers :</strong>
                              {{ selectedAnswers.toString() }}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p
                        v-show="passageEndMsg"
                        style="color: red; margin-left: 300px"
                      >
                        <strong><h4>You Reached End Of Question</h4></strong>
                      </p>
                    </div>
                    <button
                      v-show="disablePassageNext"
                      style="float: right; margin-right: 200px"
                      class="btn btn-info"
                      @click="
                        saveAndShowNextQuestion(
                          passagequestion,
                          true,
                          question.questionid
                        )
                      "
                    >
                      Next
                    </button>
                    <button
                      v-show="passageQuestionIndex > 0"
                      style="
                        float: left;
                        margin-left: 200px;
                        margin-bottom: 20px;
                      "
                      class="btn btn-info"
                      @click="showPreviousQuestion(question, true)"
                    >
                      Previous
                    </button>
                  </div>
                </div>
                <br /><br />
                <!-- </div> -->
              </div>
            </div>
          </div>
        </div>

        <!-- <div
        v-if="testQuestion.length > 0"
        class="col-lg-3 text-left well"
        style="width: 25%; float: right"
      >
        <div>
          <div style="float: left">
            <button class="btn btn-info" style="float: left">
              {{ this.notVisitedQuestions.length }}
            </button>
            <p style="float: left; padding-left: 5px; margin-top: 6px">
              Not visited
            </p>
          </div>
          <div style="float: left; margin-left: 6px">
            <button class="btn btn-success" style="float: left">
              {{ this.answeredQuestions.length }}
            </button>
            <p style="float: left; padding-left: 5px; margin-top: 6px">
              Answered
            </p>
          </div>
          <div style="clear: both" />
          <div style="float: left; margin-top: 14px">
            <button class="btn btn-danger" style="float: left">
              {{ this.notAnsweredQuestions.length }}
            </button>
            <p style="float: left; padding-left: 5px; margin-top: 6px">
              Not Answered
            </p>
          </div>
        </div>
      </div> -->
        <!-- <div
        v-if="testQuestion.length > 0"
        class="col-lg-3 text-left well"
        style="width: 25%; float: right; overflow: scroll; height: 279px"
      >
        <div
          style="float: left; width: 22%"
          v-for="(question, index) in worksheetQuestions"
        >
          <button
            :class="showBtnStatusColor(question.questionNumber)"
            @click="showTestQuestion(question, index)"
          >
            {{ question.questionNumber }}
          </button>
          <br /><br />
        </div>
      </div> -->

        <!-- <div class="col-lg-3 text-left" style="width: 25%;float:right"> -->
        <div
          v-if="
            this.testQuestion.length > 0 &&
            this.selectedQuestionIndex == this.worksheetQuestions.length - 1
          "
        >
          <button
            @click="submit()"
            style="float: right; margin-right: 300px; background-color: green"
            class="assign-button"
          >
            Submit
          </button>
          <br /><br />
        </div>
        <div
          v-if="
            this.testQuestion.length > 0 &&
            this.selectedQuestionIndex != this.worksheetQuestions.length - 1
          "
          style="border-top: 1px solid rgb(236 236 236)"
        >
          <button
            style="float: right; margin-right: 30px"
            @click="saveAndShowNextQuestion(null, false, 0)"
            class="assign-button"
          >
            Next
          </button>
        </div>
        <div
          v-if="this.testQuestion.length > 0 && this.selectedQuestionIndex != 0"
        >
          <button
            @click="showPreviousQuestion(null, false)"
            class="assign-button"
          >
            Previous
          </button>
          <br /><br />
        </div>
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import UserService from "../../../../services/userService.js";
import moment, { fn } from "moment";
import { VueMathjax } from "vue-mathjax";
import CountDownTimer from "./countdowntimer_template.vue";
import store from "../../../../store.js";
import CkeditorMathEquation from "../../../admin/worksheets/ckeditormathequations_template";
import _ from "lodash";
import pdf from "vue-pdf";
export default {
  // props:['myChild','school','userdetails'],
  components: {
    pdf,
    CountDownTimer,
    CkeditorMathEquation,
  },
  data() {
    return {
      open: "show",
      tenantId: this.$cookie.get("id"),
      worksheets: [],
      worksheetQuestions: [],
      pageNumber: 0,
      size: 1,
      countDownTime: null,
      testQuestion: [],
      passageQuestion: [],
      selectedQuestionIndex: 0,
      passageQuestionIndex: 0,
      selectedAnswers: [],
      notVisitedQuestions: [],
      answeredQuestions: [],
      notAnsweredQuestions: [],
      selectedWorksheet: {},
      enteredDescAns: "",
      descAns: "",
      submittedQuestions: [],
      onLoad: true,
      freshTest: true,
      school: {},
      userdetails: {},
      userid: this.$cookie.get("userid"),
      myChild: {},
      date: "",
      show: true,
      emptyCondition: true,
      showMessage: false,
      saveAndShowNextButton: true,
      previousButton: false,
      byeMsg: false,
      selectedQAList: [],
      submitted: false,
      isAttempted: false,
      submittedResults: [],
      isEvaluated: false,
      timeCount: null,
      file: null,
      documenturl: null,
      uploadMsg: false,
      disableUploadButton: false,
      test_started_time: null,
      docUrl: null,
      documents: [],
      documentAnswer: null,
      passageQuestions: [],
      disablePassageNext: true,
      passageQAList: [],
      passageEndMsg: false,
      editorComponentKey:0,
      inputFile:'',
    };
  },
  created() {
    this.school = this.$store.state.school;
    this.userdetails = this.$store.state.userDetails;
    this.myChild = this.$store.state.myChild;
    const classid = {
      id: this.myChild.classid,
    };
    //   console.log(JSON.stringify(this.myChild))
    this.selectedWorksheet = this.$store.state.parentSelectedWorksheet;
    this.attempted();
    if (this.selectedWorksheet.worksheet_type == 1) {
      this.getListOfQuestions();
    } else if (this.selectedWorksheet.worksheet_type == 2) {
      this.getWorksheetDocument();
    }
  },
  mounted() {},
  methods: {
    startTest: function () {
      this.show = false;
      if (this.selectedWorksheet.timebased == 1) {
        let storeStartedTime = {
          id: this.selectedWorksheet.id,
          test_started_time: Date.parse(new Date()),
        };
        UserService.submitStudentWorksheet(this.tenantId, storeStartedTime)
          .then((response) => {
            this.date = new Date(response.data.results[0].test_started_time);
            this.date.setMinutes(
              this.date.getMinutes() + this.selectedWorksheet.timeinminutes
            );
            this.countDownTime = this.date.toString();
          })
          .catch((error) => {});
      }
      this.testQuestion = [];
      this.resetSelectedAnswers();
      if (this.worksheetQuestions.length > 0) {
        this.testQuestion.push(this.worksheetQuestions[0]);
        if (this.testQuestion[0].questionType == 3) {
          this.passageQuestionStart(this.testQuestion[0]);
          this.getPrevSubAnswer(this.passageQuestionIndex,true,this.testQuestion[0].questionid);
        }else{
          this.getPrevSubAnswer(0, false, 0);
        }
      } else {
        if (this.selectedWorksheet.worksheet_type != 2) {
          this.emptyCondition = false;
        }
      }
      //    console.log(this.worksheetQuestions.length)
      if (this.selectedWorksheet.timebased == 1) {
        this.timeCount = window.setInterval(() => {
          if (this.date.getTime() < new Date().getTime()) {
            if (this.submitted == false) {
              this.submit();
            }
            alert("Oops! Time's up  Thank You For Attempting Test");
            this.testQuestion = [];
            this.$router.push({
              path: "/my-children/worksheets",
            });
            clearInterval(this.timeCount);
          }
        }, 1000);
      }
    },
    passageQuestionStart: function (question) {
      console.log("Passage Question Start Executed");
      let length = this.passageQuestions.length;
      if (length > 0) {
        for (let i = 0; i < this.passageQuestions.length; i++) {
          if (question.questionid == this.passageQuestions[i].questionid) {
            let passageQuestionLength = this.passageQuestions[i].questions
              .length;
            if (
              passageQuestionLength > 0 &&
              this.passageQuestionIndex < passageQuestionLength
            ) {
              this.disablePassageNext = true;
              this.passageEndMsg = false;
              this.passageQuestion = [];
              this.passageQuestion.push(
                this.passageQuestions[i].questions[this.passageQuestionIndex]
              );
              console.log("Passage Question Added");
            } else {
              this.passageQuestionIndex--;
              this.disablePassageNext = false;
              this.passageEndMsg = true;
              return false;
            }
          }
        }
      }
      return true;
    },
    selectedFile: function (event) {
      this.file = new FormData();
      this.file.append("file", event.target.files[0]);
      this.file.append(
        "academicyear",
        this.$store.state.acdemicyearandboard.academicyear
      );
      this.file.append(
        "syllabustype",
        this.$store.state.acdemicyearandboard.syllabustype
      );
      this.file.append("gradename", this.$store.state.myChild.gradename);
      this.file.append("section", this.$store.state.myChild.sectionname);
      this.file.append("subject", this.selectedWorksheet.subjectname);
      this.file.append("studentname", this.myChild.name);
    },
    removeUrlFromDocuments: function (url, index) {
      this.documents.splice(index, 1);
    },
    selectedDocuments: function (event) {
      let files = event.target.files;
      for (const file of files) {
        this.documents.push(file);
      }
    },
    uploadDocuments: function () {
      let form = new FormData();
      for (const file of this.documents) {
        form.append("documents", file);
      }
      form.append("ws_test_id", this.selectedWorksheet.id);
      form.append("student_id", this.myChild.id);
      form.append("answer", this.documentAnswer);
      UserService.saveSubmittedDocuments(this.tenantId, form)
        .then((response) => {
          this.disableUploadButton = true;
          this.submitted = true;
          this.byeMsg = true;
          let submitData = {
            id: this.selectedWorksheet.id,
            studentid: this.myChild.studentid,
            submitteddate: new Date(),
            statusid: 1,
            numberofattempt: 1,
          };

          UserService.submitStudentWorksheet(this.tenantId, submitData)
            .then((response) => {
              alert("Thank You For Attempting Test");
              this.$router.push({
                path: "/my-children/worksheets",
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
      if (this.selectedWorksheet.timebased == 1) {
        clearInterval(this.timeCount); // clear the time when submit is done
      }
    },
    uploadFile: function () {
      if (this.file == null) {
        alert("Please Select File");
      } else {
        this.disableUploadButton = true;
        UserService.uploadFile(this.file)
          .then((response) => {
            this.documenturl = response.data.url;
            if (this.documenturl) {
              this.uploadMsg = true;
            } else {
              alert(`Error While Uploading , Please Try Again
            Error : ${response.data.error}`);
              this.disableUploadButton = false;
            }
          })
          .catch((err) => {
            alert("Error While Uploading , Please Try Again");
            console.log(err);
          });
      }
    },
    showTestQuestion: function (question, index) {
      this.testQuestion = [];
      this.resetSelectedAnswers();
      this.testQuestion.push(question);
      this.removeFromNotVisited(
        this.getIndexVal(this.notVisitedQuestions, question.questionNumber)
      );
      this.selectedQuestionIndex = index;
      if (this.selectedQuestionIndex == 0) {
        this.previousButton = false;
      } else {
        this.previousButton = true;
      }
      if (this.selectedQuestionIndex == this.worksheetQuestions.length - 1) {
        this.showMessage = true;
        this.saveAndShowNextButton = false;
      } else {
        this.showMessage = false;
        this.saveAndShowNextButton = true;
      }
      this.getPrevSubAnswer(index, false, 0);
    },
    showPreviousQuestion: function (question, passage) {
      console.log("Previous Question started");
      if (this.selectedQuestionIndex >= 0) {
        console.log("Condition true");
        if (this.selectedQuestionIndex - 1 <= 0) {
          this.previousButton = false;
        } else {
          this.previousButton = true;
        }
        if (this.selectedQuestionIndex == this.worksheetQuestions.length - 1) {
          this.showMessage = true;
          this.saveAndShowNextButton = false;
        } else {
          this.showMessage = false;
          this.saveAndShowNextButton = true;
        }
        this.resetSelectedAnswers();
        this.removeFromNotVisited(
          this.getIndexVal(
            this.notVisitedQuestions,
            this.worksheetQuestions[this.selectedQuestionIndex].questionNumber
          )
        );
        if (passage) {
          console.log("passage executed");
          this.passageQuestion = [];
          if (this.passageQuestionIndex > 0) {
            this.passageQuestionIndex--;
          }
          this.passageQuestionStart(
            this.worksheetQuestions[this.selectedQuestionIndex]
          );
          this.getPrevSubAnswer(
            this.passageQuestionIndex,
            true,
            question.questionid
          );
        } else {
          this.passageQuestionIndex = 0;
          this.testQuestion = [];
          this.selectedQuestionIndex--;
          this.testQuestion.push(
            this.worksheetQuestions[this.selectedQuestionIndex]
          );
          console.log(
            "questionType :" +
              this.worksheetQuestions[this.selectedQuestionIndex].questionType
          );
          if (
            this.worksheetQuestions[this.selectedQuestionIndex].questionType ===
            3
          ) {
            this.getPrevSubAnswer(
              this.passageQuestionIndex,
              true,
              this.worksheetQuestions[this.selectedQuestionIndex].questionid
            );
          } else {
            this.getPrevSubAnswer(this.selectedQuestionIndex, false, 0);
          }
          this.passageQuestionStart(
            this.worksheetQuestions[this.selectedQuestionIndex]
          );
        }
      }
    },
    getPrevSubAnswer: function (index, passage, questionid) {
      let obj;
      if (passage) {
        _.forEach(this.passageQuestions, function (pq) {
          if (pq.questionid === questionid) {
            obj = pq.questions[index];
          }
        });
      } else {
        obj = this.worksheetQuestions[index];
      }
      let length = this.submittedQuestions && this.submittedQuestions.length;
      this.selectedAnswers = [];
      this.enteredDescAns = "";
      this.descAns = "";
      for (let i = 0; i < length; i++) {
        let subObj = this.submittedQuestions[i];
        if (obj && obj.questionid == subObj.questionid) {
          if (obj.questiontype_id == 1) {
            this.selectedAnswers = subObj.selectedanswers;
          } else if (obj.questiontype_id == 2) {
            this.enteredDescAns = subObj.descriptiveanswer;
            if (passage) {
              this.descAns = subObj.descriptiveanswer;
            }
            this.documenturl = subObj.documenturl;
            console.log("Doc URL Added" + this.documenturl)
            break;
          }
        }
      }
      // this.selectedAnswers = this.selectedAnswers.splice(this.selectedAnswers.length - 1,1);
    },

    // getPrevSubAnswer: function (index) {
    //   let obj = this.worksheetQuestions[index];
    //   let length = this.selectedQAList && this.selectedQAList.length;
    //   this.selectedAnswers = [];
    //   this.enteredDescAns = "";
    //   for (let i = 0; i < length; i++) {
    //     let subObj = this.selectedQAList[i];
    //     if (obj && obj.questionid == subObj.questionid) {
    //       if (obj.questiontype_id == 1) {
    //         for (const iterator of subObj.selectedoption) {
    //           console.log(iterator.option)
    //           this.selectedAnswers.push(iterator.option);
    //         }
    //       } else if (obj.questiontype_id == 2) {
    //         this.enteredDescAns = subObj.descriptiveanswer;
    //         break;
    //       }
    //     }
    //   }
    //   this.selectedAnswers = this.selectedAnswers.splice(this.selectedAnswers.length - 1,1);
    // },
    resetSelectedAnswers: function () {
      this.selectedAnswers = [];
    },
    getIndexVal: function (list, value) {
      return list.indexOf(value);
    },
    removeFromNotVisited: function (index) {
      if (index != -1) {
        this.notVisitedQuestions.splice(index, 1);
      }
    },
    removeFromNotAnswered: function (index) {
      if (index != -1) {
        this.notAnsweredQuestions.splice(index, 1);
      }
    },
    addToAnsweredQuestions: function (index, questionId) {
      if (index != -1) {
        this.answeredQuestions.push(questionId);
      }
    },
    saveAndShowNextQuestion: function (question, passage, q_id) {
      let passageObj = {};
      let queObj = {};
      this.selectedQAList = [];
      if (this.selectedQuestionIndex < 0) {
        this.previousButton = false;
      } else {
        this.previousButton = true;
      }
      if (
        this.selectedQuestionIndex + 1 ==
        this.worksheetQuestions.length - 1
      ) {
        this.showMessage = true;
        this.saveAndShowNextButton = false;
      } else {
        this.showMessage = false;
        this.saveAndShowNextButton = true;
      }
      if (this.selectedQuestionIndex < this.worksheetQuestions.length) {
        // to get the current question get the index here
        if (passage) {
          this.editorComponentKey+=1;
          queObj = question;
          this.passageQuestionIndex++;
          this.enteredDescAns = this.descAns;
        } else {
          this.editorComponentKey+=2;
          this.testQuestion = [];
          queObj = this.worksheetQuestions[this.selectedQuestionIndex];
          this.selectedQuestionIndex++; // to get the next question index
        }

        this.addToAnsweredQuestions(
          this.selectedQuestionIndex,
          queObj.questionid
        );
        this.removeFromNotAnswered(
          this.notAnsweredQuestions.indexOf(queObj.questionNumber)
        );
        this.removeFromNotVisited(
          this.getIndexVal(this.notVisitedQuestions, queObj.questionNumber)
        );
      }
      let subQueAnsObj = {
        ws_testid: this.selectedWorksheet.id,
        studentid: this.myChild.studentid,
        questionid: queObj.questionid,
        questiontypeid: queObj.questiontype_id,
        questionNumber: queObj.questionNumber,
      };
      if (queObj.questiontype_id == 1) {
        let length = this.selectedAnswers.length;
        subQueAnsObj.selectedoption = [];
        for (let i = 0; i < length; i++) {
          let ansObj = {
            option: this.selectedAnswers[i],
          };
          if(ansObj.option !== null && ansObj.option !== undefined){
            subQueAnsObj.selectedoption.push(ansObj);
          }
        }
      } else if (queObj.questiontype_id == 2) {
        subQueAnsObj.descriptiveanswer = this.enteredDescAns;
        subQueAnsObj.documenturl = this.documenturl;
      }
      // for removing the repeated selections of answers
      // if(this.selectedQAList.length == -1){
      //   this.selectedQAList.push(subQueAnsObj);
      //   console.log(JSON.stringify(subQueAnsObj));
      // }else{
      //_.remove(this.selectedQAList, function(qa){ return qa.questionid == subQueAnsObj.questionid})
      this.selectedQAList.push(subQueAnsObj);
      // }
      // let nextQueObj = this.worksheetQuestions[this.selectedQuestionIndex];
      // this.testQuestion.push(nextQueObj);
      // this.removeFromNotVisited(
      // this.notVisitedQuestions.indexOf(nextQueObj.questionNumber)
      // );
      // this.resetSelectedAnswers();
      // this.getPrevSubAnswer(this.selectedQuestionIndex);
      this.file = null;
      this.inputFile = null;
      this.disableUploadButton = false;
      this.uploadMsg = false;
      UserService.saveTestQueSubmittedAns(this.tenantId, this.selectedQAList)
        .then((response) => {
          this.getSavedQuestionsAns();
          // console.log(JSON.stringify(response.data))
          if (passage) {
            this.editorComponentKey+=1;
            let endOfQuestion = this.passageQuestionStart(
              this.worksheetQuestions[this.selectedQuestionIndex]
            );
            console.log("End Of Question : "+ endOfQuestion)
            if (endOfQuestion) {
              this.documenturl = null;
              console.log("End Of Question executed")
              this.resetSelectedAnswers();
              this.getPrevSubAnswer(this.passageQuestionIndex, true, q_id);
            }
          } else {
            this.documenturl = null;
            this.resetSelectedAnswers();
            this.getPrevSubAnswer(this.selectedQuestionIndex, false, 0);
            let nextQueObj = this.worksheetQuestions[
              this.selectedQuestionIndex
            ];
            this.testQuestion.push(nextQueObj);
            if (nextQueObj.questionType == 3) {
              this.getPrevSubAnswer(
                this.passageQuestionIndex,
                true,
                nextQueObj.questionid
              );
              console.log("got question type as 3");
              this.passageQuestionStart(nextQueObj);
            }
          }
          this.removeFromNotVisited(
            this.notVisitedQuestions.indexOf(nextQueObj.questionNumber)
          );
        })
        .catch((error) => {});
      
    },

    submit: function (question) {
      console.log("entered into submit")
      let flag = true;
      this.submitted = true;
      let queObj = {};
      this.selectedQAList = [];
      if (this.selectedQuestionIndex < this.worksheetQuestions.length) {
        console.log("condition executed");
        this.testQuestion = [];
        // to get the current question get the index here
        queObj = this.worksheetQuestions[this.selectedQuestionIndex];
        this.selectedQuestionIndex = this.worksheetQuestions.length;
        this.removeFromNotVisited(
          this.getIndexVal(this.notVisitedQuestions, queObj.questionNumber)
        );
      }
      let subQueAnsObj = {
        ws_testid: this.selectedWorksheet.id,
        studentid: this.myChild.studentid,
        questionid: queObj.questionid,
        questiontypeid: queObj.questiontype_id,
        questionNumber: queObj.questionNumber,
      };
      if (queObj.questiontype_id == 1) {
        let length = this.selectedAnswers.length;
          flag = true;
          this.showMessage = false;
          subQueAnsObj.selectedoption = [];
          for (let i = 0; i < length; i++) {
            let ansObj = {
              option: this.selectedAnswers[i],
            };
            if(ansObj.option !== null && ansObj.option !== undefined){
            subQueAnsObj.selectedoption.push(ansObj);
          }
          }
      } else if (queObj.questiontype_id == 2) {
        subQueAnsObj.descriptiveanswer = this.enteredDescAns;
        subQueAnsObj.documenturl = this.documenturl;
        flag = true;
        this.showMessage = false;
      }
      this.selectedQAList.push(subQueAnsObj);

      if (flag == true) {
        this.byeMsg = true;
      }
      // if(this.selectedQAList.length == -1){
      //   this.selectedQAList.push(subQueAnsObj);
      // }else{
      //   //_.remove(this.selectedQAList, function(qa){ return qa.questionid == subQueAnsObj.questionid})
      //   this.selectedQAList.push(subQueAnsObj);
      // }
      // console.log("Answers Length"+this.selectedQAList.length)
      //   let newArr = [];
      //   let uniqueObject = {};
      //   for(let i in this.selectedQAList){
      //    let objQuestionId = this.selectedQAList[i]['questionid'];
      //     uniqueObject[objQuestionId] = this.selectedQAList[i];
      //   }
      //   for (let i in uniqueObject) {
      //     newArr.push(uniqueObject[i]);
      //   }
      //   console.log(newArr);
      UserService.saveTestQueSubmittedAns(this.tenantId, this.selectedQAList)
        .then((response) => {
          console.log("submitted last answer")
          this.getSavedQuestionsAns();
          // console.log(JSON.stringify(response.data))
          if (this.selectedQuestionIndex < this.worksheetQuestions.length) {
            let nextQueObj = this.worksheetQuestions[
              this.selectedQuestionIndex
            ];
            this.testQuestion.push(nextQueObj);
            this.removeFromNotVisited(
              this.notVisitedQuestions.indexOf(nextQueObj.questionNumber)
            );
          }
          this.resetSelectedAnswers();
          this.getPrevSubAnswer(this.selectedQuestionIndex, false, 0);
          if (flag == true) {
            this.byeMsg = true;
          }
        })
        .catch((error) => {});

      setTimeout(() => {
        let submitData = {
          id: this.selectedWorksheet.id,
          studentid: this.myChild.studentid,
          submitteddate: new Date(),
          statusid: 1,
          numberofattempt: 1,
        };

        UserService.submitStudentWorksheet(
          this.tenantId,
          submitData
        ).catch((error) => {});
        console.log("updated status")
      }, 2000);

      if (this.selectedWorksheet.timebased == 1) {
        clearInterval(this.timeCount); // clear the time when submit is done
      }
      this.file = null;
      this.document = null;
    },
    showBtnStatusColor: function (questionNum) {
      if (this.notVisitedQuestions.indexOf(questionNum) != -1) {
        return "btn btn-nfo";
      } else if (this.notAnsweredQuestions.indexOf(questionNum) != -1) {
        return "btn btn-danger";
      } else if (this.answeredQuestions.indexOf(questionNum) != -1) {
        return "btn btn-success";
      }
      return "btn btn-nfo";
    },
    getWorksheetDocument: function () {
      UserService.getWorksheetDocument(
        this.selectedWorksheet.w_id,
        this.tenantId
      ).then((response) => {
        this.docUrl = response.data.resultsMap.document[0].documenturl;
      });
    },
    getListOfQuestions: function () {
      UserService.getListOfQuestions(this.selectedWorksheet.w_id, this.tenantId)
        .then((response) => {
          // console.log(response.data.resultsMap.questions)

          let passageQues = {};
          this.worksheetQuestions = [];
          let length = response.data.resultsMap.questions.length;
          let questionsData = response.data.resultsMap.questions;
          if (length > 0) {
            for (let i = 0; i < length; i++) {
              if (questionsData[i].parent_question_id == null) {
                this.worksheetQuestions.push(
                  this.prepareQuestionObj(questionsData[i])
                );
                //this.notVisitedQuestions.push(questionsData[i].questionNumber);
              }
              if (questionsData[i].questiontype_id == 3) {
                passageQues.questionid = questionsData[i].questionid;
                passageQues.questions = [];
                questionsData.forEach((question) => {
                  if (
                    questionsData[i].questionid === question.parent_question_id
                  ) {
                    passageQues.questions.push(
                      this.prepareQuestionObj(question)
                    );
                  }
                });

                this.passageQuestions.push(passageQues);
              }
            }
          }
          this.notAnsweredQuestions = [...this.notVisitedQuestions];
          this.getSavedQuestionsAns();
        })
        .catch((error) => {
          console.log(error);
          console.log("Error response " + JSON.stringify(error.response));
        });
    },

    getSavedQuestionsAns: function () {
      let obj = {
        studentId: this.myChild.studentid,
        wsTestId: this.selectedWorksheet.id,
      };

      UserService.getSubmittedQuestions(this.tenantId, obj)
        .then((response) => {
          this.submittedQuestions = response.data.resultsMap.questions;

          let length = this.submittedQuestions.length;

          for (let i = 0; i < length; i++) {
            let questionNum = this.submittedQuestions[i].questionid;
            if (length > 0 && this.onLoad) {
              this.setAnsAndNotAnsweredQues(questionNum);
              this.removeFromNotVisited(
                this.notVisitedQuestions.indexOf(questionNum)
              );
            } else if (length > 0 && !this.onLoad) {
              this.setAnsAndNotAnsweredQues(questionNum);
            }
          }

          this.onLoad = false;
        })
        .catch((error) => {});
    },

    setAnsAndNotAnsweredQues: function (questionNum) {
      if (this.answeredQuestions.indexOf(questionNum) == -1) {
        /// To add it to anwered question
        this.answeredQuestions.push(questionNum);
      }
      this.removeFromNotAnswered(
        this.notAnsweredQuestions.indexOf(questionNum)
      ); //To remove from not answered questions
    },

    getOptionVal: function (options, val) {
      let length = options.length;
      for (let i = 0; i < length; i++) {
        if (val == options[i].mcq_id) {
          return options[i].mcq_order;
        }
      }
    },
    //while getting and showing in UI preparing question obj
    prepareQuestionObj: function (questionsData) {
      let obj = JSON.parse(JSON.stringify(questionsData));
      obj.context = questionsData.context;
      obj.question = questionsData.questionDescription;
      obj.questionDetails = this.getCkFinalData(
        questionsData.questionDescription
      );
      obj.questionType = questionsData.questiontype_id;
      obj.questionNumber = questionsData.questionNumber;
      let correctOptionsLength = questionsData.questionAnswer.length;
      obj.correctAnswer = "";
      obj.documenturl = questionsData.documenturl;
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
      //obj.correctAnswer = questionsData.correctAnswer;
      obj.optionsData = [];
      if (questionsData.questiontype_id == 1) {
        let length = questionsData.multipleChoiceDTO.length;
        let option;
        for (let j = 0; j < length; j++) {
          option = {};
          option.mcq_id = questionsData.multipleChoiceDTO[j].mcq_id;
          option.selectAnsType =
            questionsData.multipleChoiceDTO[j].answertypeid;
          option.optionVal = questionsData.multipleChoiceDTO[j].mcq_order;
          option.textVal = questionsData.multipleChoiceDTO[j].mcq_description;
          option.imageVal = questionsData.multipleChoiceDTO[j].urls;
          if (option.selectAnsType == 2) {
            option.formulaHtml = this.getCkFinalData(
              questionsData.multipleChoiceDTO[j].mcq_description
            );
          }
          option.formulaVal =
            questionsData.multipleChoiceDTO[j].mcq_description;
          obj.optionsData.push(option);
        }
      }
      return obj;
    },
    getCkFinalData: function (data) {
      let finalStrings = [];
      let questionDesc = "";
      let data1 = data.split("<p>");
      for (let i = 1; i < data1.length; i++) {
        let ckData = data1[i];
        if (ckData.indexOf("<img") == -1) {
          let endInd = data1[i].indexOf("</p>");
          questionDesc = questionDesc + " " + data1[i].slice(0, endInd) + "\n";
        } else {
          while (ckData.indexOf("<img") != -1) {
            let imgInd = ckData.indexOf("<img");
            if (imgInd == -1) {
              questionDesc = questionDesc + ckData.slice(0, imgInd);
              ckData = ckData.slice(imgInd, ckData.length - 1);
            } else {
              if (imgInd != 0) {
                questionDesc = questionDesc + "" + ckData.slice(0, imgInd);
                ckData = ckData.slice(imgInd, ckData.length - 1);
              }
              if (questionDesc) {
                questionDesc = questionDesc + "" + this.getTheTexCode(ckData);
              } else {
                questionDesc = this.getTheTexCode(ckData);
              }
              let endInd = ckData.search("/>");
              let tempArr = ckData.split("/>");
              ckData = "";
              for (let i = 1; i < tempArr.length; i++) {
                ckData = ckData + "" + tempArr[i];
              }
              ckData = ckData.trim();
              if (ckData.indexOf("<img") == -1) {
                questionDesc = questionDesc + "" + ckData;
              }
            }
          }
        }
        let temp = questionDesc;
        if (questionDesc.indexOf("&nbsp;") != -1) {
          questionDesc = "";
        }
        while (temp.indexOf("&nbsp;") != -1) {
          let ind = temp.indexOf("&nbsp;");
          temp = temp.slice(0, ind) + " " + temp.slice(ind + 6, temp.length);
        }
        if (temp.indexOf("</p>") != -1) {
          temp = temp.slice(0, temp.indexOf("</p>"));
        }
        questionDesc = temp;
      }

      return questionDesc;
    },
    getTheTexCode: function (ckData) {
      let arr = ckData.split("alt=");

      if (arr.length > 0) {
        let temp =
          " (" + [arr[arr.length - 1].split('" ')[0].replace(/"/g, "")] + ")";
        if (arr[1].indexOf("f(x)") != -1) {
          return (
            " (" + [arr[arr.length - 1].split('" ')[0].replace(/"/g, "")] + ")"
          );
        } else {
          return (
            " (" + [arr[arr.length - 1].split('" ')[0].replace(/"/g, "")] + ")"
          );
        }
      }
    },
    getOptionValViceVersa: function (option) {
      switch (option) {
        case "A":
          return 1;
        case "B":
          return 2;
        case "C":
          return 3;
        case "D":
          return 4;
        case 1:
          return "A";
        case 2:
          return "B";
        case 3:
          return "C";
        case 4:
          return "D";
        default:
          return 0;
      }
    },
    attempted: function () {
      if (this.selectedWorksheet.statusid == 1) {
        this.isAttempted = true;
        this.show = false;
      } else if (this.selectedWorksheet.statusid == 2) {
        this.isAttempted = false;
        this.show = true;
      } else if (this.selectedWorksheet.statusid == 3 || this.selectedWorksheet.statusid == 5) {
        this.isAttempted = true;
        this.isEvaluated = true;
        this.show = false;
      }
      // let obj = {
      //   studentId: this.myChild.studentid,
      //   wsTestId: this.selectedWorksheet.id,
      // };
      // UserService.isAttempted(this.tenantId , obj.wsTestId , obj.studentId)
      // .then((response) => {
      //   console.log(JSON.stringify(response.data.results));
      //   this.submittedResults = response.data.results;
      //   console.log(this.submittedResults.length);
      //   if(this.submittedResults.length > 0 && this.submittedResults[0].securedmarks == null){
      //     this.isAttempted = true;
      //     this.isEvaluated = false;
      //   }
      //   if(this.submittedResults.length > 0 && this.submittedResults[0].securedmarks != null){
      //     this.isAttempted = true;
      //     this.isEvaluated = true;
      //   }
      //   console.log("attempt is executed")
      // }).catch((err) => { console.log(err)})
    },
    DialoguePopUp: function (id, action) {
      console.log("#" + id);
      $("#" + id).modal(action);
    },
    viewEvaluation: function () {
      this.$router.push({
        path: "/my-children/view-evaluation",
      });
    },
  },

  computed: {
    pageCount() {
      let l = this.worksheetQuestions.length,
        s = this.size;
      return Math.ceil(l / s);
    },

    filterWorksheets: function () {
      var self = this;
      return this.worksheetQuestions.filter(function (worksheet) {
        return true;
      });
    },

    paginatedDataWorksheetQues() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.filterWorksheets.slice(start, end);
    },
  },
};
</script>
<style scoped>
.divTable {
  display: table;
  width: 100%;
  text-align: center;
}
.divTableRow {
  display: table-row;
  background-color: dimgray;
  color: white;
  height: 30px;
}
.divTableRowdata {
  display: table-row;
  background-color: #fff;
  color: #000;
  height: 30px;
}
.divTableHeading {
  background-color: #ffffff;
  display: table-header-group;
}
.divTableCell,
.divTableHead {
  border: 1px solid #eee;
  display: table-cell;
  padding: 3px 10px;
}
.divTableCelldata {
  border: 1px solid #eee;
  display: table-cell;
  padding: 3px 10px;
}
.divTableHeading {
  background-color: #ffffff;
  display: table-header-group;
  font-weight: bold;
}
.divTableFoot {
  background-color: #ffffff;
  display: table-footer-group;
  font-weight: bold;
}
.divTableBody {
  display: table-row-group;
}

button {
  background-color: #039be5;
}
.btn {
  border-radius: 0px;
  color: #fff;
}
.btn:hover,
.btn:focus {
  color: #fff;
  text-decoration: none;
}
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
  float: left;
  margin-top: 20px;
}
.table > thead > tr > th,
.table > tbody > tr > th,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > tbody > tr > td,
.table > tfoot > tr > td {
  border-top: 0px;
}
.home-page {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin: 15px auto;
  background: #fff;
}
.text-right {
  text-align: right;
}
</style>
