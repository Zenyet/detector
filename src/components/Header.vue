<template>
  <header class="header" :class="{isMobile: detector.os === 'ios' || detector.os === 'Android'}">
    <div class="macOS" v-if="judge">
      <i class="os">
        <Icon icon="ant-design:apple-filled"></Icon>
      </i>
      <span class="browser">
      {{ detector.browser }}
    </span>
      <time class="time">
        {{ currentTime }}
      </time>
    </div>
    <div class="android" v-if="detector.os === 'Android'">
      <div class="left">
        <time>{{ currentTime }}</time>
      </div>
      <div class="right">
        <div class="android-bar">
          <img
            src="data:image/png;base64,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"
            alt="">
        </div>
      </div>
    </div>
    <div class="ios" v-if="detector.os === 'ios'">
      <div class="left">
        <time>{{ currentTime }}</time>
        <!--        <i class="airplane">-->
        <!--          <Icon icon="ion:airplane"></Icon>-->
        <!--        </i>-->
        <!--        <i>-->
        <!--          <Icon icon="ic:baseline-wifi"></Icon>-->
        <!--        </i>-->
        <img
          class="geo"
          src="data:image/png;base64,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"
          alt="">
      </div>

      <div class="right">
        <img
          src="data:image/png;base64,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"
          alt="">
      </div>
    </div>
  </header>
</template>

<script>
import { Icon } from "@iconify/vue2";

export default {
  name: "Header",
  props: {
    detector: Object
  },
  data() {
    return {
      currentTime: ""
    };
  },
  components: {
    Icon
  },
  methods: {
    getTime() {
      let now = new Date();
      let times = now.toLocaleTimeString().split(":");
      if (this.judge) this.currentTime = now.getFullYear() + "年" + (now.getMonth() + 1) + "月" + now.getDate() + "日" + " " + now.toLocaleTimeString();
      else this.currentTime = times[0] + ":" + times[1];
    }
  },
  computed: {
    judge() {
      return this.detector.os === "macOS" || this.detector.os === "Mac OS";
    }
  },
  created() {
    this.getTime();
    setInterval(() => {
      this.getTime();
    }, 1000);
  }
};
</script>

<style scoped lang="scss">
.header {
  height: 3vh;
  width: 100vw;
  //background-color: #181c1f;
  background-color: #1467c1;
  //display: flex;
  //align-items: center;
  //align-content: center;

  .macOS {
    display: flex;
    height: 100%;
    align-items: center;

    .time {
      position: absolute;
      right: .5vw;
      display: inline-block;
      font-size: 14px;
      text-align: left;
      letter-spacing: .5px;
      width: 11rem;
    }

    .os {
      display: inline-block;
      color: #e9e8e9;
      font-size: 2.5vh;
      width: 2.5vh;
      height: 2.5vh;
      margin-left: 1.2vw;
      margin-bottom: .5vh;
    }

    .browser {
      font-weight: 800;
      font-size: 14px;
      display: inline-block;
      margin-left: 1.2vw;
    }
  }
}


.android {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: .75rem;

  .right {
    margin-right: 1.5vw;
    width: 50%;

    .android-bar {
      display: flex;
      justify-content: flex-end;

      img {
        width: 14vw;
        margin-right: 1vw;
      }
    }
  }
}

.ios {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1vh;

  .left {
    display: flex;
    align-items: center;
    //flex-grow: 1;
    margin-left: 1vw;

    .geo {
      width: 14px;
      margin-left: 4px;

      img {
        width: 100%;
      }
    }
  }


  .right {
    margin-right: .8vw;
    display: flex;
    align-items: center;

    img {
      width: 18vw;
      margin-right: 1vw;
    }
  }

  i {
    display: inline-block;
    //margin-top: 2px;
    font-size: 18px;
    height: 18px;
    width: 18px;
  }

  .left {
    //margin-left: 4vw;
    time {
      font-size: 14px;
      font-weight: 500;
    }
  }
}

time {
  font-size: 14px;
  font-weight: 500;
  margin-left: 1.5vw;
}

.isMobile {
  height: 2rem;
  background-color: #202020;
}
</style>