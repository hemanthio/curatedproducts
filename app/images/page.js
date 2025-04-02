import React from "react";
import Image from "next/image";

const ImagePage = () => {
  return (
    <div>
      <Image
        src="/curatedproducts.png"
        alt="Curated Products Logo"
        width={1200}
        height={630}
        priority
      />
    </div>
  );
};

export default ImagePage;
