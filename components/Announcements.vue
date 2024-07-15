<template>
  <div class="announcements">
    <div class="icon">
      <img src="~/assets/icons/announcement.png" />
    </div>
    <div class="content">
      <div class="header">
        <div class="text">
          <div class="title">Announcements</div>
          <div class="subtitle">AMEND TEXT BELOW AND TOGGLE VISIBILITY</div>
        </div>
      </div>
      <div class="screens">
        <div v-for="screen in $global.screens" class="screen">
          <div class="screen__header">
            <div class="title">{{ screen.id }}: {{ screen.name }}</div>
            <div class="switch" @click="toggleScreen(screen)">
              <img v-if="!screen.showing" src="~/assets/icons/off.png" />
              <img v-else src="~/assets/icons/on.png" />
            </div>
          </div>
          <div class="textbox__container">
            <div class="title">Header</div>
            <textarea
              v-model="screen.header"
              :maxlength="maxHeaderLength"
              @input="startEdit(screen.id, 'header')"
            />
            <div v-if="screen.editing" class="character__count">
              {{ screen.header.length }}/{{ maxHeaderLength }}
            </div>
          </div>
          <div class="textbox__container">
            <div class="title">Body copy</div>
            <textarea
              v-model="screen.body"
              :maxlength="maxBodyLength"
              @input="startEdit(screen.id, 'body')"
            />
            <div v-if="screen.editing" class="character__count">
              {{ screen.body.length }}/{{ maxBodyLength }}
            </div>
          </div>
          <div class="button__container">
            <div
              class="pill__button"
              :class="{ active: screen.editing }"
              @click="resetEdit(screen.id)"
            >
              RESET
            </div>
            <div
              class="pill__button"
              :class="{ active: screen.editing }"
              @click="saveEdit(screen.id)"
            >
              SAVE
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxHeaderLength: 30,
      maxBodyLength: 200,
    };
  },
  methods: {
    toggleScreen(screen) {
      screen.showing = !screen.showing;
      this.$socket.send("update-screen", { screen });

      let screenIndex = this.$global.screens.findIndex(
        (s) => s.id == screen.id
      );

      if (screen.showing) {
        this.$socket.send("send-osc", {
          address: `/location/2/4/${screenIndex + 1}/press`,
          args: [],
        });
      } else {
        this.$socket.send("send-osc", {
          address: `/location/2/5/${screenIndex + 1}/press`,
          args: [],
        });
      }
    },
    startEdit(screenId) {
      let screen = this.$global.screens.find((s) => s.id == screenId);
      screen.editing = true;
    },
    resetEdit(screenId) {
      this.$socket.send("get-screen", { screenId });
    },
    saveEdit(screenId) {
      let screen = this.$global.screens.find((s) => s.id == screenId);
      this.$socket.send("update-screen", { screen });
    },
  },
};
</script>
<style lang="scss">
.announcements {
  flex-grow: 2;
  .screens {
    flex-grow: 1;
    display: flex;
    gap: 50px;
    .screen {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      gap: 20px;
      .screen__header {
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 40px;
          font-weight: 500;
          text-decoration: underline;
        }
        .switch {
          img {
            width: 100px;
            object-fit: contain;
          }
        }
      }
      .textbox__container {
        display: flex;
        flex-direction: column;
        flex-grow: 1;

        .title {
          font-weight: 500;
          font-size: 20px;
        }
        textarea {
          width: 100%;
          background: #3b3b3b;
          border: 1px solid #919191;
          flex-grow: 1;
          color: #fff;
        }
        .character__count {
          text-align: end;
        }
      }
      .button__container {
        display: flex;
        justify-content: flex-end;
        gap: 20px;
      }
    }
  }
}
</style>
