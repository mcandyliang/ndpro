<template>
  <div>
    <product :data="data" />
    <div class="table-box">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
      >
        <el-table-column prop="deviceID" label="设备ID" width="300">
        </el-table-column>
        <el-table-column prop="deviceName" label="设备名称"> </el-table-column>
        <el-table-column prop="wxdepartname" label="部门"> </el-table-column>
        <el-table-column prop="deviceType" label="设备类型"> </el-table-column>
        <el-table-column label="设备详细信息">
          <el-button>设备详细信息</el-button>
        </el-table-column>
        <el-table-column label="设置当前配置">
          <el-button>当前配置</el-button></el-table-column
        >
      </el-table>
    </div>
  </div>
</template>

<script>
import Product from "../../../components/product";
export default {
  components: {
    Product
  },
  data() {
    return {
      data: {
        title: "信通电子",
        subtext: ["线路列表", "杆塔列表", "向平台同步设备"],
        total: 2
      },
      tableData: [],
      departID: "1/"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$post("/api/v2/device/devicelist-xintong", {
        page: this.page,
        pageSize: this.pageSize,
        departID: this.departID
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.list;
        res.data.data.list.forEach(item => {
          if (item.deviceType == 0) {
            item.deviceType = "图像";
          }
        });
      });
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 44px;
  margin-top: 40px;
  margin-left: 30px;
}
.top {
  display: flex;
  border-bottom: 1px solid #000;
  margin: 10px 30px;
}
.top div {
  border: 1px solid #000;
  border-radius: 5px;
  height: 40px;
  margin-right: 10px;
}
.top p {
  margin-top: 8px;
  padding: 0 5px;
  font-size: 22px;
  color: #00479d;
  font-weight: bold;
}
.table-box {
  margin: 10px 30px;
}
/deep/.el-table th > .cell {
  text-align: center;
}

/deep/.el-table .cell {
  text-align: center;
}
</style>
