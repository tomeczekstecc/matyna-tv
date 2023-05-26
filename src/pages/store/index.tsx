import Link from "next/link";
import ShopItemCard from "@/components/ShopItemCard";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {calculateTotals} from "@/redux/shoppingCart";

const StoreHomePages: React.FC = () => {

  const dispatch = useDispatch()
  // @ts-ignore
  const cartData = useSelector(state => state.shoppingCart.cartItems)

  type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    featured?: boolean;
    hero?: boolean;
  }

  const data: Product[] = [
    {
      id: 1,
      name: "Product 1",
      price: 100,
      description: "This is a description of product 1",
      image: "https://picsum.photos/400/300",
      category: "category 1",
      featured: true,
      hero: true,
    },
    {
      id: 2,
      name: "Product 2",
      price: 200,
      description: "This is a description of product 2",
      image: "https://picsum.photos/400/300",
      category: "category 1",


    },
    {
      id: 3,
      name: "Product 3",
      price: 300,
      description: "This is a description of product 3",
      image: "https://picsum.photos/400/300",
      category: "category 1",


    },
    {
      id: 4,
      name: "Product 4",
      price: 400,
      description: "This is a description of product 4 This is a description of product 4",
      image: "https://picsum.photos/400/300",
      category: "category 1",


    },
    {
      id: 5,
      name: "Product 5",
      price: 500,
      description: "This is a description of product 5",
      image: "https://picsum.photos/400/300",
      category: "category 1",

    }
  ]

  useEffect(() => {

    dispatch(calculateTotals())

  }, [cartData])

  return (
    <>
      <h1>Store</h1>
      <p>Store Home Page</p>
      <div className={'grid grid-cols-4 gap-4'}>
        {data.map((product) => (
          <ShopItemCard key={product.id} item={product} onAddToCart={() => null}/>
        ))}
      </div>
    </>
  );
};


export default StoreHomePages;
