import React from "react";
import Container from "../elements/Container";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-[#F4F6F9] pb-[40px] py-20">
      <Container>
        <div className="pt-[46px] px-[90px] border border-[#D9D9D9] bg-[#FFFFFF] rounded-[24px] shadow-lg">
          <div className="flex justify-between text-[#9096A2] font-medium">
            <Image
              src="/landing-page/neptune-logo.png"
              alt="footer"
              width={160}
              height={29}
              className="w-[160px] h-[29px]"
            />
            <ul className="space-y-6 text-sm">
              <p className="text-lg text-primary font-semibold">How it Works</p>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  Hire Employees
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  Hire Contractors
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  Global Payroll
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  Integrations
                </Link>
              </li>
            </ul>
            <ul className="space-y-6 text-sm">
              <p className="text-lg text-primary font-semibold">Company</p>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  Countries
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  Careers
                </Link>
              </li>
            </ul>
            <ul className="space-y-6 text-sm">
              <p className="text-lg text-primary font-semibold">Solutions</p>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  Compliances
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  Payments
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  Taxes
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  Enterprises
                </Link>
              </li>
            </ul>
            <ul className="space-y-6 text-sm">
              <p className="text-lg text-primary font-semibold">Resources</p>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  Open API
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300 text-[16px]"
                >
                  Guide
                </Link>
              </li>
            </ul>
          </div>

          <div className="pb-[48px] mt-[40px] text-[#9096A2] flex items-center justify-between">
            <ul className="text-sm flex items-center space-x-4">
              <li>
                <p>©2025. All Rights Reserved.</p>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="#"
                  className="hover:underline underline-offset-4 transition ease-in duration-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>

            <div className="flex items-center space-x-6">
              <Image
                src="/landing-page/instagram.png"
                alt="instagram"
                width={40}
                height={40}
                className="cursor-pointer hover:scale-110 transition-all ease-in "
              />

              <Image
                src="/landing-page/facebook.png"
                alt="facebook"
                width={40}
                height={40}
                className="cursor-pointer hover:scale-110 transition-all ease-in "
              />

              <Image
                src="/landing-page/linkedin.png"
                alt="linkedin"
                width={40}
                height={40}
                className="cursor-pointer hover:scale-110 transition-all ease-in "
              />

              <Image
                src="/landing-page/twitter.png"
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
