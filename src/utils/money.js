// export default (value, show_unit='VNĐ')=>{
//     let unit = show_unit ? ' ' + show_unit : ''
//     return value !== null || value !== undefined ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + unit : value
// }
export default (input, show_unit) => {//show_unit='VNĐ'
  let unit = show_unit ? ' ' + show_unit : ''
  let value = input + '';
  value = value.replace(/,/g, '')
  const reg = /^-?[0-9,]*(\.[0-9]*)?$/;
  if (!isNaN(value) && reg.test(value)) {
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
      result = `,${num.slice(-3)}${result}`;
      num = num.slice(0, num.length - 3);
    }
    if (num) {
      result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}${unit}`;
  }

  return input || ''
}

export const convertToNumber = (value) => {
  return parseFloat(value.replace(/,/g,''));
}

export const convertStringToMoney = (value) => {
  let result = 0;
  if(typeof value === 'number') {
    result = value;
  } else {
    if(value && value !== "") {
      value = value.replaceAll(",", "");
      let isnum = /^\d+$/.test(value.trim());
      if(isnum || value.trim().length === 0){
        value = parseInt(value);
        value = value ? value : 0;
        result = value;
      }
    }
  }
  return result;
}

export const roundingMoney = (value) => {
  return Math.floor((+value)/1000)*1000;
}