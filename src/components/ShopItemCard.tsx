import {Minus, Plus, ShoppingCart, Star, Trash} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from "next/image";
import {blurURI} from "@/config/blutURI";
import Category from "@/components/Category";
import {useDispatch, useSelector} from "react-redux";
import {addItem, decreaseQuantity, increaseQuantity, removeItem} from "@/redux/shoppingCart";
import {Input} from "@/components/ui/input";
import _ from "lodash";

// type ShopItemCardProps = {
//   item: {
//     id: number;
//     name: string;
//     price: number;
//     description: string;
//     imgURL: string;
//     featured?: boolean;
//   }
//   onAddToCart: (item: any) => void;
//   key: number;
// }

const ShopItemCard = ({item, onAddToCart, key, cart}) => {

  const dispatch = useDispatch()
// @ts-ignore
  const cartData = useSelector(state => state.shoppingCart.cartItems.find((cartItem) => cartItem.id === item.id))
  const data = {
    category: {
      name: 'Wsparcie autora',
      color: '#F87171'
    }
  }

  return (

    <Card className={cart ? 'mx-6 mt-3 flex h-36 w-[650px]' : 'max-w-sm'} key={key}>
      <div>
        <Image
          src={item.imgURL || 'https://picsum.photos/400/267'}
               alt={'product'}
               placeholder={'blur'}
               className={cart ? 'rounded-l-md' : 'rounded-t-md'}
               blurDataURL={blurURI}
               width={cart ? 220 : 400}
               height={cart ? 100 : 267}
        />
      </div>
      <div className={cart ? 'w-[450px]' : ''}>
        <CardHeader className={cart? 'py-3' : ''}>
          <div className="space-y-1">
            <CardTitle
              className={'flex items-center justify-between'}>
              {item.name}
              {cart && <div title={'Usuń z koszyka'}>
                <Trash onClick={() => dispatch(removeItem({id: item.id}))}
                       className={"text-red-600 hover:cursor-pointer dark:text-red-300"}/>
              </div>}

            </CardTitle>
            <CardDescription>
              {item.description}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex w-full items-center justify-between">
            <div className={cart ? "text-2xl font-semibold" : "text-4xl font-semibold"}>
              {item.price.toFixed(2)} <span className={'text-2xl'}>PLN</span>
            </div>
            {!cart && <Button onClick={() => dispatch(addItem({
              name: item.name,
              id: item.id,
              quantity: 1,
              imgURL: item.imgURL,
              price: item.price
            }))}>
              <Plus className="h-6 w-6"/>
              <ShoppingCart className="mr-2 h-6 w-6"/>
            </Button>}
            {cart && <div className={'flex items-center justify-between'}>
              <Button  className={'h-8 px-2'} variant={'ghost'} onClick={() => dispatch(increaseQuantity({id: item.id}))}>
                <Plus className="h-4 w-4"/>
              </Button>
              <Input disabled className={'h-8 w-12 text-right opacity-0'} value={cartData?.quantity}/>
              <Button  className={'h-8 px-2'} variant={'ghost'} onClick={() => dispatch(decreaseQuantity({id: item.id}))}>
                <Minus className="h-4 w-4"/>
              </Button>
            </div>}
          </div>
          <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center">
              <Category data={data}/>
            </div>
            <div>
              {cartData && cartData.quantity > 0 &&
                <div className={cart ? "flex items-center text-2xl" : "flex items-center"}>
                  <div>
                    {!cart ? <div className={'flex gap-1'}>
                        <div>{cartData.quantity}</div>
                        <div className={''}>{cartData && `(${_.round((cartData.quantity * cartData?.price),2).toFixed(2)} PLN)`}</div>
                      </div>
                      :
                      <div className={'flex items-center gap-2'}>
                        <div className={'text-lg'}>Razem:</div>
                        <div
                          className={'text-xl font-extrabold'}> {cartData && `${_.round((cartData.quantity * cartData?.price),2).toFixed(2)} PLN`}</div>
                      </div>
                    }
                  </div>
                </div>}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default ShopItemCard;
