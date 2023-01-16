const dipLucky = require('./dipLucky')
const draw = require('./draw')
const signIn = require('./signIn')
const playGame = require('./playGame')
const SendInfo = require('./sendInfo')
const { users } = require('./config')
const { getCurPoint } = require('./help')
exports.juejin = () => {
  async function run() {
    for (let index = 0; index < users.length; index++) {
      const user = users[index]
      const sender = new SendInfo(user)
     try{
//         await signIn(sender, user)
//         console.log("签到--------");
       fetch("https://go.runba.cyou/user/checkin", {
  method: "post",
  headers: {
    Cookie: "_ga=GA1.1.729482508.1673504893; uid=107286; email=810611261%40qq.com; key=ccc64868b3248dbeb6cc3a0c6e1065570257b32f2baef; ip=c8504a800c68a3755665a470107110b8; expire_in=1676097191; _gcl_au=1.1.1535021767.1673505194; __stripe_mid=7477ba07-7c43-4d7d-bcbd-edba526c420b078ac1; _ga_NC10VPE6SR=GS1.1.1673831358.6.1.1673832123.0.0.0; crisp-client%2Fsession%2Fa47ae3dd-53d8-4b15-afae-fb4577f7bcd0=session_4b7f1798-4086-4c5c-994e-51372fa7ab05; crisp-client%2Fsocket%2Fa47ae3dd-53d8-4b15-afae-fb4577f7bcd0=0"
  }
})
        await draw(sender, user)
        console.log("抽奖--------");
        await dipLucky(sender, user)
        console.log("沾喜气--------");
        await playGame(sender, user)
        const msg = await getCurPoint(user)
        sender.addMsg(msg)
        sender.sendAllMsg(user)
     }catch(error){
         console.log(error)
         sender.addMsg("签到失败")
         sender.sendAllMsg(user)
     }
    }
  }
  run()
}
