import {ChevronDown, Circle, Plus, ShoppingCart, Star} from "lucide-react"

import {Button} from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Separator} from "@/components/ui/separator"
import Image from "next/image";
import {blurURI} from "@/config/blutURI";
import Category from "@/components/Category";
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "@/redux/shoppingCart";

type ShopItemCardProps = {
  item: {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    featured?: boolean;
  }
  onAddToCart: (item: any) => void;
  key: number;
}

const ShopItemCard = ({item, onAddToCart, key}: ShopItemCardProps) => {

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

    <Card className={'w-50'} key={key}>
      <Image src={item.image} alt={'product'}
             placeholder={'blur'}
             className={'rounded-t-md'}
             blurDataURL={blurURI}
             width={400}
             height={300}
      />
      <CardHeader className="">
        <div className="space-y-1">
          <CardTitle>{item.name}</CardTitle>
          <CardDescription>
            {item.description}
          </CardDescription>
        </div>
        {/*<div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">*/}
        {/*<Button variant="secondary" className="px-3">*/}
        {/*  <Star className="mr-2 h-5 w-5"/>*/}
        {/*</Button>*/}
        {/*<Separator orientation="vertical" className="h-[20px]"/>*/}
        {/*<DropdownMenu>*/}
        {/*  <DropdownMenuTrigger asChild>*/}
        {/*    <Button variant="secondary" className="px-2">*/}
        {/*      <ChevronDown className="h-4 w-4 text-secondary-foreground"/>*/}
        {/*    </Button>*/}
        {/*  </DropdownMenuTrigger>*/}
        {/*  <DropdownMenuContent*/}
        {/*    align="end"*/}
        {/*    alignOffset={-5}*/}
        {/*    className="w-[200px]"*/}
        {/*    forceMount*/}
        {/*  >*/}
        {/*    <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>*/}
        {/*    <DropdownMenuSeparator/>*/}
        {/*    <DropdownMenuCheckboxItem checked>*/}
        {/*      Future Ideas*/}
        {/*    </DropdownMenuCheckboxItem>*/}
        {/*    <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>*/}
        {/*    <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>*/}
        {/*    <DropdownMenuSeparator/>*/}
        {/*    <DropdownMenuItem>*/}
        {/*      <Plus className="mr-2 h-4 w-4"/> Create List*/}
        {/*    </DropdownMenuItem>*/}
        {/*  </DropdownMenuContent>*/}
        {/*</DropdownMenu>*/}
        {/*</div>*/}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="text-4xl font-semibold">${item.price}</div>
          <Button onClick={() => dispatch(addItem({name: item.name, id: item.id, quantity: 1, image: item.image, price:item.price}))}>
            <Plus className="h-6 w-6"/>
            <ShoppingCart className="mr-2 h-6 w-6"/>

          </Button>
        </div>
        <div className="mt-6 flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            {/*<Circle className="mr-1 h-3 w-3 fill-sky-400 text-sky-400"/>*/}
            <Category data={data}/>
          </div>
          {cartData && cartData.quantity > 0 && <div className="flex items-center">
            <ShoppingCart className="mr-1 h-4 w-4"/>
            { cartData.quantity }
            {cartData.value&& ` (${cartData.value} PLN)`}


          </div>}
        </div>
      </CardContent>
    </Card>
  )
}

export default ShopItemCard;
