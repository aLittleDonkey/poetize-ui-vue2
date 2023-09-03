<template>
  <div>
    <!-- 封面 -->
    <div class="bg-wrap my-animation-slide-top">
      <!-- 背景图片 -->
      <el-image class="love-image my-el-image"
                lazy
                :src="love.bgCover"
                fit="cover">
        <div slot="error" class="image-slot"></div>
      </el-image>

      <!-- 对象 -->
      <div class="love-wrap transformCenter">
        <div>
          <el-avatar class="love-avatar" :src="love.manCover"></el-avatar>
          <div class="love-title">
            {{love.manName}}
          </div>
        </div>
        <div>
          <img class="love-img" :src="$constant.loveLike" alt="心心">
        </div>
        <div>
          <el-avatar class="love-avatar" :src="love.womanCover"></el-avatar>
          <div class="love-title">
            {{love.womanName}}
          </div>
        </div>
      </div>

      <div id="bannerWave1"></div>
      <div id="bannerWave2"></div>
    </div>

    <!-- 内容 -->
    <div class="love-container">
      <div class="myCenter love-content">
        <!-- 时间 -->
        <div>
          <!-- 计时 -->
          <div>
            <div class="love-time-title1">
              这是我们一起走过的
            </div>
            <div class="love-time1">
              第
              <span class="love-time1-item">{{timing.year}}</span>
              年
              <span class="love-time1-item">{{timing.month}}</span>
              月
              <span class="love-time1-item">{{timing.day}}</span>
              日
              <span class="love-time1-item">{{timing.hour}}</span>
              时
              <span class="love-time1-item">{{timing.minute}}</span>
              分
              <span class="love-time1-item">{{timing.second}}</span>
              秒
            </div>
          </div>
          <!-- 倒计时 -->
          <div class="love-time-title2"
               v-if="!$common.isEmpty(love.countdownTitle) || !$common.isEmpty(love.countdownTime)">
            {{love.countdownTitle}}: {{countdownChange}}
          </div>
        </div>
      </div>

      <div style="padding: 0 20px">
        <div class="family-button shadow-box-mini" @click="changeCard(4)">
          <span class="family-button-title">{{card === 4 ? '回到主人家' : '开往表白墙'}}</span>
          <span class="family-button-car">
            <svg viewBox="0 0 1024 1024" width="40" height="40">
                <path
                  d="M399.502 655.103c0 7.902-6.665 14.311-14.88 14.311H72.188c-8.215 0-14.875-6.407-14.875-14.311v-28.634c0-7.913 6.66-14.315 14.875-14.315h312.435c8.217 0 14.88 6.402 14.88 14.315l-0.001 28.634zM968.167 655.103c0 7.902-6.664 14.311-14.882 14.311H640.851c-8.216 0-14.877-6.407-14.877-14.311v-28.634c0-7.913 6.661-14.315 14.877-14.315h312.436c8.218 0 14.882 6.402 14.882 14.315l-0.002 28.634z"
                  fill="#EA0606"></path><path
              d="M968.097 624.008c0 11.563-17.723 20.937-39.583 20.937H97.263c-21.858 0-39.579-9.372-39.579-20.937v-41.876c0-11.562 17.72-20.935 39.579-20.935h831.25c21.86 0 39.583 9.373 39.583 20.935v41.876zM855.003 526.553h-12c0-161.793-151.025-293.421-336.66-293.421-185.633 0-336.656 131.628-336.656 293.421h-12c0-41.334 9.261-81.425 27.527-119.161 17.612-36.384 42.807-69.046 74.886-97.079 65.813-57.509 153.264-89.181 246.243-89.181 92.981 0 180.434 31.672 246.247 89.181 32.079 28.032 57.274 60.693 74.887 97.079 18.264 37.734 27.526 77.826 27.526 119.161z"
              fill="#EA0606"></path><path
              d="M1001.996 588.091c-121.146 13.91-980.875 0-980.875 0s-30.62-203.887 241.944-144.555c171.281-1.178 273.436 0 489.644 0 193.07-59.332 283.186 108.642 249.287 144.555z"
              fill="#EA0606"></path><path
              d="M500.343 214.379h12v330.342h-12z"
              fill="#EA0606"></path><path
              d="M333.217 657.192c0 46.174-38.961 83.602-87.029 83.602-48.056 0-87.021-37.428-87.021-83.602 0-46.172 38.963-83.588 87.021-83.588 48.067 0 87.029 37.417 87.029 83.588z"
              fill="#FFFFFF"></path><path
              d="M246.188 743.794c-49.638 0-90.021-38.85-90.021-86.602 0-47.745 40.383-86.588 90.021-86.588 49.642 0 90.029 38.843 90.029 86.588 0 47.752-40.387 86.602-90.029 86.602z m0-167.19c-46.329 0-84.021 36.151-84.021 80.588 0 44.444 37.692 80.602 84.021 80.602 46.333 0 84.029-36.157 84.029-80.602 0-44.436-37.696-80.588-84.029-80.588z"
              fill="#440A0A"></path><path
              d="M309.872 656.757c0 33.159-27.986 60.035-62.491 60.035-34.51 0-62.487-26.876-62.487-60.035 0-33.16 27.977-60.022 62.487-60.022 34.505 0.001 62.491 26.862 62.491 60.022z"
              fill="#440A0A"></path><path
              d="M271.322 657.558c0 11.747-9.918 21.282-22.151 21.282-12.237 0-22.152-9.535-22.152-21.282 0-11.758 9.916-21.277 22.152-21.277 12.233-0.002 22.151 9.519 22.151 21.277z"
              fill="#FFFFFF"></path><path
              d="M875.521 642.811c0 46.175-38.963 83.603-87.027 83.603-48.061 0-87.021-37.428-87.021-83.603 0-46.173 38.962-83.587 87.021-83.587 48.066 0 87.027 37.414 87.027 83.587z"
              fill="#FFFFFF"></path><path
              d="M788.494 729.413c-49.638 0-90.021-38.85-90.021-86.603 0-47.744 40.384-86.587 90.021-86.587 49.642 0 90.027 38.843 90.027 86.587 0 47.753-40.385 86.603-90.027 86.603z m0-167.189c-46.33 0-84.021 36.151-84.021 80.587 0 44.444 37.691 80.603 84.021 80.603 46.333 0 84.027-36.158 84.027-80.603 0-44.436-37.694-80.587-84.027-80.587z"
              fill="#440A0A"></path><path
              d="M852.174 642.374c0 33.159-27.979 60.037-62.486 60.037-34.512 0-62.487-26.878-62.487-60.037 0-33.161 27.977-60.023 62.487-60.023 34.506-0.001 62.486 26.862 62.486 60.023z"
              fill="#440A0A"></path><path
              d="M813.628 643.173c0 11.75-9.919 21.278-22.153 21.278-12.233 0-22.151-9.528-22.151-21.278 0-11.759 9.919-21.275 22.151-21.275 12.235-0.002 22.153 9.516 22.153 21.275z"
              fill="#FFFFFF"></path><path
              d="M518.135 469.838h56.847v12.556h-56.847z"
              fill="#FFFFFF"></path><path
              d="M522.818 468.694c0 7.902-0.648 14.309-1.445 14.309h-30.37c-0.799 0-1.446-6.406-1.446-14.309V440.06c0-7.912 0.647-14.315 1.446-14.315h30.37c0.797 0 1.445 6.403 1.445 14.315v28.634z"
              fill="#EA0606">
                </path>
            </svg>
          </span>
        </div>
      </div>

      <div style="padding: 0 20px">
        <!-- 卡片 -->
        <div class="card-wrap" v-show="card !== 4">
          <div class="card-content shadow-box-mini" @click="changeCard(1)">
            <div>
              <el-avatar :size="100"
                         :src="$constant.loveWeiYan">
              </el-avatar>
            </div>
            <div class="card-right">
              <div class="card-title">
                点点滴滴
              </div>
              <div class="card-desc">
                ☀️今朝有酒今朝醉
              </div>
            </div>
          </div>

          <div class="card-content shadow-box-mini" @click="changeCard(2)">
            <div>
              <el-avatar :size="100"
                         :src="$constant.lovePhoto">
              </el-avatar>
            </div>
            <div class="card-right">
              <div class="card-title">
                时光相册
              </div>
              <div class="card-desc">
                📸记录美好瞬间
              </div>
            </div>
          </div>

          <div class="card-content shadow-box-mini" @click="changeCard(3)">
            <div>
              <el-avatar :size="100"
                         :src="$constant.loveMessage">
              </el-avatar>
            </div>
            <div class="card-right">
              <div class="card-title">
                祝福板
              </div>
              <div class="card-desc">
                📋写下对我们的祝福
              </div>
            </div>
          </div>
        </div>

        <div class="card-container">
          <div v-show="card === 1 && !$common.isEmpty(treeHoleList)">
            <treeHole :treeHoleList="treeHoleList"
                      :avatar="$store.state.webInfo.avatar"
                      @launch="launch"
                      @deleteTreeHole="deleteTreeHole">
            </treeHole>
          </div>
          <div v-show="card === 2 && !$common.isEmpty(photoTitleList)">
            <!-- 标签 -->
            <div class="photo-title-warp" v-if="!$common.isEmpty(photoTitleList)">
              <div v-for="(item, index) in photoTitleList" :key="index"
                   :class="{isActive: photoPagination.classify === item.classify}"
                   @click="changePhotoTitle(item.classify)">
                <proTag :info="item.classify+' '+item.count"
                        :color="$constant.before_color_list[Math.floor(Math.random() * 6)]"
                        style="margin: 12px">
                </proTag>
              </div>
            </div>

            <div class="photo-title">
              {{photoPagination.classify}}
            </div>

            <photo :resourcePathList="photoList"></photo>
            <div class="pagination-wrap">
              <div @click="pagePhotos()" class="pagination" v-if="photoPagination.total !== photoList.length">
                下一页
              </div>
              <div v-else style="user-select: none">
                ~~到底啦~~
              </div>
            </div>
          </div>
          <div v-show="card === 3" class="comment-content">
            <comment :source="$constant.userId" :type="'love'" :userId="$constant.userId"></comment>
          </div>
        </div>

        <div v-show="card === 4">
          <div class="family-container" v-show="!$common.isEmpty(randomFamily)">
            <div v-for="(item, index) in randomFamily" :key="index"
                 @click="changeFamily(item)">
              <div class="family-wrap"
                   :style="{ background: 'url(' + item.bgCover + ') center center / cover no-repeat' }">
                <div>
                  <el-avatar class="family-avatar" :src="item.manCover"></el-avatar>
                  <div class="family-title">
                    {{item.manName}}
                  </div>
                </div>
                <div>
                  <img class="family-img" :src="$constant.loveLike" alt="心心">
                </div>
                <div>
                  <el-avatar class="family-avatar" :src="item.womanCover"></el-avatar>
                  <div class="family-title">
                    {{item.womanName}}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="family-bottom-wrap">
            <div v-show="!$common.isEmpty(randomFamily) && randomFamily.length > 10" class="family-bottom"
                 style="background-color: var(--maxLightRed)" @click="getRandomFamily()">
              <span style="line-height: 50px">
                换一换
              </span>
              <span style="vertical-align:middle">
                <svg viewBox="0 0 1024 1024" width="30" height="30"><path
                  d="M952 511.5L567.4 183v164.3s-251.3 30.3-369.1 131.2C76.4 582.9 73 840 73 840l20.4-2s72.9-164 258.5-162.3c99.9 0.9 171.3 0.8 215.6 0.6V840L952 511.5z"
                  fill="#FF9D3A"></path>
                </svg>
              </span>
            </div>
            <div class="family-bottom" style="background-color: var(--lightGreen)" @click="addFamily()">
              <span style="line-height: 50px">
                申请入住
              </span>
              <span style="vertical-align:middle">
                <svg viewBox="0 0 1024 1024" width="30" height="30"><path
                  d="M731.0848 143.7696c-125.0816-54.528-270.7456 2.6624-325.2736 127.7952l-3.7376 8.6016-8.6016-3.7376c-125.0816-54.5792-270.6944 2.6112-325.2224 127.744-54.528 125.0816 2.6624 270.7456 127.7952 325.2736l368.0256 160.4096c51.712 22.528 111.872-1.1264 134.4-52.7872l0.0512-0.1024c0-0.0512 0.0512-0.1024 0.0512-0.1536l160.3072-367.7696c54.528-125.1328-2.6624-270.7456-127.7952-325.2736z"
                  fill="#F85F69"></path><path
                  d="M586.9568 433.8688c72.2432-31.488 156.3136 1.536 187.8016 73.7792l2.1504 4.9664 4.9664-2.1504c72.2432-31.488 156.3136 1.536 187.8016 73.7792 31.488 72.2432-1.536 156.3136-73.7792 187.8016l-212.48 92.6208c-29.8496 13.0048-64.5632-0.6144-77.568-30.464v-0.0512c0-0.0512-0.0512-0.0512-0.0512-0.1024l-92.5696-212.3264c-31.488-72.2944 1.536-156.3648 73.728-187.8528z"
                  fill="#F85F69"></path><path
                  d="M781.8752 510.4128l-4.9664 2.1504-2.1504-4.9664c-31.488-72.2432-115.5584-105.2672-187.8016-73.7792s-105.2672 115.5584-73.7792 187.8016l92.5696 212.3264c0 0.0512 0.0512 0.0512 0.0512 0.1024v0.0512c12.3904 28.3648 44.3904 42.0864 73.1648 32.1536a101.4784 101.4784 0 0 0 19.4048-29.2352l0.0512-0.1024c0-0.0512 0.0512-0.1024 0.0512-0.1536l147.4048-338.0736c-21.248-1.024-43.1104 2.6624-64 11.7248z"
                  fill="#F33B3D"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>

      <el-dialog title="入住表白墙"
                 :visible.sync="loveDialogVisible"
                 width="40%"
                 :close-on-click-modal="false"
                 :append-to-body="true"
                 destroy-on-close
                 center>
        <div>
          <div class="form-main">
            <img :src="$constant.friendLetterMiddle" style="width: 100%"/>
            <div>
              <div>
                <div class="myCenter form-friend">
                  <div class="user-content">
                    <div>
                      <div class="form-title">
                        背景封面&nbsp;
                      </div>
                      <div style=" display: flex">
                        <el-input maxlength="120" v-model="userLove.bgCover"></el-input>
                        <div style="margin: 3px 0 0 10px">
                          <proButton :info="'上传背景'"
                                     @click.native="openPicture('bgCover')"
                                     :before="$constant.before_color_1"
                                     :after="$constant.after_color_1">
                          </proButton>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="form-title">
                        男生头像&nbsp;
                      </div>
                      <div style=" display: flex">
                        <el-input maxlength="120" v-model="userLove.manCover"></el-input>
                        <div style="margin: 3px 0 0 10px">
                          <proButton :info="'上传头像'"
                                     @click.native="openPicture('manCover')"
                                     :before="$constant.before_color_1"
                                     :after="$constant.after_color_1">
                          </proButton>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="form-title">
                        女生头像&nbsp;
                      </div>
                      <div style=" display: flex">
                        <el-input maxlength="120" v-model="userLove.womanCover"></el-input>
                        <div style="margin: 3px 0 0 10px">
                          <proButton :info="'上传头像'"
                                     @click.native="openPicture('womanCover')"
                                     :before="$constant.before_color_1"
                                     :after="$constant.after_color_1">
                          </proButton>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div class="form-title">
                        男生昵称&nbsp;
                      </div>
                      <div>
                        <el-input maxlength="10" v-model="userLove.manName"></el-input>
                      </div>
                    </div>
                    <div>
                      <div class="form-title">
                        女生昵称&nbsp;
                      </div>
                      <div>
                        <el-input maxlength="10" v-model="userLove.womanName"></el-input>
                      </div>
                    </div>
                    <div>
                      <div class="form-title">
                        计时时间&nbsp;
                      </div>
                      <div>
                        <el-date-picker
                          v-model="userLove.timing"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetime"
                          align="center"
                          placeholder="选择计时时间">
                        </el-date-picker>
                      </div>
                    </div>
                    <div>
                      <div class="form-title">
                        倒计时标题
                      </div>
                      <div>
                        <el-input maxlength="20" v-model="userLove.countdownTitle"></el-input>
                      </div>
                    </div>
                    <div>
                      <div class="form-title">
                        倒计时时间
                      </div>
                      <div>
                        <el-date-picker
                          v-model="userLove.countdownTime"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          type="datetime"
                          align="center"
                          placeholder="选择倒计时时间">
                        </el-date-picker>
                      </div>
                    </div>
                    <div>
                      <div class="form-title">
                        告白信&nbsp;&nbsp;
                      </div>
                      <div>
                        <el-input type="textarea"
                                  show-word-limit
                                  maxlength="1000"
                                  v-model="userLove.familyInfo"></el-input>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="myCenter" style="margin-top: 20px">
                  <proButton :info="'提交'"
                             @click.native.stop="submitLove()"
                             :before="$constant.before_color_2"
                             :after="$constant.after_color_2">
                  </proButton>
                </div>
              </div>
              <div>
                <img :src="$constant.friendLetterBiLi" style="width: 100%;margin: 5px auto"/>
              </div>
              <p style="font-size: 12px;text-align: center;color: #999">欢迎入住表白墙</p>
            </div>
          </div>
        </div>
      </el-dialog>

      <el-dialog title="图片"
                 :visible.sync="addPictureDialog"
                 width="25%"
                 :append-to-body="true"
                 destroy-on-close
                 center>
        <div>
          <uploadPicture :prefix="'love/' + pictureType" @addPicture="addPicture" :maxSize="2"
                         :maxNumber="1"></uploadPicture>
        </div>
      </el-dialog>

      <div>
        <!-- 页脚 -->
        <myFooter></myFooter>
      </div>
    </div>
  </div>
</template>

<script>

  const treeHole = () => import( "./common/treeHole");
  const comment = () => import( "./comment/comment");
  const myFooter = () => import( "./common/myFooter");
  const photo = () => import( "./common/photo");
  const proTag = () => import( "./common/proTag");
  const proButton = () => import( "./common/proButton");
  const uploadPicture = () => import( "./common/uploadPicture");

  export default {
    components: {
      comment,
      photo,
      treeHole,
      myFooter,
      proTag,
      proButton,
      uploadPicture
    },

    data() {
      return {
        userLove: {
          bgCover: "",
          manCover: "",
          womanCover: "",
          manName: "",
          womanName: "",
          countdownTitle: "",
          countdownTime: "",
          timing: "",
          familyInfo: ""
        },
        loveDialogVisible: false,
        addPictureDialog: false,
        pictureType: "",
        adminLove: {},
        love: {
          bgCover: "",
          manCover: "",
          womanCover: "",
          manName: "",
          womanName: "",
          countdownTitle: "",
          countdownTime: "",
          timing: ""
        },
        weiYanPagination: {
          current: 1,
          size: 10,
          total: 0,
          userId: this.$constant.userId
        },
        photoPagination: {
          current: 1,
          size: 10,
          total: 0,
          resourceType: "lovePhoto",
          classify: ""
        },
        treeHoleList: [],
        photoTitleList: [],
        photoList: [],
        randomFamily: [],
        card: null,
        countdownChange: "",
        timing: {
          year: 0,
          month: 0,
          day: 0,
          hour: 0,
          minute: 0,
          second: 0
        }
      }
    },

    computed: {},

    watch: {},

    created() {
      this.getAdminFamily();
      this.card = 1;
      this.getWeiYan();
    },

    mounted() {

    },

    methods: {
      openPicture(type) {
        this.pictureType = type;
        this.addPictureDialog = true;
      },
      addPicture(res) {
        if (this.pictureType === "bgCover") {
          this.userLove.bgCover = res;
        } else if (this.pictureType === "manCover") {
          this.userLove.manCover = res;
        } else if (this.pictureType === "womanCover") {
          this.userLove.womanCover = res;
        }

        this.pictureType = "";
        this.addPictureDialog = false;
      },
      submitLove() {
        if (this.userLove.bgCover.trim() === "") {
          this.$message({
            message: "你还没设置背景封面呢~",
            type: "warning"
          });
          return;
        }

        if (this.userLove.manCover.trim() === "") {
          this.$message({
            message: "你还没设置男生头像呢~",
            type: "warning"
          });
          return;
        }

        if (this.userLove.womanCover.trim() === "") {
          this.$message({
            message: "你还没设置女生头像呢~",
            type: "warning"
          });
          return;
        }

        if (this.userLove.manName.trim() === "") {
          this.$message({
            message: "你还没写男生昵称呢~",
            type: "warning"
          });
          return;
        }

        if (this.userLove.womanName.trim() === "") {
          this.$message({
            message: "你还没写女生昵称呢~",
            type: "warning"
          });
          return;
        }

        if (this.userLove.timing.trim() === "") {
          this.$message({
            message: "你还没设置计时时间呢~",
            type: "warning"
          });
          return;
        }

        this.$http.post(this.$constant.baseURL + "/family/saveFamily", this.userLove)
          .then((res) => {
            this.$message({
              type: 'success',
              message: '提交成功，待管理员审核！'
            });
            this.userLove = {};
            this.loveDialogVisible = false;
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      addFamily() {
        if (this.$common.isEmpty(this.$store.state.currentUser)) {
          this.$message({
            message: "请先登录！",
            type: "error"
          });
          return;
        }

        this.$http.get(this.$constant.baseURL + "/family/getFamily")
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.userLove = res.data;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });

        this.loveDialogVisible = true;
      },
      changeFamily(family) {
        this.love = family;
      },
      getPhotoTitles() {
        this.$http.get(this.$constant.baseURL + "/webInfo/listAdminLovePhoto")
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.photoTitleList = res.data;
              this.photoPagination = {
                current: 1,
                size: 10,
                total: 0,
                resourceType: "lovePhoto",
                classify: this.photoTitleList[0].classify
              };
              this.changePhoto();
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      getAdminFamily() {
        this.$http.get(this.$constant.baseURL + "/family/getAdminFamily")
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.love = res.data;
              this.adminLove = res.data;
              this.getLove();
              this.countdown();
              setInterval(() => {
                this.getLove();
                this.countdown();
              }, 1000);
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      getRandomFamily() {
        this.$http.get(this.$constant.baseURL + "/family/listRandomFamily")
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.randomFamily = res.data;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      changePhotoTitle(classify) {
        if (classify !== this.photoPagination.classify) {
          this.photoPagination = {
            current: 1,
            size: 10,
            total: 0,
            resourceType: "lovePhoto",
            classify: classify
          };
          this.photoList = [];
          this.changePhoto();
        }
      },
      pagePhotos() {
        this.photoPagination.current = this.photoPagination.current + 1;
        this.changePhoto();
      },
      changePhoto() {
        this.$http.post(this.$constant.baseURL + "/webInfo/listResourcePath", this.photoPagination)
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.photoList = this.photoList.concat(res.data.records);
              this.photoPagination.total = res.data.total;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      changeCard(card) {
        if (card !== 4 || this.card !== card) {
          this.card = card;
        } else {
          card = 1;
          this.card = 1;
          this.love = this.adminLove;
        }

        if (card === 1) {
          if (this.$common.isEmpty(this.treeHoleList)) {
            this.getWeiYan();
          }
        } else if (card === 2) {
          if (this.$common.isEmpty(this.photoTitleList)) {
            this.getPhotoTitles();
          }
        } else if (card === 4) {
          if (this.$common.isEmpty(this.randomFamily)) {
            this.getRandomFamily();
          }
        }
      },
      getLove() {
        if (this.$common.isEmpty(this.love.timing)) {
          return;
        }
        let diff = this.$common.timeDiff(this.love.timing);
        this.timing.year = diff.diffYear;
        this.timing.month = diff.diffMonth;
        this.timing.day = diff.diffDay;
        this.timing.hour = diff.diffHour;
        this.timing.minute = diff.diffMinute;
        this.timing.second = diff.diffSecond;
      },
      countdown() {
        if (this.$common.isEmpty(this.love.countdownTime)) {
          return;
        }
        let countdown = this.$common.countdown(this.love.countdownTime);
        this.countdownChange = countdown.d + "天" + countdown.h + "时" + countdown.m + "分" + countdown.s + "秒";
      },
      launch() {
        if (this.weiYanPagination.total !== this.treeHoleList.length) {
          this.weiYanPagination.current = this.weiYanPagination.current + 1;
          this.getWeiYan();
        } else {
          this.$message({
            message: "~~到底啦~~",
            type: "warning"
          });
        }
      },
      getWeiYan() {
        this.$http.post(this.$constant.baseURL + "/weiYan/listWeiYan", this.weiYanPagination)
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              res.data.records.forEach(c => {
                c.content = c.content.replace(/\n{2,}/g, '<div style="height: 12px"></div>');
                c.content = c.content.replace(/\n/g, '<br/>');
                c.content = this.$common.faceReg(c.content);
                c.content = this.$common.pictureReg(c.content);
              });
              this.treeHoleList = this.treeHoleList.concat(res.data.records);
              this.weiYanPagination.total = res.data.total;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
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
              this.weiYanPagination.current = 1;
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
      }
    }
  }
</script>

<style scoped>

  .love-container {
    background-image: linear-gradient(to right, rgba(37, 82, 110, 0.1) 1px, var(--background) 1px), linear-gradient(to bottom, rgba(37, 82, 110, 0.1) 1px, var(--background) 1px);
    background-size: 3rem 3rem;
    /*background: var(--background);*/
  }

  .bg-wrap {
    height: 55vh;
    position: relative;
    overflow: hidden;
  }

  .love-image::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--miniMask);
  }

  .love-wrap {
    width: 90%;
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    max-width: 950px;
    border-radius: 3em;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 50px 70px 30px 70px;
  }

  .love-avatar {
    border: rgba(255, 255, 255, 0.2) 4px solid;
    width: 180px;
    height: 180px;
  }

  .love-title {
    margin-top: 15px;
    text-align: center;
    font-size: 25px;
    font-weight: 700;
    color: var(--white);
  }

  .love-img {
    animation: imgScale 2s linear infinite;
    width: 120px;
    height: 120px;
  }

  #bannerWave1 {
    height: 84px;
    background: var(--bannerWave1);
    position: absolute;
    width: 200%;
    bottom: 0;
    z-index: 10;
    animation: gradientBG 120s linear infinite;
  }

  #bannerWave2 {
    height: 100px;
    background: var(--bannerWave2);
    position: absolute;
    width: 400%;
    bottom: 0;
    z-index: 5;
    animation: gradientBG 120s linear infinite;
  }

  .love-content {
    max-width: 1200px;
    overflow: hidden;
    margin: 20px auto 0;
    user-select: none;
  }

  .love-time-title1 {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: 0.2rem;
    line-height: 4rem;
    text-align: center;
    background-image: linear-gradient(270deg, #ff4500, #ffa500, #ffd700, #90ee90, #00ffff, #1e90ff, #9370db, #ff69b4, #ff4500);
    -webkit-background-clip: text;
    animation: jianBian 60s linear infinite;
    width: 3000px;
    color: rgba(0, 0, 0, 0);
  }

  .love-time-title2 {
    text-align: center;
    font-size: 1.5rem;
    line-height: 4rem;
    font-weight: 600;
    letter-spacing: 2px;
  }

  .love-time1 {
    text-align: center;
    font-size: 2rem;
    font-weight: 700;
  }

  .love-time1-item {
    font-size: 4rem;
    font-weight: 700;
  }

  .card-wrap {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }

  .card-content {
    display: flex;
    padding: 25px;
    margin: 25px auto;
    border-radius: 20px;
    max-width: 780px;
    cursor: pointer;
    transition: all 0.3s;
    background: var(--background);
  }

  .card-content:hover,
  .family-button:hover,
  .family-wrap:hover {
    transform: translateY(-6px);
  }

  .card-right {
    margin-left: 20px;
  }

  .card-title {
    font-size: 1.6rem;
    letter-spacing: 0.2rem;
    line-height: 3.5rem;
    font-weight: 700;
  }

  .card-desc {
    font-size: 1.1rem;
    letter-spacing: 0.2rem;
    color: #777777;
  }

  .card-container {
    max-width: 1500px;
    margin: 20px auto 40px;
  }

  .pagination-wrap {
    display: flex;
    justify-content: center;
    margin-top: 40px;
  }

  .pagination {
    padding: 13px 15px;
    border: 1px solid var(--lightGray);
    border-radius: 3rem;
    color: var(--greyFont);
    width: 100px;
    user-select: none;
    cursor: pointer;
    text-align: center;
  }

  .pagination:hover {
    border: 1px solid var(--themeBackground);
    color: var(--themeBackground);
    box-shadow: 0 0 5px var(--themeBackground);
  }

  .comment-content {
    max-width: 1000px;
    margin: 0 auto;
  }

  .photo-title {
    text-align: center;
    font-size: 30px;
    font-weight: 700;
    line-height: 80px;
    letter-spacing: 2px;
  }

  .photo-title-warp {
    max-width: 1150px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
  }

  .isActive {
    animation: scale 2.5s ease-in-out infinite;
  }

  .family-button {
    position: relative;
    overflow: hidden;
    height: 150px;
    color: var(--white);
    margin: 50px auto 15px;
    border-radius: 20px;
    max-width: 350px;
    cursor: pointer;
    transition: all 0.3s;
    background: var(--love) center center / cover no-repeat;
    user-select: none;
  }

  .family-button::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--miniMask);
  }

  .family-button-title {
    position: absolute;
    line-height: 150px;
    margin-left: 20px;
    font-size: 25px;
    font-weight: 700;
    color: var(--white);
  }

  .family-button-car {
    position: absolute;
    margin-left: 220px;
    margin-top: 55px;
    animation: passing 4s linear infinite;
  }

  .family-container {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-bottom: 40px;
  }

  .family-wrap {
    cursor: pointer;
    width: 350px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 15px 25px 5px 25px;
    margin: 20px;
    transition: all 0.3s;
    user-select: none;
  }

  .family-avatar {
    border: rgba(255, 255, 255, 0.2) 4px solid;
    width: 90px;
    height: 90px;
  }

  .family-title {
    margin-top: 15px;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    color: var(--white);
  }

  .family-img {
    animation: imgScale 2s linear infinite;
    width: 60px;
    height: 60px;
  }

  .family-bottom-wrap {
    display: flex;
    justify-content: space-around;
    margin: 0 0 40px;
  }

  .family-bottom {
    color: var(--white);
    border-radius: 3rem;
    width: 150px;
    text-align: center;
    height: 50px;
    cursor: pointer;
    user-select: none;
  }

  .form-main {
    animation: hideToShow 2s;
    border-radius: 12px;
    overflow: hidden;
  }

  .user-content > div {
    height: 65px;
    display: flex;
    align-items: center;
  }

  .user-content >>> .el-input__inner {
    border: none;
    height: 40px;
    width: 250px;
    background: var(--whiteMask);
  }

  .user-content >>> .el-textarea__inner {
    border: none;
    width: 250px;
    background: var(--whiteMask);
  }

  .user-content >>> .el-input__count {
    background: var(--transparent);
    user-select: none;
  }

  .form-friend {
    background-color: #eeeeee;
    padding: 20px 0;
  }

  .form-title {
    margin: 10px;
    text-align: center;
  }

  @media screen and (max-width: 1200px) {
    .user-content > div {
      display: unset;
      align-items: unset;
    }
  }

  @media screen and (max-width: 800px) {
    .love-wrap {
      border-radius: 1.5em;
      padding: 40px 30px 10px 30px;
    }

    .love-avatar {
      width: 120px;
      height: 120px;
    }

    .love-img {
      width: 100px;
      height: 100px;
    }

    .love-time1 {
      font-size: 1.4rem;
    }

    .love-time1-item {
      font-size: 3rem;
    }
  }

  @media screen and (max-width: 600px) {
    .love-wrap {
      padding: 30px 20px 10px 20px;
    }

    .love-avatar {
      width: 100px;
      height: 100px;
    }

    .love-img {
      width: 80px;
      height: 80px;
    }

    .love-time1 {
      font-size: 1rem;
    }

    .love-time1-item {
      font-size: 1.8rem;
    }

    .love-time-title2 {
      font-size: 1.2rem;
    }

    .user-content >>> .el-textarea__inner {
      width: 100%;
    }

    .user-content >>> .el-input__inner {
      width: 190px;
    }

    .card-container .tree-hole-container {
      padding: 0;
    }
  }

  @media screen and (max-width: 1150px) {
    .card-wrap {
      display: unset;
      justify-content: unset;
    }

    .photo-title-warp {
      max-width: 780px;
    }

    .family-button {
      max-width: 780px;
    }
  }

</style>
