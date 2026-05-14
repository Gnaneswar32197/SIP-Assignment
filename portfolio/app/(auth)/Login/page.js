"use client";

import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

import ProfileContext from "@/app/core/context/ProfileContext";
import InvestorIDContext from "@/app/core/context/InvestorIDContext";

export default function Login() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { storeDetails } = useContext(ProfileContext);
    const { storeId } = useContext(InvestorIDContext);

    return (

        <div className="
            h-screen
            overflow-hidden
            bg-[#f5f6f8]
            flex
            items-start
            justify-center
            pt-12
            px-4
        ">

            {/* Login Container */}

            <div className="
                w-full
                max-w-[420px]
                bg-white
                rounded-[32px]
                shadow-xl
                px-8
                py-10
                border
                border-gray-100
            ">

                {/* Heading */}

                <div>

                    <h1 className="
                        text-4xl
                        font-extrabold
                        text-black
                    ">
                        Welcome Back
                    </h1>

                    <p className="
                        text-gray-500
                        mt-2
                        text-base
                    ">
                        Login to continue
                    </p>

                </div>

                {/* Form */}

                <div className="mt-8 space-y-5">

                    {/* Email */}

                    <div>

                        <label className="
                            block
                            text-sm
                            font-bold
                            text-gray-700
                            mb-2
                        ">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="
                                w-full
                                h-[54px]
                                px-5
                                rounded-2xl
                                border
                                border-gray-200
                                bg-[#f7f7f7]
                                outline-none
                                focus:border-black
                                text-black
                                font-medium
                                transition-all
                            "
                        />

                    </div>

                    {/* Password */}

                    <div>

                        <label className="
                            block
                            text-sm
                            font-bold
                            text-gray-700
                            mb-2
                        ">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="
                                w-full
                                h-[54px]
                                px-5
                                rounded-2xl
                                border
                                border-gray-200
                                bg-[#f7f7f7]
                                outline-none
                                focus:border-black
                                text-black
                                font-medium
                                transition-all
                            "
                        />

                    </div>

                    {/* Login Button */}

                    <button
                        className="
                            w-full
                            h-[54px]
                            rounded-2xl
                            bg-black
                            hover:bg-gray-900
                            text-white
                            text-lg
                            font-bold
                            transition-all
                            duration-300
                        "

                        onClick={async () => {

                            try {

                                const response = await fetch(
                                    "http://localhost:4000/api/investors/login",
                                    {
                                        method: "POST",

                                        headers: {
                                            "Content-type":
                                                "application/json"
                                        },

                                        body: JSON.stringify({
                                            email,
                                            password
                                        })
                                    }
                                );

                                const result =
                                    await response.json();

                                if (
                                    result.message ===
                                    "Login Success"
                                ) {

                                    storeDetails(
                                        email,
                                        password
                                    );

                                    storeId(
                                        result.investorId
                                    );

                                    document.cookie =
                                        `token=${result.token}; path=/`;

                                    localStorage.setItem(
                                        "investorId",
                                        result.investorId
                                    );

                                    router.push("/Dashboard");
                                }

                                else {

                                    alert(result.message);
                                }

                            } catch (err) {

                                alert(JSON.stringify(err));
                            }
                        }}
                    >
                        Login
                    </button>

                </div>

                {/* Footer */}

                <p className="
                    text-center
                    text-gray-400
                    text-sm
                    mt-8
                    font-medium
                ">
                    Secure Portfolio Platform
                </p>

            </div>

        </div>
    );
}