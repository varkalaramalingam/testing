<template>
  <div>
    <iframe
      title="zoom-coneference"
      allow="camera; microphone"
      id="iframe"
      class="full-screen-iframe"
      src="https://video.wisereads.in/"
      style="height: 100%; padding: 0px"
    />
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.full-screen-iframe {
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: absolute;
}
</style>
