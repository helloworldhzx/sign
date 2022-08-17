module.exports = {
    "email": {
        "qq": {
            "user": "657070781@qq.com",
            "from": "657070781@qq.com",
            "to": "657070781@qq.com",
            "pass": "iiqmwvrzbmppbahj"
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
            cookie: `_ga=GA1.2.2017615439.1637047909; MONITOR_WEB_ID=cf011004-3869-4f2e-a6eb-194a571e98ee; __tea_cookie_tokens_2608=%257B%2522user_unique_id%2522%253A%25227031067200757990952%2522%252C%2522web_id%2522%253A%25227031067200757990952%2522%252C%2522timestamp%2522%253A1642730121524%257D; _tea_utm_cache_2608={%22utm_source%22:%22infinitynewtab.com%22}; passport_csrf_token=dd06d0955ff57d52ac6447e080f3313b; passport_csrf_token_default=dd06d0955ff57d52ac6447e080f3313b; _tea_utm_cache_2018={%22utm_source%22:%22infinitynewtab.com%22}; n_mh=3x7Ok1FmXpLLPzuCU_KT6Qs63qMbOYmR3ohadwYbJZg; passport_auth_status=e24a3bcee067a9f424354060b6e47614%2C; passport_auth_status_ss=e24a3bcee067a9f424354060b6e47614%2C; sid_guard=17e7b02ca061c73cf660d578833b3707%7C1653010866%7C31536000%7CSat%2C+20-May-2023+01%3A41%3A06+GMT; uid_tt=40b1d971dd762631081e2517dc9835d2; uid_tt_ss=40b1d971dd762631081e2517dc9835d2; sid_tt=17e7b02ca061c73cf660d578833b3707; sessionid=17e7b02ca061c73cf660d578833b3707; sessionid_ss=17e7b02ca061c73cf660d578833b3707; sid_ucp_v1=1.0.0-KDVkOGY3OGRkM2FjOTk4NzQ4ZjY2MmJjYTM5YWU5NDc5YzZhNzdjZDEKFwj36fC__fW9AhCy45uUBhiwFDgCQPEHGgJsZiIgMTdlN2IwMmNhMDYxYzczY2Y2NjBkNTc4ODMzYjM3MDc; ssid_ucp_v1=1.0.0-KDVkOGY3OGRkM2FjOTk4NzQ4ZjY2MmJjYTM5YWU5NDc5YzZhNzdjZDEKFwj36fC__fW9AhCy45uUBhiwFDgCQPEHGgJsZiIgMTdlN2IwMmNhMDYxYzczY2Y2NjBkNTc4ODMzYjM3MDc; _gid=GA1.2.1774667302.1653268516`,
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