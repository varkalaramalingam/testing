<template>
  <div class="sidebar">
        <div class="left-navigation">
          <ul class="sidebar-ul">
            <li class="sidebar-li"><router-link to="/transport/dashboard" active-class="adminsidebar"><span v-html="$t('dashboard')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/transport/staff" active-class="adminsidebar"><span v-html="$t('transport_staff')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/transport/stops" active-class="adminsidebar"><span v-html="$t('stops')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/transport/buses" active-class="adminsidebar"><span v-html="$t('buses')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/transport/routes" active-class="adminsidebar"><span v-html="$t('routes')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/transport/busroutestransport" active-class="adminsidebar"><span v-html="$t('bus_routes')"/></router-link></li>
             <li class="sidebar-li"><router-link to="/transport/getActiveBusDetails" active-class="adminsidebar"><span v-html="$t('activate_bus')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/transport/getAssignedStudnetsFromBus" active-class="adminsidebar"><span v-html="$t('students_in_bus')"/></router-link></li>
           </ul>
        </div>
      </div>
</template>
