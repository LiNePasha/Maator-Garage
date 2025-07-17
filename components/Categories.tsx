"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImageCard from "./ImageCard";
import { useTheme } from "next-themes";
import { useTranslations, useLocale } from "next-intl";

type categoriesProps = {
  home: boolean;
};

type GroupData = {
  acf: any;
  group_urls: any[];
};

const Categories = ({ home }: categoriesProps) => {
  const { theme } = useTheme();
  const locale = useLocale();
  const t = useTranslations("NavBar");

  const images = [
    {
      src: "https://ik.imagekit.io/evhp4armq/4c-700x828.webp?updatedAt=1752750517089",
      alt: "bike1",
      category: "Motorcycles",
      href: "motorcycles",
      label: t("motorcycles"),
    },
    {
      src: "https://ik.imagekit.io/evhp4armq/%D8%A8%D9%86%D8%B2%D9%8A%D9%86-700x828.webp?updatedAt=1752750516335",
      alt: "bike2",
      category: "Scooters",
      href: "scooters",
      label: t("scooters"),
    },
    {
      src: "https://ik.imagekit.io/evhp4armq/%D9%83%D9%87%D8%B1%D8%A8%D8%A7-700x828.webp?updatedAt=1752750516747",
      alt: "bike2",
      category: "ScootersE",
      href: "scootersElectric",
      label: t("scooters"),
    },
  ];

  const backgroundColor = theme === "dark" ? "#0E0B0B" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";

  const imageSource =
    theme === "dark" ? "/Models (2).png" : "/categoriesLight.png";

  return (
    <div style={{ backgroundColor, color: textColor }} className="overflow-hidden px-4 md:px-10">
      <div>
        <div>
          {/* <ImageCard imgSrc={imageSource} /> */}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-2 place-items-center">
          {images.map((image, index) => (
            <Link
            href={`/${locale}/${image.href}`}
              key={index}
              className="relative w-full h-[350px] lg:h-[550px] rounded-lg overflow-hidden"
            >
              <Image
                src={image.src}
                alt={image.alt}
                layout="fill"
                quality={100}
                className="rounded-lg object-cover m-0"
              />
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Categories;
