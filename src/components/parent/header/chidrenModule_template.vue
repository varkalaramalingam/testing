<template>
  <div>
    <br />
    <div
      v-if="
        this.$cookie.get('userrole') === 'PARENT' ||
        (this.$cookie.get('userrole') === 'STUDENT' && this.$store.state.isEducationSchool)"
      class="child-details col-lg-3"
    >
      <label class="col-sm-1 control-label" style="width: 35% !important"
        >Child :<span
          style="color: blue; width: 15%"
          v-if="this.$cookie.get('userrole') === 'STUDENT'"
          >{{ myChild.name }}</span
        ></label
      >
      <select
        class="form-control gradeFilter"
        v-model="myChildId"
        @change="selectChild(myChild)"
        style="width: 50%"
        v-if="this.$store.state.userDetails.userrole === 'PARENT'"
      >
        <option
          v-for="child in childrens"
          :key="child.studentid"
          v-bind:value="child.studentid"
        >
          {{ child.name }}
        </option>
      </select>
    </div>
    <div  v-if="
        this.$cookie.get('userrole') === 'PARENT' ||
        (this.$cookie.get('userrole') === 'STUDENT' && this.$store.state.isEducationSchool)">
      <label class="col-sm-1 control-label" style="width: 15% !important"
        >Grade :
        <span style="color: blue; padding-left: 10px">{{
          myChild.gradename
        }}</span></label
      >
      <label class="col-sm-1 control-label" style="width: 15% !important"
        >Section :
        <span style="color: blue; padding-left: 10px">{{
          myChild.sectionname
        }}</span></label
      >
      <label class="col-sm-1 control-label" style="width: 25% !important"
        >Class Teacher :
        <span style="color: blue; padding-left: 10px">{{
          myChild.teachername
        }}</span>
      </label>
      <label class="col-sm-1 control-label" style="width: 15% !important"
        >Board :
        <span style="color: blue; padding-left: 10px">{{
          myChild.syllabustype
        }}</span>
      </label>
    </div>
    <br />
    <hr />
    <div
      class="col-lg-2 adminreset-padding adminreset-margin"
      style="padding-left: 0px"
      v-if="this.$cookie.get('userrole') === 'PARENT' || (this.$cookie.get('userrole') === 'STUDENT' && this.$store.state.isEducationSchool)"
    >
      <children-side-bar />
    </div>
    <div :class="(this.$cookie.get('userrole') === 'STUDENT' && !this.$store.state.isEducationSchool) ? 'col-lg-12' : 'col-lg-10'">
      <router-view
        v-bind:myChild="myChild"
        v-bind:myChildId="myChildId"
        v-bind:testdetails="testdetails"
        v-bind:grade="myChild.gradeid"
        v-bind:section="myChild.classid"
      ></router-view>
    </div>
  </div>
</template>
<script>
import childrenSideBar from "./childrenSidebar_template";
import UserService from "../../../services/userService.js";
export default {
  data() {
    return {
      myChild: {},
      tenantId: this.$cookie.get("id"),
      userid: this.$cookie.get("userid"),
      childrens: [],
      myChildId: 0,
      testdetails: [],
      isEducationSchool: this.$store.state.isEducationSchool
    };
  },
  methods: {
    // This method will be called when the child is selected
    selectChild: function(myChild) {
      let length = this.childrens.length;
      for (let i = 0; i < length; i++) {
        if (this.myChildId == this.childrens[i].studentid) {
          this.myChild = this.childrens[i];
          break;
        }
      }
      this.$store.commit("SET_MY_CHILD", this.myChild);
      window.location.reload();
    }
    //End
  },
  components: {
    childrenSideBar
  },
  created() {
    this.myChild = this.$store.state.myChild;
    this.myChildId = this.myChild && this.myChild.studentid;
    const parentid = {
      id: this.userid
    };
    if (this.$store.state.userDetails.userrole == "PARENT") {
      UserService.MyChild(this.tenantId, parentid).then(response => {
        console.log(JSON.stringify(response.data));
        this.childrens = response.data;
        if (this.childrens.length > 0) {
          if (!this.myChild || !this.myChild.studentid) {
            this.myChild = this.childrens[0];
            this.myChildId = this.myChild.studentid;
          }
          this.$store.commit("SET_MY_CHILD", this.myChild);
        }
      });
    } else if (this.$store.state.userDetails.userrole == "STUDENT") {
      var studentid = parentid;
      UserService.MyChildforstudentlogin(this.tenantId, studentid).then(
        response => {
          console.log(JSON.stringify(response.data));
          this.myChild = response.data;
          this.$store.commit("SET_MY_CHILD", this.myChild);
        }
      );
    }
  },
  computed: {}
};
</script>
<style scoped>
.adminreset-padding {
  padding-left: 0px;
}
/* ul{
    position: center;
    background-color: chocolate;    
} */
/* .child-details{
    box-sizing: border-box;
    background-color: chocolate;
} */
.child-details > .col-sm-1 {
  display: inline;
  width: 10px;
  height: 10px;
  max-width: 100%;
}

.col-sm-1 {
  max-width: 100%;
}
</style>
