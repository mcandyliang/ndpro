<template>
  <div>
    <p class="title">ISC平台设备</p>
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
        <div @click="photo">
          <p>抓图模块</p>
        </div>
        <div @click="add">
          <p>批量转移</p>
        </div>
        <div @click="updates">
          <p>更新设备</p>
        </div>
      </div>

      <el-dialog
        title="抓图模板列表"
        :visible.sync="dialogVisible"
        width="1200px"
      >
        <el-button
          style="background-color:#009688;color:#fff;margin:10px 0"
          @click="innerVisibles = true"
          >+ 添加模块</el-button
        >
        <el-dialog
          title="添加抓图模板"
          :visible.sync="innerVisibles"
          append-to-body
        >
          <el-form label-position="right" label-width="70px">
            <el-form-item label="计划名称">
              <el-input
                placeholder="请输入抓图计划名称"
                v-model="plans"
              ></el-input>
            </el-form-item>
            <el-form-item label="时间点">
              <el-checkbox-group v-model="checked5">
                <el-checkbox-button
                  v-for="item in checked1"
                  :key="item"
                  :label="item"
                  style="margin:5px 40px 0  0;border:1px solid #f8f8f8"
                  >{{ item }}</el-checkbox-button
                >
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="innerVisibles = false">取 消</el-button>
            <el-button type="primary" @click="inner">确 定</el-button>
          </div>
        </el-dialog>
        <el-table :data="gridData" border>
          <el-table-column property="tempID" label="模板ID"></el-table-column>
          <el-table-column
            property="tempName"
            label="模板名称"
          ></el-table-column>
          <el-table-column
            property="createTime"
            label="创建时间"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="danger"
                size="mini"
                @click="del(scope.row, scope.$index)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false"
            >确 定</el-button
          >
        </div>
      </el-dialog>

      <div>
        <el-table
          ref="multipleTable"
          :data="Newitem"
          tooltip-effect="dark"
          style="width: 100%"
          border
          :row-style="{ height: '20px' }"
          :cell-style="{ padding: '0' }"
          :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
          @selection-change="handleSelectionChange"
          show-overflow-tooltip
        >
          <el-table-column type="selection" width="55"> </el-table-column>

          <el-table-column prop="deviceSerial" label="序列号" width="115">
            <template slot-scope="scope">
              <span v-if="scope.row.deviceSerial == ''"
                ><el-button type="text" @click="open(scope.row, scope.$index)"
                  >输入序列号</el-button
                >
              </span>
              <span v-else
                ><el-button
                  type="text"
                  @click="open(scope.row, scope.$index)"
                  >{{ scope.row.deviceSerial }}</el-button
                >
              </span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="序列号" width="115" v-else>
            <el-button type="text" @click="open">输入序列号</el-button>
          </el-table-column> -->
          <el-table-column
            show-overflow-tooltip
            prop="cameraIndexCode"
            label="设备ID"
            width="140"
          >
            <template slot-scope="scope">
              <span>{{ scope.row.cameraIndexCode }} </span>
            </template> </el-table-column
          ><el-table-column prop="cameraName" label="设备名称">
            <template slot-scope="scope">
              <span v-if="scope.row.cameraName != ''">
                <el-button
                  type="text"
                  @click="input(scope.row, scope.$index)"
                  >{{ scope.row.cameraName }}</el-button
                >
              </span>
              <span v-if="scope.row.cameraName == ''"
                ><el-button
                  type="text"
                  @click="input(scope.row, scope.$index)"
                  >{{ value }}</el-button
                >
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="smsNum" label="卡号" width="150">
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
                    <el-button type="primary" @click="dialogs(scope.row)"
                      >确 定</el-button
                    >
                  </div>
                </el-dialog>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="设备状态" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.status == 0" style="color:red">
                离线
              </span>
              <span v-else style="color:green">
                在线
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="isExtension" label="分级配置" width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.isExtension == 0">
                无
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="wxdepartname" label="隶属部门">
          </el-table-column>
          <el-table-column label="定位">
            <template slot-scope="scope">
              <el-button type="text" @click="location(scope.row)"
                ><img src="../../../../public/image/device/06.png" alt=""
              /></el-button>
              <el-dialog :visible.sync="dialogFormVisibles">
                <p style="text-align:left;margin-top:-50px">
                  设备名称：{{ cameraName }}
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
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                style="margin-right:7px"
                @click="plan(scope.row)"
                >抓图计划</el-button
              >

              <el-dialog :visible.sync="dialogFormVisibless" class="dialog">
                <div>
                  <p>{{ scope.row.cameraName }}:抓图计划配置</p>
                </div>
                <el-form label-position="right" label-width="70px">
                  <el-form-item label="抓图模块">
                    <el-select
                      v-model="values"
                      placeholder="请选择"
                      style="width:93%"
                      @change="change"
                    >
                      <el-option
                        v-for="(item, i) in tempList"
                        :key="i"
                        :label="item.tempName"
                        :value="item.tempID"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="时间点">
                    <el-checkbox-group v-model="checked2">
                      <el-checkbox-button
                        v-for="item in checked1"
                        :key="item"
                        :label="item"
                        disabled
                        style="margin:5px 40px 0  0;border:1px solid #f8f8f8"
                        >{{ item }}</el-checkbox-button
                      >
                    </el-checkbox-group>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibless = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="dialogFormVisibless = false"
                    >确 定</el-button
                  >
                </div>
              </el-dialog>
              <el-button size="mini" type="primary" @click="orders(scope.row)"
                >命令配置</el-button
              >
              <el-dialog :visible.sync="dialogFormVisiblesss" class="dialog">
                <div>
                  <p>{{ scope.row.cameraName }}:预留命令配置</p>
                </div>
                <el-form label-position="right" label-width="70px">
                  <el-form-item label="命令配置">
                    <el-checkbox-group v-model="checked3">
                      <el-checkbox-button
                        v-for="item in checked4"
                        :key="item"
                        :label="item"
                        style="margin:5px 40px 0  0;border:1px solid #f8f8f8"
                        @change="command(item)"
                        >{{ item }}</el-checkbox-button
                      >
                    </el-checkbox-group>
                  </el-form-item>
                </el-form>
                <el-dialog
                  width="20%"
                  title="设置命令名称"
                  :visible.sync="innerVisible"
                  append-to-body
                >
                  <el-input v-model="order"></el-input>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="fix">取 消</el-button>
                    <el-button type="primary" @click="innerVisible = false"
                      >确 定</el-button
                    >
                  </div>
                </el-dialog>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisiblesss = false"
                    >取 消</el-button
                  >
                  <el-button type="primary" @click="revise">确 定</el-button>
                </div>
              </el-dialog>
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
      dialogFormVisible: false,
      order: "",
      dialogFormVisibles: false,
      dialogFormVisibless: false,
      dialogFormVisiblesss: false,
      dialogVisible: false,
      innerVisibles: false,
      innerVisible: false,
      checked1: [
        "00点整",
        "01点整",
        "02点整",
        "03点整",
        "04点整",
        "05点整",
        "06点整",
        "07点整",
        "08点整",
        "09点整",
        "10点整",
        "11点整",
        "12点整",
        "13点整",
        "14点整",
        "15点整",
        "16点整",
        "17点整",
        "18点整",
        "19点整",
        "20点整",
        "21点整",
        "22点整",
        "23点整"
      ],
      checked3: [],
      checked4: [
        "命令1",
        "命令2",
        "命令3",
        "命令4",
        "命令5",
        "命令6",
        "命令7",
        "命令8",
        "命令9",
        "命令10"
      ],
      tempList: [],
      checked5: [],
      disabled: true,
      checked2: [],
      input1: "",
      input2: "",
      center: [0, 0],
      zoom: 15,
      index: 0,
      cameraName: "",
      val: {},
      form: {
        name: "",
        region: "",
        regions: "",
        num: ""
      },
      offerList: [],
      companyList: [],
      formLabelWidth: "120px",
      input3: "",
      tableData: [],
      departID: "1/",
      page: 1,
      pageSize: 10,
      total: 0,
      value: "输入序列号",
      values: "",
      companyID: "",
      offerID: "",
      gridData: [],
      plans: ""
    };
  },
  created() {
    this.getData();
  },
  updated() {
    this.createMap();
  },

  methods: {
    add() {},
    updates() {
      this.$post("/api/v2/isc/updateCameraList").then(res => {
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
    del(val, index) {
      // console.log(val, index);
      this.$post("/api/v2/isc/templist-del", {
        tempID: val.tempID
      }).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.gridData.splice(index, 1);
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    inner() {
      // console.log(this.checked5);
      // this.innerVisibles = false;
      let checked = this.checked5.join();
      let checked1 = checked.split("点整");
      let checked2 = checked1.join();
      let checked3 = checked2.split(",");
      for (var i = 0; i < checked3.length; i++) {
        if (checked3[i] == "") {
          checked3.splice(i, 1);
        }
      }
      // console.log(checked3.join());
      this.$post("/api/v2/temp/templist-add", {
        tempName: this.plans,
        timeList: checked3.join()
      }).then(res => {
        // console.log(res);
        if (res.data.code == 200) {
          this.$message({
            message: res.data.msg,
            type: "success"
          });
          this.photo();
        } else {
          this.$message.error(res.data.msg);
        }
      });
      // console.log(this.plans);
      this.innerVisibles = false;
    },
    photo() {
      this.$post("/api/v2/temp/templist-get").then(res => {
        // console.log(res);
        this.gridData = res.data.data.list;
      });
      this.dialogVisible = true;
    },
    fix() {
      this.checked3.forEach((item, i) => {
        if (item == this.order) {
          this.checked3.splice(i, 1);
        }
      });
      this.innerVisible = false;
    },
    revise() {
      // console.log(this.val.cameraIndexCode);
      // console.log(this.timeList);
      // console.log(this.values);
      this.$post("/api/v2/isc/update-catch-plan", {
        cameraIndexCode: this.val.cameraIndexCode,
        timeList: this.timeList,
        tempID: this.values
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
    },
    orders(val) {
      this.dialogFormVisiblesss = true;
      this.val = val;
      // console.log(this.val);
    },
    command(item) {
      // console.log(item);
      this.innerVisible = true;
      this.order = item;
      // console.log(this.checked3);
    },
    plan(val) {
      // console.log(val);
      this.dialogFormVisibless = true;
      this.$post("/api/v2/isc/catch-plan-temp", {
        cameraIndexCode: val.cameraIndexCode
      }).then(res => {
        // console.log(res);
        this.values = res.data.data.tempID;
        // console.log(this.values);
        this.tempList = res.data.data.tempList;
        res.data.data.tempList.forEach(item => {
          if (this.values == item.tempID) {
            this.timeList = item.timeList;
            let arr = item.timeList.split(",");
            let checked = new Array();
            for (var i = 0; i < arr.length; i++) {
              checked.push(arr[i] + "点整");
              this.checked2 = checked;
            }
          }
        });
      });
    },
    change(items) {
      this.tempList.forEach(item => {
        if (items == item.tempID) {
          let arr = item.timeList.split(",");
          let checked = new Array();
          for (var i = 0; i < arr.length; i++) {
            checked.push(arr[i] + "点整");
            this.checked2 = checked;
          }
        }
      });
    },
    update() {
      this.center = [this.input1, this.input2];
      // console.log(this.val.cameraIndexCode);
      let location = this.input1 + "," + this.input2;

      this.$post("/api/v2/isc/update-location-info", {
        cameraIndexCode: this.val.cameraIndexCode,
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
      this.cameraName = val.cameraName;
      let lng = val.location.split(",")[0];
      let lat = val.location.split(",")[1];
      // console.log(lng, lat);
      this.input1 = lng;
      this.input2 = lat;
      this.center = [lng, lat];
      this.val = val;
    },
    createMap() {
      this.$amap = new AMap.Map("container", {
        resizeEnable: true,
        center: this.center,
        zoom: this.zoom
      });
      this.geocoder = new AMap.Geocoder({});
      this.$amap.on("click", this.showInfoClick);
    },

    showInfoClick(e) {
      const lnglats = [e.lnglat.getLng(), e.lnglat.getLat()];
      console.log(lnglats);
    },

    dialogs(val) {
      this.tableData[this.index].smsNum = this.form.num;
      this.$post("/api/v2/sms/update-sms-info", {
        cameraIndexCode: this.val.cameraIndexCode,
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

      this.dialogFormVisible = false;
    },
    dialog(val, index) {
      // console.log(val);
      this.index = index;
      this.val = val;
      this.form.name = val.cameraName;
      if (val.smsNum != "") {
        this.form.num = val.smsNum;
      } else {
        this.form.num = "";
      }

      this.$post("/api/v2/sms/get-sms-info", {
        cameraIndexCode: val.cameraIndexCode
      }).then(res => {
        // console.log(res);
        this.form.region = res.data.data.companyID;
        this.companyList = res.data.data.companyList;
        this.offerList = res.data.data.offerList;
        this.form.regions = res.data.data.offerID;
        let offerList = this.offerList;
        let companyList = this.companyList;
        localStorage.setItem("offerList", JSON.stringify(offerList));
        localStorage.setItem("companyList", JSON.stringify(companyList));
      });
      this.dialogFormVisible = true;
    },
    input(val, index) {
      this.$prompt("请输入设备名称", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: val.cameraName
      })
        .then(({ value }) => {
          // this.$alert(value);
          this.value = value;
          this.$post("/api/v2/device/update-device-name", {
            cameraName: value,
            cameraIndexCode: val.cameraIndexCode
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
          this.tableData[index].cameraName = value;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    open(val, index) {
      // console.log(val);
      // console.log(index);
      this.$prompt("请输入序列号", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: val.deviceSerial
      })
        .then(({ value }) => {
          // this.$alert(value);
          this.$post("/api/v2/device/update-device-serial", {
            deviceSerial: value,
            cameraIndexCode: val.cameraIndexCode
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getData() {
      this.$post("/api/v2/device/devicelist-isc", {
        page: this.page,
        pageSize: this.pageSize,
        departID: this.departID
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
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
          item.deviceSerial.search(_this.input3) != -1 ||
          item.cameraIndexCode.search(_this.input3) != -1 ||
          item.cameraName.search(_this.input3) != -1 ||
          item.smsNum.search(_this.input3) != -1 ||
          item.wxdepartname.search(_this.input3) != -1
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
  margin-top: 20px;
  margin-left: 30px;
  margin-bottom: 0;
}

.table {
  border: 1px solid #666666;
  margin: 10px 30px;
}

.search {
  /* margin: 10px; */
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
  margin: 10px;
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
.dialog {
  text-align: left;
}

.dialog p {
  margin-top: -50px;
  margin-left: -10px;
}

/deep/.el-table th > .cell {
  text-align: center;
}

/deep/.el-table .cell {
  text-align: center;
}
</style>
