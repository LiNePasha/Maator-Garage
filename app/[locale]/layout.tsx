import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import Nav from "@/components/NavBar";
import "./globals.css";
import { Main } from "@/components/craft";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/progressBar";
import { Suspense } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Locale, routing } from "@/i18n/routing";
import ThemeInit from "@/components/theme/ThemeInit";
export const metadata: Metadata = {
  title: {
    default: "Maator Garage | أفضل اكسسوارات وخدمة موتوسيكلات في مصر",
    template: "",
  },
  description:
    "افضل خدمة مميزة للموتوسيكلات والأسكوتر في مصر | Quality Motorcycle Services in Egypt",
  verification: {
    google: "UwcOyylnJ4SMDvH63ja9TE3iheuLDVY1GkrnRekZcMc",
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    siteName: "Maator Garage",
    locale: "ar_EG",
    url: "https://maator.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maator Garage",
    description: "أفضل خدمات للدراجات النارية في مصر",
    creator: "@maatorgarage",
  },
};

export const revalidate = 3600;

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "en" ? "ltr" : "rtl"}
      suppressHydrationWarning
    >
      <head />
      <body
        className={cn(
          " font-sans bg-cover bg-center bg-no-repeat overflow-x-hidden"
        )}
      >
        <NextIntlClientProvider messages={messages}>
          <Suspense>
            <ProgressBar />
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              disableTransitionOnChange
            >
              <ThemeInit />
              <Nav />

              <Main>{children}</Main>

              <Footer />
            </ThemeProvider>
            <Analytics />
          </Suspense>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
