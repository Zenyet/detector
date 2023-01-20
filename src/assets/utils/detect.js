const detector = {
  os: "",
  version: "",
  kernel: "",
  browser: "",
  ua: "",
  architecture: "",
  osVersion: ""
};
export default function() {
  if (navigator.userAgentData) {
    // let uaData = navigator.userAgentData;
    navigator.userAgentData.getHighEntropyValues(["architecture",
      "model",
      "platformVersion",
      "fullVersionList"]).then(values => {
      let { architecture, fullVersionList, platform, platformVersion } = values;
      if (platform === "Windows") {
        const majorPlatformVersion = parseInt(platformVersion.split(".")[0]);
        if (majorPlatformVersion >= 13) {
          detector.os = "Windows11或者更高";
        } else if (majorPlatformVersion > 0) {
          detector.os = "Windows 10";
        } else {
          detector.os = "Windows7及以下";
        }
      } else {
        detector.os = platform;
        detector.osVersion = platformVersion;
      }
      detector.architecture = architecture;
      detector.browser = architecture;
      const filtered = fullVersionList.filter(e =>
        !e.brand.includes("Not")
      );
      detector.version = filtered[0].version;
      filtered.forEach(e => {
        if (e.brand === "Chromium") {
          detector.kernel = e.brand;
        } else {
          detector.browser = e.brand;
        }
      });
    });
    detector.ua = navigator.userAgent;
  } else {
    let ua = navigator.userAgent;
    let uaStr = ua.split(" ");
    //判断浏览器
    if (ua.includes("Edg")) {
      detector.browser = "Microsoft Edge";
      detector.version = uaStr.find(e => e.startsWith("Edg/")).split("/")[1];
      detector.kernel = "Chromium";
    } else if (ua.includes("Firefox")) {
      detector.browser = "Firefox";
      detector.version = uaStr.find(e => e.startsWith("Firefox/")).split("/")[1];
    } else if (ua.includes("Chrome")) {
      detector.browser = "Chrome";
      detector.version = uaStr.find(e => e.startsWith("Chrome/")).split("/")[1];
      detector.kernel = "Chromium";
    } else if (ua.includes("Safari")) {
      detector.browser = "Safari";
      detector.version = uaStr.find(e => e.startsWith("Version/")).split("/")[1];
    } else if (ua.includes("OPR")) {
      detector.browser = "Opera";
      detector.version = uaStr.find(e => e.startsWith("OPR/")).split("/")[1];
    } else {
      detector.browser = "IE..";
      detector.version = "before now";
    }
    //判断内核
    if (ua.includes("Firefox") && !detector.kernel) {
      detector.kernel = "Gecko";
    } else if (ua.includes("Safari") && !detector.kernel) {
      detector.kernel = "Webkit";
    } else if (!detector.kernel) {
      detector.kernel = "IE..";
    }
    // 判断系统
    if (ua.includes("Android")) {
      detector.os = "Android";
    } else if (ua.includes("iPhone") || ua.includes("iPad")) {
      detector.os = "ios";
    } else if (ua.includes("Mac OS")) {
      detector.os = "Mac OS";
    } else if (ua.includes("Ubuntu")) {
      detector.os = "Ubuntu";
    } else if (ua.includes("CentOS")) {
      detector.os = "CentOS";
    } else if (ua.includes("Debian")) {
      detector.os = "Debian";
    } else if (ua.includes("Deepin")) {
      detector.os = "Deepin";
    } else if (ua.includes("Manjaro")) {
      detector.os = "Manjaro";
    } else if (ua.includes("Windows NT 6.1")) {
      detector.os = "Windows7";
    } else if (ua.includes("Windows NT 10.0")) {
      detector.os = "Windows10 or later";
    } else if (ua.includes("Linux")) {
      detector.os = "Linux";
    }
    detector.ua = navigator.userAgent;
  }
  return detector;
}