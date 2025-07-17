'use client'
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
const ShootingBanner = () => {
  const pathname = usePathname();
  const t = useTranslations("Hero");

  return (
    <section
      className="relative w-full text-white flex flex-col md:flex-row items-center pt-[60px] md:pt-[8vh] h-auto lg:h-[50vh]"
      style={{
        backgroundImage: "url('/Car.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col md:flex-row w-full items-center px-4 md:px-10 pb-6 lg:pb-0">
        <div className="flex flex-col w-full">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl pt-4 md:text-3xl lg:text-4xl font-extrabold my-4 text-white">
              {/* {t("onePlace")} */}
              {t(pathname.split("/").filter(Boolean).pop())}
            </h1>

          </div>
        </div>

      </div>
    </section>
  );
};

export default ShootingBanner;
