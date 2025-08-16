import React from "react";
import Container from "@/components/elements/Container";
import { TbTruckDelivery } from "react-icons/tb";
import { MdHighQuality } from "react-icons/md";
import { PiTimerDuotone } from "react-icons/pi";
import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="lg:py-[40px] py-4 bg-[#F4F7FA]">
      <Container>
        <div className="my-10 grid lg:grid-cols-3 lg:gap-x-[39px] lg:gap-y-0 gap-y-2">
          <div className="flex items-start space-x-[24px]">
            <div>
              <TbTruckDelivery className="text-primary w-[40px] h-[40px]" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-text">
                Fast and Reliable Delivery
              </h2>
              <p className="text-sm text-text mt-2">
                We ensure that your FMCG products are delivered on time, every
                time, so you can focus on your business.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-[24px]">
            <div>
              <MdHighQuality className="text-primary w-[40px] h-[40px]" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-text">
                100% Quality Assurance
              </h2>
              <p className="text-sm text-text mt-2">
                We ensure that your FMCG products are delivered on time, every
                time, so you can focus on your business.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-[24px]">
            <div>
              <PiTimerDuotone className="text-primary w-[40px] h-[40px]" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-text">
                99% On-Time Delivery
              </h2>
              <p className="text-sm text-text mt-2">
                We ensure that your FMCG products are delivered on time, every
                time, so you can focus on your business.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-[60px] grid grid-cols-10 lg:gap-x-10 lg:gap-y-0 gap-y-2">
          <div className="col-span-10 lg:col-span-4 flex items-center justify-center">
            <Image
              src="/about.png"
              alt="About Us Image"
              width={470}
              height={470}
              className="lg:block hidden"
            />
             <Image
              src="/about.png"
              alt="About Us Image"
              width={270}
              height={270}
              className="block lg:hidden"
            />
          </div>

          <div className="col-span-10 lg:col-span-6">
            <h2 className="text-3xl font-bold text-text">About us</h2>
            <p className="text-sm text-text mt-2 lg:space-y-2.5 space-y-2">
              <span className="block">
                We are a leading trading company that specializes in importing,
                distributing, and merchandising fast-moving consumer goods
                (FMCG) products.
              </span>
              <span className="block">
                We provide both wholesale and retail distribution as well as
                sales and merchandising of a wide range of high-quality FMCG
                products, including food, beverages, personal care, household,
                and other essential products to our customers.
              </span>
              <span className="block">
                With years of experience in the industry, we have established a
                reputation for delivering excellent service and quality products
                to our clients whilst managing a motivated, efficient and
                effective team.
              </span>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
