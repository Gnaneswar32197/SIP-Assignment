"use client";

import { useEffect, useState } from "react";

export default function NetWorth() {

    const [netWorth, setNetWorth] =
        useState(null);

    const [investments, setInvestments] =
        useState(0);

    const [funds, setFunds] =
        useState(0);

    const [fundNAVs, setFundNAVs] =
        useState([]);

    const [token, setToken] =
        useState("");

    const [id, setId] =
        useState("");

    // GET COOKIE

    const getCookie = (name) => {

        const value =
            `; ${document.cookie}`;

        const parts =
            value.split(
                `; ${name}=`
            );

        if (
            parts.length === 2
        ) {

            return parts
                .pop()
                .split(";")
                .shift();
        }

        return "";
    };

    // LOAD TOKEN + INVESTOR ID

    useEffect(() => {

        const cookieToken =
            getCookie("token");

        const investorId =
            localStorage.getItem(
                "investorId"
            );

        console.log(
            "TOKEN:",
            cookieToken
        );

        console.log(
            "ID:",
            investorId
        );

        if (cookieToken) {

            setToken(cookieToken);
        }

        if (investorId) {

            setId(investorId);
        }

    }, []);

    // FETCH NET WORTH + FUND NAV DETAILS

    const getNetWorth = async () => {

        try {

            // FUND NAV DETAILS

            const navResponse =
                await fetch(
                    `http://localhost:4000/api/investors/${id}/fundnav`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const navResult =
                await navResponse.json();

            console.log(
                "NAV DETAILS:",
                navResult
            );

            // TOTAL NAV

            setNetWorth(
                navResult.total_nav
            );

            // FUND NAV DETAILS

            setFundNAVs(
                navResult.funds
            );

            // ACTIVE FUNDS COUNT

            setFunds(
                navResult.funds.length
            );

            // TRANSACTIONS

            const transactionsResponse =
                await fetch(
                    `http://localhost:4000/api/investors/${id}/transactions`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );

            const transactionsResult =
                await transactionsResponse.json();

            console.log(
                "TRANSACTIONS:",
                transactionsResult
            );

            setInvestments(
                transactionsResult.length
            );

        } catch (err) {

            console.log(err);
        }
    };

    // CALL API

    useEffect(() => {

        if (
            id &&
            token
        ) {

            getNetWorth();
        }

    }, [id, token]);

    return (

        <div className="
            min-h-screen
            bg-[#f5f6fa]
            p-8
        ">

            {/* Heading */}

            <div className="mb-8">

                <h1 className="
                    text-3xl
                    font-bold
                    text-gray-900
                ">
                    Net Worth
                </h1>

                <p className="
                    text-gray-500
                    mt-1
                ">
                    Overview of your portfolio
                </p>

            </div>

            {/* Cards */}

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-4
                gap-6
                max-w-7xl
            ">

                {/* Total Net Worth */}

                <div className="
                    bg-white
                    rounded-3xl
                    shadow-sm
                    p-6
                    border
                    border-gray-100
                ">

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-4
                    ">

                        <h2 className="
                            text-gray-500
                            font-medium
                        ">
                            Total Net Worth
                        </h2>

                        <div className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-green-100
                            flex
                            items-center
                            justify-center
                            text-2xl
                        ">
                            💰
                        </div>

                    </div>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-green-600
                    ">
                        ₹
                        {
                            netWorth
                                ? Number(
                                      netWorth
                                  ).toLocaleString()
                                : "0"
                        }
                    </h1>

                </div>

                {/* Active Funds */}

                <div className="
                    bg-white
                    rounded-3xl
                    shadow-sm
                    p-6
                    border
                    border-gray-100
                ">

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-4
                    ">

                        <h2 className="
                            text-gray-500
                            font-medium
                        ">
                            Active Funds
                        </h2>

                        <div className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-blue-100
                            flex
                            items-center
                            justify-center
                            text-2xl
                        ">
                            📊
                        </div>

                    </div>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-blue-600
                    ">
                        {funds}
                    </h1>

                </div>

                {/* Transactions */}

                <div className="
                    bg-white
                    rounded-3xl
                    shadow-sm
                    p-6
                    border
                    border-gray-100
                ">

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-4
                    ">

                        <h2 className="
                            text-gray-500
                            font-medium
                        ">
                            Transactions
                        </h2>

                        <div className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-orange-100
                            flex
                            items-center
                            justify-center
                            text-2xl
                        ">
                            🔄
                        </div>

                    </div>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-orange-500
                    ">
                        {investments}
                    </h1>

                </div>

                {/* Growth */}

                <div className="
                    bg-white
                    rounded-3xl
                    shadow-sm
                    p-6
                    border
                    border-gray-100
                ">

                    <div className="
                        flex
                        items-center
                        justify-between
                        mb-4
                    ">

                        <h2 className="
                            text-gray-500
                            font-medium
                        ">
                            Portfolio Growth
                        </h2>

                        <div className="
                            w-12
                            h-12
                            rounded-2xl
                            bg-purple-100
                            flex
                            items-center
                            justify-center
                            text-2xl
                        ">
                            📈
                        </div>

                    </div>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-purple-600
                    ">
                        +12%
                    </h1>

                </div>

            </div>

            {/* FUND NAV DETAILS */}

            <div className="
                mt-10
                bg-white
                rounded-3xl
                shadow-sm
                border
                border-gray-100
                p-8
            ">

                <div className="
                    flex
                    items-center
                    justify-between
                    mb-8
                ">

                    <h2 className="
                        text-2xl
                        font-bold
                        text-black
                    ">
                        Fund NAV Details
                    </h2>

                </div>

                {/* TABLE HEADER */}

                <div className="
                    grid
                    grid-cols-4
                    pb-4
                    border-b
                    text-gray-400
                    font-semibold
                ">

                    <p>Fund Name</p>

                    <p>NAV</p>

                    <p>Units</p>

                    <p>Total Value</p>

                </div>

                {/* ROWS */}

                <div className="
                    mt-4
                ">

                    {
                        fundNAVs.map(
                            (
                                fund,
                                index
                            ) => (

                                <div
                                    key={index}
                                    className="
                                        grid
                                        grid-cols-4
                                        py-5
                                        border-b
                                        items-center
                                    "
                                >

                                    {/* FUND NAME */}

                                    <p className="
                                        font-semibold
                                        text-black
                                    ">
                                        {
                                            fund.fund_name
                                        }
                                    </p>

                                    {/* NAV */}

                                    <p className="
                                        text-blue-600
                                        font-bold
                                    ">
                                        ₹
                                        {
                                            Number(
                                                fund.nav_value
                                            ).toFixed(2)
                                        }
                                    </p>

                                    {/* UNITS */}

                                    <p className="
                                        text-gray-700
                                    ">
                                        {
                                            fund.total_units
                                        }
                                    </p>

                                    {/* TOTAL VALUE */}

                                    <p className="
                                        text-green-600
                                        font-bold
                                    ">
                                        ₹
                                        {
                                            Number(
                                                fund.total_fund_value
                                            ).toLocaleString()
                                        }
                                    </p>

                                </div>
                            )
                        )
                    }

                </div>

            </div>

        </div>
    );
}