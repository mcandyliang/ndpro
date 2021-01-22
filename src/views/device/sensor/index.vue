<template>
  <div>
    <p class="title">传感器</p>
    <!-- <div class="top"></div> -->
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
        <el-button type="text" @click="add">
          <div>
            <p>批量转移</p>
          </div></el-button
        >
      </div>
      <el-dialog title="请选择部门" :visible.sync="dgVisible">
        <el-tree
          :data="data"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dgVisible = false">取 消</el-button>
          <el-button type="primary" @click="dgVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <div>
        <el-table
          ref="multipleTable"
          :data="Newitem"
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
                <el-button type="text" @click="binding(scope.row, scope.$index)"
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
                <el-input
                  placeholder="搜索序列号或设备名称"
                  v-model="search"
                  style="margin-top:-10px;margin-bottom:10px"
                ></el-input>
                <el-radio-group v-model="checkdevice">
                  <el-radio-button
                    v-for="(item, i) in Newitems"
                    :label="item"
                    :key="i"
                    >设备名称:{{ item.deviceName }},设备序列号:{{
                      item.deviceSerial
                    }}</el-radio-button
                  >
                </el-radio-group>

                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="refer">确 定</el-button>
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
                  <el-button type="primary" @click="submit">确 定</el-button>
                </div>
              </el-dialog>
              <el-button
                type="primary"
                size="mini"
                style="margin-left:7px"
                @click="record(scope.row)"
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
                @click="unbundling(scope.row, scope.$index)"
                >解绑</el-button
              >
              <!-- <el-button type="danger" size="mini">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <el-dialog title="设备杆塔倾斜历史记录" :visible.sync="dialogVisibles">
        <div v-loading="loading">
          <div id="echarts"></div>

          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="timestamp"
            style="margin:50px 0 0 215px;"
          >
          </el-date-picker>

          <el-button type="primary" @click="searchs">查询</el-button>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisibles = false">取 消</el-button>
          <el-button @click="dialogVisibles = false" type="primary"
            >确 定</el-button
          >
        </div>
      </el-dialog>
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
import { construct, destruct } from "@aximario/json-tree";
export default {
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "departName"
      },
      input3: "",
      tableData: [],
      departID: "1/",
      page: 1,
      pageSize: 10,
      total: 0,
      dgVisible: false,
      dialogVisible: false,
      dialogVisibles: false,
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
      vals: {},
      valss: {},
      value: {},
      index: 0,
      indexs: 0,
      multipleSelection: "",
      src: "",
      action: "",
      fileList: [],
      checkdevice: "",
      search: "",
      datalist: [],
      value1: "",
      loading: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    handleNodeClick(data) {
      // console.log(data);
    },
    getListData(data, config, cb) {
      var id = config.id || "departID";
      var pid = config.pid || "pid";
      var children = config.children || "children";
      // var label=config.label || 'LctnName';
      var idMap = {};
      var jsonTree = [];
      // this.data = data;
      data.forEach(function(v) {
        idMap[v[id]] = v;
      });
      data.forEach(function(v) {
        var parent = idMap[v[pid]];
        if (parent) {
          !parent[children] && (parent[children] = []);
          parent[children].push(v);
        } else {
          jsonTree.push(v);
        }
      });
      // console.log(data);
      // console.log(123);
      return data;

      // console.log(data);
    },
    searchs() {
      echarts.init(document.getElementById("echarts")).dispose();
      this.loading = true;
      let start = this.value1[0];
      let end = this.value1[1];
      let power_data = [];
      let x_data = [];
      let y_data = [];
      let time_data = [];
      this.$post("/api/v2/sensor/get-data", {
        sensorID: this.valss.sensorID,
        start: start,
        end: end
      }).then(res => {
        // console.log(res);
        res.data.data.power_data.forEach(item => {
          power_data.push(item[1]);
          var hours = parseInt(
            (item[0] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = parseInt((item[0] % (1000 * 60 * 60)) / (1000 * 60));
          var time =
            (hours < 10 ? "0" + hours : hours) +
            ":" +
            (minutes < 10 ? "0" + minutes : minutes);
          time_data.push(time);
        });
        res.data.data.x_data.forEach(item => {
          x_data.push(item[1]);
        });
        res.data.data.y_data.forEach(item => {
          y_data.push(item[1]);
        });
        var myCharts = echarts.init(document.getElementById("echarts"));
        var option = {
          title: {
            text: "杆塔倾斜历史记录"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["X轴", "Y轴", "电量"],
            selected: {
              X轴: true,
              Y轴: true,
              电量: false
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: time_data
          },
          yAxis: {},
          series: [
            {
              name: "X轴",
              type: "line",
              stack: "X轴倾斜度",
              data: x_data
            },
            {
              name: "Y轴",
              type: "line",
              stack: "Y轴倾斜度",
              data: y_data
            },
            {
              name: "电量",
              type: "line",
              stack: "电量",
              data: power_data
            }
          ]
        };
        myCharts.setOption(option);
        this.loading = false;
      });
    },
    record(val) {
      if (this.dialogVisibles == false) {
        this.loading = true;
      }
      this.dialogVisibles = true;
      this.valss = val;
      // let loadingInstance = Loading.service(options);
      let start = Date.parse(new Date()) - 3600000;
      let end = Date.parse(new Date());
      // console.log(val);
      let power_data = [];
      let x_data = [];
      let y_data = [];
      let time_data = [];
      this.$post("/api/v2/sensor/get-data", {
        sensorID: val.sensorID,
        start: start,
        end: end
      }).then(res => {
        // console.log(res);
        res.data.data.power_data.forEach(item => {
          power_data.push(item[1]);

          var hours = parseInt(
            (item[0] % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          var minutes = parseInt((item[0] % (1000 * 60 * 60)) / (1000 * 60));

          var time =
            (hours < 10 ? "0" + hours : hours) +
            ":" +
            (minutes < 10 ? "0" + minutes : minutes);

          time_data.push(time);
        });
        res.data.data.x_data.forEach(item => {
          x_data.push(item[1]);
        });
        res.data.data.y_data.forEach(item => {
          y_data.push(item[1]);
        });
        var myCharts = echarts.init(document.getElementById("echarts"));
        var option = {
          title: {
            text: "杆塔倾斜历史记录"
          },
          tooltip: {
            trigger: "axis"
          },
          legend: {
            data: ["X轴", "Y轴", "电量"],
            selected: {
              X轴: true,
              Y轴: true,
              电量: false
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },

          xAxis: {
            type: "category",
            boundaryGap: false,
            data: time_data
          },
          yAxis: {},
          series: [
            {
              name: "X轴",
              type: "line",
              stack: "X轴倾斜度",
              data: x_data
            },
            {
              name: "Y轴",
              type: "line",
              stack: "Y轴倾斜度",
              data: y_data
            },
            {
              name: "电量",
              type: "line",
              stack: "电量",
              data: power_data
            }
          ]
        };

        myCharts.setOption(option);
        this.loading = false;
      });
    },
    add() {
      if (this.multipleSelection == "") {
        this.$message({
          message: "请选择需要转移的数据",
          type: "warning"
        });
      } else {
        this.dgVisible = true;
        this.$post("/api/v2/depart/get-departlist", {
          departID: this.departID
        }).then(res => {
          // this.data = res.data.data.list;
          const data = res.data.data.list;
          for (var i = 0; i < data.length; i++) {
            var str = data[i].departID;
            data[i].pid = str.substr(
              0,
              str.lastIndexOf("/", str.lastIndexOf("/") - 1) + 1
            );
            if (data[i].departID == "1/") {
              data[i].pid = "0";
            }
            // return data;
          }
          // console.log(data);
        });
      }
    },
    refer() {
      // console.log(this.checkdevice);
      // console.log(this.vals);
      this.$post("/api/v2/sensor/device-bind-sub", {
        sensorID: this.vals.sensorID,
        deviceSerial: this.checkdevice.deviceSerial
      }).then(res => {
        // console.log(res);
      });
      this.tableData[this.indexs].deviceName = this.checkdevice.deviceName;
      this.tableData[this.indexs].deviceSerial = this.checkdevice.deviceSerial;
      this.tableData[this.indexs].location = this.checkdevice.location;
      this.dialogVisible = false;
    },
    binding(val, index) {
      // console.log(index);
      this.dialogVisible = true;
      let length = this.datalist.length;
      if (length > 0) {
        this.datalist = [];
      }
      this.$post("/api/v2/sensor/device-not-bind", {
        departID: val.departID
      }).then(res => {
        // console.log(res);
        this.datalist = res.data.data.list;
      });
      this.vals = val;
      this.indexs = index;
    },
    open() {
      this.$message({
        message: "传感器已绑定设备，如需重新绑定设备，请先取消原绑定",
        type: "warning"
      });
    },
    unbundling(val, index) {
      // console.log(val, index);
      if (val.deviceName != "") {
        this.$confirm(`确定取消与设备${val.deviceName}的绑定`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            // console.log(val.sensorID, val.deviceSerial);
            this.$post("/api/v2/sensor/device-bind-cancel", {
              sensorID: val.sensorID,
              deviceSerial: val.deviceSerial
            }).then(res => {
              // console.log(res);
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
                this.tableData[index].location = res.data.data.location;
                this.tableData[index].deviceSerial = "";
                this.tableData[index].deviceName = "";
              } else {
                this.$message.error(res.data.msg);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消解绑"
            });
          });
      } else {
        this.$message.error("未绑定设备，无需解绑");
      }
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
    submit() {
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
      // console.log(val);
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
  },
  computed: {
    Newitems() {
      var _this = this;
      var Newitems = [];
      var datalist = _this.datalist;
      datalist.map(function(item) {
        if (
          item.deviceName.search(_this.search) != -1 ||
          item.deviceSerial.search(_this.search) != -1
        ) {
          Newitems.push(item);
        }
      });
      return Newitems;
    },
    Newitem() {
      var _this = this;
      var Newitem = [];
      var tableData = _this.tableData;
      tableData.map(function(item) {
        if (
          item.sensorID.search(_this.input3) != -1 ||
          item.smsNum.search(_this.input3) != -1 ||
          item.sensorName.search(_this.input3) != -1 ||
          item.departName.search(_this.input3) != -1 ||
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
.title {
  font-size: 44px;
  margin-top: 10px;
  margin-left: 30px;
  margin-bottom: 10px;
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
}
.middle div {
  background-color: #00479d;
  padding: 5px;
  border-radius: 7px;
  margin-left: 10px;
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
#echarts {
  height: 200px;
}
/deep/.el-table th > .cell {
  text-align: center;
}

/deep/.el-table .cell {
  text-align: center;
}
</style>
