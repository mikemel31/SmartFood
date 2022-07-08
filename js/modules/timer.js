function timer (limit) {
  const deadline = new Date(limit);
  console.log(deadline)

  const promotionEnd = document.querySelector("#promotionEnd");
  const dateOfEnd = deadline.toLocaleString("us", {
    month: "long",
    day: "numeric",
  });
  promotionEnd.textContent = `${dateOfEnd} at 00:00`;

  const getReamainTime = (deadlineTime) => {
    const remainTime = deadlineTime - new Date();
    return {
      days: Math.floor(remainTime / (1000 * 60 * 60 * 24)),
      hours: Math.floor((remainTime / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((remainTime / (1000 * 60)) % 60),
      seconds: Math.floor((remainTime / 1000) % 60),
    };
  };

  const getZero = (num) => {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  };

  const setClock = (selector, deadlineTime) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const timeRemained = getReamainTime(deadlineTime);
      days.innerHTML = getZero(timeRemained.days);
      hours.innerHTML = getZero(timeRemained.hours);
      minutes.innerHTML = getZero(timeRemained.minutes);
      seconds.innerHTML = getZero(timeRemained.seconds);
      if (timeRemained.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  };

  setClock(".timer", deadline);

  
};

export default timer;

