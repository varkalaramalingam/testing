<template>
  <div class="clearfix">
    <section class="footer-content">
      <footer class="footer">
        <div class="container footersubject">
          <div class="row footertop">
            <div class="col-md-2">
              <div class="link-area">
                <img
                  src="../../assets/images/ischool_logo.png"
                  style="width: 100%"
                />
              </div>
            </div>
            <div class="col-md-2">
              <div class="link-area">
                <h4 class="infostyle">PRODUCT</h4>
                <ul class="liststyle" style="list-style: none; font-size: 14px">
                  <li><a href="/features">Inquire</a></li>
                  <li><a href="/features">Digest</a></li>
                  <li><a href="/features">Apply</a></li>
                </ul>
              </div>
            </div>
            <div class="col-md-2">
              <div class="link-area">
                <h4 class="infostyle">COMPANY</h4>
                <ul class="liststyle" style="list-style: none; font-size: 14px">
                  <li><a href="/">Home</a></li>
                  <li><a href="/about">About</a></li>
                  <li><a href="/contact">Contact</a></li>
                  <li><a href="/pricing">Pricing</a></li>
                  <li><a href="/register">SignUp</a></li>
                </ul>
              </div>
            </div>
            <div class="col-md-4 pull-right">
              <ul class="social-links">
                <div class="col-md-2">
                  <li class="twitter-link">
                    <a href="#"
                      ><i
                        class="fa fa-twitter fa-2x sociallinks"
                        aria-hidden="true"
                      ></i
                    ></a>
                  </li>
                </div>
                <div class="col-md-2">
                  <li class="facebook-link">
                    <a href="#"
                      ><i
                        class="fa fa-facebook fa-2x sociallinks"
                        aria-hidden="true"
                      ></i
                    ></a>
                  </li>
                </div>
                <div class="col-md-2">
                  <li class="linkedin-link">
                    <a href="#"
                      ><i
                        class="fa fa-linkedin fa-2x sociallinks"
                        aria-hidden="true"
                      ></i
                    ></a>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </div>

        <div
          class="bottom-footer"
          style="background: #ffffff; border-top: 1px solid #a1a9b3"
        >
          <div class="container">
            <div class="col-lg-12">
              <div class="col-md-4 col-md-offset-4">
                <p class="copyright text-muted small" style="color: #a1a9b3">
                  Copyright &copy; OMNIWYSE 2017. All Rights Reserved
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </section>
  </div>
</template>
<style scoped>
.footer {
  color: #000;
  text-decoration: none;

  /*text-align: center;*/
  bottom: 0;
  width: 100%;
  height: 0px;
  /* border-top:1px solid silver; */
  background: #ffffff;
}
.footer a {
  color: #a1a9b3;
}
.footer p {
  margin-top: 6px;
  color: #a1a9b3;
}
.sociallinks {
  color: #415568;
}
.footersubject .list-inline li {
  border-right: 1px solid silver;
}
.footersubject ul {
  margin-top: 10px;
  font-size: 12px;
}
.footertop {
  width: 1300px;
  max-width: 100%;
  margin: 0 auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding-bottom: 50px;
  padding-top: 50px;
  overflow: hidden;
  background-color: #fff;
}
.link-area ul {
  padding: 0;
}
.link-area ul li a {
  text-decoration: none;
}
element.style {
}
.link-area ul {
  padding: 0;
}
.footersubject ul {
  margin-top: 10px;
  font-size: 12px;
}
.link-area ul li {
  padding: 5px 5px 5px 0px;
}

element.style {
}
.link-area h4 {
  color: #415568;
}
.infostyle {
  color: #43566a;
  font-weight: 600;
  margin-bottom: 10px;
  text-transform: uppercase;
  display: block;
  letter-spacing: 2px;
  font-size: 14px;
}
.social-links .twitter-link,
.social-links .facebook-link,
.social-links .linkedin-link {
  display: inline;
}
</style>
