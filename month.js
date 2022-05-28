let param = {};
location.search
  .replace("?", "")
  .split(" ")
  .forEach((par) => {
    param[par.split("=")[0]] = par.split("=")[1];
  });
const dateInput = param.date.split("-");
const selectedMonth = +dateInput[0];
const selectedYear = +dateInput[1];

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDate = new Date().getDate();

const monthDaysEl = document.getElementsByClassName("month-days");
const monthsEl = document.querySelector(".months");
const monthOverview = document.querySelector(".month-overview");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function weekdays() {
  for (let day = 0; day < 7; day++) {
    const weekday = document.createElement("li");
    weekday.textContent = `${days[day]}`;
    const currentMonthEl = document.getElementsByClassName("weekdays-list")[0];
    currentMonthEl.appendChild(weekday);
  }
}
weekdays();

months.forEach((month) => {
  const html = `<div class="month"><button class="month-name">${month}</button></div>`;
  monthsEl.insertAdjacentHTML("beforeend", html);
});

function fillDays(year, month) {
  const date = new Date(year, month, 1);
  let daysCounter = 0,
    spacerCounter = 0;
  for (let day = 0; day < date.getDate(); day++) {
    if (date.getDate() === 1) {
      for (let spacerNr = 0; spacerNr < date.getDay(); spacerNr++) {
        spacer();
        spacerCounter++;
      }
    }
    const html = `
      <div class="month-days">
        <div class="day-number">${date.getDate()}</div>
        <div class="items"></div>
      </div>`;
    monthOverview.insertAdjacentHTML("beforeend", html);
    daysCounter++;
    date.setDate(date.getDate() + 1);
  }
  if (currentMonth === selectedMonth) monthDaysEl[currentDate - 1].classList.add("highlight");
  const totalCounter = daysCounter + spacerCounter;
  if (totalCounter > 28 && totalCounter <= 35) {
    monthOverview.style.gridTemplateRows = "repeat(5, 1fr)";
    for (let spacerNr = 0; spacerNr < 35 - totalCounter; spacerNr++) {
      spacer();
    }
  }
  if (totalCounter > 35) {
    monthOverview.style.gridTemplateRows = "repeat(6, 1fr)";
    for (let spacerNr = 0; spacerNr < 42 - totalCounter; spacerNr++) {
      spacer();
    }
  }
}
fillDays(selectedYear, selectedMonth);

function spacer() {
  const spacer = document.createElement("div");
  spacer.className = "month-spacer";
  monthOverview.appendChild(spacer);
}

function renderlocalStorageData() {
  const data = JSON.parse(localStorage.getItem("items"));
  if (!data) return;
  const monthData = [];
  for (const item of data) { 
      if (+item.date.split("-")[1] === selectedMonth) {
        monthData.push(item);
      }
  }
  const monthDataSorted = monthData.sort((a, b) => +a.start.replace(":", "") - +b.start.replace(":", ""));
  monthDataSorted.forEach((item) => {
    if (+item.date.split("-")[1] === selectedMonth) {
      const itemEl = document.createElement("div");
      itemEl.className = "item";
      itemEl.textContent = `${item.title} - ${item.start}`;
      document.getElementsByClassName("items")[item.date.split("-")[0] - 1].appendChild(itemEl);
    }
  });
}
renderlocalStorageData();

function loadSelectedDate(e) {
  let target = e.target;
  if (target.className === "month-days" || target.className === "month-days highlight") {
    const dayNr = +target.firstChild.nextSibling.textContent;
    location.href = `day.html?date=${dayNr}-${selectedMonth}-${selectedYear}`;
  }
  if (target.parentNode.className === "month-days" || target.parentNode.className === "month-days highlight") {
    const dayNr = +target.parentNode.firstChild.nextSibling.textContent;
    location.href = `day.html?date=${dayNr}-${selectedMonth}-${selectedYear}`;
  }
  if (target.parentNode.parentNode.className === "month-days" || target.parentNode.parentNode.className === "month-days highlight") {
    const dayNr = +target.parentNode.parentNode.firstChild.nextSibling.textContent;
    location.href = `day.html?date=${dayNr}-${selectedMonth}-${selectedYear}`;
  }
  if (target.className === "month-name") {
    const monthNr = months.indexOf(target.textContent);
    location.href = `month.html?date=${monthNr}-${currentYear}`;
  }
}

document.querySelectorAll("a[href='month.html']")[0].href += `?date=${currentMonth}-${currentYear}`;
document.querySelectorAll("a[href='day.html']")[0].href += `?date=${currentDate}-${currentMonth}-${currentYear}`;
document.getElementsByTagName("h1")[0].textContent = `${months[selectedMonth]} - ${selectedYear}`;

monthOverview.addEventListener("click", loadSelectedDate);
monthsEl.addEventListener("click", loadSelectedDate);