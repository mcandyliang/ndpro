<template>
  <div>
    <p class="title">杆塔列表</p>
    <div class="top">
      <el-button type="text" @click="add">
        <div>
          <p>添加杆塔</p>
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
          <el-table-column prop="deviceName" label="杆塔名称">
            <template slot-scope="scope">
              <el-button type="text" @click="modify(scope.row)">{{
                scope.row.deviceName
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="定位">
            <template slot-scope="scope">
              <el-button type="text"
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
              <el-button type="warning" size="mini">传感器数据</el-button>
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
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <el-dialog title="添加杆塔" :visible.sync="dias" width="800px">
      <el-form :model="formsss" :label-width="formLabelWidth">
        <el-form-item label="定位">
          <el-input
            v-model="formsss.location"
            placeholder="请输入经纬度，中间用逗号隔开"
          ></el-input>
        </el-form-item>
        <el-form-item label="杆塔名称">
          <el-input
            v-model="formsss.name"
            placeholder="点击输入杆塔名称"
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
          deviceName: "951干召线",
          smsNum: "62626",
          createTime: "2020-11-16 15:59:06"
        },
        {
          deviceName: "110力华线",
          smsNum: "",
          createTime: "2020-11-16 15:59:06"
        }
      ],
      multipleSelection: [],

      dias: false,
      dialogFormVisible: false,

      form: {
        name: "",
        region: "",
        regions: "",
        num: ""
      },

      formsss: {
        name: "",
        location: ""
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
