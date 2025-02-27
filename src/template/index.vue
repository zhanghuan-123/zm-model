<template>
  <div class="template-wrap">
    <el-header class="fy_el-header" height="42px">
      <img src="../assets/logo.png" alt="" />
      <span class="logoFont">机器学习平台</span>
      <router-link class="navItem" active-class="active" to="/machine/desgin-list">ai平台</router-link>
      <router-link class="navItem" active-class="active" to="/center/operation-list">运维中心</router-link>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          更多<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-s-tools" command="updatePassWord">修改密码</el-dropdown-item>
          <el-dropdown-item icon="el-icon-warning" command="loginOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <keep-alive>
        <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  data() {
    return {
      test: 1
    };
  },
  methods: {
    handleCommand(command) {
      console.log('退出登录')
      if(command === 'loginOut') {
        this.$router.push({
        name: "modelLogin",
      });
      }
    }
  }
};
</script>

<style lang="scss">
.template-wrap{
  width: 100%
}
.el-dropdown-link {
    cursor: pointer;
  }
</style>
