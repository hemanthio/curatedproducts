"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { Menu, Search, X } from "lucide-react";
import { useRouter } from "next/navigation"; // Import useRouter

const Navbar = ({ toggleSidebar }) => {
  const router = useRouter(); // Initialize useRouter
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.trim()) {
      const { data } = await supabase
        .from("products")
        .select("*")
        .ilike("name", `%${value}%`);
      setResults(data || []);
    } else {
      setResults([]);
    }
  };

  const clearSearch = () => {
    setResults([]);
    setSearchTerm("");
    setMobileSearchVisible(false);
  };

  const handleSubmit = () => {
    // Navigate to the submit page
    router.push('/submit');
  };

  return (
    <>
      <div className="fixed z-20 bg-white top-0 left-0 w-full flex items-center justify-between py-3 px-2 border-b border-gray-300">
        <div className="flex items-center">
          <Menu 
            size={24} 
            className="md:hidden cursor-pointer" 
            onClick={toggleSidebar}
          />
          <Link href="/" className="font-bold ml-3 text-2xl tracking-[-1.5px]">
            CuratedProducts
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center gap-3" ref={searchRef}>
          <input
            type="text"
            placeholder="Search products"
            className="border rounded-lg p-2 text-[#808080] bg-[#ebebeb]"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button 
            className="bg-black text-white rounded-md mr-4 px-6 py-2"
            onClick={handleSubmit} // Use handleSubmit to navigate
          >
            Submit
          </button>
          {results.length > 0 && (
            <div className="absolute top-14 w-[235px] bg-white border rounded-lg shadow-lg">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={product.url}
                  className="flex items-center p-2 hover:bg-gray-100"
                  onClick={clearSearch}
                >
                  <img src={product.image} alt={product.name} className="w-8 h-8 mr-2" />
                  <span>{product.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Mobile Search Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            className="bg-black text-white rounded-md mr-2 px-4 py-2"
            onClick={handleSubmit} // Use handleSubmit to navigate
          >
            Submit
          </button>
          <button 
            className="p-2"
            onClick={() => setMobileSearchVisible(!mobileSearchVisible)}
          >
            {mobileSearchVisible ? <X size={24} /> : <Search size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Overlay */}
      {mobileSearchVisible && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white p-4 shadow-lg z-10">
          <input
            type="text"
            placeholder="Search products"
            className="w-full p-2 rounded-lg bg-[#ebebeb]"
            value={searchTerm}
            onChange={handleSearch}
          />
          
          {results.length > 0 && (
            <div className="mt-2 border rounded-lg">
              {results.map((product) => (
                <a // Change Link to a for external links
                  key={product.id}
                  href={product.url}
                  className="flex items-center p-2 hover:bg-gray-50 border-b"
                  onClick={clearSearch}
                  target="_blank" // Open link in a new tab
                  rel="noopener noreferrer" // Security best practice
                >
                  <img src={product.image} alt={product.name} className="w-8 h-8 mr-2" />
                  <span>{product.name}</span>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;