<template>
  <div>
    <p class="title">全塔可视化设备列表</p>
    <div class="top">
      <div class="subtext">
        <el-button type="text" @click="line">
          <div>
            <p>向部门增加线塔</p>
          </div></el-button
        ><el-button type="text" @click="tower">
          <div>
            <p>向线路增加杆塔</p>
          </div></el-button
        >
        <el-button type="text" @click="equipment">
          <div>
            <p>向杆塔增加设备</p>
          </div></el-button
        >
        <el-button type="text" @click="lineTable">
          <div>
            <p>线路列表</p>
          </div></el-button
        ><el-button type="text" @click="towerTable">
          <div>
            <p>杆塔列表</p>
          </div></el-button
        >
      </div>
      <div class="total">
        共有数据：<span>{{ total }} </span>条

        <!-- 在线设备： <span>{{ line }}</span >台 
        离线设备： <span> {{ online }}</span>台 -->
      </div>
    </div>
    <div class="search">
      <el-input
        placeholder="从当前数据中检索"
        v-model="input"
        class="input-with-select"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
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
        <el-table-column label="设备状态">
          <template slot-scope="scope">
            <span v-if="scope.row.status == 0" style="color:red">
              离线
            </span>
            <span v-else style="color:green">
              在线
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="ismajor" label="是否开启定位"> </el-table-column>
        <el-table-column label="操作"> </el-table-column>
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
    <el-dialog
      title="向部门增加线路"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="线路名称">
          <el-input v-model="form.name" placeholder="请输入线路名称"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select v-model="form.region" style="width:100%">
            <el-option></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="向线路增加杆塔"
      :visible.sync="dialogVisibles"
      width="800px"
    >
      <el-form ref="form" :model="forms" label-width="80px">
        <el-form-item label="选择线路">
          <el-select v-model="forms.region" style="width:100%">
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="杆塔名称">
          <el-input
            v-model="forms.name"
            placeholder="请输入杆塔名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirms">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="向线路增加杆塔"
      :visible.sync="dialogVisibless"
      width="800px"
    >
      <el-form ref="form" :model="formss" label-width="90px">
        <el-form-item label="选择杆塔">
          <el-select v-model="formss.region" style="width:100%">
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择设备">
          <el-select v-model="formss.region" style="width:100%">
            <el-option></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主从摄像机">
          <el-radio-group v-model="formss.resource">
            <el-radio label="主"></el-radio>
            <el-radio label="从"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmss">保存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="线路列表" :visible.sync="dialog">
      <el-table
        :data="tableDatas"
        style="width: 100%"
        border
        stripe
        :row-style="{ height: '20px' }"
        :cell-style="{ padding: '0' }"
      >
        <el-table-column prop="date" label="线路名称"> </el-table-column>
        <el-table-column prop="name" label="部门隶属"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- @click="edit(scope.row)" @click="del(scope.row)"-->
            <el-button type="text">
              <img src="../../../../public/image/device/03.png" alt="" />
            </el-button>
            <el-button type="text">
              <img src="../../../../public/image/device/05.png" alt="" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="杆塔列表" :visible.sync="dialogs">
      <el-table
        :data="tableDatass"
        style="width: 100%"
        border
        stripe
        :row-style="{ height: '20px' }"
        :cell-style="{ padding: '0' }"
      >
        <el-table-column prop="date" label="杆塔名称"> </el-table-column>
        <el-table-column prop="name" label="部门隶属"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- @click="edit(scope.row)" @click="del(scope.row)"-->
            <el-button type="text">
              <img src="../../../../public/image/device/03.png" alt="" />
            </el-button>
            <el-button type="text">
              <img src="../../../../public/image/device/05.png" alt="" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      page: 1,
      departID: "1/",
      pageSize: 10,
      total: 60,
      tableData: [],
      tableDatas: [{ date: "全套可视化", name: "乌海基建" }],
      tableDatass: [{ date: "全套可视化", name: "乌海基建" }],

      dialog: false,
      dialogs: false,
      dialogVisible: false,
      dialogVisibles: false,
      dialogVisibless: false,
      formss: {
        name: "",
        region: "",
        resource: ""
      },
      forms: {
        name: "",
        region: ""
      },
      form: {
        name: "",
        region: ""
      }
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    line() {
      this.dialogVisible = true;
    },
    tower() {
      this.dialogVisibles = true;
    },
    equipment() {
      this.dialogVisibless = true;
    },
    lineTable() {
      this.dialog = true;
    },
    towerTable() {
      this.dialogs = true;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getData();
    },
    confirm() {},
    confirms() {},
    confirmss() {},
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
  /* padding-right: 10px; */
  margin-bottom: -40px;
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
  /* float: right; */
  margin: 15px 30px 0 30px;
  height: 50px;
}
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
