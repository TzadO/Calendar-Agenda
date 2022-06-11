"use strict";

const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDate = new Date().getDate();

function addCurrentDates() {
  document.querySelector("a[href='month.html']").href += `?date=${currentMonth}-${currentYear}`;
  document.querySelector("a[href='day.html']").href += `?date=${currentDate}-${currentMonth}-${currentYear}`;
  document.getElementsByTagName("h1")[0].textContent = `${currentYear}`;
}


function layout() {
  const calendar = document.createElement("div");
  calendar.className = "calendar";
  document.getElementsByTagName("main")[0].appendChild(calendar);
  document.querySelector(".calendar").addEventListener("click", loadSelectedDate);
  
  for (let month = 0; month < 12; month++) {
    const month = document.createElement("div");
    month.className = "month";
    document.querySelector(".calendar").appendChild(month);
  }
  
  for (let month = 0; month < 12; month++) {
    const weekdays = document.createElement("div");
    weekdays.className = "weekdays";
    document.getElementsByClassName("month")[month].appendChild(weekdays);
  }
  
  for (let month = 0; month < 12; month++) {
    const weekdaysList = document.createElement("ul");
    weekdaysList.className = "weekdays-list";
    document.getElementsByClassName("weekdays")[month].appendChild(weekdaysList);
  }
  
  for (let month = 0; month < 12; month++) {
    const days = document.createElement("div");
    days.className = "days";
    document.getElementsByClassName("month")[month].appendChild(days);
  }
}


function fillMonths() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  for (let month = 0; month < 12; month++) {
    const monthName = document.createElement("h2");
    monthName.className = "month-name";
    monthName.textContent = `${months[month]}`;
    const monthEl = document.getElementsByClassName("month")[month];
    monthEl.insertBefore(monthName, monthEl.firstChild);
  }
}


function fillWeekdays() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let month = 0; month < 12; month++) {
    for (let day = 0; day < 7; day++) {
      const weekday = document.createElement("li");
      weekday.textContent = `${weekdays[day]}`;
      const currentMonthEl = document.getElementsByClassName("weekdays-list")[month];
      currentMonthEl.appendChild(weekday);
    }
  }
}


function fillDays(year) {
  const date = new Date(year, 0, 1);
  const days = document.getElementsByClassName("days");
  for (let month = 0; month < date.getMonth() + 1; month++) {
    let daysElCounter = 0, spacerElCounter = 0;

    for (let day = 0; day < date.getDate(); day++) {
      
      if (date.getDate() === 1) {
        for (let spacerNr = 0; spacerNr < date.getDay(); spacerNr++) {
          const spacer = document.createElement("div");
          spacer.className = "spacer";
          days[date.getMonth()].appendChild(spacer);
          spacerElCounter++;
        }
      }
      
      const dayEl = document.createElement("div");
      dayEl.textContent = `${day + 1}`;
      dayEl.className = "day";
      dayEl.setAttribute("id", `${day + 1}-${month}-${year}`);
      days[date.getMonth()].appendChild(dayEl);
      daysElCounter++;
      date.setDate(date.getDate() + 1);
    }

    for (let spacerNr = 0; spacerNr < 42 - (daysElCounter + spacerElCounter); spacerNr++) {
      const spacer = document.createElement("div");
      spacer.className = "spacer";
      days[(date.getMonth() + 11) % 12].appendChild(spacer);
    }
  }

  document.getElementsByClassName("month")[currentMonth].getElementsByClassName("day")[currentDate - 1].classList.add("highlight");
}


function renderlocalStorageData() {
  const data = JSON.parse(localStorage.getItem("items"));
  if (!data) return;
  data.forEach((item) => {
    document.getElementById(`${item.date}`).classList.add("planned");
  });
}


function loadSelectedDate(e) {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let target = e.target;
  if (target.classList.contains('day')) {
    const dayNr = +target.textContent;
    const monthNr = months.indexOf(target.parentNode.parentNode.firstChild.textContent);
    location.href = `day.html?date=${dayNr}-${monthNr}-${currentYear}`;
  }
  if (target.tagName === "H2") {
    const monthNr = months.indexOf(target.textContent);
    location.href = `month.html?date=${monthNr}-${currentYear}`;
  }
}

layout();
fillMonths();
fillWeekdays();
fillDays(currentYear)
addCurrentDates()
renderlocalStorageData();