import { toArray } from '@smoex-basic/js'

export enum BrowserType {
    IE = 'IE',
    Edge = 'Edge',
    Firefox = 'Firefox',
    Opera = 'Opera',
    Safari = 'Safari',
    Chrome = 'Chrome',
    QQ = 'QQBrowser',
    QQWebView = 'QQWebView',
    WeChatWebView = 'WeChatWebView',
    UC = 'UC',
    Baidu = 'Baidu',
    BaiduWebView = 'BaiduWebView',
    Unknow = 'Unknow',
}

type IbrowserTypeMap = {
    [key: string]: () => boolean
}

type IbrowserVersionMap = {
    [key: string]: RegExp[]
}

const ua = navigator.userAgent

const browserTypeMap: IbrowserTypeMap = {
    [BrowserType.Opera]: () => ua.includes('Opera'),
    [BrowserType.IE]: () => ua.includes('MSIE') || ua.includes('Trident'),
    [BrowserType.Edge]: () => ua.includes('Edge'),
    [BrowserType.Firefox]: () => ua.includes('Firefox'),
    [BrowserType.Safari]: () => ua.includes('Safari') && !ua.includes('Chrome'),
    [BrowserType.Chrome]: () => ua.includes('Chrome') && ua.includes('Safari'),
    [BrowserType.WeChatWebView]: () => /micromessenger/i.test(ua.toLocaleLowerCase()),
    [BrowserType.QQ]: () => /MQQBrowser/i.test(ua),
    [BrowserType.QQWebView]: () => /\Wqq\W/i.test(ua),
    [BrowserType.UC]: () => /UCBrowser/i.test(ua),
    [BrowserType.Baidu]: () => /Baidu/i.test(ua),
    [BrowserType.BaiduWebView]: () => /baiduboxapp/i.test(ua),
}

const browserVersionMap: IbrowserVersionMap = {
    [BrowserType.Opera]: [/Opera.([\d.]+)/],
    [BrowserType.IE]: [/MSIE ([\d.]+)/, /rv:([\d.]+)/],
    [BrowserType.Edge]: [/Edge\/([\d.]+)/],
    [BrowserType.Firefox]: [/Firefox\/([\d.]+)/],
    [BrowserType.Safari]: [/Version\/([\d.]+)/],
    [BrowserType.Chrome]: [/Chrome\/([\d.]+)/],
}

export const BROWSER_TYPE = getBrowserType()
export const BROWSER_VERSION = getBrowserVersion()

function getBrowserType(): BrowserType {
    for (const browserType of Object.keys(browserTypeMap)) {
        if (browserTypeMap[browserType]()) {
            return browserType as BrowserType
        }
    }
    return BrowserType.Unknow
}

function getBrowserVersion(): string {
    const userAgent = navigator.userAgent
    const regexps = toArray(browserVersionMap[BROWSER_TYPE])
    for (const regexp of regexps) {
        const match = userAgent.match(regexp)
        if (match) {
            return match[1]
        }
    }
    return '-1'
}