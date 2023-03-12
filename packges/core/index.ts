import { DefaultOptions, reportType } from './types/init';
import { initDef } from './src/initDef';
import { Timing, whiteScreen } from './utils';
import reportTracker from './src/report';
const mouseList = ['click','dbclick'];
function Track(options: DefaultOptions) {
  let initOptions: DefaultOptions;
  initOptions = Object.assign(initDef(), options);
  const initEvent = () => {
    setTimeout(() => {
      if(whiteScreen()) {
        reportTracker({
          ...initOptions,
          reportType: 'error',
          error: 'whiteScreen',
        })
      }
      Timing();
    }, initOptions.longTime);
    if (initOptions.routerType === 'history') {
      captureEvents(['pushState','replaceState','popstate'], 'showpv')
    }
    if (initOptions.routerType === 'hash') {
      captureEvents(['hashChange'],'showpv');
    }
    if (initOptions.domTracker) {
      targetKeyReport()
    }
    if (initOptions.jsError) {
      jsError()
    }
  }
  initEvent();
  // 路由监听上报
  function captureEvents<T> (mouseEventList: string[], data?: T){
    mouseEventList.forEach((event) => {
      window.addEventListener(event, () => {
        reportTracker({
          ...initOptions,
          reportType: 'pv',
          data,
        })
      })
    })
  }
  // 手动上报error
  function sendError<T>(data: T) {
    reportTracker({
      ...initOptions,
      ...data,
      reportType: 'error',
    });
  }
  // 手动上报pv
  function sendPv<T>(data: T) {
    reportTracker({
      ...initOptions,
      ...data,
      reportType: 'pv',
    });
  }
  function targetKeyReport() {
    mouseList.forEach((item) => {
      window.addEventListener(item, (e) => {
        const target = e.target as HTMLElement;
        const targetKey = target.getAttribute('target-key');
        if (targetKey) {
          reportTracker({
            ...initOptions,
            message: e,
            reportType: 'pv'
          })
        }
      })
    })
  }
  // 开启错误监听
  function jsError() {
    errorEvent();
    promiseEvent();
  }
  function errorEvent() {
    window.addEventListener('error', (event) => {
      reportTracker({
        ...initOptions,
        message: event,
        reportType: 'error',
        error: 'jsError',
      })
    })
  }
  function promiseEvent() {
    window.addEventListener('unhandledrejection', (ev) => {
      ev.promise.catch((err) => {
        reportTracker({
          ...initOptions,
          reportType: 'error',
          error: 'promiseError',
          message: err,
        });
      })
    })
  }
}

export default Track;