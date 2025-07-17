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
        const selectedImages = condition ? allImages.slice(0, 3) : allImages;

        setImages(selectedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [condition]);

  const backgroundColor = theme === "dark" ? "#0E0B0B" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";
  const buttonBackground = theme === "light" ? "#000000" : "#FFFFFF";
  const buttonTextColor = theme === "light" ? "#FFFFFF" : "#000000";
  const buttonBorderColor = theme === "light" ? "#000000" : "#FFFFFF";
  const imageSource =
    theme === "light" ? "/shootingLight.png" : "/Shooting.png";

  return (
    <div
      className="text-white min-h-screen overflow-hidden px-4 md:px-10"
      style={{ backgroundColor, color: textColor }}
    >
      <div>
        <ImageCard imgSrc={imageSource} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {images.length === 0 ? (
          <div className="text-center text-xl">No images available.</div>
        ) : (
          images.map((imageUrl, index) => (
            <div key={index} className="relative w-full h-[400px]">
              <Image
                src={imageUrl}
                alt={`Image ${index + 1}`}
                className="rounded-xl object-cover"
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
