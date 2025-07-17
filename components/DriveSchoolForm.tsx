"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

const INPUT = "INPUT";
const TEXTAREA = "TEXTAREA";
const SELECT = "SELECT";

const DriveSchoolForm = () => {
  const { theme } = useTheme();
  const backgroundColor = theme === "dark" ? "#0E0B0B" : "#FFFFFF";
  const textColor = theme === "dark" ? "#FFFFFF" : "#000000";

  const t = useTranslations("DriveSchool");

  // الكورسات اللي هتظهر في الاختيار
  const courses = [
    { value: "", label: t("selectCourse") }, 
    { value: "course1", label: t("course1") },
    { value: "course2", label: t("course2") },
  ];

  const initialFields = [
    {
      label: t("name"),
      component: INPUT,
      type: "text",
      name: "your-name",
      id: "full_name",
      validation_error: false,
      validation_message: "",
      value: "",
    },
    {
      label: t("phone"),
      component: INPUT,
      type: "number",
      name: "your-phone",
      id: "phone",
      validation_error: false,
      validation_message: "",
      value: "",
    },
    {
      name: "your-subject",
      id: "subjectsubject",
      value: "Courses Request",
    },
    {
      label: t("subject"),
      component: SELECT,
      name: "your-course",
      id: "subject",
      options: courses,
      validation_error: false,
      validation_message: "",
      value: "",
    },
  ];

  const [fields, setFields] = useState<any>(initialFields);
  const [message, setMessage] = useState<any>(null);

  const validateFields = () => {
    let isValid = true;

    const updatedFields = fields.map((field: any) => {
      let validation_error = false;
      let validation_message = "";

      const value = field.value?.toString().trim() || "";

      if (!field.optional) {
        if (!value) {
          validation_error = true;
          validation_message = `${field.label} ${t("required")}`;
          isValid = false;
        }
        if (!validation_error && field.type === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value)) {
            validation_error = true;
            validation_message = `Please enter a valid email address`;
            isValid = false;
          }
        }
      }

      return {
        ...field,
        validation_error,
        validation_message,
      };
    });

    setFields(updatedFields);

    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateFields()) return;

    // Reset errors before sending
    setFields(
      fields.map((field: any) => ({
        ...field,
        validation_error: false,
        validation_message: "",
      }))
    );

    const formData = new FormData();

    fields.forEach((field: any) => {
      formData.append(field.name, field.value);
    });

    formData.append("_wpcf7_unit_tag", "d56e050");

    try {
      const resRaw = await fetch(
        "https://store.maator.com/wp-json/contact-form-7/v1/contact-forms/2043/feedback",
        {
          method: "POST",
          body: formData,
        }
      );
      const res = await resRaw.json();

      if (!res) return alert("An unexpected error occurred");

      if (res.invalid_fields && res.invalid_fields.length > 0) {
        setFields(
          fields.map((field: any) => {
            const error = res.invalid_fields.find(
              (x: { field: string }) => x.field === field.name
            );
            return {
              ...field,
              validation_error: !!error,
              validation_message: error ? error.message : "",
            };
          })
        );
        return;
      }

      setMessage(res.message);
    } catch {
      alert("Network or server error occurred.");
    }
  };

  useEffect(() => {
    if (message) {
      // Clear inputs on success
      setFields((prev: any) =>
        prev.map((field: any) => ({
          ...field,
          value: "",
          validation_error: false,
          validation_message: "",
        }))
      );

      const timer = setTimeout(() => {
        setMessage("");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className="text-white flex items-center justify-center w-full mt-[12vh] mb-[12vh]"
      style={{ backgroundColor, color: textColor }}
    >
      <div className="flex flex-col lg:flex-row w-full h-auto overflow-hidden">
        <div className="w-full lg:w-2/5 px-6 md:px-12 lg:px-16 py-8 lg:pt-32 bg-[#252C33] flex flex-col justify-center">
          <h1 className="text-5xl !font-bold md:text-4xl text-white">
            {t("title")}{" "}
            <span className="text-[#DD5471]">{t("titleHighlight")}</span>
          </h1>
          <p className="text-gray-300 mt-2 mb-6">{t("description")}</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {fields.map((field: any) => (
              <div key={field.id || field.name} className="main-btn-wrap mt-6">
                <label htmlFor={field.id} className="block font-bold text-[#DD5471]">
                  {field.label}
                </label>

                {field.component === INPUT && (
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.id}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFields(
                        fields.map((f: any) =>
                          f.id === field.id ? { ...f, value: val } : f
                        )
                      );
                    }}
                    placeholder={field.label}
                    className="w-full p-3 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:border-[#DD5471] placeholder-gray-400"
                  />
                )}

                {field.component === TEXTAREA && (
                  <textarea
                    name={field.name}
                    id={field.id}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFields(
                        fields.map((f: any) =>
                          f.id === field.id ? { ...f, value: val } : f
                        )
                      );
                    }}
                    rows={4}
                    className="form-control mt-1 block w-full px-4 py-2 rounded-3xl border border-gray-300 bg-transparent outline-none focus:border-[#DD5471]"
                  />
                )}

                {field.component === SELECT && (
                  <select
                    name={field.name}
                    id={field.id}
                    value={field.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFields(
                        fields.map((f: any) =>
                          f.id === field.id ? { ...f, value: val } : f
                        )
                      );
                    }}
                    className="w-full p-3 bg-[#252C33] border border-gray-500 rounded-md focus:outline-none focus:border-[#DD5471]"
                  >
                    {field.options.map((option: any) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}

                <input
                    type="text"
                    name="your-subject"
                    id="skmkmskmsf588585"
                    value="Courses Request"
                    className="hidden"
                  />

                {field.validation_error && (
                  <div className="text-base text-red-600">{field.validation_message}</div>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full bg-[#DD5471] py-3 text-white font-bold rounded-md hover:opacity-90 transition duration-300"
            >
              {t("send")}
            </button>

            {message && (
              <div className="mt-4 p-3 rounded-md text-green-600">{message}</div>
            )}
          </form>

          <div className="flex items-center space-x-6 mt-8 text-gray-300">
            <div>
              <p className="text-sm font-semibold">{t("phoneLabel")}</p>
              <p className="text-[#DD5471] text-lg">01123325005</p>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-3/5 flex">
          <div
            className="w-full"
            style={{
              background: `linear-gradient(89.83deg, #252C33 10.53%, rgba(37, 44, 51, 0) 49.48%), 
                url('/contact.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DriveSchoolForm;
