import ShootingBanner from "@/components/ShootingBanner";
import ScootersElectricSection from "@/components/ScootersElectricSection";

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const siteName = "ماتور جراچ";
  const currentLocale = params.locale;
  const isArabic = currentLocale === "ar";

  const title = isArabic
    ? "الاسكوترات الكهربا | ماتور جراچ"
    : "Scooters | Mator Garage";
  const description = isArabic
    ? "تصفح مجموعتنا من الاسكوترات وخدمات ماتور جراچ."
    : "Browse our collection of scooters and Mator Garage services.";
  const keywords = isArabic
    ? [
        "صور اسكوترات",
        "معرض صور اسكوترات كهربا ماتور جراچ",
        "صور دراجات اسكوتر",
        "صور صيانة اسكوترات",
        "صور إكسسوارات اسكوترات",
        "معرض صور الاسكوترات",
        "صور ورشة ماتور جراچ للاسكوترات",
        "صور فحص وصيانة اسكوترات",
        "صور اسكوترات للبيع",
        "ماتور جراچ معرض الاسكوترات",
      ]
    : [
        "scooter images",
        "Mator Garage scooter gallery",
        "scooter photos",
        "scooter maintenance images",
        "scooter accessories photos",
        "scooter gallery",
        "Mator Garage scooter workshop photos",
        "inspection and maintenance images for scooters",
        "scooters for sale photos",
        "Mator Garage scooter image gallery",
      ];

  const url = `https://maator.com/${currentLocale}/scootersElectric`;
  const image = "https://maator.com/scooters-cover.jpg"; // استبدل هذا برابط صورة الغلاف الخاصة بالاسكوترات

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: description,
    url: url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: "https://maator.com",
      logo: {
        "@type": "ImageObject",
        url: "https://maator.com/logo.png",
      },
    },
  };

  return {
    title,
    description,
    keywords: keywords.join(", "),

    alternates: {
      canonical: url,
      languages: {
        en: "https://maator.com/en/scootersElectric",
        ar: "https://maator.com/ar/scootersElectric",
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    other: {
      "script:ld+json": JSON.stringify(jsonLd),
    },
  };
}

export default function scooter() {
  return (
    <>
      <ShootingBanner />
      <ScootersElectricSection />
    </>
  );
}
