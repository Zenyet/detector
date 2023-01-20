<template>
  <div class="con">
    <div class="kernel-name" :class="{ mobile: isMobile }">{{ detector.kernel }}</div>
  </div>
</template>

<script>
export default {
  name: "KernelCard",
  props: ["detector", "isMobile"]
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

  .kernel-name {
    font-size: 64px;
    font-weight: 700;
  }

  .mobile {
    font-size: 42px;
  }
}
</style>