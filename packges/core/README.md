# 监控 sdk

## 支持异常监控及性能监控

## 支持情况

Track 支持 umd，esm，cjs

## 核心参数

new Track({
requestUrl: 'xxx' // 上报地址 必传
domTracker: 'xxx' // 是否开启无痕埋点，支持单击和双击
longTime: 'xxx' // 白屏规定时间 默认 3 秒
jsError: 'xxx' // 是否开启异常上报 默认 true
})

## 提供 api

手动异常上报：track.sendError({})
手动埋点上报：track.sendPv({})
