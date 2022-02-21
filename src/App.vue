<template>
  <div>
    <AdminHeader
      :school="school"
      :userdetails="userdetails"
      :academicsandboards="academicsandboards"
      :acdemicyearandboard="acdemicyearandboard"
      @changingAcademicYear="changingAcademicYear"
      v-on:changingboard="changingBoard($event)"
      v-on:login="userLogin($event)"
      v-if="
        this.$cookie.get('userrole') === 'ADMIN' ||
        this.$cookie.get('userrole') === 'SUPERADMIN'"
    />
    <TeacherHeader
      :school="school"
      :userdetails="userdetails"
      :academicsandboards="academicsandboards"
      :acdemicyearandboard="acdemicyearandboard"
      @changingAcademicYear="changingAcademicYear"
      v-on:changingboard="changingBoard($event)"
      v-on:login="userLogin($event)"
      v-if="this.$cookie.get('userrole') === 'TEACHER'"
    />
    <ParentHeader
      :school="school"
      :userdetails="userdetails"
      :academicsandboards="academicsandboards"
      :acdemicyearandboard="acdemicyearandboard"
      v-on:login="userLogin($event)"
      v-if="
        this.$cookie.get('userrole') === 'PARENT' ||
        (this.$cookie.get('userrole') === 'STUDENT' && this.$store.state.isEducationSchool)"
    />
    <IntervieweePage
      v-bind:school="school"
      v-bind:userdetails="userdetails"
      v-bind:academicsandboards="academicsandboards"
      v-bind:acdemicyearandboard="acdemicyearandboard"
      v-on:login="userLogin($event)"
      v-if="this.$cookie.get('userrole') === 'STUDENT' && !this.$store.state.isEducationSchool"
    />
    <router-view
      :school="school"
      :userdetails="userdetails"
      :acdemicyearandboard="acdemicyearandboard"
      @login="userLogin($event)"
      :academicsandboards="academicsandboards"
      :error="error"
      :userid="userid"
      @student="Student($event)"
      :singlestudent="singlestudent"
    />
    <!-- <Footer v-if="!this.$cookie.get('userrole')" :school="school"/> -->
  </div>
</template>
<style>
@import "./assets/scss/_styles.scss";
</style>
<script>
import footer from "./components/headers/footer.vue";
import AuthenticationService from "./services/authenticationService.js";
import UserService from "./services/userService.js";
import EventBus from "./event-bus.js";
import axios from "axios";
import store from "./store.js";
import IntervieweePage from "./components/interviewee/header/intervieweeheader";
import Header from "./components/nav/Header.vue";
import Footer from "./components/nav/Footer.vue";
import { DPS_HOST_URL, SCHOOL_CLIENT_ID } from "./components/utils/constants";
import HomeHeader from "./components/headers/header.vue";
import AdminHeader from "./components/admin/headers/adminheader.vue";
import TeacherHeader from "./components/teacher/header/teacherheader.vue";
import ParentHeader from "./components/parent/header/parentheader";
import IntervieweeHeader from "./components/interviewee/Header.vue";
import { handleClearCookies } from "../src/components/utils/loginUtils";
export default {
  components: {
    Header,
    IntervieweePage,
    Footer,
    HomeHeader,
    AdminHeader,
    TeacherHeader,
    ParentHeader,
    IntervieweePage,
    IntervieweeHeader
  },
  data() {
    return {
      school: {},
      singlestudent: {},
      userdetails: {
        userid: "",
        username: this.$cookie.get("username"),
        userrole: "",
        authorization: "",
        tenant: "",
        schoolname: ""
      },
      academicsandboards: {
        academics: [],
        boards: []
      },
      acdemicyearandboard: {
        acddemicyear: "",
        academicyearid: "",
        syllabustype: ""
      },
      error: {},
      userid: this.$cookie.get("userid"),
      id: this.$cookie.get("id"),
      isEducationSchool: this.$store.state.isEducationSchool
    };
  },
  watch: {
    getSchool(newVal = {}, oldVal) {
      this.school = newVal;
      const { clienttypeid } = newVal;
      const isSchool = clienttypeid === SCHOOL_CLIENT_ID;
      this.isEducationSchool = isSchool;
      this.$store.commit("SET_IS_EDUCATION_SCHOOL", isSchool);
    }
  },
  computed: {
    getSchool() {
      return this.$store.state.school;
    }
  },
  created() {
    const url = window.location.host;
    const host = !url || url.includes("localhost") ? DPS_HOST_URL : url;

    UserService.getSchoolMeta(host).then(({ data = {} }) => {
      this.school = data;
      const { clienttypeid } = data;
      this.$store.commit(
        "SET_IS_EDUCATION_SCHOOL",
        clienttypeid === SCHOOL_CLIENT_ID
      );
      this.$store.commit("SCHOOL", data);
    });
  },
  methods: {
    userLogin: function(user) {
      handleClearCookies(this.$cookie);

      AuthenticationService.Login(user)
        .then(response => {
          const styles = document.getElementById("starter-css");
          if (styles) styles.parentNode.removeChild(styles);

          this.userdetails = {
            userid: response.data.userId,
            username: response.data.username,
            userrole: response.data.userrole,
            authorization: response.data.authToken,
            tenant: response.config.headers.tenant,
            id: response.data.tenant.id,
            schoolname: response.data.tenant.sname,
            dbname: response.data.tenant.dbname
          };
          store.commit("USER_DETAILS", this.userdetails);
          this.school = {
            id: response.data.tenant.id,
            schoolname: response.data.tenant.sname,
            dbname: response.data.tenant.dbname
          };
          if (response.status == 200) {
            this.$cookie.set("userrole", response.data.userrole, 1);
            this.$cookie.set("userid", response.data.userId, 1);
            this.$cookie.set("username", response.data.username, 1);
            this.$cookie.set("authorization", response.data.authToken, 1);
            this.$cookie.set("tenant", response.config.headers.tenant, 1);
            this.$cookie.set("id", response.data.tenant.id, 1);

            UserService.AcademicYears(this.$cookie.get("id")).then(response => {
              console.log(response.data);
              this.academicsandboards.academics = response.data.academics;
              this.academicsandboards.boards = response.data.boards;
              for (var i = 0; i < response.data.academics.length; i++) {
                if (response.data.academics[i].active == 1) {
                  this.acdemicyearandboard.academicyear =
                    response.data.academics[i].passingyear;
                  this.$cookie.set(
                    "academicyearid",
                    response.data.academics[i].id
                  );
                  this.acdemicyearandboard.academicyearid = this.$cookie.get(
                    "academicyearid"
                  );
                }
              }
              for (var i = 0; i < response.data.boards.length; i++) {
                if (response.data.boards[i].syllabustype == "STATE") {
                  this.$cookie.set(
                    "syllabustype",
                    response.data.boards[i].syllabustype
                  );
                  this.acdemicyearandboard.syllabustype = this.$cookie.get(
                    "syllabustype"
                  );
                }
              }
            });
            store.commit("SET_ACADEMICYEAR_OBJ", this.acdemicyearandboard);
            if (
              this.$cookie.get("userrole") == "STUDENT" &&
              !this.$store.state.isEducationSchool
            ) {
              this.$router.push("/my-children/instructions");
            } else {
              this.$router.push("/dashboard");
            }
          }
        })
        .catch(response => {
          this.error = response.response.data;
          console.log(response);
        });
    },

    changingAcademicYear: function(passingyearid) {
      this.acdemicyearandboard.academicyearid = passingyearid;
      EventBus.$emit(
        "GRADES",
        this.acdemicyearandboard.syllabustype,
        this.$cookie.get("id")
      );
      EventBus.$emit(
        "SECTIONS",
        this.acdemicyearandboard,
        this.$cookie.get("id")
      );
      store.commit("SET_ACADEMICYEAR_OBJ", this.acdemicyearandboard);
    },
    changingBoard: function(syllabustype) {
      this.acdemicyearandboard.syllabustype = syllabustype;
      EventBus.$emit(
        "GRADES",
        this.acdemicyearandboard.syllabustype,
        this.$cookie.get("id")
      );
      EventBus.$emit(
        "SECTIONS",
        this.acdemicyearandboard,
        this.$cookie.get("id")
      );
      store.commit("SET_ACADEMICYEAR_OBJ", this.acdemicyearandboard);
    },
    Errormessage: function() {
      this.error = {};
    },
    Student: function(student) {
      UserService.Studentdetails(this.id, student)
        .then(response => {
          this.singlestudent = response.data;
        })
        .catch(error => {
          console.log(error.data);
        });
    }
  },
  computed: {
    vueRoot() {
      return this.$root;
    }
  }
};
</script>
