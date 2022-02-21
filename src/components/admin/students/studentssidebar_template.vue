<template>
    <div class="sidebar">
        <div class="left-navigation">
          <ul class="sidebar-ul">
            <li class="sidebar-li"><router-link to="/studentsModule/students" active-class="adminsidebar"><span v-html="$t('students')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/studentsModule/yettoadmitstudents" active-class="adminsidebar"><span v-html="$t('yettoadmitstudents')"/></router-link></li>
            
          </ul>
        </div>
      </div>
</template>
<style>

</style>
