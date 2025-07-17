"use client";
import ImageCard from "./ImageCard";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useLocale, useTranslations } from "next-intl";

interface ImageData {
  id: number;
  acf: {
    image_urls: string[];
  };
}

type ShootingProps = {
  condition: boolean;
};

const Shooting = ({ condition }: ShootingProps) => {
  const [images, setImages] = useState<string[]>([]);
  const { theme } = useTheme();
  const t = useTranslations("Hero");

  const locale = useLocale();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://store.maator.com/wp-json/wp/v2/images?acf_format=standard&_fields=acf.image_urls"
        );
        const data: ImageData[] = await response.json();

        const allImages = data.flatMap((item) => item.acf.image_urls || []);
        const selectedImages = condition ? allImages.slice(0, 4) : allImages;

        setImages(selectedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [condition]);

  const backgroundColor = theme === "dark" ? "#0E0B0B" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";
  const buttonBackground = theme === "dark" ? "#FFFFFF" : "#000000";
  const buttonTextColor = theme === "dark" ? "#000000" : "#FFFFFF";
  const buttonBorderColor = theme === "dark" ? "#FFFFFF" : "#000000";
  const imageSource =
    theme === "light" ? "/shootingLight.png" : "/Shooting.png";

  return (
    <div
      className="text-white overflow-hidden px-4 md:px-10"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="text-center mb-6">
        <h2 className="text-3xl lg:text-4xl !mt-0 !mb-4 font-extrabold text-gray-800 dark:text-white tracking-wide relative inline-block">
          <span className="relative z-10">{t("galleryTitle")}</span>
          <span className="absolute left-1/2 -bottom-[0.5rem] transform -translate-x-1/2 w-3/4 h-1 bg-[#B91C1C] rounded-full opacity-70"></span>
        </h2>
        <p className="text-gray-500 dark:text-white text-sm sm:text-base">
          {t("gallerySubtitle")}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {images.length === 0 ? (
          <div className="text-center text-xl">No images available.</div>
        ) : (
          images.map((imageUrl, index) => (
            <div key={index} className="relative w-full h-[400px]">
              <Image
                src={imageUrl}
                alt={`Image ${index + 1}`}
                className="rounded-xl object-contain"
                layout="fill"
              />
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center items-center pb-10 mt-[10vh]">
        <Link href={`/${locale}/shooting`} passHref>
          <button
            className="inline-block px-6 py-2 uppercase tracking-wide rounded-lg transition duration-200 text-xl "
            style={{
              backgroundColor: buttonBackground,
              color: buttonTextColor,
              border: `1px solid ${buttonBorderColor}`,
            }}
          >
            {t("showMore")}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Shooting;
