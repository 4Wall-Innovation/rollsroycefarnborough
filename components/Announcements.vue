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
          <div class="templates">
            <select
              :value="screen.template"
              @change="changeTemplate(screen, $event)"
            >
              <option value="defence">Defence</option>
              <option value="civil">Civil</option>
            </select>
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
    async changeTemplate(screen, e) {
      this.$set(screen, "template", e.target.value);
      let { data } = await this.$axios.put("/screens", screen);
      this.$global.updateScreen(data);
    },
    async toggleScreen(screen) {
      screen.showing = !screen.showing;
      let { data } = await this.$axios.put("/screens", screen);
      this.$global.updateScreen(data);

      let screenIndex = this.$global.screens.findIndex(
        (s) => s.id == screen.id
      );

      if (screen.showing) {
        this.$axios.post("/osc", {
          address: `/location/2/3/${screenIndex + 1}/press`,
          args: [],
        });
      } else {
        this.$axios.post("/osc", {
          address: `/location/2/4/${screenIndex + 1}/press`,
          args: [],
        });
      }
    },
    startEdit(screenId) {
      let screen = this.$global.screens.find((s) => s.id == screenId);
      screen.editing = true;
    },
    async resetEdit(screenId) {
      this.$global.getScreen(screenId);
    },
    async saveEdit(screenId) {
      let screen = this.$global.screens.find((s) => s.id == screenId);
      let { data } = await this.$axios.put("/screens", screen);
      this.$global.updateScreen(data);
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
      gap: 10px;
      .screen__header {
        display: flex;
        justify-content: space-between;
        .title {
          font-size: 26px;
          font-weight: 500;
          text-decoration: underline;
        }
        .switch {
          display: flex;
          img {
            width: 80px;
            object-fit: contain;
          }
        }
      }
      .templates {
        select {
          border-radius: 10px;
          width: 200px;
          height: 30px;
          padding-left: 10px;
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
