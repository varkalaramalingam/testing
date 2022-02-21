<template>
    <div>
        <div class="col-lg-12 reset-padding reset-margin">
            <div class="text-left">
                <div class="page-heading"><span v-html="$t('move_books')"/></div>
            </div>
            <hr>
        </div>
        
        <div style="float:left:width:55%">
          <div> 
            <label class="col-sm-1 control-label" style="width:140px; margin-left: 0px;">Academic Year :</label>
            <select  class="form-control popUpEle selectSubject" style="width: 20%; margin-left: 30px;" v-model="academicYearDetails" v-on:change="getGradesList()">
                <option value="">-- Select Academic year --</option>
                <option v-for="academic in academicsandboards" 
                    v-bind:value="{academicyearid: academic.id,syllabustype:academic.syllabustype, passingyear:academic.passingyear}" 
                    :key='academic.id+academic.syllabustype'
                >{{academic.passingyear}}-{{academic.syllabustype}}    <div v-if="academic.active === 1"> - Active </div> </option>
              </select>
        </div>
        <div style="margin-top:-35px;margin-left:500px">
            <label class="col-sm-1 control-label" style="width: 18%; margin-left: -100px;">Grade :</label>
              <select class="form-control gradeFilter" @change="selectGrade()" v-model="gradeid">
                <option value=0> All </option>
                <option v-for="grade in uniqueGrades" v-bind:value="grade.gradeid">{{grade.gradename}}</option>
            </select>
         </div>
         <div style="float:left;width:25%">
            <label class="col-sm-1 control-label" style="width: 37%">Section :</label>
           <select class="form-control gradeFilter" style="width: 51%; margin-right: 7px;" v-model="sectionname" @change="pageNumber=0">
               <option value=""> All </option>
               <option v-for="section in sectionsList" v-bind:value="section.sectionname">Section - {{section.sectionname}}</option>
            </select>
         </div>
        </div><br><br><br>
        
        <div class="row reset-padding reset-margin" style="margin-left:120px">
        <div id="custom-search-input" class="col-md-10 reset-padding reset-margin">
            <div class="input-group searchbar">
                <input v-model='search' @input="pageNumber=0" type="text" class="search-query form-control" placeholder="Search books by Name ....">
                <span class="input-group-btn">
                        <button class="btn search-btn" type="button">
                            <span class=" glyphicon glyphicon-search"></span>
                </button>
                </span>
            </div>
        </div>
      </div>
        <!-- <div class="col-md-6 reset-padding reset-margin newstudentbutton" style="float:left;width:40%">
            <button class='btn newstudent pull-right' v-on:click="popUp('assignBookPopUp',open);clearBook();">Move New Book</button>
        </div> -->

        <div class="col-lg-12 subjectteachertable reset-padding reset-margin">
          <br>
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                      <div class="divTableCell">Book Inventory Id</div>
                        <div class="divTableCell">Book name </div>
                        <div class="divTableCell">Grade</div>
                        <div class="divTableCell">Section</div>
                        <div class="divTableCell">Pages</div>
                        <div class="divTableCell">Moved Date</div>
                   <!-- <div class="divTableCell">Edit</div> -->

                    </div>
                    <div class="divTableRowdata" v-for="(moveBook,index) in paginatedData">
                      <div class="divTableCelldata">{{moveBook.book_inventory_id}}</div>
                        <div class="divTableCelldata">{{moveBook.title}}</div>
                        <div class="divTableCelldata">{{moveBook.gradename}}</div>
                        <div class="divTableCelldata">{{moveBook.sectionname}}</div>
                        <div class="divTableCelldata">{{moveBook.numberofpages}}</div>
                        <div class="divTableCelldata">{{getEntryDate(moveBook.createdon)}}</div>
                   <!--  <div class="divTableCelldata"><a data-toggle="modal" href="#assignBookPopUp" v-on:click.prevent="editMovedBook(moveBook)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div> -->
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
                <div class="modal-body" style="height:220px">

                      <div class="addBook1">
                        <select class="form-control popUpEle selectSubject" v-model="moveBook.bookid">
                            <option value="">-- Select Book --</option>
                            
                            <option v-for="book in listOfBooks" v-bind:value="book.id">{{book.title}}</option>
                        </select><br>
                        <select class="form-control popUpEle selectSubject"  v-model="moveBook.gradeid" @change="selectGradeToMoveBook()">
                            <option value="">-- Select Grade --</option>
                            <option v-for="grade in gradesList" v-bind:value="grade.id">{{grade.gradename}}</option>
                        </select><br>
                        <select class="form-control popUpEle selectSubject" :disabled="!moveBook.gradeid" v-model="moveBook.classroom_id">
                            <option value="">-- Select Section --</option>
                            
                            <option v-for="section in listOfSections" v-bind:value="section.id">Section - {{section.sectionname}}</option>
                        </select><br>
                        
                      </div>
              </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                    <button type="button" id="submit" @click="moveBookToClass()" class="btn btn-newstudent">Move</button>
                </div>
            </div>
        </div>
    </div>
    <!-- book pop up end-->

    </div>
</template>
<script>
import UserService from '../../../services/userService.js';
import moment from 'moment'
export default{
    props:['sectiondetails','myclass','userdetails','school'],
    data(){
        return{
          alertMessage:"",
          grade:0,
          gradeAndSyllabus:{},
          sectionname:"",
          open: 'show',
          close: 'hide',
          bookName: '',
          moveBook:{classroom_id:"",gradeid:'',bookid:'',id:'',book_inventory_id:''},
          showAlert: false,
          tenantId:this.$cookie.get('id'),
          uniqueGrades:[],
          gradesList: [],
          sectionsList: [],
          listOfBooks:[],
          pageNumber: 0,
          size: 10,
          search: '',
          listOfBookRecommendations : [],
          selectedBook:"",
          gradeid:0,
          selectedGrades : [],
          alertMessage:"",
          showAlert:false,
          alertClass:"",
          fail: 'fail',
          success: 'success',
          academicYearDetails:{},
          academicsandboards:[],
          alertMsgs: {
                alertDanger: 'alert-danger',
                alertSuccess: 'alert-success',
                addedRecGrades : "Successfully moved book...",
                selectBook : "You must select book ...",
                errorMsg :"Error while updating the data ..",
                updatedRecGrades : "Successfully updated the moved book...",
                selectGrades : "You must select atleast one grade ...",
                selectSection : "You must select atleast one section ..."
            },
            movedBooksList:[],
            sectionsListCopy:[],
            listOfSections : [],
            academicDetails :{
              academicyearid:this.$store.state.academicYearId,
              syllabustype:this.$store.state.syllabusTypeId 
            },

        }
    },
    created(){
       UserService.getListOfBooks(this.tenantId).then((response)=>{
           this.listOfBooks=response.data && response.data.results;
        })
       this.getMovedBooksList();
       this.academicDetails.syllabustype = 'STATE';
       this.academicDetails.academicyearid = '1';
 
        UserService.Sections(this.academicDetails,this.tenantId).then((response)=>{
           this.sectionsListCopy = response.data; 
        })
         UserService.AcademicYears(this.tenantId).then((response)=>{
         this.academicsandboards=response.data.academics;
          
        //  if(this.academicsandboards.length>0){
        //       this.academicYearDetails={
        //      academicyearid: this.academicsandboards[0].id,
        //      syllabustype:this.academicsandboards[0].syllabustype, 
        //      passingyear:this.academicsandboards[0].passingyear
        //      }
        //      this.getGradesList();
        //   }
        })

    },
    methods:{
        popUp: function(id, action) {
            $('#' + id).modal(action);
        },
        getEntryDate:function(date){
            return moment(date).format('DD/MM/YYYY');
        },
                nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        },
        clearBook:function(){
          this.moveBook = {classroom_id:"",gradeid:'',bookid:'',id:''};
        },
        selectGrade:function(){
          this.sectionname = "";
          this.sectionsList =[];
          let length =this.gradesList.length;
          for(let i=0;i<length;i++){
            if(this.gradeid == this.gradesList[i].gradeid ){
              this.sectionsList.push(this.gradesList[i]);
            }
          }
          this.pageNumber=0;
        },
         selectGradeToMoveBook:function(){
          this.moveBook.classroom_id ='';
          this.listOfSections =[];
          let length =this.sectionsListCopy.length;
          for(let i=0;i<length;i++){
            if(this.moveBook.gradeid == this.sectionsListCopy[i].gradeid){
              this.listOfSections.push(this.sectionsListCopy[i]);
            }
          }
        },

        editMovedBook : function(moveBook){
          this.moveBook = JSON.parse(JSON.stringify(moveBook));
          this.selectGradeToMoveBook();
          this.moveBook.classroom_id = moveBook.classroom_id;
        },

      // To save the book to different grades
      moveBookToClass : function(){
        if(this.moveBook.bookid == '' || this.moveBook.bookid == 0){
          this.showAlerts(this.fail,this.alertMsgs.selectBook);
          return;
        }
        if(this.moveBook.gradeid == "" || this.moveBook.gradeid == 0){
          this.showAlerts(this.fail,this.alertMsgs.selectGrades);
          return;
        }
        if(this.moveBook.classroom_id == "" || this.moveBook.classroom_id == 0){
          this.showAlerts(this.fail,this.alertMsgs.selectSection);
          return;
        }

        if(this.moveBook.id =='' || this.moveBook.id == 0){
        UserService.moveBook(this.tenantId,this.moveBook).then((response)=>{
          this.selectedBookRecId = response.data.results[0].id;
          this.showAlerts(this.success,this.alertMsgs.addedRecGrades);
          this.getMovedBooksList();
        }).catch((error)=>{
          this.showAlerts(this.fail,this.alertMsgs.errorMsg);
        })
      }else{
        UserService.updateMovedBook(this.tenantId,this.moveBook).then((response)=>{
          if(response.data.resultsMap.alreadyAssigned){
            this.showAlerts(this.fail,response.data.resultsMap.message);
          }else{
             this.showAlerts(this.success,response.data.resultsMap.message);
          }
          
          this.getMovedBooksList();
        }).catch((error)=>{
          this.showAlerts(this.fail,this.alertMsgs.errorMsg);
        })
      } 
      },
      getMovedBooksList : function(){
        this.selectedBookRecId = '';
        this.selectedGrades = [];
            UserService.getMovedBooksList(this.tenantId).then((response)=>{
                   // console.log(JSON.stringify(response.data.results))
                    this.movedBooksList = response.data.results;
                    
                  }).catch(error=>{
                  //   console.log("Error response "+JSON.stringify(error.response))
                  })
                
      },
      showAlerts: function(type,message) {
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
                thisVue.popUp('assignBookPopUp',thisVue.close);
              }
            }, 1000);
        },
        getGradesList:function(){
            this.gradeid=0;
            this.sectionsList=[];
            UserService.getGradesAndSections(this.tenantId,this.academicYearDetails.passingyear,this.academicYearDetails.syllabustype).then((response)=>{      
              if(response.data.uniqueGradesList.length>0){
                 this.uniqueGrades = response.data.uniqueGradesList;
                 this.gradesList = response.data.gradesAndSectionsList;
              }else{
                 this.gradeid=0;
              }
             
         })   
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
            return this.movedBooksList.filter(function(book) {
              let searchBookResult;
              let academicYearResult;
              let gradeIdResult;
              let sectionResult;

               if(self.search==""){
                  searchBookResult= true;
                }else{
                    searchBookResult= book.title.toString().toLowerCase().indexOf(self.search.toString().toLowerCase()) >= 0;
                }
                if(Object.keys(self.academicYearDetails).length==0){
                    academicYearResult=true;
                }else{
                    academicYearResult=(self.academicYearDetails.academicyearid == book.academicid);
                }if(self.gradeid == 0){
                    gradeIdResult=true;
                }else{
                    gradeIdResult=(self.gradeid == book.gradeid);
                }if(self.sectionname == ""){
                    sectionResult=true;
                }else{
                    sectionResult=(self.sectionname == book.sectionname);
                }
               return searchBookResult && academicYearResult && gradeIdResult && sectionResult;			
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
  width:20%
}

.newstudent {
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

* .newstudent:hover {
  color: white;
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
  width: 400px;
}
</style>
