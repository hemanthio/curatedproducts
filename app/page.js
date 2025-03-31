"use client";

import React from "react";
import Hero from "../components/Hero";
import Card from "../components/Card";
import useAllTags from "../hooks/useAllTags";

const Page = () => {
  // Capitalized component name to follow React conventions
  const { products, error } = useAllTags(); // Use the custom hook

  if (error) {
    console.error("Error fetching products:", error);
    return <div>Error fetching products</div>; // Handle error case
  }
  return (
    <>
      <div className="">
        {/* <Hero /> */}
        <div className="flex flex-wrap mt-3   gap-10  ">
          {products.map((product) => (
            <div key={product.id}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Page; // Updated to use the corrected component name
