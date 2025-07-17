import { getAllCategories } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import { Metadata } from "next";
import Link from "next/link";
import BackButton from "@/components/back";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "All Categories",
    description: "Browse all categories on the site.",
  };
}

export default async function Page() {
  const categories = await getAllCategories();

  return (
    <Section>
      <Container>
        <BackButton />
        <div className="grid">
          {categories.map((category: any) => (
            <Link key={category.id} href={`/ar/posts/?category=${category.id}`}>
              {category.name}
            </Link>
          ))}
        </div>
      </Container>
    </Section>
  );
}
