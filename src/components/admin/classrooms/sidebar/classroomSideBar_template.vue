<template>
  <div class="row">
    <div class="sidebar">
        <div class="left-navigation">
          <ul class="sidebar-ul">
            <li class="sidebar-li"><router-link to="/crm/classroom-students" active-class="adminsidebar"><span v-html="$t('students')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/crm/classroom-subjects" active-class="adminsidebar"><span v-html="$t('subjects')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/crm/classroom-tests" active-class="adminsidebar"><span v-html="$t('tests')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/crm/classroom-time-table" active-class="adminsidebar"><span v-html="$t('time_table')"/></router-link></li>
            
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