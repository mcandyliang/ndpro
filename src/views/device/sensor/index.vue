<template>
  <div>
    <p class="title">传感器</p>
    <div class="top"></div>
    <div class="table">
      <div class="search">
        <el-input
          placeholder="数据搜索"
          v-model="input3"
          class="input-with-select"
        >
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </div>
      <div class="middle">
        <div>
          <p>添加传感器</p>
        </div>
      </div>
      <div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          border
          :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
          @selection-change="handleSelectionChange"
          show-overflow-tooltip
          :row-style="{ height: '20px' }"
          :cell-style="{ padding: '0' }"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            show-overflow-tooltip
            prop="sensorID"
            label="传感器ID"
            width="115"
          >
          </el-table-column>
          <el-table-column prop="sensorName" label="传感器名称">
            <template slot-scope="scope">
              <span v-if="scope.row.sensorName != ''">
                <el-button
                  type="text"
                  @click="input(scope.row, scope.$index)"
                  >{{ scope.row.sensorName }}</el-button
                >
              </span>
              <span v-if="scope.row.sensorName == ''"
                ><el-button type="text" @click="input(scope.row, scope.$index)"
                  >请输入传感器名称</el-button
                >
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="smsNum" label="卡号" width="120">
            <template slot-scope="scope">
              <div class="user_info_page">
                <el-button
                  type="text"
                  @click="dialog(scope.row, scope.$index)"
                  v-if="scope.row.smsNum != ''"
                  >{{ scope.row.smsNum }}</el-button
                >
                <el-button
                  type="text"
                  v-else
                  @click="dialog(scope.row, scope.$index)"
                  >请输入卡号</el-button
                >
                <el-dialog
                  title="修改信息"
                  :visible.sync="dialogFormVisible"
                  width="500px"
                >
                  <el-form :model="form">
                    <el-form-item label="设备名称" label-width="120px">
                      <el-input
                        v-model="form.name"
                        autocomplete="off"
                        :disabled="true"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      label="输入卡号"
                      :label-width="formLabelWidth"
                      :disabled="true"
                    >
                      <el-input
                        v-model="form.num"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      label="公司列表"
                      :label-width="formLabelWidth"
                    >
                      <el-select
                        v-model="form.region"
                        width="100%"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item, i) in offerList"
                          :key="i"
                          :label="item.companyName"
                          :value="item.companyID"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      label="套餐详情"
                      :label-width="formLabelWidth"
                    >
                      <el-select
                        v-model="form.regions"
                        width="100%"
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="(item, i) in companyList"
                          :key="i"
                          :label="item.offerName"
                          :value="item.offerID"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false"
                      >取 消</el-button
                    >
                    <el-button type="primary" @click="dialogs">确 定</el-button>
                  </div>
                </el-dialog>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="传感器状态" width="95">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0" style="color:red">
                离线
              </span>
              <span v-else style="color:green">
                在线
              </span>
            </template>
          </el-table-column>

          <el-table-column
            prop="deviceSerial"
            label="设备序列号"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.deviceSerial == ''">
                无
              </span>
              <span v-else>
                {{ scope.row.deviceSerial }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="deviceName" label="设备名称">
            <template slot-scope="scope">
              <span v-if="scope.row.deviceName == ''">
                <el-button type="text" @click="binding(scope.row)"
                  >无</el-button
                >
              </span>
              <span v-else>
                <el-button type="text" @click="open">{{
                  scope.row.deviceName
                }}</el-button>
              </span>
              <el-dialog
                title="绑定设备"
                :visible.sync="dialogVisible"
                style="text-align:left"
              >
                设备名称：<el-radio-group v-model="checkdevicename">
                  <el-radio-button
                    v-for="(deviceName, i) in devicename"
                    :label="deviceName"
                    :key="i"
                    >{{ deviceName }}</el-radio-button
                  >
                </el-radio-group>
                <br /><br />
                设备序列号：<el-radio-group v-model="checkdeviceserial">
                  <el-radio-button
                    v-for="(serial, i) in deviceserial"
                    :label="serial"
                    :key="i"
                    >{{ serial }}</el-radio-button
                  >
                </el-radio-group>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary">确 定</el-button>
                </div>
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column prop="departName" label="隶属部门">
          </el-table-column>
          <el-table-column label="定位" width="50">
            <template slot-scope="scope">
              <el-button type="text" @click="location(scope.row)"
                ><img src="../../../../public/image/device/06.png" alt=""
              /></el-button>
              <el-dialog :visible.sync="dialogFormVisibles">
                <p style="text-align:left;margin-top:-50px">
                  设备位置：{{ sensorName }}
                </p>
                <div style="height:500px">
                  <div style="height:80px">
                    <el-input v-model="input1" style="float:left;width:200px">
                    </el-input>
                    <el-input
                      v-model="input2"
                      style="float:left;width:200px;margin-left:10px"
                    >
                    </el-input>
                    <el-button
                      type="primary"
                      style="float:left;padding:12px 15px;margin-left:10px"
                      @click="update"
                      >确定修改</el-button
                    >
                  </div>
                  <div style="height:450px">
                    <el-amap id="container" :zoom="zoom" :center="center">
                      <el-amap-marker :position="center"></el-amap-marker>
                    </el-amap>
                  </div>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibles = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="dialogFormVisibles = false"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="350">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="refresh(scope.row)"
                >刷新</el-button
              >
              <el-dialog
                title="设置归零值"
                :visible.sync="dialogFormVisibless"
                width="350px"
              >
                x轴：<el-input v-model="x" style="width:270px"></el-input>
                y轴：<el-input
                  v-model="y"
                  style="width:270px;margin-top:10px"
                ></el-input>

                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibless = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="submit(scope.row)"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
              <el-button type="primary" size="mini" style="margin-left:7px"
                >记录</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="cover(scope.row)"
                style="margin-right:7px"
                >封面</el-button
              >
              <el-dialog
                title="上传封面"
                :visible.sync="dialogFormVisiblesss"
                width="600px"
              >
                <el-upload
                  class="upload-demo"
                  :action="action"
                  :file-list="fileList"
                  :on-success="success"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div
                    style="width:500px;height:500px;border:1px solid #f8f8f8;"
                  >
                    <img :src="src" alt="" style="width:100%;height:100%" />
                  </div>
                </el-upload>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisiblesss = false"
                    >取 消</el-button
                  >
                  <el-button
                    @click="dialogFormVisiblesss = false"
                    type="primary"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
              <el-button
                type="primary"
                size="mini"
                @click="unbundling(scope.row)"
                >解绑</el-button
              >
              <el-button type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          background
          layout=" prev, pager, next"
          @current-change="handleCurrentChange"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input3: "",
      tableData: [],
      departID: "1/",
      page: 1,
      pageSize: 10,
      total: 0,
      dialogVisible: false,
      dialogFormVisible: false,
      dialogFormVisibles: false,
      dialogFormVisibless: false,
      dialogFormVisiblesss: false,
      form: {
        name: "",
        region: "",
        regions: "",
        num: ""
      },
      offerList: [],
      companyList: [],
      formLabelWidth: "120px",
      input1: "",
      input2: "",
      center: [0, 0],
      zoom: 13,
      sensorName: "",
      x: "",
      y: "",
      val: {},
      value: {},
      index: 0,
      src: "",
      action: "",
      fileList: [],
      devicename: [],
      checkdevicename: "",
      deviceserial: [],
      checkdeviceserial: ""
    };
  },

  created() {
    this.getData();
  },
  methods: {
    binding(val) {
      // console.log(val);
      this.dialogVisible = true;
      this.$post("/api/v2/sensor/device-not-bind", {
        departID: val.departID
      }).then(res => {
        // console.log(res);
        res.data.data.list.forEach(item => {
          this.devicename.push(item.deviceName);
          this.deviceserial.push(item.deviceSerial);
        });
      });
    },
    open() {
      this.$message({
        message: "传感器已绑定设备，如需重新绑定设备，请先取消原绑定",
        type: "warning"
      });
    },
    unbundling(val) {
      // console.log(val);
      this.$confirm(`确定取消与设备${val.sensorName}的绑定`, "提示", {
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
    success(response, file, fileList) {
      // console.log(response);
      this.src = response.data.poster;
    },
    cover(val) {
      // console.log(val);
      this.action =
        "http://192.168.1.20:3000/api/v2/sensor/poster-update?sensorID=" +
        val.sensorID;
      this.dialogFormVisiblesss = true;
      this.$post("/api/v2/sensor/poster-get", {
        sensorID: val.sensorID
      }).then(res => {
        // console.log(res.data.data.poster);
        this.src = res.data.data.poster;
      });
    },
    submit(val) {
      this.$post("/api/v2/sensor/setZero", {
        sensorID: this.value.sensorID,
        x_zero: this.x,
        y_zero: this.y
      }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
      this.dialogFormVisibless = false;
    },
    refresh(val) {
      // console.log(val);
      this.dialogFormVisibless = true;
      this.x = val.zero.x_zero;
      this.y = val.zero.y_zero;
      this.value = val;
    },
    update() {
      this.center = [this.input1, this.input2];
      // console.log(this.val.cameraIndexCode);
      let location = this.input1 + "," + this.input2;
      this.$post("/api/v2/device/update-sensor-location", {
        sensorID: this.val.sensorID,
        location: location
      }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
        } else {
          this.$message.error(res.data.msg);
        }
        // console.log(res);
      });
    },
    location(val) {
      // console.log(val);
      this.dialogFormVisibles = true;
      this.sensorName = val.sensorName;
      let lng = val.location.split(",")[0];
      let lat = val.location.split(",")[1];
      // console.log(lng, lat);
      this.input1 = lng;
      this.input2 = lat;
      this.center = [lng, lat];
      this.val = val;
    },
    dialogs() {
      this.tableData[this.index].smsNum = this.form.num;
      this.$post("/api/v2/device/update-sensor-sms", {
        sensorID: this.val.sensorID,
        smsNum: this.form.num,
        companyID: this.form.region,
        offerID: this.form.regions
      }).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
      this.val.companyID = this.form.region;
      this.val.offerID = this.form.regions;
      this.dialogFormVisible = false;
    },
    dialog(val, index) {
      // console.log(val);
      this.index = index;
      this.val = val;
      this.form.name = val.deviceName;
      if (val.smsNum != "") {
        this.form.num = val.smsNum;
      } else {
        this.form.num = "";
      }
      this.form.region = this.val.companyID;
      this.form.regions = this.val.offerID;

      this.offerList = JSON.parse(this.$store.getters.getofferList);
      this.companyList = JSON.parse(this.$store.getters.getcompanyList);
      this.val = val;
      this.dialogFormVisible = true;
    },
    input(val, index) {
      this.$prompt("请输入设备名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: val.sensorName
      })
        .then(({ value }) => {
          // this.$alert(value);
          this.value = value;
          this.$post("/api/v2/device/update-sensor-name", {
            sensorName: value,
            sensorID: val.sensorID
          }).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
            } else {
              this.$message.error(res.data.msg);
            }
          });
          this.tableData[index].sensorName = value;
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getData() {
      this.$post("/api/v2/device/devicelist-tower-qx", {
        page: this.page,
        pageSize: this.pageSize,
        departID: this.departID
      }).then(res => {
        // console.log(res);
        this.total = res.data.data.total;
        this.tableData = res.data.data.list;
      });
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 44px;
  margin-top: 10px;
  margin-left: 30px;
  margin-bottom: 10px;
}
.top {
  display: flex;
  border-bottom: 1px solid #666666;
  margin: 10px 30px;
}
.table {
  border: 1px solid #666666;
  margin: 10px 30px;
}

.search {
  /* margin: -5px 0; */
  width: 100%;
  border-bottom: 1px solid #666666;
}
.input-with-select {
  width: 250px;
  /* height: 25px; */
  margin: 10px;
}
.middle {
  border-bottom: 1px solid #666666;
  display: flex;
}
.middle div {
  background-color: #00479d;
  margin: 8px;
  border-radius: 7px;
}
.middle p {
  color: #fff;
  margin: 5px 5px;
  font-size: 22px;
}
.page {
  border-top: 1px solid #666666;
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
