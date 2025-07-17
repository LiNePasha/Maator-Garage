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
      src: "https://ik.imagekit.io/evhp4armq/image(1).webp?updatedAt=1752532440923",
      alt: "bike1",
      category: "Motorcycles",
      label: t("motorcycles"),
    },
    {
      src: "https://ik.imagekit.io/evhp4armq/rideapart-review-suzuki-burgman-400-abs.jpg",
      alt: "bike2",
      category: "Scooters",
      label: t("scooters"),
    },
  ];

  const backgroundColor = theme === "dark" ? "#0E0B0B" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";
  const buttonBackground = theme === "light" ? "#000000" : "#FFFFFF";
  const buttonTextColor = theme === "light" ? "#FFFFFF" : "#000000";
  const buttonBorderColor = theme === "light" ? "#000000" : "#FFFFFF";
  
  const imageSource =
    theme === "light" ? "/categoriesLight.png" : "/Models (2).png";

  return (
    <div className="min-h-screen overflow-hidden px-4 md:px-10">
      <div style={{ backgroundColor, color: textColor }}>
        <div>
          <ImageCard imgSrc={imageSource} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 lg:gap-8 mt-2">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative w-full h-[350px] lg:h-[521px] rounded-lg overflow-hidden"
            >
              <Image
                src={images[index].src}
                alt={images[index].alt}
                layout="fill"
                quality={100}
                className="rounded-lg object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)",
                  zIndex: 10,
                }}
              ></div>

              <div className="absolute inset-x-0 bottom-4 text-center z-20 text-white">
                <h3
                  className="text-3xl font-semibold"
                  style={{ color: "white" }}
                >
                  {image.label}
                </h3>
                <a
                  href={
                    image.category === "Motorcycles"
                      ? `/${locale}/motorcycles`
                      : image.category === "Scooters"
                      ? `/${locale}/scooters`
                      : image.category === "Accessories"
                      ? `/${locale}/accessories`
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

        {/* Button Section */}
        {/* <div className="flex justify-center items-center mt-10 pb-10">
          <Link href={`/${locale}/categories`} passHref>
            <button
              className="px-6 py-2 uppercase tracking-wide rounded-lg transition duration-200 text-xl"
              style={{
                backgroundColor: buttonBackground,
                color: buttonTextColor,
                border: `1px solid ${buttonBorderColor}`,
              }}
            >
              SHOW MORE
            </button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Categories;
