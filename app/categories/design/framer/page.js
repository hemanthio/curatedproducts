"use client";


import React, { useEffect, useState } from "react";
import Card from "../../../../components/Card";

import useFramer from "../../../../hooks/useFramer"; // Import the custom hook

export default function FramerPage() {
  const { products, error } = useFramer(); // Use the custom hook

  if (error) {
    console.error("Error fetching products:", error);
    return <div>Error fetching products</div>; // Handle error case
  }

  return (
    <div>
      <div className="flex flex-wrap gap-10  ">
        {products.map((product) => (
          <div key={product.id} >
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
