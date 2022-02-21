<template>
    <div class="container-fluid">
        <div class="row">
            <div class="page-layout">
                <div class="row">
                    <div class="col-md-3">
                        <div class="page-heading"><span v-html="$t('books')"/></div>
                    </div>
                    <div class="col-md-9">
                        
                        <div class="pull-right" v-if="userRole == 'ADMIN'">
                            <div class="pull-left" style="padding:7px 5px 0 0">Import Books</div>
                            <div class="upload-btn-wrapper pull-left" style="padding:0 10px 0 0">
                                <button class="select-upload-btn" >Select file</button>
                                <input style="width:192px;float:left" name="myfile" type="file" placeholder="Select file to upload" id="" @change='onFileUpload($event)' single>
                            </div>
                            <button class='btn file-upload-btn pull-right' v-on:click="uploadFile()">Import</button>
                              <span v-if="file" style="padding:0 10px 0 20px">{{file.name}}</span>
                        </div>
                        <div class="pull-right" v-if="userRole == 'ADMIN'" style="padding:0 10px 0 0">
                            <button class='common-button pull-right' v-on:click="popUp('bookPopUp',open);createBook(bookIndex)">Add New Book</button>
                        </div>
                        <div id="custom-search-input" class="pull-left" style="padding:10px 0 0 200px">
                            <div class="input-group searchbar">
                                <input v-model='search' @input="pageNumber=0" type="text" class="search-query form-control" placeholder="Search books by Name/Genre ....">
                                <span class="input-group-btn">
                                    <button class="btn search-btn" type="button">
                                        <span class=" glyphicon glyphicon-search"></span>
                                </button>
                                </span>
                            </div>
                        </div>
                        <div class="pull-right" style="padding:15px 50px 0 0" v-if="userRole == 'ADMIN'">
                           <p>sample template for <a href="https://ischool-project.s3.ap-south-1.amazonaws.com/Import_Books_Template.xlsx">Importing Books</a></p>
                        </div>
                    </div>
                </div>
                <hr>
                <div class="subjectteachertable ">
                    <div class="divTable">
                        <div class="divTableBody">
                            <div class="divTableRow">
                                <div class="divTableCell" style="width:7%">Book Id</div>
                                <div class="divTableCell">Book CoverPage</div>
                                <div class="divTableCell">Book Title</div>
                                <div class="divTableCell">Author</div>
                                <div class="divTableCell">Genre</div>
                                <div class="divTableCell">Book Publisher</div>
                                <div class="divTableCell">Pages</div>
                                <div class="divTableCell" v-if="userRole == 'ADMIN'">Edit</div>
                                <div class="divTableCell" v-if="userRole == 'ADMIN'">Recommend</div>
                            </div>
                            <div class="divTableRowdata" v-for="(book,index) in paginatedData">
                                <div class="divTableCelldata">{{book.id}}</div>
                                <div class="divTableCelldata">
                                    <img :src="book.bookcoverpage" v-if="book.bookcoverpage!= null" style="width:60px;height:70px" @error="$event.target.src='https://imgp.whaleshares.io/pimgp/a/einstei1/p/image-not-found-shitpostfriday/0x0/https://img.whaleshares.io/wls-img/einstei1/d765e65f432e7e6f0d062616d19364ecdc5631da.png'">
                                    <img style="width:60px;height:70px" src='https://imgp.whaleshares.io/pimgp/a/einstei1/p/image-not-found-shitpostfriday/0x0/https://img.whaleshares.io/wls-img/einstei1/d765e65f432e7e6f0d062616d19364ecdc5631da.png' v-else>
                                </div>
                                <div class="divTableCelldata">
                                    <button class="btnAsLink" @click="eachBook(book)">{{book.title}}</button>
                                </div>
                                <div class="divTableCelldata">
                                    {{book.author}}
                                </div>
                                <div class="divTableCelldata">
                                    {{getGenreName(book.generes)}}
                                </div>
                                <div class="divTableCelldata">
                                    {{book.publisher}}
                                </div>
                                <div class="divTableCelldata">
                                    {{book.numberofpages}}
                                </div>
                                <div class="divTableCelldata" v-if="userRole == 'ADMIN'"><a data-toggle="modal" href="#editstudent" @click="editBookDetails(book,index);"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                                <div class="divTableCelldata" v-if="userRole == 'ADMIN'"><a data-toggle="modal" v-on:click="popUp('recommendBookPopUp',open);createRecBook(book);" id="addRecBook">&#10004;</a></div>
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
                <div class="modal fade" data-keyboard="false" data-backdrop="static" id="bookPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" style="overflow-y: scroll; max-height:85%;">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div>
                                    <h4>Book details</h4>
                                </div>
                                <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                                    {{alertMessage}}
                                </div>
                            </div>
                            <div class="modal-body">
                                <!-- <div class="bookDetails"> -->
                                <div class="addBook1">
                                    <input type="text" class="form-control popUpEle" placeholder="Enter book title *" v-model="book.title" name="" required><br>
                                    <input type="text" class="form-control popUpEle" placeholder="Enter book author's name *" v-model="book.author" name="" required><br>
                                    <textarea class="form-control popUpEle" v-model="book.bookdescription" style="height: 89px;" placeholder="Enter book description *" required></textarea><br>
                                    <input type="text" class="form-control popUpEle" placeholder="Enter isbncode " v-model="book.isbncode" name=""><br>
                                    <select v-model="book.generes" class="form-control popUpEle selectSubject">
                                        <option value="">-- Select Genre --</option>
                                        <option v-for="genre in listOfGenres" v-bind:value="genre.id">{{genre.genrename}}</option>
                                    </select>
                                    <br>
                                    <input type="text" class="form-control popUpEle" placeholder="Enter Stock " v-model="book.stock" name=""> <br>
                                    <input type="text" class="form-control popUpEle" placeholder="Enter edition " v-model="book.edition" name=""> <br>
                                    <input type="text" class="form-control popUpEle" placeholder="Enter book price " v-model="book.bookprice" name=""><br>
                                    <input type="text" class="form-control popUpEle" placeholder="select book cover page " v-model="book.bookcoverpage" name=""><br>
                                    <!-- <input type="file" class="form-control popUpEle" placeholder="select book cover page "  name=""><br> -->
                                    <input type="text" class="form-control popUpEle" placeholder="Enter book demand " v-model="book.demand" name=""><br>
                                </div>
                                <div class="addBook2">
                                    <!-- <input type="text" class="form-control popUpEle" placeholder="Enter year " v-model="book.year" name=""> -->
                                    <date-picker lang="en" style="width:247px;margin-left: 27px;" placeholder="Select Year  " v-model="book.year"></date-picker><br><br>
                                    <!-- <input type="text" class="form-control popUpEle" placeholder="Enter publication date " v-model="book.publicationdate" name=""><br> -->
                                    <date-picker lang="en" style="width:247px;margin-left: 27px;" placeholder="Select publication date  " v-model="book.publicationdate"></date-picker><br><br>
                                    <input type="text" class="form-control popUpEle" placeholder="Enter publisher " v-model="book.publisher" name=""><br>
                                    <input type="text" class="form-control popUpEle" placeholder="Enter samplepageurl " v-model="book.samplepageurl" name=""><br>
                                    <input type="text" class="form-control popUpEle" placeholder="Enter imagesUrl1 " v-model="book.imagesUrl1" name=""><br>
                                    <input type="text" class="form-control popUpEle" placeholder="Enter imagesUrl2 " v-model="book.imagesUrl2" name=""><br>
                                    <input type="text" class="form-control popUpEle" placeholder="Enter book condition " v-model="book.bookcondition" name=""><br>
                                    <input type="text" class="form-control popUpEle" placeholder="Enter book rental value " v-model="book.baserentalvalue" name=""><br>
                                    <input type="text" class="form-control popUpEle" placeholder="Enter number of pages " v-model="book.numberofpages" name=""><br>
                                    <input type="text" class="form-control popUpEle" placeholder="Enter Group id " v-model="book.productgroup" name=""><br>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                                <button type="button" id="submit" @click="saveBookDetails(bookIndex,book.id)" class="btn btn-primary">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- book pop up end-->
    
                <!-- confirmation pop up start  -->
                <div class="modal fade" id="alertPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog" style="width:472px">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h4>{{alertType}}</h4>
                            </div>
                            <div class="modal-body" style="height:75px;">
                                {{alertMessage}}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal">OK</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- confirmation pop up end  -->
              
              <!-- book pop up start-->
                <div class="modal fade" data-keyboard="false" data-backdrop="static" id="recommendBookPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="margin-top:100px">
                    <div class="modal-dialog" style="height:100px">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div>
                                    <h4>Add To Recommend Books</h4>
                                </div>
                                <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                                    {{alertMessage}}
                                </div>
                            </div>
                            <div class="modal-body" style="height:200px">
                                <div> {{this.recBookDetails.title}} </div>
                                </br><hr>
                                <div class="addBook1">
                                    <select class="form-control popUpEle selectSubject" v-model="recommendation.groupnumber" @change="selectGroupForRec()">
                                            <option value="">-- Select Grade --</option>
                                            <option v-for="group in groupList" v-bind:value="group.groupnumber">{{group.groupname}}</option>
                                        </select><br>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                                <button type="button" id="submit" @click="recommendBook()" class="btn btn-newstudent">Recommend</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- book pop up end-->
            </div>
        </div>
    </div>
</template>

<style lang="scss">

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

.newsection {
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

.newsection:hover {
    color: white;
}

button {
    background-color: #039be5;
}

.btn {
    border-radius: 0px;
    color: #fff
}

.btn:hover,
.btn:focus {
    color: #fff;
    text-decoration: none;
}

.gradeFilter {
    float: left;
    width: 20%
}

.newstudent {
    background-color: #039be5;
    background-image: none;
    border-color: #039be5;
    color: white;
    padding: 5px 30px;
    margin-top: 1px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration: none;
    border-radius: 0px
}

* .newstudent:hover {
    color: white;
}

.btnAsLink {
    background: none;
    border: none;
    color: blue;
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
    color: #428bca;
}

.bookDetails {
    margin: auto;
    width: 500px;
}

.showAlertDiv {
    margin-top: -42px;
    height: 42px;
    margin-left:230px;
}

.addBook1 {
    float: left;
    width: 378px;
    margin-left: 104px;
}

.addBook2 {
    width: 300px;
    float: left;
}

.modal-dialog {
    overflow-y: initial !important
}

.modal-body {
    height: 370px;
    overflow-y: auto;
    overflow-x: hidden;
}

.upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
        margin-right: -15px;

}

.file-upload-btn {
    margin-left: 10px;
    background-color: #0b366f;
    background-image: none;
    border-color: #0b366f;
    color: white;
    padding: 5px 30px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 3px
}

.upload-btn-wrapper input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
}
.search-btn .glyphicon-search{
    color: #000
}

.select-upload-btn{
 margin-left: 10px;
    background-color: #fff;
    background-image: none;
    border-color: #0b366f;
    color: #0b366f;
    padding: 5px 30px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 3px
}
#addRecBook{
    color:#3366FF;
    font-size:22px;
    cursor: pointer;
    margin-left:20px
}

</style>


<script>
import EventBus from '../../../event-bus.js'
import { mapState } from 'vuex'
import { mapMutations } from 'vuex'
import UserService from '../../../services/userService.js';
import DatePicker from 'vue2-datepicker';
import userService from '../../../services/userService.js';
import store from '../../../store.js'

export default {
    components: {
        DatePicker
    },
    data() {
        return {
            open: 'show',
            close: 'hide',
            bookName: '',
            showAlert: false,
            gradeVal: '',
            sectionVal: '',
            subjectVal: '',
            alertClass: "",
            alertMessage: "",
            alertType: "",
            fail: 'fail',
            success: 'success',
            userRole: this.$cookie.get('userrole'),
            listOfGrades: [{
                text: '1st class',
                value: 1
            }, {
                text: '2nd class',
                value: 2
            }],
            listOfSections: [{
                text: 'Section - A',
                value: 1
            }, {
                text: 'Section - B',
                value: 2
            }],
            listOfStatus: [{
                text: 'Active',
                value: 1
            }, {
                text: 'In active',
                value: 2
            }],
            listOfSubjects: [{
                text: 'Maths',
                value: 1
            }, {
                text: 'Physics',
                value: 2
            }],
            QuestionTypeValue: "",
            listOfBooks: [],
            groupList: [],
            book: {},
            bookIndex: '',
            id: 0,
            pageNumber: 0,
            size: 10,
            search: '',
            tenantId: this.$cookie.get('id'),
            file: '',
            listOfGenres: [],
            recommendation: {
                gradeid: "",
                classroomid: "",
                bookid: ''
            },
            sectionsListCopy: [],
            selectedBookRecId: '',
            recBookDetails:[],
            academicDetails: {
                academicyearid: this.$store.state.academicYearId,
                syllabustype: this.$store.state.syllabusTypeId
            },
            alertMsgs: {
                alertDanger: 'alert-danger',
                alertSuccess: 'alert-success',
                addedRecGrades: "Successfully added Recommended Book",
                errorMsg: "Error while updating the data ..",
                selectGroups: "You must select atleast one group ..."
            },
        }
    },
    created() {
        /*UserService.getEntityData(this.tenantId).then((response)=>{
           this.listOfBooks=response.data; // change it to each drop down
           console.log(response.data)
        })*/
        this.academicDetails.syllabustype = 'STATE';
        this.academicDetails.academicyearid = '1';
        this.getListOfBooks();
        UserService.getListOfGenres(this.tenantId).then((response) => {
            this.listOfGenres = response.data && response.data.results;
        //    console.log(JSON.stringify(response.data.results))
        })
        if(this.userRole == 'ADMIN'){
            UserService.getRecommendedGroups(this.tenantId).then((response) => {
            this.groupList = response.data;
            // console.log(JSON.stringify(response.data));
            })
        }
    },
    methods: {
        ...mapMutations([
            'SET_SELETECTED_BOOK'
        ]),

        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        getNameFromVal: function(id, list) {
            let length = list.length;
            if (length > 0) {
                for (let i = 0; i < length; i++) {
                    if (id == list[i].value) {
                        return list[i].text;
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

        eachBook: function(book) {
            console.log(book);
            this.book = book;

            //this.SET_SELETECTED_BOOK(book);
            store.commit('SET_SELETECTED_BOOK', book);
            this.$router.push({
                path: 'book'
            })
        },

        getListOfBooks: function() {
            UserService.getListOfBooks(this.tenantId).then((response) => {
                this.listOfBooks = response.data && response.data.results;
               // console.log(JSON.stringify(response.data.results))
            })
        },

        getGenreName: function(genreId) {
            let length = this.listOfGenres.length;
            for (let i = 0; i < length; i++) {
                if (genreId == this.listOfGenres[i].id) {
                    return this.listOfGenres[i].genrename;
                }
            }
        },

        createBook: function() {
            this.book = {
                bookName: '',
                bookdescription: '',
                productgroup: '',
                title: '',
                author: '',
                isbncode: '',
                generes: '',
                edition: '',
                stock: '',
                bookcondition: '',
                bookprice: '',
                baserentalvalue: '',
                demand: '',
                numberofpages: '',
                productgroup: '',
                publicationdate: '',
                publisher: ''
            };

        },
        editBookDetails: function(book, index) {
            this.bookIndex = index;
            this.book = {};
            this.book = JSON.parse(JSON.stringify(book));;

            this.popUp('bookPopUp', this.open);
        },

        onFileUpload(e) {
            console.log(e);
            const files = e.target.files;
            this.file = files[0]; //e && e.srcElement && e.srcElement.value;
            e.srcElement.value = null;
            //this.newFilesList[0] = files[0];
            ///this.addImage(this.newFilesList[0], optionIndex);
        },

        uploadFile: function() {
            if (this.file) {
                let fileObj = {
                    file: this.file
                }
                UserService.uploadBooksListFile(this.tenantId, fileObj).then((response) => {
                    console.log(response.data)
                    /* alert(response.data.resultsMap.message) */
                    let resultMessage = response.data.resultsMap.message;
                    console.log(resultMessage);
                    if(resultMessage.includes('Successfully')){
                        this.alertType = 'Success';
                        this.alertMessage = resultMessage;
                    }else{
                        this.alertType = 'Failed';
                        this.alertMessage = resultMessage;
                    }
                    this.popUp('alertPopUp', this.open);
                    this.getListOfBooks();
                    this.file='';
                }).catch((error) => {
                })
            } else {
                this.alertType = 'Failed';
                this.alertMessage = "You must select the file";
                this.popUp('alertPopUp', this.open);
                //alert("You must select the file")
            }
        },

        checkEmptyVal: function(val) {
            if (!val) {
                return true;
            }
            return false;
        },

        validateFields: function(book) {
            let bookObj = {
                bookName: book.bookName,
                bookdescription: book.bookdescription,
                productgroup: book.productgroup,
                title: book.title,
                author: book.author,
                isbncode: book.isbncode,
                generes: book.generes,
                edition: book.edition,
                stock: book.stock,
                bookcondition: book.bookcondition,
                bookprice: book.bookprice,
                baserentalvalue: book.baserentalvalue,
                demand: book.demand,
                numberofpages: book.numberofpages,
                productgroup: book.productgroup,
                publicationdate: book.publicationdate,
                publisher: book.publisher
            };
            for (let key in bookObj) {
                if (bookObj.hasOwnProperty(key)) {
                    if (checkEmptyVal(bookObj[key])) {
                        return true;
                    }
                }
            }
        },
         createRecBook: function(book) {
             this.recBookDetails = book;
            this.recommendation = {
                gradeid: "",
                classroomid: "",
                bookid: ''
            };
        },
        saveBookDetails: function(index, id) {
            if (this.validateFields()) {
                this.setAlertMessage('fail', '');
            } else {
                let book = {};
                book = JSON.parse(JSON.stringify(this.book));
                if (book && book.id) {
                    UserService.updateBook(book, this.tenantId).then((response) => {
                        this.getListOfBooks();
                        this.setAlertMessage('success', response.data.message);
                    }).catch(error => {
                        console.log("Error response " + JSON.stringify(error.response))
                        this.setAlertMessage('fail', '');
                    })
                } else {
                    UserService.newBook(book, this.tenantId).then((response) => {
                        book.publicationdate = this.book.publicationdate;
                        book.year = this.book.year;
                        //this.listOfBooks.push(book);
                        this.getListOfBooks();
                        if(response.data.message.includes("updated")){
                            this.setAlertMessage('success', "This book copy is in booklist so books is "+response.data.message);
                        }else if(response.data.message.includes("created")){
                            this.setAlertMessage('success',  "The book is "+response.data.message);
                        }
                    }).catch(error => {
                        console.log("Error response " + JSON.stringify(error.response))
                        this.setAlertMessage('fail', '');
                    })
                }
            }
        },
        validateFields: function() {
            if (this.checkEmptyVal(this.book.title)) {
                return true;
            }else if (this.checkEmptyVal(this.book.author)) {
                return true;
            }
            else if (this.checkEmptyVal(this.book.bookdescription)) {
                return true;
            } 
            return false;
        },
        /* checkEmptyVal: function(val) {
             if (val == '' || val == null) {
                 return true;
             }
             return false;
         },*/
        //Shows the alert message on homepage 
        setAlertMessage: function(type, addOrUpdate) {
            if (type == 'fail') {
                this.alertMessage = "You must enter all the mandatory data ";
                this.alertClass = 'alert-danger';
            } else if (type == 'success') {
                this.alertMessage = addOrUpdate;
                this.alertClass = 'alert-success';
            }
            this.showAlert = true;
            let thisVue = this;
            setTimeout(function() {
                thisVue.alertMessage = '';
                thisVue.alertClass = '';
                thisVue.showAlert = false;
                if (type == 'success') {
                    thisVue.popUp('bookPopUp', thisVue.close);
                }
            }, 1500);
        },
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
        recommendBook: function() {
            if (this.recommendation.groupnumber == "" || this.groupnumber == 0) {
                this.showAlerts(this.fail, this.alertMsgs.selectGroups);
                return;
            }
            this.recommendation.bookid = this.recBookDetails.id;
            this.recommendation.recommendation_id = 1; // Need to change
            this.recommendation.rating = "A"; 
            UserService.recommendBook(this.tenantId, this.recommendation).then((response) => {
                this.selectedBookRecId = response.data.results[0].id;
                this.showAlerts(this.success, this.alertMsgs.addedRecGrades);
            }).catch((error) => {
                this.showAlerts(this.fail, this.alertMsgs.errorMsg);
            })
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
            }, 1200);
        }
    },
    computed: {

        /* ...mapState([
          'nameOfUser'
          ]),*/

        pageCount() {
            let l = this.filterBooks.length,
                s = this.size;
            return Math.ceil(l / s);
        },

        filterBooks: function() {
            var self = this;

            return this.listOfBooks.filter(function(book) {
                let genreName = self.getGenreName(book.generes);
                let genreFilter;
                if (!genreName) {
                    genreFilter = false;
                } else {
                    genreFilter = genreName.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
                }
                return book.title.toLowerCase().indexOf(self.search.toLowerCase()) >= 0 ||
                    genreFilter;
            });
        },
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filterBooks.slice(start, end);
        },
    }
}
</script>
