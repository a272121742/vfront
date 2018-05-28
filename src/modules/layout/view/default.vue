<style>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu
          mode="horizontal"
          theme="dark"
          active-name="1"
        >
          <div class="layout-logo"/>
          <div class="layout-nav">
            <MenuItem name="1">
            <Icon type="ios-navigate"/>
            Item 1
            </MenuItem>
            <MenuItem name="2">
            <Icon type="ios-keypad"/>
            Item 2
            </MenuItem>
            <MenuItem name="3">
            <Icon type="ios-analytics"/>
            Item 3
            </MenuItem>
            <MenuItem name="4">
            <Icon type="ios-paper"/>
            Item 4
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider 
          :style="{background: '#fff'}"
          hide-trigger>
          <!-- 循环加载菜单-->
          <Menu
            :open-names="['1']"
            active-name="1-2"
            theme="light"
            width="auto"
            @on-select="onSelect">
            <Submenu
              v-for="(route, index) in navMenus"
              :key="index"
              :name="index">
              <template slot="title">
                <i-icon type="ios-navigate"/>
                {{ route.meta.title }}
              </template>
              <MenuItem
                v-for="(childRoute, childIndex) in route.children"
                :key="childIndex"
                :name="childRoute.name">
              {{ childRoute.meta.title }}
              </MenuItem>
            </Submenu>
          </Menu>
          
          <!-- <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                Item 1
              </template>
              <MenuGroup title="使用">
                <MenuItem name="1-1">Option 1</MenuItem>
                <MenuItem name="1-2">Option 2</MenuItem>
              </MenuGroup>
              <MenuGroup title="留存">
                <MenuItem name="1-3">Option 1</MenuItem>
                <MenuItem name="1-4">Option 2</MenuItem>
              </MenuGroup>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                Item 2
              </template>
              <MenuItem name="2-1">Option 1</MenuItem>
              <MenuItem name="2-2">Option 2</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                Item 3
              </template>
              <MenuItem name="3-1">Option 1</MenuItem>
              <MenuItem name="3-2">Option 2</MenuItem>
            </Submenu>
          </Menu> -->
         
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '24px 0'}">
            <BreadcrumbItem 
              v-for="(item, index) in breadcrumbs" 
              :key="index" 
              :to="item">
              {{ item.meta.title || item.name }}
            </BreadcrumbItem>
          </Breadcrumb>
          <Content :style="{padding: '24px', minHeight: '280px', background: '#fff'}">
            <router-view/>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>

export default {
  data () {
    return {
      headMenus: [
        {
          path: '/',
          name: '主页',
          meta: {
            name: '主页'
          },
          component: void 0
        },
        {
          path: '/',
          name: '用户管理',
          meta: {
            name: '用户管理'
          },
          component: void 0
        },
        {
          path: '/',
          name: '统计分析',
          meta: {
            name: '统计分析'
          },
          component: void 0
        },
        {
          path: '/',
          name: '综合设置',
          meta: {
            name: '综合设置'
          },
          component: void 0
        }
      ]
      // navMenus: [{
      //   title: '内容管理',
      //   children: [{
      //     title: '文章管理',
      //     name: 'wzgl'
      //   }, {
      //     title: '评论管理',
      //     name: 'plgl'
      //   }, {
      //     title: '举报管理',
      //     name: 'jbgl'
      //   }]
      // }, {
      //   title: '用户管理',
      //   children: [{
      //     title: '新增用户',
      //     name: 'xzyh'
      //   }, {
      //     title: '活跃用户',
      //     name: 'hyyh'
      //   }, {
      //     title: '黑名单',
      //     name: 'hmd'
      //   }]
      // }, {
      //   title: '统计分析',
      //   children: [{
      //     title: '新增和启用',
      //     name: 'xzhqy'
      //   }, {
      //     title: '活跃分析',
      //     name: 'hyfx'
      //   }, {
      //     title: '时段分析',
      //     name: 'sdfx'
      //   }, {
      //     title: '用户留存',
      //     name: 'yhlc'
      //   }, {
      //     title: '流失用户',
      //     name: 'lsyh'
      //   }]
      // }]
    };
  },
  computed: {
    navMenus () {
      return this.$store.state.menuData;
    },
    breadcrumbs () {
      return (this.$route && this.$route.matched) || [];
    }
  },
  methods: {
    onSelect (name) {
      this.$router.push({ name });
    }
  },
};
</script>