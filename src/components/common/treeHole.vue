<template>
  <div class="tree-hole-container">
    <ol class="tree-hole-list" v-if="!$common.isEmpty(treeHoleList)">
      <li class="tree-hole-li"
          v-for="(treeHole, index) in treeHoleList"
          :key="index">
        <div class="tree-hole-content"
             :class="{ leftTreeHole: index % 2 === 0 && !$common.mobile(), rightTreeHole: index % 2 !== 0 || $common.mobile() }">
          <el-avatar shape="square" class="avatar-img" :size="36"
                     :src="!$common.isEmpty($store.state.currentUser)?$store.state.currentUser.avatar:$store.state.webInfo.avatar"></el-avatar>
          <div class="tree-hole-box"
               :style="{background: $constant.tree_hole_color[index % $constant.tree_hole_color.length]}">
            <div class="box-tag" v-if="index % 2 === 0 && !$common.mobile()"
                 :style="{'border-color': 'transparent transparent transparent '+$constant.tree_hole_color[index % $constant.tree_hole_color.length]}"></div>
            <div class="box-tag" v-if="index % 2 !== 0 || $common.mobile()"
                 :style="{'border-color': 'transparent '+$constant.tree_hole_color[index % $constant.tree_hole_color.length]+' transparent transparent'}"></div>
            <div class="my-content" v-html="treeHole.content"></div>
            <div style="display: flex;justify-content: space-between">
              <div>😃 {{treeHole.createTime}}</div>
              <div @click="deleteTreeHole(treeHole.id)"
                   class="tree-hole-delete"
                   v-if="!$common.isEmpty($store.state.currentUser)">
                <svg viewBox="0 0 1024 1024" width="18" height="18" style="vertical-align: -2px;">
                  <path
                    d="M921.1392 155.392h-270.592v-48.2816c0-22.7328-18.432-41.1648-41.1648-41.1648H426.3424a41.1648 41.1648 0 0 0-41.1648 41.1648v48.2816H110.6432c-14.1312 0-25.6 11.4688-25.6 25.6s11.4688 25.6 25.6 25.6h810.496c14.1312 0 25.6-11.4688 25.6-25.6s-11.4688-25.6-25.6-25.6zM170.8032 260.0448v592.8448c0 50.8928 41.2672 92.16 92.16 92.16h500.6848c50.8928 0 92.16-41.2672 92.16-92.16V260.0448H170.8032z m249.1392 462.7968c0 14.1312-11.4688 25.6-25.6 25.6s-25.6-11.4688-25.6-25.6V443.0848c0-14.1312 11.4688-25.6 25.6-25.6s25.6 11.4688 25.6 25.6v279.7568z m243.1488 0c0 14.1312-11.4688 25.6-25.6 25.6s-25.6-11.4688-25.6-25.6V443.0848c0-14.1312 11.4688-25.6 25.6-25.6s25.6 11.4688 25.6 25.6v279.7568z"
                    fill="#FF623E"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ol>
    <div class="tree-hole-go">
      <i class="fa fa-paper-plane" @click="launch()"></i>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      treeHoleList: {
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
      launch() {
        this.$emit("launch");
      },
      deleteTreeHole(id) {
        this.$emit("deleteTreeHole", id);
      }
    }
  }
</script>

<style scoped>

  .tree-hole-container {
    padding: 20px;
    margin: 0 auto;
  }

  .tree-hole-list {
    padding: 100px 0 20px;
    margin: 0;
    position: relative;
    list-style: none;
  }

  .tree-hole-list:before {
    content: '';
    width: 4px;
    border-radius: 50%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--themeBackground);
  }

  .tree-hole-list:after {
    content: '';
    width: 12px;
    height: 12px;
    border: 4px solid var(--maxLightRed);
    border-radius: 50%;
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--white);
    animation: weiYanShadowFlashing 1.5s linear infinite;
  }

  .tree-hole-li {
    margin: 5px auto;
  }

  .tree-hole-content {
    position: relative;
    width: 50%;
  }

  .leftTreeHole {
    text-align: right;
  }

  .rightTreeHole {
    margin-left: 50%;
  }

  .tree-hole-content:before {
    content: '';
    width: 12px;
    height: 12px;
    border: 4px solid var(--blue);
    border-radius: 50%;
    position: absolute;
    top: 10px;
    background-color: var(--white);
  }

  .leftTreeHole:before {
    right: 0;
    transform: translateX(10px);
  }

  .rightTreeHole:before {
    left: 0;
    transform: translateX(-10px);
  }

  .avatar-img {
    position: absolute;
    top: 0;
    transition: all 0.3s ease-in-out;
  }

  .leftTreeHole .avatar-img {
    right: 25px;
  }

  .rightTreeHole .avatar-img {
    left: 25px;
  }

  .tree-hole-box {
    font-size: 16px;
    padding: 10px;
    width: 360px;
    border-radius: 5px;
    position: relative;
    letter-spacing: 0.1em;
    font-weight: 400;
    transition: all 0.3s ease-in-out;
    color: var(--black);
    text-align: left;
    display: inline-block;
  }

  .leftTreeHole .tree-hole-box {
    margin-right: 90px;
  }

  .rightTreeHole .tree-hole-box {
    margin-left: 90px;
  }

  .tree-hole-box:hover, .avatar-img:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 16px 3px var(--miniMask);
  }

  .box-tag {
    content: '';
    position: absolute;
    border-style: solid;
  }

  .leftTreeHole .box-tag {
    right: -10px;
    border-width: 15px 0 5px 10px;
  }

  .rightTreeHole .box-tag {
    left: -10px;
    border-width: 15px 10px 5px 0;
  }

  .my-content {
    margin: 0 10px 10px;
    line-height: 30px;
  }

  .tree-hole-box > div:last-child {
    color: var(--greyFont);
    padding: 10px 10px 0;
    border-top: 1px dashed var(--white);
    font-size: 14px;
  }

  .tree-hole-go {
    color: var(--blue);
    font-weight: 700;
    font-size: 25px;
    margin: 20px auto;
    text-align: center;
  }

  .tree-hole-go i {
    cursor: pointer;
  }

  .tree-hole-go i:hover {
    animation: scale 1s linear infinite;
  }

  .tree-hole-delete {
    font-size: 14px;
    cursor: pointer;
  }

  @media screen and (max-width: 1000px) {
    .tree-hole-box {
      width: auto;
    }
  }

  @media screen and (max-width: 600px) {
    .tree-hole-content {
      margin-bottom: 50px;
    }

    .tree-hole-list:after {
      left: 0;
    }

    .tree-hole-list:before {
      left: 0;
    }

    .rightTreeHole {
      margin-left: unset;
    }

    .tree-hole-content {
      width: 100%;
    }
  }
</style>
