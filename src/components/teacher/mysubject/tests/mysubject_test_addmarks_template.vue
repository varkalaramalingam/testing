<template>
    <div>
        <div class="row reset-padding reset-margin">
            <div class="panel addresultpanel" >
                <div class="panel-body">
                        <div class="col-lg-12">
                            <div class="divTable">
                                <div class="divTableBody">
                                    <div class="divTableRow">
                                        <div class="divTableCell">Student Id </div>
                                        <div class="divTableCell">Student Name</div>
                                        <div class="divTableCell">Maximum Marks</div>
                                        <div class="divTableCell">Obtained Marks</div>
                                    </div>
                                    <div class="divTableRowdata" v-for="student in studentandmarksdata">
                                        <div class="divTableCelldata">{{student.studentid}}</div>
                                        <div class="divTableCelldata">{{student.name}}</div>
                                        <div class="divTableCelldata">{{student.maxmarks}}</div>
                                        <div class="divTableCelldata"><input type="text" v-model="student.marks" /></div>
                                    </div>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" type="reset" class="btn button"> Reset</button>
                                    <button id="btn-submit" type="submit" name="submit" v-on:click.prevent="submitmarks" class="btn button" ng-disabled="creategradeform.$invalid">Submit</button>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';

    export default{
         props:['mysubject','school','userdetails','acdemicyearandboard','studentandmarksdata'],
         data(){
             return{

            }
         },
         methods:{
             submitmarks:function(){
                var marksdata=[];
                for(var i=0;i<this.studentandmarksdata.length;i++){
                    var eachstudentmarks={
                        subjectname:this.mysubject.subjectname,
                        id:this.studentandmarksdata[i].id,
                        marks:this.studentandmarksdata[i].marks,
                        testtye:this.studentandmarksdata[i].testtype,
                        classid:this.studentandmarksdata[i].classid,
                        studentid:this.studentandmarksdata[i].studentid,
                        testid:this.studentandmarksdata[i].testid,
                        subjectid:this.studentandmarksdata[i].subjectid
                    }
                    
                }
                marksdata.push(eachstudentmarks);
                UserService.AddMarks(marksdata).then((response)=>{
                    if(response.status==201){
                        this.$router.push('/mysubjects/'+this.mysubject.gradenumber+this.mysubject.sectionname+'-'+this.mysubject.subjectname+'-'+this.mysubject.syllabustype+'/tests')
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

</style>