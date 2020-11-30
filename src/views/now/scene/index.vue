<template>
  <div>
    <product :data="data"></product>
  </div>
</template>

<script>
import Product from "../../../components/product";
export default {
  components: {
    Product
  },
  data() {
    return {
      data: {
        title: "实时现场",
        subtext: [],
        search: 1
      }
    };
  }
};
</script>

<style scoped></style>
