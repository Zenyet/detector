<template>
  <div class="con">
    <div class="box" :class="{ mobile: isMobile }">
      <i class="icon">
        <Icon :icon="logo[detector.browser]"></Icon>
      </i>
      <div class="browser-name">{{ detector.browser }}</div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";

export default {
  name: "BrowserCard",
  props: ["detector", "isMobile"],
  components: {
    Icon
  },
  data() {
    return {
      logo: {
        "Chrome": "logos:chrome",
        "Google Chrome": "logos:chrome",
        "Firefox": "logos:firefox",
        "Safari": "logos:safari",
        "Opera": "logos:opera",
        "Microsoft Edge": "logos:microsoft-edge"
      }
    };
  }
};
</script>

<style scoped lang="scss">
.con {
  height: 100%;
  width: 100%;
  display: flex;
  flex-grow: 2;
  justify-content: center;
  align-items: center;
  transform: translateZ(0);

  .box {
    display: flex;
    align-items: center;
    transition: .44s transform ease;

    .icon {
      margin: .5rem;
      display: inline-block;
      width: 64px;
      height: 64px;
      font-size: 64px;
    }

    .browser-name {
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
    .icon, .browser-name {
      font-size: 42px !important;
    }
  }
}


</style>