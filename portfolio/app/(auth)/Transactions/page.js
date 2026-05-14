"use client";

import { useEffect, useState } from "react";

export default function Transactions() {

    const [transactions, setTransactions] =
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

    // FETCH TRANSACTIONS

    const getTransactions =
        async () => {

            try {

                const response =
                    await fetch(
                        `http://localhost:4000/api/investors/${id}/transactions`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                const result =
                    await response.json();

                console.log(
                    "TRANSACTIONS:",
                    result
                );

                setTransactions(
                    result
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

            getTransactions();
        }

    }, [id, token]);

    return (

        <div className="
          
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
                        text-5xl
                        font-bold
                        text-black
                    ">
                        Transactions
                    </h1>

                    <p className="
                        text-gray-500
                        mt-3
                        text-lg
                    ">
                        View all your investment transactions
                    </p>

                </div>

                <button className="
                    px-6
                    h-12
                    rounded-full
                    bg-lime-200
                    font-semibold
                    text-black
                ">
                    Latest Activity
                </button>

            </div>

            {/* Transactions Table */}

            <div className="
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
                        text-[32px]
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
                        transactions.map(
                            (
                                transaction,
                                index
                            ) => (

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
                                        border-t
                                        border-gray-100
                                    "
                                >

                                    {/* Type */}

                                    <p className="
                                        text-black
                                        font-medium
                                    ">
                                        Investment
                                    </p>

                                    {/* Date */}

                                    <p className="
                                        text-gray-500
                                        text-sm
                                    ">
                                        {
                                            transaction.transaction_date
                                        }
                                    </p>

                                    {/* Amount */}

                                    <p className="
                                        text-green-500
                                        font-bold
                                    ">
                                        ₹
                                        {
                                            transaction.transaction_amount
                                        }
                                    </p>

                                    {/* Fund */}

                                    <p className="
                                        text-black
                                        font-medium
                                    ">
                                        {
                                            transaction.fund_name
                                        }
                                    </p>

                                    {/* Method */}

                                    <p className="
                                        text-gray-500
                                    ">
                                        SIP
                                    </p>

                                    {/* Units */}

                                    <p className="
                                        text-black
                                        font-semibold
                                    ">
                                        {
                                            transaction.units_allocated
                                        }
                                    </p>

                                    {/* Category */}

                                    <p className="
                                        text-gray-500
                                    ">
                                        Mutual Fund
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