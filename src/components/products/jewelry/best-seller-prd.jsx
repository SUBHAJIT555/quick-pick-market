import React from "react";
import Link from "next/link";
import ProductItem from "./product-item";
import ErrorMsg from "@/components/common/error-msg";
import { useGetProductTypeQuery } from "@/redux/features/productApi";
import { HomeTwoBestSellPrdPrdLoader } from "@/components/loader";
import { siteInfo } from "@/data/contact-info";
import { useDragScroll } from "@/hooks/use-drag-scroll";

const DRAG_IGNORE_SELECTOR = ".tb-product-card__actions, .tb-product-card__action-btn";

const BestSellerPrd = () => {
  const { data: products, isError, isLoading } = useGetProductTypeQuery({
    type: "jewelry",
    query: "topSeller=true",
  });

  const { trackRef, suppressClickRef, trackProps } = useDragScroll({
    ignoreSelector: DRAG_IGNORE_SELECTOR,
  });

  let content = null;

  if (isLoading) {
    content = (
      <div className="scs-bestseller__state">
        <HomeTwoBestSellPrdPrdLoader loading={isLoading} />
      </div>
    );
  } else if (isError) {
    content = (
      <div className="scs-bestseller__state">
        <ErrorMsg msg="There was an error" />
      </div>
    );
  } else if (!products?.data?.length) {
    content = (
      <div className="scs-bestseller__state">
        <ErrorMsg msg="No Products found!" />
      </div>
    );
  } else {
    const product_items = products.data.slice(0, 8);

    content = (
      <div
        ref={trackRef}
        className="scs-bestseller__track"
        role="list"
        {...trackProps}
      >
        {product_items.map((item) => (
          <div key={item._id} className="scs-bestseller__slide" role="listitem">
            <ProductItem product={item} suppressClickRef={suppressClickRef} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="scs-bestseller" aria-labelledby="scs-bestseller-heading">
      <div className="scs-bestseller__inner">
        <header className="scs-bestseller__head">
          <div className="scs-bestseller__intro">
            <p className="scs-bestseller__eyebrow">
              <span className="scs-bestseller__eyebrow-mark" aria-hidden="true" />
              Customer favorites
            </p>
            <h2 id="scs-bestseller-heading" className="scs-bestseller__title">
              Top sellers
            </h2>
            <p className="scs-bestseller__sub">
              Best-selling products from {siteInfo.companyName} — drag to browse
            </p>
          </div>
          <Link href="/shop" className="scs-bestseller__cta">
            View all products
          </Link>
        </header>

        <div className="scs-bestseller__slider">{content}</div>
      </div>
    </section>
  );
};

export default BestSellerPrd;
