"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Suspense } from "react";
import { useLocale } from "next-intl";

export default function NotFound() {
  const { theme } = useTheme();
  const backgroundColor = theme === "dark" ? "#0E0B0B" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";
  const buttonBackground = theme === "dark" ? "#FFFFFF" : "#000000";
  const buttonTextColor = theme === "dark" ? "#000000" : "#FFFFFF";
  const buttonBorderColor = theme === "dark" ? "#FFFFFF" : "#000000";

    const locale = useLocale();

  return (
    <>
      <div
        className="m-auto space-y-5 text-center flex flex-col justify-center items-center w-[100vw] h-[60vh]"
        style={{ backgroundColor, color: textColor }}
      >
        <h1 className="text-3xl !font-bold">Not Found</h1>
        <p>Looks like this page doesn&apos;t exist.</p>
        <Link href={`/${locale}`} passHref>
          <button
            className="px-6 py-2 uppercase tracking-wide rounded-lg transition duration-200 text-xl mt-[4vh]"
            style={{
              backgroundColor: buttonBackground,
              color: buttonTextColor,
              border: `1px solid ${buttonBorderColor}`,
            }}
          >
            Back to home
          </button>
        </Link>
      </div>
    </>
  );
}
