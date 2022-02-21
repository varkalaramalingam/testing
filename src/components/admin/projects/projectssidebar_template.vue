<template>
  <div class="row">
    <div class="sidebar">
        <div class="left-navigation">
          <ul class="sidebar-ul">
            <li class="sidebar-li"><router-link to="/projects/list" active-class="adminsidebar"><span v-html="$t('projects_library')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/projects/assigned-projects" active-class="adminsidebar"><span v-html="$t('assigned_projects')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/projects/skill-groups" active-class="adminsidebar"><span v-html="$t('skill_groups')"/></router-link></li>
             <li class="sidebar-li"><router-link to="/projects/project-skills" active-class="adminsidebar"><span v-html="$t('project_skills')"/></router-link></li>
                       
          </ul>
        </div>
      </div>
    </div>
</template>
<style>

</style>


<style scoped>
.sidebar-ul>li>a {
    position: relative;
    display: block;
    padding: 10px 27px;
    color: #1e326d;
    text-align: left;
    text-transform: capitalize;
}
</style>

