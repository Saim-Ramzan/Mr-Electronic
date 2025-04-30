"use client";
import React, { useEffect,  } from "react";
import ImgMediaCard from "./common/cards";
import { Grid,  } from "@mui/material";

import { RootState, AppDispatch } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectProducts } from "@/app/store/Slice";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
// eslint-disable-next-line
interface ProductsInterface {
  name: string;
  description: string;
  price: number;
  images: [];
}
function Shopping() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  if (error) toast.error(error);

  // const addToCard = ( item: object ) => {
  //   const addedItem = []
  //   addedItem.push({...item})
  //   console.log("addedItem",addedItem)
  // }
  const addedItems: object[] = [];
  const addToCard = (item: object) => {
    addedItems.push({ ...item });
    dispatch(selectProducts(addedItems));
  };
  const handleViewItem = (item: object) => {
    console.log("item", item);
  }
  return (
<div>
  <Grid container gap={2} justifyContent={"center"}>
    {loading ? (
      <div className="flex justify-center items-center w-full h-40">
        <Loader color="white" width={30} />
      </div>
    ) : (
      products?.map((item) => (
        <ImgMediaCard
          description={item?.description}
          name={item?.name}
          price={item?.price}
          images={item?.images}
          addtoCard={() => addToCard(item)}
          handleView={() => handleViewItem(item)}
          key={item.id}
        />
      ))
    )}
  </Grid>
</div>

  );
}

export default Shopping;
