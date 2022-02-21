<template>
    <div >
        <div class="container">
            <div class="row">
                <div class="col-lg-12 col-sm-6 col-md-6">
                    <div class="row">
                        <div class="col-lg-10">
                            <!-- <div class="row" v-if="showAlertforpasswordresetsuccess">
                                <div class="col-sm-12">
                                    <div class="['showPopUpAlertDiv','alert','alert-success']" role="alert" >
                                        <h4 style="color:red;position: fixed; box-sizing: border-box; left: 400px; max-width: 288px; max-height: 52.8px;">{{alertMessage}}</h4>
                                    </div>
                                    <br>
                                </div>
                            </div>     -->
                            <div class="row">
                                <div class="col-sm-6">
                                    <h4><b>{{getSinglieStudent.name}}</b></h4>
                                </div>
                                 <div class="col-sm-3">
                                    <h4><b>{{getSinglieStudent.gradename}} {{getSinglieStudent.sectionname}}</b></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- {{getSinglieStudent}} -->
                    <!-- {{parentdetails}} -->
                        <div class="row">
                            <div class="col-lg-10 col-md-8">
                                <hr style="margin:5px 0 5px 0;">
                                    <div class="row">
                                        <div class="col-sm-3 col-xs-6 tital " >First Name:</div><div class="col-sm-3 col-xs-6 ">{{getSinglieStudent.name}}</div>
                                        <div class="col-sm-3 col-xs-6 tital ">Board Of Education:</div><div class="col-sm-3 col-xs-6">{{getSinglieStudent.syllabustype}}</div>
                                            <div class="clearfix"></div>
                                            <div class="bot-border"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-3 col-xs-6 tital " >Middle Name:</div><div class="col-sm-3"> {{getSinglieStudent.middlename}}</div>
                                        <div class="col-sm-3 col-xs-6 tital ">e-mail:</div><div class="col-sm-3">{{getSinglieStudent.emailid}}</div>
                                            <div class="clearfix"></div>
                                            <div class="bot-border"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-3 col-xs-6 tital " >Last Name:</div><div class="col-sm-3"> {{getSinglieStudent.lastname}}</div>
                                        <div class="col-sm-3 col-xs-6 tital " >Address:</div><div class="col-sm-3">{{getSinglieStudent.address}}</div>
                                            <div class="clearfix"></div>
                                            <div class="bot-border"></div>
                                    </div>
                                    <!-- <div class="row">
                                        <div class="col-sm-3 col-xs-6 tital " >Father Name:</div><div class="col-sm-3"> {{singlestudent.fathername}}</div>
                                            <div class="clearfix"></div>
                                            <div class="bot-border"></div>
                                    </div>
                                     <div class="row">
                                        <div class="col-sm-3 col-xs-6 tital " >Mother Name:</div><div class="col-sm-3"> {{singlestudent.mothername}}</div>
                                            <div class="clearfix"></div>
                                            <div class="bot-border"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-3 col-xs-6 tital " >Contact Number:</div><div class="col-sm-3">{{singlestudent.contactnumber}}</div>
                                             <div class="clearfix"></div>
                                            <div class="bot-border"></div>
                                    </div> -->
                                    <div class="row">
                                        <div class="col-sm-3 col-xs-6 tital " >Date Of Joining:</div><div class="col-sm-3">{{dateofjoining(getSinglieStudent.dateofjoining)}}</div>
                                        <div class="col-sm-2 col-xs-6 tital " v-if="userrole=='ADMIN'||userrole=='TEACHER'">Upload Image:</div>
                                        <div class="col-sm-4" v-if="userrole=='ADMIN'||userrole=='TEACHER'">
                                            <input ref="studentimage" name="studentimage" type="file" placeholder="Select student image" @change='onFileUpload($event)' single>
                                        </div>
                                            <div class="clearfix"></div>
                                            <div class="bot-border"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-3 col-xs-6 tital " >Date Of Birth:</div><div class="col-sm-3">{{dateofbirth(getSinglieStudent.dateofbirth)}}</div>
                                        <div class="col-sm-3" v-if="userrole=='ADMIN'||userrole=='TEACHER'"><button class='common-button pull-right' v-on:click.prevent="uploadStudentImage()">Upload</button></div>
                                             <div class="clearfix"></div>
                                            <div class="bot-border"></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-3 col-xs-6 tital " >Blood Group:</div><div class="col-sm-3">{{getSinglieStudent.bloodgroup}}</div>
                                           
                                    </div>
                                    
                            </div>
                            <div class="col-lg-2 col-md-4">
                                <img v-if="getSinglieStudent.imageurl != null" :src="getSinglieStudent.imageurl" alt="image" class="img-rounded img-responsive image" />
                                <img v-else src="http://placehold.it/380x500" alt="image" class="img-rounded img-responsive image" />
                            </div>
                        </div>
                        <hr />
                        <div class="col-md-6 col-md-offset-3 text-right">
                            <!-- <router-link to="/studentsModule/addparent" tag="button" class="common-button pull-right" style="align:right;">Add Parent
                            </router-link> -->
                            <button class='common-button pull-right' v-if="this.$cookie.get('userrole')=='ADMIN'" v-on:click="popUp('ADDPARENT',open);">Add Parent</button>
                            <!-- <button class='common-button pull-right' v-on:click="popUp('EDITPARENT',open);">Edit Parent</button> -->
                            <button class='common-button pull-right' v-if="this.$cookie.get('userrole')=='ADMIN' || this.$cookie.get('userrole')=='SUPERADMIN'" v-on:click="popUp('RESETPASSWORD',open);">Reset Password</button>
                        </div>
                        <br v-if="this.$cookie.get('userrole')=='ADMIN'">
                        <br v-if="this.$cookie.get('userrole')=='ADMIN'">



            <div class="row studentstable reset-padding reset-margin "  v-if="displayParents.length != 0">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">ID</div>
                        <div class="divTableCell">Father Name</div>
                        <div class="divTableCell">Mother Name</div>
                        <div class="divTableCell">Email</div>
                        <div class="divTableCell">Contact Number</div>
                        <div class="divTableCell">Address</div>
                        <div class="divTableCell">Inactive</div>
                        <div class="divTableCell" v-if="userrole=='ADMIN'">Edit</div>
                        <div class="divTableCell" v-if="userrole=='ADMIN'">Delete relationship</div> 
                    </div>
                    
                    <div class="divTableRowdata" v-for="parent in displayParents">
                       <div class="divTableCelldata">{{parent.id}}</div>
                        <div class="divTableCelldata">{{parent.fathername}}</div>
                        <div class="divTableCelldata">{{parent.mothername}}</div>
                        <div class="divTableCelldata">{{parent.emailid}}</div>
                        <div class="divTableCelldata">{{parent.contactnumber}}</div>
                        <div class="divTableCelldata">{{parent.address}}</div>
                        <div v-if="parent.statusid == 2" class="divTableCelldata">true</div>
                        <div v-if="parent.statusid == 1" class="divTableCelldata">false</div>
                        <div class="divTableCelldata" v-if="userrole=='ADMIN'">
                            <a data-toggle="modal" href="#EDITPARENT"  v-on:click="setParent(parent);">
                                <i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i>
                            </a>
                        </div>
                        <div class="divTableCelldata" v-if="userrole=='ADMIN'">
                            <a data-toggle="modal" href="#confirmationPopUp" v-on:click="setParent(parent);">
                                <i class="fa fa-trash" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>


        <!-- Reset Password pop start -->
                <div class="modal fade" id="RESETPASSWORD" role="dialog">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    <h4 class="modal-title">Reset Password</h4>
                            </div>
                            <!-- <div v-if="showAlertforpasswordmismatch" class="alertclass" role="alert" style="color:red; align:center">
                                <h4>{{alertMessage}}</h4>
                            </div> -->
                            <div class="modal-body">
                                <form id="form" class="form-horizontal" role="form" name="changingstudentpasswordform" >
                                    <div class="col-md-6 col-md-offset-3">
                                        <div class="left-side-form">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Password</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <input type="password" class="form-control form-input"   placeholder="password*" v-model="student.newpassword" required>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Confirm Password</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <input type="password" class="form-control form-input"   placeholder="confirmpassword*" v-model="student.newconfirmpassword"  required>                             
                                                </div>
                                            </div>
                                            <br>
                                        </div>
                                    </div>
                                            
                                    <div class="row">
                                        <div class="col-lg-6 col-lg-offset-3 text-center">
                                            <button id="btn-reset" type="reset" class="btn button"> Reset</button>
                                            <button id="btn-Register" type="button" name="resetpasswordbutton" v-on:click="checkpasswordsmatch()" class="btn button"  >Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
        <!-- Reset Password pop end -->


        <!-- confirmation pop up for reset password start  -->
        <div class="modal fade" id="confirmationPopUpforresetpassword" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:472px">
                <div class="modal-content">
                    <div class="modal-header">
                    <h4>Confirm Cancel</h4>
                    </div>
                    <div class="modal-body" style="height:75px;">
                        <p>Do you want to change password really?</p>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="submit" v-on:click.prevent="resetpassword" id="submit" class="btn btn-primary">OK</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- confirmation pop up for reset password end  -->



        <!-- Add Parent pop start -->
                        <div class="modal fade" id="ADDPARENT" role="dialog">
                            <div class="modal-dialog modal-lg">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4 class="modal-title">Add Parent</h4>
                                    </div>
                                    <div class="modal-body">
                                        <form id="form" class="form-horizontal" role="form" name="parentregistrationform" >
                                            <h4><u><b>Parent Details :</b></u></h4>
                                                <div class="col-md-6 col-md-offset-3" style="margin-top: -2%;margin-left: 18%;">
                                                <label for="chkPassport">
                                                    <input type="checkbox" id="chkPassport"  v-model="student.existingparent" v-on:change="showHide()" />
                                                    Existing parent
                                                    </label>
                                <div v-show="isVisible" style="margin-left: 34%; margin-top: -5%;">
                                    <div class="row">
                                        <div class="col-md-3 ">
                                            <label>Emailid:</label>
                                        </div>
                                        <div class="col-md-9 ">
                                            <input type="email" class="form-control form-input" placeholder="xxxxxxxxx@gmail.com" id="txtPassportNumber" name="parentemailid" v-model="student.parentemailid"/>
                                            <label>(Please enter registred emailid)</label><br>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                <br>
                                <div v-show="!isVisible">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="left-side-form">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Father Name</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="text" class="form-control form-input"  placeholder="Father Name*" v-model="student.fathername"  required>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Mother Name</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="text" class="form-control form-input"  placeholder="Mother Name*" v-model="student.mothername"  required>
                                                </div>
                                            </div>
                                            <br>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="right-side-form">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Contact Number</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="text" class="form-control form-input"   placeholder="Contact Number*" v-model="student.contactnumber" required>
                                                </div>
                                            </div>
                                            <br> 
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Address</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <textarea rows="4" cols="40" class="form-control form-input" v-model="student.parentaddress" required></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <h4><u><b>Login Details</b></u></h4>
                                <div class="row">
                                    <div class="col-md-6 col-md-offset-3">
                                        <div class="left-side-form">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Roles</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <select class="form-control form-input" >
                                                        <option value="" selected>{{student.role}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>e-mail</label>
                                                </div>
                                                <div class="col-md-8 ">
                                                    <input type="email" class="form-control form-input"  placeholder="xxxxxxxxx@yyyy.com*" v-model="student.parentemailid"  required>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Password</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <input type="password" class="form-control form-input"   placeholder="password*" v-model="student.password" required>
                                                </div>
                                            </div>
                                            <br>
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <label>Confirm Password</label>
                                                </div>
                                                <div class="col-md-8">
                                                    <input type="password" class="form-control form-input"   placeholder="confirmpassword*" v-model="student.confirmpassword"  required>                             
                                                </div>
                                            </div>
                                            <br>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" type="reset" class="btn button"> Reset</button>
                                    <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="newparent" class="btn button"  >Submit</button>
                                </div>
                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
        <!-- Add Parent pop end -->



        <!-- Edit Parent pop start -->
            <div class="modal fade" id="EDITPARENT" role="dialog">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit Student</h4>
                        </div>
                        <div class="modal-body">
                        <form name="editparentmodal">
                        <h4><u><b>Parent Details</b></u></h4>
                
                        <div ng-hide="IsVisible">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="left-side-form">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <label>Father Name</label>
                                        </div>
                                        <div class="col-md-8 ">
                                            <input type="text" class="form-control form-input" id="" name="fathername"  placeholder="Father Name*" v-model="parent.fathername" required>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <label>Mother Name</label>
                                        </div>
                                        <div class="col-md-8 ">
                                            <input type="text" class="form-control form-input" id="" name="mothername" placeholder="Mother Name*" v-model="parent.mothername"  required>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-md-12 ">
                                            <label v-if="parent.statusid == 1"><input  type="radio"  value=true v-model="parent.inactive">Inactive</label>
                                            <label v-if="parent.statusid == 2"><input   type="radio" value=false v-model="parent.inactive">Active</label>
                                        </div>
                                    </div>
                                    <br>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="right-side-form">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <label>Contact Number</label>
                                        </div>
                                        <div class="col-md-8 ">
                                            <input type="text" class="form-control form-input" id="" name="contactnumber" 
                                                placeholder="Contact Number*" v-model="parent.contactnumber"
                                                required>
                                        </div>
                                    </div>
                                    <br> 
                                    <div class="row">
                                        <div class="col-md-4">
                                            <label>Address</label>
                                        </div>
                                        <div class="col-md-8">
                                            <textarea rows="4" cols="40" name="parentaddress" class="form-control form-input" v-model="parent.address" required></textarea>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-lg-6 col-lg-offset-3 text-center">
                                <button id="btn-reset"  data-dismiss="modal" class="btn btn-info button"> Cancel</button>
                                <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="editparent()" class="btn btn-info button">Update</button>
                            </div>
                        </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        <!-- Edit Parent pop end -->


        <!-- confirmation pop up start  -->
        <div class="modal fade" id="confirmationPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="width:472px">
                <div class="modal-content">
                    <div class="modal-header">
                    <h4>Confirm Cancel</h4>
                    </div>
                    <div class="modal-body" style="height:75px;">
                        <p>Do you want delete this Student-Parent relationship?</p>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" v-on:click="deleteParentStudentRelationship(parent.id)" id="submit" class="btn btn-primary">OK</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- confirmation pop up end  -->

        <!-- worksheet Analyse pop up start-->
        <div class="modal fade"  data-keyboard="false" data-backdrop="static" id="analysePOpUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog1">
                <div class="modal-content">
                    <div class="modal-header">
                        <div>
                            <button type="button" class="close" @click="showcomponent=false" data-dismiss="modal">&times;</button>
                            <h4>Worksheet Analysis</h4>
                        </div>
                    </div>
                    <worksheetanalytics v-bind:worksheetid="worksheetid" v-bind:worksheettestid="worksheettestid" v-if="showcomponent" />
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" @click="showcomponent=false" data-dismiss="modal">Cancel</button>
                        <!-- <button type="button" id="submit" @click="saveWorkSheetDetails(workSheetIndex,worksheetObj.id)" class="btn btn-primary">Save</button> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- worksheet Analyse pop up start-->



                        <div class="clearfix"></div>
                        <hr class="studenthr" style="margin:5px 0 5px 0;">
                        <br>
                        <div class="row">
                            <div class="col-lg-3">
                            <h4><b>Performance</b></h4>
                            
                            </div>
                             <div class="col-lg-4"  v-if="marks==false && marksintable==false" >
                             </div>
                            <div class="col-lg-4"  v-if="marks==true || marksintable==true"><br><br><br>
                             <button type="button" class="btn btn-info" v-on:click.prevent="Marks">Heatmap</button>
                             <button type="button" class="btn btn-info" v-on:click.prevent="marksbytable">Table</button>
                            
                            </div>
                            <div class="col-lg-4" style="margin-left:-300px">
                                <div class="col-lg-6">
                                    <label class="acdmcyr">Academic Year:</label>
                                </div>
                                <div class="col-lg-6">
                                    <select class="forminput pull-left"  style="width:200%"  v-model="academicDetails" v-on:change="selectAcadamicYear()">
                                     <option v-for="academic in studentAcademicYearsSyllabusTypes" v-bind:value="{classid: academic.classid,passingyear: academic.passingyear,academicyearid: academic.id,syllabustype:academic.syllabustype,syllabusid:academic.syllabusid,startmonth:academic.academicyearstarting,endmonth:academic.academicyearending}">
                                         {{academic.passingyear}} - {{academic.syllabustype}} - {{academic.gradename}} - {{academic.sectionname}} <div v-if="academic.active === 1"> - Active </div>
                                        </option>
                                        </select>
                                 <!-- <select class="forminput pull-left" v-model="acadamicYear" @click="getMonthlyAttendanceByStudentidSubjectIds()">
                                        <option v-for="year in academicsandboards.academics" v-bind:value="year.passingyear">{{year.passingyear}}</option>
                                    </select>  -->
                                </div>
                            </div>
                            
                        </div>
                        <div class="row">
                        
                        </div>
                        <div class="row">
                            <div class="col-lg-7 col-md-6"  v-if="attendance==true">
                           
                                <!--highcharts :options="options1"></highcharts-->
                                <div class="row studentstable reset-padding reset-margin " >
            <div class="divTable">
                <div class="divTableBody">
            
                    <div class="col-lg-10"  style ="align:center">
                                    <label >Attendance:</label>
                                </div>
                     <div class="col-lg-2" v-if="attendanceType==1">
                                    <select class="forminput center" v-model="attendanceSubject" @change="getMonthlyAttendanceByStudentidSubjectIds()" >
                                        <option value=0 >ALL</option>
                                        <option v-for="mysubject in mysubjects" v-bind:value="mysubject.id">{{mysubject.subjectname}}</option>
                                        
                                    </select>
                                </div>
                    <div class="col-lg-2" v-if="attendanceType==0">
                                    <select class="forminput center" v-model="attendanceSubject" @change="getMonthlyAttendanceByStudentidSubjectIds()" >
                                        <option value=0 >ALL</option>                                   
                                        
                                    </select>
                                </div>
                    <div class="divTableRow">
                         <div class="divTableCell" v-for="month in updatedmonths">{{month}}</div>
                    </div>
                    
                    <div class="divTableRowdata" >
                         <div class="divTableCell" v-for="att in studentattendance">{{att}}</div>
                        

                    </div>
                    
                </div>
            </div>
        </div>                       
    </div>
   
    
    <div class="col-lg-7 col-md-6" v-if="marks==true"><br>
        <div v-if="heatmapDataAvailability==true">
            <highcharts :options="options2" :key="componentKey" style="width:750px"></highcharts>
        </div>
        <div v-else>
            <h4 style="margin-top:30px;margin-left;200px"><b>Data was not avaliable</b></h4>
        </div> 
    </div>
     
    <div class="col-lg-7 col-md-6" v-if="marksintable==true">
        <div v-if="heatmapDataAvailability==true">
            <h4 style="margin-left:75px">Marks Of A student</h4>
            <div class="divTable" style="width:800px"><br>
                <div class="divTableBody">
                    <div class="divTableRow"  v-for="(testTypeKey,testTypeResult, index) in studentMarksAnalytics" v-if="index<1">
                        <div class="divTableCell">Subject/Test </div>
                        <div class="divTableCell" v-for="(marks,subject) in testTypeKey" > {{subject}}</div>
                        <div class="divTableCell" > Total Marks </div>
                    </div>
                    <div class="divTableRowdata"  v-for="(testTypeKey,value) in studentMarksAnalytics" >
                    <div class="divTableCelldata" >{{value}}</div>
                    <div class="divTableCelldata" v-for="(marks,subject) in testTypeKey" v-if="marks.marks != -1"> {{marks.marks}}</div>
                    <div class="divTableCelldata" v-else > -- </div> 
                    <div class="divTableCelldata"> {{getTotalMarks(testTypeKey)}}</div>
                    </div>
            </div>
        </div>
        </div>
        <div v-else><br>
            <h4 style="margin-top:30px;margin-left;200px"><b>Data was not avaliable</b></h4>
        </div>
    </div>
        <div class="col-lg-7 col-md-6" v-if="barchart==true">
            <div v-if="clusteredbarDataAvailablity==true">
                <select class="form-control groupFilter" @change="selectClusterbar()" v-model="clusteredId">
                    <option v-for="(test,index) in testsInClusteredBarMap" v-bind:value="index">{{test}}</option>
                </select>
                <br> <br><hr style="float:left;width:200px">
                <highcharts :options="options4" style="height: 400px; min-width: 310px; max-width: 800px; "></highcharts>
                <!-- <column-chart :key="componentKey" download="data" xtitle="Subjects" ytitle="Marks" :data="booksdata" :min="0" :max="maxNumber" style="width:750px"></column-chart> -->
            </div>
            <div v-else>
                 <h4 style="margin-top:30px;margin-left;200px"><b>Data was not avaliable</b></h4>
             </div> 
        </div>
        <div class="col-lg-7 col-md-6" v-if="boxplot==true">
            <div v-if="boxplotDataAvailablity==true">
                <div style="width:100%">
                    <button  :class="['status-btn',testWise]" @click="getStudentMarksInBoxPlot(statusDetails.testWise)">Test Wide</button>
                    <button  :class="['status-btn',subjectWise]"  @click="getStudentMarksInBoxPlot(statusDetails.subjectWise)">Subject Wide</button>
                </div>
                <hr>
                <div v-if="selectedStatus==2">
                    <select class="form-control groupFilter" @change="selectTest()" v-model="testId">
                        <option v-for="(test,index) in listOfTest"  v-bind:value="index">{{test}}</option>
                    </select>
                        <br> <br><hr style="float:left;width:200px">
                </div>     
                     <highcharts :options="options3" :key="componentKey" style="width:105%"></highcharts>
                <br><hr>
                <h4>Points</h4>
                <span>1. Online Box Plot 
                <a href="https://www.desmos.com/calculator/h9icuu58wn" target="_blank"> IDE </a> for calculate the Quartiles  </span><br><br>
                <pre v-if="selectedStatus==1">2.Test Wide:<br>    1.Green Dot: A Single student with single test mean value
                <br>    2.Red Dot: All Students with single test mean value
                <br>    3.Green Line: A Single student with all tests mean values
                <br>    4.Red Line: All students with all tests mean values
                </pre>
                <pre v-if="selectedStatus==2">2.Subject Wide:<br>    1.Green Dot: A Single student Marks
                <br>    2.Red Dot: All Students with single subject mean value
                <br>    3.Green Line: A Single student with all subjects mean values in the single test only
                 <br>    4.Red Line: All students with all subjects mean values in the single test only
                 </pre>
            </div>
             <div v-else>
                 <h4 style="margin-top:30px;margin-left;200px"><b>Data was not avaliable</b></h4>
             </div>       
         </div>

                            <div class="col-lg-7 col-md-6" v-if="worksheettable==true">
                                <div class="col-lg-12">
                                    <div class="col-lg-2" style="padding-top:5px">
                                        <label >Subject:</label>
                                    </div>
                                    <div class="col-lg-4">
                                        <select class="forminput center" v-model="subjectIdForWorksheetTestData" @change="changeSubject" >
                                            <option value=0 >ALL</option>
                                            <option v-for="mysubject in mysubjects" v-bind:value="mysubject.id" :key="mysubject.id">{{mysubject.subjectname}}</option>        
                                        </select>
                                    </div>
                                </div>
                                <br>
                                <br>
                                <div class="divTable">
                                    <div class="divTableBody">
                                        <div class="divTableRow">
                                            <div class="divTableCell">
                                                <p v-if="!selectall" >Select</p>
                                                <p v-else >Deselect</p>
                                                <input type="checkbox" @click="selectAllOrDeselectAll" v-model="selectall"/>
                                                All
                                            </div>
                                            <div class="divTableCell">Test ID</div>
                                            <div class="divTableCell">Worksheet ID</div>
                                            <div class="divTableCell">Worksheet Name</div>
                                            <div class="divTableCell">Subject Name</div>
                                            <div class="divTableCell">Secured Marks</div>
                                            <div class="divTableCell">Total Marks</div>
                                            <div class="divTableCell">Analyse</div>
                                        </div>
                                        <!-- {{worksheettestids}} -->
                                        <div class="divTableRowdata" v-for="worksheettest in paginatedworksheetdataofstudent" :key="worksheettest.id">
                                            <!-- v-show="worksheettest.statusid==3" -->
                                            <div class="divTableCelldata">
                                                <input type="checkbox" 
                                                    @click="clickforshowingname(worksheettest.id,worksheettest.worksheet_name)" 
                                                    v-model="worksheettestids" 
                                                    :value="worksheettest.id" 
                                                />
                                            </div>
                                            <div class="divTableCelldata">{{worksheettest.id}}</div>
                                            <div class="divTableCelldata">{{worksheettest.w_id}}</div>
                                            <div class="divTableCelldata">{{worksheettest.worksheet_name}}</div>
                                            <div class="divTableCelldata">{{worksheettest.subjectname}}</div>
                                            <div class="divTableCelldata">{{worksheettest.securedmarks}}</div>
                                            <div class="divTableCelldata">{{worksheettest.max_marks}}</div>
                                            <div class="divTableCelldata"><button class="common-button" @click.prevent="analyseWorksheet(worksheettest.w_id,worksheettest.id)">Analyse</button></div>
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
                              <!--   <highcharts :options="options3"></highcharts> -->
                                        <!-- <div style="width:100%">
                                            <button  :class="['status-btn',testWise]" @click="getStudentMarksInBoxPlot(statusDetails.testWise)">Test Wide</button>
                                            <button  :class="['status-btn',subjectWise]"  @click="getStudentMarksInBoxPlot(statusDetails.subjectWise)">Subject Wide</button>
                                        </div>
                                        <hr>
                                        <div v-if="selectedStatus==2">
                                            <select class="form-control groupFilter" @change="selectTest()" v-model="testId">
                                                <option v-for="(test,index) in listOfTest"  v-bind:value="index">{{test}}</option>
                                            </select>
                                             <br> <br><hr style="float:left;width:200px">
                                        </div>
                                       
                                    <highcharts :options="options3" :key="componentKey" style="width:800px"></highcharts> -->
                            </div>
                             <div class="col-lg-7 col-md-6" v-if="booksAnalytics==true">
                                 <div>
                                 <br>
                                    <column-chart :key="componentKey" download="data" xtitle="Books Analytics" ytitle="Number of Books" :data="booksdataAnalytics"  :messages="{empty: 'No data'}" :min="0" :max="booksMaxNumber" style="width:750px"></column-chart>
                                </div>
                             </div>
                            <div class="col-lg-1" style="margin-left:180px">
                            <div class="vl"></div>
                            </div>
                            <div class="col-lg-2 col-md-6" >
                                <div class="row">
                                    <div class="left-navigation">
                                        <ul class="menulist">
                                            <li class="studentanalyticslist"><a v-on:click.prevent="Attendance" class="link"><span v-html="$t('attendance')"/></a></li>
                                            <li class="studentanalyticslist"><a v-on:click="getMarks" class="link">Marks of a student</a></li>
                                            <li class="studentanalyticslist"><a v-on:click.prevent="Barchart" class="link">Clustered Bar</a></li>
                                            <li class="studentanalyticslist"><a v-on:click.prevent="Boxplot" class="link">Box Plot</a></li>
                                            <li class="studentanalyticslist"><a v-on:click.prevent="Worksheettable" class="link">Worksheets</a></li>
                                             <li class="studentanalyticslist"><a v-on:click.prevent="BooksAnalytics" class="link">BooksAnalytics</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        <hr v-show="worksheettable==true">
                        <div class="row" v-show="worksheettable==true">
                            <div class="col-lg-12">
                                <div class="col-lg-4" style="padding-top:5px">
                                    <label>Selected Tests</label>
                                </div>
                                <div class="col-lg-4 text-right" style="padding-bottom:10px">
                                    <button class="common-button" @click="analyseSelected">analyse</button>
                                </div>
                            </div>
                            <br>
                            <div class="show-selected-tests">
                                <div v-for="wsname in worksheettestworksheetnames" :key="wsname.id" @click="clickfordeselect(wsname.id, wsname.name)">
                                    {{wsname.name}}
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="row" style="padding-left:300px">
                            <table class="divTable col-lg-12" v-show="doAnalyse" style="width:60%">
                                <h4 v-show="lineanalysisdata.series[0].data.length == 0"
                                   style="color:red;padding-left:200px"
                                >
                                    No data to display
                                </h4>
                                <tbody class="divTableBody" v-show="lineanalysisdata.series[0].data.length != 0">
                                    <tr class="divTableRowdata" style="text-align:center;padding:10px;background-color:lightblue">
                                        <td class="divTableCelldata">Name</td>
                                        <td class="divTableCelldata">Correct</td>
                                        <td class="divTableCelldata">Total</td>
                                    </tr>
                                    <tr class="divTableRowdata" v-for="(dod,index) in worksheetAnalysedDataOfStudent.degreeLevelQuestions" :key="dod.id">
                                        <td class="divTableCelldata">{{dod.degreeofdifficulty}}</td>
                                        <td class="divTableCelldata">{{ dod.correct }}</td>
                                        <td class="divTableCelldata" v-if="index < worksheetAnalysedDataOfStudent.degreeLevelQuestionsTotal.length">
                                            {{ worksheetAnalysedDataOfStudent.degreeLevelQuestionsTotal[index].total }}
                                        </td>
                                    </tr>
                                    <tr class="divTableRowdata" v-for="(tag,index) in worksheetAnalysedDataOfStudent.questionsTags" :key="tag.id">
                                        <td class="divTableCelldata" v-if="tag.tagname==null">General</td>
                                        <td class="divTableCelldata" v-else>{{tag.tagname}}</td>
                                        <td class="divTableCelldata">{{ tag.correct }}</td>
                                        <td class="divTableCelldata" v-show="index < worksheetAnalysedDataOfStudent.questionsTagsTotal.length">
                                            {{ worksheetAnalysedDataOfStudent.questionsTagsTotal[index].total }}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <br>
                        <div class="clearfix"></div>
                        <div class="col-lg-12" style="text-align: center;" v-if="doAnalyse">
                            <button type="button" class="btn btn-info" v-on:click.prevent="showheat=false;showline=true">Line Chart</button>
                            <button type="button" class="btn btn-info" v-on:click.prevent="showline=false,showheat=true">Heatmap</button>
                        </div>
                        <br>
                        <div class="clearfix"></div>
                        <div v-show="doAnalyse&&showline" style="padding-top:20px">
                            <highcharts
                                :options="lineanalysisdata"
                                v-if="lineanalysisdata.series[0].data.length != 0"
                            ></highcharts>
                        </div>
                        <div lass="row" v-show="doAnalyse&&showline">
                            <div class="col-lg-12">
                                <div class="col-lg-4">
                                    <div class="col-lg-2">
                                        <img src="https://www.highcharts.com/samples/graphics/sun.png" alt="Sun">
                                    </div>
                                    <div class="col-lg-2" style="padding-top:6px">
                                        <p>>90%</p>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="col-lg-2">
                                        <img :src="marker.symbol" alt="Tick">
                                    </div>
                                    <div class="col-lg-2" style="padding-top:6px">
                                        <p>60%-90%</p>
                                    </div>
                                </div>
                                <div class="col-lg-4">
                                    <div class="col-lg-2">
                                        <img src="https://www.highcharts.com/samples/graphics/snow.png" alt="Snow">
                                    </div>
                                    <div class="col-lg-2" style="padding-top:6px">
                                        <p>>30%-60%</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-show="doAnalyse&&showheat" style="padding-top:20px">
                            <highcharts
                                :options="heatanalysisdata"
                                style="min-height: 400px; min-width:1200px "
                                v-if="heatanalysisdata.series[0].data.length!=0"
                            ></highcharts>
                            <div class="col-lg-8 text-right" v-else style="padding-right:60px;color:red" ><h4>No Data To Display For Heatmap</h4></div>
                        </div>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import VueHighcharts from 'vue-highcharts';
import Highcharts from 'highcharts';
import loadMap from 'highcharts/modules/map';
import loadStock from 'highcharts/modules/stock';
import EventBus from '../../../event-bus.js';
import UserService from '../../../services/userService.js';
import store from "../../../store.js";
import worksheetanalytics from "./student_worksheet_analytics_template"
loadMap(Highcharts);
loadStock(Highcharts);
    export default{
         props:['school','userdetails','acdemicyearandboard','academicsandboards',
        //  'singlestudent', 
        //  'studentid'
         ],
         components:{
             "worksheetanalytics": worksheetanalytics
         },
        data(){
            return{
                marker: {
                    symbol: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5Si +ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVi +pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+ 1dT1gvWd+ 1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx+ 1/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb+ 16EHTh0kX/i +c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAAAVVJREFUeNpi/P37NwOxYM2pHtm7lw8uYmBgYGAiVtPC3RWh+88vuneT474Dv4DkcUZibJy8PG72le/nkn+zMzAaMhnNyY1clMpCjKbz/86lMLAzMMA0MTAwMOC1Ea6JgYFB9pPwncbMg6owOaY1p3pk15zqkcWnie8j63ddY18nZHmWI2eW3vzN/Jf168c3UfGuHathAXHl+7lkBnYGBtafDP8NVd3jQ8xKHiNrZMyeqPPtE/9vTgYGBgb1H4oHlHXt43ZfWfDwNzsDIwMDA4POX831RXGrg9BdxLhob63VgTurjsAUsv5k+A9jC3/g/NCdfVoQm/+ZIu3qjhnyW3XABJANMNL19cYVcPBQrZpq9eyFwCdJmIT6D8UD5cmbHXFphKccI9Mgc84vTH9goYhPE4rGELOSx0bSjsUMDAwMunJ2FQST0+/fv1Hw5BWJbehi2DBgAHTKsWmiz+rJAAAAAElFTkSuQmCC",
                },
                mysubjects:[],
                attendanceSubject:'',
                attendanceType:0,
                acadamicYear:2020,
                studentattendance:[0,0,0,0,0,0,0,0,0,0,0,0],
                startmonth:0,
                endmonth:0,
                studentattendance1:[0,0,0,0,0,0,0,0,0,0,0,0],
                months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
                updatedmonths:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
                attendance:true,
                marks:false,
                barchart:false,
                boxplot:false,
                marksintable:false,
                worksheettable:false,
                booksAnalytics:false,
                pageNumber: 0,
                size: 6,
                id:this.$cookie.get('id'),
               // singlestudent:this.$store.state.singleStudent,
                parentdetails:{},
                parent:{},
                open: 'show',
                close:'hide',
                student:{},
                isVisible:false,
                student:{
                    role:"PARENT"
                },
                // studentedit:{},
                userrole:this.$cookie.get('userrole'),
                showAlertforpasswordmismatch:false,
                showAlertforpasswordresetsuccess:false,
                studentMarksAnalytics:[],
                alertMessage:"",
                selectedStatus:0,
                heatmapDataAvailability:false,
                clusteredbarDataAvailablity:false,
                boxplotDataAvailablity:false,
                statusDetails:{testWise:1,subjectWise:2},
                testWise:'status-btn-click',
                subjectWise:'',
                listOfTest:[],
                listOfStudentMarks:[],
                testId:0,
                clusteredId:0,
                componentKey:0,
                // componentKeyforcheckbox:0,
                testsInClusteredBarMap:[],
                marksInClusteredBarMap:[],
                studentAcademicYearsSyllabusTypes:[],
                maxNumber:100,
                booksMaxNumber:20,
                academicDetails:'',
                listOfBooksAnalytics:[],
                holdingBooksCount:0,
                damagedBooksCount:0,
                returnedBooksCount:0,
                worksheetdataofstudent:[],
                worksheetAnalysedDataOfStudent:{},
                doAnalyse:false,
                worksheetid:0,
                worksheettestid:0,
                subjectIdForWorksheetTestData:0,
                worksheettestids:[],
                worksheettestworksheetnames:[],
                selectall:false,
                showcomponent: false,
                showline:true,
                shoeheat:false,
                lineanalysisdata: {
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'Student Analysis'
                    },
                    subtitle: {
                        // text: 'Source: WorldClimate.com'
                    },
                    xAxis: {
                        categories: [
                            // 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                            // 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                        ]
                    },
                    yAxis: {
                        title: {
                        text: 'No of Questions'
                        },
                        labels: {
                        formatter: function () {
                            return this.value;
                        }
                        }
                    },
                    tooltip: {
                        crosshairs: true,
                        shared: true
                    },
                    plotOptions: {
                        spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                        }
                    },
                    series: [
                        {
                            name: 'Total',
                            marker: {
                            symbol: 'square'
                            },
                            data: [
                                // 7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, {
                                // y: 26.5,
                                // marker: {
                                //     symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                                // }
                                // }, 23.3, 18.3, 13.9, 9.6
                            ]
                        }, 
                        {
                            name: 'Correct',
                            marker: {
                            symbol: 'diamond'
                            },
                            data: [
                                // {
                                // y: 3.9,
                                // marker: {
                                //     symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
                                // }
                                // }, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8
                            ]
                        }
                    ]
                },
                heatanalysisdata:{
                    chart: {
                        type: 'heatmap',
                        marginTop: 40,
                        marginBottom: 80,
                        plotBorderWidth: 1
                    },
                    title: {
                        text: 'Tag analysis for Students of a classroom using Heatmap'
                    },
                    xAxis: {
                        categories: []
                    },
                    yAxis: {
                        categories: [],
                        title: null,
                        reversed: true
                    },
                    colorAxis: {
                        min: 0,
                        minColor: '#FFFFFF',
                        maxColor: Highcharts.getOptions().colors[0]
                    },
                    legend: {
                        align: 'right',
                        layout: 'vertical',
                        margin: 0,
                        verticalAlign: 'top',
                        y: 25,
                        symbolHeight: 280
                    },    
                    tooltip: {
                        formatter: function () {
                            return '<b>' + this.series.yAxis.categories[this.point.y] + '</b> scored <br><b>' +
                            this.point.value + '</b> questions correct in <br><b>' + this.series.xAxis.categories[this.point.x] + '</b>';
                        }
                    },
                    series: [{
                        name: 'Sales per employee',
                        borderWidth: 1,
                        data: [],
                        dataLabels: {
                        enabled: true,
                        color: '#000000'
                        }
                    }],
                    responsive: {
                        rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            yAxis: {
                            labels: {
                                formatter: function () {
                                return this.value.charAt(0);
                                }
                            }
                            }
                        }
                        }]
                    }
                },
                tests:[{testname:"Test 1"},{testname:"Test 2"},{testname:"Quarterly"},{testname:"Test 3"},{testname:"Half-Yearly"},{testname:"Test 4"},{testname:"Annual"}],
                money:[['Kinder-Garten', 300000],['Grade-1', 400000], ['Grade-2',500000],['Grade-3', 600000],['Grade-4',700000],['Grade-5',800000],['Grade-6',900000],['Grade-7',1000000],['Grade-8',1100000],['Grade-9',1200000],['Grade-10',1300000]],
                    options1:{
                      chart: {
                        type: 'heatmap',
                        marginTop: 40,
                        marginBottom: 80,
                        plotBorderWidth: 0
                        },
                        title: {
                         text: 'Attendance'
                        },
                        legend: {
                            enabled: true
                            },
                        xAxis: {
                            categories:['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
                        },

                        yAxis: {
                            categories:  ['Mohan', 'Gayatri', 'Yamini', 'Rohith', 'Mounika', 'Surya', 'Ravinder', 'Tanmai', 'Nikitha', 'Vinitha'],
                            title: null
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.yAxis.categories[this.point.y]+ '</b> Present for <br><b>' +
                                this.point.value+' days '+ '</b> in <b>' +this.series.xAxis.categories[this.point.x] + '</b>';
                            }
                        },
                        colorAxis: {
                            min: 0,
                            max:30,
                            minColor: '#D1C4E9',
                            maxColor: '#673AB7'
                        },

    
                        // legend: {
                        //     align: 'right',
                        //     layout: 'vertical',
                        //     margin: 0,
                        //     verticalAlign: 'top',
                        //     y: 25,
                        //     symbolHeight: 300
                        // },

                        series: [{
                            name: 'Marks per Student',
                            
                            borderWidth: 0.5,
                            data: [[0, 0, 25], [0, 1, 18], [0, 2, 8], [0, 3, 20], [0, 4, 22],[0,5,25],[0,6,30],[0, 7, 10], [0, 8, 17], [0, 9, 31], 
                                    [1, 0, 30], [1, 1, 20], [1, 2, 25], [1, 3,30], [1, 4, 25],[1,5,17],[1,6,18],[1, 7, 20], [1, 8, 25], [1, 9, 28], 
                                    [2, 0, 31], [2, 1, 26], [2, 2, 21], [2, 3, 30], [2, 4, 30],[2,5,30],[2,6,27],[2, 7, 26], [2, 8, 25], [2, 9, 18],
                                    [3, 0, 30], [3, 1, 20], [3, 2, 28], [3, 3, 30], [3, 4, 25],[3,5,27],[3,6,30],[3, 7, 31], [3, 8, 22], [3, 9, 30], 
                                    [4, 0, 30], [4, 1, 25], [4, 2, 28], [4, 3, 19], [4, 4, 28],[4,5,30],[4,6,14],[4, 7, 11], [4, 8, 29], [4, 9, 28],
                                    [5, 0, 27], [5, 1, 28], [5, 2, 12], [5, 3, 20], [5, 4, 29],[5,5,31],[5,6,18],[5, 7, 20], [5, 8, 29], [5, 9, 30],
                                    [6, 0, 28], [6, 1, 26], [6, 2, 14], [6, 3, 19], [6, 4, 22],[6,5,26],[6,6,30],[6, 7, 26], [6, 8, 25], [6, 9, 30],
                                    [7, 0, 31], [7, 1, 21], [7, 2, 22], [7, 3, 15], [7, 4, 30],[7,5,28],[7,6,24],[7, 7, 10], [7, 8, 29], [7, 9, 31],
                                    [8, 0, 25], [8, 1, 27], [8, 2, 12], [8, 3, 19], [8, 4, 28],[8,5,29],[8,6,14],[8, 7, 10], [8, 8, 19], [8, 9, 23],
                                    [9, 0, 27], [9, 1, 11], [9, 2, 31], [9, 3, 30], [9, 4, 29],[9,5,29],[9,6,14],[9, 7, 11], [9, 8, 29], [9, 9, 24],
                                    [10, 0, 10], [10, 1, 29], [10, 2, 28], [10, 3, 17], [10, 4, 26],[10,5,26],[10,6,24],[10, 7, 13], [10, 8, 19], [10, 9, 15],
                                    [11, 0, 22], [11, 1, 18], [11, 2, 28], [11, 3, 28], [11, 4, 28],[11,5,18],[11,6,15],[11, 7, 15], [11, 8, 13], [11, 9, 12],
                                  ],
                            dataLabels: {
                                enabled: false,
                            }
                        }]
                    },
                     options2:{
                      chart: {
                        type: 'heatmap',
                        marginTop: 40,
                        marginBottom: 80,
                        plotBorderWidth: 0.5
                        },
                        title: {
                         text: 'Averages of a student '
                        },

                        xAxis: {
                            categories: []
                        },

                        yAxis: {
                            categories: [],
                            title: null
                        },
                        legend: {
                            enabled: true
                        },
                        tooltip: {
                            formatter: function () {
                                return '<b>' + this.series.xAxis.categories[this.point.x] + '</b><br><b>' +
                                this.point.value + '</b> marks in <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
                            }
                        },
                        colorAxis: {
                            min: 0,
                            max:50,
                            minColor: '#FFFFFD',
                            maxColor: '#FF9800'
                        },

    
                        // legend: {
                        //     align: 'right',
                        //     layout: 'vertical',
                        //     margin: 0,
                        //     verticalAlign: 'top',
                        //     y: 25,
                        //     symbolHeight: 300
                        // },

                        series: [{
                            name: 'Marks per Student',
                            borderWidth: 0,
                            data: [],
                            dataLabels: {
                                enabled: false,
                            }
                        }]
                    },
                    // booksdata : [
                    //     {
                    //         name: "High Score", 
                    //         data: []
                    //     },
                    //     {
                    //         name: "Low Score", 
                    //         data: []
                    //     },
                    //     {
                    //         name: "Your Score", 
                    //         data: []
                    //     }
                    // ],
                    options4:{
                        chart: {
                        type: 'column'
                    },
                    title: {
                        text: 'Student Marks'
                    },
                     xAxis: {
                        categories: [],
                        crosshair: true
                    },
                     yAxis: {
                        min: 0,
                        title: {
                            text: 'Average Marks'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px;border-collapse: collapse">{point.key}</span><table>',
                        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                            '<td style="padding:0"><b>{point.y}</b></td></tr>',
                        footerFormat: '</table>',
                        shared: true,
                        useHTML: true
                    },
                     plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: "High Score", 
                        data: []
                    },
                    {
                        name: "Low Score", 
                        data: []
                    },
                    {
                        name: "Your Score", 
                        data: []
                    }]
                    },
                     booksdataAnalytics : [
                        {
                            name: "HoldingBooks", 
                            data: []
                        },
                        {
                            name: "Damaged Books", 
                            data: []
                        },
                        {
                            name: "Returned Books", 
                            data: []
                        },
                        {
                            name: "Total Books", 
                            data: []
                        }
                    ],
                    options3:{
                            chart: {
                            type: 'boxplot'
                            },

                            title: {
                                text: ''
                            },

                            legend: {
                                enabled: false
                            },

                            xAxis: {
                                categories: [],
                                title: {}
                            },

                            yAxis: {
                                title: {
                                    text: 'Marks'
                                },
                                plotLines: [{
                                    value: 48,
                                    color: 'green',
                                    width: 1,
                                    label: {
                                        text:"",
                                        align: 'left',
                                        style: {
                                            color: 'grey'
                                        }
                                    }
                                },{
                                    value: 65,
                                    color: 'red',
                                    width: 1,
                                    label: {
                                        text:"",
                                        align: 'right',
                                        style: {
                                            color: 'grey'
                                        }
                                    }
                                }]
                            },

                            series: [{
                                 name: 'Observations',
                                    data: [],
                                    tooltip: {
                                        headerFormat: '<em> {point.key}</em><br/>'
                                    }
                                },{
                                name: '',
                                color: Highcharts.getOptions().colors[0],
                                type: 'scatter',
                                data: [],
                                marker: {
                                fillColor: 'green',
                                lineWidth: 1,
                                lineColor: Highcharts.getOptions().colors[0]
                                },
                                tooltip: {
                                pointFormat: ''
                                }
                            },{
                                name: '',
                                color: Highcharts.getOptions().colors[0],
                                type: 'scatter',
                                data: [],
                                marker: {
                                fillColor: 'red',
                                lineWidth: 1,
                                lineColor: Highcharts.getOptions().colors[0]
                                },
                                tooltip: {
                                pointFormat:''
                                }
                            }
                            ]
                            }
                        }
                },
        methods:{
            Attendance:function(){
                console.log( this.attendance=true)
                this.attendance=true;
                this.marks=false;
                this.barchart=false;
                this.boxplot=false;
                this.marksintable=false;
                this.worksheettable=false;
                this.booksAnalytics=false;
            },
            analyseWorksheet: function(worksheetid,testid){
                this.worksheetid = worksheetid;
                this.worksheettestid = testid;
                console.log(this.worksheetid);
                this.popUp('analysePOpUp', this.open);
                this.showcomponent=true;
            },
            selectAllOrDeselectAll: function(){
                this.selectall = !this.selectall;
                console.log(this.selectall);
                if(this.selectall){
                    this.worksheettestids = [];
                    this.worksheettestworksheetnames = [];
                    for(let i=0; i<this.worksheetdataofstudent.length;i++){
                        if(this.worksheetdataofstudent[i].statusid == 3 || this.worksheetdataofstudent[i].statusid == 5){
                            this.worksheettestids.push(this.worksheetdataofstudent[i].id);
                            this.worksheettestworksheetnames.push({
                                id:this.worksheetdataofstudent[i].id,
                                name:this.worksheetdataofstudent[i].worksheet_name
                            });
                        }
                    }
                } else{
                    this.worksheettestids = [];
                    this.worksheettestworksheetnames = [];
                }
                console.log(this.worksheettestids);
            },
            clickforshowingname: function(id, name){
                let contains = false;
                for(let i=0;i<this.worksheettestworksheetnames.length;i++){
                    if(this.worksheettestworksheetnames[i].id == id){
                        contains = true;
                        this.worksheettestworksheetnames.splice(i, 1);
                        i--;
                        break;
                    }
                }
                if(contains == false){
                    this.worksheettestworksheetnames.push({
                        id:id,
                        name:name
                    })
                }
            },
            clickfordeselect: function(id, name){
                for(let i=0;i<this.worksheettestworksheetnames.length;i++){
                    if(this.worksheettestworksheetnames[i].id == id){
                        this.worksheettestworksheetnames.splice(i, 1);
                        i--;
                        break;
                    }
                }
                for( let i = 0; i < this.worksheettestids.length; i++){              
                    if ( this.worksheettestids[i] == id) {
                        this.worksheettestids.splice(i, 1); 
                        i--; 
                    }
                }
            },
            symbolForPercentage: function(correct, total){
                let obj;
                if(correct/total>0.9){
                    obj = {
                        y: correct,
                        marker: {
                            symbol: 'url(https://www.highcharts.com/samples/graphics/sun.png)'
                        }
                    }
                } else if(correct/total>0.6){
                    obj = {
                        y: correct,
                        marker: {
                            symbol: 'url('+ this.marker.symbol +')'
                        }
                    }
                } else if(correct/total>0.3){
                    obj = {
                        y: correct,
                        marker: {
                            symbol: 'url(https://www.highcharts.com/samples/graphics/snow.png)'
                        }
                    }
                } else {
                    obj = correct;
                }
                console.log(obj)
                return obj;
            },
            analyseSelected: function(){
                if(this.selectall && this.worksheettestids.length == this.filterworksheetdataofstudent.length){
                    UserService.getAnalysedStudentForAStudent(this.id,this.academicDetails.classid,this.getSinglieStudent.id,this.subjectIdForWorksheetTestData).then((response) => {
                        console.log(response.data);
                        this.lineanalysisdata.xAxis.categories = [];
                        this.heatanalysisdata.xAxis.categories = [];
                        this.lineanalysisdata.series[0].data = [];
                        this.lineanalysisdata.series[1].data = [];
                        this.heatanalysisdata.series[0].data = [];
                        this.worksheetAnalysedDataOfStudent = response.data.resultsMap.OverallStudentAnalyse;
                        this.doAnalyse = true;
                        let dodCorrect = this.worksheetAnalysedDataOfStudent.degreeLevelQuestions;
                        let dodTotal = this.worksheetAnalysedDataOfStudent.degreeLevelQuestionsTotal;
                        let tagCorrect = this.worksheetAnalysedDataOfStudent.questionsTags;
                        let tagTotal = this.worksheetAnalysedDataOfStudent.questionsTagsTotal;
                        let k=0;
                        for(let i=0;i<dodCorrect.length;i++){
                            this.heatanalysisdata.series[0].data[k] = [];
                            this.lineanalysisdata.xAxis.categories.push(dodCorrect[i].degreeofdifficulty);
                            this.heatanalysisdata.xAxis.categories.push(dodCorrect[i].degreeofdifficulty);
                            if(i<dodTotal.length && dodCorrect[i].id==dodTotal[i].id){
                                this.lineanalysisdata.series[1].data.push(this.symbolForPercentage(dodCorrect[i].correct, dodTotal[i].total));
                                this.lineanalysisdata.series[0].data.push(dodTotal[i].total);
                            } else {
                                this.lineanalysisdata.series[1].data.push(dodCorrect[i].correct);
                                this.lineanalysisdata.series[0].data.push("X");
                            }
                            this.heatanalysisdata.series[0].data[k].push(k);
                            this.heatanalysisdata.series[0].data[k].push(0);
                            this.heatanalysisdata.series[0].data[k].push(dodCorrect[i].correct);
                            k++;
                        }
                        this.heatanalysisdata.yAxis.categories.push(this.getSinglieStudent.name);
                        for(let i=0;i<tagCorrect.length;i++){
                            this.heatanalysisdata.series[0].data[k] = [];
                            if(tagCorrect[i].tagname!=null){
                                this.lineanalysisdata.xAxis.categories.push(tagCorrect[i].tagname);
                                this.heatanalysisdata.xAxis.categories.push(tagCorrect[i].tagname);
                            } else {
                                this.lineanalysisdata.xAxis.categories.push("General");
                                this.heatanalysisdata.xAxis.categories.push("General");
                            }
                            if(i<tagTotal.length && tagCorrect[i].id==tagTotal[i].id){
                                this.lineanalysisdata.series[1].data.push(this.symbolForPercentage(tagCorrect[i].correct, tagTotal[i].total));
                                this.lineanalysisdata.series[0].data.push(tagTotal[i].total);
                            } else {
                                this.lineanalysisdata.series[1].data.push(tagCorrect[i].correct);
                                this.lineanalysisdata.series[0].data.push("X");
                            }
                            this.heatanalysisdata.series[0].data[k].push(k);
                            this.heatanalysisdata.series[0].data[k].push(0);
                            this.heatanalysisdata.series[0].data[k].push(tagCorrect[i].correct);
                            k++;
                        }
                        console.log(this.lineanalysisdata.xAxis.categories);
                        console.log(this.lineanalysisdata.series[0].data);
                        console.log(this.lineanalysisdata.series[1].data);
                        console.log(this.heatanalysisdata)
                    })
                } else {
                    let obj = {
                        "ws_testids": this.worksheettestids
                    };
                    UserService.getAnalysedDataForListOfTests(this.id,this.academicDetails.classid,this.getSinglieStudent.id,obj).then((response) => {
                        console.log(response.data);
                        this.lineanalysisdata.xAxis.categories = [];
                        this.heatanalysisdata.xAxis.categories = [];
                        this.lineanalysisdata.series[0].data = [];
                        this.lineanalysisdata.series[1].data = [];
                        this.heatanalysisdata.series[0].data = [];
                        this.worksheetAnalysedDataOfStudent = response.data.resultsMap.OverallStudentAnalyseForTestIds;
                        this.doAnalyse = true;
                        let dodCorrect = this.worksheetAnalysedDataOfStudent.degreeLevelQuestions;
                        let dodTotal = this.worksheetAnalysedDataOfStudent.degreeLevelQuestionsTotal;
                        let tagCorrect = this.worksheetAnalysedDataOfStudent.questionsTags;
                        let tagTotal = this.worksheetAnalysedDataOfStudent.questionsTagsTotal;
                        let k=0;
                        for(let i=0;i<dodCorrect.length;i++){
                            this.heatanalysisdata.series[0].data[k] = [];
                            this.lineanalysisdata.xAxis.categories.push(dodCorrect[i].degreeofdifficulty);
                            this.heatanalysisdata.xAxis.categories.push(dodCorrect[i].degreeofdifficulty);
                            if(i<dodTotal.length && dodCorrect[i].id==dodTotal[i].id){
                                this.lineanalysisdata.series[1].data.push(this.symbolForPercentage(dodCorrect[i].correct, dodTotal[i].total));
                                this.lineanalysisdata.series[0].data.push(dodTotal[i].total);
                            } else {
                                this.lineanalysisdata.series[1].data.push(dodCorrect[i].correct);
                                this.lineanalysisdata.series[0].data.push("X");
                            }
                            this.heatanalysisdata.series[0].data[k].push(k);
                            this.heatanalysisdata.series[0].data[k].push(0);
                            this.heatanalysisdata.series[0].data[k].push(dodCorrect[i].correct);
                            k++;
                        }
                        this.heatanalysisdata.yAxis.categories.push(this.getSinglieStudent.name);
                        for(let i=0;i<tagCorrect.length;i++){
                            this.heatanalysisdata.series[0].data[k] = [];
                            if(tagCorrect[i].tagname!=null){
                                this.lineanalysisdata.xAxis.categories.push(tagCorrect[i].tagname);
                                this.heatanalysisdata.xAxis.categories.push(tagCorrect[i].tagname);
                            } else {
                                this.lineanalysisdata.xAxis.categories.push("General");
                                this.heatanalysisdata.xAxis.categories.push("General");
                            }
                            if(i<tagTotal.length && tagCorrect[i].id==tagTotal[i].id){
                                this.lineanalysisdata.series[1].data.push(this.symbolForPercentage(tagCorrect[i].correct, tagTotal[i].total));
                                this.lineanalysisdata.series[0].data.push(tagTotal[i].total);
                            } else {
                                this.lineanalysisdata.series[1].data.push(tagCorrect[i].correct);
                                this.lineanalysisdata.series[0].data.push("X");
                            }
                            this.heatanalysisdata.series[0].data[k].push(k);
                            this.heatanalysisdata.series[0].data[k].push(0);
                            this.heatanalysisdata.series[0].data[k].push(tagCorrect[i].correct);
                            k++;
                        }
                        console.log(this.lineanalysisdata.xAxis.categories);
                    })
                }
            },
            nextPage() {
                this.pageNumber++;
            },
            prevPage() {
                this.pageNumber--;
            },
            getMySubjects:function(){
                var classid={
                    "id":this.academicDetails.classid
                }
                
                UserService.listSubjectsOfGrade(this.id,classid).then((response)=>{
                //console.log(response.data);
                this.mysubjects=response.data
                })

            },
            getClassRoomAttendanceType:function()
            {
                UserService.getClassRoomAttendanceType(this.id,this.getSinglieStudent.gradeid,this.getSinglieStudent.sectionname).then((response)=>{
                this.attendanceType=response.data;                
                })
                
            },
            getMonthlyAttendanceByStudentid:function()
            {
                UserService.getMonthlyAttendanceByStudentid(this.id,this.getSinglieStudent.id,this.academicDetails.passingyear,this.academicDetails.startmonth,this.academicDetails.endmonth).then((response)=>{
                let temp=response.data;
                this.studentattendance=[];
                this.studentattendance1=[];
                for(let i=0;i<this.updatedmonths.length;i++)
                    {
                        this.studentattendance[i]=0;
                        this.studentattendance1[i]=0;
                    }
                 for(let i=0;i<temp.length;i++){
                      this.studentattendance1[this.updatedmonths.indexOf(this.months[temp[i].month-1])]=temp[i].classesAttended;
                 }
                this.studentattendance=this.studentattendance1;
                 //console.log( this.myclass +  "  studentattendance---"+this.studentattendance1);
                
                })

            },
            selectAcadamicYear:function(){
            this.getMySubjects();
            this.startmonth=moment(this.academicDetails.startmonth).format('MM');
            this.endmonth=moment(this.academicDetails.endmonth).format('MM');
             
             let sm=parseInt(this.startmonth, 10);
             let em=parseInt(this.endmonth, 10);
             
            this.updatedmonths=[];
            this.studentattendance1=[];
            this.studentattendance=[];
            if(sm>em)
            {
                for ( let j=0, i=sm; i<=em || i>=sm; i++)
                {                
                    this.studentattendance1[j]=0;
                    this.updatedmonths[j++]=this.months[i-1];
                    if(i==12)
                        i=0;
                }
            }
            else
            {
                for ( let j=0, i=sm-1; i<=em ; i++)
                {
                    this.studentattendance1[j]=0;
                    this.updatedmonths[j++]=this.months[i-1];
                }
            }
            this.getMonthlyAttendanceByStudentidSubjectIds();

        },
            getMonthlyAttendanceByStudentidSubjectIds:function()
            {
                if(this.attendanceSubject == 0)
                {
                    this.getMonthlyAttendanceByStudentid()
                }
                else
                {
                     this.studentattendance=[];
                     this.studentattendance1=[];
                    for(let i=0;i<this.updatedmonths.length;i++)
                    {
                        this.studentattendance[i]=0;
                        this.studentattendance1[i]=0;
                    }
                    UserService.getMonthlyAttendanceByStudentidSubjectIds(this.id,this.getSinglieStudent.id, this.attendanceSubject,this.academicDetails.passingyear,this.getSinglieStudent.gradeid,this.getSinglieStudent.sectionname,this.academicDetails.startmonth,this.academicDetails.endmonth).then((response)=>{
                                   
                    let temp=response.data;
                    
                    for(let i=0;i<temp.length;i++){
                        this.studentattendance1[this.updatedmonths.indexOf(this.months[temp[i].month-1])]=temp[i].classesAttended;
                    }
                    
                    this.studentattendance=this.studentattendance1;
                  })
                 
                }
                


            },
            Marks:function(){
                this.attendance=false;
                this.marks=true;
                this.barchart=false;
                this.boxplot=false;
                this.marksintable=false;
                this.worksheettable=false;
                this.booksAnalytics=false;
            },
            getMarks:function(){
                this.getMarksOfAStudent();	
                this.Marks();
            },
            Barchart:function(){
                this.attendance=false;
                this.marks=false;
                this.barchart=true;
                this.boxplot=false;
                this.marksintable=false;
                this.worksheettable=false;
                this.booksAnalytics=false;
                this.getStudentMarksInClusteredBar();
            },
            Boxplot:function(){
                this.attendance=false;
                this.marks=false;
                this.barchart=false;
                this.boxplot=true;
                this.marksintable=false;
                this.worksheettable=false;
                this.booksAnalytics=false;
                this.getStudentMarksBySubject();
            },
            Worksheettable:function(){
                this.attendance=false;
                this.marks=false;
                this.barchart=false;
                this.boxplot=false;
                this.marksintable=false;
                this.worksheettable=true;
                 this.booksAnalytics=false;
                this.getWorksheetAnalyseDataForStudent();
            },
            BooksAnalytics:function(){
                this.attendance=false;
                this.marks=false;
                this.barchart=false;
                this.boxplot=false;
                this.marksintable=false;
                this.worksheettable=false;
                this.booksAnalytics=true;
                this.getBooksAnalyticsData();
            },
            getWorksheetAnalyseDataForStudent: function(){
                UserService.getWorksheetAnalyseDataForStudent(this.id,this.getSinglieStudent.id,this.academicDetails.classid,this.subjectIdForWorksheetTestData).then((response) => {
                    console.log(response.data);
                    this.worksheetdataofstudent = response.data.results;
                })
            },
            changeSubject: function(){
                this.selectall = false;
                this.pageNumber = 0;
                this.worksheettestids = [];
                this.worksheettestworksheetnames = [];
                UserService.getWorksheetAnalyseDataForStudent(this.id,this.getSinglieStudent.id,this.academicDetails.classid,this.subjectIdForWorksheetTestData).then((response) => {
                    console.log(response.data);
                    this.worksheetdataofstudent = response.data.results;
                })
            },
            dateofjoining:function(date){
                return moment(date).format('DD/MM/YYYY');
            },
            dateofbirth:function(date){
                return moment(date).format('DD/MM/YYYY')
            },
            marksbytable:function(){
                this.marksintable=true;
                this.marks=false;
            },
            popUp: function(id, action) {
                $('#' + id).modal(action);
            },
            showHide:function(){
                this.isVisible=this.student.existingparent
                console.log(this.isVisible)
            },
            newparent:function(){
                //console.log(this.student);
                var parent={
                    "parentemailid":this.student.parentemailid,
                    "fathername":this.student.fathername,
                    "mothername":this.student.mothername,
                    "contactnumber":this.student.contactnumber,
                    "parentaddress":this.student.parentaddress,
                    "role":this.student.role,
                    "password":this.student.password,
                    "confirmpassword":this.student.confirmpassword,
                    "existingparent":this.isVisible,
                    "studentid":this.getSinglieStudent.id
                }
                //console.log(parent)
                UserService.NewParent(parent,this.id).then((response)=>{
                    //console.log(response);
                    if(response.status==200){
                        this.popUp('ADDPARENT',this.close);
                        this.$alert('Added Parent successfully','Success','success');
                        this.getParents();
                    }
                }).catch((error) => {
                    console.log("Error Response" + JSON.stringify(error.response));
                    if(error.response.data.message == "not a registered emailid"){
                        this.$alert(error.response.data.message,'Failure','warning');
                    }
                    else if(error.response.data.message == "enter valid emailid of parent"){
                        this.$alert(error.response.data.message,'Failure','warning');
                    }
                    else if(error.response.data.message == "given parent-student relationship already exists"){
                        this.$alert(error.response.data.message,'Failure','warning');
                    }
                })
            },
            setParent: function(parent) {
                console.log(parent);
                this.parent = parent;
            },
            editparent:function(){
                console.log(this.parent);
                var parent={
                    "parentid": this.parent.id,
                    "fathername":this.parent.fathername,
                    "mothername":this.parent.mothername,
                    "contactnumber":this.parent.contactnumber,
                    "parentaddress":this.parent.address,
                    "inactive":this.parent.inactive,
                }
                console.log(parent)
                UserService.UpdateParent(parent,this.id).then((response)=>{
                    console.log(response);
                    if(response.status==200){
                        this.popUp('EDITPARENT',this.close);
                        this.$alert('Updated parent successfully','Success','success');
                        this.getParents();
                    }
                })
            },
            deleteParentStudentRelationship: function(parentid){
                var parentStudent = {
                    "studentid": this.getSinglieStudent.id,
                    "parentid": parentid,
                }
                console.log(parentStudent)
                UserService.DeleteParentStudentRelationship(parentStudent, this.id).then((response) =>{
                    console.log(response);
                    if(response.status==200){
                        this.popUp('confirmationPopUp',this.close);
                        this.$alert('Deleted parent student relationship','Success','success');
                        this.getParents();
                    }
                })
            },
            getParents: function(){
                var studentid = {
                    "studentid": this.getSinglieStudent.id
                }
                console.log(studentid)
                UserService.GetParents(studentid, this.id).then((response) => {
                    console.log(response)
                    this.parentdetails = response.data;
                    this.$store.commit("SET_PARENT_DETAILS", this.parentdetails);
                })
            },
            resetpassword: function(){
                if(this.student.newpassword == this.student.newconfirmpassword){
                    var password = {
                        emailid: this.getSinglieStudent.emailid,
                        password: this.student.newpassword
                    }
                    console.log(password)
                    UserService.ResetPassword(password, this.id).then((response) =>{
                        console.log(response);
                        if(response.status == 200){
                            this.popUp('confirmationPopUpforresetpassword',this.close);
                            this.popUp('RESETPASSWORD',this.close);
                            this.student.newpassword = "";
                            this.student.newconfirmpassword = "";
                            this.$alert('Password reset successfully','Success','success');
                        }
                    }).catch((error) => {
                        console.log("Error Response" + JSON.stringify(error.response))
                    })
                }
            },
            checkpasswordsmatch: function(){
                if(this.student.newpassword == this.student.newconfirmpassword){
                    this.popUp('confirmationPopUpforresetpassword',this.open);
                }
                else{
                    this.$alert('Passwords do not match','warning','warning');
                }
            },
            getMarksOfAStudent:function(){
                this.heatmapDataAvailability=false;
                let obj={
                    classroomid:this.academicDetails.classid,
                    gradeid:0,
                    academicyearid:this.academicDetails.academicyearid
                };
                UserService.getMarksOfAStudent(this.id,this.academicDetails.passingyear,this.academicDetails.syllabustype,this.getSinglieStudent.id,obj).then((response) =>{
                    this.studentMarksAnalytics=response.data.resultsMap.analytics;
                    let testsLength = Object.keys(this.studentMarksAnalytics).length;
                    if(testsLength>0){
                        this.heatmapDataAvailability=true;
                        let subjectsLength = Object.keys(Object.values(this.studentMarksAnalytics)[0]).length;
                        let dataSize=0;
                        for(let i=0;i<testsLength;i++){
                            this.options2.yAxis.categories[i] = Object.keys(this.studentMarksAnalytics)[i];
                        }
                        for(let j=0;j<=subjectsLength;j++){
                            if(j==subjectsLength){
                                this.options2.xAxis.categories[j] = 'Total';
                            }
                            else{
                                this.options2.xAxis.categories[j]= Object.keys(Object.values(this.studentMarksAnalytics)[0])[j];
                            }       
                        }
                        let maxMarks=0;
                        for(let k=0;k<testsLength;k++){
                            let l=0;
                            for(l=0;l<subjectsLength;l++){
                                if(Object.values(Object.values(this.studentMarksAnalytics)[k])[l].avgmarks == -1){
                                    this.options2.series[0].data[dataSize]=[l,k,0];
                                }
                                else{
                                    this.options2.series[0].data[dataSize]=[l,k,(Object.values(Object.values(this.studentMarksAnalytics)[k])[l].avgmarks)];
                                }
                            dataSize++;
                            }
                            let totalMarks = this.getTotalMarksForHeatmap(Object.values(Object.values(this.studentMarksAnalytics)[k]));
                            if(maxMarks<totalMarks){
                                maxMarks=totalMarks;
                            }
                            this.options2.series[0].data[dataSize]=[l,k,totalMarks];
                            dataSize++;
                        }
                        let maxValue = 10-(maxMarks%10)+maxMarks;
                        if(maxValue>100){
                            this.options2.colorAxis.max = 100;
                        }else{
                            this.options2.colorAxis.max = maxValue;
                        }
                        this.forceRerender();
                    }
                })
                
            },
            getTotalMarksForHeatmap: function(marksBasedOnTestType){
                let length = Object.keys(marksBasedOnTestType).length;
                let totalMarks = 0;
                let totalLength=0;
                for(let i = 0;i< length;i++){
                    if(Object.values(marksBasedOnTestType)[i].avgmarks != -1){
                        totalMarks = totalMarks + Object.values(marksBasedOnTestType)[i].avgmarks;
                        totalLength ++;
                    }
                }
                return totalMarks/totalLength;
            },
             getTotalMarks: function(marksBasedOnTestType){
                let length = Object.keys(marksBasedOnTestType).length;
                let totalMarks = 0;
                for(let i = 0;i< length;i++){
                    if(Object.values(marksBasedOnTestType)[i].marks != -1){
                        totalMarks = totalMarks + Object.values(marksBasedOnTestType)[i].marks;
                    }
                }
                return totalMarks;
            },

            onFileUpload: function(e) {
                const files = e.target.files;
                this.file = files[0];
            },
            uploadStudentImage: function(){
                if (this.file) {
                let fileObj = {
                    file: this.file
                }
                UserService.uploadStudentImage(this.id, this.$store.state.singleStudent.id, fileObj).then((response)=>{
                    console.log(response);
                    if(response.status==200){
                        this.popUp('EDITPARENT',this.close);
                        this.$alert('Uploaded Image successfully','Success','success');
                        this.getSinglieStudent.imageurl = response.data.description;
                        this.$refs.studentimage.value = null;
                    }
                })
                }else{

                }
            },
             getStudentMarksBySubject:function(){
                 this.makeBoxPlotDataEmpty();
                 this.boxplotDataAvailablity=false;
                UserService.getStudentMarksBySubject(this.id,this.academicDetails.academicyearid,this.academicDetails.classid,this.getSinglieStudent.id).then((response)=>{
                    this.listOfStudentMarks = response.data.resultsMap.analytics;
                    this.listOfTest = Object.values(Object.keys(this.listOfStudentMarks));
                    if(Object.keys(this.listOfStudentMarks).length>0){
                        this.boxplotDataAvailablity=true;
                        this.getStudentMarksInBoxPlot(1);
                    }
                  
                })
            },
            makeBoxPlotDataEmpty:function(){
                this.options3.xAxis.categories =[];
                this.options3.series[0].data=[];
                this.options3.series[1].data=[];
                this.options3.series[2].data=[];
                this.options3.yAxis.plotLines[0].value='';
                this.options3.yAxis.plotLines[1].value='';
                this.options3.yAxis.plotLines[0].label.text ='';
                this.options3.yAxis.plotLines[1].label.text ='';
            },
            getStudentMarksInBoxPlot: function(status){
             this.makeBoxPlotDataEmpty();
             this.selectedStatus = status;
             let dataSize=0;

             if(status == 1){
                this.testWise = 'status-btn-click';
                this.subjectWise ='';

              this.options3.xAxis.categories = this.listOfTest;
              for(let i=0;i<this.listOfTest.length;i++){
                 let maxMarks = Object.values(this.listOfStudentMarks)[i].TestData.maxmarks;
                 let minMarks = Object.values(this.listOfStudentMarks)[i].TestData.minmarks;
                 let lowerQuartile = Object.values(this.listOfStudentMarks)[i].TestData.lowerQuartile;
                 let midianQuartile = Object.values(this.listOfStudentMarks)[i].TestData.mediumQuartile;
                 let upperQuartile = Object.values(this.listOfStudentMarks)[i].TestData.upperQuartile;
                 this.options3.series[0].data[dataSize]=[minMarks,lowerQuartile,midianQuartile,upperQuartile,maxMarks];
                 this.options3.series[1].data[dataSize]=[i, Object.values(this.listOfStudentMarks)[i].TestData.singleStudentTestMean];
                 this.options3.series[2].data[dataSize]=[i, Object.values(this.listOfStudentMarks)[i].TestData.allStudentsTestMean];
                 dataSize++;
               }
               this.options3.series[1].tooltip= { pointFormat:" TestMean: {point.y}"}
               this.options3.series[2].tooltip= { pointFormat:" TestMean: {point.y}"}
               this.options3.series[1].name= Object.values(this.listOfStudentMarks)[0].TestData.name;
               this.options3.series[2].name ="All Students";
               this.options3.yAxis.plotLines[0].value = Object.values(this.listOfStudentMarks)[dataSize-1].TestData.singleStudentAllTestsMean;
               this.options3.yAxis.plotLines[0].label.text = Object.values(this.listOfStudentMarks)[0].TestData.name+"'s Mean of all tests "+Object.values(this.listOfStudentMarks)[dataSize-1].TestData.singleStudentAllTestsMean;
               this.options3.yAxis.plotLines[1].label.text ="All Students All Tests Mean "+Object.values(this.listOfStudentMarks)[dataSize-1].TestData.allStudentsAllTestsMean;
               this.options3.yAxis.plotLines[1].value = Object.values(this.listOfStudentMarks)[dataSize-1].TestData.allStudentsAllTestsMean;
               this.options3.xAxis.title= {text: 'Tests'};
               this.options3.title.text="Averages Of A Student In Box Plot";
            }else if(status == 2){
                this.testWise = '';
                this.subjectWise ='status-btn-click';
                this.selectTest();
            }    
        },
        selectTest:function(){
            this.makeBoxPlotDataEmpty();
            this.getSubjectMarksInBoxPlot(this.testId);
        },
        getSubjectMarksInBoxPlot: function(testId){
           let dataSize=0;
           let listOfSubjects =  Object.keys(Object.values(Object.values(this.listOfStudentMarks))[testId]);
           let listOfSubjectsData = Object.values(Object.values(this.listOfStudentMarks))[testId];
           let studentSubjectMarks=[];
           let datasize=0;
            for(let i=0;i<listOfSubjects.length;i++){
                 if(listOfSubjects[i]!="TestData"){
                     studentSubjectMarks[datasize] = Object.values(listOfSubjectsData)[i];
                     datasize++;
              }
            }
            for(let i=0;i<studentSubjectMarks.length;i++){
                this.options3.series[0].data[i]=[studentSubjectMarks[i].minmarks, studentSubjectMarks[i].lowerQuartile, studentSubjectMarks[i].mediumQuartile, studentSubjectMarks[i].upperQuartile,studentSubjectMarks[i].maxmarks];
                this.options3.xAxis.categories[i]= studentSubjectMarks[i].subjectname;
                this.options3.series[1].data[i]=[i,studentSubjectMarks[i].marks];
                this.options3.series[2].data[i]=[i,studentSubjectMarks[i].allStudentsSingleSubjectMean];
            }   
             this.options3.series[1].name= Object.values(listOfSubjectsData)[0].name;
             this.options3.series[1].tooltip= { pointFormat:" Marks: {point.y}"};
             this.options3.series[2].name= "All Students";
             this.options3.series[2].tooltip= { pointFormat:" Mean : {point.y}"}
             this.options3.xAxis.title= {text: 'Subjects'};
             this.options3.yAxis.plotLines[0].label.text=Object.values(this.listOfStudentMarks)[testId].TestData.singleStudentTestMean+" is "+Object.values(this.listOfStudentMarks)[testId].TestData.name+" mean";
             this.options3.yAxis.plotLines[1].label.text=Object.values(this.listOfStudentMarks)[testId].TestData.allStudentsTestMean+" is all studnets mean";
             this.options3.yAxis.plotLines[0].value=Object.values(this.listOfStudentMarks)[testId].TestData.singleStudentTestMean;
             this.options3.yAxis.plotLines[1].value=Object.values(this.listOfStudentMarks)[testId].TestData.allStudentsTestMean;
             this.options3.title.text="Marks Of A Student In Box Plot";
        },
        getStudentMarksInClusteredBar: function(){
        this.clusteredbarDataAvailablity=false;
         UserService.getStudentMarksInClusteredBar(this.id, this.academicDetails.academicyearid,this.academicDetails.classid,this.getSinglieStudent.id).then((response)=>{
                this.marksInClusteredBarMap = response.data.resultsMap.analytics;
                this.testsInClusteredBarMap = Object.values(Object.keys(this.marksInClusteredBarMap));
                if(this.testsInClusteredBarMap.length>0){
                    this.clusteredbarDataAvailablity=true;
                    this.selectClusterbar();
                }
            })
        },
        selectClusterbar:function(){
            this.options4.xAxis.categories=[];
            this.options4.series[0].data=[];
            this.options4.series[1].data=[];
            this.options4.series[2].data=[];
            let listOfSubjects = Object.keys(Object.values(Object.values(this.marksInClusteredBarMap)[this.clusteredId])[0]);
            for(let k=0;k<listOfSubjects.length;k++){
                this.options4.xAxis.categories[k]=listOfSubjects[k];
            }
            let listOfSubjectsData = Object.values(Object.values(Object.values(this.marksInClusteredBarMap))[this.clusteredId]);          
            let subjectMaxMarks = Object.values(listOfSubjectsData[0]);
            let studentMarks = Object.values(listOfSubjectsData[1]);
            let subjectMinMarks = Object.values(listOfSubjectsData[2]);
            for(let u=0;u<subjectMaxMarks.length;u++){
                this.options4.series[0].data[u]= [subjectMaxMarks[u].maxmarks];
                this.options4.series[1].data[u]= [subjectMinMarks[u].minmarks];
                this.options4.series[2].data[u]= [studentMarks[u].marks];   
            } 
           this.forceRerender();
         },
          forceRerender() {
          this.componentKey += 1;
        },
        getStudentAcademicyearsAndSyllabus:function(){
            UserService.getStudentAcademicyearsAndSyllabus(this.id,this.getSinglieStudent.id).then((response)=>{
                this.studentAcademicYearsSyllabusTypes= response.data;             
                this.academicDetails={
                    classid: this.studentAcademicYearsSyllabusTypes[0].classid,
                    passingyear: this.studentAcademicYearsSyllabusTypes[0].passingyear,
                    academicyearid: this.studentAcademicYearsSyllabusTypes[0].id,
                    syllabustype:this.studentAcademicYearsSyllabusTypes[0].syllabustype,
                    syllabusid:this.studentAcademicYearsSyllabusTypes[0].syllabusid,
                    startmonth:this.studentAcademicYearsSyllabusTypes[0].academicyearstarting,
                    endmonth:this.studentAcademicYearsSyllabusTypes[0].academicyearending
                }  
                 this.selectAcadamicYear();     
                 this.getMySubjects();         
            })
        },
        getBooksAnalyticsData: function(){
            this.holdingBooksCount=0;
            this.damagedBooksCount=0;
            this.returnedBooksCount=0;
            this.listOfBooksAnalytics=[];
            UserService.getBooksAnalyticsData(this.id,this.academicDetails.classid,this.getSinglieStudent.id).then((response)=>{ 
                this.listOfBooksAnalytics=response.data.results;
                if(this.listOfBooksAnalytics.length==0){
                    this.booksdataAnalytics[0].data=[];
                    this.booksdataAnalytics[1].data=[];
                    this.booksdataAnalytics[2].data=[];
                    this.booksdataAnalytics[3].data=[];
                }else{
                this.booksClusterBarData();
                this.maxNumber = 10-(this.listOfBooksAnalytics.length%10)+this.listOfBooksAnalytics.length;
                }
               this.forceRerender();
            })
        },
        booksClusterBarData: function(){
                for(let i=0;i<this.listOfBooksAnalytics.length;i++){
                    if(this.listOfBooksAnalytics[i].returned_date!=null){
                        this.returnedBooksCount++;
                    }if(this.listOfBooksAnalytics[i].returned_date==null){
                        this.holdingBooksCount++;
                    }if(this.listOfBooksAnalytics[i].book_status==2 || this.listOfBooksAnalytics[i].book_status==4){
                        this.damagedBooksCount++;
                    }
                }
                this.booksdataAnalytics[0].data[0]=["",this.holdingBooksCount];
                this.booksdataAnalytics[1].data[0]=["",this.damagedBooksCount];
                this.booksdataAnalytics[2].data[0]=["",this.returnedBooksCount];
                this.booksdataAnalytics[3].data[0]=["",this.listOfBooksAnalytics.length];
        }
     },
        mounted(){
        $(document).ready(function() {
            $(".menulist > li").click(function() {
                $(".menulist > li").removeClass('current');
                $(this).addClass('current');
            });

        });
        },
         destroyed(){
            console.log("Destroyed");
            this.$store.commit("SET_SINGLE_STUDENT", {});

        },
        created(){
            if(this.getSinglieStudent.id!=undefined){
                this.getClassRoomAttendanceType();
                this.getStudentAcademicyearsAndSyllabus();
            }
           
              // this.getMonthlyAttendanceByStudentid();
           // this.getStudentMarksBySubject();
        },
        watch:{
            getSinglieStudent(){
               this.getClassRoomAttendanceType();
               this.getStudentAcademicyearsAndSyllabus();
            },
        },
        computed:{
            getSinglieStudent: function(){
                return this.$store.state.singleStudent;
            },
            displayParents: function(){
                return this.$store.state.parentDetails;
            },
            pageCount() {
                let l = this.filterworksheetdataofstudent.length,
                    s = this.size;
                return Math.ceil(l / s);
            },
            filterworksheetdataofstudent() {
                var self = this;
                return this.worksheetdataofstudent.filter(data => {
                    if(data.statusid == 3 || data.statusid == 5){
                        return true;
                    } else {
                        return false;
                    }
                })
            },
            paginatedworksheetdataofstudent() {
                const start = this.pageNumber * this.size,
                    end = start + this.size;
                return this.filterworksheetdataofstudent.slice(start, end);
            },
        }
    }
</script>
<style>
#analysePOpUp {
  height: 600px !important;
}
.modal-dialog1 {
    width: 1000px;
    margin: 30px auto;
}
.showPopUpAlertDiv {
    height: 48px;
    width: 279px;
    margin-top: -26px;
    margin-left: 255px;
}
.alertclass {
  margin-top: -42px;
  height: 42px;
  margin-left: 300px;
  width: 276px;
  align-self:auto;
}
.image{
    height:213px
}
.tital{ 
    font-size:16px; font-weight:500;
    }
.bot-border{ 
    border-bottom:1px #f8f8f8 solid;  margin:5px 0  5px 0
    }
.sidebar3{
    padding-top:30px;
    padding-left:30px;
    padding-right:0px;
    }
.studentanalyticslist{
    list-style-type: none;
    padding:5px;
    border-bottom:1px solid #848FD8;
    }
ul{
    padding-left:0px
    }
li:hover{
  background-color:rgba(255, 255, 255, 0.25);
  cursor:pointer;
}
.link,.link:hover{
    text-decoration:none;
    color:black;
}
 .highcharts-credits{
    display:none
    }
.forminput{
     width:150px;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.acdmcyr{
    margin-left: 40px;
    margin-top: 5px;
}
.studenthr{
    border-top:3px solid darkgrey;
}
.vl {
    border-left: 3px solid darkgrey;
    height: 400px;
}


menulist {
	background-color: #e4801c;
	height: 100%;
}
.current {
	background: #faaf5e;
}
.current:hover{
	background: #faaf5e;
}
.status-btn{
   background-color: white; 
  color: black; 
  padding: 6px 7px;
   border: 2px solid #008CBA;
}
.status-btn-click{
  background-color: #008CBA;
  color: white;
}
.groupFilter{
  float:left;
  width:25%
}
.show-selected-tests{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 10px;
    border: 1px solid #eee;
    box-shadow: 0 2px 3px #ccc;
    padding: 16px;
    text-align: center;
    align-self: left;
    height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
}
.show-selected-tests> div{
  background-color: lightblue;
  margin: 10px;
  padding: 10px;
}
</style>