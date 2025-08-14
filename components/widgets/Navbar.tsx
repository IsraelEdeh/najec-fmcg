"use client";

import React, { useState, useEffect } from "react";
import Container from "../elements/Container";
import CustomButton from "../elements/CustomButton";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`py-[20px] glass-nav border-b bg-[#F4F6F9] bg-opacity- border-b-[#E7E7E7] fixed top-0 left-0 z-50 w-full ${
        isScrolled ? "bg-white bg-opacity-100" : "bg-[#F4F6F9] bg-opacity-25"
      }`}
    >
      <Container className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/landing-page/neptune-logo.png"
            alt="logo"
            width={160}
            height={29}
          />
        </Link>

        <ul className="flex items-center space-x-12 text-white">
          <li>
            <Link
              href="#about"
              className={`hover:border-b-2 hover:border-b-secondary transition-all ease-linear duration-100 flex items-center space-x-2`}
            >
              <span className="font-medium">About</span>
            </Link>
          </li>

          <li>
            <Link
              href="#products"
              className={`hover:border-b-2 hover:border-b-secondary transition-all ease-linear duration-100 flex items-center space-x-2 hover:`}
            >
              <span className="font-medium">Products</span>
            </Link>
          </li>

          <li>
            <Link
              href="#faqs"
              className={`hover:border-b-2 hover:border-b-secondary transition-all ease-linear duration-100  font-medium flex items-center space-x-2`}
            >
              FAQs
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-6">
          <CustomButton classType="primary" className="px-[30px] py-[9px]">
            Request a quote
          </CustomButton>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
