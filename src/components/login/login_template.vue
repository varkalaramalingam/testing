<template>
  <div style="overflow-x:hidden">
    <section class="full-wh row responsive-css">
      <div class="left-part col-md-8 col-sm-12">
        <div class="left-pet-txt" v-if="!isEducationSchool">
          Hire Employees at ease now!<br />Platform to design and test
        </div>
        <div class="left-pet-txt" v-if="isEducationSchool">
          The goal of education is understanding;<br />The goal of training is performance
        </div>
        <div class="left-part-bg-color"></div>
        <img src="../../assets/images/interview.png" class="left-part-img" v-if="!isEducationSchool"/>
        <img src="../../assets/images/wise-reads-home.png" v-if="isEducationSchool" class="left-part-img" />
      </div>
      <div class="right-part col-md-4 col-sm-12">
        <div class="login-part">
          <img v-if="this.school.schoollogo != null" :src="this.school.schoollogo" style="height: 60px; width: 300px;" alt="image" class="img-rounded img-responsive image" />
          <img src="../../assets/images/omniwyse.png" v-if="this.school.schoollogo == null && !isEducationSchool"/>
          <img src="../../assets/images/WiseReads-logo.png" v-if="this.school.schoollogo == null && isEducationSchool" style="width:100%"/>
          <!-- test  -->
          <div id="loginbox">
              <div
                v-show="error.status == 404 ||error.status == 401 || error.status == 500"
                class="errormessage"
                style="/* display: none; */"
              >
                <div class="alert alert-danger text-center">
                  <strong>Invalid Credentials</strong>
                </div>
              </div>
              <div
                v-show="error.status == 403"
                class="errormessage"
                style="/* display: none; */"
              >
                <div class="alert alert-danger text-center">
                  <strong>Your Account is Deactivated , Please Contact Customer Support</strong>
                </div>
              </div>
               
                  <form
                    id="loginform"
                    class="form-horizontal"
                    role="form"
                    name="loginform"
                  >
                    
                      <input
                        id="login-username"
                        type="text"
                        class="form-control"
                        name="username"
                        value=""
                        v-model="user.emailid"
                        placeholder="username or Email id "
                        required
                      />

                      <input
                        id="login-password"
                        type="password"
                        class="form-control"
                        name="password"
                        v-model="user.password"
                        placeholder="Password"
                        required
                      />
                    <div class="input-group">
                      <div class="checkbox">
                        <label>
                          <input
                            id="login-remember"
                            type="checkbox"
                            name="remember"
                            value="1"
                          />
                          Remember me
                        </label>
                      </div>
                    </div>
                    <div style="margin-top: 10px" class="form-group">
                      <div class="col-sm-12 controls">
                        <button
                          id="btn-Register"
                          type="submit"
                          name="submit"
                          v-on:click.prevent="login()"
                          class="btn button login-btn"
                          ng-disabled="loginform.$invalid"
                        >
                          Login
                        </button>
                      </div>
                    </div>
                  </form>
              

          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import UserService from "../../services/userService.js";
import { handleClearCookies } from "../utils/loginUtils";
export default {
  props: ["error"],
  data() {
    return {
      school: this.$store.state.school,
      user: {
        emailid: "",
        password: "",
        code: ""
      },
      isEducationSchool: this.$store.state.isEducationSchool
    };
  },
  methods: {
    login: function() {
      var user = {
        emailid: this.user.emailid,
        password: this.user.password,
        code: this.school.dbname
      };
      console.log(this.error);
      this.$emit("login", user);
    }
  },
  watch: {
    getSchool(newVal, oldVal) {
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
    localStorage.clear();
    handleClearCookies(this.$cookie);
  }
};
</script>
<style scoped>



#login-remember {
  width: inherit !important;
}
.login-btn {
  width: 100%;
  border: 1px solid #1779ba;
  border-radius: 3px;
  padding: 5px;
  background-color: #1779ba;
  color: #fff;
}

@media only screen and (min-width: 1824px) {
  .errormessage {
    /* display: none; */
    color: red;
  }
}





</style>
