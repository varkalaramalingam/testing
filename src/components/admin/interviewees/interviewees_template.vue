<template>
<div class="container-fluid">
   <div class="row">
    <div class="page-layout">
        <div class="row">
            <div class="col-lg-6">
                <div class="page-heading"><span v-html="$t('interviewees')"/></div>
                
            </div>
            <div class="col-md-6 text-right">
<router-link to="/intervieweesModule/newinterviewee" data-target="#worksheetPopUp" tag="button" class="common-button pull-right">New Interviewee</router-link>
                <div id="custom-search-input"  class="input-group searchbar pull-right">
                    <input type="text" class="search-query form-control" placeholder="Search" v-model="search">
                    <span class="input-group-btn">
                        <button class="btn search-btn" type="button">
                            <span class=" glyphicon glyphicon-search"></span>
                        </button>
                    </span>
                </div>

           
            <!-- <button class='common-button pull-right' style="width: 177px;" v-on:click="popUp('worksheetPopUp',open);">New Student</button>-->
            </div>
        </div>
        <hr/>

            
              
        <div class="row intervieweestable reset-padding reset-margin " >
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">ID</div>
                        <div class="divTableCell">Name</div>
                        <div class="divTableCell">Email Id</div>
                        <div class="divTableCell">Last Name</div>
                        <div class="divTableCell">Contact Number</div>
                        <div class="divTableCell">Gender</div>
                        <div class="divTableCell">Edit</div>
                    </div>
                    
                    <div class="divTableRowdata" v-for="interviewee in paginatedData">
                       <div class="divTableCelldata">{{interviewee.id}}</div>
                        <div class="divTableCelldata">{{interviewee.name}}</div>
                        <div class="divTableCelldata">{{interviewee.emailid}}</div>
                        <div class="divTableCelldata">{{interviewee.lastname}}</div>
                        <div class="divTableCelldata">{{interviewee.contactnumber}}</div>
                        <div class="divTableCelldata">{{interviewee.gender}}</div>
                        <div class="divTableCelldata"><a data-toggle="modal" href="#editinterviewee" v-on:click="setInterviewee(interviewee);"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                    </div>
                    
                </div>
            </div>
        </div>
        <br>
        <div>
            <button class="btn previousbutton" :disabled="pageNumber === 0" @click="prevPage"> Previous</button>
            <button class="btn nextbutton" :disabled="pageNumber >= pageCount -1" @click="nextPage">Next</button>
        </div>
        <div class="modal fade" id="editinterviewee" role="dialog">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
         <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">Edit interviewee</h4>
         </div>
         <div class="modal-body">
            <form name="editintervieweemodal">
               <h4><u><b>interviewee Details</b></u></h4>
               <div class="row">
                  <div class=col-lg-6>
                     <div class="row">
                        <div class="col-md-4">
                           <label>First Name</label>
                        </div>
                        <div class="col-md-8">
                           <input type="text" class="form-control form-input" name="intervieweename" v-model="interviewee.name"  placeholder="intervieweename*">
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label>Middle Name</label>
                        </div>
                        <div class="col-md-8 ">
                           <input type="text" class="form-control form-input" id="" name="middlename" placeholder="interviewee Middlename" v-model="interviewee.middlename" >
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label>Last Name</label>
                        </div>
                        <div class="col-md-8 ">
                           <input type="text" class="form-control form-input" id="" name="lastname" placeholder="interviewee Lastname*" v-model="interviewee.lastname">
                        </div>
                     </div>
                     <br>
                  </div>
                  <div class="col-lg-6">
                     <div class="row">
                        <div class="col-md-4">
                           <label>Gender</label>
                        </div>
                        <div class="col-md-8">
                           <label><input type="radio"  name="gender" value="female" v-model="interviewee.gender">Female</label>
                           <label><input type="radio"  name="gender" value="male" v-model="interviewee.gender">Male</label>
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label>e-mail </label>
                        </div>
                        <div class="col-md-8">
                           <input type="text" class="form-control form-input" name="emailid" v-model="interviewee.emailid" placeholder="xxxxxxxxx@yyy.com">
                        </div>
                     </div>
                     <br>
                     <div class="row">
                        <div class="col-md-4">
                           <label>contact number </label>
                        </div>
                        <div class="col-md-8">
                           <input type="text" class="form-control form-input" name="emailid" v-model="interviewee.contactnumber" placeholder="enter Mobile No">
                        </div>
                     </div>
                     <br>
                  </div>
               </div>
               <br>
               <div class="row">
                  <div class="col-lg-6 col-lg-offset-3 text-center">
                     <button id="btn-reset"  data-dismiss="modal" class="btn btn-info button"> Cancel</button>
                     <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="editinterviewee()" class="btn btn-info button">Update</button>
                  </div>
               </div>
            </form>
         </div>
      </div>
   </div>
</div>
<!-- <router-view v-bind:userdetails="userdetails" v-bind:school="school" v-bind:boardofeducation="boardofeducation" v-bind:houses="houses"></router-view> -->
</div>
</div>
</div>
</template>




<script>
import UserService from "../../../services/userService.js";
import DatePicker from "vue2-datepicker";
import EventBus from "../../../event-bus.js";
import store from "../../../store.js";
export default {
  components: { DatePicker },
  props: ["school", "userdetails"],
  data() {
    return {
      search: "",
      interviewee: {},
      interviewees: [],
      id: this.$cookie.get("id"),
      pageNumber: 0,
      size: 10,
      open: "show",
      close: "open",
    };
  },
  created() {
    this.getIntervieweesList();
  },

  methods: {
    getIntervieweesList: function() {
      UserService.Interviewees(this.id).then((response) => {
        this.interviewees = response.data;
        console.log(response.data);
      });
    },
    setInterviewee: function(interviewee) {
      console.log(interviewee);
      this.interviewee = interviewee;
    },
    editinterviewee: function() {
      var intervieweedetailsforedit = {
        id: this.interviewee.id,
        name: this.interviewee.name,
        middlename: this.interviewee.middlename,
        lastname: this.interviewee.lastname,
        gender: this.interviewee.gender,
        emailid: this.interviewee.emailid,
        contactnumber: this.interviewee.contactnumber,
      };
      UserService.UpdateInterviewee(intervieweedetailsforedit, this.id).then(
        (response) => {
          if (response.status == 200) {
            $("#editinterviewee").modal("hide");
            this.$alert('Updated Interviewee successfully','Success','success');
          }
          this.getIntervieweesList();
        }
      );
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
      let l = this.interviewees.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    filterinterviewees: function() {
      var self = this;
      return this.interviewees.filter(function(interviewee) {
        return (
          interviewee.name.toLowerCase().indexOf(self.search.toLowerCase()) >= 0
        );
      });
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.filterinterviewees.slice(start, end);
    }
  }
};
</script>
<style scoped>
.reset-padding {
  padding: 0;
}
.reset-margin {
  margin: 0;
}
.intervieweestable {
  width: 100%;
}
</style>
