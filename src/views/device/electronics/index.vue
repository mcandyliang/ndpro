<template>
  <div>
    <p class="title">信通电子</p>
    <div class="top">
      <div class="subtext">
        <el-button type="text">
          <div>
            <p>线路列表</p>
          </div></el-button
        ><el-button type="text">
          <div>
            <p>杆塔列表</p>
          </div></el-button
        ><el-button type="text">
          <div>
            <p>向平台同步设备</p>
          </div></el-button
        >
      </div>
      <div class="total">
        共有数据：<span>{{ total }} </span>条

        <!-- 在线设备： <span>{{ line }}</span >台 
        离线设备： <span> {{ online }}</span>台 -->
      </div>
    </div>
    <div class="search">
      <el-input
        placeholder="从当前数据中检索"
        v-model="input3"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="table-box">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
      >
        <el-table-column prop="deviceID" label="设备ID" width="300">
        </el-table-column>
        <el-table-column prop="deviceName" label="设备名称"> </el-table-column>
        <el-table-column prop="wxdepartname" label="部门"> </el-table-column>
        <el-table-column prop="deviceType" label="设备类型"> </el-table-column>
        <el-table-column label="设备详细信息">
          <template slot-scope="scope">
            <el-button @click="details(scope.row)">设备详细信息</el-button>
          </template>
        </el-table-column>
        <el-table-column label="设置当前配置">
          <template slot-scope="scope">
            <el-button @click="set(scope.row)">当前配置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="设备详细信息" :visible.sync="dialogVisible">
        <el-form
          label-position="right"
          label-width="120px"
          :model="formLabelAlign"
        >
          <el-form-item label="装置名称：">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="装置运行状态：">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
          <el-form-item label="关联杆塔名称：">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
          <el-form-item label="装置型号：">
            <el-input v-model="formLabelAlign.type"></el-input> </el-form-item
          ><el-form-item label="装置生产日期：">
            <el-input v-model="formLabelAlign.type"></el-input> </el-form-item
          ><el-form-item label="装置安装日期；">
            <el-input v-model="formLabelAlign.type"></el-input> </el-form-item
          ><el-form-item label="装置电话号码：">
            <el-input v-model="formLabelAlign.type"></el-input> </el-form-item
          ><el-form-item label="装置网络类型：">
            <el-input v-model="formLabelAlign.type"></el-input> </el-form-item
          ><el-form-item label="装置出厂编码：">
            <el-input v-model="formLabelAlign.type"></el-input> </el-form-item
          ><el-form-item label="装置厂家名称：">
            <el-input v-model="formLabelAlign.type"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="设备当前配置信息" :visible.sync="dialogVisibles">
        <el-form
          label-position="right"
          label-width="200px"
          :model="formLabelAlign"
        >
          <el-form-item label="装置名称：">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="开始工作时间：">
            <el-input v-model="form.region"></el-input>
          </el-form-item>
          <el-form-item label="结束工作时间：">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
          <el-form-item label="拍照时间间隔（分钟）：">
            <el-input v-model="form.type"></el-input> </el-form-item
          ><el-form-item label="摄像机像素：">
            <el-input v-model="form.type"></el-input>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      departID: "1/",
      dialogVisible: false,
      dialogVisibles: false,
      total: 2,
      input3: "",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      form: {
        name: "",
        region: "",
        type: ""
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    details(val) {
      // console.log(val);
      this.dialogVisible = true;
    },
    set(val) {
      this.dialogVisibles = true;
    },
    getData() {
      this.$post("/api/v2/device/devicelist-xintong", {
        page: this.page,
        pageSize: this.pageSize,
        departID: this.departID
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.list;
        res.data.data.list.forEach(item => {
          if (item.deviceType == 0) {
            item.deviceType = "图像";
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 40px;
  margin-top: 15px;
  margin-left: 30px;
  margin-bottom: 10px;
}
.top {
  margin: -10px 30px;
  /* margin-bottom: 20px; */
  padding-bottom: 20px;
  border-bottom: 1px solid #666666;
}
.subtext {
  display: flex;
}
.subtext div {
  border: 1px solid #666666;
  border-radius: 5px;
  height: 40px;
  margin-right: 10px;
  margin-bottom: -30px;
}

.top p {
  margin-top: 8px;
  padding: 0 5px;
  font-size: 21px;
  color: #2070ce;
  /* font-weight: bold; */
}
.total {
  float: right;
}
.top span {
  color: #fc2a2a;
  /* margin-bottom: 10px; */
}
.search {
  width: 280px;
  /* float: right; */
  margin: 20px 30px -10px 30px;
  height: 50px;
}

.table-box {
  margin: 10px 30px;
}
/deep/.el-table th > .cell {
  text-align: center;
}

/deep/.el-table .cell {
  text-align: center;
}
</style>
