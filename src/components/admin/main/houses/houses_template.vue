<template>
    <div class="page-layout">
        <div class="row">
           <!-- <div class="modal fade" data-keyboard="false" data-backdrop="static" id="worksheetPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
              
                <div class="modal-body">

<new-house-test></new-house-test>
                    
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-info" data-dismiss="modal">Cancel</button>
                    <button type="button" id="submit" @click="saveWorkSheetDetails(workSheetIndex,worksheetObj.id)" class="btn btn-primary">Save</button>
                </div>
            </div>
        </div>
    </div>-->
            <div class="col-lg-6">
                <div class="page-heading"><span v-html="$t('houses')"/></div>
            </div>
            <div class="col-lg-6 text-right">
          <router-link to="/admin/newhouse" tag="button" class="common-button">New House</router-link>
           <!--  <button class='common-button pull-right' style="width: 177px;" v-on:click="popUp('worksheetPopUp',open);">New House</button>-->
        </div>
        </div>
        <hr/>
        <div class="housestemptable">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">House Name</div>
                        <div class="divTableCell">Description</div>
                        <div class="divTableCell">Edit</div>
                        <div class="divTableCell">Delete</div>
                        <div class="divTableCell">Details</div>
                    </div>
                    <div class="divTableRowdata" v-for="house in houses">
                        <div class="divTableCelldata">{{house.housename}}</div>
                        <div class="divTableCelldata">{{house.description}}</div>
                        <div class="divTableCelldata"><a data-toggle="modal" href="#edithousemodal" v-on:click="setHouse(house)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                        <div class="divTableCelldata"><a data-toggle="modal" v-on:click.prevent="deleteHouse(house)"><i class="fa fa-trash fa-1x" aria-hidden="true" href="#"></i></a></div>
                        <div class="divTableCelldata"><a data-toggle="modal" href="#housedetailsmodal" v-on:click="loadhousecompletedetails(house)"><i class="fa fa-file-text" aria-hidden="true"></i></a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="edithousemodal" role="dialog">
            <div class="modal-dialog modal-md">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit House</h4>
                    </div>
                    <div class="modal-body">
                        <form class="form-horizantal" name="edithouseform">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">House Name:</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="housename" placeholder="House name*" v-model="sethouseforupdating.housename"  required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Description:</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="description" placeholder="Description*" v-model="sethouseforupdating.description"  required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" data-dismiss="modal" class="btn button">Cancel</button>
                                    <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="edithouse()" class="btn button">Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="housedetailsmodal" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Details</h4>
                    </div>
                    <div class="modal-body">
                        <div class="divTable">
                            <div class="divTableBody">
                                <div class="divTableRow">
                                    <div class="divTableCell">Grade Name</div>
                                    <div class="divTableCell">Syllabus Type</div>
                                    <div class="divTableCell">No. of Students</div>
                                    <div class="divTableCell">Total Students</div>
                                </div>
                                <div class="divTableRowdata" v-for="details in noofstudentsinhouse">
                                    <div class="divTableCelldata">{{details.gradename}}</div>
                                    <div class="divTableCelldata">{{details.syllabustype}}</div>
                                    <div class="divTableCelldata">{{details.noofstudents}}</div>
                                    <div class="divTableCelldata">{{details.totalnoofstudents}}</div>
                                </div>
                            </div>
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
/*import NewHouseTest from './newhouse_template.vue'*/
export default{
    props:['school','userdetails'],
    /*components:{
        NewHouseTest
    },*/
    data(){
        return{
            houses:[],
            sethouseforupdating:{},
            noofstudentsinhouse:[],
            id:this.$cookie.get('id')
        }
    },
    created(){
        UserService.Houses(this.id).then((response)=>{
        this.houses=response.data;
        }).catch((error)=>{
            console.log(error.response.data);
        })
    },
    methods:{
       /* popUp: function(id, action) {
            $('#' + id).modal(action);
        },*/
        deleteHouse:function(house){
            var houseid={
                "id":house.id
            }
            UserService.DeleteHouse(houseid,this.id).then((response)=>{
              if(response.status==200){
                  UserService.Houses().then((response)=>{
                      this.houses=response.data
                  })
              }
            }).catch((error)=>{
                console.log(error.response.data);
            })
        },
        setHouse:function(house){
            this.sethouseforupdating=house;
        },
        edithouse:function(){
            UserService.EditHouse(this.sethouseforupdating,this.id).then((response)=>{
                if(response.status==200){
                  $('#edithousemodal').modal('hide');   
                }
            }).catch((error)=>{
                console.log(error.response.data)
            })
            
        },
        loadhousecompletedetails:function(house){
            var housename={
                "housename":house.housename
            }
            UserService.NumberOfStudentsInHouse(housename,this.id).then((response)=>{
                this.noofstudentsinhouse=response.data
            }).catch((error)=>{
                console.log((error.response.data))
            })

        }

      
    }

}
 
</script>
<style>
.housestemptable{
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
