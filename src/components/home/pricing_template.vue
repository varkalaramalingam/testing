<template>
   <div class="container">
      <div class="row priceheading">
         <h2 style="text-align:center">Pricing</h2>
         <div class="row">
            <div class="col-lg-2 col-lg-offset-5">
               <hr class="feature-red-hr" />
            </div>
         </div>
         <div class="price-rows">
            <div class="col-md-3 col-md-offset-3 col-sm-3 col-xs-12">
               <div class="columns">
                  <ul class="price">
                     <li class="header">Basic</li>
                     <li class="grey">Contact Us</li>
                     <li class="highlight">iTeach</li>
                     <li class="highlight"><span v-html="$t('events')"/></li>
                     <li class="highlight">Attendance</li>
                     <li class="highlight">Timetable</li>
                     <li class="highlight">Library</li>
                     <li class="grey"><a ui-sref="home.signup" class="button-price">Register</a></li>
                  </ul>
               </div>
            </div>
            <div class="col-md-3 col-sm-3 col-xs-12">
               <div class="columns">
                  <ul class="price">
                     <li class="header">Pro</li>
                     <li class="grey"><i class="fa fa-rupee"></i>Contact Us</li>
                     <li class="highlight">iTeach</li>
                     <li class="highlight">Online/Offline Exam</li>
                     <li class="highlight">Worksheets</li>
                     <li class="highlight">Storage</li>
                     <li class="highlight">Test Results</li>
                     <li class="grey"><a ui-sref="home.signup" class="button-price">Register</a></li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>
<style scoped>
   .price-rows{
   margin-bottom:42.5%;
   }
   .columns {
   margin-bottom:20px;
   cursor:pointer;
   }
   .columns:hover .header { background-color:teal;border-top-left-radius: 0px;
   border-top-right-radius: 0px;}
   .columns:hover .button{ background-color:teal;}
   .columns:hover .grey {font-size:30px; color:#fff; }
   .columns:hover .price { color:red;border-top-left-radius: 0px;border-top-right-radius: 0px;}
   .price {
   list-style-type: none;
   border: 1px solid #eee;
   margin: 0;
   padding: 0;
   -webkit-transition: 0.3s;
   transition: 0.3s;
   overflow: hidden;
   }
   .price:hover {
   box-shadow: 0 8px 12px 0 rgba(0,0,0,0.2)
   }
   .price .header {
   background-color: #283b50;
   color: white;
   font-size: 25px;
   transition: all .2s ease-in-out;
   }
   .price li {
   border-bottom: 1px solid #eee;
   padding:12px;
   text-align: center;
   }
   .highlight { transition: 0.3s;}
   .highlight:hover {-webkit-transform:scale(1.5);transform:scale(1.5);}
   .price .grey {
   background-color: #4997cf;
   font-size: 20px;
   transition: all .2s ease-in-out;
   color: #fff;
   }
   .priceheading{
       margin-top:70px;
   }
   .button-price {
   /*background-color: #ff4949;*/
   border: none;
   color: white;
   padding: 10px 25px;
   text-align: center;
   text-decoration: none;
   font-size: 18px;
   transition: all .2s ease-in-out;
   }
   .button-price:hover {
   color: #ffffff;
   text-decoration: none;
   }
   @media only screen  and (min-width : 1224px) {
   /* Styles */
   }
   /* Large screens ----------- */
   @media only screen  and (min-width : 1824px) {
   /* Styles */
   .price-rows{
   margin-top: 20%;
   margin-bottom: 44.8%;
   }
   .columns {
   margin-bottom:20px;
   cursor:pointer;
   }
   .columns:hover .header { background-color:teal;border-top-left-radius: 0px;
   border-top-right-radius: 0px;}
   .columns:hover .button{ background-color:teal;}
   .columns:hover .grey {font-size:30px; color:#fff; }
   .columns:hover .price { color:red;border-top-left-radius: 0px;border-top-right-radius: 0px;}
   .price {
   list-style-type: none;
   border: 1px solid #eee;
   margin: 0;
   padding: 0;
   -webkit-transition: 0.3s;
   transition: 0.3s;
   overflow: hidden;
   }
   .price:hover {
   box-shadow: 0 8px 12px 0 rgba(0,0,0,0.2)
   }
   .price .header {
   background-color: #283b50;
   color: white;
   font-size: 25px;
   transition: all .2s ease-in-out;
   }
   .price li {
   border-bottom: 1px solid #eee;
   padding:12px;
   text-align: center;
   }
   .highlight { transition: 0.3s;}
   .highlight:hover {-webkit-transform:scale(1.5);transform:scale(1.5);}
   .price .grey {
   background-color: #4997cf;
   font-size: 20px;
   transition: all .2s ease-in-out;
   color: #fff;
   }
   .button-price {
   /*background-color: #ff4949;*/
   border: none;
   color: white;
   padding: 10px 25px;
   text-align: center;
   text-decoration: none;
   font-size: 18px;
   transition: all .2s ease-in-out;
   }
   .button-price:hover {
   color: #ffffff;
   text-decoration: none;
   }
   }
</style>