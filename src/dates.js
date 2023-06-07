export function processSingleDate(date) {
  const strDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  const splitDate = strDate.split("-");
  const year = splitDate[0];
  const monthNumber = splitDate[1];
  const day = splitDate[2];
  const month = getMonthByNumber(monthNumber);

  return `${day} de ${month} ${year}`;
}

export function processMultipleDates(date) {
  const first = date.getDate();
  date.setDate(date.getDate() + 1);
  const second = date.getDate();
  date.setDate(date.getDate() + 1);
  const third = date.getDate();
  return `${first}, ${second} y ${third} de ${getMonthByNumber(String(date.getMonth() + 1))} ${date.getFullYear()}`;
}

export function getMonthByNumber(month) {
  switch (month) {
    case "1":
      return "enero";
    case "2":
      return "febrero";
    case "3":
      return "marzo";
    case "4":
      return "abril";
    case "5":
      return "mayo";
    case "6":
      return "junio";
    case "7":
      return "julio";
    case "8":
      return "agosto";
    case "9":
      return "septiembre";
    case "10":
      return "octubre";
    case "11":
      return "noviembre";
    case "12":
      return "diciembre";
  }
}

export function generateDatesFrom(startDate) {
  let active = true;
  const dates = [];
  const date = new Date(startDate);
  const month = date.getMonth();
  console.log(`Starting from ${date}`);

  while (active) {
    if (date.getDay() >= 2 && date.getDay() <= 5) {
      const processedDate = processSingleDate(date);
      dates.push(processedDate);
    } else if (date.getDay() === 6) {
      const processedDate = processMultipleDates(date);
      dates.push(processedDate);
    }
    date.setDate(date.getDate() + 1);

    if (date.getMonth() !== month) {
      active = false;
    }
  }

  return dates;
}
