"use client";

import {
    User,
    CreditCard,
    Building2,
    Phone,
    Briefcase,
    ShieldCheck
} from "lucide-react";

import { useEffect, useState } from "react";

export default function Profile() {

    const [profile, setProfile] =
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

    // LOAD TOKEN

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

    // FETCH PROFILE

    const getProfile =
        async () => {

            try {

                const response =
                    await fetch(
                        `http://localhost:4000/api/investors/${id}/profile`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`
                            }
                        }
                    );

                const result =
                    await response.json();

                setProfile(result);

            } catch (err) {

                console.log(err);
            }
        };

    useEffect(() => {

        if (
            id &&
            token
        ) {

            getProfile();
        }

    }, [id, token]);

    return (

        <div className="
            min-h-screen
            bg-[#f5f6fa]
            p-10
        ">

            {/* HEADER */}

            <div className="
                flex
                items-center
                justify-between
                mb-12
            ">

                <div>

                    <h1 className="
                        text-5xl
                        font-bold
                        text-black
                    ">
                        Profile
                    </h1>

                    <p className="
                        text-gray-500
                        mt-3
                        text-lg
                    ">
                        Investor details overview
                    </p>

                </div>

                <div className="
                    w-20
                    h-20
                    rounded-full
                    bg-lime-200
                    flex
                    items-center
                    justify-center
                ">

                    <User
                        size={38}
                        className="
                            text-black
                        "
                    />

                </div>

            </div>

            {

                profile.map(
                    (
                        item,
                        index
                    ) => (

                        <div
                            key={index}
                            className="
                                bg-white
                                rounded-[35px]
                                p-10
                            "
                        >

                            {/* TOP */}

                            <div className="
                                flex
                                items-center
                                gap-6
                                mb-14
                            ">

                                <div className="
                                    w-24
                                    h-24
                                    rounded-full
                                    bg-lime-200
                                    flex
                                    items-center
                                    justify-center
                                    text-4xl
                                    font-bold
                                    text-black
                                ">

                                    {
                                        item.first_name?.charAt(0)
                                    }

                                </div>

                                <div>

                                    <h1 className="
                                        text-4xl
                                        font-bold
                                        text-black
                                    ">
                                        {
                                            item.first_name
                                        }
                                        {" "}
                                        {
                                            item.last_name
                                        }
                                    </h1>

                                    <p className="
                                        text-gray-500
                                        mt-2
                                        text-lg
                                    ">
                                        {
                                            item.occupation
                                        }
                                    </p>

                                </div>

                            </div>

                            {/* DETAILS */}

                            <div className="
                                grid
                                grid-cols-1
                                md:grid-cols-2
                                xl:grid-cols-3
                                gap-y-12
                                gap-x-16
                            ">

                                {/* INVESTOR ID */}

                                <div>

                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                        mb-3
                                    ">

                                        <ShieldCheck
                                            size={22}
                                            className="
                                                text-blue-600
                                            "
                                        />

                                        <p className="
                                            text-gray-500
                                            text-sm
                                        ">
                                            Investor ID
                                        </p>

                                    </div>

                                    <h2 className="
                                        text-2xl
                                        font-semibold
                                        text-black
                                    ">
                                        {
                                            item.investor_id
                                        }
                                    </h2>

                                </div>

                                {/* PAN */}

                                <div>

                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                        mb-3
                                    ">

                                        <CreditCard
                                            size={22}
                                            className="
                                                text-orange-500
                                            "
                                        />

                                        <p className="
                                            text-gray-500
                                            text-sm
                                        ">
                                            PAN Number
                                        </p>

                                    </div>

                                    <h2 className="
                                        text-2xl
                                        font-semibold
                                        text-black
                                    ">
                                        {
                                            item.pancard_no
                                        }
                                    </h2>

                                </div>

                                {/* AADHAAR */}

                                <div>

                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                        mb-3
                                    ">

                                        <ShieldCheck
                                            size={22}
                                            className="
                                                text-purple-600
                                            "
                                        />

                                        <p className="
                                            text-gray-500
                                            text-sm
                                        ">
                                            Aadhaar Number
                                        </p>

                                    </div>

                                    <h2 className="
                                        text-2xl
                                        font-semibold
                                        text-black
                                    ">
                                        {
                                            item.aadhaar_no
                                        }
                                    </h2>

                                </div>

                                {/* CONTACT */}

                                <div>

                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                        mb-3
                                    ">

                                        <Phone
                                            size={22}
                                            className="
                                                text-green-600
                                            "
                                        />

                                        <p className="
                                            text-gray-500
                                            text-sm
                                        ">
                                            Contact
                                        </p>

                                    </div>

                                    <h2 className="
                                        text-2xl
                                        font-semibold
                                        text-black
                                    ">
                                        {
                                            item.contact_value
                                        }
                                    </h2>

                                </div>

                                {/* BANK */}

                                <div>

                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                        mb-3
                                    ">

                                        <Building2
                                            size={22}
                                            className="
                                                text-pink-600
                                            "
                                        />

                                        <p className="
                                            text-gray-500
                                            text-sm
                                        ">
                                            Bank Name
                                        </p>

                                    </div>

                                    <h2 className="
                                        text-2xl
                                        font-semibold
                                        text-black
                                    ">
                                        {
                                            item.bank_name
                                        }
                                    </h2>

                                </div>

                                {/* ACCOUNT */}

                                <div>

                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                        mb-3
                                    ">

                                        <CreditCard
                                            size={22}
                                            className="
                                                text-yellow-600
                                            "
                                        />

                                        <p className="
                                            text-gray-500
                                            text-sm
                                        ">
                                            Account Number
                                        </p>

                                    </div>

                                    <h2 className="
                                        text-2xl
                                        font-semibold
                                        text-black
                                    ">
                                        {
                                            item.account_no
                                        }
                                    </h2>

                                </div>

                                {/* IFSC */}

                                <div>

                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                        mb-3
                                    ">

                                        <Building2
                                            size={22}
                                            className="
                                                text-indigo-600
                                            "
                                        />

                                        <p className="
                                            text-gray-500
                                            text-sm
                                        ">
                                            IFSC Code
                                        </p>

                                    </div>

                                    <h2 className="
                                        text-2xl
                                        font-semibold
                                        text-black
                                    ">
                                        {
                                            item.ifsc_code
                                        }
                                    </h2>

                                </div>

                                {/* BRANCH */}

                                <div>

                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                        mb-3
                                    ">

                                        <Building2
                                            size={22}
                                            className="
                                                text-cyan-600
                                            "
                                        />

                                        <p className="
                                            text-gray-500
                                            text-sm
                                        ">
                                            Branch
                                        </p>

                                    </div>

                                    <h2 className="
                                        text-2xl
                                        font-semibold
                                        text-black
                                    ">
                                        {
                                            item.branch_name
                                        }
                                    </h2>

                                </div>

                                {/* OCCUPATION */}

                                <div>

                                    <div className="
                                        flex
                                        items-center
                                        gap-4
                                        mb-3
                                    ">

                                        <Briefcase
                                            size={22}
                                            className="
                                                text-emerald-600
                                            "
                                        />

                                        <p className="
                                            text-gray-500
                                            text-sm
                                        ">
                                            Occupation
                                        </p>

                                    </div>

                                    <h2 className="
                                        text-2xl
                                        font-semibold
                                        text-black
                                    ">
                                        {
                                            item.occupation
                                        }
                                    </h2>

                                </div>

                            </div>

                        </div>
                    )
                )

            }

        </div>
    );
}