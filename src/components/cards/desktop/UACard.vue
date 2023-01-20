<template>
  <div class="con">
    <div class="ua-name" :class="{ mobile: isMobile }">{{ detector.ua }}</div>
  </div>
</template>

<script>
export default {
  name: "UACard",
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

  .ua-name {
    width: 66.6%;
    text-align: center;
    font-size: 64px;
    font-weight: 700;
  }

  .mobile {
    font-size: 32px;
    width: 100%;
  }
}
</style>