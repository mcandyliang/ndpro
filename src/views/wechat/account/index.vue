<template>
  <div>
    <p class="title">用户</p>
    <div class="top"><p>请完善以下信息，方便我们更好的为您服务！</p></div>
    <div class="form">
      <el-form
        :label-position="labelPosition"
        label-width="80px"
        :model="formLabelAlign"
      >
        <el-form-item label="姓名:">
          <el-input style="width:30%" v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="备注:">
          <el-input style="width:30%" v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="所在区域:">
          <el-input style="width:30%" v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="ID:">
          <el-input style="width:30%" v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码:">
          <el-input style="width:30%" v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:">
          <el-input style="width:30%" v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input style="width:30%" v-model="formLabelAlign.name"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="warning">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: ""
      }
    };
  }
};
</script>

<style scoped>
.title {
  font-size: 44px;
  margin-top: 40px;
  margin-left: 30px;
}
.top {
  margin: 10px 30px;
  border: 1px solid #fc2a2a;
  border-radius: 10px;
  padding-left: 10px;
  color: #fc2a2a;
  background-color: #f6e0e0;
}
.form {
  margin-left: 80px;
  margin-top: 40px;
}
</style>
