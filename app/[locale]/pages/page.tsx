import { getAllPages } from "@/lib/wordpress";
import { Section, Container } from "@/components/craft";
import Link from "next/link";

export default async function Page() {
  const pages = await getAllPages();

  return (
    <Section>
      <Container>
        <h1>Pages</h1>
        {/* <pre>{pages}</pre> */}
        <h2>All Pages</h2>
        <div className="grid">
          {pages.map((page: any) => (
            <div key={page.id}>
              <Link href={`pages/${page.slug}`}>{page.title.rendered}</Link>
              <Link href={`pages/${page.slug}`}>{page.guid.rendered}</Link>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
