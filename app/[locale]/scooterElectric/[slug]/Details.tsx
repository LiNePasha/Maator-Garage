"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import GalleryCarousel from "@/components/ui//GalleryCarousel";

const INPUT = "INPUT";
const NEED = "NEED";
const TEXTAREA = "TEXTAREA";

const initialFields = (t: any) => [
  {
    label: t("your_need"),
    component: NEED,
    type: "text",
    name: "your-need",
    id: "need",
    validation_error: false,
    validation_message: "",
  },
  {
    label: t("your_name"),
    component: INPUT,
    type: "text",
    name: "your-name",
    id: "full_name",
    validation_error: false,
    validation_message: "",
  },
  {
    label: t("your_phone"),
    component: INPUT,
    type: "number",
    name: "your-phone",
    id: "phone",
    validation_error: false,
    validation_message: "",
  },
  {
    label: t("your_message"),
    component: TEXTAREA,
    type: "text",
    name: "your-message",
    id: "message",
    validation_error: false,
    validation_message: "",
  },
];

interface MotorcycleDetails {
  title: string;
  price: string;
  image: string;
  displacement: string;
  horsepower: string;
  torque: string;
  dryweight: string;
  seatheight: string;
  safety: string;
  gallery: any;
  deliverables: any;
  videos: any;
  background: any;
  back_image: any;
  back_props: any;
  next_image: any;
  next_props: any;
  framel_image: any;
  framel_props: any;
  motor_image: any;
}

const Details = ({ params }: { params: { slug: string } }) => {
  const [motorcycle, setMotorcycle] = useState<MotorcycleDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [fields, setFields] = useState<any>([]);
  const [message, setMessage] = useState<any>(null);
  const router = useRouter();
  const t = useTranslations("motor");
  const locale = useLocale();

  useEffect(() => {
    setFields(initialFields(t));
  }, [t]);

  const galleryImages =
    motorcycle?.gallery?.map((img: any) => ({
      url: img.url,
      alt: img.alt || img.title,
    })) || [];

  const deliverableImages = motorcycle?.deliverables
    ? motorcycle?.deliverables.map((img: any) => ({
        url: img.url,
        alt: img.alt || img.title,
      }))
    : [];

  const videos = motorcycle?.videos
    ? motorcycle?.videos.map((video: any) => ({
        url: video.video,
      }))
    : [];

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setFields(
      fields.map((field: any) => ({
        ...field,
        validation_error: false,
        validation_message: "",
      }))
    );

    const formData = new FormData(event.target);
    formData.append("your-need", motorcycle ? motorcycle.title : "");
    formData.append("_wpcf7_unit_tag", "33ba705");

    const reqOptions = {
      method: "POST",
      body: formData,
    };

    const req = await fetch(
      `https://store.maator.com/wp-json/contact-form-7/v1/contact-forms/2081/feedback`,
      reqOptions
    );
    const res: any = await req.json();

    if (!res) return alert("an expected error occurred");

    if (res.invalid_fields && res.invalid_fields.length > 0) {
      return setFields(
        fields.map((field: any) => {
          const error = res.invalid_fields.find(
            (x: any) => x.field === field.name
          );

          return {
            ...field,
            validation_error: error ? true : false,
            validation_message: error ? error.message : "",
          };
        })
      );
    }

    setMessage(res.message);
  };

  useEffect(() => {
    const fetchMotorcycleDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://store.maator.com/wp-json/wp/v2/scooter-electric?slug=${params.slug}&acf_format=standard`
        );
        const res = await response.json();
        const data = res[0];
        console.log(data);

        if (data.acf) {
          setMotorcycle({
            title: data.acf.name,
            price: data.acf.price,
            image: data.acf.image,
            displacement: data.acf.displacement,
            horsepower: data.acf.horsepower,
            torque: data.acf.torque,
            dryweight: data.acf.dryweight,
            seatheight: data.acf.seatheight,
            safety: data.acf.safety,
            gallery: data.acf.gallery,
            deliverables: data.acf.deliverables,
            videos: data.acf.videos,
            background: data.acf.background,
            back_image: data.acf.back_image,
            back_props: data.acf.back_props,
            next_image: data.acf.next_image,
            next_props: data.acf.next_props,
            framel_image: data.acf.framel_image,
            framel_props: data.acf.framel_props,
            motor_image: data.acf.motor_image,
          });
        } else {
          console.error("Motorcycle data not found.");
        }
      } catch (error) {
        console.error("Error fetching motorcycle details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!message) {
      fetchMotorcycleDetails();
    }

    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        router.push("/");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [params.slug, message, router]);

  if (loading) {
    return (
      <div className="border rounded-lg overflow-hidden bg-[#F1F2F4] animate-pulse">
        <div className="relative w-[calc(100%-2rem)] mx-auto h-[30vh] px-4 bg-gray-300"></div>
        <div className="p-4 flex flex-col justify-between h-[120px]">
          <div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
          <div className="bg-gray-300 h-4 w-1/2 mb-4"></div>
          <div className="bg-gray-300 h-8 w-full"></div>
        </div>
      </div>
    );
  }

  if (!motorcycle) {
    return <div>{t("motorcycle_not_found")}</div>;
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-between dark:bg-[#1B1919]">
      <section className="relative min-h-[10rem] md:h-screen w-full px-6">
        {/* Background Image */}
        <Image
          src={motorcycle.background}
          alt="Zontes V350 2023"
          layout="fill"
          objectFit="contain"
          quality={100}
          className="pt-0 lg:pt-24 object-contain"
        />
      </section>

      <section className="bg-transparent py-12 px-4 sm:px-6 lg:px-20">
        <div className="max-w-6xl mx-auto text-white">
          <div className="mb-2 lg:mb-12 text-center">
            <h5 className="bg-[#B91C1C] text-2xl font-bold px-2 rounded-md text-white inline-block">
              {t("scooterDetails")}
            </h5>
          </div>

          <div className="relative !mt-[16px]">
            {/* Center vertical line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-[4px] bg-[#B91C1C]"></div>
            <div className="flex flex-col sm:flex-row items-center relative">
              {/* Text on the right */}
              <div className="sm:w-1/2 text-black dark:text-white sm:pl-10">
                <div
                  className="[&>ul]:list-none [&>ul>li]:before:content-['-'] [&>ul>li]:before:ml-1 [&>ul]:p-0 [&>ul>li]:m-0 [&>ul>li]:!font-bold"
                  dangerouslySetInnerHTML={{
                    __html: motorcycle.displacement,
                  }}
                />
              </div>

              {/* Timeline Dot */}
              <div className="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#B91C1C] rounded-full z-10" />

              {/* image on the left */}
              <div className="sm:w-1/3 flex justify-end sm:pr-10">
                <Image
                  src={motorcycle.motor_image}
                  alt="ddd"
                  width={300}
                  height={700}
                  className="rounded-md h-[325px] object-cover !m-0 !mb-[16px]"
                />
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Center vertical line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-[4px] bg-[#B91C1C]"></div>

            <div className="flex flex-col sm:flex-row items-center mb-4 relative">
              {/* Text on the right */}
              <div className="sm:w-1/2 text-black dark:text-white sm:pl-10">
                <div
                  className="[&>ul]:list-none [&>ul>li]:before:content-['-'] [&>ul>li]:before:ml-1 [&>ul]:p-0 [&>ul>li]:m-0 [&>ul>li]:!font-bold"
                  dangerouslySetInnerHTML={{
                    __html: motorcycle.back_props,
                  }}
                />
              </div>

              {/* Timeline Dot */}
              <div className="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#B91C1C] rounded-full z-10" />

              {/* image on the left */}
              <div className="sm:w-1/3 flex justify-end sm:pr-10">
                <Image
                  src={motorcycle.back_image}
                  alt="ddd"
                  width={300}
                  height={700}
                  className="rounded-md h-[325px] object-cover !m-0"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center mb-4 relative">
              {/* Text on the right */}
              <div className="sm:w-1/2 text-black dark:text-white sm:pl-10">
                <div
                  className="[&>ul]:list-none [&>ul>li]:before:content-['-'] [&>ul>li]:before:ml-1 [&>ul]:p-0 [&>ul>li]:m-0 [&>ul>li]:!font-bold"
                  dangerouslySetInnerHTML={{
                    __html: motorcycle.next_props,
                  }}
                />
              </div>

              {/* Timeline Dot */}
              <div className="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#B91C1C] rounded-full z-10" />

              {/* image on the left */}
              <div className="sm:w-1/3 flex justify-end sm:pr-10">
                <Image
                  src={motorcycle.next_image}
                  alt="ddd"
                  width={300}
                  height={700}
                  className="rounded-md h-[325px] object-cover !m-0"
                />
              </div>
            </div>
          </div>

          <div className="relative !mt-[-16px]">
            {/* Center vertical line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-[4px] bg-[#B91C1C]"></div>
            <div className="flex flex-col sm:flex-row items-center mb-4 relative">
              {/* Text on the right */}
              <div className="sm:w-1/2 text-black dark:text-white sm:pl-10">
                <div
                  className="[&>ul]:list-none [&>ul>li]:before:content-['-'] [&>ul>li]:before:ml-1 [&>ul]:p-0 [&>ul>li]:m-0 [&>ul>li]:!font-bold"
                  dangerouslySetInnerHTML={{
                    __html: motorcycle.framel_props,
                  }}
                />
              </div>

              {/* Timeline Dot */}
              <div className="hidden lg:block absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#B91C1C] rounded-full z-10" />

              {/* image on the left */}
              <div className="sm:w-1/3 flex justify-end sm:pr-10">
                <Image
                  src={motorcycle.framel_image}
                  alt="ddd"
                  width={300}
                  height={700}
                  className="rounded-md h-[325px] object-cover !m-0 !mt-[16px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <div className="w-full flex flex-col items-center px-6 pt-16 lg:pt-28 z-20">
        <div className="w-full text-center mb-6">
          <h2 className="text-4xl font-extrabold text-white drop-shadow-lg !mt-1 !mb-1">
            {motorcycle.title}
          </h2>
          <p className="text-red-500 text-3xl font-semibold tracking-wide drop-shadow-md">
            {motorcycle.price}
          </p>
        </div>

        <div className="w-full bg-white rounded-2xl shadow-2xl px-4 lg:px-12 border border-gray-200">
          <h3 className="text-lg md:text-3xl font-semibold mb-8 text-gray-800 border-b border-gray-300 pb-4">
            {t("specifications")}
          </h3>

          <ul className="grid grid-cols-6 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-8 px-0">
            {[
              {
                label: t("displacement"),
                value: motorcycle.displacement,
                icon: "🛠️",
              },
              {
                label: t("horse_power"),
                value: motorcycle.horsepower,
                icon: "🏇",
              },
              { label: t("torque"), value: motorcycle.torque, icon: "⚙️" },
              {
                label: t("dry_weight"),
                value: motorcycle.dryweight,
                icon: "⚖️",
              },
              {
                label: t("seat_height"),
                value: motorcycle.seatheight,
                icon: "📏",
              },
              { label: t("safety"), value: motorcycle.safety, icon: "🛡️" },
            ].map(({ label, value, icon }) => (
              <li
                key={label}
                className="flex items-center space-x-5 rounded-lg hover:bg-gray-50 transition cursor-default"
              >
                <span className="hidden md:inline-block md:text-4xl">
                  {icon}
                </span>
                <div>
                  <span className="block text-gray-500 font-medium text-xs md:text-lg">
                    {label}
                  </span>
                  <span className="block text-gray-900 font-semibold text-xs md:text-lg">
                    {value}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div> */}

      <div className="w-full px-0 lg:px-12">
        {galleryImages.length > 0 && <GalleryCarousel media={galleryImages} />}

        {deliverableImages.length > 0 && (
          <GalleryCarousel
            title={t("deliverablesTitle")}
            media={deliverableImages}
          />
        )}

        {videos.length > 0 && (
          <GalleryCarousel title={t("videos")} type="video" media={videos} />
        )}
      </div>

      <div className="w-full px-0 lg:px-12 bg-transparent z-20">
        <form
          className="space-y-6 w-full bg-white text-gray-700 p-6 rounded-md"
          onSubmit={handleSubmit}
        >
          {t("interested")}
          {fields.map((field: any) => (
            <div key={field.id} className="mb-6">
              {field.component !== NEED && (
                <label
                  htmlFor={field.id}
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  {field.label}
                </label>
              )}
              {field.component === NEED && (
                <input
                  type={field.type}
                  name={field.name}
                  disabled={true}
                  value={motorcycle.title}
                  id={field.id}
                  className="w-full hidden p-3 bg-white border border-gray-300 rounded-lg shadow-sm"
                />
              )}
              {field.component === INPUT && (
                <input
                  type={field.type}
                  name={field.name}
                  min={0}
                  placeholder={field.label}
                  id={field.id}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm"
                />
              )}
              {field.component === TEXTAREA && (
                <textarea
                  name={field.name}
                  id={field.id}
                  placeholder={field.label}
                  rows={4}
                  className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm"
                ></textarea>
              )}
              {field.validation_error && (
                <div className="text-sm text-red-600 mt-1">
                  {field.validation_message}
                </div>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-red-500 text-white py-3 font-bold rounded-lg shadow-md hover:opacity-90 transition duration-300"
          >
            {t("send")}
          </button>
          {message && (
            <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-sm">
              {message}
            </div>
          )}
        </form>
      </div>

      <div className="flex justify-center py-14">
        <Link href={`/${locale}`}>
          <p className="bg-primary text-white font-bold py-2 px-6 rounded hover:bg-white hover:text-black transition">
            {t("back_home")}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Details;
