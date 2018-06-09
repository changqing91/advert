<template>
  <div>
    <el-container>
      <adv-header></adv-header>
      <el-main class="container">
        <div class="upload-box">
          <h1>购买广告位({{adv.name}})</h1>
          <div tabindex="0" class="el-upload el-upload--text">
            <div class="upload-prev" v-show="adv.base64" :style="{'background': `url(${adv.base64}) 50% 50% / cover`}"></div>
            <input type="file" name="file" class="el-upload-input" @change="onFileChange">
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </div>
          <el-input
            v-model="adv.title"
            placeholder="请输入广告标题"
            maxlength="20"
          ></el-input>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入广告文案"
            maxlength="50"
            v-model="adv.content">
          </el-input>
          <el-input placeholder="请输入网址" v-model="adv.address" maxlength="30">
            <template slot="prepend">http://</template>
          </el-input>
          <p>*当前价格：<span class="price">{{adv.price}}Nas</span>，您至少出高于此价格10%即 <span class="price">{{adv.nextPrice && Number(adv.nextPrice)}}Nas</span> 的才可以抢占哦</p>
          <el-button type="primary" @click="buy" :loading="loading">购买</el-button>
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
        adv: {},
        loading: false
      };
    },

    components: {
      "adv-header": Header,
      "adv-footer": Footer
    },

    methods: {
      onFileChange(e) {
        let self = this
        if (e.target.files[0]) {
          let file = e.target.files[0]
          let reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = function () {
            img.src = this.result
          }
          let img = new Image,
            width = 460,
            height = 460*9/16,
            quality = 0.8,
            canvas = document.createElement("canvas"),
            drawer = canvas.getContext("2d");
          img.onload = function () {
            canvas.width = width;
            canvas.height = height;
            drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
            let base64 = canvas.toDataURL("image/jpeg", quality); // 这里就拿到了压缩后的base64图片
            if (base64.length > 80000) {
              return self.$message({
                message: '图片太大了，请先压缩一下吧',
                type: 'warning'
              });
            }
            self.adv = {...self.adv, base64};
            e.target.value = null;
          }
        }
      },
      buy() {
        let {id, title, content, base64, address} = this.adv
        if (this.loading) return
        if (!base64) {
          return this.$message({
            message: '请上传广告图片',
            type: 'warning'
          });
        }
        if (!title) {
          return this.$message({
            message: '请填写广告标题',
            type: 'warning'
          });
        }
        if (!content) {
          return this.$message({
            message: '请填写广告内容',
            type: 'warning'
          });
        }
        this.loading = true
        addAdv(id, title, content, base64, address, this.adv.nextPrice)
          .then(res => {
            this.loading = false
            this.$message({
              message: '交易成功，正在返回首页...',
              type: 'success'
            });
            setTimeout(() => {
              this.$router.push({
                'path': '/'
              })
            }, 3000)
          })
          .catch(res => {
            console.log(res)
            this.loading = false
            this.$message({
              message: '交易失败',
              type: 'warning'
            });
          })
      }
    },

    mounted() {
      let adv = window.localStorage.getItem('adv')
      let price, nextPrice
      let pe = Math.pow(10, 15)
      let pd = Math.pow(10, 18)
      adv = JSON.parse(adv)
      if (adv.preValue) {
        price = adv.preValue/pd
        nextPrice = Math.ceil(price*1.2*pe)/pe
      } else {
        price = 0.001
        nextPrice = price*1.2
      }
      let id = +adv.id, name = adv.name
      this.adv = {id, name, price, nextPrice}
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
      text-align: left;
      margin-top: 20px;
      font-size: 14px;
      width: 100%;
      .price {
        color: #eb0028;
      }
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
