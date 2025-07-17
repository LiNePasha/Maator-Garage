"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useTranslations } from "next-intl";

type GroupData = {
  acf: any;
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<any[]>([
    {
      label: "Motorcycles",
    },
    {
      label: "Scooters",
    },
  ]);
  const [page, setPage] = useState(1);
  const imagesPerPage = 6;
  const { theme } = useTheme();
  const t = useTranslations("NavBar");
  const images = [
    { src: "https://ik.imagekit.io/xcyd6uv91/image(1).png", alt: "bike1" },
    { src: "https://ik.imagekit.io/xcyd6uv91/image(2).png", alt: "bike2" },
    { src: "https://ik.imagekit.io/xcyd6uv91/image(3).png", alt: "bike3" },
  ];

  const startIndex = (page - 1) * imagesPerPage;
  const totalPages = Math.ceil(categories.length / imagesPerPage);

  const changePage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const backgroundColor = theme === "dark" ? "#0E0B0B" : " #FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : " #000000" ;

  return (
    <div
      className="min-h-screen overflow-hidden px-4 md:px-10"
      style={{ backgroundColor, color: textColor }}
    >
      {false && (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-5 mt-[16vh]">
            {false &&
              categories.map((category, index) => (
                <div
                  key={index}
                  className="relative w-full h-[521px] rounded-lg overflow-hidden "
                >
                  <Image
                    src={images[startIndex + index]?.src || "/default.jpg"}
                    alt={category.label}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                  <div className="absolute inset-x-0 bottom-4 text-center z-20 text-white">
                    <h3 className="text-3xl !text-white font-semibold">
                      {category.label}
                    </h3>
                    <a
                      href={
                        category.label === "Motorcycles"
                          ? "/motorcycles"
                          : category.label === "Scooters"
                          ? "/scooters"
                          : category.label === "Accessories"
                          ? "/accessories"
                          : "#"
                      }
                      className="text-md mt-2 underline-offset-2 hover:underline"
                      style={{
                        textDecorationColor: "white",
                        textDecorationThickness: ".8px",
                        color: "white",
                      }}
                    >
                      {t("learnMore")}
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesSection;
