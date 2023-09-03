<template>
  <div class="card-container" v-if="!$common.isEmpty(resourcePathList)">
    <div v-for="(resourcePath, index) in resourcePathList"
         :key="index"
         class="card-item shadow-box wow"
         @click="clickResourcePath(resourcePath)">
      <div class="card-image">
        <el-image class="my-el-image"
                  v-once
                  lazy
                  :src="resourcePath.cover"
                  fit="cover">
          <div slot="error" class="image-slot myCenter" style="background-color: var(--lightGreen)">
            <div class="error-text">
              <div>遇事不决，可问春风</div>
            </div>
          </div>
        </el-image>
      </div>
      <div class="card-body">
        <div class="card-title">
          <span v-if="resourcePath.recommendStatus">
            🔥
          </span>
          {{resourcePath.title}}
        </div>
        <div class="card-desc">
          {{resourcePath.introduction}}
        </div>

        <div class="card-time">
          <svg viewBox="0 0 1024 1024" width="14" height="14" style="vertical-align: -2px;">
            <path d="M512 512m-512 0a512 512 0 1 0 1024 0 512 512 0 1 0-1024 0Z" fill="#409EFF"></path>
            <path
              d="M654.222222 256c-17.066667 0-28.444444 11.377778-28.444444 28.444444v56.888889c0 17.066667 11.377778 28.444444 28.444444 28.444445s28.444444-11.377778 28.444445-28.444445v-56.888889c0-17.066667-11.377778-28.444444-28.444445-28.444444zM369.777778 256c-17.066667 0-28.444444 11.377778-28.444445 28.444444v56.888889c0 17.066667 11.377778 28.444444 28.444445 28.444445s28.444444-11.377778 28.444444-28.444445v-56.888889c0-17.066667-11.377778-28.444444-28.444444-28.444444z"
              fill="#FFFFFF"></path>
            <path
              d="M725.333333 312.888889H711.111111v28.444444c0 31.288889-25.6 56.888889-56.888889 56.888889s-56.888889-25.6-56.888889-56.888889v-28.444444h-170.666666v28.444444c0 31.288889-25.6 56.888889-56.888889 56.888889s-56.888889-25.6-56.888889-56.888889v-28.444444h-14.222222c-22.755556 0-42.666667 19.911111-42.666667 42.666667v341.333333c0 22.755556 19.911111 42.666667 42.666667 42.666667h426.666666c22.755556 0 42.666667-19.911111 42.666667-42.666667v-341.333333c0-22.755556-19.911111-42.666667-42.666667-42.666667zM426.666667 654.222222h-56.888889c-17.066667 0-28.444444-11.377778-28.444445-28.444444s11.377778-28.444444 28.444445-28.444445h56.888889c17.066667 0 28.444444 11.377778 28.444444 28.444445s-11.377778 28.444444-28.444444 28.444444z m227.555555 0h-56.888889c-17.066667 0-28.444444-11.377778-28.444444-28.444444s11.377778-28.444444 28.444444-28.444445h56.888889c17.066667 0 28.444444 11.377778 28.444445 28.444445s-11.377778 28.444444-28.444445 28.444444z m0-113.777778h-56.888889c-17.066667 0-28.444444-11.377778-28.444444-28.444444s11.377778-28.444444 28.444444-28.444444h56.888889c17.066667 0 28.444444 11.377778 28.444445 28.444444s-11.377778 28.444444-28.444445 28.444444z"
              fill="#FFFFFF"></path>
          </svg>
          发布于 {{ $common.getDateDiff(resourcePath.createTime) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      resourcePathList: {
        type: Array
      }
    },

    data() {
      return {}
    },

    computed: {},

    watch: {},

    created() {

    },

    mounted() {

    },

    methods: {
      clickResourcePath(resourcePath) {
        this.$emit("clickResourcePath", resourcePath.url);
      }
    }
  }
</script>

<style scoped>

  .card-container {
    display: flex;
    flex-wrap: wrap;
  }

  .card-item {
    position: relative;
    border-radius: 10px;
    background: rgba(255, 255, 255, .88);
    overflow: hidden;
    margin: 10px;
    height: 300px;
    flex-shrink: 0;
    width: calc(100% / 3 - 20px);
    cursor: pointer;
    animation: zoomIn 0.8s ease-in-out;
  }

  .card-image {
    width: 100%;
    height: 180px;
  }

  .card-image >>> .el-image__inner {
    transition: all 1s;
  }

  .card-image >>> .el-image__inner:hover {
    transform: scale(1.2);
  }

  .card-body {
    padding: 10px 20px;
  }

  .card-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: all .2s ease-in-out;
  }

  .card-title:hover {
    color: var(--lightGreen);
  }

  .card-desc {
    font-size: 14px;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    letter-spacing: 1px;
  }

  .card-time {
    position: absolute;
    bottom: 10px;
    font-size: 12px;
    color: var(--greyFont);
  }

  @media screen and (max-width: 700px) {
    .card-item {
      width: calc(100% / 2 - 20px);
    }
  }

  @media screen and (max-width: 500px) {
    .card-item {
      width: calc(100% - 20px);
    }
  }

</style>
