"use client";

import { useLocale } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  slug: string;
  acf: {
    title?: string;
    image?: string;
    price?: string;
  };
  type: "motors" | "scooters";
};

async function fetchFromAPI(
  type: "motors" | "scooters",
  term: string
): Promise<Post[]> {
  const res = await fetch(
    `https://store.maator.com/wp-json/wp/v2/${type}?acf_format=standard&_fields=acf,id,slug&search=${encodeURIComponent(
      term
    )}`
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((item: any) => ({ ...item, type }));
}

export default function SearchResults({ term }: { term: string }) {
  const [results, setResults] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    setLoading(true); // Start loading
    const fetchData = async () => {
      const [motors, scooters] = await Promise.all([
        fetchFromAPI("motors", term),
        fetchFromAPI("scooters", term),
      ]);
      setResults([...motors, ...scooters]);
      setLoading(false); // Done loading
    };

    fetchData();
  }, [term]);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 md:gap-6">
      {loading ? (
        // Skeleton when loading
        Array.from({ length: 3 }).map((_, index) => (
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
      ) : results.length === 0 ? (
        <span className="my-20">لا يوجد نتائج.</span>
      ) : (
        results.map((item) => (
          <div
            key={item.id}
            className="bg-white text-center rounded shadow cursor-pointer"
            onClick={() => {
              router.push(
                `/${locale}/${
                  item.type === "motors" ? "motocycle" : "scooter"
                }/${item.slug}`
              );
            }}
          >
            {item.acf?.image && (
              <div className="relative w-full mx-auto h-[34vh] md:h-[55vh] px-0 md:px-4">
                <Image
                  src={item.acf.image}
                  alt={item.acf.title || item.slug}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl !m-0"
                />
              </div>
            )}
            <h3 className="text-lg md:text-3xl !font-bold !mt-0 !mb-1 dark:text-white">
              {item.acf?.title || item.slug}
            </h3>
            {item.acf?.price && (
              <p className="text-gray-700">💰 {item.acf.price}</p>
            )}
            <button
              onClick={() => {
                router.push(
                  `/${locale}/${
                    item.type === "motors" ? "motocycle" : "scooter"
                  }/${item.slug}`
                );
              }}
              className="my-3 bg-primary text-white px-3 py-1 rounded"
            >
              تفاصيل
            </button>
          </div>
        ))
      )}
    </div>
  );
}
