import managementanalyticsattendance from "../components/admin/analytics/attendance/managementattendanceanalytics_template.vue";
import managementanalyticsaveragemarksofagrade from "../components/admin/analytics/avg_marks/managementaveragemarksofagradeanalytics_template.vue";
import managementanalyticsbirthdays from "../components/admin/analytics/birthdays/managementbirthdayanalytics_template.vue";
import managementanalyticsboards from "../components/admin/analytics/board/managementboardanalytics_template.vue";
import managementanalyticsfee from "../components/admin/analytics/fee/managementfeeanalytics_template.vue";
import managementanalytics from "../components/admin/analytics/home/managementanalytics_template.vue";
import managementanalyticsmarks from "../components/admin/analytics/marks/managementmarksanalytics.vue";
import managementanalyticsstudents from "../components/admin/analytics/students/mamagementstudentanalytics_template.vue";
import managementanalyticsteachers from "../components/admin/analytics/teachers/managementteacheranalytics_template.vue";
import booksanalyticsbyteacher from "../components/admin/analytics/heatmaps/studentbooksanalyticsbyteacherwise.vue";
import projectanalyticsbytags from "../components/admin/analytics/heatmaps/studentprojectanalyticsyytagswise.vue";
import worksheetsanalyticsbytags from "../components/admin/analytics/heatmaps/studentworksheetsanalyticsbytags.vue";
import classroomworksheetsanalyticsbytags from "../components/admin/analytics/heatmaps/classroomstudentsworksheetanalyticsbytags.vue";
import gradeworksheetsanalyticsbytags from "../components/admin/analytics/heatmaps/gradestudentsworksheetanalyticsbytags.vue";
import girlsAndBoysAverageMarks from "../components/admin/analytics/avg_marks/girlsandboysavgmarks.vue";
export default {
  path: "/analytics",
  component: managementanalytics,
  children: [
    {
      path: "students",
      component: managementanalyticsstudents
    },
    {
      path: "boards",
      component: managementanalyticsboards
    },
    {
      path: "teachers",
      component: managementanalyticsteachers
    },
    {
      path: "fee",
      component: managementanalyticsfee
    },
    {
      path: "attendance",
      component: managementanalyticsattendance
    },
    {
      path: "marks",
      component: managementanalyticsmarks
    },
    {
      path: "birthdays",
      component: managementanalyticsbirthdays
    },
    {
      path: "averagemarksofagrade",
      component: managementanalyticsaveragemarksofagrade
    },
    {
      path: "girlsAndBoysAverageMarks",
      component: girlsAndBoysAverageMarks
    },
    {
      path: "booksanalyticsbyteacher",
      component: booksanalyticsbyteacher
    },
    {
      path: "projectanalyticsbytags",
      component: projectanalyticsbytags
    },
    {
      path: "worksheetsanalyticsbytags",
      component: worksheetsanalyticsbytags
    },
    {
      path: "classroomworksheetsanalyticsbytags",
      component: classroomworksheetsanalyticsbytags
    },
    {
      path: "gradeworksheetsanalyticsbytags",
      component: gradeworksheetsanalyticsbytags
    }
  ]
};
