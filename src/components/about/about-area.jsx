import React from "react";
import Image from "next/image";
import about_img from "@assets/img/about/about-1.jpg";
import FeatureAreaThree from "@/components/features/feature-area-3";
import { Delivery, Discount, Support } from "@/svg";
import { siteInfo } from "@/data/contact-info";
import JewelryAbout from "./jewelry-about";

const MISSION_ITEMS = [
  {
    icon: Support,
    title: "Quality First",
    text: "We stock trusted brands and genuine products across tech, fashion, and essentials so you can shop with confidence.",
  },
  {
    icon: Discount,
    title: "Customer Satisfaction",
    text: "Your happiness is our priority. We're committed to smooth orders, quick support, and a hassle-free shopping experience.",
  },
  {
    icon: Delivery,
    title: "Wide Range",
    text: "From mobile accessories and smart gadgets to fashion, books, and stationery—find what you need in one place.",
  },
];

const CHOOSE_ITEMS = [
  {
    title: "Genuine Products",
    text: "We offer authentic tech, fashion, and lifestyle products from trusted brands so you shop with confidence.",
  },
  {
    title: "One-Stop Shop",
    text: "Mobile accessories, smart gadgets, electronics, books, stationery, and fashion—all in one place.",
  },
  {
    title: "Reliable Support",
    text: "We stand behind our products with clear policies and responsive customer support when you need it.",
  },
  {
    title: "Fast & Easy",
    text: "Simple checkout, secure payment options, and delivery so you get your orders without hassle.",
  },
];

const AboutArea = () => {
  return (
    <>
      <JewelryAbout />

      <section className="scs-about-mission" aria-labelledby="scs-about-mission-heading">
        <div className="scs-about-mission__inner">
          <header className="scs-about-mission__header">
            <p className="scs-about-mission__eyebrow">
              <span className="scs-about-mission__eyebrow-mark" aria-hidden="true" />
              {siteInfo.companyName}
            </p>
            <h2 id="scs-about-mission-heading" className="scs-about-mission__title">
              What We Stand For
            </h2>
          </header>
          <ul className="scs-about-mission__grid">
            {MISSION_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.title} className="scs-about-mission__card">
                  <span className="scs-about-mission__icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <div className="scs-about-mission__card-body">
                    <h3 className="scs-about-mission__card-title">{item.title}</h3>
                    <p className="scs-about-mission__card-text">{item.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="scs-about-choose" aria-labelledby="scs-about-choose-heading">
        <div className="scs-about-choose__inner">
          <div className="scs-about-choose__grid">
            <div className="scs-about-choose__content">
              <header className="scs-about-choose__header">
                <p className="scs-about-choose__eyebrow">
                  <span className="scs-about-choose__eyebrow-mark" aria-hidden="true" />
                  Why choose us
                </p>
                <h2 id="scs-about-choose-heading" className="scs-about-choose__title">
                  Excellence in Every Detail
                </h2>
              </header>
              <ul className="scs-about-choose__list">
                {CHOOSE_ITEMS.map((item) => (
                  <li key={item.title} className="scs-about-choose__item">
                    <span className="scs-about-choose__check" aria-hidden="true">
                      ✓
                    </span>
                    <div className="scs-about-choose__item-body">
                      <h3 className="scs-about-choose__item-title">{item.title}</h3>
                      <p className="scs-about-choose__item-text">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="scs-about-choose__media">
              <div className="scs-about-choose__frame">
                <Image
                  src={about_img}
                  alt="Quick Pick Market — quality products and service"
                  fill
                  sizes="(max-width: 991px) 100vw, 50vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeatureAreaThree />
    </>
  );
};

export default AboutArea;
