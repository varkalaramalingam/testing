<template>
   <div>
      <div class="col-md-6 col-md-offset-3">
         <div class="row reset-padding reset-margin">
            <div class="col-lg-12 text-left">
               <h3 class="student-head"><span v-html="$t('schedules')"/></h3>
               <hr>
            </div>
         </div>
         <div id="today" class="col-lg-12 classestable reset-padding reset-margin">
            <div class="divTable">
               <div class="divTableBody">
                  <div class="divTableRow">
                  </div>
                  <div class="divTableRowdata" v-for="schedule in todayschedule">
                     <div class="divTableCelldata">{{schedule.day}}</div>
                     <div class="" v-for="schedules in schedule.teacherScheduleDTO">
                        <div class="divTableCelldata">{{schedules.gradenumber}}{{schedules.sectionname}}</div>
                        <div class="divTableCelldata">{{schedules.subjectname}}</div>
                        <div class="divTableCelldata">{{GetFromTime(schedules.periodfrom)}}-{{GetFromTime(schedules.periodto)}}</div>
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
    import UserService from '../../../services/userService.js';
    export default {
        props: ['school', 'userdetails','userid'],
        data() {
            return {
                todayschedule: [],

                schedules: {
                    id: this.$cookie.get("userid"),
                },
                id:this.$cookie.get('id')

            }
        },
        created() {
            console.log(this.schedules)
            UserService.GetTeacherTodaySchedule(this.schedules,this.id).then((response) => {
                    this.todayschedule = response.data;
                    console.log(response);

                })
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
        }
    }
</script>
<style scoped>
.divTable{
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
.divTableCell, .divTableHead {
    border: 1px solid #eee;
    display: table-cell;
    padding: 3px 10px;
}
.divTableCelldata{
    border: 1px solid #eee;
    display: table-cell;
    padding: 3px 10px;
    height:50px;
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
