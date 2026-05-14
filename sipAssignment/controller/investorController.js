

const {
    addInvestor,
    fetchInvestor,
    fetchHoldings,
    fetchNetWorth,
    fetchFundNAVDetails,
    fetchTransactions,
    fetchFullInvestorProfile,
    loginUser
} = require("../models/investorModel");

const { signJwt } = require("../utility/authManager");

const createInvestor = async (req, res) => {

    try {

        await addInvestor(req.body);

        res.status(201).json({
            message: "Investor created successfully"
        });

    } catch (err) {

        console.log(err);

        if (err.code === "23505") {
            return res.status(400).json({
                message: "Investor already exists"
            });
        }

        res.status(500).json({
            message: "Error creating investor"
        });
    }
};

const getInvestor = async (req, res) => {

    try {

        const investorId = req.params.investorId;

        const result = await fetchInvestor(investorId);

        if (result.rows.length === 0) {
            return res.status(404).json({
                message: "Investor not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching investor"
        });
    }
};

const getHoldings = async (req, res) => {

    try {

        const investorId = req.params.investorId;

        const result = await fetchHoldings(investorId);

        res.status(200).json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching holdings"
        });
    }
};




// GET NET WORTH

const getNetWorth = async (req, res) => {

    try {

        const investorId = req.params.investorId;

        const result = await fetchNetWorth(investorId);

        res.status(200).json(result.rows[0]);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching net worth"
        });
    }
};

const getTransactions = async (req, res) => {

    try {

        const investorId = req.params.investorId;

        const result = await fetchTransactions(investorId);

        res.status(200).json(result.rows);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: "Error fetching transactions"
        });
    }
};

const getFundNAVDetails =
    async (req, res) => {

        try {

            const investorId =
                req.params.investorId;

            const result =
                await fetchFundNAVDetails(
                    investorId
                );

            // TOTAL NAV

            const totalNAV =
                result.rows.reduce(
                    (
                        total,
                        item
                    ) =>
                        total +
                        Number(
                            item.total_fund_value
                        ),
                    0
                );

            return res.status(200).json({

                total_nav:
                    totalNAV,

                funds:
                    result.rows
            });

        } catch (err) {

            console.log(err);

            return res.status(500).json({
                message:
                    "Error fetching NAV details"
            });
        }
    };
const getFullInvestorProfile =
    async (req, res) => {

        try {

            const investorId =
                req.params.investorId;

            const result =
                await fetchFullInvestorProfile(
                    investorId
                );

            res.status(200).json(
                result.rows
            );

        } catch (err) {

            console.log(err);

            res.status(500).json({
                message:
                    "Error fetching profile"
            });
        }
    };



const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Check empty fields
        if (!email || !password) {

            return res.status(400).json({
                message: "Email and Password required"
            });
        }

        // Fetch user from database
        const result = await loginUser(email);

        // User not found
        if (result.rows.length === 0) {

            return res.status(401).json({
                message: "User not found"
            });
        }

        const user = result.rows[0];

        console.log("DB Password:", user.password);
        console.log("Entered Password:", password);

        // Password validation
        if (String(user.password).trim() !== String(password).trim()) {

            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        // Generate token
        const token = signJwt({
            email: user.email,
            userId: user.user_id
        });

        return res.status(200).json({
            message: "Login Success",
            token,
            investorId: user.investor_id,
            userId: user.user_id,
            email: user.email
        });

    } catch (err) {

        console.log(err);

        return res.status(500).json({
            message: "Login Error"
        });
    }
};

module.exports = {
    createInvestor,
    getInvestor,
    getHoldings,
    getNetWorth,
    getFundNAVDetails,
    getFullInvestorProfile,
    getTransactions,
    login
};