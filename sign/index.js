const dipLucky = require('./dipLucky')
const draw = require('./draw')
const signIn = require('./signIn')
const vpnSignIn = require('./vpnSignIn')
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
        vpnSignIn()
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
