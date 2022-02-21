<template>
<div>
    <div  class="col-lg-12 sidebar">
        <div class="left-navigation">
          <ul class="sidebar-ul">
            <li class="sidebar-li"><router-link to="/studentanalytics/marksofastudent" active-class="adminsidebar"><span v-html="$t('marks_box_plot')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/studentanalytics/marksofastudentinbarchart" active-class="adminsidebar"><span v-html="$t('marks_bar_chart')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/studentanalytics/marksofastudentinheatmap" active-class="adminsidebar"><span v-html="$t('marks_heatmap')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/studentanalytics/attendance" active-class="adminsidebar"><span v-html="$t('attendance')"/></router-link></li>
          </ul>
        </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar-ul>li>a {
    position: relative;
    display: block;
    padding: 10px 2px;
    color: #1e326d;
    text-align: left;
    text-transform: capitalize;
}
</style>
