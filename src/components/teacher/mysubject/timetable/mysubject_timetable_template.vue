<template>
  <div>
    <div class="row reset-padding reset-margin">
      <div class="col-lg-10 text-left">
        <h3 class="student-head"><span v-html="$t('time_table')" /></h3>
      </div>
      <div class="col-lg-2 reset-padding reset-margin">
        <button
          class="joinCallButton pull-right"
          data-toggle="modal"
          v-on:click="handleJoinCallModal"
        >
          Join Class
        </button>
      </div>
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
              v-for="timings in weekdays.timeTableDataTransferObject"
              v-bind:key="timings.subjectname"
            >
              {{ timings.subjectname }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal
      v-if="openModal"
      @close="handleJoinCallModal"
      :sessionKeys="sessionKeys"
      :sectionId="mysubject.id"
      :subjectId="subjectId"
      :whiteBoardSessionKey="whiteBoardSessionKey"
    />
  </div>
</template>
<script>
import UserService from "../../../../services/userService.js";
import instances from "../../../api/instances.json";
import modal from "../../../parent/mychild/tests/VideoCallModal";
export default {
  props: ["mysubject", "school", "userdetails", "sectiondetails"],
  components: { modal },
  data() {
    return {
      sectionid: {
        id: this.mysubject.id
      },
      timetable: [],
      periodsubjects: {},
      id: this.$cookie.get("id"),
      openModal: false,
      sessionKeys: [],
      whiteBoardSessionKey: "",
      classDetails: {
        academicYearId: this.$cookie.get("academicyearid"),
        classId: this.mysubject.gradeid,
        sectionId: this.mysubject.id,
        subjectId: this.mysubject.subjectid,
        syllabusType: this.mysubject.syllabustype
      }
    };
  },
  created() {
    UserService.GetTimingsForMyclass(this.sectionid, this.id).then(response => {
      this.timetable = response.data;

      console.log(response);
    });

    window.crypto.subtle
      .generateKey(
        {
          name: "AES-GCM",
          length: 128
        },
        true, // extractable
        ["encrypt", "decrypt"]
      )
      .then(data => {
        window.crypto.subtle.exportKey("jwk", data).then(keyData => {
          UserService.getClassSessionKeys(this.id, {
            academicYearId: this.$cookie.get("academicyearid"),
            classId: this.mysubject.gradeid,
            sectionId: this.mysubject.id,
            subjectId: this.mysubject.subjectid,
            syllabusType: this.mysubject.syllabustype,
            classSessionKey: `${this.generateRandomID()},${keyData.k}`
          }).then(response => {
            this.whiteBoardSessionKey = response.data.classSessionKey;
            this.sessionKeys = [response.data.sessionKey];
          });
        });
      });
  },

  methods: {
    GetFromTime: function(time) {
      if (time > 720) {
        var temp = time - 720;
        return (temp - (temp % 60)) / 60 + ":" + (temp % 60) + " PM";
      } else {
        return (time - (time % 60)) / 60 + ":" + (time % 60) + " AM";
      }
    },

    handleJoinCallModal: function() {
      this.openModal = !this.openModal;
    },
    generateRandomID: function() {
      const arr = new Uint8Array(10);
      window.crypto.getRandomValues(arr);
      return Array.from(arr, this.byteToHex).join("");
    },
    byteToHex: function(byte) {
      return `0${byte.toString(16)}`.slice(-2);
    }
  }
};
</script>
<style scoped>
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
.joinCallButton {
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
</style>
