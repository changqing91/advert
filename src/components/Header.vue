<template>
  <div>
    <el-header class="header">
      <ul class="header-navigation">
        <li>
          <router-link class="logo" to="/">
            <h1><span>Rune.</span>one</h1>
          </router-link>
        </li>
        <li class="menu hide-in-mob"><router-link to="/" :class="{'active': activeMenu === 'index'}">首页</router-link></li>
        <li class="menu hide-in-mob"><router-link to="/intro" :class="{'active': activeMenu === 'intro'}">玩法介绍</router-link></li>
        <li class="menu hide-in-mob"><router-link to="/team" :class="{'active': activeMenu === 'team'}">团队</router-link></li>
      </ul>
      <div :class="['menu-icon', menuActive ? 'active' : '']" @click="showMenus">
        <div class="menu-top"></div>
        <div class="menu-bottom"></div>
      </div>
      <div :class="['nav-drop-list', animateClas, menuActive ? '' : 'hidden']">
        <ul>
          <li class="menu"><router-link to="/" :class="{'active': activeMenu === 'index'}">首页</router-link></li>
          <li class="menu"><router-link to="/intro" :class="{'active': activeMenu === 'intro'}">玩法介绍</router-link></li>
          <li class="menu"><router-link to="/team" :class="{'active': activeMenu === 'team'}">团队</router-link></li>
        </ul>
      </div>
      <a class="sign-btn" @click="gotoSign" v-show="!hideSign">签到</a>
    </el-header>
    <div style="height: 60px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuActive: false,
      dialogVisible: false,
      loading: false,
      motto: "",
      success: false,
      animateClas: "",
      hideSign: false,
      activeMenu: ''
    };
  },
  methods: {
    showMenus() {
      if (this.menuActive) {
        this.animateClas = "toggle-leave-active";
        setTimeout(() => {
          this.animateClas = "";
          this.menuActive = false;
        }, 200);
      } else {
        this.animateClas = "toggle-enter-active";
        this.menuActive = true;
        setTimeout(() => {
          this.animateClas = "";
        }, 200);
      }
    },
    gotoSign() {
      this.$router.push({path: '/sign'});
    },
  },
  mounted() {
    this.hideSign = this.$route.name === 'Sign'
    this.activeMenu = this.$route.name.toLowerCase()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.header {
  position: fixed;
  width: 100%;
  z-index: 999;
  height: 60px;
  display: flex;
  justify-content: space-between;
  -webkit-box-pack: justify;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.logo {
  float: left;
  text-decoration: none;
}

h1 {
  font-weight: 300;
  font-size: 20px;
  background-image: -webkit-linear-gradient(
    -45deg,
    #eb0028 28%,
    #eb0028 34%,
    #000 70%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: MYingHeiW4;
}

.header-navbar-logo {
  height: 37px;
  width: 146px;
  margin: 11px 60px 0 0;
  float: left;
  cursor: pointer;
}

.menu a {
  opacity: .6;
  &.active {
    opacity: 1;
  }
}

.header-navigation {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  line-height: 60px;
  list-style: none;
  li {
    text-align: center;
    margin-right: 25px;
    font-size: 1.6rem;
    &:first-child {
      margin-right: 60px;
    }
    a {
      color: #000;
      /*opacity: .5;*/
      line-height: 1;
      transition: all 0.3s ease;
      cursor: pointer;
      background-color: transparent;
    }
    h1 {
      color: #101920;
      font-weight: 300;
      font-size: 18px;
    }
  }
}

.menu-icon {
  display: none;
  position: absolute;
  width: 16px;
  height: 16px;
  top: 25px;
  left: 50%;
  margin-left: -8px;
  cursor: pointer;
}

.menu-icon .menu-top {
  position: relative;
  height: 50%;
  width: 100%;
}

.menu-icon .menu-top:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 6px;
  height: 6px;
  background-color: #999;
  border-radius: 1px;
}

.menu-icon .menu-top:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  width: 6px;
  height: 6px;
  background-color: #999;
  border-radius: 1px;
}

.menu-icon .menu-bottom {
  position: relative;
  width: 100%;
  height: 50%;
}

.menu-icon .menu-bottom:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 6px;
  height: 6px;
  background-color: #999;
  border-radius: 1px;
}

.menu-icon .menu-bottom:after {
  content: "";
  position: absolute;
  bottom: 0;
  right: 0;
  width: 6px;
  height: 6px;
  background-color: #999;
  border-radius: 1px;
  text-align: right;
}

.menu-icon.active .menu-top:before {
  width: 100%;
}

.menu-icon.active .menu-bottom:before {
  width: 100%;
}

.nav-drop-list {
  top: 60px;
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden;
  &.hidden {
    display: none;
  }
}
.nav-drop-list ul {
  background-color: #fff;
}

.nav-drop-list ul li {
  cursor: pointer;
}

.nav-drop-list ul li a {
  display: inline-block;
  width: 100%;
  height: 100%;
  color: #000;
  padding: 14px 30px;
  font-size: 16px;
}

.toggle-enter-active {
  -webkit-animation: toggle-down 0.3s ease-in-out forwards;
  animation: toggle-down 0.3s ease-in-out forwards;
}

.toggle-leave-active {
  -webkit-animation: toggle-down 0.2s ease-out reverse forwards;
  animation: toggle-down 0.2s ease-out reverse forwards;
}

@keyframes toggle-down {
  0% {
    max-height: 0;
  }

  to {
    max-height: 200px;
  }
}
.m-r {
  margin-right: 20px;
}

.text-sm {
  font-size: 14px;
  line-height: 1.7;
}

.text-stronger {
  font-weight: 700;
}

.sign-btn {
  /*float: right;*/
  height: 44px;
  line-height: 44px;
  font-size: 16px;
  min-width: 100px;
  border-radius: 4px;
  cursor: pointer;
  background-color: #eb0028;
  color: #fff;
  display: inline-block;
  margin-bottom: 0;
  font-weight: 300;
  text-align: center;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  white-space: nowrap;
  border: 1px solid transparent;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  text-decoration: none;
  position: relative;
  z-index: 1;
  padding: 0 1em;
}

.el-dialog {
  div {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    .el-button--primary {
      color: #fff;
      background-color: #d44c37;
      border-color: #d44c37;
      width: 300px;
    }

    .tip {
      color: #d44c37;
    }
    .nas {
      font-size: 18px;
      color: #d44c37;
    }
    .motto {
      font-family: Microsoft YaHei;
      font-size: 16px;
    }

    img {
      display: block;
      width: 130px;
    }
  }
}

@media all and (max-width: 736px) {
  .hide-in-mob {
    display: none;
  }
  .menu-icon {
    display: block;
  }
}
</style>
