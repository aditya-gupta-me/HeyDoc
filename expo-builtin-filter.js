// Filters out Node 24 built-ins containing ':' (node:sea, node:sqlite, etc.) and patches writeFile.
// Loaded via NODE_OPTIONS so it runs before Expo CLI code.
(function () {
  if (global.__EXPO_BUILTIN_FILTER__) return;
  global.__EXPO_BUILTIN_FILTER__ = true;
  try {
    const Module = require("module");
    const original = Module.builtinModules || [];
    const filtered = Object.freeze(
      original.filter((name) => !name.includes(":"))
    );
    // Try redefining getter (may fail if not configurable)
    try {
      Object.defineProperty(Module, "builtinModules", {
        configurable: true,
        get() {
          return filtered;
        },
      });
      console.log(
        "[expo-builtin-filter] Overrode Module.builtinModules; removed:",
        original.filter((n) => n.includes(":")).join(", ") || "none"
      );
    } catch (e) {
      console.warn(
        "[expo-builtin-filter] Could not redefine builtinModules, falling back to fs interception",
        e.message
      );
    }
  } catch (e) {
    console.warn("[expo-builtin-filter] Setup failed", e);
  }
  // Patch fs writeFile to ignore writes targeting invalid colon directories.
  const fs = require("fs");
  const origWriteFile = fs.writeFile;
  const origWriteFileSync = fs.writeFileSync;
  if (fs.promises && fs.promises.writeFile) {
    const origPWrite = fs.promises.writeFile.bind(fs.promises);
    fs.promises.writeFile = async function (target, data, options) {
      if (shouldBypass(target)) {
        logBypass("writeFile", target);
        return;
      }
      return origPWrite(target, data, options);
    };
  }
  fs.writeFile = function (target, data, options, cb) {
    if (typeof options === "function") {
      cb = options;
      options = undefined;
    }
    if (shouldBypass(target)) {
      logBypass("writeFile", target);
      if (cb) process.nextTick(cb, null);
      return;
    }
    return origWriteFile.call(fs, target, data, options, cb);
  };
  fs.writeFileSync = function (target, data, options) {
    if (shouldBypass(target)) {
      logBypass("writeFileSync", target);
      return;
    }
    return origWriteFileSync.call(fs, target, data, options);
  };
  function shouldBypass(p) {
    try {
      return /\\externals\\node:/.test(p) || /\/externals\/node:/.test(p);
    } catch {
      return false;
    }
  }
  function logBypass(kind, target) {
    if (!process.env.EXPO_HACK_SILENT)
      console.log("[expo-builtin-filter] Skip " + kind + " for", target);
  }
  console.log("[expo-builtin-filter] Active.");
})();
