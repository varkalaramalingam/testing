<template>
    <div>
    <div class="col-lg-12">
        <div class="col-lg-10 text-left">
            <h3 class="student-head"><span v-html="$t('worksheets')"/></h3>
        </div>
        </div>
        <div class="col-lg-12 worksheetstable reset-padding reset-margin">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                    <div class="divTableCell">ID</div>
                    <div class="divTableCell">Worksheet Name</div>
                    <div class="divTableCell">Classroom</div>
                    <div class="divTableCell">Subject</div>
                    <div class="divTableCell">Assigned date</div>
                    <div class="divTableCell">Start date</div>
                    <div class="divTableCell">End date</div>
                    <div class="divTableCell">Assigned by</div>
                    <div class="divTableCell">Status</div>
                    </div>
                <div class="divTableRowdata" v-for="classroomWorksheet in classroomWorksheets"> 
                    <div class="divTableCelldata">{{classroomWorksheet.id}}</div>
                    <div class="divTableCelldata">
                        <button class="btnAsLink" @click="eachworksheet(classroomWorksheet)">{{classroomWorksheet.worksheet_name}}</button>
                    </div>
                    <div class="divTableCelldata">{{classroomWorksheet.gradename}} - {{classroomWorksheet.sectionname}}</div>
                    <div class="divTableCelldata">{{classroomWorksheet.subjectname}}</div>
                   <div class="divTableCelldata">{{getEntryDate(classroomWorksheet.assigneddate)}}</div>
                    <div class="divTableCelldata">{{classroomWorksheet.startdate}}</div>
                   <div class="divTableCelldata">{{classroomWorksheet.enddate}}</div>
                    <div class="divTableCelldata">{{classroomWorksheet.assignedby}}</div>
                    <div class="divTableCelldata">{{classroomWorksheet.status}}</div>
                </div>

                </div>
            </div>
        </div>
        <div class="modal fade" id="worksheet" role="dialog" name="newworksheet">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">New Worksheet</h4>
                    </div>
                    <div class="modal-body">
                         <form class="form-horizantal" name="newworksheet">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Tags</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="Tags" placeholder="Tags*"  required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Worksheet Name</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="assignmentname" placeholder="Name Of Assignment*"   required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Date Of Worksheet</label>
                                </div>
                                <div class="col-md-8">
                                    <date-picker lang="en"  ></date-picker>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Due Date</label>
                                </div>
                                <div class="col-md-8">
                                    <date-picker lang="en" ></date-picker>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <router-link :to="{path:'/myclass/'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/assignments'}" tag="button" class="btn button">Cancel</router-link>
                                    <button id="btn-post" type="submit" name="submit"  class="btn button" v-on:click.prevent="newassignment" >Save</button>
                                </div>
                            </div>
                         </form>
                      
                    </div>
                    
                </div>

            </div>
        </div>

    </div>
</template>
<script>
import UserService from '../../../../services/userService';
import DatePicker from 'vue2-datepicker';
import moment from 'moment';
export default{

     props:['myclass','school','userdetails','acdemicyearandboard'],
     components: { DatePicker },

     data(){
        return{
            myClass :{},
            classroomWorksheets : [],
            id:this.$cookie.get('id'),
            classroomid : 0,
        }
     },
     created(){
        this.myclass = this.$store.state.myClass;
        this.classroomid = this.$store.state.myClass.id;
        UserService.getClassroomWorksheets(this.id,this.classroomid).then((response)=>{
        this.classroomWorksheets=response.data.results;
        console.log(response.data)
     })
    },
    methods: {
        getEntryDate:function(date){
            return moment(date).format('DD/MM/YYYY');
        },
            paginatedData() {
            const start = this.pageNumber * this.size,
            end = start + this.size;
            return this.filterWorksheets.slice(start, end);
        },
    }
}
</script>
<style>
.worksheetstable{
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
.newworksheetbutton{
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
.newworksheetbutton:hover{
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
.btnAsLink {
  background: none;
  border: none;
  color: blue;
}
</style>