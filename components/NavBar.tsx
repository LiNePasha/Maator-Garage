"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "next/navigation";

type NavProps = {
  className?: string;
  id?: string;
};

type SubLink = {
  label: string;
  href?: string;
  nestedSubmenu?: SubLink[];
};

type Category = {
  label: string;
  items?: { name: string; type: string }[];
};

const NavBar = ({ className, id }: NavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [nestedDropdownOpen, setNestedDropdownOpen] = useState<string | null>(
    null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations("NavBar");
  const [motorcycleCategories, setMotorcycleCategories] = useState<Category[]>([
    {
      label: "Motorcycles",
    },
    {
      label: "Scooters",
    },
    {
      label: "Scooters Electric",
    },
    {
      label: "Used",
    },
  ]);
  const pathname = usePathname();

  const router = useRouter();
  const [query, setQuery] = useState("");
  const currentLocale = useLocale();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    // Redirect to search results page with query param
    router.push(`/${currentLocale}/search?term=${encodeURIComponent(query)}`);
  };

  const switchLocale = (targetLocale: string) => {
    const path = window.location.pathname;
    const newPath = path.replace(`/${currentLocale}`, `/${targetLocale}`);
    router.push(newPath);
  };

  const toggleDropdown = (menu: string) => {
    setOpenDropdown((current) => (current === menu ? null : menu));
    if (openDropdown !== menu) {
      setNestedDropdownOpen(null);
    }
  };

  const toggleNestedDropdown = (submenu: string) => {
    setNestedDropdownOpen((current) => (current === submenu ? null : submenu));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((current) => !current);
  };

  const locale = useLocale();
  const isRTL = locale === "ar";
  const withLocale = (path: string) => `/${locale}${path}`;

  const navLinks: SubLink[] = [
    { label: t("home"), href: withLocale("/") },
    {
      label: t("categories"),
      nestedSubmenu: motorcycleCategories.map((category) => ({
        label: t(
          category.label === "Motorcycles"
            ? "motorcycles"
            : category.label === "Scooters"
            ? "scooters"
            : category.label === "Scooters Electric"
            ? "electricScooters"
            : category.label === "Used"
            ? "used"
            : category.label === "Accessories"
            ? "accessories"
            : "home"
        ),
        href:
          category.label === "Motorcycles"
            ? withLocale("/motorcycles")
            : category.label === "Scooters"
            ? withLocale("/scooters")
            : category.label === "Scooters Electric"
            ? withLocale("/electricScooters")
            : category.label === "Used"
            ? withLocale("/used")
            : category.label === "Accessories"
            ? withLocale("/accessories")
            : withLocale("/"),
      })),
    },
    { label: t("driveschool"), href: withLocale("/driveschool") },
    { label: t("blog"), href: withLocale("/posts") },
    { label: t("videos"), href: withLocale("/videos") },
    { label: t("shooting"), href: withLocale("/shooting") },
    { label: t("contact"), href: withLocale("/contact") },
  ];

  const localePrefix = pathname.split("/")[1]; // "en", "ar", etc.
  const basePath = pathname.replace(`/${localePrefix}`, ""); // e.g. "/videos"

  const hiddenRoutes = [
    "",
    "/videos",
    "/shooting",
    "/motorcycles",
    "/scooters",
    "/electricScooters",
    "/used",
    "/accessories",
    "/driveschool",
    "/posts",
  ];

  function isRouteHidden(path: any) {
    if (hiddenRoutes.includes(path)) return true;
    // Check if path starts with "/.../"
    if (path.startsWith("/motocycle/")) return true;
    if (path.startsWith("/scooter/")) return true;
    if (path.startsWith("/used/")) return true;
    return false;
  }

  const shouldHide = isRouteHidden(basePath);

  return (
    <>
      <div
        className={`w-screen min-h-[7vh] bg-transparent ${
          shouldHide ? "hidden" : ""
        }`}
      ></div>
      {pathname}
      <nav
        className={cn(
          "absolute z-50 top-0 w-full  text-white",
          `${
            pathname.includes("posts") ||
            pathname.includes("contact") ||
            pathname.includes("motocycle") ||
            pathname.includes("scooter") ||
            pathname.includes("electricScooter") ||
            pathname.includes("used") ||
            pathname.includes("search")
              ? "bg-black"
              : "bg-transparent"
          }`,
          className
        )}
        id={id}
      >
        <div className="text-center bg-[#B91C1C] text-xl py-1">
          <a href="https://store.maator.com/">
            {"<<"} {t("go")}
          </a>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:block">
          {/* Top Row: Logo */}
          <div className="flex justify-center py-2">
            <Link href="/">
              <Image
                src="/logobb.png"
                alt="logo"
                width={100}
                height={75}
                priority
              />
            </Link>
          </div>

          {/* Middle Row: Search Bar */}
          <form onSubmit={handleSearch} className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="ابحث عن موتوسيكل أو سكوتر..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-1/3 max-w-md px-4 py-2 rounded-full bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </form>

          {/* Bottom Row: Nav Links */}
          <div className="flex justify-center space-x-6 rtl:space-x-reverse text-lg font-semibold border-t border-gray-700 py-2">
            {navLinks.map((link, index) => (
              <div key={index} className="relative hover:text-primary">
                {link.nestedSubmenu ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className="flex items-center"
                    >
                      {link.label}
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openDropdown === link.label && (
                      <div className="absolute bg-white text-black rounded shadow-md mt-2 z-50">
                        {link.nestedSubmenu.map((sub, subIndex) => (
                          <Link
                            key={subIndex}
                            href={sub.href || "#"}
                            className="block px-4 py-2 hover:text-primary"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href || "#"}
                    className={`${
                      link.href === "/" ? "text-primary" : ""
                    } hover:text-primary`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        <button className="md:hidden flex justify-between items-center text-white px-6 w-full">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="logo"
              width={60}
              height={30}
              className="block md:hidden"
            />
          </Link>

          {/* Middle Row: Search Bar */}
          <form onSubmit={handleSearch} className="flex min-w-[50vw] mb-4">
            <input
              type="text"
              placeholder="ابحث عن موتوسيكل أو سكوتر..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-sm max-w-md px-4 py-1 md:py-2 rounded-full bg-gray-100 text-black focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </form>

          <svg
            onClick={toggleMobileMenu}
            className="w-6 h-6 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 z-40 flex flex-col"
            dir={isRTL ? "rtl" : "ltr"}
          >
            {/* Header with Close Button */}
            <div
              className={`flex justify-between items-center p-4 border-b border-gray-700 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <Link href={`/${locale}/`}>
                <Image
                  src="/logo.png"
                  alt="logo"
                  width={120}
                  height={60}
                  className="block"
                />
              </Link>
              <button
                onClick={toggleMobileMenu}
                aria-label="Close menu"
                className="text-white focus:outline-none"
              >
                <svg
                  className="w-8 h-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  {/* X mark same for both directions */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Scrollable menu links */}
            <nav className="flex-1 overflow-y-auto px-6 py-4">
              {navLinks.map((link, index) => (
                <div
                  key={index}
                  className={`border-b border-gray-700 last:border-b-0`}
                >
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className={`flex justify-between items-center w-full text-left py-4 text-white text-lg font-semibold focus:outline-none ${
                      isRTL ? "flex-row-reverse text-right" : ""
                    }`}
                  >
                    {!link.nestedSubmenu ? (
                      <Link
                        href={link.href || "#"}
                        onClick={toggleMobileMenu}
                        className="flex-1"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <span className="flex-1">{link.label}</span>
                    )}

                    {/* Arrow icon flipped in RTL */}
                    {link.nestedSubmenu && (
                      <svg
                        className={`w-6 h-6 ml-2 transition-transform ${
                          openDropdown === link.label
                            ? isRTL
                              ? "rotate-180"
                              : "rotate-180"
                            : ""
                        } ${isRTL ? "ml-0 mr-2" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        style={{ transformOrigin: "center" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d={isRTL ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                        />
                      </svg>
                    )}
                  </button>

                  {openDropdown === link.label && link.nestedSubmenu && (
                    <div
                      className={`${
                        isRTL ? "pl-0 pr-6" : "pl-6"
                      } pb-4 space-y-3`}
                    >
                      {link.nestedSubmenu.map((sub, subIndex) => (
                        <div key={subIndex} className="relative">
                          {!sub.nestedSubmenu ? (
                            <Link
                              href={sub.href || "#"}
                              onClick={toggleMobileMenu}
                              className={`block text-white text-base py-2 hover:text-primary ${
                                isRTL ? "text-right" : "text-left"
                              }`}
                            >
                              {sub.label}
                            </Link>
                          ) : (
                            <button
                              onClick={() => toggleNestedDropdown(sub.label)}
                              className={`flex justify-between items-center w-full text-white py-2 focus:outline-none ${
                                isRTL ? "flex-row-reverse" : ""
                              }`}
                            >
                              {sub.label}
                              <svg
                                className={`w-5 h-5 transition-transform ${
                                  nestedDropdownOpen === sub.label
                                    ? isRTL
                                      ? "rotate-90"
                                      : "rotate-90"
                                    : ""
                                }`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d={isRTL ? "M15 9l-7 7 7 7" : "M9 5l7 7-7 7"}
                                />
                              </svg>
                            </button>
                          )}

                          {nestedDropdownOpen === sub.label &&
                            sub.nestedSubmenu && (
                              <div
                                className={`${
                                  isRTL ? "pl-0 pr-4" : "pl-4"
                                } mt-2 space-y-2`}
                              >
                                {sub.nestedSubmenu.map(
                                  (nestedItem, nestedIndex) => (
                                    <Link
                                      key={nestedIndex}
                                      href={nestedItem.href || "#"}
                                      onClick={toggleMobileMenu}
                                      className={`block text-white text-sm py-1 hover:text-primary ${
                                        isRTL ? "text-right" : "text-left"
                                      }`}
                                    >
                                      {nestedItem.label}
                                    </Link>
                                  )
                                )}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="flex justify-center gap-4 mt-6">
                {["ar", "en"].map((loc) => (
                  <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    className={`px-4 py-2 rounded font-semibold border ${
                      currentLocale === loc
                        ? "bg-white text-black"
                        : "text-white border-gray-400"
                    }`}
                  >
                    {t(loc)}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
