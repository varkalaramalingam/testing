import worksheets from "../components/admin/worksheets/worksheetsmodule_template.vue";
import worksheetsList from "../components/admin/worksheets/worksheets_template.vue";
import worksheet from "../components/admin/worksheets/worksheet_template.vue";
import questions from "../components/admin/worksheets/questions_template.vue";
import assignedworksheets from "../components/teacher/worksheets/assignedwoksheets_template.vue";
import wsAssignedStatus from "../components/teacher/mysubject/worksheets/wsassignedstatus_template.vue";
import viewProject from "../components/admin/projects/view_project.vue";
import tagmanagement from "../components/admin/worksheets/tagmanagement_template.vue";
import passagequestion from "../components/admin/worksheets/passagequestion.vue";

const workSheetRoutes = {
  path: "/worksheets",
  component: worksheets,
  children: [
    {
      path: "list",
      component: worksheetsList
    },
    {
      path: "add-questions",
      component: worksheet
    },
    {
      path: "questions",
      component: questions
    },
    {
      path: "assigned-worksheets",
      component: assignedworksheets
    },
    {
      path: "ws-assigned-status",
      component: wsAssignedStatus
    },
    {
      path: "tagmanagement",
      component: tagmanagement
    },
    {
      path: "passagequestion",
      component: passagequestion
    },
    {
      path: "view-project/:id",
      component: viewProject
    }
  ]
};

export default workSheetRoutes;
