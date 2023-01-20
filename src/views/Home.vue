<template>
  <div class="home">
    <Header :detector="detector" v-if="judge" />
    <main-body :detector="detector" :judge="judge"></main-body>
    <Footer :detector="detector" v-if="!judge"></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import MainBody from "@/components/MainBody";
import Footer from "@/components/Footer";
import detect from "@/assets/utils/detect";

export default {
  name: "Home",
  components: {
    Header,
    MainBody,
    Footer
  },
  data() {
    return {
      detector: {}
    };
  },
  computed: {
    judge() {
      let os = this.detector.os;
      return os === "macOS" || os === "Mac OS" || os === "ios" || os === "Android";
    }
  },
  created() {
    this.detector = detect();
  }
};

</script>
<style scoped lang="scss">
.home {
  width: 100vw;
  height: 100vh;
  background-color: #202020;
}
</style>
