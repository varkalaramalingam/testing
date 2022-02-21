<template>
    <div>
        <div class="col-lg-12 reset-padding reset-margin">
            <div class="text-left">
                <h3 class="student-head"><span v-html="$t('classroom_inventory')"/> : {{myclassDetails.gradename}} - {{myclassDetails.sectionname}}</h3>
            </div>
            <hr>
        </div>
        <div class="row reset-padding reset-margin" style="margin-left:1%">
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
    
        <div class="col-lg-12 subjectteachertable reset-padding reset-margin">
          <br>
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell"></div>
                        <div class="divTableCell">Inventory Id </div>
                        <div class="divTableCell">Book Id </div>
                        <div class="divTableCell">Book Name</div>
                        <div class="divTableCell">Pages</div>
                        <div class="divTableCell">Book Value</div>
                        <div class="divTableCell">Rental Value</div>
                        <div class="divTableCell">Book Count</div>
                        <div class="divTableCell">WhereIsBook</div>
                    </div>
                    <div class="divTableRowdata" v-for="(moveBook,index) in paginatedData" v-if="moveBook.count==1">
                        <div class="divTableCelldata"><input type="checkbox" :value="moveBook" v-model="selectedBooks" ></div> 
                        <div class="divTableCelldata">{{moveBook.book_inventory_id}}</div>
                        <div class="divTableCelldata">{{moveBook.bookid}}</div>
                        <div class="divTableCelldata"><button class="btnAsLink" @click="eachBook(moveBook)">{{moveBook.title}}</button></div>
                        <div class="divTableCelldata">{{moveBook.numberofpages}}</div>
                        <div class="divTableCelldata">{{moveBook.bookprice}}</div>
                        <div class="divTableCelldata">{{moveBook.baserentalvalue}}</div>
                        <div class="divTableCelldata">{{moveBook.count}}</div>
                        <div class="divTableCelldata">{{moveBook.whereisthebook}}</div>
                    </div>
                </div>
            </div>

            <br>
            <div class="floatLeft">
                <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
                <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
            </div>
            <div>
                <button type="button"  v-on:click="popUp('assignedBookPopUp',open);assignToAStudent()" class='btn newstudent pull-right' >Assgin to a student</button>
            </div>
            <div class="col-md-2 reset-padding reset-margin newstudentbutton assignbtn">
                <button type="button" v-on:click="returnBooksToMaster()" class='btn newstudent pull-right' >Return Books</button>
            </div>
            <div class="col-md-2 reset-padding reset-margin newstudentbutton assignbtn">
                <button class='btn newstudent pull-right' v-on:click="randomAssignBooksToStudents()">Random Assign</button>
            </div>
        </div>
    
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
<!-- assign books to a student pop up start-->
<div class="modal fade" data-keyboard="false" data-backdrop="static" id="assignedBookPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" style="height:100px">
        <div class="modal-content">
            <div class="modal-header">
                <div>
                    <h4>Assign</h4>
                </div>
                <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                    {{alertMessage}}
                </div>
            </div>
            <div class="modal-body" style="height:200px">
                <div v-for="(stubooks,index) in selectedBooks">
                    {{stubooks.title}}
                </div></br><hr>
                <div>
                    <select class="form-control popUpEle selectSubject" v-model="assignBook.studentId" style="margin-left:10px">
                        <option value="">Choose student name</option>
                        <option v-for="student in listOfStudents" v-bind:value="student.id" >{{student.name}}</option>
                    </select>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                <button type="button" id="submit" v-on:click="assignToStudent()" class="btn btn-newstudent" >Assgin</button>
            </div>
        </div>
    </div>
</div>
<!-- assign books to a student pop up start-->

</div>

</template>
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
  margin:auto;
}
.subjectteachertable{
width:100%;
}
.divTable{
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
.divTableCell, .divTableHead {
border: 1px solid #eee;
display: table-cell;
padding: 3px 10px;
}
.divTableCelldata{
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
}
.floatLeft{
    float:left;
}
.assignbtn{
    float: right;
    margin-right: 49px;
}
.btnAsLink {
  background: none;
  border: none;
  color: blue;
}
</style>
<script>
import UserService from '../../../services/userService.js';
import moment from 'moment'
import DatePicker from 'vue2-datepicker';
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default{
    props:['sectiondetails','userdetails','school'],
    components: { DatePicker },
    data(){
        return{
          alertMessage:"",
            bookName: '',
            moveBook:{classroom_id:"",gradeid:'',bookid:'',id:''},
            showAlert: false,
            tenantId:this.$cookie.get('id'),
            searchBookId:0,
            condition:0,
            returnedDate:'',
            conditionsList: [{
                    id: 1,
                    condition: "Late"
                },
                {
                    id: 2,
                    condition: "Damagaed"
                },
                {
                    id: 3,
                    condition: "Late and Damaged"
                },
            ],
            listOfBooks:[],
            pageNumber: 0,
            size: 10,
            search: '',
            selectedBook:"",
            selectedBooks : [],
            showAlert:false,
            alertClass:"",
            fail: 'fail',
            success: 'success',
            open: 'show',
            close: 'hide',
            alertType:'',
            listOfSections : [],
            academicDetails :{
              academicyearid:this.$store.state.academicYearId,
              syllabustype:this.$store.state.syllabusTypeId 
            },
            classInventoryBooksList:[],
            activeClassInventoryBooksList:[],
            classes:[],
            myclass:'',
            myclassDetails:{},
            userId:{
                    id:this.$cookie.get('userid')
                },
                sectionid:{
                    id:0
            },
            error:"Error",   
            alertMsgs: {
                alertDanger: 'alert-danger',
                alertSuccess: 'alert-success',
                assignedToStudent: "Successfully assigned book to student",
                studentName: "You must select student name ",
                errorMsg: "Error while updating the data ..",
                selectBooks: "You must select atleast one books"
            },
            assignBook: {
                studentId:''
            },
            listOfStudents: []
        }
    },
    created(){
       this.myclassDetails= this.$store.state.myClass;
       this.sectionid.id= this.myclassDetails.id;
       UserService.getListOfBooks(this.tenantId).then((response)=>{
           this.listOfBooks=response.data && response.data.results;
           console.log(JSON.stringify(response.data.results))
        })
       
         UserService.MyClass(this.userId,this.tenantId).then((response)=>{
                console.log(response);
                this.classes=response.data;
             //   this.myclass = this.classes && this.classes[0];
             //   this.sectionid.id = this.myclass.id;
                this.getClassRoomInventoryBooks();
                this.getClassRoomStudents();
            })

    },
    methods:{
        ...mapMutations([
            'SET_SELETECTED_BOOK'
        ]),
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

         eachBook: function(book) {
            let length = this.listOfBooks.length;
            for(let i=0;i<length;i++){
                if(book.bookid == this.listOfBooks[i].id){
                    this.SET_SELETECTED_BOOK(this.listOfBooks[i]);
                    break;
                }
            }
            this.$router.push({
                path: 'book'
            })
        },
         
        getClassRoomStudents:function(){
            UserService.MyClassStudents(this.sectionid,this.tenantId).then((response)=>{
                this.myclassstudents=response.data;
                this.listOfStudents = response.data;
            })
        },

        getAssignedBooksToStudents:function(){
            UserService.getAssignedBooksToStudents(this.sectionid,this.tenantId).then((response)=>{
                this.myclassstudents=response.data;
                console.log(response.data);
            })
        },

        randomAssignBooksToStudents: function(){
            let obj ={
                gradeid : this.myclassDetails.gradeid,
                classroom_id : this.myclassDetails.id
            };
            UserService.randomAssignBooksToStudents(this.tenantId,obj).then((response)=>{
                this.myclassstudents=response.data;
                console.log(response.data)
                this.alertType = this.success;
                this.alertMessage = response.data && response.data.message;
                this.popUp('alertPopUp',this.open);
                this.getClassRoomInventoryBooks();
            }).catch((error) =>{
                console.log(error.response.data)
                this.alertType = this.error;
                this.alertMessage = error.response.data && error.response.data.message;
                this.popUp('alertPopUp',this.open);
            })
        },
      
      getClassRoomInventoryBooks : function(){
        this.selectedBookRecId = '';
        this.selectedGrades = [];
        this.activeClassInventoryBooksList=[];
        UserService.getClassRoomInventoryBooks(this.tenantId,this.myclassDetails.gradeid,this.myclassDetails.id,this.myclassDetails.syllabustype).then((response)=>{
            //  console.log(JSON.stringify(response.data.results))
            this.classInventoryBooksList = response.data.results; 
            for(let i=0; i<this.classInventoryBooksList.length;i++){
                if(this.classInventoryBooksList[i].count==1){
                    this.activeClassInventoryBooksList.push(this.classInventoryBooksList[i]);
                }
            }
            }).catch(error=>{
                console.log("Error response ",JSON.stringify(error.response))
            })
      },

      showSelectedBooks : function(){
        console.log(JSON.stringify(this.selectedBooks))
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
                thisVue.popUp('assignedBookPopUp',thisVue.close);
              }
            }, 1500);
        },

        returnBooksToMaster : function (){
            let length = this.selectedBooks.length;
            let movedBooks = [];
            //console.log(this.selectedBooks)
            if(length > 0){
                for(let i=0;i<length;i++){
                    let movedBook = {
                        id : this.selectedBooks[i].id,
                        bookid : this.selectedBooks[i].bookid,
                        book_inventory_id:this.selectedBooks[i].book_inventory_id, 
                        gradeid : this.selectedBooks[i].gradeid,
                        classroom_id : this.selectedBooks[i].classroom_id,
                        total_stock : this.selectedBooks[i].total_stock,
                        avl_stock : this.selectedBooks[i].avl_stock
                    }   
                    movedBooks.push(movedBook);
                }
               UserService.returnBooksToMaster(this.tenantId,movedBooks).then((response) => {
               console.log(JSON.stringify(response.data));
               this.alertMessage =response.data.resultsMap.message;
               this.alertType = 'Success';
               this.popUp('alertPopUp',this.open);
               this.getClassRoomInventoryBooks();
               this.selectedBooks=[];
            }).catch((error) => {
               console.log(JSON.stringify(error.response.data));
            })
            }else{
                this.alertMessage ='you must select atleast one book';
                this.alertType = 'Error';
                this.popUp('alertPopUp',this.open);
            }
        },
         assignToAStudent: function() {
            this.assignBook = {
                studentId:''
            };
        },
        assignToStudent: function(){
            if (this.assignBook.studentId == '' || this.assignBook.studentId == 0) {
                this.showAlerts(this.fail, this.alertMsgs.studentName);
                return;
            }
            let length = this.selectedBooks.length;
            let assignedBooksToAStudent = [];
            if(length>0){
                 for(let i=0;i<length;i++){
                    let assignBooks = {
                        id : this.selectedBooks[i].id,
                        bookid : this.selectedBooks[i].bookid,
                        book_inventory_id:this.selectedBooks[i].book_inventory_id, 
                        gradeid : this.selectedBooks[i].gradeid,
                        classroom_id : this.selectedBooks[i].classroom_id
                    }
                    assignedBooksToAStudent.push(assignBooks);
                }
                
               UserService.assignToStudent(this.tenantId,assignedBooksToAStudent,this.assignBook.studentId).then((response)=>{
               if(response.data.status==200){
                   this.showAlerts(this.success, response.data.message);
                   this.getClassRoomInventoryBooks();
                   this.selectedBooks=[];
               }               
                }).catch((error) =>{
                    this.showAlerts(this.fail, error.response.data.message);
                })
              }else{
                    this.showAlerts(this.fail, this.alertMsgs.selectBooks);
                }            
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
            return this.activeClassInventoryBooksList.filter(function(book) {
                if(self.search==""){
                    return true;
                }else{
                    return book.title.toString().toLowerCase().indexOf(self.search.toString().toLowerCase()) >= 0;
                }            
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
