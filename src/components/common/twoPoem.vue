<template>
  <div class="poem-container myCenter my-animation-hideToShow"
       v-if="!$common.isEmpty(guShi.origin) || !$common.isEmpty(hitokoto.hitokoto)">
    <!-- 背景图片 -->
    <el-image class="my-el-image poem-image"
              style="position: absolute;margin-top: -50px"
              v-once
              :src="$constant.two_poem_image[Math.floor(Math.random() * $constant.two_poem_image.length)]"
              fit="cover">
      <div slot="error" class="image-slot"></div>
    </el-image>
    <div class="poem-wrap">
      <div><span>{{isHitokoto?hitokoto.from:guShi.origin}}</span></div>
      <p class="poem">{{isHitokoto?hitokoto.hitokoto:guShi.content}}</p>
      <p class="info" v-if="!isHitokoto || (isHitokoto && !$common.isEmpty(hitokoto.from_who))">
        {{isHitokoto?hitokoto.from_who:guShi.author}}
      </p>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      isHitokoto: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        guShi: {
          "content": "...",
          "origin": "...",
          "author": "...",
          "category": "..."
        },
        hitokoto: {
          "hitokoto": "...",
          "from": "...",
          "from_who": "..."
        }
      };
    },
    created() {
      if (this.isHitokoto) {
        this.getHitokoto();
      } else {
        this.getGuShi();
      }
    },

    methods: {
      getGuShi() {
        let that = this;
        let xhr = new XMLHttpRequest();
        xhr.open('get', this.$constant.jinrishici);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            that.guShi = JSON.parse(xhr.responseText);
          }
        };
        xhr.send();
      },
      getHitokoto() {
        let that = this;
        let xhr = new XMLHttpRequest();
        xhr.open('get', this.$constant.hitokoto);
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            that.hitokoto = JSON.parse(xhr.responseText);
          }
        }
        xhr.send();
      }
    }
  };
</script>
<style scoped>

  .poem-container {
    padding: 90px 0 40px;
    position: relative;
  }

  .poem-wrap {
    border-radius: 10px;
    z-index: 10;
    text-align: center;
    letter-spacing: 4px;
    font-weight: 300;
    width: 60%;
  }

  .poem-wrap div span {
    padding: 5px 40px;
    color: var(--white);
    font-size: 1.8em;
    border-radius: 5px;
  }

  .poem-wrap p {
    width: 70%;
    color: var(--white);
  }

  .poem-wrap p.poem {
    margin: 40px auto;
    font-size: 1.5em;
  }

  .poem-wrap p.info {
    margin: 20px auto;
    font-size: 1.1em;
  }
</style>
