import ContactForm from "@/components/ContactForm";

// app/[locale]/contact-us/page.tsx أو ملف metadata حسب البنية عندك
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const siteName = "ماتور جراچ";
  const currentLocale = params.locale;
  const isArabic = currentLocale === "ar";

  const title = isArabic ? "تواصل معنا | ماتور جراچ" : "Contact Us";
  const description = isArabic
    ? "اتصل بنا الآن لأي استفسار بخصوص خدمات ماتور جراچ."
    : "Get in touch with us for any inquiries about Mator Garage services.";
    const keywords = isArabic
  ? [
      "تواصل معنا",
      "اتصل بماتور جراچ",
      "معلومات الاتصال",
      "خدمة العملاء",
      "دعم ماتور جراچ",
      "رقم الهاتف",
      "البريد الإلكتروني",
      "موقع ماتور جراچ",
      "طلب استفسار",
      "دعم العملاء ماتور جراچ",
    ]
  : [
      "contact us",
      "contact Mator Garage",
      "contact information",
      "customer service",
      "Mator Garage support",
      "phone number",
      "email address",
      "Mator Garage location",
      "inquiry request",
      "customer support Mator Garage",
    ];


  const url = `https://maator.com/${currentLocale}/contact-us`;
  const image = "https://maator.com/logo.png"; // ضع رابط صورة فعلية هنا

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
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
        url: image,
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
        en: "https://maator.com/en/contact",
        ar: "https://maator.com/ar/contact",
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
      <ContactForm />
    </>
  );
}
