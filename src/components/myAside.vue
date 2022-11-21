<template>
  <div>
    <!-- 网站信息 -->
    <div class="card-content1 shadow-box background-opacity">
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
      </div>
      <a class="collection-btn" @click="showTip()">
        <i class="el-icon-star-off" style="margin-right: 2px"></i>朋友圈
      </a>
    </div>
    <!-- 分类 -->
    <div class="shadow-box background-opacity wow"
         style="padding: 25px 25px 5px;border-radius: 10px;animation: zoomIn 0.8s ease-in-out">
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
    <!-- 推荐文章 -->
    <div v-if="!$common.isEmpty(recommendArticles)"
         style="padding: 25px;border-radius: 10px;margin-top: 40px;animation: zoomIn 0.8s ease-in-out"
         class="shadow-box background-opacity wow">
      <div class="card-content2-title">
        <i class="el-icon-reading card-content2-icon"></i>
        <span>推荐文章</span>
      </div>
      <div v-for="(article, index) in recommendArticles"
           :key="index"
           @click="$router.push({path: '/article', query: {id: article.id}})">
        <div class="aside-post-detail">
          <div class="aside-post-image">
            <el-image class="my-el-image" :src="article.articleCover" fit="cover">
              <div slot="error" class="image-slot">
                <div class="error-aside-image">
                  {{article.username}}
                </div>
              </div>
            </el-image>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pagination: {
          current: 1,
          size: 5,
          recommendStatus: true
        },
        recommendArticles: []
      }
    },
    computed: {
      webInfo() {
        return this.$store.state.webInfo;
      },
      sortInfo() {
        return this.$store.state.sortInfo;
      }
    },
    created() {
      this.getRecommendArticles();
    },
    methods: {
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
  .card-content1 {
    background: linear-gradient(-45deg, #e8d8b9, #eccec5, #a3e9eb, #bdbdf0, #eec1ea);
    background-size: 400% 400%;
    animation: gradientBG 10s ease infinite;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
    border-radius: 10px;
    position: relative;
    /*color: var(--white);*/
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
    border-radius: 0.2rem;
    margin-right: 8px;
    overflow: hidden;
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
</style>
