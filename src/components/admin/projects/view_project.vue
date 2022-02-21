<template>

     <div id = "container">

         <h1>{{project.title}}</h1>

         <h2 id="subject">{{project.subject}}</h2>

           <div class ="GradeLevel row">

               <div class="col-md-3"><strong>Grade</strong>
                <div v-if="project.grade > 3">{{project.grade}}th Class</div>
                <div v-else-if="project.grade == 3">{{project.grade}}rd Class</div>
                <div v-else-if="project.grade == 2">{{project.grade}}nd Class</div>
                <div v-else>{{project.grade}}st Class</div>
                </div>

               <div class="col-md-3"><strong>Concepts</strong><div v-for="concept in project.concepts">{{concept}}</div></div>

               <div class="col-md-3"><strong>Tags</strong><div v-for="tags in project.tags">{{tags}}</div></div>

               <div class="col-md-3"><strong>Safety</strong> <div>{{project.safety}}</div></div>

               <div class="col-md-3"><strong>Difficulty Level</strong> <div>{{project.difficulty}}</div></div>

               <div class="col-md-3"><strong>Cost of Materials</strong><div>&#8377;{{project.costOfMaterials}}</div></div>

            </div>

            <div class="row">

                <div class="col-md-6">

                    <iframe width="100%" height="350"  :src="project.videoUrl" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>

                    </iframe>

                    <div class="info-set">

                        <div class ="duration-category pull-left">   

                            <div class="pull-left"><strong><i class="fa fa-clock-o" aria-hidden="true"></i></strong> {{project.duration}}</div> 

                        </div>

                        <div class ="likeBtn">

                            <button class="btn search-btn" type="button" @click="submitLike" v-bind:style="[changeLikeColor]">

                            <span class=" glyphicon glyphicon-thumbs-up"> {{project.likes}}</span>

                            </button>

                            <button class="btn search-btn" type="button" @click="submitDisLike" v-bind:style="[changeDisLikeColor]">

                                <span class=" glyphicon glyphicon-thumbs-down"> {{project.disLikes}}</span>

                            </button>

                        </div>

                    </div>

                    <div class="clearfix"></div>

                    <div class="video-info-set">

                        <div class="pull-left"><strong>Category: </strong>{{project.category}}</div>

                        <span class="pull-left">|</span> 

                        <a class="pull-left" :href="project.doc" defer target="_blank"><span class="glyphicon glyphicon-download" style="margin-left:5px;"></span>Download</a>

                        <span class="pull-left">|</span> 

                        <div class="pull-left">

                            <strong class="pull-left">Additional Grades:&nbsp;</strong>

                            <div v-for="grades in project.additionalGrades" class="addGrades pull-left">

                                <span style="margin:5px;">{{grades}}</span>

                            </div>

                        </div>

                        <div class="clearfix"></div>

                    </div>

                    <div class="comment ">

                        <h2>

                            <span class="countCmmnt" v-if="project.comments.length >1 ">Comments ({{project.comments.length}})</span>

                            <span class="countCmmnt" v-if="project.comments.length <2 ">Comment ({{project.comments.length}})</span>    

                        </h2>

                        <div class="ReadComments">

                            <div v-for="comment in project.comments.slice().reverse()">

                                <div class="eachComment">

                                    <strong>{{comment.name}}</strong>

                                    <p>{{comment.comment}}</p>

                                </div>

                            </div>

                         </div>

                        <form v-on:submit.prevent="submitComment">

                            <input type="text" class="form-control popUpEle commentName" placeholder="Name" v-model="comment1.name">   

                            <textarea type="text" class="form-control popUpEle commentInp" placeholder="Add a comment..." v-model="comment1.comment"> </textarea>

                            <button type="submit" class="btn btn-primary commentBtn" v-bind:disabled="!formIsValid">comment</button>

                        </form>

                    </div>

                </div>

                <div class="col-md-6">

                    <div class="short-description description-h">

                        <h2>Short Description</h2>

                        <p>{{project.shortDescription}}</p>

                        <img :src="project.image[0]" v-if="project.image[0] != null" width="200" height="180" id="image" @error="$event.target.src='https://ischool-project.s3.ap-south-1.amazonaws.com/images/image-not-found.png'">

                    </div>

                    <div class="procedure description-h">

                        <h2>Procedure</h2>

                        <p>{{plainText}}</p>

                    </div>

                    <div class = "materials description-h">

                        <h2>Materials Required</h2>

                        <br>

                        <div v-for="materials in project.materialsRequired">

                            <p><strong>Name: </strong>{{materials.name}}</p>

                            <p><strong>Quantity: </strong>{{materials.quantity}}</p>

                            <p><strong>Description: </strong>{{materials.description}}</p>

                            <hr>

                        </div>

                    </div>

                    <div class="precautions description-h">

                        <h2>Precautions</h2>

                        <p>{{project.precautions}}</p>

                    </div>

                </div>

            </div>

               <div class="gallery description-h">
                   <h2>Gallery</h2>
                   <img :src="project.bannerImage" v-if="project.bannerImage != null" width="200" height="170" class="galleryImages" @error="$event.target.src='https://ischool-project.s3.ap-south-1.amazonaws.com/images/image-not-found.png'">
                   <img v-for="img in project.image" :src="img" v-if="img != null" width="200" height="170" class="galleryImages" id="galleryImg" @error="$event.target.src='https://ischool-project.s3.ap-south-1.amazonaws.com/images/image-not-found.png'">
                </div>

     </div>

</template>

<script>

import ProjectService from '../../../services/projectService'


export default {

    name:'view-project',

    data(){

        return{

            id:this.$route.params.id,

            project:{},

            count:0,

            procedureData:'',

            plainText:[],

            listOfComments:[],

            comment:[],

            comment1:{

                //comment

            }

        }

    },

     created(){

            this.getData();

           

     },

     computed:{

         formIsValid: function(){

             return this.comment1.name && this.comment1.comment

         },

         changeLikeColor: function(){
             return{

                 'color':'#0F9D58'
             }

         },

         changeDisLikeColor: function(){

             return{

                 'color':'#DB4437'

             }

         }
     },

    methods:{

        getData(){

            ProjectService.GetSingleProject(this.id).then((response)=>{

               console.log(response.data)

                this.project = response.data

                 this.procedureData = response.data.procedure.steps;

                 this.plainText  = this.getCkFinalData(this.procedureData)

                 //this.plainText = this.procedureData.replace('<p>','').replace('</p>',',').replace('&nbsp;','').split(',')

            })

        },

         getCkFinalData:function(data){

            let finalStrings = [];

            let questionDesc = '';

            let data1 = data.split('<p>');

            for(let i=0; i < data1.length; i++){

            let ckData = data1[i];

            if(ckData.indexOf('<img') == -1){

                let endInd = data1[i].indexOf('</p>');

                questionDesc =questionDesc + ' ' + data1[i].slice(0,endInd);

            }else{



            while(ckData.indexOf('<img') != -1){

            let imgInd = ckData.indexOf('<img');

            if(imgInd == -1){

                questionDesc = questionDesc + ckData.slice(0,imgInd);

                ckData = ckData.slice(imgInd,ckData.length-1);

            }else{

                if(imgInd != 0){

                    questionDesc = questionDesc +''+ ckData.slice(0,imgInd);

                    ckData = ckData.slice(imgInd,ckData.length-1);

                }

                if(questionDesc){

                    questionDesc = questionDesc+'' + this.getTheTexCode(ckData);

                }else{

                    questionDesc = this.getTheTexCode(ckData);

                }

                let endInd = ckData.search('/>');

                let tempArr = ckData.split("/>");

                ckData ='';

                for(let i=1;i<tempArr.length ;i++){

                   ckData =  ckData+''+tempArr[i];

                }

                ckData = ckData.trim();

                if(ckData.indexOf('<img') == -1){

                    questionDesc = questionDesc+'' + ckData;

                    }

                }

                }

            }

            let temp = questionDesc;

            if(questionDesc.indexOf('&nbsp;') != -1){

                questionDesc ='';

            }

            while(temp.indexOf('&nbsp;') != -1){

                let ind = temp.indexOf('&nbsp;');

                temp = temp.slice(0,ind) +' '+temp.slice(ind+6,temp.length);

            }

            if(temp.indexOf('</p>') != -1){

                temp = temp.slice(0,temp.indexOf('</p>'));

            }

            questionDesc = temp;              

            }

            return questionDesc;

        },

        submitLike(){

            let count = ++this.project.likes

               let likes = {

                   likes:count

               }

             ProjectService.updateProjectLikes(this.id,likes).then((response)=>{
                 console.log("Like Successful")                 
             })

             this.changeLikeColor();

        },

        submitDisLike(){

            let count = ++this.project.disLikes

            let disLikes = {

                disLikes:count

            }

            ProjectService.updateProjectDisLikes(this.id,disLikes).then((response)=>{

                console.log("DisLike Successful")

            })
        },

        submitComment(){

                let obj= {
                    name:this.comment1.name,   
                    comment:this.comment1.comment
                }

             this.comment.push(obj)

          ProjectService.updateProjectComments(this.id,this.comment).then((response)=>{

              console.log(response)

               this.comment1.name=''

               this.comment1.comment=''

              if(response.status == 200){

                  this.GetComments();

              }
          })

        },

         GetComments(){

            ProjectService.getComments(this.id).then((response)=>{
                this.project.comments = []
       
                for(let items in response.data.comments){
                  this.project.comments.push(response.data.comments[items])
                }
            })
        },

    },

   watch:{

         project:{
             deep:true,
             handler(){                
             }
        }

    }

}

</script>
<style scoped>

#container{

    padding: 20px;

}

.addGrades p{

    float: left;
    justify-content: space-between;
    margin:5px;

}

.right{

     float:right;

     /*margin:20px;*/

     margin-right:450px;

     margin-top:120px

}


span{

    margin:5px;

}


#subject{

    float: right;

    margin-top:-45px;

}


#grade{
    margin-right:190px;
}

.shortDesc{

    position:relative;

    display: inline-block;

    margin-left:47%;

    /*margin-top:-20%;*/

    max-width:35%;

}

.subjects{
    margin:40px;
}

.gallery{

    border-top: 1px dotted #ccc;
    margin-top: 15px;
    margin-bottom:15px;

}

.galleryImages{

    float:left;

    border-radius:12px;

    margin-right: 15px;

}

.GradeLevel{
    border-top: 1px dotted #ccc;
    border-bottom: 1px dotted #ccc;
    margin: 15px 0;
    padding-top:15px ;

}

.GradeLevel p{
    position: relative;
    display: inline-block;
    margin-left:4%;

}

.GradeLevel .col-md-3{

    margin-bottom:15px ;

}

.title{

    height:50px;

    color:white;

    margin-top:-40px;

}



.title h1{

    margin-left:20px;

}

.title h2{

    margin-right:20px;

}

.commentInp{

    width:30%;

    margin-right:20%;

    position: relative;

    display:inline-block;

}


.commentBtn{

    float: right;

}


.commentName{

    width:16.5%;

    margin-top:0%;

    position: relative;

    display:inline-block;

}

.countCmmnt{

   margin: 15px 0;

}

.eachComment{

    margin: 10px 10px 10px 0;

    padding: 5px 10px;

    background-color: #dfe3ee;

    border-radius: 8px;

    display: inline-block;

}

.likeBtn{

    float: right;

}

.duration-category{
    padding-top: 12px;
}

.video-info-set{
    margin: 30px 0;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
    padding: 15px 0;

}

.video-info-set span{
    margin:0 15px;

}

.comment h2{
    padding: 0;
    font-size: 18px;
    font-weight: bold;

}

.comment input, .comment textarea{
    width: 100%;
    margin-bottom: 15px;

}

.ReadComments{

    margin-bottom: 15px;

    max-height: 250px;

    overflow: auto;

}

.description-h h2{

    font-size: 18px;

    padding: 0;

    font-weight: bold;

    color: #0b366f;

}

@media screen and (min-width: 1224px) {

    #container{

        width:100%;

    }
}

</style>