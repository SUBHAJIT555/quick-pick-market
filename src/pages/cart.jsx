import React from "react";
import Link from "next/link";
import SEO from "@/components/seo";
import HeaderThree from "@/layout/headers/header-3";
import FooterTwo from "@/layout/footers/footer-2";
import Wrapper from "@/layout/wrapper";
import CartArea from "@/components/cart-wishlist/cart-area";
import { seoDescriptions } from "@/data/seo-descriptions";
import { PAGE_HERO_GRID_STYLE } from "@/lib/page-hero-grid-style";

const CartPage = () => {
  return (
    <Wrapper>
      <SEO pageTitle="Cart" description={seoDescriptions.cart} />
      <div className="scs-cart-page__top">
        <div className="scs-cart-page__top-canvas" aria-hidden="true">
          <div className="scs-cart-page__top-grid" style={PAGE_HERO_GRID_STYLE} />
        </div>
        <div className="scs-cart-page__top-inner">
          <HeaderThree />
          <section className="scs-cart-page__hero">
            <div className="scs-cart-page__hero-inner">
              <nav className="scs-cart-page__breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>Shopping cart</span>
              </nav>
              <h1 className="scs-cart-page__title">Shopping cart</h1>
              <p className="scs-cart-page__lead">
                Review your items, update quantities, and proceed to checkout when you&apos;re
                ready.
              </p>
            </div>
          </section>
        </div>
      </div>
      <CartArea />
      <FooterTwo />
    </Wrapper>
  );
};

export default CartPage;
