// Temporary hack for Node 24 + Expo SDK 50 on Windows (invalid colon in folder names)
// Filters built-in modules with ':' so Expo's metro externals setup won't try to mkdir e.g. 'node:sea'
// Remove once upgrading to an Expo/Node combo that supports Node 24.

// Intercept fs mkdir attempts for forbidden colon names instead of mutating builtinModules (read-only in newer Node).
if (!global.__EXPO_NODE24_HACK__) {
  global.__EXPO_NODE24_HACK__ = true;
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
      const last = t.toString().split(/[/\\]/).pop();
      return /node:/.test(last);
    } catch {
      return false;
    }
  }
  function logBypass(t) {
    if (!process.env.EXPO_HACK_SILENT)
      console.log("[expo-node24-hack] Skip mkdir", t);
  }
  console.log("[expo-node24-hack] Active (fs interception).");
}

(async function startExpo() {
  try {
    const { spawn } = require("child_process");
    const userArgs = process.argv.slice(2);
    if (!userArgs.length) userArgs.unshift("start");
    console.log("[expo-node24-hack] Delegating to expo", userArgs.join(" "));
    const exe = process.platform === "win32" ? "npx.cmd" : "npx";
    const child = spawn(exe, ["expo", ...userArgs], {
      stdio: "inherit",
      env: { ...process.env },
    });
    child.on("exit", (code) => process.exit(code ?? 0));
  } catch (err) {
    console.error("[expo-node24-hack] Failed to start Expo:", err);
    process.exit(1);
  }
})();
