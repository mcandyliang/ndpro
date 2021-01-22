<template>
  <div>
    <p class="title">SIM卡管理</p>
    <div class="top">
      <el-button type="text" @click="add">
        <div>
          <p>增加厂商</p>
        </div></el-button
      >
      <el-button type="text" @click="meal">
        <div>
          <p>套餐列表</p>
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
        >
          <el-table-column prop="id" label="厂家ID"> </el-table-column>

          <el-table-column label="厂家名称">
            <template slot-scope="scope">
              <el-button type="text" @click="open(scope.row, scope.$index)">{{
                scope.row.user
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="del(scope.row)"
                ><img src="../../../../public/image/device/05.png" alt=""
              /></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination background layout="prev, pager, next" :total="159">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="套餐列表" :visible.sync="dialogVisible">
      <el-button type="primary" @click="sim">增加套餐</el-button>
      <el-table
        ref="multipleTable"
        :data="tableDatas"
        tooltip-effect="dark"
        style="width: 100%"
        border
        :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
        show-overflow-tooltip
        :row-style="{ height: '20px' }"
        :cell-style="{ padding: '0' }"
      >
        <el-table-column prop="id" label="套餐ID"> </el-table-column>

        <el-table-column label="套餐名称">
          <template slot-scope="scope">
            <el-button type="text" @click="opens(scope.row, scope.$index)">{{
              scope.row.user
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="dels(scope.row)"
              ><img src="../../../../public/image/device/05.png" alt=""
            /></el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
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
          id: "012cf090-50b0-11ea-a89d-7306d7bfcac8",

          user: "深圳领沿达"
        },
        {
          id: "012cf090-50b0-11ea-a89d-7306d7bfcac8",

          user: "深圳领沿达"
        },
        {
          id: "012cf090-50b0-11ea-a89d-7306d7bfcac8",

          user: "深圳领沿达"
        },
        {
          id: "012cf090-50b0-11ea-a89d-7306d7bfcac8",

          user: "深圳领沿达"
        },
        {
          id: "012cf090-50b0-11ea-a89d-7306d7bfcac8",

          user: "深圳领沿达"
        },
        {
          id: "012cf090-50b0-11ea-a89d-7306d7bfcac8",

          user: "深圳领沿达"
        },
        {
          id: "012cf090-50b0-11ea-a89d-7306d7bfcac8",

          user: "深圳领沿达"
        }
      ],
      tableDatas: [
        {
          id: "012cf090-50b0-11ea-a89d-7306d7bfcac8",

          user: "500M/月"
        },
        {
          id: "012cf090-50b0-11ea-a89d-7306d7bfcac8",

          user: "500M/月"
        },
        {
          id: "012cf090-50b0-11ea-a89d-7306d7bfcac8",

          user: "500M/月"
        },
        {
          id: "012cf090-50b0-11ea-a89d-7306d7bfcac8",

          user: "500M/月"
        },
        {
          id: "012cf090-50b0-11ea-a89d-7306d7bfcac8",

          user: "500M/月"
        },
        {
          id: "012cf090-50b0-11ea-a89d-7306d7bfcac8",

          user: "500M/月"
        },
        {
          id: "012cf090-50b0-11ea-a89d-7306d7bfcac8",

          user: "500M/月"
        }
      ],
      dialogVisible: false
    };
  },
  methods: {
    meal() {
      this.dialogVisible = true;
    },
    sim() {
      this.$prompt("请输入套餐", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\,/]{1,40000}$/,
        inputErrorMessage: "套餐不能为空"
      })
        .then(({ value }) => {})
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    add() {
      this.$prompt("请输入厂家名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,40000}$/,
        inputErrorMessage: "厂家名称不能为空"
      })
        .then(({ value }) => {})
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    open(val, index) {
      this.$prompt("修改厂家名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: val.user,
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\,/]{1,40000}$/,
        inputErrorMessage: "厂家名称不能为空"
      })
        .then(({ value }) => {
          this.tableData[index].user = value;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    opens(val, index) {
      this.$prompt("修改套餐名称", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: val.user,
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\,/]{1,40000}$/,
        inputErrorMessage: "套餐名称不能为空"
      })
        .then(({ value }) => {
          this.tableDatas[index].user = value;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    dels(val) {
      this.$confirm("确认要删除吗?", "提示", {
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
    del(val) {
      this.$confirm("确认要删除吗?", "提示", {
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
