<template>
  <div class="takeover">
    <div class="icon">
      <img src="~/assets/icons/video.png" />
    </div>
    <div class="content">
      <div class="header">
        <div class="text">
          <div class="title">Takeover content</div>
          <div class="subtitle">CLICK BELOW TO PLAY</div>
        </div>
        <div
          class="pill__button"
          :class="{ active: $global.currentVideo != 'Default' }"
          @click="playpause()"
        >
          {{ $global.playing ? "PAUSE" : "PLAY" }}
        </div>
      </div>
      <div class="video__buttons">
        <div
          v-for="video in videos"
          class="button"
          :class="{ active: $global.currentVideo == video }"
          @click="selectVideo(video)"
        >
          {{ video }}
        </div>
      </div>
    </div>
    <Modal ref="modal" @okay="changeVideo" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      videos: [
        "Default",
        "Civil",
        "Business Jets",
        "Defence: Orpheus",
        "Defence: FLRAA",
      ],
    };
  },
  methods: {
    selectVideo(video) {
      this.$refs.modal.showModal(
        `Are you sure you want to play ${video}?`,
        video
      );
    },
    changeVideo(data) {
      this.$global.currentVideo = data;
      this.$global.playing = true;
      let videoIndex = this.videos.indexOf(this.$global.currentVideo);
      this.$axios.post("/osc", {
        address: `/location/2/0/${videoIndex + 1}/press`,
        args: [],
      });
    },
    playpause() {
      this.$global.playing = !this.$global.playing;
      let videoIndex = this.videos.indexOf(this.$global.currentVideo);
      if (this.$global.playing) {
        this.$axios.post("/osc", {
          address: `/location/2/2/${videoIndex + 1}/press`,
          args: [],
        });
      } else {
        this.$axios.post("/osc", {
          address: `/location/2/1/${videoIndex + 1}/press`,
          args: [],
        });
      }
    },
  },
};
</script>
<style lang="scss">
.takeover {
  .video__buttons {
    display: flex;
    justify-content: center;
    gap: 30px;
    .button {
      width: 160px;
      height: 60px;
      border-radius: 10px;
      background: #4c4c4c;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      &.active {
        background: #fff;
        color: #000;
      }
    }
  }
}
</style>
