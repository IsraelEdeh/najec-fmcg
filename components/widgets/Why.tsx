import React from "react";
import Container from "@/components/elements/Container";
import { TbTruckDelivery } from "react-icons/tb";
import { BsLayers } from "react-icons/bs";

const Why = () => {
  return (
    <section className="bg-[#F4F7FA] py-[100px]">
      <Container>
        <div className="w-[589px] mx-auto">
          <div>
            <p className="uppercase text-sm text-center text-primary">
              Why Choose us
            </p>
            <h2 className="text-3xl text-center text-text font-bold mt-4">
              We are committed to providing the best products to our customers.
            </h2>
          </div>
        </div>

        <div className="mx-auto w-[878px] mt-[60px]">
          <div className="grid lg:grid-cols-2 gap-x-10 gap-y-20">
            <div className="flex items-start space-x-[30px]">
              <div className="bg-[#e3e5f9] py-3 px-3 rounded-[15px]">
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

            <div className="flex items-start space-x-[30px]">
              <div className="bg-[#f5e7e9] py-3 px-3 rounded-[15px]">
                <BsLayers className="text-[#F64B4B] w-[40px] h-[40px]" />
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

            <div className="flex items-start space-x-[30px]">
              <div className="bg-[#e3e5f9] py-3 px-3 rounded-[15px]">
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

            <div className="flex items-start space-x-[30px]">
              <div className="bg-[#e3e5f9] py-3 px-3 rounded-[15px]">
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
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Why;
