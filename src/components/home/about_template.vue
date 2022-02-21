<template>
  <div class="col-md-12">
    <div class="row newhome">
      <p class="aboutus">About us</p>
    </div>
    <div class="col-md-12 featureabout" v-if="isEducationSchool">
      <img
        src="http://ischool-project.s3-website-us-east-1.amazonaws.com/aboutcopy.png"
        alt=""
        class="featurepic"
      />
    </div>
    <div class="row" v-if="isEducationSchool">
      <h2 class="newwayofc">We’re revolutionizing education.</h2>
      <div class="paragraph">
        <p class="paracontent">
          We are passiniate for about building the nation with future citizens.
          The best way to do this is to inculcate some of the best habits of
          successful people at early stage. We have a team on board with
          experience in working international schools.
        </p>
      </div>
    </div>

    <div v-if="!isEducationSchool">
      <div class="row about-interviewee">
        <p class="interviewee-para">
          Omniwyse helps Companies become innovative leaders by delivering
          software teams on demand. We help you – choose the right technologies
          to invest in, decide on the best architecture and processes to follow,
          and oversee the successful delivery of the software products. We focus
          on building a strong relationship of trust, with a focus on
          communication and consistency, providing a long-term solution that
          enables business growth.
        </p>
        <p class="interviewee-para">
          We are a tech company with a mission to help companies extend their
          tech capacity and transform their businesses digitally by providing
          expert software engineering and consulting services.
        </p>
      </div>
    </div>

    <div class="row founderheading" v-if="isEducationSchool">
      <div class="col-md-6 col-md-offset-3 cofounder">
        <h3 class="cofounder">Our Co-Founders</h3>
      </div>
      <div class="col-md-8 col-md-offset-3 paragraphone">
        <div class="field-name">
          <div class="field__item">
            <img
              src="../../assets/images/damodar.png"
              alt="Damodar Pai"
              class="founderimage"
              style="display: block"
            />
          </div>
        </div>
        <div class="aboutfounder">
          <p class="">
            <strong>Damodar Pai</strong><br />
            CEO and Co-founder<br />
            <em class="business">VP Engineering</em>
          </p>
          <p class="Ronen">
            16+ years of IT experience in Consulting, Service Delivery and Cloud
            Business Apps Worked for an US based IT company as Country Lead and
            managing India entity
          </p>
        </div>
      </div>
      <div class="col-md-8 col-md-offset-3 paragraphone">
        <div class="field-name">
          <img
            src="../../assets/images/sumit.png"
            alt="Sumit Jain"
            class="founderimage"
            style="display: block"
          />
        </div>
        <div class="aboutfounder">
          <p class="">
            <strong>Sumit Jain</strong><br />
            Co-founder, VP Sales<br />
            <em class="business">Sales and Business Development</em>
          </p>
          <p class="Ronen">
            Oxford Said Business School Certified Blockchain Strategist 16 Years
            Experience in Biz Dev, IT Consulting, Product, Marketing & Customer
            Engagement
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "About",
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
      return this.$store.state.newVal;
    }
  }
};
</script>
<style scoped>
.newhome {
  background-color: #eef7fe;
  padding-top: 60px !important;
}
.aboutus {
  background-color: #eef7fe;
  padding: 70px 8%;
  text-align: center;
  margin-top: 8px;
  color: #43566a;
  font-weight: 300;
  font-size: 45px;
  line-height: 55px;
  margin: 0 auto;
}
.featureabout {
  margin: -74px auto 0;
  text-align: center;
}
.featurepic {
  width: 240px;
}
.newwayofc {
  color: #03bdd6;
  font-weight: 300;
  font-size: 30px;
  line-height: 30px;
  margin: -50px auto 20px;
  text-align: center;
  width: 770px;
  max-width: 100%;
  padding: 80px 20px 20px;
  margin-bottom: 0;
}
.paracontent {
  max-width: 560px;
  margin: 0 auto;
  text-align: center;
  color: #43566a;
}
.founderheading {
  margin-top: 70px;
  color: #43566a;
}
.founderheading {
  background: #f5f6f8;
}
.cofounder {
  padding-top: 56px;
  padding-bottom: 60px;
  margin-bottom: 0;
  color: #43566a;
  text-align: center;
}
.paragraphone {
  max-width: 800px;
  padding: 0 20px 68px 45px !important;
}
.field-name {
  float: left;
  margin-right: 34px;
  max-width: 210px;
}
.founderimage {
  width: 200px;
  height: 220px;
}
.aboutfounder {
  padding-right: 35px;
  margin-left: 244px;
}
.business {
  font-style: normal;
  color: #a1a9b3;
  line-height: 0.5;
}
.Ronen {
  color: #43566a;
}
.about-interviewee {
  background-color: #eef7fe;
  color: #a1a9b3;
  max-width: "50%";
}

.interviewee-para {
  max-width: 70%;
  margin: 0 auto;
  color: #43566a;
  margin-bottom: 2em;
  font-size: 1.3em;
}
</style>
