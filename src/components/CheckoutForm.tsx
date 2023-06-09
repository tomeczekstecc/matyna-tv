import React from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import {Button} from "@/components/ui/button";
import {useSelector} from "react-redux";
import * as process from "process";
import toast from "react-hot-toast";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading] = React.useState(false);
  // @ts-ignore
  const orderId = useSelector(state => state?.order?.orderId as string)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    console.log(stripe,'stripe')

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/store/checkout/?orderId=${orderId}`,
      },
    });
    if (error) {
      //@ts-ignore
      console.log(error)
      toast.error(error?.message || 'Wystąpił błąd podczas płatności')
    }

  };


  const paymentElementOptions = {
    layout: {
      type: "tabs",
      backgroundColor: "red",
      textColor: "red",
    },

  };

  return (<div>
      <form id="payment-form" onSubmit={handleSubmit}>
        {/*// @ts-ignore*/}
        <PaymentElement id="payment-element" options={paymentElementOptions}/>
        <Button size={'lg'} className={'my-8 w-full'} disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-tex" className={'text-xl'}>
          {isLoading ? <div className="spinner w-full" id="spinner"></div> : "Zapłać"}
        </span>
        </Button>
      </form>
    </div>
  );
}
