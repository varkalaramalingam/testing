<template>
  <div class="container-fluid">
   <div class="row">
      <div class="page-layout">
         <div class="row">
            <div class="col-md-3">
               <div class="page-heading"><span v-html="$t('attendance')"/></div>
            </div>
         </div>
         <hr>
         <div class="col-lg-12 reset-padding reset-margin">
         </div>
         <!-- <div>
            <label class="col-sm-1 control-label" style="width:8.3%">Child :</label>
            <select class="form-control gradeFilter" v-model="myChildId" @change="selectChild()" >
               <option v-for="child in childrens" v-bind:value="child.studentid">{{child.name}}</option>
            </select>
         </div> -->
        
         <div class="subjectteachertable ">
             <br>
             <div class="divTable">
                 <br>
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Date Of Attendance</div>
                        <div class="divTableCell" v-if="attendanceData.length!=0 && attendanceData[0].subjectname!=null" >Subject Name</div>
                        <div class="divTableCell">Attendance Status</div>
                    </div>
                    <div class="divTableRowdata" v-for="presentees in attendanceData">
                        <div class="divTableCelldata">{{getDate(presentees.dateofattendance)}}</div>
                        <div class="divTableCelldata" v-if="presentees.subjectname!=null" >{{presentees.subjectname}}</div>
                        <div class="divTableCelldata">
                          <span v-if="presentees.attendancestatus==1">Present</span>
                           <span v-if="presentees.attendancestatus==0">Absent</span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <br>
              <!--  <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
               <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
             --></div>
         </div>
      </div>
   </div>
</div>
</template>
<script>
    import UserService from '../../../../services/userService.js';
    import moment from 'moment';
    export default{
       // props:['myChild','school','userdetails'],
        data(){
            return{
            tenantId:this.$cookie.get('id'),
            attendanceData:[],
            dateofattendance:'',
            acdemicyearandboard: this.$store.state.acdemicyearandboard,
            academicDetails: {},
            school: {},
            userdetails: {},
             userid:this.$cookie.get('userid'),
            childrens: [],
            myChild: {},
            myChildId:0
            }
        },
        created(){
             this.tenantId = this.$cookie.get('id');
        this.school = this.$store.state.school;
        this.userdetails = this.$store.state.userDetails;
        this.gradeid={
             id:this.grade,
             academicyear:this.$store.state.acdemicyearandboard.academicyearid 
          }
        this.academicDetails = {
            academicyearid: this.acdemicyearandboard.academicyearid,
            syllabustype: this.acdemicyearandboard.syllabustype
        }
        this.myChild =  this.$store.state.myChild;
        this.myChildId = this.myChild && this.myChild.studentid;
        if(this.$store.state.userDetails.userrole == "PARENT"){
        //children
        const parentid = {
              "id": this.userid
            }
            UserService.MyChild(this.tenantId,parentid).then((response)=>{
                console.log(JSON.stringify(response.data));
                this.childrens=response.data;
                if(this.childrens.length > 0){
                     if(!this.myChild || !this.myChild.studentid){
                        this.myChild = this.childrens[0];
                        this.myChildId = this.myChild.studentid;
                    }
                    this.$store.commit('SET_MY_CHILD',this.myChild);
                    this.getAttendanceDetails();
                }
            });
        //children end
        }
        else if(this.$store.state.userDetails.userrole == "STUDENT"){
            this.getAttendanceDetails();
        }
        },
        methods: {
            getDate:function(date){
              return moment(date).format('DD/MM/YYYY');
          },
          getAttendanceDetails : function () {
               const myChildDetails = {
            "studentid": this.myChild.studentid,
            "classid": this.myChild.classid
          }
          UserService.AttendanceOfStudent(this.tenantId,myChildDetails).then((response)=>{
              this.attendanceData = response.data;
            }).catch((error)=>{
                console.log(error.data);
            })
          },
        //    selectChild :function(myChild){
        //     let length = this.childrens.length;
        //     for(let i=0;i<length;i++){
        //         if(this.myChildId == this.childrens[i].studentid){
        //             this.myChild = this.childrens[i];
        //             break;
        //         }
        //     }
        //     this.$store.commit('SET_MY_CHILD',myChild);
        //     this.getAttendanceDetails();
        // },

        }
      
    }
</script>
<style>
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
.newassignmentbutton:hover,.newassignmentbutton:focus{
    color:white;
    text-decoration:none;
}
</style>