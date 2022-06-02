//минута-час-день-месяц-год
const moment = require("moment");
const EventEmitter = require("events");

const formatDate = "YYYY-MM-DD HH:mm:ss";
const emitter = new EventEmitter();

const [userInput] = process.argv.slice(2);
const [min, hour, day, month, year] = userInput.split("-");
const userDate = new Date(year, month - 1, day, hour, min);

const getTimeDiff = (date) => {
  const futureDate = moment(date, formatDate);
  const currentDate = moment(new Date(), formatDate);
  const timeDiff = Math.floor(futureDate.diff(currentDate) / 1000);
  if (timeDiff > 0) {
    console.clear();
    console.log(`Осталось секунд: ${timeDiff}`);
  } else {
    emitter.emit("timerIsOver");
  }
};

const getTimerEnd = (timer) => {
  clearInterval(timer);
  console.clear();
  console.log("Таймер истёк");
};

const userTimer = setInterval(() => {
  emitter.emit("timerRun");
}, 1000);

emitter.on("timerRun", () => getTimeDiff(userDate));
emitter.on("timerIsOver", () => getTimerEnd(userTimer));
