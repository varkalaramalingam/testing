<template>
    <div>
    <div class="col-lg-12">
        <div class="col-lg-10 text-left">
            <h3 class="student-head"><span v-html="$t('journals')"/></h3>
        </div>
        <div class="col-lg-2 reset-padding reset-margin">
            <a tag="button" class="btn newworksheetbutton pull-right" data-toggle="modal" href="#newdairyentry" v-on:click.prevent="cleardairyentry">New Entry</a>
        </div>
        </div>
        <div class="col-lg-12 worksheetstable reset-padding reset-margin">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Date</div>
                        <div class="divTableCell">Tags</div>
                        <div class="divTableCell">Lesson Name</div>
                        <div class="divTableCell">Description</div>
                        <div class="divTableCell">Edit</div>
                    </div>
                    <div class="divTableRowdata" v-for="dairy in dairy">
                        <div class="divTableCelldata">{{getEntryDate(dairy.entrydate)}}</div>
                        <div class="divTableCelldata">{{dairy.tag}}</div>
                        <div class="divTableCelldata">{{dairy.lessonname}}</div>
                        <div class="divTableCelldata">{{dairy.description}}</div>
                        <div class="divTableCelldata"><a data-toggle="modal" href="#newdairyentry" v-on:click="setDairy(dairy)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="newdairyentry" role="dialog" name="newdairyentry">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">New Entry</h4>
                    </div>
                    <div class="modal-body">
                         <form class="form-horizantal" name="newdairyentry">
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Due Date</label>
                                </div>
                                <div class="col-md-8">
                                    <date-picker lang="en" v-model="dairyentry.entrydate" ></date-picker>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Tags</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="tags" placeholder="Tags*" v-model="dairyentry.tag"  required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Lesson Name</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="lessonname" placeholder="Lesson Name*" v-model="dairyentry.lessonname"   required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Description</label>
                                </div>
                                <div class="col-md-8">
                                    <textarea name="address" class="form-control" rows="4" cols="50" placeholder="Description... *" v-model="dairyentry.description"  required></textarea>
                                </div>
                            </div>
                            <br>

                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-Register" type="reset" name="reset"  class="btn btn-info button"  data-dismiss="modal">Cancel</button>
                                    <button id="btn-post" type="submit" name="submit"  class="btn button" v-on:click.prevent="newdairyentry" >Save</button>
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
import DatePicker from 'vue2-datepicker';
import UserService from '../../../../services/userService.js';
import moment from 'moment'

export default{
     props:['mysubject','school','userdetails','acdemicyearandboard'],
     components: { DatePicker },
     data(){
         return{
             dairy:[],
             dairyentry:{},
             sectionid:{
                 "classroomid":this.mysubject.id,
                 "subjectid":this.mysubject.subjectid
             },
             setentrydate:'',
             newentry:false,
            id:this.$cookie.get('id')
         }
     },
     created(){
        console.log(this.mysubject);

        UserService.Dairy(this.sectionid,this.id).then((response)=>{
            console.log(response);
            this.dairy=response.data
        }).catch((error)=>{
            console.log(error.response.data)
        })
     },
     methods:{
         newdairyentry:function(){
            console.log(this.dairyentry);
                if(this.newentry==true){
                    var newdairyentry={
                        "subjectid":this.mysubject.subjectid,
                        "classroomid":this.mysubject.id,
                        "tag":this.dairyentry.tag,
                        "entryDate":this.dairyentry.entrydate.getTime(),
                        "description":this.dairyentry.description,
                        "lessonname":this.dairyentry.lessonname
                    }
                console.log(newdairyentry);
                UserService.AddDairy(newdairyentry,this.id).then((response)=>{
                    console.log(response);
                    if(response.status==202){
                        $('#newdairyentry').modal('hide');
                        UserService.Dairy(this.sectionid,this.id).then((response)=>{
                            console.log(response);
                            this.dairy=response.data
                        }).catch((error)=>{
                    console.log(error.response.data)
                    })
                    }
                    }).catch((error)=>{
                 console.log(error.response.data)
                })
            }
            else{
                var newdairyentry={
                    "id":this.dairyentry.id,
                    "subjectid":this.mysubject.subjectid,
                    "classroomid":this.mysubject.id,
                    "tag":this.dairyentry.tag,
                    "entryDate":this.dairyentry.entrydate.getTime(),
                    "description":this.dairyentry.description,
                    "lessonname":this.dairyentry.lessonname
                }
                console.log(newdairyentry);
                    UserService.UpdateDairy(newdairyentry,this.id).then((response)=>{
                        console.log(response);
                        if(response.status==202){
                            $('#newdairyentry').modal('hide');
                            UserService.Dairy(this.sectionid,this.id).then((response)=>{
                                console.log(response);
                                this.dairy=response.data
                            }).catch((error)=>{
                                console.log(error.response.data)
                            })
                        }
                        }).catch((error)=>{

                        console.log(error.response.data);
                    })

                }
                this.newentry=false
            }
         
     ,
        getEntryDate:function(date){
            return moment(date).format('DD/MM/YYYY');
        },
        setDairy:function(dairy){
            this.dairyentry=dairy;
            this.setentrydate=new Date();
            this.setentrydate.setTime(dairy.entrydate);
            this.dairyentry.entrydate=this.setentrydate;
        },
        cleardairyentry:function(){
            this.dairyentry={}
            this.newentry=true;
        }
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
</style>