<template>
  <div>
    <product :data="data" />
    <div class="table">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 10px;"
        border
        row-key="towerID"
        :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="towerID" label="设备序列号"> </el-table-column>
        <el-table-column prop="departName" label="设备部门"> </el-table-column>
        <el-table-column prop="towerName" label="设备名称"> </el-table-column>
        <el-table-column prop="status" label="设备状态"> </el-table-column>
        <el-table-column prop="ismajor" label="是否开启定位"> </el-table-column>
        <el-table-column label="操作"> </el-table-column>
      </el-table>

      <div class="page">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="data.total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
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
        title: "全塔可视化设备列表",
        subtext: ["向部门增加线塔", "向部门增加杆塔", "线路列表", "杆塔列表"],
        total: 60,
        search: 1
      },
      input: "",
      page: 1,
      departID: "1/",
      pageSize: 10,

      tableData: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },

    getData() {
      this.$post("/api/v2/device/devicelist-visiual", {
        page: this.page,
        pageSize: this.pageSize,
        departID: this.departID
      }).then(res => {
        // console.log(res);
        this.tableData = res.data.data.list;
        res.data.data.list.forEach(item => {
          item.children.forEach(items => {
            if (items.status === 0) {
              items.status = "离线";
            } else {
              items.status = "在线";
            }
            if (items.ismajor === 0) {
              items.ismajor = "否";
            } else {
              items.ismajor = "是";
            }
          });
        });
      });
    }
  }
};
</script>

<style scoped>
.table {
  margin: -50px 30px;
  /* margin-top: -20px; */
  /* margin-bottom: 20px; */
}
.page {
  /* border-top: 1px solid #666666; */
  margin: -11px;
  padding: 10px 0;
}
/deep/ .el-table th > .cell {
  padding-right: 0;
  text-align: center;
}
/deep/.el-table .cell {
  text-align: center;
  /* width: 180px; */
  /* margin: 0 5px; */
}
</style>
