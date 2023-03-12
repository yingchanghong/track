export interface DefaultOptions {
    requestUrl: string;
    jsError?: boolean;
    domTracker?: boolean;
    routerType?: string;
}
export interface InitOptions extends DefaultOptions {
}
export interface ReportOptions {
    requestUrl: string;
    reportType?: ReportType;
    error?: reportType;
    [key: string]: any;
}
type ReportType = 'error' | 'pv';
export type reportType = 'whiteScreen' | 'click' | 'dbclick' | 'jsError' | 'promiseError';
export {};
