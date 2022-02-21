<template>
    <div>
        <div class="col-lg-12">
            <div class="col-lg-10 text-left">
                <h3 class="student-head"><span v-html="$t('assignments')"/></h3>
            </div>
            <div class="col-lg-2 reset-padding reset-margin">
                <a tag="button" class="btn newassignmentbutton pull-right" data-toggle="modal" href="#assignment">New Assignment</a>
            </div>
        </div>
        <div class="col-lg-12 assignments reset-padding reset-margin">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Date</div>
                        <div class="divTableCell">Assignment Name</div>
                        <div class="divTableCell">Due Date</div>
                        <div class="divTableCell">Tags</div>
                        <div class="divTableCell">Description</div>
                        <div class="divTableCell">Delete</div>
                    </div>
                    <div class="divTableRowdata" v-for="assignment in assignments">
                        <div class="divTableCelldata">{{getAssignedDate(assignment.dateofassigned)}}</div>
                        <div class="divTableCelldata">{{assignment.assignmentname}}</div>
                        <div class="divTableCelldata">{{getDueDate(assignment.assignmentduedate)}}</div>
                        <div class="divTableCelldata">{{assignment.tags}}</div>
                        <div class="divTableCelldata">{{assignment.description}}</div>
                        <div class="divTableCelldata"><a data-toggle="modal" v-on:click.prevent="deleteassignment(assignment)"><i class="fa fa-trash fa-1x" aria-hidden="true" href="#"></i></a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="assignment" role="dialog" name="addassignmentmodal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">New Assignment</h4>
                    </div>
                    <div class="modal-body">
                         <form class="form-horizantal" name="newassignmentform">
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Tags</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="Tags" placeholder="Tags*" v-model="assignment.tags"  required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Assignment Name</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="assignmentname" placeholder="Name Of Assignment*" v-model="assignment.assignmentname"  required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Date Of Assignment</label>
                                </div>
                                <div class="col-md-8">
                                    <date-picker lang="en" v-model="assignment.dateofassigned" ></date-picker>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Due Date</label>
                                </div>
                                <div class="col-md-8">
                                    <date-picker lang="en" v-model="assignment.duedate"></date-picker>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Description</label>
                                </div>
                                <div class="col-md-8">
                                    <!-- <input type="text" class="form-control" name="description" placeholder="description" v-model="assignment.description"  required> -->
                                    <textarea rows="4" cols="40" class="form-control form-input" name="description" placeholder="Assignment Description" v-model="assignment.description" />
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button data-dismiss="modal"  class="btn  button">Cancel</button>
                                    <button id="btn-post" type="submit" name="submit"  class="btn button" v-on:click.prevent="newassignment" >Save</button>
                                </div>
                            </div>
                         </form>
                      
                    </div>
                    
                </div>

            </div>
        </div>
        
        <router-view v-bind:myclass="myclass" v-bind:school="school" v-bind:userdetails="userdetails" v-bind:acdemicyearandboard="acdemicyearandboard" v-bind:assignments="assignments"></router-view>
    </div>
</template>
<script>
import UserService from "../../../../services/userService.js";
import moment from "moment";
import DatePicker from "vue2-datepicker";

export default {
  props: ["myclass", "school", "userdetails", "acdemicyearandboard"],
  components: { DatePicker },
  data() {
    return {
      assignments: [],
      assignment: {},
      sectionid: {
        classroomid: this.myclass.id
      },
      id: this.$cookie.get("id")
    };
  },
  created() {
    UserService.MyClassAssignments(this.sectionid, this.id)
      .then(response => {
        console.log(response);
        this.assignments = response.data;
      })
      .catch(response => {
        console.log(response.response.data);
      });
  },
  methods: {
    getAssignedDate: function(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    getDueDate: function(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    deleteassignment: function(assignment) {
      console.log(assignment);
      var assignmentid = {
        id: assignment.id
      };
      UserService.DeleteMySubjectAssignment(assignmentid, this.id)
        .then(response => {
          console.log(response);
          if (response.status == 200) {
            UserService.MyClassAssignments(this.sectionid, this.id)
              .then(response => {
                console.log(response);
                this.assignments = response.data;
              })
              .catch(response => {
                console.log(response.response.data);
              });
          }
        })
        .catch(response => {
          console.log(response);
        });
    },
    isValidAssignment(){
      console.log(this.assignment);
      if(this.assignment.assignmentname == undefined){
        this.$alert("assignment name can't be empty",'Info','info');
        return false;
      }
      if(this.assignment.tags == undefined){
        this.$alert("tags can't be empty",'Info','info');
        return false;
      }
      if(this.assignment.assignmentname.length >= 256){
        this.$alert("assignment name can't be more than 256 characters. length:"+this.assignment.assignmentname.length,'Info','info');
        return false;
      }
      if(this.assignment.tags.length >= 64){
        this.$alert("tags can't be more than 64characters. length:"+this.assignment.tags.length,'Info','info');
        return false;
      }
      if(this.assignment.description.length >= 1024){
        this.$alert("description can't be more than 1024 characters. length:"+this.assignment.description.length,'Info','info');
        return false;
      }
      return true;
    },
    newassignment: function() {
      if(this.isValidAssignment()){
        var assignment = {
          id: this.myclass.id,
          tags: this.assignment.tags,
          assignmentname: this.assignment.assignmentname,
          dateofassigned: this.assignment.dateofassigned.getTime(),
          duedate: this.assignment.duedate.getTime(),
          assignment_type_id: 1,
          start_date: this.assignment.dateofassigned.getTime(),
          assignmentduedate: this.assignment.duedate.getTime(),
          description: this.assignment.description
        };
        console.log(assignment);
        UserService.AddMySubjectAssignment(assignment, this.id)
          .then(response => {
            if (response.status == 200) {
              $("#assignment").modal("hide");
              this.$alert('Assigned Assignment successfully','Success','success');
              UserService.MyClassAssignments(this.sectionid, this.id)
                .then(response => {
                  console.log(response);
                  this.assignments = response.data;
                })
                .catch(response => {
                  console.log(response.response.data);
                });
            }
          })
          .catch(error => {
            console.log(error.response);
            if(error.response.data.message == "failed to assign"){
              this.$alert(error.response.data.message,'Failure','warning');
            } 
            // else {
            //   this.$alert("Check name>256 or tag>64 or description>1024 characters",'Info','info');
            // }
          });
      }
    }
  }
};
</script>
<style>
.assignments {
  width: 100%;
}
.divTable {
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
.divTableCell,
.divTableHead {
  border: 1px solid #eee;
  display: table-cell;
  padding: 3px 10px;
}
.divTableCelldata {
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
.newassignmentbutton {
  background-color: #039be5;
  background-image: none;
  border-color: #039be5;
  color: white;
  padding: 5px 30px;
  margin-top: 12%;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0px;
}
.newassignmentbutton:hover {
  color: white;
}
button {
  background-color: #039be5;
}
.btn {
  border-radius: 0px;
  color: #fff;
}
.btn:hover,
.btn:focus {
  color: #fff;
  text-decoration: none;
}
</style>
