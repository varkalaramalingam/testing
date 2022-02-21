<template>
   <div>  
        <div style="width:100%"><br>
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
      </div><br>
      <div class="col-lg-12 subjectteachertable reset-padding reset-margin"><br>
         <div class="divTable" style="overflow:auto;width:100%;display: flex;">
            <div class="divTableBody">
               <div class="divTableRow">
                   <div class="divTableCell">Inventory Id </div>
                  <div class="divTableCell">Book Id </div>
                  <div class="divTableCell">Book name </div>
                  <div class="divTableCell">Student Name</div>
                   <div class="divTableCell">Student Id</div>
                  <div class="divTableCell">Pages</div>
                  <div class="divTableCell">Assigned Date</div>
                  <div class="divTableCell">Expected Return Date</div>
                  <div class="divTableCell">Status</div>
                  <div class="divTableCell">Actual Returned Date</div>
                  <div class="divTableCell">Book condition</div>
                  <div class="divTableCell">Penalty</div>
                  <div class="divTableCell">Penalty Paid</div>
                  <div class="divTableCell">Penalty Status</div>
                 <div class="divTableCell">Notes</div>
               </div>
               <div class="newDivTableRowdata" v-for="(assignedBook,index) in paginatedData"  >
                  <div class="divTableCelldata">{{assignedBook.book_inventory_id}}</div>
                  <div class="divTableCelldata">{{assignedBook.bookid}}</div>
                  <div class="divTableCelldata" :class="getExpectedReturnDateStatus(`${assignedBook.expected_returned_date}`)">{{assignedBook.title}}</div>
                  <div class="divTableCelldata" :class="getExpectedReturnDateStatus(`${assignedBook.expected_returned_date}`)">{{assignedBook.name}}</div>
                  <div class="divTableCelldata">{{assignedBook.sid}}</div>
                  <div class="divTableCelldata">{{assignedBook.numberofpages}}</div>
                  <div class="divTableCelldata">{{assignedBook.assigned_date}}</div>
                  <div class="divTableCelldata">{{assignedBook.expected_returned_date}}</div>
                   <div class="divTableCelldata">
                     <select class="form-control" v-model="assignedBook.assgined_status" style="width:100px;">
                        <option v-for="status in statusList" v-bind:value="status.id">{{status.status}}</option>
                     </select>
                  </div>                  
                  <div class="divTableCelldata" >
                    <date-picker v-model="assignedBook.returned_date" placeholder="Select Date"
                      :format="DatePickerFormat" :disabledDates="assignedBook.disabledDates" class="vdp-datepicker" lang="en"></date-picker>
                  </div>
                   <div class="divTableCelldata">
                     <select class="form-control" v-model="assignedBook.book_status" style="width:180px;">
                        <option value=0> --Select book condition--</option>
                        <option v-for="condition in conditionsList" v-bind:value="condition.id">{{condition.book_condition}}</option>
                     </select>
                  </div>
                   <div class="divTableCelldata">
                     <input type="text" placeholder="Fee" class="form-control" style="width: 68px;" name="" v-model="assignedBook.fee">
                  </div>
                   <div class="divTableCelldata">
                      <input type="text" placeholder="Fee paid" class="form-control" style="width: 100px;" name="" v-model="assignedBook.penaltyPaid">
                  </div>
                    <div class="divTableCelldata">
                     <select class="form-control" v-model="assignedBook.penaltyStatus"  style="width: 180px;">
                         <option value=0> --- Select Eligibility --- </option>
                        <option v-for="penalty in penaltyList" v-bind:value="penalty.id" style="width:150px;">{{penalty.stu_penalty_status}}</option>
                     </select>
                  </div>
                   <div class="divTableCelldata"><textarea placeholder="Enter Notes" class="form-control" v-model="assignedBook.notes"  style="width: 160px;"></textarea></div>
               </div>
            </div>
         </div>
        <br>
         <div class="floatLeft">
            <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
            <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
         </div>
         <div class="col-md-2 reset-padding reset-margin newstudentbutton assignbtn" >
            <button class='btn newstudent pull-right' v-on:click="updateReturnedStatus()">Update</button>
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
        DatePickerFormat: 'dd/MM/yyyy',
        disabledDates: {
          to: new Date(Date.now() - 8640000)
        },
        alertMessage:"",
        showAlert: false,
        tenantId:this.$cookie.get('id'),
        searchBookName:"",
        condition:0,
        status:'',
        listOfBooks:[],
        pageNumber: 0,
        size: 10,
        search: '',
        alertMessage:"",
        alertClass:"",
        fail: 'fail',
        success: 'success',
        assignedBooksList:[],
        searchStudentNameOrId:'',
        selectedStatus :0,
        alertType:'',
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
        myclassDetails:{},
        booksReturnStatus:1,
        conditionsList:[],
        penaltyList:[],
        statusList:[],

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
           //console.log(JSON.stringify(response.data.results))
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
             //console.log(JSON.stringify(response.data))
            this.getAssignedBooksListByStatus();
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

        getClassRoomStudents:function(){
            UserService.MyClassStudents(this.sectionid,this.tenantId).then((response)=>{
                this.myclassstudents=response.data;
                let length = this.myclassstudents.length;
                for(let i=0;i<length;i++){
                    this.studentsList.push(this.myclassstudents[i].name);
                }
            })
        },

        // Based on status we will fetch the records from the particular class room
        getAssignedBooksListByStatus:function(){
            let disabledDates= {
                to: new Date(Date.now() - 8640000)
           };
           UserService.getListOfBooksAssigned(this.tenantId,this.myclassDetails.gradeid,this.myclassDetails.id,this.booksReturnStatus).then((response)=>{
           this.assignedBooksList=response.data && response.data.results;
           let length = this.assignedBooksList.length;
           for(let i=0;i<length;i++){
               this.assignedBooksList[i].book_status=0;
                disabledDates = {
                   to: new Date(new Date(this.assignedBooksList[i].assigned_date) - 8640000)
                }
                this.assignedBooksList[i].disabledDates = disabledDates;
            }
            //console.log(JSON.stringify(response.data.results))
          })
        },

        updateReturnedStatus : function (){
            let obj = {
                listOfAssignedBooks : this.assignedBooksList,
            }
           UserService.updateReturnedStatus(this.tenantId,obj).then((response)=>{
           this.assignedBooksList=response.data && response.data.results;
                 this.getAssignedBooksListByStatus();
                this.alertType = this.success;
                this.alertMessage = response.data && response.data.message;
                this.popUp('alertPopUp',this.open);
            }).catch((error) =>{
                this.alertType = this.error;
                this.alertMessage = error.response.data && error.response.data.message;
                this.popUp('alertPopUp',this.open);
            })
        },
         getExpectedReturnDateStatus:function(expected_returned_date){
         let selectedColor;
         let currentDateWithFormat = new Date().toJSON().slice(0,10).replace(/-/g,'-');
          if(currentDateWithFormat>expected_returned_date){
              selectedColor="redColor";
              return selectedColor;
          }
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
                return searchBookNameResult && (searchStudentNameResult || searchStudentIdResult);
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
.vdp-datepicker {
    position: relative;
    text-align: left;
    width: 180px;
    
}
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
.newDivTableRowdata {
display: table-row;
background-color: #fff;
color: #000;
height: 30px;
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
.floatLeft{
    float:left;
}
.assignbtn{
    float: right;
    margin-right: 49px;
}
.datepickerwidth{
	width: 136px !important;
    min-width: 130px !important;
}
.datepickerEle{
	width: 126px;
}
.redColor{
     background-color: #f76b6b;
}
</style>
