import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
} from "@/lib/wordpress";

import { Section, Container, Article, Main } from "@/components/craft";
import { Metadata } from "next";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import Head from "next/head";

import Link from "next/link";
import Balancer from "react-wrap-balancer";

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }): Promise<Metadata> {
//   const post = await getPostBySlug(params.slug);
//   return {
//     title: post.title.rendered,
//     description: post.excerpt.rendered,
//   };
// }

export async function generateMetadata({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const post = await getPostBySlug(params.slug);
  const featuredMedia = await getFeaturedMediaById(post.featured_media);
  const url = `https://maator.com/${params.locale}/posts/${params.slug}`;
  const keywords = params.locale === "ar"
  ? [
      post.title.rendered,
      post.excerpt.rendered.replace(/<[^>]+>/g, ""),
      "مدونة ماتور جراچ",
      "نصائح وصيانة",
      "مراجعة موتوسيكلات",
      "محتوى ماتور جراچ",
      "مقالات فنية",
      "معلومات عن الموتوسيكلات",
      "ماتور جراچ تدوينة",
      "مقال اسكوتر",
    ]
  : [
      post.title.rendered,
      post.excerpt.rendered.replace(/<[^>]+>/g, ""),
      "Mator Garage blog",
      "tips and maintenance",
      "motorcycle review",
      "Mator Garage content",
      "technical articles",
      "motorcycle information",
      "Mator Garage post",
      "scooter article",
    ];


  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
    image: featuredMedia.source_url,
    author: {
      "@type": "Person",
      name: "Admin Maator Garage",
    },
    datePublished: post.date,
    dateModified: post.modified,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://maator.com/${params.locale}/posts/${params.slug}`,
    },
  };

  return {
    title: post.title.rendered,
    description: post.excerpt.rendered.replace(/<[^>]+>/g, ""), // remove HTML tags
    keywords: keywords.join(", "),
    alternates: {
      canonical: url,
      languages: {
        en: `https://maator.com/en/posts/${params.slug}`,
        ar: `https://maator.com/ar/posts/${params.slug}`,
      },
    },
    openGraph: {
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
      url,
      type: "article",
      images: [{ url: featuredMedia.source_url }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title.rendered,
      description: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
      images: [featuredMedia.source_url],
    },
    other: {
      // This goes into <head> during SSR
      "script:ld+json": JSON.stringify(jsonLd),
    },
  };
}

export default async function Page({
  params,
}: {
  params: { slug: string; locale: string };
}) {
  const post = await getPostBySlug(params.slug);
  const featuredMedia = await getFeaturedMediaById(post.featured_media);
  const author = await getAuthorById(post.author);
  const currentLocale = params.locale;
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(post.categories[0]);

  return (
      <Section>
        <Container>
          <h1 className="!mt-10">
            <Balancer>
              <span
                dangerouslySetInnerHTML={{ __html: post.title.rendered }}
              ></span>
            </Balancer>
          </h1>

          <div className="flex justify-between items-center gap-4 text-sm mb-4">
            <h5>
              Published {date} by{" "}
              {author.name && (
                <span>
                  <a href={`/${currentLocale}/posts/?author=${author.id}`}>
                    {author.name}
                  </a>{" "}
                </span>
              )}
            </h5>
            <Link
              href={`/${currentLocale}/posts/?category=${category.id}`}
              className={cn(badgeVariants({ variant: "outline" }), "not-prose")}
            >
              {category.name}
            </Link>
          </div>
          <div className="h-96 my-12 md:h-[560px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
            {/* eslint-disable-next-line */}
            <img
              className="w-full"
              src={featuredMedia.source_url}
              alt={post.title.rendered}
            />
          </div>
          <Article
            className="prose max-w-none
                    [&_.wp-block-embed]:w-full 
                    [&_.wp-block-embed]:aspect-video 
                    [&_.wp-block-embed]:rounded-xl 
                    [&_.wp-block-embed]:overflow-hidden
                    [&_.wp-block-embed__wrapper]:h-full 
                    [&_.wp-block-embed__wrapper]:w-full 
                    [&_iframe]:w-full"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </Container>
      </Section>
  );
}
