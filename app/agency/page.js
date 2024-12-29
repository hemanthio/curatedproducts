"use client";

import { supabase } from "../../lib/supabase";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";

export default function AgencyPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .filter("tags", "cs", '["agency"]');

      if (error) {
        console.error("Error fetching products:", error.message);
      } else {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap gap-12">
        {products.map((product) => (
          <div key={product.id} >
            <Card product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
