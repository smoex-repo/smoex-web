
const ua = navigator.userAgent
// const mobileRegexp = /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/
// system
export const IS_MOBILE = /AppleWebKit.*Mobile.*/i.test(ua)
export const IS_IOS = /(iPhone|iPod|iPad);?/i.test(ua)
export const IS_ANDROID = /Android/i.test(ua)
export const IS_IPAD = /iPad/i.test(ua)
export const IS_MAC = /macintosh|mac os x/i.test(ua)
export const IS_WINDOWS = /windows|win32/i.test(ua)
export const IS_WINPHONE = /Windows Phone/i.test(ua)
export const IS_LINUX = false