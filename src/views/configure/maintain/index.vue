<template>
  <div>
    <product :data="data"></product>
    <div class="select">
      <span>请选择设备:</span>
      <el-select v-model="value" placeholder="请选择" style="width:35%">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <div class="btn">
        <el-button type="primary">远程重启</el-button>
        <el-button type="primary">删除数据</el-button>
      </div>
      <span>请选择设备:</span>
      <el-select v-model="value1" placeholder="请输入命令" style="width:30%">
        <el-option
          v-for="item in option"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button type="primary">执行</el-button>
      <div class="btn1">
        <el-button type="primary">更新服务器代码</el-button>
        <el-button type="primary">重启服务器</el-button>
      </div>
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
        title: "设备维护",
        subtext: []
      },
      options: [
        {
          value: "选项1",
          label: "-FC6947D98118"
        },
        {
          value: "选项2",
          label: "-FC6947D98118"
        },
        {
          value: "选项3",
          label: "-FC6947D98118"
        }
      ],
      option: [
        {
          value: "选项1",
          label: "-FC6947D98118"
        },
        {
          value: "选项2",
          label: "-FC6947D98118"
        },
        {
          value: "选项3",
          label: "-FC6947D98118"
        }
      ],
      value: "-FC6947D98118",
      value1: ""
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
  margin: 15px 0 15px 300px;
}
.btn1 {
  margin: 15px 0 0 250px;
}
</style>
