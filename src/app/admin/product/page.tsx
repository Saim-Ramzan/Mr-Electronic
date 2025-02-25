'use client'
import React, { useEffect } from "react";
import { LucideShoppingBag, EyeIcon, LocateFixed, Wallet, ChartColumn, ShoppingBasket, HandCoinsIcon, Loader } from "lucide-react";
import { RootState, AppDispatch, } from "@/lib/store";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from "@/app/store/Slice";
import ProductListLoding from "@/component/common/ProductListLoding";
import toast from "react-hot-toast";

function page() {
/* eslint-disable */
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error,productsLength } = useSelector((state: RootState) => state.products);
    useEffect(() => {
      dispatch(fetchProducts());
    }, [dispatch])
    
    console.log("productsLength",productsLength)
    
    if(error)(
        toast.error(error)
    )
    /* eslint-disable */
  return (
    <div className="flex flex-1 flex-col gap-6 p-6 bg-[#dedeff38]">
      <div className="grid gap-6 md:grid-cols-3  p-6 rounded-xl">
        <div className="flex flex-col justify-center items-center aspect-video rounded-xl bg-white shadow-lg  p-4 ">
          <div className="flex gap-3">
            <LucideShoppingBag />
            <h2 className="text-lg font-semibold">Total Products</h2>
          </div>
          {loading ?
            <div className="mt-2">
            <Loader/>
            </div>
            :
          <h3 className="text-3xl font-bold">{productsLength}</h3>
          }
        </div>
        <div className="flex flex-col justify-center items-center aspect-video rounded-xl bg-white shadow-lg  p-4 ">
          <div className="flex gap-3">
            <EyeIcon />
            <h2 className="text-lg font-semibold">Total Impressions</h2>
          </div>
          <h3 className="text-3xl font-bold">20</h3>
        </div>
        <div className="flex flex-col justify-center items-center aspect-video rounded-xl bg-white shadow-lg  p-4 ">
          <div className="flex gap-3">
            <LocateFixed />
            <h2 className="text-lg font-semibold">Total Orders</h2>
          </div>
          <h3 className="text-3xl font-bold">20</h3>
        </div>
      </div>
       {/* reported products */}
       <div className="flex flex-col gap-6 max-h-[33rem] shadow-lg overflow-y-auto py-5 px-5">
      {products.length === 0 ? <ProductListLoding /> :  products?.map((item, index) => (
        <>
      <div key={index} className="flex-1 flex flex-wrap rounded-xl items-center justify-between bg-white p-6 shadow-lg">  
        <h1 className="font-serif">{item.name.split(' ').length > 1 ? item.name.split(' ')[0] + ' ' + item.name.split(' ')[1] : item.name}</h1>
        <div className="flex gap-1">
        <h1>Product Price</h1>
        <h1>${item.price}</h1>
        <HandCoinsIcon />
        </div>
        <div className="flex gap-1 justify-center items-center">
        <h1>Impressions</h1>
        <h1>802</h1>
        <ChartColumn />
        </div>
        <div className="flex gap-1">
        <h1>Orders</h1>
        <h1>802</h1>
        <ShoppingBasket />
        </div>
        
        <div className="flex gap-1">
        <h1>Total Revenue</h1>
        <h1>$900k</h1>
        <Wallet />
        </div>
        
        <div className="flex gap-3">
        <button className="bg-green-500 text-white p-2 rounded-lg">View Product</button>
        </div>
      </div>
        </>
      )) }
      </div>

    </div>
  );
}

export default page;
