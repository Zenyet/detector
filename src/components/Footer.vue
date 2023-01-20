<template>
  <footer class="footer">
    <i class="os">
      <Icon :icon="osIcon[detector.os]" color="#fff"></Icon>
    </i>
    <div class="running-con">
      <i class="running">
        <Icon :icon="taskIcon[detector.browser]"></Icon>
      </i>
    </div>
    <div class="time-con">
      <time class="time">{{nowTime}}</time>
      <time class="date">{{nowDate}}</time>
    </div>
  </footer>
</template>
<script>
import {Icon} from '@iconify/vue2';
export default {
  name: "Footer",
  components: {
    Icon
  },
  props: {
    detector: Object,
  },
  data() {
    return {
      taskIcon: {
        "Chrome": "logos:chrome",
        "Google Chrome": "logos:chrome",
        "Firefox": "logos:firefox",
        "Opera": "logos:opera",
        "Microsoft Edge": "logos:microsoft-edge",
        "IE..": "icomoon-free:ie"
      },
      nowTime: '',
      nowDate: '',
      osIcon: {
        "Windows11或者更高": "cib:windows",
        "Windows 10": "cib:windows",
        "Windows7及以下": "cib:windows",
        "Windows7": "cib:windows",
        "Windows10 or later": "cib:windows",
        "Linux": "logos:linux-tux",
        "Ubuntu": "logos:ubuntu",
        "Debian": "logos:debian",
        "CentOS": "logos:centos-icon",
        "Manjaro": "logos:manjaro",
        "Deepin": "cib:deepin"
      }
    }
  },
  methods: {
    getTime() {
      let now = new Date();
      let times = now.toLocaleTimeString().split(':');
      this.nowTime = times[0] + ':' + times[1];
    },
    getDate() {
      let now = new Date();
     this.nowDate = now.toLocaleDateString() + '';
    }
  },
  created() {
    this.getTime();
    this.getDate();
    setInterval(() => {
      this.getTime();
      this.getDate();
    },1000);
  }
};
</script>

<style scoped lang="scss">
.footer {
  height: 5vh;
  width: 100vw;
  display: flex;
  align-items: center;
}
.os {
  font-size: 2.5vh;
  width: 2.5vh;
  height: 2.5vh;
  margin-left: 1vw;
}
.running-con {
  background-color: #2E3936;
  display: flex;
  height: 100%;
  width: 5vh;
  align-items: center;
  justify-content: center;
  margin-left: 2vw;
  position: relative;
  .running {
    font-size: 2.5vh;
    width: 2.5vh;
    height: 2.5vh;
  }
  &::after {
    content: "";
    height: 3px;
    width: 100%;
    background-color: #757d78;
    position: absolute;
    bottom: 0;
  }
}
.time-con {
  font-size: 12px;
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-right: 1.5vw;
  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 2px;
    background-color: #757d78;
    right: -1.5vw;
  }
}
</style>