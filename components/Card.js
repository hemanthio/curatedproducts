import React from "react";
import { GeistSans } from "geist/font/sans";



const Card = ({ product }) => {
  return (
    
      <a href={product.url} target="_blank" >
      <main className={GeistSans.className}>
      <div className="border relative font-medium bg-[#f9f9f9] flex flex-col gap-3  w-[300px] h-[270px] rounded-2xl p-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-16 h-16 object-cover"
        />
        <h2 className="text-lg  font-semibold color-[#0F0F0F] opacity-90">{product.name}</h2>
        <p className="text-[#6D6D6D]/90 leading-[130%] tracking-tight">{product.description}</p>
        <div className="absolute bottom-6 right-6">
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
