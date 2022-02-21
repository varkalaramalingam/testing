<template>
  <div class="">
    <div class="container-fluid">
      <div class="row">
        <div class="page-layout">
          <div class="row">
            <div class="col-lg-6 text-left">
              <div class="page-heading"><span v-html="$t('staff')" /></div>
            </div>
            <div class="col-lg-6 text-right">
              <router-link
                to="/admin/newuser"
                tag="button"
                class="common-button pull-right"
                >New Staff</router-link
              >
              <div
                id="custom-search-input"
                class="input-group searchbar pull-right"
              >
                <input
                  type="text"
                  class="search-query form-control"
                  placeholder="search"
                  v-model="search"
                />
                <span class="input-group-btn">
                  <button class="btn search-btn" type="button">
                    <span class="glyphicon glyphicon-search"></span>
                  </button>
                </span>
              </div>
            </div>
          </div>
          <br />
          <div class="row reset-padding reset-margin">
            <div>
              <label
                class="col-sm-1 control-label"
                style="width: 8.3%; margin-top: 6px"
                >Role :</label
              >
              <select class="form-control gradeFilter" v-model="searchRoleId">
                <option value="0">All</option>
                <option v-for="role in roles" v-bind:value="role.id" v-if="role.id == 0 || role.id == 2 || role.id == 6 || role.id == 7 || role.id == 9 ">
                  {{ role.role }}
                </option>
              </select>
            </div>
            <div>
              <label
                class="col-sm-1 control-label"
                style="width: 12.3%; margin-top: 6px"
                >InActiveUsers :</label
              >
              <select class="form-control gradeFilter" v-model="inactive">
                <option value="">All</option>
                <option :value="true">true</option>
                <option :value="false">false</option>
              </select>
            </div>
          </div>
          <hr />
          <div class="teacherstable">
            <div class="divTable">
              <div class="divTableBody">
                <div class="divTableRow">
                  <div class="divTableCell">ID</div>
                  <div class="divTableCell">FirstName</div>
                  <div class="divTableCell">MiddleName</div>
                  <div class="divTableCell">Lastname</div>
                  <div class="divTableCell">Contact Number</div>
                  <div class="divTableCell">Emailid</div>
                  <div class="divTableCell">Address</div>
                  <div class="divTableCell">Gender</div>
                  <div class="divTableCell">InActive</div>
                  <div class="divTableCell">UserRole</div>
                  <div class="divTableCell">Date Of Joining</div>
                  <div class="divTableCell">Edit</div>
                </div>
                <div class="divTableRowdata" v-for="user in paginatedData">
                  <div class="divTableCelldata">{{ user.id }}</div>
                  <div class="divTableCelldata">{{ user.firstname }}</div>
                  <div class="divTableCelldata">{{ user.middlename }}</div>
                  <div class="divTableCelldata">{{ user.lastname }}</div>
                  <div class="divTableCelldata">{{ user.contactnumber }}</div>
                  <div class="divTableCelldata">{{ user.emailid }}</div>
                  <div class="divTableCelldata">{{ user.address }}</div>
                  <div class="divTableCelldata">{{ user.gender }}</div>
                  <div v-if="user.statusid == 2" class="divTableCelldata">true</div>
                  <div v-if="user.statusid == 1" class="divTableCelldata">false</div>
                  <div class="divTableCelldata">{{ user.role }}</div>
                  <div class="divTableCelldata">
                    {{ getDateOfJoining(user.dateofjoining) }}
                  </div>
                  <div class="divTableCell"><a data-toggle="modal" href="#edituser" v-on:click="setUser(user)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                </div>
              </div>
            </div>
          </div>
          <br />
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
        </div>
      </div>
    </div>
    <div
      class="modal fade"
      id="edituser"
      role="dialog"
      name="editteachermodal"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">
              &times;
            </button>
            <h4 class="modal-title">Edit Staff Details</h4>
          </div>
          <div class="modal-body">
            <form name="editteachermodal">
              <div class="row">
                <div class="col-lg-6">
                  <div class="row">
                    <div class="col-md-4">
                      <label>First Name</label>
                    </div>
                    <div class="col-md-8">
                      <input
                        type="text"
                        class="form-control form-input"
                        name="username"
                        v-model="user.firstname"
                        placeholder="firstname*"
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-4">
                      <label>Middle Name</label>
                    </div>
                    <div class="col-md-8">
                      <input
                        type="text"
                        class="form-control form-input"
                        id=""
                        name="middlename"
                        placeholder="Teacher Middlename*"
                        v-model="user.middlename"
                      />
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-4">
                      <label for="class">Last Name</label>
                    </div>
                    <div class="col-md-8">
                      <input
                        type="text"
                        class="form-control"
                        name="lastname"
                        placeholder="Teacher LastName*"
                        v-model="user.lastname"
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-4">
                      <label>Gender</label>
                    </div>
                    <div class="col-md-8">
                      <label
                        ><input
                          type="radio"
                          value="female"
                          name="gender"
                          v-model="user.gender"
                        />Female</label
                      >
                      <label
                        ><input
                          type="radio"
                          value="male"
                          name="gender"
                          v-model="user.gender"
                        />Male</label
                      >
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-4">
                      <label>Marital Status</label>
                    </div>
                    <div class="col-md-8">
                      <label
                        ><input
                          type="radio"
                          value="married"
                          name="maritalstatus"
                          v-model="user.maritalstatus"
                        />
                        Married</label
                      >
                      <label
                        ><input
                          type="radio"
                          value="unmarried"
                          name="maritalstatus"
                          v-model="user.maritalstatus"
                        />
                        Unmarried</label
                      >
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-4">
                      <label for="class">Date Of Birth</label>
                    </div>
                    <div class="col-md-8">
                      <date-picker
                        lang="en"
                        v-model="setuserdateofbirth"
                      ></date-picker>
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-4">
                      <label for="class">Blood Group</label>
                    </div>
                    <div class="col-md-8">
                      <input
                        type="text"
                        class="form-control"
                        name="bloodgroup"
                        placeholder="O+,O-,B+,B-,A+,A- *"
                        v-model="user.bloodgroup"
                        ng-pattern=""
                        required
                      />
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-4">
                      <label>Contact Number</label>
                    </div>
                    <div class="col-md-8">
                      <input
                        type="text"
                        class="form-control form-input"
                        name="contact number"
                        v-model="user.contactnumber"
                        placeholder="contactnumber*"
                        ng-pattern=""
                      />
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-4">
                      <label>E-mail </label>
                    </div>
                    <div class="col-md-8">
                      <input
                        type="email"
                        class="form-control form-input"
                        name="emailid"
                        v-model="user.emailid"
                        placeholder="xxxxxxxxx@yyy.com"
                      />
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-4">
                      <label>Qualification </label>
                    </div>
                    <div class="col-md-8">
                      <input
                        type="text"
                        class="form-control form-input"
                        name="qualification"
                        v-model="user.qualification"
                        placeholder=" for ex:Phd,B.tech"
                      />
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-12">
                      <label v-if="user.statusid == 1"
                        ><input
                          type="radio"
                          value="true"
                          v-model="user.inactive"
                        />Inactive</label
                      >
                      <label v-if="user.statusid == 2"
                        ><input
                          type="radio"
                          value="false"
                          v-model="user.inactive"
                        />Active</label
                      >
                    </div>
                  </div>
                  <br />
                </div>
                <div class="col-lg-6">
                  <div class="row">
                    <div class="col-md-4">
                      <label>Date of joining</label>
                    </div>
                    <div class="col-md-8">
                      <date-picker
                        lang="en"
                        v-model="setteacherdateofjoining"
                      ></date-picker>
                    </div>
                  </div>
                  <br />
                  <div class="row">
                    <div class="col-md-4">
                      <label>Address</label>
                    </div>
                    <div class="col-md-8">
                      <textarea
                        rows="7"
                        cols="40"
                        class="form-control form-input"
                        v-model="user.address"
                      ></textarea>
                    </div>
                  </div>
                </div>
                <div class="row">
                    <div class="col-md-4">
                         <label>Roles</label>
                    </div>
                    <div class="col-md-4">
                        <select class="form-control" v-model="user.role">
                            <option v-for="role in roles" v-if="role.id == 2 || role.id==6 || role.id==7 || role.id==9 " :value="role.role">{{role.role}}</option>
                        </select>
                    </div>
                </div>
                <div class="row">
                  <div class="col-lg-6 col-lg-offset-3 text-center">
                    <button
                      id="btn-reset"
                      type="reset"
                      class="btn btn-info button"
                    >
                      Reset
                    </button>
                    <button
                      id="btn-Register"
                      type="submit"
                      name="submit"
                      v-on:click.prevent="edituser"
                      class="btn btn-info button"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- <router-view v-bind:userdetails="userdetails" v-bind:school="school"></router-view> -->
  </div>
</template>

<script>
import UserService from "../../../../services/userService";
import DatePicker from "vue2-datepicker";
import moment from "moment";

export default {
  components: { DatePicker },
  props: ["school", "userdetails"],
  data() {
    return {
      user: {},
      users: [],
      setuserdateofbirth: "",
      setteacherdateofjoining: "",
      id: this.$cookie.get("id"),
      pageNumber: 0,
      size: 10,
      search: "",
      searchRoleId: 0,
      roles: [],
      inactive: "",
    };
  },
  created() {
    this.getUsersList();
    this.getRoles();
  },
  methods: {
    getUsersList: function () {
      UserService.getUsers(this.id)
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    },
    getRoles: function () {
      UserService.getRoles(this.id).then((response) => {
        this.roles = response.data;
      });
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    setUser: function (user) {
      this.user = user;
      this.setuserdateofbirth = new Date();
      this.setuserdateofbirth.setTime(user.dateofbirth);
      this.setteacherdateofjoining = new Date();
      this.setteacherdateofjoining.setTime(user.dateofjoining);
      this.user.inactive = null;
    },
    edituser: function () {
      var user = {
        id: this.user.id,
        firstname: this.user.firstname,
        middlename: this.user.middlename,
        lastname: this.user.lastname,
        gender: this.user.gender,
        maritalstatus: this.user.maritalstatus,
        contactnumber: this.user.contactnumber,
        emailid: this.user.emailid,
        qualification: this.user.qualification,
        dateofbirth: this.setuserdateofbirth.getTime(),
        dateofjoining: this.setteacherdateofjoining.getTime(),
        bloodgroup: this.user.bloodgroup,
        address: this.user.address,
        role: this.user.role,
        inactive: this.user.inactive,
      };
      
      if(user.role == null || user.role == undefined){
         alert("Role Should not be Empty")
         return
      } else if(user.emailid == null || user.emailid == undefined){
         alert("Emailid Should not be Empty")
         return
      }
      UserService.UpdateStaff(user, this.id)
        .then((response) => {
          if (response.status == 200) {
            $("#edituser").modal("hide");
            this.$alert("Updated Teacher successfully", "Success", "success");
            this.getUsersList();
          }
        })
        .catch((error) => {
            alert(error)
        });
    },
    getDateOfJoining: function (date) {
      return moment(date).format("DD/MM/YYYY");
    },
  },
  computed: {
    pageCount() {
      let l = this.filterUsers.length,
        s = this.size;
      return Math.ceil(l / s);
    },
    filterUsers: function () {
      var self = this;
      return this.users.filter(function (user) {
        let filterEmail;
        let searchRoles;
        let inactiveFilter;
        self.search !== ""
          ? (filterEmail =
              user.emailid.toLowerCase().indexOf(self.search.toLowerCase()) >=
              0)
          : (filterEmail = true);
        self.searchRoleId > 0
          ? (searchRoles = user.roleid === self.searchRoleId)
          : (searchRoles = true);
        self.inactive !== ""
          ? (inactiveFilter = user.inactive === self.inactive)
          : (inactiveFilter = true);
        return filterEmail && searchRoles && inactiveFilter;
      });
    },
    paginatedData() {
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.filterUsers.slice(start, end);
    },
  },
};
</script>

<style>
.teacherstable {
  width: 100%;
}

.newteacher {
  background-color: #039be5;
  background-image: none;
  border-color: #039be5;
  color: white;
  padding: 5px 30px;
  margin-top: -2px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0px;
}

.newstudent:hover {
  color: white;
}

button {
  background-color: #039be5;
}

/* .btn {
    border-radius: 1px;
    color: #fff
} */

.btn:hover,
.btn:focus {
  color: #fff;
  text-decoration: none;
}
.gradeFilter {
  float: left;
  width: 10%;
}
</style>