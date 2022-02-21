<template>
   <section class="contact" id="contact">
      <div class="container">
         <div class="row" style="margin-top:10.5%">
            <div class="col-md-4 col-md-offset-4  contactheading text-center" >
               <h2 class="section-heading">CONTACT US</h2>
               <hr class="star-light">
               <h3 class="section-subheading"></h3>
            </div>
         </div>
         <div class="row" style="margin-top:2%;margin-bottom:22%;">
            <div class="col-lg-12">
               <form name="sentMessage" id="contactForm" novalidate>
                  <div class="row">
                     <div class="col-md-6">
                        <div class="form-group">
                           <input type="text" class="form-control" placeholder="Your Name *" id="name" required data-validation-required-message="Please enter your name.">
                           <p class="help-block text-danger"></p>
                        </div>
                        <div class="form-group">
                           <input type="email" class="form-control" placeholder="Your Email *" id="email" required data-validation-required-message="Please enter your email address.">
                           <p class="help-block text-danger"></p>
                        </div>
                        <div class="form-group">
                           <input type="tel" class="form-control" placeholder="Your Phone *" id="phone" required data-validation-required-message="Please enter your phone number.">
                           <p class="help-block text-danger"></p>
                        </div>
                     </div>
                     <div class="col-md-6">
                        <div class="form-group">
                           <textarea class="form-control" placeholder="Your Message *" id="message" required data-validation-required-message="Please enter a message."></textarea>
                           <p class="help-block text-danger"></p>
                        </div>
                     </div>
                     <div class="clearfix"></div>
                     <div class="col-lg-12 text-center">
                        <div id="success" style="margin-top: 2%">
                           <button type="submit" class="btn btn-xl send-button">Send Message</button>
                        </div>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
      </div>
   </section>
</template>
<style>
   .contact .section-heading {
   color: #000;
   }
   .contact .form-group {
   margin-bottom: 25px;
   }
   .contact .form-group input,
   .contact .form-group textarea {
   padding: 20px;
   }
   .contact .form-group input.form-control {
   height: auto;
   }
   .contact .form-group textarea.form-control {
   height: 236px;
   }
   .contact .form-control:focus {
   border-color: #ff4949;
   }
   .contact .text-danger {
   color: #e74c3c;
   }
   .send-button{
   background-color: #039be5;
   margin-bottom: 3%;
   background-image: none;
   color:white;
   }
   .contact{
   margin-bottom:-10%
   }
   /* Desktops and laptops ----------- */
   @media only screen  and (min-width : 1224px) {
   /* Styles */
   }
   /* Large screens ----------- */
   @media only screen  and (min-width : 1824px) {
   /* Styles */
   .contact .section-heading {
   color: #000;
   }
   .contact .form-group {
   margin-bottom: 25px;
   }
   .contact .form-group input,
   .contact .form-group textarea {
   padding: 20px;
   }
   .contact .form-group input.form-control {
   height: auto;
   }
   .contact .form-group textarea.form-control {
   height: 236px;
   }
   .contact .form-control:focus {
   border-color: #ff4949;
   }
   .contact .text-danger {
   color: #e74c3c;
   }
   .send-button{
   background-color: #039be5;
   margin-bottom: 3%;
   background-image: none;
   color:white;
   }
   .contact{
   margin-bottom:-10%
   }
   }
</style>