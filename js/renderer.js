window.addEventListener("DOMContentLoaded", () => {
  const showClock = () => {
    var showElement = ['year', 'month', 'day', 'hours', 'minute', 'seconds'];
    const date = new Date();
    var getDateMethod = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours() <= 9 ? "0" + date.getHours() : date.getHours(),
      minute: date.getMinutes() <= 9 ? "0" + date.getMinutes() : date.getMinutes(),
      seconds: date.getSeconds() <= 9 ? "0" + date.getSeconds() : +date.getSeconds()
    };

    var timeForHours = getDateMethod.hours;
    var timeForMinute = getDateMethod.minute;
    var tipsTextContent = "标语文本";
    var dateTimeElement = document.querySelector(".date-time");

    if (timeForHours >= 0 && timeForHours <= 6) {
      tipsTextContent = "凌晨啦，该休息啦￣へ￣"
    } else if ((timeForHours == 7) || (timeForHours == 7 && timeForMinute <= 10)) {
      tipsTextContent = "该起床啦！太阳公公晒屁股啦！！(づ￣ 3￣)づ";
    } else if ((timeForHours == 11) || (timeForHours == 11 && timeForMinute <= 10)) {
      tipsTextContent = "中午啦，干饭干饭！！ヾ(≧▽≦*)o";
    } else if ((timeForHours == 12) || (timeForHours == 12 && timeForMinute <= 10)) {
      tipsTextContent = "时间过得好快呀，转眼就到下午了\(￣︶￣\)";
    } else if ((timeForHours == 16) || (timeForHours == 16 && timeForMinute <= 10)) {
      tipsTextContent = "到饭点了，干饭干饭！ヾ(≧▽≦*)o";
    } else if (timeForHours >= 19 && timeForHours <= 21) {
      tipsTextContent = "play time！！！(≧∀≦)ゞ";
    } else if (timeForHours >= 22 && timeForHours <= 24) {
      tipsTextContent = "夜深啦，该睡觉啦(～﹃～)~zZ";
    } else {
      tipsTextContent = "Working Time (●'◡'●)";
    }
    try {
      for (key in showElement) {
        document.querySelector(`.${showElement[key]}`).innerHTML = getDateMethod[showElement[key]]
      }
      document.querySelector(".tips").innerHTML = tipsTextContent;
      timeForHours == 12 ? dateTimeElement.innerHTML = "AF" : timeForHours < 12 ? dateTimeElement.innerHTML = "AM" : dateTimeElement.innerHTML = "PM";
    } catch (error) { }
  }
  setInterval(() => {
    showClock();
  }, 1000);
});


window.api.getConfigIni((value) => {
  value.bgColorMode === "lightMode" ?
    document.querySelector("#lightMode").checked = true :
    document.querySelector("#darkMode").checked = true
});
