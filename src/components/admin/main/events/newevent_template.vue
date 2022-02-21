<template>
    <div>
        <div class="row reset-padding reset-margin">
            <div class="col-lg-12 text-left">
                <h3 class="student-head">New Event</h3>
                <hr>
            </div>
        </div>
        <div class="panel posteventpanel col-lg-6 col-lg-offset-3">
            <div class="panel-body">
                <form class="form-horizantal" name="posteventform">
                    <div class="col-lg-12">
                        <div class="row">
                            <div class="col-md-4">
                                <label>Event Date</label>
                            </div>
                            <div class="col-md-8">
                                <date-picker lang="en"  v-model="event.eventdate"></date-picker>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="class">Event Name</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" name="eventname" placeholder="Event Name*" v-model="event.eventname" required>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="class">Chief Guest</label>
                            </div>
                            <div class="col-md-8">
                                <input type="text" class="form-control" name="cheifguest" placeholder="Cheif Guest*" v-model="event.chiefguest"  required>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-md-4">
                                <label for="class">Description</label>
                            </div>
                            <div class="col-md-8">
                                <textarea name="description" class="form-control" rows="7" cols="50" placeholder="Description.......*"  v-model="event.description" required></textarea>
                            </div>
                        </div>
                        <br>
                        <div class="row">
                            <div class="col-lg-6 col-lg-offset-3 text-center">
                                <button id="btn-reset" type="reset" class="btn button"> Reset</button>
                                <button id="btn-Register" type="submit" name="submit" v-on:click.prevent="newevent" class="btn button" >Post</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import DatePicker from "vue2-datepicker";
import UserService from "../../../../services/userService.js";
export default {
  components: { DatePicker },
  props: ["school", "userdetails"],
  data() {
    return {
      event: {},
      id: this.$cookie.get("id")
    };
  },
  methods: {
    newevent: function() {
      console.log(this.event);
      var event = {
        eventdate: this.event.eventdate.getTime(),
        eventname: this.event.eventname,
        chiefguest: this.event.chiefguest,
        description: this.event.description
      };
      console.log(event);
      UserService.NewEvent(event, this.id)
        .then(response => {
          if (response.status == 200) {
            this.$router.push("/admin/events");
          }
        })
        .catch(error => {
          console.log(error.response.data);
        });
    }
  }
};
</script>
