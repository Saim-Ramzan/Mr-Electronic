"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Image from "next/image";

interface Props {
  name: string;
  description: string;
  images: [];
  price: number
  addtoCard: VoidFunction
  handleView: VoidFunction 
}
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function ImgMediaCard({ name, description, images, price, addtoCard,handleView }: Props) {
  return (
    <Card sx={{ maxWidth: 345, maxheight: 345 }} className="w-[345px] border border-l-pink-50 shadow-lg ">
    <Carousel responsive={responsive}>
        {images?.map((image, index) => (
            <div className="relative w-full h-[250px]" key={index}>
            <Image src={image} alt={name} fill className="object-cover" />
            </div>
        ))}
      </Carousel>
    <CardContent className="h-40">
      <Typography gutterBottom height={50} variant="h5" component="div">
        {name?.split(" ")?.length > 3
          ? name.split(" ").slice(0, 3).join(" ") + "..."
          : name || "Name"}
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {description?.split(" ")?.length > 10
          ? description.split(" ").slice(0, 10).join(" ") + "..."
          : description || "Description"}
      </Typography>
    </CardContent>
      <div className=" h-[35px] mt-5 ml-5 ">
        <button
          className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800"
        >
          <span>Buy now</span>
          <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
            ${price || "100"}
          </span>
        </button>
      </div>
    <CardActions >
      <Button size="medium" onClick={addtoCard} startIcon={<AddShoppingCartIcon />}>
        Add to cart
      </Button>
      <Button size="medium" onClick={handleView} startIcon={<VisibilityIcon />}>
        View
      </Button>
    </CardActions>
  </Card>
  
  );
}
