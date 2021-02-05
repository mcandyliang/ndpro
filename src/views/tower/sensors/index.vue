<template>
  <div>
    <p class="title">设备列表</p>
    <div class="top">
      <el-button type="text" @click="add">
        <div>
          <p>添加传感器</p>
        </div></el-button
      >
      <el-button type="text" @click="meal">
        <div>
          <p>批量转移</p>
        </div></el-button
      >
    </div>
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

      <div>
        <el-table
          ref="multipleTable"
          :data="Newitem"
          tooltip-effect="dark"
          style="width: 100%"
          border
          :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
          show-overflow-tooltip
          :row-style="{ height: '20px' }"
          :cell-style="{ padding: '0' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column
            prop="sensorId"
            label="传感器ID"
            show-overflow-tooltip
            width="130"
          >
          </el-table-column>
          <el-table-column prop="sensorName" label="传感器名称">
            <template slot-scope="scope">
              <el-button type="text" @click="modify(scope.row, scope.$index)">{{
                scope.row.sensorName
              }}</el-button>
            </template>
          </el-table-column>

          <el-table-column label="类型">
            <template slot-scope="scope">
              <span v-if="scope.row.sensorType == 1">
                <el-button type="text" @click="type(scope.row, scope.$index)"
                  >螺丝松动</el-button
                ></span
              >
              <span v-else>
                <el-button type="text" @click="type(scope.row, scope.$index)"
                  >无线测温</el-button
                >
              </span>
            </template>
          </el-table-column>

          <el-table-column label="预警值">
            <template slot-scope="scope">
              <el-button type="text" @click="warn(scope.row, scope.$index)">{{
                scope.row.warningValue
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="towerName" label="绑定的杆塔">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="buildind(scope.row, scope.$index)"
                v-if="scope.row.towerName == ''"
                >无</el-button
              >
              <el-button
                v-else
                type="text"
                @click="buildind(scope.row, scope.$index)"
                >{{ scope.row.towerName }}</el-button
              >
            </template>
          </el-table-column>

          <el-table-column
            prop="createTime"
            label="创建时间"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="400">
            <template slot-scope="scope">
              <el-button type="warning" size="mini" @click="record(scope.row)"
                >数据</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="build(scope.row, scope.$index)"
                >取消绑定</el-button
              >

              <el-button
                type="danger"
                size="mini"
                @click="del(scope.row, scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
      <el-dialog title="无线测温折线图" :visible.sync="dialogVisibles">
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
      <el-dialog title="绑定设备" :visible.sync="dialogVisible" width="800px">
        <div style="height:500px">
          <el-form :model="form" label-width="120px">
            <el-form-item label="选择杆塔">
              <el-select
                v-model="form.region"
                placeholder="请选择杆塔"
                style="width:100%"
              >
                <el-option
                  v-for="(item, i) in towerList"
                  :key="i"
                  :label="item.towerName"
                  :value="item.towerId"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button @click="revise" type="primary">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="添加传感器" :visible.sync="dialog" width="800px">
        <el-form :model="forms" label-width="120px">
          <el-form-item label="传感器ID">
            <el-input
              v-model="forms.id"
              placeholder="请输入传感器ID"
            ></el-input>
          </el-form-item>
          <el-form-item label="传感器名称">
            <el-input
              v-model="forms.name"
              placeholder="请输入传感器名称"
            ></el-input>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog = false">取 消</el-button>
          <el-button @click="refer" type="primary">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog title="请选择部门" :visible.sync="dialogs">
        <div style="height:600px;overflow:auto">
          <ul id="test" class="ztree"></ul>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogs = false">取 消</el-button>
          <el-button type="primary" @click="transfer">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      setting: {
        view: {
          dblClickExpand: false,
          showLine: false,
          selectedMulti: false
        },
        data: {
          simpleData: {
            enable: true,
            idkey: "id",
            pIdKey: "pId",
            rootPId: 0
          }
        },
        callback: {
          onClick: this.onNodeClick
        }
      },
      zNodes: [],
      treeNode: "",
      input3: "",
      tableData: [],
      departID: "1/",
      number: "1",
      multipleSelection: [],
      value1: "",
      dialog: false,
      dialogs: false,
      dialogVisible: false,
      dialogVisibles: false,
      loading: true,
      valss: {},
      total: 0,
      towerList: [],
      form: {
        region: ""
      },
      forms: {
        id: "",
        name: ""
      },
      index: 0,
      val: {},
      sensorType: "0",
      warningValue: "50"
    };
  },
  created() {
    this.getdata();
  },
  methods: {
    add() {
      this.dialog = true;
    },
    refer() {
      this.$post("/temperatureMonitoring/insertSensorDevice", {
        sensorId: this.forms.id,
        sensorName: this.forms.name,
        sensorType: this.sensorType,
        warningValue: this.warningValue
      }).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.tableData.push({
            sensorId: this.forms.id,
            sensorName: this.forms.name,
            sensorType: this.sensorType,
            warningValue: this.warningValue,
            towerName: ""
          });
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    buildind(val, index) {
      this.$post("/api/v1/new/towerBindList").then(res => {
        // console.log(res);
        this.towerList = res.data.list;
        this.dialogVisible = true;
        this.form.region = val.towerName;
        this.index = index;
        this.val = val;
      });
    },
    revise() {
      this.$post("/temperatureMonitoring/bindTower", {
        sensorId: this.val.sensorId,
        towerId: this.form.region
      }).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.tableData[this.index].towerName = res.data.data.towerName;
          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleCurrentChange(val) {
      this.number = val;
      this.getdata();
    },
    searchs() {
      echarts.init(document.getElementById("echarts")).dispose();
      this.loading = true;
      let start = this.value1[0];
      let end = this.value1[1];

      let x_data = [];

      let time_data = [];
      this.$post("/api/v1/new/dataOne", {
        sensorId: this.valss.sensorId,
        startTime: start,
        endTime: end
      }).then(res => {
        // console.log(res);
        if (res.data.msg == "该时间段没有数据") {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
          this.loading = false;
        } else {
          res.data.data.list[0].tempList.forEach(item => {
            if (item == "-274") {
              item = "0";
            }
            x_data.push(item);
          });
          res.data.data.list[0].timeList.forEach(item => {
            time_data.push(item);
          });
          var myCharts = echarts.init(document.getElementById("echarts"));
          var option = {
            title: {
              text: "无线测温折现图"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["线夹C相"],
              selected: {
                线夹C相: true
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
                name: "线夹C相",
                type: "line",
                stack: "线夹C相",
                data: x_data
              }
            ]
          };
          myCharts.setOption(option);
          this.loading = false;
        }
      });
    },
    record(val) {
      if (this.dialogVisibles == false) {
        this.loading = true;
        // echarts.init(document.getElementById("echarts")).dispose();
      }
      // console.log(val);
      this.dialogVisibles = true;
      this.valss = val;

      let start = Date.parse(new Date()) - 36000000;
      let end = Date.parse(new Date());
      // console.log(val);

      let x_data = [];

      let time_data = [];
      this.$post("/api/v1/new/dataOne", {
        sensorId: val.sensorId,
        startTime: start,
        endTime: end
      }).then(res => {
        // console.log(res);
        if (res.data.msg == "该时间段没有数据") {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
          this.loading = false;
          echarts.init(document.getElementById("echarts")).dispose();
        } else {
          res.data.data.list[0].tempList.forEach(item => {
            if (item == "-274") {
              item = "0";
            }
            x_data.push(item);
          });
          res.data.data.list[0].timeList.forEach(item => {
            time_data.push(item);
          });

          var myCharts = echarts.init(document.getElementById("echarts"));
          var option = {
            title: {
              text: "无线测温折现图"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["线夹C相"],
              selected: {
                线夹C相: true
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
                name: "线夹C相",
                type: "line",
                stack: "线夹C相",
                data: x_data
              }
            ]
          };

          myCharts.setOption(option);
          this.loading = false;
        }
      });
      // if (this.dialogVisibles == false) {
      //   echarts.init(document.getElementById("echarts")).dispose();
      // }
    },
    getdata() {
      this.$post("/api/v1/new/sensorDeviceList", {
        wxdepartid_alter: this.departID,
        number: this.number
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
    },
    del(val, index) {
      this.$confirm("确定删除传感器?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$post("/temperatureMonitoring/deleteSensorDevice", {
            sensorId: val.sensorId
          }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: res.data.msg
              });
              this.tableData.splice(index, 1);
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    build(val, index) {
      // console.log(val);
      if (val.towerName == "") {
        this.$message({
          message: "该设备未绑定，无需取消绑定",
          type: "warning"
        });
      } else {
        this.$confirm("确定取消绑定?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$post("/temperatureMonitoring/cancelBind", {
              sensorId: val.sensorId
            }).then(res => {
              if (res.data.code == 200) {
                this.$message({
                  type: "success",
                  message: res.data.msg
                });
                this.tableData[index].towerName = "";
                // console.log(this.tableData[index].towerName);
              } else {
                this.$message.error(res.data.msg);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消"
            });
          });
      }
    },
    modify(val, index) {
      this.$prompt("重命名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: val.sensorName,
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\,/]{1,40000}$/,
        inputErrorMessage: "设备名称不能为空"
      })
        .then(({ value }) => {
          this.$post("/temperatureMonitoring/changeSensorName", {
            id: val.id,
            sensorName: value
          }).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.tableData[index].sensorName = value;
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    warn(val, index) {
      this.$prompt("设置预警值", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: val.warningValue,
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\,/]{1,40000}$/,
        inputErrorMessage: "预警值不能为空"
      })
        .then(({ value }) => {
          this.$post("/temperatureMonitoring/changeWarningValue", {
            id: val.id,
            warningValue: value
          }).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.tableData[index].warningValue = value;
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    type(val, index) {
      this.$prompt("0代表无线测温；1代表螺丝松动", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\0,/]{1,40000}$/,
        inputErrorMessage: "设备类型不能为空"
      })
        .then(({ value }) => {
          this.$post("/temperatureMonitoring/changeSensorType", {
            id: val.id,
            sensorType: value
          }).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.tableData[index].sensorType = value;
            } else {
              this.$message.error(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    meal() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择需要转移的数据"
        });
      } else {
        this.$post("/api/v1/new/getDepart", {
          departID: this.departID
        }).then(res => {
          // console.log(res);
          this.zNodes = res.data.list;
          this.dialogs = true;
          this.$nextTick(() => {
            $.fn.zTree.init($("#test"), this.setting, this.zNodes);
          });
        });
      }
      this.treeNode = "";
    },
    onNodeClick(event, treeId, treeNode) {
      // console.log(treeNode);
      this.treeNode = treeNode;
    },
    transfer() {
      // console.log(this.multipleSelection);
      let mtp = [];
      this.multipleSelection.forEach(item => {
        mtp.push(item.sensorId);
      });

      if (this.treeNode == "") {
        this.$message({
          message: "请选择要转移到的部门",
          type: "warning"
        });
      } else {
        // console.log(this.treeNode.id);
        // console.log(mtp.toString());
        this.$post("/temperatureMonitoring/sensorExchange", {
          wxdepartid_alter: this.treeNode.id,
          list: mtp.toString()
        }).then(res => {
          // console.log(res);
          if (res.data.code == 200) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.dialogs = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    }
  },
  computed: {
    Newitem() {
      var _this = this;
      var Newitem = [];
      var tableData = _this.tableData;
      // console.log(tableData);
      tableData.map(function(item) {
        if (
          item.sensorId.search(_this.input3) != -1 ||
          item.warningValue.search(_this.input3) != -1 ||
          item.sensorName.search(_this.input3) != -1 ||
          item.towerName.search(_this.input3) != -1
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
  border: 1px solid #666666;
  margin: 30px 30px;
}

.title {
  font-size: 44px;
  margin-top: 20px;
  margin-left: 30px;
}
.top {
  display: flex;
  /* border-bottom: 1px solid #666666; */
  margin: -40px 30px;
}
.top div {
  border: 1px solid #666666;
  border-radius: 5px;
  height: 40px;
  margin-right: 10px;
}
.top p {
  margin-top: 8px;
  padding: 0 5px;
  font-size: 22px;
  color: #729bdb;
  /* font-weight: bold; */
}
.search {
  width: 280px;
  float: right;
}
.input-with-select {
  width: 250px;
  /* height: 25px; */
  margin: 10px;
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
