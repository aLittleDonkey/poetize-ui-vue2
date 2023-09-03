<template>
  <div class="card-container" v-if="!$common.isEmpty(resourcePathList)">
    <div v-for="(resourcePath, index) in resourcePathList"
         :key="index"
         class="card-item wow shadow-box-mini">
      <div class="card-image">
        <el-image class="my-el-image"
                  v-once
                  lazy
                  :preview-src-list="[resourcePath.cover]"
                  :src="resourcePath.cover"
                  fit="cover">
          <div slot="error" class="image-slot"></div>
        </el-image>
      </div>
      <div class="card-body">
        <el-tooltip placement="bottom-start" effect="light">
          <div slot="content">{{resourcePath.title}}</div>
          <div class="card-desc">
            {{resourcePath.title}}
          </div>
        </el-tooltip>
        <div class="card-time">
          Date: {{$common.getDateDiff(resourcePath.createTime)}}
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

    methods: {}
  }
</script>

<style scoped>

  .card-container {
    display: flex;
    flex-wrap: wrap;
  }

  .card-item {
    position: relative;
    overflow: hidden;
    margin: 15px;
    height: 550px;
    flex-shrink: 0;
    width: calc(100% / 3 - 30px);
    cursor: pointer;
    animation: zoomIn 0.8s ease-in-out;
    padding: 1.3rem 1.3rem 1.5rem;
    background: var(--background);
    border-radius: 1.5rem;
    transition: all 0.2s;
  }

  .card-image {
    width: 100%;
    height: 400px;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 2px 10px rgba(147, 147, 147, 0.61);
    margin-bottom: 1rem;
  }

  .card-image >>> .el-image__inner {
    transition: all 1s;
  }

  .card-image >>> .el-image__inner:hover {
    transform: scale(1.2);
  }

  .card-body {
    padding: 10px 5px;
  }

  .card-desc {
    font-weight: 600;
    font-size: 1.05rem;
    color: var(--fontColor);
    letter-spacing: 1px;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .card-time {
    position: absolute;
    bottom: 15px;
    color: #999999;
    font-weight: 500;
  }

  @media screen and (max-width: 1300px) {
    .card-item {
      width: calc(100% / 2 - 30px);
    }
  }

  @media screen and (max-width: 1000px) {
    .card-item {
      height: 450px;
    }

    .card-image {
      height: 300px;
    }
  }

  @media screen and (max-width: 750px) {
    .card-item {
      width: 100%;
      margin: 15px 0;
    }
  }

  @media screen and (max-width: 450px) {
    .card-item {
      height: 400px;
    }

    .card-image {
      height: 250px;
    }
  }

</style>
