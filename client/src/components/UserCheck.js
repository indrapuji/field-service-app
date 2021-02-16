const CheckUser = (newData) => {
  const result = [];
  const tipe = localStorage.getItem('tipe');
  for (let i = 0; i < newData.length; i++) {
    if (tipe === 'Admin') {
      if (newData[i].tipe === 'Teknisi') {
        result.push(newData[i]);
      }
    } else if (tipe === 'Super Admin') {
      if (newData[i].tipe !== 'Super Admin') {
        result.push(newData[i]);
      }
    }
  }
  return result;
};

export default CheckUser;
