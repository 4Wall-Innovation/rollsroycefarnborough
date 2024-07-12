import Vue from "vue";

export default (ctx, inject, redirect) => {
  const getScreens = async () => {
    await new Promise((r) => {
      ctx.$socket.once("get-screens", ({ screens }) => {
        console.log("Got Screens");
        r(screens);
      });
      ctx.$socket.send("get-screens");
    });
  };
  inject(
    "global",
    Vue.observable({
      getScreens,
      loaded: false,
      currentVideo: "Default",
      playing: true,
      screens: [],
    })
  );
};
