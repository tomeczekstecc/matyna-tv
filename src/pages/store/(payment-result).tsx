import {useElements, useStripe} from "@stripe/react-stripe-js";
import React from "react";
import {Card} from "@/components/ui/card";

const PaymentResult = () => {
  const stripe = useStripe();
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({paymentIntent}) => {
      // @ts-ignore
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage(`Payment succeeded! ${JSON.stringify(paymentIntent)}`);
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage(`Your payment was not successful, please try again. ${JSON.stringify(paymentIntent)}`);
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);


  return (
    <div>
      <h1 className={'text-4xl'}>Super! Wszystko opłacone</h1>
      <h2 className={'text-2xl'}>Dziękujemy za zakupy</h2>

      <h2 className={'text-4xl'} >Co teraz?</h2>
      <Card>

      </Card>

      <p>{message}</p>
    </div>
  )
}

export default PaymentResult
