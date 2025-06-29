const {
  posttaxInvestmentController,
  getTaxInvestmentController,
  post80GDonationController,
  get80GDonationController,
  postRuralGDonationController,
  getRuralDonationController,
  postContriPartyController,
  getContriPartyController,
  postMedical80DController,
  getMedical80DController,
  postDisablityController,
  getDisablilityController,
  postSpecficDieaseController,
  getSpecificDieaseaseController,
  postLoansController,
  getLoansController,
  postOtherDeductionController,
  getOtherDeductionController,
  postSelfTaxPaidController,
  getSelfTaxPaidController,
  updateSelfTaxData,
  postNonSalaryController,
  getNonSalaryController,
  postTDSRentController,
  getTDSRentController,
  postTaxCollectedController,
  getTaxCollectedController,
  postDepLossController,
  getDepLossController,
  updateDeptLoss,
} = require("../controller/taxSavingController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = require("express").Router();

router.put("/postTaxInvestment", authMiddleware, posttaxInvestmentController);
router.get("/getTaxInvestment", authMiddleware, getTaxInvestmentController);
router.put("/postDonation80G", authMiddleware, post80GDonationController);
router.get("/getDonation80G", authMiddleware, get80GDonationController);
router.put("/postRurualDonation", authMiddleware, postRuralGDonationController);
router.get("/getRuralDonation", authMiddleware, getRuralDonationController);
router.put("/postContriParty", authMiddleware, postContriPartyController);
router.get("/getContriParty", authMiddleware, getContriPartyController);
router.put("/postMedical80D", authMiddleware, postMedical80DController);
router.get("/getMedical80D", authMiddleware, getMedical80DController);
router.put("/postDisablity", authMiddleware, postDisablityController);
router.get("/getDisablity", authMiddleware, getDisablilityController);
router.put(
  "/postSpecificDisablity",
  authMiddleware,
  postSpecficDieaseController
);
router.get(
  "/getSpecificDisablity",
  authMiddleware,
  getSpecificDieaseaseController
);
router.put("/postLoansData", authMiddleware, postLoansController);
router.get("/getLoansData", authMiddleware, getLoansController);
router.put("/postOtherDeduction", authMiddleware, postOtherDeductionController);
router.get("/getOtherDeduction", authMiddleware, getOtherDeductionController);
router.post("/postSelfTaxPaid", authMiddleware, postSelfTaxPaidController);
router.get("/getSelfTaxPaid", authMiddleware, getSelfTaxPaidController);
router.post("/updateSelfTaxPaid", authMiddleware, updateSelfTaxData);
router.put("/postNonSalary", authMiddleware, postNonSalaryController);
router.get("/getNonSalary", authMiddleware, getNonSalaryController);
router.put("/postTDSRent", authMiddleware, postTDSRentController);
router.get("/getTDSRent", authMiddleware, getTDSRentController);
router.put("/postTaxCollected", authMiddleware, postTaxCollectedController);
router.get("/getTaxCollected", authMiddleware, getTaxCollectedController);
router.post("/postDepLoss", authMiddleware, postDepLossController);
router.get("/getDepLoss", authMiddleware, getDepLossController);
router.post("/updateDepLoss", authMiddleware, updateDeptLoss);
module.exports = router;
