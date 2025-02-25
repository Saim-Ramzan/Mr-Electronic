"use client";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getCookie } from "@/lib/cookies";

interface ProductsInterface {
  id: string;
  name: string;
  description: string;
  price: number;
  images: []; // Array of image URLs
}

interface ProductsState {
  products: ProductsInterface[];
  loading: boolean;
  error: string | null;
  productsLength: number;
  selectedproducts: ProductsInterface[];
  selectedproductsLoading: boolean;
  selectedProductsError: string | null;
}

const initialState: ProductsState = {
  products: [],
  productsLength: 0,
  loading: false,
  error: null,
  selectedproducts: [],
  selectedProductsError: null,
  selectedproductsLoading: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const productsList: ProductsInterface[] = [];
    querySnapshot.forEach((doc) => {
      productsList.push({
        ...(doc.data() as ProductsInterface),
        id: doc.id,
      });
    });
    return productsList;
  }
);

// export const selectProducts = createAsyncThunk(
//   "products/selectProducts",
//   async (payload : any) => {
//     console.log("payload",payload)
//     try {
//       const token = await getCookie("token");
//       if (!token) {
//         throw new Error("User token is not available");
//       }
//       const userDocRef = doc(db, "users", token);
//       const nestedCollectionRef = collection(userDocRef, "selectedproducts");
//       const docRef = await addDoc(nestedCollectionRef, payload);
//       return { id: docRef.id, ...payload };
//     } catch (error: string | any) {
//       throw new Error(`Failed to add product: ${error.message}`);
//     }
//   }
// );
// export const selectProducts = createAsyncThunk(
//   "products/selectProducts",
//   async (payload: any) => {
//     try {
//       console.log("Payload received:", payload);

//       const token = await getCookie("token");
//       console.log("token", token);
//       // if (!token) {
//       //   throw new Error("User token is not available");
//       // }

//       const userDocRef = doc(db,  token);
//       console.log("User Doc Ref:", userDocRef.path);
//       const nestedCollectionRef = collection(userDocRef, "selectedproducts");
//       const docRef = await addDoc(nestedCollectionRef, payload);

//       return { id: docRef.id, ...payload };
//     } catch (error: any) {
//       console.error("Error adding product:", error.message);
//       throw new Error(`Failed to add product: ${error.message}`);
//     }
//   }
// );

export const selectProducts = createAsyncThunk(
  "products/selectProducts",
  // eslint-disable-next-line
  async (payload: any) => {
    try {
      console.log("Payload received:", payload);

      const token = await getCookie("token");
      if (!token) {
        throw new Error("User token is not available");
      }

      console.log("User token:", token);

      const userDocRef = doc(db, token);
      console.log("User Doc Ref:", userDocRef.path);

      const nestedCollectionRef = collection(userDocRef, "selectedproducts");
      const docRef = await addDoc(nestedCollectionRef, payload);

      console.log("Document added with ID:", docRef.id);
      return { id: docRef.id, ...payload };
      // eslint-disable-next-line
    } catch (error: any) {
      console.error("Error adding product:", error);
      throw error; // Rethrow the original error to preserve stack trace
    }
  }
);
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.productsLength = action.payload.length;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      // Select Product
      .addCase(selectProducts.pending, (state) => {
        state.selectedproductsLoading = true;
        state.selectedProductsError = null;
      })
      .addCase(selectProducts.fulfilled, (state, action) => {
        // Append the new product to the existing `selectedproducts` array
        state.selectedproducts.push(action.payload);
        state.selectedproductsLoading = false;
      })
      .addCase(selectProducts.rejected, (state, action) => {
        state.selectedproductsLoading = false;
        state.selectedProductsError =
          action.error.message || "Failed to select products";
      });
  },
});

export const productsReducer = productsSlice.reducer;
