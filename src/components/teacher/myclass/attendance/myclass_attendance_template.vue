<template>
   <div>
        <div class="col-lg-12">
            <div class="col-lg-10 text-left">
                <h3 class="student-head">Attendance</h3>
            </div>
            <div class="col-lg-2 reset-padding reset-margin" v-if="!myclass.attendance_type">
                <a tag="button" class="newassignmentbutton pull-right" data-toggle="modal" href="#attendance" v-on:click.prevent="getclassroomstudents()">Take Attendance</a>
            </div>
        </div>
        <div class="col-lg-12">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Date</div>
                        <div class="divTableCell">Students</div>
                    </div>
                    <div class="divTableRowdata" v-for="presentees in studentspresent">
                        <div class="divTableCelldata">{{getDate(presentees.dateofattendance)}}</div>
                        <div class="divTableCelldata">{{presentees.noofpresents}}/{{presentees.noofstudents}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="attendance" role="dialog" name="addattendancemodal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Take Attendance</h4>
                    </div>
                <div class="modal-body">
                        <div class="col-lg-12" v-if="studentsofclassroom.length!=0" >
                            <div class="col-md-4">
                                <label class="pull-right">Date:</label>
                            </div>
                            <div class="col-md-8">
                                <date-picker lang="en" v-model="dateofattendance" ></date-picker>
                            </div>
                        </div>
                        <br>
                        <form name="addattendancemodal" class="addattendance" v-if="studentsofclassroom.length!=0">
                            <div class="divTable">
                                <div class="divTableBody">
                                    <div class="divTableRow">
                                        <div class="divTableCell">Id</div>
                                        <div class="divTableCell">Admission Number</div>
                                        <div class="divTableCell">Name</div>
                                        <div class="divTableCell">Select</div>
                                    </div>
                                    <div class="divTableRowdata" v-for="student in studentsofclassroom" :key="student.id">
                                        <div class="divTableCelldata">{{student.id}}</div>
                                        <div class="divTableCelldata">{{student.admissionnumber}}</div>
                                        <div class="divTableCelldata">{{student.name}}</div>
                                        <div class="divTableCelldata">
                                        <toggle-button :value="true" v-model="student.status" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-Register"   data-dismiss="modal"  class="btn btn-info button">Cancel</button>
                                    <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="takeattendance()" class="btn btn-info button">Save</button>
                                </div>
                            </div>
                        </form>
                    <div v-if="studentsofclassroom.length==0">
                        <h5 class="text-center"><b> No students to take attendance</b></h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
    import UserService from '../../../../services/userService.js';
    import moment from 'moment';
    import DatePicker from 'vue2-datepicker';
    export default{
        props:['myclass','school','userdetails','acdemicyearandboard'],
        components: { DatePicker},
        data(){
            return{
            studentspresent:[],
            id:this.$cookie.get('id'),
            studentsofclassroom:[],
            attendanceData:[],
            dateofattendance:'',
            attendancestatus:1
            }
        },
        created(){
          
            UserService.Attendance(this.id,this.myclass).then((response)=>{
                console.log(response.data);
                this.studentspresent=response.data;
            }).catch((error)=>{
                console.log(error.data);
            })
        },
        methods:{
            getDate:function(date){
                return moment(date).format('DD/MM/YYYY');
            },
            getclassroomstudents(){
                var section={
                    "classroomid":this.myclass.id,
                    "gradeid":this.myclass.gradeid
                }
                this.studentsofclassroom = [];
                UserService.SectionDetails(section,this.id).then((response)=>{
                    console.log(response.data);
                    this.studentsofclassroom=response.data.studentsOfClassRoom;
                }).catch((error)=>{
                    console.log(error.data);
                })
            },
            takeattendance(){
                this.attendanceData = [];
		        for(var i=0;i<this.studentsofclassroom.length;i++){
			        if (this.studentsofclassroom[i].status==true){
                        // this.studentsofclassroom[i].status = 1;
                        this.attendancestatus = 1
			            }
                        else{
                        // this.studentsofclassroom[i].status = 0;
                        this.attendancestatus = 0
			        }
                    var addAttendanceData ={
                        "attendancestatus":this.attendancestatus,
                        "id":this.studentsofclassroom[i].id,
                        "classroomid":this.myclass.id,
                        "dateofattendance":this.dateofattendance.getTime(),
                        "attendance_type":this.myclass.attendance_type
                    }
			        this.attendanceData.push(addAttendanceData)
                }
			    console.log(this.attendanceData);
                UserService.RecordAttendance(this.id,this.attendanceData).then((response)=>{
                    console.log(response.data);
                    if(response.status==200){
                        $('#attendance').modal('hide');
                        this.$alert('Attendance taken successfully','Success','success');
                        UserService.Attendance(this.id,this.myclass).then((response)=>{
                            console.log(response.data);
                            this.studentspresent=response.data;
                        }).catch((error)=>{
                            console.log(error.data);
                        })
                    }
                }).catch((error)=>{
                    console.log(error.response);
                    if(error.response.data.message == " attandance already taken"){
                        this.$alert(error.response.data.message,'Failure','warning');
                    }
                })
            }
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