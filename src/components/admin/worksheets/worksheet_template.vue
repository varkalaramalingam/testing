<template>
  <div>
    <div class="row">
      <h3 class="col-xs-11">{{ worksheet.worksheetName }}</h3>
      <div class="text-right" style="margin-top:10px"><button type="button" class="btn btn-info" @click="goBack()">Back</button></div>
    </div>
    <hr />
    <div class="row">
      <div class="col-sm-6" style="text-align: right">Grade :</div>
      <div class="col-sm-6">{{ worksheet.grade }}</div>
    </div>
    <div class="row">
      <div class="col-sm-6" style="text-align: right">Subject :</div>
      <div class="col-sm-6">{{ worksheet.subject }}</div>
    </div>
    <br />
    <!-- <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
         {{alertMessage}}
         <br>
         </div> -->
    <div v-if="worksheet.status == 'DRAFT'">
      <button class="btn common-button" @click="editWorksheetStatus(1)">Make Active</button>
    </div>
    <div
      v-if="
        worksheet.status == 'DRAFT' && worksheet.worksheet_type == 2
      "
      class="selectQuestionType"
    >
      <input type="file" value="Upload File" @change="getDocument" /><br />
      <button @click="uploadDocument()">Upload File</button>
    </div>
    <div
      v-else-if="
        worksheet.status == 'DRAFT' && worksheet.worksheet_type == 1
      "
      class="selectQuestionType"
    >
      <button
        class="btn common-button addQuestion"
        style="float: right; margin-right: 4%"
        v-on:click.prevent="addNewQuestion()"
      >
        Add new question
      </button>
      <button
        class="btn common-button addQuestion"
        style="float: right; margin-right: 4%"
        v-on:click.prevent="getLibraryQuestions()"
      >
        Add library questions
      </button>
    </div>
    <!-- Preview worksheet start -->
    <div class="container">
      <br />
      <div class="col-lg-12 text-left">
        <h2 v-if="worksheetQuestions.length > 0" class="student-head">
          Preview
        </h2>
        <!-- <iframe :src="docUrl"></iframe> -->
        <hr />
      </div>
      <!-- <h2 v-if="worksheetQuestions.length > 0">Preview worksheet</h2> -->
      <div v-if="worksheet.worksheet_type == 2">
        <div v-if="docUrl != null && docUrl != undefined">
          <div v-if="docUrl.split('.').pop().toLowerCase() == 'pdf'">
            <pdf :src="docUrl" style="display: inline-block; width: 100%"></pdf
            ><br /><br />
          </div>
          <div
            v-else-if="
              docUrl.split('.').pop().toLowerCase() == 'jpg' ||
              docUrl.split('.').pop().toLowerCase() == 'jpeg' ||
              docUrl.split('.').pop().toLowerCase() == 'png'
            "
          >
            <img :src="docUrl" height="1200px" width="947px" /><br>
          </div>
          DownloadLink 
            <a :href="docUrl" target="_blank">{{docUrl}}</a>
        </div>
      </div>
      <div
        class="container"
        v-for="(question, index) in paginatedDataWorksheetQues"
      >
        <div class="questionDataDiv">
          <table class="table table-hover">
            <tbody>
              <tr>
                <td style="width: 26px">{{ question.questionNumber }}.</td>
                <td>
                  <!-- <vue-mathjax style="float:left;margin-left:10px;white-space:pre;" 
                           :formula="question.questionDetails"></vue-mathjax><br> -->
                  <p v-html="question.questionDescription"></p>
                  <br />
                  <div v-for="url in question.imageurls">
                    <img
                      v-if="url != null"
                      :src="url"
                      style="
                        float: left;
                        width: 300px;
                        height: 250px;
                        margin-left: 20px;
                      "
                    />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <table class="table table-hover" v-if="question.questionType == 1">
            <tbody>
              <tr>
                <td
                  class="align-middle"
                  style="width: 100px !important"
                  v-for="options in question.optionsData"
                >
                  <p style="float: left; width: 14px; margin: 24px 0 10px">
                    {{ options.optionVal }}.
                  </p>
                  <p
                    style="float: left; margin-top: 24px"
                    v-if="options.selectAnsType == 1"
                  >
                    {{ options.textVal }}
                  </p>
                  <!--  <img v-if="options.selectAnsType == 2" :src="options.formulaHtml[0]" style="float:left;width:-1px;height:30px;"> -->
                  <vue-mathjax
                    style="float: left; margin-left: 10px; margin-top: 22px"
                    v-if="options.selectAnsType == 2"
                    :formula="options.formulaHtml"
                  ></vue-mathjax>
                  <div v-if="options.selectAnsType == 3">
                    <div v-for="imageurl in options.imageVal">
                      <img
                        :src="imageurl"
                        style="
                          float: left;
                          width: 200px;
                          height: 150px;
                          margin-left: 10px;
                          margin-bottom: 10px;
                        "
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Correct Answer :</strong> {{ question.correctAnswer }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Removed edit option for active questions -->
        <div v-if="worksheet.status == 'DRAFT'" class="questionRemvDiv">
          <!--<a data-toggle="modal" @click="editQuestion(question,index)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true" style="width:52px;"></i></a>-->
          <a
            @click="
              confirmationPopUpOpen(
                confirmationPopUpKeys.questionDel,
                index,
                question.questionid,
                open
              )
            "
            ><span class="glyphicon glyphicon-remove"></span
          ></a>
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
    </div>
    <!-- Preview worksheet end -->
    <!-- Add question pop up start -->
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
        style="overflow-y: scroll; max-height: 95%; width: 80% !important"
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
                v-for="question in dataOfQuestions"
              >
                <div>
                  <label
                    class="col-sm-1 control-label"
                    style="width: 16.3%; margin-top: 6px; padding-left: 0px"
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
                    style="width: 20.3%; margin-top: 6px"
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
                </div>
                <label
                  class="col-sm-1 control-label"
                  style="width: 16.3%; margin-top: 6px"
                  >Status :</label
                >
                <select
                  class="form-control gradeFilter"
                  style="width: 27% !important"
                >
                  <option :value="(question.status_id = 1)">ACTIVE</option>
                </select>
                <div>
                  <label
                    class="col-sm-1 control-label"
                    style="width: 20.3%; margin-top: 6px"
                    >Max Marks :</label
                  >
                  <input
                    type="number"
                    required
                    v-model.number="question.max_marks"
                  />
                  <p style="color: red">Marks should be in between 1 to 15</p>
                </div>

                <div class="form-group" v-for="(input, k) in tags" :key="k">
                  <label
                    class="col-sm-1 control-label"
                    style="width: 16.3%; margin-top: 6px"
                    >Tags :</label
                  >
                  <div class="col-md-10" style="width: 25%; padding-left: 0px">
                    <autocompleteformulvalues
                      :suggestions="dataforautocomplete1"
                      :selection="input"
                      v-on:update="datafromautocommul($event,k)"
                      :key="componentKey"
                    >
                    </autocompleteformulvalues>
                  </div>
                  <span
                    class="col-sm-1 control-label"
                    style="width: 27% !important; padding-left: 120px"
                  >
                    <i
                      class="fa fa-minus-circle"
                      style="color: red; padding-top: 9px; padding-right: 10px"
                      @click="remove(k)"
                      v-show="k || (!k && tags.length > 1)"
                    ></i>
                    <i
                      class="fa fa-plus-circle"
                      @click="add(k)"
                      style="color: green; padding-top: 9px; padding-left: 10px"
                      v-show="k == tags.length - 1"
                    ></i>
                  </span>
                  <br /><br />
                </div>

                <!-- <div class="form-group" v-for="(input,k) in tags" :key="k">
            <label class="col-sm-1 control-label" style="width:16.3%;margin-top: 6px;">Tags :</label>
            <input type="text" class="form-control gradeFilter" style="width:27% !important" v-model="input.tagname">
              <span>
                  <i class="fa fa-minus-circle" style="color:red" @click="remove(k)" v-show="k || ( !k && tags.length > 1)"></i>
                  <i class="fa fa-plus-circle" @click="add(k)" style="color:green" v-show="k == tags.length-1"></i>
              </span> 
              <br><br>             
            </div> -->

                <!-- {{tags}} -->
                <br /><br /><br />
                <!-- <textarea placeholder="Please enter question here" v-model="question.question" class="form-control txtarea"></textarea> -->
                <!--  <label class="col-sm-1 control-label" style="float:left;width: 20%;margin-top: 76px;padding-left:0px">Question : </label> -->
                <ckeditor-math-equation
                  placeholder="Enter question"
                  v-model="question.question"
                ></ckeditor-math-equation>
                <br />
                <br />
                <div
                  style="float: right; margin-right: -200px; margin-top: -200px;width: 300px;color:transparent"
                >
                  <input type="file" @change="uploadImage" multiple /><br />
                  <a
                    @click="removeFromSelectedFile(selectedfile, index)"
                    v-for="(selectedfile, index) in questionimages"
                    ><span class="glyphicon glyphicon-remove">{{
                      selectedfile.name
                    }}</span
                    ><br
                  /></a>
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
                        <!-- <div class="uploader showImagePopUp" @dragenter="onDragEnter" @dragleave="onDragLeave" @dragover.prevent @drop="onDrop" :class="{ dragging:isDragging }">
                                    <i class="fa fa-cloud-upload"></i>
                                    <div class="file-input">
                                       <label for='file'>Select file</label>
                                       <input style="width:192px;" type="file" id="" @change='onFileUpload($event,optionIndex)' single>
                                    </div>
                                 </div>
                                 <div class="showImagePopUp">
                                    <img :src="option.imageVal" style="width:185px;height:101px;">
                                 </div> -->
                        <div>
                          <input
                            type="file"
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
                        </div>
                      </div>
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
    <!-- Add question pop up end -->
    <!--Library questions pop up start -->
    <div
      class="modal fade"
      data-keyboard="false"
      data-backdrop="static"
      tabindex="-1"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
      id="libraryQuestionsPopUp"
      role="dialog"
    >
      <div
        style="overflow-y: scroll; width: 85%"
        class="modal-dialog modal-dialog-scrollable modal-xl"
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
          <div class="modal-body" style="height:500px !important">
            <div
              id="custom-search-input"
              class="col-md-10 reset-padding reset-margin"
              style="width: 25%;"
            >
              <div class="input-group searchbar">
                <input
                  v-model="searchQuestionDesc"
                  type="text"
                  class="search-query form-control"
                  placeholder="Search question"
                />
              </div>
            </div>
            <div
              class="col-md-10 reset-padding reset-margin"
              style="width: 25%;"
            >
              <autocomplete
                :suggestions="dataforautocomplete1"
                :selection="searchtagname"
                :emitvalue="emitvalue"
                :emitvaluedynamic="emitvaluedynamic"
                :typevalue="typevalue"
                :placeholder="placeholderforauto"
                v-on:datafromautotocom="datafromautotocom($event)"
                v-on:datafromautotocomdynamic="datafromautotocomdynamic($event)"
                :key="componentKey1"
              >
              </autocomplete>
            </div>
            <div>
        <label
          class="col-sm-1 control-label"
          style="width: 12.3%; margin-top: 6px"
          >QuestionType:</label
        >
        <select
          class="form-control gradeFilter"
          v-model="searchQuestionTypeId"
          style="width: 8.3%"
        >
          <option value="0">All</option>
          <option
            v-for="questionType in typeOfQuestions"
            v-bind:value="questionType.qtype_id"
            :key="questionType.qtype_id"
          >
            {{ questionType.qtype }}
          </option>
        </select>
      </div>
            <div>
              <label
                class="col-sm-1 control-label"
                style="width: 9.3%; margin-top: 6px; padding-left:30px"
                >Grade :</label
              >
              <select
                class="form-control gradeFilter"
                v-model="searchGradeId"
                style="width: 8.3%"
              >
                <option value="0">All</option>
                <option v-for="grade in listOfGrades" v-bind:value="grade.id">
                  {{ grade.gradename }}
                </option>
              </select>
            </div>
            <hr />
            <div>
              <label
                class="col-sm-1 control-label"
                style="width: 8.3%; margin-top: 6px"
                >Subject :</label
              >
              <select
                class="form-control gradeFilter"
                v-model="searchSubjectId"
                style="width: 8.3%"
              >
                <option value="0">All</option>
                <option
                  v-for="subject in listOfSubjects"
                  v-bind:value="subject.id"
                >
                  {{ subject.subjectname }}
                </option>
              </select>
            </div>
            <div>
              <label
                class="col-sm-1 control-label"
                style="width: 9.3%; margin-top: 6px"
                >Difficulty :</label
              >
              <select
                class="form-control gradeFilter"
                v-model="searchDifficultyId"
                style="width: 8.3%"
              >
                <option value="0">All</option>
                <option
                  v-for="difficulty in degreeOfDifficultyList"
                  v-bind:value="difficulty.id"
                >
                  {{ difficulty.degreeofdifficulty }}
                </option>
              </select>
            </div>
            <div>
              <div v-for="(question, index) in paginatedDataQuesLibrary">
                <div v-if="question.status_id == 1  && (question.parent_question_id === null || question.parent_question_id === undefined ) " class="questionDataDiv">
                  <br />
                  <table class="table table-borderless table-hover">
                    <tbody>
                      <tr
                        :v-if="!listOfQueIdsOfWs.includes(question.questionid)"
                      >
                        <td style="width: 10px">
                          <input
                            type="checkbox"
                            :v-if="
                              !listOfQueIdsOfWs.includes(question.questionid)
                            "
                            :value="question"
                            v-model="selectedQuestionsIdsList"
                            :change="selectedQuesList()"
                          />
                        </td>
                        <td style="width: 26px">{{ question.questionid }}.</td>
                        <td>
                          <!-- <vue-mathjax style="float:left;margin-left:10px;" 
                          :formula="question.questionDetails"></vue-mathjax><br> -->
                          <p v-html="question.questionDescription"></p>
                          <br />
                          <div v-for="url in question.imageurls">
                            <img
                              v-if="url != null"
                              :src="url"
                              style="
                                float: left;
                                width: 300px;
                                height: 250px;
                                margin-left: 20px;
                              "
                            />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <input
                    style="float: right; width: 50px; margin-top: -40px"
                    type="number"
                    min="1"
                    max="15"
                    v-model.number="question.max_marks"
                  />
                  <p
                    style="float: right; margin-top: -40px; margin-right: 80px"
                  >
                    Max Marks :
                  </p>

                  <table
                    class="table table-borderless table-hover"
                    v-if="question.questiontype_id == 1"
                  >
                    <tbody>
                      <tr>
                        <td
                          class="align-middle"
                          style="width: 100px !important"
                          v-for="options in question.optionsData"
                        >
                          <p
                            style="
                              float: left;
                              width: 14px;
                              margin: 24px 0 10px;
                            "
                          >
                            {{ options.optionVal }}.
                          </p>
                          <p
                            style="
                              float: left;
                              width: 84%;
                              margin-top: 24px;
                              margin-left: 1px;
                            "
                            v-if="options.selectAnsType == 1"
                          >
                            {{ options.textVal }}
                          </p>
                          <vue-mathjax
                            style="
                              float: left;
                              margin-left: 10px;
                              margin-top: 22px;
                            "
                            v-if="options.selectAnsType == 2"
                            :formula="options.formulaHtml"
                          ></vue-mathjax>
                          <!-- <img v-if="options.selectAnsType == 3" :src="options.imageVal" style="float:left;width:150px;height:100px;"> -->
                          <div v-if="options.selectAnsType == 3">
                            <div v-for="imageurl in options.imageVal">
                              <img
                                :src="imageurl"
                                style="
                                  float: left;
                                  width: 150px;
                                  height: 100px;
                                  margin-left: 10px;
                                  margin-bottom: 10px;
                                "
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Correct Answer :</strong>
                          {{ question.correctAnswer }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary"
              v-on:click.prevent="saveLibraryQuesToWS()"
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-danger"
              v-on:click.prevent="
                confirmationPopUpOpen(
                  confirmationPopUpKeys.libraryQuesDiscard,
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
    <!--Library questions pop up end -->
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
            <h4>Confirm Cancel</h4>
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


<style scoped>
.modal{
  width:100% !important;
  height: 100% !important;
}
@import url("../../../assets/css/worksheet_styles.css");
</style>

<script>
import UserService from "../../../services/userService.js";
//import ImageUploader from "./ImageUploader";
import CkeditorMathEquation from "./ckeditormathequations_template";
import EventBus from "../../../event-bus";
import { mapGetters } from "vuex";
import { VueMathjax } from "vue-mathjax";
import _ from "lodash";
import autocomplete from "../classrooms/subjects/autocomplete_template";
import autocompleteformulvalues from "../classrooms/subjects/autocompleteforforms_template";
import pdf from "vue-pdf";
export default {
  components: {
    //ImageUploader,
    pdf,
    CkeditorMathEquation,
    "vue-mathjax": VueMathjax,
    autocomplete: autocomplete,
    autocompleteformulvalues: autocompleteformulvalues,
  },
  data() {
    return {
      dataforautocomplete: [],
      dataforautocomplete1: [],
      componentKey: 0,
      componentKey1:1000,
      searchtagname: "",
      listoftags: {},
      typevalue: -1,
      emitvalue: "datafromautotocom",
      emitvaluedynamic: "datafromautotocomdynamic",
      placeholderforauto: "Search questions using Tagname",
      tags: [
        {
          id:0,
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
      max_marks: 1,

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
      },
      confirmationPopUpKeys: {
        questionDel: "questionDel",
        questionEditCancel: "questionEditCancel",
        worksheetReset: "worksheetReset",
        libraryQuesDiscard: "libraryQuesDiscard",
      },
      confirmationPopUpId: "confirmationPopUp",
      confirmKey: "",
      fail: "fail",
      success: "success",

      typeOfQuestions: [
        {
          text: "Multiple",
          value: 1,
        },
        {
          text: "Descriptive",
          value: 2,
        },
      ],
      confirmMsg: "",
      QuestionTypeValue: "",
      answerTypeList: [
        {
          text: "Text",
          value: 1,
        },
        {
          text: "Formula",
          value: 3,
        },
        {
          text: "Image",
          value: 2,
        },
      ],
      selectedQuestionTypeVal: "",
      alertMessage: "",
      alertClass: "",
      worksheetQuestions: [],
      newFilesList: [],
      isDragging: false,
      dragCount: 0,
      files: [],
      images: [],
      image: "",
      addOptnClss: false,
      divHeightClassName: "",
      deleteIndex: "",
      deleteQId: "",
      toBeEdited: false,
      editIndex: "",
      tenantId: this.$cookie.get("id"),
      libraryQuestions: [],
      selectedQuestionsIdsList: [],
      selectedMarksList: [],
      searchQuestionDesc: "",
      searchGradeId: 0,
      searchQuestionTypeId:0,
      searchSubjectId: 0,
      searchDifficultyId: 0,
      academicYearObj: this.$store.state.acdemicyearandboard,
      academicDetails: {},
      listOfSubjects: [],
      listOfGrades: [],
      degreeOfDifficultyList: [
        {
          text: "Easy",
          value: 1,
        },
        {
          text: "Medium",
          value: 2,
        },
        {
          text: "Hard",
          value: 3,
        },
      ],
      id: 0,
      pageNumber: 0,
      size: 7,
      listOfQueIdsOfWs: [],
      selectedCorrectAns: [],
      selectedCorrectAnsData: [],
      questionimages: [],
      optionimages: [],
      docUrl: "",
      document: null,
    };
  },
  created() {
    this.worksheet = this.$store.state.worksheet;
    if (this.worksheet.worksheet_type == 1) {
      this.getListOfQuestions();
    } else if (this.worksheet.worksheet_type == 2) {
      this.getWorksheetDocument();
    }
    this.academicDetails = {
      academicyearid: this.academicYearObj.academicyearid,
      syllabustype: this.academicYearObj.syllabustype,
    };
    this.getOnloadEntitiesData();
    UserService.getMCQAnsTypes(this.tenantId).then((response) => {
      this.answerTypeList = response.data.resultsMap.ansTypes;
    });
    UserService.getDegreeOfDifficulties(this.tenantId).then((response) => {
      this.degreeOfDifficultyList =
        response.data.resultsMap.degreeOfDifficulties;
    });
    UserService.getQuestionTypes(this.tenantId).then((response) => {
      this.typeOfQuestions = response.data.resultsMap.questionTypes;
    });
    UserService.getTagsListWithId(this.tenantId).then((response) => {
      console.log(response.data);
      this.listoftags = response.data;
      let length = this.listoftags.length;
      for (let i = 0; i < length; i++) {
        this.dataforautocomplete.push(this.listoftags[i].tagname);
      }
      this.dataforautocomplete1 = response.data;
      console.log(this.dataforautocomplete);
      console.log(this.dataforautocomplete1);
    });
  },

  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    selectedMarks() {},
    forceRerender() {
      this.componentKey += 1;
    },
    forceRerender1() {
      this.componentKey1 += 1;
    },
    add(index) {
      this.tags.push({ id:0,tagname: "" });
    },
    remove(index) {
      this.tags.splice(index, 1);
      this.forceRerender();
    },
    editWorksheetStatus: function(status_id){           
            UserService.editWorksheetStatus(this.tenantId,this.worksheet.id,status_id).then((response) => {
              this.worksheet.status = 'ACTIVE'
              alert("Status Updated Succesfully, Go to worksheet Library and Assign");
              console.log(JSON.stringify(response.data));
            })
        },
    datafromautotocom: function (selection) {
      this.searchtagname = selection;
      console.log(selection);
      UserService.getLibraryQuestionsByTagId(selection.id, this.tenantId)
        .then((response) => {
          this.libraryQuestions = [];
          console.log(response.data);
          let length = response.data.resultsMap.questions.length;
          let questionsData = response.data.resultsMap.questions;
          console.log(length);
          if (length > 0) {
            for (let i = 0; i < length; i++) {
              questionsData[i].max_marks = 1;
              this.libraryQuestions.push(
                this.prepareQuestionObj(questionsData[i])
              );
            }
          }
          console.log(this.libraryQuestions);
        })
        .catch((error) => {});
    },
    datafromautotocomdynamic: function (selection) {
      this.searchtagname = selection;
      console.log(selection);
    },
    datafromautocommul: function(event, k) {
      console.log(event);
      this.tags[k].id = event.id;
      this.tags[k].tagname = event.tagname;
      // this.forceRerender();
    },
    getOnloadEntitiesData: function () {
      UserService.Subjects(this.tenantId)
        .then((response) => {
          this.listOfSubjects = response.data;
          this.getListOfWorksheets();
        })
        .catch((error) => {
          console.log(JSON.stringify(error.data));
        });
      UserService.ClassroomGrades(
        this.academicDetails.syllabustype,
        this.tenantId
      ).then((response) => {
        this.listOfGrades = response.data;
      });
    },

    //
    popUp: function (id, action) {
      $("#" + id).modal(action);
    },
    uploadImage(event) {
      for (const file of event.target.files) {
        let filename = file.name;
        let filetype = filename.substring(filename.lastIndexOf(".") + 1);
        if (
          filetype.toLowerCase() == "png" ||
          filetype.toLowerCase() == "jpg" ||
          filetype.toLowerCase() == "jpeg"
        ) {
          this.questionimages.push(file);
        } else {
          alert("Selected File Type Is Not An Image");
          return;
        }
      }
    },
    getDocument(event) {
      this.document = event.target.files[0];
      console.log(event.target.files[0]);
    },
    uploadDocument() {
      console.log(this.document);
      if (this.document == null) {
        alert("Please Select File");
        return;
      } else {
        let formData = new FormData();
        formData.append("worksheet_name", this.worksheet.worksheetName);
        formData.append("document", this.document);

        UserService.addWorksheetDocument(
          this.worksheet.id,
          this.tenantId,
          formData
        ).then((response) => {
          this.getWorksheetDocument();
        });
      }
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
    removeFromSelectedFile(file, index) {
      this.questionimages.splice(index, 1);
    },
    confirmationPopUpOpen: function (key, index, popUpId, action) {
      this.confirmKey = key;

      if (key == this.confirmationPopUpKeys.questionDel) {
        this.deleteIndex = index;
        this.deleteQId = popUpId;
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
      }

      this.popUp(this.confirmationPopUpId, action);
    },

    confirmationPopUpClose: function (popUpId, action) {
      if (this.confirmKey == this.confirmationPopUpKeys.questionDel) {
        UserService.deleteQuestionFromWSByQId(
          this.tenantId,
          this.deleteQId,
          this.worksheet.id
        )
          .then((response) => {
            this.deleteQuestion(this.deleteIndex);
            this.showAlerts(this.success, this.alertMsgs.questionDataAlert);
          })
          .catch((error) => {
            console.log("Error response " + JSON.stringify(error.response));
            this.showAlerts(this.fail, this.alertMsgs.questionDataAlert);
          });
      } else if (this.confirmKey == this.confirmationPopUpKeys.worksheetReset) {
        this.resetWorksheet();
      } else if (
        this.confirmKey == this.confirmationPopUpKeys.libraryQuesDiscard
      ) {
        this.resetLibraryQuestions();
      }

      this.popUp(this.confirmationPopUpId, action);

      if (this.confirmKey == this.confirmationPopUpKeys.questionEditCancel) {
        this.popUp("myModal", action);
      }

      this.confirmKey = "";
    },

    //question
    editQuestion: function (question, index) {
      this.dataOfQuestions = [];
      let obj = JSON.parse(JSON.stringify(question));
      obj.difficultyId = obj.degreeofdifficultyid;
      this.dataOfQuestions.push(obj);
      this.editIndex = index;
      this.toBeEdited = true;
      this.selectedCorrectAns = [];
      this.selectedCorrectAns.push(obj.correctAnswer);
      this.popUp("myModal", this.open);
    },

    //
    selectedQuesList: function () {
      console.log(JSON.stringify(this.selectedQuestionsIdsList));
    },

    //
    deleteQuestion: function () {
      this.worksheetQuestions.splice(this.deleteIndex, 1);
      this.deleteIndex = "";
      this.popUp("questionDelConfrmPopUp", this.close);
    },

    resetLibraryQuestions: function () {
      this.popUp("libraryQuestionsPopUp", this.close);
    },

    resetWorksheet: function () {
      this.selectedQuestionTypeVal = "";
      this.dataOfQuestions = [];
      this.worksheetQuestions = [];
      this.popUp("workSheetConfrmPopUp", this.close);
    },

    setOptionClass: function (className, optionIndex) {
      this.dataOfQuestions[0].optionsData[optionIndex].addOptnClss = className;
    },
    //
    addOptionClass: function (val, optionIndex) {
      if (val == 1) {
        this.setOptionClass("optionDivText", optionIndex);
      } else if (val == 2) {
        this.setOptionClass("optionDivCkeditor", optionIndex);
      } else if (val == 3) {
        this.setOptionClass("optionDivFileUpload", optionIndex);
      }
    },

    //Returns the height based on type of element selected the in the pop up component
    getHeightOfOption: function (optionVal) {
      let height;
      switch (optionVal) {
        case 1:
          height = 56;
          break;
        case 2:
          height = 186;
          break;
        case 3:
          height = 115;
          break;
        default:
          height = 56;
          break;
          return height;
      }
    },

    //
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

    createQuestionObj: function () {
      let options = ["A", "B", "C", "D"];
      let obj = {};
      obj = {
        question: "",
        divHeightClassName: "",
        questionType: 1,
        difficultyId: 0,
        max_marks: 1,
      };

      //if (this.selectedQuestionTypeVal == 1) {
      obj.optionsData = [];
      let length = options.length;
      for (let i = 0; i < length; i++) {
        let option = this.createOptionObj();
        if (options[i] == "A") {
          option["previewOptionClass"] = "optionA";
        } else {
          option["previewOptionClass"] = "optionB";
        }
        option["optionVal"] = options[i];
        obj.optionsData.push(option);
      }
      //}
      return obj;
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

    getLibraryQuestions: function () {
      this.searchQuestionTypeId = 0;
      this.searchGradeId = 0;
      this.searchSubjectId = 0;
      this.searchDifficultyId = 0;
      this.searchQuestionDesc = "";
      this.popUp("libraryQuestionsPopUp", this.open);
      UserService.getLibraryQuestions(this.tenantId)
        .then((response) => {
          this.libraryQuestions = [];

          let length = response.data.resultsMap.questions.length;
          let questionsData = response.data.resultsMap.questions;

          if (length > 0) {
            for (let i = 0; i < length; i++) {
              questionsData[i].max_marks = 1;
              this.libraryQuestions.push(
                this.prepareQuestionObj(questionsData[i])
              );
            }
          }
          this.popUp("libraryQuestionsPopUp", this.open);
        })
        .catch((error) => {
          this.popUp("libraryQuestionsPopUp", this.open);
        });
    },

    //
    checkIsEmptyVal: function (val) {
      if (!val) {
        return true;
      }
      return false;
    },

    exctractCKEditorData: function (ckeditorData) {
      let arr = ckeditorData.split("alt=");
      let formulaValue;
      if (arr.length > 0) {
        formulaValue =
          " (" + [arr[arr.length - 1].split('" ')[0].replace(/"/g, "")] + ")";
      }
      return formulaValue;
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
        let temp = " (" + [arr[1].split('" ')[0].replace(/"/g, "")] + ")";
        if (arr[1].indexOf("f(x)") != -1) {
          //let test =
          return " (" + [arr[1].split('" ')[0].replace(/"/g, "")] + ")";
        } else {
          return " (" + [arr[1].split('" ')[0].replace(/"/g, "")] + ")";
        }
      }
    },

    //
    validateQuestion: function () {
      let questionObject = this.dataOfQuestions[0];
      let marks = Number(questionObject.max_marks);
      if (marks == undefined || marks == null) {
        alert("Marks Field Should Not Be Empty");
        return false;
      }
      if (marks <= 0 || marks > 15) {
        alert("Marks Should Be In Between 1 to 15");
        return false;
      }
      if (this.checkIsEmptyVal(questionObject.question)) {
        return false;
      }
      if (
        Number(questionObject.max_marks) < 1 &&
        Number(questionObject.max_marks) > 15
      ) {
        return false;
      }
      if (this.checkIsEmptyVal(questionObject.difficultyId)) {
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
                this.dataOfQuestions[0].optionsData[i][
                  "formulaHtml"
                ] = this.exctractCKEditorData(obj.formulaVal);
              }
            } else if (
              obj.selectAnsType == 3 &&
              this.checkIsEmptyVal(obj.imageVal)
            ) {
              return false;
            }
          } else {
            return false;
          }
        }
      }
      return true;
    },

    //will be called when cliked on add question
    addNewQuestion: function () {
      this.dataOfQuestions = [];
      this.selectedCorrectAns = [];
      this.tags = [{ id:0,tagname: "" }];
      this.forceRerender();
      this.popUp("myModal", this.open);
      this.selectedCorrectAns = [];
      this.dataOfQuestions.push(this.createQuestionObj());
      this.selectedCorrectAnsData = [];
    },
    selectQuestionType: function () {
      let questionType = this.dataOfQuestions[0].questionType;
      this.selectedCorrectAnsData = [];
      this.selectedCorrectAns = [];
      if (this.dataOfQuestions[0].questionType == 2) {
        this.dataOfQuestions[0].optionsData = [];
        this.selectedCorrectAns.push("");
        this.selectedCorrectAnsData.push({
          questionanswer: "",
        });
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

    saveLibraryQuesToWS: function () {
      this.searchtagname = "";
      this.forceRerender1();
      if (
        this.selectedQuestionsIdsList &&
        this.selectedQuestionsIdsList.length > 0
      ) {
        let questionsList = [];
        let marksList = [];
        for (const iterator of this.selectedQuestionsIdsList) {
          questionsList.push(iterator.questionid);
          if (iterator.max_marks <= 0 || iterator.max_marks > 15) {
            alert("Marks Should Be In Between 1 to 15");
            return;
          }
          marksList.push(iterator.max_marks);
        }

        UserService.saveLibraryQuesToWS(
          this.tenantId,
          this.worksheet.id,
          questionsList,
          marksList
        )
          .then((response) => {
            this.getListOfQuestions();
            this.showAlerts(this.success, this.alertMsgs.libraryQuesAlert);
          })
          .catch((error) => {
            console.log("Error response " + JSON.stringify(error.response));
            this.showAlerts(this.fail, this.alertMsgs.libraryQuesAlert);
          });
      } else {
        alert("You must select atleast one question");
      }
    },

    //
    saveQuestion: function () {
      var self = this;
      let obj = {};

      let questionData = new FormData();
      let formdata = new FormData();
      for (const file of this.questionimages) {
        formdata.append("images", file);
      }
      if (this.validateQuestion()) {
        for (let i = 0; i < this.tags.length; i++) {
          let tagname = this.tags[i].tagname;
          if (tagname.trim() == "") {
            this.remove(i);
            i--;
          }
        }
        this.showAlerts(this.success, this.alertMsgs.questionDataAlert);
        let questionObject = {
          questionDescription: this.dataOfQuestions[0].question,
          questiontype_id: this.dataOfQuestions[0].questionType,
          subjectid: this.worksheet.subjectVal,
          gradeid: this.worksheet.gradeVal,
          context: "context data", // need to change
          w_id: this.worksheet.id,
          status_id: this.dataOfQuestions[0].status_id, //  changed
          degreeofdifficultyid: this.dataOfQuestions[0].difficultyId,
          questionid: this.dataOfQuestions[0].questionid,
          tenant:this.$cookie.get('tenant'),
          correctAnswer: "",
          options: [],
          multipleChoiceDTO: [],
          max_marks: Number(this.dataOfQuestions[0].max_marks),
          id: this.dataOfQuestions[0].id,
          questionNumber: this.dataOfQuestions[0].questionNumber,
          tags: this.tags
          // tags: _.map(this.tags, function (tag) {
          //   let tagname = tag.tagname;
          //   if (tagname != "") {
          //     return { tagname };
          //   }
          // }),
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
          this.tags = [{ id:0,tagname: "" }];
        }
        if (!this.dataOfQuestions[0].questionid) {
          questionData.append("questionData", JSON.stringify(questionObject));
          UserService.newQuestion(
            questionData,
            this.tenantId,
            questionObject.w_id
          )
            .then((response) => {
              let questionid = response.data.resultsMap.question.questionid;
              let formdata = new FormData();
              if (!_.isEmpty(this.questionimages)) {
                for (const file of this.questionimages) {
                  formdata.append("images", file);
                }
                formdata.append("questionid", questionid);
                formdata.append('tenant',this.$cookie.get('tenant'));
                UserService.saveQuestionImages(formdata, this.tenantId)
                  .then((response) => {
                    this.getListOfQuestions();
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
                this.getListOfQuestions();
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
          UserService.updateQuestionToWs(questionObject, this.tenantId)
            .then((response) => {
              this.getListOfQuestions();
              this.showAlerts(this.success, this.alertMsgs.questionDataAlert);
            })
            .catch((error) => {
              console.log("Error response " + JSON.stringify(error.response));
              this.showAlerts(this.fail, this.alertMsgs.questionDataAlert);
            });
        }
      } else {
        this.showAlerts(this.fail, this.alertMsgs.questionDataAlert);
      }
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
      obj.parent_question_id = questionsData.parent_question_id;
      if (questionsData.questionAnswer != null) {
        let correctOptionsLength = questionsData.questionAnswer.length;
        obj.correctAnswer = "";
        obj.max_marks = questionsData.max_marks;
        console.log(obj.questionDetails);
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
      //obj.correctAnswer = questionsData.correctAnswer;
      obj.optionsData = [];
      if (
        questionsData.questiontype_id == 1 &&
        questionsData.multipleChoiceDTO != null
      ) {
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

    getListOfQuestions: function () {
      UserService.getListOfQuestions(this.worksheet.id, this.tenantId)
        .then((response) => {
          this.worksheetQuestions = [];
          let length = response.data.resultsMap.questions.length;
          let questionsData = response.data.resultsMap.questions;

          if (length > 0) {
            for (let i = 0; i < length; i++) {
              if(questionsData[i].parent_question_id == null){
                this.worksheetQuestions.push(
                this.prepareQuestionObj(questionsData[i])
                );
                this.listOfQueIdsOfWs.push(questionsData[i].questionid);
              }
            }
          }
        })
        .catch((error) => {
          console.log("Error response " + JSON.stringify(error.response));
        });
    },
    getWorksheetDocument: function () {
      UserService.getWorksheetDocument(this.worksheet.id, this.tenantId).then(
        (response) => {
          this.docUrl = response.data.resultsMap.document[0].documenturl;
        }
      );
    },

    //
    onFileUpload(e, optionIndex) {
      const files = e.target.files;
      this.newFilesList[0] = files[0];
      this.addImage(this.newFilesList[0], optionIndex);
    },

    //
    onDragEnter(e) {
      e.preventDefault();
      this.isDragging = true;
      this.dragCount++;
      return false;
    },

    //
    onDragLeave(e) {
      e.preventDefault();
      this.isDragging = false;
      this.dragCount--;
      if (this.dragCount <= 0) {
        this.isDragging = false;
      }
    },

    //
    onDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      this.isDragging = false;
      const files = e.dataTransfer.files;
    },

    //
    addImage(file, optionIndex) {
      this.files.push(file);
      this.image = new Image();
      let reader = new FileReader();
      reader.onload = (e) => {
        this.dataOfQuestions[0].optionsData[optionIndex].imageVal =
          e.target.result;
      };
      reader.readAsDataURL(file);
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

    goBack: function(){
      this.$router.back();
    }
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

    filterLibraryQuestions: function () {
      var self = this;
      return this.libraryQuestions.filter(function (question) {
        let filterQuestionDesc;
        let filterGrade;
        let filterSubject;
        let filterDifficulty;
        let filterExistingQuestion;
        let filterQuestionType;

        if (!self.searchQuestionDesc) {
          filterQuestionDesc = true;
        } else {
          filterQuestionDesc =
            question.questionDescription
              .toLowerCase()
              .indexOf(self.searchQuestionDesc.toLowerCase()) >= 0;
        }
        if (self.searchGradeId == 0) {
          filterGrade = true;
        } else {
          filterGrade =
            question.gradeid
              .toString()
              .indexOf(self.searchGradeId.toString()) >= 0;
        }
        if(self.searchQuestionTypeId ==0){
          filterQuestionType = true;
        }else{
          console.log(question.questionType + " === " + self.searchQuestionTypeId)
          if(self.searchQuestionTypeId === question.questionType){
            filterQuestionType = true;
          }else{
            filterQuestionType = false;
          }
        }
        if (self.searchSubjectId == 0) {
          filterSubject = true;
        } else {
          filterSubject =
            question.subjectid
              .toString()
              .indexOf(self.searchSubjectId.toString()) >= 0;
        }
        if (self.searchDifficultyId == 0) {
          filterDifficulty = true;
        } else {
          filterDifficulty =
            question.degreeofdifficultyid
              .toString()
              .indexOf(self.searchDifficultyId.toString()) >= 0;
        }
        if (self.listOfQueIdsOfWs.includes(question.questionid)) {
          filterExistingQuestion = false;
        } else {
          filterExistingQuestion = true;
        }

        return (
          filterQuestionDesc &&
          filterGrade &&
          filterSubject &&
          filterDifficulty &&
          filterExistingQuestion &&
          filterQuestionType
        );
      });
    },
    paginatedDataQuesLibrary() {
      // const start = this.pageNumber * this.size,
      //     end = start + this.size;
      if (!this.libraryQuestions || this.libraryQuestions.length == 0) {
        return;
      }
      return this.filterLibraryQuestions;
    },
  },
};
</script>