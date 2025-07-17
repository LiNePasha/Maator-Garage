import Link from "next/link";
import { ThemeToggle } from "./theme/theme-toggle";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("NavBar");
  const locale = useLocale();
  const withLocale = (path: string) => `/${locale}${path}`;

  const footerData = {
    logo: {
      src: "/images/logo.png",
      alt: "logo",
    },
    socialLinks: [
      {
        href: "https://wa.me/201123325005",
        icon: "/icons/formkit_whatsapp.png",
        alt: "WhatsApp",
      },
      {
        href: "https://web.facebook.com/maatorgarage",
        icon: "/icons/ic_baseline-facebook.png",
        alt: "Facebook",
      },
      {
        href: "https://www.youtube.com/@Moaz_saad",
        icon: "/icons/mingcute_youtube-fill.png",
        alt: "YouTube",
      },
      {
        href: "https://www.instagram.com/maator.garage",
        icon: "/icons/ant-design_instagram-filled.png",
        alt: "Instagram",
      },
    ],
    sections: [
      {
        title: t("location"),
        items: [
          {
            text: t("ourLocation"),
          },
        ],
      },
      {
        title: t("home"),
        items: [
          { text: t("videos"), href: withLocale("/motorcycles") },
          { text: t("shooting"), href: withLocale("/motorcycles") },
          { text: t("contact"), href: withLocale("/motorcycles") },
        ],
      },
    ],
  };
  return (
    <footer className="bg-[#1B1919] text-white py-8 md:py-12">
      <div className="mx-auto px-10 lg:px-32">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-6 lg:gap-0">
          {/* Logo and Social Links */}
          <div className="flex flex-col max-w-[550px] my-auto mt-4 md:items-start">
            <a href="/" aria-current="page" className="inline-block">
              <Image
                src={footerData.logo.src}
                alt={footerData.logo.alt}
                width={150}
                height={50}
              />
            </a>

            <div className="flex gap-6 mt-6">
              {footerData.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <Image
                    src={link.icon}
                    alt={link.alt}
                    width={32}
                    height={32}
                  />
                </a>
              ))}
            </div>
            <div className="mt-4">
              <ThemeToggle />
            </div>
          </div>

          {footerData.sections.map((section, index) => (
            <div
              key={index}
              className="flex flex-col items-start max-w-[350px] my-auto mt-6"
            >
              <h2 className="font-medium text-2xl mb-6">{section.title}</h2>
              <div className="flex flex-col gap-4">
                {section.items.map((item, idx) =>
                  "href" in item ? (
                    <Link
                      href={item.href}
                      key={idx}
                      className="text-lg md:text-[22px]"
                    >
                      {item.text}
                    </Link>
                  ) : (
                    <span key={idx} className="text-lg md:text-[22px]">
                      {item.text}
                    </span>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
