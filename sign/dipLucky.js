// 沾喜气相关
const Axios = require('axios')
const {juejin,userAgent} = require('./config')
const instance = Axios.create({
    baseURL: juejin.baseUrl
})
const headers = (user)=>({
    'user-agent':userAgent,
    cookie: user.cookie
})

// 沾喜气
const dipLucky = async(user,lottery) => {
  const {data} = await instance({
    url: juejin.dipLucky,
    method: 'post',
    headers: headers(user),
    data: {
      lottery_history_id: lottery.history_id
    }
  })
  if(data.err_no){
    return [0,'沾喜气失败;']
  }
  if(data.data.has_dip){
    return [1,`今日已沾过喜气，获得幸运值:${data.data.dip_value},总幸运值：${data.data.total_value};`]
  }
  return [1,`沾喜气成功，获得幸运值：${data.data.dip_value}，总幸运值：${data.data.total_value};`]
}

// 获取可以沾喜气的人员
const getLuckyUserList =  async (user) => {
  const {data} = await instance({
    url: juejin.getLuckyUserList,
    method: 'post',
    headers: headers(user)
  }).catch(err=>{
    console.log(err)
  })

  if(data.err_no){
    return [0,'获取人员失败;']
  }
    return [1,'获取人员成功;',data.data.lotteries[0]]
}

module.exports=function(sender,user){
  return new Promise(async(resolve,reject)=>{
    const [luckListState,luckListMsg,lottery] = await getLuckyUserList(user)
    if(luckListState === 0){
      sender.addMsg(luckListMsg)
      return resolve()
    }
    const [,msg] = await dipLucky(user,lottery)
    sender.addMsg(msg)
    return resolve()
  })
}