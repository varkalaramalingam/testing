<template>
<div>
        <div class="col-sm-12 col-md-12 registrationsuccess">
            <div class="alert alert-success reg-successfull-alert">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">
                    ×</button>
               <span class="glyphicon glyphicon-ok"></span> <strong>Registration successful</strong>
                <hr class="message-inner-separator">
                <p>
                  Thanks so much for your message. We check e-mail frequently and will try our best to respond to your inquiry.</p>
            </div>
             <div class="col-md-12 text-center ">
                 <br>
         <router-link to="/login" active-class="active"  >Continue to Login
          </router-link>
          </div>
       </div>
      
       </div>
</template>
<script>
</script>
<style scoped>
.registrationsuccess{
    margin-top:10%;
    margin-bottom:44.9%;
}
.reg-successfull-alert{
    width: 50%;
    margin: auto;
}
</style>