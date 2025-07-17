import ShootingBanner from "@/components/ShootingBanner";
import MotorcyclesSection from "@/components/MotorcycleSection";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const siteName = "ماتور جراچ";
  const currentLocale = params.locale;
  const isArabic = currentLocale === "ar";

  const title = isArabic ? "الموتوسيكلات | ماتور جراچ" : "Motorcycles | Mator Garage";
  const description = isArabic
    ? "اكتشف مجموعتنا من الموتوسيكلات وخدمات ماتور جراچ."
    : "Discover our collection of motorcycles and Mator Garage services.";
    const keywords = isArabic
  ? [
      "صور موتوسيكلات",
      "معرض موتوسيكلات ماتور جراچ",
      "قائمة الموتوسيكلات",
      "مجموعات موتوسيكلات",
      "موتوسيكلات للبيع",
      "مواصفات موتوسيكلات",
      "دراجات نارية",
      "صيانة موتوسيكلات",
      "إكسسوارات موتوسيكلات",
      "ماتور جراچ موتوسيكلات",
    ]
  : [
      "motorcycle images",
      "Mator Garage motorcycle gallery",
      "motorcycle list",
      "motorcycle collections",
      "motorcycles for sale",
      "motorcycle specs",
      "motorcycles",
      "motorcycle maintenance",
      "motorcycle accessories",
      "Mator Garage motorcycles",
    ];

  const url = `https://maator.com/${currentLocale}/motorcycles`;
  const image = "https://maator.com/motorcycles-cover.jpg"; // استبدل هذا برابط صورة الغلاف الخاصة بالموتوسيكلات

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
        en: "https://maator.com/en/motorcycles",
        ar: "https://maator.com/ar/motorcycles",
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

export default function motorcycles() {
  return (
    <>
      <ShootingBanner />
      <MotorcyclesSection />
    </>
  );
}
