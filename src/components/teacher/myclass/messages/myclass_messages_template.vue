<template>
   <div>
        <div class="row">
        <div class="col-lg-12 text-left" >
           <h3 class="student-head"><span v-html="$t('messages')"/></h3>
           <hr>
        </div>
        </div>
        <div class="row">
            <div class="col-sm-2 pull-right">
                <a tag="button" class="btn newmessage pull-right"  active-link="active" data-toggle="modal" href="#message"> New Message</a>
            </div>
        </div>
        <div class="row reset-padding reset-margin">
            <div class="col-lg-12 messageborder" v-for="message in messages">
                <div class="col-lg-1">
                    <div class="pull-right">
                    <img class="media-object" data-src="holder.js/64x64" alt="64x64" style="width: 50px; height: 50px; margin-top:5px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACqUlEQVR4Xu2Y60tiURTFl48STFJMwkQjUTDtixq+Av93P6iBJFTgg1JL8QWBGT4QfDX7gDIyNE3nEBO6D0Rh9+5z9rprr19dTa/XW2KHl4YFYAfwCHAG7HAGgkOQKcAUYAowBZgCO6wAY5AxyBhkDDIGdxgC/M8QY5AxyBhkDDIGGYM7rIAyBgeDAYrFIkajEYxGIwKBAA4PDzckpd+322243W54PJ5P5f6Omh9tqiTAfD5HNpuFVqvFyckJms0m9vf3EY/H1/u9vb0hn89jsVj8kwDfUfNviisJ8PLygru7O4TDYVgsFtDh9Xo9NBrNes9cLgeTybThgKenJ1SrVXGf1WoVDup2u4jFYhiPx1I1P7XVBxcoCVCr1UBfTqcTrVYLe3t7OD8/x/HxsdiOPqNGo9Eo0un02gHkBhJmuVzC7/fj5uYGXq8XZ2dnop5Mzf8iwMPDAxqNBmw2GxwOBx4fHzGdTpFMJkVzNB7UGAmSSqU2RoDmnETQ6XQiOyKRiHCOSk0ZEZQcUKlU8Pz8LA5vNptRr9eFCJQBFHq//szG5eWlGA1ywOnpqQhBapoWPfl+vw+fzweXyyU+U635VRGUBOh0OigUCggGg8IFK/teXV3h/v4ew+Hwj/OQU4gUq/w4ODgQrkkkEmKEVGp+tXm6XkkAOngmk4HBYBAjQA6gEKRmyOL05GnR99vbW9jtdjEGdP319bUIR8oA+pnG5OLiQoghU5OElFlKAtCGr6+vKJfLmEwm64aosd/XbDbbyIBSqSSeNKU+HXzlnFAohKOjI6maMs0rO0B20590n7IDflIzMmdhAfiNEL8R4jdC/EZIJj235R6mAFOAKcAUYApsS6LL9MEUYAowBZgCTAGZ9NyWe5gCTAGmAFOAKbAtiS7TB1Ng1ynwDkxRe58vH3FfAAAAAElFTkSuQmCC">
                    </div>
                </div>
                <div class="col-lg-11">
                    <div class="row">
                        <div class="col-lg-3"  v-if="message.sentflag=='T'">
                            <h4><b>{{message.sendername}}</b></h4>
                        </div>
                        <div class="col-lg-6">
                            <h6><b>{{message.dateofmessage}}</b></h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <p>{{message.message}}</p>
                        </div>
                    </div>
                    <div class="row reset-padding reset-margin" style="margin-right:30px">
                        <h4><a  v-on:click.prevent="Reply(message)">Reply</a></h4>
                    </div>
                </div>
                <div class="row reset-padding reset-margin ">
                    <div class="col-lg-1">
                        <div class="pull-right">
                            <h6><b><u>Replies</u></b></h6>
                        </div>
                    </div>
                </div>
                <div class="row" v-if="forreply.reply==true && forreply.dateofmessage==message.dateofmessage && forreply.recieverid==message.recieverid">
                    <div class="col-lg-12 ">
                        <div class="row ">
                            <div class="col-md-1">
                            </div>
                            <div class="col-md-1">
                                <div class="pull-right">
                                    <label for="class">Message</label>
                                </div>
                            </div>
                            <div class="col-md-3">
                                <textarea name="description" class="form-control" rows="4" cols="50" placeholder="Description.......*"  v-model="replymessagedescription" required></textarea>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-lg-6 text-center">
                                <button id="btn-reset"  class="btn button" v-on:click.prevent="cancelreply"> cancel</button>
                                <button id="btn-Register" type="submit" name="submit" v-on:click="replyformessage(message)" class="btn button" ng-disabled="replymessageform.$invalid"> 
                                    Send</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row replies">
                <div class="col-lg-12" v-for="reply in message.replymessages">
                    <div class="col-lg-1">
                        <div class="pull-right">
                    <img class="media-object" data-src="holder.js/64x64" alt="64x64" style="width: 50px; height: 50px; margin-top:1px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACqUlEQVR4Xu2Y60tiURTFl48STFJMwkQjUTDtixq+Av93P6iBJFTgg1JL8QWBGT4QfDX7gDIyNE3nEBO6D0Rh9+5z9rprr19dTa/XW2KHl4YFYAfwCHAG7HAGgkOQKcAUYAowBZgCO6wAY5AxyBhkDDIGdxgC/M8QY5AxyBhkDDIGGYM7rIAyBgeDAYrFIkajEYxGIwKBAA4PDzckpd+322243W54PJ5P5f6Omh9tqiTAfD5HNpuFVqvFyckJms0m9vf3EY/H1/u9vb0hn89jsVj8kwDfUfNviisJ8PLygru7O4TDYVgsFtDh9Xo9NBrNes9cLgeTybThgKenJ1SrVXGf1WoVDup2u4jFYhiPx1I1P7XVBxcoCVCr1UBfTqcTrVYLe3t7OD8/x/HxsdiOPqNGo9Eo0un02gHkBhJmuVzC7/fj5uYGXq8XZ2dnop5Mzf8iwMPDAxqNBmw2GxwOBx4fHzGdTpFMJkVzNB7UGAmSSqU2RoDmnETQ6XQiOyKRiHCOSk0ZEZQcUKlU8Pz8LA5vNptRr9eFCJQBFHq//szG5eWlGA1ywOnpqQhBapoWPfl+vw+fzweXyyU+U635VRGUBOh0OigUCggGg8IFK/teXV3h/v4ew+Hwj/OQU4gUq/w4ODgQrkkkEmKEVGp+tXm6XkkAOngmk4HBYBAjQA6gEKRmyOL05GnR99vbW9jtdjEGdP319bUIR8oA+pnG5OLiQoghU5OElFlKAtCGr6+vKJfLmEwm64aosd/XbDbbyIBSqSSeNKU+HXzlnFAohKOjI6maMs0rO0B20590n7IDflIzMmdhAfiNEL8R4jdC/EZIJj235R6mAFOAKcAUYApsS6LL9MEUYAowBZgCTAGZ9NyWe5gCTAGmAFOAKbAtiS7TB1Ng1ynwDkxRe58vH3FfAAAAAElFTkSuQmCC">
                    </div>
                    </div>
                    <div class="col-lg-11">
                    <div class="row">
                 <!-- <div class="col-lg-3"  v-if="reply.sentflag=='T'">  this condition can't displaying the replied students names-->
                        <div class="col-lg-3" >
                            <h4><b>{{reply.sendername}}</b></h4>
                        </div>
                        <div class="col-lg-6">
                            <h6><b>{{reply.dateofmessage}}</b></h6>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-4">
                            <p>{{reply.message}}</p>
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </div>
        </div>
        
        <div id="message" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">New Message</h4>
                    </div>
                    <div class="modal-body">
                        <form>
                            <div class="row">
                                <div class="col-lg-4">
                                    <label>Students</label>
                                </div>
                                <div class="col-md-8 ">
                                    <multiselect v-model="newmessage.students" :options="options" :multiple="true" >
                                    </multiselect>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Message</label>
                                </div>
                                <div class="col-md-8">
                                    <textarea name="description" class="form-control" rows="4" cols="50" placeholder="Description.......*"  v-model="newmessage.message" required></textarea>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" type="reset" class="btn button"> Reset</button>
                                    <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="Newmessage" class="btn button">Send</button>
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
    import Multiselect from 'vue-multiselect';
    export default{
        components: {Multiselect},
        props:['myclass','school','userdetails','acdemicyearandboard','academicsandboards'],
        data(){
            return{
                forreply:{
                    reply:false
                },
                id:this.$cookie.get('id'),
                messages:[],
                newmessage:{},
                fordispalymessage:this.message,
                options:[],
                recievers:[],
                selected: null,
                sectionid:{
                    id:this.myclass.id
                },
                userid:this.$cookie.get("userid"),
                teacherid:{
                classroomid:this.myclass.id,
                senderid:this.$cookie.get("userid")
            },
            replymessagedescription:''
        }
        },
        created(){
            UserService.ClassTeacherMessages(this.id,this.teacherid).then((response)=>{
                console.log(response);
                this.messages=response.data;
            }),
            UserService.ClassRoomStudents(this.id,this.sectionid).then((response)=>{
                let studentsList=response.data;
                for(let i=0;i<studentsList.length;i++){
                    let str = studentsList[i].id+" "+studentsList[i].name
                    this.options.push(str);
                }
            })
        },
        //  watch:{
        //     getUserId(newValue){
        //         this.userid=newValue;
        //     }
        // },
        // computed: {
        //     getUserId() {
        //       return this.userid;
        //     }
        // },
        methods:{
            customLabel (option) {
                return `${option.name}`
            },
            Newmessage:function(){
                this.forreply.reply=false;
                let allStudentsStatus =false;
                this.recievers=[];
                let studentsIdsList=[];
                for(let i=0;i<this.newmessage.students.length;i++){
                    let ids = this.newmessage.students[i].split(" ");
                    studentsIdsList.push(ids[0])
                }
                for(var i=0;i<studentsIdsList.length;i++){
                    var studentid=studentsIdsList[i];
                     this.recievers.push(studentid);
                     if(studentsIdsList[i]==-1){
                       allStudentsStatus= true;
                    }
                }
                // this.recievers.push(studentid)
                if(allStudentsStatus==true){
                  this.recievers=[];
                  this.recievers.push(-1);
              }
                var sendmessage={
                    "senderid":this.userid,
                    "recievers":this.recievers,
                    "message":this.newmessage.message,
                    "classroomid":this.myclass.id
                }
            console.log(sendmessage);
            UserService.MyclassNewMessage(this.id,sendmessage).then((response)=>{
                console.log(response);
                this.newmessage.students=[];
                this.newmessage.message="";
                if(response.status==200){
                     $('#message').modal('hide');
                    UserService.ClassTeacherMessages(this.id,this.teacherid).then((response)=>{
                        this.messages=response.data;
                    })

                }

            })
            },
            Reply(message){
                console.log(message)
                this.forreply={
                    dateofmessage:message.dateofmessage,
                    reply:true,
                    recieverid:message.recieverid
                }
         
            },
            cancelreply(){
                  this.forreply={
                    dateofmessage:'',
                    reply:false,
                    recieverid:''
                }
            },
            replyformessage(message){
                var reply={
                    "id":message.id,
                    "recieverid":message.recieverid,
                    "message":this.replymessagedescription,
                    "senderid":this.userid
                }
                console.log(reply)
                UserService.MyclassNewMessage(this.id,reply).then((response)=>{
                    console.log(response);
                        if(response.status==200){
                            this.forreply={
                                dateofmessage:'',
                                reply:false,
                                recieverid:''
                            }
                            UserService.ClassTeacherMessages(this.id,this.teacherid).then((response)=>{
                                this.messages=response.data;
                            })

                        }
                    })
                }
            }
        }
</script>
<style>
.newmessage{
    background-color: #039be5;
    background-image: none;
    border-color: #039be5;
    color:white;
    padding: 5px 30px;
    margin-top: -2px;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    text-decoration:none;
    border-radius:0px
}
.newmessage:hover{
    color:white;
}
.reset-padding
{
    padding: 0;
} 
.reset-margin{
    margin: 0;
}
.messageborder{
  border:1px solid #eee;
  margin-top: 4px;
}
.messagenamealign{
  margin-left: 10px;
}
.messagedatealign{
  margin-right: -30px;
}
.messagedescriptionalign{
  margin-left: 10px;
}
.replies{
    margin-left: 30px;
}
.button{
background-color:#0b366f;
}
.btn{
    border-radius:0px;
    color:#fff
}
.button:hover{
    background-color:#6495ED;
}
.btn:hover{
    border-radius:0px;
    color:#fff
}
</style>
  
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>