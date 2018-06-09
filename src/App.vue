<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
* {
  box-sizing: border-box;
}
html {
  font-size: 10px;
  height: 100%;
  line-height: normal;
}
body {
  background: #FFF;
}
audio, body, button, canvas, dd, div, dl, dt, fieldset, figure, form, h1, h2, h3, h4, h5, h6, html, input, legend, li, ol, optgroup, p, progress, select, span, table, td, textarea, th, ul, video {
  margin: 0;
  padding: 0;
  font-weight: 300;
}
li {
  list-style: none;
}
.link, a {
  color: inherit;
  text-decoration: none;
  padding: 0;
  margin: 0;
}
#app {
  font-family: MYingHeiW4,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",SimSun,sans-serif;
}
.el-main {
  overflow: hidden!important;
}
.el-container {
  flex-direction: column!important;
}
.el-loading-mask {
  z-index: 2!important;
}
.upload-box .el-upload {
  border: 1px solid #cecece!important;
}
.el-input__inner, .el-textarea__inner, .el-input-group__prepend {
  border: 1px solid #cecece!important;
}
</style>
