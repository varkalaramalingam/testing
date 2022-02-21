<template>
  <div class="row">
    <div class="sidebar">
        <div class="left-navigation">
          <ul class="sidebar-ul">
            <li class="sidebar-li"><router-link to="/books/list" active-class="adminsidebar"><span v-html="$t('book_list')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/books/recommendbook" active-class="adminsidebar"><span v-html="$t('recommeneded_books')"/></router-link></li>
            <!-- <li class="sidebar-li"><router-link to="/books/booksstatus" active-class="adminsidebar">Books status</router-link></li> -->
            <li class="sidebar-li"  v-if="this.$cookie.get('userrole')=='ADMIN'"><router-link to="/books/booksinventory" active-class="adminsidebar"><span v-html="$t('master_inventory')"/></router-link></li>
            <li class="sidebar-li"  v-if="this.$cookie.get('userrole')=='ADMIN'"><router-link to="/books/assignbooks" active-class="adminsidebar"><span v-html="$t('classroom_inventory')"/></router-link></li>
            <li class="sidebar-li"  v-if="this.$cookie.get('userrole')=='ADMIN'"><router-link to="/books/booksgenre" active-class="adminsidebar"><span v-html="$t('books_genres')"/></router-link></li>
            <li class="sidebar-li"  v-if="this.$cookie.get('userrole')=='ADMIN'"><router-link to="/books/recommendedGroups" active-class="adminsidebar"><span v-html="$t('recommend_groups')"/></router-link></li>
          <!--<li class="sidebar-li"  v-if="this.$cookie.get('userrole')=='TEACHER'"><router-link to="/books/classroominventory" active-class="adminsidebar"><span v-html="$t('classroom_inventory')"/></router-link></li>
            <li class="sidebar-li"  v-if="this.$cookie.get('userrole')=='TEACHER'"><router-link to="/books/assignedbooks" active-class="adminsidebar"><span v-html="$t('assigned_books')"/></router-link></li> -->
            
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