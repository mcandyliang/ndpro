<template>
  <div>
    <div class="search">
      <el-input
        placeholder="从当前设备列表"
        v-model="result.input"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="detail">
      <div>
        <div
          v-for="(item, index) in result.detail"
          :key="index"
          class="details"
        >
          <p>{{ item }}</p>
        </div>
      </div>
      <div class="pages">
        <div class="page" v-for="(item, index) in result.text" :key="index">
          <p>{{ item }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["result"]
};
</script>

<style lang="scss" scoped>
.search {
  width: 280px;
  margin: 25px 30px 0 30px;
  height: 50px;
}
.detail {
  width: 96.5%;
  margin: 10px 30px 0 30px;
  border-top: 1px solid #666666;
  display: flex;
}
.details {
  border: 1px solid #666666;
  border-top: none;
  width: 280px;
  p {
    padding: 10px 30px;
    margin: 0;
  }
}
.pages {
  width: 100%;
  display: flex;
}
.page {
  margin: 20px 10px 0 20px;
  border: 1px solid #666;
  background-color: #00479d;
  text-decoration: underline;
  text-decoration-color: #fff;
  width: 9%;
  height: 4%;
  p {
    font-size: 25px;
    margin: 0;
    padding: 10px;
    color: #fff;
    text-align: center;
  }
}
</style>
