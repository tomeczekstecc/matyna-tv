import React, {useEffect} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import CheckoutForm from "@/components/CheckoutForm";
import {api} from "@/utils/api";
import {useTheme} from "next-themes";
import {Header} from "@/components/ui/Header";
import {Items} from "@/pages/store/cart";
import {useSelector} from "react-redux";
import PaymentResult from "@/components/(payment-result)";
import {LoadingPage} from "@/components/loading";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function Checkout() {

  // @ts-ignore
  const [clientSecretFromUrl, setClientSecretFromUrl] = React.useState('')
  const {theme} = useTheme()
  // @ts-ignore
  const orderId = useSelector(state => state?.order?.orderId)
  const {
    data: clientSecretResponse,
    mutate: getClientSecret,
    // error,
    isLoading
  } = api.payment.addPaymentIntent.useMutation({})
  const {data: orderResponse, error: orderError} = api.order.getOneOrderWithItemsById.useQuery({id: orderId},{
    enabled: !!orderId,

  })

  useEffect(() => {
      getClientSecret({orderId})
      const clientSec = new URLSearchParams(window.location.search).get(
        "payment_intent_client_secret"
      );
      // @ts-ignore

      setClientSecretFromUrl(clientSec)

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [])
  const appearance = {
    theme: 'flat',
    variables: {
      colorPrimary: '#0570de',
      colorBackground: theme === 'dark' ? '#334155' : '#cbd5e1',
      colorText: theme === 'dark' ? '#ffffff' : '#000000',
      colorDanger: '#df1b41',
      fontFamily: 'Ideal Sans, system-ui, sans-serif',
      spacingUnit: '3px',
      borderRadius: '4px',
      // See all possible variables below
    }
  };

  const options = {
    clientSecret: clientSecretResponse?.clientSecret,
    appearance,
    business: {
      name: 'My Company',
    }
  };



  if (isLoading) return <LoadingPage size={50}/>

  return (
    // @ts-ignore
    <Elements options={options} stripe={stripePromise}>
      {clientSecretFromUrl ?
        <PaymentResult/>
        :
        <div>
          <Header title={'Płatność'} subtitle={'Wybierz metodę płatności i uzupełnij dane'} className={'mb-6'}/>
          <div className={'flex'}>
            <div className={'w-1/2'}>
              {clientSecretResponse && (
                // @ts-ignore
                <div>
                  <CheckoutForm/>
                </div>
              )}
            </div>
            <div className={'ml-10'}>
              <Items items={orderResponse?.items || []} checkout={true}/>
              <div className={'flex flex-col gap-4 p-6'}>
                <div className={'text-2xl font-bold'}>Podsumowanie</div>
                <div className={'flex justify-between'}>
                  <div className={'text-xl'}>Suma do zapłaty</div>
                  <div className={'text-xl font-bold'}>{orderResponse?.total?.toFixed(2)} PLN</div>
                </div>
                <div className={'flex justify-between'}>
                  <div className={'text-xl'}>Liczba przedmiotów</div>
                  <div className={'text-xl font-bold'}>{orderResponse?.quantity}</div>
                </div>
              </div>


            </div>
          </div>
        </div>}
    </Elements>
  );
}
