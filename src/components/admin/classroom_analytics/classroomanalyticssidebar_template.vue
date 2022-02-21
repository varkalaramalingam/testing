<template>
<div>
    <div class="sidebar">
        <div class="left-navigation">
          <ul class="sidebar-ul">
            <li class="sidebar-li"><router-link to="/classroomanalytics/marks" active-class="adminsidebar"><span v-html="$t('marks')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/classroomanalytics/marksofallstudents" active-class="adminsidebar"><span v-html="$t('marks_all_students')"/></router-link></li>

          </ul>
        </div>
    </div>

  </div>
</template>
<style>

</style>

