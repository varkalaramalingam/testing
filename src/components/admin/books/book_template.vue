<template>
    <div>
        <div class="col-lg-12 reset-padding reset-margin">
            <div class="text-left">
                <h3 class="student-head" style="text-align: left">{{book.title}}</h3>
            </div>
            <hr>
        </div>

        
        <!-- Book Description Page -->
        <div class="col-lg-12 subjectteachertable reset-padding reset-margin">
          <div class="optionFloat" style="width:18%;">
       <img :src="book.bookcoverpage" v-if="book.bookcoverpage != 'ImageNotPresent'" style="width:180px;height:270px" @error="$event.target.src='https://www.kinmade.com/pub/media/catalog/product/placeholder/default/no-image-available_1.jpg'"/> 
            <img src="https://www.kinmade.com/pub/media/catalog/product/placeholder/default/no-image-available_1.jpg" style="width:180px;height:230px" v-if="book.bookcoverpage == 'ImageNotPresent'"/> 
        </div>
        <div class="optionFloat" style="width:80%;border:1px solid black;background-color:lightblue">
            <div class="optionFloat" style="width:100%;">
                <div class="optionFloat" style="width:20%">
                    <h3>Description</h3></div>
                
            </div>
            <div style="margin-left:10px;margin-bottom:10px">{{book.bookdescription}}</div>
        </div>
       <div class="col-md-6" style="margin-left:-10px">
        <br>
            <Strong>Author     :</Strong> {{book.author}}<br>
            <Strong>Genre      :</Strong> {{book.generes}}<br>
            <Strong>Language   :</Strong>  English <br>
            <Strong>Publisher  :</Strong>  {{book.publisher}}<br>
            <Strong>Edition    :</Strong>  {{book.edition}}<br>
            <Strong>Price      :</Strong>  $ {{book.bookprice}}<br>
            <Strong>Rental Value      :</Strong> $ {{book.baserentalvalue}}<br>
            

        </div>
        </div>
        <div class="col-lg-2 reset-padding reset-margin">
            <div class="text-left">
                <h4 class="student-head" style="margin-top:50px">Similar books</h4>
            </div>
        </div>

        <div class="col-lg-12 subjectteachertable reset-padding reset-margin" >
          <div class="optionFloat" style="width:18%;" v-for="(similarBook, index) of listOfSimilarBooks" v-if="index < 5">
            <img :src="similarBook.bookcoverpage" style="height:190px; width:150px" v-if="similarBook.bookcoverpage != 'ImageNotPresent'" @error="$event.target.src='https://www.kinmade.com/pub/media/catalog/product/placeholder/default/no-image-available_1.jpg'"/> 
            <img src="https://www.kinmade.com/pub/media/catalog/product/placeholder/default/no-image-available_1.jpg" style="width:180px;height:150px" v-else> 
            <h4>{{similarBook.title}}</h4>
        </div>
        </div>
    </div>
</template>
<style scoped>

.optionFloat{
  float: left;
}

h2,h3 {
  text-align: center;
}

</style>

<script>
import UserService from '../../../services/userService.js';
import { mapGetters } from 'vuex';
import BooksNavBar from './booksnavbar_template.vue';
export default {
    components: {
        BooksNavBar
    },
    
    data() {
        return {
            open: "show",
            close: "hide",
            book: this.$store.state.book,
            coverpage:'',      
            listOfSimilarBooks:[],    
            confirmationPopUpKeys :{
              questionDel:'questionDel',
              questionEditCancel:'questionEditCancel',
              worksheetReset : 'worksheetReset'
            },
            answerTypeList: [{
                    text: "Text",
                    value: 1
                },
                {
                    text: "Formula",
                    value: 2
                },
                {
                    text: "Image",
                    value: 3
                }
            ],
            tenantId:this.$cookie.get('id')
        };
    },
    created(){
        this.getCoverPage(this.book);
        this.getListOfSimilarBooks();
    },

    methods: {
        getCoverPage: function(book){
            let listOfImagesUrls = {
             bookcoverpage:book.bookcoverpage,
             imagesUrl1:book.imagesUrl1,
             imagesUrl2:book.imagesUrl2
            };
            UserService.verifyImageUrl(this.tenantId, listOfImagesUrls ).then((response) => {
            let resultMessage = JSON.stringify(response.data.message);
            if(resultMessage.includes('coverpage')){
               //  this.coverpage = book.bookcoverpage;
                   book.bookcoverpage = book.bookcoverpage;
            } else if(resultMessage.includes('pageurlone')){
              //  this.coverpage = book.imagesUrl1;
                 book.bookcoverpage = book.imagesUrl1;
            }else if(resultMessage.includes('pageurltwo')){
               // this.coverpage = book.imagesUrl2;
                book.bookcoverpage = book.imagesUrl2;
            }else if(resultMessage.includes('existed')){
              //  this.coverpage = "ImageNotPresent";
                book.bookcoverpage = "ImageNotPresent";
            }
         })           
        },
          getListOfSimilarBooks: function() {
               UserService.getListOfSimilarBooks(this.tenantId,this.book).then((response) => {
               this.listOfSimilarBooks = response.data && response.data.results;
               for(let i=0;i<this.listOfSimilarBooks.length && i<5;i++){
                   this.getCoverPage(this.listOfSimilarBooks[i]);
               }
            })
          }
    }
}
</script>