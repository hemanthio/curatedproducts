"use client";

import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import useSubmit from "../../hooks/useSubmit"; // Import the custom hook
import { supabase } from "../../lib/supabase"; // Import supabase client

export default function ProductsPage() {
  const { products: initialProducts, error } = useSubmit(); // Rename to avoid conflict
  const [products, setProducts] = useState([]); // Add state management

  // Set initial products when they're fetched
  useEffect(() => {
    if (initialProducts) {
      setProducts(initialProducts);
    }
  }, [initialProducts]);

  const handleAccept = async (product) => {
    // Move product to the products table
    const { data, error: insertError } = await supabase
      .from("products")
      .insert([product]);

    if (insertError) {
      console.error("Error moving product:", insertError);
    } else {
      console.log("Product moved successfully:", data);

      // Delete the product from the submit table after successful insertion
      const { error: deleteError } = await supabase
        .from("submit")
        .delete()
        .eq("id", product.id);

      if (deleteError) {
        console.error("Error deleting product from submit:", deleteError);
      } else {
        console.log("Product deleted from submit successfully");
        // Update the products state to remove the accepted product
        setProducts((prevProducts) =>
          prevProducts.filter((p) => p.id !== product.id)
        );
      }
    }
  };

  const handleReject = async (productId) => {
    // Delete the product from the submit table
    const { error } = await supabase
      .from("submit")
      .delete()
      .eq("id", productId);

    if (error) {
      console.error("Error deleting product:", error);
    } else {
      console.log("Product deleted successfully");
      // Update the products state to remove the rejected product
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );
    }
  };

  if (error) {
    console.error("Error fetching products:", error);
    return <div>Error fetching products</div>; // Handle error case
  }

  return (
    <div>
      <div className="flex flex-wrap gap-10">
        {products.map((product) => (
          <div key={product.id}>
            <Card product={product} />
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => handleReject(product.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Reject
              </button>
              <button
                onClick={() => handleAccept(product)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Accept
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
