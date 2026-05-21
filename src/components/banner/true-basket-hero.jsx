import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteInfo } from "@/data/contact-info";
import { heroCategories } from "@/data/hero-categories";

const highlights = [
  { label: "Free shipping", value: "₹570+" },
  { label: "Categories", value: "10+" },
  { label: "Delivery", value: "Across India" },
];

const GRID_BG_STYLE = {
  backgroundImage: `
    linear-gradient(to right, #e2e8f0 1px, transparent 1px),
    linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
  `,
  backgroundSize: "20px 30px",
  WebkitMaskImage:
    "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
  maskImage:
    "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
};

function CategoryCard({ cat }) {
  return (
    <Link
      href={`/shop?category=${cat.slug}`}
      className="scs-hero__cat"
      role="listitem"
      aria-label={`${cat.title}, ${cat.count}+ products`}
    >
      <span className="scs-hero__cat-visual">
        <Image
          src={cat.img}
          alt=""
          width={200}
          height={200}
          draggable={false}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </span>
      <span className="scs-hero__cat-info">
        <span className="scs-hero__cat-name">{cat.title}</span>
        {cat.count != null && (
          <span className="scs-hero__cat-count">{cat.count}+ products</span>
        )}
      </span>
    </Link>
  );
}

export default function TrueBasketHero() {
  const featured = heroCategories.slice(0, 3);
  const marqueeItems = useMemo(
    () => [
      ...heroCategories.map((cat) => ({ cat, key: cat.id })),
      ...heroCategories.map((cat) => ({ cat, key: `${cat.id}-dup` })),
    ],
    []
  );

  return (
    <section className="scs-hero" aria-labelledby="scs-hero-heading">
      <div className="scs-hero__canvas">
        <div className="scs-hero__grid" style={GRID_BG_STYLE} aria-hidden="true" />
      </div>

      <div className="scs-hero__shell">
        <div className="scs-hero__intro">
          <div className="scs-hero__copy">
            <p className="scs-hero__label">
              <span className="scs-hero__label-mark" aria-hidden="true" />
              {siteInfo.domain}
            </p>

            <h1 id="scs-hero-heading" className="scs-hero__title">
              Quality picks,
              <span className="scs-hero__title-line">delivered fast.</span>
            </h1>

            <p className="scs-hero__lead">
              Shop electronics, stationery, fashion, and everyday essentials at{" "}
              <strong>{siteInfo.companyName}</strong> — curated for reliability
              across India.
            </p>

            <div className="scs-hero__actions">
              <Link href="/shop" className="scs-hero__btn scs-hero__btn--primary">
                Shop Now
              </Link>
              <Link href="/contact" className="scs-hero__btn scs-hero__btn--ghost">
                Get in touch
              </Link>
            </div>

            <ul className="scs-hero__stats" aria-label="Store highlights">
              {highlights.map((item, index) => (
                <li key={item.label} className="scs-hero__stat">
                  {index > 0 && (
                    <span className="scs-hero__stat-divider" aria-hidden="true" />
                  )}
                  <span className="scs-hero__stat-value">{item.value}</span>
                  <span className="scs-hero__stat-label">{item.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="scs-hero__preview" aria-hidden="true">
            {featured.map((cat, index) => (
              <Link
                key={cat.id}
                href={`/shop?category=${cat.slug}`}
                className={`scs-hero__preview-card scs-hero__preview-card--${index + 1}`}
                tabIndex={-1}
              >
                <Image
                  src={cat.img}
                  alt=""
                  width={240}
                  height={240}
                  sizes="(max-width: 991px) 0px, 180px"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </Link>
            ))}
          </div>
        </div>

        <div className="scs-hero__cat-section">
          <div className="scs-hero__cat-head">
            <div className="scs-hero__cat-head-copy">
              <h2 className="scs-hero__cat-title">Shop by category</h2>
              <p className="scs-hero__cat-sub">
                Discover products you'll love, curated for every taste.
              </p>
         
            </div>
            <Link href="/shop" className="scs-hero__cat-all-link">
              View all categories
            </Link>
          </div>

          <div className="scs-hero__marquee" role="region" aria-label="Category carousel">
            <div className="scs-hero__marquee-fade scs-hero__marquee-fade--left" aria-hidden="true" />
            <div className="scs-hero__marquee-viewport">
              <div className="scs-hero__marquee-track" role="list">
                {marqueeItems.map(({ cat, key }) => (
                  <CategoryCard key={key} cat={cat} />
                ))}
              </div>
            </div>
            <div className="scs-hero__marquee-fade scs-hero__marquee-fade--right" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
