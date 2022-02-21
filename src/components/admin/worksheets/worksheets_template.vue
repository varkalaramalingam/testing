<template>

<div class="container">
    <div class="row reset-padding reset-margin">
        <!-- <div class="col-lg-12 text-left">
             <div class="page-heading">Worksheets</div>
             <div class="col-md-2 reset-padding reset-margin newstudentbutton">
            <button class='btn newWorksheet pull-right' style="width: 177px;" v-on:click="popUp('worksheetPopUp',open);createWorksheetObj(workSheetIndex)">New Worksheet</button>
        </div>
            <hr>
        </div> -->
        <div class="row">
            <div class="col-lg-6">
		        <div class="page-heading"><span v-html="$t('worksheets_library')"/></div>
            </div>
            <div class="col-lg-6 text-right">
                <button class='common-button' 
                 v-on:click="popUp('worksheetPopUp',open);createWorksheetObj(workSheetIndex)">New Worksheet</button>
            </div>
        </div>
		<hr/>
    </div>
    <div class="row reset-padding reset-margin">
        <div id="custom-search-input" class="col-md-10 reset-padding reset-margin" style="width:25%">
            <div class="input-group searchbar">
                <input v-model='search' @input="pageNumber=0" type="text" class="search-query form-control" placeholder="Search worksheet name">
                <span class="input-group-btn">
                        <button class="btn search-btn" type="button">
                            <span class=" glyphicon glyphicon-search"></span>
                </button>
                </span>
            </div>
        </div>
        <div>
            <label class="col-sm-1 control-label" style="width:8.3%;margin-top: 6px;">Status :</label>
            <select class="form-control gradeFilter" v-model="searchStatusId" @change="pageNumber=0" >
                <option :value="-1"> All </option>
               <option v-for="status in listOfStatus" :key="status.id" v-bind:value="status.id">{{status.status}}</option>
            </select>
         </div>
        <div>
            <label class="col-sm-1 control-label" style="width:8.3%;margin-top: 6px;">Grade :</label>
            <select class="form-control gradeFilter" v-model="searchGradeId" @change="pageNumber=0" >
               <option value=0> All </option>
               <option v-for="grade in listOfGrades" v-bind:value="grade.id">{{grade.gradename}}</option>
            </select>
         </div>
         <div>
            <label class="col-sm-1 control-label" style="width:8.3%;margin-top: 6px;">Subject :</label>
            <select class="form-control gradeFilter" v-model="searchSubjectId" @change="pageNumber=0" >
               <option value=0> All </option>
               <option v-for="subject in listOfSubjects" v-bind:value="subject.id">{{subject.subjectname}}</option>
            </select>
         </div>
         <div>
            <label class="col-sm-1 control-label" style="width:9.3%;margin-top: 6px;">Difficulty :</label>
            <select class="form-control gradeFilter" v-model="searchDifficaulty" @change="pageNumber=0" >
               <option value=0> All </option>
               <option v-for="subject in degreeOfDifficultyList" v-bind:value="subject.id">{{subject.degreeofdifficulty}}</option>
            </select>
         </div>
    </div>
    <br>
    <div class="row reset-padding reset-margin">
         <div class="col-md-10 reset-padding reset-margin" style="width:40%">
            <!-- <autocomplete 
                :suggestions="dataforautocomplete1" 
                :selection="searchtagname" 
                :emitvalue="emitvalue" 
                :emitvaluedynamic="emitvaluedynamic"
                :typevalue="typevalue"
                :placeholder="placeholderforauto"
                v-on:datafromautotocom="datafromautotocom($event)" 
                v-on:datafromautotocomdynamic="datafromautotocomdynamic($event)"
                :key="componentKey4"
                >
            </autocomplete> -->
            <multiselect v-model="tagsformultiselect" :options="dataforautocomplete1" :multiple="true" :key="dataforautocomplete1.id"
                id="for now no use" :close-on-select="false" :clear-on-select="true" :preserve-search="true" :placeholder="placeholderforauto" 
                label="tagname" track-by="tagname" :preselect-first="true" :taggable="true" @select="addTag" @remove="deleteTag" >
            </multiselect>
        </div>
        <!-- {{tagsformultiselect}} -->
        <!-- {{tagids}} -->
        <div>
            <label class="col-sm-1 control-label" style="width:9.3%;margin-top: 6px;">Type:</label>
            <select class="form-control gradeFilter" v-model="searchWorksheetTypeId" @change="pageNumber=0" >
               <option value=0> All </option>
               <option v-for="worksheettype in worksheetTypes" v-bind:value="worksheettype.id">{{worksheettype.text}}</option>
            </select>
         </div>
         <div>
            <label class="col-sm-1 control-label" style="width:9.3%;margin-top: 6px;">Purpose:</label>
            <select class="form-control gradeFilter" v-model="searchWorksheetPurposeId" @change="pageNumber=0" >
               <option value=0> All </option>
               <option v-for="purpose in worksheetPurpose" v-bind:value="purpose.id">{{purpose.text}}</option>
            </select>
         </div>
         <div>
             <label class="col-sm-1 control-label" style="width:9.3%;margin-top: 6px;">Owner by:</label>
             <select class="form-control gradeFilter" v-model="searchOwner" @change="pageNumber=0">
                 <option value=0> All </option>
                 <option v-for="teacher in listOfTeachers" v-bind:value="teacher.emailid">{{teacher.emailid}}</option>
             </select>
         </div>
    </div>
    
    <div class="row studentstable reset-padding reset-margin ">
        <br>
        <div class="divTable">
            <div class="divTableBody">
                <div class="divTableRow">
                    <div class="divTableCell">ID</div>
                    <div class="divTableCell">Owner</div>
                    <div class="divTableCell">Worksheet Name</div>
                    <div class="divTableCell">Grade</div>
                    <div class="divTableCell">Subject</div>
                    <div class="divTableCell">Tags</div>
                    <div class="divTableCell">Purpose</div>
                    <div class="divTableCell">Status</div>
                    <div class="divTableCell">Difficulty Level</div>
                    <div class="divTableCell">Edit</div>
                    <div class="divTableCell" v-if='userRole != "ADMIN"'></div>
                    <div class="divTableCell">Analyse</div>
                    <div class="divTableCell">Publish</div>
                </div>

                <div class="divTableRowdata" v-for="(worksheet,index) in paginatedData" v-if="(worksheet.createdby === userName && worksheet.purpose == 2)">
                    <div class="divTableCelldata">{{worksheet.id}}</div>
                    <div class="divTableCelldata" v-if="worksheet.createdby.toLowerCase() === userName">{{worksheet.createdby}}</div>
                    <div class="divTableCelldata">
                        <button class="btnAsLink" @click="eachworksheet(worksheet)">{{worksheet.worksheetName}}</button>
                    </div>
                    <div class="divTableCelldata">{{worksheet.grade}}</div>
                    <div class="divTableCelldata">{{worksheet.subject}}</div>
                    <div class="divTableCelldata">
                       <ul v-for="tag in worksheet.tags" :key="tag.id">{{tag.tagname}}</ul>
                    </div> 
                    <div class="divTableCelldata">{{getWorkseetPurpose(worksheet.purpose)}}</div>
                    <div class="divTableCelldata">{{worksheet.status}}</div>
                    <div class="divTableCelldata">{{getNameFromVal(worksheet.degreeofdifficultyid, degreeOfDifficultyList, "degreeofdifficulty")}}</div>
                    <div v-if="worksheet.status == 'DRAFT'" class="divTableCelldata" ><a  data-toggle="modal" href="#editstudent" @click="editWorksheetDetails(worksheet,index);"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                    <div v-else-if="worksheet.status == 'ACTIVE'" class="divTableCelldata" ><a data-toggle="modal" href="#editstudent" @click="DialoguePopUp('worksheetStatusPopUp', open , worksheet.id, 0)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                    <div v-else-if="worksheet.status == 'INACTIVE'" class="divTableCelldata" ><a  data-toggle="modal" href="#editstudent" @click="DialoguePopUp('worksheetStatusPopUp', open , worksheet.id, 1)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                    <div class="divTableCelldata" v-if='userRole != "ADMIN"'><button v-if="worksheet.status == 'ACTIVE'&&worksheet.purpose != 2" class='assign-button' 
                 v-on:click="createWSAssignObj(worksheet);popUp('worksheetAssignPopUp',open);">Assign</button></div>
                     <div class="divTableCelldata"><button class="analyse-button" @click="analyseWorksheet(worksheet.id)">Analyse</button></div>
                      <div class="divTableCelldata" v-if ="worksheet.status ==='ACTIVE'&&worksheet.publish==0&&worksheet.purpose==2"><b>Yet to publish</b></div>
                      <div class="divTableCelldata" v-else><b>{{checkPublish(worksheet.status,worksheet.publish,worksheet.purpose)}}</b></div>
                    <!--- -->

                </div>
                <div class="divTableRowdata" v-else-if="worksheet.purpose != 2 || userRole ==='ADMIN'">
                    <div class="divTableCelldata">{{worksheet.id}}</div>
                    <div class="divTableCelldata">{{worksheet.createdby}}</div>
                    <div class="divTableCelldata">
                        <button class="btnAsLink" @click="eachworksheet(worksheet)">{{worksheet.worksheetName}}</button>
                    </div>
                    <div class="divTableCelldata">{{worksheet.grade}}</div>
                    <div class="divTableCelldata">{{worksheet.subject}}</div>
                    <div class="divTableCelldata">
                       <ul v-for="tag in worksheet.tags" :key="tag.id">{{tag.tagname}}</ul>
                    </div> 
                    <div class="divTableCelldata">{{getWorkseetPurpose(worksheet.purpose)}}</div>
                    <div class="divTableCelldata">{{worksheet.status}}</div>
                    <div class="divTableCelldata">{{getNameFromVal(worksheet.degreeofdifficultyid, degreeOfDifficultyList, "degreeofdifficulty")}}</div>
                    <div v-if="worksheet.status == 'DRAFT'" class="divTableCelldata" ><a  data-toggle="modal" href="#editstudent" @click="editWorksheetDetails(worksheet,index);"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                    <div v-else-if="worksheet.status == 'ACTIVE'" class="divTableCelldata" ><a data-toggle="modal" href="#editstudent" @click="DialoguePopUp('worksheetStatusPopUp', open , worksheet.id, 0)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                    <div v-else-if="worksheet.status == 'INACTIVE'" class="divTableCelldata" ><a  data-toggle="modal" href="#editstudent" @click="DialoguePopUp('worksheetStatusPopUp', open , worksheet.id, 1)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                     <div class="divTableCelldata" v-if='userRole != "ADMIN"'> <button v-if="worksheet.status == 'ACTIVE'" class='assign-button' 
                 v-on:click="createWSAssignObj(worksheet);popUp('worksheetAssignPopUp',open);">Assign</button></div>
                    <div class="divTableCelldata"><button class="analyse-button" @click="analyseWorksheet(worksheet.id)">Analyse</button></div>
                     <!--<div class="divTableCelldata" v-if="worksheet.status =='ACTIVE'&& worksheet.purpose==2&&worksheet.publish==1"><b>Published</b></div>-->
                     <div class="divTableCelldata" v-if="worksheet.status ==='ACTIVE'&&worksheet.publish==0&& worksheet.purpose==2"><b>Yet to publish</b></div>
                     <!--<div class="divTableCelldata" v-if="worksheet.purpose == 1 && worksheet.status=='ACTIVE'"><b>Published</b></div>-->
                     <div class="divTableCelldata" v-else><b>{{checkPublish(worksheet.status,worksheet.publish,worksheet.purpose)}}</b></div>
                </div>

            </div>
        </div>
    </div>
    <br>
    <div>
        <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
        <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
    </div>
    <!-- worksheet Analyse pop up start-->
    <div class="modal fade"  data-keyboard="false" data-backdrop="static" id="analysePOpUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog1">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4>Worksheet Analysis</h4>
                    </div>
                </div>
                <!-- { "w_id": 1, "worksheet_name": "Circle Theorem", 
                "degreeLevelQuestions": [ { "degreeofdifficulty": "EASY", "total": 14 }, 
                { "degreeofdifficulty": "INTERMEDIATE", "total": 2 } ], 
                "questionsTags": [ { "tagname": null, "total": 15 }, { "tagname": "Trigonometry", "total": 1 } ] } -->
                <!-- <div class="modal-footer">
                    <div class="divTable">
                        <div class="divTableBody">
                            <div class="divTableRow">
                                <div class="divTableCell">ID</div>
                                <div class="divTableCell">Worksheet Name</div>
                                <div class="divTableCell" v-for="dod in dodanalysisdata">{{dod.degreeofdifficulty}}</div>
                                <div class="divTableCell" v-for="tag in tagsanalysisdata" v-show="tag.tagname!=null">{{tag.tagname}}</div>
                            </div>
                            <div class="divTableRowdata" v-for="data in analysisdata">
                                <div class="divTableCelldata">{{data.w_id}}</div>
                                <div class="divTableCelldata">{{data.worksheet_name}}</div>
                                <div class="divTableCelldata" v-for="dod in data.degreeLevelQuestions">{{dod.total}}</div>
                                <div class="divTableCelldata" v-for="tag in data.questionsTags" v-show="tag.tagname!=null">{{tag.total}}</div>
                            </div>
                        </div>
                    </div>
                </div> -->
                <div class="modal-body" style="width:100%;align-self:center">
                    <table class="divTable">
                        <tbody class="divTableBody" v-for="data in analysisdata">
                            <!-- <div class="divTableCelldata">{{data}}</div> -->
                            <tr class="divTableRowdata" >
                                <!-- style="background-color:grey" -->
                                <td class="divTableCelldata">ID</td>
                                <td class="divTableCelldata">{{data.w_id}}</td>
                            </tr>
                            <tr class="divTableRowdata" >
                                <!-- style="background-color:grey" -->
                                <td class="divTableCelldata">Worksheet Name</td>
                                <td class="divTableCelldata">{{data.worksheet_name}}</td>
                            </tr>
                            <tr class="divTableRowdata"v-for="dod in data.degreeLevelQuestions" >
                                <!-- style="background-color:blue" -->
                                <td class="divTableCelldata">{{dod.degreeofdifficulty}}</td>
                                <td class="divTableCelldata">{{dod.total}}</td>
                            </tr>
                            <tr class="divTableRowdata" v-for="tag in data.questionsTags" >
                                <!-- v-show="tag.tagname!=null"  -->
                                <!-- style="background-color:red" -->
                                <td class="divTableCelldata" v-if="tag.tagname!=null" >{{tag.tagname}}</td>
                                <td class="divTableCelldata" v-if="tag.tagname==null" >General</td>
                                <td class="divTableCelldata">{{tag.total}}</td>
                            </tr>
                            <tr class="divTableRowdata" style="background-color:white" >
                                <!-- style="background-color:white" -->
                                <td class="divTableCelldata"><mark>Total</mark></td>
                                <td class="divTableCelldata"><mark>{{totalquestions}}</mark></td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                    <div class="col-sm-12" style="text-align:center;" v-if="totalquestions==0">
                        <h4 style="color:red">No Data to Analyse</h4>
                    </div>
                    <br>
                </div>
                <div class="col-lg-4">
                </div>
                <div class="col-lg-4" style="padding-left:60px;" v-if="totalquestions!=0">
                    <button type="button" class="btn btn-info" v-on:click.prevent="showtree=false,showpiedonut=true,forceRerender1()">Pie Donut</button>
                    <button type="button" class="btn btn-info" v-on:click.prevent="showpiedonut=false;showtree=true,changealgo()">Treemap</button>
                </div>
                <!-- <pie-chart width="400px" height="400px"  download="data"  :data="[['STATE', 44], ['CBSE', 23],['ICSE', 33],['IB',10],['CAMBRIDGE',5]]"></pie-chart> -->
                <!-- <pie-chart 
                    v-if="pietaganalysisdata.length!=0"
                    style="align:center"
                    id="pietag" width="500px" height="500px"  
                    download="data1"  
                    :data="pietaganalysisdata" 
                    :key="componentKey1"></pie-chart> -->
                <vue-highcharts 
                    v-if="pietaganalysisdata.series[0].data.length!=0"
                    :options="pietaganalysisdata" 
                    ref="pieChart" 
                    v-show="showpiedonut"
                    :key="componentKey1"></vue-highcharts>
                <highcharts
                    :options="treetaganalysisdata"
                    v-show="showtree"
                    v-if="treetaganalysisdata.series[0].data.length!=0"
                    :key="componentKey3"
                ></highcharts>
                <!-- <pie-chart v-if="pieanalysisdata.length!=0" id="piedod" width="500px" height="500px"  download="data"  :data="pieanalysisdata" :key="componentKey2"></pie-chart> -->
                <vue-highcharts v-if="pieanalysisdata.series[0].data.length!=0" :options="pieanalysisdata" ref="pieChart" :key="componentKey2"></vue-highcharts>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <!-- <button type="button" id="submit" @click="saveWorkSheetDetails(workSheetIndex,worksheetObj.id)" class="btn btn-primary">Save</button> -->
                </div>
            </div>
        </div>
    </div>    
    <!-- worksheet Analyse pop up end-->
    <!-- worksheet pop up start-->
    <div class="modal fade"  data-keyboard="false" data-backdrop="static" id="worksheetPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h4>Worksheet details</h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
                </div>
                <div class="modal-body">

                    <div class="worksheetDetails">
                         <!-- v-bind:style="{ height: computedHeight }" -->
                    <!-- <div class="worksheetDetails" :style="`height:${computedHeight}`"> -->
                        <input type="text" class="form-control popUpEle" placeholder="Enter worksheet name" v-model="worksheetObj.worksheetName" name="">
                        <br>
                        <select v-model="worksheetObj.gradeVal" class="form-control popUpEle">
                            <option value="">-- Select Grade --</option>
                            <option v-for="grade in listOfGrades" v-bind:value="grade.id">{{grade.gradename}}</option>
                        </select>
                        <br>
                        <select v-model="worksheetObj.subjectVal" class="form-control popUpEle">
                            <option value="">-- Select subject --</option>
                            <option v-for="subject in listOfSubjects" v-bind:value="subject.id">{{subject.subjectname}}</option>
                        </select>
                        <br>
                        <select v-model="worksheetObj.degreeofdifficultyid" class="form-control popUpEle">
                            <option value="">-- Select degree of difficulty --</option>
                            <option v-for="subject in degreeOfDifficultyList" v-bind:value="subject.id">{{subject.degreeofdifficulty}}</option>
                        </select>
                        <br>
                        <select v-model="worksheet_type" class="form-control popUpEle">
                            <option value="">-- Select Worksheet Type --</option>
                            <option v-for="type in worksheetTypes" :value="type.id">{{type.text}}</option>
                        </select>
                        <br> 
                        <select v-model="purpose" class="form-control popUpEle">
                            <option value="">-- Select Worksheet Purpose --</option>
                            <option v-for="purpose in worksheetPurpose" :value="purpose.id">{{purpose.text}}</option>
                        </select>
                        <br> 
                        <select v-if="this.update == false" class="form-control popUpEle">
                            <option :value="worksheetObj.statusVal = 2">DRAFT</option>
                        </select>
                        <select v-if="this.update == true" v-model="worksheetObj.statusVal" class="form-control popUpEle">
                            <option v-for="status in listOfStatus" v-bind:value="status.id">{{status.status}}</option>
                        </select>
                        <br>   
                        <textarea v-model="description" placeholder="Enter Description(optional)"  > </textarea>
                        <br><br>
                    

                        <div class="form-group" v-for="(input,k) in tags" :key="k">
                            <label class="col-sm-1 control-label" style="width:16.3% !important;margin-top: 6px;">Tags :</label>
                            <div class="col-md-10 reset-padding reset-margin" style="width:25%">
                                <autocompleteformulvalues
                                    :suggestions="dataforautocomplete1" 
                                    :selection="input" 
                                    v-on:update="datafromautocommul($event,k)"
                                    :key="componentKey"
                                    >
                                </autocompleteformulvalues>
                            </div>
                            <span class="col-sm-1 control-label" style="width:50% !important;padding-left:150px;">
                                <i class="fa fa-minus-circle" style="color:red;padding-top:9px;padding-right:10px" @click="remove(k)" v-show="k || ( !k && tags.length > 1)"></i>
                                <i class="fa fa-plus-circle" @click="add(k)" style="color:green;padding-top:9px;padding-left:10px" v-show="k == tags.length-1"></i>
                            </span> 
                            <br><br>
                        </div>             
                        <!-- {{tags}} -->
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" id="submit" @click="saveWorkSheetDetails(workSheetIndex,worksheetObj.id)" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- worksheet pop up end-->
    <!-- worksheet assign pop up start-->
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="worksheetAssignPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h4>Worksheet details</h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
                </div>
                <div class="modal-body">

                    <div class="worksheetDetails">
                       <!-- {{mysubjects}} -->
                        <select v-model="mysubjectdetails" class="form-control popUpEle" @change="assignsubjectdetails();getStudentsOfGrade();">
                            <option value="">-- Select MySubject --</option>
                            <option v-for="mysubject in mysubjects" v-bind:value="mysubject">{{mysubject.gradename+'-'+mysubject.sectionname+'-'+mysubject.subjectname+'-'+mysubject.syllabustype}}</option>
                        </select>
                        <br>
                        <!-- <select v-model="assignedWorksheet.gradeVal" class="form-control popUpEle" @change="selectGrade(assignedWorksheet.gradeVal);">
                            <option value="">-- Select Grade --</option>
                            <option v-for="grade in listOfGrades" v-bind:value="grade.id">{{grade.gradename}}</option>
                        </select>
                        <br>
                        <select v-model="assignedWorksheet.classroomid" class="form-control popUpEle">
                            <option value="">-- Select section --</option>
                            <option v-for="section in sectionsList"  v-bind:value="section.id">Section - {{section.sectionname}}</option>
                        </select>
                        <br>
                        <select v-model="assignedWorksheet.subjectid" class="form-control popUpEle">
                            <option value="">-- Select subject --</option>
                            <option v-for="subject in listOfSubjects" v-bind:value="subject.id">{{subject.subjectname}}</option>
                        </select>
                        <br> -->
                         <date-picker v-model="assignedWorksheet.startdate" placeholder="Select start Date"
                      :format="DatePickerFormat" :disabledDates="disabledDates" style="width:200px"  class="vdp-datepicker" lang="en"></date-picker>
                        <br>   
                         <date-picker placeholder="Select end Date"
                      :format="DatePickerFormat" v-model="assignedWorksheet.enddate" :disabledDates="disabledDates" class="vdp-datepicker" lang="en"></date-picker>
                        <br>  
                         <input type="text" class="form-control popUpEle" v-model="totalmarks">
                        <br> 
                        <input type="checkbox" v-model="checked" /><label>Time Based</label><br>
                        <input v-if="checked" type="number" v-model.number="time" placeholder="time in minutes"/><br>
                        <input type="radio" value="1" style="float: left" v-model="studentselection" /><label> Select All Students</label><br><br>
                        <input type="radio" value="2" v-model="studentselection" /><label>Select List Of Students </label><br><br><br>
                        <div v-if="studentselection == 2" class="col-md-8 ">
                            <multiselect v-model="checkedStudents" :options="studentnames" :multiple="true" ></multiselect>
                        </div>
                    </div>

                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" id="submit" @click="assignWorkSheet()" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    <!-- worksheet pop up end-->

          <!-- Conformation pop up for worksheet Change start-->
      <div
        class="modal fade"
        data-keyboard="false"
        data-backdrop="static"
        id="worksheetStatusPopUp"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" style="height:200px;width:500px;!important;">
          <div class="modal-content">
            <div class="modal-header">
              <div>
                <h4>Confirm</h4>
              </div>
            </div>
            <div class="modal-body">
              <div>
                <h5>Are you sure you want to Change Status from {{status_id == 0 ? "Active" : "InActive"}} to {{status_id == 0 ? "InActive" : "Active"}} </h5>
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
                @click="editWorksheetStatus()"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- worksheet pop up end-->
</div>

</template>
<style scoped>
.reset-padding {
  padding: 0;
}

.reset-margin {
  margin: 0;
}

.col-sm-1{
  max-width: 100%;
}

.studentstable {
  width: 100%;
  padding-top: 1%;
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
  border-radius: 0px
}

.newstudent:hover {
  color: white;
}

.search-btn {
  background-color: #039be5;
}

.btn {
  border-radius: 0px;
  color: #fff
}

.gradeFilter{
  float:left;
  width:10%
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
  color: black
}

.popUpEle {
  width: 250px;
}

.btnAsLink {
  background: none;
  border: none;
  color: blue;
}

.worksheetDetails  {
  margin: auto;
  width: 500px;
  height: 500px;
}

.modal-body {
    height: 550px;
    overflow-y: auto;
    overflow-x: hidden;
}

mark {
    background-color:gold;
    color:black;
}

.modal-dialog {
    width: 600px;
}

.modal-dialog1 {
    width: 1000px;
    margin: 30px auto;
}

#analysePOpUp {
  height: 600px !important;
}

.showAlertDiv {
  margin-top: -42px;
  height: 42px;
  margin-left: 152px;
  width: 276px;
}
.assign-button,.analyse-button {
    background-color: #0b366f;
    background-image: none;
    border-color: #0b366f;
    color: white;
    padding: 5px 30px;
    margin-top: 0px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 3px
}


</style>


<script>
import Multiselect from 'vue-multiselect';
import EventBus from '../../../event-bus.js'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import UserService from '../../../services/userService.js';
import store from '../../../store.js'
import DatePicker from 'vuejs-datepicker';
import Vue from 'vue';
import _ from 'lodash';
import autocomplete from '../classrooms/subjects/autocomplete_template'
import autocompleteformulvalues from '../classrooms/subjects/autocompleteforforms_template'
import VueHighcharts from "vue2-highcharts";
import Highcharts from "highcharts";

export default {
    components: { DatePicker, Multiselect,
        'autocomplete': autocomplete,
        'autocompleteformulvalues': autocompleteformulvalues,
        VueHighcharts,
        // Highcharts,
    },
    data() {
        return {
            worksheetDetailsHeight: 500,
            worksheetDetailsHeightpx: "500px",
            w_id:null,
            status_id:null,
            description:'',
            totalmarks:0,
            worksheetTypes:[
                {
                    id: 1,
                    text: "QUESTION"
                },
                {
                    id: 2,
                    text: "DOCUMENT"
                }
            ],
            worksheetPurpose:[
                {
                    id: 1,
                    text: "REGULAR"
                },
                {
                    id: 2,
                    text: "ONLINE_EXAM"
                },
                {
                    id: 3,
                    text: "COMPREHENSION"
                }
            ],
            searchtagname:"",
            listoftags:{},
            typevalue:-1,
            emitvalue:"datafromautotocom",
            emitvaluedynamic:"datafromautotocomdynamic",
            placeholderforauto:"Search or add a tag",
            studentnames:[],
            filterPlaceholder: 'Search countries',
            multiMode: 'CheckBox',
            checkedStudents:[],
            studentselection:0,
            classroomStudents:[],
            time:0,
            checked: false,
            update: false,
            open: 'show',
            close: 'hide',
            worksheetName: '',
            showAlert: false,
            gradeVal: '',
            sectionVal: '',
            subjectVal: '',
            alertClass: "",
            listOfGrades: [],
            listOfSections: [],
            listOfTeachers: [],
            listOfStatus: [],
            degreeOfDifficultyList: [],
            listOfSubjects: [],
            QuestionTypeValue: "",
            listOfWorksheets: [],
            worksheetObj: {},
            workSheetIndex: '',
            id: 0,
            pageNumber: 0,
            size: 10,
            search: '',
            searchOwner:0,
            tenantId: this.$cookie.get('id'),
            subjectType:'subject',
            gradeType:'grade',
            statusType:'status',
            degreeType:'degreeofdifficulty',
            academicYearObj :this.$store.state.acdemicyearandboard,
            academicDetails: {},
            searchDifficaulty:0,
            searchSubjectId:0,
            searchGradeId:0,
            searchStatusId:2,
            searchWorksheetTypeId:0,
            searchWorksheetPurposeId:0,
            userDetails:this.$store.state.userDetails,
            sectionsListCopy:[],
            sectionsList:[],
            alertMessage:'',
            userRole: this.$cookie.get('userrole'),
            userName: this.$cookie.get('username'),
            assignedWorksheet:{},
             model: {
          date: ''
        }, 
        DatePickerFormat: 'dd/MM/yyyy',
        disabledDates: {
          to: new Date(Date.now() - 8640000)
        },
        mysubjects:[],
        userId:{
            id:this.$cookie.get('userid')
        },
        mysubjectdetails:{},
        tags: [
            {
                tagname: ""
            }
        ],
        worksheet_type:1,
        purpose:1,
        componentKey: 0,
        componentKey1: 1000,
        componentKey2: 1010,
        componentKey3: 1020,
        componentKey4: 2021,
        dataforautocomplete:[],
        dataforautocomplete1:[],
        tagsformultiselect:[],
        tagids:[],
        listoftags:{},
        analysisdata:{},
        dodanalysisdata:[],
        tagsanalysisdata:[],
        pieanalysisdata:{
            chart: {
                type: "pie",
                options3d: {
                    enabled: true,
                    alpha: 45
                }
            },
            title: {
                text: "Degree of difficulty Analysis"
            },
            subtitle: {
                text: "3D Pie in Highcharts"
            },
            plotOptions: {
                // pie: {
                //     innerSize: 100,
                //     depth: 45
                //     }
            },
            series: [
                {
                    name: "No of Questions",
                    data: []
                }
            ]
        },
        pietaganalysisdata:{
            chart: {
                type: "pie",
                options3d: {
                    enabled: true,
                    alpha: 45
                }
            },
            title: {
                text: "Tag Analysis"
            },
            subtitle: {
                text: "3D donut in Highcharts"
            },
            plotOptions: {
                pie: {
                    innerSize: 100,
                    depth: 45
                    }
            },
            series: [
                {
                    name: "No of Questions",
                    data: []
                }
            ]
        },
        treetaganalysisdata: {
            // colorAxis: {
            //     minColor: '#FFFFFF',
            //     maxColor: Highcharts.getOptions().colors[0]
            // },
            series: [{
                type: 'treemap',
                // layoutAlgorithm: 'squarified',
                layoutAlgorithm: 'stripes',
                // dataLabels: {
                //     enabled: true,
                //     color: '#000000'
                // },
                data: [
                // {
                // name: 'A',
                // value: 6,
                // colorValue: 1
                // }, {
                // name: 'B',
                // value: 6,
                // colorValue: 2
                // }, {
                // name: 'C',
                // value: 4,
                // colorValue: 3
                // }, {
                // name: 'D',
                // value: 3,
                // colorValue: 4
                // }, {
                // name: 'E',
                // value: 2,
                // colorValue: 5
                // }, {
                // name: 'F',
                // value: 2,
                // colorValue: 6
                // }, {
                // name: 'G',
                // value: 1,
                // colorValue: 7
                // }
                ]
            }],
            title: {
                text: 'Treemap Tag Analysis'
            }
        },
        publish:{0:'publish', 1:'published'},
        showpiedonut:true,
        showtree:false,
        totalquestions:0,
        }
    },
    created() {
        this.reload();

        this.academicYearObj  = this.$store.state.acdemicyearandboard;
         this.academicDetails= {
                academicyearid : this.academicYearObj.academicyearid,
                syllabustype : this.academicYearObj.syllabustype
            }
           
        UserService.ClassroomGrades(this.academicDetails.syllabustype, this.tenantId).then((response) => {
            this.listOfGrades = response.data;
        })
        UserService.getDegreeOfDifficulties(this.tenantId).then((response)=>{
           this.degreeOfDifficultyList=response.data.resultsMap.degreeOfDifficulties; 
        })
        UserService.getWorksheetStatuses(this.tenantId).then((response)=>{
           this.listOfStatus=response.data.resultsMap.wsStatuses; 
        })
        UserService.MySubjects(this.userId,this.tenantId).then((response)=>{
                console.log(response.data);
                this.mysubjects=response.data;
        })
        UserService.getTagsListWithId(this.tenantId).then((response) => {
            console.log(response.data);
            this.listoftags = response.data;
            this.dataforautocomplete=_.map(this.listoftags,function(tag){return tag.tagname;}) ;
            this.dataforautocomplete1 = response.data;
            console.log(this.dataforautocomplete)
        })
        UserService.GetTeachers(this.tenantId).then((response)=>{
            this.listOfTeachers = response.data;
            console.log(response.data);
        })
       
        // this.getSectionsList();
        this.getOnloadEntitiesData();
    },
    methods: {
            reload() {
      this.$forceUpdate();
    },
        ...mapMutations([
            'SET_SELETECTED_WORKSHEET'
        ]),

        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        getListOfWorksheetsByTags: function(){
            let obj = {
                tagids: this.tagids
            }
            UserService.getListOfWorksheetsByTags(obj, this.tenantId).then((response)=>{
                this.listOfWorksheets = [];
                let length = response.data.resultsMap.worksheets.length;
                this.pageNumber=0;
                for (let i = 0; i < length; i++) {
                    let worksheetObject = {
                        id: response.data.resultsMap.worksheets[i].w_id,
                        worksheetName: response.data.resultsMap.worksheets[i].worksheet_name,
                        gradeVal: response.data.resultsMap.worksheets[i].gradeid,
                        subjectVal: response.data.resultsMap.worksheets[i].subjectid,
                        statusVal: response.data.resultsMap.worksheets[i].status_id,
                        worksheet_type:response.data.resultsMap.worksheets[i].worksheet_type,
                        purpose:response.data.resultsMap.worksheets[i].purpose,
                        description: response.data.resultsMap.worksheets[i].description,
                        worksheet_path: 'temp',
                        createdby: response.data.resultsMap.worksheets[i].createdby,
                        degreeofdifficultyid:response.data.resultsMap.worksheets[i].degreeofdifficultyid,
                        grade: this.getNameFromVal(response.data.resultsMap.worksheets[i].gradeid, this.listOfGrades,this.gradeType),
                        subject: this.getNameFromVal(response.data.resultsMap.worksheets[i].subjectid, this.listOfSubjects,this.subjectType),
                        status: this.getNameFromVal(response.data.resultsMap.worksheets[i].status_id, this.listOfStatus,this.statusType),
                        tags: response.data.resultsMap.worksheets[i].tags
                    }
                    this.listOfWorksheets.push(worksheetObject);
                }
            })
        },
        addTag: function(newtag, id) {
            console.log(newtag, id, typeof(newtag.id), typeof(this.tenantId));
            this.tagids.push(newtag.id);
            this.getListOfWorksheetsByTags();
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
                this.getListOfWorksheetsByTags();
            } else {
                this.getListOfWorksheets();
            }
        },
        getRandomColor: function() {
            var letters = '0123456789ABCDEF';
            var color = '#';
            for (var i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        changealgo: function(){
            if(this.treetaganalysisdata.series[0].layoutAlgorithm == "squarified"){
                this.treetaganalysisdata.series[0].layoutAlgorithm = "stripes";
            } else {
                this.treetaganalysisdata.series[0].layoutAlgorithm = "squarified";
                // this.treetaganalysisdata.series[0].layoutAlgorithm = "sliceAndDice";
            }
            console.log(this.treetaganalysisdata.series[0].layoutAlgorithm);
            this.forceRerender1();
        },
        analyseWorksheet: function(worksheetid){
            console.log(worksheetid);
            this.showpiedonut = true;
            this.showtree = false;
            this.popUp('analysePOpUp', this.open);
            UserService.getWorksheetDesignAnalyse(worksheetid, this.tenantId).then((response)=>{
                console.log(response.data);
                this.analysisdata = response.data.resultsMap.WorksheetAnalyse; 
                this.dodanalysisdata = response.data.resultsMap.WorksheetAnalyse[0].degreeLevelQuestions; 
                this.tagsanalysisdata = response.data.resultsMap.WorksheetAnalyse[0].questionsTags; 
                this.totalquestions = 0;
                // this.pieanalysisdata = [];
                this.pieanalysisdata.series[0].data = [];
                // this.pietaganalysisdata = [];
                this.pietaganalysisdata.series[0].data = [];
                this.treetaganalysisdata.series[0].data = [];
                // var person = [];
                // person["firstName"] = "John";
                // person["lastName"] = "Doe";
                // person["age"] = 46; 
                // console.log(person)
                for(let i=0;i<this.dodanalysisdata.length;i++){
                    this.totalquestions += this.dodanalysisdata[i].total;
                    // this.pieanalysisdata[i] = [];
                    this.pieanalysisdata.series[0].data[i] = [];
                    this.pieanalysisdata.series[0].data[i][0] = this.dodanalysisdata[i].degreeofdifficulty;
                    this.pieanalysisdata.series[0].data[i][1] = this.dodanalysisdata[i].total;
                }
                for(let j=0;j<this.tagsanalysisdata.length;j++){
                    if(this.tagsanalysisdata[j].tagname!=null && this.tagsanalysisdata[j].tagname!=""){
                        // console.log(this.tagsanalysisdata[j].tagname, this.tagsanalysisdata[j].total);
                        // console.log(this.pietaganalysisdata);
                        this.pietaganalysisdata.series[0].data[j] = [];
                        this.pietaganalysisdata.series[0].data[j][0] = this.tagsanalysisdata[j].tagname;
                        this.pietaganalysisdata.series[0].data[j][1] = this.tagsanalysisdata[j].total;
                        this.treetaganalysisdata.series[0].data[j] = {};
                        this.treetaganalysisdata.series[0].data[j].name = this.tagsanalysisdata[j].tagname;
                        this.treetaganalysisdata.series[0].data[j].value = this.tagsanalysisdata[j].total;
                        // this.treetaganalysisdata.series[0].data[j].colorValue = j+1;
                        this.treetaganalysisdata.series[0].data[j].color = this.getRandomColor();
                        // k += 1;
                    } else {
                        this.pietaganalysisdata.series[0].data[j] = [];
                        this.treetaganalysisdata.series[0].data[j] = {};
                        this.pietaganalysisdata.series[0].data[j][0] = "General";
                        // console.log(this.tagsanalysisdata[j].tagname, this.tagsanalysisdata[j].total);
                        // console.log(this.pietaganalysisdata[j].tagname, this.tagsanalysisdata[j].total);
                        this.pietaganalysisdata.series[0].data[j][1] = this.tagsanalysisdata[j].total;
                        // console.log(this.pietaganalysisdata[j].total);
                        this.treetaganalysisdata.series[0].data[j] = {};
                        this.treetaganalysisdata.series[0].data[j].name = "General";
                        this.treetaganalysisdata.series[0].data[j].value = this.tagsanalysisdata[j].total;
                        // this.treetaganalysisdata.series[0].data[j].colorValue = j+1;
                        this.treetaganalysisdata.series[0].data[j].color = this.getRandomColor();
                    }
                }
                console.log(this.analysisdata);
                console.log(this.pieanalysisdata);
                console.log(this.pietaganalysisdata);
                this.forceRerender1();
            })
        },
        datafromautotocom: function(selection){
            this.searchtagname = selection.tagname;
            console.log(selection);
            UserService.getListOfWorksheetsByTagId(selection.id, this.tenantId).then((response)=>{
                this.listOfWorksheets = [];
                let length = response.data.resultsMap.worksheets.length;
                this.pageNumber=0;
                for (let i = 0; i < length; i++) {
                    let worksheetObject = {
                        id: response.data.resultsMap.worksheets[i].w_id,
                        worksheetName: response.data.resultsMap.worksheets[i].worksheet_name,
                        gradeVal: response.data.resultsMap.worksheets[i].gradeid,
                        subjectVal: response.data.resultsMap.worksheets[i].subjectid,
                        statusVal: response.data.resultsMap.worksheets[i].status_id,
                        worksheet_type:response.data.resultsMap.worksheets[i].worksheet_type,
                        purpose:response.data.resultsMap.worksheets[i].purpose,
                        description: response.data.resultsMap.worksheets[i].description,
                        worksheet_path: 'temp',
                        createdby: response.data.resultsMap.worksheets[i].createdby,
                        degreeofdifficultyid:response.data.resultsMap.worksheets[i].degreeofdifficultyid,
                        grade: this.getNameFromVal(response.data.resultsMap.worksheets[i].gradeid, this.listOfGrades,this.gradeType),
                        subject: this.getNameFromVal(response.data.resultsMap.worksheets[i].subjectid, this.listOfSubjects,this.subjectType),
                        status: this.getNameFromVal(response.data.resultsMap.worksheets[i].status_id, this.listOfStatus,this.statusType),
                        tags: response.data.resultsMap.worksheets[i].tags
                        // id: response.data[i].w_id,
                        // worksheetName: response.data[i].worksheet_name,
                        // gradeVal: response.data[i].gradeid,
                        // subjectVal: response.data[i].subjectid,
                        // statusVal: response.data[i].status_id,
                        // worksheet_path: 'temp',
                        // createdby: "Harish",
                        // degreeofdifficultyid:response.data[i].degreeofdifficultyid,
                        // grade: this.getNameFromVal(response.data[i].gradeid, this.listOfGrades,this.gradeType),
                        // subject: this.getNameFromVal(response.data[i].subjectid, this.listOfSubjects,this.subjectType),
                        // status: this.getNameFromVal(response.data[i].status_id, this.listOfStatus,this.statusType),
                        // tags: response.data[i].tags
                    }
                     this.listOfWorksheets.push(worksheetObject);
                }
            })
            // UserService.getListOfWorksheets(selection, this.tenantId).then((response)=>{
            //     this.libraryQuestions = [];
            //     this.pageNumber=0;
            //     console.log(response.data);
            //     let length = response.data.length;
            //     let questionsData = response.data;
            //     console.log(length);
            //     if (length > 0) {
            //         for (let i = 0; i < length; i++) {
            //             this.libraryQuestions.push(this.prepareQuestionObj(questionsData[i]));
            //         }
            //     }
            //     console.log(this.libraryQuestions)
            // }).catch(error=>{
                
            // })
        },
        datafromautotocomdynamic: function(selection){
            this.searchtagname = selection;
            console.log(selection);
        },
        datafromautocommul: function(event, k) {
            console.log(event);
            this.tags[k].id = event.id;
            this.tags[k].tagname = event.tagname;
            // this.forceRerender();
        },
        forceRerender() {
          this.componentKey += 1;
        },
        forceRerender1() {
          this.componentKey1 += 1;
          this.componentKey2 += 1;
          this.componentKey3 += 1;
        },
        forceRerender2() {
          this.componentKey4 += 1;
        },
        add(index) {
            this.tags.push({ id:0,tagname: "" });
            // this.changeheight();
        },
        remove(index) {
            this.tags.splice(index, 1);
            this.forceRerender();
            // this.changeheightdown();
        },
        getNameFromVal: function(id, list,type) {
            let length = list && list.length;
            if (length > 0) {
                for (let i = 0; i < length; i++) {
                    
                      if(type ==this.subjectType){
                            if (id == list[i].id) {
                            return list[i].subjectname;
                        }
                      }else if(type ==this.gradeType ){
                            if (id == list[i].id) {
                            return list[i].gradename;
                        }
                      }else if(type ==this.statusType){
                          if (id == list[i].id) {
                        return list[i].status;
                          }
                      } else if(type ==this.degreeType){
                        if (id == list[i].id) {
                          return list[i].degreeofdifficulty;
                        }
                      }
                    
                }
            }
            return '';
        },
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
DialoguePopUp: function (id, action, w_id , status_id) {
    this.w_id=w_id;
    this.status_id=status_id;
    console.log(this.status_id)
      console.log("#" + id);
      $("#" + id).modal(action);
    },
        eachworksheet: function(worksheet) {
            this.worksheet = worksheet;
            this.SET_SELETECTED_WORKSHEET(worksheet);
            this.$router.push({
                path: 'add-questions'
            })
        },

        createWorksheetObj: function() {
            this.worksheetObj = {
                worksheetName: '',
                gradeVal: '',
                sectionVal: '',
                subjectVal: '',
                grade: '',
                subject: '',
                status: '',
                statusVal: '',
                degreeofdifficultyid:'',
                worksheet_type:'',
                purpose:'',
                description:'',

            };
            this.tags = [{id:0,tagname: ""}];
            this.forceRerender();
            this.worksheetDetailsHeight = 500;
            this.worksheetDetailsHeightpx = "500px";

        },

        assignsubjectdetails:function(){
            this.assignedWorksheet.gradeVal = this.mysubjectdetails.gradeid;
            this.assignedWorksheet.classroomid = this.mysubjectdetails.id;
            this.assignedWorksheet.subjectid = this.mysubjectdetails.subjectid

        },

        assignWorkSheet:function(){
            //this.assignedWorksheet.w_id = 1;
            this.assignedWorksheet.statusid = 2;
            this.assignedWorksheet.gradeid  = this.assignedWorksheet.gradeVal;
            this.assignedWorksheet.assignedby = this.userDetails.username;
            this.assignedWorksheet.assigneddate = new Date();
            this.assignedWorksheet.studentids = [];
            this.assignedWorksheet.max_marks = this.totalmarks;
            let max_marks = this.totalmarks; 
            console.log("Marks executed and marks is : " + max_marks)
            if(max_marks === undefined || max_marks < 1 || max_marks === null){
                alert("Please Enter Valid Marks");
                return ;
            }
            if(this.studentselection == 2){
            for(let i=0; i<this.checkedStudents.length; i++){
                for(let j=0; j<this.classroomStudents.length; j++){
                    if(this.checkedStudents[i] == this.classroomStudents[j].name){
                        this.assignedWorksheet.studentids.push(this.classroomStudents[j].id);
                    }
                }
            }
            }else if(this.studentselection == 1){
               this.assignedWorksheet.studentids = _.map(this.classroomStudents,function(student){
                   return student.id;
               }) 
            }else{
                alert("Please Select Atleast One Student");
                return;
            }
            if(this.checked == true){
                if(this.time > 0){
                    this.assignedWorksheet.timebased = 1;
                    this.assignedWorksheet.timeinminutes = this.time;
                }else{
                    alert("Time Should Not Be Negative Number")
                    return ;
                }
            }else{
                this.assignedWorksheet.timebased = 0;
                this.assignedWorksheet.timeinminutes = this.time;
            }

            console.log(JSON.stringify(this.assignedWorksheet));
            if(_.isEmpty(this.assignedWorksheet.studentids)){
                alert("Select Atleast One Student");
                return ;
            }

             UserService.assignWorkSheet(this.assignedWorksheet,this.tenantId).then((response)=>{
                    this.sectionsList=[];
                    this.sectionsListCopy = response.data;
                    this.alertMessage = "Successfully Assigned worksheet .....";
                    this.alertClass = 'alert-success';
                    this.setAlertMessage('success');
                    
                }).catch(error =>{
                    console.log(JSON.stringify(error.data))
                     this.alertMessage = "You must enter all data.....";
                     this.alertClass = 'alert-danger';
                     this.setAlertMessage('fail');
                })

        },
        // getSectionsList : function(){
        //         UserService.Sections(this.academicYearObj,this.tenantId).then((response)=>{
        //             this.sectionsList=[];
        //             this.sectionsListCopy = response.data;
        //             console.log("Sections = "+JSON.stringify(this.sectionsListCopy));
        //         }).catch(error =>{
        //             console.log(JSON.stringify(error.data))
        //         })
        //     },

        // selectGrade: function(gradeId) {
        //     this.sectionsList = [];
        //     let length = this.sectionsListCopy.length;
        //     for (let i = 0; i < length; i++) {
        //         if (gradeId == this.sectionsListCopy[i].gradeid) {
        //             this.sectionsList.push(this.sectionsListCopy[i]);
        //         }
        //     }
            
        // },
        getStudentsOfGrade : function(){
            console.log(JSON.stringify(this.assignedWorksheet))
                let obj = {
                    classroomid:this.assignedWorksheet.classroomid,
                    gradeid:this.assignedWorksheet.gradeVal
                }
                if(obj){
                UserService.SectionDetails(obj,this.tenantId).then((response)=>{
                    this.classroomStudents= response.data.studentsOfClassRoom;
                    this.studentnames = _.map(this.classroomStudents, function(data){ return data.name})
                })
              }else{
                  alert("Select Grade and Section")
                  return;
              }
            },
        editWorksheetDetails: function(worksheet, index) {
            this.update = true;
            this.workSheetIndex = index;
            this.worksheetObj = {};
            this.worksheetObj = JSON.parse(JSON.stringify(worksheet));
            this.purpose = worksheet.purpose;
            this.worksheet_type = worksheet.worksheet_type;
            this.description = worksheet.description;
            console.log(worksheet);
            if(worksheet.tags != null){
                this.tags = worksheet.tags;
                this.forceRerender();
            } else{
                this.tags = [{id:0,tagname: ""}];
                this.forceRerender();
            }

            this.popUp('worksheetPopUp', this.open);
        },
        editWorksheetStatus: function(){
            
            UserService.editWorksheetStatus(this.tenantId,this.w_id,this.status_id).then((response) => {
                this.getOnloadEntitiesData();
            })
        },
        createWSAssignObj: async function(worksheet){
            console.log("First");
            this.assignedWorksheet.w_id = worksheet.id;
            await UserService.getMaxMarks(this.tenantId,worksheet.id).then((response) => {
                this.totalmarks = response.data.totalmarks;
                console.log("Second")
            });
            console.log("Third");
        },

        getOnloadEntitiesData:function(){
          UserService.Subjects(this.tenantId).then((response) =>{
            this.listOfSubjects =response.data;
            this.getListOfWorksheets();
          }).catch(error =>{
            console.log(JSON.stringify(response.data))
          })
          
        },
        getListOfWorksheets: function() {
            UserService.getListOfWorksheets(this.tenantId).then((response) => {
                this.listOfWorksheets = [];
                let length = response.data.length;
                for (let i = 0; i < length; i++) {
                    let worksheetObject = {
                        id: response.data[i].w_id,
                        worksheetName: response.data[i].worksheet_name,
                        gradeVal: response.data[i].gradeid,
                        subjectVal: response.data[i].subjectid,
                        statusVal: response.data[i].status_id,
                        worksheet_type:response.data[i].worksheet_type,
                        purpose:response.data[i].purpose,
                        description: response.data[i].description,
                        worksheet_path: 'temp',
                        createdby:response.data[i].createdby,
                        publish:response.data[i].publish,
                        degreeofdifficultyid:response.data[i].degreeofdifficultyid,
                        grade: this.getNameFromVal(response.data[i].gradeid, this.listOfGrades,this.gradeType),
                        subject: this.getNameFromVal(response.data[i].subjectid, this.listOfSubjects,this.subjectType),
                        status: this.getNameFromVal(response.data[i].status_id, this.listOfStatus,this.statusType),
                        tags: response.data[i].tags
                    }

                     this.listOfWorksheets.push(worksheetObject);
                     console.log("List Of Worksheet : "+JSON.stringify(this.listOfWorksheets))
                }
            })
        },
        saveWorkSheetDetails: function(index, id) {
            if (this.validateFields()) {
                this.searchtagname = "";
                this.forceRerender2();
                for(let i=0;i<this.tags.length;i++){
                    //   console.log(i,this.tags,this.tags[i].tagname.trim().length);
                    if(this.tags[i].tagname.trim()==""){
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
                    //   console.log(this.tags);
                }
                console.log(this.tags);
                let worksheetObject = {
                    w_id:this.worksheetObj.id,
                    worksheet_name: this.worksheetObj.worksheetName,
                    gradeid: this.worksheetObj.gradeVal,
                    subjectid: this.worksheetObj.subjectVal,
                    status_id: this.worksheetObj.statusVal,
                    worksheet_type: this.worksheet_type,
                    purpose: this.purpose,
                    description: this.description,
                    worksheet_path: 'temp',
                    createdby: this.userDetails.username,
                    degreeofdifficultyid:this.worksheetObj.degreeofdifficultyid,
                    publish: this.purpose == 2 ? 0:1,
                    frompage:1,
                    topage:2,
                    tags:this.tags
                    // tags:_.map(this.tags,function(tag){
                    //     let tagname=tag.tagname;
                    //     if(tagname!=""){
                    //         return {tagname}
                    //     }
                    // }) 
                }

                //this.listOfWorksheets.push(worksheetObject);
                if (!this.worksheetObj.id) {
                      UserService.newWorksheet(this.tenantId, worksheetObject).then((response) => {
                        this.getListOfWorksheets();
                        this.alertMessage = "Successfully updated worksheet .....";
                        this.alertClass = 'alert-success';
                        this.setAlertMessage('success');
                        setTimeout(() => {
                            this.SET_SELETECTED_WORKSHEET(this.listOfWorksheets.pop());
                            this.$router.push({
                                path: 'add-questions'
                            })
                        },2000);
                    }).catch(error=>{
                      console.log("Error response "+JSON.stringify(error.response))
                       this.alertMessage = "You must enter all the data .....";
                        this.alertClass = 'alert-danger';
                         this.setAlertMessage('fail');
                  })
                } else {
                    UserService.updateWorksheet(this.tenantId, worksheetObject).then((response) => {
                        if(this.tagsformultiselect.length!=0){
                            this.getListOfWorksheetsByTags();
                        } else {
                            this.getListOfWorksheets();
                        }
                        this.alertMessage = "Successfully updated worksheet .....";
                        this.alertClass = 'alert-success';
                        this.setAlertMessage('success');
                        setTimeout(() => {
                            this.SET_SELETECTED_WORKSHEET(this.worksheetObj);
                            this.$router.push({
                                path: 'add-questions'
                            })
                        },2000);
                    }).catch(error=>{
                     console.log("Error response "+JSON.stringify(error.response))
                       this.alertMessage = "You must enter all the data .....";
                        this.alertClass = 'alert-danger';
                        this.setAlertMessage('fail');
                  })
                }
            } else {
                 this.alertMessage = "You must enter all the data .....";
                        this.alertClass = 'alert-danger';
                this.setAlertMessage('fail');
                if(this.tags.length == 0){
                    this.tags = [{id:0,tagname: ""}];
                    this.forceRerender();
                }
            }
             this.update = false;
        },
        validateFields: function() {
            if(this.checkEmptyVal(this.worksheetObj.worksheetName)) {
                return false;
            }else if (this.checkEmptyVal(this.worksheetObj.gradeVal)) {
                return false;
            }else if (this.checkEmptyVal(this.worksheetObj.subjectVal)) {
                return false;
            }else if (this.worksheetObj.statusVal != 0 && (this.worksheetObj.statusVal == '' || this.worksheetObj.statusVal == undefined)) {
                return false;
            }
            return true;
        },
        checkEmptyVal: function(val) {
            if (val == '' || val == null) {
                return true;
            }
            return false;
        },
        //Shows the alert message on homepage 
        setAlertMessage: function(type) {
            this.showAlert = true;
            let thisVue = this;
            setTimeout(function() {
                thisVue.alertMessage = '';
                thisVue.alertClass = '';
                thisVue.showAlert = false;
                if (type == 'success') {
                    thisVue.popUp('worksheetPopUp', thisVue.close);
                    thisVue.popUp('worksheetAssignPopUp', thisVue.close);
                }
            }, 1500);
        },
        // changeheight: function () {
        //     this.worksheetDetailsHeight+=50;
        //     console.log(this.worksheetDetailsHeight);
        //     this.worksheetDetailsHeightpx = String(this.worksheetDetailsHeight)+"px";
        //     console.log(this.worksheetDetailsHeightpx);
        // },
        // changeheightdown: function () {
        //     this.worksheetDetailsHeight-=50;
        //     console.log(this.worksheetDetailsHeight);
        //     this.worksheetDetailsHeightpx = String(this.worksheetDetailsHeight)+"px";
        //     console.log(this.worksheetDetailsHeightpx);
        // }

        getWorkseetPurpose:function(id){
           for (const purpose of this.worksheetPurpose) {
               if(purpose.id == id)
               return purpose.text;
           }

        },

        checkPublish: function(status,publish,purpose){
            if(status === 'ACTIVE' && publish == 1 && purpose == 2){
                return 'Published';
            }else if(status === 'ACTIVE' && purpose == 1){
                return 'Published';
            }else if(status === 'DRAFT'){
                return '';
            }else{
                if(publish == null)
                return '';
            }
        },

        updatePublish: function(worksheet){
            let publish = 1;
             console.log(worksheet);
            //get data related to assign worksheet here..
            this.$confirm("Are you sure want to publish the worksheet?",'Publish','question').then(()=>{
                UserService.updatePublishStatus(this.tenantId,w_id,publish).then((response)=>{
                 this.getOnloadEntitiesData();   
                alert("Successfully published...");
            }).catch((err)=>{
                alert("Cannot be published...");
            })
            });
        }
    },
    computed: {
        pageCount() {
            let l = this.filterWorksheets.length,
                s = this.size;
            return Math.ceil(l / s);
        },

        filterWorksheets: function() {
            var self = this;
            return this.listOfWorksheets.filter(function(worksheet) {
                let filterWsName;
                let filterGrade;
                let filterSubject;
                let filterDifficulty;
                let filterStatus;
                let filterWorksheetType;
                let filterWorksheetPurpose;
                let filterOwner;

                if(!self.search){
                    filterWsName = true;
                }else{
                    filterWsName = worksheet.worksheetName.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
                }
                if(self.searchGradeId ==0){
                    filterGrade = true;
                }else{
                    // filterGrade = worksheet.gradeVal.toString().indexOf(self.searchGradeId.toString()) >= 0;
                    if(worksheet.gradeVal == self.searchGradeId){
                        filterGrade = true;
                    } else {
                        filterGrade = false;
                    }
                }
                if(self.searchSubjectId == 0){
                    filterSubject = true;
                }else{
                    // filterSubject = worksheet.subjectVal.toString().indexOf(self.searchSubjectId.toString()) >= 0;
                    if(worksheet.subjectVal == self.searchSubjectId){
                        filterSubject = true;
                    } else {
                        filterSubject = false;
                    }
                }
                if(self.searchWorksheetTypeId == 0){
                    filterWorksheetType = true;
                }else{
                    if(worksheet.worksheet_type == self.searchWorksheetTypeId){
                        filterWorksheetType = true;
                    } else {
                        filterWorksheetType = false;
                    }
                }
                if(self.searchWorksheetPurposeId == 0){
                    filterWorksheetPurpose = true;
                }else{
                    if(worksheet.purpose == self.searchWorksheetPurposeId){
                        filterWorksheetPurpose = true;
                    } else {
                        filterWorksheetPurpose = false;
                    }
                }
                if(self.searchDifficaulty == 0){
                    filterDifficulty = true;
                }else{
                    // filterDifficulty = worksheet.degreeofdifficultyid.toString().indexOf(self.searchDifficaulty.toString()) >= 0;
                    if(worksheet.degreeofdifficultyid == self.searchDifficaulty){
                        filterDifficulty = true;
                    } else {
                        filterDifficulty = false;
                    }
                }
                if(self.searchStatusId == -1){
                    filterStatus = true;
                }else{
                    // filterStatus = worksheet.statusVal.toString().indexOf(self.searchStatusId.toString()) >= 0;
                    if(worksheet.statusVal == self.searchStatusId){
                        filterStatus = true;
                    } else {
                        filterStatus = false;
                    }
                }

                if(self.searchOwner == 0){
                    filterOwner = true;
                }else{
                    filterOwner = worksheet.createdby.toLowerCase().indexOf(self.searchOwner.toLowerCase()) >= 0;
                }

                return filterWsName && filterGrade && filterSubject && filterDifficulty && filterStatus && filterWorksheetPurpose &&
                 filterWorksheetType && filterOwner;
            });
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filterWorksheets.slice(start, end);
        },
        // computedHeight: function () {
        //     return this.worksheetDetailsHeightpx;
        // }
    }


}



</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>