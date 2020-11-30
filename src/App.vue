<template>
  <div>
    <div>
      <img src="../public/image/header/header.png" width="99.9%" alt="" />
    </div>
    <div class="back"></div>
    <div id="app">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style lang="scss" scoped>
.back {
  background-image: url("../public/image/background/back.png");
}
</style>
