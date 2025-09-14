// Preload hook to bypass mkdir attempts for invalid Windows names like 'node:sea'
// Injected with NODE_OPTIONS=--require ./expo-fs-mkdir-hook.js
(function () {
  if (global.__EXPO_MKDIR_HOOK__) return; // idempotent
  global.__EXPO_MKDIR_HOOK__ = true;
  const fs = require("fs");
  const origMkdir = fs.mkdir;
  const origMkdirSync = fs.mkdirSync;
  if (fs.promises && fs.promises.mkdir) {
    const origPMkdir = fs.promises.mkdir.bind(fs.promises);
    fs.promises.mkdir = async function (target, ...rest) {
      if (shouldBypass(target)) {
        logBypass(target);
        return;
      }
      return origPMkdir(target, ...rest);
    };
  }
  fs.mkdir = function (target, ...rest) {
    if (shouldBypass(target)) {
      logBypass(target);
      const cb =
        typeof rest[rest.length - 1] === "function"
          ? rest[rest.length - 1]
          : null;
      if (cb) process.nextTick(cb, null);
      return;
    }
    return origMkdir(target, ...rest);
  };
  fs.mkdirSync = function (target, ...rest) {
    if (shouldBypass(target)) {
      logBypass(target);
      return;
    }
    return origMkdirSync(target, ...rest);
  };
  function shouldBypass(t) {
    try {
      const last = t
        .toString()
        .split(/[/\\\\]/)
        .pop();
      return /node:/.test(last);
    } catch {
      return false;
    }
  }
  function logBypass(t) {
    if (!process.env.EXPO_HACK_SILENT)
      console.log("[expo-fs-mkdir-hook] Skip mkdir", t);
  }
  console.log("[expo-fs-mkdir-hook] Active.");
})();
