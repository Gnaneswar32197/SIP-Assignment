"use client";

import { useEffect, useState } from "react";

export default function Holdings() {

    const [holdings, setHoldings] =
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

    // FETCH HOLDINGS

    const getHoldings = async () => {

        try {

            const response =
                await fetch(
                    `http://localhost:4000/api/investors/${id}/holdings`,
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
                "HOLDINGS:",
                result
            );

            setHoldings(result);

        } catch (err) {

            console.log(err);
        }
    };

    // CALL API

    useEffect(() => {

        if (id && token) {

            getHoldings();
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
                    text-4xl
                    font-bold
                    text-gray-900
                ">
                    Holdings
                </h1>

                <p className="
                    text-gray-500
                    mt-2
                    text-lg
                ">
                    Your investment portfolio overview
                </p>

            </div>

            {/* Holdings Grid */}

            <div className="
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-8
            ">

                {
                    holdings.map(
                        (
                            holding,
                            index
                        ) => (

                            <div
                                key={index}
                                className="
                                    bg-white
                                    rounded-3xl
                                    shadow-md
                                    p-8
                                    border
                                    border-gray-100
                                "
                            >

                                {/* Top */}

                                <div className="
                                    flex
                                    items-center
                                    justify-between
                                    mb-6
                                ">

                                    <h2 className="
                                        text-2xl
                                        font-bold
                                        text-gray-900
                                    ">
                                        {
                                            holding.fund_name
                                        }
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
                                        📈
                                    </div>

                                </div>

                                {/* Details */}

                                <div className="
                                    space-y-4
                                ">

                                    <div className="
                                        flex
                                        justify-between
                                    ">

                                        <span className="
                                            text-gray-500
                                        ">
                                            Units
                                        </span>

                                        <span className="
                                            font-semibold
                                            text-gray-900
                                        ">
                                            {
                                                holding.total_units
                                            }
                                        </span>

                                    </div>

                                    <div className="
                                        flex
                                        justify-between
                                    ">

                                        <span className="
                                            text-gray-500
                                        ">
                                            NAV
                                        </span>

                                        <span className="
                                            font-semibold
                                            text-gray-900
                                        ">
                                            ₹
                                            {
                                                holding.nav_value
                                            }
                                        </span>

                                    </div>

                                    <div className="
                                        flex
                                        justify-between
                                    ">

                                        <span className="
                                            text-gray-500
                                        ">
                                            Current Value
                                        </span>

                                        <span className="
                                            font-bold
                                            text-green-600
                                        ">
                                            ₹
                                            {
                                                holding.current_value
                                            }
                                        </span>

                                    </div>

                                </div>

                            </div>
                        )
                    )
                }

            </div>

        </div>
    );
}