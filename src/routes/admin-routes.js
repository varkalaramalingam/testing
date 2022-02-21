import admin from "../components/admin/headers/admin_template.vue";
import boardofeducation from "../components/admin/main/academic_year/boardofeducation_template.vue";
import acdemicyears from "../components/admin/main/academic_year/acdemicyear_template.vue";
import newacademic from "../components/admin/main/academic_year/newacademicyear_template.vue";
import subjects from "../components/admin/main/subjects/subjects_template.vue";
import newsubject from "../components/admin/main/subjects/newsubject_template.vue";
import testtypes from "../components/admin/main/test_types/testtypes_template";
import newtesttype from "../components/admin/main/test_types/newtesttype_template.vue";
import houses from "../components/admin/main/houses/houses_template.vue";
import newhouse from "../components/admin/main/houses/newhouse_template.vue";
import grades from "../components/admin/main/grades/grades_template.vue";
import newgrade from "../components/admin/main/grades/newgrade_template.vue";
import sections from "../components/admin/main/sections/sections_template.vue";
import newsection from "../components/admin/main/sections/newsection_template.vue";
import events from "../components/admin/main/events/events_template.vue";
import newevent from "../components/admin/main/events/newevent_template.vue";
import news from "../components/admin/main/news/news_template.vue";
import postnews from "../components/admin/main/news/newnews_template.vue";
import holidays from "../components/admin/main/holidays/holidays_template.vue";
import newholiday from "../components/admin/main/holidays/newholiday_template.vue";
import periodtypes from "../components/admin/main/meta_timings/periodtypes_template.vue";
import newperiodtype from "../components/admin/main/meta_timings/newperiodtype_template.vue";
import periods from "../components/admin/main/timings/periods_template.vue";
import newperiods from "../components/admin/main/timings/newperiod_template.vue";
import academicgrades from "../components/admin/main/grades/academicgrades_template.vue";
import newuser from "../components/admin/main/staff/newuser_template.vue"
import staff from "../components/admin/main/staff/staffList_template.vue"

const adminRoutes = {
  path: "/admin",
  component: admin,
  children: [
    {
      path: "boards",
      component: boardofeducation
    },
    {
      path: "academics",
      component: acdemicyears
    },
    {
      path: "newacademic",
      component: newacademic
    },
    {
      path: "subjects",
      component: subjects
    },
    {
      path: "newsubject",
      component: newsubject
    },
    {
      path: "testtypes",
      component: testtypes
    },
    {
      path: "newtesttype",
      component: newtesttype
    },
    {
      path: "houses",
      component: houses
    },
    {
      path: "newhouse",
      component: newhouse
    },
    {
      path: "grades",
      component: grades
    },
    {
      path: "newgrade",
      component: newgrade
    },
    {
      path: "sections",
      component: sections
    },
    {
      path: "newsection",
      component: newsection
    },
    {
      path: "events",
      component: events
    },
    {
      path: "newevent",
      component: newevent
    },
    {
      path: "news",
      component: news
    },
    {
      path: "postnews",
      component: postnews
    },
    {
      path: "holidays",
      component: holidays
    },
    {
      path: "newholiday",
      component: newholiday
    },
    {
      path: "periodtypes",
      component: periodtypes
    },
    {
      path: "newperiodtype",
      component: newperiodtype
    },
    {
      path: "periods",
      component: periods
    },
    {
      path: "newperiods",
      component: newperiods
    },
    {
      path: "academicgrades",
      component: academicgrades
    },
    {
      path: "newuser",
      component: newuser
    },
    {
      path: "staff",
      component: staff
    }
  ]
};

export default adminRoutes;
