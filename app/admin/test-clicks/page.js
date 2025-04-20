// app/admin/test-clicks/page.jsx
"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";

export default function TestClicks() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStatus, setUpdateStatus] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("products")
        .select("id, name, url, image, clicks")
        .order("name", { ascending: true });

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function addClickManually(productId) {
    try {
      setUpdateStatus((prev) => ({ ...prev, [productId]: "updating" }));

      // First get the current click count
      const { data, error: fetchError } = await supabase
        .from("products")
        .select("clicks")
        .eq("id", productId)
        .single();

      if (fetchError) {
        console.error("Error fetching current click count:", fetchError);
        throw fetchError;
      }

      // Calculate new click count
      const currentClicks = data?.clicks || 0;
      const newClickCount = currentClicks + 1;

      // Update with new click count
      const { error: updateError } = await supabase
        .from("products")
        .update({ clicks: newClickCount })
        .eq("id", productId);

      if (updateError) {
        console.error("Error updating click count:", updateError);
        throw updateError;
      }

      // Refresh the products list
      await fetchProducts();
      setUpdateStatus((prev) => ({ ...prev, [productId]: "success" }));

      // Clear status after a delay
      setTimeout(() => {
        setUpdateStatus((prev) => {
          const newState = { ...prev };
          delete newState[productId];
          return newState;
        });
      }, 2000);
    } catch (error) {
      console.error("Error adding click:", error);
      setUpdateStatus((prev) => ({ ...prev, [productId]: "error" }));

      // Clear error status after a delay
      setTimeout(() => {
        setUpdateStatus((prev) => {
          const newState = { ...prev };
          delete newState[productId];
          return newState;
        });
      }, 3000);
    }
  }

  return (
    <main className={`${GeistSans.className} container mx-auto px-4 py-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Test Click Tracking</h1>
          <Link href="/admin" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-6">
          <p className="text-yellow-800">
            This page allows you to manually add clicks to products for testing
            purposes. After adding clicks, check the{" "}
            <Link href="/admin/leaderboard" className="underline">
              leaderboard
            </Link>{" "}
            to see if they appear.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center my-12">
            <p>Loading products...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-600 my-4">
            Error: {error}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Clicks
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 rounded-md object-cover mr-3"
                          src={product.image}
                          alt={product.name}
                        />
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-lg font-medium">
                        {product.clicks || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => addClickManually(product.id)}
                        disabled={updateStatus[product.id] === "updating"}
                        className={`px-4 py-2 rounded-md ${
                          updateStatus[product.id] === "updating"
                            ? "bg-gray-300 cursor-not-allowed"
                            : updateStatus[product.id] === "success"
                            ? "bg-green-500 text-white"
                            : updateStatus[product.id] === "error"
                            ? "bg-red-500 text-white"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                      >
                        {updateStatus[product.id] === "updating"
                          ? "Updating..."
                          : updateStatus[product.id] === "success"
                          ? "Success!"
                          : updateStatus[product.id] === "error"
                          ? "Error!"
                          : "Add Click"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
