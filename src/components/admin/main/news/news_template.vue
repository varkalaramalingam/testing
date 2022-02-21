<template>
    <div class="page-layout">
      <div class="row">
            <div class="col-lg-6">
                <div class="page-heading"><span v-html="$t('news')"/></div>
            </div>
        <div class="col-lg-6 text-right">
            <router-link to="/admin/postnews" tag="button" class="common-button">Post News</router-link>
        </div>
        </div>
        <hr/>
        <div class="newstable">
            <div class="divTable">
                <div class="divTableBody">
                    <div class="divTableRow">
                        <div class="divTableCell">Headline</div>
                        <div class="divTableCell">Release Date</div>
                        <div class="divTableCell">Description</div>
                        <div class="divTableCell">Edit</div>
                        <div class="divTableCell">Delete</div>
                    </div>
                    <div class="divTableRowdata" v-for="news in news">
                        <div class="divTableCelldata">{{news.headline}}</div>
                        <div class="divTableCelldata">{{getDateOfRelease(news.releasedate)}}</div>
                        <div class="divTableCelldata">{{news.description}}</div>
                        <div class="divTableCelldata"><a data-toggle="modal" href="#editnews" v-on:click.prevent="setnews(news)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                        <div class="divTableCelldata"><a data-toggle="modal" v-on:click.prevent="deletenews(news)"><i class="fa fa-trash fa-1x" aria-hidden="true"></i></a></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editnews" role="dialog" name="editnewsmodal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                            <h4 class="modal-title">Edit News</h4>
                    </div>
                    <div class="modal-body">
                        <form name="editnewsmodal">
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Release Date</label>
                                </div>
                                <div class="col-md-8 ">
                                    <date-picker lang="en" v-model="setreleasedate"></date-picker>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Headline</label>
                                </div>
                                <div class="col-md-8 ">
                                    <input type="text" class="form-control form-input" id="" name="headline" placeholder="headline*" v-model="newsmodel.headline"   required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Description</label>
                                </div>
                                <div class="col-md-8">
                                    <textarea name="about" class="form-control" rows="7" cols="50" placeholder="description about news......*" id="message" v-model="newsmodel.description" required></textarea>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" data-dismiss="modal" class="btn button">Cancel</button>
                                    <button id="btn-post" type="post" name="post" v-on:click.prevent="editnews" class="btn button" >Update</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import DatePicker from 'vue2-datepicker';
import moment from 'moment'

export default{
    components: { DatePicker },
    props:['school','userdetails'],
    data(){
        return{
            news:[],
            newsmodel:{},
            setreleasedate:'',
            id:this.$cookie.get('id')
        }
    },
    created(){
        UserService.News(this.id).then((response)=>{
           this.news=response.data;
          
        }).catch((error)=>{
            console.log(error.response.data);
        })
    },
    methods:{
        deletenews:function(news){
            var newsid={
                "id":news.id
            }
            UserService.DeleteNews(newsid,this.id).then((response)=>{
                if(response.status==200){
                    UserService.News(this.id).then((response)=>{
                        this.news=response.data;
                    })
                }
            }).catch((error)=>{
                console.log((error.response.data))
            })

        },
        setnews:function(news){
            this.newsmodel=news;
            this.setreleasedate=new Date();
            this.setreleasedate.setTime(news.releasedate);
        },
        editnews:function(){
            var editnews={
                "id":this.newsmodel.id,
                "releasedate":this.setreleasedate.getTime(),
                "headline":this.newsmodel.headline,
                "description":this.newsmodel.description
            }
            console.log(editnews);
            UserService.EditNews(editnews,this.id).then((response)=>{
                if(response.status==200){
                    $('#editnews').modal('hide');  
                }
            }).catch((error)=>{
                console.log(error.response.data)
            })
        },
        getDateOfRelease:function(date){
            return moment(date).format('DD/MM/YYYY')
        }

    }
}
</script>
<style>
.newstable{
width:100%;
}
<style scoped>
.reset-padding
{
padding: 0;
} 
.reset-margin{
 margin: 0;
}


</style>

