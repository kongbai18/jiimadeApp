const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: 1,
    cabinetShow:{},
    doorShow:{},
    froShow:{}
  },
  getCel(){
    wx.showLoading({
      title: '加载中...',
    })
    wx.getStorage({
      key: 'userKey',
      success: function(res) {
        wx.request({
          url: app.globalData.api + '/Home/index/getExcel',
          data: {
            userId: res.data.id,
            thr_session: res.data.thr_session,
          },
          success: function (res1) {
             wx.downloadFile({
               url: 'https://csm.jiihome.com/Public/Excel/'+res1.data, 
               success: function (res2) {
                 wx.saveFile({
                   tempFilePath: res2.tempFilePath,
                   success: function (e) {
                     wx.openDocument({
                       filePath: e.savedFilePath,
                       success: function (e1) {
                         wx.request({
                           url: app.globalData.api + '/Home/index/delExcel',
                           data:{fileName:res1.data},
                           success:function(e2){
                             wx.hideLoading();
                           }
                         })
                       }
                     })
                   }
                 })
               }
             })
          }
        })
      },
    })
  },
  changesta(e) {
    var sta = e.currentTarget.dataset.sta
    var self = this
    self.setData({
      status: sta,
    })
  },
  showCabDet(e){
    var self = this
    var sort = e.currentTarget.dataset.sort
    var cabinetShow = self.data.cabinetShow
    cabinetShow[sort] = !cabinetShow[sort]
    self.setData({
       cabinetShow:cabinetShow
    })
  },
  showDoorDet(e) {
    var self = this
    var sort = e.currentTarget.dataset.sort
    var doorShow = self.data.doorShow
    doorShow[sort] = !doorShow[sort]
    self.setData({
      doorShow: doorShow
    })
  },
  showfRODet(e) {
    var self = this
    var sort = e.currentTarget.dataset.sort
    var froShow = self.data.froShow
    froShow[sort] = !froShow[sort]
    self.setData({
      froShow: froShow
    })
  },
  removeModule(e){
    var self = this
    var key = e.currentTarget.dataset.key
    var cat = e.currentTarget.dataset.cat
    wx.getStorage({
      key: 'userKey',
      success: function (res) {
        wx.request({
          url: app.globalData.api + '/Home/index/delModule',
          data: {
            userId: res.data.id,
            thr_session: res.data.thr_session,
            sort:key+1,
            cat:cat
          },
          success: function (res1) {
            if(res1.data){
               self.onLoad()
               self.setData({
                 status:cat
               })
            }else{
              wx.showToast({
                title: '删除失败！',
                icon: 'none',
                duration: 1000
              })
            }
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this
    if (options){
      self.setData({
        status:options.sta
      })
    }
    wx.getStorage({
      key: 'userKey',
      success: function (res) {
        wx.request({
          url: app.globalData.api + '/Home/index/getModule',
          data: {
            userId: res.data.id,
            thr_session: res.data.thr_session
          },
          success: function (res1) {
            console.log(res1.data)
            self.setData({
              cabinet:res1.data.cabinet,
              door:res1.data.door,
              front:res1.data.front
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})