import {ChevronDown, Circle, Minus, Plus, ShoppingCart, Star, Trash} from "lucide-react"

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

type ShopItemCheckoutProps = {
  item: {
    id: number;
    name: string;
    price: number;
    description: string;
    imageURL: string;
    featured?: boolean;
  }
  onAddToCart: (item: any) => void;
  key: number;
}

const ShopItemCheckout = ({item, onAddToCart, key, cart}) => {

  const dispatch = useDispatch()
// @ts-ignore
  const cartData = useSelector(state => state.shoppingCart.cartItems.find((cartItem) => cartItem.id === item.id))
  const data = {
    category: {
      name: 'Category 1',
      color: '#F87171'
    }
  }

  return (

    <Card className={'mx-6 flex mb-3 w-[600px]'} key={key}>
      <div>
        <Image
          src={item.imgURL || 'https://picsum.photos/400/267'}
          alt={'product'}
          placeholder={'blur'}
          className={cart ? 'rounded-l-md' : 'rounded-t-md'}
          blurDataURL={blurURI}
          width={cart ? 140 : 400}
          height={cart ? 100 : 267}
        />
      </div>
      <div className={cart ? 'w-[450px]' : ''}>
        <CardHeader className={'py-3'}>
          <div className="space-y-1">
            <CardTitle
              className={'flex items-center content-center gap-4'}>
              <div>{item.name}</div>
              <div>{item.price} PLN</div>
              <div>({cartData?.quantity} szt)</div>
            </CardTitle>

          </div>
        </CardHeader>
        <CardContent>


          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <Category data={data}/>
            </div>


              <div className={'flex items-center gap-2 text-lg '}>
                <div>Razem:</div>
                <div className={'font-bold'}> {cartData && `${_.round((cartData.quantity * cartData?.price), 2)} PLN`}</div>
              </div>

          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default ShopItemCheckout;
