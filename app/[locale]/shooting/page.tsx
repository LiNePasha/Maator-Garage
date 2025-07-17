import ShootingBanner from "@/components/ShootingBanner";
import ShootingSection from "@/components/ShootingSection";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const siteName = "ماتور جراچ";
  const currentLocale = params.locale;
  const isArabic = currentLocale === "ar";

  const title = isArabic ? "معرض الصور | ماتور جراچ" : "Gallery | Mator Garage";
  const description = isArabic
    ? "شاهد مجموعتنا من الصور لموتوسيكلات وخدمات ماتور جراچ."
    : "Explore our collection of images showcasing motorcycles and Mator Garage services.";
  const keywords = isArabic
    ? [
        "صور موتوسيكلات",
        "معرض صور ماتور جراچ",
        "صور دراجات نارية",
        "صور صيانة موتوسيكلات",
        "صور إكسسوارات موتوسيكلات",
        "معرض صور الدراجات",
        "صور ورشة ماتور جراچ",
        "صور فحص وصيانة موتوسيكلات",
        "صور موتوسيكلات للبيع",
        "ماتور جراچ معرض الصور",
      ]
    : [
        "motorcycle images",
        "Mator Garage gallery",
        "motorcycle photos",
        "motorcycle maintenance images",
        "motorcycle accessories photos",
        "motorcycle gallery",
        "Mator Garage workshop photos",
        "inspection and maintenance images",
        "motorcycles for sale photos",
        "Mator Garage image gallery",
      ];

  const url = `https://maator.com/${currentLocale}/shooting`;
  const image = "https://maator.com/logo.png"; // استبدل هذا برابط صورة الغلاف للمعرض

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
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
        url: "https://maator.com/logo.png", // شعار الموقع
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
        en: "https://maator.com/en/gallery",
        ar: "https://maator.com/ar/gallery",
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
export default function shooting() {
  return (
    <>
      <ShootingBanner />
      <ShootingSection />
    </>
  );
}
