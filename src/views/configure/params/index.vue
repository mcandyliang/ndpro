<template>
  <div>
    <p class="title">全局参数</p>
    <div class="line"></div>
    <div class="top">
      <div><span>微信CORPID:</span> <el-input v-model="input"></el-input></div>
      <div>
        <span>微信SECRETKEY:</span> <el-input v-model="input"></el-input>
      </div>
      <div>
        <span>MQTT服务器域名/IP:</span> <el-input v-model="input"></el-input>
      </div>
      <div><span>MQTT端口:</span> <el-input v-model="input"></el-input></div>
      <div><span>MQTT用户名:</span> <el-input v-model="input"></el-input></div>
      <div><span>MQTT密码:</span> <el-input v-model="input"></el-input></div>
      <div>
        <span>设置心跳时间（秒）:</span> <el-input v-model="input"></el-input>
      </div>
    </div>
    <div class="btn">
      <el-button type="warning">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ""
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
.line {
  margin: -20px 30px;
  border-top: 1px solid #666666;
}
.top {
  width: 800px;
  margin-top: 30px;
}
.top div {
  /* margin-top: 15px; */
  font-size: 15px;
  float: right;
  height: 50px;
  line-height: 50px;
}
.top span {
  margin-right: 40px;
}
.el-input {
  width: 500px;
}
.btn {
  margin-top: 400px;
  margin-left: 300px;
}
</style>
