"use client";
import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Fade from "@mui/material/Fade";
import Chip from "@mui/material/Chip";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(3px)",
});

const ModalContent = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "90%", 
  maxWidth: "900px",
  maxHeight: "90vh",
  overflowY: "auto",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "12px",
  boxShadow: theme.shadows[24],
  padding: 0,
  "&:focus": {
    outline: "none",
  },
  [theme.breakpoints.down("md")]: {
    width: "95%",
    maxHeight: "95vh",
  },
}));

const CloseButton = styled(IconButton)({
  position: "absolute",
  right: "8px",
  top: "8px",
  zIndex: 1,
  backgroundColor: "rgba(0,0,0,0.1)",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

interface Props {
  name: string;
  description: string;
  images: [];
  price: number;
  addtoCard: VoidFunction;
  handleView?: VoidFunction;
  rating?: number;
  colors?: string[];
  sizes?: string[];
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

export default function ProductCard({
  name,
  description,
  images,
  price,
  addtoCard,
  rating = 4.5,
  colors = ["Red", "Blue", "Black"],
}: Props) {
  const [open, setOpen] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(colors[0]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        sx={{ maxWidth: 345, maxHeight: 500 }}
        className="w-[345px] border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <Carousel 
          responsive={responsive} 
          infinite 
          autoPlay={false}
          arrows={images?.length > 1}
          showDots={images?.length > 1}
        >
          {images?.map((image, index) => (
            <div className="relative w-full h-[250px]" key={index}>
              <Image src={image} alt={name} fill className="object-cover" />
            </div>
          ))}
        </Carousel>

        <CardContent className="h-40">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="line-clamp-2"
          >
            {name || "Product Name"}
          </Typography>
          <div className="flex items-center mb-2">
            <Rating value={rating} precision={0.5} readOnly size="small" />
            <span className="ml-1 text-sm text-gray-500">({rating})</span>
          </div>
          <Typography
            variant="body2"
            color="text.secondary"
            className="line-clamp-3"
          >
            {description || "Product description"}
          </Typography>
        </CardContent>

        <div className="flex justify-between items-center px-3 pb-3">
          <Typography variant="h6" color="primary">
            ${price.toFixed(2) || "0.00"}
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={handleOpen}
            startIcon={<VisibilityIcon />}
            sx={{ textTransform: "none" }}
          >
            View
          </Button>
        </div>
      </Card>

      <StyledModal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <ModalContent>
            <CloseButton onClick={handleClose} aria-label="close">
              <CloseIcon />
            </CloseButton>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              <div className="relative h-full">
                <Carousel
                  responsive={responsive}
                  infinite
                  showDots={images?.length > 1}
                  arrows={images?.length > 1}
                  autoPlay={false}
                  className="h-full"
                >
                  {images?.map((image, index) => (
                    <div 
                      className="relative w-full h-[300px] md:h-[400px]" 
                      key={index}
                    >
                      <Image
                        src={image}
                        alt={name}
                        fill
                        className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                        priority={index === 0}
                      />
                    </div>
                  ))}
                </Carousel>
              </div>

              <div className="p-4 md:p-6">
                <Typography 
                  variant="h4" 
                  component="h1" 
                  gutterBottom
                  sx={{
                    fontSize: {
                      xs: '1.5rem',
                      sm: '2rem'
                    }
                  }}
                >
                  {name}
                </Typography>

                <div className="flex items-center mb-4">
                  <Rating value={rating} precision={0.1} readOnly size="small" />
                  <span className="ml-2 text-gray-600 text-sm md:text-base">
                    ({rating}) • 24 reviews
                  </span>
                </div>

                <Typography 
                  variant="h5" 
                  color="primary" 
                  gutterBottom
                  sx={{
                    fontSize: {
                      xs: '1.25rem',
                      sm: '1.5rem'
                    }
                  }}
                >
                  ${price.toFixed(2)}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography 
                  variant="body1" 
                  paragraph
                  sx={{
                    fontSize: {
                      xs: '0.875rem',
                      sm: '1rem'
                    }
                  }}
                >
                  {description}
                </Typography>

                <div className="mb-3">
                  <Typography 
                    variant="subtitle1" 
                    gutterBottom
                    sx={{
                      fontSize: {
                        xs: '0.875rem',
                        sm: '1rem'
                      }
                    }}
                  >
                    Color: <span className="font-medium">{selectedColor}</span>
                  </Typography>
                  <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                      <Chip
                        key={color}
                        label={color}
                        onClick={() => setSelectedColor(color)}
                        variant={
                          selectedColor === color ? "filled" : "outlined"
                        }
                        color="primary"
                        size="small"
                        sx={{
                          fontSize: {
                            xs: '0.75rem',
                            sm: '0.875rem'
                          }
                        }}
                      />
                    ))}
                  </div>
                </div>

                <Divider sx={{ my: 2 }} />

                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    fullWidth
                    startIcon={<AddShoppingCartIcon />}
                    onClick={() => {
                      addtoCard();
                      handleClose();
                    }}
                    sx={{ 
                      py: 1,
                      fontSize: {
                        xs: '0.75rem',
                        sm: '0.875rem'
                      }
                    }}
                  >
                    Add to Cart
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="medium"
                    fullWidth
                    sx={{ 
                      py: 1,
                      fontSize: {
                        xs: '0.75rem',
                        sm: '0.875rem'
                      }
                    }}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </ModalContent>
        </Fade>
      </StyledModal>
    </>
  );
}