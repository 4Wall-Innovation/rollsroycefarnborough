<template>
  <div class="index">
    <Takeover class="card" />
    <Announcements class="card" />
  </div>
</template>

<script>
export default {};
</script>
<style lang="scss">
@import url("@/assets/fonts/fonts.css");

body {
  margin: 0;
  font-family: Nunito;
}

.index {
  color: #fff;
  background: #000;
  width: 100vw;
  height: 100vh;
  padding: 30px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  gap: 40px;

  .card {
    display: flex;
    gap: 30px;
    background: #333;
    width: 100%;
    padding: 46px;
    box-sizing: border-box;
    .icon {
      padding-top: 7px;
      img {
        width: 36px;
        object-fit: contain;
      }
    }
    .content {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      gap: 30px;
      .header {
        display: flex;
        justify-content: space-between;

        .text {
          .title {
            font-size: 30px;
            font-weight: bold;
          }
          .subtitle {
            font-size: 16px;
            font-style: italic;
            color: #999;
            font-family: Lato;
          }
        }
      }
    }
  }
  .pill__button {
    width: 90px;
    height: 40px;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    font-family: Lato;
    font-weight: bold;
    background: #555;
    pointer-events: none;
    &.active {
      pointer-events: auto;
      background: #fff;
    }
  }
}
</style>
