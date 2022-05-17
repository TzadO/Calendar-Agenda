const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDate = new Date().getDate();
const currentDay = new Date().getDay();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
document.getElementsByTagName("h1")[0].textContent = `${days[currentDay]} - ${currentDate} - ${months[currentMonth]} - ${currentYear}`;

function weekdays() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let day = 0; day < 7; day++) {
    const weekday = document.createElement("li");
    weekday.textContent = `${weekdays[day]}`;
    const currentMonthEl = document.getElementsByClassName("weekdays-list")[0];
    currentMonthEl.appendChild(weekday);
  }
}
weekdays();

function fillDays(year, month) {
  const date = new Date(year, month, 1);
  let daysCounter = 0,
    spacerCounter = 0;
  for (let day = 0; day < date.getDate(); day++) {
    if (date.getDate() === 1) {
      for (let spacerNr = 0; spacerNr < date.getDay(); spacerNr++) {
        const spacer = document.createElement("div");
        spacer.className = "spacer";
        document.querySelector(".days").appendChild(spacer);
        spacerCounter++;
      }
    }
    const days = document.createElement("div");
    days.className = "day";
    days.textContent = `${date.getDate()}`;
    document.querySelector(".days").appendChild(days);
    daysCounter++;
    date.setDate(date.getDate() + 1);
  }
  if (daysCounter + spacerCounter > 28 && daysCounter + spacerCounter <= 35) {
    for (let spacerNr = 0; spacerNr < 35 - (daysCounter + spacerCounter); spacerNr++) {
      const spacer = document.createElement("div");
      spacer.className = "spacer";
      document.querySelector(".days").appendChild(spacer);
    }
  }
  if (daysCounter + spacerCounter > 35) {
    for (let spacerNr = 0; spacerNr < 42 - (daysCounter + spacerCounter); spacerNr++) {
      const spacer = document.createElement("div");
      spacer.className = "spacer";
      document.querySelector(".days").appendChild(spacer);
    }
  }
}
fillDays(currentYear, currentMonth);

document.getElementsByClassName("day")[currentDate - 1].classList.add("highlight");
