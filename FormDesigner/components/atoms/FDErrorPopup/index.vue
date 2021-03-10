<template>
  <div class="overlay" :style="overlayStyle">
    <div class="outer-error-div popup">
      <div class="header-error">
        <div>
          <span>{{ info ? 'Font' : 'Visual Basic for Applications IDE'}}</span>
        </div>
        <div>
          <button class="ui-btn close" @click="isOpen=false">
            <svg viewBox="0 0 10 10">
              <polygon
                points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1"
              />
            </svg>
          </button>
        </div>
      </div>
      <div class="body-error">
        <div class="blank-body-div"></div>
        <div class="body-center-error">
          <div class="left-right-gap"></div>
          <div>
            <img v-if="overflow"
              alt="Caution"
              src="../../../../assets/pop-up-caution.jpg"
              class="err-msg"
            />
            <img v-if="invalid"
              alt="Invalid"
              src="../../../../assets/invalid1.jpg"
              class="err-msg"
            />
            <img v-if="info"
              alt="Info"
              src="../../../../assets/info-icon.png"
              class="err-msg"
            />
          </div>
          <div class="error-message">{{errorMessage}}</div>
          <div class="left-right-gap"></div>
        </div>
        <div class="blank-body-div"></div>
      </div>
      <div class="footer-error">
        <div></div>
        <button @click="isOpen=false">OK</button>
        <button v-if="invalid || overflow" @click="isOpen=false">Help</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { EventBus } from '@/FormDesigner/event-bus'
import { Component, Vue } from 'vue-property-decorator'
@Component({
  name: 'FDErrorPopup'
})
export default class FDErrorPopup extends Vue {
      overflow: boolean = false
      invalid: boolean = false
      errorMessage: string = ''
      isOpen: boolean = false
      info: boolean = false
      get overlayStyle () {
        return {
          visibility: this.isOpen ? 'visible' : 'hidden',
          opacity: this.isOpen ? 1 : 0
        }
      }
      mounted () {
        EventBus.$on('showErrorPopup', (show: boolean, type: string, message : string) => {
          if (type === 'invalid') {
            this.invalid = show
            this.overflow = false
            this.info = false
          } else if (type === 'overflow') {
            this.overflow = show
            this.invalid = false
            this.info = false
          } else {
            this.info = show
            this.invalid = false
            this.overflow = false
          }
          this.isOpen = show
          this.errorMessage = message
        })
      }
      destroyed () {
        EventBus.$off('showErrorPopup')
      }
}
</script>

<style scoped>
.err-msg {
    height:30px;
    width:30px;
    float:right
}
.overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  visibility: hidden;
  opacity: 0;
  z-index: 110;
}
.popup {
  background: #fff;
  border-radius: 5px;
  width: 30%;
  position: relative;
}

@media screen and (max-width: 700px) {
  .popup {
    width: 70%;
  }
}

.outer-error-div {
  position: relative;
  top: 43%;
  left: 45%;
  border: 1px solid black;
  min-width: 252px;
  width: fit-content;
  max-width: 415px;
  min-height: 168px;
  height: fit-content;
}
.header-error {
  display: grid;
  grid-template-columns: 90% 10%;
}
.error-body {
  display: grid;
  grid-template-columns: 1fr;
}
.body-center-error {
  display: grid;
  grid-template-columns: 20px 30px 4fr 20px;
}
.footer-error {
  display: grid;
  grid-template-columns: 1fr 85px 85px;
  background-color: rgb(238, 238, 238);
  height: 50px;
}
.footer-error > button {
  height: 25px;
  width: 75px;
  margin-top: 14px;
  box-shadow: 1px 1px gray;
}
.blank-body-div {
  height: 31px;
}
.left-right-gap {
  width: 20px;
}
span {
  font-size: 13px;
  padding-left: 7px;
  padding-top: 3px;
}
.error-message {
  padding: 6px;
  font-size: 13px;
}

.ui-btn {
  margin: 0;
  width: 33px;
  height: 25px;
  border: 0;
  outline: 0;
  background: transparent;
}
.ui-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
.ui-btn.close {
  background: white;
  float: right;
}
.ui-btn:hover {
  background: #e81123;
  color: white;
}
.ui-btn svg path,
.ui-btn svg rect,
.ui-btn svg polygon {
  fill: white;
}
.ui-btn svg {
  width: 10px;
  height: 10px;
  stroke: gray;
}
.ui-btn svg:hover {
  width: 10px;
  height: 10px;
  stroke: white;
}
</style>
