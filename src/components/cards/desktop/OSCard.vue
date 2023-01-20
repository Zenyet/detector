<template>
  <div class="con">
    <div class="box" :class="{ mobile: isMobile}">
      <div class="os-name">
        {{ detector.os }} {{ detector.osVersion }} {{ detector.architecture }}
      </div>
      <i class="icon">
        <Icon :icon="os[detector.os]"></Icon>
      </i>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";

export default {
  name: "OSCard",
  props: ["detector", "isMobile"],
  components: {
    Icon
  },
  data() {
    return {
      os: {
        "macOS": "openmoji:apple",
        "Mac OS": "openmoji:apple",
        "Windows11或者更高": "simple-icons:windows11",
        "Windows 10": "openmoji:windows",
        "Windows7及以下": "openmoji:windows",
        "Windows7": "openmoji:windows",
        "Windows10 or later": "openmoji:windows",
        "Linux": "logos:linux-tux",
        "Android": "openmoji:android",
        "ios": "flat-color-icons:ipad",
        "Ubuntu": "logos:ubuntu",
        "Debian": "logos:debian",
        "CentOS": "logos:centos-icon",
        "Manjaro": "logos:manjaro",
        "Deepin": "cib:deepin"
      }
    };
  }
};
</script>

<style scoped lang="scss">
.con {
  -webkit-will-change: transform;
  height: 100%;
  width: 100%;
  display: flex;
  flex-grow: 2;
  justify-content: center;
  align-items: center;

  .box {
    display: flex;
    align-items: center;

    .icon {
      margin: .5rem;
      display: inline-block;
      width: 64px;
      height: 64px;
      font-size: 64px;
    }

    .os-name {
      margin: .5rem;
      font-size: 64px;
      font-weight: 700;
    }
  }

  .mobile {
    .icon {
      width: 42px;
      height: 42px;
    }
    .icon, .os-name {
      font-size: 42px;
    }
  }
}
</style>