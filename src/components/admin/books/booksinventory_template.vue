<template>
   <div>
      <div class="col-lg-12 reset-padding reset-margin">
         <div class="text-left">
            <div class="page-heading"><span v-html="$t('master_inventory')"/></div>
         </div>
         <hr>
      </div>
      <div  class="row reset-padding reset-margin"  style="float: left; width: 90%; margin-left: 0%;">
          <div id="custom-search-input" class="col-md-10 reset-padding reset-margin" style="width:44%">
            <div class="input-group searchbar">
                <input v-model='searchBook' @input="pageNumber=0" type="text" class="search-query form-control" placeholder="Search books by Book Title">
                <span class="input-group-btn">
                    <button class="btn search-btn" type="button">
                        <span class=" glyphicon glyphicon-search"></span>
                </button>
                </span>
            </div> 
        </div> 
         <div style="margin-right: 10px;">
            <button  class="btn btn-newstudent" style="margin-left:300px; width: 90px;" v-on:click="popUp('addBooks',open);">Add Book</button>
        </div><br><br><br>
         <div style="margin-top:-35px;margin-left:0px">
            <label class="col-sm-1 control-label" style="width:10%">Location :</label>
              <select class="form-control gradeFilter" v-model="whereIsBook">
                <option value=""> All </option>
                <option v-for="book in bookLocation" v-bind:value="book">{{book}}</option>
            </select>
         </div>
        <div> 
            <label class="col-sm-1 control-label" style="width:140px; margin-left:30px;">Academic Year :</label>
            <select  class="form-control popUpEle selectSubject" style="width: 16%; margin-left: 20px;" v-model="academicYearDetails" v-on:change="getGradesList()">
                <option value="">All</option>
                <option v-for="academic in academicsandboards" 
                    v-bind:value="{academicyearid: academic.id,syllabustype:academic.syllabustype, passingyear:academic.passingyear}" 
                    :key='academic.id+academic.syllabustype'
                >{{academic.passingyear}}-{{academic.syllabustype}}    <div v-if="academic.active === 1"> - Active </div> </option>
              </select>
        </div>
         <div style="margin-top:-35px;margin-left:650px">
            <label class="col-sm-1 control-label" style="width: 18%;">Grade :</label>
              <select class="form-control gradeFilter" @change="selectGrade()" v-model="gradeid"  style="width: 20%">
                <option value=0 >All</option>
                <option v-for="grade in uniqueGrades" v-bind:value="grade.gradeid">{{grade.gradename}}</option>
            </select>
         </div>
         <div style="margin-left:850px;width:25%">
            <label class="col-sm-1 control-label" style="width: 37%">Section :</label>
           <select class="form-control gradeFilter" style="width: 51%; margin-right: 7px;" v-model="sectionname" @change="pageNumber=0">
               <option value=""> All </option>
               <option v-for="section in sectionsList" v-bind:value="section.sectionname">Section - {{section.sectionname}}</option>
            </select>
         </div>
      </div>
      <div class="col-lg-12 subjectteachertable reset-padding reset-margin">
        <br>
         <div class="divTable">
            <div class="divTableBody">
               <div class="divTableRow">
                   <div class="divTableCell"></div>
                 <div class="divTableCell">Iventory Id</div>
                  <div class="divTableCell">Book Id</div>
                  <div class="divTableCell">Book name</div>
                  <div class="divTableCell">Book value</div>
                  <div class="divTableCell">Rental Value</div>
                  <div class="divTableCell">Available</div>
                  <div class="divTableCell">Where is the book</div>
                  <div class="divTableCell">Pages</div>
                  <div class="divTableCell">Classroom</div>
                  <div class="divTableCell">Count</div>
               </div>
               <div class="divTableRowdata"  v-for="(book,index) in paginatedData">
                  <div class="divTableCelldata"><input :disabled='book.available <= 0' type="checkbox" :value="book" v-model="selectedBooks" :click="showSelectedBooks()"></div> 
                  <div class="divTableCelldata">{{book.id}}</div>
                  <div class="divTableCelldata">{{book.bookid}}</div>
                  <div class="divTableCelldata">{{book.title}}</div>
                  <div class="divTableCelldata">{{book.bookValue}}</div>
                  <div class="divTableCelldata">{{book.rentalValue}}</div>
                  <div class="divTableCelldata">{{book.available == true ? 'Yes': 'No'}}</div>
                  <div class="divTableCelldata">{{book.whereisthebook}}</div>
                  <div class="divTableCelldata">{{book.pages}}</div>
                  <div class="divTableCelldata" v-if="book.available == false">{{book.gradeid == 0 ? '': book.gradename+' -'}} {{book.sectionname}}</div>
                  <div class="divTableCelldata" v-else></div>
                  <div class="divTableCelldata">{{book.available == true ? 1: 0}}</div>
               </div>
            </div>
         </div>
         <br>
         <div style="float:left">
            <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
            <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
         </div>
         <div class="col-md-6 reset-padding reset-margin newstudentbutton" style="float:right;width:40%">
            <button class='btn newstudent pull-right' v-on:click="clearSelectedGrade();"><span v-html="$t('move_books')"/></button>
        </div>
      </div>
    <!-- book pop up start-->
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="assignBookPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog"  style="height:100px">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h4>Book details</h4>
                    </div>
                     <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div> 
                </div>
                <div class="modal-body" style="height:250px">
                      <div class="addBook1">
                        <!-- <select class="form-control popUpEle selectSubject" v-model="moveBook.bookid">
                            <option value="">-- Select Book --</option>
                            <option v-for="book in listOfMasterInventoryBooks" v-bind:value="book.id">{{book.title}}</option>
                        </select><br> -->
                        <select  class="form-control popUpEle selectSubject" v-model="activeacademicDetails" v-on:change="getGradesListForMove()">
                            <option value="" disabled>-- Select Academic year --</option>
                            <option v-for="academic in activeacademicsandboards" 
                                v-bind:value="{academicyearid: academic.id,syllabustype:academic.syllabustype, passingyear:academic.passingyear}" 
                                :key='academic.id+academic.syllabustype'
                                v-show="academic.active"
                            >{{academic.passingyear}}-{{academic.syllabustype}}</option>
                        </select><br>
                        <select class="form-control popUpEle selectSubject"  v-model="moveBook.gradeid" @change="selectGradeToMoveBook()">
                            <option value="">-- Select Grade --</option>
                            <option v-for="grade in listOfUniqueGrades" v-bind:value="grade.gradeid">{{grade.gradename}}</option>
                        </select><br>
                        <select class="form-control popUpEle selectSubject" :disabled="!moveBook.gradeid" v-model="moveBook.classroom_id">
                            <option value="">-- Select Section --</option>
                            <option v-for="section in listOfSections" v-bind:value="section.id">Section - {{section.sectionname}}</option>
                        </select><br>
                      </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" id="submit" @click="moveSelectedBooks()" class="btn btn-newstudent">Move</button>
                </div>
            </div>
        </div>
    </div>
    <!-- book pop up end-->
    <!-- alert pop up start  -->
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
      <!-- alert pop up end  -->

    <!-- add stock in master inventory pop up start -->
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="addBooks" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog"  style="height:100px">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h4>Add Books</h4>
                    </div>
                    <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                        {{alertMessage}}
                    </div>
                </div>
                <div class="modal-body" style="height:150px">
                      <div class="addBook1">
                        <select class="form-control popUpEle selectSubject" v-model="newBook">
                            <option value="">-- Select Book -- </option>
                            <option v-for="book in listOfBooks" v-bind:value="book">{{book.title}}</option>
                        </select><br>
                        <input type="text" class="form-control popUpEle" placeholder="Enter Stock " v-model="updateStock" name=""> <br>
                      </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal"  v-on:click="clearSelectedData();">Cancel</button>
                    <button type="button" id="submit" @click="addBooksToMaster()" class="btn btn-newstudent" style="width:100px">Add Book</button>
                </div>
            </div>
        </div>
    </div>
    <!-- add stock in master inventory pop up end-->
   </div>
</template>
<style>
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
  margin:auto;
}
.subjectteachertable{
width:100%;
}

.newsection{
background-color: #039be5;
background-image: none;
border-color: #039be5;
color:white;
padding: 5px 30px;
margin-top: -2px;
font-size: 14px;
font-weight: bold;
text-transform: uppercase;
text-decoration:none;
border-radius:0px
}
.newsection:hover{
color:white;
}
button{
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

.gradeFilter{
  float:left;
  width:15%
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
<script>
import UserService from '../../../services/userService.js';
import { mapGetters } from 'vuex';
export default ({
 data() {
        return {
            alertMessage: "",
            alertType:"",
            grade: 0,
            sectionname:"",
            open: 'show',
            close: 'hide',
            bookName: '',
            showAlert: false,
            tenantId: this.$cookie.get('id'),
            gradesList: [],
            sectionsList: [],
            listOfMasterInventoryBooks: [],
            listOfBooks:[],
            whereIsBook:'',
            bookLocation:[],
            pageNumber: 0,
            fail: 'fail',
            success: 'success',
            size: 10,
            listOfSections: [],
            searchBook:'',
            moveBook:{classroom_id:"",gradeid:'',bookid:'',id:''},
            updateStock:'',
            selectedBooks : [],
            popUpAlertMessage:'',
            popUpAlertType:'',
             alertMsgs: {
                alertDanger: 'alert-danger',
                alertSuccess: 'alert-success',
                selectSection: "You must select the section",
                selectGrades: "You must select atleast one grade ",
                selectBook: "You must select atleast one book",
                selectStock:"Please enter books count to add"
            },
            newBook:[],
            activeacademicsandboards:[],
            academicsandboards:[],
            activeacademicDetails:{},
            academicYearDetails:{},
            listOfIds:[],
            listOfUniqueGrades:[],
            listOfGradesAndSections:[],
            gradeid:0,
            uniqueGrades:[]

        }
    },
    created() {
        this.getMasterInventoryBooksList();
        UserService.getListOfBooks(this.tenantId).then((response)=>{
           this.listOfBooks=response.data && response.data.results;
        }) 
         UserService.AcademicYears(this.tenantId).then((response)=>{
         this.academicsandboards=response.data.academics;
          for(let i=0;i<this.academicsandboards.length;i++){
            if(this.academicsandboards[i].active){
               this.activeacademicsandboards.push(this.academicsandboards[i]);
            }
         }
        //  if(this.academicsandboards.length>0){
        //       this.academicYearDetails={
        //      academicyearid: this.academicsandboards[0].id,
        //      syllabustype:this.academicsandboards[0].syllabustype, 
        //      passingyear:this.academicsandboards[0].passingyear
        //      }
        //      this.getGradesList();
        //   }
        if(this.activeacademicsandboards.length>0){
            this.activeacademicDetails={
            academicyearid: this.activeacademicsandboards[0].id,
            syllabustype:this.activeacademicsandboards[0].syllabustype, 
            passingyear:this.activeacademicsandboards[0].passingyear
             }
             this.getGradesListForMove();
           }
        })    
    },
    methods: {
         popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        selectGrade: function() {
          this.sectionname="";
          this.sectionsList =[];
          let length =this.gradesList.length;
          for(let i=0;i<length;i++){
              if(this.gradeid == this.gradesList[i].gradeid){
                 this.sectionsList.push(this.gradesList[i]);  
              }
          }
            this.pageNumber=0;
        },
         selectGradeToMoveBook:function(){
          this.moveBook.classroom_id ='';
          this.listOfSections =[];
          let length =this.listOfGradesAndSections.length;
          for(let i=0;i<length;i++){
            if(this.moveBook.gradeid == this.listOfGradesAndSections[i].gradeid){
              this.listOfSections.push(this.listOfGradesAndSections[i]);
            }
          }
        }, 
        getMasterInventoryBooksList: function() {
            UserService.getMasterInventoryBooksList(this.tenantId).then((response) => {
                this.listOfMasterInventoryBooks = response.data.results;
                let datasize=0;
                for(let i=0;i<this.listOfMasterInventoryBooks.length ;i++){
                    if(this.listOfMasterInventoryBooks[i].whereisthebook!=null){
                         this.bookLocation[datasize]= this.listOfMasterInventoryBooks[i].whereisthebook
                         datasize++;
                    }
                }
                this.bookLocation = [...new Set(this.bookLocation)]
            }).catch((error) => {
                console.log(JSON.stringify(response.data))
            })
        },
        showSelectedBooks : function(){
            console.log(JSON.stringify(this.selectedBooks))
        },

        clearSelectedGrade : function(){
            this.moveBook = {classroom_id:"",gradeid:'',bookid:'',id:''};
            if(this.selectedBooks.length > 0){
                this.popUp('assignBookPopUp',open);
            }else{
                 this.alertMessage ='you must select atleast one book';
                this.alertType = 'Error';
                this.popUp('alertPopUp',this.open);
            }
        },
        clearSelectedData: function(){
            this.newBook=[];
            this.updateStock="";
        },
        moveSelectedBooks : function (){
            let length = this.selectedBooks.length;
            let movedBooks = [];
            
            if(length > 0){
                if(!this.moveBook.gradeid){
                   // console.log(this.moveBook.gradeid);
                    this.showAlerts(this.fail, this.alertMsgs.selectGrades);
                    return;
                }else if(!this.moveBook.classroom_id){
                    this.showAlerts(this.fail, this.alertMsgs.selectSection);
                    return;
                }
                for(let i=0;i<length;i++){
                    let movedBook = {
                        bookid : this.selectedBooks[i].bookid,
                        gradeid:this.moveBook.gradeid,
                        classroom_id:this.moveBook.classroom_id,
                        book_inventory_id:this.selectedBooks[i].id,
                        available:this.selectedBooks[i].available
                        //total_stock:this.selectedBooks[i].bookid
                    }   
                    movedBooks.push(movedBook);
                }
                let obj ={
                classRoomBooks:movedBooks
            };
                UserService.moveSelectedBooks(this.tenantId,obj).then((response) => {
              //  console.log(JSON.stringify(response.data))
                this.showAlerts(this.success, response.data.resultsMap.message);
                this.selectedBooks = [];
                this.getMasterInventoryBooksList();
            }).catch((error) => {
              //  console.log(JSON.stringify(response.data))
            })
            }else{
                this.alertMessage ='you must select atleast one book';
                this.alertType = 'Error';
                this.popUp('alertPopUp',this.open);
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
                    thisVue.popUp('assignBookPopUp', thisVue.close);
                }
            }, 1000);
        },
        addBooksToMaster:function(){
            let book = {};
            if(this.newBook == '' || this.newBook == 0) {
                this.addBookShowAlerts(this.fail, this.alertMsgs.selectBook);
                return;
            }
            if(this.updateStock == '' || this.updateStock == 0) {
                this.addBookShowAlerts(this.fail, this.alertMsgs.selectStock);
                return;
            }
            this.newBook.stock = this.updateStock;
            book = JSON.parse(JSON.stringify(this.newBook));
            UserService.updateBook(book, this.tenantId).then((response) => {
                this.addBookShowAlerts(this.success, response.data.message);
                let resultMessage = response.data.message;
                if(resultMessage.toLowerCase().includes('successfully')){
                    this.getMasterInventoryBooksList();
                }
             }).catch(error => {
                console.log("Error response ", JSON.stringify(error.response))
                this.addBookShowAlerts(this.fail, "Error while updating");
            })
            this.clearSelectedData();
        },
        addBookShowAlerts: function(type, message) {
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
                    thisVue.popUp('addBooks', thisVue.close);
                }
            }, 1000);
        },
        getGradesList:function(){
            this.uniqueGrades=[];
            this.gradesList=[];
            this.sectionname="";
            this.sectionsList =[];
            console.log("---00>",this.academicYearDetails);
            if(this.academicYearDetails.passingyear!=null && this.academicYearDetails.syllabustype!=null){
              UserService.getGradesAndSections(this.tenantId,this.academicYearDetails.passingyear,this.academicYearDetails.syllabustype).then((response)=>{      
              this.uniqueGrades = response.data.uniqueGradesList;
              this.gradesList = response.data.gradesAndSectionsList;
         }) 
            }  
        },
        getGradesListForMove:function(){
             UserService.getGradesAndSections(this.tenantId,this.activeacademicDetails.passingyear,this.activeacademicDetails.syllabustype).then((response)=>{      
              this.listOfUniqueGrades = response.data.uniqueGradesList;
              this.listOfGradesAndSections = response.data.gradesAndSectionsList;
         }) 
        }
    },

    computed: {
        pageCount() {
            let l = this.filterBooks.length,
                s = this.size;
            return Math.ceil(l / s);
        },

        filterBooks: function() {
            var self = this;
            return this.listOfMasterInventoryBooks.filter(function(bookRec) {
                let searchBookResult;
                let whereIsBookResult;
                let academicYearResult;
                let gradeIdResult;
                let sectionResult;
                  if(self.searchBook==""){
                      searchBookResult= true;
                  }else{
                     searchBookResult= bookRec.title.toString().toLowerCase().indexOf(self.searchBook.toString().toLowerCase()) >= 0;
                  }
                  if(self.whereIsBook=="" ){
                      whereIsBookResult=true;
                  }else{
                      whereIsBookResult =(self.whereIsBook == bookRec.whereisthebook);
                  }if(Object.keys(self.academicYearDetails).length==0){
                      academicYearResult=true;
                  }else{
                      academicYearResult=(self.academicYearDetails.academicyearid == bookRec.academicid);
                  }if(self.gradeid == 0){
                      gradeIdResult=true;
                  }else{
                      gradeIdResult=(self.gradeid == bookRec.gradeid);
                  }if(self.sectionname == ""){
                      sectionResult=true;
                  }else{
                      sectionResult=(self.sectionname == bookRec.sectionname);
                  }

                return searchBookResult && whereIsBookResult && academicYearResult && gradeIdResult && sectionResult;	
            });
        },

        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filterBooks.slice(start, end);
        },
    }
  
})
</script>

