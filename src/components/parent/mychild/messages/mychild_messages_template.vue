<template>
  <div class="container-fluid">
   <div class="row">
      <div class="page-layout">
         <div class="row">
            <div class="col-md-3">
               <div class="page-heading"><span v-html="$t('messages')"/></div>
            </div>
         </div>
         <hr>
         <div class="col-lg-12 reset-padding reset-margin">
         </div>
         <!-- <div>
            <label class="col-sm-1 control-label" style="width:8.3%">Child :</label>
            <select class="form-control gradeFilter" v-model="myChildId" @change="selectChild(child)" >
               <option v-for="child in childrens" v-bind:value="child.studentid">{{child.name}}</option>
            </select>
            <br><br>
         </div> -->
        
        <div class="row reset-padding reset-margin">
            <br>
            <div class="col-lg-12 messageborder" v-for="message in messages">
                <div class="col-lg-1">
                    <div class="pull-right">
                    <img class="media-object" data-src="holder.js/64x64" alt="64x64" style="width: 50px; height: 50px; margin-top:5px" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACqUlEQVR4Xu2Y60tiURTFl48STFJMwkQjUTDtixq+Av93P6iBJFTgg1JL8QWBGT4QfDX7gDIyNE3nEBO6D0Rh9+5z9rprr19dTa/XW2KHl4YFYAfwCHAG7HAGgkOQKcAUYAowBZgCO6wAY5AxyBhkDDIGdxgC/M8QY5AxyBhkDDIGGYM7rIAyBgeDAYrFIkajEYxGIwKBAA4PDzckpd+322243W54PJ5P5f6Omh9tqiTAfD5HNpuFVqvFyckJms0m9vf3EY/H1/u9vb0hn89jsVj8kwDfUfNviisJ8PLygru7O4TDYVgsFtDh9Xo9NBrNes9cLgeTybThgKenJ1SrVXGf1WoVDup2u4jFYhiPx1I1P7XVBxcoCVCr1UBfTqcTrVYLe3t7OD8/x/HxsdiOPqNGo9Eo0un02gHkBhJmuVzC7/fj5uYGXq8XZ2dnop5Mzf8iwMPDAxqNBmw2GxwOBx4fHzGdTpFMJkVzNB7UGAmSSqU2RoDmnETQ6XQiOyKRiHCOSk0ZEZQcUKlU8Pz8LA5vNptRr9eFCJQBFHq//szG5eWlGA1ywOnpqQhBapoWPfl+vw+fzweXyyU+U635VRGUBOh0OigUCggGg8IFK/teXV3h/v4ew+Hwj/OQU4gUq/w4ODgQrkkkEmKEVGp+tXm6XkkAOngmk4HBYBAjQA6gEKRmyOL05GnR99vbW9jtdjEGdP319bUIR8oA+pnG5OLiQoghU5OElFlKAtCGr6+vKJfLmEwm64aosd/XbDbbyIBSqSSeNKU+HXzlnFAohKOjI6maMs0rO0B20590n7IDflIzMmdhAfiNEL8R4jdC/EZIJj235R6mAFOAKcAUYApsS6LL9MEUYAowBZgCTAGZ9NyWe5gCTAGmAFOAKbAtiS7TB1Ng1ynwDkxRe58vH3FfAAAAAElFTkSuQmCC">
                    </div>
                </div>
                <div class="col-lg-11">
                    <div class="row">
                        <div class="col-lg-3"  >
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
                            <div class="col-lg-3">
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
      </div>
   </div>
</div>
</template>
<script>
import UserService from '../../../../services/userService.js';
import Multiselect from 'vue-multiselect';
export default {
    components: {
        'multiselect': Multiselect
    },
    //props:['mysubject','school','userdetails','acdemicyearandboard','academicsandboards','userid','myChild'],
    data() {
        return {
            forreply: {
                reply: false
            },
            id: this.$cookie.get('id'),
            messages: [],
            newmessage: {},
            fordispalymessage: this.message,
            options: [],
            recievers: [],
            selected: null,
            senderObj: {},
            replymessagedescription: '',
            school: {},
            userdetails: {},
            pageNumber: 0,
            size: 10,
            userid: this.$cookie.get('userid'),
            childrens: [],
            myChild: {},
            myChildId: 0,
            pageNumber: 0,
            size: 10,
            acdemicyearandboard: this.$store.state.acdemicyearandboard,
        }
    },
    created() {
        this.tenantId = this.$cookie.get('id');
        this.school = this.$store.state.school;
        this.userdetails = this.$store.state.userDetails;
        this.myChild = this.$store.state.myChild;
        this.myChildId = this.myChild && this.myChild.studentid;
        if(this.$store.state.userDetails.userrole == "PARENT"){
        //children
        const parentid = {
            "id": this.userid
        }
        UserService.MyChild(this.tenantId, parentid).then((response) => {
            console.log(JSON.stringify(response.data));
            this.childrens = response.data;
            if (this.childrens.length > 0) {
                if (!this.myChild || !this.myChild.studentid) {
                    this.myChild = this.childrens[0];
                    this.myChildId = this.myChild.studentid;
                }
                this.$store.commit('SET_MY_CHILD', this.myChild);
                this.getParentMessages();
            }
        });
        //children end
        }
        else if(this.$store.state.userDetails.userrole == "STUDENT"){
            this.getParentMessages();
        }
        //  this.senderObj = {
        //         classroomid: this.myChild.classid,
        //         senderid: this.myChild.id
        //     }

    },
    methods: {
        customLabel(option) {
            return `${option.name}`
        },

        getParentMessages: function() {
            this.senderObj = {
                classroomid: this.myChild.classid,
                senderid: this.myChild.id
            }
            UserService.parentMessages(this.tenantId, this.senderObj).then((response) => {

                this.messages = response.data;
                console.log(JSON.stringify(this.messages));
                console.log(JSON.stringify(this.userId));
            })
        },
        // This method will be called when the child is selected
        // selectChild: function(myChild) {
        //     let length = this.childrens.length;
        //     for(let i=0;i<length;i++){
        //         if(this.myChildId == this.childrens[i].studentid){
        //             this.myChild = this.childrens[i];
        //             break;
        //         }
        //     }
        //     this.$store.commit('SET_MY_CHILD', this.myChild);
        //     this.getParentMessages();
        // },
        //End

        Reply(message) {
            console.log(message)
            this.forreply = {
                dateofmessage: message.dateofmessage,
                reply: true,
                recieverid: message.recieverid
            }
        },
        cancelreply() {
            this.forreply = {
                dateofmessage: '',
                reply: false,
                recieverid: ''
            }
        },
        replyformessage(message) {
            var reply = {
                "id": message.id,
                "recieverid": message.senderid,
                "message": this.replymessagedescription,
                "senderid": this.myChild.id,
                "classroomid": this.myChild.classid

            }
            console.log(reply)
            UserService.parentReply(this.tenantId, reply).then((response) => {
                console.log(response);
                if (response.status == 200) {
                    this.forreply = {
                        dateofmessage: '',
                        reply: false,
                        recieverid: ''
                    }
                    UserService.parentMessages(this.tenantId, this.senderObj).then((response) => {
                        this.messages = response.data;
                        console.log(response);
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
