<template>
  <div>
    <p class="title">综合在线监测设备管理</p>
    <div class="top">
      <div class="subtext">
        <div v-for="(item, index) in subtext" :key="index">
          <p>{{ item }}</p>
        </div>
      </div>
      <div class="total">
        共有数据：
        <span>{{ total }} </span>条
        <!-- 在线设备： <span>{{ line }}</span >台 
        离线设备： <span> {{ online }}</span>台 -->
      </div>
    </div>
    <div class="search">
      <el-input
        placeholder="数据搜索"
        v-model="input3"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        :row-style="{ height: '20px' }"
        :cell-style="{ padding: '5px' }"
        :data="Newitem"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{ background: '#CFEEFD', color: '#000' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="deviceSerial" label="设备序列号">
        </el-table-column>
        <el-table-column prop="deviceName" label="设备名称"> </el-table-column>
        <el-table-column prop="status" label="在线状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" style="color:red">
              离线
            </span>
            <span v-else style="color:green">
              在线
            </span>
          </template>
        </el-table-column>
        <el-table-column label="直播视频">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" style="color:red">
              <el-button type="primary" :disabled="true">直播</el-button>
            </span>
            <span v-else style="color:green">
              <el-button type="primary">直播</el-button>
            </span>
          </template>
          <el-button type="primary" :disabled="line">直播</el-button>
        </el-table-column>
        <el-table-column label="是否开启定位">
          <template>
            <img
              width="15"
              src="../../../../public/image/device/07.png"
              alt=""
            />
          </template>
        </el-table-column>
        <el-table-column label="实时图像">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" style="color:red">
              <el-button type="primary" :disabled="true">实时图像</el-button>
            </span>
            <span v-else style="color:green">
              <el-button type="primary">实时图像</el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template>
            <img
              width="15"
              src="../../../../public/image/device/03.png"
              alt=""
            />
            &nbsp;&nbsp;&nbsp;
            <img
              width="15"
              src="../../../../public/image/device/04.png"
              alt=""
            />
            &nbsp;&nbsp;&nbsp;
            <img
              width="15"
              src="../../../../public/image/device/01.png"
              alt=""
            />
            &nbsp;&nbsp;&nbsp;
            <img
              width="15"
              src="../../../../public/image/device/02.png"
              alt=""
            />
          </template>
        </el-table-column>
      </el-table>
      <div class="page">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="total"
          @current-change="handleCurrentChange"
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
      tableData: [],
      subtext: [
        "批量转移",
        "批量修改为布控球",
        "增加设备",
        "更新设备列表",
        "修改其他账户的设备名",
        "设备强制上线"
      ],
      total: 0,
      input3: "",

      page: 1,
      pageSize: 10,
      departID: "1/"
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    getData() {
      this.$post("/api/v2/device/devicelist", {
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
    Newitem() {
      var _this = this;
      var Newitem = [];
      var tableData = _this.tableData;
      tableData.map(function(item) {
        if (
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
.table {
  /* border: 1px solid #666666; */
  margin: 0 30px;
  /* height: 500px; */
  /* border-radius: 8px; */
  /* text-align: center; */
}
.title {
  font-size: 40px;
  margin-top: 10px;
  margin-left: 30px;
  margin-bottom: 10px;
}
.top {
  margin: -10px 30px;
  /* margin-bottom: 20px; */
  padding-bottom: 30px;
  border-bottom: 1px solid #666666;
}
.subtext {
  display: flex;
}
.subtext div {
  border: 1px solid #666666;
  border-radius: 5px;
  height: 40px;
  margin-right: 10px;
  margin-bottom: -30px;
}

.top p {
  margin-top: 8px;
  padding: 0 5px;
  font-size: 21px;
  color: #2070ce;
  /* font-weight: bold; */
}
.total {
  float: right;
}
.top span {
  color: #fc2a2a;
  /* margin-bottom: 10px; */
}
.search {
  width: 280px;
  float: right;
  margin: 15px 30px 0 30px;
  height: 50px;
}
.page {
  /* border-top: 1px solid #666666; */
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
