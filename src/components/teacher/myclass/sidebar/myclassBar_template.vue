<template>
    <div>
        <nav class="navbar iteachbar" v-if="classes.length != 0">
            <div class="container-fluid">
                <ul class="nav navbar-nav  navbar-left testnavbar">
                    <li v-for="grade in classes" :key="grade.id">
                        <router-link :to="{path:'/myclass/'+grade.passingyear+'-'+grade.gradeid+grade.sectionname+'-'+grade.syllabustype}" active-class="active" v-on:click.native="setmyclass(grade)">{{grade.passingyear}}/{{grade.gradename}}/{{grade.sectionname}}/{{grade.syllabustype}}</router-link>
                    </li>
                </ul>
            </div>
        </nav>
        <div class="sectionreset-padding sectionreset-margin">
            <router-view v-bind:school="school" v-bind:userdetails="userdetails" v-bind:myclass="myclass" v-bind:acdemicyearandboard="acdemicyearandboard" v-bind:singlestudent="singlestudent" v-bind:academicsandboards="academicsandboards" v-bind:userid="userid"></router-view>
        </div>
    </div>
</template>

<script>
import UserService from "../../../../services/userService.js";
import store from "../../../../store.js";

export default {
  props: [
    "school",
    "userdetails",
    "acdemicyearandboard",
    "userid",
    "singlestudent",
    "academicsandboards"
  ],
  data() {
    return {
      classes: [],
      myclass: "",
      userId: {
        id: this.$cookie.get("userid")
      },
      id: this.$cookie.get("id")
    };
  },
  created() {
    UserService.MyClass(this.userId, this.id).then(response => {
      console.log(response);
      this.classes = response.data;
      // academic grade id for only one class
      store.commit("SET_ACADEMICGRADEID", this.classes[0].academicgradeid);
      if (this.myclass) {
        this.setmyclass(this.myclass);
      }
      else{
        this.myclass = this.$store.state.myClass;
        console.log(this.myclass.gradename)
        if(this.myclass.gradename){
          this.$router.push('/myclass/'+this.myclass.passingyear+'-'+this.myclass.gradeid+this.myclass.sectionname+'-'+this.myclass.syllabustype)
        }
        else{
          this.myclass = this.classes[0];
          console.log(this.myclass)
          store.commit("MY_CLASS", this.myclass);
          this.$router.push('/myclass/'+this.myclass.passingyear+'-'+this.myclass.gradeid+this.myclass.sectionname+'-'+this.myclass.syllabustype)
        }
      }
    });
  },

  methods: {
    setmyclass: function(grade) {
      console.log(grade);
      if (grade) {
        store.commit("MY_CLASS", grade);
      } else {
        grade = this.$store.state.myClass;
      }
      this.myclass = grade;
    }
  }
};
</script>
<style>
.iteachbar {
  background: #eee;
  border-radius: 0px;
  height: 50px;
}
.active {
  border-bottom: 3px solid #fb6750;
}
.iteachnavbar > li > a:focus {
  background-color: transparent;
}
.navbar {
  position: relative;
  min-height: 50px;
  margin-bottom: 0px;
  border: 1px solid transparent;
}
.navbar-nav > li > a {
  padding-top: 10px;
  padding-bottom: 15px;
}
</style>
