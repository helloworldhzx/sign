const Axios = require('axios')
const instance = Axios.create()


const checkIn = async (user) => {
  let {data} = await instance({
      url: 'https://go.runba.cyou/user/checkin',
      method: 'post',
      headers: {
        Cookie: "_ga=GA1.1.729482508.1673504893; uid=107286; email=810611261%40qq.com; key=ccc64868b3248dbeb6cc3a0c6e1065570257b32f2baef; ip=c8504a800c68a3755665a470107110b8; expire_in=1676097191; _gcl_au=1.1.1535021767.1673505194; __stripe_mid=7477ba07-7c43-4d7d-bcbd-edba526c420b078ac1; _ga_NC10VPE6SR=GS1.1.1673831358.6.1.1673832123.0.0.0; crisp-client%2Fsession%2Fa47ae3dd-53d8-4b15-afae-fb4577f7bcd0=session_4b7f1798-4086-4c5c-994e-51372fa7ab05; crisp-client%2Fsocket%2Fa47ae3dd-53d8-4b15-afae-fb4577f7bcd0=0"
      }
  })
  console.log(data);
}

module.exports = function(){
  checkIn()
}