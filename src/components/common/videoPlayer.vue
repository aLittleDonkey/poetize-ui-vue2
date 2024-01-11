<template>
  <div>
    <div>
      <video-player class="video-player-box"
                    ref="videoPlayer"
                    :options="playerOptions"
                    :playsinline="true"

                    @play="onPlayerPlay($event)"
                    @pause="onPlayerPause($event)"
                    @ended="onPlayerEnded($event)"

                    @waiting="onPlayerWaiting($event)"
                    @playing="onPlayerPlaying($event)"
                    @loadeddata="onPlayerLoadeddata($event)"
                    @timeupdate="onPlayerTimeupdate($event)"
                    @canplay="onPlayerCanplay($event)"
                    @canplaythrough="onPlayerCanplaythrough($event)"

                    @statechanged="playerStateChanged($event)"
                    @ready="playerReadied($event)">
      </video-player>
    </div>
  </div>
</template>

<script>

  import 'video.js/dist/video-js.css'
  import {videoPlayer} from 'vue-video-player'

  export default {
    props: {
      url: {
        type: Object
      },
      cover: {
        type: String,
        default: ""
      }
    },
    components: {
      videoPlayer
    },
    data() {
      return {
        playerOptions: {
          //是否在页面加载后载入视频
          preload: 'metadata',
          aspectRatio: '16:9',
          //自适应宽高
          fluid: true,
          loop: false,
          muted: false,
          language: 'zh-CN',
          autoplay: false,
          //可选的播放速度
          playbackRates: [0.5, 1.0, 1.5, 2.0],
          sources: [{
            type: '',
            src: ''
          }],
          poster: '',
          notSupportedMessage: '此视频暂无法播放',
          controlBar: {
            //暂停和播放键
            playToggle: true,
            //进度条
            progressControl: true,
            //全屏按钮
            fullscreenToggle: true
          }
        }
      }
    },

    computed: {
      player() {
        return this.$refs.videoPlayer.player;
      }
    },

    watch: {
      url: {
        handler(val) {
          this.playerOptions.sources[0].src = val.src;
          this.playerOptions.sources[0].type = val.type;
          this.playerOptions.poster = this.cover;
        },
        immediate: true,
        deep: true
      }
    },

    created() {

    },

    mounted() {

    },

    methods: {
      //播放回调
      onPlayerPlay(player) {

      },

      //暂停回调
      onPlayerPause(player) {

      },

      //视频播完回调
      onPlayerEnded(player) {

      },

      //当播放由于暂时缺少数据而停止时，将触发该事件
      onPlayerWaiting(player) {

      },

      //在首次启动播放后以及每当重新启动时都会触发。例如，当播放因缺少数据而暂停或延迟后恢复时，将触发它
      onPlayerPlaying(player) {

      },

      //当前播放位置的视频帧（通常是第一帧）加载完成后触发
      onPlayerLoadeddata(player) {

      },

      //当currentTime更新时会触发timeupdate事件
      onPlayerTimeupdate(player) {

      },

      //在终端可以播放媒体文件时（但估计还没有加载足够的数据来播放媒体直到其结束，即后续可能需要停止以进一步缓冲内容）被触发
      onPlayerCanplay(player) {

      },

      //在终端可以播放媒体文件时（估计已经加载了足够的数据来播放媒体直到其结束，而不必停止以进一步缓冲内容）被触发
      onPlayerCanplaythrough(player) {

      },

      //播放状态改变回调
      playerStateChanged(player) {

      },

      //将侦听器绑定到组件的就绪状态。与事件监听器的不同之处在于，如果ready事件已经发生，它将立即触发该函数
      playerReadied(player) {

      }
    }
  }
</script>

<style>

  .video-player-box {
    border-radius: 5px;
    overflow: hidden;
  }

  .vjs-big-play-button {
    left: 50% !important;
    top: 50% !important;
    transform: translate(-50%, -50%) !important;
  }

</style>
