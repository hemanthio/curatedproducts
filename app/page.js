import Navbar from "@/components/Navbar";
import Categories from "@/components/Categories"; // Corrected import to match component name

import React from "react";
import Hero from "@/components/Hero";

const Page = () => {
  // Capitalized component name to follow React conventions
  return (
    <>
      <div className="mx-7">
        <Navbar />
        <Categories />
        <Hero />
      </div>
    </>
  );
};

export default Page; // Updated to use the corrected component name
