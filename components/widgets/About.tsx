import React from "react";
import Container from "@/components/elements/Container";
import { TbTruckDelivery } from "react-icons/tb";
import { MdHighQuality } from "react-icons/md";
import { PiTimerDuotone } from "react-icons/pi";

const About = () => {
  return (
    <section className="py-[100px] bg-[#F4F7FA]">
      <Container>
        <div className="my-10 grid lg:grid-cols-3 lg:gap-x-[39px]">
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

        <div className="mt-[60px] grid grid-cols-10 gap-x-10">
          <div className="col-span-10 lg:col-span-6"></div>

          <div className="col-span-10 lg:col-span-4">
            <h2 className="text-3xl font-bold text-text">
              About Our FMCG Supply Chain
            </h2>
            <p className="text-sm text-text mt-2">
              We are committed to providing the best FMCG products to our
              customers. Our supply chain is designed to ensure that you receive
              high-quality products on time, every time.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
