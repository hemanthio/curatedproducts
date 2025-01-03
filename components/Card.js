import React from "react";
import { GeistSans } from "geist/font/sans";

const Card = ({ product }) => {
  const truncatedDescription = product.description.split(' ').length > 10 
    ? product.description.split(' ').slice(0, 15).join(' ') + '...' 
    : product.description;

  return (
      <a href={product.url} target="_blank" >
      <main className={GeistSans.className}>
      <div className="border-2  relative font-medium bg-white flex flex-col gap-2  w-[300px] h-[230px] rounded-2xl p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-10 h-10 object-cover"
        />
        <h2 className="text-lg  font-semibold color-[#0F0F0F] opacity-90">{product.name}</h2>
        <p className="text-[#6D6D6D]/90 pb-4 leading-[130%] tracking-tight">{truncatedDescription}</p>
        <div className="absolute bottom-4 right-4">
            <img 
              src="/icons/link.svg" 
              alt="link"
              width={20}
              height={20}
            />
          </div>
        </div>
        </main>
      </a>
  );
};

export default Card;
