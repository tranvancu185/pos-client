import dayjs from 'dayjs';

export const isValidDateString = (date = '', format = 'YYYY-MM-DD', check = false) => {
  const defaultFormat = 'YYYY-MM';
  if(check) {
    let dateTemp = '20' + date;
    return (dayjs(dateTemp, format, true).format(format) === date) ? dayjs(dateTemp, defaultFormat, true).format(defaultFormat) : false;
  }
  return dayjs(date, format, true).format(format) === date;
};

export const checkEqualDateString = (date = '', date2 = '', format = 'YYYY-MM-DD', check = false) => {
  if(check) {
    let dateTemp = '20' + date;
    return (dayjs(dateTemp, format, true).format(format) === dayjs(date2, format, true).format(format)) ? true : false;
  }
  return dayjs(date, format, true).format(format) === dayjs(date2, format, true).format(format);
};

export const convertDateTimeToFormat = (date = '', format = 'YYYY-MM-DD', check = false) => {
  if (check) {
    let dateTemp = '20' + date;
    return dayjs(dateTemp, format, true).format(format);
  }
  return dayjs(date, format, true).format(format);
};
