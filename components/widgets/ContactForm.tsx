/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Container from "@/components/elements/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { FaAsterisk } from "react-icons/fa6";

const ContactForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // const googleScriptURL: any = process.env.NEXT_PUBLIC_VENTURE_SCRIPT_LINK || "";
  const googleScriptURL: string =
    "https://script.google.com/macros/s/AKfycbwGv_uW-LlW70vQXtdu3VIR3lt3pNonhAh0gQOqAZJSaM7Xse70Cq16aBo4s54R8lHIuA/exe";
  console.log("Google Script URL:", googleScriptURL);

  const submitForm = async (formAppData: any) => {
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbyI0vcaafItG4lkzjix15dypkF5TU9gQOL3Y74MlySKDXLgUNzTS65qGzSv5IFc16u1tg/exec`,
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(formAppData),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      await response.text();
      formik.resetForm();

      return await response.text();
    } catch (error) {
      console.log(error);
    }
  };

  const { mutate, isPending } = useMutation({
    mutationFn: submitForm,
    onSuccess: () => {
      formik.resetForm();
      setSuccessMessage("Form submitted successfully!");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);
    },
    onError: (error: any) => {
      alert("There was an error submitting the form.");
    }
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      phoneNumber: "",
      projectLink: "",
      businessDescription: "",
      vision: "",
      commitment: "",
      confirmAvailability: false
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phoneNumber: Yup.string()
        .required("Phone number is required")
        .min(11, "Phone number must be 11 characters long or more"),
      projectLink: Yup.string().optional(),
      businessDescription: Yup.string().required(
        "Please describe your business"
      )
    }),
    onSubmit: async (values: any) => {
      try {
        const formAppData = {
          date: new Date().toUTCString(),
          username: values.username,
          email: values.email,
          phoneNumber: values.phoneNumber,
          projectLink: values.projectLink || "N/A",
          businessDescription: values.businessDescription,
          vision: values.vision || "N/A",
          commitment: values.commitment || "N/A",
          confirmAvailability: values.confirmAvailability ? "Yes" : "No"
        };

        mutate(formAppData);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
  });

  return (
    <section id="contact" className="bg-[#F4F7FA] py-[100px] relative z-20">
      <Container>
        {successMessage && (
          <div className="fixed bottom-6 right-6 bg-green-600 px-4 py-3 rounded-md shadow-md z-50 animate-fade-in">
            {successMessage}
          </div>
        )}

        <div>
          <div className="lg:w-[589px] mx-auto">
            <div>
              <p className="uppercase lg:text-sm text-xs text-center text-primary">
                {"Let's"} Get Started
              </p>
              <h2 className="lg:text-3xl text-2xl text-center text-text font-bold mt-4">
                Share your idea and take the first step toward joining the
                program.
              </h2>
            </div>
          </div>

          <div className="mt-10 lg:mt-20 flex items-center justify-center">
            <form
              onSubmit={formik.handleSubmit}
              className="lg:w-[905px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-6 gap-y-12"
            >
              <div className="lg:col-span-1 col-span-2">
                <label className="flex items-center space-x-2 text-text">
                  <span className="lg:lg:text-[20px] font-medium">Name</span>
                  <FaAsterisk className="text-red-700 " />
                </label>

                <input
                  type="text"
                  name="username"
                  placeholder="John"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  className="mt-4 w-full rounded-[16px] lg:p-6 p-3 lg:text-[20px] placeholder:text-[#76777E] bg-white text-white"
                />

                {formik.touched.username && formik.errors.username && (
                  <p className="text-red-500 text-sm mt-1">
                    {typeof formik.errors.username === "string"
                      ? formik.errors.username
                      : null}
                  </p>
                )}
              </div>

              <div className="lg:col-span-1 col-span-2">
                <label className="flex items-center space-x-2 text-text">
                  <span className="lg:lg:text-[20px] font-medium">Email</span>
                  <FaAsterisk className="text-red-700 " />
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="john@gmail.com"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className="mt-4 w-full rounded-[16px] lg:p-6 p-3 lg:text-[20px] placeholder:text-[#76777E] bg-white text-white"
                />

                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {typeof formik.errors.email === "string"
                      ? formik.errors.email
                      : null}
                  </p>
                )}
              </div>

              <div className="lg:col-span-2 col-span-2">
                <label className="flex items-center space-x-2 text-text">
                  <span className="lg:lg:text-[20px] font-medium">Phone Number</span>
                  <FaAsterisk className="text-red-700 " />
                </label>

                <input
                  type="text"
                  name="phoneNumber"
                  placeholder="+234 123 456 7890"
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  className="mt-4 w-full rounded-[16px] lg:p-6 p-3 lg:text-[20px] placeholder:text-[#76777E] bg-white text-white"
                />

                {formik.touched.phoneNumber &&
                  formik.errors.phoneNumber &&
                  typeof formik.errors.phoneNumber === "string" && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.phoneNumber}
                    </p>
                  )}
              </div>

              <div className="col-span-2 ">
                <label className=" text-text lg:text-[20px]">
                  <span>Company</span>
                </label>

                <input
                  type="text"
                  name="projectLink"
                  placeholder="https://example.com"
                  onChange={formik.handleChange}
                  value={formik.values.projectLink}
                  className="mt-4 w-full rounded-[16px] lg:p-6 p-3 lg:text-[20px] placeholder:text-[#76777E] bg-white text-white"
                />

                {formik.touched.projectLink &&
                  typeof formik.errors.projectLink === "string" &&
                  formik.errors.projectLink && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.projectLink}
                    </p>
                  )}
              </div>

              <div className="col-span-2 ">
                <label className="flex items-center space-x-2 text-text">
                  <span className="lg:lg:text-[20px] font-medium">
                    Describe the services you want us to do for you
                  </span>
                  <FaAsterisk className="text-red-700 " />
                </label>

                <textarea
                  name="businessDescription"
                  onChange={formik.handleChange}
                  value={formik.values.businessDescription}
                  rows={4}
                  cols={4}
                  placeholder="Message..."
                  className="mt-4 w-full rounded-[16px] lg:p-6 p-3 lg:text-[20px] placeholder:text-[#76777E] bg-white text-white"
                ></textarea>

                {formik.touched.businessDescription &&
                  typeof formik.errors.businessDescription === "string" &&
                  formik.errors.businessDescription && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.businessDescription}
                    </p>
                  )}
              </div>

              <div className="col-span-2">
                <button
                  disabled={isPending}
                  type="submit"
                  className="lg:w-fit w-full h-fit bg-[linear-gradient(to_right,_#477bff,_#2b4a99)] rounded-[12px] from-[#477bff] to-[#2b4a99] px-5 py-[14.5px] text-white "
                >
                  <span>{isPending ? "Submitting" : "Send message"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactForm;
