// app/motocycle/[slug]/page.tsx
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";

const Details = dynamic(() => import("./Details"), { ssr: false });

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const res = await fetch(
    `https://store.maator.com/wp-json/wp/v2/motors?slug=${params.slug}&acf_format=standard`,
    { next: { revalidate: 60 } }
  );
  const data = await res.json();
  const item = data[0]?.acf;

  if (!item) return {};

  return {
    title: `${item.name} | ماتور جراج`,
    description: `موتوسيكل ${item.name} بسعة ${item.displacement}، قوة ${item.horsepower} وسعر ${item.price}`,
    keywords: [
      item.name,
      `بسعة ${item.displacement}`,
      `قوة ${item.horsepower}`,
      "مواصفات موتوسيكل",
      "صيانة موتوسيكل",
      "إكسسوارات موتوسيكل",
      "موتوسيكل للبيع",
      "سعر موتوسيكل",
      "ماتور جراچ موتوسيكل",
      "موتوسيكل كهربائي",
      "موتوسيكل جديد",
    ],
    openGraph: {
      title: item.name,
      description: `اكتشف ${item.name} بمواصفات مميزة تشمل ${item.horsepower} حصان و${item.torque} نيوتن متر.`,
      type: "website",
      url: `https://maator.com/ar/motocycle/${params.slug}`,
      images: item.image ? [item.image] : [],
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  return <Details params={params} />;
}
