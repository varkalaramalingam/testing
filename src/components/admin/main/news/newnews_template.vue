<template>
<div>
    <div class="row reset-padding reset-margin">
        <div class="col-lg-12 text-left">
            <h3 class="student-head">Post News</h3>
            <hr>
        </div>
    </div>
    <div class="panel createnewspanel col-lg-6 col-lg-offset-3" >
        <div class="panel-body">
            <form class="form-horizantal" name="postnewsform">
                <div class="col-md-12">
                    <div class="leftside-form">
                        <div class="row">
                            <div class="col-md-4">
                                <label>Release Date</label>
                            </div>
                            <div class="col-md-8 ">
                                <date-picker lang="en" v-model="news.releasedate" ></date-picker>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-4">
                                <label>Headline</label>
                            </div>
                            <div class="col-md-8 ">
                                <input type="text" class="form-control form-input" id="" name="headline" placeholder="Headline*" v-model="news.headline" required>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="class">Description</label>
                            </div>
                            <div class="col-md-8">
                                <textarea name="about" class="form-control" rows="7" cols="50" placeholder="Description about news......*"  v-model="news.description" required></textarea>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-lg-6 col-lg-offset-3 text-center">
                                <button id="btn-reset" type="reset" class="btn button"> Reset</button>
                                <button id="btn-post" type="post" name="post" v-on:click.prevent="postnews" class="btn button" ng-disabled="postnewsform.$invalid">Post</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
      </div>
   </div>
</div>
</template>
<script>
import DatePicker from 'vue2-datepicker';
import UserService from '../../../../services/userService.js';
export default{
    components: { DatePicker },
    props:['school','userdetails'],
    data(){
        return{
            news:{},
            id:this.$cookie.get('id')
        }
    },
    methods:{
        postnews:function(){
            var news={
                "releasedate":this.news.releasedate.getTime(),
                "headline":this.news.headline,
                "description":this.news.description
            }
            UserService.PostNews(news,this.id).then((response)=>{
                if(response.status==200){
                    this.$router.push('/admin/news')
                }
            }).catch((response)=>{
                console.log(response.response.data)
            })

        }
    }

}
</script>