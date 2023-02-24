window.addEventListener("DOMContentLoaded", () => {
  var showElement = ['year', 'month', 'day', 'hours', 'minute', 'seconds'];
  setInterval(() => {
    const date = new Date();
    var getDateMethod = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours() <= 9 ? "0" + date.getHours() : date.getHours(),
      minute: date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes(),
      seconds: date.getSeconds() <= 9 ? "0" + date.getSeconds() : date.getSeconds()
    };

    for (key in showElement) {
      document.querySelector(`.${showElement[key]}`).innerHTML = getDateMethod[showElement[key]]
    }

    var timeForHours = 13
    var tipsTextContent = "标语文本";
    var dateTimeElement = document.querySelector(".date-time");

    timeForHours == 0 ? tipsTextContent = "凌晨啦，快休息吧！\(￣︶￣\)"
      : timeForHours == 8 ? tipsTextContent = "该起床啦！太阳公公晒屁股啦！！(づ￣ 3￣)づ"
        : timeForHours == 11 ? tipsTextContent = "中午啦，干饭干饭！！ヾ(≧▽≦*)o"
          : timeForHours == 13 ? tipsTextContent = "时间过得好快呀，转眼就到下午了\(￣︶￣\)"
            : timeForHours == 17 ? tipsTextContent = "到饭点了，干饭干饭！ヾ(≧▽≦*)o"
              : timeForHours == 22 ? tipsTextContent = "夜深啦，该睡觉啦(～﹃～)~zZ"
                : tipsTextContent = "So Something Time(●'◡'●)";
    document.querySelector(".tips").innerHTML = tipsTextContent;
    timeForHours == 12 ? dateTimeElement.innerHTML = "AF" : timeForHours < 12 ? dateTimeElement.innerHTML = "AM" :dateTimeElement.innerHTML="PM";
  }, 1000, showElement);
});