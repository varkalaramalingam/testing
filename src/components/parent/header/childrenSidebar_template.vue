<template>
  <div
    v-if="
      this.$cookie.get('userrole') === 'PARENT' ||
      (this.$cookie.get('userrole') === 'STUDENT' && this.$store.state.isEducationSchool)"
    class="sidebar"
  >
    <div class="left-navigation">
      <ul class="sidebar-ul">
        <li class="sidebar-li">
          <router-link to="/my-children/tests" active-class="adminsidebar"
            ><span v-html="$t('tests')"
          /></router-link>
        </li>
        <li class="sidebar-li">
          <router-link to="/my-children/subjects" active-class="adminsidebar"
            ><span v-html="$t('subjects')"
          /></router-link>
        </li>
        <li class="sidebar-li">
          <router-link to="/my-children/attendance" active-class="adminsidebar"
            ><span v-html="$t('attendance')"
          /></router-link>
        </li>
        <li class="sidebar-li">
          <router-link to="/my-children/worksheets" active-class="adminsidebar"
            ><span v-html="$t('worksheets')"
          /></router-link>
        </li>
        <li class="sidebar-li">
          <router-link to="/my-children/journal" active-class="adminsidebar"
            ><span v-html="$t('journals')"
          /></router-link>
        </li>
        <li class="sidebar-li">
          <router-link to="/my-children/assignments" active-class="adminsidebar"
            ><span v-html="$t('assignments')"
          /></router-link>
        </li>
        <li class="sidebar-li">
          <router-link to="/my-children/messages" active-class="adminsidebar"
            ><span v-html="$t('messages')"
          /></router-link>
        </li>
        <li class="sidebar-li">
          <router-link
            to="/my-children/recommendbook"
            active-class="adminsidebar"
            ><span v-html="$t('recommeneded_books')"
          /></router-link>
        </li>
        <li class="sidebar-li">
          <router-link to="/my-children/books" active-class="adminsidebar"
            ><span v-html="$t('assigned_books')"
          /></router-link>
        </li>
        <li class="sidebar-li">
          <router-link to="/my-children/time-table" active-class="adminsidebar"
            ><span v-html="$t('time_table')"
          /></router-link>
        </li>
        <li class="sidebar-li">
          <router-link to="/my-children/white-board" active-class="adminsidebar"
            ><span v-html="$t('white_board')"
          /></router-link>
        </li>
        <li class="sidebar-li">
          <router-link to="/my-children/projects" active-class="adminsidebar"
            ><span v-html="$t('projects')"
          /></router-link>
        </li>
        <li class="sidebar-li"><router-link to="/my-children/getAssignedStudnetsFromBus" active-class="adminsidebar"><span v-html="$t('students_in_bus')"/></router-link></li>

      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isEducationSchool: this.$store.state.isEducationSchool
    };
  }
};
</script>
<style>
</style>
