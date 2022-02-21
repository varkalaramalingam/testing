<template>
  <div class="container-fluid">
   <div class="row">
      <div class="page-layout">
         <div class="row">
            <div class="col-md-3">
               <div class="page-heading"><span v-html="$t('assignments')"/></div>
            </div>
         </div>
         <hr>
         <!-- <div>
            <label class="col-sm-1 control-label" style="width:8.3%">Child :</label>
            <select class="form-control gradeFilter" v-model="myChildId" @change="selectChild()" >
               <option v-for="child in childrens" v-bind:value="child.studentid">{{child.name}}</option>
            </select>
         </div> -->
        
         <div class="subjectteachertable ">
            <div class="divTable">
                <br>
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Date</div>
                        <div class="divTableCell">Assignment Name</div>
                        <div class="divTableCell">Due Date</div>
                        <div class="divTableCell">Subject</div>
                        <div class="divTableCell">Tags</div>
                        <div class="divTableCell">Description</div>
                    </div>
                    <div class="divTableRowdata" v-for="assignment in assignments">
                        <div class="divTableCelldata">{{getAssignedDate(assignment.dateofassigned)}}</div>
                        <div class="divTableCelldata">{{assignment.assignmentname}}</div>
                        <div class="divTableCelldata">{{getDueDate(assignment.assignmentduedate)}}</div>
                        <div class="divTableCelldata">{{ assignment.subjectname }}</div>
                        <div class="divTableCelldata">{{assignment.tags}}</div>
                        <div class="divTableCelldata">{{assignment.description}}</div>
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
<script>
import UserService from '../../../../services/userService.js';
import moment from 'moment';

export default {
    //props:['myChild','school','userdetails'],
    data() {
        return {
            assignments: [],
            id: this.$cookie.get('id'),
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
            console.log(JSON.stringify(response.data));
            this.childrens = response.data;
            if (this.childrens.length > 0) {
                if (!this.myChild || !this.myChild.studentid) {
                    this.myChild = this.childrens[0];
                    this.myChildId = this.myChild.studentid;
                }
                this.$store.commit('SET_MY_CHILD', this.myChild);
                this.getChildAssignments();
            }
        });
        //children end
        }
        else if(this.$store.state.userDetails.userrole == "STUDENT"){
            this.getChildAssignments();
        }


    },
    methods: {
        getAssignedDate: function(date) {
            return moment(date).format('DD/MM/YYYY');
        },
        getDueDate: function(date) {
            return moment(date).format('DD/MM/YYYY')
        },
        getChildAssignments: function() {
            const classid = {
                "id": this.myChild.classid
            }
            UserService.ChildAssignments(this.tenantId, this.myChild.classid).then((response) => {
                console.log(response);
                this.assignments = response.data;
                console.log(JSON.stringify(this.assignments))
            }).catch((response) => {})
        },
         // This method will be called when the child is selected
        // selectChild: function(myChild) {
        //     let length = this.childrens.length;
        //     for(let i=0;i<length;i++){
        //         if(this.myChildId == this.childrens[i].studentid){
        //             this.myChild = this.childrens[i];
        //             break;
        //         }
        //     }
        //     this.$store.commit('SET_MY_CHILD', this.myChild);
        //     this.getMyChildTests();
        // },
        //End
    }
}
</script>
<style>
.assignments{
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
.newassignmentbutton{
    background-color: #039be5;
    background-image: none;
    border-color: #039be5;
    color:white;
    padding: 5px 30px;
    margin-top: 12%;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration:none;
    border-radius:0px
}
.newassignmentbutton:hover{
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
</style>
