// 引入 asr 系统模块      
import asr from '@service.asr'

export default {
  private: {
    action: '',
    content: ''
  },
  init() {
    // 定义 that 代理 this，保存当前作用域  
    let that = this
    this.content = ''
    // asr 模块初始化
    asr.init({
      // 初始化成功后的回调函数
      success: function() {
        that.action = 'init success'
      },
      // 初始化失败后的回调函数
      fail: function(data, code) {
        that.action = `init fail, code=${code}, data=${data}`
      }
    })
    // 注册“部分识别”的响应函数，会在一次语音识别期间（asr.start 到 asr.stop 期间）被多次调用
    asr.onpartialresult = ({ result }) => {
      this.content = `onpartialresult: ${result}`
    }
    // 注册“语音识别停止”的响应函数，在一次语音识别完成后（asr.stop 时）被调用
    asr.oncompleteresult = ({ result }) => {
      this.content = `oncompleteresult: ${result.match(/\[(.*)\]/)[1]}`
    }
    // 注册语音识别期间出现错误的响应函数，在出错后被调用
    asr.onerror = (error) => {
      this.content = `onerror: ${error}`
    }
  },
  start() {
    let that = this
    // 开始一次语音识别
    that.content = ''
    asr.start({
      success: function() {
        that.action = 'start success'
      },
      fail: function(data, code) {
        that.action = `start fail, code=${code}, data=${data}`
      }
    })
  },
  stop() {
    let that = this
    // 停止当前语音识别
    asr.stop({
      success: function() {
        that.action = 'stop success'
      },
      fail: function(data, code) {
        that.action = `stop fail, code=${code}, data=${data}`
      }
    })
    return this.content.substring("oncompleteresult: ".length-1)
  },
  close() {
    let that = this
    // 关闭语音识别功能，重新开始的话需要重新调用 asr.init
    asr.close({
      success: function() {
        that.action = 'close success'
      },
      fail: function(data, code) {
        that.action = `close fail, code=${code}, data=${data}`
      }
    })
  }
}

