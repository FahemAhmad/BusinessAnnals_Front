const monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function dateFormat(date) {
  let getDate = date.split("T");
  getDate = getDate[0].split("-");
  const year = getDate[0];
  const month = monthName[parseInt(getDate[1])];
  const day = getDate[2];
  return `${day} ${month} ${year}`;
}
