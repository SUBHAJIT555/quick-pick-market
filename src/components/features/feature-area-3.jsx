import React from "react";
import { Delivery, Discount, Support } from "@/svg";

const stats = [
  {
    value: "10+",
    label: "Categories",
    detail: "Groceries, tech & fashion in one place",
    icon: Support,
  },
  {
    value: "10+",
    label: "Key sectors",
    detail: "Electronics, apparel, stationery & more",
    icon: Discount,
  },
  {
    value: "100%",
    label: "Commitment",
    detail: "To quality products and reliable delivery",
    icon: Delivery,
  },
];

const FeatureAreaThree = () => {
  return (
    <section className="scs-features" aria-labelledby="scs-features-heading">
      <div className="scs-features__inner">
        <header className="scs-features__head">
          <p className="scs-features__eyebrow">
            <span className="scs-features__eyebrow-mark" aria-hidden="true" />
            Store highlights
          </p>
          <h2 id="scs-features-heading" className="scs-features__title">
            Built for everyday shopping
          </h2>
        </header>

        <ul className="scs-features__list">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className="scs-features__card">
                <span className="scs-features__icon" aria-hidden="true">
                  <Icon />
                </span>
                <div className="scs-features__body">
                  <span className="scs-features__value">{item.value}</span>
                  <span className="scs-features__label">{item.label}</span>
                  <p className="scs-features__detail">{item.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FeatureAreaThree;
