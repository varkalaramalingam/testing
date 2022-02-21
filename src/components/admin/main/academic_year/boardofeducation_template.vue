<template>
  <div class="page-layout">
        <div class="row">
            <div class="col-lg-6">
		        <div class="page-heading"><span v-html="$t('board_education')"/></div>
            </div>
            <div class="col-lg-6 text-right">
                <button tag="button" class="common-button" v-on:click="popUp('ADDSYLLABUS',open)">New SyllabusType</button>
            </div>
        </div>
		<hr/>
        <div class="">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">S.No</div>
                        <div class="divTableCell">SyllabusType</div>
                    </div>
                    <div class="divTableRowdata" v-for="bde in boardofeduction">
                        <div class="divTableCelldata">{{bde.id}}</div>
                        <div class="divTableCelldata">{{bde.syllabustype}}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="ADDSYLLABUS" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Add Syllabus</h4>
                    </div>
                    <div class="modal-body">
                        <form id="form" class="form-horizontal" role="form" name="Syllabusform" >
                            <div class="col-md-6 col-md-offset-3">
                                <div class="left-side-form">
                                    <div class="row">
                                        <div class="col-md-4">
                                            <label>Syllabus</label>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" class="form-control form-input"   placeholder="syllabustype*" v-model="syllabus.syllabustype" required>
                                        </div>
                                    </div>
                                    <br>
                                    <div class="row">
                                        <div class="col-md-4">
                                            <label>Description</label>
                                        </div>
                                        <div class="col-md-8">
                                            <input type="text" class="form-control form-input"   placeholder="description" v-model="syllabus.description"  required>                             
                                        </div>
                                    </div>
                                    <br>
                                </div>
                            </div>
                                            
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" type="reset" class="btn button"> Reset</button>
                                    <button id="btn-Register" type="button" name="resetpasswordbutton" v-on:click="addsyllabus" class="btn button"  >Submit</button>
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
import UserService from '../../../../services/userService.js'
export default{
    props:['school','userdetails'],
    data(){
        return{
            boardofeduction:[],
            id:this.$cookie.get('id'),
            open: 'show',
            close:'hide',
            syllabus:{

            }
        }
    },
    created(){
        this.getsyllabus();
    },
    methods:{
        popUp: function(id, action) {
                $('#' + id).modal(action);
        },
        getsyllabus: function(){
            UserService.BoardOfEducation(this.id).then((response)=>{
                this.boardofeduction=response.data
            }).catch((error)=>{
                console.log(error.response.data)
            })
        },
        addsyllabus: function(){
            var syllabus = {
                "syllabustype": this.syllabus.syllabustype,
                "description": this.syllabus.description
            }
            console.log(syllabus);
            UserService.AddSyllabus(this.id, syllabus).then((response) => {
                console.log(response.data);
                this.getsyllabus();
                this.popUp('ADDSYLLABUS',this.close);
                if(response.data.message == "Syllabus type already existed but Description is updated"){
                    this.$alert(response.data.message,'info','info');
                }
                else{
                    this.$alert(response.data.message,'Success','success');
                }
            }).catch((error)=>{
                console.log(error.response.data);
                if(error.response.data.message == "Please enter the syllabus type correctly. It cannot be empty"){
                    this.$alert(error.response.data.message,'Failure','warning');
                }
            })
        }
    }
}
</script>
<style scoped>
.reset-padding
{
padding: 0;
} 
.reset-margin{
 margin: 0;
}
.syllabustables{
width:100%;
}

</style>
