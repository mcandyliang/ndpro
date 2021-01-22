<template>
  <div>
    <p class="title">传感器列表</p>
    <div class="top">
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
            prop="id"
            label="传感器ID"
            show-overflow-tooltip
            width="130"
          >
          </el-table-column>
          <el-table-column
            prop="deviceName"
            label="传感器名称"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <el-button type="text" @click="modify(scope.row)">{{
                scope.row.deviceName
              }}</el-button>
            </template>
          </el-table-column>

          <el-table-column label="类型">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 1">
                <el-button type="text" @click="type(scope.row)"
                  >螺丝松动</el-button
                ></span
              >
              <span v-else>
                <el-button type="text" @click="type(scope.row)"
                  >无线测温</el-button
                >
              </span>
            </template>
          </el-table-column>

          <el-table-column prop="warning" label="预警值">
            <template slot-scope="scope">
              <el-button type="text" @click="warn(scope.row)">{{
                scope.row.warning
              }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="tower" label="绑定的杆塔"> </el-table-column>

          <el-table-column
            prop="createTime"
            label="创建时间"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="400">
            <template slot-scope="scope">
              <el-button type="warning" size="mini">数据</el-button>
              <el-button type="primary" size="mini" @click="build(scope.row)"
                >取消绑定</el-button
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      input3: "",
      tableData: [
        {
          id: "57016891413633793540555065",
          deviceName: "绝缘子",
          type: 0,
          warning: 50,
          tower: "951干召线",
          createTime: "2020-11-16 15:59:06"
        },
        {
          id: "57016891413633793540555065",
          deviceName: "绝缘子",
          type: 1,
          warning: 50,
          tower: "951干召线",
          createTime: "2020-11-16 15:59:06"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    del(val) {
      this.$confirm("确定删除传感器?", "提示", {
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
      this.$confirm("确定取消绑定?", "提示", {
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
    warn(val) {
      this.$prompt("设置预警值", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputValue: val.warning,
        inputPattern: /^[a-zA-Z0-9\u4e00-\u9fa5\,/]{1,40000}$/,
        inputErrorMessage: "预警值不能为空"
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
      this.$prompt("0代表无线测温；1代表螺丝松动", "提示", {
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

    meal() {
      if (this.multipleSelection.length == 0) {
        this.$message({
          type: "warning",
          message: "请选择需要转移的数据"
        });
      }
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
