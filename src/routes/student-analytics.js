import studentanalyticsattendanceofstudents from "../components/teacher/analytics/attendance/studentanalyticsattendanceofstudents_template.vue";
import studentanalyticsmarksofastudentinbarchart from "../components/teacher/analytics/barchart/studentanalyticsmarksofastudentinbarchart_template.vue";
import studentanalyticsmarksofastudentinheatmap from "../components/teacher/analytics/heatmap/studentanalyticsmarksofastudentinheatmap_template.vue";
import studentanalyticsmarksofastudent from "../components/teacher/analytics/marks/studentanalyticsmarksofastudent_template";
import studentanalyticsperformanceofastudent from "../components/teacher/analytics/performance/studentanalyticsperformanceofastudent_template.vue";
import studentanalytics from "../components/teacher/analytics/students/studentanalytics_template";

export default {
  path: "/studentanalytics",
  component: studentanalytics,
  children: [
    {
      path: "marksofastudent",
      component: studentanalyticsmarksofastudent
    },
    {
      path: "marksofastudentinbarchart",
      component: studentanalyticsmarksofastudentinbarchart
    },
    {
      path: "marksofastudentinheatmap",
      component: studentanalyticsmarksofastudentinheatmap
    },
    {
      path: "attendance",
      component: studentanalyticsattendanceofstudents
    },
    {
      path: "performance",
      component: studentanalyticsperformanceofastudent
    }
  ]
};
