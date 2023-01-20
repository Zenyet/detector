<template>
  <div class="mobile-chrome-tabs">
    <div class="tab-scroll">
      <div class="tab-con">
        <div class="tab-box" id="tab1" >
          <header class="tab-top">
            <div class="left">
              <i class="version">
                <Icon :icon="detector.kernel === 'Chromium' ? 'openmoji:chromium' : favicon[detector.browser]"></Icon>
              </i>
            </div>
            <div class="middle">关于浏览器</div>
            <div class="right">
              <i class="close">
                <Icon icon="codicon:chrome-close"></Icon>
              </i>
            </div>
          </header>
          <div class="tab-bottom" ref="tab_bottom"></div>
        </div>
        <div class="tab-box" id="tab2"></div>
        <div class="tab-box" id="tab3"></div>
        <div class="tab-box" id="tab4"></div>
        <div class="tab-box" id="tab5"></div>
        <div class="tab-box" id="tab6"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue2";
export default {
  name: "MTabs",
  components: {
    Icon
  },
  data() {
    return {
      favicon: {
        "Google Chrome": "openmoji:chromium",
        "Firefox": "openmoji:firefox",
        "Safari": "openmoji:safari"
      },
    }
  },
  props: {
    detector: {
      type: Object,
      required: true
    },
    canvasVar: {
      type: Object,
      required: true
    }
  },
  mounted() {
    console.log(this.canvasVar)
    this.$refs.tab_bottom.appendChild(this.canvasVar);
  }
};
</script>

<style scoped lang="scss">
.mobile-chrome-tabs {
  display: flex;
  height: calc(92vh - 2rem);

  .tab-scroll {
    margin: 0 auto;
    overflow-y: scroll;
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
      }
    }
  }

}
</style>