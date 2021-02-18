const { job_order, user } = require("../models");
const getWeekOfMonth = require("../helpers/getWeekOfMonth");
const getDate = require("../helpers/getDate");
const { Op } = require("sequelize");
const createError = require("http-errors");

class DashboardController {
	static home = async (req, res, next) => {
		try {
			const { id } = req.UserData;
			const userData = await user.findOne({ where: { id } });
			if (!userData) throw createError(401, "User not Found");
			if (!userData.vendor_id && userData.tipe !== "Super Admin") throw createError(400, "User have no vendor");

			let jobOrderKunjunganCountQuery = { where: { tipe: "Kunjungan" } };
			if (userData.tipe !== "Super Admin") jobOrderKunjunganCountQuery.where.vendor_id = userData.vendor_id;
			const jobOrderKunjunganCount = await job_order.count(jobOrderKunjunganCountQuery);

			let jobOrderPickupCountQuery = { where: { tipe: "Pickup" } }
			if (userData.tipe !== "Super Admin") jobOrderPickupCountQuery.where.vendor_id = userData.vendor_id;
			const jobOrderPickupCount = await job_order.count(jobOrderPickupCountQuery);

			let jobOrderSurveyCountQuery = { where: { tipe: "Survey" } }
			if (userData.tipe !== "Super Admin") jobOrderSurveyCountQuery.where.vendor_id = userData.vendor_id;
			const jobOrderSurveyCount = await job_order.count(jobOrderSurveyCountQuery);

			let jobOrderRiskCountQuery = { where: { tipe: "Risk" } }
			if (userData.tipe !== "Super Admin") jobOrderRiskCountQuery.where.vendor_id = userData.vendor_id;
			const jobOrderRiskCount = await job_order.count(jobOrderRiskCountQuery);

			let allRegionalQuery = {
				attributes: ["id", "regional"]
			};
			if (userData.tipe !== "Super Admin") allRegionalQuery.where = { vendor_id: userData.vendor_id };
			let allRegional = await job_order.findAll(allRegionalQuery);

			allRegional = allRegional.map(data => data.regional);
			allRegional = [...new Set(allRegional)];
			allRegional = await Promise.all(allRegional.map(async data => {
				let resultQuery = { where: { "regional": data } };
				if (userData.tipe !== "Super Admin") resultQuery.where.vendor_id = userData.vendor_id;
				const result = await job_order.count(resultQuery);
				return {
					regional: data,
					count: result
				};
			}));

			const date = new Date();
			const firstDay = new Date(date.getFullYear(), date.getMonth(), 2).setHours(0,0,0,0);
			const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 1).setHours(24,0,0,0);
			// ============

			let jobOrderKunjunganTipeCountQuery = {
				where: {
					tipe: "Kunjungan",
					createdAt: {
						[Op.between]: [firstDay, lastDay]
					}
				}
			};
			if (userData.tipe !== "Super Admin") jobOrderKunjunganTipeCountQuery.where.vendor_id = userData.vendor_id;
			const jobOrderKunjunganTipeCount = await job_order.count(jobOrderKunjunganTipeCountQuery);

			let jobOrderPickupTipeCountQuery = {
				where: {
					tipe: "Pickup",
					createdAt: {
						[Op.between]: [firstDay, lastDay]
					}
				}
			};
			if (userData.tipe !== "Super Admin") jobOrderPickupTipeCountQuery.where.vendor_id = userData.vendor_id;
			const jobOrderPickupTipeCount = await job_order.count(jobOrderPickupTipeCountQuery);

			let jobOrderSurveyCountTipeQuery = {
				where: {
					tipe: "Survey",
					createdAt: {
						[Op.between]: [firstDay, lastDay]
					}
				}
			};
			if (userData.tipe !== "Super Admin") jobOrderSurveyCountTipeQuery.where.vendor_id = userData.vendor_id;
			const jobOrderSurveyCountTipe = await job_order.count(jobOrderSurveyCountTipeQuery);

			let jobOrderRiskCountTipeQuery = {
				where: {
					tipe: "Risk",
					createdAt: {
						[Op.between]: [firstDay, lastDay]
					}
				}
			};
			if (userData.tipe !== "Super Admin") jobOrderRiskCountTipeQuery.where.vendor_id = userData.vendor_id;
			const jobOrderRiskCountTipe = await job_order.count(jobOrderRiskCountTipeQuery);
			
			// ============
			let jobOrderAssignStatusCountQuery = {
				where: {
					status: "Assign",
					createdAt: {
						[Op.between]: [firstDay, lastDay]
					}
				}
			}
			if (userData.tipe !== "Super Admin") jobOrderAssignStatusCountQuery.where.vendor_id = userData.vendor_id;
			const jobOrderAssignStatusCount = await job_order.count(jobOrderAssignStatusCountQuery);

			let jobOrderProgresStatusCountQuery = {
				where: {
					status: "Progres",
					createdAt: {
						[Op.between]: [firstDay, lastDay]
					}
				}
			}
			if (userData.tipe !== "Super Admin") jobOrderProgresStatusCountQuery.where.vendor_id = userData.vendor_id;
			const jobOrderProgresStatusCount = await job_order.count(jobOrderProgresStatusCountQuery);

			let jobOrderDoneStatusCountQuery = {
				where: {
					status: "Done",
					createdAt: {
						[Op.between]: [firstDay, lastDay]
					}
				}
			}
			if (userData.tipe !== "Super Admin") jobOrderDoneStatusCountQuery.where.vendor_id = userData.vendor_id;
			const jobOrderDoneStatusCount = await job_order.count(jobOrderDoneStatusCountQuery);

			let jobOrderUnassignStatusCountQuery = {
				where: {
					status: "Unassign",
					createdAt: {
						[Op.between]: [firstDay, lastDay]
					}
				}
			}
			if (userData.tipe !== "Super Admin") jobOrderUnassignStatusCountQuery.where.vendor_id = userData.vendor_id;
			const jobOrderUnassignStatusCount = await job_order.count(jobOrderUnassignStatusCountQuery);

			const dateData = getWeekOfMonth(new Date());
			let dayNames = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
			dayNames = await Promise.all(dayNames.map(async (data, idx) => {
				if (idx <= dateData.dayOfWeek) {
					const tempMinus = dateData.dayOfWeek - idx;
					const from = getDate(new Date(), tempMinus).setHours(0,0,0,0);
					const until = getDate(new Date(), tempMinus).setHours(24,0,0,0);

					let jobOrderKunjunganCountQuery = {
						where: {
							tipe: "Kunjungan",
							status: "Done",
							createdAt: {
								[Op.between]: [from, until]
							}
						}
					}
					if (userData.tipe !== "Super Admin") jobOrderKunjunganCountQuery.where.vendor_id = userData.vendor_id;
					const jobOrderKunjunganCount = await job_order.count(jobOrderKunjunganCountQuery);

					let jobOrderPickupCountQuery = {
						where: {
							tipe: "Pickup",
							status: "Done",
							createdAt: {
								[Op.between]: [from, until]
							}
						}
					}
					if (userData.tipe !== "Super Admin") jobOrderPickupCountQuery.where.vendor_id = userData.vendor_id;
					const jobOrderPickupCount = await job_order.count(jobOrderPickupCountQuery);

					let jobOrderSurveyCountQuery = {
						where: {
							tipe: "Survey",
							status: "Done",
							createdAt: {
								[Op.between]: [from, until]
							}
						}
					}
					if (userData.tipe !== "Super Admin") jobOrderSurveyCountQuery.where.vendor_id = userData.vendor_id;
					const jobOrderSurveyCount = await job_order.count(jobOrderSurveyCountQuery);

					let jobOrderRiskCountQuery = {
						where: {
							tipe: "Risk",
							status: "Done",
							createdAt: {
								[Op.between]: [from, until]
							}
						}
					}
					if (userData.tipe !== "Super Admin") jobOrderRiskCountQuery.where.vendor_id = userData.vendor_id;
					const jobOrderRiskCount = await job_order.count(jobOrderRiskCountQuery);

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

			let jobOrderKunjunganCountProgressQuery = {
				where: {
					tipe: "Kunjungan",
					status: "Done",
					createdAt: {
						[Op.between]: [fromProgress, untilProgress]
					}
				}
			};
			if (userData.tipe !== "Super Admin") jobOrderKunjunganCountProgressQuery.where.vendor_id = userData.vendor_id;
			const jobOrderKunjunganCountProgress = await job_order.count(jobOrderKunjunganCountProgressQuery);

			let jobOrderPickupCountProgressQuery = {
				where: {
					tipe: "Pickup",
					status: "Done",
					createdAt: {
						[Op.between]: [fromProgress, untilProgress]
					}
				}
			};
			if (userData.tipe !== "Super Admin") jobOrderPickupCountProgressQuery.where.vendor_id = userData.vendor_id;
			const jobOrderPickupCountProgress = await job_order.count(jobOrderPickupCountProgressQuery);

			let jobOrderSurveyCountProgressQuery = {
				where: {
					tipe: "Survey",
					status: "Done",
					createdAt: {
						[Op.between]: [fromProgress, untilProgress]
					}
				}
			};
			if (userData.tipe !== "Super Admin") jobOrderSurveyCountProgressQuery.where.vendor_id = userData.vendor_id;
			const jobOrderSurveyCountProgress = await job_order.count(jobOrderSurveyCountProgressQuery);

			let jobOrderRiskCountProgressQuery = {
				where: {
					tipe: "Risk",
					status: "Done",
					createdAt: {
						[Op.between]: [fromProgress, untilProgress]
					}
				}
			};
			if (userData.tipe !== "Super Admin") jobOrderRiskCountProgressQuery.where.vendor_id = userData.vendor_id;
			const jobOrderRiskCountProgress = await job_order.count(jobOrderRiskCountProgressQuery);

			let traffic = [...Array(dateData.days).keys()]
			traffic = await Promise.all(traffic.map(async (data, idx) => {
				const day = data + 1;
				const date = new Date();
				const from = new Date(date.getFullYear(), date.getMonth(), day + 1).setHours(0,0,0,0);
				const until = new Date(date.getFullYear(), date.getMonth(), day + 1).setHours(24,0,0,0);
				let merchantBukaQuery = {
					where: {
						merchant_open: "buka",
						status: "Done",
						createdAt: {
							[Op.between]: [from, until]
						}
					},
				};
				if (userData.tipe !== "Super Admin") merchantBukaQuery.where.vendor_id = userData.vendor_id;
				const merchantBuka = await job_order.count(merchantBukaQuery);

				let merchantTutupQuery = {
					where: {
						merchant_open: "tutup",
						status: "Done",
						createdAt: {
							[Op.between]: [from, until]
						}
					},
				};
				if (userData.tipe !== "Super Admin") merchantTutupQuery.where.vendor_id = userData.vendor_id;
				const merchantTutup = await job_order.count(merchantTutupQuery);

				let merchantTetapQuery = {
					where: {
						kondisi_merchant: "tetap",
						status: "Done",
						createdAt: {
							[Op.between]: [from, until]
						}
					},
				};
				if (userData.tipe !== "Super Admin") merchantTetapQuery.where.vendor_id = userData.vendor_id;
				const merchantTetap = await job_order.count(merchantTetapQuery);

				let merchantPindahQuery = {
					where: {
						kondisi_merchant: "pindah",
						status: "Done",
						createdAt: {
							[Op.between]: [from, until]
						}
					},
				};
				if (userData.tipe !== "Super Admin") merchantPindahQuery.where.vendor_id = userData.vendor_id;
				const merchantPindah = await job_order.count(merchantPindahQuery);

				return {
					day,
					merchantBuka,
					merchantTutup,
					merchantTetap,
					merchantPindah,
				};
			}));

			let merchantBukaQuery = {
				where: {
					merchant_open: "buka",
					status: "Done",
					createdAt: {
						[Op.between]: [firstDay, lastDay]
					}
				},
			};
			if (userData.tipe !== "Super Admin") merchantBukaQuery.where.vendor_id = userData.vendor_id;
			const merchantBuka = await job_order.count(merchantBukaQuery);

			let merchantTutupQuery = {
				where: {
					merchant_open: "tutup",
					status: "Done",
					createdAt: {
						[Op.between]: [firstDay, lastDay]
					}
				},
			};
			if (userData.tipe !== "Super Admin") merchantTutupQuery.where.vendor_id = userData.vendor_id;
			const merchantTutup = await job_order.count(merchantTutupQuery);

			let merchantTetapQuery = {
				where: {
					kondisi_merchant: "tetap",
					status: "Done",
					createdAt: {
						[Op.between]: [firstDay, lastDay]
					}
				},
			};
			if (userData.tipe !== "Super Admin") merchantTetapQuery.where.vendor_id = userData.vendor_id;
			const merchantTetap = await job_order.count(merchantTetapQuery);

			let merchantPindahQuery = {
				where: {
					kondisi_merchant: "pindah",
					status: "Done",
					createdAt: {
						[Op.between]: [firstDay, lastDay]
					}
				},
			};
			if (userData.tipe !== "Super Admin") merchantPindahQuery.where.vendor_id = userData.vendor_id;
			const merchantPindah = await job_order.count(merchantPindahQuery);

			console.log(userData.tipe);
			res.status(200).json({
				jobOrderKunjunganCount,
				jobOrderPickupCount,
				jobOrderRiskCount,
				jobOrderSurveyCount,
				allRegional,
				jobOrderKunjunganTipeCount,
				jobOrderPickupTipeCount,
				jobOrderRiskCountTipe,
				jobOrderSurveyCountTipe,
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
