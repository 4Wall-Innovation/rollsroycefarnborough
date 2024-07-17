import Vue from "vue";

export default (ctx, inject, redirect) => {
  const init = () => {
    ctx.$socket.on("update-screen", ({ screen }) => {
      updateScreen(screen);
    });
  };

  const updateScreen = (screen) => {
    let screenIndex = ctx.$global.screens.findIndex((s) => s.id == screen.id);
    screen.editing = false;
    Vue.set(ctx.$global.screens, screenIndex, screen);
  };

  const getScreens = async () => {
    let { data } = await ctx.$axios.get(`screens`);
    ctx.$global.screens = data;
    return data;
  };
  const getScreen = async (screenId) => {
    let { data } = await ctx.$axios.get(`screens/${screenId}`);
    updateScreen(data);
    return data;
  };

  inject(
    "global",
    Vue.observable({
      init,
      getScreens,
      getScreen,
      updateScreen,
      loaded: false,
      currentVideo: "Default",
      playing: true,
      screens: [],
    })
  );
};
