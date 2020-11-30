<template>
  <div>
    <p class="title">心跳日志</p>
    <div class="top">
      <div>
        共有数据：
        <span>{{ total }}</span
        >条
      </div>
    </div>

    <div class="search">
      <el-input
        placeholder="数据搜索"
        v-model="input3"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="table"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 10,
      input3: ""
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.table {
  border: 1px solid #666666;
  margin: 80px 30px;
  height: 500px;
  border-radius: 8px;
}
.title {
  font-size: 44px;
  margin-top: 40px;
  margin-left: 30px;
}
.top {
  margin: 0 30px;
  /* margin-bottom: 20px; */
  height: 20px;
  padding-bottom: 30px;
  border-bottom: 1px solid #666666;
}
.top div {
  float: right;
}
.top span {
  color: #fc2a2a;
  /* margin-bottom: 10px; */
}
.search {
  width: 280px;
  float: right;
  margin: 20px 30px;
  height: 50px;
}
</style>
