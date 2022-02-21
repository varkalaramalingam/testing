<template>
  <div>
    <div class="row reset-padding reset-margin">
      <div class="col-lg-12 text-left">
        <h3 class="student-head"><span v-html="$t('time_table')"/></h3>
        <hr />
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
  </div>
</template>
<script>
import UserService from "../../../../services/userService.js";
export default {
  props: ["myclass", "school", "userdetails", "sectiondetails"],
  data() {
    return {
      sectionid: {
        id: this.myclass.id
      },
      timetable: [],
      periodsubjects: {},
      id: this.$cookie.get("id")
    };
  },
  created() {
    UserService.GetTimingsForMyclass(this.sectionid, this.id).then(response => {
      this.timetable = response.data;
      console.log(this.periods);
      console.log(response);
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
</style>
