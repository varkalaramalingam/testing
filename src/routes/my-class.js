import student from "../components/admin/students/student_template.vue";
import booksassignedtostudent from "../components/teacher/books/booksassigned_tostudent_template.vue";
import classroominventory from "../components/teacher/books/classroominventory_template.vue";
import notreturnedbooks from "../components/teacher/books/not_returnedbooks.vue";
import returnedbooks from "../components/teacher/books/returnedbooks.vue";
import myclassaddassignments from "../components/teacher/myclass/assignments/myclass_assignments_newassignment_template.vue";
import myclassassignments from "../components/teacher/myclass/assignments/myclass_assignments_template.vue";
import myclassattendance from "../components/teacher/myclass/attendance/myclass_attendance_template.vue";
import myclassdiary from "../components/teacher/myclass/dairy/myclass_diary_template.vue";
import myclassmessages from "../components/teacher/myclass/messages/myclass_messages_template.vue";
import myclassbar from "../components/teacher/myclass/sidebar/myclassBar_template.vue";
import myclasssidebar from "../components/teacher/myclass/sidebar/myclassSidebar_template.vue";
import myclassstudents from "../components/teacher/myclass/students/myclass_students_template.vue";
import myclasssubjects from "../components/teacher/myclass/subjects/myclass_subjects_template.vue";
import myclasstests from "../components/teacher/myclass/tests/myclass_tests_template.vue";
import viewtestdetails from "../components/teacher/myclass/tests/myclass_viewtestdetails_template.vue";
import myclasstimetable from "../components/teacher/myclass/timetable/myclass_timetable_template.vue";
import myclassnewworksheet from "../components/teacher/myclass/worksheets/myclass_newworksheet_template.vue";
import myclassworksheets from "../components/teacher/myclass/worksheets/myclass_worksheet_template.vue";
import myclassprojects from "../components/teacher/myclass/projects/myclass_project_template.vue";
import viewProject from "../components/admin/projects/view_project.vue";
import worksheet from "../components/admin/worksheets/worksheet_template.vue";

export default {
  path: "/myclass",
  component: myclassbar,
  children: [
    {
      path: ":id",
      component: myclasssidebar,
      children: [
        {
          path: "students",
          component: myclassstudents
        },
        {
          path: "subjects",
          component: myclasssubjects
        },
        {
          path: "student",
          component: student
        },
        {
          path: "tests",
          component: myclasstests
        },
        {
          path: "viewtestdetails",
          component: viewtestdetails
        },
        {
          path: "add-questions",
          component: worksheet
        },
        {
          path: "assignments",
          component: myclassassignments,
          children: [
            {
              path: "newassignment",
              component: myclassaddassignments
            }
          ]
        },
        {
          path: "worksheets",
          component: myclassworksheets,
          children: [
            {
              path: "newworksheet",
              component: myclassnewworksheet
            }
          ]
        },
        {
          path: "myclasstimetable",
          component: myclasstimetable
        },
        {
          path: "journal",
          component: myclassdiary
        },
        {
          path: "attendance",
          component: myclassattendance
        },
        {
          path: "messages",
          component: myclassmessages
        },
        {
          path: "classroominventory",
          component: classroominventory
        },
        {
          path: "assignedbooks",
          component: booksassignedtostudent
        },
        {
          path: "returnedbooks",
          component: returnedbooks
        },
        {
          path: "notreturnedbooks",
          component: notreturnedbooks
        },
        {
          path: "projects",
          component: myclassprojects
        },
        {
          path:"view-project/:id",
          component:viewProject
        }
      ]
    }
  ]
};
