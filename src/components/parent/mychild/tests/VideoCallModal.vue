<script>
import WhiteBoard from "./WhiteBoard";
import UserService from "../../../../services/userService.js";
import ZoomMeeting from "../../../zoom-meeting/ZoomMeeting";
export default {
  name: "modal",
  components: { WhiteBoard, ZoomMeeting },
  props: ["sessionKeys", "sectionId", "whiteBoardSessionKey", "subjectId"],
  created() {
    window.addEventListener("message", message => {
      const { origin, data: { callEnded } = {} } = message || {};
      if (origin && (origin.includes("wysemeet.in") || origin.includes("8080")))
        if (callEnded) this.close();
    });
    window.onbeforeunload = function(event) {
      const iframe = document.getElementById("iframe");
      iframe &&
        iframe.contentWindow.postMessage(
          {
            callEnded: "yes"
          },
          "*"
        );
    };
  },
  data() {
    return {
      tabName: "whiteboard",
      tenantId: this.$cookie.get("tenant"),
      buttons: [
        {
          buttonName: "White board",
          btnVal: "whiteboard"
        },
        {
          buttonName: "Video call",
          btnVal: "videocall"
        }
        // We will enable it once we get zoom requirement like replacement for wysemeet
        // {
        //   buttonName: "Zoom meeting",
        //   btnVal: "zoomMeeting"
        // }
      ],
      sessionKeyVal:
        this.sessionKeys && this.sessionKeys.length > 0
          ? this.sessionKeys[0]
          : ""
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    sendMessage: function(data) {
      const iframe = document.getElementById("iframe");
      iframe && iframe.contentWindow.postMessage(data, "*");
    },
    callInitiateMessage: function() {
      if (this.sessionKeys && this.sessionKeys.length > 0)
        this.sendMessage({
          token: this.$cookie.get("authorization"),
          tenantId: this.$cookie.get("tenant"),
          meetingUrl: "",
          meetingId: this.sessionKeys[0]
        });
    },
    endCallMessage: function() {
      this.sendMessage({
        callEnded: "yes"
      });

      this.close();
    },
    changeTab: function(tab) {
      this.tabName = tab;
    }
  }
};
</script>
<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <div
            style="
              display: flex;
              margin-left: 10px;
              height: 50px;
              margin-top: 10px;
            "
          >
            <button
              v-bind:key="button.btnVal"
              v-for="button in buttons"
              :class="[
                'btn-tab',
                tabName === button.btnVal ? 'active-btn' : '',
              ]"
              @click="changeTab(button.btnVal)"
            >
              {{ button.buttonName }}
            </button>
          </div>
          <slot name="header">
            <button
              type="button"
              class="btn-close"
              @click="endCallMessage"
              aria-label="Close modal"
            >
              X
            </button>
          </slot>
        </header>
        <section
          class="modal-body"
          style="height: 94vh; padding: 0px"
          id="modalDescription"
        >
          <WhiteBoard
            v-show="tabName === 'whiteboard'"
            :sectionId="sectionId"
            :subjectId="subjectId"
            :sessionKey="sessionKeyVal"
            :whiteBoardSessionKey="whiteBoardSessionKey"
          />
          <!-- <ZoomMeeting v-show="tabName === 'zoomMeeting'" /> -->
          <iframe
            title="wsye-coneference"
            allow="camera; microphone"
            id="iframe"
            class="full-screen-iframe"
            src="https://wysemeet.in/"
            @load="callInitiateMessage"
            v-show="tabName === 'videocall'"
          />
        </section>
      </div>
    </div>
  </transition>
</template>
<style>
.full-screen-iframe {
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: absolute;
}
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 5px;
  display: flex;
}

.modal-header {
  border-bottom: 1px solid #eeeeee;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
}

.btn-close {
  border: none;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
  font-weight: bold;
  background: transparent;
}
.btn-tab {
  border: none;
  border-radius: 5px;
  background-color: #ebeef0;
  font-weight: bold;
  font-family: Arial, Liberation Sans, DejaVu Sans, sans-serif;
}
.active-btn {
  background-color: #039be5;
  color: white;
}
</style>
