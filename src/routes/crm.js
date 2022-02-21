import classrooms from "../components/admin/classrooms/sidebar/classroomModule_template.vue";
import classroomStudents from "../components/admin/classrooms/students/classroomStudents_template.vue";
import classroomSubjects from "../components/admin/classrooms/subjects/classroomsubjects_template.vue";
import classroomTests from "../components/admin/classrooms/tests/classroomtests_template.vue";
import classroomTest from "../components/admin/classrooms/tests/classroomtest_template.vue";
import classroomTimeTable from "../components/admin/classrooms/timetable/classroomtimetable_template.vue";

export default {
  path: "/crm",
  component: classrooms,
  children: [
    {
      path: "classroom-students",
      component: classroomStudents
    },
    {
      path: "classroom-subjects",
      component: classroomSubjects
    },
    {
      path: "classroom-time-table",
      component: classroomTimeTable
    },
    {
      path: "classroom-tests",
      component: classroomTests
    },
    {
      path: "classroom-test",
      component: classroomTest
    }
  ]
};
