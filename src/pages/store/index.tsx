import ShopItemCard from "@/components/ShopItemCard";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {calculateTotals} from "@/redux/shoppingCart";
import {api} from "@/utils/api";
import {Header} from "@/components/ui/Header";
import {Skeleton} from "@/components/ui/skeleton";


const SkeletonProducts = ({isLoading}) => {
  return <>{
    isLoading && [1, 2, 3,4].map(i =>
      <div className={'flex flex-col'}>
        <Skeleton className=" h-[190px] rounded-b-none bg-slate-200 dark:bg-slate-700"/>
        <Skeleton className=" h-[190px] rounded-t-none bg-slate-200 dark:bg-slate-800"/>
      </div>
    )
  }</>
}

const StoreHomePages: React.FC = () => {

  const dispatch = useDispatch()
  // @ts-ignore
  const cartData = useSelector(state => state.shoppingCart.cartItems)
  const {data: products, isLoading: isLoadingProducts} = api.product.getAllProducts.useQuery()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartData, dispatch])

  return (
    <>
      <Header title={'Sklep'} subtitle={'Zakupy u Martyny'} className={undefined}/>
      <div className={'text-xl'}>Sklep jest w trakcie rozwoju. Ciężko nad tym pracuję, więc przydałoby się troszkę wsparcia 😁😁😁. Kliknij i kup mi 👜 coś fajnego na wzmocnienie 💪.
      </div>
      <div className={'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
        <SkeletonProducts isLoading={isLoadingProducts}/>
        {products?.length && products.map((product) => (
          <ShopItemCard cart={false} key={product.id} item={product} onAddToCart={() => null}/>
        ))}
      </div>
    </>
  );
};


export default StoreHomePages;
