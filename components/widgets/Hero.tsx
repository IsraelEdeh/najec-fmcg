"use client";

import React from "react";
import CustomButton from "../elements/CustomButton";
import Container from "../elements/Container";
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <header className="header relative bg-[url(/bg.jpg)] h-[120vh] w-full bg-cover bg-center bg-no-repeat">
      <Container className="h-full flex justify-center items-center">
        <div className="lg:w-[745px]">
          <div className="flex items-center justify-center">
            <div className="bg-white px-3.5 py-1.5 rounded-[20px]">
              <p className="text-[12px] text-[#08277E] font-semibold">
                The Best FMCG Products for Your Business
              </p>
            </div>
          </div>
          <h1 className="mt-[34px] text-4xl md:text-5xl lg:text-[60px] leading-[45px] lg:leading-[65px] font-bold text-white text-center ">
            Supplying Quality Products, Always on Time
          </h1>

          <p className="text-lg md:text-[25px] text-white text-center mt-1 lg:mt-4">
            From household staples to on-the-go snacks, We connect you with the
            best FMCG products, ensuring quality and timely delivery for your
            business needs.
          </p>

          <div className="block lg:flex lg:items-center lg:justify-center lg:space-y-0 space-y-2 lg:space-x-4 mt-8">
            <Link href="https://mykiakia.com" target="_blank" className="block">
              <CustomButton
                classType="primary"
                className="lg:w-fit w-full px-[30px] py-[9px] rounded-[8px] hover:bg-opacity-90 transition-colors duration-200 ease-in-out"
              >
                Visit Our Store
              </CustomButton>
            </Link>

            <Link href="#contact" target="_blank" className="block">
              <CustomButton
                classType="secondary"
                className="lg:w-fit w-full px-[30px] py-[9px] rounded-[8px] hover:bg-opacity-90 transition-colors duration-200 ease-in-out"
              >
                Request a Quote
              </CustomButton>
            </Link>
          </div>
        </div>
      </Container>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50">
        <div className="w-full flex justify-center">
          <Link href="#about" className="block">
            <Image
              className="animate-bounce cursor-pointer"
              src="/downIcon.png"
              alt="Down Arrow Icon"
              width={40}
              height={40}
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Hero;
