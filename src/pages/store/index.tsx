import ShopItemCard from "@/components/ShopItemCard";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {calculateTotals} from "@/redux/shoppingCart";
import {api} from "@/utils/api";
import {Header} from "@/components/ui/Header";


const StoreHomePages: React.FC = () => {

  const dispatch = useDispatch()
  // @ts-ignore
  const cartData = useSelector(state => state.shoppingCart.cartItems)
const {data: products} = api.product.getAllProducts.useQuery()

  useEffect(() => {
    dispatch(calculateTotals())
  }, [cartData, dispatch])

  return (
    <>
      <Header title={'Sklep'} subtitle={'Zakupy u Martyny'} className={undefined}/>
      <div className={'text-xl'} >Sklep jest w trakcie rozwoju. Póki co liczę na twoje wsparcie, które jest bardzo przyda mi się w czasie pracy.</div>
      <div className={'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'}>
        {products?.length && products.map((product) => (
          <ShopItemCard cart={false} key={product.id} item={product} onAddToCart={() => null}/>
        ))}
      </div>
    </>
  );
};


export default StoreHomePages;
