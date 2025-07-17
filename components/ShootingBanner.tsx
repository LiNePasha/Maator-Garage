'use client'
import { useTranslations } from "next-intl";
import Image from "next/image";
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

            {/* <div className="flex items-center space-x-4">
              <a href="https://store.maator.com" className="px-6 md:px-8 lg:px-16 py-3 md:py-3 text-white rounded-full transition border border-white text-sm md:text-lg lg:text-3xl">
                {t("shop")}
              </a>
            </div> */}

          </div>
        </div>

        {/* <Image
          src="/motors.png"
          alt="Motorcycle"
          width={1000}
          height={600}
          className="object-contain hidden lg:block"
        /> */}
      </div>
    </section>
  );
};

export default ShootingBanner;
