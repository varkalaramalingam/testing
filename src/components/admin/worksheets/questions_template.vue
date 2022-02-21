<template>
  <div class="container">
    <div class="row reset-padding reset-margin">
      <div class="row">
        <div class="col-lg-6">
          <div class="page-heading">
            <span v-html="$t('questions_library')" />
          </div>
        </div>
        <div class="col-lg-6 text-right">
          <button class="common-button" v-on:click.prevent="addNewQuestion()">
            New Question
          </button>
        </div>
      </div>
      <!-- <p>Parent data is : {{searchtagname}}</p> -->
      <hr />
    </div>
    <div class="row reset-padding reset-margin">
      <div
        id="custom-search-input"
        class="col-md-10 reset-padding reset-margin"
        style="width: 23%"
      >
        <div class="input-group searchbar">
          <input
            v-model="searchQuestionDesc"
            @input="pageNumber = 0"
            type="text"
            class="search-query form-control"
            placeholder="Search question"
          />
          <span class="input-group-btn">
            <button class="btn search-btn" type="button">
              <span class="glyphicon glyphicon-search"></span>
            </button>
          </span>
        </div>
      </div>
      <div>
        <label
          class="col-sm-1 control-label"
          style="width: 8.3%; margin-top: 6px"
          >Status :</label
        >
        <select
          class="form-control gradeFilter"
          v-model="searchStatusId"
          @change="pageNumber = 0"
          style="width: 8.3%"
        >
          <option value="-1">All</option>
          <option v-for="status in listOfStatus" v-bind:value="status.id">
            {{ status.status }}
          </option>
        </select>
      </div>
      <div>
        <label
          class="col-sm-1 control-label"
          style="width: 8.3%; margin-top: 6px"
          >Grade :</label
        >
        <select
          class="form-control gradeFilter"
          v-model="searchGradeId"
          @change="pageNumber = 0"
          style="width: 8.3%"
        >
          <option value="0">All</option>
          <option
            v-for="grade in listOfGrades"
            v-bind:value="grade.id"
            :key="grade.id"
          >
            {{ grade.gradename }}
          </option>
        </select>
      </div>
      <div>
        <label
          class="col-sm-1 control-label"
          style="width: 8.3%; margin-top: 6px"
          >Subject :</label
        >
        <select
          class="form-control gradeFilter"
          v-model="searchSubjectId"
          @change="pageNumber = 0"
          style="width: 8.3%"
        >
          <option value="0">All</option>
          <option
            v-for="subject in listOfSubjects"
            v-bind:value="subject.id"
            :key="subject.id"
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
          @change="pageNumber = 0"
          style="width: 8.3%"
        >
          <option value="0">All</option>
          <option
            v-for="subject in degreeOfDifficultyList"
            v-bind:value="subject.id"
            :key="subject.id"
          >
            {{ subject.degreeofdifficulty }}
          </option>
        </select>
      </div>
    </div>
    <br />
    <div class="row reset-padding reset-margin">
      <div class="col-md-10 reset-padding reset-margin" style="width: 40%">
        <!-- :selection="searchtagname" -->
        <!-- <autocomplete
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
        </autocomplete> -->
        <multiselect v-model="tagsformultiselect" :options="dataforautocomplete1" :multiple="true"
          id="for now no use" :close-on-select="false" :clear-on-select="true" :preserve-search="true" 
          :placeholder="placeholderforauto" label="tagname" track-by="tagname" :preselect-first="true" 
          :taggable="true" @select="addTag" @remove="deleteTag" >
        </multiselect>
      </div>
      <!-- {{tagsformultiselect}} -->
      <!-- {{tagids}} -->
      <div>
        <label
          class="col-sm-1 control-label"
          style="width: 11.0%; margin-top: 6px"
          >QuestionType:</label
        >
        <select
          class="form-control gradeFilter"
          v-model="searchQuestionTypeId"
          @change="pageNumber = 0"
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
        <label class="col-sm-1 control-label" style="width: 10.3%; margin-top: 6px">Online Exam:</label>
        <select class="form-control gradeFilter" style="width: 8.3%" v-model="searchExamStatus" @change="pageNumber = 0">
          <option value="-1">All</option>
          <option v-for=" flag in examStatus" v-bind:value="flag.value" :key="flag.value">{{flag.text}}</option>
        </select>
      </div>
      <div>
        <label class="col-sm-1 control-label" style="width: 9.0%; margin-top: 6px">Owner by:</label>
        <select class="form-control gradeFilter" style="width: 8.3%" v-model="searchOwner" @change="pageNumber = 0">
         <option value=0>All</option>
         <option v-for="teacher in listOfTeachers" v-bind:value="teacher.emailid" :key="teacher.emailid">{{teacher.emailid}}</option>
        </select>
      </div>
    </div>
    <div class="row studentstable reset-padding reset-margin">
      <div class="divTable">
        <div class="divTableBody">
          <div class="divTableRow">
            <div class="divTableCell">Question ID</div>
            <div class="divTableCell">Owner</div>
            <div class="divTableCell" style="width: 50%">Question</div>
            <div class="divTableCell">Grade</div>
            <div class="divTableCell">QuestionType</div>
            <div class="divTableCell">Subject</div>
            <div class="divTableCell">Tags</div>
            <div class="divTableCell">Status</div>
            <div class="divTableCell">Difficulty Level</div>
            <div class="divTableCell">Edit</div>
            <div class="divTableCell">View</div>
          </div>
          <div
            v-for="(question, index) in paginatedDataQuesLibrary"
            class="divTableRowdata"
            :key="index"
            v-if="(question.online_exam == 1 && question.createdby === userName)"
           >
            <div class="divTableCelldata">{{ question.questionid }}</div>
            <div class="divTableCelldata">{{ question.createdby }}</div>
            <div class="divTableCelldata" style="width: 50%">
              <p v-html="question.questionDescription"></p>
            </div>
            <div class="divTableCelldata">{{ question.gradename }}</div>
            <div class="divTableCelldata" v-if="question.questionType == 1">MCQ</div>
            <div class="divTableCelldata" v-else-if="question.questionType == 2">Descriptive</div>
            <div class="divTableCelldata" v-else-if="question.questionType == 3">Passage</div>
            <!-- <div class="divTableCelldata">{{getNameFromVal(question.gradeid, listOfGrades, "grade")}}</div>  -->
            <div class="divTableCelldata">{{ question.subjectname }}</div>
            <!-- <div class="divTableCelldata">{{getNameFromVal(question.subjectid, listOfSubjects, "subject")}}</div>  -->
            <div class="divTableCelldata">
              <ul v-for="tag in question.tags" :key="tag.id">
                {{
                  tag.tagname
                }}
              </ul>
            </div>
            <div class="divTableCelldata">
              {{ getNameFromVal(question.status_id, listOfStatus, "status") }}
            </div>
            <div class="divTableCelldata">
              {{ question.degreeofdifficulty }}
            </div>
            <!-- <div class="divTableCelldata">{{getNameFromVal(question.degreeofdifficultyid, degreeOfDifficultyList, "degreeofdifficulty")}}</div> -->
            <div class="divTableCelldata">
              <a
                v-if="question.status_id == 2"
                data-toggle="modal"
                @click="editQuestion(question, index)"
                ><i
                  class="fa fa-pencil-square-o fa-1x"
                  aria-hidden="true"
                  style="width: 52px"
                ></i
              ></a>
              <a
                v-else-if="question.status_id == 1"
                data-toggle="modal"
                @click="
                  confirmationPopUpOpen(
                    confirmationPopUpKeys.questionMakeInActive,
                    question.questionid,
                    question
                  )
                "
                ><i
                  class="fa fa-pencil-square-o fa-1x"
                  aria-hidden="true"
                  style="width: 52px"
                ></i
              ></a>
              <a
                v-else-if="question.status_id == 0"
                data-toggle="modal"
                @click="
                  confirmationPopUpOpen(
                    confirmationPopUpKeys.questionMakeActive,
                    question.questionid,
                    question
                  )
                "
                ><i
                  class="fa fa-pencil-square-o fa-1x"
                  aria-hidden="true"
                  style="width: 52px"
                ></i
              ></a>
            </div>
            <div class="divTableCelldata">
              <a data-toggle="modal" @click="eachQuestion(question, index)"
                ><i class="fa fa-eye" aria-hidden="true" style="width: 52px"></i
              ></a>
            </div>
            <div
              class="divTableCelldata"
              v-if="question.questionType == 3 && question.status_id == 2"
            >
              <button
                @click="childQuestions(question, 'myModal')"
                class="btn btn-primary"
              >
                Add Questions
              </button>
            </div>
          </div>
          <!--Add new else div -->
          <div class="divTableRowdata" v-else-if="question.online_exam != 1 || userRole === 'ADMIN'">
            <div class="divTableCelldata">{{ question.questionid }}</div>
            <div class="divTableCelldata">{{ question.createdby }}</div>
            <div class="divTableCelldata" style="width: 50%">
              <p v-html="question.questionDescription"></p>
            </div>
            <div class="divTableCelldata">{{ question.gradename }}</div>
            <div class="divTableCelldata" v-if="question.questionType == 1">MCQ</div>
            <div class="divTableCelldata" v-else-if="question.questionType == 2">Descriptive</div>
            <div class="divTableCelldata" v-else-if="question.questionType == 3">Passage</div>
            <div class="divTableCelldata">{{ question.subjectname }}</div>
            <div class="divTableCelldata">
              <ul v-for="tag in question.tags" :key="tag.id">
                {{
                  tag.tagname
                }}
              </ul>
            </div>
             <div class="divTableCelldata">
              {{ getNameFromVal(question.status_id, listOfStatus, "status") }}
            </div>
             <div class="divTableCelldata">{{ question.degreeofdifficulty }}</div>
             <div class="divTableCelldata">
              <a
                v-if="question.status_id == 2"  data-toggle="modal"
                @click="editQuestion(question, index)"
                ><i class="fa fa-pencil-square-o fa-1x"  aria-hidden="true"  style="width: 52px" ></i
              ></a>
              <a  v-else-if="question.status_id == 1"  data-toggle="modal"
                @click="
                  confirmationPopUpOpen(
                    confirmationPopUpKeys.questionMakeInActive,
                    question.questionid,
                    question
                  )
                "
                ><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"  style="width: 52px" ></i
              ></a>
              <a  v-else-if="question.status_id == 0"  data-toggle="modal"
                @click="
                  confirmationPopUpOpen(
                    confirmationPopUpKeys.questionMakeActive,
                    question.questionid,
                    question
                  )
                "
                ><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true" style="width: 52px" ></i
              ></a>
            </div>
            <div class="divTableCelldata">
              <a data-toggle="modal" @click="eachQuestion(question, index)"
                ><i class="fa fa-eye" aria-hidden="true" style="width: 52px"></i
              ></a>
            </div>
            <div class="divTableCelldata"
              v-if="question.questionType == 3 && question.status_id == 2" >
              <button  class="btn btn-primary"  @click="childQuestions(question, 'myModal')" >
                Add Questions
              </button>
            </div>
              
          </div>
          <!--End else div -->
        </div>
      </div>
    </div>
    <br />
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
                    <option v-for="subject in degreeOfDifficultyList" v-bind:value="subject.id">
                      {{subject.degreeofdifficulty }}
                    </option>
                  </select>
                  <br /><br /><br />
                  <div>
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
                    <br/><br/><br/>
                  </div>
                  <div>
                    <label
                      class="col-sm-1 control-label"
                      style="width: 16.3% !important; margin-top: 6px"
                      >Status :</label
                    >
                    <select
                      v-if="question.questionType == 3 && toBeEdited == false"
                      class="form-control gradeFilter"
                      style="width: 27% !important"
                    >
                      <option :value="(question.status_id = 2)">DRAFT</option>
                    </select>
                    <select
                      v-else
                      class="form-control gradeFilter"
                      style="width: 27% !important"
                      v-model="question.status_id"
                    >
                      <option value="0">-- Select Status --</option>
                      <option
                        v-for="status in listOfStatus"
                        v-bind:value="status.id"
                        v-if="status.id !== 0"
                      >
                        {{ status.status }}
                      </option>
                    </select>
                  </div>
                   <div>
                    <label  class="col-sm-1 control-label" style="width: 20.3% !important; margin-top: 6px">Online Exam:</label>
                    <select v-model="question.online_exam" class="form-control gradeFilter" style="width: 27% !important">
                      <option value="-1">--Select Status--</option>
                      <option v-for="flag in examStatus" v-bind:value="flag.value">{{flag.text}}</option>
                    </select>
                     <br/><br/><br/>
                    </div>
                  <!-- <label class="col-sm-1 control-label" style="width:16.3%;margin-top: 6px;">Tags :</label> -->
                  <div class="form-group" v-for="(input, k) in tags" :key="k">
                    <label
                      class="col-sm-1 control-label"
                      style="width: 16.3% !important; margin-top: 6px"
                      >Tags :</label
                    >
                    <!-- <input type="text" class="search-query form-control" v-model="input.tagname"> -->
                    <!-- <div class="col-sm-1" style="width:27% !important"> -->
                    <div
                      class="col-md-10 reset-padding reset-margin"
                      style="width: 25%"
                    >
                      <autocompleteformulvalues
                        :suggestions="dataforautocomplete1"
                        :selection="input"
                        v-on:update="datafromautocommul($event,k)"
                        :key="componentKey"
                      >
                      </autocompleteformulvalues>
                      <!-- v-bind="input.tagname" -->
                    </div>
                    <span
                      class="col-sm-1 control-label"
                      style="width: 27% !important; padding-left: 120px"
                    >
                      <i
                        class="fa fa-minus-circle"
                        style="
                          color: red;
                          padding-top: 9px;
                          padding-right: 10px;
                        "
                        @click="remove(k)"
                        v-show="k || (!k && tags.length > 1)"
                      ></i>
                      <i
                        class="fa fa-plus-circle"
                        @click="add(k)"
                        style="
                          color: green;
                          padding-top: 9px;
                          padding-left: 10px;
                        "
                        v-show="k == tags.length - 1"
                      ></i>
                    </span>
                    <br /><br />
                  </div>
                  <!-- {{tags}} -->
                </div>
                <br />
                <!-- <textarea placeholder="Please enter question here" v-model="question.question" class="form-control txtarea"></textarea> -->
                <!--  <label class="col-sm-1 control-label" style="float:left;width: 20%;margin-top: 76px;padding-left:0px">Question : </label> -->
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
                  <!-- <a v-if="question.imageurls !== null" @click="removeFromQuestionImages(question,index)" v-for="(selectedfile,index) in question.imageurls"><span class="glyphicon glyphicon-remove " >{{selectedfile}}</span><br></a>   -->
                  <!-- <p v-model="question.imageurls" > {{question.imageurls}} </p> -->

                  <p v-for="url in question.imageurls">
                    <a @click="removeUrlFromQuestion(url)"
                      ><span class="glyphicon glyphicon-remove"></span></a
                    >{{ url }}
                  </p>
                </div>
                <div v-if="question.questionType == 3 && toBeEdited == true">
                  <button
                    @click="childQuestions(question, 'myModal')"
                    class="btn btn-primary"
                  >
                    Add Questions
                  </button>
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
                    :key="optionIndex"
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
                        <!-- <div class="uploader showImagePopUp">
                                    <i class="fa fa-cloud-upload"></i>
                                    <div class="file-input">
                                       <label for='file'>Select file</label>
                                       <input style="width:192px;" type="file" id="" @change='optionImages' multiple>
                                    </div>
                                    <div style="background-color: red">
                                         <a @click="removeFromOptionFile(optionimage,index)" v-for="(optionimage,index) in optionimages"><span class="glyphicon glyphicon-remove " >{{optionimage.name}}</span><br></a> 
                                    </div>
                                 </div> -->
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
                              <a  @click="removeFromOptionFile(image, index)"  v-for="image in optionimage.imageVal" >
                               <span class="glyphicon glyphicon-remove">{{
                                  image.name
                                }}</span
                                ><br
                              /></a>
                            </div>
                          </div>
                          <p  style="width: 800px"  v-for="url in option.imageVal" >
                            <a @click="removeUrlFromOptions(optionIndex, url)"
                              ><span
                                class="glyphicon glyphicon-remove"
                              ></span></a
                            >{{ url }}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div style="margin-left: 100px">
                        <i
                          class="fa fa-minus-circle"
                          style="
                            color: red;
                            padding-top: 9px;
                            padding-right: 10px;
                          "
                          @click="
                            removeOption(optionIndex, options[optionIndex])
                          "
                          v-show="
                            (optionIndex === options.length - 1 &&
                            optionIndex > 1) || (toBeEdited == true && (optionIndex === question.optionsData.length-1 && optionIndex > 1) )
                          "
                        ></i>
                        <i
                          class="fa fa-plus-circle"
                          style="
                            color: green;
                            padding-top: 9px;
                            padding-right: 10px;
                          "
                          @click="addOption(options[optionIndex])"
                          v-show="(optionIndex === options.length - 1) || (toBeEdited == true && (optionIndex === question.optionsData.length-1))"
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
              v-on:click.prevent="validatePassageQuestion()"
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
                      <!-- <vue-mathjax
                                            style="float: left; margin-left: 10px"
                                            :formula="eachquestion.questionDetails"
                                        ></vue-mathjax><br> -->
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
              <!-- <div v-if="eachquestion.questionType == 2">
                            <ckeditor-math-equation 
                            placeholder="Enter question"></ckeditor-math-equation>
                        </div> -->
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
              <div v-if="eachquestion.questionType == 3">
                <button
                  @click="childQuestions(eachquestion, 'viewquestion')"
                  class="btn btn-info"
                >
                  View Passage Questions
                </button>
              </div>
              <br />
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- view question pop up end -->
  </div>
</template>
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
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style scoped>
@import url("../../../assets/css/worksheet_styles.css");
.gradeFilter {
  position: relative;
}
</style>

<script>
import Vue from "vue";
import EventBus from "../../../event-bus.js";
import { mapState } from "vuex";
import { mapMutations } from "vuex";
import UserService from "../../../services/userService.js";
import CkeditorMathEquation from "./ckeditormathequations_template";
import { VueMathjax } from "vue-mathjax";
import _ from "lodash";
import Multiselect from 'vue-multiselect';
import autocomplete from "../classrooms/subjects/autocomplete_template";
import autocompleteformulvalues from "../classrooms/subjects/autocompleteforforms_template";

export default {
  components: {
    //ImageUploader,
    CkeditorMathEquation,
    "vue-mathjax": VueMathjax,
    autocomplete: autocomplete,
    autocompleteformulvalues: autocompleteformulvalues,
    Multiselect,
  },
  data() {
    return {
      dataforautocomplete: [],
      dataforautocomplete1: [],
      tagsformultiselect:[],
      tagids:[],
      // cities : [
      // 'Bangalore','Chennai','Cochin',
      // 'Delhi','Kolkata','Mumbai'
      // ],
      componentKey: 0,
      componentKey1:100,
      searchtagname: "",
      listoftags: {},
      typevalue: -1,
      emitvalue: "datafromautotocom",
      emitvaluedynamic: "datafromautotocomdynamic",
      placeholderforauto: "Search or add a tag",
      // current:0,
      open: "show",
      close: "hide",
      worksheetName: "",
      showAlert: false,
      gradeVal: "",
      sectionVal: "",
      subjectVal: "",
      alertClass: "",
      listOfGrades: [
        {
          text: "1st class",
          value: 1,
        },
        {
          text: "2nd class",
          value: 2,
        },
      ],
      listOfSections: [
        {
          text: "Section - A",
          value: 1,
        },
        {
          text: "Section - B",
          value: 2,
        },
      ],
      listOfStatus: [
        {
          text: "Active",
          value: 1,
        },
        {
          text: "In active",
          value: 0,
        },
      ],
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
      searchOwner: 0,
      searchGradeId: 0,
      searchSubjectId: 0,
      searchQuestionTypeId: 0,
      searchDifficultyId: 0,
      searchStatusId: -1,
      searchExamStatus:-1,
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
      userDetails:this.$store.state.userDetails,
      academicDetails: {},
      listOfSubjects: [],
      listOfGrades: [],
      listOfTeachers:[],
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
      size: 25,
      listOfQueIdsOfWs: [],

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
      userName: this.$cookie.get('username'),
      userRole: this.$cookie.get('userrole'),
      dataOfQuestions: [],
      selectedCorrectAns: [],
      selectedCorrectAnsData: [],
      eachquestion: {},
      eachindex: 0,
      questionimages: [],
      passagequestionimages: [],
      uploadMsg: false,
      urls: [],
      optionimages: [],
      status_id: null,
      childQuestion: false,
      childPassageQuestion: {},
      options: ["A", "B", "C", "D"],
      examStatus:[
        {
          text:'No',
          value:0
          },
         {
           text:'Yes',
           value:1
         }
           ]
    };
    
  },
  created() {
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
    UserService.GetTeachers(this.tenantId).then((response)=>{
      this.listOfTeachers = response.data;
      console.log(response.data);
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
    UserService.getTagsListWithId(this.tenantId).then((response) => {
      console.log(response.data);
      this.listoftags = response.data;
      // let length = this.listoftags.length;
      // for(let i=0;i<length;i++){
      //     this.dataforautocomplete.push(this.listoftags[i].tagname);
      // }
      this.dataforautocomplete = _.map(this.listoftags, function (tag) {
        return tag.tagname;
      });
      this.dataforautocomplete1 = response.data;
      console.log(this.dataforautocomplete);
      console.log(this.dataforautocomplete1);

    });
    
    this.getLibraryQuestions();
  },
  methods: {
    ...mapMutations(["SET_SELETECTED_WORKSHEET"]),

    popUp: function (id, action) {
      $("#" + id).modal(action);
    },
    forceRerender() {
      this.componentKey += 1;
    },
    forceRerender1() {
      this.componentKey1 += 1;
    },
    getLibraryQuestionsByTags: function(){
      let obj = {
        tagids: this.tagids
      }
      UserService.getLibraryQuestionsByTags(obj, this.tenantId)
        .then((response) => {
          this.libraryQuestions = [];
          this.pageNumber = 0;
          // let length = response.data.length;
          // let questionsData = response.data;
          let length = response.data.resultsMap.questions.length;
          let questionsData = response.data.resultsMap.questions;
          if (length > 0) {
            for (let i = 0; i < length; i++) {
              this.libraryQuestions.push(
                this.prepareQuestionObj(questionsData[i])
              );
            }
          }
        })
        .catch((error) => {});
    },
    addTag: function(newtag, id) {
      // this.tagids = [];
      // for(let i=0;i<this.tagsformultiselect.length;i++){
      //   this.tagids.push(this.tagsformultiselect[i].id);
      // }
      console.log(newtag, id, typeof(newtag.id), typeof(this.tenantId));
      this.tagids.push(newtag.id);
      this.getLibraryQuestionsByTags();
    },
    deleteTag: function(newtag, id) {
      console.log(newtag, id);
      for(let i=0;i<this.tagids.length;i++){
        if(this.tagids[i]==newtag.id){
          let index = i;
          this.tagids.splice(index,1);
          break;
        }
      }
      if(this.tagids.length!=0){
        this.getLibraryQuestionsByTags();
      } else {
        this.getLibraryQuestions();
      }
    },
    datafromautotocom: function (selection) {
      this.searchtagname = selection.tagname;
      console.log(selection);
      UserService.getLibraryQuestionsByTagId(selection.id, this.tenantId)
        .then((response) => {
          this.libraryQuestions = [];
          this.pageNumber = 0;
          // let length = response.data.length;
          // let questionsData = response.data;
          let length = response.data.resultsMap.questions.length;
          let questionsData = response.data.resultsMap.questions;
          if (length > 0) {
            for (let i = 0; i < length; i++) {
              this.libraryQuestions.push(
                this.prepareQuestionObj(questionsData[i])
              );
            }
          }
        })
        .catch((error) => {});
    },
    datafromautotocomdynamic: function (selection) {
      this.searchtagname = selection;
      // UserService.getListoftagnamesBysearchkeyword(selection, this.tenantId).then((response)=>{
      //     console.log(response.data);
      //     this.listoftags = [];
      //     this.listoftags = response.data;
      //     this.dataforautocomplete=_.map(this.listoftags,function(tag){return tag.tagname;}) ;
      //     console.log(this.dataforautocomplete)
      // })
    },
    datafromautocommul: function(event, k) {
      console.log(event);
      this.tags[k].id = event.id;
      this.tags[k].tagname = event.tagname;
      // this.forceRerender();
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
      this.dataOfQuestions[0].imageurls.splice(url, 1);
    },
    removeUrlFromOptions(index, url) {
      this.dataOfQuestions[0].optionsData[index].imageVal.splice(url, 1);
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
    },
    removeFromOptionFile(file, index) {
      _.filter(this.optionimages, function (data) {
        if (data.index == index) {
          data.imageVal.splice(file, 1);
        }
      });
    },
    removeFromSelectedFile(file, index, passageType) {
      if (passageType == true) {
        this.passagequestionimages.splice(index, 1);
      } else {
        this.questionimages.splice(index, 1);
      }
    },
    nextPage() {
      this.pageNumber++;
      // console.log(this.pageNumber);
    },
    prevPage() {
      this.pageNumber--;
      // console.log(this.pageNumber);
    },
    //
    validatePassageQuestion: function () {
      console.log("tenant id : " + this.tenantId);
      console.log("question id : " + this.dataOfQuestions[0].questionid);
      if (
        this.dataOfQuestions[0].questionType == 3 &&
        this.dataOfQuestions[0].status_id == 1
      ) {
        UserService.getPassageQuestionsList(
          this.tenantId,
          this.dataOfQuestions[0].questionid
        ).then((response) => {
          console.log(response.data.resultsMap.questions);
          let listOfQuestions = [];
          let length = response.data.resultsMap.questions.length;
          if (length <= 0) {
            console.log("Return False");
            this.dataOfQuestions[0].status_id = 2;
            alert("Add Atleast One Child Question");
            return;
          } else {
            this.saveQuestion();
          }
        });
      } else {
        this.saveQuestion();
      }
    },
    saveQuestion: function () {
      this.searchtagname = "";
      this.forceRerender1();
      var self = this;
      let obj = {};
      let questionData = new FormData();
      let formdata = new FormData();
      for (const file of this.questionimages) {
        formdata.append("images", file);
      }
      // let length = this.tags.length;
      // let tags1 = [];
      // var self= this;
      // for(let i=0;i<length;i++){
      //   let tagname = this.tags[i].tagname
      //   tags1.push({tagname});
      // }
      // let length = this.tags.length;
      if (this.validateQuestion()) {
        for (let i = 0; i < this.tags.length; i++) {
          // console.log(i, this.tags, length)
          if (this.tags[i].tagname.trim() == "") {
            this.remove(i);
            i--;
          } else {
            for (let j = i+1; j < this.tags.length; j++) {
              if(this.tags[j].tagname.trim().toLowerCase() == this.tags[i].tagname.trim().toLowerCase()){
                this.remove(i);
                i--;
              }
            }
          }
        }
        console.log("Entered");
        this.worksheetQuestions.push(this.dataOfQuestions[0]);
        this.showAlerts(this.success, this.alertMsgs.questionDataAlert);
        let questionObject = {
          questionDescription: this.dataOfQuestions[0].question,
          questiontype_id: this.dataOfQuestions[0].questionType,
          subjectid: this.dataOfQuestions[0].subjectVal,
          gradeid: this.dataOfQuestions[0].gradeVal,
          context: "context data", // need to change
          status_id: this.dataOfQuestions[0].status_id,
          degreeofdifficultyid: this.dataOfQuestions[0].difficultyId,
          questionid: this.dataOfQuestions[0].questionid,
          imageurls: this.dataOfQuestions[0].imageurls,
          tenant: this.$cookie.get("tenant"),
          createdby:this.dataOfQuestions[0].createdby,
          online_exam:this.dataOfQuestions[0].online_exam,
          correctAnswer: "",
          options: [],
          multipleChoiceDTO: [],
          tags: this.tags
          // tags: _.map(this.tags, function (tag) {
          //   let tagname = tag.tagname;
          //   if (tagname != "") {
          //     return { tag };
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
              // for (const file of imageFiles) {
              //     // console.log("first executed");
              //     // const reader = new FileReader();
              //     // reader.onloadend = () => {
              //     //     console.log("second executed");
              //     //     array = reader.result.split(',');
              //     //     stringArr.push(array[1])
              //     // }
              //     // reader.readAsDataURL(file);
              //     questionData.append(i,file);
              //     console.log(file);

              // }
              // console.log("third executed");
              // optionObj.optionimages = stringArr;
              // console.log(stringArr);
            }
            optionObj.answertypeid = option.selectAnsType;
            questionObject.options.push(optionObj);
            questionObject.multipleChoiceDTO.push(optionObj);
          }
          // for (const mcq of questionObject.multipleChoiceDTO) {
          //     mcq.optionimages.push(stringArr)
          //     console.log(mcq)
          // }
        }
        if (this.tags.length == 0) {
          this.tags = [{ id:0,tagname: "" }];
        }
        if (!this.dataOfQuestions[0].questionid) {
          questionData.append("questionData", JSON.stringify(questionObject));
          UserService.saveQuestionToLibrary(questionData, this.tenantId)
            .then((response) => {
              let questionid = response.data.resultsMap.question.questionid;
              let formdata = new FormData();
              if (!_.isEmpty(this.questionimages)) {
                for (const file of this.questionimages) {
                  formdata.append("images", file);
                }
                formdata.append("questionid", questionid);
                formdata.append("tenant", this.$cookie.get("tenant"));
                UserService.saveQuestionImages(formdata, this.tenantId)
                  .then((response) => {
                    this.getLibraryQuestions();
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
                this.getLibraryQuestions();
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
          let questionid = this.dataOfQuestions[0].questionid;
          UserService.updateQuestionToLibrary(questionData, questionid, this.tenantId).then((response) => {
          
            let formdata = new FormData();
            if (!_.isEmpty(this.questionimages)) {
              for (const file of this.questionimages) {
                formdata.append("images", file);
              }
              formdata.append("questionid", questionid);
              formdata.append("tenant", this.$cookie.get("tenant"));
              UserService.saveQuestionImages(formdata, this.tenantId)
                .then((response) => {
                  if(this.tagsformultiselect.length!=0){
                    this.getLibraryQuestionsByTags();
                  } else {
                    this.getLibraryQuestions();
                  }
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
              if(this.tagsformultiselect.length!=0){
                this.getLibraryQuestionsByTags();
              } else {
                this.getLibraryQuestions();
              }
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

    createBase64Image(file) {
      console.log(file);
      const reader = new FileReader();
      let imageSrc;
      reader.onloadend = () => {
        return reader.result;
      };
      reader.readAsBinaryString(file);
    },
    getOnloadEntitiesData: function () {
      UserService.Subjects(this.tenantId)
        .then((response) => {
          this.listOfSubjects = response.data;
          this.getListOfWorksheets();
        })
        .catch((error) => {
          console.log(JSON.stringify(error));
        });
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
    getLibraryQuestions: function () {
      UserService.getLibraryQuestions(this.tenantId)
        .then((response) => {
          console.log(response);
          this.libraryQuestions = [];

          let length = response.data.resultsMap.questions.length;
          let questionsData = response.data.resultsMap.questions;

          if (length > 0) {
            for (let i = 0; i < length; i++) {
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

    //question
    editQuestion: function (question, index) {
      console.log(question);
      this.dataOfQuestions = [];
      let obj = JSON.parse(JSON.stringify(question));
      obj.difficultyId = obj.degreeofdifficultyid;
      obj.gradeVal = obj.gradeid;
      obj.subjectVal = obj.subjectid;
      this.dataOfQuestions.push(obj);
      this.editIndex = index;
      this.toBeEdited = true;
      this.selectedCorrectAns = [];
      if (
        !_.isUndefined(obj.correctAnswer) &&
        !_.isNull(obj.correctAnswer) &&
        obj.correctAnswer !== ""
      ) {
        this.selectedCorrectAns.push(obj.correctAnswer);
      }
      if (question.tags != null) {
        this.tags = question.tags;
        this.forceRerender();
      } else {
        this.tags = [{ id:0,tagname: "" }];
        this.forceRerender();
      }
      this.popUp("myModal", this.open);
    },
    childQuestions: function (question, id) {
      this.popUp(id, this.close);
      this.$store.commit("SELECTED_QUESTION", question);
      this.$router.push({
        path: "/worksheets/passagequestion",
      });
    },
    //will be called when cliked on add question
    addNewQuestion: function () {
      this.options = ["A","B","C","D"];
      this.dataOfQuestions = [];
      this.selectedCorrectAns = [];
      this.tags = [{ id:0,tagname: "" }];
      this.forceRerender();
      this.popUp("myModal", this.open);
      this.dataOfQuestions.push(this.createQuestionObj());
      this.selectedCorrectAnsData = [];
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
    //
    checkIsEmptyVal: function (val) {
      if (!val) {
        return true;
      }
      return false;
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
    add(index) {
      this.tags.push({ id:0,tagname: "" });
      // console.log(index);
      // if(this.tags[index].tagname==" " || this.tags[index].tagname==""){
      //   this.remove(index);
      // }
    },
    remove(index) {
      this.tags.splice(index, 1);
      this.forceRerender();
    },

    getTheTexCode: function (ckData) {
      let arr = ckData.split("alt=");

      if (arr.length > 0) {
        if (arr[1].indexOf("f(x)") != -1) {
          return " \\(" + [arr[1].split('" ')[0].replace(/"/g, "")] + "\\)";
        } else {
          return " (" + [arr[1].split('" ')[0].replace(/"/g, "")] + ")";
        }
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

    //
    validateQuestion: function () {
      let questionObject = this.dataOfQuestions[0];
      if (this.checkIsEmptyVal(questionObject.question)) {
        return false;
      }
      if (this.checkIsEmptyVal(questionObject.difficultyId)) {
        return false;
      }
      if (this.checkIsEmptyVal(questionObject.subjectVal)) {
        return false;
      }
      if (this.checkIsEmptyVal(questionObject.gradeVal)) {
        return false;
      }
      if (this.checkIsEmptyVal(questionObject.status_id)) {
        return false;
      }
      if (questionObject.online_exam == -1) {
        return false;
      } else if (
        questionObject.questionType == 1 &&
        questionObject.optionsData.length > 0
      ) {
        if (!this.selectedCorrectAns || this.selectedCorrectAns.length == 0) {
          console.log("Answer validation ");
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
                ] = this.getCkFinalData(obj.formulaVal);
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
    exctractCKEditorData: function (ckeditorData) {
      let arr = ckeditorData.split("alt=");
      let formulaValue;
      if (arr.length > 0) {
        formulaValue =
          " (" + [arr[arr.length - 1].split('" ')[0].replace(/"/g, "")] + ")";
      }
      return formulaValue;
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
    //
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
      let obj = {};
      obj = {
        question: "",
        divHeightClassName: "",
        questionType: 1,
        difficultyId: 0,
        subjectVal: 0,
        gradeVal: 0,
        online_exam:0,
        createdby:this.userDetails.username
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
    getOptionVal: function (options, val) {
      let length = options.length;
      for (let i = 0; i < length; i++) {
        if (val == options[i].mcq_id) {
          return options[i].mcq_order;
        }
      }
    },

    prepareQuestionObj: function (questionsData) {
      let obj = JSON.parse(JSON.stringify(questionsData));
      obj.context = questionsData.context;
      obj.question = questionsData.questionDescription;
      obj.parent_question_id = questionsData.parent_question_id;
      obj.questionDetails = this.getCkFinalData(
        questionsData.questionDescription
      );
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

    checkEmptyVal: function (val) {
      if (val == "" || val == null) {
        return true;
      }
      return false;
    },
    //Shows the alert message on homepage
    setAlertMessage: function (type, addOrUpdate) {
      if (type == "fail") {
        this.alertMessage = "You must enter all the data .....";
        this.alertClass = "alert-danger";
      } else if (type == "success") {
        this.alertMessage = "Successfully " + addOrUpdate + " worksheet .....";
        this.alertClass = "alert-success";
      }
      this.showAlert = true;
      let thisVue = this;
      setTimeout(function () {
        thisVue.alertMessage = "";
        thisVue.alertClass = "";
        thisVue.showAlert = false;
        if (type == "success") {
          thisVue.popUp("worksheetPopUp", thisVue.close);
        }
      }, 1500);
    },
    eachQuestion: function (selectedQuestion, selectedIndex) {
      this.eachquestion = selectedQuestion;
      this.eachindex = selectedIndex;
      // for component
      // this.$store.commit('SELECTED_QUESTION',selectedQuestion);
      // this.$router.push({
      //     path: '/worksheets/viewquestion'
      // })
      this.popUp("viewquestion", this.open);
    },
  },
  computed: {
    pageCount() {
      let l = this.filterLibraryQuestions.length,
        s = this.size;
      return Math.ceil(l / s);
    },

    filterLibraryQuestions: function () {
      var self = this;
      return this.libraryQuestions.filter(function (question) {
        let filterQuestionDesc;
        let filterGrade;
        let filterSubject;
        let filterDifficulty;
        let filterStatus;
        let filterQuestionType;
        let filterExamStatus;
        let filterOwner;

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
          // filterGrade =
          //   question.gradeid
          //     .toString()
          //     .indexOf(self.searchGradeId.toString()) >= 0;
          // console.log(self.searchGradeId);
          if (question.gradeid == self.searchGradeId) {
            filterGrade = true;
          } else {
            filterGrade = false;
          }
        }
        if (self.searchSubjectId == 0) {
          filterSubject = true;
        } else {
          // filterSubject =
          //   question.subjectid
          //     .toString()
          //     .indexOf(self.searchSubjectId.toString()) >= 0;
          if (question.subjectid == self.searchSubjectId) {
            filterSubject = true;
          } else {
            filterSubject = false;
          }
        }
        if (self.searchQuestionTypeId == 0) {
          filterQuestionType = true;
        } else {
          // filterSubject =
          //   question.subjectid
          //     .toString()
          //     .indexOf(self.searchSubjectId.toString()) >= 0;
          if (question.questionType == self.searchQuestionTypeId) {
            filterQuestionType = true;
          } else {
            filterQuestionType = false;
          }
        }
        if (self.searchDifficultyId == 0) {
          filterDifficulty = true;
        } else {
          // filterDifficulty =
          //   question.degreeofdifficultyid
          //     .toString()
          //     .indexOf(self.searchDifficultyId.toString()) >= 0;
          if (question.degreeofdifficultyid == self.searchDifficultyId) {
            filterDifficulty = true;
          } else {
            filterDifficulty = false;
          }
        }
        if (self.searchStatusId == -1) {
          filterStatus = true;
        } else {
          if (question.status_id == self.searchStatusId) {
            filterStatus = true;
          } else {
            filterStatus = false;
          }
        }
        if(self.searchExamStatus == -1){
          filterExamStatus = true;
        }else{
          if(question.online_exam == self.searchExamStatus){
            console.log(question.online_exam + " "+ self.searchExamStatus);
            filterExamStatus = true;
          }else{
            filterExamStatus = false;
          }
          
        }
        if(self.searchOwner == 0){
          filterOwner =  true;
        }else{
          if(question.createdby === self.searchOwner){
          filterOwner = true; 
          }else{
            filterOwner = false;
          }
        }
        //return true;
        return (
          filterQuestionDesc &&
          filterGrade &&
          filterSubject &&
          filterDifficulty &&
          filterStatus &&
          filterQuestionType&&
          filterExamStatus&&
          filterOwner
        );
      });
    },
    paginatedDataQuesLibrary() {
      // console.log(this.pageNumber,this.pageCount)
      // if(this.pageNumber+1>this.pageCount){
      //   this.pageNumber = 0;
      //   console.log(this.pageNumber,this.pageCount)
      // }
      const start = this.pageNumber * this.size,
        end = start + this.size;
      if (!this.libraryQuestions || this.libraryQuestions.length == 0) {
        return;
      }
      return this.filterLibraryQuestions.slice(start, end);
    },
  },
};
</script>
