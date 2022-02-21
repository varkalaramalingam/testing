import recommendbook from "../components/admin/books/recommendbook_template.vue";
import instructions from "../components/interviewee/header/instructions.vue";
import myChildren from "../components/parent/header/chidrenModule_template.vue";
import mychildassignments from "../components/parent/mychild/assignments/mychild_assignments_template.vue";
import mychildattendance from "../components/parent/mychild/attendance/mychild_attendance_template.vue";
import mychildbooks from "../components/parent/mychild/books/mychildbooks_template.vue";
import mychildjournal from "../components/parent/mychild/journals/mychild_journal_template.vue";
import mychildmessages from "../components/parent/mychild/messages/mychild_messages_template.vue";
import mychildsubjects from "../components/parent/mychild/subjects/mychild_subjects_template.vue";
import myChildTest from "../components/parent/mychild/tests/myChildTest_template";
import mychildtests from "../components/parent/mychild/tests/mychild_tests_template.vue";
import ChildTimeTable from "../components/parent/mychild/tests/TimeTable";
import WhiteBoard from "../components/parent/mychild/tests/WhiteBoard";
import mychildworksheets from "../components/parent/mychild/worksheets/mychild_worksheets_template.vue";
import viewevaluation from "../components/parent/mychild/worksheets/viewevaluation.vue";
import wsTest from "../components/parent/mychild/worksheets/worksheettest_template.vue";
import mychildprojects from "../components/parent/mychild/projects/mychild_projects_template.vue";
import submitProjectReport from "../components/parent/mychild/projects/submit_report_template.vue";
import viewProject from "../components/admin/projects/view_project.vue";
import viewReport from "../components/parent/mychild/projects/view_report.vue";
import viewProjectEvaluation from "../components/parent/mychild/projects/view_project_evaluation.vue";
import worksheet from "../components/admin/worksheets/worksheet_template.vue";
import getAssignedStudnetsFromBus from "../components/admin/transport/add_students_to_bus/get_assigned_students_from_buses.vue"

export default {
  path: "/my-children",
  component: myChildren,
  children: [
    { path: "instructions", component: instructions },
    {
      path: "tests",
      component: mychildtests
    },
    {
      path: "subjects",
      component: mychildsubjects
    },
    {
      path: "test",
      component: myChildTest
    },
    {
      path: "attendance",
      component: mychildattendance
    },
    {
      path: "worksheets",
      component: mychildworksheets
    },
    {
      path: "journal",
      component: mychildjournal
    },
    {
      path: "assignments",
      component: mychildassignments
    },
    {
      path: "ws-test",
      component: wsTest
    },
    {
      path: "messages",
      component: mychildmessages
    },
    {
      path: "books",
      component: mychildbooks
    },
    {
      path: "recommendbook",
      component: recommendbook
    },
    {
      path: "time-table",
      component: ChildTimeTable
    },
    {
      path: "white-board",
      component: WhiteBoard
    },
    {
      path: "view-evaluation",
      component: viewevaluation
    },
    {
      path: "view-project/:id",
      component: viewProject
    },
    {
      path: "projects",
      component: mychildprojects
    },
    {
      path: "submit-report",
      component: submitProjectReport
    },
    {
      path: "view-report",
      component: viewReport
    },
    {
      path: "view-project-evaluation",
      component: viewProjectEvaluation
    },
    {
      path: "add-questions",
      component: worksheet
    },
    {
      path:"getAssignedStudnetsFromBus",
      component:getAssignedStudnetsFromBus
    }

  ]
};
