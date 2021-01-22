<template>
  <div>
    <p class="title">边坡位移设备</p>
    <div class="top">
      <el-button type="text" @click="add">
        <div>
          <p>增加设备</p>
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
          :data="tableData"
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
            prop="deviceName"
            label="设备名称"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button type="text" @click="modify(scope.row)">{{
                scope.row.deviceName
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="deviceSerial"
            label="gnss设备序列号"
            show-overflow-tooltip
            width="130"
          >
          </el-table-column>
          <el-table-column
            label="设备类型(0:基站;1:点位)"
            show-overflow-tooltip
            width="175"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">
                <el-button type="text" @click="type(scope.row)"
                  >点位</el-button
                ></span
              >
              <span v-else>
                <el-button type="text" @click="type(scope.row)">基站</el-button>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            label="摄像机序列号"
            show-overflow-tooltip
            width="105"
          >
            <template slot-scope="scope">
              <el-button type="text">{{ scope.row.cameraSerial }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="cameraName"
            label="摄像机名称"
            show-overflow-tooltip
            width="100"
          >
          </el-table-column>
          <el-table-column
            prop="departName"
            label="部门名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="摄像机卡号" show-overflow-tooltip width="95">
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
          <el-table-column label="dtu卡号" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="scope.row.dtuNum != ''"
                @click="dialogs(scope.row, scope.$index)"
                >{{ scope.row.dtuNum }}</el-button
              >
              <el-button
                type="text"
                v-else
                @click="dialogs(scope.row, scope.$index)"
                >无</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="warning" label="预警值" show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="x"
            label="横向标准值"
            show-overflow-tooltip
            width="95"
          >
          </el-table-column>
          <el-table-column
            prop="y"
            label="纵向标准值"
            show-overflow-tooltip
            width="95"
          >
          </el-table-column>
          <el-table-column
            prop="z"
            label="垂直标准值"
            show-overflow-tooltip
            width="95"
          >
          </el-table-column>
          <el-table-column
            prop="createTime"
            label="创建时间"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="400">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="build(scope.row)"
                >取消绑定</el-button
              >
              <el-button type="warning" size="mini">gnss数据</el-button>
              <el-button type="warning" size="mini" @click="set(scope.row)"
                >设置gnss标准数据</el-button
              >
              <el-button type="danger" size="mini" @click="del(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="159">
        </el-pagination>
      </div>
    </div>
    <el-dialog
      title="修改sms信息"
      :visible.sync="dialogFormVisible"
      width="800px"
    >
      <el-form :model="form">
        <el-form-item label="GNSS" label-width="120px">
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
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="修改dtu信息" :visible.sync="dialogVisible" width="800px">
      <el-form :model="forms">
        <el-form-item label="GNSS" label-width="120px">
          <el-input v-model="forms.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="输入卡号" :label-width="formLabelWidth">
          <el-input v-model="forms.num" placeholder="请输入卡号"></el-input>
        </el-form-item>
        <el-form-item label="公司列表" :label-width="formLabelWidth">
          <el-select
            v-model="forms.region"
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
            v-model="forms.regions"
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
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="设置标准值" :visible.sync="dia" width="800px">
      <el-form :model="formss" :label-width="formLabelWidth">
        <el-form-item label="点位">
          <el-input v-model="formss.name"></el-input>
        </el-form-item>
        <el-form-item label="预警值">
          <el-input v-model="formss.warning"></el-input>
        </el-form-item>
        <el-form-item label="横向标准值">
          <el-input v-model="formss.x"></el-input> </el-form-item
        ><el-form-item label="纵向标准值">
          <el-input v-model="formss.y"></el-input> </el-form-item
        ><el-form-item label="垂直标准值">
          <el-input v-model="formss.z"></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align:center">
        <el-button type="success">立即提交</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dia = false">取 消</el-button>
        <el-button type="primary" @click="dia = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="添加gnss设备" :visible.sync="dias" width="800px">
      <el-form :model="formsss" :label-width="formLabelWidth">
        <el-form-item label="选择设备类型">
          <el-select v-model="formsss.region" style="width:100%">
            <el-option label="基站" value="0"></el-option>
            <el-option label="点位" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备名称">
          <el-input
            v-model="formsss.name"
            placeholder="只能由字母开头，且只能包含字母，下划线和数字"
          ></el-input>
        </el-form-item>
        <el-form-item label="设备唯一码">
          <el-input
            v-model="formsss.only"
            placeholder="只能由字母开头，且只能包含字母，下划线和数字"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dias = false">取 消</el-button>
        <el-button type="primary" @click="dias = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input3: "",
      tableData: [
        {
          deviceName: "0617",
          deviceSerial: "0617",
          type: 0,
          cameraSerial: "E86605171",
          cameraName: "元高线YN7",
          departName: "鄂尔多斯基建",
          smsNum: "89860473102070419368",
          dtuNum: "89860403102090216688",
          warning: 1,
          x: "18579089.68",
          y: "10702864.1176",
          z: "18579089.68",
          createTime: "2020-11-16 15:59:06"
        },
        {
          deviceName: "0617",
          deviceSerial: "0617",
          type: 1,
          cameraSerial: "E86605171",
          cameraName: "元高线YN7",
          departName: "鄂尔多斯基建",
          smsNum: "",
          dtuNum: "89860403102090216688",
          warning: 1,
          x: "18579089.68",
          y: "10702864.1176",
          z: "18579089.68",
          createTime: "2020-11-16 15:59:06"
        }
      ],
      multipleSelection: [],
      dia: false,
      dias: false,
      dialogFormVisible: false,
      dialogVisible: false,
      form: {
        name: "",
        region: "",
        regions: "",
        num: ""
      },
      forms: {
        name: "",
        region: "",
        regions: "",
        num: ""
      },
      formss: {
        name: "",
        warning: "",
        x: "",
        y: "",
        z: ""
      },
      formsss: {
        name: "",
        region: "0",
        only: ""
      },
      offerList: [],
      companyList: [],
      formLabelWidth: "120px"
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    set(val) {
      this.dia = true;
      this.formss.name = val.deviceSerial;
      this.formss.warning = val.warning;
      this.formss.x = val.x;
      this.formss.y = val.y;
      this.formss.z = val.z;
    },
    del(val) {
      this.$confirm("确定删除边坡位移设备?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "取消成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    build(val) {
      this.$confirm("确定取消绑定摄像机?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "取消成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    modify(val) {
      this.$prompt("重命名", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: val.deviceName,
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\,/]{1,40000}$/,
        inputErrorMessage: "设备名称不能为空"
      })
        .then(({ value }) => {})
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    type(val) {
      this.$prompt("设备是否为基站；1代表不是；0代表是", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: val.type,
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\0,/]{1,40000}$/,
        inputErrorMessage: "设备类型不能为空"
      })
        .then(({ value }) => {})
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
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

      //   this.$post("/api/v2/sms/get-sms-info", {
      //     cameraIndexCode: val.cameraIndexCode
      //   }).then(res => {
      //     // console.log(res);
      //     this.form.region = res.data.data.companyID;
      //     this.companyList = res.data.data.companyList;
      //     this.offerList = res.data.data.offerList;
      //     this.form.regions = res.data.data.offerID;
      this.offerList = JSON.parse(this.$store.getters.getofferList);
      this.companyList = JSON.parse(this.$store.getters.getcompanyList);
      //   });
      this.dialogFormVisible = true;
    },
    dialogs(val, index) {
      // console.log(val);
      //   this.index = index;
      //   this.val = val;
      this.forms.name = val.deviceName;
      if (val.dtuNum != "") {
        this.forms.num = val.dtuNum;
      } else {
        this.forms.num = "";
      }

      //   this.$post("/api/v2/sms/get-sms-info", {
      //     cameraIndexCode: val.cameraIndexCode
      //   }).then(res => {
      //     // console.log(res);
      //     this.form.region = res.data.data.companyID;
      //     this.companyList = res.data.data.companyList;
      //     this.offerList = res.data.data.offerList;
      //     this.form.regions = res.data.data.offerID;
      this.offerList = JSON.parse(this.$store.getters.getofferList);
      this.companyList = JSON.parse(this.$store.getters.getcompanyList);
      //   });
      this.dialogVisible = true;
    },
    meal() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择需要转移的数据"
        });
      }
    },

    add() {
      this.dias = true;
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
/deep/.el-table th > .cell {
  text-align: center;
}

/deep/.el-table .cell {
  text-align: center;
}
</style>
