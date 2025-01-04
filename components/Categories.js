


"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const Categories = ({ isOpen, onClose }) => {
  const [activeItem, setActiveItem] = useState("/");
  const router = useRouter();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

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
    const isDesignSubItem = level === 2;

    return (
      <div key={item.name} className="w-full">
        <div
          className={`
            flex items-center rounded-md font-medium px-2 py-2 cursor-pointer
            ${level > 0 ? "pl-2" : ""}
            ${isActive ? "bg-blue-50 text-blue-600" : "hover:bg-gray-50"}
            ${isCategory ? "text-[#6A6A6A]" : "text-[#121212]"}
            ${isDesignSubItem ? "text-[#3b3b3b]" : ""}
          `}
          onClick={() => {
            if (!hasSubItems) {
              setActiveItem(item.link);
              router.push(item.link);
              if (isMobile && onClose) onClose();
            }
          }}
        >
          {item.icon && (
            <img src={item.icon} alt={`${item.name} icon`} className="w-5 h-5 mr-3" />
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

  const baseClasses = "bg-white overflow-y-auto scrollbar-hidden w-60 h-screen";
  const mobileClasses = `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ${
    isOpen ? "translate-x-0" : "-translate-x-full"
  }`;
  const desktopClasses = "fixed left-5 top-[80px] hidden md:block";

  return (
    <>
      {/* Desktop Categories */}
      <nav className={`${baseClasses} ${desktopClasses}`}>
        <div className="py-4">
          {sidebarData.map((item) => renderNavItem(item))}
        </div>
      </nav>

      {/* Mobile Categories */}
      <nav className={`${baseClasses} ${mobileClasses} md:hidden`}>
        <div className="py-4">
          <div className="flex justify-end px-4 mb-2">
            <X size={24} className="cursor-pointer" onClick={onClose} />
          </div>
          {sidebarData.map((item) => renderNavItem(item))}
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Categories;