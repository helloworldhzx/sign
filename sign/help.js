const Axios = require('axios')
const {juejin,userAgent} = require('./config')
const headers = (user)=>({
    'user-agent':userAgent,
    cookie: user.cookie
})
// 总矿石数
module.exports.getCurPoint = async (user)=>{
  const {data} = await Axios({
      url: juejin.baseUrl+juejin.getCurPoint,
      method: 'get',
      headers: headers(user)
  })
  return `当前矿石数 ${data.data};`
}
