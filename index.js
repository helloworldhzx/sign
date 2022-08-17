const Koa = require('koa');
const schedule = require("node-schedule") 
const app = new Koa();
const hzx = require("./sign/index")

// response
app.use(ctx => {
  ctx.body = 'Hello hzx';
});

const job = schedule.scheduleJob('*/10 * * * * *', function(fireDate){
  hzx.juejin();
    console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
});

// const job = schedule.scheduleJob('0 0 0 */1 * * *', function(fireDate){
//   hzx.juejin();
//   console.log('This job was supposed to run at ' + fireDate + ', but actually ran at ' + new Date());
// });

app.listen(3000);