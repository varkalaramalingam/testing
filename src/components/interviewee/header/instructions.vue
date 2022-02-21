<template>
    <div>
      <div class="container home-page">
        <h3>Hello <span style="color: green"><strong> {{this.myChild.name}}</strong> </span>, Welcome to Omniwyse Technologies</h3><br>

<h4><strong> Instructions </strong> </h4>
<ul class="home-ulli">
  <li>This is a timed test. Please make sure you are not interrupted during the test, as the time cannot be paused once started.</li>
  <li>Please ensure you have a stable internet connection.</li>
  <li>Please get back to HR in case of any queries</li>
  <li>Please select the test tab and start your online interview.</li>
</ul>


            <h4 class="mt-10"><strong> Exam Attempt Will not be provided if, </strong></h4>
            <ul class="home-ulli">
              <li>Student fails to appear for exam within specified timings.</li>
              <li>Student does not appear the papers.</li>
              <li>Student appears for exam late / face lack of time.</li>
              <li>Student ignores instructions and rules.</li>
              <li>Student does not submit the exam properly.</li>
              <li>Student face internet of power failure problems.</li>
            </ul>

    </div>
    <div class="container">
      <div class="row">
    <div class="alert alert-danger text-center"> <b>Important:</b> Do not click the “End Test” button unless you want to leave early.</div>
    </div>
    </div>
    </div>
</template>

<script>
import UserService from "../../../services/userService.js";
import store from "../../../store.js";
export default {
  props: ["myChild", "school", "userdetails"],
  data() {
    return {
      myChild: {},
      userdetails: {}
    };
  },
  created() {
    this.school = this.$store.state.school;
    this.userdetails = this.$store.state.userDetails;
    this.myChild = this.$store.state.myChild;
  }
};
</script>

<style scoped>
.home-page {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin: 15px auto;
  background: #fff;
}
.home-ulli {
  margin: 0;
  padding: 0 0 0 25px;
}
.home-ulli li {
  margin: 0;
  padding: 5px 0;
}
.mt-10 {
  margin-top: 15px;
}
</style>
