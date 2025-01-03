


// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import Link from "next/link";
// import { supabase } from "../lib/supabase";
// import { Menu } from "lucide-react";


// const Navbar = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState([]);
//   const searchRef = useRef(null);

//   useEffect(() => {
//     // Add click event listener to handle clicks outside search
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setResults([]); // Clear results when clicking outside
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const handleSearch = async (e) => {
//     const value = e.target.value;
//     setSearchTerm(value);
    
//     if (value.trim()) {
//       const { data } = await supabase
//         .from("products")
//         .select("*")
//         .ilike("name", `%${value}%`);
//       setResults(data || []);
//     } else {
//       setResults([]); // Clear results when input is empty or only whitespace
//     }
//   };

//   const handleResultClick = () => {
//     setResults([]); // Clear results when a result is clicked
//     setSearchTerm(""); // Optionally clear the search term too
//   };

//   return (
//     <div className="fixed z-10 bg-white top-0 left-0 w-full flex items-center justify-between py-3 px-2 border-b border-gray-300">
//     <div className="flex items-center">
//     <Menu size={24} color="black" />
//       <Link href="/" className="font-bold ml-3 text-2xl tracking-[-1.5px]">
//         CuratedProducts
//       </Link>
//       </div>
//       <div className="search and submit mr-3 flex gap-3" ref={searchRef}>
//         <input
//           type="text"
//           name="search"
//           required
//           placeholder="Search products"
//           className="border rounded-lg p-2 text-[#808080] bg-[#ebebeb]"
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//         {results.length > 0 && (
//           <div className="absolute top-14 w-[235px] bg-white border border-gray-300 mt-1 rounded-lg shadow-lg">
//             {results.map((product) => (
//               <Link
//                 key={product.id}
//                 href={product.url}
//                 className="flex items-center p-2 hover:bg-gray-100"
//                 onClick={handleResultClick}
//               >
//                 <img
//                   src={product.image}
//                   alt={product.name}
//                   className="w-8 h-8 mr-2"
//                 />
//                 <span>{product.name}</span>
//               </Link>
//             ))}
//           </div>
//         )}
//         <button className="bg-black text-white rounded-md px-[24px] py-[9px]">
//           Submit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

'use client'

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { supabase } from "../lib/supabase";
import { Menu, X } from "lucide-react";
import Categories from "./Categories";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setResults([]);
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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

  const handleResultClick = () => {
    setResults([]);
    setSearchTerm("");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="fixed z-20 bg-white top-0 left-0 w-full flex items-center justify-between py-3 px-2 border-b border-gray-300">
        <div className="flex items-center">
          <button 
            onClick={toggleMenu}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} color="black" />
            ) : (
              <Menu size={24} color="black" />
            )}
          </button>
          <Link href="/" className="font-bold ml-3 text-2xl tracking-[-1.5px]">
            CuratedProducts
          </Link>
        </div>
        <div className="search and submit mr-3 flex gap-3" ref={searchRef}>
          <input
            type="text"
            name="search"
            required
            placeholder="Search products"
            className="border rounded-lg p-2 text-[#808080] bg-[#ebebeb]"
            value={searchTerm}
            onChange={handleSearch}
          />
          {results.length > 0 && (
            <div className="absolute top-14 w-[235px] bg-white border border-gray-300 mt-1 rounded-lg shadow-lg">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={product.url}
                  className="flex items-center p-2 hover:bg-gray-100"
                  onClick={handleResultClick}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-8 h-8 mr-2"
                  />
                  <span>{product.name}</span>
                </Link>
              ))}
            </div>
          )}
          <button className="bg-black text-white rounded-md px-6 py-2">
            Submit
          </button>
        </div>
      </div>

      {/* Mobile Menu Container */}
      <div 
        className={`
          fixed inset-0 bg-white z-10 transform transition-transform duration-300 pt-16
          md:static md:transform-none md:transition-none md:bg-transparent
          ${isMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
        ref={menuRef}
      >
        <Categories isMenuOpen={isMenuOpen} />
      </div>
    </>
  );
};

export default Navbar;