import DriveSchool from "@/components/DriveSchoolForm";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;
  const isArabic = locale === "ar";
  const siteName = "ماتور جراچ";

  const title = isArabic
    ? "مدرسة تعليم السواقة | ماتور جراچ"
    : "Driving School | Mator Garage";

  const description = isArabic
    ? "مدرسة تعليم السواقة في ماتور جراچ تقدم دورات احترافية للسائقين المبتدئين والمحترفين في بيئة آمنة."
    : "Mator Garage Driving School offers professional driving lessons for beginners and experienced drivers in a safe environment.";
const keywords = isArabic
  ? [
      "مدرسة السواقة",
      "تعليم السواقة",
      "دروس قيادة السيارات",
      "تعليم قيادة السيارات",
      "مدرسة قيادة ماتور جراچ",
      "دورات السواقة",
      "تعليم السياقة للمبتدئين",
      "دروس تعليم قيادة السيارات",
      "رخصة القيادة",
      "تعليم السياقة في ماتور جراچ",
    ]
  : [
      "driving school",
      "driving lessons",
      "car driving training",
      "learn to drive",
      "Mator Garage driving school",
      "driving courses",
      "beginner driving lessons",
      "car driving classes",
      "driver’s license training",
      "driving instruction at Mator Garage",
    ];

  const url = `https://maator.com/${locale}/driveschool`;
  const image = "https://maator.com/logo.png"; // يمكنك استبداله بصورة مناسبة للدورة

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: title,
    description,
    url,
    logo: {
      "@type": "ImageObject",
      url: image,
    },
    sameAs: ["https://maator.com"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "EG",
    },
  };

  return {
    title,
    description,
    keywords: keywords.join(", "),
    alternates: {
      canonical: url,
      languages: {
        en: "https://maator.com/en/driveschool",
        ar: "https://maator.com/ar/driveschool",
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

export default function contact() {
  return (
    <>
      <DriveSchool />
    </>
  );
}
