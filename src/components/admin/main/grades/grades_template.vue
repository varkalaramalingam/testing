<template>
    <div class="page-layout">
        <div class="row">
             <!--  pop up start
    <div class="modal fade" data-keyboard="false" data-backdrop="static" id="worksheetPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <div>
                        <h4>Grades details</h4>
                    </div>
                    
                </div>
                <div class="modal-body">
hi this is rk

                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" id="submit" @click="saveWorkSheetDetails(workSheetIndex,worksheetObj.id)" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>
    pop up end-->
            <div class="col-lg-6">
                <div class="page-heading"><span v-html="$t('grades')"/></div>
            </div>
            <div class="col-lg-6 text-right">
            <router-link to="/admin/newgrade" tag="button" class="common-button">New Grade</router-link>
            <!--<button class='common-button pull-right' style="width: 177px;" v-on:click="popUp('worksheetPopUp',open);">New Grade</button>-->
        </div>
        </div>
        <hr/>
        <div class="gradestable">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Grade No</div>
                        <div class="divTableCell">Grade Name</div>
                        <div class="divTableCell">Syllabus Type</div>
                    </div>
                    <div class="divTableRowdata" v-for="grade in grades">
                        <div class="divTableCelldata">{{grade.gradenumber}}</div>
                        <div class="divTableCelldata">{{grade.gradename}}</div>
                        <div class="divTableCelldata">{{grade.syllabustype}}</div>
                    </div>
                </div>
   	        </div>
        </div>
    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import EventBus from '../../../../event-bus.js';
    export default{
      props:['school','userdetails','acdemicyearandboard'],
        
        data(){
            return{
                grades:[],
                syllabustype:this.acdemicyearandboard.syllabustype,
                id:this.$cookie.get('id')
            }
        },
        created(){
            UserService.AllGrades(this.id).then((response)=>{
                this.grades=response.data;
            })
            
        },
        methods: {
        
       /* popUp: function(id, action) {
            $('#' + id).modal(action);
        },*/
    },  
        mounted(){
            var ref=this;
            EventBus.$on('GRADES', function (syllabustype,id) {
                UserService.Grades(syllabustype,id).then((response)=>{
                    ref.grades=response.data;
                    console.log(ref.grades)
                  
                })
            });
        }
    }
</script>
<style>
.gradestable{
width:100%;
}
<style scoped>
.reset-padding
{
padding: 0;
} 
.reset-margin{
 margin: 0;
}

</style>
