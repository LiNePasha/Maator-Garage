import { Metadata } from "next";
import CategoriesSection from "@/components/CategoriesSection";
export const metadata: Metadata = {
  title: "Categories",
  description: "Your go to source for all motorcycles.",
};
export default function categories() {
  return (
    <>
      <CategoriesSection />
    </>
  );
}
