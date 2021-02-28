const getColumn = (newData) => {
  let column = [];
  let newKey = '';

  for (let key in newData[0]) {
    if (key !== 'id' && key !== 'updatedAt' && key !== 'edc_kompetitor') {
      if (key === 'createdAt') {
        newKey = 'TANGGAL IMPORT';
        column.push({ header: newKey, field: key });
      } else {
        column.push({ header: key.toUpperCase().replace(/_/g, ' '), field: key });
      }
    }
  }
  return column;
};

export default getColumn;
