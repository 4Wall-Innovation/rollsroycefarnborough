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
      <img
        :src="`backgrounds/${screen.id}-${screen.template}.png`"
        class="background"
      />

      <div class="text" :class="screen.id">
        <div ref="header" class="header">{{ screen.header }}</div>
        <div ref="body" class="body">{{ screen.body }}</div>
      </div>
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
}

.output {
  font-family: RRPioneer;
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
    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 0;
      object-fit: cover;
    }
    .logo {
      position: absolute;
      top: 0;
      left: 0;
    }

    .text {
      position: absolute;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-grow: 1;
      color: #fff;
      display: flex;
      flex-direction: column;

      &.A {
        left: 166px;
        top: 645px;
        width: 900px;
        height: 430px;
        .header {
          font-size: 50px;
          line-height: 58px;
        }
        .body {
          font-size: 37px;
          line-height: 44px;
        }
      }
      &.B {
        left: 140px;
        top: 370px;
        width: 670px;
        height: 280px;
        .header {
          font-size: 36px;
          line-height: 42px;
        }
        .body {
          font-size: 32px;
          line-height: 36px;
        }
      }

      .header {
        font-weight: bold;
      }
    }
  }
}
</style>
