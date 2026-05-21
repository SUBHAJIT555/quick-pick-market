import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/redux/features/cartSlice";
import CartCheckout from "./cart-checkout";
import CartItem from "./cart-item";
import RenderCartProgress from "../common/render-cart-progress";

const CartArea = () => {
  const { cart_products } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <section className="scs-cart-page">
      <div className="scs-cart-page__inner">
        {cart_products.length === 0 ? (
          <div className="scs-cart-page__empty-panel">
            <div className="scs-cart-page__empty">
              <h2>Your cart is empty</h2>
              <p>Add items from the shop to see them here.</p>
              <Link href="/shop" className="scs-cart-page__btn scs-cart-page__btn--primary">
                Continue shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="scs-cart-page__layout">
            <div className="scs-cart-page__main">
              <div className="scs-cart-page__panel">
                <div className="scs-cart-page__shipping">
                  <RenderCartProgress />
                </div>

                <div className="scs-cart-page__table">
                  <div className="scs-cart-page__table-head" aria-hidden="true">
                    <span>Product</span>
                    <span>Price</span>
                    <span>Quantity</span>
                    <span />
                  </div>
                  <ul className="scs-cart-page__list">
                    {cart_products.map((item) => (
                      <CartItem key={item._id} product={item} />
                    ))}
                  </ul>
                </div>
              </div>

              <div className="scs-cart-page__actions">
                <Link href="/shop" className="scs-cart-page__continue-link">
                  ← Continue shopping
                </Link>
                <button
                  type="button"
                  className="scs-cart-page__clear-btn"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear cart
                </button>
              </div>
            </div>

            <aside className="scs-cart-page__aside">
              <CartCheckout />
            </aside>
          </div>
        )}
      </div>
    </section>
  );
};

export default CartArea;
