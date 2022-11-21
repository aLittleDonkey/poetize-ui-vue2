<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="sortDialog = true">新增分类</el-button>
    </div>
    <el-table :data="sortInfo" border class="table" header-cell-class-name="table-header">
      <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
      <el-table-column prop="sortName" label="分类名称" align="center"></el-table-column>
      <el-table-column prop="sortDescription" label="分类描述" align="center"></el-table-column>
      <el-table-column label="分类类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.sortType === 0">导航栏分类</span>
          <span v-else-if="scope.row.sortType === 1">普通分类</span>
        </template>
      </el-table-column>
      <el-table-column prop="priority" label="导航栏分类优先级" align="center"></el-table-column>
      <el-table-column prop="countOfSort" label="文章总数" align="center"></el-table-column>
      <el-table-column label="操作" width="380" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="editSort(scope.row)">
            编辑分类
          </el-button>
          <el-button type="text" icon="el-icon-edit" @click="sayLabel(scope.row)">
            查看标签
          </el-button>
          <el-button type="text" icon="el-icon-edit" @click="insertLabel(scope.row)">
            新增标签
          </el-button>
          <el-button type="text" icon="el-icon-delete" style="color: var(--orangeRed)"
                     @click="deleteHandle(scope.row.id, 1)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-table v-if="!$common.isEmpty(sort)" :data="sort.labels" border class="table"
              style="margin-top: 40px"
              header-cell-class-name="table-header">
      <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
      <el-table-column label="分类名称" align="center">
        <span>{{sort.sortName}}</span>
      </el-table-column>
      <el-table-column prop="labelName" label="标签名称" align="center"></el-table-column>
      <el-table-column prop="labelDescription" label="标签描述" align="center"></el-table-column>
      <el-table-column prop="countOfLabel" label="文章总数" align="center"></el-table-column>
      <el-table-column label="操作" width="320" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="editLabel(scope.row)">
            编辑标签
          </el-button>
          <el-button type="text" icon="el-icon-delete" style="color: var(--orangeRed)"
                     @click="deleteHandle(scope.row.id, 2)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="分类"
               :visible.sync="sortDialog"
               width="30%"
               :before-close="handleClose"
               :append-to-body="true"
               destroy-on-close
               center>
      <div class="my-dialog">
        <div class="myCenter">
          <el-radio-group v-model="sortForHttp.sortType">
            <el-radio-button :label="0">导航栏分类</el-radio-button>
            <el-radio-button :label="1">普通分类</el-radio-button>
          </el-radio-group>
        </div>
        <el-input placeholder="请输入分类名称" v-model="sortForHttp.sortName">
          <template slot="prepend">分类名称</template>
        </el-input>
        <el-input placeholder="请输入分类描述" v-model="sortForHttp.sortDescription">
          <template slot="prepend">分类描述</template>
        </el-input>
        <el-input type="number" v-if="sortForHttp.sortType === 0" placeholder="请输入整数，数字小的在前面"
                  v-model="sortForHttp.priority">
          <template slot="prepend">导航栏分类优先级</template>
        </el-input>
      </div>

      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" @click="saveSortEdit()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="标签"
               :visible.sync="labelDialog"
               width="30%"
               :before-close="handleClose"
               :append-to-body="true"
               destroy-on-close
               center>
      <div class="my-dialog">
        <el-input placeholder="请输入标签名称" v-model="labelForHttp.labelName">
          <template slot="prepend">标签名称</template>
        </el-input>
        <el-input placeholder="请输入标签描述" v-model="labelForHttp.labelDescription">
          <template slot="prepend">标签描述</template>
        </el-input>
      </div>

      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" @click="saveLabelEdit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        sortDialog: false,
        labelDialog: false,
        sortInfo: [],
        sort: {},
        sortForHttp: {
          id: null,
          sortName: "",
          sortDescription: "",
          sortType: null,
          priority: null
        },
        labelForHttp: {
          id: null,
          sortId: null,
          labelName: "",
          labelDescription: ""
        }
      }
    },

    computed: {},

    watch: {},

    created() {
      this.getSortInfo();
    },

    mounted() {

    },

    methods: {
      deleteHandle(id, flag) {
        let url;
        if (flag === 1) {
          url = "/webInfo/deleteSort";
        } else if (flag === 2) {
          url = "/webInfo/deleteLabel";
        } else {
          return;
        }
        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          center: true
        }).then(() => {
          this.$http.get(this.$constant.baseURL + url, {id: id}, true)
            .then((res) => {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.getSortInfo();
              this.sort = {};
            })
            .catch((error) => {
              this.$message({
                message: error.message,
                type: "error"
              });
            });
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已取消删除!'
          });
        });
      },
      saveSortEdit() {
        if (this.$common.isEmpty(this.sortForHttp.sortType) ||
          this.$common.isEmpty(this.sortForHttp.sortName) ||
          this.$common.isEmpty(this.sortForHttp.sortDescription)) {
          this.$message({
            message: "请完善所有分类信息！",
            type: "error"
          });
          return;
        }

        if (this.sortForHttp.sortType === 0 && this.$common.isEmpty(this.sortForHttp.priority)) {
          this.$message({
            message: "导航栏分类必须输入优先级！",
            type: "error"
          });
          return;
        }

        let url;
        if (this.$common.isEmpty(this.sortForHttp.id)) {
          url = "/webInfo/saveSort";
        } else {
          url = "/webInfo/updateSort";
        }
        this.$http.post(this.$constant.baseURL + url, this.sortForHttp, true)
          .then((res) => {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.getSortInfo();
            this.handleClose();
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      saveLabelEdit() {
        if (this.$common.isEmpty(this.labelForHttp.labelName) ||
          this.$common.isEmpty(this.labelForHttp.labelDescription)) {
          this.$message({
            message: "请完善所有标签信息！",
            type: "error"
          });
          return;
        }

        let url;
        if (this.$common.isEmpty(this.labelForHttp.id)) {
          url = "/webInfo/saveLabel";
        } else {
          url = "/webInfo/updateLabel";
        }
        this.$http.post(this.$constant.baseURL + url, this.labelForHttp, true)
          .then((res) => {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
            this.getSortInfo();
            this.handleClose();
            this.sort = {};
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      editSort(sort) {
        this.sortDialog = true;
        this.sortForHttp.id = sort.id;
        this.sortForHttp.sortName = sort.sortName;
        this.sortForHttp.sortDescription = sort.sortDescription;
        this.sortForHttp.sortType = sort.sortType;
        this.sortForHttp.priority = sort.priority;
      },
      editLabel(label) {
        this.labelDialog = true;
        this.labelForHttp.id = label.id;
        this.labelForHttp.sortId = label.sortId;
        this.labelForHttp.labelName = label.labelName;
        this.labelForHttp.labelDescription = label.labelDescription;
      },
      insertLabel(sort) {
        this.labelForHttp.sortId = sort.id;
        this.labelDialog = true;
      },
      handleClose() {
        this.labelForHttp = {
          id: null,
          sortId: null,
          labelName: "",
          labelDescription: ""
        };
        this.sortForHttp = {
          id: null,
          sortName: "",
          sortDescription: "",
          sortType: null,
          priority: null
        };
        this.sortDialog = false;
        this.labelDialog = false;
      },
      sayLabel(sort) {
        this.sort = sort;
      },
      getSortInfo() {
        this.$http.get(this.$constant.baseURL + "/webInfo/getSortInfo")
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.sortInfo = res.data;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      }
    }
  }
</script>

<style scoped>

  .my-dialog > div {
    margin: 12px;
  }

  .my-dialog >>> input::-webkit-inner-spin-button {
    appearance: none;
  }
</style>
