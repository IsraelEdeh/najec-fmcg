"use client";

import React from "react";
import Container from "@/components/elements/Container";
import Image from "next/image";
import { FaQuoteLeft } from "react-icons/fa6";

const testimonials = [
  {
    quote:
      "Najec FMCG has transformed our supply chain with their reliable delivery and quality products.",
    name: "John Doe",
    title: "CEO, Company A",
    companyLogo: "/company-a-logo.png",
    bg: "bg-[#EEEEEE]",
    text: "text-black",
    avatar: "/avatar1.png",
    columns: 4,
  },
  {
    quote:
      "Their customer service is exceptional, always ready to assist with any inquiries.",
    name: "Jane Smith",
    title: "Manager, Company B",
    companyLogo: "/company-b-logo.png",
    bg: "bg-[#F2E7E3]",
    text: "text-black",
    avatar: "/avatar2.png",
    columns: 4,
  },
  {
    quote:
      "We appreciate the quality assurance that Najec FMCG provides with every delivery.",
    name: "Alice Johnson",
    title: "Director, Company C",
    companyLogo: "/company-c-logo.png",
    bg: "bg-[#FEF9C4]",
    text: "text-text",
    avatar: "/avatar3.png",
    columns: 2,
  },
  {
    quote:
      "Fast, reliable, and always professional. Najec FMCG is our trusted partner.",
    name: "Michael Lee",
    title: "Procurement Lead, Company D",
    companyLogo: "/company-d-logo.png",
    bg: "bg-pink-200",
    text: "text-black",
    avatar: "/avatar4.png",
    columns: 2,
  },
  {
    quote: "Their logistics expertise has helped us scale efficiently.",
    name: "Sarah Kim",
    title: "Operations, Company E",
    companyLogo: "/company-e-logo.png",
    bg: "bg-red-100",
    text: "text-black",
    avatar: "/avatar5.png",
    columns: 2,
  },
];

const Testimonial = () => {
  return (
    <section className="py-[60px] bg-[#F4F7FA]">
      <Container>
        <div className="lg:w-[589px] mx-auto">
          <div>
            <p className="uppercase lg:text-sm text-xs text-center text-primary">
              Testimonials
            </p>
            <h2 className="lg:text-3xl text-2xl text-center text-text font-bold mt-4">
              Let's explore customer sentiments towards our offerings.
            </h2>
          </div>
        </div>

        <div className="mt-[60px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 lg:gap-y-8 lg:gap-x-8 gap-x-0 gap-y-4">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`rounded-2xl shadow-lg p-8 flex flex-col justify-between ${
                t.columns === 4 ? "col-span-3" : "col-span-2"
              } ${t.bg} ${t.text}`}
            >
              <div className="mb-2">
                <FaQuoteLeft className="mb-1 block" />
                <p className="text-base font-medium">{t.quote}</p>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div>
                  <div className="font-bold">{t.name}</div>
                  <div className="text-sm">{t.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonial;
