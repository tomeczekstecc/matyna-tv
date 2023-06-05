import {useStripe} from "@stripe/react-stripe-js";
import React from "react";
import {Card, CardContent,CardTitle} from "@/components/ui/card";
import {CheckCircle, StopCircle} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {api} from "@/utils/api";
import {LoadingPage} from "@/components/loading";
import toast from "react-hot-toast";

const PaymentResult = () => {
  const stripe = useStripe();
  const [message, setMessage] = React.useState('');
  const [json, setJson] = React.useState({} as any);

  const {mutate: updateOrder} = api.order.updateOneOrderOnPayment.useMutation({
    onError: (err) =>toast.error(err.message),
    onSuccess: (data) => toast.success(data.message)
  })

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
      setJson(paymentIntent)
      // @ts-ignore
          updateOrder({id:new URLSearchParams(window.location.search).get(
              "orderId"
            ) ,paymentIntentId: paymentIntent?.id, status: paymentIntent?.status === 'succeeded' ? 'PAID' : 'CREATED'})
      // @ts-ignore
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage(`Płatność zakończyła się sukcesem!`);
          break;
        case "processing":
          setMessage("Płatność jest przetwarzana.");
          break;
        case "requires_payment_method":
          setMessage(`Płatność nie powiodła się, ponieważ metoda płatności wymaga uwierzytelnienia, które nie powiodło się lub zostało anulowane.`);
          break;
        default:
          setMessage("Coś poszło nie tak... Spróbuj ponownie później");
          break;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stripe]);

  if(!json || Object.keys(json).length === 0) return <LoadingPage size={50}/>

  return (

    <div>
      {json && json.status !== 'succeeded' ?

        <div className={'flex h-[70vh] flex-col content-center items-center justify-center'}>
          <h1 className={'bold flex content-center items-center gap-4 text-4xl'}>
            Ups! Coś poszło nie tak <StopCircle
            color={'red'} size={46}/></h1>
          <Card className={'mt-6'}>
            <CardTitle className={'p-4'}> Wynik płatności</CardTitle>
            <CardContent>
              <hr className={'my-1'}/>
              <p>{message}</p>
              kwota: {json && (json.amount / 100)?.toFixed(2)} {json && json.currency?.toUpperCase()}
            </CardContent>
          </Card>
          <div className={'space-x-6'}>
            <Link href={'/'}><Button className={'my-6 w-52'}>Wróć do strony głównej</Button></Link>
            <Link href={'/store'}><Button className={'my-6 w-52'}>Wróć do sklepu</Button></Link>
          </div>
        </div>
        :
        <div className={'flex h-[70vh] flex-col content-center items-center justify-center'}>
          <h1 className={'bold flex content-center items-center gap-4 text-4xl'}>Super! Wszystko opłacone <CheckCircle
            color={'green'} size={46}/></h1>
          <Card className={'mt-6'}>
            <CardTitle className={'p-4'}> Wynik płatności</CardTitle>
            <CardContent>
              <hr className={'my-1'}/>
              <p>{message}</p>
              kwota: {json && (json.amount / 100)?.toFixed(2)} {json && json.currency?.toUpperCase()}
            </CardContent>
          </Card>
          <div className={'space-x-6'}>
            <Link href={'/'}><Button className={'my-6 w-52'}>Wróć do strony głównej</Button></Link>
            <Link href={'/store'}><Button className={'my-6 w-52'}>Wróć do sklepu</Button></Link>
          </div>
        </div>
      }


      {json && <pre className={'mt-610'}>{JSON.stringify(json, null, 2)}</pre>}
    </div>
  )
}

export default PaymentResult
