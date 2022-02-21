<template>
<div>
<div class="col-md-12 ">
        <div class="row newhome">
        <p class="oursloutions">Next generation School Enrichment Platform </p>
        <div class="col-md-offset-4 col-md-4 newstudents">
         <h2 class="newwayofc">For the new age students</h2>
         </div>
        <div class="col-md-12 featureshead">
                <img src="http://ischool-project.s3-website-us-east-1.amazonaws.com/features.png" alt="" class="featurepic">
        </div>
      </div>
      <div class="row">
          <h2 class="newwayofcc">Concepts</h2>
      </div>
      <div class="col-md-10 thinkfeaturemain">
          <div class="col-md-4 col-md-offset-1">
            <img src="http://ischool-project.s3-website-us-east-1.amazonaws.com/inquiry.png" alt="" class="thinkfeature">
          </div>
          <div class="col-md-4 col-md-offset-1 pull-right">
                <h3 class="thinkfeature">Inquiry</h3>
                <p class="paracontent">Provides students with best breed books across the world to read and expan their wisdom</p>
            </div>
      </div>
      <div class="col-md-10 thinkfeaturemain" >
            <div class="col-md-4 col-md-offset-1 pull-left">
                    <h3 class="thinkfeature">Digest</h3>
                    <p class="paracontent">ISchool provides every grade with a set of Assignments and worksheets, that makes a huge difference</p>
            </div>
            <div class="col-md-4 col-md-offset-1 ">
                    <img src="http://ischool-project.s3-website-us-east-1.amazonaws.com/digest.png" alt="" class="thinkfeature">
              </div>
        </div>
        <div class="col-md-10 thinkfeaturemain">
                <div class="col-md-4 col-md-offset-1">
                        <img src="http://ischool-project.s3-website-us-east-1.amazonaws.com/apply.png" alt="" class="thinkfeature">
                </div>
                <div class="col-md-4 col-md-offset-1 pull-right">
                      <h3 class="thinkfeature">Apply</h3>
                      <p class="paracontent">iSchool provides every grade with set of Todo projects integrated well into the academic work</p>
                  </div>
            </div>
      </div>
      <div class="col-md-4 col-md-offset-4 thinkfeaturemain">
    
      <button class="btn register-btn">
      <a ui-sref=".signup" class="signuptoday">GET STARTED TODAY</a></button>
      </div>
</div>
</template>
<script>
export default{
    name:'Feature'
}
</script>
<style scoped>
.newhome{
  background-color: #eef7fe;
     padding-top: 120px!important;
}
.oursloutions{
  background-color: #eef7fe;
  padding: 75px 8%;
  text-align: center;
  margin-top: 8px;
  color: #43566a;
  font-weight: 300;
  font-size: 45px;
  line-height: 55px;
  margin:0px auto;
}
.featurepic{
  width:240px;
}
.featureshead{
  text-align: center;
}
.newwayofc{ 
  color: #03bdd6;
font-weight: 300;
font-size: 30px;
line-height: 30px;
margin: 0 auto 20px;
text-align: center;
width: 770px;
max-width: 100%;
margin-bottom: 0;
}
.newwayofcc{
    color: #03bdd6;
font-weight: 300;
font-size: 30px;
line-height: 30px;
margin: 0 auto 20px;
text-align: center;
width: 770px;
max-width: 100%;
padding: 80px 20px 20px;
margin-bottom: 0;
}
.paracontent{
  max-width: 560px;
  margin: 0 auto;
  text-align: center;
  color: #43566a;
}

.thinkfeature{
  max-width: 100%
}
.thinkfeaturemain{
  clear: both;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 20px;
}
.paracontent{
  max-width: 560px;
  margin: 0 auto;
  text-align: center;
  color: #43566a;
}
.thinkfeature{
  color: #03bdd6;
  font-weight: 300;
  font-size: 25px;
  line-height: 30px;
  margin: 0 auto 20px;
  text-align: center;
  width: 770px;
  max-width: 70%;
  padding: 80px 20px 20px;
  margin-bottom: 0;
}
.thinkfeaturemain{
  clear: both;
  overflow: hidden;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin-bottom: 20px;
}
.register-btn {
    background-color: #f3674c;
    border-radius: 23px;
}
.register-btn .signuptoday{
    color:white;
}
.newstudents{
  margin-top:-4%;
}
</style>