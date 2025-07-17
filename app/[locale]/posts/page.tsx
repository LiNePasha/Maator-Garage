import {
  getAllPosts,
  getAllAuthors,
  getAllTags,
  getAllCategories,
} from "@/lib/wordpress";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Section, Container } from "@/components/craft";
import PostCard from "@/components/posts/post-card";
import FilterPosts from "./filter";

import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale;
  const siteUrl = "https://maator.com";
  const path = "/posts";
  const url = `${siteUrl}/${locale}${path}`;

  // Localized content
  const content = {
    en: {
      title: "Blog – Maator Garage",
      description:
        "Explore our latest articles, tips, and news from Maator Garage.",
    },
    ar: {
      title: "المدونة – ماتور جراج",
      description: "استكشف أحدث المقالات والنصائح والأخبار من ماتور جراج.",
    },
  };

  const { title, description } = content[locale as "en" | "ar"] ?? content.en;
  const keywords = locale === "ar"
  ? [
      "مقالات ماتور جراچ",
      "مدونة ماتور جراچ",
      "أخبار موتوسيكلات",
      "نصائح صيانة الموتوسيكلات",
      "مقالات عن الاسكوترات",
      "مراجعات موتوسيكلات",
      "دليل شراء موتوسيكل",
      "مقالات فنية للموتوسيكلات",
      "مقالات اسكوترات",
      "ماتور جراچ مقالات وأخبار",
    ]
  : [
      "Mator Garage articles",
      "Mator Garage blog",
      "motorcycle news",
      "motorcycle maintenance tips",
      "scooter articles",
      "motorcycle reviews",
      "motorcycle buying guide",
      "technical motorcycle articles",
      "scooter articles",
      "Mator Garage news and articles",
    ];

  return {
    title,
    description,
    keywords: keywords.join(", "),
    alternates: {
      canonical: url,
      languages: {
        en: `${siteUrl}/en${path}`,
        ar: `${siteUrl}/ar${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    other: {
      "script:ld+json": JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Blog",
        name: title,
        description,
        url,
      }),
    },
  };
}

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: { [key: string]: string | undefined };
  params: { locale: string };
}) {
  const currentLocale = params.locale;

  const { author, tag, category, page: pageParam } = searchParams;
  const posts = await getAllPosts({ author, tag, category });
  const authors = await getAllAuthors();
  const tags = await getAllTags();

  const categories = await getAllCategories();

  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const postsPerPage = 9;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginatedPosts = posts.slice(
    (page - 1) * postsPerPage,
    page * postsPerPage
  );

  return (
    <Section>
      <Container>
        <FilterPosts
          authors={authors}
          tags={tags}
          categories={categories}
          selectedAuthor={author}
          selectedTag={tag}
          selectedCategory={category}
        />

        {paginatedPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4 z-0">
            {paginatedPosts.map((post: any) => (
              <PostCard key={post.id} post={post} locale={currentLocale} />
            ))}
          </div>
        ) : (
          <div className="h-24 w-full border rounded-lg bg-accent/25 flex items-center justify-center">
            <p>No Results Found</p>
          </div>
        )}

        <div className="mt-8 not-prose">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className={page === 1 ? "pointer-events-none text-muted" : ""}
                  href={`/${currentLocale}/posts?page=${Math.max(page - 1, 1)}${
                    category ? `&category=${category}` : ""
                  }${author ? `&author=${author}` : ""}${
                    tag ? `&tag=${tag}` : ""
                  }`}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href={`/${currentLocale}/posts?page=${page}`}>
                  {page}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={
                    page === totalPages ? "pointer-events-none text-muted" : ""
                  }
                  href={`/${currentLocale}/posts?page=${Math.min(
                    page + 1,
                    totalPages
                  )}${category ? `&category=${category}` : ""}${
                    author ? `&author=${author}` : ""
                  }${tag ? `&tag=${tag}` : ""}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </Container>
    </Section>
  );
}
