<template id="countdown-template">
  <div class="countdown">
   
    <div class="block">
      <p class="digit"><strong>{{ hours | two_digits }} : {{ minutes | two_digits }} : {{ seconds | two_digits }}</strong></p>
      <p class="text">Hrs : Min : Sec</p>
    </div>
    <!-- <div class="block">
      <p class="digit">{{ minutes | two_digits }}</p>
      <p class="text">Minutes</p>
    </div>
    <div class="block">
      <p class="digit">{{ seconds | two_digits }}</p>
      <p class="text">Seconds</p>
    </div> -->
  </div>
</template>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto+Condensed:400|Roboto:100);
#app {
    align-items: center;
    bottom: 0;
    background-color: #34495e;
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top:0;
}

.countdown {
  display: flex;
}

.block {
    display: flex;
    flex-direction: column;
    margin: 20px;
}

.text {
    color: #1abc9c;
    font-size: 18px;
    font-family: 'Roboto Condensed', serif;
    font-weight: 40;
    margin-top:0px;
    margin-bottom: 10px;
    text-align: center;
}

.digit {
    color:black;
    font-size: 25px;
    font-weight: 100;
    font-family: 'Roboto', serif;
    margin: 0px;
    text-align: center;
    font:bold;
}
</style>
<script>
export default{
    props: {
    date: {
      type: String
    }
  },
data() {
    return {
      now: Math.trunc((new Date()).getTime() / 1000)
    }
  },
  computed: {
    dateInMilliseconds() {
      return Math.trunc(Date.parse(this.date) / 1000)
    },
    seconds() {
      return (this.dateInMilliseconds - this.now) % 60;
    },
    minutes() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60;
    },
    hours() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24;
    },
    days() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24);
    }
  },
   mounted() {
    window.setInterval(() => {
        this.now = Math.trunc((new Date()).getTime() / 1000);
    },1000);
  },
  filters: {
  two_digits: function (value) {
    if (value < 0) {
    return '00';
  }
  if (value.toString().length <= 1) {
    return `0${value}`;
  }
  return value;
}
}
  

}
</script>
