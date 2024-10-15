export const removeVietnameseAccent = (str) => {
  return str.normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "")
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}