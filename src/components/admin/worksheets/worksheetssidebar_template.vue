<template>
  <div class="row">
    <div class="sidebar">
        <div class="left-navigation">
          <ul class="sidebar-ul">
            <li class="sidebar-li"><router-link to="/worksheets/list" active-class="adminsidebar"><span v-html="$t('worksheets_library')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/worksheets/questions" active-class="adminsidebar"><span v-html="$t('questions_library')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/worksheets/assigned-worksheets" active-class="adminsidebar"><span v-html="$t('assigned_worksheets')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/worksheets/tagmanagement" active-class="adminsidebar"><span v-html="$t('tag_management')"/></router-link></li>
                       
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

