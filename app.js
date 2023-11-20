// app.js
App({
  onLaunch() {
    // local storage
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // login
    wx.login({
      success: res => {
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
