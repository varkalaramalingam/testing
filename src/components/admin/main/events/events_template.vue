<template>
<div class="page-layout">
        <div class="row">
            <div class="col-lg-6">
                <div class="page-heading"><span v-html="$t('events')"/></div>
            </div>
            <div class="col-lg-6 text-right">
            <router-link to="/admin/newevent" tag="button" class="common-button">New Event</router-link>
    </div>
    </div>
    <hr/>
    <div class="eventstable">
        <div class="divTable">
            <div class="divTableBody">
                <div class="divTableRow">
                    <div class="divTableCell">Event Date</div>
                    <div class="divTableCell">Event Name</div>
                    <div class="divTableCell">Chief Guest</div>
                    <div class="divTableCell">Description</div>
                    <div class="divTableCell">Edit</div>
                    <div class="divTableCell">Delete</div>
                </div>
                <div class="divTableRowdata" v-for="event in events">
                    <div class="divTableCelldata">{{getEventDate(event.eventdate)}}</div>
                    <div class="divTableCelldata">{{event.eventname}}</div>
                    <div class="divTableCelldata">{{event.chiefguest}}</div>
                    <div class="divTableCelldata">{{event.description}}</div>
                    <div class="divTableCelldata"><a data-toggle="modal" href="#editevents" v-on:click.prevent="setEvent(event)"><i class="fa fa-pencil-square-o fa-1x" aria-hidden="true"></i></a></div>
                    <div class="divTableCelldata"><a data-toggle="modal" v-on:click.prevent="deleteevent(event)"><i class="fa fa-trash fa-1x" aria-hidden="true"></i></a></div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="editevents" role="dialog" name="editeventsmodal">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                        <h4 class="modal-title">Edit Events</h4>
                    </div>
                    <div class="modal-body">
                        <form name="editeventsmodal">
                            <div class="row">
                                <div class="col-md-4">
                                    <label>Event Date</label>
                                </div>
                                <div class="col-md-8 ">
                                    <date-picker lang="en" v-model="eventdate"></date-picker>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Event Name</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="eventname" placeholder="Event name*" v-model="event.eventname" required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Chief Guest</label>
                                </div>
                                <div class="col-md-8">
                                    <input type="text" class="form-control" name="cheifguest" placeholder="cheifguest*" v-model="event.chiefguest"  required>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-md-4">
                                    <label for="class">Description</label>
                                </div>
                                <div class="col-md-8">
                                    <textarea name="description" class="form-control" rows="7" cols="50" placeholder="description"  v-model="event.description" required></textarea>
                                </div>
                            </div>
                            <br>
                            <div class="row">
                                <div class="col-lg-6 col-lg-offset-3 text-center">
                                    <button id="btn-reset" data-dismiss="modal" class="btn button">Cancel</button>
                                    <button id="btn-post" type="post" name="post" v-on:click.prevent="editevent" class="btn button" >Update</button>
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
            events:[],
            event:{},
            eventdate:'',
            id:this.$cookie.get('id')
        }
    },
    created(){
        UserService.Events(this.id).then((response)=>{
            this.events=response.data;
        }).catch((error)=>{
            console.log(error.response.data);
        })
    },
    methods:{
        deleteevent:function(event){
            var eventid={
                "id":event.id
            }
            console.log(eventid)
            UserService.DeleteEvent(eventid,this.id).then((response)=>{
                if(response.status==200){
                    UserService.Events(this.id).then((response)=>{
                        this.events=response.data;
                    })
                }
            }).catch((error)=>{
                console.log(error.response.data)
            })
        },
        setEvent:function(event){
            this.event=event;
            this.eventdate=new Date();
            this.eventdate.setTime(event.eventdate);
        },
        editevent:function(){
            var editevent={
                "id":this.event.id,
                "eventdate":this.eventdate.getTime(),
                "eventname":this.event.eventname,
                "chiefguest":this.event.chiefguest,
                "description":this.event.description

            }
            UserService.UpdateEvent(editevent,this.id).then((response)=>{
                  $('#editevents').modal('hide');
            }).catch((error)=>{
                console.log((error.response.data))
            })
        },
        getEventDate:function(date){
            return moment(date).format('DD/MM/YYYY')
        }
    }


}
</script>
<style scoped>
.eventstable{
width:100%;
}
.reset-padding
{
padding: 0;
} 
.reset-margin{
 margin: 0;
}



</style>
