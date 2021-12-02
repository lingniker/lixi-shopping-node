// 判断操作系统
export var getSystem = function(ua) {
    if (ua.indexOf("Windows NT 5.1") !== -1) {
      return "Windows Vista";
    }
    if (ua.indexOf("Windows NT 6.1") !== -1) {
      return "Windows 7";
    }
    if (ua.indexOf("Windows NT 6.2") !== -1) {
      return "Windows 8";
    }
    if (ua.indexOf("Windows NT 10") !== -1) {
      return "Windows 10";
    }
    if (ua.indexOf("Mac OS X 10_7") !== -1) {
      return "OSX 10.7";
    }
    if (ua.indexOf("Mac OS X 10.8") !== -1) {
      return "OSX 10.8";
    };
    if (ua.indexOf("Mac OS X 10_8") !== -1) {
      return "OSX 10.8";
    }
    if (ua.indexOf("Linux") !== -1) {
      return "Linux";
    }

    // 判断手机系统类型
    if (ua.indexOf("Android") !== -1) {
      return "Android";
    }
    if (ua.indexOf("Android 2.3") !== -1) {
      return "Android 2.3";
    }
    if (ua.indexOf("Android 4.0") !== -1) {
      return "Android 4.0";
    }
    if (ua.indexOf("Android 4.1") !== -1) {
      return "Android 4.1";
    }
    if (ua.indexOf("Windows Phone 8") !== -1) {
      return "Windows Phone 8";
    }
    if (ua.match(/OS 7_[0-9_]+ like Mac OS X/i)) {
      return "iOS7";
    }
    if (ua.match(/OS 6_[0-9_]+ like Mac OS X/i)) {
      return "iOS6";
    }
    if (ua.match(/OS 5_[0-9_]+ like Mac OS X/i)) {
      return "iOS5";
    }
    if (ua.match(/OS 4_[0-9_]+ like Mac OS X/i)) {
      return "iOS4";
    }
    
}

export var getBrowserType = function(ua) { // 判断浏览器类型
  if (ua.indexOf("Chrome") !== -1) {
    return "Chrome"
  }
  if (ua.indexOf("MSIE 9") !== -1) {
    return "Internet Explorer 9"
  }
  if (ua.indexOf("MSIE 8") !== -1) {
    return "Internet Explorer 8";
  }
  if (ua.indexOf("MSIE 7") !== -1) {
    return "Internet Explorer 7";
  }
  if (ua.indexOf("MSIE 6") !== -1) {
    return "Internet Explorer 6";
  }
  if (ua.indexOf("Firefox") !== -1) {
    return "Firefox";
  }
  if (ua.indexOf("Mobile Safari") !== -1 && ua.indexOf("Android") !== -1) {
    return "Mobile Safari";
  }
  if (ua.indexOf("Safari") !== -1) {
    return "Safari";
  }
}

export default {
  getSystem,
  getBrowserType
}