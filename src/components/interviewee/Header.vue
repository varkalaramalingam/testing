<template>
  <header class="contaioner">
    <nav class="navbar navbar-right navbar-fixed-top">
      <div class="col-md-offset-1 navbar-header">
        <router-link to="/"
          ><img
            src="../../assets/omniwyse-assets/images/omniwyse.png"
            height="50"
            style="padding: 7px 0"
        /></router-link>
        <button
          type="button"
          class="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#linkpages"
        >
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
      </div>
      <ul class="nav navbar-nav navbar-right">
        <li>
          <router-link
            to="/"
            active-class="active"
            class="btn btn-clear btn-sm btn-min-block"
            >HOME</router-link
          >
        </li>
        <li>
          <router-link
            to="/about"
            active-class="active"
            class="btn btn-clear btn-sm btn-min-block"
            >ABOUT</router-link
          >
        </li>
        <li>
          <router-link
            to="/login"
            active-class="active"
            v-on:click.native="errormessage()"
            class="btn btn-clear btn-sm btn-min-block"
            >LOGIN</router-link
          >
        </li>
      </ul>
    </nav>
  </header>
</template>
<script>
export default {
  name: "IntervieweeHomeHeader",
  props: [
    "school",
    "userdetails",
    "academicsandboards",
    "acdemicyearandboard",
    "error"
  ]
};
</script>
