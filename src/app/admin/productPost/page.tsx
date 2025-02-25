"use client";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Stack } from "@mui/material";
import { useFormik } from "formik";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";

function ProductPost() {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const previews = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
      });
    });

    const base64Images = await Promise.all(previews);

    setImagePreviews(base64Images); // For displaying previews
    setFieldValue("images", base64Images); // Save Base64 images to form values
  };

  const { handleChange, handleSubmit, values, setFieldValue ,resetForm} = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      images: [], // Base64-encoded images
    },

    onSubmit: async (value) => {
      try {
        // Save data to Firestore
        await addDoc(collection(db, "products"), {
          name: value.name,
          description: value.description,
          price: value.price,
          images: value.images, // Base64 strings
        });
        resetForm()

        console.log("Document successfully written!");
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    },
  });

  return (
    <div className="flex flex-1 flex-col gap-6 p-6 bg-[#dedeff38]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <Stack
          sx={{ "& .MuiTextField-root": { m: 1 } }}
        >
          <TextField
            onChange={handleChange}
            name="name"
            value={values.name}
            required
            id="outlined-required"
            label="Name"
          />
          <TextField
            onChange={handleChange}
            name="description"
            value={values.description}
            required
            id="outlined-required"
            label="Description"
          />
          <TextField
            value={values.price}
            required
            id="outlined-required"
            label="Price"
            type="number"
            placeholder="$"
            onChange={handleChange}
            name="price"
          />
          <Button
            component="label"
            role={undefined}
            variant="contained"
            className="w-[20%]"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={handleImageUpload}
              multiple
            />
          </Button>
          {imagePreviews.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1">
              {imagePreviews.map((preview, index) => (
                <div key={index} className="w-32 h-32">
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover border rounded"
                  />
                </div>
              ))}
            </div>
          )}
          <button className="mt-1" type="submit">
            Submit
          </button>
        </Stack>
      </form>
    </div>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default ProductPost;
