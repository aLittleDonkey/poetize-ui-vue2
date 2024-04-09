<template>
  <div>
    <loader :loading="loading">
      <!-- 加载页面 -->
      <template slot="loader">
        <div>
          <zombie></zombie>
        </div>
      </template>
      <!-- 内容页面 -->
      <template slot="body">
        <!-- 首页图片 -->
        <el-image style="animation: header-effect 2s"
                  class="background-image-index"
                  v-once
                  lazy
                  :src="!$common.isEmpty($store.state.webInfo.backgroundImage)?$store.state.webInfo.backgroundImage:$store.state.webInfo.randomCover[Math.floor(Math.random() * $store.state.webInfo.randomCover.length)]"
                  fit="cover">
          <div slot="error" class="image-slot background-image-index-error"></div>
        </el-image>
        <!-- 首页文字 -->
        <div class="signature-wall myCenter my-animation-hideToShow">
          <h1 class="playful">
            <span v-for="(a, index) in $store.state.webInfo.webTitle" :key="index">{{a}}</span>
          </h1>
          <div class="printer" @click="getGuShi()">
            <printer :printerInfo="printerInfo">
              <template slot="paper" slot-scope="scope">
                <h3>
                  {{ scope.content }}<span class="cursor">|</span>
                </h3>
              </template>
            </printer>
          </div>
          <div id="bannerWave1"></div>
          <div id="bannerWave2"></div>
          <i class="el-icon-arrow-down" @click="navigation('.page-container-wrap')"></i>
        </div>
        <!-- 首页内容 -->
        <div class="page-container-wrap">
          <div class="page-container">
            <div class="aside-content" v-if="showAside">
              <myAside @selectSort="selectSort" @selectArticle="selectArticle"></myAside>
            </div>
            <div class="recent-posts">
              <div class="announcement background-opacity">
                <i class="fa fa-volume-up" aria-hidden="true"></i>
                <div>
                  <div v-for="(notice, index) in $common.pushNotification($store.state.webInfo.notices, true)" :key="index">
                    {{ notice }}
                  </div>
                </div>
              </div>

              <div v-show="indexType === 1">
                <div v-for="(sort, index) in sortInfo" :key="index">
                  <div v-if="!$common.isEmpty(sortArticles[sort.id])">
                    <div class="sort-article-first">
                      <div>
                        <svg viewBox="0 0 1024 1024" width="20" height="20"
                             style="vertical-align: -2px;margin-bottom: -2px">
                          <path
                            d="M367.36 482.304H195.9936c-63.3344 0-114.6368-51.3536-114.6368-114.6368V196.2496c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368V367.616c0 63.3344-51.3536 114.688-114.688 114.688zM367.36 938.752H195.9936c-63.3344 0-114.6368-51.3536-114.6368-114.6368v-171.4176c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368v171.4176c0 63.3344-51.3536 114.6368-114.688 114.6368zM828.672 938.752h-171.4176c-63.3344 0-114.6368-51.3536-114.6368-114.6368v-171.4176c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368v171.4176c0 63.3344-51.3024 114.6368-114.6368 114.6368zM828.672 482.304h-171.4176c-63.3344 0-114.6368-51.3536-114.6368-114.6368V196.2496c0-63.3344 51.3536-114.6368 114.6368-114.6368h171.4176c63.3344 0 114.6368 51.3536 114.6368 114.6368V367.616c0 63.3344-51.3024 114.688-114.6368 114.688z"
                            fill="#FF623E"></path>
                        </svg>
                        {{sort.sortName}}
                      </div>
                      <div class="article-more" @click="$router.push({path: '/sort', query: {sortId: sort.id}})">
                        <svg viewBox="0 0 1024 1024" width="20" height="20"
                             style="vertical-align: -2px;margin-bottom: -2px">
                          <path
                            d="M347.3 897.3H142.2c-30.8 0-51.4-31.7-38.9-59.9l136.1-306.1c4.9-11 4.9-23.6 0-34.6L103.3 190.6c-12.5-28.2 8.1-59.9 38.9-59.9h205.1c16.8 0 32.1 9.9 38.9 25.3l151.4 340.7c4.9 11 4.9 23.6 0 34.6L386.3 872.1c-6.9 15.3-22.1 25.2-39 25.2z"
                            fill="#009F72"></path>
                          <path
                            d="M730.4 897.3H525.3c-30.8 0-51.4-31.7-38.9-59.9l136.1-306.1c4.9-11 4.9-23.6 0-34.6L486.4 190.6c-12.5-28.2 8.1-59.9 38.9-59.9h205.1c16.8 0 32.1 9.9 38.9 25.3l151.4 340.7c4.9 11 4.9 23.6 0 34.6L769.3 872.1c-6.8 15.3-22.1 25.2-38.9 25.2z"
                            fill="#F9DB88"></path>
                        </svg>
                        MORE
                      </div>
                    </div>
                    <sortArticle :articleList="sortArticles[sort.id]"></sortArticle>
                  </div>
                </div>
              </div>

              <div v-show="indexType === 2">
                <articleList :articleList="articles"></articleList>
                <div class="pagination-wrap">
                  <div @click="pageArticles()" class="pagination" v-if="pagination.total !== articles.length">
                    下一页
                  </div>
                  <div v-else style="user-select: none">
                    ~~到底啦~~
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 页脚 -->
        <div style="background: var(--background)">
          <myFooter></myFooter>
        </div>
      </template>
    </loader>

    <el-dialog title="每日推荐"
               :visible.sync="pushDialogVisible"
               width="60%"
               :append-to-body="true"
               :close-on-click-modal="false"
               class="index-push"
               center>
      <div style="display: flex;align-items: center;flex-direction: column">
        <div class="push-title">
          {{ push['标题'] }}
        </div>

        <el-image class="push-el-image"
                  lazy
                  :src="push['封面']"
                  fit="cover">
        </el-image>

        <div class="push-button" @click="pushUrl(push['链接'])">
          <span class="push-button-title">立即前往</span>
          <span class="push-button-car">
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
    </el-dialog>
  </div>
</template>
<script>
  const loader = () => import( "./common/loader");
  const zombie = () => import( "./common/zombie");
  const printer = () => import( "./common/printer");
  const articleList = () => import( "./articleList");
  const sortArticle = () => import( "./common/sortArticle");
  const myFooter = () => import( "./common/myFooter");
  const myAside = () => import( "./myAside");

  export default {
    components: {
      loader,
      zombie,
      printer,
      articleList,
      sortArticle,
      myFooter,
      myAside
    },

    data() {
      return {
        pushDialogVisible: false,
        push: {},
        loading: false,
        showAside: true,
        indexType: 1,
        printerInfo: "你看对面的青山多漂亮",
        pagination: {
          current: 1,
          size: 10,
          total: 0,
          searchKey: "",
          sortId: null,
          articleSearch: ""
        },
        guShi: {
          "content": "",
          "origin": "",
          "author": "",
          "category": ""
        },
        articles: [],
        sortArticles: {}
      };
    },

    watch: {},

    created() {
      this.getGuShi();
      this.getSortArticles();
    },

    computed: {
      sortInfo() {
        return this.$store.state.sortInfo;
      }
    },

    mounted() {
      setTimeout(() => {
        this.push = this.$common.pushNotification(this.$store.state.webInfo.notices, false);
        if(!this.$common.isEmpty(this.push)) {
          if("0" !== localStorage.getItem("showPushNotification_" + this.push['链接'])) {
            this.pushDialogVisible = true;
            localStorage.setItem("showPushNotification_" + this.push['链接'], "0");
          }
        }
      }, 2000);
    },

    methods: {
      async selectSort(sort) {
        this.pagination = {
          current: 1,
          size: 10,
          total: 0,
          searchKey: "",
          sortId: sort.id,
          articleSearch: ""
        };
        this.articles = [];
        await this.getArticles();
        this.$nextTick(() => {
          this.indexType = 2;
          $(".announcement").css("max-width", "780px");
          document.querySelector('.recent-posts').scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });
        });
      },
      async selectArticle(articleSearch) {
        this.pagination = {
          current: 1,
          size: 10,
          total: 0,
          searchKey: "",
          sortId: null,
          articleSearch: articleSearch
        };
        this.articles = [];
        await this.getArticles();
        this.$nextTick(() => {
          this.indexType = 2;
          $(".announcement").css("max-width", "780px");
          document.querySelector('.recent-posts').scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });
        });
      },
      pageArticles() {
        this.pagination.current = this.pagination.current + 1;
        this.getArticles();
      },

      async getArticles() {
        await this.$http.post(this.$constant.baseURL + "/article/listArticle", this.pagination)
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.articles = this.articles.concat(res.data.records);
              this.pagination.total = res.data.total;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      getSortArticles() {
        this.$http.get(this.$constant.baseURL + "/article/listSortArticle")
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.sortArticles = res.data;
            }
          })
          .catch((error) => {
            this.$message({
              message: error.message,
              type: "error"
            });
          });
      },
      navigation(selector) {
        let pageId = document.querySelector(selector);
        window.scrollTo({
          top: pageId.offsetTop,
          behavior: "smooth"
        });
      },
      pushUrl(url) {
        window.open(url);
      },
      getGuShi() {
        let that = this;
        let xhr = new XMLHttpRequest();
        xhr.open('get', this.$constant.jinrishici);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            that.guShi = JSON.parse(xhr.responseText);
            that.printerInfo = that.guShi.content;
          }
        };
        xhr.send();
      }
    }
  }
</script>

<style scoped>

  .background-image-index {
    width: 100vw;
    height: 50vh;
    position: fixed;
    z-index: -1;
  }

  .background-image-index::before {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .2);
    content: '';
  }

  .background-image-index-error {
    background-color: var(--lightGreen);
    width: 100vw;
    height: 50vh;
    position: fixed;
    z-index: -1;
  }

  .signature-wall {
    /* 向下排列 */
    display: flex;
    flex-direction: column;
    position: relative;
    user-select: none;
    height: 50vh;
    overflow: hidden;
  }

  .playful {
    color: var(--white);
    font-size: 40px;
  }

  .sort-article-first {
    margin: 40px auto 20px;
    display: flex;
    justify-content: space-between;
    color: var(--greyFont);
    border-bottom: 1px dashed var(--lightGray);
    padding-bottom: 5px;
  }

  .article-more {
    cursor: pointer;
    transition: all 0.3s;
  }

  .article-more:hover {
    color: var(--lightGreen);
    font-weight: 700;
    transform: scale(1.1);
  }

  /*.playful span {*/
  /*  position: relative;*/
  /*  color: #5362f6;*/
  /*  text-shadow: 0.25px 0.25px #e485f8, 0.5px 0.5px #e485f8, 0.75px 0.75px #e485f8,*/
  /*  1px 1px #e485f8, 1.25px 1.25px #e485f8, 1.5px 1.5px #e485f8, 1.75px 1.75px #e485f8,*/
  /*  2px 2px #e485f8, 2.25px 2.25px #e485f8, 2.5px 2.5px #e485f8, 2.75px 2.75px #e485f8,*/
  /*  3px 3px #e485f8, 3.25px 3.25px #e485f8, 3.5px 3.5px #e485f8, 3.75px 3.75px #e485f8,*/
  /*  4px 4px #e485f8, 4.25px 4.25px #e485f8, 4.5px 4.5px #e485f8, 4.75px 4.75px #e485f8,*/
  /*  5px 5px #e485f8, 5.25px 5.25px #e485f8, 5.5px 5.5px #e485f8, 5.75px 5.75px #e485f8,*/
  /*  6px 6px #e485f8;*/
  /*  animation: scatter 1.75s infinite;*/
  /*  font-weight: normal;*/
  /*}*/

  /*.playful span:nth-child(2n) {*/
  /*  color: #ed625c;*/
  /*  text-shadow: 0.25px 0.25px #f2a063, 0.5px 0.5px #f2a063, 0.75px 0.75px #f2a063,*/
  /*  1px 1px #f2a063, 1.25px 1.25px #f2a063, 1.5px 1.5px #f2a063, 1.75px 1.75px #f2a063,*/
  /*  2px 2px #f2a063, 2.25px 2.25px #f2a063, 2.5px 2.5px #f2a063, 2.75px 2.75px #f2a063,*/
  /*  3px 3px #f2a063, 3.25px 3.25px #f2a063, 3.5px 3.5px #f2a063, 3.75px 3.75px #f2a063,*/
  /*  4px 4px #f2a063, 4.25px 4.25px #f2a063, 4.5px 4.5px #f2a063, 4.75px 4.75px #f2a063,*/
  /*  5px 5px #f2a063, 5.25px 5.25px #f2a063, 5.5px 5.5px #f2a063, 5.75px 5.75px #f2a063,*/
  /*  6px 6px #f2a063;*/
  /*  animation-delay: 0.3s;*/
  /*}*/

  /*.playful span:nth-child(3n) {*/
  /*  color: #ffd913;*/
  /*  text-shadow: 0.25px 0.25px #6ec0a9, 0.5px 0.5px #6ec0a9, 0.75px 0.75px #6ec0a9,*/
  /*  1px 1px #6ec0a9, 1.25px 1.25px #6ec0a9, 1.5px 1.5px #6ec0a9, 1.75px 1.75px #6ec0a9,*/
  /*  2px 2px #6ec0a9, 2.25px 2.25px #6ec0a9, 2.5px 2.5px #6ec0a9, 2.75px 2.75px #6ec0a9,*/
  /*  3px 3px #6ec0a9, 3.25px 3.25px #6ec0a9, 3.5px 3.5px #6ec0a9, 3.75px 3.75px #6ec0a9,*/
  /*  4px 4px #6ec0a9, 4.25px 4.25px #6ec0a9, 4.5px 4.5px #6ec0a9, 4.75px 4.75px #6ec0a9,*/
  /*  5px 5px #6ec0a9, 5.25px 5.25px #6ec0a9, 5.5px 5.5px #6ec0a9, 5.75px 5.75px #6ec0a9,*/
  /*  6px 6px #6ec0a9;*/
  /*  animation-delay: 0.15s;*/
  /*}*/

  /*.playful span:nth-child(5n) {*/
  /*  color: #555bff;*/
  /*  text-shadow: 0.25px 0.25px #e485f8, 0.5px 0.5px #e485f8, 0.75px 0.75px #e485f8,*/
  /*  1px 1px #e485f8, 1.25px 1.25px #e485f8, 1.5px 1.5px #e485f8, 1.75px 1.75px #e485f8,*/
  /*  2px 2px #e485f8, 2.25px 2.25px #e485f8, 2.5px 2.5px #e485f8, 2.75px 2.75px #e485f8,*/
  /*  3px 3px #e485f8, 3.25px 3.25px #e485f8, 3.5px 3.5px #e485f8, 3.75px 3.75px #e485f8,*/
  /*  4px 4px #e485f8, 4.25px 4.25px #e485f8, 4.5px 4.5px #e485f8, 4.75px 4.75px #e485f8,*/
  /*  5px 5px #e485f8, 5.25px 5.25px #e485f8, 5.5px 5.5px #e485f8, 5.75px 5.75px #e485f8,*/
  /*  6px 6px #e485f8;*/
  /*  animation-delay: 0.4s;*/
  /*}*/

  /*.playful span:nth-child(7n) {*/
  /*  color: #ff9c55;*/
  /*  text-shadow: 0.25px 0.25px #ff5555, 0.5px 0.5px #ff5555, 0.75px 0.75px #ff5555,*/
  /*  1px 1px #ff5555, 1.25px 1.25px #ff5555, 1.5px 1.5px #ff5555, 1.75px 1.75px #ff5555,*/
  /*  2px 2px #ff5555, 2.25px 2.25px #ff5555, 2.5px 2.5px #ff5555, 2.75px 2.75px #ff5555,*/
  /*  3px 3px #ff5555, 3.25px 3.25px #ff5555, 3.5px 3.5px #ff5555, 3.75px 3.75px #ff5555,*/
  /*  4px 4px #ff5555, 4.25px 4.25px #ff5555, 4.5px 4.5px #ff5555, 4.75px 4.75px #ff5555,*/
  /*  5px 5px #ff5555, 5.25px 5.25px #ff5555, 5.5px 5.5px #ff5555, 5.75px 5.75px #ff5555,*/
  /*  6px 6px #ff5555;*/
  /*  animation-delay: 0.25s;*/
  /*}*/

  .printer {
    cursor: pointer;
    color: var(--white);
    background: var(--translucent);
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px;
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

  /* 光标 */
  .cursor {
    margin-left: 1px;
    animation: hideToShow 0.7s infinite;
    font-weight: 200;
  }

  .el-icon-arrow-down {
    font-size: 40px;
    font-weight: bold;
    color: var(--white);
    position: absolute;
    bottom: 60px;
    animation: my-shake 1.5s ease-out infinite;
    z-index: 15;
    cursor: pointer;
  }

  .page-container-wrap {
    background: var(--background);
    position: relative;
  }

  .page-container {
    display: flex;
    justify-content: center;
    width: 90%;
    padding: 0 20px 40px 20px;
    margin: 0 auto;
    flex-direction: row;
  }

  .recent-posts {
    width: 70%;
  }

  .announcement {
    padding: 22px;
    border: 1px dashed var(--lightGray);
    color: var(--greyFont);
    border-radius: 10px;
    display: flex;
    margin: 40px auto 40px;
  }

  .announcement i {
    color: var(--themeBackground);
    font-size: 22px;
    margin: auto 0;
    animation: scale 0.8s ease-in-out infinite;
  }

  .announcement div div {
    margin-left: 20px;
    line-height: 30px;
  }

  .aside-content {
    width: calc(30% - 40px);
    user-select: none;
    margin-top: 40px;
    margin-right: 40px;
    max-width: 300px;
    float: right;
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

  .push-title {
    font-weight: bold;
    font-size: 20px;
  }

  .push-el-image {
    width: 80%;
    min-height: 100px;
    max-height: 400px;
    border-radius: 15px;
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .push-button {
    position: relative;
    background: var(--lightGreen);
    cursor: pointer;
    width: 230px;
    border-radius: 2rem;
    line-height: 35px;
    color: var(--white);
  }

  .push-button-title {
    margin-left: 20px;
    font-weight: bold;
  }

  .push-button-car {
    position: absolute;
    margin-left: 55px;
    animation: passing 4s linear infinite;
  }

  @media screen and (max-width: 1100px) {
    .recent-posts {
      width: 100%;
    }

    .page-container {
      width: 100%;
    }
  }

  @media screen and (max-width: 1000px) {

    .page-container {
      /* 文章栏与侧标栏垂直排列 */
      flex-direction: column;
    }

    .aside-content {
      width: 100%;
      max-width: unset;
      float: unset;
      margin: 40px auto 0;
    }
  }

  @media screen and (max-width: 768px) {

    h1 {
      font-size: 35px;
    }
  }
</style>
