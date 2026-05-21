import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import WishlistItem from "./wishlist-item";

const WishlistArea = () => {
  const { wishlist } = useSelector((state) => state.wishlist);

  return (
    <section className="scs-wishlist-page">
      <div className="scs-wishlist-page__inner">
        {wishlist.length === 0 ? (
          <div className="scs-wishlist-page__empty-panel">
            <div className="scs-wishlist-page__empty">
              <h2>No wishlist items yet</h2>
              <p>Save products you love and add them to cart anytime.</p>
              <Link href="/shop" className="scs-wishlist-page__btn scs-wishlist-page__btn--primary">
                Continue shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="scs-wishlist-page__panel">
            <div className="scs-wishlist-page__table">
              <div className="scs-wishlist-page__table-head" aria-hidden="true">
                <span>Product</span>
                <span>Price</span>
                <span>Quantity</span>
                <span>Action</span>
                <span />
              </div>
              <ul className="scs-wishlist-page__list">
                {wishlist.map((item) => (
                  <WishlistItem key={item._id} product={item} />
                ))}
              </ul>
            </div>

            <div className="scs-wishlist-page__footer">
              <Link href="/shop" className="scs-wishlist-page__continue-link">
                ← Continue shopping
              </Link>
              <Link
                href="/cart"
                className="scs-wishlist-page__btn scs-wishlist-page__btn--primary"
              >
                Go to cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default WishlistArea;
