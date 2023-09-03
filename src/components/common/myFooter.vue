<template>
  <div class="myFooter-wrap" v-show="showFooter">
    <div class="myFooter">
      <div class="footer-title">{{$store.state.webInfo.footer}}</div>
      <div class="icp">本网站由 <a href="https://poetize.cn" target="_blank">Poetize</a> 强力支持</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showFooter: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {}
    },
    created() {
    }
  }
</script>

<style scoped>
  .myFooter-wrap {
    user-select: none;
    animation: hideToShow 2s;
  }

  .myFooter {
    border-radius: 1.5rem 1.5rem 0 0;
    background: var(--gradientBG);
    text-align: center;
    color: var(--white);
    background-size: 300% 300%;
    animation: gradientBG 10s ease infinite;
  }

  .footer-title {
    padding-top: 10px;
    font-size: 16px;
  }

  .icp, .icp a {
    color: var(--maxGreyFont);
    font-size: 13px;
  }

  .icp {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .icp a {
    text-decoration: none;
    transition: all 0.3s;
  }

  .icp a:hover {
    color: var(--themeBackground);
  }

</style>
