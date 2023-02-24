window.addEventListener("DOMContentLoaded", () => {
  var showElement = ['year', 'month', 'day', 'hours', 'minute', 'seconds'];
  setInterval(() => {
    const date = new Date();
    var getDateMethod = {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
      day: date.getDate(),
      hours: date.getHours(),
      minute: date.getMinutes(),
      seconds: date.getSeconds()
    };
    for (key in showElement) {
      document.querySelector(`.${showElement[key]}`).innerHTML = getDateMethod[showElement[key]]
    }
  }, 1000, showElement);

});