import React from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import {Header} from "@/components/ui/Header";
import {Button} from "@/components/ui/button";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    console.log(clientSecret, 'clientSecret')
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
      // @ts-ignore
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const {error} = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      // @ts-ignore
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
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
        {/*<LinkAuthenticationElement*/}
        {/*  id="link-authentication-element"*/}
        {/*  // @ts-ignore*/}
        {/*  onChange={(e) => setEmail(e.target.value)}*/}
        {/*/>*/}
        {/*// @ts-ignore*/}


        <PaymentElement id="payment-element" options={paymentElementOptions}/>


        <Button size={'lg'} className={'my-8 w-full'} disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-tex" className={'text-xl'}>
          {isLoading ? <div className="spinner w-full" id="spinner"></div> : "Zapłać"}
        </span>
        </Button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message" className={'text-red-600'}>{message}</div>}
      </form>
    </div>
  );
}
