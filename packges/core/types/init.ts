export interface DefaultOptions{
  requestUrl: string;
  jsError?: boolean;
  domTracker?: boolean; // 无痕埋点
  routerType?: RouterType;
  longTime?: number;
}

export interface ReportOptions {
  requestUrl: string;
  reportType?: ReportType;
  error?: reportType;
  [key: string]: any;
};

type RouterType = 'hash' | 'history';
type ReportType = 'error' | 'pv';
export type reportType = 'whiteScreen' | 'click' | 'dbclick' | 'jsError' | 'promiseError' | 'requestError' | 'responceError' | 'other';