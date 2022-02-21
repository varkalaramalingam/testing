<template>
  <div>
    <div v-show="byeMsg">
      <h1><b style="color: green">Evaluation Completed</b></h1>
    </div>
    <div class="col-lg-12">
      <div class="col-lg-6 text-left">
        <h3 v-show="!byeMsg" class="student-head">
          {{ this.selectedWorksheet.worksheet_name }}<br />
          <h4>Max Marks : {{ this.selectedWorksheet.max_marks }}</h4>
        </h3>
      </div>
      <!-- <div class="col-lg-3 text-left">
            <button class='assign-button' 
                 v-on:click="startTest()">Start fresh Test</button>
        </div>
         <div class="col-lg-3 text-left">
            <button class='assign-button' 
                 v-on:click="startTest()">Start where you left</button>
        </div> -->
      <div v-if="emptyCondition == false"></div>
      <div v-if="this.submittedQuestions.length > 0"></div>
      <div v-show="emptyCondition" class="col-lg-3 text-left">
        <button class="assign-button" v-on:click="startTest()" v-show="show">
          Start Evaluation
        </button>
      </div>
    </div>
    <div class="col-lg-12 worksheetstable reset-padding reset-margin">
      <div class="col-lg-9 text-left row">
        <div v-if="!show && selectedWorksheet.worksheet_type == 2">
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
          <br />
          <br />
          <strong style="color: red">Selected Answer: </strong>
          <br />
          <div style="border: 4px outset">
            <p style="margin-left: 30px" v-html="descriptiveDocAns"></p>
          </div>
          <br />
          <div v-if="submittedDocUrls.length > 0">
            <strong>Answer is in document to view</strong><br />
            <div v-for="url in submittedDocUrls">
              <a :href="url" target="_blank">{{ url }}</a
              ><br /><br />
            </div>
            <!-- <pdf v-for="url in submittedDocUrls" :src="url" style="display: inline-block; width:100%"></pdf><br /><br /> -->
          </div>
          <br />
          <label>Enter Total Marks </label>
          <input
            type="number"
            placeholder="Enter Total Marks"
            v-model="totalmarks"
          />
          <br />
          <button
            style="margin-left: 200px"
            class="assign-button"
            @click="evaluatedWorksheetDocument()"
          >
            Submit</button
          ><br /><br />
        </div>
        <div v-else-if="!show && selectedWorksheet.worksheet_type == 1">
          <div v-for="(question, index) in testQuestion">
            <div
              class="table-responsive"
              style="overflow: scroll; word-wrap: break-word; width: 1100px"
            >
              <table class="table table-hover">
                <tbody>
                  <tr>
                    <td style="width: 15px">{{ question.questionNumber }}.</td>
                    <p>
                      <td>
                        <!-- <vue-mathjax
                      style="float: left; margin-left: 10px;white-space:pre"
                      :formula="question.questionDetails"
                    ></vue-mathjax> -->
                        <p v-html="question.questionDescription"></p>
                        <br />
                        <strong
                          ><p style="float: right">
                            Marks : {{ question.max_marks }}
                          </p></strong
                        >
                        <br />
                        <br />
                        <div style="float: right">
                          <input
                            type="radio"
                            value="1"
                            v-model="selectedOption"
                            :checked="selectedOption == 1"
                          />
                          <label for="one">Correct</label>
                          <br />
                          <input
                            type="radio"
                            value="0"
                            v-model="selectedOption"
                            :checked="selectedOption == 0"
                          />
                          <label for="two">Incorrect</label>
                          <br />
                          <input
                            type="radio"
                            value="2"
                            v-model="selectedOption"
                            :checked="selectedOption == 2"
                          />
                          <label for="two">Partially Correct</label>
                          <input
                            type="number"
                            v-if="selectedOption == 2"
                            v-model.number="partialMarks"
                          />
                        </div>
                        <br />
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
                    </p>
                  </tr>
                </tbody>
              </table>
              <!-- <div  style="float: right;">
                  <label>  
                    
                    <input type="checkbox" style=" width: 25px; margin-top: -100px" :disabled ="selectedCheckbox" :value="selectedCheckbox" :change="selectedCheckbox" v-model="correctAnswersList" v-on:click="correctAnswers(question)"/>Correct
                  </label><br>
                  <label>  
                    <input type="checkbox" style=" width: 25px;" :disabled ="selectedCheckbox" :value="selectedCheckbox" :change="selectedCheckbox" v-model="incorrectAnswersList" v-on:click="inCorrectAnswers(question)"/>InCorrect
                  </label><br>
                  <label>  
                    <input type="checkbox"  style=" width: 25px;" :disabled ="selectedCheckbox" :value="checked" v-model="checked" v-on:click="selectedCheckbox  = true"/>Partially Correct
                  </label>
                  <label>
                  <input type="number" v-if="checked"  v-model.number="partialMarks"  @change="partiallyMarks(question)"/>
                  </label>
                  <p v-if="msg" style="color: green"><strong> Marks Added </strong></p>
              </div> -->
              <div v-if="question.questionType == 2">
                <br />
                <br />

                <div>
                  <strong>
                    Selected Answer : <br /><br />
                    <p v-html="enteredDescAns"></p
                  ></strong>
                </div>
                <br /><br />
                <div v-if="documenturl">
                  <strong>Answer is in document to view</strong
                  ><a :href="documenturl" target="_blank">click here</a>
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
                        disabled
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
                              width: 150px;
                              height: 100px;
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
                  <tr>
                    <td>
                      <div
                        style="
                          background-color: #90ee90;
                          width: 200px;
                          height: 30px;
                        "
                      >
                        <strong
                          >Correct Answer :
                          {{ question.correctAnswer }}
                        </strong>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <!-- <div class="col-lg-3 text-left" style="width: 25%;float:right"> -->

              <!-- </div> -->
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
                            <p v-html="passagequestion.questionDescription"></p>
                            <div
                              style="
                                float: right;
                                margin-left: 100px;
                                margin-bottom: 20px;
                              "
                            >
                              <input
                                type="radio"
                                value="1"
                                v-model="passageSelectedOption"
                                :checked="passageSelectedOption == 1"
                              />
                              <label for="one">Correct</label>
                              <br />
                              <input
                                type="radio"
                                value="0"
                                v-model="passageSelectedOption"
                                :checked="passageSelectedOption == 0"
                              />
                              <label for="two">Incorrect</label>
                              <br />
                            </div>
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
                      <!-- <ckeditor-math-equation
                        v-model="descAns"
                        placeholder="Enter question"
                      ></ckeditor-math-equation> -->
                      <div style="padding-left: 20px; border: 4px outset">
                        <label>Answer : </label>
                        <p v-html="descAns"></p>
                      </div>
                      <br />
                      <br />
                      <div v-if="documenturl">
                        <label>Document Link : </label>
                        <a :href="documenturl" target="_blank">Click Here</a>
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
                              disabled
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
                        <tr>
                          <div
                            style="
                              background-color: #90ee90;
                              width: 200px;
                              height: 30px;
                            "
                          >
                            <strong
                              >Correct Answer :
                              {{ passagequestion.correctAnswer }}
                            </strong>
                          </div>
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
                    style="float: left; margin-left: 200px; margin-bottom: 20px"
                    class="btn btn-info"
                    @click="showPreviousQuestion(question, true)"
                  >
                    Previous
                  </button>
                </div>
              </div>
              <br /><br />
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="col-lg-3 text-left" style="width: 25%;float:right"> -->
      <div
        v-if="
          this.testQuestion.length > 0 &&
          this.selectedQuestionIndex == this.worksheetQuestions.length - 1
        "
      >
        <button
          @click="submit()"
          style="
            float: right;
            margin-right: 300px;
            background-color: #4caf50;
            border: none;
          "
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
        style="margin-right: 38px"
      >
        <button
          style="float: right; margin-right: 300px"
          @click="saveAndShowNextQuestion(null, false, 0)"
          class="assign-button"
        >
          Save & Next
        </button>
      </div>
      <div
        v-if="this.testQuestion.length > 0 && this.selectedQuestionIndex != 0"
      >
        <button
          style="float: left; margin-left: 4px"
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
</template>
<script>
import UserService from "../../../../services/userService.js";
import moment, { fn } from "moment";
import { VueMathjax } from "vue-mathjax";
import store from "../../../../store.js";
import CkeditorMathEquation from "../../../admin/worksheets/ckeditormathequations_template";
import _ from "lodash";
import pdf from "vue-pdf";
export default {
  // props:['myChild','school','userdetails'],
  components: {
    pdf,
    CkeditorMathEquation,
  },
  props: ["mysubject"],
  data() {
    return {
      tenantId: this.$cookie.get("id"),
      worksheets: [],
      worksheetQuestions: [],
      pageNumber: 0,
      size: 1,
      countDownTime: new Date(),
      testQuestion: [],
      selectedQuestionIndex: 0,
      selectedAnswers: [],
      notVisitedQuestions: [],
      answeredQuestions: [],
      notAnsweredQuestions: [],
      selectedWorksheet: {},
      enteredDescAns: "",
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
      checked: false,
      correctAnswersList: [],
      incorrectAnswersList: [],
      inCorrectAnswersList: [],
      finalmarks: [],
      correctAnswerCheckBox: false,
      selectedCheckbox: false,
      partialMarks: 0,
      msg: false,
      correct: 1,
      incorrect: 0,
      partiallyCorrect: 2,
      selectedOption: null,
      passageSelectedOption: null,
      documenturl: null,
      correctAnswers: [],
      docUrl: null,
      descriptiveDocAns: null,
      submittedDocUrls: [],
      totalmarks: 0,
      passageQuestions: [],
      disablePassageNext: true,
      passageQAList: [],
      passageEndMsg: false,
      passageQuestion: [],
      passageQuestionIndex: 0,
      endOfQuestion: true,
    };
  },
  created() {
    this.school = this.$store.state.school;
    this.userdetails = this.$store.state.userDetails;
    this.myChild = this.$store.state.myChild;
    const classid = {
      id: this.myChild.classid,
    };
    this.selectedWorksheet = this.$store.state.worksheet;
    if (this.selectedWorksheet.worksheet_type == 1) {
      this.getListOfQuestions();
    } else if (this.selectedWorksheet.worksheet_type == 2) {
      if (this.myChild.securedmarks !== null) {
        this.totalmarks = this.myChild.securedmarks;
      }
      this.getWorksheetDocument();
    }
  },
  mounted() {},
  methods: {
    startTest: function () {
      this.show = false;
      //this.date.setSeconds(this.date.getSeconds()+10)
      if (this.selectedWorksheet.worksheet_type == 1) {
        this.testQuestion = [];
        this.resetSelectedAnswers();
        if (this.worksheetQuestions.length > 0) {
          this.testQuestion.push(this.worksheetQuestions[0]);
          if (this.testQuestion[0].questionType == 3) {
            this.passageQuestionStart(this.testQuestion[0]);
            this.getPrevSubAnswer(0, false, 0);
            this.getPrevSubAnswer(
              this.passageQuestionIndex,
              true,
              this.testQuestion[0].questionid
            );
          } else {
            this.getPrevSubAnswer(0, false, 0);
          }
        } else {
          this.emptyCondition = false;
        }
      } else if (this.selectedWorksheet.worksheet_type == 2) {
        this.getSubmittedDocs();
      }
    },
    passageQuestionStart: function (question) {
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
    showPreviousQuestion: function (question, passage) {
      console.log("Prev Question");
      this.selectedCheckbox = false;
      this.checked = false;
      this.correctAnswersList = [];
      this.incorrectAnswersList = [];
      if (this.selectedQuestionIndex >= 0) {
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
          this.passageQuestion = [];
          if (this.passageQuestionIndex >= 0) {
            this.passageQuestionIndex--;
            this.passageQuestionStart(
              this.worksheetQuestions[this.selectedQuestionIndex]
            );
            this.getPrevSubAnswer(
              this.passageQuestionIndex,
              true,
              question.questionid
            );
          }
        } else {
          this.passageQuestionIndex = 0;
          this.testQuestion = [];
          this.selectedQuestionIndex--;
          this.testQuestion.push(
            this.worksheetQuestions[this.selectedQuestionIndex]
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
        this.passageSelectedOption = null;
        _.forEach(this.passageQuestions, function (pq) {
          if (pq.questionid === questionid) {
            obj = pq.questions[index];
          }
        });
      } else {
        this.partialMarks = 0;
        this.selectedOption = null;
        obj = this.worksheetQuestions[index];
      }
      let length = this.submittedQuestions && this.submittedQuestions.length;
      this.selectedAnswers = [];
      this.enteredDescAns = "";
      this.descAns = "";
      for (let i = 0; i < length; i++) {
        let subObj = this.submittedQuestions[i];
        if (obj && obj.questionid == subObj.questionid) {
          if (!passage) {
            if (subObj.correct == 1) {
              this.selectedOption = 1;
            } else if (subObj.incorrect == 1) {
              this.selectedOption = 0;
            } else if (subObj.partiallycorrect == 1) {
              this.selectedOption = 2;
              this.partialMarks = subObj.marks;
            }
          } else {
            if (subObj.correct == 1) {
              this.passageSelectedOption = 1;
            } else if (subObj.incorrect == 1) {
              this.passageSelectedOption = 0;
            }
          }
          if (obj.questiontype_id == 1) {
            this.selectedAnswers = subObj.selectedanswers;
          } else if (obj.questiontype_id == 2) {
            if (passage) {
              this.descAns = subObj.descriptiveanswer;
            }
            this.enteredDescAns = subObj.descriptiveanswer;
            this.documenturl = subObj.documenturl;
            break;
          }
        }
      }
      if (
        obj.questiontype_id == 1 &&
        obj.correctAnswer &&
        obj.correctAnswer !== null &&
        this.selectedWorksheet.statusid == 1
      ) {
        console.log(" selected Worksheet" + JSON.stringify(this.selectedWorksheet));
        let correctanswers = obj.correctAnswer.split(",");
        if (this.selectedAnswers.length == correctanswers.length) {
          if (_.isEqual(this.selectedAnswers.sort(), correctanswers.sort())) {
            passage
              ? (this.passageSelectedOption = 1)
              : (this.selectedOption = 1);
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
    //     if (obj && obj.questionNumber == subObj.questionid) {
    //       if (obj.questiontype_id == 1) {
    //         for (const iterator of subObj.selectedoption) {
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
    getWorksheetDocument: function () {
      UserService.getWorksheetDocument(
        this.selectedWorksheet.w_id,
        this.tenantId
      ).then((response) => {
        this.docUrl = response.data.resultsMap.document[0].documenturl;
      });
    },
    evaluatedWorksheetDocument: function () {
      if (
        this.totalmarks > this.selectedWorksheet.max_marks ||
        this.totalmarks < 0 ||
        this.totalmarks === null ||
        this.totalmarks === undefined ||
        this.totalmarks === ""
      ) {
        alert("Please Enter Valid Marks");
        return;
      }
      let submitData = {
        id: this.myChild.id,
        securedmarks: this.totalmarks,
        statusid: 3,
      };
      UserService.submitStudentWorksheet(this.tenantId, submitData)
        .then((response) => {
          alert("Evaluation Completed");
          this.$router.push({
            path:
              "/mysubjects/" +
              this.mysubject.gradenumber +
              this.mysubject.sectionname +
              "-" +
              this.mysubject.subjectname +
              "-" +
              this.mysubject.syllabustype +
              "/ws-assigned-status",
          });
        })
        .catch((error) => {});
    },
    getSubmittedDocs: function () {
      let ws_test_id = Number(this.myChild.id);
      let student_id = Number(this.myChild.studentid);
      UserService.getSubmittedDocs(this.tenantId, ws_test_id, student_id).then(
        (response) => {
          this.descriptiveDocAns = response.data.results[0].answer;
          if (response.data.results[0].urls[0] != null) {
            this.submittedDocUrls = response.data.results[0].urls;
          }
        }
      );
    },
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
      this.selectedCheckbox = false;
      this.checked = false;
      this.msg = false;
      this.correctAnswersList = [];
      this.incorrectAnswersList = [];
      this.correctAnswerCheckBox = false;
      let queObj = {};
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
        if (this.selectedOption == null && !passage) {
          alert("You have to select atleast one option");
          return;
        } else if (this.passageSelectedOption == null && passage) {
          alert("You have to select atleast one option");
          return;
        }
        if (passage) {
          queObj = question;
          this.passageQuestionIndex++;
        } else {
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

        let subQueAnsObj = {
          ws_testid: this.myChild.id,
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
            subQueAnsObj.selectedoption.push(ansObj);
          }
        } else if (queObj.questiontype_id == 2) {
          subQueAnsObj.descriptiveanswer = this.enteredDescAns;
          subQueAnsObj.documenturl = this.documenturl;
        }
        if (!passage) {
          if (this.selectedOption == 0) {
            subQueAnsObj.incorrect = 1;
            subQueAnsObj.marks = 0;
          } else if (this.selectedOption == 1) {
            subQueAnsObj.correct = 1;
            subQueAnsObj.marks = queObj.max_marks;
          } else if (this.selectedOption == 2) {
            if (
              this.partialMarks < 0 ||
              this.partialMarks > queObj.max_marks ||
              this.partialMarks == null ||
              this.partialMarks == ""
            ) {
              alert(
                "Partial Marks Should Be In Between 0  &  " + queObj.max_marks
              );
              this.selectedQuestionIndex--;
              let nextQueObj = this.worksheetQuestions[
                this.selectedQuestionIndex
              ];
              this.testQuestion.push(nextQueObj);
              return;
            }
            subQueAnsObj.partiallycorrect = 1;
            subQueAnsObj.marks = this.partialMarks;
          }
        } else {
          if (this.passageSelectedOption == 0) {
            subQueAnsObj.incorrect = 1;
            subQueAnsObj.marks = 0;
          } else if (this.passageSelectedOption == 1) {
            subQueAnsObj.correct = 1;
            subQueAnsObj.marks = queObj.max_marks;
          }
        }
        UserService.updateEvaluation(this.tenantId, subQueAnsObj)
          .then((response) => {
            this.getSavedQuestionsAns();
            if (passage) {
              this.endOfQuestion = this.passageQuestionStart(
                this.worksheetQuestions[this.selectedQuestionIndex]
              );
              if (this.endOfQuestion) {
                this.resetSelectedAnswers();
                this.getPrevSubAnswer(this.passageQuestionIndex, true, q_id);
              }
            } else {
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
                this.passageQuestionStart(nextQueObj);
              }
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
      this.documenturl = null;
      // for removing the repeated selections of answers
      // if(this.selectedQAList.length == -1){
      //   this.selectedQAList.push(subQueAnsObj);
      // }else{
      //   _.remove(this.selectedQAList, function(qa){ return qa.questionid == subQueAnsObj.questionid})
      //   this.selectedQAList.push(subQueAnsObj);
      // }
      // let nextQueObj = this.worksheetQuestions[this.selectedQuestionIndex];
      // this.testQuestion.push(nextQueObj);
      // this.removeFromNotVisited(
      // this.notVisitedQuestions.indexOf(nextQueObj.questionNumber)
      // );
    },

    submit: function (question) {
      if (this.selectedOption == null) {
        alert("You have to select atleast one option");
        return;
      }
      let flag = true;
      let queObj = {};
      if (this.selectedQuestionIndex < this.worksheetQuestions.length) {
        this.testQuestion = [];
        // to get the current question get the index here
        queObj = this.worksheetQuestions[this.selectedQuestionIndex];
        this.selectedQuestionIndex = this.worksheetQuestions.length;
        this.removeFromNotVisited(
          this.getIndexVal(this.notVisitedQuestions, queObj.questionNumber)
        );
      }
      let subQueAnsObj = {
        ws_testid: this.myChild.id,
        studentid: this.myChild.studentid,
        questionid: queObj.questionid,
        questiontypeid: queObj.questiontype_id,
        questionNumber: queObj.questionNumber,
      };
      if (queObj.questiontype_id == 1) {
        let length = this.selectedAnswers.length;
        if (length == 0) {
          this.flag = false;
          this.showMessage = false;
        } else {
          this.flag = true;
          this.showMessage = false;
          subQueAnsObj.selectedoption = [];
          for (let i = 0; i < length; i++) {
            let ansObj = {
              option: this.selectedAnswers[i],
            };
            subQueAnsObj.selectedoption.push(ansObj);
          }
        }
      } else if (queObj.questiontype_id == 2) {
        subQueAnsObj.descriptiveanswer = this.enteredDescAns;
        this.flag = true;
        this.showMessage = false;
      }

      if (this.selectedOption == 0) {
        subQueAnsObj.incorrect = 1;
        subQueAnsObj.marks = 0;
      } else if (this.selectedOption == 1) {
        subQueAnsObj.correct = 1;
        subQueAnsObj.marks = queObj.max_marks;
      } else if (this.selectedOption == 2) {
        if (this.partialMarks < 0 || this.partialMarks > queObj.max_marks) {
          alert("Partial Marks Should Be In Between 0  &  " + queObj.max_marks);
          this.selectedQuestionIndex--;
          let nextQueObj = this.worksheetQuestions[this.selectedQuestionIndex];
          this.testQuestion.push(nextQueObj);
          return;
        }
        subQueAnsObj.partiallycorrect = 1;
        subQueAnsObj.marks = this.partialMarks;
      }

      UserService.updateEvaluation(this.tenantId, subQueAnsObj)
        .then((response) => {
          let obj = {
            studentId: this.myChild.studentid,
            wsTestId: this.myChild.id,
          };

          UserService.getSubmittedQuestions(this.tenantId, obj)
            .then((response) => {
              this.submittedQuestions = response.data.resultsMap.questions;
              let marks = _.reduce(
                _.map(this.submittedQuestions, function (data) {
                  return data.marks;
                }),
                function (data, num) {
                  return data + num;
                }
              );
              let submitData = {
                id: this.myChild.id,
                securedmarks: marks,
                statusid: 3,
              };

              UserService.submitStudentWorksheet(this.tenantId, submitData)
                .then((response) => {
                  alert("Evaluation Completed");
                  this.$router.push({
                    path:
                      "/mysubjects/" +
                      this.mysubject.gradenumber +
                      this.mysubject.sectionname +
                      "-" +
                      this.mysubject.subjectname +
                      "-" +
                      this.mysubject.syllabustype +
                      "/ws-assigned-status",
                  });
                })
                .catch((error) => {});
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
      // this.selectedQAList.push(subQueAnsObj);
      if (this.flag == true) {
        this.byeMsg = true;
      }

      // if(this.selectedQAList.length == -1){
      //   this.selectedQAList.push(subQueAnsObj);
      // }else{
      //   _.remove(this.selectedQAList, function(qa){ return qa.questionid == subQueAnsObj.questionid})
      //   this.selectedQAList.push(subQueAnsObj);
      // }
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

    getListOfQuestions: function () {
      UserService.getListOfQuestions(this.selectedWorksheet.w_id, this.tenantId)
        .then((response) => {
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
        });
    },

    getSavedQuestionsAns: function () {
      let obj = {
        studentId: this.myChild.studentid,
        wsTestId: this.myChild.id,
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
      obj.max_marks = questionsData.max_marks;
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
        if (ckData == null) return;
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
.worksheetstable {
  width: 100%;
}
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
</style>
