// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation"; // Update import to use next/navigation


// const Categories = () => {
//   const [activeItem, setActiveItem] = useState("/"); // Set default active item to Discover link
//   const router = useRouter(); // Initialize useRouter

//   const sidebarData = [
//     {
//       name: "Discover",
//       icon: "/icons/discover.svg", // Placeholder for the discover icon
//       link: "/",
//     },
//     {
//       name: "Products",
//       icon: "/icons/product.svg",
//       link: "/products",
//     },
//     {
//       name: "Courses",
//       icon: "/icons/courses.svg",
//       link: "/courses",
//     },
//     {
//       name: "Agency",
//       icon: "/icons/agency.svg",
//       link: "/agency",
//     },
//     {
//       name: "Resources",
//       icon: "/icons/resources.svg",
//       link: "/resources",
//     },
//     {
//       name: "Categories",
//       type: "category",
//       alwaysOpen: true,
//       items: [
//         {
//           name: "AI",
//           link: "/categories/ai",
//           icon: "/icons/ai.svg",
//         },
//         {
//           name: "Development",
//           link: "/categories/development",
//           icon: "/icons/development.svg",
//         },
//         {
//           name: "Design",
//           link: "/categories/design",
//           icon: "/icons/design.svg",
//           alwaysOpen: true,
//           isExpanded: true,
//           items: [
//             {
//               name: "Figma",
//               link: "/categories/design/figma",
//             },
//             {
//               name: "Framer",
//               link: "/categories/design/framer",
//             },
//           ],
//         },
//         {
//           name: "Marketing",
//           link: "/categories/marketing",
//           icon: "/icons/marketing.svg",
//         },
//         {
//           name: "SEO",
//           link: "/categories/seo",
//           icon: "/icons/seo.svg",
//         },
//         {
//           name: "Copywriting",
//           link: "/categories/copywriting",
//           icon: "/icons/copywriting.svg",
//         },
//       ],
//     },
//   ];

//   const renderNavItem = (item, level = 0) => {
//     const isActive = activeItem === item.link;
//     const hasSubItems = item.items && item.items.length > 0;
//     const isCategory = item.type === "category";
//     const isDesignSection = item.name === "Design";
//     const isDesignSubItem = level === 2; // Design subsections are at level 2

//     return (
//       <div key={item.name} className="w-full ">
//         <div
//           className={`flex items-center rounded-md font-medium  px-2 py-2 cursor-pointer
//             ${level > 0 ? "pl-2" : ""}
//             ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}
//             ${isCategory ? " text-[#6A6A6A]" : "text-[#121212]"}
//             ${isDesignSubItem ? " text-[#3b3b3b]" : ""}
//           `}
//           onClick={() => {
//             if (!hasSubItems) {
//               setActiveItem(item.link);
//               router.push(item.link); // Navigate to the link
//             }
//           }}
//         >
//           {item.icon && (
//             <img
//               src={item.icon}
//               alt={`${item.name} icon`}
//               className="w-5 h-5 mr-3"
//             />
//           )}
//           <span className={`${!item.icon && !isCategory ? "ml-8" : ""}`}>
//             {item.name}
//           </span>
//         </div>
//         {hasSubItems && (
//           <div className="mt-1 ">
//             {item.items.map((subItem) => renderNavItem(subItem, level + 1))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <nav className="fixed left-5  top-[80px] overflow-y-scroll  w-60 h-screen bg-white  ">
//       <div className="py-4">
//         {sidebarData.map((item) => renderNavItem(item))}
//       </div>
//     </nav>
//   );
// };

// export default Categories;
'use client'

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Categories = ({ isMenuOpen }) => {
  const [activeItem, setActiveItem] = useState("/");
  const router = useRouter();

  const sidebarData = [
    {
      name: "Discover",
      icon: "/icons/discover.svg",
      link: "/",
    },
    {
      name: "Products",
      icon: "/icons/product.svg",
      link: "/products",
    },
    {
      name: "Courses",
      icon: "/icons/courses.svg",
      link: "/courses",
    },
    {
      name: "Agency",
      icon: "/icons/agency.svg",
      link: "/agency",
    },
    {
      name: "Resources",
      icon: "/icons/resources.svg",
      link: "/resources",
    },
    {
      name: "Categories",
      type: "category",
      alwaysOpen: true,
      items: [
        {
          name: "AI",
          link: "/categories/ai",
          icon: "/icons/ai.svg",
        },
        {
          name: "Development",
          link: "/categories/development",
          icon: "/icons/development.svg",
        },
        {
          name: "Design",
          link: "/categories/design",
          icon: "/icons/design.svg",
          alwaysOpen: true,
          isExpanded: true,
          items: [
            {
              name: "Figma",
              link: "/categories/design/figma",
            },
            {
              name: "Framer",
              link: "/categories/design/framer",
            },
          ],
        },
        {
          name: "Marketing",
          link: "/categories/marketing",
          icon: "/icons/marketing.svg",
        },
        {
          name: "SEO",
          link: "/categories/seo",
          icon: "/icons/seo.svg",
        },
        {
          name: "Copywriting",
          link: "/categories/copywriting",
          icon: "/icons/copywriting.svg",
        },
      ],
    },
  ];

  const renderNavItem = (item, level = 0) => {
    const isActive = activeItem === item.link;
    const hasSubItems = item.items && item.items.length > 0;
    const isCategory = item.type === "category";
    const isDesignSection = item.name === "Design";
    const isDesignSubItem = level === 2;

    return (
      <div key={item.name} className="w-full">
        <div
          className={`flex items-center rounded-md font-medium px-2 py-2 cursor-pointer
            ${level > 0 ? "pl-2" : ""}
            ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}
            ${isCategory ? "text-[#6A6A6A]" : "text-[#121212]"}
            ${isDesignSubItem ? "text-[#3b3b3b]" : ""}
          `}
          onClick={() => {
            if (!hasSubItems) {
              setActiveItem(item.link);
              router.push(item.link);
            }
          }}
        >
          {item.icon && (
            <img
              src={item.icon}
              alt={`${item.name} icon`}
              className="w-5 h-5 mr-3"
            />
          )}
          <span className={`${!item.icon && !isCategory ? "ml-8" : ""}`}>
            {item.name}
          </span>
        </div>
        {hasSubItems && (
          <div className="mt-1">
            {item.items.map((subItem) => renderNavItem(subItem, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`
      fixed bg-white
      md:left-5 md:top-[80px] md:w-60 md:h-screen md:block
      ${isMenuOpen ? 'block' : 'hidden md:block'}
      overflow-y-auto
      w-full h-full
    `}>
      <div className="py-4">
        {sidebarData.map((item) => renderNavItem(item))}
      </div>
    </nav>
  );
};

export default Categories;