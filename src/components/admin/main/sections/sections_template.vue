<template>
    <div class="page-layout">
        <div class="row">
            <div class="col-lg-3">
                <div class="page-heading"><span v-html="$t('classrooms')"/></div>
            </div>
            <div class="col-lg-3">
                <!-- <label class="col-sm-1 control-label" style="width:8.3%">Academic Year:</label> -->
                <select  class="form-control" v-model="academicObj" v-on:change="changingacademicyear()" >
                    <option value="" disabled>-- Select Academic year --</option>
                    <option v-for="academic in academicsandboards.academics" v-show="academic.active==1" v-bind:value="{academicyearid:academic.id,syllabustype:academic.syllabustype}" :key='academic.id'>{{academic.passingyear}} - {{academic.syllabustype}}</option>
                </select>
            </div>
            <div class="col-lg-3">
                <!-- <label class="col-sm-1 control-label" style="width:8.3%">Academic Year:</label> -->
                <select  class="form-control" v-model="searchacademicgradeid">
                    <option value="0">All</option>
                    <option v-for="academicgrade in academicgrades" v-if="academicObj.academicyearid == academicgrade.academicid" :value="academicgrade.id" >{{academicgrade.gradename}}</option>
                </select>
            </div>
            <div class="col-lg-3 text-right">
                <!--<router-link to="/admin/newsubject" tag="button" class="common-button">New Section</router-link>-->
                 <button class="common-button pull-right" style="width: 180px;" v-on:click="popup('SectionPopup',open);">New Class Room</button>

            </div>
        </div>
        <hr/>
        <div>
          <section-new 
          v-bind:academicsandboards="academicsandboards" 
          v-bind:teachers="teachers"
          v-on:classroomcreated="classroomcreated()">
          </section-new>
        </div>
        <div class="col-lg-12 sectionstable reset-margin reset-padding">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Classroom ID</div>
                        <div class="divTableCell">Grade Number</div>
                        <div class="divTableCell">Grade ID</div>
                        <div class="divTableCell">Academic Grade ID</div>
                        <div class="divTableCell">Attendance Type</div>
                        <div class="divTableCell">Academic ID</div>
                        <div class="divTableCell">Academic Year</div>
                        <div class="divTableCell">Syllabus</div>
                        <div class="divTableCell">Grade</div>
                        <div class="divTableCell">Section</div>
                        <div class="divTableCell">Class Teacher</div>
                        
                        
                        <div class="divTableCell">Edit</div>
                    </div>
                    <div class="divTableRowdata" v-for="section in paginatedData">
                        <div class="divTableCelldata">{{section.id}}</div>
                        <div class="divTableCelldata">{{section.gradenumber}}</div>
                        <div class="divTableCelldata">{{section.gradeid}}</div>
                        <div class="divTableCelldata">{{section.academicgradeid}}</div>
                        <div class="divTableCelldata">{{section.attendance_type}}</div>
                        <div class="divTableCelldata">{{section.academicid}}</div>
                        <div class="divTableCelldata">{{section.passingyear}}</div>
                        <div class="divTableCelldata">{{section.syllabustype}}</div>
                        <div class="divTableCelldata">{{section.gradename}}</div>
                        <div class="divTableCelldata">{{section.sectionname}}</div>
                        <div class="divTableCelldata">{{section.teachername}}</div>
                       
                        <div class="divTableCelldata"><a data-toggle="modal" href="#editclass" v-on:click="setSection(section)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>

                    </div>
                </div>
   	        </div>
        </div>
        <div>
      <button
        class="btn previousbutton"
        :disabled="pageNumber === 0"
        @click="prevPage"
      >
        Previous
      </button>
      <button
        class="btn nextbutton"
        :disabled="pageNumber >= pageCount - 1"
        @click="nextPage"
      >
        Next
      </button>
    </div>
        <div class="modal fade" id="editclass" role="dialog">
    <div class="modal-dialog text-center">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">Edit Section</h4>
            </div>
            <div class="modal-body">
                <form name="editclassmodal">
                    <div class="editclass ">
                        <div class="row">
                            <div class="col-md-4">
                                <label>Teacher</label>
                            </div>
                            <div class="col-md-8">
                                <select class="form-control form-input" v-model="setSectionDetails.teachername">
                                    <option value="" disabled selected>Select your option</option>
                                    <option v-for="teacher in teachers" v-show="teacher.statusid==1">{{teacher.teachername}}</option>
                                </select>
                            </div>
                        </div>
                        <br>
                    </div>
                    <div class="row">
                        <div class="col-lg-8 reset-padding col-lg-offset-4 text-center">
                            <div class="col-lg-6">
                                <button id="btn-reset" data-dismiss="modal" class="btn btn-block button">Cancel</button>
                            </div>
                            <div class="col-lg-6">
                            <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="editsection" class="btn btn-block button">Update</button>
                            </div>
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
import UserService from '../../../../services/userService.js';
import EventBus from '../../../../event-bus.js'
import SectionNew from './newsection_template.vue';
    export default{
        components:{
        SectionNew
    },
    
        props:['school','userdetails','acdemicyearandboard',
        // 'academicsandboards'
        ],
        data(){
            return{
                section:{},
                sections:[],
                teachers:[],
                setSectionDetails:{},
                yearandboard:{
                    academicyearid:this.acdemicyearandboard.academicyearid,
                    syllabustype:this.acdemicyearandboard.syllabustype
                },
                id:this.$cookie.get('id'),
                academicObj:{},
                academicsandboards:{},
                open: 'show',
                academicgrades:[],
                pageNumber:0,
                size:10,
                searchacademicgradeid:0
            }
        },
        created(){
            UserService.AcademicYears(this.id).then((response)=>{
                this.academicsandboards=response.data;
                // this.yearandboard.academicyearid = this.academicsandboards[0].academicyearid;
                // this.yearandboard.syllabustype = this.academicsandboards[0].syllabustype;
            }),
            this.academicObj = this.yearandboard;
            UserService.Teachers(this.id).then((response)=>{
                this.teachers=response.data;
            })
            UserService.academicgrades(this.id).then((response) => {
                this.academicgrades = response.data;
            });
            this.changingyearandboard();
        
        },
        methods:{
            
          popup:function (SectionPopup,action) {
            $('#' + SectionPopup).modal(action);
        },
            setSection:function(section){
                console.log(section);
                this.setSectionDetails=section;
            },
            nextPage() {
                this.pageNumber++;
            },
            prevPage() {
                this.pageNumber--;
            },
            editsection:function(){
                console.log(this.setSectionDetails)
                UserService.UpdateSection(this.setSectionDetails,this.id).then((response)=>{
                    console.log(response);
                    if(response.status==200){
                         $('#editclass').modal('hide');
                    }

                }).catch((error)=>{
                    console.log(error.response.data)
                })
            },
            changingacademicyear:function(){
                console.log(this.academicObj)
                this.yearandboard.academicyearid = this.academicObj.academicyearid;
                this.yearandboard.syllabustype = this.academicObj.syllabustype;
                this.changingyearandboard()
            },
            changingboard:function(){
                console.log(this.academicObj.syllabustype)
                this.yearandboard.syllabustype = this.academicObj.syllabustype;
                this.changingyearandboard()
             },
            changingyearandboard: function(){
                this.searchacademicgradeid = 0;
                UserService.Sections(this.yearandboard,this.id).then((response)=>{
                    this.sections=response.data;
                    console.log(this.sections)
                    
                })
            },
            classroomcreated: function(){
                this.changingyearandboard();
            }
        },
        mounted(){

        },
        computed : {
            pageCount() {
            let l = this.sections.length,
                s = this.size;
            return Math.ceil(l / s);
            },
            filterSections: function() {
                var self = this;
                return this.sections.filter(function(section) {
                    let filterAcademicGrade;
                    if(self.searchacademicgradeid == 0){
                        filterAcademicGrade = true;
                    }else{
                        if(section.academicgradeid == self.searchacademicgradeid){
                            filterAcademicGrade = true;
                        }else{
                            filterAcademicGrade = false;
                        }
                    }
                    return filterAcademicGrade;
                });
            },
            paginatedData() {
            const start = this.pageNumber * this.size,
                end = start + this.size;
            return this.filterSections.slice(start, end);
        },
        },

    }
</script>
<style>
.sectionstable{
width:100%;
}
.reset-padding{
    padding: 0;
}
.reset-margin{
    margin: 0;
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
  color: black !important;
}
/*.newsection{
background-color: #039be5;
background-image: none;
border-color: #039be5;
color:white;
padding: 5px 30px;
margin-top: 10px;
font-size: 14px;
font-weight: bold;
text-transform: uppercase;
text-decoration:none;
border-radius:0px
}
.newsection:hover{
color:white;
}*/
.col-lg-3{
    white-space: nowrap;
}
.col-lg-3 > select{
    display: inline-block;
    width: 80%;
    height: 100%;
}

</style>


