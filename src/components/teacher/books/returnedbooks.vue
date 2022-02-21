<template>
   <div>  
      <div style="width:100%">
          <br>
         <div>
            <label class="col-sm-1 control-label" style="width:5.3%">Book :</label>
            <select class="form-control gradeFilter" v-model="searchBookName" @change="pageNumber=0">
               <option value="">All books</option>
               <option v-for="book in listOfBooks" v-bind:value="book.title">{{book.title}}</option>
            </select>
         </div>
         <div>
            <label class="col-sm-1 control-label" style="width:10%">Student Name/Id :</label>
            <!-- <input type="text" class="form-control gradeFilter" placeholder="Enter student name or id" v-model="searchStudentNameOrId"> -->
            <vue-bootstrap-typeahead class="gradeFilter search-name" placeholder="Enter student name or id" v-model="searchStudentNameOrId" :data="studentsList" @input="pageNumber=0" />
         </div>
         <div>
            <label class="col-sm-1 control-label" style="width:7%">Condition :</label>
            <select class="form-control gradeFilter" v-model="condition" @change="pageNumber=0">
               <option value=0> All </option>
               <option v-for="condition in conditionsList" v-bind:value="condition.id">{{condition.book_condition}}</option>
            </select>
         </div>
      </div>
      <br>
      <div class="col-lg-12 subjectteachertable reset-padding reset-margin">
      <br>
         <div class="divTable" style="overflow:auto;width:100%;display: flex;">
            <div class="divTableBody">
               <div class="divTableRow">
                   <div class="divTableCell">Inventory Id </div>
                  <div class="divTableCell">Book Id </div>
                  <div class="divTableCell">Book name </div>
                  <div class="divTableCell">Pages</div>
                  <div class="divTableCell">Student Id</div>
                  <div class="divTableCell">Student Name</div>
                  <div class="divTableCell">Assigned Date</div>
                  <div class="divTableCell">Expected Return Date</div>
                  <div class="divTableCell">Status</div>
                  <div class="divTableCell">Actual Returned Date</div>
                  <div class="divTableCell">Book condition</div>
                  <div class="divTableCell">Penalty</div>
                  <div class="divTableCell">Penalty Paid</div>
                  <div class="divTableCell">Penalty Status</div>
                 <div class="divTableCell">Notes</div>
                 <div class="divTableCell">Edit</div>
               </div>
               <div class="newDivTableRowdata" v-for="(assignedBook,index) in paginatedData" :class="getPaidStatusWithColors(`${assignedBook.fee}`,`${assignedBook.penaltyPaid}`, `${assignedBook.penaltyStatus}`) ">
                   <div class="divTableCelldata">{{assignedBook.book_inventory_id}}</div>
                  <div class="divTableCelldata">{{assignedBook.bookid}}</div>
                  <div class="divTableCelldata">{{assignedBook.title}}</div>
                  <div class="divTableCelldata">{{assignedBook.numberofpages}}</div>
                  <div class="divTableCelldata">{{assignedBook.sid}}</div>
                  <div class="divTableCelldata" >{{assignedBook.name}}</div>
                  <div class="divTableCelldata">{{assignedBook.assigned_date}}</div>
                  <div class="divTableCelldata">{{assignedBook.expected_returned_date}}</div>     
                  <div class="divTableCelldata">{{getBookStatus(assignedBook.assgined_status)}}</div>
                  <div class="divTableCelldata">{{assignedBook.returned_date}}</div>
                  <div class="divTableCelldata">{{getBookCondition(assignedBook.book_status)}}</div>
                  <div class="divTableCelldata">{{assignedBook.fee}}</div>
                  <div class="divTableCelldata">{{assignedBook.penaltyPaid}}</div>
                  <div class="divTableCelldata">{{getPenaltyStatus(assignedBook.penaltyStatus)}}</div>
                   <div class="divTableCelldata">{{assignedBook.notes}}</div>
                  <div class="divTableCelldata"><a data-toggle="modal" href="#editBooksStatus" v-on:click.prevent="editReturnedBooks(assignedBook);"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
               </div>
            </div>
         </div>
        <br>
         <div class="floatLeft">
            <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
            <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
         </div>
      </div>
       <!-- book pop up start-->
                <div class="modal fade" data-keyboard="false" data-backdrop="static" id="editBooksStatus" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog" style="height:100px;width:700px">
                        <div class="modal-content">
                            <div class="modal-header">
                                <div>
                                    <h4>Update Return Books</h4>
                                </div>
                                <div v-if="showAlert" :class="['showAlertDiv','alert',alertClass]" role="alert">
                                    {{alertMessage}}
                                </div>
                            </div>
                            <div class="modal-body" style="height:247px">
                                <div><br>
                                    <input type="text" placeholder="Penalty Fee" class="form-control" style="width: 150px;" name="" v-model="editReturnedBookStatus.fee"><br>
                                    <input type="text" placeholder="Penalty paid" class="form-control" style="width: 150px;" name="" v-model="editReturnedBookStatus.penaltyPaid"><br>
                                    <select class="form-control" v-model="editReturnedBookStatus.penaltyStatus"  style="width: 230px;">
                                        <option value=0> --- Select Eligibility --- </option>
                                        <option v-for="penalty in penaltyList" v-bind:value="penalty.id" style="width:150px;">{{penalty.stu_penalty_status}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                                <button type="button" id="submit" @click="editReturnedRecords()" class="btn btn-newstudent">Update</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- book pop up end-->
   </div>
</template>
<script>
import UserService from '../../../services/userService.js';
import moment from 'moment';
import DatePicker from 'vuejs-datepicker';
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead';
export default{
    props:['sectiondetails','userdetails','school'],
    components: { DatePicker,VueBootstrapTypeahead },
    data(){
        return{
        model: {
          date: ''
        }, 
       
        disabledDates: {
          to: new Date(Date.now() - 8640000)
        },
        alertMessage:"",
        bookName: '',
        showAlert: false,
        tenantId:this.$cookie.get('id'),
        searchBookName:"",
        condition:0,
        status:'',
        listOfBooks:[],
        pageNumber: 0,
        size: 10,
        search: '',   
        alertClass:"",
        fail: 'fail',
        success: 'success',
        assignedBooksList:[],
        searchStudentNameOrId:'',        
        open:'show',
        close:'hide',
        myclass:'',
        userId:{
                id:this.$cookie.get('userid')
            },
        sectionid:{
                id:0
        },
        studentsList:[],
        class:'',
        booksReturnStatus:2,
        myclassDetails:{},
        editReturnedBookStatus:[],
        alertMsgs: {
            alertDanger: 'alert-danger',
            alertSuccess: 'alert-success',
            alertpenaltyPaid:'Penalty paid amount is always less than the Penalty fee amount',
            alertpenaltyStatus:'Penalty status is not empty',
            alertNotEligibleStatus:' If student is not eligibe make sure to add Fee amount'
          },
        conditionsList:[],
        penaltyList:[],
        statusList:[]
       }
    },

    created(){
        this.myclassDetails= this.$store.state.myClass;
        this.sectionid.id = this.myclassDetails.id;
        this.getAssignedBooksListByStatus();
        UserService.getListOfBooks(this.tenantId).then((response)=>{
           this.listOfBooks=response.data && response.data.results;
           //console.log(JSON.stringify(response.data.results))
        })
        UserService.getListOfConditions(this.tenantId).then((response)=>{
           this.conditionsList=response.data && response.data.results;
          // console.log(JSON.stringify(response.data.results))
        })
        UserService.getListOfPenatlyStatus(this.tenantId).then((response)=>{
           this.penaltyList=response.data && response.data.results;
           //console.log(JSON.stringify(response.data.results))
        })
        UserService.getListOfStatuses(this.tenantId).then((response)=>{
           this.statusList=response.data && response.data.results;
           //console.log(JSON.stringify(response.data.results))
        })
    /*    UserService.MyClass(this.userId,this.tenantId).then((response)=>{
             console.log(JSON.stringify(response.data))
            this.getClassRoomStudents();
        })  */
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
        
        getBookCondition : function(condition){
            let length = this.conditionsList.length;
            for(let i=0;i<length;i++){
                if(condition == this.conditionsList[i].id){
                    return  this.conditionsList[i].book_condition;
                }
            }
        },
        getPenaltyStatus : function(penatlyId){
            let length = this.penaltyList.length;
            for(let i=0;i<length;i++){
                if(penatlyId == this.penaltyList[i].id){
                    return  this.penaltyList[i].stu_penalty_status;
                }
            }
        },
        getBookStatus : function(statusId){
            let length = this.statusList.length;
            for(let i=0;i<length;i++){
                if(statusId == this.statusList[i].id){
                    return  this.statusList[i].status;
                }
            }
        },
        getClassRoomStudents:function(){
            UserService.MyClassStudents(this.sectionid,this.tenantId).then((response)=>{
                this.myclassstudents=response.data;
                let length = this.myclassstudents.length;
                for(let i=0;i<length;i++){
                    this.studentsList.push(this.myclassstudents[i].name);
                }
                //console.log(response.data)
            })
        },
        // Based on status we will fetch the records from the particular class room
        getAssignedBooksListByStatus : function(){           
            let disabledDates= {
                to: new Date(Date.now() - 8640000)
             };
            UserService.getListOfBooksAssigned(this.tenantId,this.myclassDetails.gradeid,this.myclassDetails.id,this.booksReturnStatus).then((response)=>{
           this.assignedBooksList=response.data && response.data.results;
            //console.log(JSON.stringify(response.data.results))
            })
        },
        getPaidStatusWithColors:function(penalty,penaltyPaid,penaltyStatus){
         // console.log(penalty," - ",penaltyPaid," - ",penaltyStatus," - ");
         let selectedColor;
          if(penalty>0 && penaltyPaid>=0 && penaltyStatus==2){
              selectedColor="redColor";
              return selectedColor;
          }
          else if(penalty<=0 && penaltyPaid<=0 && penaltyStatus<=1){
              selectedColor="greenColor";
              return selectedColor;
          }
          else if(penalty>0 && penaltyPaid>=0 && penaltyStatus==1){
              selectedColor="yellowColor";
              return selectedColor;
          }
        },
        editReturnedBooks:function(assignedBook){
            this.editReturnedBookStatus = assignedBook;
        },
        editReturnedRecords:function(){
            if (this.editReturnedBookStatus.fee == '' || this.editReturnedBookStatus.fee == null) {
                this.editReturnedBookStatus.fee =0
            }
            if (this.editReturnedBookStatus.penaltyPaid == '' || this.editReturnedBookStatus.penaltyPaid == null) {
                this.editReturnedBookStatus.penaltyPaid = 0
            }
            if (this.editReturnedBookStatus.penaltyStatus == '' || this.editReturnedBookStatus.penaltyStatus == null || this.editReturnedBookStatus.penaltyStatus==0) {
                this.showAlerts(this.fail, this.alertMsgs.alertpenaltyStatus);
                return;
            }
            if (this.editReturnedBookStatus.penaltyStatus ==2 && this.editReturnedBookStatus.fee==0) {
                  this.showAlerts(this.fail, this.alertMsgs.alertNotEligibleStatus);
                  return;
            }
            if (this.editReturnedBookStatus.penaltyPaid > this.editReturnedBookStatus.fee) {
                  this.showAlerts(this.fail, this.alertMsgs.alertpenaltyPaid);
                  return;
            }
            UserService.updateReturnedBooksStatus(this.tenantId,this.editReturnedBookStatus).then((response)=>{
            //console.log(response.data);
            if(response.data.status==200){
                 this.showAlerts(this.success, response.data.message);
            }
            }).catch((error) =>{
                    this.showAlerts(this.fail, error.response.data);
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
                thisVue.popUp('editBooksStatus',thisVue.close);
              }
            }, 1500);
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
            return this.assignedBooksList.filter(function(book) {
                let searchBookNameResult;
                let searchStudentNameResult;
                let searchStudentIdResult;
                let bookConditionResult;

                if(self.searchBookName==""){
                    searchBookNameResult = true;
                }else{
                    searchBookNameResult = (book.title==self.searchBookName);
                }
                if(self.searchStudentNameOrId==""){
                    searchStudentNameResult=true;
                    searchStudentIdResult =true;
                }else{
                    if(book.name.toString().toLowerCase().indexOf(self.searchStudentNameOrId.toString().toLowerCase()) >= 0){
                        searchStudentNameResult = book.name.toString().toLowerCase().indexOf(self.searchStudentNameOrId.toString().toLowerCase()) >= 0;

                    }else if(book.sid.toString().toLowerCase().indexOf(self.searchStudentNameOrId.toString().toLowerCase()) >= 0){
                         searchStudentIdResult = book.sid.toString().toLowerCase().indexOf(self.searchStudentNameOrId.toString().toLowerCase()) >= 0;
                     }
                }
                if(self.condition == 0 ){
                    bookConditionResult=true;
                }else{
                    bookConditionResult = (book.book_status==self.condition);
                }
                return searchBookNameResult && (searchStudentNameResult || searchStudentIdResult) && bookConditionResult;
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

<style scoped>

.search-name{
    width: 117%;
}
.modal-dialog {
  overflow-y: initial !important
}
.modal-body {
  height: 370px;
  overflow-y: auto;
  overflow-x: hidden;
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
.newDivTableRowdata {
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
  margin-left: 180px;
}
.floatLeft{
    float:left;
}
.datepickerwidth{
	width: 136px !important;
    min-width: 130px !important;
}
.datepickerEle{
	width: 126px;
}
.greenColor{
    background-color: #4dff78;
}
.redColor{
     background-color: #ff4c4c;
}
.yellowColor{
     background-color:#eeff33; 
}
</style>
