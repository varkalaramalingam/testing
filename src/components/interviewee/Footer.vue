<template>
  <div class="w3l-footer-29-main" id="footer">
    <div class="footer-29 py-5">
      <div class="container pb-lg-3">
        <div class="row footer-top-29">
          <div class="col-lg-6 col-md-6 footer-list-29 footer-1 mt-md-4">
            <a class="footer-logo mb-md-3 mb-2" href="/"
              ><img
                src="../../assets/omniwyse-assets/images/omniwyse.png"
                alt="Omniwyse"
            /></a>
            <p>
              We build your products. Omniwyse has army of engineers to help in
              your products. Augment your teams with best engineers We take care
              of you, while you take care of your customers
            </p>
          </div>
          <div class="col-lg-3 col-md-6 footer-list-29 footer-2 mt-5">
            <h6 class="footer-title-29">SERVICES</h6>
            <ul>
              <li>
                <router-link to="/">UI/UX Engineering</router-link>
              </li>
              <li>
                <router-link to="/">Front end development</router-link>
              </li>
              <li>
                <router-link to="/">SAAS Development</router-link>
              </li>
              <li>
                <router-link to="/">Mobile App Development</router-link>
              </li>
              <li>
                <router-link to="/">Cloud and Devops</router-link>
              </li>
              <li>
                <router-link to="/">Quality Engineering</router-link>
              </li>
            </ul>
          </div>

          <div class="col-lg-3 col-md-6 footer-list-29 footer-4 mt-5">
            <h6 class="footer-title-29">COMPANY</h6>
            <ul>
              <li>
                <router-link to="/">About us</router-link>
              </li>
              <li>
                <router-link to="/">Why us</router-link>
              </li>
              <li>
                <router-link to="/">Meet our Team</router-link>
              </li>
              <li>
                <router-link to="/">Engagement Model</router-link>
              </li>
              <li>
                <router-link to="/">Technologies</router-link>
              </li>
             
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div id="footers14-block" class="py-3">
      <div class="container">
        <div class="footers14-bottom text-center">
          <div class="social">
            <a href="#facebook" class="facebook"
              ><span class="fa fa-facebook" aria-hidden="true"></span
            ></a>
            <a href="#google" class="google"
              ><span class="fa fa-google-plus" aria-hidden="true"></span
            ></a>
            <a href="#twitter" class="twitter"
              ><span class="fa fa-twitter" aria-hidden="true"></span
            ></a>
          </div>
          <div class="copyright mt-1">
            <p>&copy; 2020 Omniwyse. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.w3l-footer-29-main #footers14-block {
  background-color: #000;
}

.w3l-footer-29-main .copyright p {
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 24px;
  color: var(--text-color);
  padding: 10px 0;
}

.w3l-footer-29-main .copyright a {
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 20px;
  color: #fff;
}

.w3l-footer-29-main .copyright a:hover {
  text-decoration: underline;
}

.w3l-footer-29-main .social a span {
  font-size: 16px;
  color: #fff;
  padding: 10px;
  transition: 0.3s ease;
}

.w3l-footer-29-main .social a span:hover {
  color: var(--primary);
  transition: 0.3s ease;
}

.w3l-footer-29-main #movetop {
  display: none;
  position: fixed;
  bottom: 15px;
  right: 15px;
  z-index: 99;
  font-size: 16px;
  border: none;
  outline: none;
  cursor: pointer;
  color: #fff;
  width: 35px;
  height: 35px;
  background: #333;
  padding: 0;
  line-height: 35px;
  border-radius: 50%;
  transition: 0.5s ease-out;
}

.w3l-footer-29-main #movetop:hover {
  background: var(--primary);
  transform: translate3d(0, -5px, 0);
  -webkit-transform: translate3d(0, -5px, 0);
  transition: 0.5s ease-out;
}

@media all and (max-width: 736px) {
  .w3l-footer-29-main .copyright {
    order: 2;
  }
}

@media all and (max-width: 667px) {
  .w3l-footer-29-main ul.footer14-nav li {
    margin: 10px 20px 10px 0px;
  }
}

@media all and (max-width: 440px) {
  .w3l-footer-29-main ul.footer14-nav,
  .w3l-footer-29-main .footer14-app {
    margin-top: 2rem;
  }
}

.w3l-footer-29-main a.footer-logo {
  color: #ffffff;
  display: inline-block;
  font-size: 42px;
  font-family: "Poppins", serif;
}

.w3l-footer-29-main a.footer-logo img {
  vertical-align: baseline;
}

.w3l-footer-29-main option {
  background: #ffffff;
  color: var(--text-color);
}

.w3l-footer-29-main a.action img {
  margin-left: 4px;
}

.w3l-footer-29-main .footer-29 {
  background: #090909;
}

.w3l-footer-29-main .footer-list-29 .properties a {
  margin-bottom: 10px;
  transition: 0.3s ease-in;
}

.w3l-footer-29-main .footer-list-29 .properties a p:hover {
  color: var(--primary);
  transition: 0.3s ease-in;
}

.w3l-footer-29-main .footer-list-29 a p {
  color: #c1c1c1;
  font-size: 16px;
  line-height: 25px;
}

.w3l-footer-29-main h6.footer-title-29 {
  color: var(--primary);
  font-size: 22px;
  line-height: 25px;
  text-transform: capitalize;
  margin-bottom: 25px;
  font-weight: 600;
}

.w3l-footer-29-main .footer-list-29 ul li,
.w3l-footer-29-main
  .midd-footer-29:nth-child(1)
  .footer-list-29
  ul
  li:last-child {
  list-style: none;
  margin-bottom: 10px;
}

.w3l-footer-29-main .footer-list-29 ul li:last-child {
  margin-bottom: 0px;
}

.w3l-footer-29-main .footer-list-29 ul li a {
  font-weight: normal;
  font-size: 16px;
  color: #c1c1c1;
  transition: 0.3s ease-in;
}

.w3l-footer-29-main .footer-list-29 p {
  font-weight: normal;
  font-size: 20px;
  color: #d2d2d2;
}

.w3l-footer-29-main .footer-list-29 ul li a:hover {
  color: #fff;
  transition: 0.3s ease-in;
}

.w3l-footer-29-main ul.list-btm-29,
.w3l-footer-29-main p.right-side-con {
  text-align: right;
}

.w3l-footer-29-main .list-btm-29 li {
  list-style-type: none;
  display: inline-block;
}

.w3l-footer-29-main ul.list-btm-29 li:nth-child(2) {
  margin: 0 15px;
}

.w3l-footer-29-main .list-btm-29 li a {
  font-weight: normal;
  font-size: 16px;
  line-height: 25px;
  color: var(--text-color);
}

.w3l-footer-29-main .list-btm-29 li a:hover {
  color: var(--primary);
}

.w3l-footer-29-main .bottom-source {
  margin-top: 60px;
}

.w3l-footer-29-main .main-social-footer-29 {
  margin-top: 20px;
  margin-bottom: 15px;
}

.w3l-footer-29-main .twitter-feed {
  grid-template-columns: 0.33fr 1fr;
  grid-gap: 10px;
}

@media (max-width: 1080px) {
  .w3l-footer-29-main .midd-footer-29 {
    margin-top: 6em;
  }
}

@media (max-width: 1024px) {
  .w3l-footer-29-main .copy-footer-29 {
    text-align: center;
  }
  .w3l-footer-29-main ul.list-btm-29 {
    text-align: center;
    margin-top: 10px;
  }
}

@media (max-width: 667px) {
  .w3l-footer-29-main .main-social-footer-29 a {
    margin-right: 5px;
  }
  .w3l-footer-29-main ul.list-btm-29 li:nth-child(2) {
    margin: 0 18px;
  }
  .w3l-footer-29-main .midd-footer-29 {
    margin-top: 5em;
    padding-bottom: 1.5em;
    margin-bottom: 1.5em;
  }
  .w3l-footer-29-main ul.list-btm-29 li:nth-child(2) {
    margin: 0 12px;
  }
  .w3l-footer-29-main h6.footer-title-29 {
    margin-bottom: 15px;
  }
}

@media (max-width: 600px) {
  .w3l-footer-29-main .midd-footer-29,
  .w3l-footer-29-main ul.list-btm-29 {
    text-align: center;
  }
}

@media (max-width: 384px) {
  .w3l-footer-29-main .midd-footer-29 {
    margin-top: 4em;
  }
  .w3l-footer-29-main .bottom-source {
    margin-top: 40px;
  }
}
</style>
