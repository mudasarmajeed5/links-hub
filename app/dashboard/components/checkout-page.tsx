'use client';
import { useState, useEffect } from 'react';
import {
    useStripe,
    useElements,
    PaymentElement,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from '@/components/ui/dialog';
import { convertToPaisa } from '@/lib/convert-currency/convert-to-paisa';
import { Loader2 } from 'lucide-react';
import { DialogTitle } from '@radix-ui/react-dialog';

const CheckoutPage = ({ amount }: { amount: number }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [clientSecret, setClientSecret] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const returnUrl =
        process.env.NODE_ENV === "production"
            ? `https://linkshub.space/payment-success?amount=${amount}`
            : `http://localhost:3000/payment-success?amount=${amount}`;

    useEffect(() => {
        fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: convertToPaisa(amount) }),
        })
            .then((res) => {
                if (!res.ok) throw new Error('Failed to create payment intent');
                return res.json();
            })
            .then((data) => setClientSecret(data.clientSecret))
            .catch((error) => {
                console.error('Error fetching client secret:', error);
                setErrorMessage('Unable to initiate payment. Please try again later.');
            });
    }, []);

    const handlePaymentSubmission = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) return;

        const { error: submitError } = await elements.submit();
        if (submitError?.message) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: returnUrl,
            },
        });

        if (error) {
            setErrorMessage(error.message || 'An unknown error occurred.');
            setLoading(false);
            return;
        }
        setLoading(false);
    };

    if (!clientSecret || !elements || !stripe) {
        return (
            <div className="flex w-full justify-center items-center">
                <Loader2 className="w-6 h-6 text-black dark:text-white animate-spin" />
            </div>
        );
    }

    return (
        <>
            <form className='scroll-auto'>
                {clientSecret && (
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button
                                className='w-full'
                                size="sm"
                                variant="default"
                            >
                                Pay securely
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto flex flex-col">
                            <DialogTitle />

                            <div className="flex-1 overflow-y-auto">
                                <PaymentElement className="relative z-[102]" />
                            </div>

                            <DialogFooter className="mt-4">
                                <button
                                    className="bg-black text-white p-2 rounded-md"
                                    onClick={handlePaymentSubmission}
                                >
                                    {!loading ? `Rs. ${amount} / -` : "Processing..."}
                                </button>
                            </DialogFooter>
                        </DialogContent>

                    </Dialog>
                )}
                {errorMessage && <div>{errorMessage}</div>}
            </form>
        </>
    );
};

export default CheckoutPage;