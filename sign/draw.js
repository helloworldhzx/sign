// 抽奖相关功能
const Axios = require('axios')
const {juejin,userAgent} = require('./config')
const instance = Axios.create({
    baseURL: juejin.baseUrl
})
const headers = (user)=>({
    'user-agent':userAgent,
    cookie: user.cookie
})


// 获取今天免费抽奖的次数
const getTodayDrawStatus = async (user) => {
  const {data} = await instance({
    url: juejin.getLotteryConfig,
    method: 'get',
    headers:headers(user)
  })

  if (data.err_no) {
    return [0,'查询抽奖次数失败;']
  } 
  
  if(data.data.free_count === 0){
    return [0,'今日已无免费抽奖次数;']
  }
  
  return [1, data.data.free_count]
}

// 抽奖
const draw = async (user) => {
  const {data} = await instance({
    url: juejin.drawLottery,
    method: 'post',
    headers: headers(user)
  })

  if (data.err_no) {
    return [0,'免费抽奖失败;']
  }

  return [1,`恭喜抽到：${data.data.lottery_name};`]
}

module.exports=function(sender,user){
  return new Promise(async(resolve,reject)=>{
    const [todayDrawStatus,todayDrawMsg] = await getTodayDrawStatus(user)
    if(todayDrawStatus===0){
      sender.addMsg(todayDrawMsg)
      return resolve()
    }
    const [,drawMsg] = await draw(user)
    sender.addMsg(drawMsg)
    return resolve()
  })
}