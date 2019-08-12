//app.js
App({
  onLaunch: function () {
    var that = this;
    // 展示本地存储能力  小程序启动之后就触发,仅触发一次
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    statusBarHeight: wx.getSystemInfoSync()['statusBarHeight'];

    // 允许图片保存
   

    // 登录
    wx.login({
      success : function(){
        wx.getUserInfo({
          success : function(res){
            that.globalData.userInfo = res.userInfo;
            typeof cb == "function" && cb(that.globalData.userInfo)
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // console.log(res)
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  // onShow 类型是function 当小程序启动或者从后台进入前台显示,就会触动onShow   再次打开小程序时
  // onHide 类型是function 当小程序从前台进入后台时会触动onHide   关闭键或者是手机home键退出小程序操作
  // onError 类型是function 当小程序发生脚本错误,或者API调用失败时,会触发onError并附上错误信息

  globalData: {
    userInfo: null
  }
})