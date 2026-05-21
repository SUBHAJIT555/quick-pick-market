import React from "react";
import Link from "next/link";
import SEO from "@/components/seo";
import HeaderThree from "@/layout/headers/header-3";
import FooterTwo from "@/layout/footers/footer-2";
import Wrapper from "@/layout/wrapper";
import { PAGE_HERO_GRID_STYLE } from "@/lib/page-hero-grid-style";

const LegalPageLayout = ({
  pageTitle,
  description,
  breadcrumbLabel,
  lead,
  children,
}) => {
  return (
    <Wrapper>
      <SEO pageTitle={pageTitle} description={description} />
      <div className="scs-legal-page__top">
        <div className="scs-legal-page__top-canvas" aria-hidden="true">
          <div className="scs-legal-page__top-grid" style={PAGE_HERO_GRID_STYLE} />
        </div>
        <div className="scs-legal-page__top-inner">
          <HeaderThree />
          <section className="scs-legal-page__hero">
            <div className="scs-legal-page__hero-inner">
              <nav className="scs-legal-page__breadcrumb" aria-label="Breadcrumb">
                <Link href="/">Home</Link>
                <span aria-hidden="true">/</span>
                <span>{breadcrumbLabel}</span>
              </nav>
              <h1 className="scs-legal-page__title">{pageTitle}</h1>
              {lead ? <p className="scs-legal-page__lead">{lead}</p> : null}
            </div>
          </section>
        </div>
      </div>
      <div className="scs-legal-page__body">{children}</div>
      <FooterTwo />
    </Wrapper>
  );
};

export default LegalPageLayout;
