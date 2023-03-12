import { DefaultOptions } from "../types/init";
import { createHistory } from '../utils/route';
export const initDef = (): DefaultOptions => {
  window.history["pushState"] = createHistory('pushState'); // 后续根据参数判断是否要对页面进行埋点
  window.history['replaceState'] = createHistory('replaceState');
  return <DefaultOptions> {
    jsError: true,
    domTracker: false,
    longTime: 3000,
  }
};