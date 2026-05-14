"use client";

import { useState } from "react";

export default function DashHeader() {

    const [activeToggle, setActiveToggle] = useState("Full Statistics");

    return (

        <div className="h-[80px] bg-white flex items-center justify-between px-8 border-b">

            {/* Left */}

            <h1 className="text-2xl font-bold text-black">
                Analytics
            </h1>

            {/* Center Toggle */}

            <div className="bg-gray-200 rounded-full p-1 flex items-center gap-2">

                <button
                    onClick={() => setActiveToggle("Full Statistics")}
                    className={`
                        px-5 py-2 rounded-full text-sm font-semibold transition-all
                        ${
                            activeToggle === "Full Statistics"
                                ? "bg-white shadow text-black"
                                : "text-gray-600"
                        }
                    `}
                >
                    Full Statistics
                </button>

                <button
                    onClick={() => setActiveToggle("Total Summary")}
                    className={`
                        px-5 py-2 rounded-full text-sm font-semibold transition-all
                        ${
                            activeToggle === "Total Summary"
                                ? "bg-white shadow text-black"
                                : "text-gray-600"
                        }
                    `}
                >
                    Total Summary
                </button>

            </div>

            {/* Right */}

            <div className="flex items-center gap-4">

                <button className="w-10 h-10 bg-gray-300 rounded-xl text-xl text-white flex items-center justify-center">
                    +
                </button>

                <div className="w-12 h-12 rounded-full bg-red-500"></div>

            </div>

        </div>
    );
}