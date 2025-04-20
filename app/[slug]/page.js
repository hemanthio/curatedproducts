"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";
import { trackWebsiteClick } from "../../utils/trackClick";

export default function ProductDetail() {
  const params = useParams();
  const slug = params.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductBySlug() {
      if (!slug) return;

      setLoading(true);

      const searchName = slug.replace(/-/g, " ");

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${searchName}%`)
        .limit(1);

      if (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
      } else if (data && data.length > 0) {
        setProduct(data[0]);
      } else {
        setError("Product not found");
      }

      setLoading(false);
    }

    fetchProductBySlug();
  }, [slug]);

  const handleVisitWebsite = async (e) => {
    e.preventDefault(); // Prevent default link behavior

    if (!product?.id) {
      console.error("No product ID available for click tracking");
      return;
    }

    try {
      // Track the click first
      const result = await trackWebsiteClick(product.id);

      if (!result.success) {
        console.error("Failed to track click:", result.error);
        // Still allow the user to visit the website even if tracking fails
      }

      // Open the website in a new tab
      window.open(product.url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Error handling website visit:", error);
      // Still allow the user to visit the website even if tracking fails
      window.open(product.url, "_blank", "noopener,noreferrer");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Product not found</p>
      </div>
    );

  return (
    <main
      className={`${GeistSans.className} container mx-auto px-4 py-8 max-w-4xl`}
    >
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <h1 className="text-3xl font-bold">{product.name}</h1>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-700 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {product.tags &&
            product.tags.map((tag, index) => (
              <span
                key={index}
                className="text-sm px-3 py-1 border-gray-300 border rounded-md text-gray-600"
              >
                {tag}
              </span>
            ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
          <div className="order-2 sm:order-1">
            <Link 
              href="/" 
              className="text-gray-600 flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <span>← Back to products</span>
            </Link>
          </div>

          <div className="order-1 sm:order-2">
            <a
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleVisitWebsite}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors w-full sm:w-auto"
            >
              <span>Visit Website</span>
              <img src="/icons/link.svg" alt="link" width={20} height={20} />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
