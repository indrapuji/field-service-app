module.exports = (date, days = 0) => {
	const result = new Date(Number(date));
	result.setDate(date.getDate() - days);
	return result
}