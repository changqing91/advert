<template>
  <div>
    <el-container>
      <adv-header></adv-header>
      <el-main>
        <div class="adverts" style="display: none;">
          <ul class="list">
            <li
              :key="idx"
              class="advert"
              v-for="(item, idx) in sciences"
              v-loading="loading"
              element-loading-text="加载链上广告..."
              element-loading-spinner="el-icon-loading"
              @click="gotoAd(item)"
              :style="{background: item.base64 ? `url(${item.base64}) 50% 50% / cover` : `url('../../static/images/${item.id}.jpg') 50% 50% / cover`}"
            >
              <div class="mask">
                <h2 class="title">{{item.name}}</h2>
                <a class="buy" v-if="item.title">{{item.title}}</a>
                <a class="buy" v-else>我要抢占</a>
              </div>
              <div class="img-bag"></div>
            </li>
          </ul>
        </div>
      </el-main>
      <adv-footer></adv-footer>
    </el-container>
  </div>
</template>

<script>
  import Header from '../components/Header'
  import Footer from '../components/Footer'
  import {sciences} from '../config'
  import {getAllAdv} from '../api'

  export default {
    name: "Index",
    data() {
      return {
        sciences,
        loading: false
      };
    },

    components: {
      'adv-header': Header,
      'adv-footer': Footer
    },

    methods: {
      gotoBuy(id, name) {
        localStorage.setItem('adv', JSON.stringify({id, name}))
        this.$router.push({
          'path': '/buy'
        })
      },
      gotoDetail(item) {
        console.log(item)
        localStorage.setItem('adv', JSON.stringify(item))
        this.$router.push({
          'path': '/detail'
        })
      },
      setGridHeight() {
        let clientWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        let container = document.querySelector('.adverts')
        let els = document.querySelectorAll('.advert')
        if (!container) return
        container.style.display = 'none'
        els.forEach((item, idx) => {
          let cardWidth, cardHeight
          if (clientWidth > 960) {
            if (idx >= 0 && idx < 4) {
              cardWidth = (clientWidth - 80 - 3 * 5) / 4
            } else if (idx >= 4 && idx < 9) {
              cardWidth = (clientWidth - 80 - 4 * 5) / 5
            } else if (idx >= 9 && idx < 15) {
              cardWidth = (clientWidth - 80 - 5 * 5) / 6
            } else if (idx >= 15 && idx < 22) {
              cardWidth = (clientWidth - 80 - 6 * 5) / 7
            } else if (idx >= 22 && idx < 30) {
              cardWidth = (clientWidth - 80 - 7 * 5) / 8
            }
          } else if (clientWidth > 414 && clientWidth <= 736) {
            cardWidth = (clientWidth - 80) / 2
          } else if (clientWidth > 736 && clientWidth <= 960) {
            cardWidth = (clientWidth - 80) / 3
          } else {
            cardWidth = clientWidth - 40
          }
          cardHeight = cardWidth * 9 / 16
          item.style.height = cardHeight + 'px'
          item.style.width = cardWidth + 'px'
        })
        container.style.display = 'block'
      },
      gotoAd(item) {
        if (item.url) {
          this.gotoDetail(item)
        } else {
          this.gotoBuy(item.id, item.name)
        }
      },
      loadData(offset, limit) {
        getAllAdv(offset, limit)
        .then(res => {
          this.loading = false
          let sciences = this.sciences
          res.result.forEach(item => {
            let science = sciences.filter(s => {
              return s.id === item.index
            })[0]
            if (science) {
              Object.assign(science, item)
            }
          })
          console.log('------>', sciences)
          this.sciences = [...sciences]
        })
        .catch(res => {
          this.loading = false
          console.log(res)
        })
      }
    },
    mounted() {
      this.setGridHeight()
      let timer
      window.onresize = () => {
        if (!timer) {
          timer = true
          setTimeout(() => {
            this.setGridHeight()
            timer = false
          }, 200)
        }
      }
      this.loading = true
      this.loadData(0, 30)
      window.scrollTo(0, 0)
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    50% {
      opacity: .5;
    }
    100% {
      opacity: 1;
    }
  }

  .adverts {
    margin: 0 auto;
    ul {
      width: 100%;
      list-style: none;
      display: flex;
      padding: 0;
      align-items: center;
      margin: 0 0 6px 0;
      flex-wrap: wrap;
      justify-content: center;
      flex-direction: row;
      li {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        position: relative;
        margin-right: 6px;
        text-align: center;
        border-radius: 4px;
        margin-top: 5px;
        animation: fade-in;
        animation-duration: 1s;
        transition: 200ms ease-in;
        cursor: pointer;
        div {
          border-radius: 4px;
        }
        .mask {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          position: relative;
          /*background: #0000006b;*/
          overflow: hidden;
          .title {
            font-size: 1em;
            display: inline-block;
            z-index: 2;
            position: absolute;
            padding: 0;
            margin: 0;
            bottom: 11px;
            right: -11px;
            height: 16px;
            line-height: 16px;
            transform: rotate(-30deg);
            background: #e22e12;
            color: #fff;
            width: 100px;
            font-weight: normal;
            text-align: center;
          }
          .buy {
            text-decoration: underline;
            color: #FFF;
            font-size: 1.6em;
            text-align: center;
            cursor: pointer;
            z-index: 2;
          }
        }
        .img-bag {
          background: rgba(0, 0, 0, 0.25);
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          text-align: center;
          h2 {
            padding: 12px 3px;
            color: #FFF;
            font-size: 2.2em;
            display: inline-block;
            text-shadow: #000 0 1px 0;
            position: relative;
          }
          p {
            font-size: 14px;
            color: #FFF;
            line-height: 22px;
            width: 230px;
            margin: 45px auto 0 auto;
            padding: 0;
            text-shadow: #000 0 1px 0;
            text-overflow: clip;
            white-space: normal;
          }
        }
      }
    }
  }

  @media all and (max-width: 736px) {
  }

  @media all and (min-width: 736px) and (max-width: 960px) {
  }
</style>
