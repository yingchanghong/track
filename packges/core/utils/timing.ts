export function Timing() {
  let FMP: any, LCP:any;
  new PerformanceObserver((entryList, observe) => {
    let perEntry = entryList.getEntries();
    FMP = perEntry[0];
    observe.disconnect();
  }).observe({entryTypes: ['element']}); // 观测页面有意义的元素，需自己设置attribute
  new PerformanceObserver((entryList, observe) => {
    let perEntry = entryList.getEntries();
    LCP = perEntry[0];
    observe.disconnect()
  }).observe({ entryTypes: ['largest-contentful-paint'] });
}
window.onload = function() {
  setTimeout(() => {
    const { fetchStart, connectStart, connectEnd, requestStart, responseStart, responseEnd, domLoading, domInteractive, domContentLoadedEventStart, domContentLoadedEventEnd, loadEventStart } = performance.timing;
    const data = {
      connectTime: connectEnd - connectStart, // 链接时间
      ttfbTime: responseStart - requestStart,
      loadTime: loadEventStart - fetchStart, // 完整加载时间
      timeToInteractive: domInteractive - fetchStart, // 首次可交互时间
    }
    const FP = performance.getEntriesByName('first-paint')[0];
    const FCP = performance.getEntriesByName('first-contentful-paint')[0];
  }, 3000);
}