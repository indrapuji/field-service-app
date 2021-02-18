module.exports = getWeekOfMonth = (date) => {
	const monthNames = [{
		month: "Januari",
	},{
		month: "Februari",
	},{
		month: "Maret",
	},{
		month: "April",
	},{
		month: "Mei",
	},{
		month: "Juni",
	},{
		month: "Juli",
	},{
		month: "Agustus",
	},{
		month: "September",
	},{
		month: "Oktober",
	},{
		month: "November",
	},{
		month: "Desember",
	}];
	let temp = monthNames[date.getMonth()];
	temp.week = Math.floor(date.getDate() / 7) + 1;
	const dayNames = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
	temp.dayOfWeek = date.getDay() - 1 !== -1 ? date.getDay() - 1 : 6;
	temp.nameOfDay = dayNames[date.getDay() - 1 !== -1 ? date.getDay() - 1 : 6];
	temp.year = date.getFullYear();
	temp.days = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return temp;
}