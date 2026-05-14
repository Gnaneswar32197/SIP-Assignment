export default function Section() {
    return (
        <div className="bg-black text-white flex flex-row justify-center pt-{400px}">

            <div className="flex flex-col w-[600px]">

                <p className="text-[50px] font-bold">
                    Why KFintech?
                </p>

                <p className="text-[30px] font-bold text-sky-500 ">
                    Secure Hyperscale Platform
                </p>

                <p className="text-[20px] text-gray-400 leading-[55px] tracking-wide">
                    KFintech’s asset management platforms are the leading investor and Issuer
                    servicing platforms. Our platforms are highly resilient, secure and scalable
                    even as they are built on mobile-first micro services architecture driven and
                    cloud-ready frameworks. KFintech has country specific platforms for asset
                    classes of Mutual Funds, ETFs, Alternatives and Pensions for investor
                    servicing & equities and bonds for issuer servicing. KFintech platforms and
                    data are hosted in Tier IV data centers.
                </p>

            </div>

            <div className="flex justify-center items-center">
                <img
                    width={"400px"}
                    height={"400px"}
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5I-vz4FlTostdbI6Umxxbz3ZHmURXXoPZBQ&s"
                    alt="Section Image"
                    className="object-contain"
                />
            </div>

        </div>
    )
}