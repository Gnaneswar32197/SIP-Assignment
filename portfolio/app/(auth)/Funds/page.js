"use client";

import { useEffect, useState } from "react";

export default function Funds() {

    const [funds, setFunds] = useState([]);

    const [formData, setFormData] = useState({
        fund_name: "",
        nav_value: ""
    });

    const [navData, setNavData] = useState({
        fundId: "",
        nav_value: ""
    });

    const [token, setToken] = useState("");

    useEffect(() => {

        const storedToken =
            localStorage.getItem("token");

        if (storedToken) {

            setToken(storedToken);
        }

    }, []);

    /* GET FUNDS */

    const getFunds = async () => {

        try {

            const response = await fetch(
                "http://localhost:4000/api/funds",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const result = await response.json();

            setFunds(result);

        } catch (err) {

            console.log(err);
        }
    };

    useEffect(() => {

        if (token) {

            getFunds();
        }

    }, [token]);

    /* CREATE FUND */

    const createFund = async () => {

        try {

            await fetch(
                "http://localhost:4000/api/funds",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify(formData)
                }
            );

            setFormData({
                fund_name: "",
                nav_value: ""
            });

            getFunds();

        } catch (err) {

            console.log(err);
        }
    };

    /* UPDATE NAV */

    const updateNAV = async () => {

        try {

            await fetch(
                `http://localhost:4000/api/funds/${navData.fundId}/nav`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        nav_value: navData.nav_value
                    })
                }
            );

            setNavData({
                fundId: "",
                nav_value: ""
            });

            getFunds();

        } catch (err) {

            console.log(err);
        }
    };

    return (

        <div className="
            min-h-screen
            bg-[#f5f6fa]
            p-8
        ">

            <h1 className="
                text-4xl
                font-bold
                mb-8
            ">
                Funds Management
            </h1>

            {/* Add Fund */}

            <div className="
                bg-white
                p-6
                rounded-3xl
                shadow-sm
                mb-8
            ">

                <h2 className="
                    text-2xl
                    font-semibold
                    mb-5
                ">
                    Create Fund
                </h2>

                <div className="flex gap-4">

                    <input
                        type="text"
                        placeholder="Fund Name"
                        value={formData.fund_name}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                fund_name: e.target.value
                            })
                        }
                        className="
                            border
                            p-3
                            rounded-xl
                            w-full
                        "
                    />

                    <input
                        type="number"
                        placeholder="NAV Value"
                        value={formData.nav_value}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                nav_value: e.target.value
                            })
                        }
                        className="
                            border
                            p-3
                            rounded-xl
                            w-full
                        "
                    />

                    <button
                        onClick={createFund}
                        className="
                            bg-black
                            text-white
                            px-6
                            rounded-xl
                        "
                    >
                        Add
                    </button>

                </div>

            </div>

            {/* Update NAV */}

            <div className="
                bg-white
                p-6
                rounded-3xl
                shadow-sm
                mb-8
            ">

                <h2 className="
                    text-2xl
                    font-semibold
                    mb-5
                ">
                    Update NAV
                </h2>

                <div className="flex gap-4">

                    <input
                        type="text"
                        placeholder="Fund ID"
                        value={navData.fundId}
                        onChange={(e) =>
                            setNavData({
                                ...navData,
                                fundId: e.target.value
                            })
                        }
                        className="
                            border
                            p-3
                            rounded-xl
                            w-full
                        "
                    />

                    <input
                        type="number"
                        placeholder="New NAV"
                        value={navData.nav_value}
                        onChange={(e) =>
                            setNavData({
                                ...navData,
                                nav_value: e.target.value
                            })
                        }
                        className="
                            border
                            p-3
                            rounded-xl
                            w-full
                        "
                    />

                    <button
                        onClick={updateNAV}
                        className="
                            bg-lime-300
                            text-black
                            px-6
                            rounded-xl
                            font-semibold
                        "
                    >
                        Update
                    </button>

                </div>

            </div>

            {/* Funds List */}

            <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                xl:grid-cols-3
                gap-6
            ">

                {funds.map((fund, index) => (

                    <div
                        key={index}
                        className="
                            bg-white
                            rounded-3xl
                            p-6
                            shadow-sm
                        "
                    >

                        <h2 className="
                            text-2xl
                            font-bold
                            mb-3
                        ">
                            {fund.fund_name}
                        </h2>

                        <p className="text-gray-500 mb-2">
                            Fund ID:
                            {" "}
                            {fund.fund_id}
                        </p>

                        <p className="
                            text-3xl
                            font-bold
                            text-green-600
                        ">
                            ₹{fund.nav_value}
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}