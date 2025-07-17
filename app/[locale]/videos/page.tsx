import VideosBanner from "@/components/VideosBanner";
import VideosSection from "@/components/VideosSection";

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const siteName = "ماتور جراچ";
  const currentLocale = params.locale;
  const isArabic = currentLocale === "ar";

  const title = isArabic ? "فيديوهات | ماتور جراچ" : "Videos | Mator Garage";
  const keywords = isArabic
    ? [
        "فيديوهات موتوسيكلات",
        "فيديوهات ماتور جراچ",
        "فيديو صيانة موتوسيكلات",
        "فيديو مراجعات موتوسيكلات",
        "فيديو تعليم سواقة",
        "فيديو إصلاح دراجات نارية",
        "فيديو بيع موتوسيكلات",
        "ماتور جراچ فيديوهات",
        "دروس قيادة موتوسيكلات",
        "مقاطع فيديو موتوسيكلات",
      ]
    : [
        "motorcycle videos",
        "Mator Garage videos",
        "motorcycle maintenance videos",
        "motorcycle reviews videos",
        "riding lessons videos",
        "motorcycle repair videos",
        "motorcycle sales videos",
        "Mator Garage videos",
        "motorcycle riding tutorials",
        "motorcycle clips",
      ];
  const description = isArabic
    ? "شاهد فيديوهاتنا التي تعرض خدمات ومراجعات ماتور جراچ."
    : "Watch our videos showcasing Mator Garage services and reviews.";

  const url = `https://maator.com/${currentLocale}/videos`;
  const image = "https://maator.com/logo.png"; // رابط صورة غلاف الفيديوهات

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VideoGallery",
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
        en: "https://maator.com/en/videos",
        ar: "https://maator.com/ar/videos",
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

export default function video() {
  return (
    <>
      <VideosBanner />
      <VideosSection />
    </>
  );
}
