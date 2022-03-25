const formattedNumber = (number: number): string => {
  let formatted = number;
  let unit = "";

  if (number >= 1000000) {
    //m
    formatted = Math.floor(number / 100000) / 10;
    unit = "M";
  } else if (number >= 1000) {
    //k
    formatted = Math.floor(number / 100) / 10;
    unit = "K";
  }

  return `${formatted}${unit}`;
};

export default formattedNumber;
