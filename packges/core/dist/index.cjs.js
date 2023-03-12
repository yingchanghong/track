'use strict';

const createHistory = (type) => {
    const origin = history[type];
    return function () {
        const res = origin.apply(this, arguments);
        const e = new Event(type);
        window.dispatchEvent(e);
        return res;
    };
};

const initDef = () => {
    window.history["pushState"] = createHistory('pushState'); // 后续根据参数判断是否要对页面进行埋点
    window.history['replaceState'] = createHistory('replaceState');
    return {
        jsError: true,
        domTracker: false,
    };
};

function Timing() {
    new PerformanceObserver((entryList, observe) => {
        let perEntry = entryList.getEntries();
        perEntry[0];
        observe.disconnect();
    }).observe({ entryTypes: ['element'] }); // 观测页面有意义的元素，需自己设置attribute
    new PerformanceObserver((entryList, observe) => {
        let perEntry = entryList.getEntries();
        perEntry[0];
        observe.disconnect();
    }).observe({ entryTypes: ['largest-contentful-paint'] });
}
window.onload = function () {
    setTimeout(() => {
        performance.getEntriesByName('first-paint')[0];
        performance.getEntriesByName('first-contentful-paint')[0];
    }, 3000);
};

function whiteScreen() {
    const wrapperElements = ['html', 'body', '#app'];
    let emptyPoints = 0;
    function isWrapper(element) {
        let selector = getSelecter(element);
        if (wrapperElements.indexOf(selector) != -1) {
            emptyPoints++;
        }
    }
    function getSelecter(element) {
        if (element.id) {
            return `#${element.id}`;
        }
        else if (element.className) {
            return `.${element.className.split(" ").filter((item) => !!item)}`;
        }
        else {
            return element.nodeName.toLowerCase();
        }
    }
    for (let i = 0; i < 9; i++) {
        let xElements = document.elementsFromPoint((window.innerWidth * i) / 10, window.innerHeight / 2);
        let yElements = document.elementsFromPoint(window.innerWidth / 2, (window.innerHeight * 1) / 10);
        isWrapper(xElements[0]);
        isWrapper(yElements[0]);
    }
    if (emptyPoints > 16) {
        return true;
    }
    else {
        return false;
    }
}

function reportTracker(reportOptions) {
    const params = Object.assign(reportOptions, {
        time: new Date().getTime(),
        path: window.location.href,
        system: window.navigator.userAgent,
    });
    let headers = {
        type: 'application/x-www-form-urlencoded'
    };
    let blob = new Blob([JSON.stringify(params)], headers);
    if (!reportOptions.requestUrl) {
        console.warn('缺少上报地址');
        return;
    }
    navigator.sendBeacon(reportOptions.requestUrl, blob);
    // 后续兼容处理
    // const img = document.createElement('img');
    // img.src = `${initOptions.requestUrl}?reportOptions=${JSON.stringify(params)}`;
}

const mouseList = ['click', 'dbclick'];
function Track(options) {
    let initOptions;
    initOptions = Object.assign(initDef(), options);
    const initEvent = () => {
        setTimeout(() => {
            if (whiteScreen()) {
                reportTracker(Object.assign(Object.assign({}, initOptions), { reportType: 'error', error: 'whiteScreen' }));
            }
            Timing();
        }, 3000);
        if (initOptions.routerType === 'history') {
            captureEvents(['pushState', 'replaceState', 'popstate'], 'showpv');
        }
        if (initOptions.routerType === 'hash') {
            captureEvents(['hashChange'], 'showpv');
        }
        if (initOptions.domTracker) {
            targetKeyReport();
        }
        if (initOptions.jsError) {
            jsError();
        }
    };
    initEvent();
    // 路由监听上报
    function captureEvents(mouseEventList, data) {
        mouseEventList.forEach((event) => {
            window.addEventListener(event, () => {
                reportTracker(Object.assign(Object.assign({}, initOptions), { reportType: 'pv', data }));
            });
        });
    }
    function targetKeyReport() {
        mouseList.forEach((item) => {
            window.addEventListener(item, (e) => {
                const target = e.target;
                const targetKey = target.getAttribute('target-key');
                if (targetKey) {
                    reportTracker(Object.assign(Object.assign({}, initOptions), { message: e, reportType: 'pv' }));
                }
            });
        });
    }
    // 开启js错误监听
    function jsError() {
        errorEvent();
        promiseEvent();
    }
    function errorEvent() {
        window.addEventListener('error', (event) => {
            reportTracker(Object.assign(Object.assign({}, initOptions), { message: event, reportType: 'error', error: 'jsError' }));
        });
    }
    function promiseEvent() {
        window.addEventListener('unhandledrejection', (ev) => {
            ev.promise.catch((err) => {
                reportTracker(Object.assign(Object.assign({}, initOptions), { reportType: 'error', error: 'promiseError', message: err }));
            });
        });
    }
}

module.exports = Track;
