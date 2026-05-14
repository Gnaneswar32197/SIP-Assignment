

const express = require("express");

const router = express.Router();

const {
    login,
    createInvestor,
    getInvestor,
    getHoldings,
    getFundNAVDetails,
    getTransactions,
    getFullInvestorProfile,
    getNetWorth
} = require("../controller/investorController");

router.post("/login", login);

router.post("/", createInvestor);

router.get("/:investorId", getInvestor);

router.get("/:investorId/holdings", getHoldings);

router.get("/:investorId/networth", getNetWorth);

router.get("/:investorId/transactions", getTransactions);
router.get("/:investorId/fundnav",getFundNAVDetails);
router.get("/:investorId/profile", getFullInvestorProfile);

module.exports = router;