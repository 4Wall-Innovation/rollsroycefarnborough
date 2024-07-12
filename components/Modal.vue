<template>
  <div v-if="show" class="modal">
    <div class="container">
      <div class="text">{{ text }}</div>
      <div class="buttons">
        <div class="button" @click="cancel()">CANCEL</div>
        <div class="button selected" @click="okay()">YES</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return { show: false, text: "", data: null };
  },
  methods: {
    showModal(text, data) {
      this.text = text;
      this.show = true;
      this.data = data;
    },
    cancel() {
      this.show = false;
      this.$emit("cancel", this.data);
    },
    okay() {
      this.show = false;
      this.$emit("okay", this.data);
    },
  },
};
</script>
<style lang="scss">
.modal {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #888d;
  .container {
    display: flex;
    flex-direction: column;
    gap: 30px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    color: #000;
    .text {
      font-weight: 500;
      font-size: 25px;
      max-width: 320px;
      text-align: center;
    }
    .buttons {
      display: flex;
      justify-content: space-around;
      .button {
        width: 120px;
        height: 50px;
        border-radius: 30px;
        border: 3px solid #000;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
        color: #000;
        &.selected {
          background: #000;
          color: #fff;
        }
      }
    }
  }
}
</style>
