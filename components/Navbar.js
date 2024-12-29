import React from "react";
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className="fixed z-10 bg-white top-0 left-0 w-full flex items-center justify-between py-3 px-2 border-b border-gray-300">
      <Link href="/" className="font-bold ml-3 text-2xl tracking-[-1.5px]">
        CuratedProducts
      </Link>
      <div className="search and submit mr-3 flex gap-3">
        <input
          type="text"
          name="search"
          required
          placeholder="Search products"
          className="border rounded-lg p-2 text-[#808080] bg-[#ebebeb]"
        />
        <button className="bg-black text-white rounded-md px-[24px] py-[9px]">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Navbar;
