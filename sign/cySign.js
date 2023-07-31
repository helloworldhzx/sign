const Axios = require('axios')
const instance = Axios.create()
const Authorization = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTMwOTkwNDAsInVzZXJJZCI6IjQxNjI3NzYiLCJpYXQiOjE2OTA1MDcwNDB9.TZ0idD-KVlTUZxAOED2hOm3S6bP3uM0VlAdLGo9Aqtg'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2OTMwOTkwNDAsInVzZXJJZCI6IjQxNjI3NzYiLCJpYXQiOjE2OTA1MDcwNDB9.TZ0idD-KVlTUZxAOED2hOm3S6bP3uM0VlAdLGo9Aqtg'


const checkIn = async (user) => {
  let {data} = await instance({
      url: 'https://api.xunyee.cn/signin/vcuser_person_check/',
      method: 'post',
      params: {
        person: 17780,
        check: 1
      },
      headers: {
        Authorization, token
      }
  })
 let {data: data2} = await  instance({
    url: 'https://api.xunyee.cn/xunyee/vcuser_person/person_info/?person=177801',
    method: 'get',
    headers: {
      Authorization, token
    }
  }).then(res => {
    console.log(res.data);
  })
  console.log(data);
}

module.exports = checkIn
