const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDate = new Date().getDate();

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.getElementsByTagName("h1")[0].textContent = `${currentYear} - ${months[currentMonth]}`;
console.log(window.location.href);

function fillDays(year, month) {
  const date = new Date(year, month, 1);
  let daysCounter = 0,
    spacerCounter = 0;
  for (let day = 0; day < date.getDate(); day++) {
    if (date.getDate() === 1) {
      for (let spacerNr = 0; spacerNr < date.getDay(); spacerNr++) {
        const spacer = document.createElement("div");
        spacer.className = "month-spacer";
        document.querySelector(".month-overview").appendChild(spacer);
        spacerCounter++;
      }
    }
    const days = document.createElement("div");
    days.className = "month-days";
    days.textContent = `${date.getDate()}`;
    document.querySelector(".month-overview").appendChild(days);
    daysCounter++;
    date.setDate(date.getDate() + 1);
  }
  if (daysCounter + spacerCounter > 28 && daysCounter + spacerCounter < 35) {
    for (let spacerNr = 0; spacerNr < 35 - (daysCounter + spacerCounter); spacerNr++) {
      const spacer = document.createElement("div");
      spacer.className = "month-spacer";
      document.querySelector(".month-overview").appendChild(spacer);
    }
  }
  if (daysCounter + spacerCounter >= 35) {
    for (let spacerNr = 0; spacerNr < 42 - (daysCounter + spacerCounter); spacerNr++) {
      const spacer = document.createElement("div");
      spacer.className = "month-spacer";
      document.querySelector(".month-overview").appendChild(spacer);
    }
  }
}
fillDays(currentYear, currentDate);

document.getElementsByClassName("month-days")[currentDate - 1].classList.add("highlight");
