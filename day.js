"use strict";

const parameters = {};
const href = location.search.replace("?", "");
const params = href.split("&");
params.forEach((param) => {
  let keyValue = param.split("=");
  let key = keyValue[0];
  let value = keyValue[1];
  parameters[key] = value;
});

const dateInput = parameters.date.split("-");
const selectedDate = +dateInput[0];
const selectedMonth = +dateInput[1];
const selectedYear = +dateInput[2];
const selectedDay = new Date(selectedYear, selectedMonth, selectedDate).getDay();
const selectedFullDate = `${selectedDate}-${selectedMonth}-${selectedYear}`;

const now = new Date();
const currentYear = now.getFullYear();
const currentMonth = now.getMonth();
const currentDate = now.getDate();
const currentDay = now.getDay();
const today = now.toLocaleDateString();

const form = document.querySelector(".form");
const inputTitle = document.getElementById("title");
const inputStart = document.getElementById("start");
const inputEnd = document.getElementById("end");
const inputLocation = document.getElementById("location");
const inputAttendees = document.getElementById("attendees");
const inputNotes = document.getElementById("notes");

const itemsContainer = document.querySelector(".items");
const clearStorageBtn = document.querySelector(".clear-storage");

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

class Item {
  constructor(date, title, start, end, location, attendees, notes) {
    this.date = date;
    this.title = title;
    this.start = start;
    this.end = end;
    this.location = location;
    this.attendees = attendees;
    this.notes = notes;
  }
}

class App {
  #items = [];

  constructor() {
    this._getLocalStorageData();
    form.addEventListener("submit", (e) => {
      this._createNewItem(e);
    });
  }

  _getLocalStorageData() {
    const data = JSON.parse(localStorage.getItem("items"));
    if (!data) return;
    this.#items = data;
  }

  _createNewItem(e) {
    e.preventDefault();
    const date = `${selectedDate}-${selectedMonth}-${selectedYear}`;
    const title = inputTitle.value;
    const start = inputStart.value;
    const end = inputEnd.value;
    const location = inputLocation.value;
    const attendees = inputAttendees.value;
    const notes = inputNotes.value;
    let newItem = new Item(date, title, start, end, location, attendees, notes);
    this.#items.push(newItem);
    this._setLocalStorage();
    this._clearForm();
    renderLocalStorageData();
  }

  _setLocalStorage() {
    localStorage.setItem("items", JSON.stringify(this.#items));
  }

  _clearForm() {
    inputTitle.value = inputStart.value = inputEnd.value = inputLocation.value = inputAttendees.value = inputNotes.value = "";
  }
}
const app = new App();

function weekdays() {
  for (let day = 0; day < 7; day++) {
    const weekday = document.createElement("li");
    weekday.textContent = `${days[day]}`;
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
        spacer();
        spacerCounter++;
      }
    }
    const days = document.createElement("div");
    days.className = "day";
    days.textContent = `${date.getDate()}`;
    document.querySelector(".days").appendChild(days);
    date.setDate(date.getDate() + 1);
    daysCounter++;
  }
  const totalCounter = daysCounter + spacerCounter;
  if (totalCounter > 28 && totalCounter <= 35) {
    for (let spacerNr = 0; spacerNr < 35 - totalCounter; spacerNr++) {
      spacer();
    }
  }
  if (totalCounter > 35) {
    for (let spacerNr = 0; spacerNr < 42 - totalCounter; spacerNr++) {
      spacer();
    }
  }
}
fillDays(selectedYear, selectedMonth);

function spacer() {
  const spacer = document.createElement("div");
  spacer.className = "spacer";
  document.querySelector(".days").appendChild(spacer);
}

function renderLocalStorageData() {
  itemsContainer.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("items"));
  if (!data) return;
  const dayData = [];
  for (const item of data) { 
      if (+item.date.split("-")[0] === selectedDate && +item.date.split("-")[1] === selectedMonth) {
        dayData.push(item);
      }
  }
  const dayDataSorted = dayData.sort((a, b) => +a.start.replace(":", "") - +b.start.replace(":", ""));
  dayDataSorted.forEach((item) => {
    if (item.date === selectedFullDate) {
      const html = `
      <div class="item">
        <div class="item__title-div">
          <h3 class="item__title">${item.title}</h3>
        </div>
        <div class="item__time-div">
          <p class="item__time"><span class="time-start">${item.start}</span><span class="time-end">${item.end}</span></p>
        </div>
        <div class="item__location-div">
          <p class="item__location">${item.location}</p>
        </div>
        <div class="item__attendees-div">
          <p class="item__attendees">${item.attendees}</p>
        </div>
        <div class="item__notes-div">
          <p class="item__notes">${item.notes}</p>
        </div>
      </div>`;
      itemsContainer.insertAdjacentHTML("beforeend", html);
    }
  });
}
renderLocalStorageData();

function loadSelectedDate(e) {
  let target = e.target;
  if (target.className === "day") {
    const dayNr = +target.textContent;
    location.href = `day.html?date=${dayNr}-${selectedMonth}-${selectedYear}`;
  }
}

document.getElementsByClassName("day")[selectedDate - 1].classList.add("highlight");
document.querySelectorAll("a[href='month.html']")[0].href += `?date=${currentMonth}-${currentYear}`;
document.querySelectorAll("a[href='day.html']")[0].href += `?date=${currentDate}-${currentMonth}-${currentYear}`;
document.getElementsByTagName("h1")[0].textContent = `${days[selectedDay]} - ${selectedDate} - ${months[selectedMonth]} - ${selectedYear}`;

document.querySelector(".month-overview").addEventListener("click", loadSelectedDate);
clearStorageBtn.addEventListener("click", () => {
  localStorage.removeItem("items");
  renderLocalStorageData();
});



