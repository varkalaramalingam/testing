<template>
  <div class="container-fluid">
    <div class="row" id="myDiv">
      <div class="page-layout" :style="{display:'flex'}">
        <iframe
          :style="{
            overflow: 'hidden',
            width: '100%',
            height:'100%',
            'flex-grow':1,
            position: 'absolute'
          }"
          :src="whiteBoardUrl"
          id="whiteBoardId"
          v-if="loaded"
          frameborder="0"
          name="whiteboardIframe"
          @load="sendMessage"
        />
      </div>
    </div>
  </div>
</template>
<script>
import UserService from "../../../../services/userService.js";
import store from "../../../../store.js";
import instances from "../../../api/instances.json";
import moment from "moment";
export default {
  name: "WhiteBoard",
  props: [
    "school",
    "sectionId",
    "sessionKey",
    "whiteBoardSessionKey",
    "subjectId"
  ],
  data() {
    return {
      tenantId: this.$cookie.get("id"),
      myClassDetails: this.$store.state.myClass,
      //children details
      acdemicyearandboard: this.$store.state.acdemicyearandboard,
      academicDetails: {},
      //school: {},
      userdetails: {},
      pageNumber: 0,
      size: 10,
      search: "",
      listoftests: [],
      userid: this.$cookie.get("userid"),
      childrens: [],
      myChild: {},
      //children details end
      testdetails: [],
      myChildId: 0,
      timetable: [],
      periodsubjects: {},
      modalOpen: false,
      loaded: false,
      iframeObj: {},
      whiteBoardUrl:
        "https://whiteboard.wisereads.in/#room=" + this.whiteBoardSessionKey
    };
  },
  created() {},
  methods: {
    sendMessage: function() {
      const iframe = document.getElementById("whiteBoardId");
      iframe && iframe.contentWindow.postMessage(this.iframeObj || {}, "*");
    }
  },
  mounted() {
    const user = this.$store.state.userDetails || {};
    this.iframeObj = {
      user: {
        ...user,
        academicYearId: this.$cookie.get("academicyearid"),
        tenantId: this.$cookie.get("id"),
        sectionId: this.sectionId,
        sessionKey: this.sessionKey,
        subjectId: this.subjectId
      },
      tenantId: this.$cookie.get("id")
    };
    if (this.iframeObj && Object.entries(this.iframeObj).length > 0)
      this.loaded = true;
  },
  computed: {}
};
</script>
<style scoped>
@import url("../../../../assets/css/classrooms_styles.css");

.joinCallButton {
  background-color: #039be5;
  background-image: none;
  border-color: #039be5;
  color: white;
  padding: 5px 30px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  text-decoration: none;
  border-radius: 0px;
}

.fullScreenModal {
  width: 100%;
  height: 100%;
  margin: 0;
  top: 0;
  left: 0;
}
.fullScreenIframe {
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
