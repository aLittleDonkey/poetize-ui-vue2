<template>
  <div>
    <div class="favorite-container">
      <!-- 封面 -->
      <div class="favorite-header my-animation-slide-top">
        <!-- 背景图片 -->
        <video class="index-video" autoplay="autoplay" muted="muted" loop="loop"
               :src="$constant.favoriteVideo">
        </video>
        <div style="position: absolute;left: 0;top: 0;padding: 20px">
          <!-- 标题 -->
          <div style="color: var(--white);margin: 10px">
            <div>
              记录
            </div>
            <div style="font-size: 36px;font-weight: bold;line-height: 2">
              百宝箱
            </div>
          </div>
          <div class="card-container">
            <!-- 收藏夹 -->
            <div @click="changeFavorite(1)"
                 class="card-item">
              <div class="favorite-image"></div>
              <div style="position: absolute;left: 0;top: 0;padding: 20px 25px 15px">
                <div class="card-name">
                  收藏夹
                </div>
                <div class="card-desc">
                  将 poetize.cn 添加到您的收藏夹吧
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 内容 -->
      <div class="favorite-content my-animation-slide-bottom">
        <!-- 收藏夹 -->
        <div v-show="card === 1 && !$common.isEmpty(collects)">
          <div v-for="(value, key) in collects" :key="key" style="margin-top: 20px">
            <div class="collect-classify">
              {{key}}
            </div>
            <div class="favorite-item-wrap">
              <div v-for="(item, index) in value" :key="index" @click="toUrl(item.url)" class="favorite-item">
                <div>
                  <el-avatar class="favorite-item-image" :size="60"
                             :src="item.cover">
                  </el-avatar>
                </div>
                <div style="width: calc(100% - 80px)">
                  <div class="favorite-item-title">
                    {{item.title}}
                  </div>
                  <div class="favorite-item-introduction">
                    {{item.introduction}}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 页脚 -->
    <div style="background: var(--favoriteBg)">
      <myFooter></myFooter>
    </div>
  </div>
</template>

<script>

  const myFooter = () => import( "./common/myFooter");

  export default {
    components: {
      myFooter
    },

    data() {
      return {
        card: null,
        collects: {}
      }
    },

    computed: {},

    watch: {},

    created() {
      this.card = 1;
      this.getCollect();
    },

    mounted() {

    },

    methods: {
      toUrl(url) {
        window.open(url);
      },
      changeFavorite(card) {
        this.card = card;
        if (card === 1) {
          if (this.$common.isEmpty(this.collects)) {
            this.getCollect();
          }
        }
      },
      getCollect() {
        this.$http.get(this.$constant.baseURL + "/webInfo/listCollect")
          .then((res) => {
            if (!this.$common.isEmpty(res.data)) {
              this.collects = res.data;
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

  .favorite-container {
    padding: 25px;
    background: var(--favoriteBg);
  }

  .favorite-header {
    margin: 60px auto 30px;
    height: 410px;
    position: relative;
    overflow: hidden;
    border-radius: 20px;
    max-width: 1200px;
  }

  .index-video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .favorite-image::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: var(--translucent);
  }

  .card-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 60px;
  }

  .card-item {
    transition: all 0.3s;
    position: relative;
    width: 250px;
    height: 120px;
    border-radius: 20px;
    animation: hideToShow 1s ease-in-out;
    cursor: pointer;
    overflow: hidden;
    margin: 10px;
    color: var(--white);
  }

  .card-item:hover {
    transform: translateY(-6px);
  }

  .card-name {
    font-weight: bold;
    font-size: 25px;
  }

  .card-name:after {
    top: 50px;
    width: 22px;
    left: 26px;
    height: 2px;
    background: var(--white);
    content: "";
    border-radius: 1px;
    position: absolute;
  }

  .card-desc {
    font-weight: bold;
    margin-top: 15px;
  }

  .favorite-content {
    margin: 0 auto;
    max-width: 1200px;
  }

  .collect-classify {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .favorite-item-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-left: -10px;
  }

  .favorite-item {
    transition: all 0.3s;
    border-radius: 12px;
    box-shadow: 0 8px 16px -4px #2c2d300c;
    background: var(--background);
    display: flex;
    width: calc(100% / 4 - 20px);
    max-width: 320px;
    height: 90px;
    overflow: hidden;
    padding: 15px;
    cursor: pointer;
    margin: 10px;
  }

  .favorite-item:hover {
    background: #425AEF;
    color: var(--white);
  }

  .favorite-item:hover .favorite-item-image {
    transition: all 0.6s;
    width: 0 !important;
    height: 0 !important;
    opacity: 0;
    margin-right: 0;
  }

  .favorite-item:hover div:nth-child(2) {
    width: 100% !important;
  }

  .favorite-item-image {
    margin-right: 20px;
    transition: all 0.3s;
  }

  .favorite-item-title {
    font-size: 19px;
    font-weight: bold;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin-bottom: 5px;
  }

  .favorite-item-introduction {
    opacity: 0.7;
    font-weight: bold;
    letter-spacing: 1px;
    font-size: 14px;
    line-height: 1.2;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  @media screen and (max-width: 620px) {
    .card-container {
      margin-top: 0;
    }
  }

  @media screen and (max-width: 900px) {
    .favorite-item {
      width: calc(100% / 3 - 20px);
    }
  }

  @media screen and (max-width: 700px) {
    .favorite-item {
      width: calc(100% / 2 - 20px);
    }
  }

  @media screen and (max-width: 400px) {
    .favorite-item {
      width: calc(100% - 20px);
    }
  }
</style>
