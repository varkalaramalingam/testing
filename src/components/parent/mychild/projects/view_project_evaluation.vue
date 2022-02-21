<template>
     <div class="container">
       <div class="col-lg-12">
         <div class="col-lg-6 text-left">
             <h3 class="student-head">{{this.project.name}}</h3>
             <h4>Max Marks : {{this.project.max_marks}}</h4>
         </div>
       <div v-show="status">  
         <div class="col-lg-12">
             <div v-for="group in skills" class="container home-page">
                 <h2>{{group[0].skillgroupname}}</h2>
                 <div v-for="skill in group">
                     <div class="row mb-15">
                     <div class="col-md-2"><p>{{skill.skillname}}</p></div>
                     <div class="col-md-15">{{skill.score}}</div>
                     </div>

                 </div>
             </div>
               <div class="col-lg-12">
                 <div class="row mb-15">
                     <!--<div v-for="totalScore in overallScore"> -->
                            <div class="list-group-item">
                                <strong>Secured Marks</strong>
                                <div>{{this.project.secured_marks}}</div>
                            </div>
                            <div class="list-group-item">
                                <strong>Feedback</strong>
                                <p>{{this.project.feedback}}</p>
                                </div>
                     <!-- </div>-->
                      <br>
                  </div>
               </div>
         </div>
        </div>
         <!---- -->
         <div class="col-lg-12" v-show="!status">
              <div class="container home-page">
              <h2>{{this.project.status}}</h2>
             <h3>{{this.msg}}</h3>
             </div>
         </div>
     </div>
    </div>
</template>
<script>
import UserService from  '../../../../services/userService';

export default {
    data(){
        return{
            tenantId:this.$cookie.get("id"),
            project:this.$store.state.projectDetails,
            studentid:0,
            myChild:{},
            skills:[],
            overallScore:[],
            status:true,
            msg:''

        }
    } ,
    
    created(){
         
         console.log(this.project);

         
         this.myChild = this.$store.state.myChild;
         this.studentid = this.myChild.studentid;

         //this.status = (this.project.status == 'Evaluated') ? true:false;

         this.getSkills();

         this.getStatus();

         //this.getProjectOverallScore();

    },
    methods:{

        getSkills(){
            UserService.getSkills(this.tenantId).then((response)=>{
                let skills1 = response.data;

                UserService.getProjectScoresById(this.tenantId,this.studentid,this.project.id).then((response)=>{
                    console.log(response)

                     for(let obj in skills1){
                      let items = Object.values(skills1[obj])
                     for(let item of items){
                       for(let score in response.data){
                         // console.log(score +" "+response.data[score])
                          if(score == item.id)
                           item.score = response.data[score];
                        }
            
                   }
                }
                this.skills = skills1;

                })

            })            
        },

        getStatus(){
            if(this.project.status == 'Evaluated'){

                this.status = true;

            }else if(this.project.status == 'submitted'){

                 this.status = false;
                 this.msg = 'Evaluation in progess...'
               
            }else{

                this.status = false;

            }
        }


    }
}
</script>
<style scoped>
.col-md-2{
    margin-left:80px;
}

.home-page {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
  margin: 15px auto;
  background: #fff;
}
</style>