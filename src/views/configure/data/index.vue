<template>
  <div>
    <product :data="data"></product>
    <div class="select">
      <span>同步类型:</span>
      <el-select v-model="value" placeholder="请选择" style="width:35%">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <div class="btn">
      <el-button type="warning">开始同步</el-button>
    </div>
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
        title: "数据同步",
        subtext: []
      },
      options: [
        {
          value: "选项1",
          label: "微信 > 服务器（部门）"
        },
        {
          value: "选项2",
          label: "微信 > 服务器（部门）"
        },
        {
          value: "选项3",
          label: "微信 > 服务器（部门）"
        }
      ],
      value: "微信 > 服务器（部门）"
    };
  }
};
</script>

<style lang="scss" scoped>
.select {
  margin: 30px 130px;
  span {
    margin-right: 30px;
    font-size: 14px;
  }
}
.btn {
  margin-left: 225px;
}
</style>
