<template>
  <div>
   <SchoolHome v-if="isEducationSchool"/>
   <IntervieweeHome v-if="!isEducationSchool"/>
  </div>
</template>

<script>
import SchoolHome from "../school/HomeTemplate";
import IntervieweeHome from "../interviewee/HomeTemplate";
import store from "../../store";
export default {
  name: "Home",
  components: {
    SchoolHome,
    IntervieweeHome
  },
  data() {
    return {
      school: this.$store.state.school,
      isEducationSchool: this.$store.state.isEducationSchool
    };
  },
  watch: {
    getSchool(newVal) {
      this.isEducationSchool = newVal;
    }
  },
  computed: {
    getSchool() {
      return this.$store.state.isEducationSchool;
    }
  }
};
</script>

<style>
.newhome {
  background-color: #eef7fe;
  padding-top: 120px !important;
}
.mainheading {
  color: #415568;
  text-align: center;
  margin-top: 120px;
  line-height: 45px;
  font-size: 30px;
  font-weight: 300;
  font-size: 35px;
  text-align: center;
  width: 625px;
  line-height: 45px;
  margin: 0 auto;
}
.picone {
  max-width: 100%;
  height: auto;
  width: auto;
  margin-top: 5%;
}
.iscoolpicfive {
  margin: 0px auto;
}
.newschlmatter {
  color: #415568;
  text-align: center;
  font-size: 16px;
  line-height: 30px;
  margin: 0px auto;
  font-family: proxima-nova, arial;
  /* font-style: normal; */
  font-weight: 300;
  width: 70%;
}
.newregisterbtn {
  margin-top: 20px;
}
.register-btn {
  background-color: #f3674c;
  border-radius: 23px;
}
.register-btn .signuptoday {
  color: white;
}
.newschlbackground {
  padding: 100px 0% 180px;
  width: 100%;
  background-attachment: fixed;
}
.iscoolpicseven {
  margin: 0px auto;
  width: 50%;
}
.iscoolpiceight {
  margin-top: -9%;
  width: 50%;
  margin: 0px auto;
  margin-left: 25%;
}

.invested {
  margin-top: -15%;
  text-align: center;
  line-height: 26px;
}
.clientlogos {
  width: 18%;
}
.capitalgroups {
  margin-top: 30px;
  margin: 0px auto;
}
.benvolio {
  line-height: 30px;
  color: #5f7080;
}
.aboutclient {
  margin: 0px auto;
}
.hyperone {
  margin: 0px auto;
}
.automated {
  background-color: #42556a;
  padding: 100px 8%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: #ffffff;
  text-align: center;
  margin-top: 100px;
}
.improve {
  color: #bbe3cf;
}
a.signuptoday {
  color: white;
}
.investorfive {
  max-width: 30%;
}
.investimageone {
  text-align: right;
}
.position-center {
  position: absolute;
  text-align: center;
  top: 50%;
  left: 50%;
  transform: translate(-10%, -50%);
}
.position-center h1 {
  color: #fb6750;
  font-weight: bold;
}
.position-center h2 {
  color: #186eaf;
}
</style>
