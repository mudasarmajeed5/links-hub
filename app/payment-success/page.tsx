"use client"
import SessionWrapper from "@/components/SessionWrapper";
import PaymentSuccess from "./PaymentSuccess";
export default function PaymentSuccessPage() {
    return (
        <SessionWrapper>
            <PaymentSuccess />
        </SessionWrapper>
    );
}