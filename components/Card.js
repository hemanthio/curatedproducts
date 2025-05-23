import React from "react";
import { GeistSans } from "geist/font/sans";
import Link from "next/link";

const Card = ({ product }) => {
  const truncatedDescription =
    product.description.split(" ").length > 10
      ? product.description.split(" ").slice(0, 15).join(" ") + "."
      : product.description;

      const slug = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

  return (
    <Link href={`/${slug}`} target="_blank">
      <main className={GeistSans.className}>
        <div className="border-[1.9px] max-sm:border-[1.2px] border-gray-300 relative font-medium bg-white flex flex-col gap-2  w-[300px] h-[250px] max-sm:w-full max-sm:h-auto rounded-2xl p-6">
        <div className="flex items-center gap-3">
          <img
            src={product.image}
            alt={product.name}
            className="w-10 h-10 object-cover rounded-md"
          />
          <h2 className="text-lg tracking-tight font-semibold color-[#0F0F0F] opacity-90">
            {product.name}
          </h2>
          </div>
          <p className="text-[#6D6D6D]/90 mt-3 leading-[130%] tracking-tight">
            {truncatedDescription}
          </p>
          <div className="flex justify-between items-center max-sm:mt-3 mt-auto">
            <div className="flex flex-wrap gap-2">
              {product.tags.length > 2 ? (
                <>
                  {product.tags.slice(0, 2).map((tag, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 border-gray-300 border  rounded-md text-[#A59D9D]"
                    >
                      {tag}
                    </span>
                  ))}
                  <span className="text-xs px-2 py-1 border-gray-300 border rounded-md text-[#A59D9D]">
                    +{product.tags.length - 2}
                  </span>
                </>
              ) : (
                product.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 border-gray-300 border rounded-md text-[#A59D9D]"
                  >
                    {tag}
                  </span>
                ))
              )}
            </div>
            <img src="/icons/link.svg" alt="link" width={20} height={20} />
          </div>
        </div>
      </main>
    </Link>
  );
};

export default Card;
