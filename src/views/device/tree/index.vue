<template>
  <div>
    <p class="title">综合在线监测设备管理</p>
    <div class="top">
      <div class="subtext">
        <el-button type="text" @click="trans">
          <div>
            <p>批量转移</p>
          </div></el-button
        ><el-button type="text">
          <div>
            <p>批量修改为布控球</p>
          </div></el-button
        ><el-button type="text" @click="add">
          <div>
            <p>增加设备</p>
          </div></el-button
        ><el-button type="text">
          <div>
            <p>更新设备列表</p>
          </div></el-button
        ><el-button type="text" @click="revise">
          <div>
            <p>修改其他账户的设备名</p>
          </div></el-button
        ><el-button type="text" @click="force">
          <div>
            <p>设备强制上线</p>
          </div></el-button
        >
      </div>
      <div class="total">
        共有数据：
        <span>{{ total }} </span>条
        <!-- 在线设备： <span>{{ line }}</span >台 
        离线设备： <span> {{ online }}</span>台 -->
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
    <div class="table">
      <el-table
        ref="multipleTable"
        :row-style="{ height: '20px' }"
        :cell-style="{ padding: '1px' }"
        :data="Newitem"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="deviceSerial" label="设备序列号">
        </el-table-column>
        <el-table-column label="设备名称">
          <template slot-scope="scope">
            <el-button type="text" @click="modify(scope.row)">{{
              scope.row.deviceName
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="在线状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" style="color: red"> 离线 </span>
            <span v-else style="color: green"> 在线 </span>
          </template>
        </el-table-column>
        <el-table-column label="直播视频">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" style="color: red">
              <el-button type="primary" :disabled="true">直播</el-button>
            </span>
            <span v-else style="color: green">
              <el-button type="primary">直播</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="是否开启定位">
          <template slot-scope="scope">
            <el-button type="text" @click="cancel(scope.row)">
              <img
                width="15"
                src="../../../../public/image/device/07.png"
                alt=""
              />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column label="实时图像">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" style="color: red">
              <el-button type="primary" :disabled="true">实时图像</el-button>
            </span>
            <span v-else style="color: green">
              <el-button type="primary">实时图像</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="edit(scope.row)">
              <img
                width="15"
                src="../../../../public/image/device/03.png"
                alt=""
            /></el-button>
            <el-button type="text" @click="divert(scope.row)">
              <img
                width="15"
                src="../../../../public/image/device/04.png"
                alt=""
            /></el-button>
            <el-button type="text" @click="synchron(scope.row)">
              <img
                width="15"
                src="../../../../public/image/device/01.png"
                alt=""
            /></el-button>
            <el-button type="text">
              <img
                width="15"
                src="../../../../public/image/device/02.png"
                alt=""
            /></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="设备名修改" :visible.sync="dialogVisible">
        <el-form
          label-position="right"
          label-width="120px"
          :model="formLabelAlign"
        >
          <el-form-item label="设备序列号">
            <el-input v-model="formLabelAlign.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="设备名">
            <el-input v-model="formLabelAlign.region"></el-input>
          </el-form-item>
        </el-form>
        <el-button style="margin-left: 120px" type="primary">保存</el-button>
      </el-dialog>
      <div class="page">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
    <el-dialog title="批量转移" :visible.sync="dialog" width="800px">
      <div style="height:200px">
        <el-form :model="form" label-width="80px">
          <el-form-item label="所属部门">
            <el-select
              v-model="form.region"
              placeholder="请选择部门"
              style="width:100%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button style="margin-left: 120px" type="primary">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="增加设备" :visible.sync="dialogs" width="800px">
      <div style="height:400px">
        <el-form :model="forms" label-width="120px">
          <el-form-item label="萤石账号">
            <el-select
              v-model="forms.region"
              placeholder="请选择萤石账号"
              style="width:100%"
            >
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备序列号">
            <el-input
              v-model="forms.name"
              placeholder="请输入设备序列号"
            ></el-input> </el-form-item
          ><el-form-item label="设备验证码">
            <el-input
              v-model="forms.name"
              placeholder="请输入设备验证码"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button style="margin-left: 120px" type="primary">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="设备名修改" :visible.sync="dialogss" width="800px">
      <div style="height:400px">
        <el-form :model="formsss" label-width="120px">
          <el-form-item label="设备序列号">
            <el-input
              v-model="formsss.name"
              placeholder="请输入设备序列号"
            ></el-input> </el-form-item
          ><el-form-item label="设备名称">
            <el-input
              v-model="formsss.name"
              placeholder="请输入设备名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button style="margin-left: 120px" type="primary">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="设备编辑" :visible.sync="dialogVisibles" width="800px">
      <div style="height:600px;overflow: auto">
        <el-form :model="formss" label-width="130px">
          <el-form-item label="设备序列号">
            <el-input v-model="formss.deviceSerial"></el-input>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="formss.deviceName"></el-input>
          </el-form-item>
          <el-form-item label="所属部门">
            <el-select
              v-model="formss.region"
              placeholder="请选择部门"
              style="width:100%"
            >
              <el-option></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="GPS">
            <el-select
              v-model="formss.region"
              placeholder="无"
              style="width:100%"
            >
              <el-option></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="GPS描述">
            <el-input
              v-model="formss.name"
              placeholder="添加GPS描述"
            ></el-input>
          </el-form-item>
          <el-form-item label="告警灵敏度">
            <el-input v-model="formss.name"></el-input>
          </el-form-item>

          <el-form-item label="告警频率（小时）">
            <el-input v-model="formss.name"></el-input>
          </el-form-item>
          <el-form-item label="经度">
            <el-input v-model="formss.lon"></el-input>
          </el-form-item>
          <el-form-item label="纬度">
            <el-input v-model="formss.lat"></el-input>
          </el-form-item>
          <el-form-item label="推送用户">
            <el-select
              v-model="formss.region"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推送时间">
            <el-input v-model="formss.desc"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibless = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisibles = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="设备转移" :visible.sync="dialogsss" width="800px">
      <el-form :model="forma" label-width="140px">
        <el-form-item label="设备序列号">
          <el-input
            v-model="forma.deviceSerial"
            placeholder="请输入设备序列号"
          ></el-input> </el-form-item
        ><el-form-item label="设备名">
          <el-input
            v-model="forma.deviceName"
            placeholder="请输入设备名"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备当前所属账号">
          <el-input
            v-model="forma.device"
            placeholder="请输入当前所属账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="转移到账户">
          <el-select
            v-model="forma.region"
            placeholder="请选择萤石账号"
            style="width:100%"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-button style="margin-left: 120px" type="primary">确定</el-button>
    </el-dialog>
    <el-dialog title="设备列表" :visible.sync="dialogVisibless">
      <div class="search">
        <el-input
          placeholder="数据搜索"
          v-model="input"
          class="input-with-select"
          width="200px"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <el-table :data="tableDatas" style="width: 100%">
        <el-table-column prop="date" label="设备序列号"> </el-table-column>
        <el-table-column prop="name" label="设备名"> </el-table-column>
        <el-table-column label="设备类型"> </el-table-column>
        <el-table-column label="验证码"> </el-table-column>
        <el-table-column label="验证码状态"> </el-table-column>
        <el-table-column label="强制状态"> </el-table-column>
        <el-table-column label="卡号"> </el-table-column>
        <el-table-column label="SIM卡厂商"> </el-table-column>
        <el-table-column label="套餐"> </el-table-column>
        <el-table-column label="操作"> </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="totals"
      >
      </el-pagination>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      tableDatas: [],
      total: 0,
      input3: "",
      input: "",
      dialog: false,
      dialogs: false,
      dialogss: false,
      dialogsss: false,
      dialogVisibless: false,
      dialogVisible: false,
      dialogVisibles: false,
      totals: 0,
      page: 1,
      pageSize: 10,
      departID: "1/",
      formLabelAlign: {
        name: "",
        region: ""
      },
      multipleSelection: [],
      form: {
        region: ""
      },
      forms: {
        name: "",
        region: ""
      },
      formsss: {
        name: ""
      },
      formss: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        deviceSerial: "",
        deviceName: ""
      },
      forma: {
        deviceSerial: "",
        deviceName: "",
        device: "",
        region: ""
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    force() {
      this.dialogVisibless = true;
    },
    modify(val) {
      this.dialogVisible = true;
      this.formLabelAlign.name = val.deviceSerial;
    },
    divert(val) {
      this.dialogsss = true;
      this.forma.deviceSerial = val.deviceSerial;
      this.forma.deviceName = val.deviceName;
    },
    edit(val) {
      this.dialogVisibles = true;
      this.formss.deviceSerial = val.deviceSerial;
      this.formss.deviceName = val.deviceName;
      this.formss.lon = val.lon;
      this.formss.lat = val.lat;
    },
    synchron(val) {
      this.$confirm(`确定将《${val.deviceName}》的配置同步吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "同步成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消同步"
          });
        });
    },
    trans() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "未选择设备，无法批量转移",
          type: "warning"
        });
      } else {
        this.dialog = true;
      }
    },
    add() {
      this.dialogs = true;
    },
    revise() {
      this.dialogss = true;
    },
    cancel(val) {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    getData() {
      this.$post("/api/v2/device/devicelist", {
        page: this.page,
        pageSize: this.pageSize,
        departID: this.departID
      }).then(res => {
        // console.log(res);
        this.total = res.data.data.total;
        this.tableData = res.data.data.list;
      });
    }
  },
  computed: {
    Newitem() {
      var _this = this;
      var Newitem = [];
      var tableData = _this.tableData;
      tableData.map(function(item) {
        if (
          item.deviceName.search(_this.input3) != -1 ||
          item.deviceSerial.search(_this.input3) != -1
        ) {
          Newitem.push(item);
        }
      });
      return Newitem;
    }
  }
};
</script>

<style scoped>
.table {
  /* border: 1px solid #666666; */
  margin: 0 30px;
  /* height: 500px; */
  /* border-radius: 8px; */
  /* text-align: center; */
}
.title {
  font-size: 40px;
  margin-top: 10px;
  margin-left: 30px;
  margin-bottom: 10px;
}
.top {
  margin: -10px 30px;
  /* margin-bottom: 20px; */
  padding-bottom: 30px;
  border-bottom: 1px solid #666666;
}
.subtext {
  display: flex;
}
.subtext div {
  border: 1px solid #666666;
  border-radius: 5px;
  height: 40px;
  /* padding-right: 10px; */
  margin-bottom: -40px;
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
  margin: 15px 30px 0 30px;
  height: 50px;
}
.page {
  /* border-top: 1px solid #666666; */
  /* margin: 5px; */
  padding: 10px 0;
}
/deep/.el-table th > .cell {
  text-align: center;
}

/deep/.el-table .cell {
  text-align: center;
}
</style>
