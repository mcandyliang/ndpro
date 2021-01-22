<template>
  <div>
    <p class="title">用户管理</p>
    <div class="top">
      <el-button type="text" @click="add">
        <div>
          <p>添加用户</p>
        </div></el-button
      >
      <el-button type="text" @click="jurisdiction">
        <div>
          <p>添加权限</p>
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
          @selection-change="handleSelectionChange"
          show-overflow-tooltip
        >
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="用户ID"> </el-table-column>
          <el-table-column prop="name" label="用户名"> </el-table-column>
          <el-table-column prop="phone" label="电话号码"> </el-table-column>
          <el-table-column prop="dw" label="隶属单位"> </el-table-column>
          <el-table-column prop="user" label="用户关注"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="edit(scope.row)"
                >编辑</el-button
              >
              <el-button size="mini" type="danger" @click="del(scope.row)"
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
    <el-dialog title="添加用户" :visible.sync="dialog">
      <el-form label-position="right" label-width="80px" :model="form">
        <el-form-item label="用户名" :required="true">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="手机" :required="true">
          <el-input v-model="form.region"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-left:9%">
        <el-button type="primary" @click="adds">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="权限编辑" :visible.sync="dialogs">
      <div style="float:right">
        <el-button type="primary" @click="dialogs = false">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="信息" :visible.sync="dialogss" width="800px">
      <el-form :model="forms" label-width="80px">
        <el-form-item label="用户ID">
          ChengMing
        </el-form-item>
        <el-form-item label="真实名字">
          <el-input v-model="forms.name"></el-input>
        </el-form-item>
        <el-form-item label="所属部门">
          <el-select
            v-model="forms.region"
            placeholder="请选择部门"
            style="width:100%"
          >
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位">
          <el-input v-model="forms.type" placeholder="请输入职位"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="forms.resource">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="forms.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="forms.email"></el-input>
        </el-form-item>
        <el-form-item label="微信号">
          <el-input v-model="forms.wx"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-left:9%">
        <el-button type="primary" @click="dialogss = false">确 定</el-button>
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
          id: "zhoulongjie",
          name: "周隆街",
          phone: 15215215215,
          dw: "锡林郭勒电业局输电处",
          user: "已关注"
        },
        {
          id: "zhoulongjie",
          name: "周隆街",
          phone: 15215215215,
          dw: "锡林郭勒电业局输电处",
          user: "已关注"
        },
        {
          id: "zhoulongjie",
          name: "周隆街",
          phone: 15215215215,
          dw: "锡林郭勒电业局输电处",
          user: "已关注"
        },
        {
          id: "zhoulongjie",
          name: "周隆街",
          phone: 15215215215,
          dw: "锡林郭勒电业局输电处",
          user: "已关注"
        }
      ],
      dialog: false,
      dialogs: false,
      dialogss: false,
      form: {
        name: "",
        region: "",
        type: ""
      },
      forms: {
        name: "",
        region: "",
        type: "",
        resource: "",
        phone: "",
        email: "",
        wx: ""
      }
    };
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    add() {
      this.dialog = true;
    },
    adds() {
      // console.log(this.form.name, this.form.region, this.form.type);
    },
    jurisdiction() {
      this.dialogs = true;
    },
    edit(val) {
      this.dialogss = true;
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
  margin: 10px 30px;
}

.title {
  font-size: 44px;
  margin-top: 40px;
  margin-left: 30px;
}
.top {
  display: flex;
  border-bottom: 1px solid #666666;
  margin: 10px 30px;
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
