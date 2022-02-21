import CreateProject from "../components/admin/projects/CreateProject";
import editProject from "../components/admin/projects/EditProject";
import projects from "../components/admin/projects/projectsmodule_template.vue";
import projectsList from "../components/admin/projects/projects_template.vue";
import viewProject from "../components/admin/projects/view_project";
import assignedprojects from "../components/teacher/projects/assignedprojects_template.vue";
import projectAddSkills from "../components/teacher/projects/project_add_skills.vue";
import projectSkillGroups from "../components/teacher/projects/skill_groups.vue";

export default {
  path: "/projects",
  component: projects,
  children: [
    {
      path: "list",
      component: projectsList
    },
    {
      path: "assigned-projects",
      component: assignedprojects
    },
    {
      path: "createProject",
      component: CreateProject
    },
    {
      path: "view-project/:id",
      component: viewProject
    },
    {
      path: "edit-project/:id",
      component: editProject
    },
    {
      path: "project-skills",
      component: projectAddSkills
    },
    {
      path: "skill-groups",
      component: projectSkillGroups
    }
  ]
};
