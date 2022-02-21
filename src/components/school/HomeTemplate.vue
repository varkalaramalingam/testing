<template>
  <div>
    <div style="position:relative">
      <div class="position-center">
        <h1>Is Your School Handling the Corona Crisis effectively ?</h1>
        <h2>Are you ready for the future disruptions?</h2>
      </div>
      <img src="../../assets/images/banner.jpg" class="img-responsive" width="100%" />
    </div>
    <div class="col-md-12 newhome">
      <p class="mainheading">
        Is your child developing foundational skills?
        <br />Listening, Speaking, Reading, Writing and thinking using multiple texts?
        <b>Self sustained reading?</b>
      </p>
      <div class="col-md-10 col-md-offset-1 text-center">
        <img
          src="http://ischool-project.s3-website-us-east-1.amazonaws.com/hyper-1rg.jpg"
          alt
          class="picone"
        />
      </div>
    </div>
    <div class="col-md-12 newhome">
      <p class="mainheading">We Will Help Your School Go World Class</p>
      <div class="col-md-10 col-md-offset-1 text-center">
        <img
          src="http://ischool-project.s3-website-us-east-1.amazonaws.com/hyper-2rg.jpg"
          alt
          class="picone"
        />
      </div>
    </div>
    <div class="col-md-12 newhome">
      <p class="mainheading">Paathshala introduces the components for feature school</p>
      <div class="col-md-10 col-md-offset-1 text-center">
        <img
          src="http://ischool-project.s3-website-us-east-1.amazonaws.com/hyper-7rg.jpg"
          alt
          class="picone"
        />
      </div>
    </div>

    <div class="col-md-10 col-md-offset-1 text-center">
      <img
        src="http://ischool-project.s3-website-us-east-1.amazonaws.com/hyper-5rg.jpg"
        alt
        class="picone"
      />
      <h5 class="newschlmatter">
        Paathshala provides every grade with a set of Assignments and worksheets, that makes a huge difference.
        Provides students with best breed books across the world to read and expan their wisdom.
      </h5>
    </div>
    <div class="col-md-4 col-md-offset-4 newregisterbtn text-center">
      <router-link
        to="/register"
        class="btn register-btn"
        role="button"
        style="color:#fff"
      >GET STARTED TODAY</router-link>
    </div>

    <div>
      <img
        src="http://ischool-project.s3-website-us-east-1.amazonaws.com/hyper-team.png"
        alt="tghyjuuy"
        class="newschlbackground"
      />
    </div>
    <div class="row col-md-12">
      <div class="col-md-4 investimageone">
        <img
          src="http://ischool-project.s3-website-us-east-1.amazonaws.com/investor-5.jpg"
          alt
          class="investorfive"
        />
      </div>
      <div class="col-md-4">
        <div class="invested">
          <h3 class="invested">Investors</h3>
          <p>
            Our investors and advisors represent some
            <br />of the most strategic
            and influential retail
            <br />technology experts in the industry.
          </p>
        </div>
      </div>

      <div class="col-md-4">
        <img
          src="http://ischool-project.s3-website-us-east-1.amazonaws.com/investor-4.jpg"
          alt
          class="investorfive"
        />
      </div>
    </div>

    <section>
      <div class="col-md-12 automated">
        <h3>Inquire, Digest, Apply</h3>
        <p class="improve">
          Start your inquiry ,Comprehend the bigpicture
          <br />and apply the thought
        </p>
        <br />
        <router-link
          to="/register"
          class="btn register-btn"
          role="button"
          style="color:#fff"
        >GET STARTED TODAY</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home"
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
