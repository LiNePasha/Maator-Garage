import SearchResults from "@/components/SearchResults";

export default function SearchPage({ searchParams }: { searchParams: { term?: string } }) {
  const term = searchParams.term;

  return (
    <div className="pt-[10vh] md:pr-[25px] md:pt-[20vh]">
      <h1 className="text-2xl font-bold mb-6">نتائج البحث عن: {term}</h1>
      <SearchResults term={term || ""} />
    </div>
  );
}
