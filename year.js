const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDate = new Date().getDate();

document.getElementsByTagName("h1")[0].textContent = `${currentYear}`;

const calendar = document.createElement('div');
calendar.className = 'calendar';
document.getElementsByTagName('main')[0].appendChild(calendar);


function layout() {
  for (let month = 0; month < 12; month++) {
    const month = document.createElement('div');
    month.className = 'month';  
    document.querySelector('.calendar').appendChild(month);
  }
  for (let month = 0; month < 12; month++) {
    const weekdays = document.createElement('div');
    weekdays.className = 'weekdays';
    document.getElementsByClassName( 'month')[month].appendChild(weekdays);
  }
  for (let month = 0; month < 12; month++) {
    const weekdaysList = document.createElement('ul');
    weekdaysList.className = 'weekdays-list';
    document.getElementsByClassName('weekdays')[month].appendChild(weekdaysList);
  }
  for (let month = 0; month < 12; month++) { 
    const days = document.createElement('div');
    days.className = 'days';
    document.getElementsByClassName('month')[month].appendChild(days);
  }
}
layout();

function fillMonths() {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  for (let month = 0; month < 12; month++) {
    const monthName = document.createElement("h2");
    monthName.textContent = `${months[month]}`;
    const monthEl = document.getElementsByClassName("month")[month];
    monthEl.insertBefore(monthName, monthEl.firstChild);
  }
}
fillMonths();

function weekdays() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  for (let month = 0; month < 12; month++) {
    for (let day = 0; day < 7; day++) {
      const weekday = document.createElement("li");
      weekday.textContent = `${weekdays[day]}`;
      const currentMonthEl = document.getElementsByClassName('weekdays-list')[month];
      currentMonthEl.appendChild(weekday);
    }
  }
}
weekdays();

function fillDays(year) {
  const date = new Date(year, 0, 1);
  const days = document.getElementsByClassName("days");
  for (let month = -1; month < date.getMonth(); month++) {
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
      const day = document.createElement("div");
      day.className = "day";
      day.textContent = `${date.getDate()}`;
      days[date.getMonth()].appendChild(day);
      daysElCounter++;
      date.setDate(date.getDate() + 1);
    }
    for (let spacerNr = 0; spacerNr < 42 - (daysElCounter + spacerElCounter); spacerNr++) {
      const spacer = document.createElement("div");
      spacer.className = "spacer";
      days[(date.getMonth() + 11) % 12].appendChild(spacer);
    }
  }
}
fillDays(currentYear);

document.getElementsByClassName('month')[currentMonth].getElementsByClassName('day')[currentDate - 1].classList.add('highlight');

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); 
}