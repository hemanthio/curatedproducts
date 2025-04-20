// app/admin/leaderboard/page.jsx
"use client";

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { GeistSans } from "geist/font/sans";
import Link from 'next/link';

export default function Leaderboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  async function fetchLeaderboardData() {
    setLoading(true);
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('id, name, url, image, clicks')
        .gt('clicks', 0) // Only show sites with at least 1 click
        .order('clicks', { ascending: false });
      
      if (error) throw error;
      
      setProducts(data || []);
    } catch (err) {
      console.error('Error fetching leaderboard data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Generate a background color based on position
  const getPositionColor = (index) => {
    if (index === 0) return 'bg-yellow-100 border-yellow-300'; // Gold
    if (index === 1) return 'bg-gray-100 border-gray-300'; // Silver
    if (index === 2) return 'bg-amber-100 border-amber-300'; // Bronze
    return '';
  };

  return (
    <main className={`${GeistSans.className} container mx-auto px-4 py-8`}>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Website Click Leaderboard</h1>
          <Link href="/admin" className="text-blue-600 hover:underline">
            Back to Dashboard
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center my-12">
            <p>Loading leaderboard data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md text-red-600 my-4">
            Error: {error}
          </div>
        ) : products.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-md text-center">
            <p className="text-gray-600">No website clicks recorded yet.</p>
            <p className="text-sm text-gray-500 mt-2">Try visiting some websites first to generate click data.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Website</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Clicks</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product, index) => (
                  <tr 
                    key={product.id} 
                    className={`${getPositionColor(index)} hover:bg-gray-50`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-bold text-gray-900">#{index + 1}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img 
                          className="h-10 w-10 rounded-md object-cover mr-3" 
                          src={product.image} 
                          alt={product.name} 
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <a 
                            href={product.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline truncate max-w-xs block"
                          >
                            {product.url}
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="text-lg font-bold">{product.clicks}</div>
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