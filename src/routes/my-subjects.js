import student from "../components/admin/students/student_template.vue";
import mysubjectassignments from "../components/teacher/mysubject/assignments/mysubject_assignments_template.vue";
import mysubjectattendance from "../components/teacher/mysubject/attendance/mysubject_attendance_template.vue";
import mysubjectdiary from "../components/teacher/mysubject/dairy/mysubject_diary_template.vue";
import mysubjectmessages from "../components/teacher/mysubject/messages/mysubject_messages_template.vue";
import mysubjectbar from "../components/teacher/mysubject/sidebar/mysubjectBar_template.vue";
import mysubjectsidebar from "../components/teacher/mysubject/sidebar/mysubjectSidebar_template.vue";
import mysubjectstudents from "../components/teacher/mysubject/students/mysubject_students_template.vue";
import mysubjecttests from "../components/teacher/mysubject/tests/mysubject_tests_template.vue";
import mysubjectviewtestdetails from "../components/teacher/mysubject/tests/mysubject_viewtestdetails_template.vue";
import mysubjectaddmarks from "../components/teacher/mysubject/tests/mysubject_test_addmarks_template.vue";
import mysubjecttimetable from "../components/teacher/mysubject/timetable/mysubject_timetable_template.vue";
import mysubjectworksheets from "../components/teacher/mysubject/worksheets/mysubject_worksheets_template.vue";
import analyseworksheet from "../components/teacher/mysubject/worksheets/analyse_worksheet_template.vue";
import submittedanswers from "../components/teacher/mysubject/worksheets/submitted_answers_template.vue";
import wsAssignedStatus from "../components/teacher/mysubject/worksheets/wsassignedstatus_template.vue";
import ZoomMeeting from "../components/zoom-meeting/ZoomMeeting.vue";
import mysubjectprojects from "../components/teacher/mysubject/projects/mysubject_projects_template.vue";
import psAssignedStatus from "../components/teacher/mysubject/projects/psassignedstatus_template.vue";
import projectEvaluation from "../components/teacher/mysubject/projects/project_evaluation_template.vue";
import viewReport from  "../components/parent/mychild/projects/view_report.vue";
import worksheet from "../components/admin/worksheets/worksheet_template.vue";

export default {
  path: "/mysubjects",
  component: mysubjectbar,
  children: [
    {
      path: ":id",
      component: mysubjectsidebar,
      children: [
        {
          path: "tests",
          component: mysubjecttests,
          children: [
            {
              path: "addmarks",
              component: mysubjectaddmarks
            }
          ]
        },
        {
          path: "mysubjectviewtestdetails",
          component: mysubjectviewtestdetails
        },
        {
          path: "add-questions",
          component: worksheet
        },
        {
          path: "assignments",
          component: mysubjectassignments
        },
        {
          path: "worksheets",
          component: mysubjectworksheets
        },
        {
          path: "ws-assigned-status",
          component: wsAssignedStatus
        },
        {
          path: "analyseworksheet",
          component: analyseworksheet
        },
        {
          path: "ws-submitted-answers",
          component: submittedanswers
        },
        {
          path: "students",
          component: mysubjectstudents
        },
        {
          path: "student",
          component: student
        },
        {
          path: "mysubjecttimetable",
          component: mysubjecttimetable
        },
        {
          path: "journal",
          component: mysubjectdiary
        },
        {
          path: "attendance",
          component: mysubjectattendance
        },
        {
          path: "messages",
          component: mysubjectmessages
        },
        {
          path: "zoom-meeting",
          component: ZoomMeeting
        },
        {
          path: "projects",
          component: mysubjectprojects
        },
        {
          path: "ps-assigned-status",
          component:psAssignedStatus
        },
        {
          path: "project-evaluation",
          component:projectEvaluation
        },
        {
          path: "view-report",
          component:viewReport
        }
      ]
    }
  ]
};
