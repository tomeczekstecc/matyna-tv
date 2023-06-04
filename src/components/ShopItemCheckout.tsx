import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import Image from "next/image";
import {blurURI} from "@/config/blutURI";
import Category from "@/components/Category";
import {useDispatch} from "react-redux";
import _ from "lodash";

// type ShopItemCheckoutProps = {
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

const ShopItemCheckout = ({item, onAddToCart, key, cart}) => {

  const dispatch = useDispatch()
// @ts-ignore
  const data = {
    category: {
      name: 'Wsparcie autora',
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
              className={'flex content-center items-center gap-4'}>
              <div>{item.name}</div>
              <div>{item.price?.toFixed(2)} PLN</div>
              <div>({item?.quantity} szt)</div>
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
                <div className={'font-bold'}> {item && `${_.round((item.quantity * item?.price), 2)?.toFixed(2)} PLN`}</div>
              </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default ShopItemCheckout;
