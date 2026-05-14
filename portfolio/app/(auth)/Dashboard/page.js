"use client";

import InvestorIDContext from "@/app/core/context/InvestorIDContext";
import ProfileContext from "@/app/core/context/ProfileContext";

import { useContext, useEffect, useState } from "react";

export default function Dashboard() {

    const [details, setDetails] = useState(null);
    const [holdings, setHoldings] = useState([]);
    const [token, setToken] = useState("");
    const [transactions, setTransactions] = useState([]);

    const { email } = useContext(ProfileContext);

    // const { id } = useContext(InvestorIDContext);
    const [id, setId] = useState("");

    useEffect(() => {

    const cookieToken =
        getCookie("token");

    const investorId =
        localStorage.getItem(
            "investorId"
        );

    if (cookieToken) {

        setToken(cookieToken);
    }

    if (investorId) {

        setId(investorId);
    }

}, []);

    const getDetails = async () => {

        try {

            const response = await fetch(
                `http://localhost:4000/api/investors/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = await response.json();

            setDetails(result);

        } catch (err) {

            console.log(err);
        }
    };

    const getHoldings = async () => {

        try {

            const response = await fetch(
                `http://localhost:4000/api/investors/${id}/holdings`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = await response.json();

            setHoldings(result);

        } catch (err) {

            console.log(err);
        }
    };

    const getTransactions = async () => {

        try {

            const response = await fetch(
                `http://localhost:4000/api/investors/${id}/transactions`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = await response.json();

            setTransactions(result);

        } catch (err) {

            console.log(err);
        }
    };

   const getCookie = (name) => {

    const value =
        `; ${document.cookie}`;

    const parts =
        value.split(`; ${name}=`);

    if (parts.length === 2) {

        return parts
            .pop()
            .split(";")
            .shift();
    }

    return "";
};

useEffect(() => {

    if (id && token) {

        getDetails();

        getHoldings();

        getTransactions();
    }

}, [id, token]);

    return (

        <div className="
            w-full
            min-h-screen
            bg-[#f5f6fa]
            p-8
        ">

            {/* Header */}

            <div className="
                flex
                items-center
                justify-between
                mb-10
            ">

                <div>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-black
                    ">
                        Dashboard
                    </h1>

                    <p className="
                        text-gray-500
                        mt-2
                        text-lg
                    ">
                        Welcome back, {email}
                    </p>

                </div>

                <div className="
                    flex
                    items-center
                    gap-4
                ">

                    <button className="
                        px-6
                        h-12
                        rounded-full
                        bg-lime-200
                        font-semibold
                        text-black
                    ">
                        Full Statistics
                    </button>

                    <button className="
                        px-6
                        h-12
                        rounded-full
                        bg-gray-200
                        text-gray-600
                        font-semibold
                    ">
                        Total Summary
                    </button>

                </div>

            </div>

            {/* Top Section */}

            <div className="
                grid
                grid-cols-1
                xl:grid-cols-2
                gap-8
            ">

                {/* Investor Details */}

                {
                    details && (

                        <div className="
                            bg-white
                            rounded-[32px]
                            p-8
                            shadow-sm
                            border
                            border-gray-100
                        ">

                            <div className="
                                flex
                                items-center
                                justify-between
                                mb-8
                            ">

                                <div>

                                    <h2 className="
                                        text-2xl
                                        font-bold
                                        text-black
                                    ">
                                        Investor Details
                                    </h2>

                                    <p className="
                                        text-gray-400
                                        mt-1
                                    ">
                                        Personal Information
                                    </p>

                                </div>

                                <div className="
                                    w-14
                                    h-14
                                    rounded-3xl
                                    bg-orange-100
                                    flex
                                    items-center
                                    justify-center
                                    text-2xl
                                ">
                                    👤
                                </div>

                            </div>

                            <div className="space-y-5">

                                <div className="
                                    flex
                                    justify-between
                                ">
                                    <span className="
                                        text-gray-500
                                    ">
                                        Investor ID
                                    </span>

                                    <span className="
                                        font-bold
                                        text-black
                                    ">
                                        {details.investor_id}
                                    </span>
                                </div>

                                <div className="
                                    flex
                                    justify-between
                                ">
                                    <span className="
                                        text-gray-500
                                    ">
                                        Name
                                    </span>

                                    <span className="
                                        font-bold
                                        text-black
                                    ">
                                        {details.first_name}
                                        {" "}
                                        {details.middle_name}
                                        {" "}
                                        {details.last_name}
                                    </span>
                                </div>

                                <div className="
                                    flex
                                    justify-between
                                ">
                                    <span className="
                                        text-gray-500
                                    ">
                                        PAN
                                    </span>

                                    <span className="
                                        font-bold
                                        text-black
                                    ">
                                        {details.pancard_no}
                                    </span>
                                </div>

                                <div className="
                                    flex
                                    justify-between
                                ">
                                    <span className="
                                        text-gray-500
                                    ">
                                        Aadhaar
                                    </span>

                                    <span className="
                                        font-bold
                                        text-black
                                    ">
                                        {details.aadhaar_no}
                                    </span>
                                </div>

                                <div className="
                                    flex
                                    justify-between
                                ">
                                    <span className="
                                        text-gray-500
                                    ">
                                        Occupation
                                    </span>

                                    <span className="
                                        font-bold
                                        text-black
                                    ">
                                        {details.occupation}
                                    </span>
                                </div>

                            </div>

                        </div>
                    )
                }

                {/* Holdings Statistics */}

                <div className="
                    bg-white
                    rounded-[32px]
                    p-8
                    shadow-sm
                    border
                    border-gray-100
                ">

                    {/* Header */}

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-8
                    ">

                        <div>

                            <h2 className="
                                text-2xl
                                font-bold
                                text-black
                            ">
                                Statistics
                            </h2>

                            <p className="
                                text-gray-400
                                mt-1
                            ">
                                Holdings Overview
                            </p>

                        </div>

                        <button className="
                            px-5
                            h-11
                            rounded-full
                            border
                            border-gray-200
                            text-sm
                            font-semibold
                        ">
                            Details
                        </button>

                    </div>

                    {/* Pie Chart */}

                    <div className="
                        flex
                        items-center
                        justify-center
                        relative
                        mt-4
                    ">

                        <div className="
                            w-[260px]
                            h-[260px]
                            rounded-full
                            border-[24px]
                            border-lime-300
                            border-t-violet-500
                            border-r-green-500
                            border-b-blue-400
                            rotate-45
                        "></div>

                        {/* Center */}

                        <div className="
                            absolute
                            flex
                            flex-col
                            items-center
                            justify-center
                        ">

                            <p className="
                                text-gray-400
                                text-lg
                            ">
                                Total Holdings
                            </p>

                            <h1 className="
                                text-4xl
                                font-bold
                                text-black
                                mt-2
                            ">
                                ₹
                                {
                                    holdings
                                        .reduce(
                                            (
                                                total,
                                                item
                                            ) =>
                                                total +
                                                Number(
                                                    item.current_value
                                                ),
                                            0
                                        )
                                        .toFixed(0)
                                }
                            </h1>

                        </div>

                    </div>

                    {/* Holdings List */}

                    <div className="
                        mt-10
                        space-y-5
                    ">

                        {
                            holdings.map((holding, index) => (

                                <div
                                    key={index}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                    "
                                >

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        <div className={`
                                            w-4
                                            h-4
                                            rounded-full

                                            ${
                                                index === 0
                                                    ? "bg-violet-500"
                                                    : index === 1
                                                    ? "bg-green-500"
                                                    : index === 2
                                                    ? "bg-blue-400"
                                                    : "bg-lime-300"
                                            }
                                        `}></div>

                                        <div>

                                            <p className="
                                                font-semibold
                                                text-black
                                            ">
                                                {holding.fund_name}
                                            </p>

                                            <p className="
                                                text-sm
                                                text-gray-400
                                            ">
                                                {holding.total_units}
                                                {" "}
                                                Units
                                            </p>

                                        </div>

                                    </div>

                                    <div className="
                                        text-right
                                    ">

                                        <p className="
                                            font-bold
                                            text-black
                                        ">
                                            ₹
                                            {
                                                Number(
                                                    holding.current_value
                                                ).toFixed(0)
                                            }
                                        </p>

                                        <p className="
                                            text-sm
                                            text-gray-400
                                        ">
                                            NAV ₹
                                            {holding.nav_value}
                                        </p>

                                    </div>

                                </div>
                            ))
                        }

                    </div>

                </div>

                {/* Transactions */}

                <div className="
                    xl:col-span-2
                    bg-white
                    rounded-[32px]
                    shadow-sm
                    border
                    border-gray-100
                ">

                    {/* Header */}

                    <div className="
                        flex
                        items-center
                        justify-between
                        px-8
                        pt-8
                        pb-6
                    ">

                        <h2 className="
                            text-[30px]
                            font-bold
                            text-black
                        ">
                            Recent transactions
                        </h2>

                        <div className="
                            flex
                            items-center
                            gap-3
                        ">

                            <button className="
                                w-12
                                h-12
                                rounded-full
                                border
                                border-gray-200
                                flex
                                items-center
                                justify-center
                            ">
                                🔍
                            </button>

                            <button className="
                                px-5
                                h-12
                                rounded-full
                                border
                                border-gray-200
                                text-sm
                                font-semibold
                                text-gray-700
                            ">
                                View all
                            </button>

                        </div>

                    </div>

                    {/* Table Header */}

                    <div className="
                        grid
                        grid-cols-7
                        px-8
                        pb-4
                        text-gray-400
                        text-sm
                        font-semibold
                    ">

                        <p>Type</p>
                        <p>Date</p>
                        <p>Amount</p>
                        <p>Fund</p>
                        <p>Method</p>
                        <p>Units</p>
                        <p>Category</p>

                    </div>

                    {/* Rows */}

                    <div className="pb-6">

                        {
                            transactions.map((transaction, index) => (

                                <div
                                    key={index}
                                    className="
                                        grid
                                        grid-cols-7
                                        items-center
                                        px-8
                                        py-5
                                        hover:bg-gray-50
                                        transition-all
                                    "
                                >

                                    <p className="
                                        text-black
                                        font-medium
                                    ">
                                        Investment
                                    </p>

                                    <p className="
                                        text-gray-500
                                        text-sm
                                    ">
                                        {transaction.transaction_date}
                                    </p>

                                    <p className="
                                        text-green-500
                                        font-bold
                                    ">
                                        ₹
                                        {transaction.transaction_amount}
                                    </p>

                                    <p className="
                                        text-black
                                        font-medium
                                    ">
                                        {transaction.fund_name}
                                    </p>

                                    <p className="
                                        text-gray-500
                                    ">
                                        SIP
                                    </p>

                                    <p className="
                                        text-black
                                        font-semibold
                                    ">
                                        {transaction.units_allocated}
                                    </p>

                                    <p className="
                                        text-gray-500
                                    ">
                                        Mutual Fund
                                    </p>

                                </div>
                            ))
                        }

                    </div>

                </div>

            </div>

        </div>
    );
}