let { API, setstorage, getstorage, clearstorage} = getApp();

const Header = {
  WX_CODE:'WX-CODE' 
}

let requestHeader = {}; //请求头
let currentCode = getstorage('code') || '';

// requestHeader请求头
const wrapHeader = (cb)=>{
  if (currentCode){
    requestHeader[Header['WX_CODE']] = currentCode;
    cb(requestHeader);
  }else{
    wx.login({
      success(res) {
        if (res.code) {
          requestHeader[Header['WX_CODE']] = res.code;
          setstorage('code', res.code);
          cb(requestHeader);
        } else {
          wrapHeader(cb);
        }
      }
    })
  }
}


//request 
const request = (opt = {}) =>{
    wrapHeader((requestHeader)=>{
      wx.request({
        url: `${API}${opt.url}`,
        data: opt.data ? opt.data : {},
        header: Object.assign({ 'content-type': 'application/json' }, requestHeader, opt.header || {}),
        method: opt.method ? opt.method : "GET",
        dataType: 'json',
        success: function (res) {
          if (res.errCode == '4000') {
            clearstorage('code');
            setTimeout(() => {
              request(opt);
            }, 1000)
          } else {
            opt.success(res)
          }
        },
        fail: function (res) { opt.fail(res) }
      })
    })
}


module.exports = request;