<template>
  <div>
   <div>
    <div class="header-nav">
      <div class="container-fluid">
        <nav class="dashnavbar" >
         <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#linkpages" >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
              <router-link class="navbar-brand" to="/dashboard">{{school.schoolname}}</router-link>
            </div>
            <div class="collapse navbar-collapse" id="linkpages">
                <ul class="nav navbar-nav navbar-right top-header ">
                `	<li >
                    	 <select-language/>
                    </li>
                  <li>
                      <h4 style="color:white; padding-top: 6px;">{{userdetails.username}}</h4>
                  </li>
                  <li>
                     <a class="navbar-brand" style="cursor:pointer" @click="logout()">Logout</a>
                  </li>
                </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
  <div>
    <div class="header-nav-one"  >
      <div class="container-fluid">
        <nav class="dashnavbar" >
         <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#linkpages" >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="collapse navbar-collapse" id="linkpages">
                <ul class="nav navbar-nav navbar-left top-header ">
                  <li>
                    <router-link  to="/dashboard" active-class="active"><span v-html="$t('dashboard')"/></router-link>
                  </li>
                  <li>
                    <router-link  to="/myclass" active-class="active"><span v-html="$t('my_class')"/></router-link>
                  </li>
                  <li>
                    <router-link  to="/mysubjects" active-class="active"><span v-html="$t('my_subject')"/></router-link>
                  </li>
                   <li>
                    <router-link  to="/myschedules" active-class="active"><span v-html="$t('my_schedule')"/></router-link>
                  </li>
                  <li>
                    <router-link to="/studentanalytics/marksofastudent" active-class="active"><span v-html="$t('student_analytics')"/></router-link>
                  </li>
                  <li>
                    <router-link to="/worksheets/list" active-class="active"><span v-html="$t('worksheets')"/></router-link>
                  </li>
                  <li>
                    <router-link to="/books/list" active-class="active"><span v-html="$t('books')"/></router-link>
                    </li>
                    <li>
                    <router-link to="/projects/list" active-class="active"><span v-html="$t('projects')"/></router-link>
                    </li>
                    <li>
                    <router-link to="/transport/dashboard" active-class="active">
                    <span style="font-size:15px" v-html="$t('transport_cap')"/></router-link>
                  </li>
                </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
  <div>
    <div class="header-nav-two" >
      <div class="container-fluid">
        <nav class="dashnavbar" >
         <div class="container-fluid">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#linkpages" >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="collapse navbar-collapse" id="linkpages">
               
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div> 
   </div>
</template>
<script>
import UserService from "../../../services/userService.js";
import EventBus from "../../../event-bus.js";
import store from "../../../store.js";
import SelectLanguage from "../../language/select_language.vue";
export default {
  components: {
    SelectLanguage
  },
  props: [
    "school",
    "userdetails",
    "academicsandboards",
    "acdemicyearandboard",
    "error",
    "userid"
  ],
  data() {
    return {
      id: {
        id: this.school.id
      },
      board: "STATE",
      academicObj: this.$store.state.acdemicyearandboard
    };
  },
  methods: {
    changingacademicyear: function() {
      this.$emit(
        "changingacademicyear",
        this.acdemicyearandboard.academicyearid
      );
      if (this.acdemicyearandboard.academicyearid) {
        store.commit("SET_ACADEMICYEAR_OBJ", this.acdemicyearandboard);
      } else {
        this.acdemicyearandboard = this.academicObj;
      }
    },
    changingboard: function() {
      this.$emit("changingboard", this.acdemicyearandboard.syllabustype);
      if (this.acdemicyearandboard.academicyearid) {
        store.commit("SET_ACADEMICYEAR_OBJ", this.acdemicyearandboard);
      } else {
        this.acdemicyearandboard = this.academicObj;
      }
    },
    errormessage() {
      this.$emit("errormessage");
    },
    deletecookie() {
      this.$cookie.delete("userid");
    },
    logout() {
      console.log("logout");
      localStorage.clear();
      this.$cookie.delete("userrole");
      this.$cookie.delete("userid");
      this.$cookie.delete("username");
      this.$cookie.delete("authorization");
      this.$cookie.delete("tenant");
      this.$cookie.delete("id");
      this.$cookie.delete("academicyearid");
      this.$cookie.delete("syllabustype");

      window.location.href = "/login";
    }
  },
  created() {
    if (this.acdemicyearandboard.academicyearid) {
      store.commit("SET_ACADEMICYEAR_OBJ", this.acdemicyearandboard);
    } else {
      this.acdemicyearandboard = this.academicObj;
    }
    for (var i = 0; i < this.academicsandboards.academics.length; i++) {
      if (this.academicsandboards.academics[i].active == 1) {
        return (this.passingyear = this.academicsandboards.academics[
          i
        ].passingyear);
      }
    }
  }
};
</script>
<style scoped>
.navbar-brand {
  position: relative;
  z-index: 2;
}
.navbar-nav.navbar-right .btn {
  position: relative;
  z-index: 2;
  padding: 4px 20px;
  margin: 10px auto;
  transition: transform 0.3s;
}
.navbar .navbar-collapse {
  position: relative;
  overflow: hidden !important;
}
.navbar .navbar-collapse .navbar-right > li:last-child {
  padding-left: 22px;
}
.navbar .nav-collapse {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding-right: 120px;
  padding-left: 80px;
  width: 100%;
}
.navbar.navbar-default .nav-collapse {
  background-color: #f8f8f8;
}
.navbar.navbar-inverse .nav-collapse {
  background-color: #222;
}
.navbar .nav-collapse .navbar-form {
  border-width: 0;
  box-shadow: none;
}
.nav-collapse > li {
  float: right;
}
.btn.btn-circle {
  border-radius: 50px;
}
.btn.btn-outline {
  background-color: transparent;
}

.navbar.navbar-default .nav-collapse,
.navbar.navbar-inverse .nav-collapse {
  height: auto !important;
  transition: transform 0.3s;
  transform: translate(0px, -50px);
}
.navbar.navbar-default .nav-collapse.in,
.navbar.navbar-inverse .nav-collapse.in {
  transform: translate(0px, 0px);
}
@media screen and (max-width: 767px) {
  .navbar .navbar-collapse .navbar-right > li:last-child {
    padding-left: 15px;
    padding-right: 15px;
  }
  .navbar .nav-collapse {
    margin: 7.5px auto;
    padding: 0;
  }
  .navbar .nav-collapse .navbar-form {
    margin: 0;
  }
  .nav-collapse > li {
    float: none;
  }
  .navbar.navbar-default .nav-collapse,
  .navbar.navbar-inverse .nav-collapse {
    transform: translate(-100%, 0px);
  }
  .navbar.navbar-default .nav-collapse.in,
  .navbar.navbar-inverse .nav-collapse.in {
    transform: translate(0px, 0px);
  }
  .navbar.navbar-default .nav-collapse.slide-down,
  .navbar.navbar-inverse .nav-collapse.slide-down {
    transform: translate(0px, -100%);
  }
  .navbar.navbar-default .nav-collapse.in.slide-down,
  .navbar.navbar-inverse .nav-collapse.in.slide-down {
    transform: translate(0px, 0px);
  }
}
.header-nav {
  background: #3c3c3c;
  -webkit-box-shadow: 0px 8px 12px -10px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 8px 12px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 8px 12px -10px rgba(0, 0, 0, 0.75);
  height: 100%;
  border-radius: 0px;
}
.header-nav {
  height: 50px;
}

.header-nav-home {
  background: #fff;
  -webkit-box-shadow: 0px 8px 12px -10px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 8px 12px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 8px 12px -10px rgba(0, 0, 0, 0.75);
  height: 50px;
  border-radius: 0px;
}
.header-nav-one {
  background: #f6f6f6;
  -webkit-box-shadow: 0px 8px 12px -10px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 8px 12px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 8px 12px -10px rgba(0, 0, 0, 0.75);
  height: 100%;
  border-radius: 0px;
}
.header-nav-one .nav > li > a {
  color: #000;
}
.header-nav-two {
  background: #3c3c3c;
  -webkit-box-shadow: 0px 8px 12px -10px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 8px 12px -10px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 8px 12px -10px rgba(0, 0, 0, 0.75);
  height: 100%;
  border-radius: 0px;
}
.header-nav-two {
  height: 15px;
}
.nav > li > a {
  position: relative;
  display: block;
  padding: 10px 15px;
  color: #415568;
}
.nav > li > a:hover,
.nav > li > a:focus {
  background-color: transparent;
}
.active {
  border-bottom: 2px solid #fb6750;
}
.navbar-brand {
  height: 80%;
  color: #fff;
}
.navbar .navbar-collapse .navbar-right > li:last-child {
  padding-left: 0px;
}
label {
  color: #fff;
}
.forminput {
  width: 150px;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.dashnavbar {
  font-size: 17px;
}
.academicyearandboard {
  margin-top: 7px;
}
.acdemicyearform > li > a,
.top-header > li > a {
  position: relative;
  display: block;
  padding: 10px 15px;
  color: #fff;
}
.header-nav-home-brand {
  color: #415568;
}
.navbar {
  margin-bottom: 0;
  background-color: white;
  z-index: 9999;
  border: 0;
  font-size: 12px !important;
  line-height: 1.42857143 !important;
  letter-spacing: 4px;
  border-radius: 0;
  border-bottom: 1px solid #cde4ed;
}
.navbar-brand {
  float: left;
  height: 50px;
  padding: 15px 15px;
  font-size: 18px;
  line-height: 20px;
  margin-top: 5px;
}

.navbar li a,
.navbar .navbar-brand {
  color: rgb(24, 18, 18) !important;
}
.navbar-nav > li > a {
  padding-bottom: 15px;
}
.btn-ready {
  color: #fff;
  background-color: #f3674c;
  border-color: #fff;
  margin-top: 15px;
  border: 2px solid tomato;
}
.btn-ready {
  border-radius: 15px;
}
.btn-ready:hover {
  color: #f3674c;
  background-color: #fff;
}
.btn.active {
  -webkit-box-shadow: none;
  box-shadow: none;
}
.get-started {
  background-color: #eb6748;
  color: #fff;
  border-radius: 23px;
  font-size: 14px;
  font-weight: 300;
  text-transform: uppercase;
  line-height: 22px;
  letter-spacing: 2px;
  -webkit-transition: background-color 0.3s, color 0.3s, width 0.3s;
  transition: background-color 0.3s, color 0.3s, width 0.3s;
  border: none;
  display: inline-block;
  border: 2px solid #eb6748;
  margin-right: 1px;
}
.navbar-nav.navbar-right:last-child {
  margin-right: 10px;
}
</style>
