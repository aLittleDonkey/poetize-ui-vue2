<template>
  <div>
    <div class="myAside-container">
      <!-- 网站信息 -->
      <div v-if="!$common.mobile()" class="card-content1 shadow-box background-opacity">
        <el-avatar style="margin-top: 20px" class="user-avatar" :size="120" :src="webInfo.avatar"></el-avatar>
        <div class="web-name">{{webInfo.webName}}</div>
        <div class="web-info">
          <div class="blog-info-box">
            <span>文章</span>
            <span class="blog-info-num">{{ $store.getters.articleTotal }}</span>
          </div>
          <div class="blog-info-box">
            <span>分类</span>
            <span class="blog-info-num">{{ sortInfo.length }}</span>
          </div>
          <div class="blog-info-box">
            <span>访问量</span>
            <span class="blog-info-num">{{ webInfo.historyAllCount }}</span>
          </div>
        </div>
        <a class="collection-btn" @click="showTip()">
          <i class="el-icon-star-off" style="margin-right: 2px"></i>朋友圈
        </a>
      </div>

      <!-- 搜索 -->
      <div style="padding: 15px;border-radius: 10px;animation: hideToShow 1s ease-in-out"
           class="shadow-box background-opacity wow">
        <div style="color: var(--lightGreen);font-size: 20px;font-weight: bold;margin-bottom: 10px">
          搜索
        </div>
        <div style="display: flex">
          <input class="ais-SearchBox-input" type="text"
                 v-model="articleSearch"
                 placeholder="搜索文章" maxlength="32">
          <div class="ais-SearchBox-submit" @click="selectArticle()">
            <svg style="margin-top: 3.5px;margin-left: 18px" viewBox="0 0 1024 1024" width="20" height="20">
              <path
                d="M51.2 508.8c0 256.8 208 464.8 464.8 464.8s464.8-208 464.8-464.8-208-464.8-464.8-464.8-464.8 208-464.8 464.8z"
                fill="#51C492"></path>
              <path
                d="M772.8 718.4c48-58.4 76.8-132.8 76.8-213.6 0-186.4-151.2-337.6-337.6-337.6-186.4 0-337.6 151.2-337.6 337.6 0 186.4 151.2 337.6 337.6 337.6 81.6 0 156-28.8 213.6-76.8L856 896l47.2-47.2-130.4-130.4zM512 776c-149.6 0-270.4-121.6-270.4-271.2S363.2 233.6 512 233.6c149.6 0 271.2 121.6 271.2 271.2C782.4 654.4 660.8 776 512 776z"
                fill="#FFFFFF"></path>
            </svg>
          </div>
        </div>
      </div>

      <!-- 推荐文章 -->
      <div v-if="!$common.isEmpty(recommendArticles)"
           style="padding: 25px;border-radius: 10px;animation: hideToShow 1s ease-in-out"
           class="shadow-box background-opacity wow">
        <div class="card-content2-title">
          <span>🔥推荐文章</span>
        </div>
        <div v-for="(article, index) in recommendArticles"
             :key="index"
             @click="$router.push({path: `/article/${article.id}`})">
          <div class="aside-post-detail">
            <div class="aside-post-image">
              <el-image lazy class="my-el-image" :src="article.articleCover" fit="cover">
                <div slot="error" class="image-slot">
                  <div class="error-aside-image">
                    {{article.username}}
                  </div>
                </div>
              </el-image>
              <div class="hasVideo transformCenter" v-if="article.hasVideo">
                <svg viewBox="0 0 1024 1024" width="30" height="30">
                  <path
                    d="M514 114.3c-219.9 0-398.9 178.9-398.9 398.9 0.1 219.9 179 398.8 398.9 398.8 219.9 0 398.8-178.9 398.8-398.8S733.9 114.3 514 114.3z m173 421.9L437.1 680.5c-17.7 10.2-39.8-2.6-39.8-23V368.9c0-20.4 22.1-33.2 39.8-23L687 490.2c17.7 10.2 17.7 35.8 0 46z"
                    fill="#0C0C0C"></path>
                </svg>
              </div>
            </div>
            <div class="aside-post-title">
              {{ article.articleTitle }}
            </div>
          </div>
          <div class="aside-post-date">
            <i class="el-icon-date" style="color: var(--greyFont)"></i>{{ article.createTime }}
          </div>
        </div>
      </div>

      <!-- 速览 -->
      <div v-if="!$common.mobile()" class="selectSort">
        <div v-for="(sort, index) in sortInfo"
             @click="selectSort(sort)"
             :key="index"
             :style="{background: $constant.sortColor[index % $constant.sortColor.length]}"
             class="shadow-box-mini background-opacity wow"
             style="position: relative;padding: 10px 25px 15px;border-radius: 10px;animation: hideToShow 1s ease-in-out;cursor: pointer;color: var(--white)">
          <div>速览</div>
          <div class="sort-name">
            {{sort.sortName}}
          </div>
          <div style="font-weight: bold;margin-top: 15px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden">
            {{sort.sortDescription}}
          </div>
        </div>
      </div>

      <!-- 分类 -->
      <div class="shadow-box background-opacity wow"
           v-if="false"
           style="padding: 25px 25px 5px;border-radius: 10px;animation: hideToShow 1s ease-in-out">
        <div class="card-content2-title">
          <i class="el-icon-folder-opened card-content2-icon"></i>
          <span>分类</span>
        </div>
        <div v-for="(sort, index) in sortInfo"
             :key="index"
             class="post-sort"
             @click="$router.push({path: '/sort', query: {sortId: sort.id}})">
          <div>
            <span v-for="(s, i) in sort.sortName.split('')" :key="i">{{ s }}</span>
          </div>
        </div>
      </div>

      <!-- 赞赏 -->
      <div class="shadow-box-mini background-opacity wow admire-box"
           v-if="!$common.isEmpty(admires) && false">
        <div style="font-weight: bold;margin-bottom: 20px">🧨赞赏名单</div>
        <div>
          <vue-seamless-scroll :data="admires" style="height: 200px;overflow: hidden">
            <div v-for="(item, i) in admires"
                 style="display: flex;justify-content: space-between"
                 :key="i">
              <div style="display: flex">
                <el-avatar style="margin-bottom: 10px" :size="36" :src="item.avatar"></el-avatar>
                <div style="margin-left: 10px;height: 36px;line-height: 36px;overflow: hidden;max-width: 80px">
                  {{ item.username }}
                </div>
              </div>
              <div style="height: 36px;line-height: 36px">
                {{ item.admire }}元
              </div>
            </div>
          </vue-seamless-scroll>
        </div>
        <div class="admire-btn" @click="showAdmire()">
          赞赏
        </div>
      </div>
    </div>

    <!-- 微信 -->
    <el-dialog title="赞赏"
               :visible.sync="showAdmireDialog"
               width="25%"
               :append-to-body="true"
               destroy-on-close
               center>
      <div>
        <div class="admire-image"></div>
        <div>
          <div class="admire-content">1. 感谢老铁送来的666</div>
          <div class="admire-content">2. 申请通过后会加博客交流群，不需要加群或者退群后会定期清理好友（强迫症福利）</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import vueSeamlessScroll from "vue-seamless-scroll";

  export default {
    components: {
      vueSeamlessScroll
    },
    data() {
      return {
        pagination: {
          current: 1,
          size: 5,
          recommendStatus: true
        },
        recommendArticles: [],
        admires: [],
        showAdmireDialog: false,
        articleSearch: ""
      }
    },
    computed: {
      webInfo() {
        return this.$store.state.webInfo;
      },
      sortInfo() {
        return this.$store.getters.navigationBar;
      }
    },
    created() {
      this.getRecommendArticles();
      this.getAdmire();
    },
    methods: {
      selectSort(sort) {
        this.$emit("selectSort", sort);
      },
      selectArticle() {
        this.$emit("selectArticle", this.articleSearch);
      },
      showAdmire() {
        if (this.$common.isEmpty(this.$store.state.currentUser)) {
          this.$message({
            message: "请先登录！",
            type: "error"
          });
          return;
        }

        this.showAdmireDialog = true;
      },
      getAdmire() {
        this.$http.get(this.$constant.baseURL + "/webInfo/getAdmire")
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.admires = res.data;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      getRecommendArticles() {
        this.$http.post(this.$constant.baseURL + "/article/listArticle", this.pagination)
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.recommendArticles = res.data.records;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      showTip() {
        this.$router.push({path: '/weiYan'});
      }
    }
  }
</script>

<style scoped>

  .myAside-container > div:not(:last-child) {
    margin-bottom: 30px;
  }

  .selectSort > div:not(:last-child) {
    margin-bottom: 30px;
  }

  .card-content1 {
    background: linear-gradient(-45deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea);
    background-size: 400% 400%;
    animation: gradientBG 10s ease infinite;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
  }

  .card-content1 :not(:first-child) {
    z-index: 10;
  }

  .web-name {
    font-size: 30px;
    font-weight: bold;
    margin: 20px 0;
  }

  .web-info {
    width: 80%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .blog-info-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
  }

  .blog-info-num {
    margin-top: 12px;
  }

  .collection-btn {
    position: relative;
    margin-top: 12px;
    background: var(--lightGreen);
    cursor: pointer;
    width: 65%;
    height: 35px;
    border-radius: 1rem;
    text-align: center;
    line-height: 35px;
    color: var(--white);
    overflow: hidden;
    z-index: 1;
    margin-bottom: 25px;
  }

  .collection-btn::before {
    background: var(--gradualRed);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: "";
    transform: scaleX(0);
    transform-origin: 0;
    transition: transform 0.5s ease-out;
    transition-timing-function: cubic-bezier(0.45, 1.64, 0.47, 0.66);
    border-radius: 1rem;
    z-index: -1;
  }

  .collection-btn:hover::before {
    transform: scaleX(1);
  }

  .card-content2-title {
    font-size: 18px;
    margin-bottom: 20px;
    color: var(--lightGreen);
    font-weight: bold;
  }

  .card-content2-icon {
    color: var(--red);
    margin-right: 5px;
    animation: scale 1s ease-in-out infinite;
  }

  .aside-post-detail {
    display: flex;
    cursor: pointer;
  }

  .aside-post-image {
    width: 40%;
    min-height: 50px;
    border-radius: 6px;
    margin-right: 8px;
    overflow: hidden;
    position: relative;
  }

  .error-aside-image {
    background: var(--themeBackground);
    color: var(--white);
    padding: 10px;
    text-align: center;
    width: 100%;
    height: 100%;
  }

  .aside-post-title {
    width: 60%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .aside-post-date {
    margin-top: 8px;
    margin-bottom: 20px;
    color: var(--greyFont);
    font-size: 12px;
  }

  .post-sort {
    border-radius: 1rem;
    margin-bottom: 15px;
    line-height: 30px;
    transition: all 0.3s;
  }

  .post-sort:hover {
    background: var(--themeBackground);
    padding: 2px 15px;
    cursor: pointer;
    color: var(--white);
  }

  .sort-name {
    font-weight: bold;
    font-size: 25px;
    margin-top: 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .sort-name:after {
    top: 74px;
    width: 22px;
    left: 26px;
    height: 2px;
    background: var(--white);
    content: "";
    border-radius: 1px;
    position: absolute;
  }

  .admire-box {
    background: var(--springBg) center center / cover no-repeat;
    padding: 25px;
    border-radius: 10px;
    animation: hideToShow 1s ease-in-out;
  }

  .admire-btn {
    padding: 13px 15px;
    background: var(--maxLightRed);
    border-radius: 3rem;
    color: var(--white);
    width: 100px;
    user-select: none;
    cursor: pointer;
    text-align: center;
    margin: 20px auto 0;
    transition: all 1s;
  }

  .admire-btn:hover {
    transform: scale(1.2);
  }

  .admire-image {
    margin: 0 auto 10px;
    border-radius: 10px;
    height: 150px;
    width: 150px;
    background: var(--admireImage) center center / cover no-repeat;
  }

  .admire-content {
    font-size: 12px;
    color: var(--maxGreyFont);
    line-height: 1.5;
    margin: 5px;
  }

  .ais-SearchBox-input {
    padding: 0 14px;
    height: 30px;
    width: calc(100% - 50px);
    outline: 0;
    border: 2px solid var(--lightGreen);
    border-right: 0;
    border-radius: 40px 0 0 40px;
    color: var(--maxGreyFont);
    background: var(--white);
  }

  .ais-SearchBox-submit {
    height: 30px;
    width: 50px;
    border: 2px solid var(--lightGreen);
    border-left: 0;
    border-radius: 0 40px 40px 0;
    background: var(--white);
    cursor: pointer;
  }

  .hasVideo {
    padding: 2px 10px 0;
    background: var(--maxMaxWhiteMask);
    border-radius: 6px;
  }

</style>
