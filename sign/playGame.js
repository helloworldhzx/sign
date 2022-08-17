// 玩游戏
const {juejinGame,userAgent,PUBLIC_KEY} = require('./config')
const Axios = require('axios')
const jwt = require('jsonwebtoken')
const instance = Axios.create({
    baseURL: juejinGame.baseUrl
})

const NAGETIVE_DIRECTION = {
  "U": "D",
  "L": "R",
  "D": "U",
  "R": "L",
};
const COLUMN = 6;
const OBSTACLE = 6;

const ROLE_LIST = {
  YOYO: 1,
  CLICK: 2,
  HAWKING: 3,
}

/**
 * @desc 一维数组转二维数组
 * @param {Array} arr 原数据
 * @param {Number} num 每个维度的元素数量
 */
function ArrayOneToTwo(arr, num) {
  let arrList = [];
  arr.map((item, index) => {
      if (index % num == 0) {
          arrList.push([item]);
      } else {
          arrList[arrList.length - 1].push(item);
      }
  });
  return arrList;
}

/**
* @desc 计算行走轨迹
* @param {Array} maps 地图
*/
const getTarck = (maps) => {
  const mapsTrack = [
      [3, 1, "U"],
      [2, 2, "L"],
      [4, 2, "D"],
      [3, 3, "R"],
  ];
  const mapsTree = ArrayOneToTwo(maps, COLUMN);

  // 过滤掉有障碍物的位置
  const trackXY = mapsTrack.filter((item) => {
      const xy = mapsTree[item[0]][item[1]];
      return xy !== OBSTACLE;
  });

  // 移动后反方向移动回初始位置
  const trackList = trackXY.map((item) => {
      return [item[2], NAGETIVE_DIRECTION[item[2]]];
  }).flat();
  return trackList;
};


let uid = null
let username = null
let gameId = null

const headers = {
  'user-agent':userAgent,
  authorization: null
}

const useUrl = ()=>`?uid=${uid}&time=${new Date().getTime()}`

const getSign = (t)=>jwt.sign(
  {
      gameId: gameId,
      time: t,
  },
  PUBLIC_KEY,
  {
      algorithm: "ES256",
      expiresIn: 2592e3,
      header: {
          alg: "ES256",
          typ: "JWT",
      },
  }
)

// 获取 token
const getToken = async(user)=>{
  const {data} = await Axios({
    url: juejinGame.getToken,
    method: 'get',
    headers: {
      'user-agent':userAgent,
      cookie: user.cookie
    }
  })
  return data
}

// 获取用户信息
const getInfo = async()=>{
  const {data} = await instance({
    url: juejinGame.getInfo+useUrl(),
    method: 'get',
    headers
  }).catch(error=>{
    console.log(error)
  })
  return data
}

// 登录游戏
const loginGame = async()=>{
  const {data} = await instance({
    url: juejinGame.loginGame+useUrl(),
    headers,
    method: 'post',
    data:{
      name:username
    }
  })
  return data
}

// 开始游戏
const startGame = async (roleId)=>{
  const {data} = await instance({
    url: juejinGame.startGame+useUrl(),
    headers,
    method: 'post',
    data:{
      roleId
    }
  })
  return data
}


// 移动
const move = async (command)=>{
  const NOW_TIME = new Date().getTime();
  const {data} = await instance({
    url: juejinGame.command + `?uid=${uid}&time=${NOW_TIME}`,
    method: 'post',
    headers: {
      ...headers,
      "x-tt-gameid":getSign(NOW_TIME),
    },
    data:{
      command
    }
  })
  return data
}

// 结束游戏
const overGame = async ()=>{
  const {data} = await instance({
    url: juejinGame.gameOver+useUrl(),
    headers,
    method: 'post',
    data: {
      isButton: 1
    }
  })
  return data
}

// 刷新地图
const freshMap = async ()=>{
  const {data} = await instance({
    url: juejinGame.freshMap+useUrl(),
    method: 'post',
    headers
  })
  return data
}

module.exports = (sender,user)=>{
  return new Promise(async(resolve,reject)=>{
    let times = 0
    let gitInfoTime = 0
    uid = user.uid
    let {data:token} = await getToken(user)
    headers.authorization = "Bearer "+token
    let gameStatus = null
    while(gameStatus===null&&gitInfoTime<10){
      gitInfoTime++
      console.log('开始获取用户信息')
      try {
        let info = await getInfo()
        username = info.data.userInfo.name
        gameStatus = info.data.gameStatus
      } catch (error) {
        console.log(error)
        console.log(`获取用户信息失败，重试${gitInfoTime}`)
      }
    }
    if(gameStatus === null){
      sender.addMsg('玩游戏失败')
      resolve()
      return
    }
    await loginGame()
    console.log('登录游戏成功')
    if(gameStatus !== 0){
      await overGame()
      console.log('退出一下游戏')
    }
    async function startPlayGame(){
      times++
      console.log('开始玩游戏')
      const {data:game} = await startGame(ROLE_LIST.CLICK)
      gameId = game.gameId
      const mapData = game.mapData
      const command = getTarck(mapData)
      await move(command)
      const {data} = await overGame()
      console.log(`获取到奖励${data.realDiamond}，今天获取到奖励${data.todayDiamond}，今天上限${data.todayLimitDiamond}，循环次数${times}`)
      if (data.realDiamond < 40) {
          // 奖励小于40刷新下地图
          await freshMap();
      }
      // 没达到今日上限继续自动游戏
      if (data.todayDiamond < data.todayLimitDiamond&&times<100) {
          setTimeout(() => {
              startPlayGame();
          }, 1000);
          return
      }
      console.log('完成游戏')
      sender.addMsg(`玩游戏活的奖励${data.todayLimitDiamond};`)
      resolve()
    }
    startPlayGame()
  })
}