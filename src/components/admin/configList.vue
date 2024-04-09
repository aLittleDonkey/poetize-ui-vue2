<template>
  <div>
    <div style="margin-bottom: 20px">
      <el-button type="primary" @click="configDialog = true">新增配置</el-button>
    </div>
    <el-table :data="configList" height="75vh" border class="table" header-cell-class-name="table-header">
      <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
      <el-table-column prop="configName" label="名称" align="center"></el-table-column>
      <el-table-column prop="configKey" label="键名" align="center"></el-table-column>
      <el-table-column prop="configValue" label="键值" align="center"></el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.configType === '1'">私有</span>
          <span v-else-if="scope.row.configType === '2'">公开</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="text" icon="el-icon-edit" @click="editConfig(scope.row)">
            编辑
          </el-button>
          <el-button type="text" icon="el-icon-delete" style="color: var(--orangeRed)"
                     @click="deleteHandle(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="配置"
               :visible.sync="configDialog"
               width="30%"
               :before-close="handleClose"
               :append-to-body="true"
               destroy-on-close
               center>
      <div class="my-dialog">
        <div class="myCenter">
          <el-radio-group v-model="config.configType">
            <el-radio-button label="1">私有</el-radio-button>
            <el-radio-button label="2">公开</el-radio-button>
          </el-radio-group>
        </div>
        <el-input placeholder="请输入名称" v-model="config.configName">
          <template slot="prepend">名称</template>
        </el-input>
        <el-input placeholder="请输入键名" v-model="config.configKey">
          <template slot="prepend">键名</template>
        </el-input>
        <el-input placeholder="请输入键值" v-model="config.configValue">
          <template slot="prepend">键值</template>
        </el-input>
      </div>

      <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose()">取 消</el-button>
          <el-button type="primary" @click="saveOrEditConfig()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      configDialog: false,
      configList: [],
      config: {
        id: null,
        configName: "",
        configKey: "",
        configValue: "",
        configType: ""
      }
    }
  },

  computed: {},

  watch: {},

  created() {
    this.getConfigInfo();
  },

  mounted() {

  },

  methods: {
    deleteHandle(id) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success',
        center: true
      }).then(() => {
        this.$http.get(this.$constant.baseURL + "/sysConfig/deleteConfig", {id: id}, true)
          .then((res) => {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.getConfigInfo();
            this.handleClose();
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
    saveOrEditConfig() {
      if (this.$common.isEmpty(this.config.configName) ||
        this.$common.isEmpty(this.config.configKey) ||
        this.$common.isEmpty(this.config.configType)) {
        this.$message({
          message: "请完善所有配置信息！",
          type: "error"
        });
        return;
      }

      this.$http.post(this.$constant.baseURL + "/sysConfig/saveOrUpdateConfig", this.config, true)
        .then((res) => {
          this.$message({
            message: "保存成功！",
            type: "success"
          });
          this.getConfigInfo();
          this.handleClose();
        })
        .catch((error) => {
          this.$message({
            message: error.message,
            type: "error"
          });
        });
    },
    editConfig(config) {
      this.configDialog = true;
      this.config.id = config.id;
      this.config.configName = config.configName;
      this.config.configKey = config.configKey;
      this.config.configValue = config.configValue;
      this.config.configType = config.configType;
    },
    handleClose() {
      this.config = {
        id: null,
        configName: "",
        configKey: "",
        configValue: "",
        configType: ""
      };
      this.configDialog = false;
    },
    getConfigInfo() {
      this.$http.get(this.$constant.baseURL + "/sysConfig/listConfig", {}, true)
        .then((res) => {
          if (!this.$common.isEmpty(res.data)) {
            this.configList = res.data;
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
