module.exports = {
    "email": {
        "qq": {
            "user": "657070781@qq.com",
            "from": "657070781@qq.com",
            "to": "657070781@qq.com",
            "pass": process.env.PASS || process.env.pass
        }
    },
    juejin: {
        baseUrl: 'https://api.juejin.cn',
        getTodayStatus: '/growth_api/v1/get_today_status', // 签到状态
        checkIn: '/growth_api/v1/check_in', // 签到
        getLotteryConfig: '/growth_api/v1/lottery_config/get', // 免费抽奖次数
        drawLottery: '/growth_api/v1/lottery/draw', // 抽奖
        getLuckyUserList: '/growth_api/v1/lottery_history/global_big', // 沾喜气人员
        dipLucky: '/growth_api/v1/lottery_lucky/dip_lucky', // 沾喜气
        getCounts: '/growth_api/v1/get_counts', // 签到天数
        getCurPoint: '/growth_api/v1/get_cur_point' // 当前矿石数

    },
    juejinGame: {
        baseUrl: 'https://juejin-game.bytedance.com/game/sea-gold',
        getToken: 'https://juejin.cn/get/token',
        startGame: '/game/start',
        loginGame: '/user/login',
        getInfo: '/home/info',
        command: '/game/command',
        gameOver: '/game/over',
        freshMap: '/game/fresh_map'
    },
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36 Edg/92.0.902.67',
    users: [
        {
            cookie:  process.env.COOKIE || process.env.cookie,
            name: 'hzx',
            uid: "1398234521810167"
        }
    ],
    PUBLIC_KEY: `-----BEGIN EC PARAMETERS-----
BggqhkjOPQMBBw==
-----END EC PARAMETERS-----
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIDB7KMVQd+eeKt7AwDMMUaT7DE3Sl0Mto3LEojnEkRiAoAoGCCqGSM49
AwEHoUQDQgAEEkViJDU8lYJUenS6IxPlvFJtUCDNF0c/F/cX07KCweC4Q/nOKsoU
nYJsb4O8lMqNXaI1j16OmXk9CkcQQXbzfg==
-----END EC PRIVATE KEY-----`
}