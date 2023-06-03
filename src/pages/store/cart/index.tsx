import {Button} from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {ShoppingCart as ShoppingCartIcon} from "lucide-react"
import ShopItemCard from "@/components/ShopItemCard";
import {useSelector} from "react-redux";
import {Separator} from "@/components/ui/separator";
import {Badge} from "@/components/ui/badge";
import {api} from "@/utils/api";
import {useRouter} from "next/router";
import {Close} from "@radix-ui/react-dialog";
import ShopItemCheckout from "@/components/ShopItemCheckout";


export const Items = ({items, checkout}) => {
  return (
    <div>
      {items.map((item) => {
        if(!checkout) {
        return <ShopItemCard cart={true} item={item} onAddToCart={() => null} key={item.id}/>
        }
        else{
          return <ShopItemCheckout cart={true} item={item} onAddToCart={() => null} key={item.id}/>
        }
      })}
    </div>
  )
}

const ShoppingCart = () => {
  const router = useRouter()

  // @ts-ignore
  const cart = useSelector(state => state.shoppingCart)
  const {mutate: finishOrder} = api.order.addOrder.useMutation({
    onSuccess: (res) => {
      console.log(res,'res')
      return router.push('/store/checkout')
    },
    onError: () => router.push('/store/checkout?error=true')
  })

  const handleFinishOrder =async () => {
    const items = cart.cartItems.map((item) => {
        return {
          id: item.id,
          quantity: item.quantity
        }
      }
    )
    // close sheet
    await finishOrder({items: items})

   const closeBtn =  document?.getElementsByClassName('closeBtn')?.item(0)
    // @ts-ignore
    if(closeBtn) closeBtn.click()
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <div className={'relative'}>
            {cart.amount > 0 && <Badge className={'absolute top-2 right-2 scale-90'}>{cart.amount}</Badge>}
            <ShoppingCartIcon className="h-5 w-5 opacity-75"/>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent position="right" size="content">

        <SheetHeader>
          <SheetTitle className={'text-3xl'}>Twój koszyk</SheetTitle>
        </SheetHeader>

        <Items items={cart.cartItems} checkout={false}/>

        <Separator className={'my-6 mt-10'}/>
        <div className={'flex flex-col gap-4'}>
          <div className={'text-2xl font-bold'}>Podsumowanie</div>
          <div className={'flex justify-between'}>
            <div className={'text-xl'}>Suma do zapłaty</div>
            <div className={'text-xl font-bold'}>{cart.total} PLN</div>
          </div>
          <div className={'flex justify-between'}>
            <div className={'text-xl'}>Liczba przedmiotów</div>
            <div className={'text-xl font-bold'}>{cart.amount}</div>
          </div>
        </div>

        <SheetFooter className={'flex flex-col-reverse'}>
          <Close className={'closeBtn'}>
          </Close>
          <Button onClick={() => handleFinishOrder()} className={'mt-8 w-full text-lg'} size={'lg'} type="submit">Dokończ
            zakup
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ShoppingCart;
