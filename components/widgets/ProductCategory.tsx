import React from "react";
import Container from "@/components/elements/Container";
import { BiChevronRight } from "react-icons/bi";
import Image from "next/image";

const ProductCategory = () => {
  return (
    <section className="py-[100px] bg-[#ffffff]">
      <Container>
        <div className="lg:w-[450px] ">
          <h2 className="text-3xl w-fit font-bold text-text">
            About Our FMCG Supply Chain
          </h2>
          <p className="text-sm text-text mt-2">
            We are committed to providing the best FMCG products to our
            customers. Our supply chain is designed to ensure that you receive
            high-quality products on time, every time.
          </p>
        </div>

        <div className="grid lg:grid-cols-8 grid-cols-1 lg:gap-y-6 lg:gap-x-6 gap-x-0 gap-y-3 mt-10">
          <div className="lg:h-[390px] relative col-span-1 lg:col-span-4 rounded-[25px] bg-[#EEEEEE] p-6">
            <div>
              <h3 className="text-xl font-medium text-[#444444]">
                Home & Living
              </h3>

              <p className="lg:text-[60px] font-extrabold text-[#4C4C4C]/65">
                SOFA
              </p>

              <button className="cursor-pointer rounded-[8px] py-3 px-5 text-sm text-white bg-[#444444] font-semibold flex items-center space-x-1">
                <span>Shop Now</span>
                <BiChevronRight className="inline-block ml-2 w-4 h-4" />
              </button>
            </div>

            <div className="mt-3.5 lg:absolute lg:bottom-2 lg:right-2">
              <Image
                src="/sofa.png"
                alt="Sofa"
                width={305}
                height={102}
                className="object-cover rounded-[20px]"
              />
            </div>
          </div>

          <div className=" rounded-[25px] bg-[#D4EDF8] p-6 col-span-1 lg:col-span-2">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-medium text-[#0A73A1]">
                  Clohing & Fashion
                </h3>

                <p className="text-[34px] text-wrap font-extrabold text-[#4C4C4C]/65">
                  SNEAKERS
                </p>

                <button className="cursor-pointer rounded-[8px] py-3 px-5 text-sm text-white bg-[#444444] font-semibold flex items-center space-x-1">
                  <span>Shop Now</span>
                  <BiChevronRight className="inline-block ml-2 w-4 h-4" />
                </button>
              </div>

              <div>
                <Image
                  src="/shoes.png"
                  alt="Shoes"
                  width={289}
                  height={234}
                  className="object-cover rounded-[20px]"
                />
              </div>
            </div>
          </div>

          <div className=" rounded-[25px] bg-[#FEF9C4] p-6 col-span-1 lg:col-span-2">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-medium text-[#D4B100]">
                  Toys & Entertainment
                </h3>

                <p className="text-wrap text-[34px] font-extrabold text-[#4C4C4C]/65">
                  TOY TRAIN
                </p>

                <button className="cursor-pointer rounded-[8px] py-3 px-5 text-sm text-white bg-[#444444] font-semibold flex items-center space-x-1">
                  <span>Shop Now</span>
                  <BiChevronRight className="inline-block ml-2 w-4 h-4" />
                </button>
              </div>

              <div>
                <Image
                  src="/shoes.png"
                  alt="Shoes"
                  width={289}
                  height={234}
                  className="object-cover rounded-[20px]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[25px] bg-[#F2E7E3] p-6 col-span-1 lg:col-span-2">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-medium text-[#B18531]">
                  Toys & Entertainment
                </h3>

                <p className="text-wrap text-[34px] font-extrabold text-[#4C4C4C]/65">
                  TOY TRAIN
                </p>

                <button className="cursor-pointer rounded-[8px] py-3 px-5 text-sm text-white bg-[#444444] font-semibold flex items-center space-x-1">
                  <span>Shop Now</span>
                  <BiChevronRight className="inline-block ml-2 w-4 h-4" />
                </button>
              </div>

              <div>
                <Image
                  src="/shoes.png"
                  alt="Shoes"
                  width={289}
                  height={234}
                  className="object-cover rounded-[20px]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[25px] bg-[#E3F2E6] p-6 col-span-1 lg:col-span-2">
            <div className="flex flex-col justify-between h-full">
              <div>
                <h3 className="text-xl font-medium text-[#25D02C]">
                  Toys & Entertainment
                </h3>

                <p className="text-wrap text-[34px] font-extrabold text-[#4C4C4C]/65">
                  TOY TRAIN
                </p>

                <button className="cursor-pointer rounded-[8px] py-3 px-5 text-sm text-white bg-[#444444] font-semibold flex items-center space-x-1">
                  <span>Shop Now</span>
                  <BiChevronRight className="inline-block ml-2 w-4 h-4" />
                </button>
              </div>

              <div>
                <Image
                  src="/shoes.png"
                  alt="Shoes"
                  width={289}
                  height={234}
                  className="object-cover rounded-[20px]"
                />
              </div>
            </div>
          </div>

          <div className="h-[390px] relative col-span-1 lg:col-span-4 rounded-[25px] bg-[#FAE8E8] p-6">
            <div>
              <h3 className="text-xl font-medium text-[#C63D42]">
                Home & Living
              </h3>

              <p className="text-[60px] font-extrabold text-[#4C4C4C]/65">
                SOFA
              </p>

              <button className="cursor-pointer rounded-[8px] py-3 px-5 text-sm text-white bg-[#C63D42] font-semibold flex items-center space-x-1">
                <span>Shop Now</span>
                <BiChevronRight className="inline-block ml-2 w-4 h-4" />
              </button>
            </div>

            <div className="lg:absolute lg:bottom-2 lg:right-2 mt-3.5">
              <Image
                src="/sofa.png"
                alt="Sofa"
                width={305}
                height={102}
                className="object-cover rounded-[20px]"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductCategory;
