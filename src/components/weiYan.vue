<template>
  <div>
    <!-- 两句诗 -->
    <div class="my-animation-slide-top">
      <twoPoem :isHitokoto="false"></twoPoem>
    </div>

    <div style="background: var(--background);animation: hideToShow 2.5s">
      <div>
        <treeHole :treeHoleList="treeHoleList"
                  :avatar="!$common.isEmpty($store.state.currentUser)?$store.state.currentUser.avatar:$store.state.webInfo.avatar"
                  @launch="launch"
                  @deleteTreeHole="deleteTreeHole">
        </treeHole>
        <proPage :current="pagination.current"
                 :size="pagination.size"
                 :total="pagination.total"
                 :buttonSize="3"
                 :color="$constant.pageColor"
                 @toPage="toPage">
        </proPage>
      </div>

      <!-- 页脚 -->
      <myFooter :showFooter="showFooter"></myFooter>
    </div>

    <el-dialog title="微言"
               :visible.sync="weiYanDialogVisible"
               width="40%"
               :before-close="handleClose"
               :append-to-body="true"
               destroy-on-close
               :close-on-click-modal="false"
               center>
      <div>
        <div class="myCenter" style="padding-bottom: 20px">
          <el-radio-group v-model="isPublic">
            <el-radio-button :label="true">公开</el-radio-button>
            <el-radio-button :label="false">私密</el-radio-button>
          </el-radio-group>
        </div>
        <commentBox :disableGraffiti="true"
                    @submitComment="submitWeiYan">
        </commentBox>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  const twoPoem = () => import( "./common/twoPoem");
  const myFooter = () => import( "./common/myFooter");
  const treeHole = () => import( "./common/treeHole");
  const proPage = () => import( "./common/proPage");
  const commentBox = () => import( "./comment/commentBox");

  export default {
    components: {
      twoPoem,
      myFooter,
      treeHole,
      proPage,
      commentBox
    },

    data() {
      return {
        treeHoleList: [],
        pagination: {
          current: 1,
          size: 10,
          total: 0
        },
        weiYanDialogVisible: false,
        isPublic: true,
        showFooter: false
      }
    },

    computed: {},

    watch: {},

    created() {
      this.getWeiYan();
    },

    mounted() {

    },

    methods: {
      toPage(page) {
        this.pagination.current = page;
        window.scrollTo({
          top: 240,
          behavior: "smooth"
        });
        this.getWeiYan();
      },
      launch() {
        if (this.$common.isEmpty(this.$store.state.currentUser)) {
          this.$message({
            message: "请先登录！",
            type: "error"
          });
          return;
        }

        this.weiYanDialogVisible = true;
      },
      handleClose() {
        this.weiYanDialogVisible = false;
      },
      submitWeiYan(content) {
        let weiYan = {
          content: content,
          isPublic: this.isPublic
        };

        this.$http.post(this.$constant.baseURL + "/weiYan/saveWeiYan", weiYan)
          .then((res) => {
            this.getWeiYan();
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
        this.handleClose();
      },
      deleteTreeHole(id) {
        if (this.$common.isEmpty(this.$store.state.currentUser)) {
          this.$message({
            message: "请先登录！",
            type: "error"
          });
          return;
        }

        this.$confirm('确认删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success',
          center: true
        }).then(() => {
          this.$http.get(this.$constant.baseURL + "/weiYan/deleteWeiYan", {id: id})
            .then((res) => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.pagination.current = 1;
              this.getWeiYan();
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
      getWeiYan() {
        this.$http.post(this.$constant.baseURL + "/weiYan/listWeiYan", this.pagination)
          .then((res) => {
            this.showFooter = false;
            if (!this.$common.isEmpty(res.data)) {
              res.data.records.forEach(c => {
                c.content = c.content.replace(/\n{2,}/g, '<div style="height: 12px"></div>');
                c.content = c.content.replace(/\n/g, '<br/>');
                c.content = this.$common.faceReg(c.content);
                c.content = this.$common.pictureReg(c.content);
              });
              this.treeHoleList = res.data.records;
              this.pagination.total = res.data.total;
            }
            this.$nextTick(() => {
              this.showFooter = true;
              this.$common.imgShow(".tree-hole-box .pictureReg");
            });
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

</style>
