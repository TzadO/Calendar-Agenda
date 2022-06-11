"use strict";

const parameters = {};
location.search
  .replace("?", "")
  .split(" ")
  .forEach((par) => {
    parameters[par.split("=")[0]] = par.split("=")[1];
  });
const dateInput = parameters.date.split("-");
const selectedMonth = Number(dateInput[0]);
const selectedYear = Number(dateInput[1]);

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDate = new Date().getDate();

const monthOverview = document.querySelector(".month-overview");
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

months.forEach((month) => {
  document.querySelector(".months").insertAdjacentHTML("beforeend", `<div class="month"><button class="month-name">${month}</button></div>`);
});

function addCurrentDates() {
  document.querySelector("a[href='month.html']").href += `?date=${currentMonth}-${currentYear}`;
  document.querySelector("a[href='day.html']").href += `?date=${currentDate}-${currentMonth}-${currentYear}`;
  document.getElementsByTagName("h1")[0].textContent = `${months[selectedMonth]} - ${selectedYear}`;
}

function createWeekDaysList() {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let day = 0; day < 7; day++) {
    const weekday = document.createElement("li");
    weekday.textContent = `${days[day]}`;
    const currentMonthEl = document.getElementsByClassName("weekdays-list")[0];
    currentMonthEl.appendChild(weekday);
  }
}

function createSpacer() {
  const spacer = document.createElement("div");
  spacer.className = "month-spacer";
  monthOverview.appendChild(spacer);
}

function fillDays(year, month) {
  const date = new Date(year, month, 1);
  let daysCounter = 0,
    spacerCounter = 0;
  for (let day = 0; day < date.getDate(); day++) {
    if (date.getDate() === 1) {
      for (let spacerNr = 0; spacerNr < date.getDay(); spacerNr++) {
        createSpacer();
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
  
  if (currentMonth === selectedMonth) document.getElementsByClassName("month-days")[currentDate - 1].classList.add("highlight");
  
  const totalCounter = daysCounter + spacerCounter;
  if (totalCounter > 28 && totalCounter <= 35) {
    monthOverview.style.gridTemplateRows = "repeat(5, 1fr)";
    for (let spacerNr = 0; spacerNr < 35 - totalCounter; spacerNr++) {
      createSpacer();
    }
  }
  if (totalCounter > 35) {
    monthOverview.style.gridTemplateRows = "repeat(6, 1fr)";
    for (let spacerNr = 0; spacerNr < 42 - totalCounter; spacerNr++) {
      createSpacer();
    }
  }
}


function renderlocalStorageData() {
  const data = JSON.parse(localStorage.getItem("items"));
  if (!data) return;
  const monthData = [];
  for (const item of data) { 
      if (Number(item.date.split("-")[1]) === selectedMonth) {
        monthData.push(item);
      }
  }
  const monthDataSorted = monthData.sort((a, b) => Number(a.start.replace(":", "")) - Number(b.start.replace(":", "")));
  monthDataSorted.forEach((item) => {
    if (Number(item.date.split("-")[1]) === selectedMonth) {
      const itemEl = document.createElement("div");
      itemEl.className = "item";
      itemEl.textContent = `${item.title} - ${item.start}`;
      document.getElementsByClassName("items")[item.date.split("-")[0] - 1].appendChild(itemEl);
    }
  });
}


function loadSelectedDate(e) {
  let target = e.target;
  
  if (target.closest('.month-days')) 
    location.href = `day.html?date=${Number(target.closest('.month-days').firstChild.nextSibling.textContent)}-${selectedMonth}-${selectedYear}`;

  if (target.classList.contains("month-name") ) 
    location.href = `month.html?date=${months.indexOf(target.textContent)}-${currentYear}`;
}


function addClickListeners() {
  monthOverview.addEventListener("click", loadSelectedDate);
  document.querySelector(".months").addEventListener("click", loadSelectedDate);
}


addCurrentDates();
createWeekDaysList();
fillDays(selectedYear, selectedMonth);
addClickListeners()
renderlocalStorageData();