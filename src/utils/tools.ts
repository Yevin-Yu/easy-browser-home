/**
 * 检查是否为移动端设备
 * window.orientation 属性用于检测设备是否处于横屏或竖屏状态
 * navigator.userAgent 属性用于获取用户代理字符串，用于检测移动设备
 * @return {boolean}
 */
export function isMobile(): boolean {
    // 检查 navigator.userAgent 中是否包含特定的移动端关键字
    return (
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1 ||
        navigator.userAgent.indexOf("iPhone") !== -1 ||
        navigator.userAgent.indexOf("iPad") !== -1 ||
        (navigator.userAgent.indexOf("Android") !== -1 && navigator.userAgent.indexOf("Mobile") !== -1)
    );
}


/**
 * 判断是否登录
 * 通过检查 localStorage 中是否存在 token 来判断用户是否登录
 * 如果存在 token，则认为用户已登录，否则认为用户未登录
 * */
export function isLogin(): boolean {
    const token = localStorage.getItem("token");
    return token !== null && token !== "";
}