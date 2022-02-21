<template>
  <div class="container-fluid">
    <div class="row">
      <div class="page-layout">
        <div class="row">
          <div class="col-md-3">
            <div class="page-heading"><span v-html="$t('time_table')"/></div>
          </div>
        </div>
        <hr />
        <div>
          <!-- <label class="col-sm-1 control-label" style="width:8.3%"
            >Child :</label
          >
          <select
            class="form-control gradeFilter"
            v-model="myChildId"
            @change="selectChild(myChild)"
          >
            <option
              v-for="(child, index) in childrens"
              v-bind:value="child.studentid"
              v-bind:key="child.name + index"
              >{{ child.name }}</option
            >
          </select> -->
          <button
            class="joinCallButton pull-right"
            data-toggle="modal"
            v-on:click="handleJoinCallModal"
          >
            Join Class
          </button>
        </div>

        <div class="col-lg-12 periodtable reset-padding reset-margin">
          <div class="divTable">
            <div class="divTableBody">
              <div class="divTableRow">
                <div class="divTableCell">No.of periods</div>
                <div
                  class="divTableCell"
                  v-for="timings in timetable.periods"
                  v-bind:key="timings.period_number"
                >
                  {{ timings.period_number }}
                </div>
              </div>
              <div class="divTableRow">
                <div class="divTableCell">Timings/Days</div>
                <div
                  class="divTableCell"
                  v-for="timings in timetable.periods"
                  v-bind:key="timings.period_number"
                >
                  {{ GetFromTime(timings.periodfrom) }} To
                  {{ GetFromTime(timings.periodto) }}
                </div>
              </div>
              <div
                class="divTableRowdata"
                v-for="weekdays in timetable.timeTableView"
                v-bind:key="weekdays.day"
              >
                <div class="divTableCell">{{ weekdays.day }}</div>
                <div
                  class="divTableCell"
                  v-for="(timings,
                  index) in weekdays.timeTableDataTransferObject"
                  v-bind:key="timings.subjectname + index"
                >
                  {{ timings.subjectname }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal v-if="openModal && whiteBoardSessionKey" @close="handleJoinCallModal" :sessionKeys="sessionKeys"
     :whiteBoardSessionKey="whiteBoardSessionKey" :sectionId="sectionId" :subjectId="subjectId"/>
  </div>
</template>
<script>
import UserService from "../../../../services/userService.js";
import store from "../../../../store.js";
import instances from "../../../api/instances.json";
import moment from "moment";
import modal from "./VideoCallModal";
export default {
  components: { modal },
  data() {
    return {
      subjectTeachers: [],
      studentsofgrade: [],
      addingstudenttosection: {
        admissionnumber: ""
      },
      tenantId: this.$cookie.get("id"),
      myClassDetails: this.$store.state.myClass,
      //children details
      acdemicyearandboard: this.$store.state.acdemicyearandboard,
      academicDetails: {},
      school: {},
      userdetails: {},
      pageNumber: 0,
      size: 10,
      search: "",
      listoftests: [],
      userid: this.$cookie.get("userid"),
      childrens: [],
      myChild: {},
      //children details end
      testdetails: [],
      myChildId: 0,
      timetable: [],
      periodsubjects: {},
      openModal: false,
      sessionKeys: [],
      whiteBoardSessionKey: "",
      sectionId: 0,
      subjectId: 1
    };
  },
  created() {
    this.tenantId = this.$cookie.get("id");
    this.school = this.$store.state.school;
    this.userdetails = this.$store.state.userDetails;
    this.gradeid = {
      id: this.grade,
      academicyear: this.$store.state.acdemicyearandboard.academicyearid
    };
    this.academicDetails = {
      academicyearid: this.acdemicyearandboard.academicyearid,
      syllabustype: this.acdemicyearandboard.syllabustype
    };
    this.myChild = this.$store.state.myChild;
    this.myChildId = this.myChild && this.myChild.studentid;
    this.sectionId = this.myChild && this.myChild.classid;
    //children
    const parentid = {
      id: this.userid
    };

    UserService.getClassSessionKeys(this.tenantId, {
      academicYearId: this.$cookie.get("academicyearid"),
      classId: this.myChild.gradeid,
      sectionId: this.myChild.classid,
      subjectId: this.subjectId,
      syllabusType: this.acdemicyearandboard.syllabustype
    })
      .then(response => {
        this.whiteBoardSessionKey = response.data.classSessionKey;
        this.sessionKeys = [response.data.sessionKey];
      })
      .catch(() => {});

    if(this.$store.state.userDetails.userrole == "PARENT"){
    UserService.MyChild(this.tenantId, parentid).then(response => {
      console.log(JSON.stringify(response.data));
      this.childrens = response.data;
      if (this.childrens.length > 0) {
        const { id: sectionId } = response.data[0];
        if (!this.myChild || !this.myChild.studentid) {
          this.myChild = this.childrens[0];
          this.myChildId = this.myChild.studentid;
        }
        this.$store.commit("SET_MY_CHILD", this.myChild);
        this.getMyChildTests();
        const { gradeid = "" } = this.myChild || {};
        UserService.GetTimingsForMyclass(
          { id: this.myChild.classid },
          this.tenantId
        ).then(response => {
          this.timetable = response.data;
        });
      }
    });
    }
    else if(this.$store.state.userDetails.userrole == "STUDENT"){
      this.getMyChildTests();
        const { gradeid = "" } = this.myChild || {};
        UserService.GetTimingsForMyclass(
          { id: this.myChild.classid },
          this.tenantId
        ).then(response => {
          this.timetable = response.data;
        });
    }
  },
  methods: {
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    popUp: function(id, action) {
      $("#" + id).modal(action);
    },

    getstartdate: function(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    getenddate: function(date) {
      return moment(date).format("DD/MM/YYYY");
    },

    // This method will be called when the child is selected
    // selectChild: function(myChild) {
    //   let length = this.childrens.length;
    //   for (let i = 0; i < length; i++) {
    //     if (this.myChildId == this.childrens[i].studentid) {
    //       this.myChild = this.childrens[i];
    //       break;
    //     }
    //   }
    //   this.$store.commit("SET_MY_CHILD", this.myChild);
    //   this.getMyChildTests();
    // },
    //End

    getMyChildTests: function() {
      var studentid = {
        id: this.myChild.gradeid
      };
      UserService.ChildTests(this.tenantId, studentid).then(response => {
        console.log(response);
        this.testdetails = response.data;
        this.myChild["testCreateId"] =
          this.testdetails[0] && this.testdetails[0].id;
      });
    },

    GetFromTime: function(time) {
      if (time > 720) {
        var temp = time - 720;
        return (temp - (temp % 60)) / 60 + ":" + (temp % 60) + " PM";
      } else {
        return (time - (time % 60)) / 60 + ":" + (time % 60) + " AM";
      }
    },
    handleJoinCallModal: function() {
      if (this.whiteBoardSessionKey) {
        this.openModal = !this.openModal;
      } else {
        alert("Class is not started yet");
      }
    },

    selectTest: function(selectedTest) {
      console.log(selectedTest);
      this.selectedTest = selectedTest;
      this.$store.commit("SELECTED_CLASSROOM_TEST", selectedTest);
      this.$store.commit("SET_MY_CHILD", this.myChild);
      this.$router.push({
        path: "/my-children/test"
      });
    }
  },
  computed: {
    pageCount() {
      let l = this.testdetails.length,
        s = this.size;
      return Math.ceil(l / s);
    },

    filteTests: function() {
      var self = this;
      return this.testdetails.filter(function(student) {
        return true;
      });
    },
    paginatedData() {
      if (!this.testdetails || this.testdetails.length == 0) {
        return;
      }
      const start = this.pageNumber * this.size,
        end = start + this.size;
      return this.filteTests.slice(start, end);
    }
  }
};
</script>
<style scoped>
@import url("../../../../assets/css/classrooms_styles.css");

.joinCallButton {
  background-color: #039be5;
  background-image: none;
  border-color: #039be5;
  color: white;
  padding: 5px 30px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0px;
}

.fullScreenModal {
  width: 100%;
  height: 100%;
  margin: 0;
  top: 0;
  left: 0;
}
.fullScreenIframe {
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: absolute;
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
</style>
