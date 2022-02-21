<template>
    <div class="container-fluid">
        <div class="row">
            <div class="page-layout">
                <div class="row">
                    <div class="col-md-6">
                        <div class="text-left">
                            <div class="page-heading" v-if="userRole == 'TEACHER'"><span v-html="$t('recommeneded_books')"/> : {{myclass.gradenumber}} - {{myclass.sectionname}}</div>
                            <div class="page-heading" v-if="userRole == 'PARENT' || userRole == 'ADMIN' || userRole == 'STUDENT'"><span v-html="$t('recommeneded_books')"/></div>
                           <!--  <h3 class="student-head" v-if="userRole == 'PARENT'"><span v-html="$t('recommeneded_books')"/> </h3> -->
                        </div>
                    </div>
                    <div class="col-md-6 text-right">
                        <div v-if="userRole == 'ADMIN'">
                            <button class='common-button' v-on:click="popUp('recommendBookPopUp',open);createRecBook();">Recommend New Book</button>
                        </div>
                    </div>
                </div>
                <hr>
                <div style="float:left:width:55%" v-if="userRole == 'ADMIN'">
                    <div>
                        <label class="col-sm-1 control-label" style="width:8.3%; padding-top: 7px;">Groups :</label>
                        <select class="form-control groupFilter" @change="selectGroup()" v-model="group">
                                <option value=0> All </option>
                                <option v-for="group in groupList" v-bind:value="group.groupnumber">{{group.groupname}}</option>
                        </select>
                    </div>
                </div>
                <!-- <div v-if="userRole == 'PARENT'">
                    <label class="col-sm-1 control-label" style="width:8.3%">Child :</label>
                    <select class="form-control groupFilter" v-model="myChildId" @change="selectChild()" >
                    <option v-for="child in childrens" v-bind:value="child.studentid">{{child.name}}</option>
                    </select>
                </div> -->
    
    
                <div class="col-lg-12 subjectteachertable reset-padding reset-margin">
                    <br>
                    <div class="divTable">
                        <div class="divTableBody">
                            <div class="divTableRow">
                                <div class="divTableCell">Book name </div>
                                <div class="divTableCell">Group</div>
                                <div class="divTableCell">Pages</div>
                                <!-- <div class="divTableCell">Section</div> -->
                                <div class="divTableCell">Recommended Date</div>
                                <div class="divTableCell" v-if="userRole == 'ADMIN'">Edit</div>
    
                            </div>
                            <div class="divTableRowdata" v-for="(bookRec,index) in paginatedData">
                                <div class="divTableCelldata">{{bookRec.title}}</div>
                                <div class="divTableCelldata">{{bookRec.groupname}}</div>
                                <div class="divTableCelldata">{{bookRec.numberofpages}}</div>
                                <!-- <div class="divTableCelldata">{{bookRec.sectionname}}</div> -->
                                <div class="divTableCelldata">{{getEntryDate(bookRec.createdon)}}</div>
                                <div class="divTableCelldata" v-if="userRole == 'ADMIN'"><a data-toggle="modal" href="#recommendBookPopUp" v-on:click.prevent="editBookRecommendation(bookRec);"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div>
                        <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
                        <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
                    </div>
                </div>

                <!-- book pop up start-->
                <div class="modal fade" data-keyboard="false" data-backdrop="static" id="recommendBookPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog" style="height:100px">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div>
                                    <h4>Book details</h4>
                                </div>
                                <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                                    {{alertMessage}}
                                </div>
                            </div>
                            <div class="modal-body" style="height:157px;">
                                <div class="addBook1">
                                    <select class="form-control popUpEle selectSubject" v-model="recommendation.bookid">
                                            <option value="">-- Select Book --</option>
                                            <option v-for="book in listOfBooks"  v-bind:value="book.id">{{book.title}}</option>
                                        </select><br>
                                    <select class="form-control popUpEle selectSubject" v-model="recommendation.groupnumber" @change="selectGroupForRec()">
                                            <option value="">-- Select Groups --</option>
                                            <option v-for="group in groupList" v-bind:value="group.groupnumber">{{group.groupname}}</option>
                                        </select><br>
                                </div>
                            </div>
                            <div class="modal-footer" >
                                <button type="button" class="btn btn-danger" data-dismiss="modal" style="margin-right:15px">Cancel</button>
                                <button type="button" id="submit" @click="recommendBook()" class="btn newselection" style="margin-right:100px">Recommend</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- book pop up end-->
            </div>
        </div>
    </div>
</template>

<script>
import UserService from '../../../services/userService.js';
import moment from 'moment'
import { mapGetters } from 'vuex';
export default {
    //props: ['myChild', 'sectiondetails', 'userdetails', 'school'],
    data() {
        return {
            alertMessage: "",
            recommendation: {
                groupnumber:"",
                classroomid: "",
                bookid: '',
            },
            group: 0,
            section: 0,
            open: 'show',
            close: 'hide',
            bookName: '',
            showAlert: false,
            tenantId: this.$cookie.get('id'),
            userRole: this.$cookie.get('userrole'),
            groupList:[],
            sectionsList: [],
            listOfBooks: [],
            selectedBook: "",
            alertMessage: "",
            alertClass: "",
            fail: 'fail',
            success: 'success',
            alertMsgs: {
                alertDanger: 'alert-danger',
                alertSuccess: 'alert-success',
                addedRecGroups: "Successfully added to recommended group",
                selectBook: "You must select book ...",
                errorMsg: "Error while updating the data ..",
                updatedRecGroups: "Successfully updated to recommended group",
                selectGroups: "You must select atleast one group ..."
            },
            alreadyExist: false,
            selectedBookRecId: '',
            pageNumber: 0,
            size: 1,
            search: '',
            listOfBookRecommendations: [],
            academicDetails: {
                academicyearid: this.$store.state.academicYearId,
                syllabustype: this.$store.state.syllabusTypeId
            },
            userId: {
                id: this.$cookie.get('userid')
            },
            sectionsListCopy: [],
            listOfSections: [],
            myclass: '',
             school: {},
            userdetails: {},
            pageNumber: 0,
            size: 10,
            userid: this.$cookie.get('userid'),
            childrens: [],
            myChild: {},
            myChildId: 0,
            pageNumber: 0,
            size: 10,
        }
    },
    created() {

        this.academicDetails.syllabustype = 'STATE';
        this.academicDetails.academicyearid = '1';

        UserService.getListOfBooks(this.tenantId).then((response) => {
            this.listOfBooks = response.data && response.data.results;
           // console.log(JSON.stringify(response.data.results))
        })
        if (this.userRole != 'PARENT' && this.userRole != 'STUDENT' && this.userRole != 'TEACHER') {
            /* UserService.Grades(this.academicDetails.syllabustype, this.tenantId).then((response) => {
                this.groupList = response.data;
            }) */
            UserService.getRecommendedGroups(this.tenantId).then((response) => {
                this.groupList = response.data;
                console.log(JSON.stringify(response.data));
             })
        }
        if (this.userRole == 'PARENT') {
            
            this.tenantId = this.$cookie.get('id');
        this.school = this.$store.state.school;
        this.userdetails = this.$store.state.userDetails;
        this.myChild = this.$store.state.myChild;
        this.myChildId = this.myChild.studentid;
        this.grade = this.myChild.gradenumber;

        //children
        const parentid = {
            "id": this.userid
        }
        UserService.MyChild(this.tenantId, parentid).then((response) => {
            console.log(JSON.stringify(response.data));
            this.childrens = response.data;
            if (this.childrens.length > 0) {
                if (this.myChild == {} || !this.myChild.studentid) {
                    this.myChild = this.childrens[0];
                    this.myChildId = this.myChild.studentid;
                }
                this.$store.commit('SET_MY_CHILD', this.myChild);
                //this.getBookRecommendationsList();
            }
        });
        //children end
        }

        if(this.$store.state.userDetails.userrole == "STUDENT"){
            this.tenantId = this.$cookie.get('id');
            this.school = this.$store.state.school;
            this.userdetails = this.$store.state.userDetails;
            this.myChild = this.$store.state.myChild;
            this.myChildId = this.myChild.studentid;
            this.grade = this.myChild.gradenumber;
        }

        if (this.userRole == 'TEACHER') {
            UserService.MyClass(this.userId, this.tenantId).then((response) => {
                this.myclass = response.data && response.data[0];
                this.grade = response.data && response.data[0] && response.data[0].gradenumber;
                this.getBookRecommendationsList();
            })
        }
        if (this.userRole != 'TEACHER') {
            this.getBookRecommendationsList();
        }
    },
    methods: {
        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        getEntryDate: function(date) {
            return moment(date).format('DD/MM/YYYY');
        },
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        selectGroup: function() {
            this.section = '0';
            this.sectionsList = [];
            let length = this.sectionsListCopy.length;
            for (let i = 0; i < length; i++) {
                if (this.group == this.sectionsListCopy[i].gradenumber) {
                    this.sectionsList.push(this.sectionsListCopy[i]);
                }
            }
        },
        // This method will be called when the child is selected
        selectChild: function(myChild) {
            let length = this.childrens.length;
            for(let i=0;i<length;i++){
                if(this.myChildId == this.childrens[i].studentid){
                    this.myChild = this.childrens[i];
                    break;
                }
            }
            this.$store.commit('SET_MY_CHILD', this.myChild);
            this.getBookRecommendationsList();
        },
        //End
        selectGroupForRec: function() {
            this.recommendation.classroomid = '';
            this.listOfSections = [];
            let length = this.sectionsListCopy.length;
            for (let i = 0; i < length; i++) {
                if (this.recommendation.groupnumber == this.sectionsListCopy[i].gradenumber) {
                    this.listOfSections.push(this.sectionsListCopy[i]);
                }
            }
        },
        createRecBook: function() {
            this.recommendation = {
                groupnumber:'',
                classroomid: "",
                bookid: ''
            };
        },
        editBookRecommendation: function(bookRec) {
            console.log(JSON.stringify(bookRec));
            this.recommendation = JSON.parse(JSON.stringify(bookRec));
        },

        // To save the book recommendations to different groups
        recommendBook: function() {
            if (this.recommendation.bookid == '' || this.recommendation.bookid == 0) {
                this.showAlerts(this.fail, this.alertMsgs.selectBook);
                return;
            }
            if (this.recommendation.groupnumber == "" || this.groupnumber == 0) {
                this.showAlerts(this.fail, this.alertMsgs.selectGroups);
                return;
            }
            /*if(this.recommendation.classroomid == "" || this.recommendation.classroomid == 0){
              this.showAlerts(this.fail,"Please select the section ..");
              return;
            }*/
            this.recommendation.recommendation_id = 1; // Need to change
            //this.recommendation.bookid = this.selectedBook.id;
            //this.recommendation.groupnumber = this.recommendation.group;
            this.recommendation.rating = "A";
            if (!this.recommendation.id) {
                UserService.recommendBook(this.tenantId, this.recommendation).then((response) => {
                    console.log(response.data);
                    this.selectedBookRecId = response.data.results[0].id;
                    this.showAlerts(this.success, this.alertMsgs.addedRecGroups);
                    this.getBookRecommendationsList();
                }).catch((error) => {
                    this.showAlerts(this.fail, this.alertMsgs.errorMsg);
                })
            } else {
                UserService.updateRecommendBook(this.tenantId, this.recommendation).then((response) => {
                    console.log(response.data);
                    this.showAlerts(this.success, this.alertMsgs.updatedRecGroups);
                    this.getBookRecommendationsList();
                }).catch((error) => {
                    this.showAlerts(this.fail, this.alertMsgs.errorMsg);
                })
            }
        },

        getBookRecommendationsList: function() {
            if (this.userRole == 'ADMIN') {
                UserService.getBookRecommendationsList(this.tenantId).then((response) => {
                   // console.log(JSON.stringify(response.data.results))
                    this.listOfBookRecommendations = response.data.results;
                 }).catch(error => {
                    console.log("Error response " + JSON.stringify(error.response))
                })
            } else if (this.userRole == 'TEACHER' || this.userRole == 'PARENT' || this.userRole == 'STUDENT') {
                UserService.getBookRecListByGrade(this.tenantId, this.grade).then((response) => {
                    console.log(JSON.stringify(response.data.results))
                    this.listOfBookRecommendations = response.data.results;
                }).catch(error => {
                    console.log("Error response " + JSON.stringify(error.response))
                })
            }
        },

        showAlerts: function(type, message) {
            if (type == this.fail) {
                this.alertClass = this.alertMsgs.alertDanger;
            } else if (type == this.success) {
                this.alertClass = this.alertMsgs.alertSuccess;
            }
            this.alertMessage = message;
            this.showAlert = true;
            let thisVue = this;
            setTimeout(function() {
                thisVue.alertMessage = "";
                thisVue.alertClass = "";
                thisVue.showAlert = false;
                if (type == thisVue.success) {
                    thisVue.popUp('recommendBookPopUp', thisVue.close);
                }
            }, 1000);
        },
        
    },
    computed: {
        pageCount() {
            let l = this.filterBooks.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        filterBooks: function() {
            var self = this;
            return this.listOfBookRecommendations.filter(function(book) {
                if(self.group == 0){
                    return true;
                }
                if (self.group != 0 && self.section == 0) {
                   //  return book.groupnumber.toString().indexOf(self.group.toString()) >= 0;
                     if (book.groupnumber == self.group) { 
                        return true;
                    }
                } else {
                    return book.gradenumber.toString().indexOf(self.grade.toString()) >= 0 &&
                    book.classroomid.toString().indexOf(self.section.toString()) >= 0;
                }
            });
        },

        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            if (this.group == 0 && this.section == 0) {
                return this.listOfBookRecommendations;
            }
            return this.filterBooks.slice(start, end);
        },
    }
}
</script>

<style scoped>
.modal-dialog {
    overflow-y: initial !important
}

.modal-body {
    height: 370px;
    overflow-y: auto;
    overflow-x: hidden;
}

.popUpEle {
    width: 250px;
    margin: auto;
}

.subjectteachertable {
    width: 100%;
}

.newselection {
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
.newselection:hover {
    color: white;
}
.groupFilter {
    float: left;
    width: 14%
}
.button{
background-color:#039be5;
}
.btn{
    border-radius:0px;
    color:#fff
}
.btn:hover, .btn:focus {
    color: #fff;
    text-decoration: none;
}
.addBook1 {
    float: left;
    width: 378px;
    margin-left: 104px;
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

.showAlertDiv {
    margin-top: -44px;
    height: 42px;
    margin-left: 109px;
    width: 340px;
}
</style>
