interface DefaultOptions {
    requestUrl: string;
    jsError?: boolean;
    domTracker?: boolean;
    routerType?: string;
}

declare function Track(options: DefaultOptions): void;

export { Track as default };
