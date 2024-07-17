import Vue from "vue";

export default (ctx, inject) => {
  let handlers = {};
  let ws;

  const init = () => {
    return new Promise((r) => {
      try {
        ws = new WebSocket(`ws://${location.hostname}:3001`);
        console.log(location);
        if (location.pathname == "/") {
          setTimeout(() => {
            ws.close();
          }, 1000);
        }
        ws.onopen = (e) => {
          console.log("Socket connected");
          r();
        };
        ws.onmessage = (e) => {
          let { type, data } = JSON.parse(e.data);
          let typeHandlers = handlers[type];
          if (!typeHandlers) return;
          for (let handler of typeHandlers) {
            handler(data);
          }
        };
        ws.onclose = () => {
          console.log("Socket disconnected");
        };
        ws.onerror = (e) => {
          console.log("Socket errored");
        };
      } catch (error) {
        console.error(error);
      }
    });
  };

  const on = (type, handler) => {
    if (handlers[type]) handlers[type].push(handler);
    else handlers[type] = [handler];
  };
  const once = (type, handler) => {
    let onceHandler = (data) => {
      handler(data);
      handlers[type].splice(handlers[type].indexOf(handler), 1);
    };
    if (handlers[type]) handlers[type].push(onceHandler);
    else handlers[type] = [onceHandler];
  };
  const send = (type, data) => {
    ws.send(JSON.stringify({ type, data }));
  };
  inject("socket", Vue.observable({ init, on, once, send }));
};
