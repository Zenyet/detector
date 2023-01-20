<template>
  <main class="main"
        :class="{isTop: judge, isBottom: !judge, isMobile: detector.os === 'Android' || detector.os === 'ios',hasBorder: detector.os === 'macOS' || detector.os === 'Mac OS', changeBg: isMobile }">
    <div class="desktop-menu" v-if="!isMobile">
      <div class="left" :class="{isRight: !judge}">
        <i class="btn1" :class="{btn: !judge}">
          <Icon :icon="btn1"></Icon>
        </i>
        <i class="btn2" :class="{btn: !judge}">
          <Icon :icon="btn2"></Icon>
        </i>
        <i class="btn3" :class="{btn: !judge}">
          <Icon :icon="btn3"></Icon>
        </i>
      </div>
      <div class="right" v-for="(tag, index) in tags" :key="index" @click="currentClick(index, tag.componentName)"
           :class="{active: index === current}">
        <i class="version">
          <Icon :icon="detector.kernel === 'Chromium' ? 'openmoji:chromium' : favicon[detector.browser]"></Icon>
        </i>
        <span>{{ tag.name }}</span>
        <i class="close">
          <Icon icon="codicon:chrome-close"></Icon>
        </i>
      </div>
      <div class="add-con">
        <i class="add">
          <Icon icon="fluent:add-16-filled"></Icon>
        </i>
      </div>
    </div>

    <div class="mobile-menu" v-if="isMobile">
      <i class="chrome-home" v-if="!isOpen" @click="clickHome">
        <Icon icon="mingcute:home-2-line"></Icon>
      </i>
      <i class="chrome-home" v-else>
        <Icon icon="fluent:add-28-filled"></Icon>
      </i>
      <div class="address" v-if="isinTab">
        <span>{{ getURL }}</span>
      </div>
      <div class="right">
        <div v-if="!isOpen" class="tab" @click="toggleMenu(tail)">
          <span>6</span>
        </div>
        <div class="chrome-menu">
          <i>
            <Icon icon="charm:menu-kebab"></Icon>
          </i>
        </div>
      </div>
    </div>
    <keep-alive>
      <Transition name="mTab" >
        <Component mode ref="dymDom" :is="currentTab" v-if="!isOpen && isMobile" :detector="detector"
                   :isMobile="isMobile"></Component>
      </Transition>
    </keep-alive>

    <div class="mobile-chrome-tabs" v-if="isOpen">
      <div class="tab-scroll">
        <div class="tab-con">
          <div class="tab-box" v-for="tab in mobileTabs" :id="`tab${tab.id}`"
               @click="clickTab(tab.id, tab.componentName)"
               :key="tab.id">
            <header class="tab-top">
              <div class="left">
                <i class="version">
                  <Icon :icon="detector.kernel === 'Chromium' ? 'openmoji:chromium' : favicon[detector.browser]"></Icon>
                </i>
              </div>
              <div class="middle">{{ tab.name }}</div>
              <div class="right">
                <i class="close">
                  <Icon icon="codicon:chrome-close"></Icon>
                </i>
              </div>
            </header>
            <div class="tab-bottom" :id="`thumb_box${tab.id}`">
              <img :id="`tab_bottom${tab.id}`" :src="thumbs[tab.id - 1].thumb">
            </div>
          </div>
        </div>
      </div>
    </div>

    <Transition name="card" mode="out-in" v-if="detector.os !== 'Android' && detector.os !== 'ios'">
      <Component :is="currentCard" :detector="detector"></Component>
    </Transition>
  </main>
</template>

<script>
import { Icon } from "@iconify/vue2";
import OSCard from "@/components/cards/desktop/OSCard";
import BrowserCard from "@/components/cards/desktop/BrowserCard";
import UACard from "@/components/cards/desktop/UACard";
import KernelCard from "@/components/cards/desktop/KernelCard";
import VersionCard from "@/components/cards/desktop/VersionCard";
import MHomeCard from "@/components/cards/mobile/MHomeCard";
import html2canvas from "html2canvas";
import MTabs from "@/components/cards/mobile/MTabs";

export default {
  name: "MainBody",
  components: {
    Icon,
    OSCard,
    BrowserCard,
    UACard,
    KernelCard,
    VersionCard,
    MHomeCard,
    MTabs
  },
  props: {
    detector: Object,
    judge: Boolean
  },
  data() {
    return {
      favicon: {
        "Google Chrome": "openmoji:chromium",
        "Firefox": "openmoji:firefox",
        "Safari": "openmoji:safari"
      },
      logo: {
        "Chrome": "logos:chrome",
        "Google Chrome": "logos:chrome",
        "Firefox": "logos:firefox",
        "Safari": "logos:safari",
        "Opera": "logos:opera",
        "Microsoft Edge": "logos:microsoft-edge"
      },
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
      },
      tags: [
        { name: "关于浏览器", componentName: "BrowserCard" },
        { name: "关于浏览器版本", componentName: "VersionCard" },
        { name: "关于浏览器内核", componentName: "KernelCard" },
        { name: "关于UA", componentName: "UACard" },
        { name: "关于系统", componentName: "OSCard" }
      ],
      mobileTabs: [
        { name: "打开新的", componentName: "MHomeCard", id: 1, thumb: "" },
        { name: "关于浏览器", componentName: "BrowserCard", id: 2, thumb: "" },
        { name: "关于版本", componentName: "VersionCard", id: 3, thumb: "" },
        { name: "关于内核", componentName: "KernelCard", id: 4, thumb: "" },
        { name: "关于UA", componentName: "UACard", id: 5, thumb: "" },
        { name: "关于系统", componentName: "OSCard", id: 6, thumb: "" }
      ],
      thumbs: [
        { id: 1, thumb: "" },
        { id: 2, thumb: "" },
        { id: 3, thumb: "" },
        { id: 4, thumb: "" },
        { id: 5, thumb: "" },
        { id: 6, thumb: "" }
      ],
      currentCard: "BrowserCard",
      current: 0,
      currentTab: "MHomeCard",
      isNewTab: true,
      isinTab: false,
      isOpen: false,
      tail: 1,
      dataURL: null
    };
  },
  computed: {
    btn1() {
      if (this.judge) return "akar-icons:circle-fill";
      return "codicon:chrome-minimize";
    },
    btn2() {
      if (this.judge) return "akar-icons:circle-fill";
      return "codicon:chrome-restore";
    },
    btn3() {
      if (this.judge) return "akar-icons:circle-fill";
      return "codicon:chrome-close";
    },
    isMobile() {
      return this.detector.os === "Android" || this.detector.os === "ios";
    },
    getURL() {
      return window.location.href;
    }
  },
  methods: {
    currentClick(index, componentName) {
      this.currentCard = componentName;
      if (index === this.current) return;
      this.current = index;
    },
    toggleMenu(tail) {
      this.isNewTab = !this.isNewTab;
      this.isOpen = !this.isOpen;
      if (this.thumbs[tail - 1].thumb) return;
        html2canvas(this.$refs.dymDom.$el, {
          backgroundColor: "#202020"
        }).then(canvas => {
          canvas.style.width = "100%";
          // console.log(window.innerHeight/window.innerWidth)
          canvas.style.height = "100%";
          const dataURL = canvas.toDataURL("image/jpeg", 0.5);
          if (this.thumbs[tail - 1].id === tail) {
            this.thumbs[tail - 1].thumb = dataURL;
          }
          // console.log(dataURL);
          const dom = document.getElementById(`tab_bottom${tail}`);
          dom.src = dataURL;
        });
    },
    clickTab(tail, componentName) {
      this.tail = tail;
      this.isOpen = false;
      this.currentTab = componentName;
    },
    clickHome() {
      this.currentTab = "MHomeCard";
      this.tail = 1;
    }
  },
  created() {
    window.addEventListener("load", function() {
      // 解决手机打开键盘输入时的height变化问题
      let viewport = document.querySelector("meta[name=viewport]");
      viewport.setAttribute("content", viewport.content + ", height=" + window.innerHeight);
    });
  },
  mounted() {
    // console.log(this.$refs.dymDom.$el); // 拿到动态组件中的DOM
  }
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 92vh;
  //border: 1px dashed gray;
  //box-sizing: border-box;
  background-color: #35363a;
  overflow: hidden;

  display: flex;
  flex-direction: column;

  .desktop-menu {
    display: flex;
    padding-top: 1.5vh;
    padding-left: 1vw;
    //padding-bottom: 1.5vh;
    background-color: #202124;
    width: 100%;
    box-sizing: border-box;
    z-index: 1;
    transform: translateZ(0);

    .left {
      //display: inline-block;
      margin-right: 1.8vw;

      i {
        display: inline-block;
        font-size: 14px;
        margin: 3px;
        width: 14px;
        height: 14px;
      }

      .btn1 {
        color: #ff6159;
      }

      .btn2 {
        color: #ffbe2f;
      }

      .btn3 {
        color: #00cb41;
      }
    }

    .right {
      height: 4vh;
      background-color: #202124;
      border-radius: 10px 10px 0 0;
      display: flex;
      align-items: center;
      position: relative;
      user-select: none;
      -webkit-user-select: none;
      -khtml-user-select: none;

      &:hover {
        background-color: rgba(53, 54, 58, .5);
      }

      .version {
        display: inline-block;
        font-size: 20px;
        height: 20px;
        width: 20px;
        //transform: translateY(5px);
        margin-left: 10px;
      }

      .close {
        display: inline-block;
        font-size: 14px;
        height: 14px;
        width: 14px;
        margin-left: 6vw;
        margin-right: 1vw;
      }

      span {
        font-size: 12px;
        font-weight: 500;
        padding: 4px;
      }
    }

    .add-con {
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;

      .add {
        display: inline-block;
        font-size: 16px;
        height: 16px;
        width: 16px;
        //transform: translateY(50%);
        margin-top: 0.75vh;
        margin-left: 1vw;
      }
    }
  }

  .mobile-menu {
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #202020;

    .chrome-home {
      display: inline-block;
      width: 22px;
      height: 22px;
      font-size: 22px;
      margin-left: 1rem;
    }

    .address {
      height: 5vh;
      width: 66%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #262931;
      border-radius: 32px;
    }

    .right {
      display: flex;
      //position: absolute;
      //right: 0;
      align-items: center;

      .tab {
        width: 16px;
        height: 16px;
        font-size: 12px;
        border: 2px #fff solid;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 6px;
        line-height: 16px;
        font-weight: 800;
        margin-right: 6vw;
        transform: translateY(3px);
      }

      .chrome-menu {
        display: flex;
        height: 20px;
        align-items: center;

        i {
          margin-right: 3vw;
        }
      }

      i {
        display: inline-block;
        font-size: 18px;
        height: 18px;
        width: 18px;
      }
    }
  }

  .mobile-chrome-tabs {
    display: flex;
    height: calc(92vh - 2rem);

    .tab-scroll {
      margin: 0 auto;
      overflow-y: scroll;
      width: 100%;
    }

    .tab-con {
      width: 100%;
      display: grid;
      grid-template-areas:
        ". . . ."
        ". tab1 tab2 ."
        ". tab3 tab4 ."
        ". tab5 tab6 ."
        ". . . .";
      grid-template-columns: 0 1fr 1fr 0;
      grid-gap: 1rem;

      #tab1 {
        grid-area: tab1;
      }

      #tab2 {
        grid-area: tab2;
      }

      #tab3 {
        grid-area: tab3;
      }

      #tab4 {
        grid-area: tab4;
      }

      #tab5 {
        grid-area: tab5;
      }

      #tab6 {
        grid-area: tab6;
      }

      .tab-box {
        height: 265px;
        border-radius: 18px;
        background-color: #233138;
        display: flex;
        flex-direction: column;
        align-self: center;
        justify-content: center;
        align-items: center;
        overflow: hidden;

        .tab-top {
          display: flex;
          //height: 15%;
          justify-content: space-between;
          align-items: center;

          i {
            display: inline-block;
            width: 20px;
            height: 20px;
            font-size: 20px;
          }

          .left, .right {
            margin: .65rem;
            display: flex;
            justify-content: center;
            align-items: center;

            .close {
              font-size: 17px;
            }
          }

          .middle {
            font-size: 14px;
          }
        }

        .tab-bottom {
          height: 85%;
          width: calc(100% - 12px);
          background-color: #333333;
          overflow: hidden;
          margin-bottom: 6px;
          border-radius: 4px 4px 12px 12px;
          overflow: hidden;

          img {
            width: 100%;
          }
        }
      }
    }

  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    flex-grow: 2;

    .info-con {
      margin-top: 20vh;
      padding: 24px;

      header {
        padding: 8px;
        display: flex;

        i {
          font-size: 32px;
        }

        p {
          font-weight: 600;
        }
      }

      .os {
        display: flex;
        align-items: center;

        i {
          font-size: 32px;
        }
      }

      p {
        margin: 8px;
      }
    }
  }
}

.isTop {
  height: 97vh;
}

.isBottom {
  height: 95vh;
  outline: none;
  border-radius: unset;
}

.isRight {
  position: absolute;
  top: 0;
  right: 0;
  margin-right: .5vw !important;
}

.isMobile {
  height: 95vh;
}

.btn {
  color: #8e9095 !important;
  font-size: 20px !important;
  margin: 0 12px !important;
}

.hasBorder {
  border-radius: 14px;
  //outline: 1px solid #68696a;
  overflow: hidden;

  &::before {
    content: '';
    width: 14px;
    height: 14px;
    position: absolute;
    background-color: #1467c1;
    z-index: 0;
  }

  &::after {
    content: '';
    width: 14px;
    height: 14px;
    position: absolute;
    right: 0;
    background-color: #1467c1;
    z-index: 0;
  }
}

.active {
  background-color: #35363a !important;
  border-radius: 10px 10px 0 0 !important;

  &::before {
    content: '';
    position: absolute;
    left: -16px;
    bottom: -6px;
    height: 16px;
    width: 16px;
    border-radius: 0 0 16px 0;
    border-right: #35363a 6px solid;
    border-bottom: #35363a 6px solid;
  }

  &::after {
    content: '' !important;
    position: absolute;
    right: -16px !important;
    bottom: -6px !important;
    height: 16px !important;
    width: 16px !important;
    border-radius: 0 0 0 16px;
    border-left: #35363a 6px solid;
    border-bottom: #35363a 6px solid;
    background-color: transparent !important;
    z-index: 99;
  }
}

// 组件切换动画

.card-enter-active {
  animation: slide-enter .5s ease;
}

.card-leave-active {
  animation: slide-leave .5s ease;
}

@keyframes slide-enter {
  from {
    transform: translateY(-100%);
  }
  60% {
    transform: translateY(8vh);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes slide-leave {
  from {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8vh);
  }
  to {
    transform: translateY(100%);
  }
}

.changeBg {
  background-color: inherit !important;
  display: block !important;
}

//.card-enter-from, .card-leave-to {
//  transform: translateY(100%);
//  opacity: 0;
//}
//
//.card-enter-to, .card-leave-from {
//  transform: translateY(50%);
//}
</style>