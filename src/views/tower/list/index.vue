<template>
  <div>
    <p class="title">测温设备</p>
    <div class="top">
      <el-button type="text" @click="add">
        <div>
          <p>添加测温设备</p>
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
          <el-table-column label="设备名称">
            <template slot-scope="scope">
              <el-button type="text" @click="modify(scope.row, scope.$index)">{{
                scope.row.towerName
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="定位">
            <template slot-scope="scope">
              <el-button type="text" @click="location(scope.row, scope.$index)"
                ><img src="../../../../public/image/device/06.png" alt=""
              /></el-button>
            </template>
          </el-table-column>

          <el-table-column label="流量卡号">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="scope.row.smsNum != ''"
                @click="dialog(scope.row, scope.$index)"
                >{{ scope.row.smsNum }}</el-button
              >
              <el-button
                type="text"
                v-else
                @click="dialog(scope.row, scope.$index)"
                >无</el-button
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
                >传感器数据</el-button
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
    </div>
    <el-dialog
      title="修改sms信息"
      :visible.sync="dialogFormVisible"
      width="800px"
    >
      <el-form :model="form">
        <el-form-item label="dtu" label-width="120px">
          <el-input v-model="form.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item
          label="输入卡号"
          :label-width="formLabelWidth"
          :disabled="true"
        >
          <el-input v-model="form.num" placeholder="请输入卡号"></el-input>
        </el-form-item>
        <el-form-item label="公司列表" :label-width="formLabelWidth">
          <el-select
            v-model="form.region"
            style="width:100%"
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
        <el-form-item label="套餐详情" :label-width="formLabelWidth">
          <el-select
            v-model="form.regions"
            style="width:100%"
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加测温设备" :visible.sync="dias" width="800px">
      <el-form :model="formsss" :label-width="formLabelWidth">
        <el-form-item label="设备名称">
          <el-input
            v-model="formsss.name"
            placeholder="点击输入设备名称"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dias = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
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
    <el-dialog :visible.sync="dialogFormVisibles">
      <p style="text-align:left;margin-top:-50px">设备名称：{{ towerName }}</p>
      <div style="height:500px">
        <div style="height:80px">
          <el-input v-model="input1" style="float:left;width:200px"> </el-input>
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
        <el-button @click="dialogFormVisibles = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibles = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="请选择部门" :visible.sync="dialogVisible">
      <div style="height:600px;overflow:auto">
        <ul id="test" class="ztree"></ul>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="transfer">确 定</el-button>
      </div>
    </el-dialog>
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
      multipleSelection: [],
      number: "1",
      dias: false,
      dialogFormVisible: false,
      dialogFormVisibles: false,
      dialogVisibles: false,
      dialogVisible: false,
      value1: "",
      form: {
        name: "",
        region: "",
        regions: "",
        num: ""
      },
      departID: "1/",
      formsss: {
        name: "",
        location: ""
      },
      offerList: [],
      companyList: [],
      formLabelWidth: "120px",
      valss: {},
      loading: true,
      total: 0,
      val: {},
      vals: {},
      index: 0,
      ind: 0,
      locations: "106.495748,29.619923",
      center: [0, 0],
      zoom: 15,
      towerName: "",
      input1: "",
      input2: ""
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    update() {
      this.center = [this.input1, this.input2];
      // console.log(this.val.cameraIndexCode);
      let location = this.input1 + "," + this.input2;

      this.$post("/temperatureMonitoring/setLocation", {
        towerId: this.vals.towerId,
        location: location
      }).then(res => {
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.tableData[this.ind].location = location;
        } else {
          this.$message.error(res.data.msg);
        }
        // console.log(res);
      });
    },
    location(val, index) {
      // console.log(val);
      this.dialogFormVisibles = true;
      this.towerName = val.towerName;
      let lng = val.location.split(",")[0];
      let lat = val.location.split(",")[1];
      // console.log(lng, lat);
      this.input1 = lng;
      this.input2 = lat;
      this.center = [lng, lat];
      this.vals = val;
      this.ind = index;
    },
    del(val, index) {
      this.$confirm("确定删除设备?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // console.log(val);
          this.$post("/temperatureMonitoring/deleteTower", {
            towerId: val.towerId
          }).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: res.msg
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
    submit() {
      if (this.formsss.name == "") {
        this.$message({
          message: "请输入设备名称",
          type: "warning"
        });
      } else {
        this.$post("/temperatureMonitoring/insertTower", {
          towerName: this.formsss.name,
          wxdepartid_alter: this.departID,
          location: this.locations
        }).then(res => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: res.msg
            });
            this.tableData.push({ towerName: this.formsss.name });

            this.dialogFormVisible = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    record(val) {
      if (this.dialogVisibles == false) {
        this.loading = true;
      }
      this.dialogVisibles = true;
      this.valss = val;

      let start = Date.parse(new Date()) - 36000000;
      let end = Date.parse(new Date());
      // console.log(val);
      let power_data = [];
      let x_data = [];
      let y_data = [];
      let time_data = [];
      // console.log(123);
      this.$post("/api/v1/new/datalist", {
        towerID: val.towerId,
        startTime: start,
        endTime: end
      }).then(res => {
        // console.log(res);
        // console.log(res.data.data.list[0].tempList);
        if (res.data.msg == "该时间段没有数据") {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
          this.loading = false;
          echarts.init(document.getElementById("echarts")).dispose();
        } else {
          res.data.data.list[0].tempList.forEach(item => {
            // power_data.push(item[1]);
            if (item == "null") {
              item = "0";
            }
            power_data.push(item);
          });

          res.data.data.list[1].tempList.forEach(item => {
            // power_data.push(item[1]);
            if (item == "null") {
              item = "0";
            }
            x_data.push(item);
          });
          res.data.data.list[2].tempList.forEach(item => {
            // power_data.push(item[1]);
            if (item == "null") {
              item = "0";
            }
            y_data.push(item);
          });
          res.data.data.list[0].timeList.forEach(item => {
            time_data.push(item);
          });
          // console.log(power_data, x_data, y_data, time_data);
          var myCharts = echarts.init(document.getElementById("echarts"));
          var option = {
            title: {
              text: "无线测温折线图"
            },
            tooltip: {
              trigger: "axis"
            },
            legend: {
              data: ["线夹C相", "线夹B相", "线夹A相"],
              selected: {
                线夹C相: true,
                线夹B相: true,
                线夹A相: true
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
                data: x_data,
                smooth: true
              },
              {
                name: "线夹B相",
                type: "line",
                stack: "线夹B相",
                data: y_data,
                smooth: true
              },
              {
                name: "线夹A相",
                type: "line",
                stack: "线夹A相",
                data: power_data,
                smooth: true
              }
            ]
          };

          myCharts.setOption(option);
          this.loading = false;
        }
      });
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
      this.$post("/api/v1/new/datalist", {
        towerID: this.valss.towerId,
        startTime: start,
        endTime: end
      }).then(res => {
        // console.log(res);
        // console.log(res.data.data.list[0].tempList);
        if (res.data.msg == "该时间段没有数据") {
          this.$message({
            message: res.data.msg,
            type: "warning"
          });
          this.loading = false;
          echarts.init(document.getElementById("echarts")).dispose();
        } else {
          res.data.data.list[0].tempList.forEach(item => {
            // power_data.push(item[1]);
            if (item == "-274") {
              item = "0";
            }
            power_data.push(item);
          });

          res.data.data.list[1].tempList.forEach(item => {
            // power_data.push(item[1]);
            if (item == "-274") {
              item = "0";
            }
            x_data.push(item);
          });
          res.data.data.list[2].tempList.forEach(item => {
            // power_data.push(item[1]);
            if (item == "-274") {
              item = "0";
            }
            y_data.push(item);
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
              data: ["线夹C相", "线夹B相", "线夹A相"],
              selected: {
                线夹C相: true,
                线夹B相: true,
                线夹A相: true
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
              },
              {
                name: "线夹B相",
                type: "line",
                stack: "线夹B相",
                data: y_data
              },
              {
                name: "线夹A相",
                type: "line",
                stack: "线夹A相",
                data: power_data
              }
            ]
          };
          myCharts.setOption(option);
          this.loading = false;
        }
      });
    },
    modify(val, index) {
      // console.log(index);
      this.$prompt("重命名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: val.towerName,
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\,/]{1,40000}$/,
        inputErrorMessage: "设备名称不能为空"
      })
        .then(({ value }) => {
          this.$post("/temperatureMonitoring/changeTowerName", {
            id: val.id,
            towerName: value
          }).then(res => {
            // console.log(res);
            if (res.data.code == 200) {
              this.$message({
                message: res.data.msg,
                type: "success"
              });
              this.tableData[index].towerName = value;
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
    handleCurrentChange(val) {
      this.number = val;
      this.getData();
    },
    dialog(val, index) {
      // console.log(val);
      this.index = index;
      this.val = val;
      this.form.name = val.towerName;
      if (val.smsNum != "") {
        this.form.num = val.smsNum;
      } else {
        this.form.num = "";
      }
      this.offerList = JSON.parse(this.$store.getters.getofferList);
      this.companyList = JSON.parse(this.$store.getters.getcompanyList);
      this.dialogFormVisible = true;
      this.form.region = val.companyID;
      this.form.regions = val.offerID;
    },
    confirm() {
      this.$post("/temperatureMonitoring/getSmsNumberChange", {
        towerId: this.val.towerId,
        smsNum: this.form.num,
        companyID: this.form.region,
        offerID: this.form.regions
      }).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: res.msg
          });
          this.tableData[this.index].smsNum = this.form.num;
          this.tableData[this.index].companyID = this.form.region;
          this.tableData[this.index].offerID = this.form.regions;

          this.dialogFormVisible = false;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    loaction() {},
    meal() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          message: "请选择需要转移的数据",
          type: "warning"
        });
      } else {
        this.$post("/api/v1/new/getDepart", {
          departID: this.departID
        }).then(res => {
          // console.log(res);
          this.zNodes = res.data.list;
          this.dialogVisible = true;
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
        mtp.push(item.towerId);
      });

      if (this.treeNode == "") {
        this.$message({
          message: "请选择要转移到的部门",
          type: "warning"
        });
      } else {
        // console.log(this.treeNode.id);
        // console.log(mtp.toString());
        this.$post("/temperatureMonitoring/towerExchange", {
          wxdepartid_alter: this.treeNode.id,
          list: mtp.toString()
        }).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            this.$message({
              message: res.data.msg,
              type: "success"
            });
            this.dialogVisible = false;
          } else {
            this.$message.error(res.data.msg);
          }
        });
      }
    },
    getData() {
      this.$post("/api/v1/new/deviceList", {
        wxdepartid_alter: this.departID,
        number: this.number
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.list;
        this.total = res.data.total;
      });
      // console.log(123);
    },
    add() {
      this.dias = true;
    }
  },
  created() {
    this.getData();
    // console.log(123);
  },
  computed: {
    Newitem() {
      var _this = this;
      var Newitem = [];
      var tableData = _this.tableData;
      // console.log(tableData);
      tableData.map(function(item) {
        if (
          item.towerName.search(_this.input3) != -1 ||
          item.smsNum.search(_this.input3) != -1 ||
          item.createTime.search(_this.input3) != -1
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
#echarts {
  height: 200px;
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
