import {Button} from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {ShoppingCart as ShoppingCartIcon} from "lucide-react"
import ShopItemCard from "@/components/ShopItemCard";
import {useSelector} from "react-redux";
import {Separator} from "@/components/ui/separator";

const Items = ({items}) => {
  return (
    <div>
      {items.map((item) => {
        return <ShopItemCard cart={true} item={item} onAddToCart={() => null} key={item.id}/>
      })}
    </div>
  )
}

const ShoppingCart = () => {

  // @ts-ignore
  const cart= useSelector(state => state.shoppingCart)



  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <ShoppingCartIcon className="h-5 w-5"/></Button>
      </SheetTrigger>
      <SheetContent position="right" size="content">

        <SheetHeader>
          <SheetTitle className={'text-3xl'}>Twój koszyk</SheetTitle>
          {/*<SheetDescription>*/}
          {/*  Dokończ zamówienie*/}
          {/*</SheetDescription>*/}
        </SheetHeader>

        <Items items={cart.cartItems}/>

<Separator className={'my-6 mt-10'}/>
        <div className={'flex flex-col gap-4'} >
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
          <SheetClose asChild>
            <Button className={'mt-8 w-full text-lg'} size={'lg'} type="submit">Dokończ zakup</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default ShoppingCart;
