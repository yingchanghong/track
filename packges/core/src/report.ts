import { ReportOptions } from '../types/init';
export default function reportTracker(reportOptions: ReportOptions) {
  const params = Object.assign(reportOptions, {
    time: new Date().getTime(),
    path: window.location.href,
    system: window.navigator.userAgent,
  });
  let headers = {
    type: 'application/x-www-form-urlencoded'
  }
  let blob =new Blob([JSON.stringify(params)], headers);
  if (!reportOptions.requestUrl) {
    console.warn('缺少上报地址');
    return;
  }
  navigator.sendBeacon(reportOptions.requestUrl, blob);
  // 后续兼容处理
  // const img = document.createElement('img');
  // img.src = `${initOptions.requestUrl}?reportOptions=${JSON.stringify(params)}`;
}