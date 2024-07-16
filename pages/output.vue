<template>
  <div class="output">
    <div v-if="!screenId" class="state screen__select">
      <div
        v-for="screen in $global.screens"
        class="screen__button"
        @click="screenId = screen.id"
      >
        {{ screen.name }}
      </div>
    </div>
    <div v-else class="state output__container">
      <img src="~/assets/images/logo.png" class="logo" />

      <img class="top" src="~/assets/images/lines1.png" />
      <div class="center">
        <div class="text__container">
          <div class="text">
            <div ref="header" class="header">{{ screen.header }}</div>
            <div ref="body" class="body">{{ screen.body }}</div>
          </div>
        </div>
        <img src="~/assets/images/lines2.png" />
      </div>
      <img class="bottom" src="~/assets/images/lines3.png" />
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    screen() {
      return this.$global.screens.find((s) => s.id == this.screenId);
    },
  },
  mounted() {
    let { screenId } = this.$route.query;
    if (screenId) this.screenId = screenId;
  },
  data() {
    return { screenId: null };
  },
};
</script>
<style lang="scss">
@import url("@/assets/fonts/fonts.css");

body {
  margin: 0;
  font-family: Nunito;
}

.output {
  background: #0f0698;
  width: 100dvw;
  height: 100dvh;
  .state {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .screen__select {
    display: flex;
    gap: 20px;
    .screen__button {
      width: 200px;
      height: 60px;
      background: #888;
      border-radius: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      cursor: pointer;
    }
  }
  .output__container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .logo {
      position: absolute;
      top: 0;
      left: 0;
    }

    .top {
      position: absolute;
      top: 0;
      right: 0;
    }
    .center {
      position: relative;
      .text__container {
        position: absolute;
        right: 280px;
        top: 80px;
        bottom: 120px;
        width: 1070px;
        padding: 50px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        .text {
          flex-grow: 1;
          color: #fff;
          display: flex;
          flex-direction: column;
          gap: 30px;
          .header {
            font-size: 4dvw;
            line-height: 4dvw;
          }
          .body {
            font-size: 42px;
          }
        }
      }
    }
    .bottom {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
