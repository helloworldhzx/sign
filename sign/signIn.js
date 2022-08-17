// 签到相关功能
const Axios = require('axios')
const {juejin,userAgent} = require('./config')
const instance = Axios.create({
    baseURL: juejin.baseUrl
})
const headers = (user)=>({
    'user-agent':userAgent,
    cookie: user.cookie
})

// 签到
const checkIn = async (user) => {
    let {data} = await instance({
        url: juejin.checkIn,
        method: 'post',
        headers: headers(user)
    })
    if (data.err_no) {
        return [0,'今日掘金签到：失败;']
    }
    return [1,`掘金签到成功！获得矿石${data.data.incr_point}，当前矿石：${data.data.sum_point};`]
}

// 查询今日是否已经签到
const getTodayCheckStatus = async (user) => {
    let {data} = await instance({
        url: juejin.getTodayStatus,
        method: 'get',
        headers: headers(user)
    })
    if (data.err_no) {
        console.log('签到查询失败',JSON.stringify(data))
        return [2,'签到查询失败;']
    }
    if (data.data) {
        return [1,'今天已经签到;']
    }
    return [0,'今天未签到;']
}

// 连续签到次数
const getCounts = async (user)=>{
    const {data} = await instance({
        url: juejin.getCounts,
        method: 'get',
        headers: headers(user)
    })
    return `连续签到 ${data.data.cont_count};总共签到 ${data.data.sum_count};`
}

module.exports=function (sender,user){
    return new Promise(async(resolve,reject)=>{
        try {
            // 判断签到状态
            const [todayCheckState, todayCheckStateMsg] = await getTodayCheckStatus(user)
            if (todayCheckState > 0) { // 已经签到或者签到失败
                const counts = await getCounts(user)
                sender.addMsg(todayCheckStateMsg, counts)
                return resolve()
            }

            // 进行签到
            const [, checkStateMsg] = await checkIn(user)
            const counts = await getCounts(user)
            sender.addMsg(checkStateMsg, counts)
            return resolve()
        } catch (error) {
            return reject()
        }
    })
}