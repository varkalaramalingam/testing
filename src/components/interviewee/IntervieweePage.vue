<template>
  <div>
   
    <IntervieweeHeader
      v-bind:school="school"
      v-bind:userdetails="userdetails"
      v-bind:academicsandboards="academicsandboards"
      v-bind:acdemicyearandboard="acdemicyearandboard"
      v-on:changingacademicyear="changingAcademicYear($event)"
      v-on:changingboard="changingBoard($event)"
      v-on:login="userLogin($event)"
      v-bind:error="error"
      v-on:errormessage="Errormessage()"
      v-if="!this.$cookie.get('userrole') && ( school && school.clienttypeid === 2)"
    />
    <IntervieweePage
      v-bind:school="school"
      v-bind:userdetails="userdetails"
      v-bind:academicsandboards="academicsandboards"
      v-bind:acdemicyearandboard="acdemicyearandboard"
      v-on:login="userLogin($event)"
      v-if="
        this.$cookie.get('userrole') == 'STUDENT'
      "
    />
    <app-footer v-if="!this.$cookie.get('userrole') && ( school && school.clienttypeid === 1)"></app-footer>
  </div>
</template>
<style lang="scss">
@import "./assets/scss/_styles.scss";
</style>
<script>
import header from "./components/headers/header.vue";
import adminheader from "./components/admin/headers/adminheader.vue";
import teacherheader from "./components/teacher/header/teacherheader.vue";
import parentheader from "./components/parent/header/parentheader";
import footer from "./components/headers/footer.vue";
import AuthenticationService from "./services/authenticationService.js";
import UserService from "./services/userService.js";
import EventBus from "./event-bus.js";
import axios from "axios";
import store from "./store.js";
import IntervieweePage from "./components/interviewee/header/intervieweeheader";
import IntervieweeHeader from "./components/interviewee/Header";
export default {};
</script>
<style>
</style>
