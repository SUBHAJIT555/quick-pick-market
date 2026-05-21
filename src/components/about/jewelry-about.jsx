import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteInfo } from "@/data/contact-info";
import aboutImage from "@assets/images/HeroImages/HomeElectronicsHero.webp";

const highlights = [
  "Mobile & laptop accessories",
  "Smart gadgets & audio",
  "Daily-wear garments",
  "Stationery & office supplies",
  "Fashion jewellery & add-ons",
  "Gifts & everyday picks",
];

const perks = [
  { value: "10+", label: "Categories" },
  { value: "100%", label: "Quality focus" },
  { value: "Fast", label: "Delivery" },
];

const JewelryAbout = () => {
  return (
    <section className="scs-about" aria-labelledby="scs-about-heading">
      <div className="scs-about__inner">
        <div className="scs-about__layout">
          <aside className="scs-about__media">
            <div className="scs-about__visual">
              <Image
                src={aboutImage}
                alt={`About ${siteInfo.companyName}`}
                fill
                sizes="(max-width: 991px) 100vw, 40rem"
                style={{ objectFit: "contain" }}
                priority={false}
              />
            </div>
            <ul className="scs-about__stats" aria-label="Store highlights">
              {perks.map((perk, index) => (
                <li key={perk.label} className="scs-about__stat">
                  {index > 0 && (
                    <span className="scs-about__stat-divider" aria-hidden="true" />
                  )}
                  <span className="scs-about__stat-value">{perk.value}</span>
                  <span className="scs-about__stat-label">{perk.label}</span>
                </li>
              ))}
            </ul>
          </aside>

          <div className="scs-about__copy">
            <p className="scs-about__eyebrow">
              <span className="scs-about__eyebrow-mark" aria-hidden="true" />
              About {siteInfo.domain}
            </p>

            <h2 id="scs-about-heading" className="scs-about__title">
              Electronics, stationery
              <span className="scs-about__title-line">&amp; everyday style</span>
            </h2>

            <div className="scs-about__prose">
              <p>
                <strong>{siteInfo.companyName}</strong> is your go-to store for the
                things you use every day. From{" "}
                <strong>mobiles, audio and computer gear</strong> to{" "}
                <strong>notebooks, office supplies, garments</strong> and{" "}
                <strong>fashion accessories</strong>, we bring it all together in one
                easy place.
              </p>
              <p>
                Choose from curated collections of <strong>electronics</strong>,{" "}
                <strong>stationery &amp; desk essentials</strong>,{" "}
                <strong>men&apos;s &amp; women&apos;s wear</strong> and{" "}
                <strong>accessories</strong> that help you work, study and step out with
                confidence.
              </p>
            </div>

            <ul className="scs-about__list">
              {highlights.map((item) => (
                <li key={item} className="scs-about__list-item">
                  <span className="scs-about__list-mark" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="scs-about__actions">
              <Link href="/shop" className="scs-about__btn scs-about__btn--primary">
                Explore products
              </Link>
              <Link href="/contact" className="scs-about__btn scs-about__btn--ghost">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JewelryAbout;
