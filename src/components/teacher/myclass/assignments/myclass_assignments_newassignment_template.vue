<template>
    <div>
        <div class="col-lg-12 text-left">
            <h3 class="student-head">New Assignment</h3>
            <hr>
        </div>
         <div class="panel newassignmentpanel col-lg-6 col-lg-offset-3" >
           <div class="panel-body">
                <form class="form-horizantal" name="newassignmentform">
                    <div class="col-md-12">
                        <div class="leftside-form">
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
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <router-link :to="{path:'/myclass/'+myclass.gradenumber+myclass.sectionname+'-'+myclass.syllabustype+'/assignments'}" tag="button" class="btn button">Cancel</router-link>
                                    <button id="btn-post" type="submit" name="submit"  class="btn button" v-on:click.prevent="newassignment" >Save</button>
                                </div>
                            </div>
                        </div>
                      </div>
                    </form>
                </div>
            </div>
    </div>
</template>
<script>
import DatePicker from "vue2-datepicker";
import UserService from "../../../../services/userService.js";
export default {
  props: [
    "myclass",
    "school",
    "userdetails",
    "acdemicyearandboard",
    "assignments"
  ],
  components: { DatePicker },
  data() {
    return {
      assignment: {},
      id: {
        id: this.school.id
      },
      sectionid: {
        id: this.myclass.id
      },
      assignmentsafteradding: []
    };
  },
  methods: {
    newassignment: function() {
      var assignment = {
        id: this.myclass.id,
        tags: this.assignment.tags,
        assignmentname: this.assignment.assignmentname,
        dateofassigned: this.assignment.dateofassigned.getTime(),
        duedate: this.assignment.duedate.getTime(),
        assignment_type_id: 1
      };
      console.log(assignment);
      UserService.AddMySubjectAssignment(
        assignment,
        this.requestheaders,
        this.id
      )
        .then(response => {
          if (response.status == 200) {
            this.$router.push(
              "/myclass/" +
                this.myclass.gradenumber +
                this.myclass.sectionname +
                "-" +
                this.myclass.syllabustype +
                "/assignments"
            );
          }
        })
        .catch(response => {
          console.log(response);
        });
    }
  }
};
</script>
