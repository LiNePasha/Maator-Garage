"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
const INPUT = "INPUT";
const NEED = "NEED";
const TEXTAREA = "TEXTAREA";

const initalFields = [
  {
    label: "Your Need*",
    component: NEED,
    type: "text",
    name: "your-need",
    id: "need",
    validation_error: false,
    validation_message: "",
  },
  {
    label: "Your Name*",
    component: INPUT,
    type: "text",
    name: "your-name",
    id: "full_name",
    validation_error: false,
    validation_message: "",
  },
  {
    label: "Your Phone*",
    component: INPUT,
    type: "number",
    name: "your-phone",
    id: "phone",
    validation_error: false,
    validation_message: "",
  },
  {
    label: "Your Message*",
    component: TEXTAREA,
    type: "text",
    name: "your-message",
    id: "message",
    validation_error: false,
    validation_message: "",
  },
];

interface AccessoryDetails {
  title: string;
  price: string;
  image: string;
}

const AccessoryDetails = ({ params }: { params: { id: string } }) => {
  const [accessory, setAccessory] = useState<AccessoryDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const [fields, setFields] = useState<any>(initalFields);
    const [message, setMessage] = useState<any>(null);
  
    const handleSubmit = async (event: any) => {
      event.preventDefault();
  
      setFields(
        fields.map((field: { name: any }) => ({
          ...field,
          validation_error: false,
          validation_message: "",
        }))
      );
  
      const formData = new FormData(event.target);
      formData.append("your-need", accessory ? accessory.title : '');
      formData.append("_wpcf7_unit_tag", "aeda010");
  
      const reqOptions = {
        method: "POST",
        body: formData,
      };
  
      const req = await fetch(
        `https://store.maator.com/wp-json/contact-form-7/v1/contact-forms/156/feedback`,
        reqOptions
      );
      const res: any = await req.json();
  
      if (!res) return alert("an expected error occured");
  
      if (res.invalid_fields && res.invalid_fields.length > 0) {
        return setFields(
          fields.map((field: { name: any }) => {
            const error = res.invalid_fields.find(
              (x: { field: any }) => x.field === field.name
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
    const fetchAccessoryDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://store.maator.com/wp-json/wp/v2/accessories/${params.id}?acf_format=standard`
        );
        const data = await response.json();
        if (data.acf) {
          setAccessory({
            title: data.acf.name,
            price: data.acf.price,
            image: data.acf.image,
          });
        } else {
          console.error("Accessory data not found.");
        }
      } catch (error) {
        console.error("Error fetching accessory details:", error);
      } finally {
        setLoading(false);
      }
    };

    if(!message){
      fetchAccessoryDetails();
    }

    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); 
        router.push('/accessories');
      }, 5000);

      return () => clearTimeout(timer); // Cleanup timeout if the component is unmounted or updated
    }
  }, [params.id, message, router]);

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

  if (!accessory) {
    return <div>Accessory not found!</div>;
  }

  return (
    <div
      className="relative min-h-screen flex flex-col justify-between dark:bg-[#1B1919]"
    >
      {/* Content Section */}
      <div className="flex-grow flex flex-col items-center max-w-5xl mx-auto px-6 py-8 bg-transparent z-20">
        <div className="w-full bg-opacity-90 rounded-lg shadow-lg p-8">
          {/* Product Details */}
          <div className="flex flex-col justify-center items-center mb-8">
            <h2 className="text-3xl font-extrabold text-white text-center m-0 mb-1">
              {accessory.title}
            </h2>
            <p className="text-xl text-red-600 font-semibold">{accessory.price}</p>
          </div>
  
          {/* Product Image */}
          <div className="flex justify-center mb-10">
            <Image
              src={accessory.image}
              alt={accessory.title}
              width={400}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
  
          {/* Form Section */}
          <form className="space-y-6 bg-white text-gray-700 p-6 rounded-md" onSubmit={handleSubmit}>
            Are you interested in this product?
            {fields.map((field: any) => (
              <div key={field.id} className="mb-6">
                {field.component !== NEED && <label
                  htmlFor={field.id}
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  {field.label}
                </label>}
                {field.component === NEED && (
                  <input
                    type={field.type}
                    name={field.name}
                    disabled={true}
                    value={accessory.title}
                    id={field.id}
                    className="w-full hidden p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#DD5471] focus:outline-none placeholder-gray-500"
                  />
                )}
                {field.component === INPUT && (
                  <input
                    type={field.type}
                    name={field.name}
                    min={0}
                    placeholder={field.name
                      .split("-")
                      .map(
                        (word: string) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                    id={field.id}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#DD5471] focus:outline-none placeholder-gray-500"
                  />
                )}
                {field.component === TEXTAREA && (
                  <textarea
                    name={field.name}
                    id={field.id}
                    placeholder={field.name
                      .split("-")
                      .map(
                        (word: string) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                    rows={4}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#DD5471] focus:outline-none placeholder-gray-500"
                  ></textarea>
                )}
                {field.validation_error && (
                  <div className="text-sm text-red-600 mt-1">
                    {field.validation_message}
                  </div>
                )}
              </div>
            ))}
  
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#DD5471] text-white py-3 font-bold rounded-lg shadow-md hover:opacity-90 transition duration-300"
            >
              SEND
            </button>
            {message && (
              <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-lg shadow-sm">
                {message}
              </div>
            )}
          </form>

          
        </div>
        <div>
        <Link href="/" className="bg-[#DD5471] text-white py-2 px-8 font-bold rounded-full shadow-md hover:bg-[#c43f61] hover:shadow-lg transition">
            Back to Home
        </Link>
        </div>
      </div>
  
    </div>
  );
  
};

export default AccessoryDetails;
