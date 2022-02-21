<template>
  <div>
    <SchoolFooter
      v-if="
        !this.$cookie.get('userrole') && isEducationSchool"
    />
    <IntervieweeFooter
      v-if="
        !this.$cookie.get('userrole') && !isEducationSchool"
    />
  </div>
</template>
<script>
import IntervieweeFooter from "../interviewee/Footer";
import SchoolFooter from "../headers/footer.vue";
export default {
  props: ["school"],
  components: {
    SchoolFooter,
    IntervieweeFooter
  },
  data() {
    return {
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
<style scoped>
</style>
