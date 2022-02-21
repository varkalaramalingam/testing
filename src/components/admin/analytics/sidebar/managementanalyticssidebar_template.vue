<template>
<div>
    <div class="sidebar">
        <div class="left-navigation">
          <ul class="sidebar-ul">
            <li class="sidebar-li"><router-link to="/analytics/boards" active-class="adminsidebar"><span v-html="$t('boards')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/analytics/students" active-class="adminsidebar"><span v-html="$t('students')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/analytics/teachers" active-class="adminsidebar"><span v-html="$t('teachers_analytics')"/></router-link></li>
            <!-- <li class="sidebar-li"><router-link to="/analytics/fee" active-class="adminsidebar"><span v-html="$t('fee')"/></router-link></li> -->
            <li class="sidebar-li"><router-link to="/analytics/attendance" active-class="adminsidebar"><span v-html="$t('attendance')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/analytics/marks" active-class="adminsidebar"><span v-html="$t('student_marks')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/analytics/birthdays" active-class="adminsidebar"><span v-html="$t('birthdays')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/analytics/averagemarksofagrade" active-class="adminsidebar"><span v-html="$t('avg_marks_grade')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/analytics/girlsAndBoysAverageMarks" active-class="adminsidebar"><span v-html="$t('girls_and_boys')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/analytics/booksanalyticsbyteacher" active-class="adminsidebar"><span v-html="$t('books_analytics_by_genres')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/analytics/projectanalyticsbytags" active-class="adminsidebar"><span v-html="$t('project_analytics_by_genres')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/analytics/worksheetsanalyticsbytags" active-class="adminsidebar"><span v-html="$t('worksheets_analytics_by_genres')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/analytics/classroomworksheetsanalyticsbytags" active-class="adminsidebar"><span v-html="$t('classroom_worksheets_analytics_by_tags')"/></router-link></li>
            <li class="sidebar-li"><router-link to="/analytics/gradeworksheetsanalyticsbytags" active-class="adminsidebar"><span v-html="$t('grade_worksheets_analytics_by_tags')"/></router-link></li>
          </ul>
        </div>
    </div>

  </div>
</template>
<style>

</style>
