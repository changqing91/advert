<template>
  <div>
    <el-container>
      <adv-header></adv-header>
      <el-main class="container">
        <div class="description">
          <h2>关于我们</h2>
          <p>我们是一个临时搭建的小组，但是我们希望将这样的模式延续下去，于是建立了 rune.one。通过rune.one作为核心组织，建立区块链应用的生态，
            使应用与应用之间可以相互连接、共享流量。同时也希望建立一个相信区块链未来的分布式团队，虽然互相不那么熟知，但因为共同的目标走到一起。
            单打独斗不如抱团取暖。
            区块链的时代已经迈开了第一步，未来已来。
            与其临渊羡鱼，不如投身入浪潮之中。</p>
          <p>我们相信：区块链的未来除了底层链网作为信任基建，
            更多的价值会体现在是否有足够多的“落地”应用，
            不再只是一个程序员自嗨的大玩具，底层链网决定了区块链的宽度，应用的成熟度决定了区块链行业的长度。我们希望帮助我们认可的底层链建设生态，在实现技术情怀的路上，同时将技术变现。</p>
          <p>
            希望越来越多的人能加入我们，让我们共同平分区块链所带来的红利！</p>
            <p>联系邮箱：pandarenwilson@gmail.com</p>
        </div>
        <div class="grid">
          <figure>
            <img alt="Wilson" src="../../static/images/ic_user.png">
            <div>Wilson</div>
            <figcaption>Engineering</figcaption>
          </figure>
          <figure>
            <img alt="Marco" src="../../static/images/ic_user.png">
            <div>Marco</div>
            <figcaption>UI/UX</figcaption>
          </figure>
          <figure>
            <img alt="Green" src="../../static/images/ic_user.png">
            <div>Green</div>
            <figcaption>Engineering</figcaption>
          </figure>
        </div>
      </el-main>
      <adv-footer></adv-footer>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "Index",
  data() {
    return {
      dialogVisible: false,
      advImg: null,
      currentDate: new Date()
    };
  },

  components: {
    "adv-header": Header,
    "adv-footer": Footer
  },

  methods: {},

  mounted() {
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
.description {
  margin-bottom: 60px;
  h2 {
    font-size: 40px;
    color: #393742;
    text-align: center;
    line-height: 60px;
    margin-top: 20px;
    background-image: -webkit-linear-gradient(
      -45deg,
      #eb0028 28%,
      #eb0028 34%,
      #000 70%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition-delay: 0.2s;
    font-weight: 300;
  }
  p {
    font-size: 20px;
    font-weight: 300;
    color: #101920;
    margin-top: 20px;
    text-indent: 2em;
    text-align: left;
    word-break: break-all;
    vertical-align: baseline;
    font-family: MYingHeiW4;
    -webkit-font-smoothing: antialiased;
  }
}
.grid {
  display: flex;
  justify-content: space-evenly;
  flex-flow: wrap;
  figure {
    color: #5f5f5f;
    font-weight: 200;
    line-height: 1;
    margin: 15px 30px;
    text-align: center;
    user-select: none;
    width: 160px;
    cursor: pointer;
    transition: opacity 400ms ease;
    img {
      width: inherit;
      border-radius: 80px;
      border: 1px solid #ddd;
    }
    div {
      font-size: 20px;
      margin-top: 12px;
    }
    figcaption {
      font-size: 14px;
      margin-top: 4px;
      opacity: 0.55;
    }
    .drawer {
      align-items: flex-start;
      display: flex;
      flex-basis: 100%;
      flex-flow: row nowrap;
      height: 0;
      justify-content: center;
      opacity: 0;
      overflow: hidden;
      transition: height 400ms ease, opacity 400ms ease;
    }
  }
}
</style>
