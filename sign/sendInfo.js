const axios = require('axios')
const nodeMailer = require('nodemailer');
const { email } = require('./config')
const connection = require("../database")
module.exports = class SendInfo {
  messages = '掘金'
  constructor(who) {
    this.messages += `[${who.name}]:`
  }
  addMsg(...msgs) {
    this.messages += msgs.join('')
  }
  sendAllMsg(user) {
    console.log(this.messages)
    this.sendMsgByEmail(this.messages)
    this.saveDatabase(this.messages, user)
  }
  saveDatabase(msg, user){
    const statement = "INSERT INTO log(`message`, `user`) VALUES (?, ?)"
    connection.execute(statement, [msg, user.name])
  }
  sendMsgByEmail(msg) {
    let cfg = email.qq;
    if (!cfg || !cfg.user || !cfg.pass) return;
    const transporter = nodeMailer.createTransport({ service: 'qq', auth: { user: cfg.user, pass: cfg.pass } });
    transporter.sendMail({
      from: cfg.from,
      to: cfg.to,
      subject: "掘金签到",
      html: JSON.stringify(msg)
    }, (err) => {
      if (err) return console.log(`发送邮件失败：${err}`, true);
      console.log('发送邮件成功')
    })
    // axios({
    //   url: `${ding.baseUrl}?access_token=${ding.token}`,
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   data: {
    //     "text": {
    //       "content": msg
    //     },
    //     "msgtype": "text"
    //   }
    // })
  }
  sendMsgByDing(msg, user) {
    axios({
      url: `${ding.baseUrl}?access_token=${ding.token}`,
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        "text": {
          "content": msg
        },
        "msgtype": "text"
      }
    })
  }
}