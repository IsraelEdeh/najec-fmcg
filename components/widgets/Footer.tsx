import React from "react";
import Container from "../elements/Container";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#F4F6F9] pb-[40px] py-20">
      <Container>
        <div className="pt-[46px] lg:px-[90px] px-4 border border-[#D9D9D9] bg-[#FFFFFF] rounded-[24px] shadow-lg">
          <div className="grid lg:grid-cols-5 grid-cols-2 lg:gap-y-0 gap-y-4 text-[#9096A2] font-medium">
            <div className="col-span-2">
              <Image
                src="/neptune-logo.png"
                alt="footer"
                width={160}
                height={29}
                className="block w-[160px] h-[29px]"
              />
            </div>
            <ul className="lg:space-y-6 space-y-2 text-sm">
              <p className="text-base lg:text-lg text-primary font-semibold">
                How it Works
              </p>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-sm lg:text-[16px]"
                >
                  Hire Employees
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-sm lg:text-[16px]"
                >
                  Hire Contractors
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-sm lg:text-[16px]"
                >
                  Global Payroll
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-sm lg:text-[16px]"
                >
                  Integrations
                </Link>
              </li>
            </ul>
            <ul className="lg:space-y-6 space-y-2 text-sm">
              <p className="text-base lg:text-lg text-primary font-semibold">
                Company
              </p>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-sm lg:text-[16px]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-sm lg:text-[16px]"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-sm lg:text-[16px]"
                >
                  Countries
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-sm lg:text-[16px]"
                >
                  Careers
                </Link>
              </li>
            </ul>
            <div className="col-span-2">
              <p className="text-base lg:text-lg text-primary font-semibold">
                Contact us
              </p>
              <div className="space-y-2">
                <p className="text-sm lg:text-[16px]">
                  1234 Street Name, City, State, 12345
                </p>
                <p className="text-sm lg:text-[16px]">Email:</p>
              </div>
            </div>
          </div>

          <div className="lg:gap-y-0 gap-y-4 pb-[48px] mt-[40px] text-[#9096A2] lg:flex lg:items-center lg:justify-between">
            <ul className="text-sm lg:flex lg:items-center lg:space-x-4">
              <li>
                <p>©2025. All Rights Reserved.</p>
              </li>

              <li className="lg:block hidden">
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300"
                >
                  Privacy Policy
                </Link>
              </li>

              <li className="lg:block hidden">
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>

            <div className="flex items-center lg:space-x-6 space-x-2">
              <Image
                src="/instagram.png"
                alt="instagram"
                width={40}
                height={40}
                className="cursor-pointer hover:scale-110 transition-all ease-in "
              />

              <Image
                src="/facebook.png"
                alt="facebook"
                width={40}
                height={40}
                className="cursor-pointer hover:scale-110 transition-all ease-in "
              />

              <Image
                src="/linkedin.png"
                alt="linkedin"
                width={40}
                height={40}
                className="cursor-pointer hover:scale-110 transition-all ease-in "
              />

              <Image
                src="/twitter.png"
                alt="twitter"
                width={40}
                height={40}
                className="cursor-pointer hover:scale-110 transition-all ease-in "
              />
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
