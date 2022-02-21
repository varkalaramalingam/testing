import cranalyticsmarksofallstudents from "../components/admin/classroom_analytics/classroomanalticsmarksofallstudents_template.vue";
import classroomanalyticsmarks from "../components/admin/classroom_analytics/classroomanalyticsmarks_template.vue";
import classroomanalytics from "../components/admin/classroom_analytics/classroomanalytics_template.vue";
import intervieweesModule from "../components/admin/interviewees/intervieweesmodule_template.vue";
import interviewees from "../components/admin/interviewees/interviewees_template.vue";
import newinterviewee from "../components/admin/interviewees/newinterviewee_template.vue";
import listofclients from "../components/admin/schools/clientslist_template.vue";
import schoolsModule from "../components/admin/schools/schoolsmodule_template.vue";
import schools from "../components/admin/schools/schools_template.vue";
import newstudent from "../components/admin/students/newstudent_template.vue";
import studentsModule from "../components/admin/students/studentsmodule_template.vue";
import students from "../components/admin/students/students_template.vue";
import yettoadmitstudents from "../components/admin/students/yettoadmit_students_template.vue";
import student from "../components/admin/students/student_template.vue";
import newteacher from "../components/admin/teachers/newteacher_template.vue";
import teachersModule from "../components/admin/teachers/teachersmodule_template.vue";
import teachers from "../components/admin/teachers/teachers_template.vue";
import testsList from "../components/admin/tests/testslist_template.vue";
import testsModule from "../components/admin/tests/testsmodule_template.vue";
import test from "../components/admin/tests/test_template.vue";
import dashboard from "../components/dashboard/dashboard_template.vue";
import login from "../components/login/login_template.vue";
import successpage from "../components/register/registrationsuccesspage.template.vue";
import myschedules from "../components/teacher/myschedule/myschedule_template.vue";
import worksheet from "../components/admin/worksheets/worksheet_template.vue";
import adminRoutes from "./admin-routes";
import analyticsRoutes from "./analytics";
import booksRoutes from "./books";
import crmRoutes from "./crm";
import myChildrenRoutes from "./my-children";
import myClassRoutes from "./my-class";
import mySubjectsRoutes from "./my-subjects";
import projectRoutes from "./projects";
import studentAnalytics from "./student-analytics";
import transportRoutes from "./transport";
import workSheetRoutes from "./worksheets";


export default [
  {
    path: "/",
    component: login
  },
  { path: "/login", component: login },
  { path: "/dashboard", component: dashboard },
  { path: "/successfullyregistred", component: successpage },
  booksRoutes,
  workSheetRoutes,
  {
    path: "/studentsModule",
    component: studentsModule,
    children: [
      {
        path: "/newstudent",
        component: newstudent
      },
      {
        path: "students",
        component: students
      },
      {
        path: "yettoadmitstudents",
        component: yettoadmitstudents
      }
    ]
  },
  {
    path: "/teachersModule",
    component: teachersModule,
    children: [
      {
        path: "teachers",
        component: teachers
      },
      {
        path: "newteacher",
        component: newteacher
      }
    ]
  },
  {
    path: "/tests",
    component: testsModule,
    children: [
      {
        path: "test",
        component: test
      },
      {
        path: "list",
        component: testsList
      },
      {
        path: "add-questions",
        component: worksheet
      }
    ]
  },
  adminRoutes,
  {
    path: "/student",
    component: student
  },
  crmRoutes,
  myClassRoutes,
  mySubjectsRoutes,
  {
    path: "/myschedules",
    component: myschedules
  },
  analyticsRoutes,
  studentAnalytics,
  {
    path: "/classroomanalytics",
    component: classroomanalytics,
    children: [
      {
        path: "marks",
        component: classroomanalyticsmarks
      },
      {
        path: "marksofallstudents",
        component: cranalyticsmarksofallstudents
      }
    ]
  },
  transportRoutes,
  myChildrenRoutes,
  {
    path: "/schoolsModule",
    component: schoolsModule,
    children: [
      {
        path: "schools",
        component: schools
      },
      {
        path: "clientslist",
        component: listofclients
      }
    ]
  },
  projectRoutes,
  {
    path: "/intervieweesModule",
    component: intervieweesModule,
    children: [
      {
        path: "interviewees",
        component: interviewees
      },
      {
        path: "newinterviewee",
        component: newinterviewee
      }
    ]
  }
];
