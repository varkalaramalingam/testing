<template>
  <div class="container-fluid">
    <div class="row">
      <div class="page-layout">
        <div class="row">
          <div class="col-md-3">
            <div
              v-if="this.$cookie.get('userrole') === 'STUDENT' && isEducationSchool"
              class="page-heading"
            >
              Worksheets
            </div>
            <div class="page-heading" v-else>Tests</div>
          </div>
        </div>
        <hr />
        <div class="col-lg-12 reset-padding reset-margin"></div>

        <div class="subjectteachertable">
          <div class="divTable">
            <div class="divTableBody">
              <br />
              <div class="divTableRow">
                <div
                  v-if="this.$cookie.get('userrole') === 'STUDENT' && isEducationSchool"
                  class="divTableCell"
                >
                  Worksheet Name
                </div>
                <div class="divTableCell" v-else>Test Name</div>
                <div class="divTableCell">Subject</div>
                <div class="divTableCell">Start date</div>
                <div class="divTableCell">End date</div>
                <div class="divTableCell">Total marks</div>
                <div class="divTableCell">Secured marks</div>
                <div class ="divTableCell">Purpose</div>
                <div class="divTableCell">Status</div>
                <div class="divTableCell">Actions</div>
              </div>
              <div class="divTableRowdata" v-for="worksheet in worksheets">
                <div class="divTableCelldata">
                  {{ worksheet.worksheet_name }}
                </div>
                <div class="divTableCelldata">{{ worksheet.subjectname }}</div>
                <div class="divTableCelldata">{{ worksheet.startdate }}</div>
                <div class="divTableCelldata">{{ worksheet.enddate }}</div>
                <div class="divTableCelldata">{{ worksheet.max_marks }}</div>
                <div class="divTableCelldata">{{ worksheet.securedmarks }}</div>
                <div class="divTableCelldata">{{ getWorkseetPurpose(worksheet.purpose)}}</div>
                <div class="divTableCelldata" v-if="worksheet.statusid == 1">
                  submitted
                </div>
                <div class="divTableCelldata" v-else-if="worksheet.statusid == 2">
                  not submitted
                </div>
                <div class="divTableCelldata" v-else-if="worksheet.statusid == 3 || worksheet.statusid == 5">
                  Evaluated
                </div>
                <div class="divTableCelldata" v-else-if="worksheet.statusid == 4">
                  Auto Evaluated
                </div>
                <div class="divTableCelldata">
                  <button
                    class="assign-button"
                    v-on:click="takeTest(worksheet)"
                  >
                    View
                  </button>
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
import UserService from "../../../../services/userService.js";
import moment from "moment";
import store from "../../../../store.js";
export default {
  data() {
    return {
      tenantId: this.$cookie.get("id"),
      worksheets: [],
      academicDetails: {},
      school: {},
      userdetails: {},
      pageNumber: 0,
      size: 10,
      userid: this.$cookie.get("userid"),
      childrens: [],
      myChild: {},
      myChildId: 0,
      pageNumber: 0,
      size: 10,
      worksheetPurpose:[
                {
                    id: 1,
                    text: "REGULAR"
                },
                {
                    id: 2,
                    text: "ONLINE_EXAM"
                },
                {
                    id: 3,
                    text: "COMPREHENSION"
                }
            ],
      isEducationSchool: this.$store.state.isEducationSchool
    };
  },
  created() {
    this.tenantId = this.$cookie.get("id");
    this.school = this.$store.state.school;
    this.userdetails = this.$store.state.userDetails;
    this.myChild = this.$store.state.myChild;
    this.myChildId = this.myChild && this.myChild.studentid;
    if (this.$store.state.userDetails.userrole == "PARENT") {
      //children
      const parentid = {
        id: this.userid
      };
      UserService.MyChild(this.tenantId, parentid).then(response => {
        console.log(JSON.stringify(response.data));
        this.childrens = response.data;
        if (this.childrens.length > 0) {
          if (!this.myChild || !this.myChild.studentid) {
            this.myChild = this.childrens[0];
            this.myChildId = this.myChild.studentid;
          }
          this.$store.commit("SET_MY_CHILD", this.myChild);
          this.getChildWorkSheets();
        }
      });
      //children end
    } else if (this.$store.state.userDetails.userrole == "STUDENT") {
      this.getChildWorkSheets();
    }
  },
  methods: {
    getChildWorkSheets: function() {
      let classroomid = this.myChild.classid;
      let studentid = this.myChild.studentid;
      UserService.ChildWorksheets(this.tenantId, classroomid, studentid)
        .then(response => {
          this.worksheets = response.data.results;
          console.log(response);
        })
        .catch(error => {
          console.log(error.data);
        });
    },

     getWorkseetPurpose:function(id){
           for (const purpose of this.worksheetPurpose) {
               if(purpose.id == id)
               return purpose.text;
           }

        },

    takeTest: function(worksheet) {
      this.worksheet = worksheet;
      this.$store.commit("SET_PARENT_SEL_WORKSHEET", worksheet);
      this.$router.push({
        path: "ws-test"
      });
    }
  }
};
</script>
<style>
.worksheetstable {
  width: 100%;
}
.divTable {
  display: table;
  width: 100%;
  text-align: center;
}
.divTableRow {
  display: table-row;
  background-color: #5c779e;
  color: white;
  height: 30px;
}
.divTableRowdata {
  display: table-row;
  background-color: #f2f2f2;
  color: #000;
  height: 30px;
}

.divTableBody .divTableRowdata:nth-child(odd) {
  background-color: #fff;
}

.divTableHeading {
  background-color: #ffffff;
  display: table-header-group;
}
.divTableCell,
.divTableHead {
  border: 0px solid #eee;
  display: table-cell;
  padding: 9px 10px;
  font-weight: bold;
}
.divTableCelldata {
  border: 0px solid #eee;
  display: table-cell;
  padding: 5px 10px;
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
.newworksheetbutton {
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
.newworksheetbutton:hover {
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
.assign-button {
  background-color: #fff;
  color: #5c779e;
  padding: 5px 30px;
  margin-top: 0px;
  font-size: 14px;
  font-weight: bold;
  border-radius: 3px;
  border: 1px solid #5c779e;
}
</style>
