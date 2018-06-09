<template>
  <div>
    <el-container>
      <adv-header></adv-header>
      <el-main class="container">
        <div class="upload-box">
          <h1>广告位（{{adv.name}}）</h1>
          <div tabindex="0" class="el-upload el-upload--text" @click="gotoAd">
            <div class="upload-prev" v-show="adv.base64" :style="{'background': `url(${adv.base64}) 50% 50% / cover`}"></div>
          </div>
          <p>{{adv.desc}}</p>
          <p>{{adv.url}}</p>
          <el-button type="primary" @click="buy">我要抢占</el-button>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import Header from "@/components/Header";
  import Footer from "@/components/Footer";
  import {addAdv} from "../api";

  export default {
    name: "Sign",
    data() {
      return {
        adv: {}
      };
    },

    components: {
      "adv-header": Header,
      "adv-footer": Footer
    },

    methods: {
      buy() {
        this.$router.push({
          'path': '/buy',
        })
      },
      gotoAd() {
        window.open('http://'+this.adv.url)
      }
    },

    mounted() {
      let adv = localStorage.getItem('adv')
      if (adv) {
        this.adv = JSON.parse(adv)
      }
      let $f = document.querySelector('.el-upload')
      $f.style.height = $f.offsetWidth * 9 / 16 + 'px'
      window.scrollTo(0, 0)
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .upload-box {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    max-width: 600px;
    margin: 0 auto;
    h1 {
      margin-bottom: 20px;
    }
    p {
      margin-top: 20px;
    }
    .el-upload {
      position: relative;
      border: 1px solid #e0e0e0;
      border-radius: 4px;
      height: 100%;
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 4px;
    }
    .el-upload-input {
      display: block;
      overflow: visible;
      opacity: 0;
      position: absolute;
      height: 179px;
      width: 100%;
      cursor: pointer;
    }
    .upload-prev {
      height: 100%;
      width: 100%;
      background-size: 179px 179px;
      position: absolute;
      border-radius: 4px;
    }
    .el-input, .el-textarea {
      width: 100%;
      margin-top: 16px;
    }
    .avatar-uploader-icon {
      color: #dedede;
      font-size: 46px;
    }
    .el-input-group__prepend {
      color: #dedede;
    }
    .el-button--primary {
      color: #fff;
      // background-color: #d44c37;
      // border-color: #d44c37;
      width: 100%;
      margin-top: 20px;
    }
    .el-dialog__close {
      font-size: 24px;
    }
  }


</style>
