import constant from "./constant";
import CryptoJS from 'crypto-js';
import store from '../store';

export default {
  pushNotification(notices, isNotification) {
    if (isNotification) {
      if (this.isEmpty(notices)) {
        return [];
      } else {
        return notices.filter(f => "推送标题：" !== f.substr(0, 5) &&
          "推送封面：" !== f.substr(0, 5) &&
          "推送链接：" !== f.substr(0, 5));
      }
    } else {
      let push = {};
      notices.forEach(notice => {
        if ("推送标题：" === notice.substr(0, 5)) {
          push['标题'] = notice.substr(5);
        } else if ("推送封面：" === notice.substr(0, 5)) {
          push['封面'] = notice.substr(5);
        } else if ("推送链接：" === notice.substr(0, 5)) {
          push['链接'] = notice.substr(5);
        }
      });
      return push;
    }
  },

  mobile() {
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
    return flag && flag.length && flag.length > 0;
  },

  /**
   * 判断是否为空
   */
  isEmpty(value) {
    if (typeof value === "undefined" || value === null || (typeof value === "string" && value.trim() === "") || (Array.prototype.isPrototypeOf(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0)) {
      return true;
    } else {
      return false;
    }
  },

  /**
   * 加密
   */
  encrypt(plaintText) {
    let options = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    };
    let key = CryptoJS.enc.Utf8.parse(constant.cryptojs_key);
    let encryptedData = CryptoJS.AES.encrypt(plaintText, key, options);
    return encryptedData.toString().replace(/\//g, "_").replace(/\+/g, "-");
  },

  /**
   * 解密
   */
  decrypt(encryptedBase64Str) {
    let val = encryptedBase64Str.replace(/\-/g, '+').replace(/_/g, '/');
    let options = {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    };
    let key = CryptoJS.enc.Utf8.parse(constant.cryptojs_key);
    let decryptedData = CryptoJS.AES.decrypt(val, key, options);
    return CryptoJS.enc.Utf8.stringify(decryptedData);
  },

  /**
   * 表情包转换
   */
  faceReg(content) {
    content = content.replace(/\[[^\[^\]]+\]/g, (word) => {
      let index = constant.emojiList.indexOf(word.replace("[", "").replace("]", ""));
      if (index > -1) {
        let url = store.state.sysConfig['webStaticResourcePrefix'] + "emoji/q" + (index + 1) + ".gif";
        return '<img loading="lazy" style="vertical-align: middle;width: 32px;height: 32px" src="' + url + '" title="' + word + '"/>';
      } else {
        return word;
      }
    });
    return content;
  },

  /**
   * 图片转换
   */
  pictureReg(content) {
    content = content.replace(/\[[^\[^\]]+\]/g, (word) => {
      let index = word.indexOf(",");
      if (index > -1) {
        let arr = word.replace("[", "").replace("]", "").split(",");
        return '<img loading="lazy" class="pictureReg" style="border-radius: 5px;width: 100%;max-width: 250px;display: block" src="' + arr[1] + '" title="' + arr[0] + '"/>';
      } else {
        return word;
      }
    });
    return content;
  },

  imgShow(select) {
    $(select).click(function () {
      let src = $(this).attr("src");
      $("#bigImg").attr("src", src);

      /** 获取当前点击图片的真实大小，并显示弹出层及大图 */
      $("<img/>").attr("src", src).load(function () {
        let windowW = $(window).width();//获取当前窗口宽度
        let windowH = $(window).height();//获取当前窗口高度
        let realWidth = this.width;//获取图片真实宽度
        let realHeight = this.height;//获取图片真实高度
        let imgWidth, imgHeight;
        let scale = 0.8;//缩放尺寸，当图片真实宽度和高度大于窗口宽度和高度时进行缩放

        if (realHeight > windowH * scale) {//判断图片高度
          imgHeight = windowH * scale;//如大于窗口高度，图片高度进行缩放
          imgWidth = imgHeight / realHeight * realWidth;//等比例缩放宽度
          if (imgWidth > windowW * scale) {//如宽度仍大于窗口宽度
            imgWidth = windowW * scale;//再对宽度进行缩放
          }
        } else if (realWidth > windowW * scale) {//如图片高度合适，判断图片宽度
          imgWidth = windowW * scale;//如大于窗口宽度，图片宽度进行缩放
          imgHeight = imgWidth / realWidth * realHeight;//等比例缩放高度
        } else {//如果图片真实高度和宽度都符合要求，高宽不变
          imgWidth = realWidth;
          imgHeight = realHeight;
        }
        $("#bigImg").css("width", imgWidth);//以最终的宽度对图片缩放

        let w = (windowW - imgWidth) / 2;//计算图片与窗口左边距
        let h = (windowH - imgHeight) / 2;//计算图片与窗口上边距
        $("#innerImg").css({"top": h, "left": w});//设置top和left属性
        $("#outerImg").fadeIn("fast");//淡入显示
      });

      $("#outerImg").click(function () {//再次点击淡出消失弹出层
        $(this).fadeOut("fast");
      });
    });
  },

  /**
   * 字符串转换为时间戳
   */
  getDateTimeStamp(dateStr) {
    return Date.parse(dateStr.replace(/-/gi, "/"));
  },

  getDateDiff(dateStr) {
    let publishTime = isNaN(Date.parse(dateStr.replace(/-/gi, "/")) / 1000) ? Date.parse(dateStr) / 1000 : Date.parse(dateStr.replace(/-/gi, "/")) / 1000;
    let d_seconds,
      d_minutes,
      d_hours,
      d_days,
      timeNow = Math.floor(new Date().getTime() / 1000),
      d,
      date = new Date(publishTime * 1000),
      Y = date.getFullYear(),
      M = date.getMonth() + 1,
      D = date.getDate(),
      H = date.getHours(),
      m = date.getMinutes(),
      s = date.getSeconds();
    //小于10的在前面补0
    if (M < 10) {
      M = '0' + M;
    }
    if (D < 10) {
      D = '0' + D;
    }
    if (H < 10) {
      H = '0' + H;
    }
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }
    d = timeNow - publishTime;
    d_days = Math.floor(d / 86400);
    d_hours = Math.floor(d / 3600);
    d_minutes = Math.floor(d / 60);
    d_seconds = Math.floor(d);
    if (d_days > 0 && d_days < 3) {
      return d_days + '天前';
    } else if (d_days <= 0 && d_hours > 0) {
      return d_hours + '小时前';
    } else if (d_hours <= 0 && d_minutes > 0) {
      return d_minutes + '分钟前';
    } else if (d_seconds < 60) {
      if (d_seconds <= 0) {
        return '刚刚发表';
      } else {
        return d_seconds + '秒前';
      }
    } else if (d_days >= 3) {
      return Y + '-' + M + '-' + D + ' ' + H + ':' + m;
    }
  },

  /**
   * 保存资源
   */
  saveResource(that, type, path, size, mimeType, originalName, storeType, isAdmin = false) {
    let resource = {
      type: type,
      path: path,
      size: size,
      mimeType: mimeType,
      storeType: storeType,
      originalName: originalName
    };

    that.$http.post(that.$constant.baseURL + "/resource/saveResource", resource, isAdmin)
      .catch((error) => {
        that.$message({
          message: error.message,
          type: "error"
        });
      });
  },

  /**
   * 计算两个时间相差的年、月、日、时、分、秒
   *
   * https://juejin.cn/post/7153816601156911118
   */
  timeDiff(oldTime, newTime) {
    oldTime = oldTime.replace(new RegExp("-", "gm"), "/");
    if (newTime) {
      newTime = newTime.replace(new RegExp("-", "gm"), "/");
    } else {
      newTime = new Date();
    }

    // 计算比较日期
    const getMaxMinDate = (time, twoTime, type) => {
      let minTime = new Date(time).getTime() - new Date(twoTime).getTime() > 0 ? twoTime : time;
      let maxTime = new Date(time).getTime() - new Date(twoTime).getTime() > 0 ? time : twoTime;
      let maxDateDay = new Date(new Date(maxTime).getFullYear(), new Date(maxTime).getMonth() + 1, 0).getDate();
      let maxMinDate = new Date(minTime).getDate() > maxDateDay ? maxDateDay : new Date(minTime).getDate();
      let maxMinTong;
      if (type === 'month') {
        maxMinTong = new Date(maxTime).getFullYear() + '/' + (new Date(minTime).getMonth() + 1) + '/' + maxMinDate + ' ' + new Date(minTime).toLocaleTimeString('chinese', {hour12: false});
      } else {
        maxMinTong = new Date(maxTime).getFullYear() + '/' + (new Date(maxTime).getMonth() + 1) + '/' + maxMinDate + ' ' + new Date(minTime).toLocaleTimeString('chinese', {hour12: false});
      }
      return {
        minTime,
        maxTime,
        maxMinTong
      }
    }

    // 相差年份
    const getYear = (time, twoTime) => {
      let oneYear = new Date(time).getFullYear();
      let twoYear = new Date(twoTime).getFullYear();
      const {minTime, maxTime, maxMinTong} = getMaxMinDate(time, twoTime, 'month');
      let chaYear = Math.abs(oneYear - twoYear);
      if (new Date(maxMinTong).getTime() > new Date(maxTime).getTime()) {
        chaYear--;
      }
      return chaYear;
    }

    // 相差月份
    const getMonth = (time, twoTime, value) => {
      let oneMonth = new Date(time).getFullYear() * 12 + (new Date(time).getMonth() + 1);
      let twoMonth = new Date(twoTime).getFullYear() * 12 + (new Date(twoTime).getMonth() + 1);
      const {minTime, maxTime, maxMinTong} = getMaxMinDate(time, twoTime, 'day');
      let chaMonth = Math.abs(oneMonth - twoMonth);
      if (new Date(maxMinTong).getTime() > new Date(maxTime).getTime()) {
        chaMonth--;
      }
      if (value) {
        return chaMonth - value;
      } else {
        return chaMonth;
      }
    }

    // 相差天数
    const getDay = (time, twoTime, value) => {
      let chaTime = Math.abs(new Date(time).getTime() - new Date(twoTime).getTime());
      if (value) {
        return parseInt(chaTime / 86400000) - value;
      } else {
        return parseInt(chaTime / 86400000);
      }
    }

    // 相差小时
    const getHour = (time, twoTime, value) => {
      let chaTime = Math.abs(new Date(time).getTime() - new Date(twoTime).getTime());
      if (value) {
        return parseInt(chaTime / 3600000) - value;
      } else {
        return parseInt(chaTime / 3600000);
      }
    }

    // 相差分钟
    const getMinute = (time, twoTime, value) => {
      let chaTime = Math.abs(new Date(time).getTime() - new Date(twoTime).getTime());
      if (value) {
        return parseInt(chaTime / 60000) - value;
      } else {
        return parseInt(chaTime / 60000);
      }
    }

    // 相差秒
    const getSecond = (time, twoTime, value) => {
      let chaTime = Math.abs(new Date(time).getTime() - new Date(twoTime).getTime());
      if (value) {
        return parseInt(chaTime / 1000) - value;
      } else {
        return parseInt(chaTime / 1000);
      }
    }

    // 相差年月日时分秒
    const getDiffYMDHMS = (time, twoTime) => {
      const {minTime, maxTime, maxMinTong} = getMaxMinDate(time, twoTime, 'day');
      let diffDay1 = getDay(minTime, maxMinTong);
      if (new Date(maxMinTong).getTime() > new Date(maxTime).getTime()) {
        let prevMonth = new Date(maxMinTong).getMonth() - 1;
        let lastTime = new Date(maxMinTong).setMonth(prevMonth);
        diffDay1 = diffDay1 - getDay((new Date(lastTime).getFullYear() + '/' + (new Date(lastTime).getMonth() + 1) + '/' + new Date(lastTime).getDate()), maxMinTong);
      }
      let diffYear = getYear(time, twoTime);
      let diffMonth = getMonth(time, twoTime, diffYear * 12);
      let diffDay = getDay(time, twoTime, diffDay1);
      let diffHour = getHour(time, twoTime, getDay(time, twoTime) * 24);
      let diffMinute = getMinute(time, twoTime, (getDay(time, twoTime) * 24 * 60 + diffHour * 60));
      let diffSecond = getSecond(time, twoTime, (getDay(time, twoTime) * 24 * 60 * 60 + diffHour * 60 * 60 + diffMinute * 60));
      return {
        diffYear,
        diffMonth,
        diffDay,
        diffHour,
        diffMinute,
        diffSecond
      }
    }

    return getDiffYMDHMS(oldTime, newTime);
  },

  countdown(time) {
    time = new Date(time.replace(new RegExp("-", "gm"), "/"));
    let nowTime = new Date();
    //两个时间点的时间差(秒)
    let seconds = parseInt((time.getTime() - nowTime.getTime()) / 1000);
    let d = parseInt(seconds / 3600 / 24);
    let h = parseInt(seconds / 3600 % 24);
    let m = parseInt(seconds / 60 % 60);
    let s = parseInt(seconds % 60);
    return {
      d,
      h,
      m,
      s
    }
  }
}
