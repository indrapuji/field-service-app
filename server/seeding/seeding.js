const { job_order } = require('../models');
const seedingData = require('./seeding.json');
async function seed() {
  const query = seedingData.map((data, idx) => {
    const tipe = idx % 2 ? 'Kunjungan' : 'Pickup';
    return {
      tanggal_impor: new Date(),
      merchant: data['Merchant'],
      mid: data['MID'],
      tid: data['TID'],
      alamat: data['Alamat'],
      kota: data['Kota'],
      no_telp: data['No. Telepon'],
      edc_connection: data['EDC Connection'],
      type_edc: data['Type EDC'],
      regional: data['Regional'],
      tipe,
      vendor_id: 1,
      teknisi_id: 4,
    };
  });
  await job_order.bulkCreate(query);
  console.log('Finish');
}
console.log('Seeding Start');
seed();
