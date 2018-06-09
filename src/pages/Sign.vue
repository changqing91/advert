<template>
  <div>
    <el-container>
      <adv-header></adv-header>
      <el-main class="container">
        <div class="sign_detail_hd">
          <a :class="['sign_btn', signCls]" @click="onSign"></a>
          <p class="sign_hd_tips" v-if="this.count">已签到 <span>{{this.count}}</span> 天，共获得 <span>{{this.count*0.001}}</span> nas</p>
          <p class="sign_hd_tips" v-if="this.count === 0">您尚未参与签到，加油哦！</p>
          <p class="sign_hd_tips">每天签到一次，每次领取 <span class="nas">0.001nas</span></p>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sign, getCount, getSignedStatus } from "../api";
import { mottos } from "../config";

export default {
  name: "Sign",
  data() {
    return {
      signResult: "开始签到",
      signCls: "sign_no",
      count: null,
    };
  },

  components: {
    "adv-header": Header,
    "adv-footer": Footer
  },

  methods: {
    onSign() {
      if (this.signCls !== 'sign_no') return
      this.signCls = 'sign_ing'
      sign()
        .then(data => {
          this.signCls = 'sign_succ';
          this.count = (~~this.count) + 1
        })
        .catch(data => {
          this.signCls = 'sign_fail';
        });
    },
    fetchCount() {
      getCount()
        .then(res => {
          this.count = (~~res.result)
        })
        .catch(res => {
          this.count = 0
        })
    },
    fetchSignedStatus() {
      getSignedStatus()
        .then(res => {
          if (res.result) {
            this.signCls = 'sign_succ';
          }
        })
        .catch(res => {
        })
    }
  },

  mounted() {
    // this.motto = mottos[parseInt(Math.random() * 99)];
    this.fetchSignedStatus()
    this.fetchCount()
    window.scrollTo(0, 0)
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
}
.sign_detail_hd {
    position: relative;
    padding-top: 30px;
    margin-bottom: 30px;
}
.sign_hd_tips {
  margin: 10px auto;
  font-size: 14px;
  span {
    font-size: 14px;
    color: #eb0028;
  }
  .nas {
    color: #ff7f3e;
  }
}
.sign_btn {
    display: block;
    background-repeat: no-repeat;
    width: 116px;
    height: 116px;
    background-image: url('../../static/images/sign.png');
    margin: 0 auto 20px;
    font-size: 0;
    line-height: 0;
    cursor: pointer;

    &.sign_succ {
      background-position: 0 0;
    }

    &.sign_suc {
        background-position: -126px 0px
    }

    &.sign_ing {
        background-position: 0px -126px
    }

    &.sign_fail {
        background-position: -125px -126px
    }

    &.sign_no {
        background-position: -251px 0px
    }

    &.sign_no:hover {
        background-position: -251px -125px
    }
}
</style>
