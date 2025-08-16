"use client";

import React, { useState } from "react";
import CustomButton from "@/components/elements/CustomButton";
import Container from "../elements/Container";
import { FaArrowRight, FaDownLong } from "react-icons/fa6";
import { BiChevronDown } from "react-icons/bi";

const FAQ = () => {
  const faq = [
    {
      id: 1,
      question: "What plan is best for a team?",
      response: `The best plan for team management is the Business plan. It includes all the 
features you'll need when managing a team, such as Team Management & 
Tools, Team Tracking, Team Calendar and Messaging.`,
    },
    {
      id: 2,
      question: "Is there a trial period for pricing plans?",
      response: "lorem ipseum ipesum",
    },
    {
      id: 3,
      question: "Is there a trial period for pricing plans?",
      response: "loppp jkdjdiu iudid i usidsis ",
    },
    {
      id: 4,
      question: "Is there a trial period for pricing plans?",
      response: "dolor iteum gha osoios iosi",
    },
  ];

  const [openId, setOpenId] = useState(null);

  const toggleFAQ = (id: any) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <Container>
      <div className="my-[113px] grid lg:grid-cols-2 gap-x-10">
        <div>
          <p className="font-bold text-[32px] leading-[45px] lg:leading-[65px]  text-text">
            Frequently Asked Questions
          </p>
          <p className="text-base text-[#808891] space-y-3">
            Answers to the most commonly asked questions
          </p>
        </div>

        <div className="space-y-[20px] lg:mt-0 mt-4">
          {faq.map((item, index) => (
            <div
              key={item.id}
              className=" bg-[#F7F7F7] rounded-[12px] p-[24px]"
            >
              <div className="flex items-center justify-between w-full">
                <p>{item.question}</p>

                <button
                  onClick={() => toggleFAQ(item.id)}
                  className="cursor-pointer w-fit px-[2px] pt-[2.5px] pb-[1.px] bg-[#808891] rounded-[20px]"
                >
                  <BiChevronDown className="text-white w-[18px] h-[18px]" />
                </button>
              </div>

              {openId === item.id && (
                <div className="mt-3 text-[#808891] text-sm font-medium">
                  {item.response}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default FAQ;
