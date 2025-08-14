"use client";

import React from "react";
import Container from "@/components/elements/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "swiper/css/autoplay";
import Image from "next/image";

const Brands = () => {
  return (
    <section className="py-[40px] bg-[#F4F7FA]">
      <Container>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={7}
          speed={1000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          loop={true}
          allowTouchMove={false}
          //   onSlideChange={() => console.log("slide change")}
          //   onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <Image
              src="/mykiakia-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/coca-cola-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/mykiakia-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/coca-cola-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/mykiakia-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/coca-cola-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/mykiakia-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/coca-cola-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/mykiakia-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/coca-cola-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/mykiakia-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/coca-cola-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/mykiakia-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/coca-cola-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/mykiakia-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/coca-cola-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/mykiakia-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/coca-cola-logo.png"
              alt="mykiakia logo"
              width={100}
              height={100}
            />
          </SwiperSlide>
        </Swiper>
      </Container>
    </section>
  );
};

export default Brands;
