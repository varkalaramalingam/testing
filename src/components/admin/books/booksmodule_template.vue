<template>
  <div>    
   
    <div class="col-lg-2 adminreset-padding adminreset-margin">
        <books-nav-bar></books-nav-bar>
    </div>
    <div class="col-lg-10">
        <router-view></router-view>
    </div>
</div>

</template>
<script>
import BooksNavBar from './booksnavbar_template.vue'; 
export default{
    components:{
        BooksNavBar
    }

}
</script>

