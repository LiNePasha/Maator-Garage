// Components
import Categories from "@/components/Categories";
import HeroSection from "@/components/HeroSection";
import Shooting from "@/components/Shooting";
import Videos from "@/components/Videos";
import Contact from "@/components/ContactUs";
import { Suspense } from "react";
import { useTranslations } from "next-intl";

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
    ? "ماتور جراج – معرض شامل للموتوسيكلات بيع – شراء – صيانة – إكسسوارات"
    : "Mator Garage - Motorcycle Workshop & Maintenance";
  const description = isArabic
    ? "ماتور جراچ هو مركز متخصص في اكسسوارات وصيانة وبيع الموتوسيكلات والأسكوتر في المعادي"
    : "Mator Garage is a specialized center for motorcycle maintenance and sales in the region.";

  const keywords = isArabic
    ? [
        "ماتور جراچ",
        "صيانة موتوسيكلات المعادي",
        "بيع موتوسيكلات",
        "ورشة موتوسيكلات",
        "خدمات ماتور جراچ",
        "بيع موتوسيكلات",
        "شراء موتوسيكلات",
        "صيانة موتوسيكلات",
        "إكسسوارات موتوسيكلات",
        "حماية موتوسيكلات",
        "فحص موتوسيكلات",
        "تعليم سواقة",
        "بيع وشراء موتوسيكلات",
      ]
    : [
        "Mator Garage",
        "motorcycle maintenance",
        "motorcycle sales",
        "motorcycle workshop",
        "Mator services",
      ];

  const url = `https://maator.com/${currentLocale}`;
  const image = "https://maator.com/home-cover.jpg"; // رابط صورة الغلاف للصفحة الرئيسية

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    description: description,
    url: url,
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
        en: "https://maator.com/en",
        ar: "https://maator.com/ar",
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

// This page is using the craft.tsx component and design system
export default function Home() {
  // const t = useTranslations('HomePage');

  return (
    <>
      <HeroSection />
      <Categories home={true} />
      <Videos />
      {/* <h1>{t('title')}</h1> */}
      <Shooting condition={true} />
      <Contact />
    </>
  );
}
