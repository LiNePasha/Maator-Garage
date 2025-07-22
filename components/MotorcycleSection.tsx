"use client";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";

interface Motorcycle {
  id: number;
  slug: string;
  src: string;
  title: string;
  price: string;
  displacement: string;
  horsePower: string;
  torque: string;
  dryWeight: string;
  seatHeight: string;
  safety: string;
}

const MotorcyclesSection = () => {
  const { theme } = useTheme();
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await fetch(
          "https://store.maator.com/wp-json/wp/v2/motors?acf_format=standard&_fields=acf,id,slug"
        );
        const data = await response.json();

        const formattedData = data.map((item: any) => ({
          id: item.id,
          slug: item.slug,
          src: item.acf.image,
          title: item.acf.name,
          price: item.acf.price,
          displacement: item.acf.displacement,
          horsePower: item.acf.horsepower,
          torque: item.acf.torque,
          dryWeight: item.acf.dryweight,
          seatHeight: item.acf.seatheight,
          safety: item.acf.safety,
        }));

        setMotorcycles(formattedData);
      } catch (error) {
        console.error("Failed to fetch motorcycles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycles();
  }, []);
  const t = useTranslations("motor");
  const backgroundColor = theme === "dark" ? "#0E0B0B" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";

  const totalPages = Math.ceil(motorcycles.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const displayedMotorcycles = motorcycles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const changePage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <section style={{ backgroundColor, color: textColor }}>
      <div className="container mx-auto mt-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {loading
            ? Array(itemsPerPage)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="border rounded-lg overflow-hidden bg-[#F1F2F4] animate-pulse"
                  >
                    <div className="relative w-full mx-auto h-[30vh] px-4 bg-gray-300"></div>
                    <div className="p-4 flex flex-col justify-between h-[120px]">
                      <div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
                      <div className="bg-gray-300 h-4 w-1/2 mb-4"></div>
                      <div className="bg-gray-300 h-8 w-full"></div>
                    </div>
                  </div>
                ))
            : displayedMotorcycles.map((bike) => (
                <div
                  key={bike.id}
                  onClick={() => {
                    router.push(`/${locale}/motocycle/${bike.slug}`);
                  }}
                  className="overflow-hidden cursor-pointer"
                >
                  <div className="relative w-full mx-auto h-[50vh] md:h-[55vh] px-0 md:px-4">
                    <Image
                      src={bike.src}
                      alt={bike.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-xl !m-0"
                    />
                  </div>

                  <div className="p-2 text-center ">
                    <h3 className="text-lg md:text-3xl !font-bold !mt-0 !mb-1 dark:text-white">
                      {bike.title}
                    </h3>
                    <p className="text-primary text-lg font-bold">
                      {bike.price}
                    </p>
                    <button
                      onClick={() => {
                        router.push(`/${locale}/motocycle/${bike.slug}`);
                      }}
                      className="mt-4 bg-primary text-white px-3 py-1 rounded"
                    >
                      {t("showDetails")}
                    </button>
                  </div>
                </div>
              ))}
        </div>
        <div
          className="flex items-center justify-center mt-8 mb-4 space-x-4"
          dir="ltr"
        >
          <button
            onClick={() => changePage(page - 1)}
            disabled={page === 1}
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              page === 1
                ? "opacity-50 cursor-not-allowed bg-gray-500"
                : "bg-primary text-white hover:opacity-80"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => changePage(index + 1)}
              className={`text-xl relative ${
                page === index + 1
                  ? "font-bold after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary"
                  : "hover:text-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => changePage(page + 1)}
            disabled={page === totalPages}
            className={`flex items-center justify-center w-10 h-10 rounded-full ${
              page === totalPages
                ? "opacity-50 cursor-not-allowed bg-gray-500"
                : "bg-primary text-white hover:opacity-80"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 001.414 0l4-4a1 1 0 000-1.414l-4-4a1 1 0 10-1.414 1.414L10.586 10l-3.293 3.293a1 1 0 000 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default MotorcyclesSection;
