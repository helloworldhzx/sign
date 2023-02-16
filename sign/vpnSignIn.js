const Axios = require('axios')
const instance = Axios.create()


const checkIn = async (user) => {
  let {data} = await instance({
      url: 'https://go.runba.cyou/user/checkin',
      method: 'post',
      headers: {
        Cookie: "_ga=GA1.1.729482508.1673504893; _gcl_au=1.1.1535021767.1673505194; __stripe_mid=7477ba07-7c43-4d7d-bcbd-edba526c420b078ac1; uid=107286; email=810611261%40qq.com; key=3b427a027041c6f2099775bcb23cbed32e1165da3c6a1; ip=be2894af19a5a6c4da6c49d94a180831; expire_in=1708051662; crisp-client%2Fsession%2Fa47ae3dd-53d8-4b15-afae-fb4577f7bcd0=session_393c6c5d-62dc-4fd3-a281-81cd032b5665; crisp-client%2Fsocket%2Fa47ae3dd-53d8-4b15-afae-fb4577f7bcd0=0; _ga_NC10VPE6SR=GS1.1.1676515655.22.1.1676515898.0.0.0"
      }
  })
  console.log(data);
}

module.exports = function(){
  checkIn()
}
