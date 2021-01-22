<template>
  <div>
    <p class="title">杆塔倾斜设备管理</p>
    <div class="top">
      <div class="subtext">
        <el-button type="text" @click="delet">
          <div>
            <p>批量删除</p>
          </div></el-button
        ><el-button type="text" @click="update">
          <div>
            <p>批量升级</p>
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
        :data="Newitem"
        tooltip-effect="dark"
        border
        style="width: 100%"
        :row-style="{ height: '20px' }"
        :cell-style="{ padding: '0' }"
        :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="deviceSerial" label="设备序列号">
          <template slot-scope="scope">
            <span v-if="scope.row.deviceSerial == ''"
              ><el-button type="text" @click="open(scope.row, scope.$index)"
                >输入序列号</el-button
              >
            </span>
            <span v-else
              ><el-button type="text" @click="open(scope.row, scope.$index)">{{
                scope.row.deviceSerial
              }}</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="deviceName"
          label="设备名称"
          width="150"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="lng" label="经度"> </el-table-column>
        <el-table-column prop="lat" label="纬度"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" style="color:red">
              离线
            </span>
            <span v-else style="color:green">
              在线
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column prop="onlineTime" label="最后上线时间">
        </el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text">
              <img src="../../../../public/image/device/03.png" alt="" />
            </el-button>
            <el-button @click="del(scope.row)" type="text">
              <img src="../../../../public/image/device/05.png" alt="" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        layout="total, prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="800px">
      <div style="height:600px;overflow: auto">
        <el-form ref="form" :model="form" label-width="130px">
          <el-form-item label="设备序列号">
            {{ deviceSerial }}
          </el-form-item>
          <el-form-item label="流量手机号">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="是否开启微视频">
            <el-radio-group v-model="form.resource">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="视频时长（秒）">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="图片传输超时时间（分钟）">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="是否图片水印">
            <el-radio-group v-model="form.resource">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group> </el-form-item
          ><el-form-item label="相对零点/绝对零点">
            <el-radio-group v-model="form.resource">
              <el-radio label="相"></el-radio>
              <el-radio label="绝"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="倾斜报警域值">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="图片对比域值">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="部门">
            <el-select
              v-model="form.region"
              placeholder="请选择部门"
              style="width:100%"
            >
              <el-option></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设备名称">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="设备位置">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="经度">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="纬度">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="拍照时间">
            <el-select
              v-model="form.region"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option></el-option>
            </el-select> </el-form-item
          ><el-form-item label="推送用户">
            <el-select
              v-model="form.region"
              placeholder="请选择"
              style="width:100%"
            >
              <el-option></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              placeholder="请输入备注信息"
              v-model="form.desc"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 10,
      departID: "1/",
      input3: "",
      total: 141,
      multipleSelection: [],
      online: 0,
      line: 0,
      dialogVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      deviceSerial: ""
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    edit(val) {
      this.dialogVisible = true;
      this.deviceSerial = val.deviceSerial;
    },
    del(val) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    delet() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "你还没有选择",
          type: "warning"
        });
      } else {
        this.$confirm("此操作将永久删除, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },
    update() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "你还没有选择",
          type: "warning"
        });
      } else {
        this.$confirm("确认要升级到最新版本吗？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "升级成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消升级"
            });
          });
      }
    },
    open(val, index) {
      // console.log(val);
      // console.log(index);
      this.$prompt("请输入序列号", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,40000}$/,
        inputErrorMessage: "设备序列号不能为空",
        inputValue: val.deviceSerial
      })
        .then(({ value }) => {
          // this.$alert(value);
          // this.$post("/api/v2/device/update-device-serial", {
          //   deviceSerial: value,
          //   cameraIndexCode: val.cameraIndexCode
          // }).then(res => {
          //   // console.log(res);
          // });

          this.tableData[index].deviceSerial = value;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    getData() {
      this.$post("/api/v2/device/devicelist-wxpush", {
        page: this.page,
        pageSize: this.pageSize,
        departID: this.departID
      }).then(res => {
        // console.log(res);
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
          item.deviceSerial.search(_this.input3) != -1 ||
          item.createTime.search(_this.input3) != -1 ||
          (item.id + "").search(_this.input3) != -1 ||
          item.lat.search(_this.input3) != -1 ||
          item.lng.search(_this.input3) != -1 ||
          item.onlineTime.search(_this.input3) != -1
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
.el-dialog {
  height: 60%;
  overflow: auto;
}
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
.cell {
  margin: 0 20px;
}

/deep/ .el-table th > .cell {
  padding-right: 0;
  text-align: center;
}
/deep/.el-table .cell {
  text-align: center;
  /* width: 180px; */
  /* margin: 0 5px; */
}
</style>
