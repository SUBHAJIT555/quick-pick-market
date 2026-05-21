import ErrorMsg from "@/components/common/error-msg";
import { useGetProductsByVariantQuery } from "@/redux/features/productApi";
import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/router";
import ProductItem from "./product-item";
import { HomeTwoPrdLoader } from "@/components/loader";
import { ArrowRight } from "@/svg";
import { getSiteNumber } from "@/lib/siteConfig";
import { siteInfo } from "@/data/contact-info";

const ProductArea = ({ defaultCategory = "All Collection" }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(defaultCategory);
  const [categoryCounts, setCategoryCounts] = useState({});

  const variantId = useMemo(() => {
    try {
      const siteNumber = getSiteNumber();
      const mod = siteNumber % 10;
      return mod === 0 ? 10 : mod;
    } catch {
      return 1;
    }
  }, []);

  const { data: productsData, isError, isLoading } = useGetProductsByVariantQuery({
    variantId,
    category: activeTab,
  });

  const variantConfig = productsData?.variantConfig;
  const tabs =
    variantConfig?.tabs || ["All Collection", "Man Wear", "Women Wear", "Kids Wear"];
  const title = variantConfig?.title || "Home, Office & Everyday Essentials";
  const subtitle = variantConfig?.subtitle || "Product Collection";

  useEffect(() => {
    if (productsData?.totalCount !== undefined) {
      setCategoryCounts((prev) => ({
        ...prev,
        [activeTab]: productsData.totalCount,
      }));
    }
  }, [activeTab, productsData?.totalCount]);

  const getCategoryCount = (tab) => {
    return categoryCounts[tab] || (tab === activeTab ? productsData?.totalCount || 0 : 0);
  };

  const handleActiveTab = (tab) => {
    setActiveTab(tab);
  };

  const handleShowMore = () => {
    if (!variantConfig) return;

    const categoryConfig = variantConfig.categoryMap[activeTab];

    if (activeTab === "All Collection" || !categoryConfig?.slug) {
      router.push("/shop");
    } else {
      router.push(`/shop?category=${categoryConfig.slug}`);
    }
  };

  const titleParts = title.split(" ");
  const titleMain =
    titleParts.length > 3 ? titleParts.slice(0, -2).join(" ") : title;
  const titleLine =
    titleParts.length > 3 ? titleParts.slice(-2).join(" ") : null;

  let body = null;

  if (isLoading) {
    body = (
      <div className="scs-collection__state">
        <HomeTwoPrdLoader loading={isLoading} />
      </div>
    );
  } else if (isError) {
    body = (
      <div className="scs-collection__state">
        <ErrorMsg msg="There was an error" />
      </div>
    );
  } else if (!productsData?.data?.length) {
    body = (
      <div className="scs-collection__state">
        <ErrorMsg msg="No Products found!" />
      </div>
    );
  } else {
    body = (
      <>
        <ul className="scs-collection__products">
          {productsData.data.map((prd) => (
            <li key={prd._id} className="scs-collection__cell">
              <ProductItem product={prd} />
            </li>
          ))}
        </ul>

        <div className="scs-collection__footer">
          <button type="button" onClick={handleShowMore} className="scs-collection__more">
            Show more
            <ArrowRight />
          </button>
        </div>
      </>
    );
  }

  return (
    <section className="scs-collection" aria-labelledby="scs-collection-heading">
      <div className="scs-collection__inner">
        <header className="scs-collection__head">
          <div className="scs-collection__intro">
            <p className="scs-collection__eyebrow">
              <span className="scs-collection__eyebrow-mark" aria-hidden="true" />
              {subtitle}
            </p>
            <h2 id="scs-collection-heading" className="scs-collection__title">
              {titleLine ? (
                <>
                  {titleMain}
                  <span className="scs-collection__title-line">{titleLine}</span>
                </>
              ) : (
                title
              )}
            </h2>
            <p className="scs-collection__desc">
              Browse curated picks in{" "}
              <strong>electronics, stationery, garments and fashion accessories</strong>{" "}
              for your home, office and everyday life on {siteInfo.companyName}.
            </p>
          </div>

          <nav className="scs-collection__tabs" aria-label="Product categories">
            <div className="scs-collection__tabs-track">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleActiveTab(tab)}
                  className={`scs-collection__tab${
                    activeTab === tab ? " is-active" : ""
                  }`}
                >
                  <span className="scs-collection__tab-label">
                    {tab.split("-").join(" ")}
                  </span>
                  <span className="scs-collection__tab-count">
                    {getCategoryCount(tab)}
                  </span>
                </button>
              ))}
            </div>
          </nav>
        </header>

        {body}
      </div>
    </section>
  );
};

export default ProductArea;
