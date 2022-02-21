<template>
  <div class="container-fluid">
   <div class="row">
      <div class="page-layout">
         <div class="row">
            <div class="col-md-3">
               <div class="page-heading"><span v-html="$t('assigned_books')"/> :</div>
            </div>
            </div>
            <hr>
            <div style="width:100%">
                <button  :class="['status-btn',notReturnedClass]" @click="getAssignedBooksListByStatus(statusDetails.notReturned)">Not returned</button>
                <button  :class="['status-btn',returnedClass]"  @click="getAssignedBooksListByStatus(statusDetails.returned)">Returned</button>
            </div>
         <!-- <div>
            <label class="col-sm-1 control-label" style="width:8.3%">Child :</label>
            <select class="form-control gradeFilter" v-model="myChildId" @change="selectChild(child)" >
               <option v-for="child in childrens" v-bind:value="child.studentid">{{child.name}}</option>
            </select>
         </div> -->
        
         <div class="subjectteachertable ">
         <div class="divTable">
             <br>
            <div class="divTableBody">
               <div class="divTableRow">
                  <div class="divTableCell">Book Inventory Id </div>
                  <div class="divTableCell">Book Id </div>
                  <div class="divTableCell">Book name </div>
                  <div class="divTableCell">Pages</div>
                  <!-- <div class="divTableCell">Student Id</div>
                  <div class="divTableCell">Student Name</div> -->
                  <div class="divTableCell">Assigned Date</div>
                  <div class="divTableCell">Expected Return Date</div>
              <!--    <div class="divTableCell">Status</div>  -->
                  <div class="divTableCell" v-if="selectedStatus == 2">Actual Returned Date</div>
                  <div class="divTableCell" v-if="selectedStatus == 2">Book condition</div>
                  <div class="divTableCell" v-if="selectedStatus == 2">Penalty</div>
                  <div class="divTableCell" v-if="selectedStatus == 2">Penalty Paid</div>
                  <div class="divTableCell" v-if="selectedStatus == 2">Penalty Status</div>
                  <div class="divTableCell" v-if="selectedStatus == 2">Notes</div>
               </div>
               <div class="newDivTableRowdata"  v-for="(assignedBook,index) in paginatedData" :class="getPaidStatusWithColors(`${assignedBook.fee}`,`${assignedBook.penaltyPaid}`, `${assignedBook.penaltyStatus}`) ">
                  <div class="divTableCelldata">{{assignedBook.book_inventory_id}}</div>
                  <div class="divTableCelldata">{{assignedBook.bookid}}</div>
                  <div class="divTableCelldata">{{assignedBook.title}}</div>
                  <div class="divTableCelldata">{{assignedBook.numberofpages}}</div>
                  <!-- <div class="divTableCelldata">{{assignedBook.sid}}</div>
                  <div class="divTableCelldata">{{assignedBook.name}}</div> -->
                  <div class="divTableCelldata">{{assignedBook.assigned_date}}</div>
                  <div class="divTableCelldata">{{assignedBook.expected_returned_date}}</div>
            <!--      <div class="divTableCelldata">{{getBookStatus(assignedBook.assgined_status)}}</div>  -->
                  <div class="divTableCelldata" v-if="selectedStatus == 2">{{assignedBook.returned_date}}</div>
                  <div class="divTableCelldata" v-if="selectedStatus == 2">{{getBookCondition(assignedBook.book_status)}}</div>
                  <div class="divTableCelldata" v-if="selectedStatus == 2">{{assignedBook.fee}}</div>
                  <div class="divTableCelldata" v-if="selectedStatus == 2">{{assignedBook.penaltyPaid}}</div>
                  <div class="divTableCelldata" v-if="selectedStatus == 2">{{getPenaltyStatus(assignedBook.penaltyStatus)}}</div> 
                  <div class="divTableCelldata" v-if="selectedStatus == 2">{{assignedBook.notes}}</div>
               </div>
            </div>
         </div>
            <!-- <div>
                <br>
               <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
               <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
            </div> -->
         </div>
      </div>
   </div>
</div>
</template>
<style scoped>
.status-btn{
   background-color: white; 
  color: black; 
  padding: 10px 15px;
   border: 2px solid #008CBA;
}
.status-btn-click{
  background-color: #008CBA;
  color: white;
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
<script>
import UserService from '../../../../services/userService.js';
import moment from 'moment'
export default {
    //props:['myChild','sectiondetails','userdetails','school'],
    data(){
        return{
          alertMessage:"",
            bookName: '',
            statusDetails:{notReturned:1,returned:2},
            showAlert: false,
        tenantId:this.$cookie.get('id'),
        searchBookId:0,
        condition:0,
        returnedDate:'',
        status:'',
        conditionsList: [],
            statusList: [],
            listOfBooks:[],
            pageNumber: 0,
            size: 10,
            search: '',
             selectedBook:"",
          alertMessage:"",
          showAlert:false,
          alertClass:"",
            fail: 'fail',
            success: 'success',
            listOfSections : [],
            academicDetails :{
              academicyearid:this.$store.state.academicYearId,
              syllabustype:this.$store.state.syllabusTypeId 
            },
            assignedBooksList:[],
            searchStudentNameOrId:'',
            selectedStatus:0,
            alertType:'',
            alertMessage:'',
            open:'show',
            close:'hide',
            myclass:'',
            userId:{
                    id:this.$cookie.get('userid')
                },
            notReturnedClass:'status-btn-click',
            returnedClass :'',
            sectionid:{
                    id:0
            },
            studentsList:[],
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
            penaltyList:[],
            notReturnedValue:1,
             class:'',
        }
    },

    created(){
        this.tenantId = this.$cookie.get('id');
        this.school = this.$store.state.school;
        this.userdetails = this.$store.state.userDetails;
        this.myChild = this.$store.state.myChild;
        this.myChildId = this.myChild && this.myChild.studentid;
        if(this.$store.state.userDetails.userrole == "PARENT"){
        //children
        const parentid = {
            "id": this.userid
        }
        UserService.MyChild(this.tenantId, parentid).then((response) => {
            //console.log(JSON.stringify(response.data));
            this.childrens = response.data;
            if (this.childrens.length > 0) {
                if (!this.myChild || !this.myChild.studentid) {
                    this.myChild = this.childrens[0];
                    this.myChildId = this.myChild.studentid;
                }
                this.$store.commit('SET_MY_CHILD', this.myChild);
                this.getAssignedBooksListByChild();
            }
        });
        //children end
        }
        else if(this.$store.state.userDetails.userrole == "STUDENT"){
            this.getAssignedBooksListByChild();
        }
    
      this.getAssignedBooksListByStatus(this.notReturnedValue);
       UserService.getListOfConditions(this.tenantId).then((response)=>{
           this.conditionsList=response.data && response.data.results;
           //console.log(JSON.stringify(response.data.results))
        })
        UserService.getListOfStatuses(this.tenantId).then((response)=>{
           this.statusList=response.data && response.data.results;
           //console.log(JSON.stringify(response.data.results))
        })
        UserService.getListOfPenatlyStatus(this.tenantId).then((response)=>{
           this.penaltyList=response.data && response.data.results;
           //console.log(JSON.stringify(response.data.results))
        })
    },

    methods:{
       
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
        getBookStatus : function(statusId){
            let length = this.statusList.length;
            for(let i=0;i<length;i++){
                if(statusId == this.statusList[i].id){
                    return  this.statusList[i].status;
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
        // This method will be called when the child is selected
        // selectChild: function(myChild) {
        //  let length = this.childrens.length;
        //     for(let i=0;i<length;i++){
        //         if(this.myChildId == this.childrens[i].studentid){
        //             this.myChild = this.childrens[i];
        //             break;
        //         }
        //     }
        // this.$store.commit('SET_MY_CHILD', this.myChild);
        //     this.getAssignedBooksListByChild();
        // },
        //End

          getAssignedBooksListByStatus : function(status){
             this.selectedStatus = status;
             if(status == 1){
                this.notReturnedClass = 'status-btn-click';
                this.returnedClass ='';
            }else if(status == 2){
                 this.notReturnedClass = '';
                this.returnedClass ='status-btn-click';
            }

           UserService.getBooksAssignedToStudent(this.tenantId,this.myChild.gradeid,this.myChild.classid,this.myChild.studentid,status).then((response)=>{
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
    },

    computed: {
        pageCount() {
            let l = this.assignedBooksList.length,
                s = this.size;
            return Math.ceil(l / s);
        },
        

        filterBooks: function() {
            var self = this;
            
            return this.assignedBooksList.filter(function(book) {
                let bookIdFil = book.bookid && book.bookid.toString().indexOf(self.searchBookId.toString()) >= 0;
                let studentNameFil = book.name && book.name.toString().toLowerCase().indexOf(self.searchStudentNameOrId.toString().toLowerCase()) >= 0 ;
                let studentIdFil = book.sid && book.sid.toString().indexOf(self.searchStudentNameOrId.toString()) >= 0;
                let bookConditionFil = book.book_status && book.book_status.toString().indexOf(self.condition.toString()) >= 0;

                if(self.searchBookId != 0  && !self.searchStudentNameOrId && self.condition == 0 ){ // 100
                    return bookIdFil;
                }else if(self.searchBookId != 0  && self.searchStudentNameOrId && self.condition == 0 ){ //110
                    return bookIdFil && (studentNameFil || studentIdFil);
                }else if(self.searchBookId == 0  && self.searchStudentNameOrId && self.condition == 0 ){ // 010
                    return (studentNameFil || studentIdFil);
                }else if(self.searchBookId == 0  && self.searchStudentNameOrId && self.condition != 0 ){ // 011
                    return (studentNameFil || studentIdFil) && bookConditionFil;
                }else if(self.searchBookId != 0  && !self.searchStudentNameOrId && self.condition != 0 ){ //101
                    return bookIdFil && bookConditionFil;
                }else if(self.searchBookId == 0  && !self.searchStudentNameOrId && self.condition != 0 ){ //001
                    return bookConditionFil;
                }else{ // 111
                    return bookIdFil && (studentNameFil || studentIdFil) && bookConditionFil;
            }
            });
        },
        
        paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
                //if(this.searchBookId == 0 && !this.searchStudentNameOrId && this.condition == 0){ //000
                    return this.assignedBooksList;
                //}
            //return this.filterBooks.slice(start, end);
        },
    }
}

</script>

