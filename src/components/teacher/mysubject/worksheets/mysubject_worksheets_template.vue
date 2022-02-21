<template>
    <div>
    <div class="col-lg-12">
        <div class="col-lg-10 text-left">
            <h3 class="student-head"><span v-html="$t('worksheets')"/></h3>
        </div>
        </div>
        <div class="row reset-padding reset-margin">
        <div id="custom-search-input" class="col-md-10 reset-padding reset-margin" style="width:25%">
            <div class="input-group searchbar">
                <input v-model='search' @input="pageNumber=0" type="text" class="search-query form-control" placeholder="Search worksheet name">
            </div>
        </div>
        <div id="custom-search-input" class="col-md-10 reset-padding reset-margin" style="width:25%">
            <div class="input-group searchbar">
                <input v-model='tagSearch' @input="pageNumber=0" type="text" class="search-query form-control" placeholder="Search tag name">
            </div>
        </div>
        <date-picker v-model="fromDate" placeholder="Select start Date" :format="DatePickerFormat" style="width:200px"  class="vdp-datepicker" lang="en"></date-picker>
        <date-picker placeholder="Select end Date" :format="DatePickerFormat" v-model="toDate" class="vdp-datepicker" lang="en"></date-picker>
        </div>
        <hr />
        <div class="col-lg-12 worksheetstable reset-padding reset-margin">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">ID</div>
                        <div class="divTableCell">Worksheet Name</div>
                        <div class="divTableCell">Tag</div>
                        <div class="divTableCell">Classroom</div>
                        <div class="divTableCell">Subject</div>
                        <div class="divTableCell">Assigned date</div>
                        <div class="divTableCell">Start date</div>
                        <div class="divTableCell">End date</div>
                        <div class="divTableCell">Assigned by</div>
                        <div class="divTableCell">Analyse</div>
                    </div>
                <div class="divTableRowdata" v-for="classroomSubjectWorksheet in wsPagination"> 
                    <div class="divTableCelldata">{{classroomSubjectWorksheet.id}}</div>
                    <div class="divTableCelldata">
                        <button class="btnAsLink" @click="eachworksheet(classroomSubjectWorksheet)">{{classroomSubjectWorksheet.worksheet_name}}</button>
                    </div>
                    <div class="divTableCelldata">
                       <ul v-for="tag in classroomSubjectWorksheet.tags" :key="tag.id">{{tag.tagname}}</ul>
                    </div> 
                    <div class="divTableCelldata">{{classroomSubjectWorksheet.gradename}} - {{classroomSubjectWorksheet.sectionname}}</div>
                    <div class="divTableCelldata">{{classroomSubjectWorksheet.subjectname}}</div>
                   <div class="divTableCelldata">{{getEntryDate(classroomSubjectWorksheet.assigneddate)}}</div>
                    <div class="divTableCelldata">{{classroomSubjectWorksheet.startdate}}</div>
                   <div class="divTableCelldata">{{classroomSubjectWorksheet.enddate}}</div>
                    <div class="divTableCelldata">{{classroomSubjectWorksheet.assignedby}}</div>
                    <div class="divTableCelldata"><button class="analyse-button" @click="analyseWorksheet(classroomSubjectWorksheet)">Analyse</button></div>
                </div>
                </div>
            </div>
        </div>
        <div>
        <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
        <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
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
                                    <router-link :to="{path:'/mysubjects/'+mysubject.gradenumber+mysubject.sectionname+'-'+mysubject.subjectname+'-'+mysubject.syllabustype+'/assignments'}" tag="button" class="btn button">Cancel</router-link>
                                    <button id="btn-post" type="submit" name="submit"  class="btn button" v-on:click.prevent="newassignment" >Save</button>
                                </div>
                            </div>
                         </form>
                      
                    </div>
                    
                </div>

            </div>
        </div>
            <router-view v-bind:mysubject="mysubject" v-bind:school="school" v-bind:userdetails="userdetails" v-bind:acdemicyearandboard="acdemicyearandboard"></router-view>

    </div>
</template>
<script>
import UserService from '../../../../services/userService';
import DatePicker from 'vue2-datepicker';
import moment from 'moment';
import {mapMutations} from 'vuex'

export default{
    components: { DatePicker },
    props:['mysubject','school','userdetails','acdemicyearandboard'],
    data(){
         return{
            classroomSubjectWorksheets:[],
            myClass :{},
            id:this.$cookie.get('id'),
            gradeid : 0,
            subjectid :0,
            classroomid:0,
            search:'',
            tagSearch:'',
            pageNumber:0,
            size:10,
            fromDate:0,
            toDate:0,
            DatePickerFormat: 'yyyy-MM-dd',
         }
    },
    created(){
        console.log(this.mysubject,toString())
        this.classroomid = this.mysubject.id;
        this.subjectid = this.mysubject.subjectid;
        console.log("Classsroom Id is:"+this.classroomid + "SubjectId is :" + this.subjectid)
        UserService.getClassroomWorksheets(this.id,this.classroomid,this.subjectid).then((response)=>{
        this.classroomSubjectWorksheets=response.data.results;
     })
    },
    methods: {
        ...mapMutations([
            'SET_SELETECTED_WORKSHEET'
        ]),
        analyseWorksheet: function(worksheet){
            console.log(worksheet);
            this.SET_SELETECTED_WORKSHEET(worksheet);
            this.$router.push('/mysubjects/'+this.mysubject.gradenumber+this.mysubject.sectionname+'-'+this.mysubject.subjectname+'-'+this.mysubject.syllabustype+'/analyseworksheet')
        },
        getEntryDate:function(date){
            return moment(date).format('DD/MM/YYYY');
        },
        eachworksheet: function(worksheet) {
            this.worksheet = worksheet;
            this.SET_SELETECTED_WORKSHEET(worksheet);
            console.log("Before Router is called");
            this.$router.push({
                path: '/mysubjects/'+this.mysubject.gradenumber+this.mysubject.sectionname+'-'+this.mysubject.subjectname+'-'+this.mysubject.syllabustype+'/ws-assigned-status'
            })
        },
         nextPage() {
            this.pageNumber++;
        },
        prevPage() {
            this.pageNumber--;
        }
    },
    computed: {
        pageCount() {
            let l = this.filterWorksheets.length,
                s = this.size;
            return Math.ceil(l / s);
        },

        filterWorksheets: function() {
            var self = this;
            return this.classroomSubjectWorksheets.filter(function(worksheet) {
                let filterWsName;
                let filterTags;
                let filterFromDate;
                let filterToDate;

                if(!self.search){
                    filterWsName = true;
                }else{
                    filterWsName = worksheet.worksheet_name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0;
                }
                if(!self.tagSearch){
                    filterTags = true;
                }else{
                    if(worksheet.tags !== null){
                        filterTags = worksheet.tags.some(tag => tag.tagname.toLowerCase().indexOf(self.tagSearch.toLowerCase()) >= 0);
                    }
                                  
                }
                if(self.fromDate == 0){
                    filterFromDate = true;
                }else{
                    filterFromDate = worksheet.startdate;
                    if(worksheet.startdate >= self.fromDate.toLocaleDateString('fr-CA')){
                        filterFromDate = true;
                    }else{
                        filterFromDate = false;
                    }
                }
                if(self.toDate == 0){
                    filterToDate = true;
                }else{
                    filterToDate = worksheet.enddate;
                    if(worksheet.enddate <= self.toDate.toLocaleDateString('fr-CA')){
                        filterToDate = true;
                    }else{
                        filterToDate = false;
                    }
                }
                return filterWsName && filterFromDate && filterToDate && filterTags;
            });
        },
        wsPagination() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filterWorksheets.slice(start, end);
        }
    }
}
</script>
<style>
.analyse-button {
    background-color: #0b366f;
    background-image: none;
    border-color: #0b366f;
    color: white;
    padding: 5px 30px;
    margin-top: 0px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 3px
}

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
</style>