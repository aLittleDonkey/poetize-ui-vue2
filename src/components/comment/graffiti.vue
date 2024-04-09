<template>
  <div>
    <!-- 画布 -->
    <div style="padding: 5px" @mousemove="canvasOutMove($event)" @touchmove="canvasOutMove($event)">
      <div class="graffiti-container">
        <canvas id="canvas"
                width="766"
                height="400"
                @mousedown="canvasDown($event)"
                @mouseup="canvasUp($event)"
                @mousemove="canvasMove($event)"
                @touchstart="canvasDown($event)"
                @touchend="canvasUp($event)"
                @touchmove="canvasMove($event)">
        </canvas>
      </div>
    </div>

    <div style="padding: 10px 0 0 5px;">
      <!-- 颜色 -->
      <div class="graffiti-tools">
        <span class="graffiti-title">画笔颜色</span>
        <div class="myCenter" style="margin-left: 2rem">
          <div v-for="(color, index) in colors"
               :class="{ activeColor: config.lineColor === color }"
               :style="{ background: color }"
               @click="setColor(color)"
               class="graffiti-color"
               :key="index">
          </div>
        </div>
      </div>

      <!-- 大小 -->
      <div class="graffiti-tools">
        <span class="graffiti-title">画笔大小</span>
        <div class="myCenter" style="margin-left: 2rem">
          <i v-for="(pen, index) in brushSize"
             :key="index"
             class="graffiti-size"
             :class="[pen.className, { activeSize: config.lineWidth === pen.lineWidth }]"
             @click="setBrush(pen.lineWidth)">
          </i>
        </div>
      </div>

      <!-- 操作 -->
      <div class="graffiti-tools">
        <span class="graffiti-title">操作</span>
        <div class="myCenter" style="margin-left: 3.7rem">
          <i v-for="(control, index) in controls"
             :title="control.title"
             :class="control.className"
             class="graffiti-operate"
             @click="controlCanvas(control.action)"
             :key="index">
          </i>
        </div>
      </div>

      <!-- 按钮 -->
      <div class="graffiti-tools" style="justify-content: center">
        <proButton :info="'文字'"
                   @click.native="showComment()"
                   :before="$constant.before_color_1"
                   :after="$constant.after_color_1"
                   style="margin-right: 6px">
        </proButton>
        <proButton :info="'提交'"
                   @click.native="getImage()"
                   :before="$constant.before_color_2"
                   :after="$constant.after_color_2">
        </proButton>
      </div>
    </div>
  </div>
</template>

<script>
  const proButton = () => import( "../common/proButton");

  export default {
    components: {
      proButton
    },
    data() {
      return {
        context: {},
        canvasMoveUse: false,
        // 存储当前表面状态数组-上一步
        preDrawAry: [],
        // 存储当前表面状态数组-下一步
        nextDrawAry: [],
        // 中间数组
        middleAry: [],
        // 配置参数
        config: {
          lineWidth: 5,
          lineColor: "#8154A3",
          shadowBlur: 2,
        },
        colors: ["#8154A3", "#fef4ac", "#0018ba", "#ffc200", "#f32f15", "#cccccc", "#5ab639"],
        brushSize: [{
          className: "small el-icon-edit",
          lineWidth: 5,
        }, {
          className: "middle el-icon-edit",
          lineWidth: 10,
        }, {
          className: "big el-icon-edit",
          lineWidth: 15,
        }]
      };
    },
    computed: {
      controls() {
        return [{
          title: "上一步",
          action: "prev",
          className: this.preDrawAry.length
            ? "active el-icon-arrow-left"
            : "ban el-icon-arrow-left",
        }, {
          title: "下一步",
          action: "next",
          className: this.nextDrawAry.length
            ? "active el-icon-arrow-right"
            : "ban el-icon-arrow-right",
        }, {
          title: "清除",
          action: "clear",
          className:
            this.preDrawAry.length || this.nextDrawAry.length
              ? "active el-icon-refresh"
              : "ban el-icon-refresh",
        }];
      }
    },
    mounted() {
      const canvas = document.querySelector("#canvas");
      this.context = canvas.getContext("2d", {willReadFrequently: true});
      this.initDraw();
      this.setCanvasStyle();
    },
    created() {
    },
    methods: {
      canvasOutMove(e) {
        const canvas = document.querySelector("#canvas");
        if (e.target !== canvas) {
          this.canvasMoveUse = false;
        }
      },
      initDraw() {
        const preData = this.context.getImageData(0, 0, 1200, 600);
        // 空绘图表面进栈
        this.middleAry.push(preData);
      },
      canvasUp(e) {
        const preData = this.context.getImageData(0, 0, 1200, 600);
        if (!this.nextDrawAry.length) {
          // 当前绘图表面进栈
          this.middleAry.push(preData);
        } else {
          this.middleAry = [];
          this.middleAry = this.middleAry.concat(this.preDrawAry);
          this.middleAry.push(preData);
          this.nextDrawAry = [];
        }
        this.canvasMoveUse = false;
        this.context.beginPath();
      },
      canvasDown(e) {
        this.canvasMoveUse = true;
        // client是基于整个页面的坐标
        // offset是canvas距离顶部以及左边的距离
        this.setCanvasStyle();
        // 清除子路径
        this.context.beginPath();
        this.context.moveTo(e.layerX, e.layerY);
        // 当前绘图表面状态
        const preData = this.context.getImageData(0, 0, 1200, 600);
        // 当前绘图表面进栈
        this.preDrawAry.push(preData);
      },
      canvasMove(e) {
        if (this.canvasMoveUse) {
          this.context.lineTo(e.layerX, e.layerY);
          this.context.stroke();
        }
      },
      // 设置绘画配置
      setCanvasStyle() {
        this.context.lineWidth = this.config.lineWidth;
        this.context.shadowBlur = this.config.shadowBlur;
        this.context.shadowColor = this.config.lineColor;
        this.context.strokeStyle = this.config.lineColor;
      },
      // 设置颜色
      setColor(color) {
        this.config.lineColor = color;
      },
      // 设置笔刷大小
      setBrush(size) {
        this.config.lineWidth = size;
      },
      controlCanvas(action) {
        switch (action) {
          case "prev":
            if (this.preDrawAry.length) {
              const popData = this.preDrawAry.pop();
              const midData = this.middleAry[this.preDrawAry.length + 1];
              this.nextDrawAry.push(midData);
              this.context.putImageData(popData, 0, 0);
            }
            break;
          case "next":
            if (this.nextDrawAry.length) {
              const popData = this.nextDrawAry.pop();
              const midData = this.middleAry[this.middleAry.length - this.nextDrawAry.length - 2];
              this.preDrawAry.push(midData);
              this.context.putImageData(popData, 0, 0);
            }
            break;
          case "clear":
            this.clearContext();
            this.middleAry = [this.middleAry[0]];
            break;
        }
      },
      clearContext() {
        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.preDrawAry = [];
        this.nextDrawAry = [];
      },
      showComment() {
        this.clearContext();
        this.$emit("showComment");
      },
      getImage() {
        if (this.$common.isEmpty(this.$store.state.currentUser)) {
          this.$message({
            message: "请先登录！",
            type: "error"
          });
          return;
        }

        if (this.preDrawAry.length < 1) {
          this.$message({
            message: "你还没画呢~",
            type: "warning"
          });
          return;
        }

        const canvas = document.querySelector("#canvas");
        const dataURL = canvas.toDataURL("image/png");
        let arr = dataURL.split(","),
          mine = arr[0].match(/:(.*?);/)[1],
          str = atob(arr[1]),
          n = str.length,
          u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = str.charCodeAt(n);
        }
        let obj = new Blob([u8arr], {type: mine});
        let key = "graffiti" + "/" + this.$store.state.currentUser.username.replace(/[^a-zA-Z]/g, '') + this.$store.state.currentUser.id + new Date().getTime() + Math.floor(Math.random() * 1000) + ".png";

        let storeType = localStorage.getItem("defaultStoreType");

        let fd = new FormData();
        fd.append("file", obj);
        fd.append("key", key);
        fd.append("relativePath", key);
        fd.append("type", "graffiti");
        fd.append("storeType", storeType);

        if (storeType === "local") {
          this.saveLocal(fd);
        } else if (storeType === "qiniu") {
          this.saveQiniu(fd);
        }
      },
      saveLocal(fd) {
        this.$http.upload(this.$constant.baseURL + "/resource/upload", fd)
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.clearContext();
              let url = res.data;
              let img = "[你画我猜," + url + "]";
              this.$emit("addGraffitiComment", img);
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      saveQiniu(fd) {
        this.$http.get(this.$constant.baseURL + "/qiniu/getUpToken", {key: fd.get("key")})
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              fd.append("token", res.data);

              this.$http.uploadQiniu(this.$store.state.sysConfig.qiniuUrl, fd)
                .then((res) => {
                  if (!this.$common.isEmpty(res.key)) {
                    this.clearContext();
                    let url = this.$store.state.sysConfig['qiniu.downloadUrl'] + res.key;
                    let file = fd.get("file");
                    this.$common.saveResource(this, "graffiti", url, file.size, file.type, null, "qiniu");
                    let img = "[你画我猜," + url + "]";
                    this.$emit("addGraffitiComment", img);
                  }
                })
                .catch((error) => {
                  this.$message({
                    message: error.message,
                    type: "error"
                  });
                });
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
  .graffiti-container {
    overflow: hidden;
    border: 2px var(--lightGray) solid;
    border-radius: 4px;
  }

  .graffiti-tools {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  .graffiti-title {
    font-size: 14px;
  }

  .graffiti-color {
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    float: left;
    margin-right: 20px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .graffiti-color:hover {
    width: 1.3rem;
    height: 1.3rem;
  }

  .activeColor {
    width: 1.3rem;
    height: 1.3rem;
  }

  .graffiti-size {
    cursor: pointer;
    margin-right: 20px;
  }

  .graffiti-size.small {
    font-size: 14px;
  }

  .graffiti-size.middle {
    font-size: 16px;
  }

  .graffiti-size.big {
    font-size: 18px;
  }

  .activeSize {
    background-color: var(--themeBackground);
    color: var(--white);
    border-radius: 50%;
    padding: 2px;
  }

  .graffiti-operate {
    margin-right: 20px;
    cursor: pointer;
    font-size: 18px;
  }

  .graffiti-operate.ban {
    cursor: not-allowed
  }
</style>
