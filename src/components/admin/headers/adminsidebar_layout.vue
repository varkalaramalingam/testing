<template>
    <div class="sidebar">
        <div class="left-navigation">
          <ul class="sidebar-ul">
            <li class="sidebar-li"><router-link to="/admin/academics" active-class="adminsidebar"><span v-html="$t('academic_years')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/admin/boards" active-class="adminsidebar"><span v-html="$t('board_education')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/admin/subjects" active-class="adminsidebar"><span v-html="$t('subjects')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/admin/testtypes" active-class="adminsidebar"><span v-html="$t('test_types')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/admin/houses" active-class="adminsidebar"><span v-html="$t('houses')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/admin/grades" active-class="adminsidebar"><span v-html="$t('grades')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/admin/academicgrades" active-class="adminsidebar"><span v-html="$t('academicgrades')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/admin/sections" active-class="adminsidebar"><span v-html="$t('classrooms')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/admin/events" active-class="adminsidebar"><span v-html="$t('events')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/admin/news" active-class="adminsidebar"><span v-html="$t('news')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/admin/holidays" active-class="adminsidebar"><span v-html="$t('holidays')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/admin/periodtypes" active-class="adminsidebar"><span v-html="$t('meta_timings')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/admin/periods" active-class="adminsidebar"><span v-html="$t('timings')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/admin/staff" active-class="adminsidebar"><span v-html="$t('staff')"/></router-link></li>
          </ul>
        </div>
      </div>
</template>
<style>

</style>
