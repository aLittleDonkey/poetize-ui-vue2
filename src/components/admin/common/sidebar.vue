<template>
  <div class="sidebar">
    <el-menu class="sidebar-el-menu"
             default-active="/main"
             background-color="#ebf1f6"
             text-color="#606266"
             active-text-color="#20a0ff"
             unique-opened
             router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template slot="title">
                  {{ subItem.title }}
                </template>
                <el-menu-item v-for="threeItem in subItem.subs" :key="threeItem.index" :index="threeItem.index">
                  {{ threeItem.title }}
                </el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon"></i>
            {{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [{
          icon: "el-icon-s-home",
          index: "/main",
          title: "系统首页",
        }, {
          icon: "el-icon-s-tools",
          index: "/webEdit",
          title: "网站设置",
        }, {
          icon: "el-icon-user-solid",
          index: "/userList",
          title: "用户管理"
        }, {
          icon: "el-icon-postcard",
          index: "/postList",
          title: "文章管理"
        }, {
          icon: "el-icon-notebook-2",
          index: "/sortList",
          title: "分类管理"
        }, {
          icon: "el-icon-edit-outline",
          index: "/commentList",
          title: "评论管理"
        }, {
          icon: "el-icon-s-comment",
          index: "/treeHoleList",
          title: "留言管理"
        }, {
          icon: "el-icon-paperclip",
          index: "/resourceList",
          title: "资源管理"
        }, {
          icon: "el-icon-bank-card",
          index: "/resourcePathList",
          title: "资源路径管理"
        }]
      }
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

  .sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
  }

  .sidebar::-webkit-scrollbar {
    width: 0;
  }

  .sidebar-el-menu {
    width: 200px;
  }

  .sidebar > ul {
    height: 100%;
  }
</style>
