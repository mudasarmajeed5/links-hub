"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function PaymentDetails() {
    const searchParams = useSearchParams();
    const amount = searchParams.get("amount") || "0";

    return (
        <>
            <h2 className="text-xl font-semibold text-[#EAEDFF]">You successfully sent</h2>
            <div className="bg-[#334679] text-[#2EF2FF] p-4 mt-5 rounded-lg text-4xl font-bold shadow-md">
                Rs. {amount}
            </div>
            <p className="mt-4 text-sm mb-10 text-[#C4CBF5]">Your payment has been processed successfully.</p>
        </>
    );
}

export default function PaymentSuccess() {
    return (
        <main className="flex items-center justify-center min-h-[80vh] p-6 bg-gradient-to-br from-[#2EF2FF] to-[#C8EA80]">
            <div className="max-w-lg w-full bg-[#0C1838] text-white text-center p-10 rounded-2xl shadow-xl border border-[#334679]">
                <h1 className="text-5xl font-extrabold text-[#C4CBF5] mb-4">Thank You!</h1>

                {/* Wrap in Suspense */}
                <Suspense fallback={<p className="text-[#C4CBF5]">Loading payment details...</p>}>
                    <PaymentDetails />
                </Suspense>

                <Link href={'/dashboard/loading'} className="bg-[#1959AD] text-white font-semibold px-6 py-3 rounded-lg shadow-md text-sm hover:bg-[#263466] transition">
                    Back to Dashboard
                </Link>
            </div>
        </main>
    );
}
