const { job_order } = require("../models");
const getWeekOfMonth = require("../helpers/getWeekOfMonth");
const getDate = require("../helpers/getDate");
const { Op } = require("sequelize");

class DashboardController {
	static home = async (req, res, next) => {
		try {
			const jobOrderKunjunganCount = await job_order.count({ where: { tipe: "Kunjungan" } });
			const jobOrderPickupCount = await job_order.count({ where: { tipe: "Pickup" } });
			const jobOrderSurveyCount = await job_order.count({ where: { tipe: "Survey" } });
			const jobOrderRiskCount = await job_order.count({ where: { tipe: "Risk" } });
			let allRegional = await job_order.findAll({
				attributes: ["id", "regional"]
			});
			allRegional = allRegional.map(data => data.regional);
			allRegional = [...new Set(allRegional)];
			allRegional = await Promise.all(allRegional.map(async data => {
				const result = await job_order.count({ where: { "regional": data } });
				return {
					regional: data,
					count: result
				};
			}));
			const jobOrderAssignStatusCount = await job_order.count({ where: { status: "Assign" } });
			const jobOrderProgresStatusCount = await job_order.count({ where: { status: "Progres" } });
			const jobOrderDoneStatusCount = await job_order.count({ where: { status: "Done" } });
			const jobOrderUnassignStatusCount = await job_order.count({ where: { status: "Unassign" } });
			const dateData = getWeekOfMonth(new Date());
			let dayNames = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
			dayNames = await Promise.all(dayNames.map(async (data, idx) => {
				if (idx <= dateData.dayOfWeek) {
					const tempMinus = dateData.dayOfWeek - idx;
					const from = getDate(new Date(), tempMinus).setHours(0,0,0,0);
					const until = getDate(new Date(), tempMinus).setHours(24,0,0,0);
					const jobOrderKunjunganCount = await job_order.count({
						where: {
							tipe: "Kunjungan",
							createdAt: {
								[Op.between]: [from, until]
							}
						}
					});
					const jobOrderPickupCount = await job_order.count({
						where: {
							tipe: "Pickup",
							createdAt: {
								[Op.between]: [from, until]
							}
						}
					});
					const jobOrderSurveyCount = await job_order.count({
						where: {
							tipe: "Survey",
							createdAt: {
								[Op.between]: [from, until]
							}
						}
					});
					const jobOrderRiskCount = await job_order.count({
						where: {
							tipe: "Risk",
							createdAt: {
								[Op.between]: [from, until]
							}
						}
					});
					return {
						hari: data,
						jobOrderKunjunganCount,
						jobOrderPickupCount,
						jobOrderSurveyCount,
						jobOrderRiskCount,
					}
				} else {
					return {
						hari: data
					};
				}
			}));
			const fromProgress = getDate(new Date(), dateData.dayOfWeek - 1).setHours(0,0,0,0);
			const untilProgress = getDate(new Date(), dateData.dayOfWeek - dateData.dayOfWeek).setHours(24,0,0,0);
			const jobOrderKunjunganCountProgress = await job_order.count({
				where: {
					tipe: "Kunjungan",
					createdAt: {
						[Op.between]: [fromProgress, untilProgress]
					}
				}
			});
			const jobOrderPickupCountProgress = await job_order.count({
				where: {
					tipe: "Pickup",
					createdAt: {
						[Op.between]: [fromProgress, untilProgress]
					}
				}
			});
			const jobOrderSurveyCountProgress = await job_order.count({
				where: {
					tipe: "Survey",
					createdAt: {
						[Op.between]: [fromProgress, untilProgress]
					}
				}
			});
			const jobOrderRiskCountProgress = await job_order.count({
				where: {
					tipe: "Risk",
					createdAt: {
						[Op.between]: [fromProgress, untilProgress]
					}
				}
			});
			let traffic = [...Array(dateData.days).keys()]
			traffic = await Promise.all(traffic.map(async (data, idx) => {
				const day = data + 1;
				const date = new Date();
				const from = new Date(date.getFullYear(), date.getMonth(), day + 1).setHours(0,0,0,0);
				const until = new Date(date.getFullYear(), date.getMonth(), day + 1).setHours(24,0,0,0);
				const merchantBuka = await job_order.count({
					where: {
						merchant_open: "buka"
					},
					where: {
					tipe: "Survey",
					createdAt: {
						[Op.between]: [from, until]
					}
				}
				});
				const merchantTutup = await job_order.count({
					where: {
						merchant_open: "tutup"
					},
					where: {
					tipe: "Survey",
					createdAt: {
						[Op.between]: [from, until]
					}
				}
				});
				const merchantTetap = await job_order.count({
					where: {
						kondisi_merchant: "tetap"
					},
					where: {
					tipe: "Survey",
					createdAt: {
						[Op.between]: [from, until]
					}
				}
				});
				const merchantPindah = await job_order.count({
					where: {
						kondisi_merchant: "pindah"
					},
					where: {
					tipe: "Survey",
					createdAt: {
						[Op.between]: [from, until]
					}
				}
				});
				return {
					day,
					merchantBuka,
					merchantTutup,
					merchantTetap,
					merchantPindah,
				};
			}));
			const date = new Date();
			const firstDay = new Date(date.getFullYear(), date.getMonth(), 2).setHours(0,0,0,0);
			const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).setHours(24,0,0,0);
			const merchantBuka = await job_order.count({
				where: {
					merchant_open: "buka"
				},
				where: {
				tipe: "Survey",
				createdAt: {
					[Op.between]: [firstDay, lastDay]
				}
			}
			});
			const merchantTutup = await job_order.count({
				where: {
					merchant_open: "tutup"
				},
				where: {
				tipe: "Survey",
				createdAt: {
					[Op.between]: [firstDay, lastDay]
				}
			}
			});
			const merchantTetap = await job_order.count({
				where: {
					kondisi_merchant: "tetap"
				},
				where: {
				tipe: "Survey",
				createdAt: {
					[Op.between]: [firstDay, lastDay]
				}
			}
			});
			const merchantPindah = await job_order.count({
				where: {
					kondisi_merchant: "pindah"
				},
				where: {
				tipe: "Survey",
				createdAt: {
					[Op.between]: [firstDay, lastDay]
				}
			}
			});
			res.status(200).json({
				jobOrderKunjunganCount,
				jobOrderPickupCount,
				jobOrderRiskCount,
				jobOrderSurveyCount,
				allRegional,
				jobOrderAssignStatusCount,
				jobOrderProgresStatusCount,
				jobOrderDoneStatusCount,
				jobOrderUnassignStatusCount,
				dayNames,
				dateData,
				jobOrderKunjunganCountProgress,
				jobOrderPickupCountProgress,
				jobOrderSurveyCountProgress,
				jobOrderRiskCountProgress,
				traffic,
				merchantBuka,
				merchantTutup,
				merchantTetap,
				merchantPindah,
			});
		} catch (err) {
			next(err);
		}
	}
};

module.exports = DashboardController;
